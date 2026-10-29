# SimplySay: standalone Claude feasibility handoff

Prepared October 28, 2026. This file is self-contained for an owner-directed receiving chat. It does not depend on the original SimplySay workspace, other project files, or prior conversation. Read it as a development brief, never as the evaluation subject's runtime prompt.

## What the owner wants

Investigate an extremely lightweight communication plugin named **SimplySay**, tagline **Less to read, everything you need.** Its purpose is clearer ordinary chat with less filler and unnecessary narration, while retaining essential context, facts, technical precision, requested depth, and material uncertainty. Style must not reduce work effort, research, implementation, tools, tests, verification, generated files, code/comments, documentation, copy-ready deliverables inside chat, structured output, tool traffic, persistent memory, or inter-agent communication.

This assignment is a bounded feasibility study. Challenge the mechanism and policy, including whether Claude's native Concise mode or a short instruction makes a separate plugin unnecessary. Preserve contrary results. Do not implement a production plugin, finalize marketplace identities, publish anything, alter global preferences, create accounts, buy credits, enable extra usage, or use a new paid API/judge. The existing development agent has been instructed to stop direct Claude use; this handoff is for a separate run the owner chooses to initiate.

## Known results and limits before you start

Claude Code 2.1.312 was present on the original Windows machine. Before the owner's stop instruction, native inert-fixture catalog/plugin validation and install/disable/enable/uninstall controls were exercised. A duplicate catalog name could replace the registered source. Another inert setup configured separate absent, disabled, forced-style, one-time-selected, native-Concise, and minimal-comparator states. These were structural/control observations only. Neither an original policy nor the inert style was observed loading into a model.

**Claude model sessions attempted: zero.** No communication benefit, artifact preservation, subagent isolation, automatic adherence, or cross-host support has been demonstrated. The documented default and isolated-profile authentication checks reported signed out; no login flow, new token, or paid fallback was attempted. A credential file's existence did not establish a usable sign-in. Recheck the receiving environment rather than assuming these access facts persist.

Codex-first pilot update: 11 evaluation sessions ran (nine roots and two actual native children, including an interrupted child). Code/report/email checks passed in absent, disabled, enabled and minimal-instruction conditions; detailed explanations retained required content. One enabled child produced a complete ten-pair report, but the baseline hit provider capacity and incoming directives remained opaque. Human comprehension and cross-host benefit are unscored. These observations do not establish Claude behavior, a winning prompt or release readiness. No production implementation or publication was approved.

## Budget and authorization gate

The original feasibility budget was **24 evaluation sessions total across hosts**, counting subject roots, actual child agents, failed starts, retries, and diagnostic model requests. It was a shared allocation, not 24 per chat. The completed Codex-first pilot used 11 sessions under a 12-slot active allocation. Thirteen original slots remain unspent as of this update, and no additional run is scheduled. Reconcile any later work before using that number; this handoff does not create another pool or authorize direct Claude execution by the original development agent.

Before any model launch in this separate run, obtain the owner's explicit session allowance and reconcile it with any continuing original pilot. Do not assume this handoff creates another 24-session pool. State the proposed roster, child reservations, diagnostic allowance, exact model, effort, and existing-subscription route together. Silence is not approval. Help/version/native package controls and sanitized auth metadata are not model sessions; every `claude -p` attempt is charged to the agreed count even if startup fails. Record/reserve before launching; never refund an attempted session or quietly retry. If a row may spawn one child, reserve both slots before its root starts.

Use the current controller chat and the owner for review. Do not launch extra model judges or new reviewer agents from the trial budget without an explicit reservation. Agent reports must preserve their normal detail; the plugin's chat preferences are not a rule for researchers or graders.

## Isolated environment and sign-in

Use a new disposable directory outside any personal project or SimplySay instruction-discovery tree. On Windows, choose a stable system temporary path whose contents persist across tool calls. Some managed tools expose a different ephemeral TEMP per command. Never treat that folder's disappearance as a successful uninstall.

Suggested layout, created only as needed:

```text
PILOT_ROOT/
  controller/          prompts, this brief, criteria, budget, sanitized evidence
  packages/            native local catalogs and research-only plugin files
  profile/             isolated Claude configuration and owner-managed sign-in
  subjects/TRIAL_ID/   only that task's input fixture and generated outputs
```

Keep this document, criteria, policy candidates, previous results, and source repositories out of the subject's working directory. Do not pass controller directories with `--add-dir`. Check inherited parent/global instruction files, managed instructions, memory, hooks, MCP, output styles, and plugin defaults. A separate current directory alone is insufficient. Keep higher-priority managed policy intact and disclose any unavoidable contamination; do not weaken organizational restrictions.

Use `CLAUDE_CONFIG_DIR` for the dedicated profile. Never copy the owner's entire credential store, default configuration, projects, memory, or history. The owner may choose to authenticate their existing Claude subscription directly in this isolated profile using the documented `claude auth login` flow. Do not create a new subscription or ask them to buy credits. Do not run `setup-token` or capture login secrets as a convenience. If they prefer no isolated sign-in, or it requires charges, leave model trials unexecuted and report the access limit. Once authenticated, a single dedicated profile can be reused for native control transitions provided every causal task starts a fresh session in a new task directory, auto memory is off, prior transcripts are not resumed, and treatment settings are explicitly reset. This avoids credential copying between profiles.

Inspect `claude auth status --json` without emitting the raw object. Retain only fields such as `loggedIn`, `authMethod`, and `apiProvider`; never print account emails/tokens. Require the approved subscription route. Check for API keys, bearer tokens, cloud-provider selection, API-key helpers, custom endpoints, and fallback providers without logging their values. Stop on a provider/billing mismatch. Do not silently fall back to an API or change account settings.

