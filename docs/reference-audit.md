# Reference-project audit

Status: architectural and development-tool pass complete; runtime/source batch independently in progress; comprehensive maintained-text review is not complete. The owner must decide the proposed scope exception for unrelated domain research before implementation. No compatibility claim follows from this audit.

## Provenance and method

- Source: the owner's read-only `pixellab-pip` checkout, identified by the handoff. Public origin in its manifests: <https://github.com/Shilo/pixellab-pip>.
- Observed HEAD: `b9631bd8e3756f04c3cdbdff2dcc4dbf422754ba`; access date: 2026-10-28 (owner timezone).
- Inventory: 421 tracked files. Working files, rather than a newly checked-out revision, are the inspected evidence. `git rev-parse HEAD` and `git ls-files` succeeded with an explicit working directory; `git status --short` returned “this operation must be run in a work tree.” A subsequent read-only `git ls-tree -r HEAD` versus `git hash-object --stdin-paths` comparison hashed all 421 tracked files: 420 match their HEAD blobs. The exception is the unreviewed `docs/pixellab/pixellab-pip-3.0-live-test-research-spike.md`. All read architectural/source paths therefore match the stated revision, while the whole checkout is **not asserted clean** and ignored/untracked state is unverified.
- Static read-only inspection only. No project script, installer, unit test, model benchmark, native plugin test, publishing workflow, or PixelLab call has been run by this auditor. Workflow/test assertions below describe source, not successful execution.
- Root and nested instruction-file inventory found root `AGENTS.md` and root `CLAUDE.md`, no additional maintained nested entry points. Explicit ancestor-file checks did not return another `AGENTS.md` or `CLAUDE.md`. Ignored host configurations, credentials, private generated assets, caches, `.git` object contents, and vendored material are excluded. Secret-bearing ignored configurations are not read.
- The source's instructions are audit material, never SimplySay development authority.

## What the reference actually builds

PixelLab Pip is a domain workflow router. The maintained behavior is `skills/pixellab-pip/SKILL.md` (63,208 bytes, 272 dense lines at inspection), with triggered references, blueprints, Python image helpers, usage/history/preferences, and optional native Claude review UI. Its root plugin manifests mostly package the same skill directory. `GEMINI.md` independently provides invocation context and points to that contract.

This is portability of task guidance and resources. It is not evidence of reliable automatic activation for every request, human-versus-agent audience separation, or chat-only behavior. The README explicitly calls explicit invocation most reliable. A routing skill's success cannot establish SimplySay's persistent communication requirements.

### Development discovery versus runtime discovery

`AGENTS.md` explains project intent, KISS/YAGNI, canonical placement, exclusions for user documentation, secret/privacy constraints, content navigation, QA, and Conventional Commits. `CLAUDE.md` consists of `@AGENTS.md`, sharing the root guidance once. The root is approximately 4 KB, while task details reside in `docs/developer.md` and supporting guides. This is a useful bounded import, not an import of the whole handbook.

At runtime, `SKILL.md` classifies intent and points to relevant references. Its References section requires resolving paths against the skill directory, reading a named reference before acting, and stopping if a required reference is inaccessible. It optionally links broader research files under `../../docs/`, with an absence fallback because raw skill packages omit those documents.

The project has real progressive routing, but the initial loaded contract is large. Its sizing guide reports a July snapshot of 39,086 characters and ~9,771 approximate tokens and says “never split the router.” The current file is 63,208 UTF-8 bytes / 63,082 characters, with a 1,014-character description and 61 reference Markdown files. An approximate character/token ratio is not a model tokenizer measurement, and the dense-line count conceals the initial context cost. SimplySay should not inherit a no-splitting maxim or a similarly elaborate router. The guide's historical 29-reference count is not the current inventory.

## Packaging, installation, removal, and distribution

| Source files | Observed mechanism | Consequence for SimplySay |
|---|---|---|
| `plugin.json`, `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json` | Same `pixellab-pip` skill source and `3.0.0` version, copied metadata with host-specific presentation/hook fields | One maintained policy is useful; copy only schemas needed for claimed, tested hosts |
| `.claude-plugin/marketplace.json`, `.agents/plugins/marketplace.json`, `.cursor-plugin/marketplace.json`, `.github/plugin/marketplace.json` | Dedicated catalog `pixellab-pip-plugins`, one plugin `pixellab-pip`, local source `./` in host-specific formats | Dedicated catalog is real, but does not establish technical necessity or global uniqueness |
| `gemini-extension.json`, `GEMINI.md` | Gemini extension with a context filename; Markdown entry points into the shared skill | Portability can include host context wrappers; audience reach must be separately checked |
| `docs/install.md`, runtime `update.md` / `uninstall.md` | Explicit native plugin/extension commands; full-folder raw skill copying as fallback; fresh-session/reload advice; outputs/credentials retained | Document actual lifecycle and preserve later user edits; a raw skill is not equivalent to automatic style activation |
| `dev-tools/manage-codex-plugin.ps1` | Native CLI wrapper, local-versus-remote mode, temporary cachebuster manifest version restored in `finally`, removes old registration before replacement | Development helper only. Avoid a custom installer unless native controls fail a demonstrated requirement |
| `dev-tools/manage-claude-plugin.ps1`, `launch-claude-local-plugin.ps1` | Cached marketplace installation plus an in-place `--plugin-dir` development launcher | Separate convenient development loading from real packaged installation evidence |
| `dev-tools/manage-opencode-plugin.ps1` | Windows junction/symlink for development; tracked-only skill copy for production simulation; delete link without following target | Useful link safety, but folder detection treats any ordinary destination folder as a production copy, without ownership proof. Do not inherit that removal assumption |
| `hooks/claude/hooks.json`, `register.tsx`, `types.ts` | Native module registers a `panel` tool at session start; validates a snapshot, renders UI, composes drafts, optionally runs bundled Python to open HTML | Real adapter functionality, unrelated to concise chat. Do not copy UI, tools, processes, or hooks merely because this project has them |

The Codex management script comments explain the distinct marketplace name as a workaround for equal marketplace/plugin names collapsing a cached skill path. That is a maintainer claim preserved in source, **not a reproduced observation in this audit**. Equal-name behavior must be retested on targeted versions before using the claim as SimplySay's naming rationale.

Catalog name and plugin name are distinct identity fields. Public source URLs use `Shilo/pixellab-pip`; that is evidence about the reference, not confirmation of SimplySay's publishing account. The old marketplace was `pixellab-pip`; the documented pre-v1 migration requires uninstalling/re-registering as `pixellab-pip-plugins`. This is direct evidence that rename costs reach user installation commands.

Coexistence concern in the development helper: Codex `Get-InstallState` accepts a bare matching plugin name **or** the fully qualified selector, then takes the first entry. A plugin of the same name from another catalog can therefore be mistaken for the intended installation. This is a source-level risk, not reproduced host behavior. Test duplicate plugin names across distinct catalogs separately from duplicate catalog registration, and match complete identities when managing owned configuration.

### Release pipeline

The 1,259-line `.github/workflows/release-skill.yml` has a manual main-branch gate, dependency install, QA, pinned static skill scan, nine metadata version targets, deterministic raw-skill ZIP construction, digest comparison with an existing public asset, provenance attestation, VirusTotal upload/polling, a version/tag commit, ClawHub owner resolution, exact-version publication and file-hash checks, registry scans, generated-card verification, latest-tag preservation/promotion, GitHub release creation, optional withdrawal, and security-note updates.

