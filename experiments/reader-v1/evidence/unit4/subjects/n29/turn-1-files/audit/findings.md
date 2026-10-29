The evidence supports a limited, staffed next check before standardization. It does not support replacing the reference card for every shift now. The complete timing records show a local benefit, but the guide was slower on two tasks, made one incorrect first selection, and was used in an exercise with repeated tasks and coaching. The draft summary should not be used as written. A corrected summary is provided below; the supplied draft remains unchanged.

The audit follows [the recorded protocol](../study/protocol.md), reconciles all three [evidence CSVs](../evidence/) with [the capture notes](../evidence/capture-notes.md), and checks [the draft](../draft-summary.md). The two guide texts describe the formats; they provide no additional outcome observations. The machine-readable result is [metrics.json](metrics.json).

**Records and inclusion rules**

There are eight task pairs from four volunteers, V1 through V4. Each volunteer supplied two pairs and tried both formats on each lookup task. These are repeated observations within people, not eight independent volunteers. The recorded first format is balanced within each volunteer: reference first for P1, P3, P5 and P7; guide first for P2, P4, P6 and P8. The pack does not establish random sampling or random assignment.

Records were joined by `pair_id`. Both outcome files contain exactly one row for each P1 through P8, matching the pair register. All recorded times are positive except the single blank guide time for P7. All first-selection and assistance fields are present.

P7's guide stopwatch value was lost during export, and the notes explicitly say no other timing exists. Exclude both P7 times from the timing comparison, including its recorded 150 reference seconds. Do not treat the blank as zero, a failed task, or a time that can be reconstructed. Retain P7's correct first selection and later guide assistance in their respective analyses. No timing was imputed, and no assisted or incorrect task was otherwise excluded from the protocol timing set.

In the table, “saved” means reference seconds minus guide seconds; positive means the guide was faster. Correctness describes the first bin selected, before coaching. “Assisted” records later coaching and does not revise that first selection.

| Pair | Volunteer / task | First format | Reference seconds | Guide seconds | Saved seconds | First selection: reference / guide | Assisted: reference / guide |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| P1 | V1 / find_patch | reference | 120 | 90 | 30 | correct / correct | no / no |
| P2 | V1 / find_pump | guide | 100 | 95 | 5 | correct / correct | no / no |
| P3 | V2 / find_cable | reference | 160 | 100 | 60 | incorrect / correct | yes / no |
| P4 | V2 / find_tube | guide | 80 | 75 | 5 | correct / correct | no / no |
| P5 | V3 / find_brake | reference | 140 | 150 | -10 | correct / incorrect | no / yes |
| P6 | V3 / find_lamp | guide | 200 | 160 | 40 | correct / correct | yes / no |
| P7 | V4 / find_chain | reference | 150 (excluded) | missing | unavailable | correct / correct | no / yes |
| P8 | V4 / find_valve | guide | 110 | 130 | -20 | correct / correct | no / no |

**Independent calculations**

Eligible timing pairs are P1, P2, P3, P4, P5, P6 and P8, giving seven matched pairs:

- Reference: `120 + 100 + 160 + 80 + 140 + 200 + 110 = 910` seconds.
- Guide: `90 + 95 + 100 + 75 + 150 + 160 + 130 = 800` seconds.
- Time saved: `910 - 800 = 110` seconds. The pair differences also sum to `30 + 5 + 60 + 5 - 10 + 40 - 20 = 110`.
- Percentage saving: `110 / 910 * 100 = 12.087912...%`, reported as **12.1%**. The denominator is matched reference time, and this is the reduction in summed elapsed time across the eligible tasks. It is not an average of pair percentages or a predicted benefit for every volunteer.
- Faster: five pairs (P1, P2, P3, P4, P6). Slower: two (P5, P8). Tied: zero. P7 has no speed classification.

First-selection accuracy uses all eight observed pairs, independently of timing eligibility:

- Reference: seven correct out of eight, **87.5%**; P3 was incorrect.
- Guide: seven correct out of eight, **87.5%**; P5 was incorrect.
- The observed difference is zero percentage points. Six pairs were correct under both formats; P3 was correct only with the guide, P5 only with the reference, and none was incorrect under both. Equal totals do not establish accuracy equivalence or a safety guarantee.

Assistance was recorded twice under each format: reference P3 and P6; guide P5 and P7. The notes confirm coaching after the incorrect reference selection at P3 and the incorrect guide selection at P5. Reference P6 and guide P7 had correct first selections and later assistance. Neither later coaching nor eventual completion can turn the P3 or P5 first selection into a correct one. Equal assistance counts do not establish equal coaching effects, and the records do not isolate its effect on elapsed time.

Two descriptive breakdowns illustrate limits of the pooled timing result; they are not additional independent studies or adjustments to the protocol metrics:

| Volunteer | Eligible time pairs | Reference seconds | Guide seconds | Saved seconds |
| --- | ---: | ---: | ---: | ---: |
| V1 | 2 | 220 | 185 | 35 |
| V2 | 2 | 240 | 175 | 65 |
| V3 | 2 | 340 | 310 | 30 |
| V4 | 1 | 110 | 130 | -20 |

| First format | Eligible time pairs | Reference seconds | Guide seconds | Saved seconds |
| --- | ---: | ---: | ---: | ---: |
| reference | 3 | 420 | 340 | 80 |
| guide | 4 | 490 | 460 | 30 |

P7's missing guide time leaves the complete timing subset unbalanced by first format and gives V4 only one timed pair. The order breakdown cannot identify a practice effect separately from people, task differences and coaching. Counterbalancing helps, but repeating the same lookup still permits familiarity to influence performance. P3 and P6 contribute 100 of the 110 saved seconds, and both involved reference assistance; that concentration makes attributing the saving to guide design alone particularly uncertain. This does not justify removing those pairs from the specified analysis.

