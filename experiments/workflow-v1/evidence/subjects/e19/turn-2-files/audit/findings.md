# Finding-parts guide evidence audit

## Decision

Recommend a limited, staffed next check; do not standardize the reorganized guide for every shift on this evidence. The matched records show a local time saving of **110 seconds out of 910 reference seconds (12.1%)** across seven eligible task pairs. The guide was faster in five pairs and slower in two. First-selection accuracy was **7/8 (87.5%) for each format**, with different errors. These observations justify further checking but do not establish improved accuracy, reliable benefit in ordinary work, or readiness for immediate adoption.

The supplied draft is not ready to use unchanged. A corrected, copy-ready summary appears below. This audit does not authorize or launch a further study.

## Sources and reconciliation rules

The [protocol](../study/protocol.md) defines the units, inclusion rules and JSON fields. [pairs.csv](../evidence/pairs.csv) identifies volunteers, tasks and presentation order; [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) supply the measured outcomes. The [capture notes](../evidence/capture-notes.md) explain the missing time and preserve first selections before coaching. The [draft summary](../draft-summary.md) is an unchecked interpretation, not an additional observation.

The [reference card](../guides/reference-card.txt) uses an alphabetical part list; the [reorganized guide](../guides/reorganized-guide.txt) begins with a part category and aisle map. Both instruct users to check the physical label and ask the helper when unclear. These documents describe the intervention; they provide no additional outcome or safety evidence.

There are eight matched task pairs, P1–P8, from four volunteers, V1–V4. Each volunteer performed two tasks in both formats. Each person had one reference-first pair and one guide-first pair. There are not eight independent volunteers or eight independent replications.

Records were joined by `pair_id`. All three CSVs contain the same eight distinct pair IDs without duplicate or unmatched records. Timing eligibility requires a positive recorded time in both formats. Accuracy uses the observed first selections from all eight pairs for each format, independently of timing eligibility. Assistance is a separate observation and cannot change the first-selection outcome.

## Reconciled observations

Positive savings mean the guide was faster. A missing value is not zero.

| Pair | Volunteer | Task | First format | Reference seconds | Guide seconds | Saving, seconds | Timing status |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| P1 | V1 | find_patch | reference | 120 | 90 | +30 | Eligible; guide faster |
| P2 | V1 | find_pump | guide | 100 | 95 | +5 | Eligible; guide faster |
| P3 | V2 | find_cable | reference | 160 | 100 | +60 | Eligible; guide faster |
| P4 | V2 | find_tube | guide | 80 | 75 | +5 | Eligible; guide faster |
| P5 | V3 | find_brake | reference | 140 | 150 | −10 | Eligible; guide slower |
| P6 | V3 | find_lamp | guide | 200 | 160 | +40 | Eligible; guide faster |
| P7 | V4 | find_chain | reference | 150 | Missing | Not calculable | Excluded from timing only |
| P8 | V4 | find_valve | guide | 110 | 130 | −20 | Eligible; guide slower |

| Pair | Reference first selection | Guide first selection | Reference later assistance | Guide later assistance |
| --- | --- | --- | --- | --- |
| P1 | Correct | Correct | No | No |
| P2 | Correct | Correct | No | No |
| P3 | Incorrect | Correct | Yes | No |
| P4 | Correct | Correct | No | No |
| P5 | Correct | Incorrect | No | Yes |
| P6 | Correct | Correct | Yes | No |
| P7 | Correct | Correct | No | Yes |
| P8 | Correct | Correct | No | No |

P7's guide stopwatch entry was lost during export; the notes explicitly say no other timing exists in the pack. Exclude both P7 times from the comparative totals, including its recorded 150 reference seconds. Retain P7's correct first selections and guide assistance. Do not reconstruct its guide time from order, eventual completion, or another person's record.

The capture notes agree with the outcome records: P3's reference first selection and P5's guide first selection were wrong before observers coached the tasks. Later coaching does not make either first selection correct. P6's reference selection and P7's guide selection were correct but still involved later assistance; correctness and assistance measure different things.

## Independent calculations

Eligible timing IDs are **P1, P2, P3, P4, P5, P6 and P8**.

```text
Reference seconds = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910
Guide seconds     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800
Time saved        = 910 − 800 = 110 seconds
Percentage saved  = (110 / 910) × 100 = 12.087912...% ≈ 12.1%
Pair differences  = 30 + 5 + 60 + 5 − 10 + 40 − 20 = 110 seconds
Faster / slower / tied = 5 / 2 / 0; total = 7 eligible pairs
```

The percentage is the saving divided by the matched reference total, as required by the protocol. It is not an average of individual percentages. Summing every recorded reference time would give 1,060 seconds, but that includes P7 without a guide comparison and is not the valid denominator. There is no support for a 30% reduction under the recorded rules. [metrics.json](metrics.json) contains exactly the ten required numeric fields; percentage and interpretation remain in this text.

Reference first-selection accuracy is 7/8 = 87.5%, with its error at P3. Guide accuracy is also 7/8 = 87.5%, with its error at P5. The observed difference is zero percentage points. Six pairs were correct in both formats, one changed from incorrect to correct (P3), and one changed from correct to incorrect (P5); none were incorrect in both. Equal totals do not establish equivalence, non-inferiority, or an accuracy improvement.