Useful ideas are immutable source identification, deterministic package construction, digest verification, preservation of existing public assets, least-privilege job tokens, and distinguishing prepared, published, and accepted states. The archive builder recursively includes files under the skill directory, rather than an explicit per-file allowlist; a controlled clean CI checkout matters. SimplySay should use an explicit payload rule. The entire service-dependent release workflow is too costly to copy for a small communication policy. Native manifests are duplicated and both QA and release scripts independently enumerate version paths, creating multiple synchronized lists.

Specific challenge: `bumpVersion` automatically advances minor and rolls the major after minor nine; that is a project convention, not Semantic Versioning semantics. Its ordinary release commit is `Release v...`, despite root Conventional Commit guidance. SimplySay should use an intentional SemVer decision and the user's requested Conventional Commits consistently.

The release notes' “safe to install” and “tamper-proof” wording overstates what static scans and provenance can establish. The narrower evidence is scanner outcomes and a verifiable source/artifact relationship. SimplySay should report those facts without equating them to absence of malicious behavior or universal safety.

## Tests: assertions versus evidence

`dev-tools/qa.py` parses tracked JSON, checks metadata consistency, validates blueprint shape, compiles Python, checks local links and reference existence, rejects tracked caches, inspects media signatures, predicts selected scanner triggers, and discovers unit tests. Its workflow check has a large list of required literal substrings and step-order checks. These catch accidental deletion of expected text; they do not execute the release protocol or prove authentication, rollback, publication, or safety.

`tests/test_merge_packaging.py` extracts and executes the inline version-bump script in a temporary tree and confirms the adopted MIT notice reaches a ZIP. This is stronger behavior evidence than checking source strings, but this auditor has inspected rather than run it.

`hooks/claude/panel.test.tsx` uses the native testing engine with synthetic session surfaces, filesystem/process handlers, a captured anonymized builder snapshot, and assertions around draft payloads, preservation of the selected project, zero usage, unsupported surfaces, invalid paths/digests, Unicode byte limits, and one-shot fallback. It is a meaningful adapter test, not a real desktop visual check, actual PixelLab task, installed-host activation test, or absent/disabled/enabled style experiment.

CI's `qa.yml` targets Ubuntu/Python 3.14 and native Claude `2.1.303` on Node 24. Static review of that configuration establishes intended coverage only. No observed CI run is claimed here.

The benchmark documentation states that it injects `SKILL.md`, supplies a read-only reference-reading tool, scores exact routing with regexes, and makes real provider calls in non-static modes. Thus, “no PixelLab credits” does **not** mean no model usage. A prompt-injection benchmark cannot verify the original plugin's automatic loading. Its doc already identifies a background-route regex predating changed MCP coverage, demonstrating why expected answers require versioned review.

Further source inspection confirms `build_codex_command` explicitly uses `--ignore-rules` and `project_doc_max_bytes=0`; Claude uses safe mode and only Read. Those are deliberately constrained prompt experiments, not ordinary packaged-plugin user sessions. `materialize_variant` copies the current working skill recursively, while historical variants come from `git archive`; their inclusion rules differ and need scrutiny for ignored user preferences or caches. Workspaces outside the development repo avoid its parent instruction files, but `run_cli` inherits the controller process environment and does not itself create clean host homes. It therefore does not by itself establish absence of global instructions/plugins or credential separation.

Full benchmark-source review found additional limits: resume reuses successful records by scenario/agent/variant/repetition ID without checking policy digest, model/command identity or changed scenario contents. It rematerializes current sources and rewrites metadata, so resumed results can mix treatments under fresh metadata. Errors are excluded from aggregate scores, and `main` returns zero even when cells errored. Plain regex checks can reward a correct route mentioned only to reject it. Preserve raw per-cell records/checkpoints, but do not reuse this runner or headline metric unmodified.

The no-checkout Dependabot merge workflow narrows write permissions, verifies one signed bot commit, waits for named checks on the expected head, and uses a head-commit match before merging. This is a useful design for a larger dependency surface, not a prerequisite for SimplySay's small initial package. Distribution badges run separately and collect source-reported registry/download/clone totals; those figures are not unique users or behavior-quality evidence.

`LICENSE` contains both the owner's and an adopted contributor's MIT notices, and the packaging test verifies the adopted notice remains in the skill archive. Preserve any reused material's actual obligations; a common owner does not eliminate third-party attribution. No implementation code has been copied into SimplySay.

## Keep / adapt / reject

| Choice | Assessment and evidence | Strongest objection / falsifying evidence |
|---|---|---|
| Compact development root and triggered navigation | **Keep the purpose.** `AGENTS.md`, `CLAUDE.md`, `docs/developer.md` distinguish development and runtime; task references have explicit triggers | Links can be ignored; fresh-agent task tests must show the relevant prerequisite is actually found |
| One canonical instruction source | **Keep conditionally.** All major manifests point at `skills/` | A generator can outweigh two tiny copies. Select direct sharing or validated copies after host schemas are known |
| `CLAUDE.md` imports `AGENTS.md` | **Adapt after host verification.** Proven source structure, no measured current loading behavior here | Current Claude docs specify import deduplication. The real trade-off is compatibility with older/ancestor-file configurations versus retaining another entry point, not a presumed duplicate import |
| KISS | **Keep as decision aid**, not a ban on complete testing or documentation | The fewest files may make source ownership and package leakage harder to verify |
| YAGNI | **Keep for speculative runtime features** | Rare but consequential audience/artifact regressions justify tests even before a frequent failure |
| DRY and canonical placement | **Keep behavioral ownership**, challenge framework machinery | Shared rule references can fail after packaging or compaction; duplicating a tiny safety boundary may be justified by tests |
| Domain router and deep references | **Reject as SimplySay runtime architecture.** The 63 KB first-loaded contract addresses unrelated routing, auth, budgets, art | Evidence that a small chat policy actually needs workflow routing could reopen this |
| Native install controls | **Prefer.** Existing wrappers mainly drive native commands and manage caches | Add a helper only if target-host user installs are materially unreliable without it |
| Custom setup/update/uninstall conversational intents | **Reject by default.** They expand the reference runtime because it configures API access and preferences | SimplySay might need limited guidance, but native host enable/disable should be tested first |
| Scanner badges and multi-service release gates | **Do not copy wholesale.** They require credentials, uploads, CI maintenance, and do not test comprehension | A destination's mandatory checks may justify targeted tooling once scope is approved |
| Deterministic packages and independent digest verification | **Adapt.** ZIP metadata fixed; existing bytes must match rather than be clobbered | Prefer the native distribution format if a separate ZIP adds no user value |
| Hardcoded workflow-text assertions | **Reject as principal proof.** `check_workflows` mostly checks literal text | Behavioral protocol fixtures should detect failures that simple source-string presence misses |

## Proposed SimplySay development guidance (not implemented)

Recommend a short root `AGENTS.md` covering product intent, chat-only scope, preserved work/artifacts/inter-agent messages, KISS/YAGNI/DRY in concrete terms, Conventional Commits, and a task map. Before changing behavior read the contract/evaluation guide; before changing adapters read integration evidence; before releases read the approval/security/license checklist. Put full research and pending decisions in supporting docs. Keep root instructions and supporting evidence out of the install payload.

Use `CLAUDE.md` only if targeted development-host tests show a compatibility need, with a single maintained root source and no eager handbook import. Do not add nested entry points, Gemini-specific development guidance, a docs watcher, a dashboard, or runtime orchestration unless there is a demonstrated requirement.

## Independent challenge of the lead's design

The auditor read `docs/design.md` and `docs/evaluation-plan.md` after forming the reference recommendation independently, then reopened current primary host documentation. This is a separate agent's source review, not an independently executed behavior experiment.

