# Sanitized development pilot evidence

Generated only from completed synthetic Codex cells. No Claude, API, subject, judge, or generated code was launched by this exporter. These are feasibility observations, not release validation or measured human comprehension.

| Cell | Case | Condition | Recorded classification | Visible final | File/hash inventory |
|---|---|---|---|---|---|
| runs/r01 | reimbursement_batch | absent | infrastructure_workspace_readonly_reported_by_amendment | [Chat](runs/r01/final.txt) | [Files](runs/r01/README.md) |
| runs-v2/r09 | reimbursement_batch | absent | process_completed_not_quality_graded | [Chat](runs-v2/r09/final.txt) | [Files](runs-v2/r09/README.md) |
| runs-v2/r02 | reimbursement_batch | enabled | process_completed_not_quality_graded | [Chat](runs-v2/r02/final.txt) | [Files](runs-v2/r02/README.md) |
| runs-v2/r03 | queue_failure_explanation | enabled | process_completed_not_quality_graded | [Chat](runs-v2/r03/final.txt) | [Files](runs-v2/r03/README.md) |
| runs-v2/r04 | reimbursement_batch | disabled | process_completed_not_quality_graded | [Chat](runs-v2/r04/final.txt) | [Files](runs-v2/r04/README.md) |
| runs-v2/r05 | queue_failure_explanation | absent | process_completed_not_quality_graded | [Chat](runs-v2/r05/final.txt) | [Files](runs-v2/r05/README.md) |
| runs-v2/r06 | reimbursement_batch | minimal | process_completed_not_quality_graded | [Chat](runs-v2/r06/final.txt) | [Files](runs-v2/r06/README.md) |
| runs-v2/r07 | crate_pair_delegation | absent | provider_capacity_failure_and_interagent_capture_unknown | Unavailable | [Files](runs-v2/r07/README.md) |
| runs-v3/r08 | crate_pair_delegation | enabled | process_completed_public_child_messages_directive_unknown | [Chat](runs-v3/r08/final.txt) | [Files](runs-v3/r08/README.md) |

Each cell includes selected visible events, result metadata, a minimal candidate/hook/configuration summary, and allowlisted task files when present. Original source hashes and after-checks appear in source-hashes.json. Manifests retain their original source digest separately from any sanitized export digest.

Final recorded session accounting: 11 charged slots, 9 root reservations, 2 metadata-confirmed native children. The overall owner cap is 24 (13 remain); the narrower fixed controller allocation is 12 (1 remains). Remaining capacity does not automatically authorize another run. The ledger records 0 direct Claude root reservations. Cleanup reports 0 remaining pilot authentication copies. The exporter did not inspect authentication files.

- [cleanup-audit.json](final-audits/cleanup-audit.json)
- [session-ledger-final.json](final-audits/session-ledger-final.json)
- [usage-before.json](final-audits/usage-before.json)
- [usage-before-final.json](final-audits/usage-before-final.json)
- [usage-after.json](final-audits/usage-after.json)
- [uninstall-audit.json](final-audits/uninstall-audit.json)

Account usage percentages include development activity. Do not attribute the account-wide difference solely to pilot subjects or convert it into a cost claim.

Privacy transformations replace task, profile, pilot, home, and runtime paths with labeled markers and thread UUIDs with stable SHA-256 aliases. Source artifacts are never modified. Raw profiles, authentication, account plugin inventories, stderr session dumps, rollouts, and private reasoning are excluded. Numeric token counts are accounting metadata. A fail-closed pattern scan checks exports for credential-like strings, non-example email addresses and absolute user paths before writing; it is not a complete release secret audit.
