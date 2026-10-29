# Independent development case and evaluation review

Author: case/evaluation challenger, approved allocation slot e02. Authoring occurred without reading candidate policies, treatment outputs, judgments, or the development diagnosis. This is the first of at most three task turns in that same challenger conversation. No helper, model command, external service, or new native conversation was launched by this challenger.

The approved authorization governs this phase: multiple documented revisions may use the existing development allocation. D3 is a development check, not final holdout validation. Two separate conversations were independently authored and sealed before development outputs. Their prompts, fixtures and checks remain outside the controller's reading scope until the selected exact policy is frozen. This document contains no holdout task specifics; the public seal contains counts and hashes only.

## Final development cases

| Case | Turns | Actual work and request-derived essentials |
| --- | ---: | --- |
| [D1](../experiments/development-v1/cases/d1.case.json) | 3 | Read local launch notes; give the current opening recommendation; apply the confirmed fix; explain the two specifically asked-about checks in event terms; provide a standalone volunteer message with time, room, check-in instructions and the remaining uncertainty. |
| [D2](../experiments/development-v1/cases/d2.case.json) | 4 | Repair the real multi-file built-in Node exporter against its documented contract; add and run meaningful regression tests; update maintainer documentation; answer the staff question; supply the requested maintenance reasoning and complete handoff plus staff draft. |
| [D3](../experiments/development-v1/cases/d3.case.json) | 3 | Recommend a supported demo workaround; give the explicitly requested causal timeline; answer the shorter-TTL question; create a standalone operational runbook and preserve the original notes by raw bytes. |

Each case contains `fixture_files` with complete UTF-8 content and SHA-256, chronological `turns` with `id`, `prompt` and clause-mapped `essentials`, `expected_files`, `capture_files` and `objective` check metadata. The development fixture mirrors are under `cases/d1-fixtures`, `cases/d2-fixtures` and `cases/d3-fixtures`; their bytes match the manifest content. The runner initializes from manifest content, so the case JSON, rather than a separate unstated setup, defines subject inputs.

## Rubric boundaries

Every essential states its request clause and the location that must satisfy it. Correct equivalents pass. A complete chat explanation cannot repair a deficient requested standalone document or copy-ready message. Requested maintenance depth, causal reasoning and technically useful terms must remain complete; they are not verbosity defects merely because they take space.

D1 does not require an exhaustive launch checklist. Calendar delivery is unverified, rather than a demonstrated failure or an invented mandatory opening gate. The confirmation fix supplied on turn two supersedes its original status. The volunteer draft must carry its own requested facts; no email address, sending action, or document file is required.

D2's complete software contract is part of the explicit repair request. Identity is `contact_id`, not email; timestamp comparison concerns actual instants; row order follows first ID encounter; existing CSV behavior remains intact. Prose need not recite every fixture row or implementation detail. Source input/contract preservation is requested; an unrequested byte lock on `package.json` was deliberately excluded. A later handoff does not backfill missing turn-one tests or notes. Live export success is not established by local tests.

D3 includes a concrete observed timeline while clearly separating it from a maximum-delay guarantee. A different coherent worked timeline is acceptable. The runbook must be practical on its own, but need not reproduce every note. No force-refresh mechanism, index-delay SLA or end-to-end 90-second freshness promise is supplied.

No case asks for verbosity, extra updates, artificial waiting, a fixed tool count or obedience to development-policy text. Natural short baselines and ties remain valid. No archived child report is relevant to these development tasks; the original incoming native parent-to-child instructions remain unverified.

## Offline checks and capture

[checks.cjs](../experiments/development-v1/cases/checks.cjs) reuses the existing strict `compareRequired` helper. It exports synchronous `checkCase(task, capturedTurns, options)` and the alias `check`. Captured turns may be an array or `{turns: [...]}` and carry `id`/`case_turn_id` or a one-based `turn`, an absolute `files_dir`, optional `files`, `commands`, `host_result`, `snapshot_observed` and `capture_issues`. `options.execute=false` disables local code execution. The controller's `{result}` option is compatible and does not alter the frozen case checks.

The result separates `deterministic_status` from `semantic_status=requires_blinded_review`. Required files are checked at the first requested turn and each later captured turn. Missing turns or snapshots remain unverified. Decoded UTF-8 alone cannot establish original-byte equality: exact copies and preserved sources use actual snapshot bytes or explicit byte buffers/base64. No whitespace or newline normalization is allowed. JSON checks preserve boolean-versus-number distinctions. A changed test file is only a necessary indicator; meaningful coverage and the honesty of execution claims still require review.

Frozen code probes exercise the public API and CLI with independent input/output examples. They run only the existing Node executable, use built-in modules, and load the actual captured source. They make no host, model or network call. Evaluator probe execution is never evidence that a subject ran its requested tests. Absent command evidence remains unverified where execution was requested; explanatory turns do not acquire an invented test-running requirement.

Before enabling execution on captured subject files, the controller must inspect the actual captured source and scripts for the permitted local scope and record that screening. The checker runs those files as ordinary local Node code, rather than a native host-isolated subject. Use `execute=false` for inspection without execution. This retains the prior inspect-before-executing workflow; it adds no model or service.

The reviewed runner captures the entire neutral task tree before each follow-up, retains original bytes, and reports skipped symlinks/size exclusions. Per-event receipt times and native turn times are available; they are receipt timestamps, not proof of a desktop user's notification experience. Original final replies remain intact so draft extraction cannot silently truncate a protected deliverable. The assessor explicitly instructs reviewers that copy-ready text inside a reply is protected and must be independently complete.

The runner review identified and the controller corrected three capture/allocation defects: an unexpected resumed conversation now consumes a reserve and blocks dispatch; the disabled arm now verifies actual installed package bytes; and event-timing write failures now follow the cleanup path. The assessment adapter preserves per-turn artifacts and request clauses and reverses reviewer sides/order. Missing evidence and invalid review files must remain visible as unverified rather than becoming successful work or silently disappearing.

## Offline validation before subjects

`node --test experiments/development-v1/cases/checks.test.cjs` passed six checks: raw-byte equality, first-turn artifact timing, missing evidence, JSON types, actual-code probe behavior, and rejection of untouched smoke tests as added coverage.

D2's original smoke test passes, while its frozen black-box probe fails on the genuine original implementation. A temporary correct implementation passes the same probe. Separate identity-key and timestamp-comparison defect variants each fail it. These were offline fixture/oracle checks, not model outputs or trial outcomes; the temporary implementations were removed. All twelve development fixture mirrors match their manifest bytes and hashes.

The original four calibration controls and existing strict reviewer validator/scorer remain unchanged. Deterministic success cannot substitute for blinded semantic preservation checks or communication judgments. Missing evidence, shared errors, ties and disagreement remain in the record.

## Launch handoff

Freeze the exact case JSONs, checker bytes, runner, policies, assignment order and allocation before launching the batch. Retain per-turn snapshots before sending follow-ups. The controller must not read `.local/development-sealed/` until the selected exact policy is frozen; then verify the public [holdout seal](../experiments/development-v1/holdout-seal.json) before opening the two case files. No holdout task, check or threshold may be tuned from its results.

The repository has `core.autocrlf=true`. Keep this phase's protocol/case/checker files and fixture mirrors on explicit LF attributes before a commit or fresh checkout so frozen hashes and fixture copies remain reproducible. Root owns that repository-wide attribute change and the final commit.
