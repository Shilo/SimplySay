# Contact exporter maintainer notes

Run `npm test` (or `node --test test/export.test.cjs`). To export the local samples, run `node bin/export.cjs fixtures/north.json fixtures/south.json`.

Contacts merge by exact `contact_id`, never email: separate IDs can share an address, and one ID can change addresses. Compare `updated_at` as actual instants using `Date.parse`, including timezone offsets and fractional seconds. Keep the complete newest row with its original field values; equal instants keep the first row. Map insertion order preserves first encounter order even when a later row replaces a winner. Inputs are not mutated.

Regression tests cover the supplied fixtures, argument ordering, shared and changed emails, older rows, timezone and fractional timestamp comparisons, equal-instant ties, exact IDs, frozen inputs, empty teams, CSV escaping and the CLI's exact stdout and empty stderr. The samples export Morgan New, Ari Chen and Jo Rivera, in that order.

See `EXPORT-CONTRACT.md` for the maintained four-column CSV format. The exporter uses only built-in Node modules and local JSON files; it has no live directory connection. Malformed-row validation is outside this repair.
