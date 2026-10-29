# Finding-parts guide evidence audit

## Decision

The supplied evidence supports a limited, staffed next check, not standardizing the reorganized guide across every shift now. The observed matched timing result favors the guide, but there are slower pairs, unchanged aggregate first-selection accuracy, missing timing, coaching, repeated tasks and only four volunteers. Ordinary-work accuracy and usability remain unestablished. Do not use the draft summary without the corrections below.

This audit reviews the complete supplied local pack. It does not authorize or initiate another study, contact with volunteers, or a rollout. All supplied sources are preserved; corrections are recorded here and in [metrics.json](metrics.json).

## Corrected summary for the coordinator

Four volunteers each compared the reference card and reorganized guide on two lookup tasks, producing eight matched task pairs. Seven pairs have both elapsed times. Over those seven pairs, reference time totaled 910 seconds and guide time 800 seconds: 110 seconds saved, or approximately 12.1% of matched reference time. The guide was faster in five pairs and slower in two, with no ties. First-selection accuracy, retained for all eight pairs, was 7/8 (87.5%) for each format. Both formats involved later assistance. These are descriptive results from a small staffed exercise with repeated tasks, not evidence of a universal speed benefit, improved accuracy, safety, or readiness for every shift. A limited staffed check in ordinary work is warranted before deciding on standardization.

## Protocol and evidence reconciliation

The inclusion and calculation rules come from [study/protocol.md](../study/protocol.md). [evidence/pairs.csv](../evidence/pairs.csv) supplies participant, task and format order; [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) supply outcomes and timings. [capture-notes.md](../evidence/capture-notes.md) explains the lost stopwatch entry and preserves the meaning of first selection and assistance. The guide texts describe the formats, not additional observations. [draft-summary.md](../draft-summary.md) is explicitly unchecked and is not an outcome source.

- The records join uniquely by `pair_id`, P1 through P8, in all three CSVs. Each of V1 through V4 contributes two task pairs. These are eight repeated task comparisons from four people, not eight independent volunteers or independent replications.
- Every volunteer has one reference-first and one guide-first pair. The full exercise is counterbalanced within volunteer, with four pairs in each order. This does not eliminate familiarity or practice from repeating the same lookup task. After excluding P7 from timing, three timed pairs are reference-first and four are guide-first.
- P7 has a 150-second reference time and a blank guide time. Capture notes say the guide stopwatch entry was lost during export and no replacement exists in the pack. Exclude both sides of P7 from the timing totals. Do not substitute zero, impute a duration or infer failure. Retain P7's correct first selections and guide assistance flag.
- First selection is observed before coaching. P3's reference selection and P5's guide selection were incorrect; later coaching does not change those outcomes. P6's reference and P7's guide selections were correct despite later assistance.
- No records describe a later unattended shift, independent replication, expanded study or live rollout. The observations all come from the same staffed exercise.

## Pair-level reconciliation

Times and differences are seconds. Difference is reference minus guide: positive means the guide was faster. Accuracy and assistance entries are reference / guide; Y and N mean yes and no. A dash indicates that no timing difference is calculable.

| Pair | Volunteer | Task | First format | Reference time | Guide time | Difference | First correct R/G | Assisted R/G |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| P1 | V1 | find_patch | reference | 120 | 90 | +30 | Y / Y | N / N |
| P2 | V1 | find_pump | guide | 100 | 95 | +5 | Y / Y | N / N |
| P3 | V2 | find_cable | reference | 160 | 100 | +60 | N / Y | Y / N |
| P4 | V2 | find_tube | guide | 80 | 75 | +5 | Y / Y | N / N |
| P5 | V3 | find_brake | reference | 140 | 150 | -10 | Y / N | N / Y |
| P6 | V3 | find_lamp | guide | 200 | 160 | +40 | Y / Y | Y / N |
| P7 | V4 | find_chain | reference | 150 (excluded) | missing | - | Y / Y | N / Y |
| P8 | V4 | find_valve | guide | 110 | 130 | -20 | Y / Y | N / N |

