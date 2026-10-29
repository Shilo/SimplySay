# Maintainer notes

The local merger grouped rows by title, so separate work orders with the same
title could disappear and a renamed order could appear twice. It also selected
the lexicographically smallest revision string and sorted output by title.
These behaviors violated CONTRACT.md; the original intake note remains a report
of symptoms rather than evidence of a live import.

`lib/reconcile.cjs` now groups by the literal `record_id` and selects the highest
numeric `revision`. Equal revisions keep the first encountered row. The Map
retains each ID's first-appearance position when a later revision replaces its
value. Winners are copied as complete rows; older fields are never blended in,
and the input array and rows are not modified.

Validation throws `TypeError` for non-array input, null/non-object/array rows,
empty or non-string IDs, and revisions outside the nonnegative safe integers.
Every row is validated, including a later row that would otherwise lose.
IDs are not trimmed or normalized. Other fields, including missing or non-string
titles, are copied without further validation.

Run these checks from the project directory with Node.js and npm:

```sh
npm test
node --check lib/reconcile.cjs
node --check bin/reconcile.cjs
node --check test/reconcile.test.cjs
node bin/reconcile.cjs data/work-orders.json
```

The regression suite in `test/reconcile.test.cjs` covers shared titles, numeric
revision comparisons in different encounter orders, ties, renamed orders,
first-appearance ordering, complete winner fields, frozen inputs, empty input,
validation boundaries, the supplied fixture, and CLI output/error behavior.
The CLI remains `node bin/reconcile.cjs INPUT.json`, printing the reconciled JSON
array followed by a newline. Only built-in Node modules are used.

The supplied fixture should produce these rows in this order, retaining their
complete winning fields:

| record_id | revision | title | status | owner |
| --- | --- | --- | --- | --- |
| W-9 | 12 | Paint benches | assigned | Cy |
| W-3 | 2 | Repair rail | assigned | Eli |
| W-5 | 0 | Clear path | open | Dee |

`data/work-orders.json`, `CONTRACT.md`, and `original-note.md` are unchanged.
All verification is local; no successful live import has been established.
