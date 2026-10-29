# Finding-parts guide evidence audit

## Decision

Recommend a limited, staffed next check before standardizing the reorganized guide. The current evidence does not support replacing the reference card on every shift. In this exercise, the guide took 800 seconds against 910 reference seconds on seven eligible task pairs: a saving of 110 seconds, or approximately 12.09%. It was faster on five pairs and slower on two. First-selection accuracy was equal: seven correct selections out of eight (87.5%) for each format.

These observations justify investigating the guide further, but they do not establish that the guide causes faster work or preserves accuracy in ordinary shifts. Four volunteers supplied the eight task pairs, tasks were repeated between formats, coaching occurred, and one guide time is missing. No later unattended shift, expanded study, or rollout is documented. The draft summary should not be used as written; a corrected replacement appears below.

## Scope and governing rules

Reviewed all ten supplied files: [README](../README.md), the [protocol](../study/protocol.md), [pair assignments](../evidence/pairs.csv), [reference records](../evidence/reference.csv), [guide records](../evidence/guide.csv), [capture notes](../evidence/capture-notes.md), [draft summary](../draft-summary.md), both [reference](../guides/reference-card.txt) and [reorganized](../guides/reorganized-guide.txt) guide texts, and the [structural checker](../tools/check-evidence.cjs). The protocol defines the calculations; the capture notes explain the missing time and the meaning of first-selection outcomes. The draft is an unchecked interpretation. The guide texts describe the lookup procedures and supply no additional outcome evidence.

Each pair represents one volunteer repeating the same lookup task with the two formats. Join records by `pair_id`. Use both times only when each is present and positive, with reference minus guide defining seconds saved. Divide the total saving by the reference total over those same eligible pairs. Count accuracy independently on every pair with recorded first-selection outcomes. Later assistance does not change an observed first selection. Do not impute timing.

The JSON companion, [metrics.json](metrics.json), contains exactly the ten numeric fields required by the protocol. Percentages and interpretation remain in this document.

## Reconciled observations

Positive savings mean the guide was faster. A missing time is not a zero. Correct/incorrect below describe the first bin selected, before later coaching.

| Pair | Volunteer | Task | First format | Reference seconds | Guide seconds | Seconds saved | Reference first selection | Guide first selection | Later assistance |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | V1 | find_patch | reference | 120 | 90 | 30 | correct | correct | none recorded |
| P2 | V1 | find_pump | guide | 100 | 95 | 5 | correct | correct | none recorded |
| P3 | V2 | find_cable | reference | 160 | 100 | 60 | incorrect | correct | reference |
| P4 | V2 | find_tube | guide | 80 | 75 | 5 | correct | correct | none recorded |
| P5 | V3 | find_brake | reference | 140 | 150 | -10 | correct | incorrect | guide |
| P6 | V3 | find_lamp | guide | 200 | 160 | 40 | correct | correct | reference |
| P7 | V4 | find_chain | reference | 150 | missing | excluded | correct | correct | guide |
| P8 | V4 | find_valve | guide | 110 | 130 | -20 | correct | correct | none recorded |

All three CSV files contain P1 through P8 exactly once. Each of V1 through V4 supplies two task pairs, with one reference-first and one guide-first pair. Thus order was balanced within each volunteer and four pairs used each order overall. These are eight task pairs from four people, not eight independent volunteers or independent replications.

P7's guide stopwatch value was lost during export. The capture notes explicitly say no alternative time is available. Exclude both P7's 150 reference seconds and its absent guide seconds from the time comparison. Retain P7's two correct first selections and its guide assistance flag. Neither task order nor another volunteer's record supplies a replacement time.

The capture notes and CSV outcomes agree: P3's reference first selection and P5's guide first selection were wrong, and observers later coached those tasks. The CSVs also record assistance on P6 reference and P7 guide, both after correct first selections. Assistance therefore appears on two of eight records per format, covering four distinct pairs. A correct initial choice does not mean no help was needed later. The pack does not establish the effect of coaching on elapsed time or eventual independent completion. All pairs with two valid times remain in the required timing calculation, including assisted or initially incorrect attempts.

## Independent arithmetic

Eligible timing pairs: P1, P2, P3, P4, P5, P6, P8.

```text
Reference seconds = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910
Guide seconds     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800
Seconds saved     = 910 - 800 = 110
Cross-check       = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110
Percentage saved  = (110 / 910) * 100 = 12.087912...%, reported as 12.09%
Faster pairs      = P1, P2, P3, P4, P6 = 5
Slower pairs      = P5, P8 = 2
Tied pairs        = 0
Direction check   = 5 + 2 + 0 = 7 eligible pairs
```

The percentage is the saving in matched total seconds divided by matched reference seconds. It is not an average of individual pair percentages. Summing all reference times gives 1,060 seconds, but that includes P7 and is not a valid denominator against seven recorded guide times. There is no basis in the matched calculation for the draft's 30% claim.

Accuracy uses all eight pairs, independently of stopwatch completeness:

| First-selection outcome | Pair IDs | Count |
| --- | --- | ---: |
| Both formats correct | P1, P2, P4, P6, P7, P8 | 6 |
| Reference incorrect, guide correct | P3 | 1 |
| Reference correct, guide incorrect | P5 | 1 |
| Both formats incorrect | none | 0 |

Reference accuracy is `(6 + 1) / 8 = 7 / 8 = 87.5%`; guide accuracy is also `(6 + 1) / 8 = 7 / 8 = 87.5%`. The observed difference is zero percentage points. Coaching cannot convert the two incorrect first selections into correct first selections. Equal observed totals do not establish equivalent accuracy in ordinary work or a safety guarantee.

