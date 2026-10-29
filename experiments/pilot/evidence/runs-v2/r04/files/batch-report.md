# Reimbursement batch report

The supplied input.json contains five claims. Two qualify for this batch, totaling **11,249 cents (112.49 currency units)**. The input does not specify a currency. This tool prepares a batch; it does not submit payments.

| Claim | Amount (cents) | Result / action |
| --- | ---: | --- |
| R-101 | 7,250 | Approved with receipt; included |
| R-102 | 2,400 | pending_approval; obtain approval |
| R-103 | 1,800 | missing_receipt; obtain receipt |
| R-104 | 900 | Denied; excluded |
| R-105 | 3,999 | Approved with receipt; included |

The review items total 4,200 cents and are not included in the approved total. Resolve their missing requirements and rerun the tool against updated facts before including them.

## Rules and use

Run `node settle.mjs input.json`. Successful stdout contains only result JSON. Errors go to stderr with a nonzero exit status. Importing the named `prepareBatch` export does not run the command. Only installed Node.js built-in modules are used.

Approved claims with receipts enter `approved`; pending claims enter `needs_review` with `pending_approval`, regardless of receipt; approved claims without receipts enter `needs_review` with `missing_receipt`. Denied claims enter `excluded` regardless of receipt. Each list retains input order. Only included amounts contribute to `total_cents`; empty input is valid.

All records are validated, including denied records. Input must be an array of objects with nonempty string IDs (whitespace-only IDs are rejected), unique exact IDs, a known status, boolean receipt_present, and nonnegative safe-integer amount_cents. Missing required fields and malformed records are rejected instead of skipped. Aggregate overflow is also rejected to preserve exact totals. Extra object fields are ignored.

## Validation actually run

- Initial `node --test settle.test.mjs`: 8 passed, 0 failed.
- Final `node --test settle.test.mjs`, after adding command-level malformed JSON and invalid-record coverage: 9 passed, 0 failed.
- `node settle.mjs input.json`: exit 0; JSON matched the result above, with total_cents 11249.

Tests cover the supplied batch, empty input, routing and order, denied claims without receipts, zero amounts, no input mutation, invalid containers and records, missing fields, duplicate/empty IDs, unknown status, nonboolean receipts, invalid amounts, sparse arrays, safe-integer limits and total overflow, CLI output, CLI failures, and import behavior. Expected invalid-input subprocesses exited unsuccessfully and passed their assertions; no validation check failed.

## Friday timing and Casey email draft

Payment-team processing schedules and bank arrival times are unconfirmed. Approval alone does not establish when funds will arrive. Confirm both before promising Friday arrival.

To: casey@example.invalid

Subject: Reimbursement batch status and Friday timing

Hi Casey,

The batch has 11,249 cents (112.49 currency units) approved for inclusion: R-101 and R-105. The supplied records do not specify the currency.

R-102 (2,400 cents) still needs approval, and R-103 (1,800 cents) needs a receipt. Those items are not included in the approved total. R-104 was denied and is excluded.

We cannot confirm Friday arrival: we do not yet have confirmation of the payment team's processing schedule or bank arrival times. We need that confirmation before giving an arrival date.

Best,

This is a draft only; no email has been sent.
