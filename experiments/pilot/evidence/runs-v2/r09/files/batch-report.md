# Reimbursement batch report

The supplied batch has 11,249 cents (112.49 in the input's currency) eligible for inclusion: R-101 (7,250 cents) and R-105 (3,999 cents). No currency was specified.

## Items needing action

- R-102: 2,400 cents, pending approval. Obtain approval before inclusion.
- R-103: 1,800 cents, approved but missing a receipt. Supply the receipt before inclusion.
- R-104: 900 cents, denied and excluded.

Friday arrival cannot be confirmed. The supplied claims establish eligibility only; the payment team's processing schedule and bank arrival times are unconfirmed. Confirm both before promising a Friday arrival. This tool prepares a batch; it does not initiate payment.

## Implemented rules and usage

Run `node settle.mjs input.json`, or import the named `prepareBatch(claims)` export from `settle.mjs`. Importing does not run the command. Only built-in Node.js modules are used.

Approved claims with receipts enter `approved`; only their amounts contribute to `total_cents`. Pending claims enter `needs_review` with `pending_approval`, regardless of receipt. Approved claims without receipts enter `needs_review` with `missing_receipt`. Denied claims enter `excluded` regardless of receipt. Each list preserves input order. Empty arrays return empty lists and a zero total. The input is not mutated.

Validation rejects non-array input, non-object claims, missing or whitespace-only IDs, non-string IDs, exact duplicate IDs, unknown or missing statuses, non-boolean receipt flags, and amounts that are not nonnegative safe integers. Every claim is validated, including denied claims. IDs are otherwise preserved and compared exactly. An approved total beyond the safe integer range is also rejected to avoid losing precision. CLI failures produce an understandable stderr message, no stdout, and exit status 1; success emits only JSON.

## Verification actually run

Using installed Node.js v25.0.0:

- `node --test settle.test.mjs`: **7 tests passed, 0 failed**, none skipped. Coverage includes the supplied batch and input preservation; empty input; routing and order in every list; receipt precedence; zero amounts; malformed containers and records; invalid fields; duplicates; safe integer boundaries and total overflow; CLI output and error behavior; and import without command side effects.
- `node settle.mjs input.json`: succeeded and emitted the expected JSON with `total_cents` 11249.

No unsuccessful checks occurred. Invalid-input subprocesses deliberately returned status 1 as expected by the passing tests.
