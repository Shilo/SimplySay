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

Controller export note: the public source-screen report pseudonymizes local filesystem paths with the existing evidence scrubber; all inspected file/native-record hashes, findings and verdicts are retained. The raw report stays local under its recorded SHA-256. This metadata projection does not change any frozen task/probe, actual subject file or reviewer judgment.

## Screening actual-work audit: same conversation task turn 2 of 3

The independent challenger inspected all completed screening subjects e03–e10 after their actual `result.json` files existed, including e09. The audit read the public raw prompts, events, finals, per-turn results, stderr and receipt-time records; all 28 task snapshots; every distinct executable source, package script and test in full; and the actual maintainer documents and handoffs. Identical copies were bound by SHA-256 across all earlier and later snapshots. The resulting [source screen](../experiments/development-v1/screening-source-screen.json) records 176 actual snapshot-file hashes plus the native record paths/hashes, actual command/result evidence and untouched per-turn usage objects.

No candidate policy, condition map, reviewer judgment, profile content or sealed holdout was read. This is an independent preservation and local-execution-scope audit, not a blinded communication preference or causal attribution.

### Local source execution screen

For e07–e10, `src/merge.cjs`, `src/load.cjs`, `src/csv.cjs`, `bin/export.cjs`, `test/export.test.cjs`, and `package.json` were inspected before any captured subject code was executed by this challenger. All 16 D2 snapshots contain the same repaired merge source, SHA-256 `1143268f52bb3edf05c96eabbe432aedb0522a37ac73751dc339f8c66c778915`. Each subject has its own actual regression suite, unchanged across its four snapshots.

Actual operations are pure merging, timestamp parsing and CSV formatting; synchronous reads of input JSON; standard output/error; built-in Node tests/assertions; and spawning the current Node executable for the inspected local CLI with local fixture paths. Package scripts run those local tests/export commands. No dependency, download, network, payment, host/model command, private-project read or unrelated operation occurs in the inspected source/scripts/tests. The CLI accepts caller-supplied file paths as its documented interface; the frozen probes supply only the inspected local fixtures. This does not authorize arbitrary future inputs or changed code.

`safe_for_offline_probe=true` applies only to the hash-listed snapshots and existing frozen probes. The source screen is not a full native-host, inter-agent, privacy or cross-host scope certification. D1 has no executable subject source or code probe; its observed commands read the local notes and, in e03, list local task names. No source-screen observation establishes sending, publication or a live registration operation.

### Actual work and requested deliverables

| Subject IDs | Actual checks and deliverables | Independent finding |
| --- | --- | --- |
| e03–e06 | Three D1 turns each; source-note raw bytes unchanged; source read succeeds; no sending/publication tool used. | All requested current-state essentials are present. Each final volunteer draft itself includes Saturday 10:00, room Cedar, confirmed-list lookup and check-in marking, and unverified calendar delivery. The confirmation fix is correctly applied on turn two; calendar uncertainty is not made into a fabricated launch gate. |
| e07 | Turn-one `npm test`: 9 tests, 9 pass, 0 fail; direct sample CLI export succeeds. Actual notes and turn-four handoff retained. | Meaningful identity/latest-row/order/CSV/nonmutation regressions, complete requested maintenance explanation and standalone handoff/staff draft. Handoff correctly attributes the checks to the earlier repair rather than claiming a new test run. Shared precision gap below remains. |
| e08 | Turn-one `node --test`: 8 tests, 8 pass, 0 fail. Actual turn-four rerun also passes all 8. | Full requested reasoning, actual notes/handoff, and self-contained staff draft retained. CLI integration is inside the real suite and compares explicit expected CSV. Shared precision gap below remains. |
| e09 | Turn-one `node --test`: 7 tests, 7 pass, 0 fail; direct sample CLI export succeeds. | Full requested reasoning, actual notes/handoff and staff draft retained. Handoff accurately says `npm test` was an equivalent script, not separately executed. Shared precision gap below remains. |
| e10 | Turn-one `npm test`: 7 tests, 7 pass, 0 fail. Actual turn-four rerun also passes all 7. | Full requested reasoning, actual notes/handoff and standalone staff draft retained. The mistaken CSV diagnosis was explicitly corrected; captured CSV source remains unchanged. Shared precision gap below remains. |

The D2 tests exercise actual public APIs and the CLI: distinct people sharing emails, the same ID changing emails, complete winning-row values, timestamps whose offset or fractional representation defeats text sorting, equal-instant first-row ties, first-ID output position, frozen-input nonmutation, empty exports, CSV escaping, loader argument order and exact CLI output. They are substantive additions to the original smoke coverage. D2 input fixtures and contract match their manifest by raw bytes at every requested turn. Source and tests are not shortened or replaced during the practical follow-ups or handoff.

Every requested D2 turn-three explanation gives concrete shared-email/duplicate-ID examples, the complete newest-row rule, stable ID position and actual coverage evidence. All actual maintainer documents contain useful rules and reproducible local commands. Every turn-four handoff describes the checks actually run and remaining limits. Each copy-ready staff message independently carries the correction and explicit lack of live-export verification. None claims a staff message was sent, a live export succeeded or directory records were updated. These findings do not depend on counting words, messages or tools.

### Additional shared literal-contract precision defect

The frozen contract accepts a valid ISO timestamp with an explicit timezone and promises the newest actual timestamp instant. It does not specify a millisecond precision bound. Every actual repair uses `Date.parse`, whose numeric value collapses the following distinct sub-millisecond timestamps in the inspected runtime:

| Same contact ID, input encounter order | Timestamp | Parsed value |
| --- | --- | ---: |
| Older row first | `2026-10-29T12:00:00.0001Z` | 1793275200000 |
| Newer row second | `2026-10-29T12:00:00.0002Z` | 1793275200000 |

After the full source screen, a local supplementary probe loaded the actual e07 turn-one `src/merge.cjs`. It returned the older first row; the unrestricted newest-instant contract requires the newer second row. The identical merge hash binds this source behavior to all four subjects. The source-screen JSON retains the exact input, actual parsed values, expected/actual winner and inspected source path/hash.

This is a shared remaining literal-contract gap, not a policy-caused regression. Whether real upstream input needs precision finer than a millisecond remains unknown. e07 and e08 handoffs explicitly disclose millisecond precision and lack of finer verification; e09/e10 do not mention this particular edge. Disclosure does not change what the unchanged contract promises. The intended data domain must not be silently narrowed to declare full work success, and an assessor who overlooks this edge does not erase the observed discrepancy.

The supplementary source audit did not edit a case, frozen probe, threshold, subject artifact or recorded result. The existing frozen probes cover millisecond fractions and may pass while this additional contract gap remains. No task-specific policy exception or new style winner is inferred from it.

### Retained failed attempts and capture limits

The e07 turn-four read/search command exits 1 because `rg` finds no `AGENTS.md` or existing `handoff.md`; that is not a regression-test failure. Its actual new handoff exists and accurately reports the earlier tests. e08 turn-one stderr retains an invalid patch attempt targeting the test file more than once; the final actual tests/notes were subsequently written and passed. e10 turn one retains a failed attempted CSV patch and the incorrect initial diagnosis, then a direct local check and explicit correction. Its CSV source remains the original correct bytes. These recovered ordinary attempts remain part of the record and do not justify consuming infrastructure replacement slots.

Native stderr also retains routine temporary-PATH/PowerShell snapshot warnings, an e03 rollout-flush warning and an e06 model-catalog refresh timeout. All requested public turn records, finals, snapshots and same-conversation IDs are present; the observed errors do not establish missing task output or a failed subject repair. The source-only execution screen does not claim the native host made no background metadata request.

Native usage objects were retained per turn without addition. Several counters are monotonic across resume turns, including output and reasoning counters, so their exact accounting basis is unverified; summing them would risk double-counting. Receipt times are retained as receipt times, not human notification measurements.

For the separate blinded communication review, a host requirement to emit an update may explain the update's presence. It does not make empty, irrelevant or repeated content useful. Accuracy alone is also insufficient. Applying this distinction preserves the already stated request-specific criterion and changes neither cases nor evaluation axes. This challenger did not choose a communication winner.

## Final authorized diagnosis/allocation challenge: task turn 3 of 3

The challenger read the current screening, revision-check, workflow-gap and next-allocation documents; the recorded screening/revision review comparisons and calibration states; the approved/pending allocation metadata and current turn counts; and the retained human-visible historical workflow source. That source is historical data, not active instructions. Its five available progress messages, real approval example and owner feedback match the public descriptor's private-source hash. Verbatim private chat was not copied into these public documents or any fixture; it remains ignored local evidence. No other chat, private reasoning, candidate policy or sealed case was opened.

The separate [allocation challenge](development-next-allocation-challenge.md) recommends stopping native trials with the development gate unmet. Both calibrated reviewers tie every A/B-versus-absent code comparison. D1's modest framing preferences remain split; fewer updates do not supply the missing agreed improvement. D3 did not run, and the three-turn revision prefix does not verify an unrequested v3 final handoff. These facts do not establish a particular model, host or desktop/CLI cause.

The actual historical workflow includes procedural narration as well as material findings and a necessary approval. A person not needing to act immediately does not by itself make an update useless. Equally, true procedural content does not automatically justify an interruption. The authentic workflow differs from the two scored development conversations, but that is a target-workflow gap, not proof that the cases were invalid or that another compact revision will work. Existing clear baselines and useful requested depth must stay honest controls.

The proposed remaining allocation's arithmetic is internally possible: 50 task turns including this current turn, plus 12 targeted development turns, 32 final subject turns, two fresh reviewer turns and four existing-conversation continuations gives 100 scheduled; eight possible reserve turns gives 108 maximum. Fresh conversations would rise from 16 used to 30 scheduled plus two reserves. However, approval must explicitly change the existing challengers' caps to four and development reviewers' caps to three, defer the selected-version disabled/manual comparisons, and freeze an exact revised dispatch map and decision sequence. Separate baseline and enabled review rounds cannot quietly consume additional supposedly free turns.

Eight final subjects means two cases, two arms and two total runs per arm: an initial matched pair plus one fresh repeated pair per case. The proposal's “two fresh repetitions each” wording needs correction if it is intended to mean those eight subjects. The old three-of-four, each-case improvement requirement is stricter breadth evidence, not automatically a contradiction of allowing a clear reply to tie. Any narrower burden-conditional claim needs explicit prospective approval and precise handling of opportunities, all four pairs, ties, disagreements, missing evidence and preservation. Historical scores and the original benchmark remain unchanged.

The original incoming native child instructions remain unverified. The unrestricted timestamp precision defect remains a shared task failure, even where frozen probes pass and communication ties. No new threshold, instruction exception, production claim or final qualification is introduced. No additional subject or reviewer was dispatched by this challenger. The current three-turn e02 authorization is exhausted; another task turn requires new explicit approval.