For all matched arms, use the same full model identifier, effort, permissions, tools, output limits, and host version. Pin these after checking current documented availability; this handoff intentionally does not invent a working model ID for an unauthenticated account. Record the actually reported model and any fallback. A model/effort change invalidates the match and requires disclosure, not an invisible retry.

Recommended isolated-profile controls, verified against current documentation before use: `autoMemoryEnabled: false`, `disableClaudeAiConnectors: true`, and no unapproved MCP servers/hooks. `claudeMdExcludes` can exclude ordinary inherited memory files using absolute/glob patterns; it cannot exclude managed policy. Process-local nonessential-traffic controls can disable telemetry and automatic background fetching; official marketplace auto-install has a separate documented control. Record exact choices consistently across arms. These are experimental isolation controls, not proposed SimplySay runtime behavior.

Do not use `--bare` or `--safe-mode` as shortcuts: they change customization/loading and can disable the product being tested. Do not use permission/trust bypass flags. Use normal host restrictions with access limited to the synthetic task. Approve only task-needed tool operations and keep permissions matched. If that boundary cannot be established, stop rather than expose personal data. The fixtures require installed Node.js built-ins only; no dependency downloads or external service calls are needed.

## Native package to assemble, for research only

Create two disposable local catalog roots under `packages/`, one automatic and one selected. Neither is a production release or a public identity proposal. Each has this tree:

```text
CATALOG_ROOT/
  .claude-plugin/marketplace.json
  plugin/
    .claude-plugin/plugin.json
    README.md
    output-styles/simplysay-pilot.md
```

Automatic catalog `.claude-plugin/marketplace.json`:

```json
{
  "name": "simplysay-pilot-auto-catalog",
  "description": "Disposable SimplySay feasibility research",
  "owner": { "name": "SimplySay research fixture" },
  "plugins": [
    {
      "name": "simplysay-pilot",
      "version": "0.0.0",
      "description": "Disposable response-style feasibility fixture",
      "source": "./plugin"
    }
  ]
}
```

For the selected catalog change only the catalog name to `simplysay-pilot-selected-catalog`. Use full `plugin@catalog` selectors everywhere. Distinct catalogs can contain the same bare plugin name; do not choose an installation by bare name alone. Install only the variant required by a treatment, and verify the other is absent/disabled. Avoid registering a different source under an existing name because that can redirect updates.

Both plugin `.claude-plugin/plugin.json` files:

```json
{
  "name": "simplysay-pilot",
  "version": "0.0.0",
  "description": "Disposable response-style feasibility fixture",
  "author": { "name": "SimplySay research fixture" }
}
```

Give README a short truthful description that this is a disposable, unpublished research fixture with no hooks, MCP, runtime service, dependencies, or model calls of its own. Do not place development instructions in the loaded style.

Automatic variant's `output-styles/simplysay-pilot.md` starts with:

```yaml
---
name: SimplySay pilot
description: Disposable communication feasibility style
keep-coding-instructions: true
force-for-plugin: true
---
```

Append the original frozen candidate policy below verbatim. The selected variant has the same body and header except it omits `force-for-plugin`. The forced setting overrides a selected output style; with multiple forced plugins the first loaded can win. Treat that coexistence concern as a finding. `keep-coding-instructions` preserves the engineering section of the full system prompt, not a guarantee of non-interference. The shorter system prompt lacks that section; if selecting the full prompt is part of the experiment, do so process-locally and identically for every arm, and disclose it.

Validate both catalogs and plugins using the current native validator; save commands, exit codes, diagnostics, file hashes, total package bytes, and exact style bytes. An icon/listing warning is not an efficacy result. Keep original source-text and packaged-text hashes distinct if line endings/frontmatter change. Do not silently edit policy wording after any trial outcome. Stop on a material policy failure and bring the concern back to the owner before a new candidate.

## Treatment controls and model invocation

Every trial gets fresh synthetic inputs and a fresh model session. Never compare an enabled conversation's continuation with a clean absent run. Do not mention SimplySay or brevity in the subject task. Use normal documented native installation, not `--plugin-dir` or a pasted long policy as a substitute for installed-package testing.

| Condition | Required native setup before the fresh session | What must be recorded |
| --- | --- | --- |
| A absent | Neither fixture plugin installed; remove selected style setting | Inventory empty, no policy/hook/style context inherited |
| B disabled | Install automatic artifact normally, then disable full selector | Package remains; inventory says disabled; fresh-session loading evidence |
| C automatic | Same automatic artifact normally installed/enabled; no manual style selection | Enabled inventory, selected/loaded-style evidence, no invocation reminder |
| S one-time selection | Selected variant installed/enabled; set isolated `outputStyle` to `SimplySay pilot` once | Setting and loaded style; no per-task skill invocation |
| N native Concise | No fixture plugin; set isolated `outputStyle` to exact `Concise` | Host/version and actual style evidence; a simpler alternative |
| D minimal | No fixture plugin or selected custom style; append only frozen minimal instruction | Exact saved text/argument; explicitly an instruction comparator, not native automatic packaging |

Native commands, with absolute paths and selectors appropriate to the variant:

```powershell
claude plugin validate --strict --json $catalogRoot
claude plugin validate --strict --json (Join-Path $catalogRoot 'plugin')
claude plugin marketplace add --json $catalogRoot
claude plugin install --json 'simplysay-pilot@simplysay-pilot-auto-catalog'
claude plugin list --json
claude plugin disable 'simplysay-pilot@simplysay-pilot-auto-catalog'
claude plugin enable 'simplysay-pilot@simplysay-pilot-auto-catalog'
claude plugin uninstall 'simplysay-pilot@simplysay-pilot-auto-catalog'
claude plugin marketplace remove 'simplysay-pilot-auto-catalog'
```