## Independent calculations

Eligible timing IDs are P1, P2, P3, P4, P5, P6 and P8. All their times are positive. Timing eligibility does not depend on accuracy or assistance; dropping an incorrect or assisted pair would change the protocol's analysis.

```text
Matched reference seconds = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910
Matched guide seconds     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800
Time saved                = 910 - 800 = 110 seconds
Percentage saving         = (110 / 910) * 100 = 12.087912...%, about 12.1%
Pair differences          = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110
```

This is the percentage reduction in matched total time, using matched reference seconds as denominator. It is not an average of individual percentage reductions. The full reference-column total is 1,060 seconds, but using it against the seven guide times would compare different sets of tasks. P7's 150 seconds must also be removed from the reference total.

- Faster: P1, P2, P3, P4 and P6 (5 pairs).
- Slower: P5 and P8 (2 pairs).
- Tied: none (0 pairs). These counts sum to the 7 eligible timing pairs.
- Accuracy denominator: all 8 pairs, including P7. Reference is incorrect only on P3; guide is incorrect only on P5. Thus each is 7/8 = 87.5%, with a guide-minus-reference difference of 0 percentage points.
- Six pairs have both first selections correct; P3 favors the guide and P5 favors the reference. No pair has both first selections incorrect. Equal totals therefore do not establish equivalent accuracy or absence of guide-specific errors.
- Reference assistance: P3 and P6 (2/8). Guide assistance: P5 and P7 (2/8). Equal assistance counts do not show that coaching had no effect. The flags do not quantify its duration or effect on elapsed time, and there is no comparison that isolates coaching from the guide.

[metrics.json](metrics.json) contains exactly the protocol's ten numeric fields. Percentages, missingness explanations and uncertainty are intentionally kept in this findings file.

## Corrections to the draft

| Draft assertion | Audit finding and required correction |
| --- | --- |
| Eight independent volunteers | Four volunteers, each contributing two task pairs; repeated observations are clustered within people. |
| All eight completed time pairs | Seven usable time pairs. P7's guide timing is missing; its first-selection record remains usable. |
| Faster in every pair | Faster in five of seven timed pairs; slower on P5 and P8; no ties. P7 cannot be classified for speed. |
| Total lookup time cut by 30% | Matched totals are 910 versus 800 seconds, saving 110 seconds or about 12.1%. The supplied eligible records do not support 30%. |
| Guide had eight correct first selections versus seven | Both formats have seven correct first selections out of eight. P5's guide error remains an error after coaching. |
| Coaching did not affect any result | Assistance occurred in both formats. First-selection outcomes precede coaching, but coaching's effect on timing and eventual completion is not established. |
| Replace the reference card for every shift immediately; no further uncertainty | The exercise supports a limited staffed next check. It cannot establish population-wide speed, safety, independent replication or ordinary-work readiness. |

## Interpretation and proposed next decision

The net time saving is useful local evidence, but it is not a population estimate or a causal effect isolated from practice and assistance. The sample was not randomized from all store volunteers. The two observations per person cannot be treated as independent people, and the same lookup was repeated in the two formats. Counterbalancing helps distribute order but does not remove learning. Seven complete time pairs also leave the full eight-pair timing result unknown; the pack gives no basis for reconstructing P7 or quantifying a missingness adjustment.

The aggregate accuracy result shows no observed improvement. With eight pairs and one different error in each format, it also cannot establish equivalent accuracy or a safety guarantee. The observed slower guide results and P5's incorrect guide selection merit attention even though total time improved. Staff presence and assistance limit conclusions about ordinary or unattended work. No population confidence interval, significance claim or equivalence claim is warranted by treating these pairs as independent observations; the reported percentages describe this pack only.