**Corrections to the draft**

| Draft claim | Reconciled finding |
| --- | --- |
| Eight independent volunteers | Four volunteers, each contributing two task pairs; observations within a volunteer are related. |
| All eight time pairs complete | Seven complete pairs; P7's guide timing is missing. |
| Faster in every pair | Five faster, two slower, no ties among eligible pairs; P7 unknown. |
| Cut total lookup time by 30 percent | Matched totals are 910 versus 800 seconds: 110 seconds, or 12.1%, saved. The claimed 30% is not supported by the protocol calculation. |
| Guide eight correct versus reference seven | Seven correct first selections out of eight for each. P5's guide first selection remains incorrect after coaching. |
| Improved accuracy | No observed net accuracy improvement; the errors occurred on different tasks. |
| Coaching did not affect any result | Coaching occurred under both formats. Its timing effect cannot be isolated, and later help must not replace first-selection outcomes. |
| Replace the card immediately; no further uncertainty | The evidence supports a limited staffed check, with substantial uncertainty about ordinary-work performance and accuracy. |

Suggested replacement summary:

> Four volunteers completed eight paired lookup tasks in one staffed exercise. Seven pairs had complete timings. Across those same seven pairs, reference time totaled 910 seconds and guide time 800 seconds, a saving of 110 seconds (12.1%); the guide was faster in five pairs and slower in two. First selections were correct in seven of eight tasks for each format. P7's guide timing is missing, but its correct first selection remains included. Assistance occurred under both formats, and repeated tasks allow practice effects. These observations support a limited staffed next check before deciding whether to standardize the guide.

**Decision and next evidence needed**

The 110-second local saving is a reason to continue evaluating the guide. It does not establish that the guide itself caused that saving or that the result transfers to all volunteers or shifts. Only four people were observed, they were not a random sample, and all observations came from the same staffed exercise. There is no independent replication or ordinary unattended-shift evidence. The missing timing also leaves one task's speed unknown. No population confidence interval or significance claim is reported: treating eight pairs, or seven complete timing pairs, as independent people would misrepresent the design. These records cannot establish a population-wide speed or safety guarantee.

A useful next step would be a bounded, staffed check of accuracy and usability in ordinary work, with the reference card available as a fallback. The coordinator should specify its scope and decision criteria before collecting more observations: acceptable first-selection accuracy, assistance needs and time performance, plus when an incorrect selection or unclear label requires review. Include varied ordinary lookup tasks and volunteers, examine the brake error and slower valve lookup, and assess the chain lookup whose guide time is missing. Avoid relying solely on immediate repeats of the same lookup; balance or record order and familiarity, and keep timings, first selections, assistance and eventual resolution separate. Record complete timings and reasons for any missing measurements. Review the results before any wider replacement.

This is a recommendation only. No volunteers were contacted, no further study was started, and no rollout was performed. No additional input is needed to complete this audit; the unresolved question for a future standardization decision is whether accuracy and usability hold in ordinary work.

**Verification and preservation notes**

- Ran `node tools/check-evidence.cjs` locally. It passed and reported eight pairs, four volunteers, eight rows per outcome file and missing guide timing only at P7. This checks structure, not the draft's benefit claims.
- Independently parsed the CSVs with built-in Node.js libraries, validated unique matching pair IDs, finite positive recorded times and Boolean fields, and joined outcomes by ID. Applied the protocol's distinct timing and accuracy inclusion rules. Recalculated totals, pair directions, first-selection counts, assistance and the descriptive breakdowns above. The explicit arithmetic provides a separate readable check of the totals.
- Validated the written JSON against the protocol's exact ten numeric fields and a separate PowerShell calculation from the source CSVs. Checked the matched totals, direction counts and accuracy counts, including the exclusion of P7 only from timing. All checks passed.
- SHA-256 hashes taken before writing the audit were compared with the supplied files after writing and validation. All ten supplied files remained byte-for-byte unchanged. Only `audit/findings.md` and `audit/metrics.json` were added. No external information or services were used.

Source preservation manifest (SHA-256):

| Supplied file | SHA-256 |
| --- | --- |
| README.md | `8a4e73f42045a1670b8d856777664315f7acbc3c4c31739958377e0273fdf732` |
| draft-summary.md | `4a7277ebee0f9597a1e066107380540c66590c6b81304218c91dc46cfd2135d4` |
| study/protocol.md | `88e3dcebfadee2fcad57fe4777271851501b59587c97c66263ce6be7723a3a3e` |
| evidence/capture-notes.md | `e3a2c31c98402958d8c53a8a46279d64925299670c8ec39fac793fa487c43448` |
| evidence/pairs.csv | `6c0bf3fa53e2fb5e1f8509ad21733b01fbda7a39511f7e55343a269bea5dce74` |
| evidence/reference.csv | `91109c551fa1fd29a6e5e59b8085a09b6581b2760f5adbca670f799d99818670` |
| evidence/guide.csv | `bfbb16f5ea6ab33ef26d7cf47125b375d0459e64cc83e628172d95aade87107a` |
| guides/reference-card.txt | `236e2c9c478661eea6c9c5466c1ed7160ae1c283598e3468cd83e8a1decb5492` |
| guides/reorganized-guide.txt | `94acd3cebd66adbe2aeb94e53163fbde33656d8d7abb28b82c270f2219077fe5` |
| tools/check-evidence.cjs | `e149be4444c995be3d61b54fea91913d89025aaeaff962ffea5177ba8ac83e5f` |
