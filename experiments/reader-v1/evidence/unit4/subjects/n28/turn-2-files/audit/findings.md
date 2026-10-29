# Finding-parts guide study audit

## Decision

The evidence supports a limited, staffed next check, not standardizing the reorganized guide now. In this exercise the guide used 110 fewer seconds across seven complete task pairs (910 reference seconds versus 800 guide seconds), a 12.09% reduction in matched total time. It was faster in five eligible pairs and slower in two. First-selection accuracy was 7/8 (87.5%) for each format. These observations show a possible local time benefit without an observed aggregate accuracy gain; they do not establish reliable performance across volunteers or ordinary shifts.

The draft summary should not be used as written. A corrected, copy-ready summary appears below. No volunteer contact, new data collection, additional study, or rollout was undertaken for this audit.

## Sources and rules applied

The audit used only the supplied local pack. [The protocol](../study/protocol.md) defines the units, inclusion rules and JSON fields. [pairs.csv](../evidence/pairs.csv) supplies volunteer, task and order; [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) supply the measured outcomes. [Capture notes](../evidence/capture-notes.md) explain the missing stopwatch entry and distinguish first selection from eventual completion after coaching. These sources agree. [The draft](../draft-summary.md) is explicitly unchecked historical input and conflicts with them. The two guide texts explain the lookup procedures and helper instructions; they add no outcome observations or evidence of later use.

- Join records by `pair_id`. Each source has one record for each ID P1 through P8, with no duplicates or unmatched IDs.
- The study has four volunteers, V1 through V4, each with two task pairs. A pair is the same person doing the same lookup task in both formats. Eight task pairs are repeated observations from four people, not eight independent volunteers.
- Each volunteer has one reference-first and one guide-first pair. The eight recorded pairs therefore contain four of each order.
- Include a pair in timing only when both elapsed times are positive. P7 has a positive reference time but a blank guide time, so exclude both sides of P7 from timing totals and direction counts. Do not treat the blank as zero or infer its value.
- Use all eight observed first-selection outcomes for accuracy, including P7. Later coaching does not change whether the first selection was correct.
- Keep assisted trials in the protocol timing and accuracy summaries when otherwise eligible. Record assistance as an interpretation limitation; the protocol does not authorize excluding it from the primary totals.
- [metrics.json](metrics.json) contains exactly the ten numeric fields required by the protocol. Percentages, interpretation and uncertainty remain in this document.

## Reconciled timing records

All times and differences below are seconds. A positive difference means the guide was faster. "First" is the format tried first for that task, not an accuracy outcome.

| Pair | Volunteer | Task | First | Reference | Guide | Reference minus guide | Timing disposition |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| P1 | V1 | find_patch | Reference | 120 | 90 | +30 | Include; faster |
| P2 | V1 | find_pump | Guide | 100 | 95 | +5 | Include; faster |
| P3 | V2 | find_cable | Reference | 160 | 100 | +60 | Include; faster |
| P4 | V2 | find_tube | Guide | 80 | 75 | +5 | Include; faster |
| P5 | V3 | find_brake | Reference | 140 | 150 | -10 | Include; slower |
| P6 | V3 | find_lamp | Guide | 200 | 160 | +40 | Include; faster |
| P7 | V4 | find_chain | Reference | 150 | Missing | Not calculable | Exclude from timing only |
| P8 | V4 | find_valve | Guide | 110 | 130 | -20 | Include; slower |
| Eligible total | 4 people | 7 pairs | 3 reference first; 4 guide first | 910 | 800 | +110 | 5 faster; 2 slower; 0 tied |

Independent arithmetic:

```text
Eligible IDs = P1, P2, P3, P4, P5, P6, P8
Reference seconds = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910
Guide seconds     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800
Time saved        = 910 - 800 = 110 seconds
Difference check  = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110 seconds
Percentage saving = (110 / 910) * 100 = 12.087912...% = 12.09% rounded
Direction check   = 5 faster + 2 slower + 0 tied = 7 eligible pairs
```

This percentage uses matched reference seconds as the denominator, as required; it is not an average of the individual percentage changes. Summing all recorded reference times would yield 1,060 seconds, but that includes P7's 150 seconds and is not a valid comparator for the seven guide times. No valid protocol calculation supports the draft's 30% claim. P7's guide time was lost during export, and the capture notes state that no replacement exists in the pack. Its timing direction and its effect on an eight-pair total are unknown.

### Volunteer and order checks

These are descriptive breakdowns of the same records, not additional independent evidence.

