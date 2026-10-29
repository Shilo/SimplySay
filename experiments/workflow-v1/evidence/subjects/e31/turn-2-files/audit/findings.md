# Finding-parts guide study: evidence audit

## Decision

The evidence supports a limited, staffed next check, not standardizing the reorganized guide now. Across seven eligible task pairs, the guide used 110 fewer seconds in total, a 12.1% reduction against matched reference-card time. It was slower in two pairs. First-selection accuracy was 7/8 (87.5%) with each format. These are descriptive results from four volunteers in one staffed exercise; they do not establish an accuracy improvement, a population-wide speed benefit, or safety in ordinary work.

The [draft summary](../draft-summary.md) should not be used as written. A corrected summary is provided below. No volunteers were contacted, no further study was started, and all supplied sources were left unchanged.

## Sources and inclusion rules

The [recorded protocol](../study/protocol.md) governs the analysis. I reconciled [pair assignments](../evidence/pairs.csv), [reference records](../evidence/reference.csv), [guide records](../evidence/guide.csv), and [capture notes](../evidence/capture-notes.md). The [reference card](../guides/reference-card.txt) and [reorganized guide](../guides/reorganized-guide.txt) describe the formats and supply no additional outcome evidence. Both tell volunteers to check physical labels and ask a helper when unclear; those instructions do not demonstrate independent usability or safety.

There are eight task pairs, P1-P8, from four volunteers, V1-V4, with two tasks per volunteer. Each pair repeats the same lookup task with both formats. Each volunteer used the reference first for one task and the guide first for the other. This balances recorded order within volunteers but does not remove task familiarity, practice, or dependence between observations. The records do not establish random sampling or independent replication.

All three CSVs contain exactly one row for each pair ID, with no unmatched or duplicate IDs. Records were joined by `pair_id`. All recorded times are positive; the sole missing time is the guide value for P7. The capture notes say that stopwatch entry was lost during export and no other measurement exists in the pack. P7's 150-second reference time and its missing guide time are both excluded from the timing comparison. The missing value is neither zero nor a failure, and no time was imputed.

All eight pairs have observed first-selection outcomes for both formats. P7 remains in the accuracy denominator. `correct` describes the first bin selected before coaching; later help does not overwrite that observation. Timing eligibility and accuracy inclusion are separate rules.

## Reconciled observations

Seconds saved means reference minus guide; a negative value means the guide was slower. Outcome and assistance entries are shown as reference / guide. A dash marks an unavailable comparison, not zero.

| Pair | Volunteer / task | First format | Reference seconds | Guide seconds | Seconds saved | First selection | Later assistance |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| P1 | V1 / find_patch | reference | 120 | 90 | 30 | correct / correct | no / no |
| P2 | V1 / find_pump | guide | 100 | 95 | 5 | correct / correct | no / no |
| P3 | V2 / find_cable | reference | 160 | 100 | 60 | incorrect / correct | yes / no |
| P4 | V2 / find_tube | guide | 80 | 75 | 5 | correct / correct | no / no |
| P5 | V3 / find_brake | reference | 140 | 150 | -10 | correct / incorrect | no / yes |
| P6 | V3 / find_lamp | guide | 200 | 160 | 40 | correct / correct | yes / no |
| P7 | V4 / find_chain | reference | 150 (excluded) | missing | - | correct / correct | no / yes |
| P8 | V4 / find_valve | guide | 110 | 130 | -20 | correct / correct | no / no |

The first-selection cards and CSVs agree: P3 was incorrect with the reference card, and P5 was incorrect with the guide. Observers coached those tasks later. Reference assistance is also recorded at P6 despite a correct first selection; guide assistance is recorded at P7 despite a correct first selection and missing time. Thus each format has two assistance flags across eight observations. Equal assistance counts do not establish that coaching had no effect, and the pack does not isolate its effect on elapsed time or later performance.

## Independent calculations

Timing uses the identical eligible set on both sides: P1, P2, P3, P4, P5, P6, P8.

```text
Reference seconds = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910
Guide seconds     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800
Time saved        = 910 - 800 = 110 seconds
Pair differences  = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110 seconds
Percentage saving = (110 / 910) * 100 = 12.087912...% = 12.1% rounded
```

This percentage is the reduction in summed matched time, using matched reference seconds as the denominator. It is not an average of pair percentages or a promise about any individual lookup. The guide was faster in five eligible pairs (P1, P2, P3, P4, P6), slower in two (P5, P8), and tied in none; 5 + 2 + 0 = 7.

Accuracy uses all eight pairs, including P7:

```text
Reference correct = P1, P2, P4, P5, P6, P7, P8 = 7/8 = 87.5%
Guide correct     = P1, P2, P3, P4, P6, P7, P8 = 7/8 = 87.5%
Observed accuracy difference (guide minus reference) = 0 percentage points
```

Six pairs were correct with both formats. P3 changed from an incorrect reference selection to a correct guide selection; P5 changed in the opposite direction. Equal aggregate accuracy does not establish equivalent accuracy or safety. P5's guide error remains an error even though help followed.

[metrics.json](metrics.json) contains exactly the protocol's ten numeric fields. Percentage and uncertainty are kept in this document as required.

