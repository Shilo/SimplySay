# Approved feasibility pilot: frozen allocation and criteria

Date: 2026-10-28. This is initial evidence, not release validation or production implementation. Owner authorization covers at most 24 evaluation sessions using existing Claude/Codex sign-ins, including child sessions, failures, and diagnostics. No new paid API usage, paid model judging, permanent preference override, production configuration, final marketplace naming, or publication is authorized.

**Subsequent owner steering, before trials:** do not invoke Claude directly. Defer its live trials and provide a standalone handoff the owner can run. Focus live experimentation on Codex while preserving an agent-agnostic policy and the same task requirements. The original allocation below is retained for provenance; the active Codex-only allocation is 4 mixed-task roots, 2 detailed-task roots, 2 delegation roots plus their 2 children, and at most 2 diagnostic sessions: **12 maximum**, within the overall 24 authorization. The other planned sessions stay unspent; no direct Claude call or silent host substitution is permitted. This is still feasibility work, not approval to implement production.

## Allocation, before any model trial

| Case | Claude treatments | Codex treatments | Maximum counted sessions |
| --- | --- | --- | ---: |
| Mixed work/deliverable/chat | Absent, installed-disabled, enabled automatic, enabled one-time selection, native Concise, minimal instruction | Absent, installed-disabled, enabled, minimal instruction | 10 roots |
| Necessary detailed explanation | Absent and enabled automatic | Absent and enabled | 4 roots |
| Native delegation and detailed protected handoff | Absent and enabled automatic, exactly one child each | Absent and enabled, exactly one child each | 4 roots + 4 children |
| Material diagnostic defect | Only on first unresolved material host/capture failure, not chosen to improve a favored result | Same rule | 2 roots or children total |
| **Total ceiling** | **Investigate both hosts early; do not silently substitute another integration** | | **24** |

No subject/model task starts before its central reservation. `experiments/pilot/session-budget.cjs` atomically records reservations under ignored `.local/`; a delegation parent reserves two slots in advance. Each launch/retry needs a unique ID. Failed starts consume slots; reserved but unlaunched children are conservatively counted and separately disclosed. No refund, silent retry, extra child, or judge call is allowed. If a host is blocked, preserve its planned coverage as unexecuted rather than silently spending its allocation elsewhere. Provider usage is recorded where available; sessions may contain many model requests, so the count is not a token/cost estimate. Stop if new charges or expanded access are required.

The controller/research subagents are development collaborators, not evaluation subjects. No additional paid judging service is used. The final owner review of matched examples remains necessary for claims about human comprehension.

The owner explicitly approved copying only Codex's existing ChatGPT sign-in cache into a disposable local profile for this pilot and deleting the copy afterward. Automatic approval review initially rejected that step for lack of explicit credential-copy authorization; no copy or model attempt occurred on the rejected action. The later approval resolves that specific scope question. Copies must stay outside Git/logs, never be shared, and be removed after tests. No API-key credential, unrelated configuration, or full credential store is authorized.

## Frozen tasks and failure classification

An independent fresh-context agent owns the neutral prompts, input fixtures, essential-information lists, and deterministic requirements in `experiments/pilot/cases.json` and `docs/pilot-criteria.md`. It receives no candidate policy or development outputs before authoring. Commit and hash cases/criteria before model trials or policy tuning. This pilot uses development cases; a separate uncontaminated final holdout is still required for a future release.

Task success and scope preservation are separate from communication benefit. Inspect real generated source, tests, reports, copy-ready chat deliverables, machine-readable output where requested, native child messages, and root relays. Required detail, identifiers, numbers, warnings, uncertainty, and honest verification remain essential. A missing essential, corrupted output, or inappropriate style change to a protected deliverable is a failure regardless of fewer words. Inherited instructions or a hook event alone do not establish output damage. Unavailable capture, runtime failure, or unsupported native delegation is unknown/blocked, not automatically a style failure.

