# Automated assessment amendment, version 2

Status: new protocol for retrospective evaluation, recorded before new reviewer sessions. The original pilot criteria, captured evidence and results remain immutable historical records. This amendment does not retroactively declare that their human-review gate passed.

The owner now makes manual grading optional. Routine development progress uses deterministic preservation checks plus independent blinded agent assessments of communication quality. Results must be labeled **automated assessments**, never measured human-comprehension improvements. Human review is welcome but is no longer a prerequisite for routine evaluation or progress. Production implementation, final marketplace identities and publication remain on hold.

## Allocation and approval boundary

The prior pilot used 11 of 24 authorized sessions. This phase conservatively allocates seven new conversations: one harness author, one capture investigator, one independent protocol challenger and four fresh-context blinded reviewers. One further slot is reserved only for inaccessible packets or unusable structured reviewer output, not for unfavorable judgments. Maximum combined use is 19 of 24. No native model subjects or delegation retest are allocated. No paid API, external judging service, new credential copy or direct Claude execution is authorized.

The machine-readable allocation is [allocation.json](../experiments/assessment-v2/allocation.json). Record each start/failure before launching; preserve the distinction between model subjects, retrospective reviewers and development collaborators. Offline fixture, schema, arithmetic, packet, source and capture tests do not create another model conversation. Do not silently expand the roster or turn remaining slots into an automatic retry pool.

## Separate judgments

1. **Information/work preservation:** task correctness, required facts, uncertainty, requested depth, actual files/code/report/email, and available actual inter-agent output. Read existing verified artifacts and hashes first. Retain unknown where capture is absent. No amount of favorable style compensates for a failed essential or protected output.
2. **Communication quality:** ordinary chat and progress assessed for clarity, relevance, filler, repetition, unnecessary jargon and excessive updates. Do not grade protected artifacts by a brevity preference. Useful technical language, causal explanation, necessary uncertainty, honest failures and requested depth must not be penalized just for length.

No weighted length score combines these axes. Word/token counts may describe the sample but never establish quality. Preserve ties, disagreement, low confidence, unavailable evidence and infrastructure failures.

## Existing evidence and blinding

Use all four completed mixed-task treatments (absent diagnostic, installed-disabled, enabled, minimal), both detailed explanations, and the available enabled child report. The failed original absent and failed delegation baseline stay in the accounting and missing-evidence register; do not compare an infrastructure-blocked reply as though it were a valid successful baseline.

Extract every captured model-authored progress message in order and the complete final response. Separate the copy-ready email from the conversational wrapper while retaining both. Inspect actual deliverables through deterministic verification and source/hash checks; reviewers receive protected report/email and available child-message evidence as needed, without treating those as ordinary concise prose. No private reasoning, auth data, product prompt, treatment names, run IDs, loading metadata, prior assessment or expected winner goes to a blinded reviewer.

Prepare four fresh-context reviewer packets from a private controller mapping, with opaque aliases and balanced reversed pair/case order. Two reviewers receive each orientation. Compare normalized candidate choices across orientations and include an identical-response tie control. Report position preferences and order sensitivity without pretending that four judgments isolate order effects from reviewer variation or prove absence of bias. Reviewers must not read project files, other packets, reveal maps or prior reviews.

## Calibration before interpreting real comparisons

Include blinded controls derived from the captured material: a deliberately omitted required artifact fact, added irrelevant filler/redundant updates, a terse answer that removes necessary technical explanation, and an identical-response tie. Useful technical detail remains in the valid detailed answer. Deterministic checks must catch explicit numeric/required-fact corruption and artifact-specific omissions; reviewers must identify the quality defects without rewarding incomplete brevity.

Freeze calibration provenance, expected behavior and thresholds before reviewer launch. Test detectors against originals and mutants, not just source-string presence. Calibrations are derived static fixtures, not new subject trials or retouched originals. Do not tune their expected verdicts after viewing reviewer results. Calibration failures narrow trust in those assessments and remain reported; do not rerun until favorable. Keep full reviewer judgments, evidence spans, confidence and disagreements.

## Capture and future delegation cases

Investigate the existing native traces, public API shapes and exact V2 hook path without new model sessions. Prefer a credential-free synthetic transport/hook test that proves what the capture code retains, and separately state whether the real parent directive was actually observed. Synthetic plaintext capture is not proof that an opaque live route exposes plaintext. Do not read private reasoning, auth caches or decryption keys.

The original delegation case remains unchanged. Propose a separately named case without its explicit reminder forbidding child style/length constraints. Do not launch it or the original retest until actual parent-to-child instructions **and** child responses can be captured on the chosen route, or discuss an honestly labeled alternative verification approach. Do not repeat a known inconclusive test under a new name.

## Deliverable and continuation gate

The development-only harness should prepare validated packets/jobs, run deterministic checks, ingest reviewer records, calculate calibration/order/disagreement results and emit a reproducible retrospective report. Built-in agent orchestration can execute its budgeted review jobs without asking the owner to grade routine examples. Keep all machinery out of installed plugin packages. Preserve original artifact hashes and distinguish this new retrospective verdict from the original pretrial pilot result.

Return a brief verdict covering improvements, regressions, unknowns and the next material decision. Ask the owner about unresolved verification/scope choices or approvals, not ordinary grading.
