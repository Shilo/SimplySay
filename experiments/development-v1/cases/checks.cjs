// Offline request-derived checks. No candidate labels, policy input, host or model calls.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const {compareRequired} = require('../../pilot/check-results.cjs');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

function inside(root, relative) {
  assert(typeof relative === 'string' && relative && !path.isAbsolute(relative), 'Expected a relative task-file path');
  const resolved = path.resolve(root, relative);
  assert(resolved.startsWith(path.resolve(root) + path.sep), 'Task path escaped snapshot');
  return resolved;
}

function fileFromCapture(turn, relative) {
  if (turn.files_dir) {
    const target = inside(turn.files_dir, relative);
    if (!fs.existsSync(target)) return {exists: false, byte_faithful: true};
    // A snapshot must not route a probe or file read through a symlink.
    let cursor = target;
    const root = path.resolve(turn.files_dir);
    while (cursor !== root) {
      if (fs.lstatSync(cursor).isSymbolicLink()) throw Error('Symlink in captured path: ' + relative);
      cursor = path.dirname(cursor);
    }
    if (!fs.statSync(target).isFile()) throw Error('Not a regular captured file: ' + relative);
    return {exists: true, bytes: fs.readFileSync(target), byte_faithful: true};
  }
  const item = turn.files && turn.files[relative];
  if (item === undefined || item === null || item.exists === false) return {exists: false, byte_faithful: false};
  if (Buffer.isBuffer(item)) return {exists: true, bytes: item, byte_faithful: true};
  if (typeof item === 'object' && typeof item.base64 === 'string') return {exists: true, bytes: Buffer.from(item.base64, 'base64'), byte_faithful: true};
  const content = typeof item === 'string' ? item : item.content;
  if (typeof content !== 'string') throw Error('Captured file has neither bytes nor text: ' + relative);
  // Decoded UTF-8 is useful for presence/JSON, but is not original-byte evidence.
  return {exists: true, bytes: Buffer.from(content, 'utf8'), byte_faithful: false};
}

