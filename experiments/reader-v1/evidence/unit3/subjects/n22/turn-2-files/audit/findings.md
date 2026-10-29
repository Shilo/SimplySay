# Finding-parts guide study audit

## Decision

The supplied evidence supports a limited, staffed next check, not standardizing the reorganized guide now. The guide took less total time on the seven eligible task pairs, but first-selection accuracy was unchanged, two timed pairs were slower, and the exercise involved only four volunteers repeating tasks with staff available. The draft summary needs correction before use.

Suggested replacement summary:

> Four volunteers each compared both formats on two lookup tasks, producing eight task pairs. Seven pairs had both stopwatch values: the reference card totaled 910 seconds and the guide 800 seconds, a saving of 110 seconds (12.1% of matched reference time). The guide was faster in five pairs and slower in two. Both formats had seven correct first selections out of eight (87.5%); each had a different incorrect selection followed by coaching. Assistance was recorded in two trials per format. These descriptive results support a limited, staffed check of accuracy and usability in ordinary work before considering standardization. Repeated tasks, practice, assistance, missing timing and the small nonrandom group limit generalization.

## Sources and controlling rules

Reviewed all ten supplied files: [protocol](../study/protocol.md), [pair metadata](../evidence/pairs.csv), [reference records](../evidence/reference.csv), [guide records](../evidence/guide.csv), [capture notes](../evidence/capture-notes.md), [draft summary](../draft-summary.md), [README](../README.md), both [reference](../guides/reference-card.txt) and [reorganized](../guides/reorganized-guide.txt) guide texts, and the [structural checker](../tools/check-evidence.cjs). The guide texts provide procedural context, not additional observations or evidence of effectiveness. Both tell users to check the bin label and seek a helper when unclear.

The recorded protocol controls eligibility and definitions; the capture notes explain the missing measurement and first-selection errors. The draft is explicitly unverified historical input. Its conflicting claims do not override the records.

Records were joined by `pair_id`, with unique, matching P1–P8 IDs across the three CSVs. Timing uses only pairs with two positive measurements. A blank is missing, not zero or failure. Accuracy uses all eight observed first selections, independently of timing. Later assistance does not change a first-selection outcome. Assisted timed pairs remain in the primary calculation because the protocol does not exclude them.

## Reconciled timing records

Positive savings mean the guide was faster. Times are seconds. “First format” comes from `pairs.csv`.

| Pair | Volunteer | Task | First format | Reference | Guide | Reference minus guide |
| --- | --- | --- | --- | ---: | ---: | ---: |
| P1 | V1 | find_patch | Reference | 120 | 90 | 30 |
| P2 | V1 | find_pump | Guide | 100 | 95 | 5 |
| P3 | V2 | find_cable | Reference | 160 | 100 | 60 |
| P4 | V2 | find_tube | Guide | 80 | 75 | 5 |
| P5 | V3 | find_brake | Reference | 140 | 150 | -10 |
| P6 | V3 | find_lamp | Guide | 200 | 160 | 40 |
| P7 | V4 | find_chain | Reference | 150 | Missing | Not eligible |
| P8 | V4 | find_valve | Guide | 110 | 130 | -20 |
| **Eligible total** | | | | **910** | **800** | **110** |

P7's guide stopwatch entry was lost during export. The notes explicitly state that no other timing exists in the pack. Both P7's recorded reference time of 150 seconds and its missing guide time are excluded from the time comparison. No seconds were reconstructed or imputed. Comparing all eight reference times against seven guide times would use different task sets and violate the protocol.

Independent arithmetic:

- Reference: `120 + 100 + 160 + 80 + 140 + 200 + 110 = 910` seconds.
- Guide: `90 + 95 + 100 + 75 + 150 + 160 + 130 = 800` seconds.
- Saving: `910 - 800 = 110` seconds, also `30 + 5 + 60 + 5 - 10 + 40 - 20 = 110`.
- Percentage saving: `100 * 110 / 910 = 12.087912...%`, reported as **12.1%**. This is the percentage reduction in matched aggregate time, not an average of pair percentages or a prediction for each volunteer.
- Faster: P1, P2, P3, P4, P6 (**5**); slower: P5, P8 (**2**); tied: **0**. These counts sum to seven eligible pairs.

## Reconciled accuracy and assistance

“Correct” refers to the first bin selected before coaching. Assistance is the separate later-help flag.

| Pair | Reference first selection | Reference assisted | Guide first selection | Guide assisted |
| --- | --- | --- | --- | --- |
| P1 | Correct | No | Correct | No |
| P2 | Correct | No | Correct | No |
| P3 | Incorrect | Yes | Correct | No |
| P4 | Correct | No | Correct | No |
| P5 | Correct | No | Incorrect | Yes |
| P6 | Correct | Yes | Correct | No |
| P7 | Correct | No | Correct | Yes |
| P8 | Correct | No | Correct | No |

Reference accuracy is **7/8 = 87.5%**; guide accuracy is **7/8 = 87.5%**. The observed difference is **0 percentage points**. Six pairs were correct under both formats; P3 favored the guide and P5 favored the reference; none were incorrect under both. Equal totals do not establish equivalence, absence of harm, or a safety guarantee.

P3's reference error and P5's guide error agree with the capture notes and remain errors despite later coaching. P7 retains its correct guide first selection and its assistance flag even though its timing is missing. P6 also has a correct reference first selection with later assistance. Correct first selection and later help are compatible observations.

