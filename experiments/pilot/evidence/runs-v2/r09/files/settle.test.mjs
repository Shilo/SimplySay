import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { prepareBatch } from './settle.mjs';

const script = fileURLToPath(new URL('./settle.mjs', import.meta.url));
const input = fileURLToPath(new URL('./input.json', import.meta.url));
const claim = (id, status = 'approved', receipt_present = true, amount_cents = 10) =>
  ({ id, status, receipt_present, amount_cents });
const expected = {
  approved: [{ id: 'R-101', amount_cents: 7250 }, { id: 'R-105', amount_cents: 3999 }],
  needs_review: [{ id: 'R-102', reason: 'pending_approval' }, { id: 'R-103', reason: 'missing_receipt' }],
  excluded: ['R-104'], total_cents: 11249,
};

test('supplied batch', () => {
  const claims = JSON.parse(readFileSync(input, 'utf8'));
  const before = structuredClone(claims);
  assert.deepEqual(prepareBatch(claims), expected);
  assert.deepEqual(claims, before);
});
test('empty input', () => {
  assert.deepEqual(prepareBatch([]), { approved: [], needs_review: [], excluded: [], total_cents: 0 });
});
test('routing, receipt precedence, zero amount, and order in every list', () => {
  assert.deepEqual(prepareBatch([
    claim('d1', 'denied', false), claim('p1', 'pending', false), claim('a1', 'approved', true, 0),
    claim('m1', 'approved', false), claim('d2', 'denied'), claim('a2'), claim('p2', 'pending'),
  ]), {
    approved: [{ id: 'a1', amount_cents: 0 }, { id: 'a2', amount_cents: 10 }],
    needs_review: [{ id: 'p1', reason: 'pending_approval' }, { id: 'm1', reason: 'missing_receipt' }, { id: 'p2', reason: 'pending_approval' }],
    excluded: ['d1', 'd2'], total_cents: 10,
  });
});
test('reject invalid containers, malformed records, fields, and duplicate IDs', () => {
  for (const value of [null, {}, 'claims', 1]) assert.throws(() => prepareBatch(value), /array/);
  for (const value of [null, [], 'bad', 4, {}]) assert.throws(() => prepareBatch([value]), /Claim 1/);
  for (const id of ['', '  ', null, 1, undefined]) {
    assert.throws(() => prepareBatch([{ ...claim('x'), id }]), /id/);
  }
  assert.throws(() => prepareBatch([claim('x'), claim('x')]), /duplicate/);
  for (const status of ['paid', 'Approved', '', null, undefined]) {
    assert.throws(() => prepareBatch([{ ...claim('x'), status }]), /status/);
  }
  for (const receipt_present of [0, 1, 'true', null, undefined]) {
    assert.throws(() => prepareBatch([{ ...claim('x'), receipt_present }]), /boolean/);
  }
  for (const amount_cents of [-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '10', null, undefined]) {
    assert.throws(() => prepareBatch([{ ...claim('x'), amount_cents }]), /safe integer/);
  }
  assert.throws(() => prepareBatch([claim('ok'), { ...claim('bad', 'denied'), amount_cents: -1 }]), /Claim 2/);
  assert.equal(prepareBatch([claim('max', 'approved', true, Number.MAX_SAFE_INTEGER)]).total_cents, Number.MAX_SAFE_INTEGER);
  assert.throws(() => prepareBatch([claim('max', 'approved', true, Number.MAX_SAFE_INTEGER), claim('extra')]), /total/);
});
test('CLI emits only batch JSON on success', () => {
  const run = spawnSync(process.execPath, [script, input], { encoding: 'utf8' });
  assert.equal(run.status, 0);
  assert.equal(run.stderr, '');
  assert.equal(run.stdout, `${JSON.stringify(expected)}\n`);
});
test('CLI rejects invalid JSON, invalid claims, missing files, and wrong arguments', () => {
  const dir = mkdtempSync(join(tmpdir(), 'settle-test-'));
  try {
    const bad = join(dir, 'bad.json');
    for (const contents of ['{', '[{"id":"bad"}]']) {
      writeFileSync(bad, contents);
      const run = spawnSync(process.execPath, [script, bad], { encoding: 'utf8' });
      assert.equal(run.status, 1);
      assert.equal(run.stdout, '');
      assert.match(run.stderr, /Cannot prepare batch:/);
    }
    for (const args of [[], [join(dir, 'missing.json')], [input, input]]) {
      const run = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
      assert.equal(run.status, 1);
      assert.equal(run.stdout, '');
      assert.match(run.stderr, /Cannot prepare batch:/);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test('import has no command side effects', () => {
  const run = spawnSync(process.execPath, ['--input-type=module', '-e',
    `import { prepareBatch } from ${JSON.stringify(new URL('./settle.mjs', import.meta.url).href)}; if (typeof prepareBatch !== 'function') process.exit(2);`], { encoding: 'utf8' });
  assert.equal(run.status, 0);
  assert.equal(run.stdout, '');
  assert.equal(run.stderr, '');
});
