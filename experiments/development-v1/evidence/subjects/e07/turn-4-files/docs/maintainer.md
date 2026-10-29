# Contact exporter maintainer notes

Run `npm test` (or `node --test test/export.test.cjs`). To try the local samples, run `node bin/export.cjs fixtures/north.json fixtures/south.json`. The CLI prints CSV to stdout and uses only built-in Node modules; there is no live directory connection.

`mergeContacts` keys contacts by the exact stable `contact_id`, never by email. It compares parsed timestamp instants, selects the complete newest row, and keeps the first encountered row on a tie. Map insertion order preserves each ID's first position when a later row wins. Inputs are not mutated, and winning values are preserved without normalization.

The supplied samples export three contacts in order: c-101 (Morgan New), c-202 (Ari Chen), c-303 (Jo Rivera). Shared emails do not combine different IDs, and an email change does not split one ID into multiple rows.

Regression tests cover the sample export, within-team and across-team duplicates, shared emails, offset and fractional timestamps, equal-instant ties, traversal order, frozen inputs, empty teams, CSV escaping and final LF, file argument order, and exact CLI stdout. See EXPORT-CONTRACT.md for the maintained four-column format. Malformed-input validation is outside this repair.