Reference assistance occurred on P3 and P6; guide assistance on P5 and P7: **2/8 trials per format**. Four of the eight task pairs had assistance in at least one format. The pack does not isolate coaching's effect on elapsed time, eventual completion, or later repeated-task performance. Equal assistance counts cannot substantiate the draft's claim that coaching affected no result.

## Corrections to the draft

| Draft claim | Audited correction |
| --- | --- |
| Eight independent volunteers | Four volunteers, V1–V4, each contributed two task pairs. The eight pairs are repeated observations, not eight independent people or replications. |
| All eight completed time pairs | Seven usable time pairs. P7 is missing its guide time; the pack does not support a claim about its paired duration. |
| Faster in every pair | Faster in five eligible pairs, slower in P5 and P8; P7 cannot be classified by time. |
| Total lookup time cut by 30% | The protocol calculation gives 110/910 = 12.1%. The 30% claim is unsupported. |
| Guide eight correct versus reference seven; accuracy improved | Both are seven correct first selections out of eight. P5's guide first selection was incorrect. No observed aggregate accuracy improvement. |
| Coaching did not affect any result | Assistance occurred in both formats. Its effect was not isolated; first-selection outcomes must remain as observed. |
| Replace the card for every shift immediately; no uncertainty | The small staffed exercise supports further limited checking. It does not establish ordinary-work accuracy and usability, universal speed or safety, or independent replication. |

The supplied draft has been left unchanged. Use the corrected text above in its place.

## Uncertainty and supporting descriptions

Each volunteer did one reference-first and one guide-first pair, so recorded order was balanced within every volunteer and across all eight pairs (four first in each format). Counterbalancing does not remove familiarity from repeating the same lookup task. Excluding P7 leaves only three reference-first and four guide-first timed pairs.

These optional breakdowns describe the same observations; they are not replacement primary analyses or independent confirmations:

| Timed subset | Pairs | Reference seconds | Guide seconds | Saved seconds | Saving relative to subset reference |
| --- | ---: | ---: | ---: | ---: | ---: |
| Reference first: P1, P3, P5 | 3 | 420 | 340 | 80 | 19.0% |
| Guide first: P2, P4, P6, P8 | 4 | 490 | 460 | 30 | 6.1% |
| Neither format assisted: P1, P2, P4, P8 | 4 | 410 | 390 | 20 | 4.9% |

The different order-group savings do not identify a practice effect because people and tasks also differ. Removing assisted pairs changes the task mix, so the unassisted subset cannot measure coaching's causal effect or replace the protocol result. It does show that the overall 12.1% saving should not be presented as a demonstrated independent-use benefit.

By volunteer, eligible savings were V1: 35 seconds across two pairs; V2: 65 across two; V3: 30 across two; V4: -20 across one. The missing P7 measurement leaves V4 represented by only P8 in timing. Neither the direction of the missing duration nor its impact on the complete eight-pair result is known.

This was a nonrandom group of four people in one staffed exercise. Task pairs share volunteers, and the same tasks were repeated under both formats. The aggregate favors the guide locally but does not separate format, practice, task and staff effects. No population confidence interval or significance claim is asserted here; treating seven timed pairs as seven independent people would misstate the evidence. There is no observed later unattended shift, expanded study or live rollout in the pack. Long-term usability, performance across ordinary shifts, and safety have not been established.

## Limited next check: decision for the coordinator

Before scheduling anything, define a bounded staffed check and agree on acceptable first-selection accuracy, usability, assistance and timing criteria. The current protocol supplies no numeric adoption threshold; this audit does not invent one. Keep the reference available while considering a trial. Examine the brake lookup associated with P5's incorrect guide selection and the valve lookup associated with P8's slowdown; their causes are not recorded, so neither can yet be attributed to a guide defect.

A proposed check should use representative ordinary-work lookups, reduce same-task practice with fresh or comparable tasks, and record order, volunteer identity, complete matched times, first selections before help, later assistance and observed confusion separately. Preserve bin-label verification and access to a helper. Review errors and usability problems before widening use. Assess whether any speed benefit persists alongside acceptable accuracy and manageable assistance, accounting for repeated observations per person. Any later standardization decision needs that ordinary-work evidence.

No additional input is needed to finish this audit. P7's missing stopwatch value remains unresolved and cannot be recovered from the supplied pack. The coordinator's outstanding decision is the scope and acceptance criteria of a limited next check. This is a recommendation only; no volunteers were contacted and no check or rollout was started.

## Verification and source preservation

- Ran `node tools/check-evidence.cjs`: passed; eight pairs, four volunteers, eight rows per format, and P7 as the only missing guide time. This tool checks structure and does not validate benefit claims.
- Independently parsed all three CSVs with a read-only Node script, joined on `pair_id`, checked positive finite observed times and boolean fields, and recalculated eligibility, totals, directional counts, accuracy, assistance, order balance and the descriptive breakdowns above. Its primary results match the explicit arithmetic in this report.
- Separately recalculated the required metrics with PowerShell `Import-Csv`, using ID-based lookups and explicit handling of blank times, then compared every result with `metrics.json`. Checked that the JSON contains exactly the ten required numeric fields, with no percentage or additional fields, and that count and time identities hold. All checks passed.
- Recorded SHA-256 hashes of all ten supplied files before writing the audit and compared them after writing. All supplied files are unchanged. Only `audit/findings.md` and `audit/metrics.json` were added. No external services or other projects were used.

The machine-readable result is [metrics.json](metrics.json). Percentages and interpretation remain in this report, as required by the protocol.
