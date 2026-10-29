# Finding-parts guide evidence audit

The evidence supports a limited, staffed next check, not standardizing the guide now. The recorded exercise shows a modest aggregate timing advantage with mixed pair results and no net first-selection accuracy improvement. The draft summary should not be used as written. This audit reviews only the supplied local pack; it does not authorize or start another study.

## Sources and reconciliation rules

The controlling rules are in [study/protocol.md](../study/protocol.md). Outcomes come from [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv), joined by `pair_id` to [pairs.csv](../evidence/pairs.csv). [Capture notes](../evidence/capture-notes.md) explain missing timing and coaching. [draft-summary.md](../draft-summary.md) is an unchecked historical interpretation. The two files under `guides/` describe the formats; they are not additional outcome evidence. README.md and the structural checker were also reviewed. All supplied sources remain unchanged.

There are eight task pairs from four volunteers, V1–V4, each contributing two pairs. Every pair repeats the same lookup task with both formats. Each volunteer used reference first for one task and guide first for the other. These observations are dependent within people and potentially affected by practice. They are not eight independent volunteers or independent replications.

Time comparisons require positive measurements for both formats in the same pair. P7's guide time is blank because its stopwatch entry was lost during export; the notes say no other timing exists. Exclude P7 from both time totals, including its otherwise valid 150-second reference time. Do not replace its missing time with zero, an estimate, or a failure. P7's observed correct first selection and later guide assistance remain in their respective counts.

`correct` records the first bin selected, before coaching. `assisted` describes later help and does not revise that first selection. All eight pairs have observed first selections for both formats, so all eight belong in the accuracy comparison, regardless of timing eligibility. Assisted pairs with complete times remain eligible under the protocol.

## Reconciled records

Times and savings are seconds. Savings are reference minus guide, so a negative value means the guide took longer. Correct and assisted columns list reference / guide. “Missing” is not a numerical value.

| Pair | Volunteer | First format | Reference time | Guide time | Saved | First correct, ref / guide | Assisted, ref / guide |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| P1 | V1 | Reference | 120 | 90 | 30 | Yes / Yes | No / No |
| P2 | V1 | Guide | 100 | 95 | 5 | Yes / Yes | No / No |
| P3 | V2 | Reference | 160 | 100 | 60 | No / Yes | Yes / No |
| P4 | V2 | Guide | 80 | 75 | 5 | Yes / Yes | No / No |
| P5 | V3 | Reference | 140 | 150 | -10 | Yes / No | No / Yes |
| P6 | V3 | Guide | 200 | 160 | 40 | Yes / Yes | Yes / No |
| P7 | V4 | Reference | 150 | Missing | Unavailable | Yes / Yes | No / Yes |
| P8 | V4 | Guide | 110 | 130 | -20 | Yes / Yes | No / No |

## Independently checked results

Eligible time pairs are P1, P2, P3, P4, P5, P6 and P8:

```text
Reference = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Guide     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Saved     = 910 - 800 = 110 seconds
Saving    = 110 / 910 × 100 = 12.087912...% (12.09%, or about 12.1%)
```

This is a reduction in aggregate time over the same seven pairs, using matched reference time as the denominator. It is not an average of pair percentages or a guarantee for a person, task or shift. Five pairs were faster with the guide (P1, P2, P3, P4, P6), two were slower (P5, P8), and none tied. P7 cannot be classified by speed. The time difference can also be checked by summing the pair differences: `30 + 5 + 60 + 5 - 10 + 40 - 20 = 110`.

Accuracy uses all eight pairs: reference 7/8 correct and guide 7/8 correct, both 87.5%, a difference of zero percentage points. Six pairs were correct with both formats; P3 changed from incorrect with reference to correct with guide, and P5 changed in the opposite direction. Neither format was incorrect on both versions of the same pair. Equal observed totals do not establish equivalent population accuracy or rule out task-specific problems.

Reference assistance is flagged on P3 and P6, and guide assistance on P5 and P7: two of eight attempts per format, across four distinct pairs. P3's reference error and P5's guide error remain errors after later coaching. P6 and P7 demonstrate that a correct first selection can still be followed by assistance. The flags do not establish how much coaching affected elapsed time; the pack does not separate elapsed time into periods before and after help.

[metrics.json](metrics.json) contains exactly the ten numeric fields required by the protocol. Percentages and interpretation are kept here rather than added to that schema.

## Corrections required before using the draft

| Draft claim | Reconciled finding |
| --- | --- |
| Eight independent volunteers | Four volunteers, two task pairs each; eight dependent task pairs. |
| All eight completed time pairs | Seven usable time pairs; P7's guide time is missing. First-selection records are complete for all eight. |
| Faster in every pair | Five faster, two slower, zero tied among seven eligible pairs; P7's direction is unknown. |
| Cut total lookup time by 30% | Matched totals are 910 and 800 seconds, a 110-second reduction of 12.09%. The claimed 30% is not supported by the prescribed calculation. |
| Guide had eight correct first selections versus seven | Both had seven out of eight. P5's guide first selection was incorrect before coaching. |
| Improved accuracy | No net observed accuracy improvement; one pair favored each format. |
| Coaching did not affect any result | Assistance occurred with both formats. Its effect on time cannot be isolated, and later completion cannot replace first-selection outcomes. |
| Replace the card for every shift immediately; no uncertainty | The small staffed exercise leaves accuracy, usability and transfer to ordinary work unresolved. It does not support immediate standardization. |