## Corrections to the draft

| Draft claim | Reconciled finding |
| --- | --- |
| Eight independent volunteers | Four volunteers supplied eight task pairs; each person contributed two pairs and used both formats. |
| All eight completed time pairs | Seven pairs have both times. P7 has no guide time and cannot enter either timing total. |
| Faster in every pair | Faster in five, slower in two, tied in zero eligible pairs. P5 took 10 seconds longer and P8 took 20 seconds longer with the guide. P7's speed is unknown. |
| Cut total lookup time by 30 percent | The protocol calculation gives 110 / 910 = 12.1% saved over the matched pairs. The claimed 30% is unsupported. |
| Eight correct guide first selections versus seven reference selections; improved accuracy | Both formats have seven correct first selections out of eight. The guide error is P5; the reference error is P3. |
| Coaching did not affect any result | Later help is recorded on reference P3/P6 and guide P5/P7. First selections remain as observed; the effect of help on timing, learning, or completion cannot be separated here. |
| Replace the card for every shift immediately; no uncertainty remains | The protocol and observations support a limited staffed check. They do not establish ordinary-work accuracy and usability, broad speed or safety guarantees, or grounds for immediate standardization. |

## Uncertainty and a bounded next check

The aggregate time saving is a useful local signal. Its generality remains uncertain: four volunteers are a small, nonrandom sample; two tasks per person are correlated; the same lookup is repeated with both formats; and everything happened within one staffed exercise. Counterbalanced order reduces one source of imbalance but cannot identify the guide's causal effect separately from practice and task differences. Excluding P7 also leaves three reference-first and four guide-first timing pairs, with only one eligible timing pair from V4. The missing time prevents a statement about all eight pairs' total speed.

Coaching and first-selection errors are material to interpretation. Three eligible timing pairs include help in one format (reference P3/P6 and guide P5). The protocol retains these pairs; excluding them would change the specified analysis. The records do not identify an assistance-free guide effect, whether errors arose from guide content or other causes, or how the formats perform on unattended ordinary shifts. There is no later-shift evidence in this pack. No confidence interval, significance claim, or guarantee based on eight independent people is justified by this audit; the results above are descriptive, with these design limits explicit.

Before standardization, the coordinator should resolve whether the guide stays accurate and usable during ordinary work. A useful next step would be a limited, staffed check with a written scope, a fixed small number of sessions or tasks, and pre-agreed criteria for deciding what to do afterward. That is a recommendation for planning, not authorization to launch a study. The plan should:

- Examine the P5 brake lookup and P8 valve lookup for possible wording, category, bin-code, or label problems. The current records show the error and slowdown but do not establish their causes.
- Include representative ordinary-work tasks and volunteers beyond these repeated lookups, with order balanced and fresh comparable tasks where practical to reduce practice effects.
- Capture the first selection before help, assistance and its timing separately, elapsed time with a backup capture method, and any label confusion or need for staff intervention. Retain missing values explicitly and check completeness before export.
- Define acceptable first-selection accuracy and assistance needs alongside speed, plus stop/review rules for wrong-bin selections or unresolved labels. Keep a helper available and review accuracy and usability before considering wider use.

No additional records are needed to correct this draft. What remains unresolved for an adoption decision is performance under ordinary work, including the guide's error, slower tasks, assistance needs, and the influence of repetition. These cannot be settled by reconstructing P7 or reclassifying coached errors.

## Corrected summary for the coordinator

> Four volunteers each completed two paired lookup tasks using the reference card and reorganized guide in counterbalanced order. Seven pairs had usable times for both formats. Across those matched pairs, total time was 910 seconds with the reference card and 800 seconds with the guide, a saving of 110 seconds (12.1%). The guide was faster in five pairs and slower in two. First-selection accuracy was 7/8 for each format across all eight pairs. A missing guide time, repeated tasks, coaching, and the small volunteer sample limit interpretation. The evidence supports a limited, staffed check of accuracy and usability in ordinary work before deciding whether to standardize the guide.

## Verification and source preservation

The supplied `node tools/check-evidence.cjs` passed: eight pair IDs, four volunteers, eight rows in each outcome file, and P7 as the only missing guide time. This is a structural check and was not treated as evidence for the draft's claims.

An independent calculation used PowerShell `Import-Csv`, keyed each format by pair ID, checked unique and complete IDs, validated flags and positive recorded times, and confirmed each volunteer's balanced order. It separately summed eligible reference and guide seconds and the pairwise differences, checked that both routes give 110 seconds, and reconciled faster/slower/tied counts and accuracy denominators. An initial Python invocation was unavailable on this machine; it produced no calculations or file changes, and the calculation was completed with installed PowerShell instead.

Final verification reparsed the sources and audit JSON with built-in Node.js modules, recomputed all ten metrics independently, and checked the exact JSON field set, numeric types, arithmetic, accuracy, assistance flags, and missing-time handling. Shuffling outcome rows left the computed metrics unchanged, confirming pair-ID matching. The structural check was rerun, and SHA-256 hashes of all ten supplied files matched hashes captured before writing the audit. Only `audit/findings.md` and `audit/metrics.json` were added. No packages, external services, or other projects were used.
