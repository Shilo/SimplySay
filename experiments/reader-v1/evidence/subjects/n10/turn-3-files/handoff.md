# Work-order reconciliation handoff

The local repair implements [CONTRACT.md](CONTRACT.md) in `lib/reconcile.cjs`. The CLI remains `node bin/reconcile.cjs INPUT.json`, with the same row shape and a JSON array followed by a newline. No dependencies were added; implementation and tests use built-in Node modules only. See also [the maintainer guide](docs/maintainer.md).

## Repaired behavior

The previous merger grouped by title, compared revisions as strings using `<`, and sorted the result by title. This could discard different IDs with a shared title, return a renamed ID twice, retain stale revisions, and reorder the output.

- Identity is the exact, nonempty `record_id` string. Shared or changed titles do not affect identity.
- For each ID, the highest numeric revision wins. Revisions must be nonnegative safe integers; numeric strings are rejected.
- Equal revisions keep the first encountered row at that revision. An older revision arriving later cannot replace a newer row.
- The complete winning row is copied. Old fields omitted by the winner disappear; fields are not combined across revisions.
- Distinct IDs remain in their first appearance order. Replacing an existing Map value preserves that position.
- The result is a new array of shallow row copies. The input array and rows are not mutated; empty input returns an empty array.
- Non-array input, invalid rows (including null and arrays), invalid IDs and invalid revisions throw `TypeError`. Every row is validated, even one that would lose. Other fields receive no additional validation.

For example, W-9 and W-3 both survive the title `Paint benches`. W-9 revision 12 replaces W-9 revision 2 as a whole row but retains W-9's original output position.

## Checks actually run

The following commands were run successfully during the repair from the project root, using installed Node v25.0.0:

```sh
node --version
npm test
node --check lib/reconcile.cjs
node --check bin/reconcile.cjs
node --check test/reconcile.test.cjs
node bin/reconcile.cjs data/work-orders.json
```

`npm test` ran 17 tests: all passed, with no failures or skips. The syntax checks passed. The CLI printed these complete rows in this order:

| record_id | revision | title | status | owner |
| --- | --- | --- | --- | --- |
| W-9 | 12 | Paint benches | assigned | Cy |
| W-3 | 2 | Repair rail | assigned | Eli |
| W-5 | 0 | Clear path | open | Dee |

The tests in `test/reconcile.test.cjs` assert row contents and order, not just counts. They cover shared and changed titles, numeric revisions `2, 12, 9, 1`, ties, whole-row replacement, frozen inputs and independent output copies, empty input, revision boundaries, invalid inputs, unrestricted extra fields, the supplied fixture and the CLI's trailing newline. They catch grouping by title, either direction of string revision comparison, blending fields, replacing on ties, and sorting or moving updated IDs.

SHA-256 comparisons against the values recorded before editing confirmed that the supplied input, contract and original note remain unchanged:

| File | SHA-256 |
| --- | --- |
| `data/work-orders.json` | `06D9C5E2D2555B7ACA774B84F4E1C69B87B729592EC4FE2DC66A8FE5A94B96C4` |
| `CONTRACT.md` | `0AF89C88BAC5002DD5642043F87FB48593717E9F7A8307E20C5A107431E7A53E` |
| `original-note.md` | `09DCFD5D52CB51259269C851B985FAB5B26A9F6BA72A9C802EB45C6983DD6170` |

To reproduce the hash listing using only Node:

```sh
node -e "const fs = require('node:fs'); const crypto = require('node:crypto'); for (const file of ['data/work-orders.json', 'CONTRACT.md', 'original-note.md', 'handoff/original-note.md']) console.log(file + ': ' + crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase());"
```

The intake note was copied without decoding or rewriting it to [handoff/original-note.md](handoff/original-note.md). A byte-for-byte comparison passed; both note files have the SHA-256 shown above. This comparison was also run and can be repeated:

```sh
node -e "const fs = require('node:fs'); require('node:assert/strict').deepEqual(fs.readFileSync('handoff/original-note.md'), fs.readFileSync('original-note.md')); console.log('Intake-note copy matches byte for byte');"
```

## Remaining limits

All verification was local. No external service was accessed, no live import was performed, and no live records or downstream import behavior were checked. Passing these tests does not establish that a live import succeeds or confirm the cause of the original report in a live system. The archived intake note remains the original report, not a rewritten diagnosis.

The contract covers flat rows, so output copies are shallow. Owner, status, title and other extra fields are copied without business-rule validation. Equal-revision conflicts intentionally depend on encounter order; they are not resolved using timestamps or field contents. Testing used the supplied fixture and synthetic regression cases on Node v25.0.0; other datasets, runtime versions and production-scale performance have not been verified.

The next operational check is an import in the intended environment, comparing IDs, revisions and complete row contents and checking the persisted result. That check remains outstanding and was outside this local repair. Preserve the supplied data, contract and both copies of the intake note when maintaining this repair.
