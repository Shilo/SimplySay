# Finding-parts guide study audit

## Decision

The evidence supports a limited, staffed next check, not standardizing the guide for every shift now. The matched records show a modest aggregate time saving, mixed task results, and no net first-selection accuracy improvement. Four volunteers in a repeated-task exercise cannot establish performance in ordinary work. The draft summary requires correction before use.

This audit reviews the supplied local pack only. No volunteers were contacted, no new study was started, and no rollout occurred as part of the audit. All supplied sources were left unchanged.

## Corrected summary for the coordinator

> Four volunteers each performed two matched lookup tasks using both formats, producing eight task pairs. Seven pairs had both stopwatch measurements. Across those seven pairs, the reference card took 910 seconds and the reorganized guide took 800 seconds, an aggregate saving of 110 seconds (12.1% of matched reference time). The guide was faster in five pairs and slower in two, with no ties. First-selection accuracy across all eight pairs was 7/8 (87.5%) for each format. Later coaching was recorded with both formats; its influence on elapsed time cannot be isolated. These observations support a limited staffed check of accuracy and usability in ordinary work before considering standardization. They do not establish a population-wide speed or safety guarantee.

## Sources and inclusion rules

The controlling rules are in [study/protocol.md](../study/protocol.md). Outcome records are [evidence/reference.csv](../evidence/reference.csv) and [evidence/guide.csv](../evidence/guide.csv), joined by `pair_id` to [evidence/pairs.csv](../evidence/pairs.csv). [evidence/capture-notes.md](../evidence/capture-notes.md) explains the missing stopwatch entry and the meaning of first selections and later coaching. [draft-summary.md](../draft-summary.md) is an unchecked historical claim, not an additional outcome source. The [reference card](../guides/reference-card.txt) and [reorganized guide](../guides/reorganized-guide.txt) supply procedural context only.

- Eight unique pair IDs, P1-P8, appear once in each CSV; they represent four people, V1-V4, with two task pairs each. The eight pairs are repeated observations, not eight independent participants or independent replications.
- Time eligibility requires two positive measurements for the same pair. P7's guide time is blank, and the notes say the stopwatch entry was lost during export with no alternative timing in the pack. Exclude both sides of P7 from time totals. Its 150-second reference observation cannot enter the matched denominator. Do not impute a guide time or interpret the blank as zero or failure.
- Accuracy uses all eight observed first selections, including P7. A later assisted completion does not change the first-selection result. Assistance does not itself make a time pair ineligible under this protocol.
- Each volunteer had one reference-first and one guide-first pair. This balances recorded order within people, but repeating the same lookup task can still introduce practice or familiarity effects. The sample was not randomly selected from all store volunteers.

## Record reconciliation

All times and differences below are seconds. Positive saved time favors the guide; negative saved time means it was slower. R means reference and G means guide. Coaching flags describe later assistance, independently of the first-selection outcome.

| Pair | Volunteer | First format | R time | G time | R minus G | R first correct | G first correct | Later coaching |
| --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | V1 | Reference | 120 | 90 | 30 | Yes | Yes | None |
| P2 | V1 | Guide | 100 | 95 | 5 | Yes | Yes | None |
| P3 | V2 | Reference | 160 | 100 | 60 | No | Yes | Reference |
| P4 | V2 | Guide | 80 | 75 | 5 | Yes | Yes | None |
| P5 | V3 | Reference | 140 | 150 | -10 | Yes | No | Guide |
| P6 | V3 | Guide | 200 | 160 | 40 | Yes | Yes | Reference |
| P7 | V4 | Reference | 150 | Missing | Not eligible | Yes | Yes | Guide |
| P8 | V4 | Guide | 110 | 130 | -20 | Yes | Yes | None |

P3's reference cable lookup and P5's guide brake lookup had incorrect first selections followed by coaching. Their incorrect outcomes remain incorrect. P6's reference lamp lookup and P7's guide chain lookup also record later assistance despite correct first selections. A correct first choice is therefore not evidence of fully independent completion. P7's retained correct guide card and assistance flag remain usable despite its lost timing.

## Independently checked calculations

The timing set is P1, P2, P3, P4, P5, P6 and P8. The sums use exactly this same set for each format:

```text
Reference = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Guide     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Saved     = 910 - 800 = 110 seconds
Saving %  = (110 / 910) * 100 = 12.087912...% = 12.1% rounded
```

This is the percentage reduction in the matched reference total, not an average of individual percentage changes. P1, P2, P3, P4 and P6 favor the guide (five pairs); P5 and P8 favor the reference (two pairs); none tie. P7 has no observed time comparison.

Accuracy has a separate denominator of eight pairs. The reference is correct in every pair except P3; the guide is correct in every pair except P5. Each is 7/8 = 87.5%, for an observed difference of zero percentage points. Six pairs are correct with both formats; one favors each format on accuracy. This shows no net observed accuracy improvement and does not establish equivalence or acceptable safety in ordinary use.

