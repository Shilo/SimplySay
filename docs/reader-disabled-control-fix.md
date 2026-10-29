# Corrected installed-disabled control

2026-10-29. Counted development-agent n01 task 4. Ownership: the shared runner's disabled-control correction, its synthetic runner check, and this report. Other agents own the comparison wrapper/unit/manifests. No native host, provider, model, child agent or real-credential call was made by this task; no commit was made.

## Confirmed failure and retained evidence

Root's actual n07 installed-disabled attempt stopped with status 2 because Codex backend 0.165.0-alpha.1.2 does not support the attempted `plugin disable` CLI command. It failed before any native thread or response turn. Its original failure remains retained. N05 absent and N06 enabled had each completed three A turns; this failure did not interrupt those completed response conversations.

Root then verified a supported configuration mechanism on the failed disposable profile without credentials, a thread or a model turn: read configuration, write the plugins table with only the owned entry's enabled state changed to false, and reload user configuration. The metadata readback showed enabled=false, zero active owned hooks and unchanged unrelated/default settings. These are root's executed metadata findings, not a native test independently rerun by this agent. See experiments/reader-v1/evidence/disabled-control-diagnosis.json.

The earlier 17 synthetic runner checks did not validate native CLI command availability. They exercised preflight against an already-disabled synthetic configuration; their pass was not evidence that the installation branch could disable the real plugin. The failed native attempt exposes that integration gap. Its failure is not a communication outcome or a missing answer to be graded.

## Minimal correction

Removed the unsupported native disable invocation. Both installed arms still use the unchanged local native marketplace/add path before creating the app-server. Only disabled preflight now performs this sequence:

1. Initialize the app-server.
2. Read effective configuration.
3. Call config/batchWrite with keyPath=plugins, an upsert value preserving all existing plugin entries/defaults and all other owned-entry fields, and enabled=false only for the owned selector. Target the same disposable profile's config.toml and set reloadUserConfig=true.
4. Discover hooks, verify no active owned hook, verify actual installed cache bytes, and require effective enabled=false before any thread/turn is created.

The later installed-cache/config checks and no-startup gate remain. Absent/enabled behavior, capture, prompts, candidate policy, task checks and protected outputs were not changed. The source change is restricted to the disabled branch; it is not a system-prompt override or a policy reminder.

## Offline verification actually executed

- **21 synthetic runner checks passed.** The fake RPC now begins with an enabled installed entry and changes it only after the configuration write. It checks initialization/read/write/discovery order, correct profile target, reload/upsert arguments, retention of unrelated/default/owned fields, already-disabled idempotence, failed or ineffective writes, active-hook rejection and corrupt/missing actual cache rejection. Existing ledger, stop gates, identity naming and auth-marker cleanup checks still pass.
- The test asserts the unsupported native disable command is absent from runner source. Its command stub permits only a synthetic version readback; no native process is executed. Five version readbacks in this run are synthetic values, not host invocations.
- **18 existing capture checks passed**, including phase/privacy and blocked-access/delegation handling.
- **7 existing resume-race scenarios passed**, preserving the historical-usage correction and foreign/unknown-turn rejection.

No real sign-in was read/copied and the historical ledger stayed unchanged during these tests. Tested runner SHA-256: `a154bdfc1b8624903e4876f2ec5997da6f9528be3bae1017d0f0d9b2b39143d4`.

## Corrected comparison and limits

The supported native configuration mechanism has metadata evidence, while a successful new disabled response conversation remains pending. Root will record the new freeze and fresh N13 disabled assignment, preserve failed N07 and its original freeze, and reuse unaffected completed N05/N06 results with that provenance stated. They are completed saved references, not fresh repetitions. No response or reviewer was launched by this fix.

If the new disabled profile still has an active hook, wrong cache bytes, wrong configuration, unavailable included access or unexpected native activity, the existing gates fail before crediting a communication result. No extra paid route, provider-limit bypass, direct Claude execution, production change or publication is authorized by this correction.
