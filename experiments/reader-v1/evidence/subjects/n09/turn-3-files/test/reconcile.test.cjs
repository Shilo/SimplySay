'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { reconcile } = require('../lib/reconcile.cjs');

const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'bin', 'reconcile.cjs');
const input = path.join(root, 'data', 'work-orders.json');
const expectedFixture = [
  { record_id: 'W-9', revision: 12, title: 'Paint benches', status: 'assigned', owner: 'Cy' },
  { record_id: 'W-3', revision: 2, title: 'Repair rail', status: 'assigned', owner: 'Eli' },
  { record_id: 'W-5', revision: 0, title: 'Clear path', status: 'open', owner: 'Dee' },
];

test('a single row keeps all fields and is copied', () => {
  const row = { record_id: 'W-1', revision: 0, title: 'Check door', owner: 'Ari' };
  const result = reconcile([row]);
  assert.deepEqual(result, [row]);
  assert.notStrictEqual(result[0], row);
});

test('empty input returns a fresh empty array', () => {
  const rows = [];
  const result = reconcile(rows);
  assert.deepEqual(result, []);
  assert.notStrictEqual(result, rows);
});

test('different IDs with the same title both survive', () => {
  const rows = [
    { record_id: 'W-9', revision: 2, title: 'Paint benches' },
    { record_id: 'W-3', revision: 1, title: 'Paint benches' },
  ];
  assert.deepEqual(reconcile(rows), rows);
});

test('the highest numeric revision wins even across digit lengths and out-of-order updates', () => {
  const rows = [2, 12, 9, 100, 99, Number.MAX_SAFE_INTEGER, 0].map(revision => ({
    record_id: 'W-1', revision, title: 'Check door', owner: `Owner at ${revision}`,
  }));
  assert.deepEqual(reconcile(rows), [rows[5]]);
});

test('equal revisions retain the first encountered row, including after an upgrade', () => {
  const first = { record_id: 'W-1', revision: 0, title: 'Check door', owner: 'Ari' };
  const equal = { ...first, owner: 'Bo' };
  assert.deepEqual(reconcile([first, equal]), [first]);

  const upgraded = { ...first, revision: 12, owner: 'Cy' };
  const equalUpgrade = { ...upgraded, title: 'Renamed door', owner: 'Dee' };
  assert.deepEqual(reconcile([first, upgraded, equalUpgrade]), [upgraded]);
});

test('distinct IDs keep first-appearance order when later winners change titles', () => {
  const rows = [
    { record_id: 'W-9', revision: 1, title: 'Zebra' },
    { record_id: 'W-3', revision: 2, title: 'Apple' },
    { record_id: 'W-5', revision: 0, title: 'Middle' },
    { record_id: 'W-3', revision: 12, title: 'Zulu' },
    { record_id: 'W-9', revision: 3, title: 'Banana' },
  ];
  assert.deepEqual(reconcile(rows), [rows[4], rows[3], rows[2]]);
});

test('the winning row replaces the whole row without carrying forward stale fields', () => {
  const old = { record_id: 'W-1', revision: 1, title: 'Old title', owner: 'Ari', oldOnly: true };
  const winner = { record_id: 'W-1', revision: 12, title: 'New title', status: 'assigned', newOnly: 7 };
  assert.deepEqual(reconcile([old, winner, old]), [winner]);
});

test('frozen inputs remain unchanged and returned rows can be edited independently', () => {
  const old = Object.freeze({ record_id: 'W-1', revision: 1, title: 'Check door', owner: 'Ari' });
  const winner = Object.freeze({ ...old, revision: 12, owner: 'Cy' });
  const other = Object.freeze({ record_id: 'W-2', revision: 0, title: 'Check roof' });
  const rows = Object.freeze([old, other, winner]);
  const before = JSON.stringify(rows);
  const result = reconcile(rows);
  assert.deepEqual(result, [winner, other]);
  assert.notStrictEqual(result, rows);
  assert.notStrictEqual(result[0], winner);
  assert.notStrictEqual(result[1], other);
  result[0].owner = 'Edited';
  result[1].title = 'Edited';
  result.reverse();
  assert.equal(JSON.stringify(rows), before);
});

test('IDs are exact strings and other fields have no added validation policy', () => {
  const rows = ['W-1', 'w-1', ' W-1 ', ' ', '__proto__', 'constructor'].map(record_id => ({
    record_id, revision: 0, status: null, owner: false, extra: 42,
  }));
  rows[0].title = 123;
  rows[1].title = null;
  assert.deepEqual(reconcile(rows), rows);
});

test('non-array inputs throw TypeError', () => {
  for (const value of [undefined, null, {}, 'rows', 1, true, new Set()]) {
    assert.throws(() => reconcile(value), TypeError);
  }
});

test('invalid rows throw TypeError, including array rows and sparse entries', () => {
  const arrayRow = Object.assign([], { record_id: 'W-1', revision: 0 });
  for (const row of [null, undefined, false, 1, 'row', () => {}, [], arrayRow]) {
    assert.throws(() => reconcile([row]), TypeError);
  }
  assert.throws(() => reconcile(new Array(1)), TypeError);
});

test('missing, empty, and non-string IDs throw TypeError', () => {
  for (const record_id of [undefined, null, '', 0, 1, false, {}, [], new String('W-1')]) {
    assert.throws(() => reconcile([{ record_id, revision: 0 }]), TypeError);
  }
  assert.throws(() => reconcile([{ revision: 0 }]), TypeError);
});

test('missing, negative, fractional, unsafe, and nonnumeric revisions throw TypeError', () => {
  const invalid = [
    undefined, null, -1, -0.5, 0.5, NaN, Infinity, -Infinity,
    Number.MAX_SAFE_INTEGER + 1, '12', '', true, {}, [], 12n, new Number(12),
  ];
  for (const revision of invalid) {
    assert.throws(() => reconcile([{ record_id: 'W-1', revision }]), TypeError);
  }
  assert.throws(() => reconcile([{ record_id: 'W-1' }]), TypeError);
});

test('every row is validated even when it cannot replace an existing winner', () => {
  const winner = { record_id: 'W-1', revision: 12, title: 'Check door' };
  for (const revision of [-1, '2', undefined]) {
    assert.throws(() => reconcile([winner, { ...winner, revision }]), TypeError);
  }
  assert.throws(() => reconcile([winner, null]), TypeError);
});

test('the supplied fixture retains all three IDs with the latest complete rows', () => {
  const rows = JSON.parse(fs.readFileSync(input, 'utf8'));
  assert.deepEqual(reconcile(rows), expectedFixture);
});

test('the CLI prints the reconciled JSON array followed by one newline', () => {
  const result = spawnSync(process.execPath, [cli, input], { encoding: 'utf8', cwd: root });
  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  assert.equal(result.stdout, JSON.stringify(expectedFixture, null, 2) + '\n');
});

test('the CLI retains usage errors and rejects non-array JSON without printing rows', () => {
  for (const args of [[], [input, input], [path.join(root, 'package.json')]]) {
    const result = spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', cwd: root });
    assert.ifError(result.error);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.notEqual(result.stderr.trim(), '');
    if (args.length !== 1) {
      assert.equal(result.stderr.trim(), 'Use node bin/reconcile.cjs INPUT.json');
    }
  }
});
