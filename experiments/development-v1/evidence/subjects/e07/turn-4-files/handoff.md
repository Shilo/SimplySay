# Contact export maintainer handoff

## Behavior

The repair in `src/merge.cjs` follows `EXPORT-CONTRACT.md`: exact `contact_id` values identify contacts. Distinct IDs remain separate even when they share an email; a changed email does not split one ID into multiple exported contacts.

For a repeated ID, the complete row with the newest parsed `updated_at` instant wins. Timezone offsets are accounted for. Equal instants keep the first row encountered, following supplied file order and then row order within each file. Each ID keeps its first encountered output position even when a later row wins. Winning field values are preserved exactly and input teams and contacts are not mutated.

The CSV format remains `contact_id,name,email,updated_at`, with the existing escaping, LF row endings and final LF. No dependencies were added; only built-in Node modules are used. The supplied fixtures and contract were left unchanged. `docs/maintainer.md` describes ongoing maintenance and commands.

## Regression checks actually run

During the repair, `npm test` ran `node --test test/export.test.cjs`: all nine tests passed, with zero failures or skipped tests. Coverage includes:

- Supplied fixtures: shared-email people remain separate, the newest Morgan row wins despite an email change, and first-ID output order is preserved.
- Duplicate IDs within and across teams, older rows encountered later, timezone-offset comparisons, and fractional-second ordering.
- Equal-instant timestamps with different representations: first complete row wins in traversal order.
- Distinct IDs with identical emails or emails differing in case and surrounding spaces.
- Frozen teams, contact arrays and rows: merge succeeds without changing the inputs.
- Empty input and empty teams: empty merged rows and header-only CSV with final LF.
- CSV column order, exact values, and escaping for commas, quotes, carriage returns and newlines.
- File loading in argument order.
- CLI integration: successful exit, empty stderr and exact expected CSV stdout for the fixtures.

Also run directly: `node bin/export.cjs fixtures/north.json fixtures/south.json`. It exited successfully and printed three contacts in this order: c-101 (Morgan New), c-202 (Ari Chen), c-303 (Jo Rivera).

To repeat the checks, run those two commands from the project root. These results describe local fixture and regression checks, not a live staff export.

## Remaining limits

- This is a local JSON-to-CSV exporter with no live directory connection. No live staff dataset, production export workflow, or downstream import has been verified.
- Correct results depend on stable contact IDs and accurate update timestamps in the input. Different IDs are never combined, and a reused ID is treated as one contact.
- Malformed-row validation is outside the contract and this repair. Inputs are expected to contain the required fields and valid timestamps with explicit timezones.
- Timestamp comparison uses Node's `Date.parse`, with millisecond precision; finer timestamp distinctions are not verified by this suite.
- For equal timestamp instants, file and row order determine the winner. This is the contract's tie rule, not an additional freshness signal.

## Staff message (draft only; not sent)

The contact exporter now uses contact IDs to recognize the same person across teams. A person who changes email will still have one exported row, while different people who share an email will each keep their own row. For repeated contact IDs, the row with the latest update timestamp supplies the name and other details; tied timestamps keep the first record encountered.

The CSV columns and format are unchanged. All nine local regression tests passed, and the supplied sample export produced the expected three contacts. We have not yet verified a live staff export or a downstream import. This tool reads local files and does not update the staff directory.