| Volunteer | Eligible timing pairs | Reference seconds | Guide seconds | Seconds saved |
| --- | ---: | ---: | ---: | ---: |
| V1 | 2 | 220 | 185 | +35 |
| V2 | 2 | 240 | 175 | +65 |
| V3 | 2 | 340 | 310 | +30 |
| V4 | 1 | 110 | 130 | -20 |
| Total | 7 | 910 | 800 | +110 |

V4's row represents P8 only; P7 cannot be used to estimate that volunteer's total benefit. The complete timing subset has three reference-first pairs (420 reference seconds, 340 guide seconds, 80 saved) and four guide-first pairs (490 reference seconds, 460 guide seconds, 30 saved). Although order was balanced within each volunteer in the full exercise, P7's exclusion removes that balance from the complete timing subset. Neither this small breakdown nor the original counterbalancing separates guide effects from task familiarity, coaching and order effects.

## First-selection accuracy and assistance

Correctness describes the first bin selected before coaching. Assistance describes later coaching and is a separate field.

| Pair | Reference first selection | Guide first selection | Reference assisted later | Guide assisted later |
| --- | --- | --- | --- | --- |
| P1 | Correct | Correct | No | No |
| P2 | Correct | Correct | No | No |
| P3 | Incorrect | Correct | Yes | No |
| P4 | Correct | Correct | No | No |
| P5 | Correct | Incorrect | No | Yes |
| P6 | Correct | Correct | Yes | No |
| P7 | Correct | Correct | No | Yes |
| P8 | Correct | Correct | No | No |
| Total | 7/8 correct | 7/8 correct | 2/8 assisted | 2/8 assisted |

The reference error is P3; the guide error is P5. P3 improves from incorrect to correct, while P5 worsens from correct to incorrect; the other six pairs are correct with both formats. Thus both formats have 87.5% first-selection accuracy, with a difference of zero percentage points. Equal observed totals do not establish equivalent accuracy or guarantee that the guide will preserve accuracy in ordinary work.

The capture notes confirm coaching after P3's reference error and P5's guide error. The records also flag assistance on P6 reference and P7 guide even though their first selections were correct. There are four assisted format attempts across four task pairs. P3, P5 and P6 remain eligible for timing; P7 remains eligible for accuracy. Coding assisted eventual completion as first-selection success would contradict the protocol and conceal the observed errors.

There is no separate timing for coaching or an unassisted comparison that isolates its effect. The audit therefore cannot quantify how assistance changed elapsed time, later performance or eventual completion. The draft's claim that coaching had no effect is unsupported. Both guide texts explicitly instruct volunteers to ask a helper when a label is unclear; the staffed exercise does not establish performance without that support.

## Corrections required in the draft

| Draft claim | Audited correction and consequence |
| --- | --- |
| "Eight independent volunteers" | Four volunteers provided eight task pairs. Repeated observations from the same person are not independent participants. |
| "All eight completed time pairs" | Only seven pairs have both measured times. P7's guide time is missing, while its accuracy outcome is retained. |
| "Faster in every pair" | Five eligible pairs are faster, two are slower (P5 and P8), none tie, and P7 cannot be classified. |
| "Cut total lookup time by 30 percent" | Matched time decreased from 910 to 800 seconds: 110 seconds, or 12.09%. |
| "Eight correct first selections out of eight ... improved accuracy" | Both formats have seven correct first selections out of eight. Guide P5 is incorrect; later help cannot change that outcome. |
| "Coaching did not affect any result" | Assistance is recorded on reference P3/P6 and guide P5/P7. Its effect cannot be separated from these records. |
| "Replace the reference card for every shift immediately" | The observed local benefit supports considering a limited staffed check. Accuracy and usability in ordinary work remain unestablished. |
| "No further uncertainty affects that decision" | Missing timing, four-person coverage, repeated tasks, coaching and lack of ordinary-shift evidence materially limit the decision. |

## Uncertainty and decision limits

1. **Few people and repeated tasks.** Each person contributes two pairs, and each lookup is repeated across formats. Familiarity can change the second attempt. Order balancing helps describe the exercise but does not eliminate learning or make pairs independent. The volunteers were not a randomized sample of all store volunteers.
2. **Incomplete timing.** P7's first-selection record survives but its guide time does not. The seven-pair timing result cannot be extended to all eight pairs. There is no evidence that the missing time is typical of the observed times.
3. **Assistance and errors.** The guide still has a wrong first selection, and both formats have coached attempts. Equal totals do not show that the formats are equally accurate, that coaching is unnecessary, or that incorrect selections have no consequences. The pack does not establish why P5 was wrong.
4. **Transfer to ordinary work.** Every observation came from the same staffed exercise. There is no later unattended shift, broader check or rollout. The record cannot establish a population-wide speed guarantee, a safety guarantee or independent replication.

