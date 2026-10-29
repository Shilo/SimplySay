'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { reconcile } = require('../lib/reconcile.cjs');

test('one row survives as a complete copy', () => {
  const row = { record_id: 'W-1', revision: 0, title: 'Check door', owner: 'Ari' };
  const result = reconcile([row]);
  assert.deepEqual(result, [row]);
  assert.notStrictEqual(result[0], row);
});

test('empty input returns a new empty array', () => {
  const rows = [];
  const result = reconcile(rows);
  assert.deepEqual(result, []);
  assert.notStrictEqual(result, rows);
});

test('distinct IDs survive shared titles in their first appearance order', () => {
  const rows = [
    { record_id: 'W-9', revision: 2, title: 'Paint benches' },
    { record_id: 'W-3', revision: 1, title: 'Paint benches' },
    { record_id: 'W-5', revision: 0, title: 'Clear path' }
  ];
  assert.deepEqual(reconcile(rows), rows);
});

test('highest numeric revision wins even when an older revision arrives last', () => {
  const rows = [
    { record_id: 'W-1', revision: 2, title: 'Check door', owner: 'Ari' },
    { record_id: 'W-1', revision: 12, title: 'Check door', owner: 'Bo' },
    { record_id: 'W-1', revision: 9, title: 'Check door', owner: 'Cy' },
    { record_id: 'W-1', revision: 1, title: 'Check door', owner: 'Dee' }
  ];
  assert.deepEqual(reconcile(rows), [rows[1]]);
});

test('updates keep ID order and replace the entire row, including a changed title', () => {
  const rows = [
    { record_id: 'W-9', revision: 1, title: 'Paint benches', oldOnly: true, owner: 'Ari' },
    { record_id: 'W-3', revision: 0, title: 'Clear path' },
    { record_id: 'W-9', revision: 12, title: 'Repair rail', status: 'assigned', extra: null }
  ];
  assert.deepEqual(reconcile(rows), [
    { record_id: 'W-9', revision: 12, title: 'Repair rail', status: 'assigned', extra: null },
    { record_id: 'W-3', revision: 0, title: 'Clear path' }
  ]);
});

test('equal revisions retain the first row at the winning revision', () => {
  const rows = [
    { record_id: 'W-1', revision: 0, title: 'Initial', owner: 'Ari' },
    { record_id: 'W-1', revision: 0, title: 'Initial tie', owner: 'Bo' },
    { record_id: 'W-1', revision: 12, title: 'Winner', owner: 'Cy' },
    { record_id: 'W-1', revision: 12, title: 'Later tie', owner: 'Dee' }
  ];
  assert.deepEqual(reconcile(rows.slice(0, 2)), [rows[0]]);
  assert.deepEqual(reconcile(rows), [rows[2]]);
});

test('frozen inputs stay unchanged and output rows can be changed independently', () => {
  const rows = [
    { record_id: 'W-2', revision: 0, title: 'Old', oldOnly: true },
    { record_id: 'W-1', revision: 0, title: 'Unchanged', owner: 'Bo' },
    { record_id: 'W-2', revision: 1, title: 'New', owner: 'Cy' }
  ];
  const snapshot = structuredClone(rows);
  rows.forEach(Object.freeze);
  Object.freeze(rows);

  const result = reconcile(rows);
  assert.deepEqual(rows, snapshot);
  assert.deepEqual(result, [snapshot[2], snapshot[1]]);
  assert.notStrictEqual(result[0], rows[2]);
  assert.notStrictEqual(result[1], rows[1]);
  result[0].owner = 'Changed';
  result[1].title = 'Changed';
  result.reverse();
  assert.deepEqual(rows, snapshot);
});

test('revision zero and the largest safe integer are valid numeric boundaries', () => {
  const rows = [
    { record_id: 'W-1', revision: 0 },
    { record_id: 'W-1', revision: Number.MAX_SAFE_INTEGER },
    { record_id: 'W-1', revision: Number.MAX_SAFE_INTEGER - 1 },
    { record_id: 'W-2', revision: 0 }
  ];
  assert.deepEqual(reconcile(rows), [rows[1], rows[3]]);
});

