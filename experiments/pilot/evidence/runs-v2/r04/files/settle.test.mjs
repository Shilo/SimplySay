import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { prepareBatch } from './settle.mjs';

const claim = (id, status = 'approved', receipt_present = true, amount_cents = 10) => ({ id, status, receipt_present, amount_cents });
const expected = {
  approved: [{ id: 'R-101', amount_cents: 7250 }, { id: 'R-105', amount_cents: 3999 }],
  needs_review: [{ id: 'R-102', reason: 'pending_approval' }, { id: 'R-103', reason: 'missing_receipt' }],
  excluded: ['R-104'], total_cents: 11249,
};

test('supplied batch', () => {
  assert.deepEqual(prepareBatch(JSON.parse(readFileSync(new URL('./input.json', import.meta.url), 'utf8'))), expected);
});
test('empty array', () => {
  assert.deepEqual(prepareBatch([]), { approved: [], needs_review: [], excluded: [], total_cents: 0 });
});
test('routing, order, zero amounts, and no mutation', () => {
  const input = [claim('p1', 'pending', false), claim('d1', 'denied', false), claim('a1', 'approved', true, 0), claim('m1', 'approved', false), claim('d2', 'denied'), claim('p2', 'pending'), claim('a2')];
  const before = structuredClone(input);
  assert.deepEqual(prepareBatch(input), {
    approved: [{ id: 'a1', amount_cents: 0 }, { id: 'a2', amount_cents: 10 }],
    needs_review: [{ id: 'p1', reason: 'pending_approval' }, { id: 'm1', reason: 'missing_receipt' }, { id: 'p2', reason: 'pending_approval' }],
    excluded: ['d1', 'd2'], total_cents: 10,
  });
  assert.deepEqual(input, before);
});
test('rejects invalid containers and records, including denied records', () => {
  for (const value of [null, {}, 'claims', 3]) assert.throws(() => prepareBatch(value), /array/);
  const invalid = [null, [], 'record', {}, ...['', '  ', 1, null].map(id => ({ ...claim('x'), id })),
    { ...claim('x'), status: 'paid' }, { ...claim('x'), receipt_present: 1 },
    { ...claim('x'), receipt_present: 'true' },
    ...[-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '10', null].map(amount_cents => ({ ...claim('x'), amount_cents })),
    { ...claim('x', 'denied'), amount_cents: -1 }];
  for (const record of invalid) assert.throws(() => prepareBatch([claim('good'), record]), /Claim 2:/);
  for (const field of ['id', 'status', 'receipt_present', 'amount_cents']) {
    const record = claim('x'); delete record[field];
    assert.throws(() => prepareBatch([record]));
  }
  assert.throws(() => prepareBatch([claim('x'), claim('x', 'denied')]), /duplicate/);
  assert.throws(() => prepareBatch(new Array(1)), /object/);
});
test('safe integer boundary and aggregate overflow', () => {
  assert.equal(prepareBatch([claim('x', 'approved', true, Number.MAX_SAFE_INTEGER)]).total_cents, Number.MAX_SAFE_INTEGER);
  assert.throws(() => prepareBatch([claim('x', 'approved', true, Number.MAX_SAFE_INTEGER), claim('y')]), /total/);
});
const run = (...args) => spawnSync(process.execPath, args, { cwd: new URL('.', import.meta.url), encoding: 'utf8' });
test('command emits only result JSON', () => {
  const result = run('settle.mjs', 'input.json');
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  assert.deepEqual(JSON.parse(result.stdout), expected);
});
test('command failures use stderr and nonzero exit', () => {
  for (const args of [[], ['missing-file.json'], ['settle.mjs'], ['input.json', 'extra']]) {
    const result = run('settle.mjs', ...args);
    assert.notEqual(result.status, 0);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, /Error:/);
  }
});
test('import does not execute command', () => {
  const result = run('--input-type=module', '-e', "import { prepareBatch } from './settle.mjs'; if (typeof prepareBatch !== 'function') process.exit(2);");
  assert.equal(result.status, 0);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, '');
});
test('command rejects malformed JSON and invalid claims', () => {
  const dir = mkdtempSync(new URL('./settle-fixture-', import.meta.url));
  try {
    const path = `${dir}/invalid.json`;
    for (const contents of ['{', JSON.stringify([claim('x'), claim('x')]), '{}']) {
      writeFileSync(path, contents);
      const result = run('settle.mjs', path);
      assert.notEqual(result.status, 0);
      assert.equal(result.stdout, '');
      assert.match(result.stderr, /Error:/);
    }
  } finally {
    rmSync(dir, { recursive: true });
  }
});