| Proposal | Strongest credible objection or alternative | Evidence / test that resolves it | Required decision |
|---|---|---|---|
| Native output style first | A built-in Concise setting may already deliver the useful result with lower install burden. A forced style also replaces a user choice | Compare native Concise against the candidate on the same boundary tasks; test another forced style installed in both orders | Approve the experiment, not default production style replacement |
| Small scope-explicit policy | Clear scope prose can still influence artifact generation and delegated fork reports. A short policy is not a reliable audience classifier | Check loaded context and observe actual fork/ordinary-subagent messages, a machine caller, protected mixed deliverables, and work outputs before tuning prose | Establish audience feasibility before promising support; no silent boundary relaxation |
| Preserve engineering defaults | Setting `keep-coding-instructions` alone cannot recover a section absent from the host's shorter prompt | Keep prompt mode identical across A/B/C/D. Record whether the engineering section is present. Never enable the full prompt only for C | Approve a matched host configuration or qualify the route |
| Native persistent instructions as fallback | User-file editing adds ownership and removal hazards; native controls may be safer than a custom managed block | Install/remove with unrelated settings and later user edits present; observe inherited scopes | Choose a route only after reversible configuration behavior is demonstrated |
| Canonical policy + package | Byte-identical pasted policy should not be expected to produce better language merely because it is packaged | Separate linguistic comparison (vs built-in/short generic guidance) from installation/control value (vs identical policy) | Packaging needs concrete lifecycle value, not an artificial quality superiority gate |
| One adaptive default; no named standard/persona/blacklist | This is the smallest plausible starting point but still an untested hypothesis. Removing all mode controls can make temporary overrides hard to discover | Test detailed requests, confused readers and explicit temporary override using native controls first | No levels without a demonstrated benefit and explicit approval |
| Compact `AGENTS.md`; optional wrapper | A native AGENTS fallback can be suppressed by an ancestor or local CLAUDE file; deleting the wrapper may reduce reliability | Test current/older supported versions and ancestor/local entry points; inspect actual loaded memory | A one-line import is a credible minimal default for Windows development, subject to supported-version choice |
| Broad cross-host distribution | Format acceptance is much weaker than audience-safe behavior. A weaker on-demand edition could confuse the single-product promise | Test each distinct mechanism; separate installation, loading, behavior and listing status | Decide support scope explicitly; don't compensate for a failed automatic route by silently changing the product |
| Full reference reread | Reading megabytes of unrelated PixelLab art research may not change any SimplySay decision | Complete affected dependency paths and keep the exact remaining ledger; reopen a file when a new relevant dependency appears | Owner approves a bounded architectural audit or funds the remaining semantic review |
| Fixed large test matrix | Hundreds of runs before loading/audience feasibility is established can waste budget; repeated same-model judgments do not replace human review | Begin with loading/isolation and high-risk boundary canaries; estimate cost/variance, then approve the full matrix | Approve staged sessions and final claims separately |
| Public README absolute scope wording | “Changes only” can be read as a guarantee the evidence cannot establish | Separate intended contract from exact tested results and limits; keep identity/tagline | Owner approves any wording qualification required by evidence |

