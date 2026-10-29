# Finding-parts guide study audit

## Decision

The evidence supports a further limited, staffed check, not standardizing the reorganized guide now. In this exercise the guide used 110 fewer seconds across seven complete task pairs, a 12.09% reduction relative to matched reference-card time. It was slower on two of those pairs. First-selection accuracy was 7/8 for each format. These observations suggest a possible time benefit worth checking; they do not establish an accuracy improvement, reliable performance across shifts, or safety in ordinary work.

The coordinator should replace the draft's claims before using its summary. A copy-ready replacement appears below. This audit reviews the supplied exercise only; it does not authorize or initiate further data collection or deployment.

## Sources and reconciliation rules

The recorded protocol in `study/protocol.md` governs inclusion and calculation. `evidence/pairs.csv` identifies volunteers, tasks and format order; `evidence/reference.csv` and `evidence/guide.csv` contain outcomes. `evidence/capture-notes.md` explains the missing stopwatch measurement and first-selection errors. `draft-summary.md` is explicitly unchecked historical input. The two files in `guides/` describe the formats and supply no additional outcome evidence. Both instruct volunteers to check the physical bin label and seek a shift helper when unclear; their wording cannot establish accuracy or safety in use.

There are four volunteers (V1–V4), each contributing two task pairs (P1–P8). Each pair repeats the same lookup with both formats. The eight pairs are repeated observations from four people, not eight independent volunteers or independent replications. Each volunteer has one reference-first task and one guide-first task. The pack does not establish random sampling or random assignment.

Records are joined by `pair_id`. A time comparison requires positive times for both formats. A blank time remains missing, never zero or an inferred completion time. First-selection accuracy uses all eight recorded outcomes, regardless of timing eligibility. Assistance occurred later and does not change the first-selection outcome. No assisted observations are dropped from the protocol's metrics.

## Pair-by-pair audit

Positive saved seconds mean the guide was faster; negative values mean it was slower. Accuracy columns report the first bin selected before coaching.

| Pair | Volunteer | Task | First format | Reference seconds | Guide seconds | Saved seconds | Reference correct | Guide correct | Later assistance |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | V1 | find_patch | Reference | 120 | 90 | 30 | Yes | Yes | Neither |
| P2 | V1 | find_pump | Guide | 100 | 95 | 5 | Yes | Yes | Neither |
| P3 | V2 | find_cable | Reference | 160 | 100 | 60 | No | Yes | Reference |
| P4 | V2 | find_tube | Guide | 80 | 75 | 5 | Yes | Yes | Neither |
| P5 | V3 | find_brake | Reference | 140 | 150 | -10 | Yes | No | Guide |
| P6 | V3 | find_lamp | Guide | 200 | 160 | 40 | Yes | Yes | Reference |
| P7 | V4 | find_chain | Reference | 150 | Missing | Excluded | Yes | Yes | Guide |
| P8 | V4 | find_valve | Guide | 110 | 130 | -20 | Yes | Yes | Neither |

P7's guide stopwatch entry was lost during export. The notes say no replacement timing exists. Exclude both P7's reference time of 150 seconds and its missing guide time from the matched time totals. Retain both correct first selections and the guide's assistance flag. The missing value prevents a claim about whether the guide was faster on P7.

P3's reference selection and P5's guide selection were incorrect before later coaching. Eventual completion with help cannot be counted as a correct first selection. Assistance is recorded on reference P3 and P6, and guide P5 and P7: two observations per format, four of eight pairs with assistance in at least one format. Three of the seven timed pairs involve assistance. Equal assistance counts do not show equal effects; the pack does not quantify coaching's contribution to elapsed time or eventual completion.

## Independently recalculated results

The eligible time set is P1, P2, P3, P4, P5, P6 and P8.

- Matched reference seconds: `120 + 100 + 160 + 80 + 140 + 200 + 110 = 910`.
- Matched guide seconds: `90 + 95 + 100 + 75 + 150 + 160 + 130 = 800`.
- Saved seconds: `910 - 800 = 110`, also `30 + 5 + 60 + 5 - 10 + 40 - 20 = 110`.
- Percentage saving: `110 / 910 * 100 = 12.087912...%`, reported as **12.09%**. This is a reduction in summed elapsed time for the matched pairs, not a guaranteed improvement for a typical volunteer or task.
- Faster: **5** (P1, P2, P3, P4, P6). Slower: **2** (P5, P8). Tied: **0**. These counts sum to seven eligible pairs.
- Accuracy: **7/8 = 87.5%** for the reference and **7/8 = 87.5%** for the guide, a difference of **0 percentage points**. Both formats were correct on six pairs; only the guide was correct on P3; only the reference was correct on P5; no pair had both formats incorrect. Equal observed totals do not establish equivalent accuracy in ordinary work.

