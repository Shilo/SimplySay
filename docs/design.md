# SimplySay challenged design record

Status: research proposal, no production implementation approved. Updated 2026-10-28.

## Owner outcomes and approval state

Preserve SimplySay, repository name SimplySay, and “Less to read, everything you need.” Improve first-read comprehension in direct human chat, retain essential information and necessary communication, and preserve the requested work, files, copy-ready deliverables, structured/tool output, and agent-to-agent communication. Runtime simplicity does not reduce development or task effort.

The full 645-line handoff was read. Its architectural and procedural suggestions are research subjects, not installed instructions. No handoff text or research material is to be loaded as the product policy.

The owner approved local exploratory execution and up to 24 evaluation sessions using existing Claude/Codex sign-ins, including children/failures/diagnostics, with no new paid API or judging. Later steering prohibited direct Claude use and requested a standalone owner-run handoff. A temporary Codex sign-in-cache copy was explicitly approved and cleaned up. Eleven Codex evaluation sessions ran under a narrower 12-slot active allocation; see the [pilot results](pilot-results.md). Global installations, personal project access and permanent preference overrides remain unauthorized. The confirmed future public target is `Shilo/SimplySay`; this does not approve publication. A connected-account lookup returned `Shilo`. A repository lookup returned 404; that does not prove name availability or absence of an inaccessible private repository. Recheck before creation.

Production architecture, support scope, final marketplace identities, release-evaluation thresholds/budget, optional levels and release remain unapproved. No production plugin, root development instruction file, production marketplace configuration, public repository, release or listing has been created. Disposable experimental packages and recorded pilot allocations are approved research, not production scaffolding.

## Provisional behavior contract

1. Apply communication guidance only to ordinary conversational prose directed to the human. Lead with the answer or useful result, use natural language and necessary technical precision, and retain the context required to understand and act.
2. Preserve requested facts, meaningful uncertainty, limitations, trade-offs, sources, necessary warnings/approvals/questions, and accurate completion/verification status. Requested depth and confusion are reasons to explain sufficiently.
3. Reduce redundant prose and routine narration where the host permits. Do not suppress required updates or interface notifications the product cannot control.
4. Exempt all deliverables, including those displayed in chat; files; code/comments/tests; commands; exact quotations; JSON; tool arguments/results; persistent memories; and all inter-agent prompts, reports, and handoffs. The surrounding ordinary chat may be concise.
5. Do not alter model effort, research, implementation strategy, tool selection, testing, verification, or required task completeness. Do not add mandatory work procedures to users' agents.
6. Respect higher-priority host instructions and explicit user preferences. Neither a `user` role nor a terminal invocation proves a human audience. Audience uncertainty is a support limitation to resolve before claiming the route works.

This is a behavior specification for evaluation, not the final runtime prompt. A prompt boundary is not an enforcement mechanism or proof of non-interference.

## Architecture alternatives and current recommendation

| Mechanism | Strongest case | Main objection / evidence required | Proposed disposition |
| --- | --- | --- | --- |
| Existing native concise setting | No custom runtime, native persistence/control, smallest installation | May not preserve all artifact and delegation boundaries; one host's mode does not create a portable product | Mandatory comparator; adopt as recommendation where it meets the contract |
| Short native persistent instruction | Portable text, no processes or additional calls | Config editing can affect sub-agents and automated callers; enable/disable and upgrade ownership are awkward | Mandatory simple comparator, not an automatic plugin claim |
| Native output-style plugin | Host supplies loading and controls; no shell hook required | May override the user's style, omit engineering defaults unless configured, and reach forks | Best first candidate for an isolated Claude experiment, not yet approved or behavior-validated |
| On-demand skill | Familiar packaging/discovery in many hosts | Metadata availability is not automatic policy loading; explicit per-task invocation misses the operational goal | Useful alternative/repair scenario; insufficient alone for promised automatic activation |
| Session hook adding policy | Can load persistent policy at a lifecycle boundary | Trust, shell/process overhead, repeat injection, audience propagation, compaction, host-specific protocol, directory eligibility | Consider only where native style/config cannot satisfy the requirement; no default adoption |
| Output filter, proxy, extra model | Can directly rewrite a final string | Artifacts and tool streams can be corrupted; latency, credentials, network and runtime cost; progress and audience separation remain hard | Reject without a demonstrated unmet requirement and separate approval |

