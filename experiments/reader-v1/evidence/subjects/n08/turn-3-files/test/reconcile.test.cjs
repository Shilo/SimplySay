'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { reconcile } = require('../lib/reconcile.cjs');

const inputPath = path.join(__dirname, '../data/work-orders.json');
const fixture = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const expectedFixture = [
  { record_id: 'W-9', revision: 12, title: 'Paint benches', status: 'assigned', owner: 'Cy' },
  { record_id: 'W-3', revision: 2, title: 'Repair rail', status: 'assigned', owner: 'Eli' },
  { record_id: 'W-5', revision: 0, title: 'Clear path', status: 'open', owner: 'Dee' },
];

test('one row survives with every field preserved', () => {
  const row = { record_id: 'W-1', revision: 0, title: 'Check door', owner: 'Ari' };
  assert.deepEqual(reconcile([row]), [row]);
});

test('empty input returns an empty array', () => {
  assert.deepEqual(reconcile([]), []);
});

test('distinct work orders with identical titles survive', () => {
  const rows = [
    { record_id: 'W-9', revision: 2, title: 'Paint benches', owner: 'Ari' },
    { record_id: 'W-3', revision: 1, title: 'Paint benches', owner: 'Bo' },
  ];
  assert.deepEqual(reconcile(rows), rows);
});

test('the highest numeric revision wins regardless of encounter order', () => {
  const latest = { record_id: 'W-1', revision: 12, title: 'Check door', owner: 'Cy' };
  const older = [
    { record_id: 'W-1', revision: 0, title: 'Check door', owner: 'Dee' },
    { record_id: 'W-1', revision: 2, title: 'Check door', owner: 'Ari' },
    { record_id: 'W-1', revision: 9, title: 'Check door', owner: 'Bo' },
  ];
  for (const rows of [
    [...older, latest],
    [latest, ...older],
    [older[0], latest, ...older.slice(1)],
  ]) {
    assert.deepEqual(reconcile(rows), [latest]);
  }
});

test('equal revisions keep the first row, including after a higher revision wins', () => {
  const first = { record_id: 'W-1', revision: 2, title: 'First', owner: 'Ari' };
  const tied = { record_id: 'W-1', revision: 2, title: 'Second', owner: 'Bo' };
  assert.deepEqual(reconcile([first, tied]), [first]);

  const latest = { record_id: 'W-1', revision: 12, title: 'Latest', owner: 'Cy' };
  const latestTie = { ...latest, owner: 'Dee', status: 'closed' };
  assert.deepEqual(reconcile([first, latest, latestTie, tied]), [latest]);
});

test('distinct IDs retain first-appearance order when titles and winning rows change', () => {
  const rows = [
    { record_id: 'W-9', revision: 0, title: 'Zulu' },
    { record_id: 'W-3', revision: 0, title: 'Alpha' },
    { record_id: 'W-5', revision: 0, title: 'Middle' },
    { record_id: 'W-3', revision: 2, title: 'Renamed' },
    { record_id: 'W-9', revision: 1, title: 'Last update' },
  ];
  assert.deepEqual(reconcile(rows), [rows[4], rows[3], rows[2]]);
});

test('the winner is a complete row without fields carried over from older rows', () => {
  const older = {
    record_id: 'W-1', revision: 0, title: 'Old title', status: 'open', obsolete: true,
  };
  const latest = { record_id: 'W-1', revision: 1, owner: 'Cy', extra: null };
  assert.deepEqual(reconcile([older, latest]), [latest]);
});

test('reconciliation leaves the input array and all input rows unchanged', () => {
  const rows = [
    { record_id: 'W-9', revision: 2, title: 'Zulu', owner: 'Ari' },
    { record_id: 'W-3', revision: 0, title: 'Alpha', owner: 'Bo' },
    { record_id: 'W-9', revision: 12, title: 'Renamed', owner: 'Cy' },
  ];
  const before = rows.map(row => ({ ...row }));
  const references = rows.slice();
  rows.forEach(Object.freeze);
  Object.freeze(rows);

  const result = reconcile(rows);

  assert.deepEqual(result, [before[2], before[1]]);
  assert.deepEqual(rows, before);
  references.forEach((row, index) => assert.strictEqual(rows[index], row));
});

