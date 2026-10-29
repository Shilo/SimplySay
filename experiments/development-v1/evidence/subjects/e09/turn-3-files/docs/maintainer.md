# Contact exporter maintainer notes

Run `npm test` (or `node --test test/export.test.cjs`). To try the local samples, run `node bin/export.cjs fixtures/north.json fixtures/south.json`.

Contacts merge by exact `contact_id`, never by email. The complete row with the newest timestamp instant wins; timestamps are parsed so timezone offsets compare correctly. Equal instants keep the first row encountered. Output stays in first-seen ID order, and input teams and contacts are not mutated.

The regression suite covers shared emails, changed emails and names, older rows arriving later, timezone offsets, fractional seconds, equal instants, ordering, unchanged inputs, empty exports, CSV escaping, file argument order and exact CLI stdout. The supplied samples export three contacts: Morgan New (c-101), Ari Chen (c-202), and Jo Rivera (c-303), in that order.

See EXPORT-CONTRACT.md for the maintained four-column CSV format. The exporter uses only built-in Node modules and local files; it has no live directory connection. Malformed-row validation is outside this repair.