Communication review asks whether a reader can recover the answer, relevant caveat, and next decision; whether requested depth and useful precision survive; and whether redundant reading/interruptions decrease. Do not optimize word count or demand identical generated prose. Show representative matched outputs, ties, and failures without selecting only favorable examples. One trial per cell is a feasibility signal, not evidence of statistical superiority or a release guarantee.

## Isolation and treatments

Use fresh documented per-process profiles and neutral task directories in disposable system temporary storage, outside SimplySay's instruction tree. Do not copy real project files, user instructions, memories, configuration, plugins, histories, or credentials unrelated to the authorized existing subscription sign-in. Inspect ancestor/global instruction discovery and effective config. Reuse only the minimal supported subscription-auth cache where needed, never expose it in logs, remove paid API/provider fallbacks, and never commit credentials. No global settings change or trust/sandbox bypass is authorized.

Codex and Claude receive the same frozen task/fixtures per matched case, with host/model/effort/tool/output settings held constant within a host. Public marketplace restrictions are documented separately from local technical feasibility. Neither CLI success nor inventory proves desktop support or prompt adherence. Record package/policy hashes, native install/list/disable evidence, hook/style loading observations where available, sanitized full visible events, actual file hashes/content/check results, usage, duration, and missing observability.

Preflight discovered that a fresh Codex home still lists account-installed remote plugins. The experimental profile therefore disables app access and uses the supported `plugins._default.enabled = false`, enabling only the disposable local candidate in C. Native source/account inventory is distinguished from effective loading; verify merged configuration and hook readback, then inspect actual task events for unexpected tools. Subject directories use opaque run IDs under a neutral temporary root, without condition names or SimplySay development files.

Nondelegation cases disable native agents consistently across their conditions. Delegation cases use the native spawned-thread limit of one plus an identical controller-only PreToolUse budget guard in A and C: one atomic root spawn claim, no descendants, no style/context injection. The guard uses explicit denial/nonempty stderr and is trusted by exact reviewed definition through the native backend, never a trust-bypass flag. Record this guard as a deviation from an entirely unconfigured host baseline. It exists only to enforce the approved session limit; it is not product runtime. Hook crashes/timeouts can fail open in the host, so event monitoring and process-tree termination supplement it; do not claim infallible crash-proof enforcement. Capture actual attempted/created children and count any unexpected launch, rather than assuming concurrency means a cumulative session cap.

Codex initially uses a disposable local plugin with SessionStart hook only, subject to native exact-definition trust; no SubagentStart compression injection. Claude initially compares a disposable native output-style package with automatic and one-time selection. No mode is installed permanently. Native Concise and the minimal scope-explicit instruction are distinct controls, not interchangeable rows. If a native concise mode is unavailable on Codex, report that fact and do not invent one.

## Early preflight observations, not trials

Codex CLI 0.163.0 is installed. The existing auth cache reports ChatGPT mode, token presence, and no API key; no secret value was printed. An isolated temporary profile can run version/help commands. The CLI warns that it will not create helper aliases under temporary CODEX_HOME; treat any resulting tool limitation as an environment issue to investigate consistently across arms, not a product result.

Claude Code 2.1.312 is installed, but documented auth status reported signed out in both its default and clean profile. No model task was launched. The owner subsequently prohibited direct Claude testing and requested a standalone owner-run handoff, so no further Claude executable invocation is permitted. Previously completed credential-free package checks are labeled as pre-steering structural evidence only. Claude's technical feasibility and model behavior remain untested; this is separate from marketplace eligibility.

## Approval and return checkpoint

The owner approved an architecture-focused reference audit. Fully inspect relevant instruction, packaging, hook, install, distribution, and test paths; explicitly exclude unrelated domain material and retain uncertainty. Do not call this a full-project comprehensive audit.

After the bounded pilot, independently challenge results and show matched examples including failures. Return a brief recommendation and unresolved concerns before production implementation, final marketplace naming, any integration exclusion/scope compromise, or publication. No efficacy threshold from a future release is silently adopted or relaxed in this pilot.