test('valid boundary revisions, literal IDs, and arbitrary other fields are accepted', () => {
  const rows = [
    { record_id: ' ', revision: 0, title: 17, owner: false },
    { record_id: 'W-1', revision: 0, title: null },
    { record_id: 'w-1', revision: 0, status: null },
    { record_id: ' W-1 ', revision: -0, custom: 'preserved' },
    { record_id: '__proto__', revision: 0 },
    { record_id: 'constructor', revision: 0 },
    { record_id: 'W-1', revision: Number.MAX_SAFE_INTEGER, extra: 42 },
  ];
  assert.deepEqual(reconcile(rows), [
    rows[0], rows[6], rows[2], rows[3], rows[4], rows[5],
  ]);
});

test('non-array inputs throw TypeError', () => {
  for (const input of [undefined, null, {}, 'rows', 1, true, new Set()]) {
    assert.throws(() => reconcile(input), TypeError);
  }
});

test('non-object rows throw TypeError', () => {
  const functionRow = Object.assign(() => {}, { record_id: 'W-1', revision: 0 });
  const arrayRow = Object.assign([], { record_id: 'W-1', revision: 0 });
  for (const row of [undefined, null, 'row', 1, true, Symbol('row'), functionRow, arrayRow]) {
    assert.throws(() => reconcile([row]), TypeError);
  }
  assert.throws(() => reconcile(new Array(1)), TypeError);
});

test('missing, empty, and non-string record IDs throw TypeError', () => {
  for (const record_id of [undefined, null, '', 0, 1, true, {}, [], Symbol('id')]) {
    assert.throws(() => reconcile([{ record_id, revision: 0 }]), TypeError);
  }
  assert.throws(() => reconcile([{ revision: 0 }]), TypeError);
});

test('invalid revisions throw TypeError even on rows that would lose the merge', () => {
  const valid = { record_id: 'W-1', revision: Number.MAX_SAFE_INTEGER, title: 'Check door' };
  const invalidRevisions = [
    undefined, null, '12', '', true, {}, [], 12n, Symbol('revision'),
    -1, 0.5, NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1,
  ];
  for (const revision of invalidRevisions) {
    const row = { ...valid, revision };
    assert.throws(() => reconcile([row]), TypeError);
    assert.throws(() => reconcile([valid, row]), TypeError);
    assert.throws(() => reconcile([row, valid]), TypeError);
  }
  assert.throws(() => reconcile([{ record_id: 'W-1' }]), TypeError);
});

test('the supplied work orders retain all IDs with the latest owners and revisions', () => {
  assert.deepEqual(reconcile(fixture), expectedFixture);
});

test('CLI prints the reconciled JSON array followed by a newline', () => {
  const result = spawnSync(process.execPath, [
    path.join(__dirname, '../bin/reconcile.cjs'), inputPath,
  ], { encoding: 'utf8' });

  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  assert.equal(result.stdout, JSON.stringify(expectedFixture, null, 2) + '\n');
});

test('CLI rejects missing arguments and reports validation errors without printing JSON', () => {
  const cliPath = path.join(__dirname, '../bin/reconcile.cjs');
  const missingArgument = spawnSync(process.execPath, [cliPath], { encoding: 'utf8' });
  assert.ifError(missingArgument.error);
  assert.equal(missingArgument.status, 1);
  assert.equal(missingArgument.stdout, '');
  assert.match(missingArgument.stderr, /Use node bin\/reconcile\.cjs INPUT\.json/);

  // package.json is an existing valid JSON object, so it exercises non-array validation.
  const invalidInput = spawnSync(process.execPath, [
    cliPath, path.join(__dirname, '../package.json'),
  ], { encoding: 'utf8' });
  assert.ifError(invalidInput.error);
  assert.equal(invalidInput.status, 1);
  assert.equal(invalidInput.stdout, '');
  assert.ok(invalidInput.stderr.trim());
});
