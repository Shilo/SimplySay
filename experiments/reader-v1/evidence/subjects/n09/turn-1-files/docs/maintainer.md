# Maintainer notes

The previous merger keyed rows by title, so different work orders with matching titles overwrote one another. It also selected smaller revisions using string comparison and sorted the results by title. Those behaviors violated CONTRACT.md and could retain stale owners or statuses.

The merger now keys rows by the exact `record_id` and selects the highest numeric `revision`. Equal revisions keep the first encountered row. A Map preserves the order in which distinct IDs first appeared, including when a later row wins. Each output row is a copy of the complete winning row; fields from earlier revisions are not carried forward. The input array and rows are not modified.

`reconcile(rows)` throws `TypeError` for non-array input, non-object rows (including null and arrays), empty or non-string IDs, and revisions that are not nonnegative safe integers. Every row is validated, including losing revisions. Other fields are copied without extra validation; titles need not be unique or present, and IDs are not trimmed or normalized.

Run these checks from the project root using Node and built-in modules only:

```sh
npm test
node --check lib/reconcile.cjs
node --check bin/reconcile.cjs
node --check test/reconcile.test.cjs
node bin/reconcile.cjs data/work-orders.json
```

The 17 regression tests cover shared titles, numeric revision ordering, ties, first-appearance order, whole-row replacement, input immutability, copied output rows, validation, and the supplied fixture. CLI tests check the complete JSON output and its trailing newline, usage errors, and rejection of non-array JSON. Before the repair, 14 of these tests failed; after the repair, all 17 pass.

The supplied fixture produces three rows in this order:

| record_id | revision | title | owner |
| --- | --- | --- | --- |
| W-9 | 12 | Paint benches | Cy |
| W-3 | 2 | Repair rail | Eli |
| W-5 | 0 | Clear path | Dee |

The CLI remains `node bin/reconcile.cjs INPUT.json` and prints the reconciled JSON array followed by a newline. Failures print an error to stderr and exit with status 1. No row fields are added. The supplied data, CONTRACT.md, and original-note.md remain unchanged.

These checks verify local behavior only. No live import has been performed or verified.
