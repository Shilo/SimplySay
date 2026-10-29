# Contact exporter maintainer notes

Run `npm test` (or `node --test test/export.test.cjs`). To try the local samples, run `node bin/export.cjs fixtures/north.json fixtures/south.json`.

Contacts merge by exact `contact_id`, never by email. The complete row with the newest parsed timestamp instant wins; equal instants keep the first encountered row. Map insertion order preserves the first encounter of each ID even when its row is replaced. Inputs are not mutated and winning field values are preserved without normalization.

The supplied samples export three contacts in order: c-101 (Morgan New), c-202 (Ari Chen), c-303 (Jo Rivera). Shared email addresses belong to distinct IDs, and an email change does not create another row for an existing ID.

Regression tests cover identity, changed emails, stale rows, ordering, timezone offsets, fractional seconds, equal instants, frozen inputs, empty exports, CSV escaping, file order, and exact CLI stdout. The exporter uses built-in Node modules only. See EXPORT-CONTRACT.md for the unchanged four-column CSV format. This is a local file exporter with no directory-service writes; malformed-row validation is outside this repair.
