# Independent challenge of the automated assessment amendment

Status: calibration specification frozen before the four blinded reviewer sessions. This is a new assessment protocol review, not a rewrite of the original pilot criteria or results. The reviewer authored neither the original pilot policy nor the forthcoming harness implementation.

## Verdict before implementation review

The proposed split between information preservation and communication quality is appropriate. Its main risk is false confidence from apparently objective automation. Exact arithmetic, source hashes, artifact-local omissions and execution evidence can be checked deterministically. Clarity, relevance, useful explanation and semantic completeness still require a limited model judgment. Neither the model nor a keyword detector measures a person's comprehension.

The frozen control contract is [calibration-spec.json](../experiments/assessment-v2/calibration-spec.json). It requires all four controls to pass before a reviewer contributes to a primary calibrated communication verdict. All judgments remain visible in a second, all-reviewer view. A control failure is a result, not a reason to rerun until favorable. If no reviewer calibrates, report no calibrated verdict.

## Challenges the implementation must answer

1. **Artifact-local completeness.** A missing R-103 receipt action in the copy-ready email must fail even when the wrapper, report or code contains it. Splitting a draft at the wrong boundary can silently pass an unusable standalone deliverable. Check the extracted email against the actual final response and retain its exact bytes.
2. **No brevity reward.** The queue task explicitly requests a detailed explanation, a timed/state duplicate trace and causal treatment of durable atomic receiver deduplication, concurrency and stale workers. The valid original is long for a reason. The terse control must lose because requested explanation is absent, not because its word count differs.
3. **Separate fluent omission from style.** The missing-email-fact control must fail preservation. Its communication preference is deliberately unconstrained: deleting a sentence can make a draft appear fluent. A combined winner would conceal this distinction.
4. **Progress is evidence, not a penalty counter.** The disabled mixed run includes a meaningful intermediate update: eight tests had passed, another invalid-record check was being added, and the final accurately reports nine. That additional update is not automatically excessive. Capture includes message order, not reliable elapsed-time cadence; do not claim per-minute update excess.
5. **Preserve unknowns.** The original absent delegation attempt failed and the enabled parent directive remains unavailable. Actual enabled child output and the saved report are inspectable and substantively complete; that does not establish the unseen instruction boundary or an absent/enabled causal difference.
6. **Blinding is bounded.** Opaque aliases, fresh contexts and withheld treatment/policy metadata prevent direct label leakage. Repeated candidate text across pairings remains recognizable. Four reviewers of a shared model family also share possible preferences. Do not present agreement as independent human replication.
7. **Order is not isolated.** Two reviewers in each reversed orientation expose directional sensitivity and identical-response forced wins. Different reviewers in each orientation confound order with reviewer variation. Report those counts and disagreements; do not infer absence of bias from agreement.
8. **Evidence must bind the claim.** Existing executed code checks may be reused only when their source/test/fixture hashes match the actual captured files. Hash preservation proves no editing during this assessment; it does not prove that outputs equal a hypothetical treatment-free version or that every behavior was tested.

## Inspected evidence and excluded scope

I inspected all four successful mixed final responses, their captured agent-authored progress messages, both detailed final explanations, all four actual generated implementations and batch reports, existing independent functional-check structure, the actual enabled child report and saved report, and the enabled delegation independent-check record. The four mixed replies preserve approval/receipt actions, exact total and Friday uncertainty; the detailed replies provide the requested substantive technical depth. The actual child report contains all ten pair calculations, reasons, choices, conditional availability, savings and caveats, which remain in the saved file. These observations guide calibration provenance, not an unblinded treatment ranking.

The existing functional record shows actual generated source/test/fixture hashes, import-only behavior, supplied and adversarial input probes, valid/invalid CLI results and test execution. I independently recomputed source, test, fixture and report SHA-256 values for each of the four mixed runs: all 16 match the reused record; each record reports functional and export-probe passes and successful generated-test exit. The new harness must bind each reused record to its own actual files. This protocol review does not re-execute subject code, comprehensively audit all generated code, assess the entire reference project, inspect private reasoning, decrypt child messages or start a model session.

## Calibration acceptance and reporting

The email omission must be identified as a standalone essential omission. Added irrelevant prose plus at least three redundant updates must preserve facts while losing communication preference for relevance/repetition reasons. The detailed original must beat a fluent but insufficient-depth mutant without technical-detail penalties. Identical evidence must tie. Each assessment needs cited evidence and an explicit missing-evidence field; low confidence remains visible.

Report information-check failures, quality preferences, ties, disagreement and unavailable evidence separately. No weighted total and no word-count winner is acceptable. Findings must be called **automated assessments**, and owner example grading remains optional. Production implementation, marketplace identities and publication remain on hold.

## First implementation review

The first runnable harness keeps evaluation code outside the installed experimental plugin, uses opaque sample and pair aliases, includes actual protected files and progress, and produces all-reviewer and calibrated-only records. Both detailed originals retain the lexical coverage screens. I found these issues before reviewer launch and requested corrections:

- The exact-total screen accepted a contradictory email after changing only `11,249` to `11,250`, because the unchanged `112.49` satisfied an alternative match. Numeric calibration must corrupt each representation separately as well as together.
- Calibration could accept omission/depth issue keywords without supporting original fact/detail quotes. Empty quote strings also passed substring checks. A schema-valid statement is insufficient evidence by itself.
- Report-time validation needed the same packet hash binding as ingestion and an explicit check of frozen protocol/code/spec identities, not merely their inclusion in a manifest.
- Reused execution required fixture binding and neutral actual execution facts in reviewer packets; otherwise a reviewer could correctly mark test-honesty evidence unavailable. Hash mismatches must invalidate reuse rather than accompany an unconditional success claim.
- Supplemental delegation evidence needed literal-quote validation and an explicit unavailable incoming directive, so a complete child report cannot silently become proof of unseen parent instructions.

The protocol and calibration expectations above remain frozen. These are implementation corrections to enforce the predeclared requirements, not changes in response to reviewer outcomes.

## Correction verification before reviewer launch

I reviewed the corrected source and the second smoke packet. The packet retains every successful captured progress message and final, all actual mixed-task protected deliverables, neutral historical command output/exit evidence, and the actual returned child report. A direct scan found none of the treatment labels, source run identifiers, product identity or loading/policy filenames. The protected email extraction retains its trailing bytes. Reviewer instructions preserve useful depth, explain artifact-local completeness, allow ties and retain the missing incoming child directive.

I ran the offline harness self-test: all ten detector controls passed, including separate cents-only and decimal-only contradictions, the email-local omission, unchanged filler artifacts, required-depth loss and the identical control. The three built-in schema rejection tests also passed. Separately, I exercised the calibration function with synthetic judgments: valid supported controls passed; removing the original omission evidence, lowering a control's confidence, or changing one side of the identical control to unknown each prevented calibration. No model session or generated subject execution was used in these checks.

The corrected source validates exported evidence hashes, all four actual artifact bindings, nonempty literal evidence, packet hashes during aggregation, and the frozen code/protocol/calibration/allocation identities. It marks mismatched historical evidence unusable and requires the incoming parent directive to remain unknown. These checks support launching the budgeted blinded reviewers. The final report still needs explicit orientation-sensitivity warnings in addition to raw orientation counts; this is a reporting implementation item for the controller, not a change to calibration thresholds.

The remaining limits are substantive: targeted numeric/text screens are not a general misinformation detector, literal evidence does not prove a reviewer's reasoning, obvious mutant calibration may miss subtle defects, and missing actual incoming delegation instructions cannot be repaired by a complete returned report. Automated assessments must retain these limits.
