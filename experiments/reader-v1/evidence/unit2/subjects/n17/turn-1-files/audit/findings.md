# Finding-parts guide study audit

## Decision

The evidence supports a limited, staffed next check. It does not support making the reorganized guide standard for every shift now. The seven usable time comparisons show an observed saving of 110 seconds, or about 12.1% of matched reference time, with five faster and two slower guide results. First-selection accuracy is 7/8 (87.5%) for each format. There is no observed aggregate accuracy improvement, and equal counts do not establish equivalent accuracy or safety.

The direction of the local timing result makes further checking reasonable. Four volunteers, repeated tasks, coaching, one missing time and the absence of ordinary-work follow-up leave the adoption claim unsupported. The draft summary should be replaced before use. All supplied sources, including that historical draft, are preserved; corrections are recorded here.

## Sources and reconciliation rules

The governing rules are in [study/protocol.md](../study/protocol.md). This audit reconciles [pairs.csv](../evidence/pairs.csv), [reference.csv](../evidence/reference.csv), [guide.csv](../evidence/guide.csv) and [capture-notes.md](../evidence/capture-notes.md), and checks each claim in [draft-summary.md](../draft-summary.md). The two files in `guides/` describe the formats; they provide no additional outcome observations. The README defines this pack as the complete supplied study.

- `pairs.csv` identifies eight task pairs, P1-P8, from four volunteers, V1-V4. Each volunteer contributed two pairs, with one reference-first and one guide-first task. Each pair contains both formats of the same lookup.
- Both outcome files contain exactly one record for each pair ID. Records were joined by `pair_id`, independently of row position. The recorded outcomes and assistance flags agree with the observation notes.
- Time eligibility requires two positive recorded times. P7's guide time is blank because its stopwatch entry was lost during export; the notes say no other timing exists in the pack. Exclude both sides of P7 from the timing totals, including its 150 reference seconds. Do not impute a guide time or count the blank as zero, a tie or a failure.
- First-selection outcomes are available for all eight pairs, including P7. These remain in the accuracy comparison. `correct` records the first bin selected before coaching; later assistance cannot change that outcome.
- Coaching was recorded for reference P3 and P6, and guide P5 and P7. P3's reference first selection and P5's guide first selection were wrong. P6's reference and P7's guide first selections were correct despite later assistance.

## Pair-level audit trail

Saved seconds means reference minus guide; positive means the guide was faster. First-selection outcomes below precede coaching. Assistance is listed separately.

| Pair | Volunteer | Task | First format | Reference seconds | Guide seconds | Saved seconds | Reference first selection | Guide first selection | Later assistance |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | V1 | find_patch | Reference | 120 | 90 | 30 | Correct | Correct | None |
| P2 | V1 | find_pump | Guide | 100 | 95 | 5 | Correct | Correct | None |
| P3 | V2 | find_cable | Reference | 160 | 100 | 60 | Incorrect | Correct | Reference |
| P4 | V2 | find_tube | Guide | 80 | 75 | 5 | Correct | Correct | None |
| P5 | V3 | find_brake | Reference | 140 | 150 | -10 | Correct | Incorrect | Guide |
| P6 | V3 | find_lamp | Guide | 200 | 160 | 40 | Correct | Correct | Reference |
| P7 | V4 | find_chain | Reference | 150 | Missing | Ineligible | Correct | Correct | Guide |
| P8 | V4 | find_valve | Guide | 110 | 130 | -20 | Correct | Correct | None |

## Independently checked calculations

### Elapsed time

Eligible IDs are P1, P2, P3, P4, P5, P6 and P8. Both sums use this identical set:

```text
Reference seconds = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910
Guide seconds     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800
Saved seconds     = 910 - 800 = 110
Paired differences = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110
Percentage saving = (110 / 910) * 100 = 12.087912...%, about 12.1%
```

The guide was faster for P1, P2, P3, P4 and P6 (five pairs), slower for P5 and P8 (two pairs), and tied in none. These counts sum to seven eligible pairs. The percentage is the protocol's ratio of matched totals, not an average of per-pair percentages. A 30% reduction cannot be reproduced under these rules. Including P7's reference time without a matched guide time would compare different sets and overstate the observed saving.

### First-selection accuracy and assistance

The accuracy denominator is eight pairs for each format, independent of time eligibility:

| Outcome | Reference card | Reorganized guide |
| --- | ---: | ---: |
| Correct first selections | 7/8 (87.5%) | 7/8 (87.5%) |
| Incorrect first selections | 1/8 (P3) | 1/8 (P5) |
| Recorded later assistance | 2/8 (P3, P6) | 2/8 (P5, P7) |

Six pairs were correct with both formats. P3 changed from an incorrect reference selection to a correct guide selection; P5 changed from a correct reference selection to an incorrect guide selection. No pair was incorrect with both formats. The net accuracy difference is zero percentage points. P7 contributes a correct first selection to both formats even though its guide time is missing.

Equal assistance counts do not show that coaching had no effect. The pack does not isolate its effect on elapsed time or later performance, or specify its position relative to the stopwatch interval. The primary timing calculation retains all seven eligible pairs as required; it does not selectively discard coached tasks. First-selection accuracy remains as observed before coaching.

## Corrections to the draft summary

