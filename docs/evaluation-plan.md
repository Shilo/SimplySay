# SimplySay evaluation proposal

Status: proposed, not approved for release evaluation. Research date: 2026-10-28.

No SimplySay runtime or release artifact exists yet. No behavior improvement, installed-host comparison, non-interference, or cross-host support has been demonstrated. This document defines how to earn those claims. The owner approved local, no-spend exploratory work in disposable temporary directories with isolated profiles and synthetic fixtures. That approval excludes global installations, personal project access, new paid APIs, and existing-account model sessions. Static inspections and safe local packaging tests can proceed; model-based trials need an approved credential and usage plan.

## What this evaluation must distinguish

Installation, discovered metadata, loaded policy, application to the intended audience, continued adherence, and improved comprehension are separate observations. No single manifest check or model self-report proves all six. A short response can be worse than a long one. A passing code task can still have damaged documentation or an incomplete agent handoff.

Evaluate observable work and deliverables against explicit task requirements. Do not promise identical hidden reasoning, identical tool sequences, or universal isolation from a prompt. The strict scope remains a release gate, not something to dilute when testing becomes inconvenient.

## Proposed staged coverage and budget

1. Establish available host versions, supported profile isolation, configuration precedence, and policy-loading evidence without starting model tasks. Inventory commands rather than treating presence on PATH as usable authentication or support.
2. Run credential-free structural and lifecycle experiments on inspected packages in disposable profiles. Block execution if profile isolation is insufficient. Retain manifests, exact source revisions, commands, exit codes, and configuration deltas. These experiments do not establish communication quality.
3. After a separate usage approval, run an exploratory pilot: 8 development tasks, 2 host/model combinations, 2 repetitions, four treatments (128 task sessions). Use the native concise mode or short ordinary instruction as treatment D. Competitor comparisons and standard-cue experiments receive their own bounded exploratory allocation rather than expanding the full factorial indefinitely.
4. After design approval, tune only on development cases. A different agent owns final holdout tasks and essential-information checklists before seeing the final policy. Do not place holdout tasks or graders in subject workspaces.
5. Proposed release comparison: 16 holdout task families, 2 host/model combinations, 3 repetitions, treatments A/B/C/D (384 task sessions), plus targeted lifecycle and co-installation checks. This is a proposed risk-based sample, not a power calculation or an approved spending commitment. Use measured pilot usage to propose a monetary/session cap before proceeding. Stop on critical failures; do not spend the full allocation to collect more favorable examples.

If the owner selects a smaller matrix or cannot authorize a second combination, label the evidence accordingly and discuss the effect on release claims. A second model in the same host does not test a second integration mechanism. A headless CLI does not test an interactive desktop route.

## Matched treatments

| Group | Setup | Required evidence |
| --- | --- | --- |
| A, absent | Fresh isolated profile without SimplySay | Inventory shows no package, prompt, hook, style, memory, or inherited development rules |
| B, disabled | Same package installed, disabled before a fresh session | Package still present; host loading evidence shows policy absent; unrelated settings unchanged |
| C, enabled | Exact distributable installed through proposed user route | Host loading evidence identifies source, version, digest, and policy; task does not name SimplySay |
| D, simplest alternative | Native concise mode or short generic instruction | Exact built-in version or instruction saved; scope differences explicitly reported |
| E, competitor | Unmodified inspected product in its documented mode | Pin, installation route, activation route, mode, artifact, and observability saved separately |

Where a host lacks disable, test documented removal and call it removal, not an invented disabled state. Keep enabled-to-disabled-to-enabled within one conversation as a separate transition test; old instructions may remain in history. The causal disabled comparison always uses a fresh session.

Randomize treatment order within task/repetition blocks. Keep inputs, fixtures, model, effort settings, permission boundaries, tool availability, and output budget matched. Record settings that cannot be pinned. Separate failed startup or runtime errors from task and communication failures; neither may be discarded silently.

## Isolation and collection

Subjects run outside SimplySay and competitor instruction trees. Check parent and global guidance, memory, styles, plugins, hooks, caches, persisted trust, and resume state. A temporary current directory alone is insufficient. Use only documented per-process profile controls; never modify the owner's configuration or copy an entire credential store. No source files, evaluation rubric, expected answers, handoff, research report, or earlier transcript is given to the subject unless the treatment requires that file.

Save sanitized full visible conversation events, separate model-authored prose from host cards, and collect actual output files, checks, and observable agent messages. Preserve tool arguments and exact strings where relevant. Do not collect private hidden reasoning or real user conversations. A redacted trace must disclose which observable evidence is missing.

Record source/package hash, host binary version, model identifier, OS/shell, configuration snapshot/digest, treatment, task ID, repetition, wall time, output limits, loading evidence, artifacts, verification, and failure category. Store raw local logs outside version control until reviewed. Public evidence uses synthetic fixtures and scrubbed metadata.

## Cases and grading

