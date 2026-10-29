import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { prepareBatch } from './settle.mjs';

const script = fileURLToPath(new URL('./settle.mjs', import.meta.url));
const input = fileURLToPath(new URL('./input.json', import.meta.url));
const expected = {
  approved: [{ id: 'R-101', amount_cents: 7250 }, { id: 'R-105', amount_cents: 3999 }],
  needs_review: [{ id: 'R-102', reason: 'pending_approval' }, { id: 'R-103', reason: 'missing_receipt' }],
  excluded: ['R-104'], total_cents: 11249,
};
const claim = (id, status = 'approved', receipt_present = true, amount_cents = 100) =>
  ({ id, status, receipt_present, amount_cents });
const run = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });

test('supplied batch and no mutation', () => {
  const claims = JSON.parse(readFileSync(input, 'utf8'));
  const before = structuredClone(claims);
  assert.deepEqual(prepareBatch(claims), expected);
  assert.deepEqual(claims, before);
});

test('empty array', () => {
  assert.deepEqual(prepareBatch([]), { approved: [], needs_review: [], excluded: [], total_cents: 0 });
});

test('all routes preserve input order, including pending and denied without receipts', () => {
  assert.deepEqual(prepareBatch([
    claim('d2', 'denied', false), claim('p2', 'pending', false), claim('a2', 'approved', true, 0),
    claim('r2', 'approved', false), claim('d1', 'denied'), claim('a1'), claim('p1', 'pending'),
  ]), {
    approved: [{ id: 'a2', amount_cents: 0 }, { id: 'a1', amount_cents: 100 }],
    needs_review: [{ id: 'p2', reason: 'pending_approval' }, { id: 'r2', reason: 'missing_receipt' }, { id: 'p1', reason: 'pending_approval' }],
    excluded: ['d2', 'd1'], total_cents: 100,
  });
});

test('reject malformed containers and records', () => {
  for (const value of [null, {}, 'claims', 1]) assert.throws(() => prepareBatch(value), /array/);
  for (const value of [null, [], 'claim', 1, true, {}]) {
    assert.throws(() => prepareBatch([claim('valid'), value]), /index 1/);
  }
});

test('reject invalid fields and duplicates rather than skipping records', () => {
  const patches = [
    { id: '' }, { id: '  ' }, { id: 1 }, { id: undefined },
    { status: 'unknown' }, { status: undefined },
    { receipt_present: 1 }, { receipt_present: 'true' }, { receipt_present: undefined },
    ...[-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '100', undefined].map(amount_cents => ({ amount_cents })),
  ];
  for (const patch of patches) assert.throws(() => prepareBatch([{ ...claim('bad'), ...patch }]), /index 0/);
  assert.throws(() => prepareBatch([claim('same'), claim('same', 'denied')]), /duplicate id/);
  assert.throws(() => prepareBatch([claim('bad', 'denied', false, -1)]), /amount_cents/);
});

test('safe integer boundary and total overflow', () => {
  assert.equal(prepareBatch([claim('max', 'approved', true, Number.MAX_SAFE_INTEGER)]).total_cents, Number.MAX_SAFE_INTEGER);
  assert.throws(() => prepareBatch([claim('max', 'approved', true, Number.MAX_SAFE_INTEGER), claim('extra')]), /total exceeds/);
});

test('CLI emits only result JSON on success', () => {
  const result = run(input);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  assert.deepEqual(JSON.parse(result.stdout), expected);
});

test('CLI errors are unsuccessful, understandable, and stderr-only', () => {
  const directory = mkdtempSync(new URL('./settle-test-', import.meta.url));
  try {
    const badJson = join(directory, 'syntax.json');
    const badClaim = join(directory, 'record.json');
    writeFileSync(badJson, '{');
    writeFileSync(badClaim, JSON.stringify([claim('bad', 'unknown')]));
    for (const args of [[], [badJson], [badClaim], [join(directory, 'missing.json')], [input, input]]) {
      const result = run(...args);
      assert.notEqual(result.status, 0);
      assert.equal(result.stdout, '');
      assert.match(result.stderr, /Error: .+/);
    }
    assert.match(run(badClaim).stderr, /unknown status/);
  } finally {
    rmSync(directory, { recursive: true });
  }
});

test('import has no command side effects', () => {
  const result = spawnSync(process.execPath, ['--input-type=module', '-e',
    `process.argv[1] = 'input.json'; await import(${JSON.stringify(new URL('./settle.mjs', import.meta.url).href)});`], { encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, '');
});
