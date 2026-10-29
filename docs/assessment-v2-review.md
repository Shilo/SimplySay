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

I inspected all four successful mixed final responses, their captured agent-authored progress messages, both detailed final explanations, the absent mixed report, existing independent functional-check structure and the enabled delegation independent-check record. The four mixed replies preserve approval/receipt actions, exact total and Friday uncertainty; the detailed replies provide the requested substantive technical depth. These observations guide calibration provenance, not an unblinded treatment ranking.

The existing functional record shows actual generated source/test/fixture hashes, import-only behavior, supplied and adversarial input probes, valid/invalid CLI results and test execution. The new harness must bind each reused record to its own actual files. This protocol review does not re-execute subject code, comprehensively audit all generated code, assess the entire reference project, inspect private reasoning, decrypt child messages or start a model session.

## Calibration acceptance and reporting

The email omission must be identified as a standalone essential omission. Added irrelevant prose plus at least three redundant updates must preserve facts while losing communication preference for relevance/repetition reasons. The detailed original must beat a fluent but insufficient-depth mutant without technical-detail penalties. Identical evidence must tie. Each assessment needs cited evidence and an explicit missing-evidence field; low confidence remains visible.

Report information-check failures, quality preferences, ties, disagreement and unavailable evidence separately. No weighted total and no word-count winner is acceptable. Findings must be called **automated assessments**, and owner example grading remains optional. Production implementation, marketplace identities and publication remain on hold.

Implementation review is pending the first runnable harness; this section will be supplemented without changing the frozen calibration contract.
