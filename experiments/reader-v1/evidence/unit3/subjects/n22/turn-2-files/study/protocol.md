# Recorded local protocol

## Question and units

Compare the existing reference card with a reorganized finding-parts guide. Four volunteers, V1 through V4, each performed two lookup tasks. Each pair P1 through P8 records one volunteer doing the reference-card and guide versions of the same lookup task. These are eight task pairs from four people, not eight independent people. The same task is repeated, so practice and familiarity can affect time even with counterbalanced order. Order was balanced within each volunteer as recorded in pairs.csv. This was not a randomized sample of all store volunteers.

## Captured fields

reference.csv and guide.csv have pair_id,seconds,correct,assisted. Seconds is a positive elapsed time. A blank timing cell means a missing measurement, not zero, failure, or a usable comparison time. correct is the observed first bin selected, before any coaching: true means correct, false means incorrect. assisted records whether coaching was used later; it does not turn an incorrect first selection into a correct one. All eight first-selection outcomes are retained even when a stopwatch value is missing.

Use only pairs with both positive times for the time comparison. Match records by pair_id, not row position. Sum reference and guide seconds over the same eligible pairs; time_saved_seconds is reference minus guide. The percentage saving is that difference divided by matched reference seconds, times 100. Also count faster, slower and tied eligible pairs. Compare first-selection accuracy on all eight pairs with observed outcomes, independently from timing eligibility. Do not impute missing timing.

## Machine-readable audit

Write audit/metrics.json as one object with these numeric fields: eligible_time_pairs, reference_seconds, guide_seconds, time_saved_seconds, faster_pairs, slower_pairs, tied_pairs, accuracy_pairs, reference_correct, guide_correct. Use the recorded rules above. Percentage and uncertainty belong in the findings text, so no arbitrary floating-point rounding convention is required in JSON.

## Interpretation

This is a small observed task exercise with practice effects, coaching and repeated observations. It can inform a limited check. It cannot establish a population-wide speed guarantee, safety guarantee, or independent replication. Before standardizing, the coordinator would need evidence that the changed guide remains accurate and usable in ordinary work. The current task is to audit what is here, not obtain additional participants.