test('IDs are exact nonempty strings, including whitespace and object property names', () => {
  const rows = [
    { record_id: '__proto__', revision: 0 },
    { record_id: 'constructor', revision: 0 },
    { record_id: ' ', revision: 0 },
    { record_id: 'W-1', revision: 0 },
    { record_id: 'w-1', revision: 0 },
    { record_id: ' W-1 ', revision: 0 },
    { record_id: '__proto__', revision: 1 }
  ];
  assert.deepEqual(reconcile(rows), [rows[6], ...rows.slice(1, 6)]);
});

test('other fields are copied without requiring or validating title, status or owner', () => {
  const rows = [
    { record_id: 'W-1', revision: 0, title: null, status: 17, owner: false, custom: undefined },
    { record_id: 'W-2', revision: 0 },
    JSON.parse('{"record_id":"W-3","revision":0,"__proto__":"ordinary field"}')
  ];
  assert.deepEqual(reconcile(rows), rows);
});

test('non-array inputs throw TypeError', () => {
  for (const input of [undefined, null, {}, 'rows', 1, true, new Set(), () => {}]) {
    assert.throws(() => reconcile(input), TypeError);
  }
});

test('non-object rows, arrays and sparse rows throw TypeError', () => {
  const arrayRow = Object.assign([], { record_id: 'W-1', revision: 0 });
  for (const row of [null, undefined, false, 1, 'row', 1n, Symbol('row'), () => {}, arrayRow]) {
    assert.throws(() => reconcile([row]), TypeError);
  }
  assert.throws(() => reconcile(new Array(1)), TypeError);
});

test('missing, empty and non-string IDs throw TypeError', () => {
  for (const record_id of [undefined, null, '', 0, 1, false, {}, [], new String('W-1')]) {
    assert.throws(() => reconcile([{ record_id, revision: 0 }]), TypeError);
  }
  assert.throws(() => reconcile([{ revision: 0 }]), TypeError);
});

test('missing, negative, fractional, unsafe and nonnumeric revisions throw TypeError', () => {
  const revisions = [
    undefined, null, -1, 0.5, Number.MAX_SAFE_INTEGER + 1,
    NaN, Infinity, -Infinity, '12', '', true, 1n, {}, [], new Number(1), Symbol('revision')
  ];
  for (const revision of revisions) {
    assert.throws(() => reconcile([{ record_id: 'W-1', revision }]), TypeError);
  }
  assert.throws(() => reconcile([{ record_id: 'W-1' }]), TypeError);
});

test('invalid rows throw even after a valid winner for the same ID', () => {
  const winner = Object.freeze({ record_id: 'W-1', revision: 12, title: 'Winner' });
  for (const row of [
    { record_id: 'W-1', revision: '2' },
    { record_id: 'W-1', revision: -1 },
    { record_id: '', revision: 0 },
    null
  ]) {
    assert.throws(() => reconcile([winner, row]), TypeError);
  }
});

const projectRoot = path.resolve(__dirname, '..');
const fixturePath = path.join(projectRoot, 'data', 'work-orders.json');
const expectedFixture = [
  { record_id: 'W-9', revision: 12, title: 'Paint benches', status: 'assigned', owner: 'Cy' },
  { record_id: 'W-3', revision: 2, title: 'Repair rail', status: 'assigned', owner: 'Eli' },
  { record_id: 'W-5', revision: 0, title: 'Clear path', status: 'open', owner: 'Dee' }
];

test('supplied work orders retain all three IDs and their current complete rows', () => {
  const rows = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  assert.deepEqual(reconcile(rows), expectedFixture);
});

test('CLI accepts the input path and prints the expected JSON array followed by a newline', () => {
  const result = spawnSync(process.execPath, ['bin/reconcile.cjs', fixturePath], {
    cwd: projectRoot,
    encoding: 'utf8'
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, '');
  assert.ok(result.stdout.endsWith('\n'));
  assert.deepEqual(JSON.parse(result.stdout), expectedFixture);
});
