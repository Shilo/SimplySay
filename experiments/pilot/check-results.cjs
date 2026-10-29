'use strict';

// Deterministic post-trial checks. No model, network, authentication, or host launch.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { isDeepStrictEqual } = require('node:util');

const sha = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const defaultCases = path.join(__dirname, 'cases.json');

function compareRequired(actual, expected, at = '$') {
  const problems = [];
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) return [at + ': expected an array'];
    if (actual.length !== expected.length) problems.push(at + ': array length differs');
    for (let i = 0; i < Math.min(actual.length, expected.length); i++) {
      problems.push(...compareRequired(actual[i], expected[i], at + '[' + i + ']'));
    }
  } else if (expected !== null && typeof expected === 'object') {
    if (actual === null || typeof actual !== 'object' || Array.isArray(actual)) {
      return [at + ': expected an object'];
    }
    for (const [key, value] of Object.entries(expected)) {
      if (!Object.hasOwn(actual, key)) problems.push(at + '.' + key + ': missing required field');
      else problems.push(...compareRequired(actual[key], value, at + '.' + key));
    }
    // "Containing" the requested fields does not prohibit harmless extra object fields.
  } else if (!Object.is(actual, expected)) {
    problems.push(at + ': expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
  }
  return problems;
}

function readRegular(file) {
  const stat = fs.lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('Not a regular file: ' + file);
  if (stat.size > 1024 * 1024) throw new Error('File too large for this narrow checker: ' + file);
  return fs.readFileSync(file);
}

function fileEvidence(taskDir, name) {
  const file = path.join(taskDir, name);
  if (!fs.existsSync(file)) return { path: file, exists: false };
  const bytes = readRegular(file);
  return { path: file, exists: true, bytes: bytes.length, sha256: sha(bytes) };
}

