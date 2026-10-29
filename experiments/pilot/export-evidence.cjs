'use strict';

// Development evidence export only. No model, host, shell, network, credentials,
// rollout, global configuration, or generated subject code is executed here.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

class ExportFailure extends Error {}

const PRODUCER = 'SimplySay explicit-whitelist evidence exporter v1';
const SELECTOR = 'ss-feasibility@ss-feasibility-catalog';
const UUID = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
const ARTIFACTS = ['input.json', 'settle.mjs', 'settle.test.mjs', 'batch-report.md',
  'child-report.txt', 'queue-rules.txt', 'crates.json'];
const USAGE = ['input_tokens', 'cached_input_tokens', 'cache_write_input_tokens',
  'output_tokens', 'reasoning_output_tokens', 'total_tokens'];
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const pick = (object, keys) => Object.fromEntries(keys.filter(key =>
  object && Object.hasOwn(object, key)).map(key => [key, object[key]]));
const json = value => JSON.stringify(value, null, 2) + '\n';
const alias = value => 'thread-' + sha(String(value).toLowerCase()).slice(0, 16);

function assertContained(root, file) {
  const relative = path.relative(root, file);
  if (relative.startsWith('..' + path.sep) || relative === '..' || path.isAbsolute(relative)) {
    throw new ExportFailure('Path outside the approved evidence source/output root');
  }
}

function assertNoLinks(root, file) {
  assertContained(root, file);
  let current = root;
  for (const part of ['', ...path.relative(root, file).split(path.sep).filter(Boolean)]) {
    if (part) current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) {
      throw new ExportFailure('Symlink or junction refused in evidence path');
    }
  }
}

function scrubber(base, trial) {
  const replacements = [];
  if (trial) replacements.push([path.join(trial, 'task'), '<TASK_ROOT>'],
    [path.join(trial, 'profile'), '<PROFILE_ROOT>']);
  replacements.push([base, '<PILOT_ROOT>'], [os.homedir(), '<USER_HOME>']);
  // Native command wrappers can expose installation paths unrelated to subjects.
  if (process.env.ProgramFiles) replacements.push([process.env.ProgramFiles, '<PROGRAM_FILES>']);
  if (process.env.SystemRoot) replacements.push([process.env.SystemRoot, '<SYSTEM_ROOT>']);
  replacements.sort((a, b) => b[0].length - a[0].length);
  const text = value => {
    let result = String(value);
    for (const [original, replacement] of replacements) {
      const pattern = original.replaceAll('\\', '/').split('/').map(part =>
        part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[/\\\\]+');
      result = result.replace(new RegExp(pattern, 'gi'), replacement);
    }
    // The native shell wrapper can report the Windows 8.3 Program Files alias.
    result = result.replace(/(?<![A-Za-z0-9_])[A-Za-z]:[\\/]+PROGRA~[12]/gi, '<PROGRAM_FILES>');
    return result.replace(UUID, raw => alias(raw));
  };
  const object = value => {
    if (typeof value === 'string') return text(value);
    if (Array.isArray(value)) return value.map(object);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, child]) => [text(key), object(child)]));
    }
    return value;
  };
  return { text, object };
}

