# Contact export maintainer handoff

## Behavior

`src/merge.cjs` now keys rows by exact, case-sensitive `contact_id` instead of normalized email. Different IDs remain separate even when they share an email. Repeated IDs merge even when their email changes.

For each ID, the complete row with the newest parsed `updated_at` instant wins. Timezone offsets are accounted for. Equal instants retain the first encountered row, traversing files in argument order and contacts in array order. Each ID keeps its first-seen output position even when a later row replaces it. Winning values are preserved exactly, and input teams and contacts are not mutated.

The CSV remains `contact_id,name,email,updated_at`, with the existing escaping, LF row endings and final LF. No dependencies were added; the project uses built-in Node modules only. Supplied fixtures and EXPORT-CONTRACT.md were left unchanged. Maintenance guidance is in docs/maintainer.md.

## Checks actually run

- `node --test test/export.test.cjs`: all 7 tests passed, with no failures, cancellations or skipped tests.
- `node bin/export.cjs fixtures/north.json fixtures/south.json`: produced the expected header and three rows, in order: Morgan New (`c-101`), Ari Chen (`c-202`), Jo Rivera (`c-303`).

The test suite verifies a single-row export; shared and changed emails; exact ID case; complete winning values; older rows arriving later; first-seen ID order; unchanged frozen inputs; timestamp offsets and millisecond fractions in both arrival orders; equal-instant ties within and across teams; empty input; CSV quoting for commas, quotes, CR and LF; file argument order; and exact CLI stdout with successful exit and empty stderr.

The fixture integration test runs the CLI as a child process and compares its output to an explicit expected CSV. The commands above were run directly; `npm test` is an equivalent package script but was not separately run.

## Remaining limits

- Verification used local fixtures and synthetic test rows only. No live staff dataset, operational export workflow or downstream import has been verified. This program reads local files and has no live directory connection; it does not update a directory service.
- Correct identity depends on stable, correct contact IDs in the source data. Different IDs are never combined, even if they refer to the same person; an incorrectly shared ID will combine rows.
- Recency depends on source timestamps. Equal instants keep the first encountered row, so file and row order determine those ties.
- Malformed-row validation remains outside this repair, as specified by the contract. No new validation or recovery behavior was added.

## Staff message (draft; not sent)

The contact exporter has been fixed to keep one row per contact ID across teams and use the newest dated row for that contact, including its name and email. Different contacts who share an email address stay separate. If two versions have exactly the same timestamp, the first one encountered is kept.

The CSV columns and format are unchanged. All seven local regression tests passed, and the supplied sample export produced the expected three contacts. We have not yet verified an export using live staff data or checked its downstream use. The exporter reads local files and does not change records in the staff directory.
