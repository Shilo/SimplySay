# Independent shared-runner verification

2026-10-29. Preparation conversation n01, task 2. Scope: root's current changes to the shared workflow runner and new reader-phase wrapper, plus synthetic/offline checks. This is not a native installed-plugin, credential, provider or model trial. I changed only this report and experiments/reader-v1/runner-check.cjs; root owns the runner/wrapper. No child, external model call, network request, native host command or real sign-in read occurred.

## Verdict and corrected defects

**No remaining dispatch-blocking defect found in the reviewed changed paths after the fixes below.** Unit/candidate/case/evaluation scope must still be completed and frozen before a live launch. This is bounded source and synthetic verification, not release validation or proof of native disabled behavior.

Three concrete guards were raised to root before dispatch and corrected by root:

1. The initial change checked cumulative task limits only when reserving a conversation. Multiple active subjects could pass that gate and later exceed a work-unit task limit. The final per-turn lock checks cumulative usage, sequential task numbering and the subject's own task limit before incrementing or issuing turn/start. Interleaved synthetic subjects now stop exactly at their shared limit.
2. Unexpected native conversations on a separate ledger initially inherited the legacy e31/e32 reserve labels. The new route now uses an unexpected-ID hash label; the legacy route retains its old reserve naming. This avoids labeling new-phase unexpected activity as historical trial identities while still counting it and blocking dispatch.
3. The first per-turn correction still ignored a newly set dispatch stop or withdrawn allowed-subject entry. The offline source-extracted guard reproduced a task count increment despite dispatch_blocked=true. Root added both checks inside the same lock. The final tests reject stopped and withdrawn subjects before incrementing. The earlier failing reproduction remains a recorded defect, not a model failure.

## What was checked

| Area | Finding |
| --- | --- |
| Separate ledger | Reserve/update writes use the requested ledger; its conversation/task totals are recomputed from starts. The historical ledger remained byte-identical during tests. Acquired locks are removed after success/failure; an existing lock owned by another caller is not removed. |
| Legacy/default route | Omitting the new options retains the old ledger path/shape and default authorization key. The new strict per-turn safety check also applies there; this is a deliberate tighter stop guard, not identical behavior at an exhausted cap. Existing frozen old source/results remain historical. |
| Installed-disabled | Both enabled and disabled arms install through the native branch before app-server creation; disabled then invokes the native disable control. Preflight checks actual installed cache bytes, not catalog presence alone; effective plugin enabled=false and no active owned hook are required. An unlisted disabled hook or an explicitly inactive listed hook is accepted. Missing/corrupt cache, active control hook or ineffective disabled setting is rejected. These branch outcomes were tested with synthetic RPC/files only. |
| Enabled and absent | The prior enabled byte/trust path still passes the synthetic fixture. An owned hook in absent is rejected. The first-turn startup gate requires one matching completed hook in enabled and none in disabled/absent. Its control description still says “absent profile” for disabled too; this is a minor wording issue, not a changed condition or an installed-disabled pass. |
| Auth cleanup | The same finally cleanup applies to all three conditions. The cleanup helper removed only a synthetic auth marker under the substituted fixture base and rejected an outside path. No real cache/token was read or copied. Real teardown/provider failures were not exercised in this task. |
| Native identity/access | Fresh trial directories cannot be reused. One native root is created and checked; foreign native IDs fail the turn and are reconciled as counted unexpected conversations. Apps/delegation remain disabled, and capture rejects requests for more access. New-phase scope does not reuse or resume historical native roots. These conclusions combine static review with existing offline event tests, not new native session observation. |
| Phase wrapper | It requires a ready unit with the specific owner-authorization key, checks the existing pinned binary hash, permits only unit-listed IDs, passes the separate reader ledger/authorization key and uses the existing strict included-use admission function. The unit file was still absent at inspection, so it was not launch-ready. Include unit/wrapper/candidate/case/evaluator inputs in the eventual freeze; mutable usage counts should remain separate from immutable inputs. |

The wrapper is a scope adapter around existing installation/capture, not an installed component or another model service. It does not replace stock prompts or broaden subject project/tool/network access. Existing auth source validation rejects API-key mode; the included-use gate requires explicit provider permission below limits with no spend/rate block. Those protections were inspected in source, not independently queried from an account.

## Offline executions actually completed

- `node experiments/reader-v1/runner-check.cjs`: **17 checks passed**. Real runner source is loaded into a VM with native commands/RPC/default-ledger writes replaced. Three version readbacks are synthetic return values, not three executed host commands. The per-turn and unexpected-ID tests extract the actual current guard expressions instead of maintaining another copied implementation. Checks cover separate/default ledger behavior, locks, interleaved caps, own limit/sequence, stopped/withdrawn subjects, unexpected naming, disabled positive/negative cases, enabled/absent branches and constrained auth-marker cleanup.
- `node experiments/workflow-v1/capture-check.cjs`: **18 checks passed**, including private-content exclusion, public phases, blocked requests/delegation and historical-usage matching.
- `node experiments/workflow-v1/resume-capture-check.cjs`: **7 scenarios passed**, retaining the prior historical-usage race fix and rejecting foreign/unknown turns and historical messages/completions. No native session was created.

The first new test execution hit a test-only cross-VM array-prototype assertion on the stubbed version arguments. It was corrected to compare the argument representation; it did not indicate a runner or native-host failure. A subsequent source-extracted stop-gate test failed as described above and passed after root's actual fix. No failed model attempt, retry or hidden live diagnostic is concealed by these local corrections.

Tested runner SHA-256: `9620814c0400e91dcc94b0353991e88c65745e2819a8cdc91050b1eb98a9bdb5`. If source changes again, re-run the relevant local checks before freezing. The checks deliberately do not claim installation support, actual model-visible V5/new-candidate delivery, semantic obedience, useful communication, native child scope, desktop notifications, provider permission or release readiness. Those remain separate observations for the authorized experimental plan.

Root follow-up: corrected only the control startup-gate description to say control profile. The 17 synthetic runner checks passed again on SHA e2f2fc531713109fe092d8bf3dc88bb0e4295cd5ff9bfc888ad4bef82a70c04e. The unchanged capture/resume suites were not repeated. No model/native/provider call.
