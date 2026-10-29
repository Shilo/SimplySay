# Contact export maintainer handoff

## Behavior

`src/merge.cjs` now merges rows by exact `contact_id` instead of normalized email. Distinct IDs remain separate even if they share an email; repeated IDs merge even when their email changes.

For each ID, the complete row with the newest actual timestamp instant wins. `Date.parse(updated_at)` accounts for timezone offsets; equal instants retain the first encountered row. Files are traversed in argument order and contacts in array order. Each ID keeps its first-seen output position even when its winning row occurs later. Winning values are preserved exactly and inputs are not mutated.

The CSV remains `contact_id,name,email,updated_at`, with comma separators, LF row endings and a final LF, including header-only output. Fields containing commas, double quotes, CR or LF are quoted, with inner double quotes doubled. The CLI prints CSV to stdout and does not update a directory service.

The supplied fixtures and `EXPORT-CONTRACT.md` were left unchanged. No dependencies were added; only built-in Node modules are used. `docs/maintainer.md` describes maintenance and sample usage.

## Regression checks actually run

`node --test test/export.test.cjs` was run after implementation and rerun for this handoff. Both runs passed all eight tests, with zero failures, cancellations or skips. The suite checks:

- Supplied fixtures: changed emails merge by ID, shared emails remain distinct, and output retains first-seen ID order.
- Actual timestamp ordering across timezone offsets in both encounter orders, preserving complete winning values.
- Equal-instant ties within and across teams, including equivalent timestamp spellings.
- Fractional seconds and repeated IDs within one team.
- Exact IDs, stable position after replacement, and unchanged frozen inputs.
- Empty inputs and teams producing header-only CSV with a final LF.
- CSV column order and escaping of commas, quotes, CR and LF.
- Loader argument order and a spawned CLI invocation producing exactly the expected fixture CSV, exit status zero, and empty stderr.

The CLI test runs `node bin/export.cjs fixtures/north.json fixtures/south.json` using absolute paths. Its expected rows are Morgan New (`c-101`), Ari Chen (`c-202`), and Jo Rivera (`c-303`), in that order.

## Remaining limits

Verification used local fixtures and synthetic valid-input cases. No live export, production dataset, downstream import, or directory connection was exercised. This project is a local JSON-to-CSV exporter and has no live directory integration.

Malformed-row validation remains outside the contract and this repair. Correct identity depends on the supplied stable IDs; different IDs are never reconciled through names or emails. Winner selection depends on supplied timestamps and uses JavaScript Date's millisecond precision; finer-than-millisecond distinctions are not covered by these tests. Equal timestamps retain the first encountered version even if other fields differ.

To repeat verification, run `node --test test/export.test.cjs` from the project directory. Before relying on a production workflow, inspect an export from representative real input and check it in its intended downstream consumer; that verification is still outstanding.
