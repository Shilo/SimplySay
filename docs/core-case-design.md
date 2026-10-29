# Controlled simplification: case preparation

2026-10-29. N33 task 2, under `docs/core-simplification-preparation.md`. Controlled simplification is authorized; theoretical novelty is not a prerequisite. This task changes only `experiments/reader-v1/cases/d.case.json`, `experiments/reader-v1/cases/w1-neutral.case.json` and this document. No helpers, subjects, graders, native/model sessions, external services, Claude, sealed content, policy/evaluator/ledger/status edits or commits. Root owns allocation, freezing, dispatch and evaluation. Other agents share the checkout.

## D: ordinary photo advice and requested teaching

`d.case.json` implements the three D prompts proposed in `reader-unit5-case-challenge.md`: an explanation/recommendation, a narrow contextual follow-up, then substantial teaching in chat. No brevity instruction, length target or condition-specific expectation is added. There is one preserved UTF-8 fixture, `image-notes.md`; no actual images or generated files are requested.

The ordinary export note records an original of 4000 × 3000 pixels and a downsampled web copy of 1000 × 750, both with 300-pixels-per-inch metadata. The website accepts up to 1200 pixels on the longest edge; the display area is 10 × 7.5 inches with a stated minimum of 240 image pixels per printed inch. It explains the metadata-only operation, preserves the original and states that no actual image/sample print has been inspected. These are closed fictional production facts, not a live print-quality claim.

| Turn | Restrained request-derived essentials |
| --- | --- |
| D1, label/file choices | Explain what the image-density label does and why equal labels do not establish equal detail. Justify original-for-display and web-copy-for-website from dimensions and job requirements. Full later calculations are not mandatory first-turn recap items. Do not claim actual image/print verification. |
| D2, label-only change | No: changing 300 to 600 without resampling does not change the web copy's stored pixels or recover detail at the requested print size. A correct causal answer need not restate the whole recommendation. |
| D3, teaching | Work through 2400 × 1800 minimum pixels, original at 400 pixels/inch and web copy at 100 at the current size. Explain metadata changes versus reducing/enlarging the pixel grid. Explain the 4:3 versus 5:4 shape choice for a future borderless 10 × 8 layout, with meaningful alternatives to distortion. No exact crop, application or unobserved visual judgement is imposed. |

The six essentials map to actual prompt clauses. D3's requested calculations, causal distinctions and layout choices are necessary depth, even if a shorter response would look cleaner. Useful precision is protected. D offers possible clarity/jargon gains, less repeated context in D2, and less unrequested background in D1; it does not establish that untreated replies will have those problems. It cannot establish actual photo-processing quality, artifact/code preservation or a necessary-interruption benefit. Host-required opening/cadence messages remain governed by the unchanged host.

## W1-neutral: DEVELOPMENT DERIVATIVE, same work

`w1-neutral.case.json` is explicitly labeled **DEVELOPMENT DERIVATIVE** of `experiments/workflow-v1/cases/w1.case.json`. It is familiar study-audit material, not a new independent domain or untouched validation. Original W1 remains unchanged and belongs to the explicit-preference category.

Exact subject-task delta:

| Turn | Change from original W1 |
| --- | --- |
| T1 | Delete only “Keep detailed findings and routine testing notes in the files; keep chat focused on the decision and anything I need to resolve.” All audit questions, files, source-preservation and no-contact/no-new-study constraints remain. |
| T2 | Replace “I only need the decision for that claim and what, if anything, I need to decide now.” with “What, if anything, do I need to decide now?” The 30-percent/more-accurate claim question and substantive decision-now request remain. |
| T3 | No change to prompt or essentials. Full methods reasoning, P5/P7 examples, proposed next check, exact original draft copy and standalone committee message remain requested. |

T1's essentials are unchanged. T2's mapping now quotes its revised questions, and its requirement retains the corrected claim and useful limited-check decision without inheriting the former instruction against a full methods report. The central correction belongs in chat; the fixture facts are not all mandatory recap items. T3's entire turn object is unchanged. Turn IDs and first-required-turn references are retained.

