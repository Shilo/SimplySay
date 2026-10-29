'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {checkCase} = require('./checks.cjs');
function temporary(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ss-offline-case-check-'));
  try { return fn(dir); }
  finally {
    const resolved = path.resolve(dir);
    assert(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep));
    assert(path.basename(resolved).startsWith('ss-offline-case-check-'));
    fs.rmSync(resolved, {recursive: true, force: true});
  }
}
const task = () => ({id: 'synthetic', turns: [{id: 't1'}, {id: 't2'}], fixture_files: [{path: 'source.txt', content: 'A\r\nB\n'}], expected_files: [{path: 'copy.txt', first_required_after_turn: 't1', kind: 'exact_fixture_copy', equals_fixture: 'source.txt'}], objective: {}});
test('raw-byte copy passes and newline normalization fails', () => temporary(dir => {
  fs.writeFileSync(path.join(dir, 'copy.txt'), 'A\r\nB\n');
  const c = task(); c.turns.pop();
  assert.equal(checkCase(c, [{id: 't1', files_dir: dir}]).deterministic_status, 'pass');
  fs.writeFileSync(path.join(dir, 'copy.txt'), 'A\nB\n');
  assert.equal(checkCase(c, [{id: 't1', files_dir: dir}]).deterministic_status, 'fail');
}));
test('later artifact cannot repair first-turn omission', () => temporary(dir => {
  const first = path.join(dir, 'first'), second = path.join(dir, 'second');
  fs.mkdirSync(first); fs.mkdirSync(second); fs.writeFileSync(path.join(second, 'copy.txt'), 'A\r\nB\n');
  const checked = checkCase(task(), [{turn: 1, files_dir: first}, {turn: 2, files_dir: second}]);
  assert(checked.checks.some(c => c.turn_id === 't1' && c.id === 'file:copy.txt' && c.status === 'fail'));
}));
test('missing snapshot and decoded-text-only copies remain unverified', () => {
  const c = task(); c.turns.pop();
  assert.equal(checkCase(c, [{id: 't1', snapshot_observed: false}]).deterministic_status, 'unverified');
  assert.equal(checkCase(c, [{id: 't1', files: {'copy.txt': 'A\r\nB\n'}}]).deterministic_status, 'unverified');
  assert.equal(checkCase(c, []).deterministic_status, 'unverified');
});
test('JSON booleans cannot be replaced with numbers', () => {
  const c = {id: 'j', turns: [{id: 't1'}], expected_files: [{path: 's.json', first_required_after_turn: 't1', kind: 'json', expected_json: {ready: false}, exact_keys: true}]};
  assert.equal(checkCase(c, [{id: 't1', files: {'s.json': '{"ready":0}'}}]).deterministic_status, 'fail');
  assert.equal(checkCase(c, [{id: 't1', files: {'s.json': '{"ready":false}'}}]).deterministic_status, 'pass');
});
test('black-box probe executes actual captured code and does not imply subject tests', () => temporary(dir => {
  const c = {id: 'code', turns: [{id: 't1'}], objective: {code_probes: [{id: 'api', first_required_after_turn: 't1', source: "require('node:assert/strict').equal(require(require('node:path').resolve('api.cjs')).answer(),42)"}]}};
  fs.writeFileSync(path.join(dir, 'api.cjs'), 'exports.answer=()=>41;');
  assert.equal(checkCase(c, [{id: 't1', files_dir: dir}]).deterministic_status, 'fail');
  fs.writeFileSync(path.join(dir, 'api.cjs'), 'exports.answer=()=>42;');
  const good = checkCase(c, [{id: 't1', files_dir: dir}]);
  assert.equal(good.deterministic_status, 'pass');
  assert.equal(good.checks.find(x => x.id === 'subject_execution_evidence').status, 'unverified');
  assert.equal(checkCase(c, [{id: 't1', files_dir: dir}], {execute: false}).deterministic_status, 'unverified');
}));
test('untouched smoke tests do not count as added regression coverage', () => temporary(dir => {
  fs.writeFileSync(path.join(dir, 'test.cjs'), '// original\n');
  const c = {id: 'tests', turns: [{id: 't1'}], fixture_files: [{path: 'test.cjs', content: '// original\n'}], objective: {changed_test_files: [{path: 'test.cjs', first_required_after_turn: 't1'}]}};
  assert.equal(checkCase(c, [{id: 't1', files_dir: dir}]).deterministic_status, 'fail');
}));