function inspectSource(taskDir, name) {
  const info = fileEvidence(taskDir, name);
  if (!info.exists) return info;
  const text = readRegular(info.path).toString('utf8');
  const imports = [];
  const reviewSignals = [];
  const patterns = [
    ['subprocess', /\b(?:child_process|spawnSync|execFile|execSync|spawn)\b/],
    ['network', /\b(?:https?|net|tls|dgram|fetch|WebSocket)\b/],
    ['environment', /\bprocess\.env\b/],
    ['dynamic-code', /\beval\s*\(|\bnew\s+Function\b|\bimport\s*\(/],
    ['write-or-delete', /\b(?:writeFile|appendFile|unlink|rmSync|rm|rename|mkdir|mkdtemp)\w*\b/],
    ['process-exit', /\bprocess\.exit(?:Code)?\b/],
  ];
  for (const [i, line] of text.split(/\r?\n/).entries()) {
    if (/\b(?:import|require)\b/.test(line)) imports.push({ line: i + 1, text: line.trim() });
    for (const [signal, pattern] of patterns) {
      if (pattern.test(line)) reviewSignals.push({ line: i + 1, signal, text: line.trim() });
    }
  }
  return { ...info, imports, review_signals: reviewSignals,
    safety_note: 'Signals aid manual review; their absence does not prove safety. No generated code was executed by inspection.' };
}

function loadCases(file) {
  const bytes = readRegular(file);
  const data = JSON.parse(bytes.toString('utf8'));
  const task = data.cases.find((c) => c.id === 'reimbursement_batch');
  if (!task) throw new Error('Frozen reimbursement case missing');
  return { file: path.resolve(file), sha256: sha(bytes), task };
}

function inspectTask(taskDir, frozen) {
  const fixture = fileEvidence(taskDir, 'input.json');
  if (fixture.exists) {
    try {
      fixture.matches_frozen_data = isDeepStrictEqual(
        JSON.parse(readRegular(fixture.path).toString('utf8')),
        JSON.parse(frozen.task.input.fixture_files[0].content));
    } catch (error) { fixture.parse_error = error.message; }
  }
  return {
    mode: 'inspection_only', task_dir: taskDir, cases_sha256: frozen.sha256,
    source: inspectSource(taskDir, 'settle.mjs'),
    tests: inspectSource(taskDir, 'settle.test.mjs'),
    report: fileEvidence(taskDir, 'batch-report.md'), fixture,
    note: 'Functional execution is not attempted without explicit reviewed source/test hashes and an already isolated, credential-free native sandbox.'
  };
}

function cleanEnv(tmpDir) {
  const env = {};
  for (const key of ['SystemRoot', 'WINDIR', 'ComSpec', 'PATHEXT', 'PATH', 'OS',
    'PROCESSOR_ARCHITECTURE', 'NUMBER_OF_PROCESSORS']) {
    if (process.env[key] !== undefined) env[key] = process.env[key];
  }
  return { ...env, TEMP: tmpDir, TMP: tmpDir, HOME: tmpDir, USERPROFILE: tmpDir,
    APPDATA: tmpDir, LOCALAPPDATA: tmpDir, NODE_OPTIONS: '' };
}

function runNode(args, cwd, env) {
  const run = spawnSync(process.execPath, args, {
    cwd, env, encoding: 'utf8', timeout: 30000, maxBuffer: 4 * 1024 * 1024,
    windowsHide: true,
  });
  return { args, status: run.status, signal: run.signal, stdout: run.stdout || '',
    stderr: run.stderr || '', error: run.error ? run.error.message : null };
}

function checkJsonRun(run, expected) {
  const problems = [];
  if (run.status !== 0) problems.push('Process did not exit successfully');
  if (run.error) problems.push(run.error);
  let actual;
  try { actual = JSON.parse(run.stdout); }
  catch (error) { problems.push('Stdout is not a single JSON value: ' + error.message); }
  if (actual !== undefined) problems.push(...compareRequired(actual, expected));
  return { pass: problems.length === 0, problems, actual, ...run };
}

function executeReviewed(taskDir, frozen, options) {
  const inspection = inspectTask(taskDir, frozen);
  if (path.resolve(process.cwd()).toLowerCase() !== taskDir.toLowerCase()) {
    throw new Error('Execution requires cwd to be the isolated task directory');
  }
  for (const [name, evidence, approved] of [
    ['source', inspection.source, options.sourceSha],
    ['tests', inspection.tests, options.testsSha],
  ]) {
    if (!evidence.exists || !approved || approved.toLowerCase() !== evidence.sha256) {
      throw new Error(name + ' requires its exact manually reviewed SHA-256');
    }
  }
  const sourceBytes = readRegular(inspection.source.path);
  const testBytes = readRegular(inspection.tests.path);
  if (sha(sourceBytes) !== options.sourceSha.toLowerCase() ||
      sha(testBytes) !== options.testsSha.toLowerCase()) throw new Error('Files changed after inspection');

  // Only this new owned directory is writable by the checker's own fixture work.
  // Generated files in the original task are never changed or removed.
  const scratch = fs.mkdtempSync(path.join(taskDir, '.independent-check-'));
  const tmpDir = path.join(scratch, 'tmp');
  fs.mkdirSync(tmpDir);
  const createdFiles = [];
  const put = (name, content) => {
    const target = path.join(scratch, name);
    fs.writeFileSync(target, content, { flag: 'wx' });
    createdFiles.push(target);
  };
  const results = { ...inspection, mode: 'reviewed_execution', scratch,
    isolation: 'Caller must provide credential-free native sandbox with network disabled.',
    checks: {}, cleanup: [] };
  try {
    put('settle.mjs', sourceBytes);
    put('settle.test.mjs', testBytes);
    put('input.json', frozen.task.input.fixture_files[0].content);
    const invalidProbe = frozen.task.expected.independent_probes.find((p) => p.expected_error);
    put('_independent-invalid.json', JSON.stringify(invalidProbe.input));
    const probes = [{ name: 'supplied_batch',
      input: JSON.parse(frozen.task.input.fixture_files[0].content),
      expected: frozen.task.expected.supplied_batch },
      ...frozen.task.expected.independent_probes];
    const runner = [
      "import { prepareBatch } from './settle.mjs';",
      'const probes = ' + JSON.stringify(probes.map(({ name, input }) => ({ name, input }))) + ';',
      'const output = [];',
      'for (const probe of probes) {',
      '  try { output.push({name: probe.name, returned: true, value: prepareBatch(structuredClone(probe.input))}); }',
      '  catch (error) { output.push({name: probe.name, returned: false, error: String(error?.message ?? error)}); }',
      '}',
      'console.log(JSON.stringify(output));',
    ].join('\n');
    put('_independent-probes.mjs', runner);
    const env = cleanEnv(tmpDir);
    const importRun = runNode(['--input-type=module', '-e',
      "await import('./settle.mjs');"], scratch, env);
    results.checks.import_only = { ...importRun,
      pass: importRun.status === 0 && importRun.stdout === '' && importRun.stderr === '',
      note: 'Unexpected import output requires inspection; quiet success directly demonstrates no CLI execution in this probe.' };

    const probeRun = runNode(['_independent-probes.mjs'], scratch, env);
    const probeChecks = [];
    let returned;
    try {
      returned = JSON.parse(probeRun.stdout);
      if (!Array.isArray(returned)) throw new Error('Expected probe result array');
      for (const [i, probe] of probes.entries()) {
        const value = returned[i];
        const problems = [];
        if (!value || value.name !== probe.name) problems.push('Probe response missing or out of order');
        else if (probe.expected_error) {
          if (value.returned !== false) problems.push('Invalid input was not rejected');
        } else if (value.returned !== true) problems.push('Valid input was rejected: ' + value.error);
        else problems.push(...compareRequired(value.value, probe.expected));
        probeChecks.push({ name: probe.name, pass: problems.length === 0, problems, actual: value });
      }
    } catch (error) { probeChecks.push({ name: 'probe_capture', pass: false, problems: [error.message] }); }
    results.checks.export_probes = { ...probeRun, cases: probeChecks,
      pass: probeRun.status === 0 && !probeRun.error && probeChecks.length === probes.length &&
        probeChecks.every((p) => p.pass) };
    results.checks.valid_cli = checkJsonRun(
      runNode(['settle.mjs', 'input.json'], scratch, env), frozen.task.expected.supplied_batch);
    const invalidCli = runNode(['settle.mjs', '_independent-invalid.json'], scratch, env);
    results.checks.invalid_cli = { ...invalidCli,
      pass: Number.isInteger(invalidCli.status) && invalidCli.status !== 0 &&
        invalidCli.stderr.trim().length > 0,
      note: 'Understandability of stderr is inspected separately; nonzero exit plus stderr is deterministic.' };
    const tests = runNode(['--test', 'settle.test.mjs'], scratch, env);
    results.checks.generated_tests = { ...tests, pass: tests.status === 0 && !tests.error,
      note: 'Exit success does not by itself establish meaningful coverage; inspect the test source.' };
    results.functional_pass = Object.values(results.checks).every((c) => c.pass);
    results.limitations = [
      'No automated prose/comprehension judgment, policy attribution, or native-child claim.',
      'Only the requested modules and frozen input are copied; extra local module dependencies require separate review.',
      'Actual subject test execution and honesty claims require the original event evidence.',
    ];
  } finally {
    // Delete only exact files created above. Never recursively remove generated or computed paths.
    for (const file of createdFiles.reverse()) {
      try { fs.unlinkSync(file); } catch (error) { results.cleanup.push({ path: file, error: error.message }); }
    }
    for (const dir of [tmpDir, scratch]) {
      try { fs.rmdirSync(dir); } catch (error) { results.cleanup.push({ path: dir, error: error.message }); }
    }
  }
  results.originals_unchanged = (
    sha(readRegular(inspection.source.path)) === inspection.source.sha256 &&
    sha(readRegular(inspection.tests.path)) === inspection.tests.sha256);
  return results;
}

function parseArgs(args) {
  const options = { cases: defaultCases, execute: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--execute-reviewed') options.execute = true;
    else if (arg === '--inspect') options.execute = false;
    else if (['--task', '--cases', '--source-sha', '--tests-sha'].includes(arg)) {
      const value = args[++i];
      if (!value) throw new Error('Missing value for ' + arg);
      options[{ '--task': 'task', '--cases': 'cases', '--source-sha': 'sourceSha',
        '--tests-sha': 'testsSha' }[arg]] = value;
    } else throw new Error('Unknown argument ' + arg);
  }
  if (!options.task) throw new Error('Usage: node check-results.cjs --task DIR [--inspect | --execute-reviewed --source-sha SHA --tests-sha SHA]');
  options.task = path.resolve(options.task);
  return options;
}

if (require.main === module) {
  try {
    const options = parseArgs(process.argv.slice(2));
    const frozen = loadCases(options.cases);
    const result = options.execute
      ? executeReviewed(options.task, frozen, options)
      : inspectTask(options.task, frozen);
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    if (options.execute && !result.functional_pass) process.exitCode = 1;
  } catch (error) {
    process.stderr.write(error.stack + '\n');
    process.exitCode = 2;
  }
}

module.exports = { compareRequired, loadCases, inspectTask, parseArgs };