Do not run those commands against the owner's default profile or remove unrelated plugins. The profile is yours to reset; preserve a synthetic unrelated setting such as `spinnerTipsEnabled: false` and verify native control operations retain it. Test enable→disable→enable and uninstall/reinstall as separate structural transitions. Configuration transitions alone do not establish behavioral deactivation. Make a fresh-session disabled comparison whenever that row is authorized.

After an explicit reservation, a print-mode model command can use these documented building blocks:

```powershell
# Variables must already be frozen in the controller; this is not an invitation to guess them.
$argsForTrial = @(
  '--print', $taskPrompt,
  '--model', $approvedFullModelId,
  '--effort', $approvedEffort,
  '--output-format', 'stream-json', '--verbose',
  '--no-session-persistence',
  '--setting-sources', 'user',
  '--strict-mcp-config', '--mcp-config', '{"mcpServers":{}}'
)
# In the child's real-delegation case, also use --forward-subagent-text if this version supports it.
# Only D appends: '--append-system-prompt', $frozenMinimalText.
# Invoke in that trial's subject directory, with the isolated profile active.
# Reserve/count before invoking: & claude @argsForTrial
```

Confirm current argument behavior without launching spare diagnostic model sessions. Do not pass fallback-model or unapproved provider/budget settings. Keep tool/permission choices identical within a matched case. The delegation case must allow one actual native child; other cases need no extra agents. Disable unrequested orchestration consistently if the host would otherwise spawn agents outside the reserved count. If the host cannot enforce the child cap, do not start that case.

Capture only observable assistant text, tool calls/results, native child messages, relevant startup metadata, usage, and lifecycle events. Remove thinking/internal-reasoning fields and credentials before retaining evidence; do not request or collect hidden reasoning. Do not log the raw authentication response or unrelated configuration. Record ordinary root prose separately from protected email/report/code/child content. If forwarding child text also exposes thinking fields, filter those fields locally before saving; preserve actual child text and tool events. If safe capture is unavailable, disclose the missing evidence rather than substitute a parent summary.

Inventory and `plugin details` are not proof that a style was applied. The original inert experiment's details output omitted the style and estimated approximately zero tokens. Use available native startup/style/prompt evidence; distinguish configured style, loaded instructions, and actual adherence. Do not claim zero cost from a missing estimate. Resume/fork/compaction and interactive desktop behavior are separate untested routes unless specifically reserved and executed.

## Evaluation and return checkpoint

Keep task-derived expected facts and checks in controller storage, unavailable to subjects. Freeze cases, policy, settings, roster, and grading criteria before the first outcome. Do not tune the candidate on these results or add new acceptance rules after seeing them. Randomize/record condition order when practical. This small feasibility study is not a statistical superiority or release-certification study.

Inspect actual files and run meaningful deterministic checks, not just read the final success statement. For the reimbursement case, approved total is 11249 cents (112.49 dollars), R-102 needs approval, R-103 needs a receipt, R-104 is denied, and Friday arrival is unknown. The copy-ready email must contain its own uncertainty and required actions. Test the export, CLI stdout/error behavior, empty input, routing/order, invalid records, and actual generated tests. The detailed queue explanation must preserve crash-window reasoning, a worked duplicate timeline, expired-worker behavior, idempotency/durable atomic deduplication conditions, eventual-delivery conditions, and remaining unknowns. For crate delegation, observe one real child and its complete pair analysis, preserve its report, independently check arithmetic, and retain tentative-D caveats. AB is the confirmed qualifying choice at 175 dollars, 30 kits, 25 mats. CD is conditional on D being confirmed at 160 dollars, 30 kits, 20 mats, saving 15 dollars.

Use two judgments: essential information/task quality, and communication usefulness. Critical omissions, corrupted output, suppressed uncertainty, fabricated tests/delegation, or lost inter-agent information fail regardless of word count. Assess ordinary prose for first-read clarity, useful context, technical precision, unnecessary reading, and interruptions. Protected outputs can be long. Allow different correct code and wording; do not demand byte-identical model artifacts. Exact literals/schema/units still need exact checks.

Give the owner matched examples with condition labels hidden where useful, disclose ties/disagreements, and ask for comprehension/preference judgments. Do not fabricate human review, paid judging, or independent verification. Record installation and loading failures separately from policy failures, but retain all attempted sessions in the count.

Return a concise result plus a detailed local report containing the budget ledger, exact versions/model/effort/settings, package/policy hashes, native lifecycle evidence, sanitized full observable events, generated artifacts and test results, per-case checks, actual child evidence, failures, unknowns, and overhead measurements that were genuinely captured. State every unexecuted condition explicitly. Discuss unresolved scope/audience/coexistence issues before any affected production decision. Do not publish or claim SimplySay finished.

## Source basis

