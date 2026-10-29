# Contact exporter maintainer notes

Run `node --test test/export.test.cjs` (or `npm test`). To try the local samples, run `node bin/export.cjs fixtures/north.json fixtures/south.json`.

Merge identity is the exact `contact_id`, never email: distinct people can share an address, and one person can change addresses. The complete row with the newest actual timestamp instant wins, using `Date.parse` to account for timezone offsets. Equal instants keep the first encountered row. Map insertion order preserves the order in which IDs first appear even when a later row replaces their values. Input teams and contacts are not mutated.

The regression suite covers the supplied fixtures, changed and shared emails, offset and fractional-second comparisons, equal-instant ties, ordering, exact winning values, immutable inputs, empty exports, CSV escaping, loader argument order, and CLI stdout. The sample export contains Morgan New, Ari Chen, and Jo Rivera in that order.

See `EXPORT-CONTRACT.md` for the maintained four-column CSV format. Rows use LF endings with a final LF; fields containing commas, quotes, CR or LF are quoted and inner quotes doubled. This exporter reads local JSON files and prints CSV only. It has no live directory connection. Malformed-input validation is outside this repair. Only built-in Node modules are needed.
