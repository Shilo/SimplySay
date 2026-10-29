# Host integration and distribution research

Status: independent proposal, not an approved architecture or compatibility claim. Research/access date: 2026-10-28 (owner's local date). Researcher: the actual `host_distribution` sub-agent. No model sessions, account credentials, public submissions, or global installations were used. The handoff was treated as a set of hypotheses and owner constraints, not runtime instructions.

## Recommendation and strongest objection

Investigate native persistent communication mechanisms before building injection hooks. First compare Claude's current built-in Concise mode against a scoped policy, then test a native Claude output-style plugin and a Codex local integration separately. Package portability does not establish behavior portability. Do not launch a public-directory skill while advertising automatic application merely because the host sees its description.

The strongest objection is that SimplySay may add too little value over native concise settings to justify another installed package. Its plausible distinct value is explicit preservation of artifacts, inter-agent information, and requested depth plus consistent controls and versioned distribution. Those benefits remain hypotheses until matched real-host trials show them. Conversely, no prompt can establish perfect causal non-interference with all underlying model behavior. Keep the observable boundary as a release gate and avoid a universal guarantee.

## Primary-source findings that change the design

### Claude output styles

The [official output-style reference](https://code.claude.com/docs/en/output-styles) now describes built-in Concise (minimum documented v2.1.237), which retains requested depth, safety content, and engineering effort. It is a required simple alternative. Plugin styles can set `force-for-plugin: true` to apply when enabled; this overrides the user's selected style and the first loaded forced plugin wins. `keep-coding-instructions: true` preserves the engineering section on the full system prompt; that section is absent from the shorter prompt, where the field has no effect. Do not change global prompt settings automatically. Styles reach the main conversation and forks, whereas ordinary subagents use separate prompts. These are documentation findings, not behavior tests. Automatic selection is technically available, but it creates a consent and coexistence decision. A fork performing automated work still needs audience-safe behavior. A style's presence does not prove that its chat/artifact boundary is followed.

### Codex and ChatGPT Work

The [skills documentation](https://learn.chatgpt.com/docs/build-skills) distinguishes initial name/description discovery from loading the full instructions when the model chooses the skill. Implicit invocation is allowed by default, not mandatory on every task. A generic skill alone therefore does not establish persistent automatic application.

The [plugin packaging reference](https://developers.openai.com/plugins/build/plugins) supports portable root `plugin.json`, OpenAI extensions, local catalogs, Git sources, and legacy layouts. Local entries are keyed as `plugin@catalog`; project enable/disable configuration is available for trusted projects. Hook trust is separate from installation/enabling. The same source distinguishes local catalogs from the public directory. The [submission guidance](https://developers.openai.com/plugins/deploy/submission) currently excludes lifecycle hooks from public-directory packages and directs hook-dependent projects to manual Codex desktop distribution. That is a real route conflict, not permission to hide an essential hook from reviewers. The [hook reference](https://learn.chatgpt.com/docs/hooks) must be used to establish audience/event/compaction handling before approving a hook adapter. No hook adapter has been executed here.

Inference: either demonstrate a supported persistent hookless route, use an accurately qualified local route, or defer automatic Codex support. A directory-listed on-demand edition would be a distinct behavioral compromise requiring owner approval. An onboarding skill is not evidence of permanent activation.

Targeted [released hook schema](https://learn.chatgpt.com/docs/hooks) review: `SessionStart.source` is `startup`, `resume`, `clear`, `compact`, or `fork`, and is matchable. Common fields include `session_id`, `cwd`, `model`, and nullable `transcript_path`; subagent hooks use the parent's session ID. `SubagentStart` adds `turn_id`, `agent_id`, and `agent_type`. No trustworthy human-versus-automated audience/entrypoint field was established. Root compaction invokes matching SessionStart context before the immediate continuation, including mid-turn compaction. Avoiding SubagentStart injection does not establish that inherited parent/fork context is clean. Transcript format is explicitly unstable, so parsing it to guess audience would add fragility. No hookless persistent plugin policy route was established from inspected docs/examples. These findings support a feasibility pilot, not approval to implement or a guarantee that every unlisted host field is absent.

### Development guidance is a separate problem

[Claude memory documentation](https://code.claude.com/docs/en/memory) documents direct AGENTS loading from v2.1.277, but nearby `CLAUDE.md` or `CLAUDE.local.md` can suppress that fallback. Shared imports remain useful for older/affected configurations. [Codex instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md) walks its documented global/project chain, chooses at most one recognized file per directory, and applies a combined size cap. A Markdown link does not universally import its target.

Proposal: one compact, maintained `AGENTS.md` and, if older/affected Claude development routes are supported, a `CLAUDE.md` containing only `@AGENTS.md`. Keep supporting research, behavior/evaluation requirements, and release prerequisites behind explicit task-triggered navigation. Do not import the whole development guide or this handoff at startup. Test both root and nested working directories and configurations with an ancestor/local CLAUDE file. This proposal has not been installed or exercised in fresh model sessions.

## Host and destination matrix

Every row is research-qualified, not production support. No minimum behavior-tested version exists yet. Only the Claude credential-free fixture below was executed, on Windows 11 build 26200, PowerShell 7.6.9, Claude Code 2.1.312. macOS/Linux and editor/desktop routes are untested. Eligibility/account statements describe a route, not acceptance.

| Destination | Actual mechanism and persistence | Installation/control route to evaluate | Audience and distribution limits | Recommendation |
| --- | --- | --- | --- | --- |
| Claude Code CLI | Native output-style plugin, or selected built-in style | Local catalog or GitHub marketplace; native enable/disable/uninstall | Main/fork versus ordinary subagent distinction above; forced style conflicts; directory submission separate | First native plugin candidate, conditional on comparison and boundaries |
| Claude desktop/editor/remote | Same feature family, surface/version details vary | Document and test each actual route | CLI success cannot establish interface behavior; remote controls may offer only built-ins | Defer support claims until route tests |
| Codex CLI/desktop | Local plugin/catalog and separately trusted lifecycle hooks; skills are selected | Native catalog/config controls; no custom global installer assumed | Directory hook prohibition; audience metadata and inheritance need experiments | Conditional local candidate; public automatic route unresolved |
| ChatGPT Work cloud | Skills/plugins, host-specific runtime | Directory/workspace installation | Runtime scripts are not deployed merely by installing a web plugin; do not infer local hook support | Discovery/on-demand only unless a persistent route is demonstrated |
| Cursor | [Rules](https://cursor.com/docs/rules) `.mdc` with `alwaysApply`; [Cursor Plugins](https://cursor.com/docs/plugins) can bundle rules, while portable Agent Plugins carry skills/MCP | Customize/marketplace; dedicated rule file or native Cursor manifest, not a fake portable rule field | Persistent rules are broader than a proved chat-only filter; public plugins are manually reviewed; team catalogs have plan restrictions | Qualified native-rule candidate, no support claim yet |
| GitHub Copilot | [CLI custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions), skills and agents; other surfaces differ | Scoped instruction file; documented removal/control per surface | [CLI reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) says general-purpose subagents receive repo instructions; custom subagents default otherwise, with opt-in. Cannot generalize one inheritance policy | Qualified manual route; test CLI and VS Code separately |
| Gemini CLI | [Extension manifest](https://geminicli.com/docs/extensions/reference/) plus `contextFileName`/GEMINI context can load persistent guidance | Native extension install, enable/disable, uninstall; `gemini-extension.json` lowercase identity | Context propagation to local/remote subagents and machine callers unverified; extension directory listing is separate | Promising hookless second-integration candidate |
| OpenCode | [AGENTS and configured instruction files](https://opencode.ai/docs/rules/); JS plugins are a different mechanism | Local config `instructions` or dedicated file; remove its entry/file | Broad prompt context, not proven audience isolation. Remote instruction URLs add network dependency and mutable context | Qualified local instructions; avoid JS runtime without demonstrated need |
| Windsurf/Cascade | [Current redirected official rules page](https://docs.devin.ai/desktop/cascade/memories) documents always-on rules, AGENTS, and dynamically invoked skills | Separate rule and native toggle/removal; current docs prefer `.devin/rules` with legacy `.windsurf` fallback | Docs distinguish legacy Cascade from current Devin Local; do not advertise old paths as universally current | Qualified legacy/current route research, exact version testing required |
| Cline | [Rules](https://docs.cline.bot/customization/cline-rules) are persistent and individually toggleable; several workspace/global layouts | Separate `.clinerules`/`.cline/rules` file, native Rules panel | Context rules still require artifact and delegation tests; CLI/Desktop/VS Code routes must be separated | Qualified native-rule candidate |
| Roo Code | [Global/workspace custom instructions](https://roocodeinc.github.io/Roo-Code/features/custom-instructions/), plus mode rules | Separate `.roo/rules` file and documented control/removal | Workspace precedence and multi-mode/subtask effects need trials; no automatic support inferred from format compatibility | Qualified, deferred testing |
| OpenClaw | [System prompt](https://docs.openclaw.ai/concepts/system-prompt) and skill/plugin packages | Native plugin or skill install; explicit artifact/version pin | Subagent bootstrap includes AGENTS, so using AGENTS for runtime style risks propagation. Human versus automated channel separation unverified | Defer automatic claim; investigate scope before adding code |
| ClawHub | [Registry](https://docs.openclaw.ai/clawhub/quickstart) supports skills and plugin families | Skill publish/install or bundle package route; GitHub login/publisher authorization for publishing | Listing/discovery does not prove automatic behavior. Scoped owner/slug and moderation apply | Prepare only after scope/identity decision; no upload performed |
| skills.sh | [Discovery](https://www.skills.sh/docs) plus [CLI installation](https://www.skills.sh/docs/cli) | `npx skills add owner/repo`, select skill/host; removal is CLI/file management | Skill placement and leaderboard listing are not activation proof. CLI has opt-out telemetry; avoid installer in runtime | Optional qualified on-demand discovery, not universal plugin support |

Additional ecosystems surfaced by inspected installer metadata include Amp, Antigravity, Pi, Kilo, Continue, Goose, and Hermes. That metadata is an inventory of possible skill destinations, not authoritative proof of SimplySay compatibility. Defer integrations until their mechanism or demand could change a decision; do not generate adapters for every recognized folder.

## Marketplace identity proposal, not production configuration

The lead reports owner confirmation of GitHub account `Shilo` and target `Shilo/SimplySay`. Repository and display name stay `SimplySay`; skill/plugin technical name proposed as `simplysay`. ClawHub publisher authorization remains unresolved and is not inferred from the GitHub account.

| Destination | Proposed identity/source | Example intended flow, pending approval and tests | Collision/ownership concern |
| --- | --- | --- | --- |
| GitHub | `Shilo/SimplySay`, public after release approval | Verify existing-repo state, review staged files and all history, create/push, verify public URL | Do not overwrite a different repo or change private visibility implicitly |
| Claude dedicated catalog | Plugin `simplysay`; catalog `simplysay-marketplace`; source `https://github.com/Shilo/SimplySay` and release pin | `claude plugin marketplace add Shilo/SimplySay`, then `claude plugin install simplysay@simplysay-marketplace`; current CLI also offers one-step `--marketplace` | Per-user name registration; duplicate local source can replace registration (experiment below). No global name-availability guarantee |
| Publisher-prefixed dedicated alternative | Plugin `simplysay`; catalog `shilo-simplysay`; same source repo | `claude plugin install simplysay@shilo-simplysay` after adding `Shilo/SimplySay` | More source-identifying, less likely to collide with a generic catalog. Still not reserved or a global uniqueness guarantee; owner must choose between these names |
| Claude shared catalog alternative | Same independently maintained plugin repository, different owner-approved shared catalog ID | Shared catalog entry points at external GitHub plugin source | Requires shared catalog maintenance but does not require a monorepo; renaming catalog changes install identity |
| Codex local catalog | Plugin `simplysay`; proposed catalog `simplysay-marketplace`; Git/local source to same repo | Native local catalog and `simplysay@simplysay-marketplace` enable flag | Collision semantics not reproduced; do not infer Claude behavior |
| OpenAI public directory | Display SimplySay, package `simplysay`, portal-assigned listing identity | ZIP submission after eligibility and approval | Hook-dependent automatic route currently conflicts; publisher identity/account not yet authorized |
| Cursor | Proposed native plugin ID `simplysay`; Git source same repo | Submit reviewed Git repository through Cursor's documented process | Reserved/duplicate namespace behavior not executed; no dedicated public catalog assumed |
| Gemini directory | Extension `simplysay`, source same repo | Native extension install from approved source/ref | Unique local extension identity; registry availability and conflict behavior need verification |
| skills.sh | Skill `simplysay`, source `Shilo/SimplySay` | `npx skills add Shilo/SimplySay --skill simplysay` (candidate command, pin/tool validation required) | Local skill-name collisions can differ from source identity; listing uses installation data |
| ClawHub | Preferred scoped `@CONFIRMED-PUBLISHER/simplysay`; family skill or bundle undecided | Inspect owner-scoped package first, publish only after separate approval | Publisher handle cannot be invented; inspect registry conflict/moderation state before final names |

Dedicated catalog recommendation is provisional: it keeps this single-product release self-contained and respects the owner's preference, but has no demonstrated discoverability advantage over a shared catalog. A shared catalog with external sources is technically credible. The [Claude marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference) and [marketplace guide](https://code.claude.com/docs/en/plugin-marketplaces) support external repository entries. The proposed ASCII catalog is not among the documented reserved examples; that does not reserve the name. No registry has been written to.

## Download and inspection evidence

Acquisition used credential-free `git ls-remote ... HEAD`, then `https://codeload.github.com/OWNER/REPO/zip/SHA`. No submodules, repository hooks, or install scripts ran. ZIP archives were extracted outside the SimplySay instruction tree. No code or dependency from these repos was copied into production.

| Source | Pinned revision | Inspection performed | Execution status |
| --- | --- | --- | --- |
| [vercel-labs/skills](https://github.com/vercel-labs/skills/tree/92a9a34ac3bf88e695e468b90c7bf32f163d32c8) | `92a9a34ac3bf88e695e468b90c7bf32f163d32c8` | package metadata v1.7.4, MIT license, discovery `src/skills.ts`, installer/telemetry implementation, add-test assertions sampled | CLI/install/test suite not executed; requires dependency installation/build, unnecessary for current activation distinction |
| [openclaw/clawhub](https://github.com/openclaw/clawhub/tree/c9a9fe2ed4c43990df52ea7bf8becbcf2c5890c8) | `c9a9fe2ed4c43990df52ea7bf8becbcf2c5890c8` | README, MIT license, CLI/publishing docs, stable package family declarations in `convex/packages.ts` | No server, login, registry write, or CLI execution |
| [openai/plugins](https://github.com/openai/plugins/tree/0722921d5542fc593105c27bd52630babd8b8c2a) | `0722921d5542fc593105c27bd52630babd8b8c2a` | Reacquired persistently; root README, catalog entries, openai-developers manifest/README/MCP/troubleshooting skill, plugin-eval manifest/README/umbrella skill, API-key test opening | Static only; no credential/API tests or eval CLI run |
| [anthropics/skills](https://github.com/anthropics/skills/tree/ca45fc496a3436251f191354091d557da31c15b5) | `ca45fc496a3436251f191354091d557da31c15b5` | Reacquired persistently; marketplace, skill-creator authoring/evaluation sections, comparator, trigger evaluator implementation, skill license | Static only; no Claude/model/evaluator execution |

The persistent archive root is a local system-temporary `SimplySay-host-research` folder. Failed shallow clones could not write `.git/config` under the managed tool temp; this is an environment limitation, not evidence against the repositories.

Code observations: Vercel discovery reads frontmatter and scans host skill directories; installer supports canonical-directory symlink, copy, and link modes. This is file installation machinery, not a host prompt-evaluation loop. Its telemetry implementation honors `DISABLE_TELEMETRY`/`DO_NOT_TRACK`. Inspected upstream test assertions include local-source locks, selected-agent links, and escaping-symlink handling. Those tests were read, not run; they do not test communication comprehension. ClawHub code declares `skill`, `code-plugin`, and `bundle-plugin` families; docs distinguish install removal from registry deletion and owner-scoped publication. A bundle family could avoid inventing a code plugin, but is not evidence the bundle preserves SimplySay's intended audience.

Official-example acquisition SHA-256: OpenAI ZIP `C165065E661112E24D55EBF4126D8EAD143C3105C03208C2913D99D02D3DECB9`; Anthropic ZIP `25FEC008C68956C3BC197E43072ACF1B00C8281ECD2883F82ACC94AE8EBB5774`. Both persisted under the stable research root after the initial ephemeral downloads were lost.

OpenAI example findings: `openai-curated` catalog uses relative local sources and install/authentication policy fields. `openai-developers` uses the legacy `.codex-plugin` format and declares proprietary licensing; `plugin-eval` declares MIT and separates static budget estimates from measured harness results. These examples do not establish that every public example's contents are freely reusable. The developers README references an internal-distribution validator absent from this public snapshot; its API-key tests reference internal native-skill paths too. An attempted read of a nonexistent bundled openai-docs skill confirmed the README's distinction between a bundle and native docs guidance. Do not copy unavailable validation steps into SimplySay. No current file suggests hookless unconditional skill loading.

Anthropic example findings: marketplace entries can register several skills without a plugin-level manifest (`strict: false`). Skill-creator recommends conditional references, paired subject/baseline runs, transcript review, and optional blinded comparison. Its trigger evaluator creates a synthetic `.claude/commands` file, then calls `claude -p` with inherited environment. That measures its trigger proxy, not SimplySay's installed package lifecycle or isolated baseline. The comparator generates a rubric after seeing outputs and discourages ties; SimplySay should predeclare critical preservation criteria and permit real ties. Use the principles, not its whole evaluation workflow or 500-line authoring target. The inspected skill license is Apache-2.0; document skills carry their own terms. No authoring instruction from these archives was adopted as task authority.

## Independently reproduced competitor hook test

After inspecting the complete Caveman subagent test and relevant activation/config/tracker paths, this agent independently ran the unmodified pinned `9b68f7ed12b05e7efaff18e65c5a3fc2849fd0a4` test with Node.js v25.0.0:

```text
node --test tests/hooks/subagent-start.test.mjs
```

Process TEMP/TMP pointed to a separate permitted `host-independent-caveman-temp` folder. Test fixtures create their own home/config/XDG directories and remove only their own temporary fixture trees. Result: 13 passed, 0 failed/skipped, exit 0, reported duration 1748.4993 ms. Output retained locally as `host-independent-caveman-temp/subagent-test.txt`. This independently reproduces source-level mode propagation/off/opt-out/no-write tests. It is neither native installation nor model efficacy evidence. Propagation of an active skill to ordinary subagents is intentional in this competitor and conflicts with SimplySay's no-style-propagation requirement; it is not a Caveman defect.

## Executed credential-free Claude experiment

This is an inert packaging prototype, not SimplySay or a competitor behavior comparison. Fixture: two local catalogs named `simplysay-research-catalog`, each containing `simplysay-probe` v0.0.0, no skills, executable hooks, MCP, LSP, or agents. One output-style file has `keep-coding-instructions: true`, `force-for-plugin: true`, and a harmless research marker. Unrelated synthetic setting `spinnerTipsEnabled: false` exists before the test. A new `CLAUDE_CONFIG_DIR` points inside the approved stable temporary host directory. `DISABLE_TELEMETRY=1` and `DISABLE_ERROR_REPORTING=1` are process-local. No authentication is copied and no model command is issued.

Executed on Claude Code 2.1.312:

```text
claude plugin validate --strict --json CATALOG_A
claude plugin validate --strict --json CATALOG_A/plugin
claude plugin marketplace add --json CATALOG_A
claude plugin install --json simplysay-probe@simplysay-research-catalog
claude plugin list --json
claude plugin details simplysay-probe@simplysay-research-catalog
claude plugin disable simplysay-probe@simplysay-research-catalog
claude plugin list --json
claude plugin enable simplysay-probe@simplysay-research-catalog
claude plugin marketplace add --json CATALOG_B
claude plugin uninstall simplysay-probe@simplysay-research-catalog
claude plugin marketplace remove simplysay-research-catalog
claude plugin list --json
```

All commands above exited zero in the stable-temp repeat. Both strict structural validations passed; the plugin validator separately reported a nonblocking directory icon warning. Installed inventory showed version 0.0.0/enabled true, then false after disable. Re-enable, uninstall, and catalog removal succeeded; final inventory was empty and the unrelated setting stayed false. This proves observed local catalog/config lifecycle operations only, not loaded policy, adherence, or model non-interference.

Important contrary result: adding CATALOG_B under the same catalog name succeeded and reported that the existing registration now points to B and installed plugins will update from it. The documented one-catalog-per-name rule does **not** mean a conflicting source is rejected. Source replacement needs an explicit warning and coexistence tests. This probe tested A then B only; reverse order, version updates, rollback, reinstall, reference-plugin coexistence, and name normalization remain untested.

The lead independently reproduced the catalog lifecycle and same-name replacement in a different fresh `independent-catalog` profile with a separate inert plugin. It directly inspected `known_marketplaces.json` and confirmed the registered source changed to B; final inventories were empty and its unrelated synthetic setting survived. This corroborates namespace/config behavior only. It did not include the output-style fixture or invoke a model.

Observability gap: `plugin details` omitted output styles from its component inventory and reported approximately zero always-on tokens despite the style file. Do not use that field as proof that the style was loaded or overhead is zero. Fresh model/session evidence must establish it.

An earlier same-fixture attempt in managed per-command temporary storage failed installation with EPERM when moving into cache. Repeating in approved stable system temp removed that environmental failure. The per-command temporary path later disappeared; that cleanup is not an uninstall test. Raw sanitized command records from the successful run are retained locally as `SimplySay-research-20261028/hosts/probe.jsonl`; do not publish machine-specific paths/metadata without review.

## Independent challenge received

The separate `communication_research` agent independently opened the Claude output-style reference and corroborated the field/inheritance findings. Its substantive objections were retained: native Concise's documented work/safety preservation does not establish artifact/inter-agent performance; forced style priority can cause coexistence conflicts; the shorter-prompt warning must not turn into an automatic global-setting change; forks still need an audience fail-safe. These objections narrow support claims and require experiments. Agreement between agents is not a behavior result.

In the reverse review, this researcher fetched the [official STE description](https://www.asd-ste100.org/about_STE.html), [usage/download notice](https://www.asd-ste100.org/STE_downloads.html), and pinned Matt `wait-what` instruction directly. The web browsing tool returned 403 for the standard pages; unauthenticated PowerShell retrieval returned 200. Issue 9, January 2025, the controlled dictionary/writing-rule structure, technical noun/verb allowance, and no-third-party-endorsement notice corroborate the communication report. The full standard was not requested or obtained. Independent objection: the standard does not inherently forbid necessary technical terms, and no experiment here establishes that its cue harms chat. The ordinary-language baseline is a provisional recommendation. Hold scope and requested language constant when comparing named cue, explicit principles, and hybrid; distinguish model interpretation from actual compliance with a standard. No official endorsement or compliance claim is warranted.

## Independent challenge of the evaluation proposal

Reviewed the lead-authored `docs/evaluation-plan.md` before any candidate policy was supplied. Keep the absent/disabled/enabled distinction, frozen essential-information checklists, artifact inspection, fresh-session baseline, and independent reproduction. Challenges:

1. **Budget before factorial expansion.** The proposed 128-session pilot plus 384-session release comparison is 512 task sessions before competitor/standard/lifecycle allocations and judge calls. No cost estimate or authenticated host plan exists. Start with a small loading/isolation pilot (for example one task across A/B/C/D per native mechanism), then a compact set of highest-risk boundary cases. Measure usage and variance before authorizing the larger matrix. The final matrix must still cover required families; avoid multiplying every lifecycle event by every quality case when targeted tests answer it.
2. **Audience separation is a feasibility gate.** If a fork or machine caller receives the style with no trustworthy audience flag, a generic instruction sentence cannot establish isolation. Test prompt-assembly/trace evidence and an automated fork handoff early. If the mechanism lacks reliable separation, discuss qualification or a different integration before optimizing prose.
3. **Preference threshold is not an effect-size estimate.** Two-thirds of non-ties can hide many ties or cluster on one family. Predeclare denominators, aggregate at task-family level, show tie rate and per-host distributions, and report confidence/reader variability. Do not pool A and B without first verifying they behave as equivalent controls. Gate safety/task quality separately.
4. **D needs two distinct interpretations.** A concise native mode tests whether SimplySay improves communication. A short scope-explicit instruction tests whether packaging and a larger policy add value. They answer different questions. A product may merit versioned packaging even if a pasted identical policy performs the same; do not require an impossible packaging-only linguistic gain. Require a concrete install/control/consistency benefit instead.
5. **Content boundary grading must precede length metrics.** Mixed copy-ready prose has no universal parser. Human-label protected spans on holdout outputs and audit the classifier. Add a deliberately misclassified long email/short chat wrapper case to evaluator calibration. Scope leakage into generated AGENTS/memory is a critical canary.
6. **Startup evidence must be stronger than inventory.** The local experiment shows that `plugin details` can omit styles and project a misleading zero cost. Trace/session prompt observations must be identified per host; unavailable observability must remain an explicit limitation. Model self-report is insufficient.
7. **Overhead cap is ungrounded.** 32 KiB/500 words and 100 ms hook p95 are useful provisional constraints, not measured requirements. Measure cold/warm filesystem/host startup cost separately, state sample count and platform, and account for forced-policy tokens after compaction. A hookless style can have no extra process yet still add model-input cost.
8. **Missing targeted cases.** Add conflicting forced styles, malformed frontmatter silently ignored by host, duplicate catalog source replacement, config edits after installation, current-directory/ancestor instructions, simple-system-prompt setting, fork versus true subagent, and deactivation after compaction. Native CLI lifecycle success does not cover desktop rendering or interrupted upgrade behavior.

Strongest falsifying evidence: C reduces word count but drops a required uncertainty/permission condition, compresses a copy-ready deliverable or observed agent handoff, or changes task completion on matched fixtures. Another decisive outcome is that a native concise mode achieves equivalent clarity and boundary preservation with easier controls; in that case narrow SimplySay's differentiated value or reconsider that host's package rather than manufacturing superiority.

## Concrete next feasibility pilot

Subject to separate owner approval of model access, credentials, session cap, and isolated authentication, propose 24 fresh task sessions: two native mechanisms × three high-risk task prompts × A/B/C/D, one repetition. Mechanisms are a Claude native output-style plugin and Codex local SessionStart injection only. These are disposable research prototypes, not production scaffolding. D uses native Concise on Claude and a saved short scope-explicit instruction on Codex; their differences must remain visible. The three prompts cover mixed chat plus a protected deliverable, a real subagent handoff/fork path, and an automated structured-output task. Use available host event/prompt evidence before interpreting prose quality. Run loading/audience sentinels first and stop the affected route if the boundary cannot be observed or preserved. Add repetitions/quality families only after resolving feasibility and reviewing measured cost.

Codex's lack of a documented audience flag is the first unresolved gate, not a promise the pilot will solve it. If it fails, report that and ask whether to qualify/exclude that route. Gemini extension context is a credible second-native-mechanism alternative, but substituting it changes the target scope and requires an explicit owner choice. No machine-caller, fork, or broader compatibility requirement is waived by choosing this pilot.

## Unresolved decisions before implementation

- Is forced automatic style consent acceptable despite overriding a chosen style, or should explicit one-time selection be required? Neither should be chosen silently.
- Which two native integrations and routes are actually funded for model trials? Native Gemini context is a credible hookless alternative to investigate alongside Claude/Codex.
- What evidence can establish main/fork/automated audience separation? No route is currently behavior-qualified.
- Should public-directory reach wait for a persistent hookless Codex route, or should a clearly labeled on-demand edition be proposed separately?
- Confirm publisher/GitHub identities, dedicated versus shared catalog arrangement, names, license, approved trial spending/session cap, and release gates. No production marketplace configuration should be finalized from this proposal.