[metrics.json](metrics.json) contains exactly the ten numeric fields required by the protocol. It retains seven time pairs and eight accuracy pairs. Percentage, interpretation and uncertainty are kept here rather than added to that JSON object.

### Coaching and order: descriptive checks only

Reference assistance is flagged on P3 and P6; guide assistance is flagged on P5 and P7. Thus four format records across four task pairs involve coaching. The records do not isolate how that assistance affected elapsed time. They cannot support the draft's claim that coaching had no effect.

As a secondary sensitivity description, the four complete pairs with neither format assisted (P1, P2, P4, P8) total 410 reference seconds versus 390 guide seconds: 20 seconds saved, or 4.9%. They contain three faster guide results and one slower result. The other three timed pairs, which have assistance on one side, contribute 90 of the main 110 saved seconds. This shows that the aggregate is sensitive to which observed tasks are included; it neither estimates a causal coaching effect nor replaces the protocol's primary totals.

Among complete pairs, reference-first tasks (P1, P3, P5) total 420 reference seconds versus 340 guide seconds; guide-first tasks (P2, P4, P6, P8) total 490 versus 460. P7's missing guide measurement leaves three versus four complete pairs by order, although the original eight-pair schedule was balanced. These tiny groups contain different people/tasks and assistance patterns and cannot separate guide effects from order, practice or task difficulty.

## Corrections to the draft

| Draft claim | Audit finding |
| --- | --- |
| Eight independent volunteers | Four volunteers, each contributing two task pairs. Observations repeat people and tasks. |
| All eight completed time pairs | Only seven complete timing pairs. P7's guide time is missing; the missing value is not proof of noncompletion. |
| Faster in every pair | Faster in five eligible pairs, slower in P5 and P8, no ties; P7 is unknown for time. |
| Total lookup time cut by 30% | Matched totals are 910 versus 800 seconds: 110 seconds saved, or 12.1%. The protocol calculation does not support 30%. |
| Guide accuracy was eight out of eight versus seven | Both formats had seven correct first selections out of eight. P5's guide error must not be recoded after coaching. |
| Accuracy improved | No net observed accuracy improvement; one pair favors each format. Equal observed rates do not prove equivalence. |
| Coaching did not affect any result | Assistance is recorded in both formats; its effect on timing is unresolved. First-selection outcomes remain the pre-coaching observations. |
| Replace the reference on every shift immediately; no uncertainty | Unsupported by the small staffed exercise, missing timing, practice effects, coaching and lack of ordinary-work follow-up. |

## What a limited next check should resolve

The time saving is enough to justify considering a bounded staffed check, subject to the coordinator defining its scope and acceptance criteria. It does not justify immediate universal adoption. The current pack contains no unattended-shift outcomes, expanded sample or live rollout. Neither the size nor direction of the missing P7 time can be established, and complete-case results describe only the observed subset.

Before any next check, the coordinator should specify the ordinary-work tasks and shifts to cover, the first-selection accuracy requirement, what counts as acceptable usability and assistance, and when errors or confusion require pausing. No numeric adoption threshold or next-study sample size was supplied, so this audit does not invent one or declare an adoption test passed.

A limited staffed check should retain physical-label confirmation and helper access, examine the P5 brake error and P8 valve slowdown, and record first selection before coaching, complete paired times, order, assistance and recovery separately. Use fresh comparable tasks and a planned balanced order to reduce reliance on task repetition; keep volunteer identity so repeated tasks are not counted as independent people. The decision should prioritize accurate, usable performance in ordinary work and an understood need for help alongside any speed benefit. Sufficient observations and acceptance criteria need to be chosen before reconsidering standardization. These are planning recommendations only; no check is authorized or launched by this audit.

## Verification notes

- Read all ten supplied files, including the protocol, observations, unchecked draft, both guides and structural checker.
- Ran `node tools/check-evidence.cjs` successfully: eight pairs, four volunteers, eight rows per format and one missing guide time, P7. That checker validates structure only; it does not establish benefit claims.
- Independently joined the CSVs by `pair_id` and recalculated eligibility, signed differences, totals, accuracy, assistance and order descriptions using Node.js built-ins. A separate PowerShell `Import-Csv` calculation agreed on all ten required metrics and the percentage. No external packages or services were used.
- An initial attempt to use Python could not run because the installed command resolved to an inaccessible Windows application alias. No Python calculation succeeded or was relied on; Node.js and PowerShell supplied the independent arithmetic checks.
- Parsed the final JSON and checked its exact field set, numeric values, eligibility and count invariants against recomputation. Checked the written reconciliation rows, calculations and sensitivity descriptions against the records.
- Compared SHA-256 hashes for all ten supplied files before and after audit output creation; every source was unchanged. Only `audit/findings.md` and `audit/metrics.json` were added.
