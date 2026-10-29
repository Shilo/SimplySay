# Maintainer notes

The merger previously keyed rows by title, so different work orders sharing a title could overwrite each other and a renamed order could appear twice. It compared revisions as strings with `<`, which could retain stale rows, and sorted by title rather than preserving the first appearance of each ID. The original single-row smoke test did not exercise these cases.

`reconcile(rows)` now follows [the contract](../CONTRACT.md):

- Identify work orders by the exact `record_id` string. Shared or changed titles do not affect identity.
- Keep the complete row with the highest numeric revision, retaining the first encountered row when revisions tie. Fields omitted by the winner do not carry over from older rows.
- Return IDs in their first appearance order. Updating an existing Map value preserves that position.
- Return a new array of shallow row copies without modifying the input array or rows. The contract describes flat rows; no deep copying is needed.
- Throw `TypeError` for non-array input, invalid rows (including null and arrays), missing/empty/non-string IDs, or revisions that are not nonnegative safe integers. Validate every row, including updates that would lose. Other fields have no additional validation; a title is not required.

Use installed Node and built-in modules only; no dependency installation is needed. Run these checks from the project root:

```sh
npm test
node --check lib/reconcile.cjs
node --check bin/reconcile.cjs
node --check test/reconcile.test.cjs
node bin/reconcile.cjs data/work-orders.json
```

The regression suite in `test/reconcile.test.cjs` covers shared and changed titles, numeric revisions (including 2, 9, 12 and the safe-integer boundary), older updates arriving last, ties, stable ordering, complete-row replacement, frozen inputs and independent output copies, empty input, validation, unrestricted extra fields, the supplied fixture and the CLI's JSON output with a trailing newline.

For the unchanged supplied data, the expected output order and winners are:

| record_id | revision | title | status | owner |
| --- | --- | --- | --- | --- |
| W-9 | 12 | Paint benches | assigned | Cy |
| W-3 | 2 | Repair rail | assigned | Eli |
| W-5 | 0 | Clear path | open | Dee |

The CLI remains `node bin/reconcile.cjs INPUT.json` and prints the reconciled JSON array followed by a newline. Its row shape is unchanged. Keep `data/work-orders.json`, `CONTRACT.md` and `original-note.md` unchanged. These local checks do not establish a successful live import; no live import has been checked.