Prefer one original, scope-explicit plain-language policy and native controls, with only the adapters justified by tests. Do not select a production language/package manager, installer, dependency, hook, or generator before experiments establish the need. No levels, persona, word/sentence caps, blacklist, glossary maintenance, telemetry, MCP server, daemon, or extra model call are recommended.

Packaging must earn its existence over native configuration: versioned and reviewable instructions, dependable installation/removal, verified scope, and reproducible evidence are plausible value. If it cannot improve on the simple alternative without scope regressions, stop and reconsider the plugin design rather than inventing features.

## Consequential decision challenges

| Assumption / preference | Credible alternative and falsifier | Evidence / independent challenge | State |
| --- | --- | --- | --- |
| Smallest sufficient policy | A shorter generic instruction or native setting already works | Compare minimal, scope-explicit, and failure-driven candidates; ablate clauses only on development cases; preserve rare-critical boundaries | Proposed, untested |
| Named ASD-STE100 cue helps chat | Ordinary plain-language rules or selected relevant principles | A technical-documentation standard does not establish conversational benefit; it permits technical terms, so presumed terminology removal is not a valid objection. Researchers independently corroborated current official material; compare equal boundaries across languages | Ordinary-language baseline recommended provisionally; no measured verdict or compliance claim |
| One adaptive default | Explicit conciseness levels | Levels add configuration and test burden; need a problem ordinary requests for detail cannot solve | Recommend no levels, owner decision pending |
| KISS | More files can clarify package ownership | Simplicity means understandable behavior and removal, not fewest files or weakest evaluation | Reference reviewer supports decision aid, not runtime coding philosophy |
| YAGNI | Serious rare boundary failures justify preventive coverage | Do not equate “not frequent” with “unnecessary”; avoid speculative modes and framework hooks | Proposed |
| DRY shared source | Two tiny verified copies may be simpler than an engine | Select physical sharing or minimal generated copies only after host packaging tests; test generated equivalence if used | Proposed |
| Thin adapters | Host-native features can still change unrelated behavior | Test engineering defaults, style precedence, forks and machine consumers rather than count adapter lines | Open release blocker |
| Progressive discovery | Essential requirements can be missed behind links | Fresh agents must find and read prerequisites before affected tasks; root keeps intent/scope/approval gates | Proposed |
| Dedicated marketplace | Shared catalog can reference independent repos | Reference uses a dedicated catalog; that is preference evidence, not necessity; native duplicate-name replacement is a real hazard | Exact identity approval pending |
| Full reference-project semantic reread | Architecture/source-focused audit may answer SimplySay questions with less irrelevant work | Owner approved focused scope; all 421 files accounted for, 117 fully read and 304 explicitly excluded by reason, including domain research/art material | Focused audit complete; never call this a comprehensive review of the entire project |
| Extensive testing | Smaller staged comparisons may reveal the same blockers at lower cost | Independent host reviewer rejected initial 512-session expansion and conflated simple alternatives; revised pilot caps at 24, separates native mode from minimal instructions, defers final numerical gate | Revised proposal, owner approval pending |
| Fixed public introduction | Qualified wording may be necessary before cross-host evidence exists | “Works across different AI agents” and “changes only” exceed present evidence | Preserve approved text as draft, seek qualification approval if evidence remains limited |

## Development guidance and source layout, proposal only

Keep a compact root `AGENTS.md` with product purpose, central chat-only boundary, concrete KISS/YAGNI/DRY guidance, Conventional Commits, and triggered navigation. Before policy changes read the behavior/design/evaluation requirements; before adapters or packaging changes read integration evidence; before publication read release and privacy/license requirements. Root retains approval prerequisites so navigation cannot hide them.