Summing all eight reference times would give 1,060 seconds, but pairing that total with the seven recorded guide times would mix different task sets and violate the protocol. Missing time is not imputed. The required JSON contains exactly the ten numeric fields specified by the protocol; percentages and interpretation remain in this document.

## Corrections to the draft summary

| Draft claim | Audit finding and consequence |
| --- | --- |
| Eight independent volunteers | Four volunteers contributed eight task pairs. Treating tasks as people overstates the independent evidence. |
| All eight completed time pairs | Seven have both times. P7 has a missing guide measurement; its accuracy outcomes remain usable. |
| Faster in every pair | Faster in five eligible pairs, slower in two, with no time comparison possible for P7. |
| Total lookup time cut by 30 percent | The protocol calculation is 110/910, or 12.09%. The draft's 30% is unsupported. |
| Guide had eight correct first selections against seven | Each format had seven. P5's guide error remains an error despite coaching. There is no observed net accuracy improvement. |
| Coaching did not affect any result | Coaching was recorded on four format observations. Its effect cannot be isolated from these records; claiming no effect is unsupported. First selections were recorded before coaching. |
| Replace the card on every shift immediately; no uncertainty remains | The small staffed exercise leaves practice, assistance, missing timing and transfer to ordinary work unresolved. It supports a limited next check, not immediate standardization. |

## Limits that affect the decision

Repeating the same lookup can make the second attempt faster through practice. Balanced order within each volunteer reduces one source of imbalance but does not remove task-specific learning or isolate the guide's causal effect. P7's missing time also leaves the eligible set with three reference-first and four guide-first pairs. Tasks, volunteers and assistance differ across observations; the supplied records cannot separate those effects.

Only four people participated, with two observations each, and they were not a randomized sample of store volunteers. Treating all pairs as independent people would overstate precision. These descriptive totals do not provide a population-wide speed estimate, an independent replication, or a safety guarantee. No inferential confidence interval or significance claim is asserted from this small convenience exercise.

A lost measurement leaves one task's time comparison unknown, and the observed guide error on P5 requires understanding before broader use. First-bin accuracy alone does not establish safe handling or successful work across an entire shift. All records came from the same staffed exercise; the pack contains no later unattended shift, expanded study or live rollout. Performance in ordinary work remains untested.

## Limited next check for the coordinator to consider

The observed time reduction gives a reason to consider a bounded, staffed check. Before collecting anything, the coordinator should set its scope and decision criteria for accuracy, time, reliance on assistance and handling of errors. The current records do not justify inventing a universal percentage target or a sufficient sample size.

The proposed check should cover representative ordinary-work lookups and more varied volunteers, with a shift helper available and the reference card accessible. Review P5's wrong guide selection and P3's wrong reference selection to understand the task and any guide or label problem. Use balanced format order and comparable tasks that reduce direct repetition and memorization. Record volunteer and task identifiers, first selections before coaching, assistance separately, and both positive elapsed times; check measurements for completeness while the session is still staffed.

The coordinator should review errors and help requirements alongside any time saving before considering standardization. Proceeding further would require evidence that the guide remains accurate and usable in ordinary work. These are planning recommendations only; no volunteers have been contacted and no check has been launched.

## Corrected summary for use

> Four volunteers each performed two lookup tasks with both the reference card and the reorganized guide. Seven of the eight task pairs had complete timing records. Across those seven pairs, reference-card time totaled 910 seconds and guide time totaled 800 seconds, a saving of 110 seconds (12.09%). The guide was faster in five pairs and slower in two. Both formats produced seven correct first selections out of eight. Later coaching was recorded on two observations per format, and one guide time was missing. This small staffed exercise suggests a possible time benefit, while repeated tasks, assistance and limited participation leave performance in ordinary work uncertain. The evidence supports a further limited, staffed check before considering standardization.

## Verification record

- Read the full protocol, all three CSVs, capture notes, draft, both guide descriptions and supplied checker. No external evidence was used.
- Ran `node tools/check-evidence.cjs`: passed. It reported eight pairs, four volunteers, eight rows per outcome file and P7 as the only missing guide time. This checker establishes record structure, not the draft's benefit claims.
- Independently imported the CSVs with PowerShell `Import-Csv`, matched each reference and guide record to `pair_id`, and recomputed eligibility, totals, signs and first-selection counts. The results agree with the arithmetic above and `metrics.json`.
- Ran a separate inline Node verification against the written outputs: passed. It parsed the JSON, required exactly the ten specified numeric fields, independently recalculated every metric from the CSVs, and deliberately reordered outcome rows to check matching by ID. It also checked P7's exclusion from timing and retention for accuracy, within-volunteer order balance, assistance counts and every cell of the eight-row audit table. No dependencies were installed and no extra test files were retained.
- Recorded SHA-256 hashes of all ten supplied files before writing the audit and compared them afterward: all ten matched. Every supplied source remained byte-for-byte unchanged. Only `audit/findings.md` and `audit/metrics.json` were added; no volunteers were contacted, no external services were used and no further study was started.