| Draft claim | Reconciled finding |
| --- | --- |
| Eight independent volunteers | Four volunteers contributed eight task pairs. Observations from the same person are repeated, and each lookup was repeated across formats. |
| All eight completed time pairs | Seven usable time pairs; P7 lacks a guide time. All eight pairs have observed first selections. |
| Faster in every pair | Faster in five of seven timed pairs; slower in P5 and P8; no ties. P7 has no time comparison. |
| Total lookup time cut by 30% | Matched totals are 910 and 800 seconds, a 110-second saving, or about 12.1%. |
| Guide first selections 8/8 versus reference 7/8 | Both are 7/8. P5's guide first selection was incorrect; subsequent help does not convert it to a correct first selection. |
| Accuracy improved | Aggregate observed accuracy is unchanged; errors occurred on different tasks. The small record does not establish equivalence or superiority. |
| Coaching affected no result | Assistance is recorded in four format-specific observations. Its effect was not isolated; absence of effect is unsupported. |
| Replace the reference card on every shift immediately; no uncertainty remains | The pack contains one small staffed exercise, with no unattended shift, expanded study or live rollout. It supports a limited check before an adoption decision. |

Suggested replacement text for the coordinator:

> Four volunteers each completed two paired lookup tasks using the reference card and reorganized guide, with format order balanced within each volunteer. Seven pairs had both times recorded. Across those matched pairs, reference time totaled 910 seconds and guide time 800 seconds, an observed saving of 110 seconds (about 12.1%); the guide was faster in five pairs and slower in two. First-selection accuracy across all eight pairs was 7/8 for each format. Coaching occurred, and one guide time was lost. These results support a limited staffed check of accuracy and usability in ordinary work before deciding whether to standardize; they do not establish a general speed or safety guarantee.

## What remains uncertain

- **Practice and order:** Everyone repeated the same lookup across formats. Balanced order within each volunteer reduces systematic order imbalance but does not remove learning or familiarity. The eligible timing set has three reference-first and four guide-first pairs after P7 is excluded, so its balance is also incomplete.
- **Dependence and scope:** There are four people, not eight independent participants. The volunteers were not a random sample. V1-V3 each contribute two eligible timing pairs; V4 contributes only P8. The pooled 12.1% describes these recorded tasks and their time weights, not a guaranteed benefit for a typical person, task or shift. No population confidence interval or significance claim is justified here by treating the task pairs as independent people.
- **Missing measurement:** The notes identify export loss for P7, but supply no replacement time. Its exclusion follows the protocol; the resulting seven-pair result does not establish the effect across all eight lookups, and an export explanation alone does not establish that the missing value is uninformative.
- **Assistance and measurement:** All work was staffed, and assistance occurred under both formats. The record cannot separate guide effects from assistance or practice, or establish performance without a helper. Correct first selection and later completion are distinct outcomes.
- **Accuracy and transfer:** Each format had one first-selection error, on a different task. Equal totals are insufficient to establish comparable safety or accuracy in ordinary work. The pack provides no later shift observations, independent replication or evidence about all volunteer groups. The guide descriptions alone cannot supply that evidence.

## Bounded next check to consider

This is a recommendation for planning only. No volunteers have been contacted, no new records collected and no study or rollout started.

The coordinator should define a small, staffed check in ordinary work before revisiting standardization. Use an agreed, bounded mix of volunteers and realistic lookup tasks. Preserve a reference comparison, use comparable tasks and balanced order to reduce repeat-lookup learning, and record which person and task generated every observation. Do not treat repeated tasks from one person as independent participants.

Before collecting anything, agree on the timing interval, how coaching is recorded, missing-data rules, the scope of the check and the criteria for accepting accuracy, usability and time performance. Capture first selections before help, later assistance separately, and complete timing where available without reconstruction. Review the P5 brake lookup and its category/bin-label path to identify questions to check; this pack does not establish the cause of that error. The P8 slowdown is also a useful usability question. Staff should remain available as specified by both guide formats.

The unresolved adoption question is whether the reorganized guide remains accurate and usable across the intended volunteers, tasks and ordinary shifts with acceptable support needs. A time saving alone should not determine that decision. The coordinator must set those acceptance criteria and scope before any next check; the current records cannot supply a validated numerical threshold or sample size. Any broader adoption decision should depend on the resulting evidence.

## Verification notes

- Ran `node tools/check-evidence.cjs` successfully. It reported eight pair IDs, four volunteers, eight rows per format and P7 as the sole missing guide time. This supplied tool checks structure, not the draft's benefit claims.
- Independently read the CSVs with PowerShell `Import-Csv`, built lookups by `pair_id`, explicitly distinguished blank time from zero, and calculated the matched totals, differences, direction counts, first-selection counts and per-volunteer order balance. The pair table and arithmetic above reflect that calculation, not totals supplied by the checker or draft.
- Parsed `audit/metrics.json` as one JSON object and verified that it has exactly the ten protocol fields, each containing a numeric integer. All ten values match the independent PowerShell calculation. The saved-time identity and the faster/slower/tied count total also pass; both correct counts are within the accuracy denominator. Percentage and uncertainty appear only in this findings document, as required.
- Compared SHA-256 hashes of all ten supplied source files before and after creating the audit outputs. The source file set and every source hash are unchanged. The audit directory contains only the two requested deliverables.
- Verification used installed tools and local files only. No external services, other projects, volunteer contact or new study activity were used.
