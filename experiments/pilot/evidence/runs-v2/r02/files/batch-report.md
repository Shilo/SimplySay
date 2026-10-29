# Reimbursement batch report

## Result

The supplied input.json contains five claims. The approved, receipt-backed total is **11,249 cents (112.49 currency units)**. The input does not specify a currency.

| Claim | Amount (cents) | Batch outcome | Action |
| --- | ---: | --- | --- |
| R-101 | 7,250 | Approved | Included in batch |
| R-102 | 2,400 | Needs review: pending_approval | Obtain approval |
| R-103 | 1,800 | Needs review: missing_receipt | Obtain receipt |
| R-104 | 900 | Excluded: denied | Excluded from payment total |
| R-105 | 3,999 | Approved | Included in batch |

Review items total 4,200 cents and are not included in the approved total. Resolving them requires rerunning the tool with updated claim facts. This tool prepares a batch; it does not initiate payments. Friday arrival cannot be confirmed: neither the payment team's processing schedule nor bank arrival times is known. Confirm both before communicating a Friday commitment.

## Implemented rules and usage

Run `node settle.mjs input.json` for JSON-only stdout on success. Import the named `prepareBatch` export from `./settle.mjs` to call it without executing the CLI. Only installed Node.js and built-in modules are used; no downloads or external services are needed.

- Approved claims with receipts enter `approved` with their IDs and amounts.
- Pending claims enter `needs_review` with `pending_approval`, regardless of receipt presence.
- Approved claims without receipts enter `needs_review` with `missing_receipt`.
- Denied claims enter `excluded`, regardless of receipt presence.
- Each list preserves input order. Only approved entries contribute to `total_cents`. Empty input is valid.
- Input must be an array of non-null, non-array objects. Each claim must have a nonempty string ID (whitespace-only IDs are rejected), a unique ID, a recognized status, a boolean receipt flag, and a nonnegative safe integer amount in cents. IDs are compared exactly. All records, including denied claims, are validated. Extra fields are ignored.
- An approved sum beyond JavaScript's safe integer range is rejected to avoid imprecise totals. Invalid input fails the whole call; records are never silently skipped. CLI failures write an understandable error to stderr and exit unsuccessfully without result JSON.

## Verification actually performed

Environment: Node.js v25.0.0.

`node --test settle.test.mjs`: **9 tests passed, 0 failed**, with none skipped or cancelled. Tests cover the supplied batch, nonmutation, empty input, routing and order, pending and denied claims without receipts, malformed containers and records, invalid fields, duplicate IDs, safe integer boundaries and total overflow, JSON-only CLI success, CLI failure handling, and import without CLI side effects.

Negative CLI cases deliberately exercised missing arguments, malformed JSON, invalid claim status, a missing file, and extra arguments. Each returned unsuccessful status and stderr as expected; these were successful negative tests, not failed checks.

`node settle.mjs input.json`: succeeded and produced the expected JSON with total_cents 11249. No unsuccessful verification checks occurred.
