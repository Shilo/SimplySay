# Automated retrospective assessment

Automated retrospective assessments; not measured human-comprehension improvements.

Reviewers received: 4/4. Calibrated on all four controls: 4. Missing reviewers: none.

## Preservation checks

Existing executed functional evidence is bound to actual captured source/test/report hashes; generated subject code was not executed again. Artifact-specific lexical probes are conservative signals, not semantic proofs. See assessment.json for each independent fact, source hash, mutant check and missing evidence.

## Communication comparisons

| Pair | Source A | Source B | All reviewer votes | Calibrated-only votes | Disagreement | Orientation change |
|---|---|---|---|---|---|---|
| mixed-0-1 | absent / reimbursement_batch | installed-disabled / reimbursement_batch | {"tie":4} | {"tie":4} | false | false |
| mixed-0-2 | absent / reimbursement_batch | enabled / reimbursement_batch | {"tie":4} | {"tie":4} | false | false |
| mixed-0-3 | absent / reimbursement_batch | minimal-instruction / reimbursement_batch | {"tie":4} | {"tie":4} | false | false |
| mixed-1-2 | installed-disabled / reimbursement_batch | enabled / reimbursement_batch | {"tie":4} | {"tie":4} | false | false |
| mixed-1-3 | installed-disabled / reimbursement_batch | minimal-instruction / reimbursement_batch | {"tie":4} | {"tie":4} | false | false |
| mixed-2-3 | enabled / reimbursement_batch | minimal-instruction / reimbursement_batch | {"tie":4} | {"tie":4} | false | false |
| detail | absent / queue_failure_explanation | enabled / queue_failure_explanation | {"tie":3,"dB":1} | {"tie":3,"dB":1} | true | true |

## Calibration and position checks

- review-1: calibrated; omission pass; filler pass; depth pass; identity pass.
- review-2: calibrated; identity pass; depth pass; filler pass; omission pass.
- review-3: calibrated; omission pass; filler pass; depth pass; identity pass.
- review-4: calibrated; identity pass; depth pass; filler pass; omission pass.

Position choices (including controls): {"left":4,"right":5,"tie":35,"unknown":0}. Per-comparison reversed-orientation counts and full evidence are retained in assessment.json. These checks do not isolate order bias from reviewer variation.

## Limits

- Four reviewer conversations are a small shared-model sample. Reversed orientations check sensitivity but reviewer variance is confounded with orientation; no proof of absence of order bias.
- Captured subject runs are single, unrandomized examples; neither preferences nor preservation demonstrate general causal improvement.
- Information and quality remain separate; do not offset omissions with communication votes.
- Absent delegation failed; actual parent directive unobserved. No delegation retest occurred.