Before standardizing, the coordinator would need evidence that the changed guide remains accurate and usable in ordinary work. A proportionate next step would be a bounded, staffed check, planned separately with these issues resolved:

1. Review the P5 brake lookup and the slower P8 valve lookup against category, bin-code and label navigation. Establish what can be learned from existing records; do not assume a particular cause or silently correct the observed error.
2. Set the check's scope and decision criteria before collecting more data: what accuracy, usability, assistance and time results would justify broader use, and what errors or difficulties would require revision or stopping. Speed alone is insufficient.
3. Cover representative ordinary-work lookups and users while retaining staff support. Reduce repeated-task familiarity with comparable fresh tasks, balance order where formats are compared, and retain participant IDs so repeated observations remain identifiable.
4. Preserve first selection separately from eventual completion. Define timing start/stop points and how coaching is logged, retain error and assistance records, and verify that each timing is captured. Keep the rule that missing times are not zero and that accuracy is retained independently.
5. Review the bounded check against the agreed criteria before any standardization decision. Its design and size need an explicit rationale; this small pack cannot supply a justified sample size or a guaranteed benefit.

These are planning recommendations only. No additional study or contact was undertaken. The coordinator's unresolved decision is the scope and acceptance criteria for that limited check; no missing information prevents completing this audit.

## Verification and source preservation

Only local supplied files and installed tools were used; no external sources or services were used.

- Ran `node tools/check-evidence.cjs`: passed. It reported 8 pairs, 4 volunteers, 8 reference rows, 8 guide rows and P7 as the only missing guide time. Its scope is structural sanity, not independent confirmation of the draft's claims.
- Independently imported the CSVs with PowerShell `Import-Csv`, required one record per matched ID, selected positive complete timings and recalculated totals, pair directions, all-pair accuracy, assistance IDs and within-volunteer order counts. Results are documented above.
- Separately recomputed the output from raw CSVs using Node's built-in modules and checked the JSON's exact field set, numeric values and identities. Also reversed guide-row order to verify matching by ID, checked P7's timing exclusion and accuracy retention, and reconciled assistance and order. No third-party packages or network access were required.
- Compared SHA-256 hashes of all ten supplied files before and after the audit; all were unchanged. The source inventory and baseline hashes below identify the reviewed pack. New deliverables are only `audit/findings.md` and `audit/metrics.json`.

| Supplied file | SHA-256 |
| --- | --- |
| `README.md` | `8A4E73F42045A1670B8D856777664315F7ACBC3C4C31739958377E0273FDF732` |
| `study/protocol.md` | `88E3DCEBFADEE2FCAD57FE4777271851501B59587C97C66263CE6BE7723A3A3E` |
| `draft-summary.md` | `4A7277EBEE0F9597A1E066107380540C66590C6B81304218C91DC46CFD2135D4` |
| `evidence/pairs.csv` | `6C0BF3FA53E2FB5E1F8509AD21733B01FBDA7A39511F7E55343A269BEA5DCE74` |
| `evidence/reference.csv` | `91109C551FA1FD29A6E5E59B8085A09B6581B2760F5ADBCA670F799D99818670` |
| `evidence/guide.csv` | `BFBB16F5EA6AB33EF26D7CF47125B375D0459E64CC83E628172D95AADE87107A` |
| `evidence/capture-notes.md` | `E3A2C31C98402958D8C53A8A46279D64925299670C8EC39FAC793FA487C43448` |
| `guides/reference-card.txt` | `236E2C9C478661EEA6C9C5466C1ED7160AE1C283598E3468CD83E8A1DECB5492` |
| `guides/reorganized-guide.txt` | `94ACD3CEBD66ADBE2AEB94E53163FBDE33656D8D7ABB28B82C270F2219077FE5` |
| `tools/check-evidence.cjs` | `E149BE4444C995BE3D61B54FEA91913D89025AAEAFF962FFEA5177BA8AC83E5F` |