The audit reports a descriptive matched time reduction, not a causal estimate of what every shift would save. No confidence interval or significance claim based on treating eight pairs as eight independent people is appropriate. The observed equal accuracy totals are also insufficient for a claim of equivalence. These limitations do not erase the measured local time reduction; they limit its use as grounds for standardization.

## Proposed limited next check; not initiated

The coordinator can use these results to plan a bounded, staffed check of accuracy and usability during ordinary lookup work. Keep the reference card available and retain a helper while evaluating the guide. Before any check is authorized or started:

- Agree on a small task and volunteer scope, including relevant ordinary-work conditions, and on decision rules for acceptable first-selection accuracy, assistance, usability and complete timing. The existing protocol supplies no adoption threshold; this audit does not invent one or claim it has been met.
- Review the P5 brake lookup path and any unclear category, bin code or physical label. The generic guide text and single error do not identify a cause; investigate rather than assuming which guide change would fix it.
- Reduce practice effects with comparable fresh tasks where feasible; record task identity and format order and balance order deliberately. Keep each person's repeated observations identifiable when reviewing results.
- Capture first selection before coaching, log later assistance separately, and ensure both times are recorded with a backup capture method. Specify how incomplete pairs will be handled before reviewing outcomes; do not reconstruct lost times.
- Set a review point before expanding use, and specify when wrong-bin selections or persistent confusion require pausing the check for correction. Evaluate whether ordinary-work accuracy and usability support standardization, rather than using speed alone.

These are planning recommendations only. No new participants, contact, data collection or operational change is authorized by this audit. No missing information is needed to complete the present audit; the coordinator needs to settle scope and acceptance rules before a next check, not before using the corrected description of this exercise.

## Corrected summary for the coordinator

> Four volunteers each completed two paired lookup tasks with the reference card and reorganized guide in one staffed exercise. Seven pairs had both stopwatch measurements. Across those matched pairs, time totaled 910 seconds with the reference card and 800 seconds with the guide, a reduction of 110 seconds (12.09%). The guide was faster in five pairs and slower in two. Both formats had seven correct first selections out of eight; P7's missing guide time did not remove its recorded correct first selection. Coaching occurred with both formats, and its effect cannot be isolated. These repeated tasks from four volunteers suggest a local time benefit, but practice effects, missing timing and lack of ordinary-work evidence remain. The evidence supports a limited staffed next check before deciding whether to standardize the guide.

## Verification record

All checks below passed. The supplied structural checker was used only for its stated scope; benefit claims were recalculated independently.

| Check | Method and actual result |
| --- | --- |
| Supplied structural check | Ran `node tools/check-evidence.cjs` successfully: eight pairs, four volunteers, eight rows per outcome file, and only P7 missing a guide time. This checks shape, IDs and missing cells; it does not establish a benefit. |
| Independent primary calculation | Parsed the CSVs with PowerShell `Import-Csv`, constructed maps keyed by `pair_id`, applied the protocol eligibility rule and summed matched times and all first-selection outcomes. Result: seven eligible time pairs, 910 reference seconds, 800 guide seconds, 110 saved, five faster, two slower, zero tied, and seven correct out of eight for each format. |
| Separate arithmetic and schema verification | Ran an independent inline Node.js calculation using only installed built-in modules. It read the original CSVs, independently joined IDs and recomputed outcomes. Its results exactly matched both the separate PowerShell calculation and `audit/metrics.json`. JSON parsed as one object with exactly the ten required numeric fields; every value was a numeric integer. |
| Order independence and inclusion | Independently reversed/reordered the input rows and obtained the same metrics. Verified the seven eligible IDs explicitly, P7's blank guide time and retained correct/assisted flags, the P3 reference and P5 guide errors, and all four assistance flags. No timing was imputed. |
| Count and percentage identities | Verified that pair differences sum to 110 seconds, faster/slower/tied counts sum to seven, the saving rounds to 12.09%, and accuracy is 87.5% for each format. Also verified four volunteers with two pairs each and one of each first format per volunteer. |
| Findings references | Verified that every Markdown file link in the findings resolves to an existing file inside this pack. Reviewed the timing, accuracy, volunteer and order breakdowns against the reconciled records. |
| Source preservation and output scope | Compared SHA-256 fingerprints of all ten supplied files before and after writing the audit; every fingerprint matched. The complete file inventory contained those same sources plus only `audit/findings.md` and `audit/metrics.json`. |

The arithmetic checks establish agreement with the supplied records and protocol, not the draft's claims about ordinary-work effectiveness. No external service, added dependency, volunteer contact or new observation was used.
