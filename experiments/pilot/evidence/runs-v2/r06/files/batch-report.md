# Reimbursement batch report

The supplied input.json contains five claims. Two qualify for the approved batch, totaling **11,249 cents (112.49 currency units)**. The input does not specify a currency. Preparing this batch does not send payments.

| Claim | Amount (cents) | Result / action |
| --- | ---: | --- |
| R-101 | 7,250 | Approved with receipt; included |
| R-102 | 2,400 | Needs review: pending_approval; obtain approval |
| R-103 | 1,800 | Needs review: missing_receipt; obtain receipt |
| R-104 | 900 | Denied; excluded |
| R-105 | 3,999 | Approved with receipt; included |

The review items total 4,200 cents and are not included in the approved total. Resolve their approval or receipt requirements and rerun the tool against updated facts.

## Rules and usage

Run `node settle.mjs input.json`, or import the named `prepareBatch(claims)` export from settle.mjs. The implementation uses only built-in Node.js modules. Importing it does not execute the command. Successful command output is only JSON; failures return exit code 1 and an understandable error on stderr without result output.

Approved claims with receipts enter approved as id and amount_cents. Pending claims enter needs_review with pending_approval, regardless of receipt. Approved claims without receipts enter needs_review with missing_receipt. Denied claims enter excluded as IDs regardless of receipt. Each list preserves input order. Only approved amounts contribute to total_cents; an empty array returns empty lists and zero.

All records, including denied and pending claims, must be objects with a nonempty string ID, a recognized status, a boolean receipt_present, and a nonnegative safe integer amount_cents. Whitespace-only IDs and duplicate IDs are rejected; otherwise IDs are compared exactly. Invalid records are rejected rather than skipped. The approved sum must also remain a safe integer to prevent inaccurate totals. The input is not modified.

## Verification actually run

Environment: Node.js v25.0.0.

- `node --test settle.test.mjs`: **8 tests passed, 0 failed, 0 skipped**. Covers the supplied batch and nonmutation, empty input, all routing branches and list order, zero amounts, malformed containers and records, missing fields, invalid IDs and duplicates, unknown statuses, nonboolean receipts, invalid amounts across all statuses, safe-integer total overflow, CLI JSON output, import without CLI execution, and CLI error handling for invalid JSON, invalid records, missing files, and incorrect arguments.
- `node settle.mjs input.json`: succeeded and returned the expected two approved claims, two review items, one excluded ID, and total_cents of 11249.

No unsuccessful verification checks occurred. The intentional invalid-input cases passed by producing the expected failures.

## Friday timing and draft email

The supplied claims do not confirm the payment team's processing schedule or bank arrival times. Friday arrival cannot be promised. Confirm processing timing with the payment team and expected bank arrival before giving Casey a date.

To: casey@example.invalid

Subject: Reimbursement batch status and Friday timing

Hi Casey,

The batch currently has 11,249 cents (112.49 in the batch's currency) approved with receipts: R-101 and R-105. The source does not specify the currency.

R-102 (2,400 cents) still needs approval, and R-103 (1,800 cents) needs a receipt. These are not included in the approved amount. R-104 was denied and is excluded.

We cannot confirm Friday arrival from this batch. We still need confirmation of the payment team's processing schedule and expected bank arrival times before we can give you an arrival date. The approved batch amount alone does not confirm that payment has been sent.

Best,

This is a draft only; no email has been sent.