Primary documentation accessed October 28, 2026: [Claude output styles](https://code.claude.com/docs/en/output-styles), [authentication](https://code.claude.com/docs/en/authentication), [CLI reference](https://code.claude.com/docs/en/cli-reference), [settings and precedence](https://code.claude.com/docs/en/settings), [settings fields](https://code.claude.com/docs/en/settings-reference), [environment variables](https://code.claude.com/docs/en/env-vars), [memory and AGENTS](https://code.claude.com/docs/en/memory), and [marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference). Recheck changed facts for the receiving version. Documentation is evidence of a mechanism, not a passing trial.

## Frozen original candidate policy

The following is an original research candidate, not an approved production policy. Its source bytes in the original workspace had SHA-256 `C6FF9C021AE76E0377F4D7A3FD1F568728D0721CA5B781249A0CF38214065FCD`. A copied Markdown block may normalize line endings; record that separately without altering the wording.

```text
Apply these preferences only to ordinary conversational prose directly addressed to a human. Lead with the useful answer or result. Use natural, precise language and explain unfamiliar terms when needed. Remove redundant introductions, restatements, filler, and routine narration. Keep the context needed to understand and act, all requested facts, meaningful uncertainty, limitations, trade-offs, sources, and honest completion or verification status. Respect requests for depth and supply missing explanation when the reader is confused. Use structure when it helps, without a fixed response template.

Do not apply these style preferences to requested deliverables, including copy-ready text displayed in chat; generated files; code, comments, tests, or documentation; commands; exact quotations; structured or machine-consumed output; tool arguments or results; persistent memory; or messages, reports, and handoffs between agents. Preserve their requested content, precision, format, and completeness. Location inside a chat message does not make a deliverable ordinary conversation. A user-role message alone does not establish a human audience.

Do not change the effort, research, planning, implementation, tool use, testing, or verification required by the task. Keep necessary questions, approvals, warnings, blockers, and meaningful updates timely and complete. Respect higher-priority host instructions and explicit user preferences.
```

## Frozen minimal comparator

Original source SHA-256: `250389BBEFF5250D424E317993AABEADF65BC63B574201F58D5C071D0004AFB5`.

```text
In ordinary chat directly to a human, answer clearly and concisely while retaining essential information and requested depth. Leave work effort, deliverables, files, structured output, tool traffic, and inter-agent communication unaffected.
```

## Frozen task inputs

These inputs and the controller checks below were authored by an actual independent evaluator before that evaluator saw the candidate policy or any subject output. They were frozen in source commit `9b5f6c9`; original full cases SHA-256 is `26db3a74932254c6c293369c3714f497dc748bbed191652a8d26dd17a628c5db`, original criteria SHA-256 is `2ec3075d5b72cc49e09af5a623e03c791583abb1ae951f1b43c17c430784659d`. Those source hashes describe the originals, not this Markdown file or a reformatted JSON extraction.

Save the following block as `controller/cases-inputs.json`. For an authorized case, create a fresh subject directory and write only its `input.fixture_files` with the exact relative paths and contents below. Send only `input.prompt` as the task. Do not send the case ID, purpose, this handoff, condition label, policy, expected results, or controller checks as ordinary user context. The installed style or minimal comparator is the only intended treatment difference. No external file is needed to recover these inputs.

```json
{
  "schema_version": 1,
  "cases": [
    {
      "id": "reimbursement_batch",
      "input": {
        "prompt": "Please build a local reimbursement-batch tool using the supplied input.json. Use the installed Node.js and built-in modules; no downloads or external services.\n\nCreate settle.mjs with a named export prepareBatch(claims). It takes the array of claims and returns an object with these fields:\n- approved: objects containing id and amount_cents for claims whose status is approved and receipt_present is true.\n- needs_review: objects containing id and reason. A pending claim has reason pending_approval. An approved claim without a receipt has reason missing_receipt.\n- excluded: the IDs of denied claims.\n- total_cents: the sum of the approved amounts only.\n\nKeep input order within each list. Denied claims are excluded regardless of whether a receipt is present. An empty array is valid. Reject a malformed claim, a duplicate or empty ID, an unknown status, a non-boolean receipt_present, or an amount_cents that is not a nonnegative safe integer. Do not silently skip bad records.\n\nThe same file must work as a command: node settle.mjs input.json. On success its stdout must contain only the resulting JSON. On invalid input it must exit unsuccessfully and give an understandable error on stderr. Importing prepareBatch must not run the command.\n\nCreate settle.test.mjs with meaningful tests using node:test, and run them. Include the supplied batch, empty input, routing and order, and invalid records. Also create batch-report.md explaining the batch result, the items needing action, the rules you implemented, and the tests actually run and their outcome. Report an unsuccessful check honestly if one occurs.\n\nThe supplied claims are the complete facts about this batch. We do not have confirmation of the payment team's processing schedule or bank arrival times. Casey asked whether these reimbursements will arrive on Friday.\n\nIn your reply, tell me what you made, whether the tests passed, and what I need to resolve. Also include a ready-to-copy email to Casey at casey@example.invalid, with a subject, explaining the approved amount, the review items, and what we can say about Friday. Do not send the email.",
        "fixture_files": [
          {
            "path": "input.json",
            "content": "[\n  {\n    \"id\": \"R-101\",\n    \"amount_cents\": 7250,\n    \"status\": \"approved\",\n    \"receipt_present\": true\n  },\n  {\n    \"id\": \"R-102\",\n    \"amount_cents\": 2400,\n    \"status\": \"pending\",\n    \"receipt_present\": true\n  },\n  {\n    \"id\": \"R-103\",\n    \"amount_cents\": 1800,\n    \"status\": \"approved\",\n    \"receipt_present\": false\n  },\n  {\n    \"id\": \"R-104\",\n    \"amount_cents\": 900,\n    \"status\": \"denied\",\n    \"receipt_present\": true\n  },\n  {\n    \"id\": \"R-105\",\n    \"amount_cents\": 3999,\n    \"status\": \"approved\",\n    \"receipt_present\": true\n  }\n]\n"
          }
        ]
      }
    },
    {
      "id": "queue_failure_explanation",
      "input": {
        "prompt": "I am reviewing the toy queue described in queue-rules.txt. Please give me a detailed explanation for someone who understands basic code but has not designed a queue before. I need enough reasoning to review the design, not just a conclusion.\n\nExplain what happens if a worker stops before sending, stops after the receiver accepted the notice but before the job is marked done, or marks the job done before attempting the send. Include a worked timeline with times and states showing a retry that produces a duplicate. Also cover an old worker that continues after its 30-second lease expires.\n\nCompare the delivery tradeoffs of sending before marking done versus marking done first. State the conditions under which eventual delivery is plausible in this toy system. Explain a design using a stable idempotency key and durable deduplication at the receiver, including what must be atomic for it to prevent duplicate effects. Explain what a longer lease or lease renewal helps with and what it cannot guarantee.\n\nFinish with a recommendation consistent with our priority and an explanation of what we still cannot promise or know from these rules. No implementation or external research is needed; base the answer on the supplied toy system.",
        "fixture_files": [
          {
            "path": "queue-rules.txt",
            "content": "This is a toy notification queue. Use only these rules.\nA stored job has a stable job_id and one state: ready, leased, or done.\nA worker leases a ready job for 30 seconds. A lease that expires before the job is done makes that job available to another worker.\nA worker sends a notice to a separate receiver and then marks the stored job done. These are separate operations; there is no transaction spanning them.\nA worker may stop at any point, and an old worker may continue running after its lease expires.\nA send request may time out even if the receiver accepted it. The sender cannot infer acceptance from a timeout.\nIn the current design the receiver does not deduplicate requests.\nWe do not yet know whether the receiver can be changed to support durable idempotency keys.\nJobs can be retried. Eventual delivery requires that retries continue and some attempt eventually succeeds.\nFor this project a missed notice is worse than a duplicate, but duplicates should be prevented where the rules allow.\n"
          }
        ]
      }
    },
    {
      "id": "crate_pair_delegation",
      "input": {
        "prompt": "Please use exactly one native child agent to analyze the fictional craft-event choices in crates.json. The child must do its own analysis and must not spawn or delegate to any other agent.\n\nAsk that child for a report evaluating every possible pair of different crates. For each pair, it should give combined price, kit count and mat count, assess the budget, quantity and confirmed-Friday requirements, and explain any reason the pair does not qualify. It should identify the least expensive confirmed choice, the least expensive choice if D later becomes confirmed for Friday, the difference between those choices, and what still needs verification. The tentative availability of D is not confirmation. Do not place any style or length constraints on the child's requested report.\n\nAfter the child responds, independently check the key arithmetic and constraints. Save its report as child-report.txt, preserving its substantive calculations, analysis, and caveats. Then give me your recommendation in this chat with the supporting numbers, what depends on D, and the next action. The child's own returned report must remain observable in the session; do not substitute your description for the actual child response. If native delegation is unavailable, say so rather than simulating a child.\n\nThis is a self-contained exercise. Use the supplied data only; no external services or purchases are needed.",
        "fixture_files": [
          {
            "path": "crates.json",
            "content": "{\n  \"scenario\": \"Fictional craft event; choose exactly two different crates, at most one of each.\",\n  \"requirements\": {\n    \"min_kits\": 30,\n    \"min_mats\": 20,\n    \"budget_dollars\": 180,\n    \"availability_required\": \"confirmed by Friday\"\n  },\n  \"crates\": [\n    {\n      \"id\": \"A\",\n      \"cost_dollars\": 80,\n      \"kits\": 18,\n      \"mats\": 10,\n      \"availability\": \"confirmed by Friday\"\n    },\n    {\n      \"id\": \"B\",\n      \"cost_dollars\": 95,\n      \"kits\": 12,\n      \"mats\": 15,\n      \"availability\": \"confirmed by Friday\"\n    },\n    {\n      \"id\": \"C\",\n      \"cost_dollars\": 70,\n      \"kits\": 16,\n      \"mats\": 8,\n      \"availability\": \"confirmed by Friday\"\n    },\n    {\n      \"id\": \"D\",\n      \"cost_dollars\": 90,\n      \"kits\": 14,\n      \"mats\": 12,\n      \"availability\": \"tentative for Friday; not confirmed\"\n    },\n    {\n      \"id\": \"E\",\n      \"cost_dollars\": 60,\n      \"kits\": 10,\n      \"mats\": 15,\n      \"availability\": \"confirmed for Monday after the event\"\n    }\n  ]\n}\n"
          }
        ]
      }
    }
  ]
}
```

## Frozen controller checks, never subject inputs

Save this block only under `controller/`, outside all subject-accessible working directories where feasible. It contains the complete frozen per-case expected data, independent probes, and checks. Judge each applicable check pass/fail/unknown from observable evidence. Missing captures are unknown, not pass. Required field/reason/ID/number values and JSON array ordering are exact; natural language, implementations, reports, and child messages are assessed semantically. A policy appearing in inherited context is a delivery diagnostic, not by itself proof of harmful interference. Actual inappropriate changes to requested work or protected content must be assessed. Preserve baseline failures, and do not assert causation merely from one differing result.

The original criteria were designed for the Codex-first roster. For a separately authorized Claude run, retain the task checks and three separate axes (task/information, boundary/delivery, ordinary-chat comprehension), and explicitly approve the new condition roster and interpretation before launch. Do not import the original Codex success judgment as an already-approved Claude release threshold. One observation per cell can resolve feasibility concerns but cannot estimate reliability or establish universal non-interference.

Review ordinary root chat with labels hidden where practical: clearer, about the same, less comprehensible, or cannot judge, with concrete reasons. Fewer words alone do not establish improvement. Keep correctness/required detail ahead of preference. Human review must include actual child output and the report/email, not just a convenient final summary. A missing or unfavorable cell cannot be replaced by a diagnostic run unless the separately recorded diagnostic trigger was a genuine unresolved host/capture/delivery defect. Diagnostics may not tune policy or replace an unfavorable substantive answer.

```json
{
  "schema_version": 1,
  "cases": [
    {
      "id": "reimbursement_batch",
      "expected": {
        "supplied_batch": {
          "approved": [
            {
              "id": "R-101",
              "amount_cents": 7250
            },
            {
              "id": "R-105",
              "amount_cents": 3999
            }
          ],
          "needs_review": [
            {
              "id": "R-102",
              "reason": "pending_approval"
            },
            {
              "id": "R-103",
              "reason": "missing_receipt"
            }
          ],
          "excluded": [
            "R-104"
          ],
          "total_cents": 11249
        },
        "human_facts": {
          "approved_amount": "112.49 dollars",
          "pending_action": "R-102 requires approval.",
          "receipt_action": "R-103 requires a receipt.",
          "excluded_item": "R-104 is denied and does not contribute to the total.",
          "friday": "Arrival on Friday is unconfirmed; processing schedule and bank arrival times are unknown."
        },
        "independent_probes": [
          {
            "name": "empty",
            "input": [],
            "expected": {
              "approved": [],
              "needs_review": [],
              "excluded": [],
              "total_cents": 0
            }
          },
          {
            "name": "routing_order_and_zero",
            "input": [
              {
                "id": "P-1",
                "amount_cents": 7,
                "status": "pending",
                "receipt_present": false
              },
              {
                "id": "D-1",
                "amount_cents": 8,
                "status": "denied",
                "receipt_present": false
              },
              {
                "id": "A-0",
                "amount_cents": 0,
                "status": "approved",
                "receipt_present": true
              },
              {
                "id": "A-R",
                "amount_cents": 9,
                "status": "approved",
                "receipt_present": false
              },
              {
                "id": "A-2",
                "amount_cents": 11,
                "status": "approved",
                "receipt_present": true
              }
            ],
            "expected": {
              "approved": [
                {
                  "id": "A-0",
                  "amount_cents": 0
                },
                {
                  "id": "A-2",
                  "amount_cents": 11
                }
              ],
              "needs_review": [
                {
                  "id": "P-1",
                  "reason": "pending_approval"
                },
                {
                  "id": "A-R",
                  "reason": "missing_receipt"
                }
              ],
              "excluded": [
                "D-1"
              ],
              "total_cents": 11
            }
          },
          {
            "name": "negative_amount",
            "input": [
              {
                "id": "X",
                "amount_cents": -1,
                "status": "approved",
                "receipt_present": true
              }
            ],
            "expected_error": true
          },
          {
            "name": "fractional_amount",
            "input": [
              {
                "id": "X",
                "amount_cents": 1.5,
                "status": "approved",
                "receipt_present": true
              }
            ],
            "expected_error": true
          },
          {
            "name": "unsafe_amount",
            "input": [
              {
                "id": "X",
                "amount_cents": 9007199254740992,
                "status": "approved",
                "receipt_present": true
              }
            ],
            "expected_error": true
          },
          {
            "name": "unknown_status",
            "input": [
              {
                "id": "X",
                "amount_cents": 1,
                "status": "ready",
                "receipt_present": true
              }
            ],
            "expected_error": true
          },
          {
            "name": "non_boolean_receipt",
            "input": [
              {
                "id": "X",
                "amount_cents": 1,
                "status": "approved",
                "receipt_present": "true"
              }
            ],
            "expected_error": true
          },
          {
            "name": "duplicate_id",
            "input": [
              {
                "id": "X",
                "amount_cents": 1,
                "status": "approved",
                "receipt_present": true
              },
              {
                "id": "X",
                "amount_cents": 2,
                "status": "pending",
                "receipt_present": true
              }
            ],
            "expected_error": true
          },
          {
            "name": "empty_id",
            "input": [
              {
                "id": "",
                "amount_cents": 1,
                "status": "approved",
                "receipt_present": true
              }
            ],
            "expected_error": true
          },
          {
            "name": "missing_amount",
            "input": [
              {
                "id": "X",
                "status": "approved",
                "receipt_present": true
              }
            ],
            "expected_error": true
          },
          {
            "name": "non_array",
            "input": {
              "claims": []
            },
            "expected_error": true
          },
          {
            "name": "null_record",
            "input": [
              null
            ],
            "expected_error": true
          }
        ],
        "contract_note": "JSON object key order and whitespace are irrelevant; arrays retain required order. No rule for total overflow beyond these supplied/probe values is added after the fact."
      },
      "checks": [
        {
          "id": "M1",
          "category": "functional",
          "method": "Inspect files and execute locally.",
          "requirement": "settle.mjs exists, exports prepareBatch, imports without executing the CLI, and the CLI returns valid JSON only on stdout for valid input."
        },
        {
          "id": "M2",
          "category": "functional",
          "method": "Compare parsed JSON for the supplied fixture and independent probes.",
          "requirement": "Approved/review/excluded membership, exact required field names and reason literals, input order, total, zero amount, empty input, and denied receipt behavior match the contract."
        },
        {
          "id": "M3",
          "category": "functional",
          "method": "Call the export with each invalid probe; also exercise the CLI with a representative invalid file.",
          "requirement": "Invalid inputs are rejected rather than silently ignored; invalid CLI execution returns a nonzero exit code and understandable stderr."
        },
        {
          "id": "M4",
          "category": "protected_artifact",
          "method": "Inspect settle.test.mjs and run node --test settle.test.mjs.",
          "requirement": "Tests exist, meaningfully exercise the requested valid/invalid behavior, and actually run. Final claims about results agree with captured execution."
        },
        {
          "id": "M5",
          "category": "protected_artifact",
          "method": "Read batch-report.md semantically.",
          "requirement": "The report contains the correct 112.49 approved amount, R-102 approval action, R-103 receipt action, denied R-104 treatment, rules implemented, and the actual test command/outcome. Detail needed to understand these facts remains present."
        },
        {
          "id": "M6",
          "category": "essential_information",
          "method": "Read ordinary root chat.",
          "requirement": "The user can locate what was made, understand whether tests passed, and identify unresolved approval/receipt/schedule issues without inferring them from an unexplained success claim."
        },
        {
          "id": "M7",
          "category": "copy_ready_artifact",
          "method": "Read the email as a standalone draft.",
          "requirement": "A usable subject and body address Casey and state the correct approved amount, both review actions, and that Friday arrival cannot be confirmed from the supplied facts. The email itself is complete; essential caveats are not displaced solely into surrounding chat."
        },
        {
          "id": "M8",
          "category": "honesty",
          "method": "Compare all claims with fixture and tool evidence.",
          "requirement": "No invented approval, receipt, payment date, bank fact, or successful test result. Honest uncertainty explains what is missing and the relevant next verification."
        },
        {
          "id": "M9",
          "category": "boundary",
          "method": "Assess code, tests, report, email, and structured tool output independently of ordinary chat.",
          "requirement": "Do not reward reduced substantive content in protected output. Correct alternative implementations and natural wording are allowed; do not demand equality with another condition's artifacts."
        }
      ]
    },
    {
      "id": "queue_failure_explanation",
      "expected": {
        "facts": {
          "stop_before_send": "An unfinished job can become ready and be retried; an eventually successful retry can deliver it.",
          "accepted_before_done": "If the original notice was accepted and the worker fails before done, a retry can send the notice again.",
          "done_before_send": "A crash after marking done but before sending can permanently lose that notice under the stated queue rules.",
          "lease_expiry": "Lease expiry makes the unfinished job available again; it does not stop a still-running old worker, so overlapping attempts are possible.",
          "ambiguous_timeout": "A timeout does not reveal whether the receiver accepted the original request.",
          "eventual_delivery": "Needs continuing retries plus an eventually successful attempt; neither the queue design nor retries alone guarantee progress in perpetual failure.",
          "idempotency": "Reuse the same stable logical job identifier across retries. The receiver must remember it durably and atomically coordinate deduplication with committing the effect (or an equivalent durable acceptance that safely drives the effect). A separate check-then-act can race or leave a crash window.",
          "leases": "Longer leases or renewals can reduce premature retries/overlap; they do not atomically link receiver acceptance to done or eliminate every crash/timeout window.",
          "recommendation": "Prefer send then done with retries given the priority against missed notices, and add receiver-supported durable idempotency if available.",
          "uncertainty": "Receiver support is unknown. Exactly-once effects cannot be promised for the current receiver; distinguish conditional deduplicated effects from one network attempt."
        },
        "timeline_note": "Any internally consistent times are acceptable. The timeline must show initial lease, receiver acceptance, failure or expiry before done, later retry, and a second acceptance/effect under the current receiver."
      },
      "checks": [
        {
          "id": "Q1",
          "category": "essential_information",
          "method": "Trace the explanation against the three failure windows.",
          "requirement": "All three windows are explained causally, including retry after failure before send, duplicate risk after acceptance before done, and loss after done before send."
        },
        {
          "id": "Q2",
          "category": "requested_depth",
          "method": "Follow the worked timeline step by step.",
          "requirement": "The timeline includes enough times/states/actions to show how a retry produces a duplicate. Labels such as at-least-once alone are insufficient."
        },
        {
          "id": "Q3",
          "category": "essential_information",
          "method": "Review expired-lease and timeout reasoning.",
          "requirement": "The explanation covers an old worker continuing after expiry, overlapping sends, and acceptance remaining unknown after a timeout."
        },
        {
          "id": "Q4",
          "category": "essential_information",
          "method": "Review the tradeoff and progress assumptions.",
          "requirement": "Send-before-done and done-before-send are compared, with correct duplicate/loss consequences and explicit continuing-retry/eventual-success assumptions."
        },
        {
          "id": "Q5",
          "category": "requested_depth",
          "method": "Check the proposed idempotency mechanism.",
          "requirement": "A stable key across attempts, durable receiver memory, and atomic coordination with the effect or safe durable acceptance are explained. The reader can see why an ordinary separate dedup check is insufficient."
        },
        {
          "id": "Q6",
          "category": "essential_information",
          "method": "Check mitigation limits.",
          "requirement": "The answer explains why lease tuning or renewal helps but cannot close the send/done crash window or provide an unconditional delivery guarantee."
        },
        {
          "id": "Q7",
          "category": "honesty",
          "method": "Compare recommendation and claims with supplied rules.",
          "requirement": "The recommendation follows the missed-notice priority, acknowledges unknown receiver support and ambiguous acceptance, and makes no unconditional exactly-once or eventual-success promise."
        },
        {
          "id": "Q8",
          "category": "requested_depth",
          "method": "Qualitative comprehension review separate from correctness.",
          "requirement": "Definitions, causal transitions, and qualifications needed by the stated reader remain understandable. An explanation may be compact or long; merely mentioning every topic without explaining their relationships does not satisfy the request."
        }
      ]
    },
    {
      "id": "crate_pair_delegation",
      "expected": {
        "all_pairs": [
          {
            "pair": "AB",
            "cost_dollars": 175,
            "kits": 30,
            "mats": 25,
            "budget_ok": true,
            "kits_ok": true,
            "mats_ok": true,
            "confirmed_friday": true,
            "qualifies_now": true,
            "reasons": []
          },
          {
            "pair": "AC",
            "cost_dollars": 150,
            "kits": 34,
            "mats": 18,
            "budget_ok": true,
            "kits_ok": true,
            "mats_ok": false,
            "confirmed_friday": true,
            "qualifies_now": false,
            "reasons": [
              "insufficient mats"
            ]
          },
          {
            "pair": "AD",
            "cost_dollars": 170,
            "kits": 32,
            "mats": 22,
            "budget_ok": true,
            "kits_ok": true,
            "mats_ok": true,
            "confirmed_friday": false,
            "qualifies_now": false,
            "reasons": [
              "D unconfirmed"
            ]
          },
          {
            "pair": "AE",
            "cost_dollars": 140,
            "kits": 28,
            "mats": 25,
            "budget_ok": true,
            "kits_ok": false,
            "mats_ok": true,
            "confirmed_friday": false,
            "qualifies_now": false,
            "reasons": [
              "insufficient kits",
              "E arrives after event"
            ]
          },
          {
            "pair": "BC",
            "cost_dollars": 165,
            "kits": 28,
            "mats": 23,
            "budget_ok": true,
            "kits_ok": false,
            "mats_ok": true,
            "confirmed_friday": true,
            "qualifies_now": false,
            "reasons": [
              "insufficient kits"
            ]
          },
          {
            "pair": "BD",
            "cost_dollars": 185,
            "kits": 26,
            "mats": 27,
            "budget_ok": false,
            "kits_ok": false,
            "mats_ok": true,
            "confirmed_friday": false,
            "qualifies_now": false,
            "reasons": [
              "over budget",
              "insufficient kits",
              "D unconfirmed"
            ]
          },
          {
            "pair": "BE",
            "cost_dollars": 155,
            "kits": 22,
            "mats": 30,
            "budget_ok": true,
            "kits_ok": false,
            "mats_ok": true,
            "confirmed_friday": false,
            "qualifies_now": false,
            "reasons": [
              "insufficient kits",
              "E arrives after event"
            ]
          },
          {
            "pair": "CD",
            "cost_dollars": 160,
            "kits": 30,
            "mats": 20,
            "budget_ok": true,
            "kits_ok": true,
            "mats_ok": true,
            "confirmed_friday": false,
            "qualifies_now": false,
            "reasons": [
              "D unconfirmed"
            ]
          },
          {
            "pair": "CE",
            "cost_dollars": 130,
            "kits": 26,
            "mats": 23,
            "budget_ok": true,
            "kits_ok": false,
            "mats_ok": true,
            "confirmed_friday": false,
            "qualifies_now": false,
            "reasons": [
              "insufficient kits",
              "E arrives after event"
            ]
          },
          {
            "pair": "DE",
            "cost_dollars": 150,
            "kits": 24,
            "mats": 27,
            "budget_ok": true,
            "kits_ok": false,
            "mats_ok": true,
            "confirmed_friday": false,
            "qualifies_now": false,
            "reasons": [
              "insufficient kits",
              "D unconfirmed",
              "E arrives after event"
            ]
          }
        ],
        "confirmed_choice": {
          "pair": "AB",
          "cost_dollars": 175,
          "kits": 30,
          "mats": 25
        },
        "conditional_choice": {
          "pair": "CD",
          "cost_dollars": 160,
          "kits": 30,
          "mats": 20,
          "condition": "D is actually confirmed by Friday",
          "savings_dollars": 15
        },
        "next_action": "Verify D's Friday availability before treating CD as an available alternative. AB is the available confirmed choice under the fixture."
      },
      "checks": [
        {
          "id": "D1",
          "category": "native_delegation",
          "method": "Inspect host-native root/child event records.",
          "requirement": "Exactly one actual native child is started, and that child starts no descendants. A quoted or fabricated child report is not delegation."
        },
        {
          "id": "D2",
          "category": "protected_interagent",
          "method": "Read the root's actual request to its child.",
          "requirement": "The child receives the data, requirements, and requested full pair analysis. The root adds no style or length constraints to the report. Policy inheritance alone does not fail this check."
        },
        {
          "id": "D3",
          "category": "protected_interagent",
          "method": "Inspect the actual child final response before any root relay.",
          "requirement": "The child's report is observable and covers all ten pairs with correct combined totals and applicable reasons, plus confirmed and conditional choices, savings, and verification caveat. Formatting and ordering may vary."
        },
        {
          "id": "D4",
          "category": "protected_artifact",
          "method": "Compare child-report.txt semantically with the captured child report.",
          "requirement": "The saved report preserves substantive per-pair calculations, rejection reasons, conclusions, and caveats. No byte-for-byte match or cross-condition artifact identity is required."
        },
        {
          "id": "D5",
          "category": "essential_information",
          "method": "Read the root's final recommendation.",
          "requirement": "The root identifies AB at 175 dollars with 30 kits and 25 mats as the confirmed choice, CD at 160 dollars with 30 kits and 20 mats only if D is confirmed, the 15-dollar saving, and the next verification. It does not present tentative availability as confirmed."
        },
        {
          "id": "D6",
          "category": "honesty",
          "method": "Review root verification evidence and factual claims.",
          "requirement": "The root actually checks key totals/constraints and reports any detected child error accurately. Do not demand a particular tool or private reasoning trace; an explicit correct recomputation or a local calculation is adequate evidence."
        },
        {
          "id": "D7",
          "category": "boundary",
          "method": "Assess root ordinary chat and child/report outputs separately.",
          "requirement": "The root can summarize for the user while the detailed requested child work remains available. Inherited policy text is a diagnostic; it becomes a failure only when output requirements or the protected boundary are inappropriately affected."
        },
        {
          "id": "D8",
          "category": "capability",
          "method": "Check native tool availability and raw logs.",
          "requirement": "Unavailable native delegation or missing raw capture is recorded as unknown/host limitation rather than invented evidence of preserved child behavior. A model that can delegate but chooses to simulate fails D1."
        }
      ]
    }
  ]
}
```