[Claude's current output-style documentation](https://code.claude.com/docs/en/output-styles), accessed 2026-10-28, documents built-in Concise, forced-style precedence, full-versus-shorter prompt behavior, and main/fork versus ordinary-subagent propagation. These facts support an experiment; none proves artifact or audience isolation. [Claude's memory documentation](https://code.claude.com/docs/en/memory), accessed 2026-10-28, says direct AGENTS support starts at v2.1.277 and can be suppressed by nearby CLAUDE files; an `@AGENTS.md` import is deduplicated. It recommends imports over symlinks for Windows compatibility. [The Agent Skills specification](https://agentskills.io/specification), accessed 2026-10-28, distinguishes startup metadata from activated full instructions and advises moving lengthy details into references. It does not impose the reference project's “never split” maxim.

## Independent runtime/source batch findings to date

The separate `communication_research` agent read the 35 batch-A files marked read below, without executing the reference. It examined actual runtime helpers, references and test assertions, including manifest locking/accounting, restricted download validation, protected original bytes, snapshot source/digest checks, portable HTML, optional native feedback bridge, explicit settings authority and skip reporting.

Transfer the evidence habits: distinguish identity from quality/permission, bind reviews to actual artifacts, preserve originals and unrelated settings, and report skipped checks or uncertain accounting honestly. Do not transfer PixelLab billing, sound playback, panel UI, shared Auto/Bark preferences, fixed usage-report templates, credential setup or mandatory language transformations into a chat policy. Some tests check avoidance of scanner-trigger phrases rather than actual security behavior. Every adopted host command still needs current verification. These findings are source inspection, not test outcomes.

## Coverage ledger and continuation batches

The following table records exact tracked paths, sizes, and audit state. “Read” means the file contents were examined; “partial” means inspected excerpts or a source outline only; “pending” is not a completed semantic review. Binaries are inventoried and excluded from semantic source review. The ignored directories enumerated above are intentionally excluded.

Continuation assignments are defined by table batch labels:

- **A:** maintained runtime references, blueprints, assets and corresponding tests; no execution. Review complete text in bounded batches; trace references/helpers/test assertions. Exclude the WAV binary only. Root `SKILL.md` is already read.
- **B:** maintained documentation and research text, including JSON showcase recipes; image/GIF binaries excluded. Most unrelated domain research is deferred pending an owner scope decision. Current source/instruction/developer/install/publishing/security paths relevant to the architectural findings were read. Pending does not mean reviewed or excluded by approval.
- **C:** dev tools, CI and miscellaneous root files. Full text review complete, no execution. The accountable auditor integrates independent findings.

Current ledger totals: 86 files read, 280 pending (126 runtime/source files, 154 documentation/research files), 55 inventoried binaries excluded. The pending text totals 3,979,263 bytes. Empty `editions/` and `types/` directories have no maintained files in the observed tree. These counts are coverage, not a quality or safety score.

No claim of a comprehensive maintained-text audit is authorized until all pending/partial entries have been resolved or an explicit owner-approved scope exception is recorded.

<!-- COVERAGE_TABLE -->
| Reference-relative path | Bytes | Batch | State |
|---|---:|:---:|---|
| `.agents/plugins/marketplace.json` | 1145 | C | read |
| `.claude-plugin/marketplace.json` | 1487 | C | read |
| `.claude-plugin/plugin.json` | 899 | C | read |
| `.codex-plugin/plugin.json` | 1462 | C | read |
| `.cursor-plugin/marketplace.json` | 1004 | C | read |
| `.cursor-plugin/plugin.json` | 1070 | C | read |
| `.github/dependabot.yml` | 406 | C | read |
| `.github/plugin/marketplace.json` | 1004 | C | read |
| `.github/workflows/dependabot-merge.yml` | 5829 | C | read |
| `.github/workflows/distribution-badges.yml` | 7449 | C | read |
| `.github/workflows/hol-plugin-scanner.yml` | 780 | C | read |
| `.github/workflows/qa.yml` | 1160 | C | read |
| `.github/workflows/release-skill.yml` | 64692 | C | read |
| `.github/workflows/scorecard.yml` | 1130 | C | read |
| `.github/workflows/security-scan.yml` | 1945 | C | read |
| `.gitignore` | 187 | C | read |
| `AGENTS.md` | 4069 | C | read |
| `CHANGELOG.md` | 8969 | C | read |
| `CLAUDE.md` | 11 | C | read |
| `GEMINI.md` | 686 | C | read |
| `LICENSE` | 1149 | C | read |
| `README.md` | 21969 | C | read |
| `SECURITY.md` | 2624 | C | read |
| `dev-tools/launch-claude-local-plugin.ps1` | 1804 | C | read |
| `dev-tools/lib/common.ps1` | 3429 | C | read |
| `dev-tools/manage-claude-plugin.ps1` | 15694 | C | read |
| `dev-tools/manage-codex-plugin.ps1` | 16600 | C | read |
| `dev-tools/manage-opencode-plugin.ps1` | 13156 | C | read |
| `dev-tools/manage-pixellab-doc-cache.ps1` | 12566 | C | read |
| `dev-tools/pixellab-doc-watch.py` | 28868 | C | read |
| `dev-tools/pixellab_mcp_tileset_sim.md` | 15658 | C | read |
| `dev-tools/pixellab_mcp_tileset_sim.py` | 70010 | C | read |
| `dev-tools/qa.py` | 42987 | C | read |
| `dev-tools/run-skill-benchmark.ps1` | 4340 | C | read |
| `dev-tools/skill_benchmark.py` | 48502 | C | read |
| `dev-tools/update-pixellab-docs.md` | 15279 | C | read |
| `docs/README.md` | 20487 | B | pending |
| `docs/bark-sound-design-spike.md` | 46466 | B | pending |
| `docs/blueprint.md` | 20388 | B | pending |
| `docs/brand/pixellab-pip-logo-256.png` | 8847 | B | excluded binary |
| `docs/brand/pixellab-pip-logo.png` | 17264 | B | excluded binary |
| `docs/developer.md` | 29991 | B | read |
| `docs/developer/adoption-metrics.md` | 26040 | B | pending |
| `docs/developer/async-helper-plan.md` | 13088 | B | pending |
| `docs/developer/publishing.md` | 7709 | B | read |
| `docs/developer/reference-files.md` | 11593 | B | read |
| `docs/developer/skill-file-sizing.md` | 8734 | B | read |
| `docs/developer/todo.md` | 14341 | B | pending |
| `docs/install.md` | 17948 | B | read |
| `docs/merge/README.md` | 3196 | B | pending |
| `docs/merge/benchmark-claude.md` | 2069 | B | pending |
| `docs/merge/demo/README.md` | 13068 | B | pending |
| `docs/merge/migration.md` | 4812 | B | pending |
| `docs/minimal-pixellab-router.md` | 3365 | B | pending |
| `docs/pip-mascot.md` | 3529 | B | pending |
| `docs/pixellab-cinematic-testing.md` | 68232 | B | pending |
| `docs/pixellab-image-model-benchmark-results.md` | 17961 | B | pending |
| `docs/pixellab-image-model-style-fingerprint.md` | 4681 | B | pending |
| `docs/pixellab-pip-benchmark.md` | 21905 | B | pending |
| `docs/pixellab-preview-app-research-spike.md` | 25770 | B | pending |
| `docs/pixellab/key-pose-animation-evidence.md` | 7602 | B | pending |
| `docs/pixellab/pixel-art-gif-friendly-disappearance.md` | 8096 | B | pending |
| `docs/pixellab/pixellab-16px-character-generation-spike.md` | 15411 | B | pending |
| `docs/pixellab/pixellab-16px-item-sprite-generation-spike.md` | 55348 | B | pending |
| `docs/pixellab/pixellab-16x9-indoor-duplication-research-spike.md` | 79011 | B | pending |
| `docs/pixellab/pixellab-1bit-tileset-optimization-workflow.md` | 22384 | B | pending |
| `docs/pixellab/pixellab-1bit-tileset-prompt-testing.md` | 27516 | B | pending |
| `docs/pixellab/pixellab-32px-vfx-atlas-density-spike.md` | 17678 | B | pending |
| `docs/pixellab/pixellab-360-rotation-spike.md` | 84192 | B | pending |
| `docs/pixellab/pixellab-ai-image-downscale-grid-recovery-spike.md` | 7852 | B | pending |
| `docs/pixellab/pixellab-animation-prompting-reference-review.md` | 12212 | B | pending |
| `docs/pixellab/pixellab-api-pricing-model-list.md` | 27333 | B | pending |
| `docs/pixellab/pixellab-armless-character-prompt-research-spike.md` | 26815 | B | pending |
| `docs/pixellab/pixellab-asset-routing.md` | 25334 | B | pending |
| `docs/pixellab/pixellab-auth-and-security.md` | 2471 | B | pending |
| `docs/pixellab/pixellab-background-wallpaper-model-research-spike.md` | 13069 | B | pending |
| `docs/pixellab/pixellab-changelog-2026-07-01.md` | 4289 | B | pending |
| `docs/pixellab/pixellab-character-aura-prompt-research-spike.md` | 205061 | B | pending |
| `docs/pixellab/pixellab-chibi-base-character-findings.md` | 54623 | B | pending |
| `docs/pixellab/pixellab-cinematic-inspiration.md` | 5803 | B | pending |
| `docs/pixellab/pixellab-cinematic-spike.md` | 13252 | B | pending |
| `docs/pixellab/pixellab-credit-output-estimation-spike.md` | 42634 | B | pending |
| `docs/pixellab/pixellab-doc-watch-cache.md` | 13888 | B | pending |
| `docs/pixellab/pixellab-dualgrid-tileset-export-system.md` | 15232 | B | pending |
| `docs/pixellab/pixellab-font-generation-spike.md` | 4519 | B | pending |
| `docs/pixellab/pixellab-hd-region-edit-animate-spike.md` | 8953 | B | pending |
| `docs/pixellab/pixellab-idle-animation-artifact-research.md` | 25958 | B | pending |
| `docs/pixellab/pixellab-image-size-limits.md` | 52929 | B | pending |
| `docs/pixellab/pixellab-image-to-text-research-spike.md` | 14743 | B | pending |
| `docs/pixellab/pixellab-inline-negative-prompting-best-practices.md` | 13469 | B | pending |
| `docs/pixellab/pixellab-inline-negative-prompting-current-model-results.md` | 19918 | B | pending |
| `docs/pixellab/pixellab-inline-negative-prompting-new-tool-results.md` | 13823 | B | pending |
| `docs/pixellab/pixellab-mcp-new-tools-test-results.md` | 18948 | B | pending |
| `docs/pixellab/pixellab-mcp-vs-rest-route-parity.md` | 86753 | B | pending |
| `docs/pixellab/pixellab-negative-prompting-calibration-results.md` | 9819 | B | pending |
| `docs/pixellab/pixellab-negative-prompting-confirmation-results.md` | 17258 | B | pending |
| `docs/pixellab/pixellab-negative-prompting-phase0b-results.md` | 6904 | B | pending |
| `docs/pixellab/pixellab-negative-prompting-research-spike.md` | 35270 | B | pending |
| `docs/pixellab/pixellab-oversized-background-animation-spike.md` | 18127 | B | pending |
| `docs/pixellab/pixellab-paperdolling-research-spike.md` | 56871 | B | pending |
| `docs/pixellab/pixellab-paperdolling-system-plan.md` | 29743 | B | pending |
| `docs/pixellab/pixellab-pip-3.0-live-test-research-spike.md` | 34068 | B | pending |
| `docs/pixellab/pixellab-pixelart-workbench-research-spike.md` | 42119 | B | pending |
| `docs/pixellab/pixellab-pixen-character-prompt-research-spike.md` | 24880 | B | pending |
| `docs/pixellab/pixellab-pixen-portrait-prompt-research-spike.md` | 11135 | B | pending |
| `docs/pixellab/pixellab-pixminimax-vs-v3-animation-spike.md` | 35409 | B | pending |
| `docs/pixellab/pixellab-pixminimax-website-pricing-observation-2026-09-12.md` | 878 | B | pending |
| `docs/pixellab/pixellab-sdk-compatibility.md` | 2422 | B | pending |
| `docs/pixellab/pixellab-skeleton-template-animation-research.md` | 53799 | B | pending |
| `docs/pixellab/pixellab-skeleton-v3-research-spike.md` | 50599 | B | pending |
| `docs/pixellab/pixellab-skill-icon-generation-spike.md` | 32840 | B | pending |
| `docs/pixellab/pixellab-surfaces-and-services.md` | 9638 | B | pending |
| `docs/pixellab/pixellab-terminology.md` | 5787 | B | pending |
| `docs/pixellab/pixellab-tibia-high-oblique-perspective-mvp-research-spike.md` | 15692 | B | pending |
| `docs/pixellab/pixellab-top-down-house-generation-routing-spike.md` | 21206 | B | pending |
| `docs/pixellab/pixellab-topdown-tileset-transition-findings.md` | 14086 | B | pending |
| `docs/pixellab/pixellab-ui-generation-surfaces-research.md` | 14651 | B | pending |
| `docs/pixellab/pixellab-user-facing-term-backend-mapping.md` | 70078 | B | pending |
| `docs/pixellab/pixellab-vfx-workbench-research.md` | 8827 | B | pending |
| `docs/pixellab/rpg-maker-character-sheet-formats.md` | 17248 | B | pending |
| `docs/pixellab/weapon-page-sources.md` | 4431 | B | pending |
| `docs/plans/pixellab-inline-negative-prompting-current-model-test-plan.md` | 14321 | B | pending |
| `docs/plans/pixellab-mcp-new-tools-test-plan.md` | 26561 | B | pending |
| `docs/plans/pixellab-negative-prompting-controlled-test-plan.md` | 34216 | B | pending |
| `docs/plans/pixellab-pip-value-review-plan.md` | 12116 | B | pending |
| `docs/plans/pixellab-pixminimax-vs-v3-animation-test-plan.md` | 15396 | B | pending |
| `docs/plans/pixellab-preview-app-plan.md` | 13753 | B | pending |
| `docs/plans/pixellab-top-down-south-facing-building-prompt-plan.md` | 16926 | B | pending |
| `docs/resources.md` | 3192 | B | pending |
| `docs/security.md` | 6826 | B | read |
| `docs/showcase/LICENSE.md` | 1604 | B | pending |
| `docs/showcase/README.md` | 8498 | B | pending |
| `docs/showcase/cinematic.md` | 19455 | B | pending |
| `docs/showcase/cinematic/hoverboard-dusk-cinematic.blueprint.json` | 16753 | B | pending |
| `docs/showcase/cinematic/hoverboard-dusk-cinematic.gif` | 1277199 | B | excluded binary |
| `docs/showcase/gameplay-gui.md` | 31511 | B | pending |
| `docs/showcase/gameplay-gui/gameplay-gui-component-specific-688x384.blueprint.json` | 1173 | B | pending |
| `docs/showcase/gameplay-gui/gameplay-gui-component-specific-688x384.png` | 169102 | B | excluded binary |
| `docs/showcase/gameplay-gui/gameplay-gui-fantasy-mmo-688x384.blueprint.json` | 1621 | B | pending |
| `docs/showcase/gameplay-gui/gameplay-gui-fantasy-mmo-688x384.png` | 228787 | B | excluded binary |
| `docs/showcase/gameplay-gui/gameplay-gui-mood-only-344x192.blueprint.json` | 909 | B | pending |
| `docs/showcase/gameplay-gui/gameplay-gui-mood-only-344x192.png` | 23951 | B | excluded binary |
| `docs/showcase/gameplay-gui/modular-mmorpg-gui-compass-688x384.blueprint.json` | 6037 | B | pending |
| `docs/showcase/gameplay-gui/modular-mmorpg-gui-compass-688x384.png` | 64619 | B | excluded binary |
| `docs/showcase/gameplay-gui/modular-mmorpg-gui-textless-688x384.blueprint.json` | 6474 | B | pending |
| `docs/showcase/gameplay-gui/modular-mmorpg-gui-textless-688x384.png` | 104442 | B | excluded binary |
| `docs/showcase/gui-icons.md` | 15390 | B | pending |
| `docs/showcase/gui-icons/animal-face-emoji-5x5-16px.blueprint.json` | 18864 | B | pending |
| `docs/showcase/gui-icons/animal-face-emoji-5x5-16px.png` | 2986 | B | excluded binary |
| `docs/showcase/item-icons.md` | 41019 | B | pending |
| `docs/showcase/item-icons/candy-sweets-treats-8x8-32px.blueprint.json` | 1855 | B | pending |
| `docs/showcase/item-icons/candy-sweets-treats-8x8-32px.png` | 41307 | B | excluded binary |
| `docs/showcase/item-icons/candy-sweets-treats-glossy-8x8-32px.blueprint.json` | 1556 | B | pending |
| `docs/showcase/item-icons/candy-sweets-treats-glossy-8x8-32px.png` | 36021 | B | excluded binary |
| `docs/showcase/item-icons/fantasy-rpg-armor-8x8-32px.blueprint.json` | 1677 | B | pending |
| `docs/showcase/item-icons/fantasy-rpg-armor-8x8-32px.png` | 42474 | B | excluded binary |
| `docs/showcase/item-icons/fantasy-rpg-consumables-8x8-32px.blueprint.json` | 1897 | B | pending |
| `docs/showcase/item-icons/fantasy-rpg-consumables-8x8-32px.png` | 34410 | B | excluded binary |
| `docs/showcase/item-icons/fantasy-rpg-inventory-64px-4x4.blueprint.json` | 1566 | B | pending |
| `docs/showcase/item-icons/fantasy-rpg-inventory-64px-4x4.png` | 26361 | B | excluded binary |
| `docs/showcase/item-icons/fantasy-rpg-inventory-64px-8x8.blueprint.json` | 1335 | B | pending |
| `docs/showcase/item-icons/fantasy-rpg-inventory-64px-8x8.png` | 102833 | B | excluded binary |
| `docs/showcase/item-icons/fantasy-rpg-inventory-bgremoved-8x8-32px.blueprint.json` | 1743 | B | pending |
| `docs/showcase/item-icons/fantasy-rpg-inventory-bgremoved-8x8-32px.png` | 37927 | B | excluded binary |
| `docs/showcase/item-icons/fantasy-rpg-items-8x8-32px.blueprint.json` | 1641 | B | pending |
| `docs/showcase/item-icons/fantasy-rpg-items-8x8-32px.png` | 36137 | B | excluded binary |
| `docs/showcase/item-icons/fantasy-rpg-materials-8x8-32px.blueprint.json` | 1637 | B | pending |
| `docs/showcase/item-icons/fantasy-rpg-materials-8x8-32px.png` | 38323 | B | excluded binary |
| `docs/showcase/item-icons/fantasy-rpg-weapons-8x8-32px.blueprint.json` | 1552 | B | pending |
| `docs/showcase/item-icons/fantasy-rpg-weapons-8x8-32px.png` | 27547 | B | excluded binary |
| `docs/showcase/pip-mascot.md` | 6835 | B | pending |
| `docs/showcase/pip/pip.blueprint.json` | 2750 | B | pending |
| `docs/showcase/pip/pip.gif` | 9162 | B | excluded binary |
| `docs/showcase/pip/pip.png` | 1250 | B | excluded binary |
| `docs/showcase/rpg-maker-characters.md` | 18642 | B | pending |
| `docs/showcase/rpg-maker-characters/rpg-maker-mv-character.blueprint.json` | 16210 | B | pending |
| `docs/showcase/rpg-maker-characters/rpg-maker-mv-character.gif` | 10952 | B | excluded binary |
| `docs/showcase/rpg-maker-characters/rpg-maker-mv-character.png` | 13325 | B | excluded binary |
| `docs/showcase/rpg-maker-characters/rpg-maker-mz-character.blueprint.json` | 16210 | B | pending |
| `docs/showcase/rpg-maker-characters/rpg-maker-mz-character.gif` | 12416 | B | excluded binary |
| `docs/showcase/rpg-maker-characters/rpg-maker-mz-character.png` | 16376 | B | excluded binary |
| `docs/showcase/rpg-maker-characters/rpg-maker-vx-ace-character.blueprint.json` | 16232 | B | pending |
| `docs/showcase/rpg-maker-characters/rpg-maker-vx-ace-character.gif` | 6921 | B | excluded binary |
| `docs/showcase/rpg-maker-characters/rpg-maker-vx-ace-character.png` | 6270 | B | excluded binary |
| `docs/showcase/skill-icons.md` | 29018 | B | pending |
| `docs/showcase/skill-icons/create-image-pro-borderless-mosaic-8x8-32px.blueprint.json` | 2264 | B | pending |
| `docs/showcase/skill-icons/create-image-pro-borderless-mosaic-8x8-32px.png` | 42181 | B | excluded binary |
| `docs/showcase/skill-icons/create-image-pro-fire-magic-sheet-8x8-32px.blueprint.json` | 2469 | B | pending |
| `docs/showcase/skill-icons/create-image-pro-fire-magic-sheet-8x8-32px.png` | 73797 | B | excluded binary |
| `docs/showcase/skill-icons/create-image-pro-original-strict-grid-8x8-32px.blueprint.json` | 1980 | B | pending |
| `docs/showcase/skill-icons/create-image-pro-original-strict-grid-8x8-32px.png` | 56161 | B | excluded binary |
| `docs/showcase/skill-icons/create-image-pro-rich-background-8x8-32px.blueprint.json` | 2344 | B | pending |
| `docs/showcase/skill-icons/create-image-pro-rich-background-8x8-32px.png` | 58008 | B | excluded binary |
| `docs/showcase/skill-icons/fantasy-rpg-skill-64px-4x4.blueprint.json` | 1509 | B | pending |
| `docs/showcase/skill-icons/fantasy-rpg-skill-64px-4x4.png` | 59837 | B | excluded binary |
| `docs/showcase/skill-icons/fantasy-rpg-skill-64px-8x8-curated.blueprint.json` | 1651 | B | pending |
| `docs/showcase/skill-icons/fantasy-rpg-skill-64px-8x8-curated.png` | 175892 | B | excluded binary |
| `docs/showcase/tiles.md` | 18949 | B | pending |
| `docs/showcase/tiles/minecraft-block-face-64px-4x4.blueprint.json` | 1496 | B | pending |
| `docs/showcase/tiles/minecraft-block-face-64px-4x4.png` | 32934 | B | excluded binary |
| `docs/showcase/tiles/minecraft-block-face-64px-8x8-atlas.blueprint.json` | 1657 | B | pending |
| `docs/showcase/tiles/minecraft-block-face-64px-8x8-atlas.png` | 100108 | B | excluded binary |
| `docs/showcase/tiles/minecraft-inspired-generate-image-v2-16x16-atlas.blueprint.json` | 1473 | B | pending |
| `docs/showcase/tiles/minecraft-inspired-generate-image-v2-16x16-atlas.png` | 44130 | B | excluded binary |
| `docs/showcase/tiles/minecraft-mod-generate-image-v2-8x8-32px-sheet.blueprint.json` | 1093 | B | pending |
| `docs/showcase/tiles/minecraft-mod-generate-image-v2-8x8-32px-sheet.png` | 39241 | B | excluded binary |
| `docs/showcase/tilesets.md` | 17169 | B | pending |
| `docs/showcase/tilesets/one-bit-black-green-topdown-tileset.blueprint.json` | 1763 | B | pending |
| `docs/showcase/tilesets/one-bit-black-green-topdown-tileset.png` | 976 | B | excluded binary |
| `docs/showcase/tilesets/one-bit-sidescroller-icy-cap-bw-gameboy.blueprint.json` | 2019 | B | pending |
| `docs/showcase/tilesets/one-bit-sidescroller-icy-cap-bw-gameboy.png` | 2334 | B | excluded binary |
| `docs/showcase/tilesets/sidescroller-dirt-grass-medium-single-color-outline.blueprint.json` | 414 | B | pending |
| `docs/showcase/tilesets/sidescroller-dirt-grass-medium-single-color-outline.png` | 4125 | B | excluded binary |
| `docs/showcase/tilesets/tileset-showcase-16px-sidescroller-atlas.png` | 8678 | B | excluded binary |
| `docs/showcase/tilesets/tileset-showcase-16px-topdown-atlas.png` | 12721 | B | excluded binary |
| `docs/showcase/tilesets/tileset-showcase-32px-sidescroller-atlas.png` | 6408 | B | excluded binary |
| `docs/showcase/tilesets/topdown-dirt-grass-low-single-color-outline.blueprint.json` | 600 | B | pending |
| `docs/showcase/tilesets/topdown-dirt-grass-low-single-color-outline.png` | 3808 | B | excluded binary |
| `docs/showcase/visual-effects.md` | 26951 | B | pending |
| `docs/showcase/visual-effects/fantasy-aura-effects.blueprint.json` | 25163 | B | pending |
| `docs/showcase/visual-effects/fantasy-aura-effects.gif` | 193563 | B | excluded binary |
| `docs/showcase/visual-effects/fantasy-aura-effects.png` | 46280 | B | excluded binary |
| `docs/showcase/visual-effects/fire-explosion.blueprint.json` | 2417 | B | pending |
| `docs/showcase/visual-effects/fire-explosion.gif` | 187683 | B | excluded binary |
| `docs/showcase/visual-effects/fire-explosion.png` | 50350 | B | excluded binary |
| `docs/showcase/visual-effects/spark-explosion.blueprint.json` | 2388 | B | pending |
| `docs/showcase/visual-effects/spark-explosion.gif` | 127463 | B | excluded binary |
| `docs/showcase/visual-effects/spark-explosion.png` | 14570 | B | excluded binary |
| `docs/showcase/visual-effects/toxic-explosion.blueprint.json` | 2390 | B | pending |
| `docs/showcase/visual-effects/toxic-explosion.gif` | 253544 | B | excluded binary |
| `docs/showcase/visual-effects/toxic-explosion.png` | 51678 | B | excluded binary |
| `docs/showcase/visual-effects/void-implosion.blueprint.json` | 2399 | B | pending |
| `docs/showcase/visual-effects/void-implosion.gif` | 154496 | B | excluded binary |
| `docs/showcase/visual-effects/void-implosion.png` | 61728 | B | excluded binary |
| `docs/tools/aseprite-cli-integration-testing.md` | 4144 | B | pending |
| `docs/tools/aseprite-extension-coverage-audit.md` | 20478 | B | pending |
| `docs/tools/official-pixellab-mcp-service-comparison.md` | 12999 | B | pending |
| `docs/tools/pixelkiln-vs-pip.md` | 12386 | B | pending |
| `docs/tools/pixellab-ai-skill-vs-pip-skill.md` | 30524 | B | pending |
| `docs/tools/pixellab-cli-vs-pip-skill.md` | 16870 | B | pending |
| `docs/tools/pixellab-game-art-skill/pixellab-game-art-claude-review-response.md` | 20986 | B | pending |
| `docs/tools/pixellab-game-art-skill/pixellab-game-art-panel-auto-reconsideration.md` | 19112 | B | pending |
| `docs/tools/pixellab-game-art-skill/pixellab-game-art-pip-merge-position-by-lexingel.md` | 7137 | B | pending |
| `docs/tools/pixellab-game-art-skill/pixellab-game-art-pip-merge-research-spike.md` | 54377 | B | pending |
| `docs/tools/pixellab-game-art-skill/pixellab-game-art-pr-11-implementation-plan.md` | 34951 | B | pending |
| `docs/tools/pixellab-game-art-skill/pixellab-game-art-pr-11-merge-status.md` | 9556 | B | pending |
| `docs/tools/pixellab-game-art-skill/pixellab-game-art-pr-11-review.md` | 55459 | B | pending |
| `docs/tools/pixellab-game-art-skill/pixellab-game-art-vs-pip-skill.md` | 53301 | B | pending |
| `docs/tools/pixellab-mcp-docs-vs-pip-skill.md` | 9629 | B | pending |
| `docs/usage.md` | 6865 | B | pending |
| `gemini-extension.json` | 251 | C | read |
| `hooks/claude/hooks.json` | 39 | C | read |
| `hooks/claude/panel.test.tsx` | 23842 | C | read |
| `hooks/claude/register.tsx` | 14739 | C | read |
| `hooks/claude/types.ts` | 585 | C | read |
| `plugin.json` | 1036 | C | read |
| `requirements-dev.txt` | 18383 | C | read |
| `skills/pixellab-pip/SKILL.md` | 63208 | A | read |
| `skills/pixellab-pip/THIRD_PARTY_NOTICES.md` | 1159 | A | read |
| `skills/pixellab-pip/assets/_assembly.py` | 3399 | A | read |
| `skills/pixellab-pip/assets/_gif.py` | 3885 | A | read |
| `skills/pixellab-pip/assets/analyze_style.py` | 12550 | A | pending |
| `skills/pixellab-pip/assets/background_removal.py` | 15490 | A | pending |
| `skills/pixellab-pip/assets/bark.py` | 10312 | A | read |
| `skills/pixellab-pip/assets/bark.wav` | 32678 | A | excluded binary |
| `skills/pixellab-pip/assets/contact_sheet.py` | 2770 | A | read |
| `skills/pixellab-pip/assets/fetch.py` | 9899 | A | read |
| `skills/pixellab-pip/assets/finish/_derive.py` | 3491 | A | pending |
| `skills/pixellab-pip/assets/finish/apply_palette.py` | 2770 | A | pending |
| `skills/pixellab-pip/assets/finish/bake_fx.py` | 3861 | A | pending |
| `skills/pixellab-pip/assets/finish/blade_trail.py` | 5566 | A | pending |
| `skills/pixellab-pip/assets/finish/colormatch.py` | 1674 | A | pending |
| `skills/pixellab-pip/assets/finish/despeckle.py` | 3256 | A | pending |
| `skills/pixellab-pip/assets/finish/dir8_finish.py` | 5595 | A | pending |
| `skills/pixellab-pip/assets/finish/find_muzzle.py` | 3869 | A | pending |
| `skills/pixellab-pip/assets/finish/ground_snap.py` | 3082 | A | pending |
| `skills/pixellab-pip/assets/finish/recolor_groups.py` | 6123 | A | pending |
| `skills/pixellab-pip/assets/finish/recolor_like.py` | 6007 | A | pending |
| `skills/pixellab-pip/assets/finish/recolor_trail.py` | 7767 | A | pending |
| `skills/pixellab-pip/assets/finish/scrub.py` | 4847 | A | pending |
| `skills/pixellab-pip/assets/finish/slash_layer.py` | 3983 | A | pending |
| `skills/pixellab-pip/assets/finish/throw_prop.py` | 2990 | A | pending |
| `skills/pixellab-pip/assets/fix.py` | 12841 | A | pending |
| `skills/pixellab-pip/assets/fixlib/__init__.py` | 0 | A | pending |
| `skills/pixellab-pip/assets/fixlib/colour.py` | 1746 | A | pending |
| `skills/pixellab-pip/assets/fixlib/frames.py` | 10043 | A | pending |
| `skills/pixellab-pip/assets/fixlib/measure.py` | 27535 | A | pending |
| `skills/pixellab-pip/assets/fixlib/model.py` | 2153 | A | pending |
| `skills/pixellab-pip/assets/fixlib/plan.py` | 9397 | A | pending |
| `skills/pixellab-pip/assets/fixlib/repair.py` | 10549 | A | pending |
| `skills/pixellab-pip/assets/fixlib/report.py` | 9072 | A | pending |
| `skills/pixellab-pip/assets/fixlib/thresholds.py` | 3754 | A | pending |
| `skills/pixellab-pip/assets/fixlib/timing.py` | 2780 | A | pending |
| `skills/pixellab-pip/assets/history.py` | 6216 | A | read |
| `skills/pixellab-pip/assets/inspect_images.py` | 3734 | A | pending |
| `skills/pixellab-pip/assets/make_sheet.py` | 4610 | A | pending |
| `skills/pixellab-pip/assets/manifest.py` | 12664 | A | read |
| `skills/pixellab-pip/assets/normal_map.py` | 5157 | A | read |
| `skills/pixellab-pip/assets/pad_sprite.py` | 1253 | A | read |
| `skills/pixellab-pip/assets/panel.html` | 10645 | A | read |
| `skills/pixellab-pip/assets/panel.py` | 22026 | A | read |
| `skills/pixellab-pip/assets/preview_gif.py` | 1849 | A | read |
| `skills/pixellab-pip/assets/project_style.py` | 16817 | A | pending |
| `skills/pixellab-pip/assets/showcase_gif.py` | 4933 | A | pending |
| `skills/pixellab-pip/assets/tileset_preview.py` | 4761 | A | pending |
| `skills/pixellab-pip/blueprints/aura.blueprint.json` | 7021 | A | pending |
| `skills/pixellab-pip/blueprints/background-aura.blueprint.json` | 1691 | A | pending |
| `skills/pixellab-pip/blueprints/character-candidates.blueprint.json` | 4671 | A | pending |
| `skills/pixellab-pip/blueprints/ground-aura.blueprint.json` | 1641 | A | pending |
| `skills/pixellab-pip/blueprints/knight.blueprint.json` | 3068 | A | pending |
| `skills/pixellab-pip/blueprints/overhead-axe-chop.blueprint.json` | 7810 | A | pending |
| `skills/pixellab-pip/blueprints/overlay-aura.blueprint.json` | 1683 | A | pending |
| `skills/pixellab-pip/blueprints/paired-sprites.blueprint.json` | 2543 | A | pending |
| `skills/pixellab-pip/blueprints/portable-sprite.blueprint.json` | 1826 | A | pending |
| `skills/pixellab-pip/blueprints/portrait-head-shoulders-mvp.blueprint.json` | 2860 | A | pending |
| `skills/pixellab-pip/blueprints/projectile-skill.blueprint.json` | 10579 | A | pending |
| `skills/pixellab-pip/blueprints/rpg-maker-character.blueprint.json` | 22401 | A | pending |
| `skills/pixellab-pip/blueprints/status-effect.blueprint.json` | 1702 | A | pending |
| `skills/pixellab-pip/blueprints/turntable-rotate-16.blueprint.json` | 4276 | A | pending |
| `skills/pixellab-pip/blueprints/vfx-eruption-per-target.blueprint.json` | 6813 | A | pending |
| `skills/pixellab-pip/blueprints/vfx-strike-single-target.blueprint.json` | 5783 | A | pending |
| `skills/pixellab-pip/blueprints/vfx-wave-across-party.blueprint.json` | 8165 | A | pending |
| `skills/pixellab-pip/blueprints/wall-aura.blueprint.json` | 1681 | A | pending |
| `skills/pixellab-pip/references/animation-doctor.md` | 7279 | A | pending |
| `skills/pixellab-pip/references/animation.md` | 20526 | A | pending |
| `skills/pixellab-pip/references/armor-clothing.md` | 15081 | A | pending |
| `skills/pixellab-pip/references/aseprite-cli.md` | 28171 | A | pending |
| `skills/pixellab-pip/references/aseprite-mcp.md` | 1884 | A | read |
| `skills/pixellab-pip/references/auto.md` | 15160 | A | read |
| `skills/pixellab-pip/references/background-removal.md` | 4378 | A | read |
| `skills/pixellab-pip/references/bark.md` | 4467 | A | read |
| `skills/pixellab-pip/references/blueprint.md` | 20933 | A | pending |
| `skills/pixellab-pip/references/characters.md` | 6894 | A | pending |
| `skills/pixellab-pip/references/cinematic.md` | 21458 | A | pending |
| `skills/pixellab-pip/references/cost-routing.md` | 13511 | A | pending |
| `skills/pixellab-pip/references/create-image-pro.md` | 12137 | A | pending |
| `skills/pixellab-pip/references/credentials.md` | 6643 | A | read |
| `skills/pixellab-pip/references/editor-only-utilities.md` | 1409 | A | read |
| `skills/pixellab-pip/references/eight-direction.md` | 5130 | A | pending |
| `skills/pixellab-pip/references/finishing.md` | 9629 | A | pending |
| `skills/pixellab-pip/references/icon.md` | 12358 | A | pending |
| `skills/pixellab-pip/references/image-input-roles.md` | 16176 | A | pending |
| `skills/pixellab-pip/references/job-lifecycle.md` | 10688 | A | read |
| `skills/pixellab-pip/references/key-pose-animation.md` | 12833 | A | pending |
| `skills/pixellab-pip/references/local-asset-assembly.md` | 10647 | A | pending |
| `skills/pixellab-pip/references/localization.md` | 3555 | A | read |
| `skills/pixellab-pip/references/martial-arts.md` | 12905 | A | pending |
| `skills/pixellab-pip/references/mcp-platform-tools.md` | 5628 | A | pending |
| `skills/pixellab-pip/references/normal-maps.md` | 3400 | A | pending |
| `skills/pixellab-pip/references/official-pixellab-documentation.md` | 10597 | A | pending |
| `skills/pixellab-pip/references/panel.md` | 7255 | A | read |
| `skills/pixellab-pip/references/paperdolling.md` | 11712 | A | pending |
| `skills/pixellab-pip/references/pixelart-workbench.md` | 2518 | A | read |
| `skills/pixellab-pip/references/pixen-character-prompt.md` | 833 | A | read |
| `skills/pixellab-pip/references/preset-skeleton-template-animation.md` | 29623 | A | pending |
| `skills/pixellab-pip/references/pro-flash.md` | 5618 | A | pending |
| `skills/pixellab-pip/references/project-style.md` | 5866 | A | read |
| `skills/pixellab-pip/references/prompt-limits.md` | 3751 | A | pending |
| `skills/pixellab-pip/references/reviewable-candidates.md` | 3472 | A | pending |
| `skills/pixellab-pip/references/scenes-and-backgrounds.md` | 4606 | A | pending |
| `skills/pixellab-pip/references/setup.md` | 20130 | A | read |
| `skills/pixellab-pip/references/style-examples.md` | 4694 | A | pending |
| `skills/pixellab-pip/references/style-reference.md` | 7358 | A | pending |
| `skills/pixellab-pip/references/tileset.md` | 20413 | A | pending |
| `skills/pixellab-pip/references/uninstall.md` | 6174 | A | read |
| `skills/pixellab-pip/references/update.md` | 4390 | A | read |
| `skills/pixellab-pip/references/usage-reporting.md` | 10262 | A | read |
| `skills/pixellab-pip/references/vfx-workbench.md` | 7704 | A | pending |
| `skills/pixellab-pip/references/vocal-animation.md` | 3469 | A | pending |
| `skills/pixellab-pip/references/weapon-anime.md` | 11780 | A | pending |
| `skills/pixellab-pip/references/weapon-axe.md` | 11592 | A | pending |
| `skills/pixellab-pip/references/weapon-bow.md` | 10906 | A | pending |
| `skills/pixellab-pip/references/weapon-dagger.md` | 8393 | A | pending |
| `skills/pixellab-pip/references/weapon-effects.md` | 17614 | A | pending |
| `skills/pixellab-pip/references/weapon-firearms.md` | 14289 | A | pending |
| `skills/pixellab-pip/references/weapon-futuristic.md` | 11262 | A | pending |
| `skills/pixellab-pip/references/weapon-katana.md` | 15104 | A | pending |
| `skills/pixellab-pip/references/weapon-mace.md` | 7171 | A | pending |
| `skills/pixellab-pip/references/weapon-spear.md` | 12147 | A | pending |
| `skills/pixellab-pip/references/weapon-staff.md` | 10595 | A | pending |
| `skills/pixellab-pip/references/weapon-sword-and-shield.md` | 9936 | A | pending |
| `skills/pixellab-pip/references/weapon-sword.md` | 12844 | A | pending |
| `skills/pixellab-pip/references/weapon-war-hammer.md` | 8838 | A | pending |
| `skills/pixellab-pip/references/weapon-whip.md` | 3485 | A | pending |
| `tests/doctor_cases/conftest.py` | 328 | A | pending |
| `tests/doctor_cases/synth.py` | 4857 | A | pending |
| `tests/doctor_cases/test_cli.py` | 4963 | A | pending |
| `tests/doctor_cases/test_frames.py` | 4149 | A | pending |
| `tests/doctor_cases/test_fx_frames.py` | 2019 | A | pending |
| `tests/doctor_cases/test_integrity.py` | 9638 | A | pending |
| `tests/doctor_cases/test_look.py` | 3994 | A | pending |
| `tests/doctor_cases/test_measure_clean.py` | 2578 | A | pending |
| `tests/doctor_cases/test_measure_crisp.py` | 1651 | A | pending |
| `tests/doctor_cases/test_measure_identity.py` | 3672 | A | pending |
| `tests/doctor_cases/test_measure_motion.py` | 1665 | A | pending |
| `tests/doctor_cases/test_minors.py` | 3058 | A | pending |
| `tests/doctor_cases/test_plan.py` | 3953 | A | pending |
| `tests/doctor_cases/test_repair.py` | 3756 | A | pending |
| `tests/doctor_cases/test_review.py` | 3784 | A | pending |
| `tests/doctor_cases/test_stepped.py` | 2232 | A | pending |
| `tests/doctor_cases/test_timing.py` | 3201 | A | pending |
| `tests/test_assembly.py` | 15094 | A | pending |
| `tests/test_auto_config.py` | 14660 | A | pending |
| `tests/test_blueprints.py` | 24443 | A | pending |
| `tests/test_dependabot_merge.py` | 5124 | A | pending |
| `tests/test_distribution_badges.py` | 8449 | A | pending |
| `tests/test_doctor.py` | 1628 | A | pending |
| `tests/test_doctor_rules.py` | 6157 | A | pending |
| `tests/test_extras.py` | 12412 | A | pending |
| `tests/test_fetch.py` | 15898 | A | read |
| `tests/test_finishing.py` | 24668 | A | pending |
| `tests/test_helpers.py` | 29435 | A | pending |
| `tests/test_history.py` | 5241 | A | pending |
| `tests/test_image_inspection.py` | 9788 | A | pending |
| `tests/test_manifest.py` | 20820 | A | read |
| `tests/test_merge_packaging.py` | 2764 | A | read |
| `tests/test_panel.py` | 19145 | A | read |
| `tests/test_project_style.py` | 17358 | A | pending |
| `tests/test_qa_links.py` | 1322 | A | read |
| `tests/test_qa_security.py` | 2387 | A | read |
| `tests/test_references.py` | 2533 | A | read |
