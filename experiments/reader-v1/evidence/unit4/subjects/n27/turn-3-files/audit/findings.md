The evidence supports a limited, staffed next check; it does not support standardizing the reorganized guide for every shift now. On the seven pairs with usable times, total recorded lookup time fell from 910 to 800 seconds, a saving of 110 seconds (12.1%). The guide was faster in five pairs and slower in two. First-selection accuracy was 7/8 (87.5%) for each format. These are descriptive results from four volunteers in one staffed exercise, with repeated tasks and coaching. They establish neither an accuracy improvement nor reliable performance in ordinary work.

This audit applies [the protocol](../study/protocol.md) to [the pair register](../evidence/pairs.csv), [reference records](../evidence/reference.csv), [guide records](../evidence/guide.csv), and [capture notes](../evidence/capture-notes.md). The two [reference](../guides/reference-card.txt) and [reorganized](../guides/reorganized-guide.txt) guide texts provide context only. The [draft summary](../draft-summary.md) is an unchecked claim source, not an outcome record. All supplied files remain unchanged; corrections and a suggested replacement summary are recorded here. No volunteers were contacted, and no study or rollout was started.

There are eight matched task pairs from four people: V1 has P1/P2, V2 P3/P4, V3 P5/P6, and V4 P7/P8. Each pair compares the same person's lookup task under both formats. Each volunteer used the reference first for one pair and the guide first for the other. The eight pairs are not eight independent volunteers or independent replications. All CSVs have one record per P1-P8, with no unmatched or duplicate pair IDs. Records were joined by pair_id, not row position.

The following table preserves the observed first selections and assistance flags. A positive saving means the guide took less time. Assistance describes later coaching, not a correction to the first-selection outcome.

| Pair | Volunteer | First format | Reference seconds | Guide seconds | Saving seconds | Reference first selection | Guide first selection | Later assistance |
| --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | V1 | Reference | 120 | 90 | 30 | Correct | Correct | None |
| P2 | V1 | Guide | 100 | 95 | 5 | Correct | Correct | None |
| P3 | V2 | Reference | 160 | 100 | 60 | Incorrect | Correct | Reference |
| P4 | V2 | Guide | 80 | 75 | 5 | Correct | Correct | None |
| P5 | V3 | Reference | 140 | 150 | -10 | Correct | Incorrect | Guide |
| P6 | V3 | Guide | 200 | 160 | 40 | Correct | Correct | Reference |
| P7 | V4 | Reference | 150 | Missing | Not comparable | Correct | Correct | Guide |
| P8 | V4 | Guide | 110 | 130 | -20 | Correct | Correct | None |

P7's guide stopwatch entry was lost during export. The notes explicitly say no other timing exists in the pack. Its missing time is neither zero nor a failure, and cannot be reconstructed. Exclude both P7 time records from the time comparison, including its observed 150 reference seconds. Retain P7's correct first selections and later guide assistance in their respective counts. All other recorded times are positive. Correctness and assistance do not alter time eligibility under the protocol, so P3, P5 and P6 remain in the main timing calculation.

The independently reconstructed timing calculation is:

```text
Eligible pairs: P1, P2, P3, P4, P5, P6, P8 (7)
Reference = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Guide     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Saving    = 910 - 800 = 110 seconds
Percent   = (110 / 910) * 100 = 12.087912...%, reported as 12.1%
Faster: P1, P2, P3, P4, P6 (5)
Slower: P5, P8 (2)
Tied: none (0)
```

The percentage uses the matched reference total as its denominator; it is not an average of individual percentage changes. Five faster plus two slower plus zero tied equals all seven eligible pairs. The draft's 30% saving is not reproducible under the protocol.

Accuracy uses all eight observed pairs independently of stopwatch availability. Reference is incorrect only at P3, and guide is incorrect only at P5. Both therefore have seven correct first selections out of eight (87.5%); the observed difference is zero percentage points. Six pairs are correct under both formats. P3 favors the guide and P5 favors the reference; no pair is incorrect under both. Equal observed totals do not establish equivalence or rule out a meaningful difference in ordinary work. Later coaching does not turn either incorrect first selection into a correct one.

Reference assistance is recorded at P3 and P6 (2/8); guide assistance at P5 and P7 (2/8). Four distinct pairs have assistance under one format. P6's reference and P7's guide first selections were already correct despite later assistance. Equal assistance counts do not establish that coaching had no effect. The pack does not isolate its effect on elapsed time or later completion, and the timing endpoint relative to coaching is not specified precisely enough to remove that uncertainty.

The draft requires the following corrections before use:

