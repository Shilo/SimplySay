# Work-order reconciliation handoff

Prepared on 2026-10-29. The repair and verification are local to this project.
The governing behavior is in [CONTRACT.md](CONTRACT.md); the implementation is
in [lib/reconcile.cjs](lib/reconcile.cjs), with regression coverage in
[test/reconcile.test.cjs](test/reconcile.test.cjs). See also
[docs/maintainer.md](docs/maintainer.md).

## Repaired behavior

The previous implementation grouped by title, chose the lexicographically
smallest revision string, and sorted output by title. This could drop distinct
work orders sharing a title, return a renamed order twice, and retain an older
revision. These are findings about the local implementation, not a verified
explanation of events in a live system.

- Work orders are grouped by the literal `record_id`. Different IDs survive even
  when titles match; changing a title does not create another work order.
- Each ID keeps its highest numeric `revision`. Among rows tied at that highest
  revision, the first encountered row wins.
- The complete winning row is copied. Fields from older rows are not retained
  when absent from the winner. Other row fields have no added validation policy.
- Output follows the order in which distinct IDs first appeared. Updating an
  existing Map entry preserves its position; output is not sorted by title.
- The input array and rows are not mutated. Empty input returns an empty array.
- Invalid input throws `TypeError`: non-array input, null/non-object/array rows,
  empty/non-string IDs, or revisions that are not nonnegative safe integers.
  All rows are validated, including rows that would lose the merge. IDs are not
  trimmed or normalized; revision strings are not coerced to numbers.

The module still exports `reconcile(rows)`. The CLI remains
`node bin/reconcile.cjs INPUT.json` and prints the reconciled JSON array followed
by a newline. The row shape is unchanged, and only built-in Node modules are
used. The CLI itself was not changed for the repair.

## Checks actually run

These checks were rerun for this handoff on Windows PowerShell with Node.js
`v25.0.0` and npm `11.16.0`. Run the commands from the project root:

```powershell
node --version
npm --version
npm test
node --check lib/reconcile.cjs
node --check bin/reconcile.cjs
node --check test/reconcile.test.cjs
node bin/reconcile.cjs data/work-orders.json
```

All commands exited successfully. `npm test` reported 16 tests passed, 0 failed,
with no skipped or cancelled tests. Each syntax check exited with code 0. The
CLI printed these complete winning rows in this order:

| record_id | revision | title | status | owner |
| --- | --- | --- | --- | --- |
| W-9 | 12 | Paint benches | assigned | Cy |
| W-3 | 2 | Repair rail | assigned | Eli |
| W-5 | 0 | Clear path | open | Dee |

The tests assert exact rows and ordering, not just row counts. Coverage includes
shared titles, revisions 0/2/9/12 in multiple encounter orders, equal revisions,
renamed titles, complete replacement without old fields, frozen input arrays and
rows, empty input, valid boundaries and invalid inputs, and the supplied fixture.
CLI tests check exact JSON output and its trailing newline, as well as missing
arguments and non-array JSON input producing an error with no JSON on stdout.

## Preserved inputs and intake copy

The supplied `data/work-orders.json`, `CONTRACT.md`, and `original-note.md` remain
unchanged. [handoff/original-note.md](handoff/original-note.md) is a byte-for-byte
copy of the original intake note, preserving its wording and line endings.
The note is the original report of symptoms, not a statement that a live import
has been verified.

This byte comparison was run successfully and printed
`Intake note copy matches byte for byte`:

```powershell
node -e "const assert = require('node:assert/strict'); const fs = require('node:fs'); assert.deepEqual(fs.readFileSync('handoff/original-note.md'), fs.readFileSync('original-note.md')); console.log('Intake note copy matches byte for byte');"
```

SHA-256 hashes were also checked against the values recorded before the repair.
Reproduce the hash listing with:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath CONTRACT.md, original-note.md, data/work-orders.json, handoff/original-note.md | Format-Table -Property Hash, Path -Wrap
```

| File | Verified SHA-256 |
| --- | --- |
| `CONTRACT.md` | `0AF89C88BAC5002DD5642043F87FB48593717E9F7A8307E20C5A107431E7A53E` |
| `original-note.md` | `09DCFD5D52CB51259269C851B985FAB5B26A9F6BA72A9C802EB45C6983DD6170` |
| `data/work-orders.json` | `06D9C5E2D2555B7ACA774B84F4E1C69B87B729592EC4FE2DC66A8FE5A94B96C4` |
| `handoff/original-note.md` | `09DCFD5D52CB51259269C851B985FAB5B26A9F6BA72A9C802EB45C6983DD6170` |

## Remaining limits

All evidence comes from the local regression suite, supplied fixture, and CLI
checks. No external service was used, no deployment or live import was
performed, and no live records or staff-facing results were checked. The repair
does not establish that previously missing work orders have been restored in
any live system. A future live-import check would need to compare the imported
IDs, revisions, and complete winning fields with the expected output.

Only the runtime versions listed above were exercised. Production datasets,
large-input performance, and downstream integration behavior were not tested.
The module follows the supplied revision values; it does not independently
establish whether those values or other work-order fields are correct.

## Staff message draft

This message is provided for copying and has not been sent:

> We repaired the local work-order merger so separate work orders with the same
> title are kept by their IDs. Updates now keep the complete row with the highest
> numeric revision; equal revisions keep the first row received, and the original
> order of work-order IDs stays stable. All 16 local tests passed, and the supplied
> sample produced the expected work orders and owners. The supplied input data
> and original intake note are unchanged. No live import has been performed or
> verified, so we have not confirmed that missing work orders are restored or that
> owners and statuses are correct in the live system.
