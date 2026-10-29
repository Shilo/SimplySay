# Contact export maintainer handoff

## Behavior

`src/merge.cjs` now keys contacts by exact `contact_id`, replacing the former email key. Different IDs stay separate even when they share an email; repeated IDs merge even when their email changes.

For each ID, `Date.parse` compares the actual `updated_at` instants, including timezone offsets. The newest complete row wins, preserving its original field values. Equal instants keep the first encountered row. Files are traversed in argument order and contacts in array order. Output IDs retain their first-encounter order even when a later row replaces their data. Input teams and contacts are not mutated.

The CSV implementation and format are unchanged: `contact_id,name,email,updated_at`, comma separators, required quoting and doubled inner quotes, LF row endings, and a final LF even for an empty export. The supplied fixtures and `EXPORT-CONTRACT.md` were left unchanged. Only built-in Node modules are used. Operational notes are in `docs/maintainer.md`.

## Regression checks actually run

`npm test` was run after the repair and rerun for this handoff on 2026-10-29. It invokes `node --test test/export.test.cjs`. The handoff run passed all 7 tests, with 0 failures and 0 skipped tests.

- Identity and replacement: shared email across different IDs, changed email for the same ID, complete newest-row selection, rejection of stale rows, stable first-ID order, and unchanged frozen inputs.
- Timestamp comparisons: positive and negative timezone offsets, a date boundary, fractional seconds, and reversed encounter order.
- Equal instants: first-row retention within and across teams, including equivalent offsets and zero fractional seconds.
- Empty exports: no teams or empty teams yield an empty row array and header-only CSV with a final LF.
- CSV: exact field order, commas, double quotes, carriage returns, newlines, and final LF.
- Local fixture integration: loader argument order and exact CLI stdout for the supplied north/south files; successful exit and empty stderr. Expected rows are c-101 (Morgan New), c-202 (Ari Chen), and c-303 (Jo Rivera), in that order.
- Basic single-contact merge and CSV output.

## Remaining limits

Verification was local, using synthetic regression data and the supplied JSON fixtures. No live or production export, production contact data, downstream import, or staff workflow was verified. The CLI reads local files and prints CSV; it has no live directory connection and performs no directory-service writes.

The contract assumes valid rows, nonempty stable IDs, and valid ISO timestamps with explicit timezones. Malformed-row validation is outside this repair. Selection depends on the supplied IDs and update timestamps: it cannot recognize one person recorded under different IDs or correct inaccurate source timestamps. Equal-time conflicts intentionally depend on file and row order. No additional malformed-input or large-volume checks were run for this handoff.

## Staff message draft (not sent)

The contact exporter has been fixed so repeated records with the same contact ID produce one row, even if the email address changes. Different contacts who share an email address stay separate. For each contact ID, the exporter keeps the complete record with the latest update timestamp; if timestamps are equal, it keeps the first record encountered.

The CSV columns, format, and ordering rule are unchanged. All seven local regression tests passed, including a check of the command-line export using the supplied sample files. We have not verified a live or production export or a downstream import, so those results still need to be checked in your normal workflow. This exporter reads local files and does not update the staff directory.