Recommend a one-line `CLAUDE.md` import of the compact `AGENTS.md`, with one substantive root source and no eager import of a whole handbook. The independent reference auditor challenged the earlier duplicate-loading concern: current [Claude memory documentation](https://code.claude.com/docs/en/memory) says the import is deduplicated, whereas direct AGENTS fallback (v2.1.277+) can be suppressed by an ancestor/local CLAUDE file. The wrapper therefore has a concrete compatibility role. Verify root/subdirectory/Windows entry points in targeted versions rather than treating documentation as observed loading.

Keep runtime policy and host metadata in small allowlisted package directories that contain no development guidance. Proposed production layout, shown for review only:

```text
AGENTS.md                         compact development intent and task navigation
CLAUDE.md                         @AGENTS.md compatibility entry point
policy.md                         one original behavioral source, not a startup import
packages/claude/                   native manifest and generated output-style body
packages/codex/                    conditional local hook adapter, only if feasible
docs/                             design, evidence, evaluation, development/release guide
tests/                            structural and integration tests, never installed
tools/                            minimal development-only packaging if needed
```

Claude's payload would contain `.claude-plugin/plugin.json` and `output-styles/simplysay.md`; catalog metadata points at that payload, not the whole development repository. If Codex feasibility fails, do not create an empty adapter or silently substitute an on-demand skill. A small deterministic build can add required host frontmatter around the same policy, with source/body equality checked. No runtime generator, generalized adapter engine, or nested instruction hierarchy is proposed. These paths are a review proposal, not created scaffolding. Exact catalog schema/source layout and build necessity must pass native experiments before implementation approval.

## Recommended next experiment and support/identity decision

The initial candidate proposal compared Claude Code's native style against its built-in Concise mode, preserving engineering instructions and matching full/short system prompts. **Owner steering now prohibits direct Claude testing.** The [self-contained owner-run handoff](Claude_Pilot_Handoff.md) carries automatic and one-time-selection comparisons, native Concise and minimal controls. Automatic loading can override a chosen style; explicit selection adds setup and needs lifecycle testing. These Claude behavior routes remain unexecuted and are not approved production designs.

The actual pilot investigated Codex local SessionStart injection first. Native package loading and fresh disabled/absent omission were observed; requested code/files, copy-ready email and depth survived the completed cases. A completed enabled child retained its full report despite inherited policy; inheritance alone is not a failure. The failed delegation baseline and opaque incoming directive leave scope evidence incomplete. Official [hook documentation](https://learn.chatgpt.com/docs/hooks) does not establish a human-versus-automated audience flag, so no deterministic isolation or universal support claim follows. Marketplace hook restrictions are separate from this technical feasibility. Gemini remains a research alternative, not a silent replacement or approved support route.

All other host rows in the [distribution matrix](host-distribution.md) are qualified candidates or deferred routes, not silent exclusions or compatibility claims. A directory listing, manual skill, local automatic integration, and tested route remain distinct. Cross-agent branding requires evidence on more than one relevant host/model combination and owner approval of any qualified route.

Exact proposed initial identities for review: display/repository **SimplySay**, GitHub source `Shilo/SimplySay`, plugin ID `simplysay`, dedicated catalog ID `simplysay-marketplace`. Credible alternative catalog ID `shilo-simplysay` reduces accidental generic-name collision but does not prevent deliberate source replacement. A shared publisher catalog referencing this separate repository remains viable and adds shared maintenance. No identity is reserved by this proposal. Example Claude flow: `claude plugin marketplace add Shilo/SimplySay`, then `claude plugin install simplysay@simplysay-marketplace`. These are candidate future commands, not valid installation instructions for the current research-only repository. Codex's same proposed catalog/plugin labels require its own native configuration and collision tests. Registry handles for ClawHub and portal-assigned OpenAI listing identities are unresolved; do not infer them from the GitHub login.

## Evidence and remaining work

- [Communication research](communication-research.md): pinned source inspections of 10 repositories, four newly discovered alternatives, ASD-STE100, videos, local test evidence, and final independent design/evaluation review.
- [Reference audit](reference-audit.md): file-level keep/adapt/reject and per-file coverage ledger; comprehensive read is explicitly incomplete.
- [Host/distribution research](host-distribution.md): current loading/control/distribution mechanisms, identity proposal, pinned official examples, isolated CLI experiments, and independent reproduction of Caveman's 13-test subagent suite.
- [Evaluation proposal](evaluation-plan.md): absent/disabled/enabled/simple-alternative comparisons, independent holdouts, actual artifacts/handoffs, performance, lifecycle, calibrated grading, and proposed release gates.

Lead independently reproduced the host researcher's Claude Code 2.1.312 inert catalog experiment in a separate fresh temporary profile: absent list, native installation, disabled state, re-enable command, uninstall back to empty list, and preservation of an unrelated setting. Registering a second local source with the same catalog name repointed the registration; the lead inspected the persisted catalog registry to confirm the new source. This was a synthetic metadata-only plugin, with no model call, hook, or communication policy. It proves neither policy loading nor SimplySay behavior. [Sanitized command/result evidence](catalog-experiment.json) preserves the actual observed records; only the machine-specific temporary root is replaced.

Official docs also identify a built-in Concise style and warn that custom styles require preserving coding instructions; forced plugin styles override user selection and forks inherit style context. These are documented mechanisms, not observed model behavior. See [Claude output styles](https://code.claude.com/docs/en/output-styles), accessed 2026-10-28. OpenAI currently excludes lifecycle hooks from public-directory ZIP submissions and points hook-dependent products to manual desktop installation, so a hook-dependent route cannot be described as directory-equivalent. See [OpenAI submission guidance](https://developers.openai.com/plugins/deploy/submission), accessed 2026-10-28.

All three real researchers formed initial recommendations before seeing this lead proposal. The host researcher independently challenged the evaluation; the communication researcher cross-checked host style documentation; the reference auditor independently challenged root-guidance and system-prompt assumptions; the lead independently reproduced the native catalog result. The communication researcher completed an independent final review of the integrated proposal and challenged session accounting, holdout-context contamination, and total package/prerequisite accounting; the evaluation plan now incorporates those corrections. These are actual separate agent sessions, not varied-model evidence or a vote establishing correctness. Detailed review is recorded in the research reports.

The approved bounded pilot is complete with explicit limitations in [results and matched examples](pilot-results.md). No measured human-comprehension improvement, complete inter-agent boundary proof, cross-host support or release readiness follows. The immediate recommendation is owner review of the evidence and a bounded matched handoff follow-up before production selection.

## Decisions to discuss before affected work

1. **Pilot access resolved:** 11 of 24 authorized evaluation sessions used, including native children and failures. One of the active 12 slots remains unused; further work needs a recorded follow-up allocation, not silent expansion. Temporary Codex sign-in copying was explicitly approved and cleanup verified. No new paid API or judging service was used.
2. **Automatic-style consent remains experimental:** no permanent override was approved. Claude execution is owner-run only; its standalone handoff compares automatic and one-time selection without assuming a winner.
3. **Scope and comprehension remain open:** assess actual protected-output effects, not inheritance alone. Owner review is needed for matched response comprehension. A four-session native handoff pair would fit the remaining original budget but needs discussion/allocation. Missing public incoming directives remain a host-observability limitation. No integration is silently excluded or rebranded as an on-demand repair tool.
4. **Reference scope resolved:** the owner approved the architecture-focused audit. It is complete within that scope with 117 files read and 304 explicitly excluded, all 421 inventoried. This is not a comprehensive project review.
5. **Later design/identity approval:** after pilot evidence, choose the actual integrations, dedicated/shared catalog, exact IDs, licensing, runtime budget, final holdout sample/thresholds, and approved claim wording before production scaffolding. No conciseness levels are recommended. The public target account is already confirmed and does not need to be asked again.
6. **Release metadata privacy:** before publication decide whether to retain configured personal commit-author contact information publicly or authorize replacing unpublished author metadata with a GitHub noreply identity. This does not block further local research; do not rewrite history or publish the contact information silently.

## Release checkpoint, not yet reached

The approved public target is `Shilo/SimplySay`. Before public creation or push, obtain release approval of the exact source/artifact revision and scope; recheck repository existence/ownership; inspect tracked files **and all Git history** for secrets, personal data, copyright, and attribution; select an owner-approved license; verify that build outputs contain only allowed runtime files; and independently test the final artifact. Review commit author metadata too: local configured identity can expose personal contact information even when files are clean. Do not rewrite history or silently publish that metadata without resolving the privacy choice.

Prepare public description, installation/uninstall instructions, compatibility limitations, license notices, submission metadata, and checksums. Track repository publication separately from directory submission/acceptance. After approval publish to the confirmed public repository and verify public visibility and URL. No external account change, marketplace submission, or public release is authorized by this research document.
