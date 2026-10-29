import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareBatch } from './settle.mjs';

const script = fileURLToPath(new URL('./settle.mjs', import.meta.url));
const input = fileURLToPath(new URL('./input.json', import.meta.url));
const expected = {
  approved: [{ id: 'R-101', amount_cents: 7250 }, { id: 'R-105', amount_cents: 3999 }],
  needs_review: [{ id: 'R-102', reason: 'pending_approval' }, { id: 'R-103', reason: 'missing_receipt' }],
  excluded: ['R-104'], total_cents: 11249,
};
const claim = (id, status = 'approved', receipt_present = true, amount_cents = 10) =>
  ({ id, status, receipt_present, amount_cents });

test('supplied batch produces the exact result without mutating input', () => {
  const claims = JSON.parse(readFileSync(input, 'utf8'));
  const before = structuredClone(claims);
  assert.deepEqual(prepareBatch(claims), expected);
  assert.deepEqual(claims, before);
});

test('empty array is valid', () => {
  assert.deepEqual(prepareBatch([]), { approved: [], needs_review: [], excluded: [], total_cents: 0 });
});

test('all routing branches preserve order and accept zero amounts', () => {
  assert.deepEqual(prepareBatch([
    claim('d1', 'denied', false), claim('p1', 'pending', false), claim('a1', 'approved', true, 0),
    claim('m1', 'approved', false), claim('d2', 'denied', true),
    claim('a2', 'approved', true, 7), claim('p2', 'pending', true),
  ]), {
    approved: [{ id: 'a1', amount_cents: 0 }, { id: 'a2', amount_cents: 7 }],
    needs_review: [{ id: 'p1', reason: 'pending_approval' }, { id: 'm1', reason: 'missing_receipt' },
      { id: 'p2', reason: 'pending_approval' }],
    excluded: ['d1', 'd2'], total_cents: 7,
  });
});

test('rejects malformed containers and records, including missing fields', () => {
  for (const value of [null, {}, 'claims', 1]) assert.throws(() => prepareBatch(value), /array/);
  for (const value of [null, [], 'claim', 1, {}]) assert.throws(() => prepareBatch([value]), /Claim 1/);
  for (const field of ['id', 'status', 'receipt_present', 'amount_cents']) {
    const value = claim('x');
    delete value[field];
    assert.throws(() => prepareBatch([value]), /Claim 1/);
  }
});

test('rejects empty or duplicate IDs, unknown statuses, and nonboolean receipts', () => {
  for (const id of ['', '  ', 4, null]) assert.throws(() => prepareBatch([claim(id)]), /id/);
  assert.throws(() => prepareBatch([claim('x'), claim('x', 'denied')]), /duplicate id/);
  for (const status of ['APPROVED', 'other', null]) assert.throws(() => prepareBatch([claim('x', status)]), /status/);
  for (const receipt of [0, 1, 'true', null]) assert.throws(() => prepareBatch([claim('x', 'denied', receipt)]), /boolean/);
});

test('validates amounts on every status and prevents unsafe totals', () => {
  for (const status of ['approved', 'pending', 'denied']) {
    for (const amount of [-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '10', null]) {
      assert.throws(() => prepareBatch([claim('x', status, true, amount)]), /amount_cents/);
    }
  }
  assert.equal(prepareBatch([claim('x', 'approved', true, Number.MAX_SAFE_INTEGER)]).total_cents, Number.MAX_SAFE_INTEGER);
  assert.throws(() => prepareBatch([claim('x', 'approved', true, Number.MAX_SAFE_INTEGER), claim('y')]), /total/);
});

test('CLI outputs only the result JSON; importing does not run CLI', () => {
  const run = spawnSync(process.execPath, [script, input], { encoding: 'utf8' });
  assert.equal(run.status, 0);
  assert.equal(run.stderr, '');
  assert.deepEqual(JSON.parse(run.stdout), expected);
  const imported = spawnSync(process.execPath, ['--input-type=module', '-e',
    `import { prepareBatch } from ${JSON.stringify(new URL('./settle.mjs', import.meta.url).href)}; if (typeof prepareBatch !== 'function') process.exit(2);`], { encoding: 'utf8' });
  assert.equal(imported.status, 0);
  assert.equal(imported.stdout, '');
  assert.equal(imported.stderr, '');
});

test('CLI fails clearly without success output for invalid JSON, records, usage, and missing files', () => {
  const dir = mkdtempSync(new URL('./.settle-test-', import.meta.url));
  try {
    const path = join(dir, 'invalid.json');
    for (const text of ['{', '{}', JSON.stringify([claim('x', 'unknown')])]) {
      writeFileSync(path, text);
      const run = spawnSync(process.execPath, [script, path], { encoding: 'utf8' });
      assert.equal(run.status, 1);
      assert.equal(run.stdout, '');
      assert.match(run.stderr, /Batch error:/);
    }
    for (const args of [[], [join(dir, 'missing.json')], [input, input]]) {
      const run = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
      assert.equal(run.status, 1);
      assert.equal(run.stdout, '');
      assert.match(run.stderr, /Batch error:/);
    }
  } finally {
    rmSync(dir, { recursive: true });
  }
});