| Family | Task requirement and important failure |
| --- | --- |
| Simple answer/completion | Answer promptly in natural prose; do not require every answer to shrink |
| Multi-part question | Retain each requested part and meaningful trade-off |
| Technical explanation | Preserve exact concepts, terms, units, and necessary context |
| Requested depth | Provide the requested walkthrough, examples, and reasoning summary |
| Confused reader | Restore missing context and explain terms; clipping words alone fails |
| Research and report | Satisfy specified investigation, citations, uncertainty, and report sections; inspect actual file |
| Code and documentation | Functional requirements, edge cases, tests, and documentation remain adequate; inspect changes and test results |
| Copy-ready chat artifact | Required format, content, tone, length, quotations, and syntax inside the artifact survive |
| Mixed wrapper/artifact | Short ordinary introduction can surround a substantial requested deliverable |
| Exact and structured output | Byte equality for specified strings and syntactic/semantic checks for JSON, commands, identifiers, numbers |
| Multi-agent task | Actual delegation and reports preserve required evidence, alternatives, failures, and context; no style instruction copied into handoff |
| Long tool sequence | Count unnecessary narration separately; required approvals, blockers, and meaningful updates remain timely |
| Failure/uncertainty | Specific incomplete work, material limitations, failed checks, and next decisions stay visible |
| Persistence and precedence | Fresh, resume, fork, compaction, and conflicting instructions behave as documented without duplicate policy |
| Language | Non-English prose and mixed technical identifiers preserve meaning and requested language |
| Machine caller | No styling of structured output or an automated caller's deliverable based merely on a user-role message |

Use paired boundary cases that ask for the same subject as chat, a file, copy-ready content, structured output, and a detailed handoff. Derive essentials from the task, not the baseline answer. Functional tests should allow multiple correct implementations. Do not grade arbitrary command order or require byte-identical nondeterministic generated reports.

Keep two independent judgments: task quality/essential information, and communication benefit. A critical omission, corrupted deliverable, suppressed approval, inaccurate verification claim, or lost handoff context fails the first gate regardless of brevity. Do not average severe failures away.

For communication, blind product labels and randomize answer order. Ask readers to identify the answer, caveat, and next decision, then rate unnecessary reading, clarity, technical precision, interruption burden, and missing context. The owner reviews representative pairs and all material regressions. Any model-assisted judge must first reject deliberately short incomplete answers, verbose correct answers with filler, corrupted artifacts, and an inert/broken-loading treatment. Include known good examples. Preserve disagreements and do not claim human calibration before it occurs.

Word count, readability formulas, and tokens are diagnostics only. Count ordinary chat separately from protected copy-ready content. A well-scoped change need not reduce the size of a requested detailed explanation.

## Proposed release gates, for owner approval

- Zero observed critical essential-information, permission, output-corruption, or handoff failures in the final matrix. Investigate any candidate-associated task regression before release. Zero observed is a sample result, not proof of zero population risk.
- All deterministic checks pass on the exact artifact. All claimed routes pass native installation, activation, fresh disabled/removal, re-enable, uninstall/reinstall, and unrelated-setting preservation checks.
- Owner-approved blinded examples show meaningful comprehension or reading-burden benefit against A/B and the simple alternative, with no essential-detail trade-off. Proposed operational signal: prefer C in at least two-thirds of non-tied reviewed pairs against A/B, report ties, per-family results and uncertainty. Do not claim statistical superiority from that rule. If C cannot beat D, reconsider packaging/value rather than lowering the gate after seeing results.
- Proposed runtime budget: no additional model call, network request, telemetry, daemon, database, or installed third-party dependency; policy target at most 500 words and runtime package target at most 32 KiB excluding optional artwork/licenses. A hook, if justified, must disclose process startup and measured p50/p95 latency. A provisional p95 hook target of 100 ms requires measurement and approval, not a zero-latency claim.
- An independent agent installs and tests the exact artifact, records its hash and source commit, and reproduces important findings. Any later change triggers affected checks again.

## Package and guidance checks

Inspect the archive allowlist and each loaded entry point. Development principles, research, orchestration, handoff, graders, logs, and test fixtures must not become runtime startup instructions. Check Windows spaces/non-ASCII paths, shell quoting, line endings, permissions, and documented OS routes. Validate manifests against the targeted host schema/version; a syntactically valid JSON file is insufficient.

Check source-to-generated adapter equality if generation is approved. Test deterministic generation, repeat installation, upgrade, rollback where supported, and removal without restoring stale configuration over later user edits. Test coexistence and duplicate catalog names using disposable catalogs in both registration orders, without changing the reference project or its real installation. Do not execute its credentialed runtime just to test identity.

Fresh development-agent sessions should learn product intent and the chat-only boundary from the proposed compact root guidance, locate the relevant design/evaluation/release instructions, and read the prerequisites before acting. Verify startup loading rather than assuming Markdown links import content. A CLAUDE compatibility import, if retained, imports only the compact AGENTS file.

## Evidence basis and independent review

Official evaluation guidance distinguishes observed events and task outcomes from final success claims, recommends small targeted checks and repeated trials, and warns about judge biases. This proposal adapts that guidance; the sample sizes and thresholds above are project hypotheses, not requirements from a provider.

- [OpenAI, Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills), accessed 2026-10-28: separate outcome/style/activation checks and use real event evidence.
- [OpenAI, Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), accessed 2026-10-28: held-out cases, human calibration, order and verbosity bias.
- [Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents), published 2026-01-09, accessed 2026-10-28: repeated trials, task outcomes, calibrated graders, and interpretable failure analysis.

Independent challenge and final holdout authorship are pending. The policy author must not manufacture a passing test by writing final cases around their own wording. No trial outcomes are reported in this proposal.