A corrected summary suitable for the coordinator is:

> Four volunteers each completed two paired lookup tasks using the reference card and reorganized guide. Seven pairs had usable times for both formats. Across those pairs the guide took 800 seconds versus 910 for the reference card, saving 110 seconds (12.1%); it was faster in five pairs and slower in two. Both formats had seven correct first selections out of eight. Assistance occurred with both formats. These local observations justify a limited, staffed next check, with particular attention to accuracy and ordinary-work usability, before deciding whether to standardize.

## Uncertainty and decision limits

The aggregate time difference is descriptive evidence of potential benefit. Four volunteers from a nonrandom sample do not establish a population effect. Repeating the same task introduces familiarity; balancing first format within each volunteer helps with order but does not remove practice, task differences or assistance effects. Both guide and reference explicitly allow asking a helper, so staffing is part of the observed context.

The missing guide time also makes the eligible time sample uneven by order: three reference-first pairs and four guide-first pairs. In the eligible reference-first group, totals were 420 versus 340 seconds (80 saved); in the guide-first group, 490 versus 460 (30 saved). These small descriptive groups do not isolate an order effect, but show why the overall saving cannot be attributed solely to the changed guide. There is no evidence that the missing measurement is representative of the others, so the seven-pair percentage should not be extended to all eight.

As an exploratory sensitivity check only, the four eligible pairs with no assistance in either format (P1, P2, P4, P8) total 410 versus 390 seconds: 20 seconds saved, or 4.88%. This is not the protocol's primary estimate and is not a causal estimate of an unassisted guide effect: removing observations according to assistance selects a different, very small task subset. It does demonstrate that the observed aggregate advantage depends substantially on pairs where assistance occurred. Equal assistance counts alone cannot establish that coaching was irrelevant.

There is one observed first-selection error under each format, with the guide error on the brake task (P5). The records establish that error, not its cause, consequences or a defect in a particular guide instruction. No safety outcome or guarantee follows from these lookup records. There is no later unattended shift, broader volunteer sample, ordinary-work validation or independent replication in this pack. No confidence interval or significance claim treating eight pairs as independent people is warranted here; the uncertainty is chiefly about dependence, practice, assistance, missing timing and transfer beyond this exercise.

## Limited next check for the coordinator to consider

Keep standardization pending. A useful next step would be a bounded, staffed check during ordinary work, with scope and review rules agreed before it starts. This is a recommendation only; no volunteers have been contacted and no check or rollout has been initiated.

Before such a check, the coordinator would need to resolve:

1. **Scope and staffing:** choose a fixed task/session limit, a responsible helper and reviewer, and tasks and volunteers that give useful coverage of ordinary work. Include the observed brake-task difficulty and slower valve-task result for review without presuming a cause.
2. **Comparable measurement:** retain volunteer and task IDs, record order, distinguish first-selection accuracy from eventual completion, record assistance and when it occurs, and check timing completeness immediately. Reduce reliance on repeating an identical lookup, and account for practice and repeated observations when interpreting comparisons. Continue to report missing timings explicitly.
3. **Decision and stop rules:** agree acceptable accuracy, usability and assistance levels, and what timing benefit would justify a change. Pause a task for a wrong or unclear bin selection and use the helper/reference fallback; review errors and slower tasks before expanding use. Do not trade an accuracy problem for aggregate speed. No numerical adoption threshold or required sample size was specified in this pack, so this audit does not invent one as an established standard.

The next decision should use evidence that the changed guide remains accurate and usable under ordinary conditions, together with complete, comparable timings and assistance records. The current exercise alone cannot settle that decision.

## Verification and routine testing notes

- Reviewed all ten supplied files. Checked ID uniqueness and matching across the three CSVs, positive nonmissing timing values, Boolean outcome/assistance fields, volunteer/task counts and order balance. Eight distinct lookup tasks map to eight pairs, with two pairs per volunteer.
- Ran `node tools/check-evidence.cjs` successfully. It reported eight pair rows, four volunteers, eight records per format and P7 as the sole missing guide time. Its structural checks do not establish benefit claims.
- Independently parsed the CSVs with installed Node.js built-ins, joined records by `pair_id`, explicitly treated blank timing as missing, recalculated eligibility, sums, pair directions, accuracy and assistance, and checked that the difference of totals equals the sum of paired differences. The calculation did not reuse or modify the supplied checker.
- Cross-checked the required metrics with a separate PowerShell calculation using `Import-Csv`; validated the exact JSON field set, numeric types and values. Confirmed all required counters and sums, including `5 + 2 + 0 = 7` eligible time pairs and eight accuracy pairs.
- Compared SHA-256 hashes of all ten supplied files before and after output creation; every source remained unchanged. Removed the temporary audit calculation record after verification. Final deliverables are this report and metrics.json.

All calculations and checks were local. No external information, volunteer contact, additional study or spending was used.