| Draft claim | Reconciled finding |
| --- | --- |
| Eight independent volunteers | Four volunteers, with two task pairs each in the same exercise. |
| All eight completed time pairs | Seven usable time pairs; P7's guide time is missing. The missing measurement does not establish noncompletion. |
| Faster in every pair | Faster in five eligible pairs, slower in P5 and P8; P7 cannot be compared. |
| Total lookup time cut by 30% | Matched totals are 910 versus 800 seconds, a 12.1% observed saving. |
| Guide first selections 8/8, versus reference 7/8 | Both are 7/8; guide P5 and reference P3 are incorrect. |
| Coaching did not affect any result | Coaching occurred under each format; its causal effect cannot be determined here. |
| Immediate replacement on every shift; no remaining uncertainty | The evidence supports only a limited next check, subject to the coordinator's decision. Ordinary-work accuracy and usability remain unestablished. |

The main uncertainty comes from design and coverage. There are only four people, not randomly sampled from all volunteers, each contributing repeated observations. Repeating the same lookup can introduce practice or familiarity effects. Counterbalanced order helps with order effects but does not eliminate them or establish randomized assignment. After P7 is excluded, the timing set contains three reference-first and four guide-first pairs; V4 contributes only P8 to the time comparison. The single missing guide time prevents describing total time for all eight pairs, and there is no basis for assuming its exclusion is harmless.

Two descriptive checks show why the aggregate should be treated cautiously. Among eligible reference-first pairs (P1, P3, P5), totals are 420 reference versus 340 guide seconds: 80 seconds saved (19.0%). Among eligible guide-first pairs (P2, P4, P6, P8), totals are 490 versus 460: 30 seconds saved (6.1%). These tiny groups contain different tasks and people, so this is not an estimate of a practice effect. For the four eligible pairs with no assistance under either format (P1, P2, P4, P8), totals are 410 versus 390: 20 seconds saved (4.9%). This selected subset is not a replacement for the protocol result or an estimate of what coaching caused; task difficulty and selection can also explain differences.

No confidence interval or population-wide speed estimate is warranted from treating the seven task differences as independent people. The exercise does not establish a safety guarantee, independent replication, an accuracy advantage, or transfer to unattended or ordinary shifts. The guide text alone supplies no further outcome evidence. The capture notes confirm that no subsequent unattended shift, expanded study, or live rollout has occurred.

If the coordinator chooses to proceed, the appropriate next step is a bounded, staffed check of representative ordinary lookup work before deciding on standardization. Keep staff help available, retain the reference card as a fallback, and pay particular attention to the guide error at P5 and slowdowns at P5/P8. Agree the scope, acceptance criteria and review point before starting. Record first selections before coaching, assistance separately, complete elapsed times with a defined endpoint, and order and task familiarity. Use fresh or comparable tasks to reduce immediate repeat-task learning and review outcomes across volunteers, without counting their repeated tasks as independent people. Judge accuracy, time, assistance and usability together; recurring incorrect selections or usability problems should trigger review. These are recommendations for a possible future check, not authorization to recruit, contact anyone or launch it. No new evidence is needed to complete this audit; a coordinator decision is needed before any next check.

A replacement for the draft's substantive summary is:

> Four volunteers each performed two paired lookup tasks with the reference card and reorganized guide. Seven pairs had usable times: the matched total fell from 910 to 800 seconds, an observed saving of 110 seconds (12.1%). The guide was faster in five pairs and slower in two. Both formats had seven correct first selections out of eight; later assistance was recorded twice under each format. P7's guide time is missing, but its observed first selection remains included. This small staffed exercise suggests a possible time benefit while leaving practice effects, coaching and ordinary-work performance uncertain. It supports a limited, staffed next check before considering standardization.

Routine verification for this audit: the supplied `node tools/check-evidence.cjs` structural check passed, reporting eight pairs, four volunteers, eight rows per outcome file, and P7 as the sole missing guide time. That checker does not test benefit claims. An independent local Node calculation joined by pair_id, excluded missing times without coercing blanks to zero, reconstructed every pair difference and all ten JSON metrics, and computed the descriptive percentages and assistance counts above. A separate PowerShell calculation using `Import-Csv` independently reproduced every JSON metric and the 12.087912...% saving. The exact ten-field numeric JSON schema, eligible pair IDs, timing count identity and subtraction identity all passed validation. All report source links resolve, and the audit directory contains only the two requested files. SHA-256 comparisons confirmed all ten supplied files are byte-for-byte unchanged from the pre-write snapshot. No verification failures remain. These checks establish consistency of the local audit, not external validity of the study.