function checkCase(task, capturedTurns, options = {}) {
  const turns = Array.isArray(capturedTurns) ? capturedTurns : capturedTurns.turns;
  assert(Array.isArray(turns), 'Captured turns must be an array or {turns: []}');
  const checks = [];
  const record = (id, turn, status, detail = {}) => checks.push({id, turn_id: turn.id, status, ...detail});
  const fixtures = new Map((task.fixture_files || []).map(f => [f.path, f]));
  const indexOf = id => {
    const index = task.turns.findIndex(t => t.id === id);
    assert(index >= 0, 'Unknown required turn: ' + id);
    return index;
  };
  for (let i = 0; i < task.turns.length; i++) {
    const requested = task.turns[i];
    const turn = turns.find(t => t.id === requested.id || t.case_turn_id === requested.id) || turns.find(t => t.turn === i + 1);
    if (!turn) {
      record('turn_capture', requested, 'unverified', {reason: 'No capture for the requested turn; later files cannot backfill it.'});
      continue;
    }
    const issues = [...(turn.capture_issues || []), ...(turn.host_result?.snapshot_issues || []), ...(turn.snapshot_issues || [])];
    if (issues.length) record('capture_completeness', requested, 'unverified', {issues});
    if (turn.host_result?.failed || turn.failed) record('native_turn_completion', requested, 'unverified', {reason: 'Native turn did not complete cleanly; retained artifacts are still checked separately.'});
    if (turn.snapshot_observed === false || (turn.files_dir && !fs.existsSync(turn.files_dir))) {
      record('file_snapshot', requested, 'unverified', {reason: 'The actual-file snapshot is missing; missing capture is not a task-preservation failure.'});
      record('subject_execution_evidence', requested, (turn.commands || []).length ? 'observed' : 'unverified', {commands_count: (turn.commands || []).length});
      continue;
    }
    const read = relative => {
      try { return fileFromCapture(turn, relative); }
      catch (error) { return {exists: false, error: error.message}; }
    };
    for (const expected of task.expected_files || []) {
      if (i < indexOf(expected.first_required_after_turn)) continue;
      const actual = read(expected.path);
      const id = 'file:' + expected.path;
      if (actual.error) { record(id, requested, 'unverified', {reason: actual.error}); continue; }
      if (!actual.exists || actual.bytes.length === 0) {
        record(id, requested, issues.length ? 'unverified' : 'fail', {reason: 'Required actual file is missing or empty in this turn snapshot.'});
        continue;
      }
      record(id, requested, 'pass', {bytes: actual.bytes.length, sha256: actual.byte_faithful ? hash(actual.bytes) : null});
      if (expected.kind === 'exact_fixture_copy' || expected.kind === 'exact_utf8_fixture_copy') {
        const fixture = fixtures.get(expected.equals_fixture);
        assert(fixture, 'Unknown exact-copy fixture');
        if (!actual.byte_faithful) record('exact_copy:' + expected.path, requested, 'unverified', {reason: 'Decoded text cannot establish original raw-byte equality.'});
        else {
          const original = Buffer.from(fixture.content, fixture.encoding || 'utf8');
          record('exact_copy:' + expected.path, requested, actual.bytes.equals(original) ? 'pass' : 'fail', {expected_sha256: hash(original), actual_sha256: hash(actual.bytes)});
        }
      }
      if (expected.kind === 'json' && expected.expected_json !== undefined) {
        try {
          const parsed = JSON.parse(actual.bytes.toString('utf8').replace(/^\uFEFF/, ''));
          const problems = compareRequired(parsed, expected.expected_json);
          if (expected.exact_keys && (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed) || JSON.stringify(Object.keys(parsed).sort()) !== JSON.stringify(Object.keys(expected.expected_json).sort()))) problems.push('Top-level state keys differ from the requested fields.');
          record('json:' + expected.path, requested, problems.length ? 'fail' : 'pass', {problems});
        } catch (error) { record('json:' + expected.path, requested, 'fail', {reason: error.message}); }
      }
    }
    for (const relative of task.objective?.preserve_fixture_paths || []) {
      const fixture = fixtures.get(relative);
      assert(fixture, 'Unknown preserved fixture: ' + relative);
      const actual = read(relative);
      if (actual.error || !actual.exists || !actual.byte_faithful) {
        const status = actual.error || !actual.byte_faithful || issues.length ? 'unverified' : 'fail';
        record('source_bytes:' + relative, requested, status, {reason: actual.error || (!actual.exists ? 'Preserved source is missing.' : 'Raw-byte evidence is unavailable.')});
      } else {
        const original = Buffer.from(fixture.content, fixture.encoding || 'utf8');
        record('source_bytes:' + relative, requested, actual.bytes.equals(original) ? 'pass' : 'fail', {expected_sha256: hash(original), actual_sha256: hash(actual.bytes)});
      }
    }
    for (const expected of task.objective?.changed_test_files || []) {
      if (i < indexOf(expected.first_required_after_turn)) continue;
      const fixture = fixtures.get(expected.path), actual = read(expected.path);
      assert(fixture, 'Unknown initial test file');
      // A changed file is necessary, not sufficient: semantic review still judges coverage quality.
      record('test_file_changed:' + expected.path, requested, actual.error ? 'unverified' : !actual.exists ? (issues.length ? 'unverified' : 'fail') : actual.bytes.equals(Buffer.from(fixture.content)) ? 'fail' : 'pass', {limitation: 'This does not establish meaningful regression coverage or subject execution.'});
    }
    for (const probe of task.objective?.code_probes || []) {
      if (i < indexOf(probe.first_required_after_turn)) continue;
      if (options.execute === false || !turn.files_dir || !fs.existsSync(turn.files_dir) || issues.length) {
        record('black_box:' + probe.id, requested, 'unverified', {reason: options.execute === false ? 'Offline code execution was disabled.' : 'Complete actual-file snapshot is required to execute a frozen code probe.'});
        continue;
      }
      const probeEnv = {...process.env};
      for (const key of Object.keys(probeEnv)) if (/TOKEN|SECRET|PASSWORD|API_KEY|^CODEX_|^NODE_OPTIONS$|^NODE_PATH$/i.test(key)) delete probeEnv[key];
      const result = cp.spawnSync(process.execPath, ['-e', probe.source], {cwd: turn.files_dir, env: probeEnv, encoding: 'utf8', timeout: probe.timeout_ms || 7000, maxBuffer: 1024 * 1024, windowsHide: true});
      record('black_box:' + probe.id, requested, result.error ? 'unverified' : result.status === 0 ? 'pass' : 'fail', {exit_code: result.status, stdout: result.stdout || '', stderr: result.stderr || '', error: result.error?.message || null, evidence_owner: 'offline evaluator; not subject execution'});
    }
    const commands = turn.commands || [];
    record('subject_execution_evidence', requested, commands.length ? 'observed' : 'unverified', {commands_count: commands.length, limitation: 'Review the actual commands/results for requested tests and claimed checks. Evaluator black-box success does not prove subject execution.'});
  }
  const objective = checks.filter(c => !['subject_execution_evidence'].includes(c.id));
  return {schema_version: 1, case_id: task.id, deterministic_status: objective.some(c => c.status === 'fail') ? 'fail' : objective.some(c => c.status === 'unverified') ? 'unverified' : 'pass', semantic_status: 'requires_blinded_review', checks};
}

if (require.main === module) {
  const [caseFile, captureFile, output] = process.argv.slice(2);
  assert(caseFile && captureFile, 'Use node checks.cjs CASE.json CAPTURED-TURNS.json [OUTPUT.json]');
  const parse = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
  const result = checkCase(parse(caseFile), parse(captureFile));
  const content = JSON.stringify(result, null, 2) + '\n';
  if (output) fs.writeFileSync(output, content, {flag: 'wx'});
  else process.stdout.write(content);
  if (result.deterministic_status === 'fail') process.exitCode = 1;
}
module.exports = {checkCase, check: checkCase, fileFromCapture};