Assistance occurred in 2/8 reference records (P3, P6) and 2/8 guide records (P5, P7). Among the seven eligible timing pairs, those counts are two reference records and one guide record, because P7 is excluded from timing. Retain assisted records in the primary calculations: the protocol does not exclude them. The flags and notes do not quantify how much coaching affected elapsed time or learning between formats, so an assistance-adjusted benefit cannot be computed.

## Corrections to the draft

| Draft claim | Reconciled finding |
| --- | --- |
| Eight independent volunteers | Four volunteers, two paired tasks each; observations repeat within people. |
| All eight completed time pairs | Seven usable time pairs; P7's guide time is missing. The missing measurement is not evidence of task failure. |
| Faster in every pair | Faster in five eligible pairs, slower in P5 and P8, no ties; P7's speed comparison is unknown. |
| Total lookup time cut by 30% | Matched totals are 910 and 800 seconds: 110 seconds saved, or about 12.1%. |
| Guide had eight correct first selections versus seven | Both formats had seven correct first selections out of eight; P5's guide error remains an error after coaching. |
| Accuracy improved | No observed net accuracy improvement; errors occurred on different tasks. |
| Coaching did not affect any result | Assistance is recorded in both formats. Its contribution to timings and later learning cannot be isolated here. |
| Immediate replacement for every shift; no remaining uncertainty | The small staffed exercise supports a limited next check. Generalization, practice, assistance and ordinary-work usability remain unresolved. |

## Limits on the decision

Order was balanced within each volunteer, but repeating the same task can still create practice or familiarity effects. Overall there were four reference-first and four guide-first pairs. Excluding P7 leaves three reference-first and four guide-first timing pairs. As a descriptive order check, the reference-first eligible pairs total 420 reference versus 340 guide seconds (80 saved); guide-first pairs total 490 versus 460 (30 saved). Those small groups contain different tasks and people and cannot isolate an order effect or identify the guide's causal contribution.

The sample was not a randomized sample of store volunteers. Eight task pairs from four people do not support treating eight observations as independent people in a precision estimate. No population confidence interval or significance claim is asserted. The observed 12.1% is a description of these matched records, not a guaranteed saving for a volunteer or a shift. Two eligible pairs were slower, and one guide first selection was wrong.

All observations came from one staffed exercise. Assistance, repeated tasks and missing timing limit interpretation; there is no unattended-shift evidence, expanded study or live rollout in this pack. The records do not demonstrate that accuracy and usability hold in ordinary work, establish safety, or constitute independent replication. The missing time leaves P7's speed comparison unresolved even though its accuracy outcome is known.

## Limited next check for coordinator consideration

Keep the reference card available while considering a bounded, staffed check of the guide in ordinary work. The coordinator would need to decide its scope and acceptance criteria before starting. A useful next check would:

1. Examine the guide's brake lookup (P5) and the valve slowdown (P8), observing category choice, bin-code interpretation and physical-label checks without assuming a cause from these records.
2. Use varied or fresh lookup tasks, counterbalance order, and record volunteer, task and prior exposure so that repeated observations and practice can be distinguished. Include relevant experience levels and ordinary working conditions within the agreed small scope.
3. Capture every first selection before coaching, all assistance and its timing, and complete positive elapsed times under a consistent start/stop rule. Log any missing measurement without imputing it. Analyze matched times and all observed accuracy outcomes separately.
4. Agree in advance what acceptable accuracy, usability, assistance needs and time performance would justify broader adoption; review errors and confusion before expansion. This pack provides no numerical adoption threshold or basis for choosing a new sample size.

This is a recommendation only. No volunteers were contacted, no further study was started, and no rollout was performed. No missing record or new observation is required to complete this audit; the open decision is whether the coordinator wants to authorize a limited next check with defined criteria.

## Corrected summary for reuse

> In a staffed exercise, four volunteers each completed two lookup tasks with the reference card and the reorganized guide, producing eight task pairs. Seven pairs had usable times in both formats; one guide time was lost. On those seven pairs, total recorded time was 910 seconds with the reference card and 800 seconds with the guide, a saving of 110 seconds (about 12.1%). The guide was faster in five pairs and slower in two. First-selection accuracy across all eight pairs was 7/8 for each format, with errors on different tasks. Assistance occurred with both formats. Repeated tasks, practice effects, a small nonrandom sample and the staffed setting limit generalization. These results support considering a limited, staffed check in ordinary work before standardizing the guide; they do not establish an accuracy improvement or a guaranteed time or safety benefit.

## Verification record

- Ran `node tools/check-evidence.cjs`: passed. It reported eight pair IDs, four volunteers, eight records per outcome file and the missing P7 guide time. This built-in structural check does not validate benefit claims.
- Independently parsed and joined the CSVs by `pair_id` using a separate Node calculation, checked positive timing eligibility, summed paired differences and totals, counted accuracy and assistance, and checked order balance. The per-pair ledger and arithmetic above record the result.
- Cross-checked the saved JSON with a separate PowerShell recomputation from the CSVs, including exact field names, numeric types, eligible IDs, totals, faster/slower/tied counts and all-eight accuracy counts. Confirmed both accounting identities: saved seconds equal reference minus guide, and faster plus slower plus tied equals eligible pairs.
- Compared SHA-256 hashes of all ten supplied source files before and after writing the audit: all unchanged. Only `audit/findings.md` and `audit/metrics.json` were added. All work used installed local tools and this task directory; no external sources or services were used.
