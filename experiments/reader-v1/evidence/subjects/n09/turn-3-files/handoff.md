# Work-order reconciliation handoff

Prepared on 2026-10-29. [CONTRACT.md](CONTRACT.md) defines the required behavior. The repair is in [lib/reconcile.cjs](lib/reconcile.cjs), regression coverage is in [test/reconcile.test.cjs](test/reconcile.test.cjs), and ongoing maintenance notes are in [docs/maintainer.md](docs/maintainer.md).

## Repaired behavior

The previous merger grouped rows by title, selected smaller revisions using string comparison, and sorted output by title. Distinct work orders could overwrite one another when titles matched, and revision selection could retain stale rows.

The repaired `reconcile(rows)` follows these rules:

- A work order is identified by its exact `record_id`; different IDs survive even when titles match. IDs are not trimmed or normalized.
- For each ID, the highest numeric `revision` wins. An equal revision keeps the first encountered row at that revision.
- The complete winning row is copied. Earlier fields are not merged into it, and no fields are added. An earlier-only field is absent from the output if the winner omits it.
- Distinct IDs remain in first-appearance order. Updating a value in the Map does not move its ID, so later winners and title changes do not reorder output.
- The input array and rows are not mutated. Empty input returns a fresh empty array.

Non-array input, non-object rows (including null and arrays), empty or non-string IDs, and invalid revisions throw `TypeError`. Revisions must be nonnegative safe integers: whole numbers from 0 through `Number.MAX_SAFE_INTEGER`. Every row is validated, including rows that would lose to an existing winner. Other fields have no added validation policy.

The CLI remains `node bin/reconcile.cjs INPUT.json`. Success prints the reconciled JSON array followed by a newline. Errors go to stderr with exit status 1. The interface and row shape are unchanged, and the implementation and tests use built-in Node modules only.

## Reproducible checks actually run

These commands were run from the project root in Windows PowerShell with Node v25.0.0 and npm 11.16.0. All exited with status 0. `npm.cmd` invokes the installed npm command on Windows.

```powershell
node --version
npm.cmd --version
npm.cmd test
node --check lib/reconcile.cjs
node --check bin/reconcile.cjs
node --check test/reconcile.test.cjs
node bin/reconcile.cjs data/work-orders.json
```

The test suite passed all 17 tests, with zero failures or skips. It checks shared titles, numeric revision comparisons across digit lengths and out-of-order updates, equal revisions, first-appearance order, complete-row replacement, input immutability, independent output rows, validation, and the supplied fixture. CLI tests assert the exact JSON output and final newline, usage errors, and rejection of non-array JSON. During the repair, the expanded suite failed 14 tests against the old implementation; the original single-row smoke test had passed.

All three syntax checks passed. The fixture CLI printed these three complete rows, in this order:

| record_id | revision | title | status | owner |
| --- | --- | --- | --- | --- |
| W-9 | 12 | Paint benches | assigned | Cy |
| W-3 | 2 | Repair rail | assigned | Eli |
| W-5 | 0 | Clear path | open | Dee |

## Input and archive integrity

[handoff/original-note.md](handoff/original-note.md) is an exact byte-for-byte copy of the original intake note, including its line endings. The source note, contract, and supplied input data remain unchanged. Their SHA-256 hashes match those recorded before the repair.

The following integrity check was also run successfully from the project root. It verifies the original hashes and compares the archived note directly with the source bytes:

```powershell
@'
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createHash } = require('node:crypto');
const expected = {
  'CONTRACT.md': '0AF89C88BAC5002DD5642043F87FB48593717E9F7A8307E20C5A107431E7A53E',
  'original-note.md': '09DCFD5D52CB51259269C851B985FAB5B26A9F6BA72A9C802EB45C6983DD6170',
  'data/work-orders.json': '06D9C5E2D2555B7ACA774B84F4E1C69B87B729592EC4FE2DC66A8FE5A94B96C4',
};
for (const [file, hash] of Object.entries(expected)) {
  assert.equal(createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase(), hash, file);
}
assert.deepEqual(fs.readFileSync('handoff/original-note.md'), fs.readFileSync('original-note.md'));
console.log('Protected input hashes match the pre-repair originals; intake-note copy is byte-for-byte identical.');
'@ | node
```

## Remaining limits

- Verification covers the local module, CLI, tests, and supplied fixture. No external service was accessed and no live import was performed. These results do not establish that a destination system accepts the output or that previously missing or stale work orders have been corrected there.
- The intake note records reported symptoms. Its archived copy preserves that report; local findings do not verify what happened during an earlier live import.
- The contract covers flat rows. Output rows are shallow copies; nested-object isolation is not promised or tested. Owner, status, title, and other fields are copied without business-rule validation. Invalid input fails reconciliation rather than producing a partial result.
- Execution was checked on the Node and npm versions above. Compatibility with other runtime versions, large-input performance, and destination import behavior were not tested.

Before reporting a successful live fix, a maintainer still needs to verify the destination's imported IDs, revisions, and complete row fields against the expected reconciliation output.