function privacyFindings(text) {
  // Report categories/counts only. Never place a matching value in an error.
  const patterns = {
    bearer: /\b(?:Authorization\s*[:=]\s*["']?)?Bearer\s+(?!<|\[|\$\{|placeholder\b)[A-Za-z0-9._~+/=-]{12,}/gi,
    provider_key: /\b(?:sk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/g,
    jwt: /\beyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\b/g,
    secret_assignment: /["']?(?:access_token|refresh_token|api_key|client_secret|password)["']?\s*[:=]\s*["'][A-Za-z0-9+/_=.-]{16,}["']/gi,
    absolute_user_path: /(?:[A-Za-z]:[\\/]+(?:Users|Documents and Settings)[\\/]+|\/(?:Users|home)\/)[^\s"'<>]*/gi,
    remaining_machine_path: /(?<![A-Za-z0-9_])[A-Za-z]:[\\/]+[^\s"'<>]*/gi,
  };
  const findings = Object.entries(patterns).flatMap(([category, regex]) => {
    const count = [...text.matchAll(regex)].length;
    return count ? [{ category, count }] : [];
  });
  const emails = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi) || [];
  const count = emails.filter(value => !/@example\.invalid$/i.test(value)).length;
  if (count) findings.push({ category: 'non_example_email', count });
  return findings;
}

function usageOf(value) {
  return Object.fromEntries(USAGE.filter(key => Number.isFinite(value?.[key]) && value[key] >= 0)
    .map(key => [key, value[key]]));
}

function visibleEvent(event) {
  if (event.type === 'thread.started') return pick(event, ['type', 'thread_id']);
  if (event.type === 'turn.started') return { type: event.type };
  if (event.type === 'turn.completed') return { type: event.type, usage: usageOf(event.usage) };
  if (['turn.failed', 'error'].includes(event.type)) {
    return { type: event.type, ...pick(event, ['message']),
      ...(event.error ? { error: pick(event.error, ['message', 'code']) } : {}) };
  }
  if (!['item.started', 'item.updated', 'item.completed'].includes(event.type)) return null;
  const item = event.item;
  if (!item || typeof item !== 'object') return null;
  let selected;
  if (item.type === 'agent_message') selected = pick(item, ['id', 'type', 'text']);
  else if (item.type === 'command_execution') selected = pick(item,
    ['id', 'type', 'command', 'aggregated_output', 'exit_code', 'status']);
  else if (item.type === 'file_change') selected = {
    ...pick(item, ['id', 'type', 'status']),
    changes: (item.changes || []).map(change => pick(change, ['path', 'kind', 'diff'])),
  };
  else if (['collab_tool_call', 'collab_agent_tool_call'].includes(item.type)) {
    selected = pick(item, ['id', 'type', 'tool', 'status', 'sender_thread_id',
      'receiver_thread_ids', 'prompt', 'model', 'reasoning_effort']);
    if (item.agents_states && typeof item.agents_states === 'object') {
      selected.agents_states = Object.fromEntries(Object.entries(item.agents_states).map(([id, state]) =>
        [id, pick(state, ['status', 'message', 'final_response'])]));
    }
  }
  return selected ? { type: event.type, item: selected } : null;
}

function preflightSummary(raw) {
  // Select only the pilot-owned candidate, never export account plugin inventories.
  const candidate = raw.inventory?.installed?.find(plugin => plugin.pluginId === SELECTOR);
  const config = raw.configEffective?.config || {};
  const hooks = (raw.hooksEffective?.data || []).flatMap(entry => entry.hooks || []);
  return {
    ...pick(raw, ['id', 'caseId', 'condition', 'policyHash', 'configHash', 'fingerprints']),
    candidate: { pluginId: SELECTOR, installed: Boolean(candidate),
      enabled: candidate ? candidate.enabled === true : null,
      ...(candidate ? pick(candidate, ['version']) : {}) },
    ownedHooks: hooks.filter(hook => hook.pluginId === SELECTOR).map(hook => pick(hook,
      ['eventName', 'handlerType', 'enabled', 'matcher', 'timeoutSec', 'currentHash', 'trustStatus'])),
    nativeChildBudgetGuard: hooks.filter(hook => hook.source === 'user' &&
      hook.eventName === 'preToolUse' && ['spawn_agent', '^(spawn_agent|collaborationspawn_agent)$'].includes(hook.matcher)).map(hook => pick(hook,
      ['eventName', 'handlerType', 'enabled', 'matcher', 'timeoutSec', 'currentHash', 'trustStatus'])),
    settings: {
      ...pick(config, ['model', 'model_reasoning_effort', 'approval_policy', 'sandbox_mode',
        'web_search', 'project_doc_max_bytes', 'include_apps_instructions']),
      sandboxWorkspaceWrite: pick(config.sandbox_workspace_write,
        ['network_access', 'exclude_tmpdir_env_var', 'exclude_slash_tmp']),
      windows: pick(config.windows, ['sandbox', 'allow_mxc']),
      features: pick(config.features, ['apps', 'multi_agent', 'memories']),
      agents: pick(config.agents, ['enabled', 'max_threads', 'max_concurrent_threads_per_session', 'max_depth']),
      otherPluginsDefaultEnabled: config.plugins?._default?.enabled ?? null,
      developerInstruction: { present: Boolean(config.developer_instructions),
        sha256: config.developer_instructions ? sha(config.developer_instructions) : null },
    },
    limitation: 'Selected configuration and own-hook readback only; not proof of loaded policy, adherence, comprehension, or preserved task quality.',
  };
}

function selectedIndependentCheck(raw) {
  const fileInfo = info => ({ ...pick(info, ['path', 'exists', 'bytes', 'sha256',
    'matches_frozen_data', 'safety_note']),
    ...(info?.imports ? { imports: info.imports.map(row => pick(row, ['line', 'text'])) } : {}),
    ...(info?.review_signals ? { review_signals: info.review_signals.map(row =>
      pick(row, ['line', 'signal', 'text'])) } : {}) });
  const resultData = value => {
    if (!value || typeof value !== 'object') return value;
    return { ...pick(value, ['total_cents']),
      ...(Array.isArray(value.approved) ? { approved: value.approved.map(row => pick(row, ['id', 'amount_cents'])) } : {}),
      ...(Array.isArray(value.needs_review) ? { needs_review: value.needs_review.map(row => pick(row, ['id', 'reason'])) } : {}),
      ...(Array.isArray(value.excluded) ? { excluded: value.excluded } : {}) };
  };
  if (raw.schema_version === 1 && raw.run === 'r08') {
    return { ...pick(raw, ['schema_version', 'run', 'run_version', 'case_id', 'role', 'method',
      'root_thread_id', 'child_thread_ids', 'actual_created_sessions', 'child_turn_status',
      'child_directive_observable', 'guard_claim', 'public_report_rows', 'saved_report_rows',
      'overall', 'artifact_sha256']),
      guard_events: (raw.guard_events || []).map(event => pick(event, ['tool', 'child'])),
      pair_checks: (raw.pair_checks || []).map(pair => pick(pair, ['pair', 'expected_expressions',
        'public_expressions', 'saved_expressions', 'public_numeric_pass', 'saved_numeric_pass',
        'required_reasons', 'visible_assessments', 'manual_reason_coverage'])),
      root_arithmetic_checks: (raw.root_arithmetic_checks || []).map(pair => ({
        ...pick(pair, ['pair', 'pass']), actual: pick(pair.actual, ['Pair', 'Price', 'Kits', 'Mats', 'Confirmed']),
      })),
      transient_arithmetic_failure: pick(raw.transient_arithmetic_failure, ['event', 'exit_code', 'message']),
      corrected_arithmetic: pick(raw.corrected_arithmetic, ['event', 'exit_code', 'all_ten_pass']),
      checks: Object.fromEntries(['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'].filter(key =>
        raw.checks?.[key]).map(key => [key, pick(raw.checks[key], ['status', 'scope', 'reason'])])),
    };
  }
  if (raw.schema_version === 1 && raw.run === 'r07') {
    return { ...pick(raw, ['schema_version', 'run', 'case_id', 'role', 'cases_sha256', 'method',
      'run_root', 'visible_failure', 'capture_gap', 'protected_output_status',
      'policy_failure_established', 'session_accounting']),
      result: pick(raw.result, ['code', 'error', 'timedOut', 'budgetViolation', 'observedChildren', 'plannedSlots']),
      artifacts: pick(raw.artifacts, ['task_files', 'root_final_present', 'child_report_present']),
      native_metadata: { root: pick(raw.native_metadata?.root, ['id', 'source', 'file']),
        child: pick(raw.native_metadata?.child, ['id', 'parent_thread_id', 'depth', 'file']),
        ...pick(raw.native_metadata, ['note']) },
      checks: Object.fromEntries(['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'].filter(key =>
        raw.checks?.[key]).map(key => [key, pick(raw.checks[key], ['status', 'known', 'reason'])])),
    };
  }
  const selected = { ...pick(raw, ['mode', 'task_dir', 'cases_sha256', 'note', 'scratch', 'isolation',
    'functional_pass', 'limitations', 'originals_unchanged']) };
  for (const key of ['source', 'tests', 'report', 'fixture']) if (raw[key]) selected[key] = fileInfo(raw[key]);
  selected.checks = {};
  for (const key of ['import_only', 'export_probes', 'valid_cli', 'invalid_cli', 'generated_tests']) {
    const check = raw.checks?.[key];
    if (!check) continue;
    const output = pick(check, ['args', 'status', 'signal', 'stdout', 'stderr', 'pass', 'note', 'problems']);
    if (check.error !== undefined) output.error = check.error && typeof check.error === 'object' ?
      pick(check.error, ['name', 'message', 'code', 'errno', 'syscall']) : check.error;
    if (check.actual !== undefined) output.actual = resultData(check.actual);
    if (check.cases) output.cases = check.cases.map(probe => ({ ...pick(probe, ['name', 'pass', 'problems']),
      ...(probe.actual ? { actual: { ...pick(probe.actual, ['name', 'returned', 'error']),
        ...(probe.actual.value ? { value: resultData(probe.actual.value) } : {}) } } : {}) }));
    selected.checks[key] = output;
  }
  return selected;
}

function selectCompletedTrials(planned, hasResult) {
  const completed = new Map();
  for (const [directory, manifest, manifestName] of planned) for (const row of manifest.order) {
    const [id] = row;
    if (!/^r\d{2}$/.test(id)) throw new ExportFailure('Invalid planned trial identifier');
    if (hasResult(directory, id)) completed.set(id, { directory, manifest, manifestName, row });
  }
  return [...completed.values()];
}

function exportEvidence({ base, destination }) {
  base = path.resolve(base); destination = path.resolve(destination);
  if (!fs.existsSync(base) || !fs.lstatSync(base).isDirectory()) throw new ExportFailure('Approved source root unavailable');
  assertNoLinks(base, base);
  if (fs.existsSync(destination)) {
    const marker = path.join(destination, 'export-index.json');
    assertNoLinks(destination, marker);
    if (!fs.existsSync(marker) || JSON.parse(fs.readFileSync(marker, 'utf8')).producer !== PRODUCER) {
      throw new ExportFailure('Refusing to overwrite a directory not owned by this exporter');
    }
  }
  const sources = new Map(), outputs = new Map();
  const globalScrub = scrubber(base);
  function read(relative, required = true) {
    const file = path.resolve(base, relative);
    assertNoLinks(base, file);
    if (!fs.existsSync(file)) {
      if (required) throw new ExportFailure('Required whitelisted source unavailable');
      return null;
    }
    const stat = fs.lstatSync(file);
    if (!stat.isFile() || stat.size > 32 * 1024 * 1024) throw new ExportFailure('Whitelisted source is not a bounded regular file');
    const bytes = fs.readFileSync(file);
    if (!Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes)) {
      throw new ExportFailure('Whitelisted text is not valid UTF-8');
    }
    const digest = sha(bytes);
    const previous = sources.get(file);
    if (previous && previous.sha256 !== digest) throw new ExportFailure('Completed source changed during export');
    sources.set(file, { bytes: bytes.length, sha256: digest });
    return bytes;
  }
  function add(relative, content) {
    if (path.isAbsolute(relative) || relative.split(/[\\/]/).some(part => part === '..')) {
      throw new ExportFailure('Invalid export-relative destination');
    }
    const findings = privacyFindings(content);
    if (findings.length) throw new ExportFailure('Export halted by privacy scan for ' + relative + ': ' +
      findings.map(finding => finding.category + '=' + finding.count).join(', '));
    outputs.set(relative, Buffer.from(content, 'utf8'));
  }
  const manifests = {};
  const manifestNames = ['launch-manifest.json', 'launch-manifest-v2.json', 'launch-manifest-v3.json'];
  for (const name of manifestNames) {
    const bytes = read(name, name === 'launch-manifest.json');
    if (bytes) {
      manifests[name] = JSON.parse(bytes.toString('utf8'));
      add(name, json(globalScrub.object(manifests[name])));
    }
  }
  const amended = manifests['launch-manifest-v2.json'];
  for (let i = 1; i < manifestNames.length; i++) {
    const current = manifests[manifestNames[i]];
    if (!current) continue;
    const parent = manifests[manifestNames[i - 1]];
    if (!parent || current.parentManifestHash !== sources.get(path.join(base, manifestNames[i - 1]))?.sha256) {
      throw new ExportFailure('Amended manifest parent digest mismatch');
    }
    for (const field of ['policyHash', 'caseHash', 'minimalHash']) {
      if (current[field] !== parent[field]) throw new ExportFailure('Amended manifest changed frozen policy or tasks');
    }
  }
  const rows = [];
  const planned = manifestNames.flatMap((name, i) => manifests[name] ?
    [[i ? `runs-v${i + 1}` : 'runs', manifests[name], name]] : []);
  // Later completed amendments supersede earlier versions of the same ID.
  // A prepared/active v3 cell cannot hide an existing completed v2 result.
  const completed = selectCompletedTrials(planned, (directory, id) =>
    fs.existsSync(path.join(base, directory, id, 'result.json')));
  for (const { directory, manifest, manifestName, row } of completed) {
      const [id, caseId, condition] = row;
      const rel = path.join(directory, id), trial = path.join(base, rel);
      const result = JSON.parse(read(path.join(rel, 'result.json')).toString('utf8'));
      if (result.id !== id) throw new ExportFailure('Trial identity mismatch');
      const preflightBytes = read(path.join(rel, 'preflight.json'), false);
      const preflight = preflightBytes ? JSON.parse(preflightBytes.toString('utf8')) : null;
      if (preflight && (preflight.id !== id || preflight.caseId !== caseId || preflight.condition !== condition)) {
        throw new ExportFailure('Preflight identity mismatch');
      }
      const scrub = scrubber(base, trial), out = directory + '/' + id;
      const eventBytes = read(path.join(rel, 'events.jsonl'), false);
      const events = [], omitted = {}, usage = [];
      if (eventBytes) for (const line of eventBytes.toString('utf8').split(/\r?\n/).filter(Boolean)) {
        const event = JSON.parse(line), selected = visibleEvent(event);
        if (selected) events.push(scrub.object(selected));
        else { const type = String(event.type || 'unknown') + (event.item?.type ? ':' + event.item.type : '');
          omitted[type] = (omitted[type] || 0) + 1; }
        if (event.type === 'turn.completed') usage.push(usageOf(event.usage));
      }
      add(out + '/events.jsonl', events.map(event => JSON.stringify(event)).join('\n') + (events.length ? '\n' : ''));
      const finalBytes = read(path.join(rel, 'final.txt'), false);
      if (finalBytes) add(out + '/final.txt', scrub.text(finalBytes.toString('utf8')));
      if (preflight) add(out + '/preflight-summary.json', json(scrub.object(preflightSummary(preflight))));
      add(out + '/result.json', json(scrub.object(pick(result, ['id', 'code', 'error', 'timedOut',
        'budgetViolation', 'observedChildren', 'durationMs', 'model', 'effort', 'plannedSlots', 'authCopyRemoved']))));
      const artifacts = [];
      for (const name of ARTIFACTS) {
        const bytes = read(path.join(rel, 'task', name), false);
        if (!bytes) { artifacts.push({ path: name, present: false }); continue; }
        const content = scrub.text(bytes.toString('utf8'));
        add(out + '/files/' + name, content);
        artifacts.push({ path: name, present: true, sourceBytes: bytes.length,
          sourceSha256: sha(bytes), exportedSha256: sha(content), privacyScrubbed: !bytes.equals(Buffer.from(content)) });
      }
      const hookRelative = path.join(rel, 'profile/plugins/data/ss-feasibility-ss-feasibility-catalog/events.jsonl');
      const hookBytes = read(hookRelative, false);
      if (hookBytes) {
        const hookEvents = hookBytes.toString('utf8').split(/\r?\n/).filter(Boolean).map(line => {
          const event = JSON.parse(line);
          if (event.event !== 'SessionStart') throw new ExportFailure('Unexpected own-plugin hook event');
          if (event.policyHash !== manifest.policyHash) throw new ExportFailure('Own-plugin hook policy digest mismatch');
          return scrub.object(pick(event, ['event', 'source', 'session_id', 'policyHash']));
        });
        add(out + '/plugin-session-start.jsonl', hookEvents.map(event => JSON.stringify(event)).join('\n') + '\n');
      }
      const captureBytes = ['r07', 'r08'].includes(id) ? read(path.join(rel, 'capture-audit.json'), false) : null;
      const capture = captureBytes ? JSON.parse(captureBytes.toString('utf8')) : null;
      const nativePublicMessages = [];
      if (capture) {
        if (!Array.isArray(capture.childThreadIds) || capture.actualCreatedSessions !== 1 + capture.childThreadIds.length) {
          throw new ExportFailure('Invalid controller capture audit session accounting');
        }
        const selectedCapture = pick(capture, ['rootThreadId',
          'childThreadIds', 'actualCreatedSessions', 'source', 'rootStatus', 'childStatus', 'providerError',
          'childReportAvailable', 'childDirectiveObservable', 'cliObservedChildren',
          'budgetGuardMarkerPresent', 'scopePreservation', 'classification', 'method', 'guardClaim']);
        if (capture.guardEvents) selectedCapture.guardEvents = capture.guardEvents.map(event =>
          pick(event, ['tool', 'child']));
        if (capture.children) selectedCapture.children = capture.children.map((child, childIndex) => {
          if (!capture.childThreadIds.includes(child.threadId)) throw new ExportFailure('Invalid native child capture identity');
          const messages = (child.publicMessages || []).map((message, messageIndex) => {
            if (!['final_answer', 'commentary', 'final'].includes(message.phase) || typeof message.text !== 'string') {
              throw new ExportFailure('Unexpected phase in public native child capture');
            }
            const relative = `native-messages/child-${childIndex + 1}-message-${messageIndex + 1}.txt`;
            const exported = scrub.text(message.text);
            add(out + '/' + relative, exported);
            nativePublicMessages.push({ path: relative, threadAlias: alias(child.threadId), phase: message.phase,
              sourceTextSha256: sha(message.text), exportedSha256: sha(exported),
              characterCount: message.text.length, privacyScrubbed: exported !== message.text,
              provenance: 'Public agentMessage text in controller capture-audit.json; no rollout or private payload read' });
            return pick(message, ['phase', 'text']);
          });
          return { ...pick(child, ['threadId', 'turnStatus']), status: pick(child.status, ['type']), publicMessages: messages };
        });
        add(out + '/capture-audit.json', json(scrub.object(selectedCapture)));
      }
      const loadingBytes = read(path.join(rel, 'loading-audit.json'), false);
      const loading = loadingBytes ? JSON.parse(loadingBytes.toString('utf8')) : null;
      if (loading) {
        if (loading.id !== id || !Number.isInteger(loading.developerPolicyMatches) || loading.developerPolicyMatches < 0) {
          throw new ExportFailure('Invalid exact-body presence audit');
        }
        const selectedLoading = pick(loading, ['id', 'method', 'developerPolicyMatches',
          'minimalDeveloperMatches', 'inheritedPolicyIsNotFailure']);
        if (loading.threadFiles) selectedLoading.threadFiles = loading.threadFiles.map(thread => ({
          ...pick(thread, ['file', 'candidateMatches', 'minimalMatches']),
          threadAlias: (String(thread.file).match(UUID) || []).map(id => alias(id)).at(-1) || null,
        }));
        add(out + '/loading-audit.json', json(scrub.object(selectedLoading)));
      }
      const independentBytes = ['r09', 'r02', 'r04', 'r06', 'r07', 'r08'].includes(id) ?
        read(`independent/${id}-check.json`, false) : null;
      const independent = independentBytes ? JSON.parse(independentBytes.toString('utf8')) : null;
      if (independent) {
        if (independent.cases_sha256 !== undefined && independent.cases_sha256 !== manifest.caseHash) {
          throw new ExportFailure('Independent check task digest mismatch');
        }
        if (id === 'r08') {
          if (independent.run !== id || independent.case_id !== caseId || !independent.artifact_sha256) {
            throw new ExportFailure('Independent native-child check identity unavailable');
          }
          const allowed = ['capture-audit.json', 'task/child-report.txt', 'final.txt', 'events.jsonl'];
          if (Object.keys(independent.artifact_sha256).length !== allowed.length) {
            throw new ExportFailure('Independent native-child check artifact set mismatch');
          }
          for (const file of allowed) if (independent.artifact_sha256[file] !==
              sources.get(path.join(base, rel, file))?.sha256) {
            throw new ExportFailure('Independent native-child check artifact digest mismatch');
          }
        }
        for (const [record, file] of [['source', 'settle.mjs'], ['tests', 'settle.test.mjs']]) {
          if (independent[record]?.sha256 && independent[record].sha256 !==
              artifacts.find(item => item.path === file)?.sourceSha256) {
            throw new ExportFailure('Independent check source digest mismatch');
          }
        }
        add(out + '/independent-check.json', json(scrub.object(selectedIndependentCheck(independent))));
      }
      const infrastructure = directory === 'runs' && id === 'r01' && Boolean(amended);
      const summary = { id, caseId, condition, runDirectory: directory,
        sourceCommit: manifest.sourceCommit, host: manifest.host, model: manifest.model, effort: manifest.effort,
        policyHash: manifest.policyHash, caseHash: manifest.caseHash,
        manifestSha256: sources.get(path.join(base, manifestName)).sha256,
        parentManifestHash: manifest.parentManifestHash || null,
        classification: capture ? (result.code === 0 && !result.error && !result.timedOut && !result.budgetViolation ?
          (nativePublicMessages.length ? 'process_completed_public_child_messages_directive_unknown' : 'process_completed_interagent_capture_unknown') :
          /Selected model is at capacity/i.test(capture.providerError || '') ?
            'provider_capacity_failure_and_interagent_capture_unknown' : 'process_failure_and_interagent_capture_unknown') :
          infrastructure ? 'infrastructure_workspace_readonly_reported_by_amendment' :
          result.code !== 0 || result.error || result.timedOut || result.budgetViolation ? 'process_or_budget_failure' :
            'process_completed_not_quality_graded',
        result: scrub.object(pick(result, ['code', 'error', 'timedOut', 'budgetViolation', 'durationMs', 'plannedSlots'])),
        usage, visibleEventCount: events.length, omittedEventCounts: omitted,
        finalAvailable: Boolean(finalBytes), ownSessionStartRecordAvailable: Boolean(hookBytes), artifacts,
        independentCheckAvailable: Boolean(independent),
        loadingEvidenceAvailable: Boolean(loading), developerPolicyMatches: loading?.developerPolicyMatches ?? null,
        minimalDeveloperMatches: loading?.minimalDeveloperMatches ?? null,
        loadingThreadPresence: (loading?.threadFiles || []).map(thread => ({
          threadAlias: (String(thread.file).match(UUID) || []).map(id => alias(id)).at(-1) || null,
          ...pick(thread, ['candidateMatches', 'minimalMatches']),
        })),
        nativePublicMessages,
        ...(independent ? { independentFunctionalPass: independent.functional_pass ?? null } : {}),
        nativeChildCapture: capture ? {
          actualChildSessions: capture.childThreadIds.length, actualCreatedSessions: capture.actualCreatedSessions,
          cliObservedChildren: capture.cliObservedChildren?.length ?? result.observedChildren?.length ?? null,
          actualCountSource: 'Separate controller session-metadata audit, not the incomplete CLI child-event capture',
          childDirectiveObservable: capture.childDirectiveObservable,
          childReportAvailable: capture.childReportAvailable ?? nativePublicMessages.some(message => ['final_answer', 'final'].includes(message.phase)),
          budgetGuardMarkerPresent: capture.budgetGuardMarkerPresent ?? capture.guardClaim ?? null,
          limitation: 'Counts and available public messages do not reveal an unavailable root-to-child directive or establish task quality. No rollout/private/encrypted payload was exported.',
        } : { actualChildSessions: null, limitation: 'No separate metadata audit selected; CLI observedChildren alone is not an authoritative count.' },
        limits: ['No model subject or generated code executed by exporter.',
          'Only explicit visible-event fields exported; private reasoning, rollouts, credentials and raw profiles excluded.',
          'Numeric reasoning-token usage is accounting metadata, not reasoning content.',
          'Path literals and thread UUIDs may be scrubbed; original artifact bytes remain unchanged at source.',
          'Process completion is not a task-quality, activation, release, or human-comprehension verdict.'] };
      add(out + '/summary.json', json(summary)); rows.push(summary);
      add(out + '/README.md', `# ${directory}/${id}\n\nCase: ${caseId}. Condition: ${condition}.\n\n` +
        `Recorded classification: ${summary.classification}. Process status is not a quality grade.\n\n` +
        (capture ? `Separate metadata audit records ${capture.childThreadIds.length} actual child session(s), ${capture.actualCreatedSessions} sessions including the root. Root-to-child directive observable: ${capture.childDirectiveObservable === true}. Public child messages exported: ${nativePublicMessages.length}. Budget violation recorded: ${result.budgetViolation === true}. Counts or missing capture alone are not a style-policy verdict.\n\n` : '') +
        (finalBytes ? '- [Visible final chat](final.txt)\n' : '- Final chat was not produced.\n') +
        '- [Selected visible events](events.jsonl)\n- [Result and artifact hashes](summary.json)\n' +
        (preflight ? '- [Minimal preflight summary](preflight-summary.json)\n' : '') +
        (capture ? '- [Separate capture/accounting audit](capture-audit.json)\n' : '') +
        (loading ? '- [Exact policy-body presence audit](loading-audit.json)\n' : '') +
        (independent ? '- [Independent deterministic verification](independent-check.json)\n' : '') +
        nativePublicMessages.map(message => `- [Actual native child public message (${message.phase}, ${message.characterCount} characters)](${message.path})\n`).join('') +
        artifacts.filter(file => file.present).map(file => `- [${file.path}](files/${file.path})\n`).join('') +
        '\nPath literals and thread UUIDs may be privacy-scrubbed. Source hashes identify unchanged originals.\n');
  }
  for (const name of ['evidence.json', 'evidence-restricted-temp.json']) {
    const bytes = read('mxc-probe/' + name, false);
    if (bytes) {
      const record = JSON.parse(bytes.toString('utf8'));
      if (record.credentialFileExists !== false) throw new ExportFailure('Native probe was not recorded as credential-free');
      add('native-probes/' + name, json(globalScrub.object(pick(record,
        ['args', 'code', 'stdout', 'stderr', 'error', 'credentialFileExists']))));
    }
  }
  const finalAudits = {};
  for (const name of ['cleanup-audit.json', 'session-ledger-final.json', 'usage-before.json',
    'usage-before-final.json', 'usage-after.json', 'uninstall-audit.json']) {
    const bytes = read(name, false);
    if (!bytes) continue;
    const raw = JSON.parse(bytes.toString('utf8'));
    let selected;
    if (name === 'cleanup-audit.json') {
      selected = pick(raw, ['date', 'scope', 'lateCopiesFound', 'lateCopiesRemoved',
        'remainingPilotAuthCopies', 'chargedSessionSlots', 'rootReservations', 'nativeChildrenConfirmed',
        'activeCeiling', 'originalCeiling', 'additionalModelRunsScheduled']);
    } else if (name === 'session-ledger-final.json') {
      if (!Number.isInteger(raw.limit) || !Array.isArray(raw.reservations) || raw.reservations.some(row =>
        !Number.isInteger(row.slots) || row.slots < 1 || !/^r\d{2}$/.test(row.id))) {
        throw new ExportFailure('Invalid final session ledger');
      }
      selected = { limit: raw.limit, reservations: raw.reservations.map(row => pick(row,
        ['id', 'host', 'caseId', 'slots', 'state', 'reservedAt', 'finishedAt'])) };
    } else if (name === 'uninstall-audit.json') {
      if (raw.nativeResult?.pluginId !== SELECTOR) throw new ExportFailure('Unexpected candidate in removal audit');
      const hashes = values => Object.fromEntries(Object.entries(values || {}).map(([file, digest]) => {
        if (!ARTIFACTS.includes(file) || !/^[a-f0-9]{64}$/i.test(digest)) {
          throw new ExportFailure('Unexpected artifact in removal audit');
        }
        return [file, digest];
      }));
      selected = { ...pick(raw, ['kind', 'args', 'status', 'remainingCandidateHooks', 'taskFilesUnchanged',
        'unrelatedSettingsPreserved', 'authFilePresent']),
        nativeResult: pick(raw.nativeResult, ['pluginId', 'name', 'marketplaceName']),
        before: hashes(raw.before), after: hashes(raw.after) };
      if (JSON.stringify(selected.before) !== JSON.stringify(selected.after)) {
        throw new ExportFailure('Removal audit task hashes differ');
      }
    } else {
      const window = data => data == null ? null : pick(data, ['usedPercent', 'windowDurationMins']);
      selected = { ...pick(raw, ['primaryUsedPercent', 'windowDurationMins', 'requiresAdditionalCharges', 'note']),
        scope: 'Account-wide subscription percentages, including development activity; not an isolated subject usage or cost measurement.' };
      if (raw.subscriptionRateLimits) selected.subscriptionRateLimits = {
        primary: window(raw.subscriptionRateLimits.primary), secondary: window(raw.subscriptionRateLimits.secondary) };
      if (raw.byModel?.codex) selected.byModel = { codex: {
        primary: window(raw.byModel.codex.primary), secondary: window(raw.byModel.codex.secondary) } };
    }
    finalAudits[name] = selected;
    add('final-audits/' + name, json(globalScrub.object(selected)));
  }
  let sessionAccounting = null;
  const ledger = finalAudits['session-ledger-final.json'], cleanup = finalAudits['cleanup-audit.json'];
  if (ledger) {
    const slots = ledger.reservations.reduce((sum, row) => sum + row.slots, 0);
    const controllerCeiling = manifests['launch-manifest-v3.json']?.ceiling ?? amended?.ceiling ??
      manifests['launch-manifest.json'].ceiling;
    sessionAccounting = { overallOwnerCeiling: ledger.limit, fixedControllerCeiling: controllerCeiling,
      chargedSlots: slots, remainingOverallSlots: ledger.limit - slots,
      remainingControllerSlots: controllerCeiling - slots, rootReservations: ledger.reservations.length,
      metadataConfirmedNativeChildren: cleanup?.nativeChildrenConfirmed ?? null,
      remainingAuthCopiesReportedByCleanup: cleanup?.remainingPilotAuthCopies ?? null,
      directClaudeRootReservations: ledger.reservations.filter(row => /claude/i.test(row.host)).length,
      limitation: 'Counts reflect the supplied ledger and cleanup audit. The owner global cap and narrower fixed controller allocation are different scopes; remaining capacity does not automatically authorize another run. No model call was made by this exporter.' };
    if (slots > ledger.limit || slots > controllerCeiling || (cleanup && (cleanup.chargedSessionSlots !== slots ||
        cleanup.rootReservations !== ledger.reservations.length || cleanup.activeCeiling !== controllerCeiling ||
        cleanup.originalCeiling !== ledger.limit))) {
      throw new ExportFailure('Final session ledger and cleanup audit disagree');
    }
  }
  function verifyOriginals() {
    for (const [file, before] of sources) {
      assertNoLinks(base, file);
      if (sha(fs.readFileSync(file)) !== before.sha256) throw new ExportFailure('Source original changed during export');
    }
  }
  verifyOriginals();
  const sourceHashes = [...sources].map(([file, record]) => ({
    path: globalScrub.text(file), ...record, sha256After: record.sha256,
  }));
  add('source-hashes.json', json({ originalsUnchanged: true, files: sourceHashes }));
  const table = rows.map(row => `| ${row.runDirectory}/${row.id} | ${row.caseId} | ${row.condition} | ${row.classification} | ${row.finalAvailable ? `[Chat](${row.runDirectory}/${row.id}/final.txt)` : 'Unavailable'} | [Files](${row.runDirectory}/${row.id}/README.md) |`).join('\n');
  add('README.md', '# Sanitized development pilot evidence\n\n' +
    'Generated only from completed synthetic Codex cells. No Claude, API, subject, judge, or generated code was launched by this exporter. These are feasibility observations, not release validation or measured human comprehension.\n\n' +
    '| Cell | Case | Condition | Recorded classification | Visible final | File/hash inventory |\n|---|---|---|---|---|---|\n' + table + '\n\n' +
    'Each cell includes selected visible events, result metadata, a minimal candidate/hook/configuration summary, and allowlisted task files when present. Original source hashes and after-checks appear in source-hashes.json. Manifests retain their original source digest separately from any sanitized export digest.\n\n' +
    (sessionAccounting ? `Final recorded session accounting: ${sessionAccounting.chargedSlots} charged slots, ${sessionAccounting.rootReservations} root reservations, ${sessionAccounting.metadataConfirmedNativeChildren} metadata-confirmed native children. The overall owner cap is ${sessionAccounting.overallOwnerCeiling} (${sessionAccounting.remainingOverallSlots} remain); the narrower fixed controller allocation is ${sessionAccounting.fixedControllerCeiling} (${sessionAccounting.remainingControllerSlots} remains). Remaining capacity does not automatically authorize another run. The ledger records ${sessionAccounting.directClaudeRootReservations} direct Claude root reservations. Cleanup reports ${sessionAccounting.remainingAuthCopiesReportedByCleanup} remaining pilot authentication copies. The exporter did not inspect authentication files.\n\n` : '') +
    Object.keys(finalAudits).map(name => `- [${name}](final-audits/${name})\n`).join('') +
    (Object.keys(finalAudits).some(name => name.startsWith('usage-')) ? '\nAccount usage percentages include development activity. Do not attribute the account-wide difference solely to pilot subjects or convert it into a cost claim.\n\n' : '') +
    'Privacy transformations replace task, profile, pilot, home, and runtime paths with labeled markers and thread UUIDs with stable SHA-256 aliases. Source artifacts are never modified. Raw profiles, authentication, account plugin inventories, stderr session dumps, rollouts, and private reasoning are excluded. Numeric token counts are accounting metadata. A fail-closed pattern scan checks exports for credential-like strings, non-example email addresses and absolute user paths before writing; it is not a complete release secret audit.\n');
  const index = { producer: PRODUCER, completedCells: rows.map(row => ({
    id: row.id, runDirectory: row.runDirectory, caseId: row.caseId, condition: row.condition,
    classification: row.classification, durationMs: row.result.durationMs, usage: row.usage,
    sourceCommit: row.sourceCommit, host: row.host, model: row.model, policyHash: row.policyHash,
    manifestSha256: row.manifestSha256, parentManifestHash: row.parentManifestHash,
    nativeChildCapture: row.nativeChildCapture,
    developerPolicyMatches: row.developerPolicyMatches, loadingEvidenceAvailable: row.loadingEvidenceAvailable,
    minimalDeveloperMatches: row.minimalDeveloperMatches, loadingThreadPresence: row.loadingThreadPresence,
    independentCheckAvailable: row.independentCheckAvailable,
  })), sessionAccounting, finalAudits: Object.keys(finalAudits), originalsUnchanged: true,
    privacyScan: 'passed_explicit_patterns_not_release_audit',
    files: [...outputs].map(([file, bytes]) => ({ path: file, bytes: bytes.length, sha256: sha(bytes) })) };
  add('export-index.json', json(index));
  // Only exporter-owned paths may be updated. No source mutation or recursive removal.
  for (const [relative, bytes] of outputs) {
    const target = path.join(destination, relative);
    assertNoLinks(destination, target);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const temporary = target + '.exporting';
    if (fs.existsSync(temporary)) throw new ExportFailure('Unexpected temporary export destination');
    fs.writeFileSync(temporary, bytes, { flag: 'wx' });
    fs.renameSync(temporary, target);
  }
  verifyOriginals();
  return { completedCells: rows.length, exportedFiles: outputs.size,
    originalsVerifiedUnchanged: true, privacyScan: 'passed', hostProcessesLaunched: 0 };
}

function selfTest() {
  const b = path.join(os.homedir(), 'Temp/pilot'), t = path.join(b, 'runs-v2/r02');
  const s = scrubber(b, t), uuid = '01234567-89ab-cdef-0123-456789abcdef';
  assert.equal(s.text(path.join(t, 'task', 'x')), '<TASK_ROOT>' + path.sep + 'x');
  assert.equal(s.text(path.join(t, 'profile', 'x').replaceAll('\\', '/')), '<PROFILE_ROOT>/x');
  assert.ok(!s.text(JSON.stringify(path.join(t, 'profile', 'x'))).includes(os.homedir().split(path.sep).at(-1)));
  assert.equal(s.text(uuid), alias(uuid));
  assert.equal(s.object({ [uuid]: uuid })[alias(uuid)], alias(uuid));
  assert.equal(visibleEvent({ type: 'item.completed', item: { type: 'reasoning', text: 'PRIVATE' } }), null);
  assert.equal(visibleEvent({ type: 'item.completed', item: { type: 'agent_message', text: 'Visible', private: 'PRIVATE' } }).item.private, undefined);
  assert.equal(privacyFindings('casey@example.invalid').length, 0);
  assert.ok(privacyFindings('person@private.test').some(x => x.category === 'non_example_email'));
  assert.ok(privacyFindings('Authorization: Bearer abcdefghijklmnopqrstuvwxyz').length);
  assert.ok(privacyFindings('C:\\Users\\someone\\private').length);
  assert.ok(privacyFindings(JSON.stringify('C:\\Users\\someone\\private')).length);
  assert.equal(s.text('C:\\PROGRA~1\\PowerShell\\pwsh.exe'), '<PROGRAM_FILES>\\PowerShell\\pwsh.exe');
  assert.equal(privacyFindings(s.text(path.join(t, 'task', 'x'))).length, 0);
  const p = preflightSummary({ inventory: { installed: [{ pluginId: 'private-other', private: 'HIDDEN' }] },
    configEffective: { config: { private: 'HIDDEN' } } });
  assert.ok(!JSON.stringify(p).includes('HIDDEN'));
  assert.equal(p.candidate.installed, false);
  const plans = [['runs-v2', { order: [['r08', 'case', 'enabled']] }, 'v2'],
    ['runs-v3', { order: [['r08', 'case', 'enabled']] }, 'v3']];
  assert.equal(selectCompletedTrials(plans, directory => directory === 'runs-v2')[0].directory, 'runs-v2');
  assert.equal(selectCompletedTrials(plans, () => true)[0].directory, 'runs-v3');
  assert.equal(selectCompletedTrials(plans, () => false).length, 0);
  return { selfTests: 'passed', hostProcessesLaunched: 0 };
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    if (args.length && !(args.length === 1 && args[0] === '--self-test')) {
      throw new ExportFailure('Only --self-test or the approved default export is supported');
    }
    const result = args[0] === '--self-test' ? selfTest() : exportEvidence({
      base: path.join(os.homedir(), 'AppData/Local/Temp/agent-eval-20261028/codex'),
      destination: path.join(__dirname, 'evidence'),
    });
    console.log(JSON.stringify(result));
  } catch (error) {
    // No raw source values or paths are printed, even when parsing fails.
    console.error(error instanceof ExportFailure ? error.message :
      'Evidence export failed; inspect the whitelist/schema locally without printing private values.');
    process.exitCode = 1;
  }
}

module.exports = { exportEvidence, privacyFindings, scrubber, visibleEvent, preflightSummary,
  selectedIndependentCheck, selectCompletedTrials, selfTest };