## Corrections to the draft

| Draft assertion | Reconciled finding and consequence |
| --- | --- |
| Eight independent volunteers | Four volunteers, each contributing two pairs. Repeated observations from a person cannot be counted as additional independent people. |
| All eight completed time pairs | Seven pairs have both positive times. P7 lacks its guide time; timing excludes P7 while accuracy retains it. |
| Faster in every pair | Faster on five eligible pairs, slower on P5 and P8, with no ties. P7 has no measured speed comparison. |
| Cut total lookup time by 30% | Matched totals are 910 reference seconds and 800 guide seconds, saving 110 seconds or approximately 12.09%. |
| Eight correct guide first selections versus seven reference | Both formats have seven correct first selections out of eight. P5 is the guide error; P3 is the reference error. There is no observed accuracy improvement. |
| Coaching did not affect any result | Assistance was recorded for reference P3/P6 and guide P5/P7. Its influence on elapsed time is not isolated. Assistance occurred later and cannot rewrite first-selection outcomes. |
| Replace the reference card for every shift immediately; no uncertainty | The observed staffed exercise supports a limited next check. It does not establish readiness for standardization across volunteers and shifts. |

## Uncertainty and decision limits

The timing gain is a description of the seven measured task pairs. Every person saw both formats for a repeated task, so familiarity may affect the second attempt. Balanced order helps address order concerns but cannot remove practice or coaching effects. After excluding P7, the eligible subset contains three reference-first pairs and four guide-first pairs. As a descriptive check, reference-first pairs total 420 reference versus 340 guide seconds (80 seconds saved); guide-first pairs total 490 versus 460 (30 seconds saved). These small, different task groups cannot isolate an order effect or establish a causal guide effect.

Four people in a single staffed exercise provide little evidence about variation across volunteers, tasks, or ordinary shifts. The sample was not randomized from all store volunteers. The missing P7 time means the full eight-pair time difference is unknown; the audit makes no assumption that its omission is harmless or that its time would resemble another pair. Recorded speed includes attempts with wrong initial choices and later help, so it cannot be read as a measure of accurate, unaided task completion.

The observed guide error on P5 and slower guide times on P5/P8 deserve attention, but the records do not identify a specific fault in the guide text or prove that the guide caused these outcomes. Both guide texts direct users to check the physical label and ask a helper if it is unclear; neither text demonstrates that those safeguards work reliably. There is no outcome evidence from an unattended or ordinary-work rollout. This audit supplies no population speed guarantee, proof of equal accuracy, safety guarantee, or independent replication. It does not attach a confidence interval or significance claim based on treating the eight pairs as independent people.

## Limited next check for the coordinator to plan

The coordinator can use these findings to plan a bounded, staffed check before any decision to standardize. Keep the reference card and a shift helper available. Include tasks that probe the wrong guide selection on P5 and the slower guide attempts on P5/P8, alongside ordinary lookup work. This is a recommendation for planning; no volunteers have been contacted and no further study or rollout has been started.

Before a next check, the coordinator should set its scope, time limit and acceptance criteria: acceptable first-selection accuracy, when a wrong-bin choice or repeated need for help should halt and prompt revision, and what useful speed improvement would justify adoption. The current protocol supplies no thresholds for those decisions; this audit does not invent or retrospectively apply them.

Record every first selection before help, log assistance separately, retain complete matched times with a clear timing endpoint, and document missing measurements. Account for repeated people and task familiarity when choosing tasks and order. A limited check should resolve whether the guide remains accurate and usable during ordinary work, whether helpers are still needed, and whether the apparent time benefit persists. Only then should the coordinator reassess standardization.

## Corrected summary suitable for the coordinator

> Four volunteers each completed two matched lookup tasks using the reference card and the reorganized guide. Seven of the eight task pairs had usable times in both formats. Across those seven pairs, the reference card took 910 seconds and the guide took 800 seconds, an observed saving of 110 seconds (about 12.09%). The guide was faster on five pairs and slower on two. Across all eight pairs, each format had seven correct first selections (87.5%). Coaching occurred on two records per format, and one guide time was missing. Repeated tasks, a small group and staffed conditions limit what these results establish about ordinary shifts. The evidence supports planning a limited, staffed next check before deciding whether to standardize the guide.

## Verification and source preservation

- Ran `node tools/check-evidence.cjs` successfully with installed Node.js v25.0.0. It reported eight pair IDs, four volunteers, eight reference rows, eight guide rows and P7 as the only missing guide time. The checker verifies structure; its success does not validate the draft's benefit claims.
- Independently joined the CSVs by `pair_id` with PowerShell `Import-Csv` and calculated eligibility, totals, differences, speed counts, accuracy, order groups and assistance flags. A separate Node.js calculation from the source records agreed with all ten metrics, including the separate timing and accuracy denominators. The explicit arithmetic and pair ledger above provide a further transparent cross-check.
- Parsed the completed JSON and checked its exact field set, finite numeric values, totals, counts and agreement with the independently computed metrics. Confirmed `faster_pairs + slower_pairs + tied_pairs = eligible_time_pairs`, P7's timing exclusion and accuracy retention, both incorrect first selections, and all four assistance flags.
- Compared SHA-256 hashes for all ten supplied files before and after the audit; all were unchanged. The only files added are `audit/findings.md` and `audit/metrics.json`. All work used this local pack and installed tools, with no external sources, services, other projects, participant contact or new study.
