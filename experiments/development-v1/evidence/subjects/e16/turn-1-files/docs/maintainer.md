# Contact exporter maintainer notes

Run `node --test test/export.test.cjs` (or `npm test`). Try the samples with `node bin/export.cjs fixtures/north.json fixtures/south.json`.

Merge by exact contact_id, never by email: people may share addresses, and addresses may change. Date.parse compares actual timestamp instants, including timezone offsets and fractional seconds. Replace the complete row only for a strictly newer instant; ties keep the first encountered row. Map insertion order retains each ID's first position when its winner changes. Winning rows are copied without changing values or mutating inputs.

The samples export Morgan New, Ari Chen and Jo Rivera, in that order. Regression tests cover file order, shared emails, changed addresses, offsets and fractions, ties, repeated IDs within a team, exact IDs, input preservation, empty exports, CSV escaping and exact CLI output.

See EXPORT-CONTRACT.md for the maintained four-column CSV format. This exporter uses built-in Node modules and local JSON files, with no live directory connection. Malformed-row validation is outside this repair.