Identity, stage, title and design provenance/progress-assessment metadata identify the derivative accurately. **The serialized fixture block and the entire expected-files/capture/objective footer are copied verbatim**, not regenerated. Consequently all ten source contents/hashes, four expected-file entries, ten-field JSON metrics, original-draft byte-copy requirement, capture paths/directories and existing semantic/oracle information are unchanged.

Preservation still means actually creating the audit at T1, retaining the sources, and delivering the complete T3 methods/copy work. Metrics remain seven matched time pairs, 910/800 seconds, 110 saved, five faster/two slower/no ties and 7/8 first selections for each format across eight outcomes. Missing P7 timing must not erase its accuracy observation. P5/P7 reasoning, repeated people/practice/coaching/missingness limits and the unlaunched next-check distinction remain intact. A later handoff cannot backfill a missing first audit.

## Opportunities, objections and safeguards

A and C already produced clear untreated explanations without separate brevity instructions. D does not overturn that evidence; an already-satisfactory tie is plausible. Its finite export note also supplies much of the factual answer. Actual untreated behavior is required before asserting a final-answer defect, and a style preference without preserved precision/depth is insufficient.

Removing W1's explicit chat preference creates a controlled coverage difference, not proof that the preference caused previous ties. The derivative still shares its familiar domain, records, requested artifacts and detailed handoff. Comparisons with historical W1 would change both policy/run conditions and task framing, so they cannot isolate the removed prompt clauses' causal effect. The later absent/enabled/disabled arms must all receive this same derivative, not a mix of original and neutral prompts.

W1-neutral can expose optional progress payload or a more expansive final when the task no longer expressly routes routine detail away from chat. Neither is guaranteed. Findings needed before completion remain timely; true facts are not automatically useful updates, and shorter status alone is not a benefit. Do not add sleeps, redundant tool work, message quotas, source-fact chat checklists or a style reminder to create an opportunity. If no natural progress problem occurs, record that limit.

Use the existing neutral human-audience preamble identically across arms, supported local tools and disposable project directories. Freeze the exact case bytes/prompts/essentials before subjects. Keep the existing capture/checker, first-turn semantics, current per-goal controls, independent blinded review and final/progress distinctions. No new framework, executable oracle, control or scoring change was added. Requested standalone committee copy remains complete even where it repeats figures from another requested surface. Production/publication and untouched validation are outside this preparation.

## Local checks

Only local JSON/hash/contract consistency checks ran; there are no response outcomes or subject execution claims.

- Both JSON files parse with schema version 1 and three unique turn IDs each; all 13 essential records have unique IDs within their case and nonempty requirement/request-clause/location fields.
- All 11 fixture UTF-8 SHA-256 values match their content. Preserved/captured paths are local, every preserved input is captured, expected outputs reference existing turn IDs, and exact-copy sources exist in the fixture contract.
- D1/D2 exactly equal the earlier proposed D turns. Before freezing, root corrected only D3's grammar from 'choices that would create' to 'choices this would require'; the same aspect-ratio question and substantive essentials remain. Neither case adds the removed chat-brevity cues. D has no expected output files or executable probes.
- W1-neutral's fixture block and expected-files/capture/objective footer equal the original serialized text verbatim. Parsed contracts also match; T1 essentials and the whole T3 turn are unchanged. The only T2 essential changes are its revised clause mapping and wording described above.
- Original W1 is unchanged at SHA-256 `36c15a6c73ee31387f0a7330ae0225c96299032f0fc5dffe8458e51ce398186b`.

Prepared case hashes: D `88e1ce719c2aff605ff424204db22422b6f80ff4c4c3a061620d25c0f3a3b104`; W1-neutral `5b660228ada68459cd51becaa16eb16ac32bd951955bf19ab09ccfd9001f1603`. D fixture hash: `3bbbbd14bdb9c04a501a0778376721c5720b281946e1246b03b9b02298967c39`.
