# Independent pilot controller review

Status: **V3 control repair passes source and synthetic review for the remaining planned, unpaired enabled delegation attempt**. Live V2 evidence invalidated the original guard/capture assumptions; the corrected script now covers the actual name, with native execution still to be observed. The runtime correction below remains supported. This reviewer launched no evaluation subject, copied no credentials, and changed no controller or host configuration. It executed extracted guard scripts against synthetic inputs, parse-checked controller files, and inspected selected saved native evidence. The pilot remains experimental. Existing owner authorization permits a narrowly scoped disposable ChatGPT sign-in cache copy with deletion afterward, not arbitrary credential or configuration copying.

## V2 delegation counterexample and correction

The parent reports that baseline delegation `r07` failed with provider capacity after creating a native child. This reviewer independently inspected selected saved records: process exit 1, capacity error, `authCopyRemoved: true`, trusted user PreToolUse hook with bare `spawn_agent` matcher, existing guard script, and **no `spawn-used` claim marker**. Root turn metadata reports V2. The root rollout records a `spawn_agent` function call with namespace `collaboration`, and the child file's own session metadata links a distinct native child to that root at depth one. No message ciphertext, secret key or private reasoning was printed or decrypted. The parent charged both root and child; zero observed children in `result.json` is an observer miss, not evidence that no child existed.

The earlier source assessment generalized the canonical `spawn_agent` hook spelling to V2 incorrectly. [Registry normalization](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/tools/registry.rs#L886-L901) normalizes only default and V1 namespaces. [ToolName construction](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/protocol/src/tool_name.rs#L15-L46) preserves the namespace, and [legacy flattening](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/tools/mod.rs#L40-L56) concatenates namespace and name **without a separator**. For the observed V2 call, the hook-facing value is therefore `collaborationspawn_agent`. It is not bare `spawn_agent` or dotted `collaboration.spawn_agent`.

The [hook matcher](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/hooks/src/engine/matcher.rs#L8-L34) treats bare letters/underscores/alternation as exact alternatives. Thus the original bare matcher misses V2; the original script also returns before checking child identity or claiming a slot when given the V2 name. Independent zero-model reproduction with the unchanged guard SHA-256 `7a3198cf150fa065113503000e2c1a047bd89c9fea29af01fbba88439b234f5e` confirmed that both synthetic V2 root and child inputs exit 0 with empty output and no claim. Evidence is retained separately in `ss-guard-namespace-review-xx9ASK/results.json`. The prior eight passing tests remain real tests, but they used the wrong name for this native surface and did not establish integrated budget enforcement.

For the pinned host, a candidate control repair is an exact matcher `spawn_agent|collaborationspawn_agent` plus script recognition of those same two strings before the atomic claim and child-origin check. Repairing only the matcher is insufficient. Test root, child, repeat and concurrent requests using the actual V2 flattened name, and confirm the exact native trust definition. Keep policy, grading and task unchanged; record any control/capture amendment before another session. Do not call the repaired guard active merely because its script and metadata look correct: native execution and claim evidence remain required, and host hook failures can still fail open.

### V3 repair independently checked

Fully read controller SHA-256 `2159812fcb5b122f9e2597df9ec7058b54fedd249627a52d123ee2b74fa4c582` and `docs/pilot-delegation-diagnostic.md`. Its anchored matcher is `^(spawn_agent|collaborationspawn_agent)$`; the script accepts both names, logs only tool name and a child-context boolean, rejects child-origin requests, and uses the same exclusive claim to reject subsequent spawns. Its V3 amendment checks the nine-slot ledger point and absence of r08, binds the new source hashes to the prior manifest digest, selects only r08, and uses a separate `runs-v3` directory. Original manifests and results have separate unchanged paths. Cases, criteria, policy and minimal-control hashes still match the four frozen identities recorded below.

Extracted revised guard SHA-256 `fae6c38ab10e59982c9b3ca1f5cd25a90e8ca417f9dbc0ef73f0e829242c924e` and tested it in reviewer temporary storage, without executing the controller or Codex. **Sixteen result checks passed:** first root, repeated root and child requests for each of the bare and V2 names; malformed JSON; nonmatching tool; claim-write failure; safe-log write failure; and winner/loser checks for simultaneous bare-name, V2-name and mixed-name pairs. Each race allowed exactly one request and denied the other. Every deny returned valid explicit deny JSON, nonempty stderr and exit 2; allowed requests returned empty stdout/stderr and exit 0. Six matcher assertions accepted exactly the two intended names and rejected four other spellings. Thirteen generated log entries contained only `tool` and boolean `child`; supplied synthetic message/session values were absent. Evidence: disposable `ss-v3-guard-review-uV2pqb/results.json`.

This verifies the revised script and the simple anchored pattern, not active native dispatch. After the planned r08 attempt, check the real guard event and claim against actual native child metadata. An absent log/claim again invalidates native enforcement regardless of script tests. The unchanged CLI child observer remains incomplete for V2 and must not be the sole count/capture source. Any result remains unpaired because r07 failed; opaque incoming directives remain unknown even if an ordinary child report is recoverable. No baseline retry or policy/grade change is authorized by this control repair.

### CLI capture is a lossy view of V2

The actual CLI stream contained wait events with empty receiver arrays, no serialized spawn event, then the capacity error. Source supports that limitation: [V2 spawning](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/tools/handlers/multi_agents_v2/spawn.rs#L45-L82) records the collab call through analytics, while [public activity emission](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/tools/handlers/multi_agents_v2/spawn.rs#L145-L166) uses SubAgentActivity. The [exec JSON mapper](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/exec/src/event_processor_with_jsonl_output.rs#L224-L311) drops unsupported items and several V2 collaboration tools. Its supported collab schema alone did not prove that every V2 spawn or message would be emitted. Reconcile real root/child identities from native metadata and count every attempt; an empty receiver list or absent CLI item never means zero children.

The native read API is a supported zero-model avenue for retained history: [ThreadReadParams](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/app-server-protocol/src/protocol/v2/thread.rs#L1601-L1621) accepts `{threadId, includeTurns: true}`. The [read handler](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/app-server/src/request_processors/thread_processor.rs#L2781-L2823) reads stored/live history separately from resume and turn-start. Paginated histories also offer `thread/turns/list` and `thread/items/list`. Read only the owned pilot threads; inspect public user/agent messages and activity, not private reasoning, and make no turn/start, resume or provider call.

That API is not a promised decryption facility. Its [history builder](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/app-server-protocol/src/protocol/thread_history.rs#L397-L413) explicitly ignores InterAgentCommunication and its metadata. An inherited root user message in a fork is not the actual child directive. If the supported API does not expose the incoming native request or returned report, keep the corresponding protected-communication check unknown. Do not search secret keys, decrypt stored messages, fabricate a relay, or substitute a saved root paraphrase.

`r07` remains infrastructure unknown for the requested child report, with two charged sessions. The parent reports nine sessions used and one reserve left; that reserve cannot fund a replacement baseline root plus child. A remaining planned enabled root/child could at most establish unpaired task compatibility if properly bounded and captured; it cannot repair the absent matched baseline or establish causal communication benefit. Before spending it, fix the actual guard name and establish supported capture, or defer that boundary and return the partial pilot. Do not silently switch to V1, another model, a paid judge, or revised tasks to obtain a favorable result. The owner checkpoint must retain these limitations.

## First live baseline: execution blocked, not a style result

The parent launched `r01`; this reviewer did not. Its saved result reports exit 0, no timeout, no children, one planned slot, and `authCopyRemoved: true`. The parent reports no generated files or tests. Saved stderr records two `exec_command` requests rejected by policy, including a simple synthetic input-file read. The saved `turn_context` independently confirms effective `sandbox_policy: read-only` and a managed filesystem containing only a root/read entry. Multi-agent was disabled. Only metadata and error records were selected; private reasoning was not inspected.

The configuration API had reported `sandbox_mode: workspace-write`, while the native sandbox log repeatedly reported backend selection `disabled` and native MXC availability `true`. Treat `r01` as a retained infrastructure unknown for the work/file boundary, consuming its session. Exit 0 and raw config were insufficient preflight checks. This is not evidence of candidate-policy damage: the candidate was absent.

### Pinned source explanation and next diagnostic

In Codex 0.163.0, Windows with a disabled native sandbox backend [downgrades legacy workspace-write to read-only](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/config/src/config_toml.rs#L748-L795). [Exec argument handling](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/exec/src/lib.rs#L330-L334) leaves the CLI sandbox override optional and passes it through; the missing explicit `--sandbox` alone does not explain or fix this platform fallback.

Do not blindly copy the real profile's `windows.sandbox = elevated` setting. The parent reports that enum is used by the existing host, but a fresh `CODEX_HOME` has separate readiness state. [Native readiness](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/windows-sandbox-rs/src/identity.rs#L69-L85) requires a versioned marker and sandbox-user state. The [elevated preparation path](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/windows_sandbox.rs#L180-L209) can invoke setup when incomplete. No sandbox secret copying or account/admin setup is authorized here. Unelevated execution also [prepares legacy security and applies filesystem ACL rules](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/windows-sandbox-rs/src/unified_exec/backends/legacy.rs#L358-L383); it is not a demonstrated mutation-free substitute.

The reviewed MXC path is a better candidate for a credential-free probe. The full Codex wrapper files `mxc-sandbox/src/lib.rs`, `windows.rs`, and `native.rs` were read, plus the policy builder and relevant launcher paths. Native launch [requires usable process security support](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/mxc-sandbox/src/windows.rs#L24-L58), [rejects permissive learning mode](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/mxc-sandbox/src/native.rs#L16-L39), and its [policy explicitly forbids DACL mutation fallback](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/mxc-sandbox/src/policy.rs#L262-L308). These reviewed paths contain no sandbox-account or elevated setup call. This is a source-backed inference that the existing packaged MXC backend can be probed within task permissions, not a claim that a probe succeeded or the transitive SDK was fully audited.

Recommended sequence before launching C:

1. Record the earliest defect and diagnostic question: can the existing packaged native MXC backend execute a fixed local read/write check under the intended task permissions, with no account setup, copied sandbox secrets, permission/rule bypass, network access, or global configuration change?
2. Use an auth-free disposable profile, task directory and fixed synthetic probe. The pinned CLI selects the native host through `codex sandbox`, without a `windows` subcommand; command arguments follow `--`. Keep managed requirements in force. For a legacy configuration, this debug command [defaults to read-only unless a `sandbox_mode` CLI override is explicit](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/cli/src/debug_sandbox.rs#L638-L696). A normal configuration candidate is `-c sandbox_mode="workspace-write" -c windows.sandbox="mxc" sandbox -- <absolute-node> <synthetic-probe>`, launched from the probe task directory. Do not supply a named permission profile that omits managed requirements or fabricate sandbox-state JSON.
3. Native MXC selection is designed to fail closed if unavailable. If it is rejected by requirements, unavailable, or requires installation/admin/global changes, preserve the failure and stop affected trials for the owner decision. Do not fall back to unrestricted execution, ignore-rules, the real user profile, extra credentials, another host, or account provisioning.
4. If the credential-free probe succeeds, record a separately named baseline diagnostic reservation before any model starts. Keep the frozen prompt, fixtures, candidate policy and criteria unchanged. Disclose the runtime repair and original failed baseline; do not overwrite or retroactively score it as successful. Reconfirm the effective turn permissions and actual file/tool results. One diagnostic root consumes one of the two reserve sessions; a later diagnostic root plus child needs two slots and cannot fit a one-slot remainder.

This reviewer did not execute Codex, the proposed native probe, or any diagnostic/model session. No auth or sandbox secret file was read or copied during this investigation. Source research and selected local metadata inspection do not consume evaluation sessions. The parent remains responsible for the central ledger and bounded execution.

### Native probe follow-up: temporary write roots

The parent subsequently reported an auth-free, model-free MXC probe: synthetic fixture read and inside-workspace write succeeded, but a deliberate parent-directory write also succeeded and triggered the probe's failure assertion. This reviewer has not yet inspected its saved artifacts. The parent path was inside the operating system temporary directory; do not describe that observation as an MXC escape without checking configured grants.

Pinned source explains a likely cause. [Default workspace-write construction](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/protocol/src/models.rs#L484-L516) includes temporary write roots. [Filesystem policy construction](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/protocol/src/permissions.rs#L759-L797) adds `Tmpdir` and `SlashTmp` write entries only when their exclusion flags are false. [MXC temporary-path binding](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/mxc-sandbox/src/policy.rs#L67-L109) resolves `Tmpdir` against both `TEMP` and `TMP`, case-insensitively, and drops `SlashTmp` on Windows.

Set both `sandbox_workspace_write.exclude_tmpdir_env_var = true` and `exclude_slash_tmp = true`, retain an empty additional `writable_roots` list, and verify the actual inside-workspace write succeeds while parent/sibling profile writes are denied before a diagnostic model session. This tightens writes to the intended task workspace. The policy still grants root reads; it does not establish secrecy or deny access to readable personal/project files. Keep that limitation explicit and inspect actual subject accesses.

### Direct probe and amendment inspection completed

Subsequently read both saved probe records, the fixed synthetic `probe.cjs`, the final auth-free probe configuration, `docs/pilot-sandbox-diagnostic.md`, and the controller's amended configuration, manifest routing and `amendSandbox()` paths. No probe or model was rerun by this reviewer.

| Saved probe | Exit | Fixture read | Inside write | Parent write denied | Credential-file record |
| --- | ---: | --- | --- | --- | --- |
| `evidence.json` | 3 | `synthetic fixture` | true | false | false |
| `evidence-restricted-temp.json` | 0 | `synthetic fixture` | true | true | false |

The probe script actually attempts `../denied.txt`, catches failure, and sets exit 3 when the write is not denied. The final profile sets both temp exclusions, network off, apps off and plugin-default off. No auth file was present when independently checking its existence. The two evidence records do not embed configuration hashes; final configuration inspection supplements their captured outcomes without proving a complete machine-state audit.

Reviewed amendment driver SHA-256: `8ebcef08f5d5485a0a0f94cc004f91bda3f5319015586de3b2d5ebe7a49889fe`; it also passes `node --check`. It creates `launch-manifest-v2.json` separately, selects fresh `runs-v2` directories, and leaves original `runs` and the original manifest paths separate. The saved original manifest's SHA-256 is `261bed39e98d4de3ce39b8b8c352d378737da2bcddb37269f035b3202288fa5e`, exactly matching V2's parent digest. The original still names r01 and its original controller hash. V2 begins with separately named diagnostic r09 and preserves the other planned rows. Its remaining allocation sums to ten sessions; with retained r01, that is eleven plus one unspent diagnostic reserve.

The original manifest, V2 manifest and current files agree on all four frozen content identities: cases `26db3a74932254c6c293369c3714f497dc748bbed191652a8d26dd17a628c5db`; criteria `2ec3075d5b72cc49e09af5a623e03c791583abb1ae951f1b43c17c430784659d`; policy `c6ff9c021ae76e0377f4d7a3fd1f568728d0721ca5b781249a0cf38214065fcd`; minimal control `250389bbeff5250d424e317993aabeadf65bc63b574201f58d5c071d0004afb5`. No grading or policy change was observed.

A nonblocking metadata ambiguity remains: V2 inherits `frozenBeforeTrials: true` from the original manifest. Its amendment description and parent digest disclose that it was created after r01 and before the diagnostic. Preserve that distinction; do not claim V2 predates every trial. Original r01 remains an infrastructure unknown, not an overwritten successful baseline.

For reproducibility, inspected artifact SHA-256 values are: initial probe record `4c051d24ad6937afec195ee745eb6bfe8ac2fa3111be59346f2812d3f2261fd9`; restricted-temp record `ec474ab562c664272798f4f26dd919c17afd4f748ef6d8467b31d9dc334dcc97`; probe script `7ca91d8e99e778c9a237204ca76ad6df521f7f6a7d5c88bb7c6e49855beb2a54`; final probe configuration `d3b25dbd40f3ddd83a4fe3e9a61f1bd7f642f199e815974e69e0eb886c2b9068`. These files remain in disposable local storage, outside the public repository.

## Remediation checkpoint

The driver delta `d5951e441134a0dd1da1a4c947cc4290214ec15f0736b829684d2cf4f13331a7` and RPC delta `f23694574dd553b3345dbce56ec7183f88043b398c38e4df1261144519d64067` were fully reread. A final full driver reread closed the ordinary cleanup issue at SHA-256 **`4dd04ad5fbaa1a4528c5318ac544a70973b9b4032050143d335a95e15098a114`**. RPC remains at the delta hash above; budget, plan, criteria, and cases retain the hashes in the initial table below. The earlier findings are retained for traceability and superseded as follows.

| Initial finding | Delta assessment |
| --- | --- |
| 1. Child allocation | **Later invalidated for V2 by r07.** Source set delegation off elsewhere and spawned concurrency one, and eight bare-name script tests passed. Actual V2 dispatch used a different flattened name, so the trusted guard did not run. See the counterexample and correction above; no active native guard claim follows from this checkpoint. |
| 2. Remote account isolation | Supported disposable `_default` plugin mask and apps-off configuration added. This closes the missing configuration control. Effective loading remains a native preflight gate, not an observed success here. A remote source/account inventory may still describe an installation as enabled despite a local activation mask; inspect effective configuration and loaded tools/skills, rather than equating listing terminology with active exposure. |
| 3. Cleanup/capture | Closed in the final driver: log initialization and prompt read now precede spawn, the timer is installed immediately afterward, and the catch stops the precise owned process tree. Timeout and termination metadata are retained. Auth read/write moved inside prepare cleanup coverage. RPC/pipe errors are handled; synchronous append and process `close` address the earlier capture problem. External interruption, OS termination failure and an abandoned prepared profile remain operational limits requiring reconciliation, rather than claims of perfect crash immunity. |
| 4. Provenance | Source remediation confirmed: current commit plus controller, policy, minimal, cases and criteria hashes; preflight configuration/prompt/input fingerprints; installed runtime hashes; checks immediately before launch. Record actual host identity and effective configuration in preflight/results. This is provenance, not evidence of efficacy. |
| 5. Native states | Source remediation confirmed: absent/minimal reject candidate installation, disabled uses native config-write and inventory readback, enabled requires candidate activation and exact hook. Native preflight still must inspect effective guard trust, warnings/errors, unexpected hooks and available capabilities. |
| 6. Neutrality/capture | Opaque temporary path and `r01`–`r08` aliases remove the earlier product/condition path cue. Inputs remain prompt/fixture only. Environment filtering and task `cwd` are not an operating-system read boundary; retain that limitation, inspect discovered sources and review actual accesses. Actual child report capture is still untested and may remain unknown. |

The driver exposes only eight predetermined roots totalling ten reserved sessions, with no diagnostic launch action. For this fixed pilot, the 24-cap bookkeeping script is not itself a reason to demand a new controller architecture: the active 12 ceiling is additionally constrained by the frozen allocation and operator checks. The two reserve slots remain unavailable without their specified defect and reservation. Do not characterize the ledger alone as enforcing 12 or atomic crash durability.

### Independently inspected native preflight

Read the saved `r01` and `r02` preflight JSON and printed only selected nonsensitive metadata. Neither had a result file at inspection. Both effective configurations reported apps disabled, multi-agent disabled, `agents.enabled = false`, spawned concurrency one, depth zero, plugin default disabled, model `gpt-6.1-sol`, effort `low`, and only user/system layer types. Both hook listings contained no warnings or errors.

`r01` had six source/account installations and no hooks or candidate plugin configuration. `r02` had seven source/account installations, the disposable candidate explicitly enabled, and exactly one owned command SessionStart hook: trusted, startup matcher, ten-second timeout. It retained four installed runtime file hashes. The native inventory's enabled count still reflected the source/account installations; it did not erase the effective local plugin mask. These observations confirm configuration and trust for the first two prepared cells, not actual model-visible tools or hook execution. The controller author will inspect actual capabilities/events after the first root and stop further evaluation if unrelated access appears. Delegation preflight must separately confirm its budget guard is effective and trusted before its root starts.

### Independent synthetic guard verification

Extracted the literal generated `spawn-guard.cjs` from the exact driver snapshot, without executing the controller. Guard SHA-256: `7a3198cf150fa065113503000e2c1a047bd89c9fea29af01fbba88439b234f5e`. Executed with installed Node `v25.0.0` in a separate disposable reviewer directory. No Codex command, model session, auth read, or credential copy occurred.

Re-extracted and rehashed the guard after the final driver fix: the guard hash is unchanged. The final driver also independently passed `node --check` again.

| Input / state | Actual result |
| --- | --- |
| First root spawn | Exit 0, empty stdout/stderr, one claim marker containing `1` |
| Repeated root spawn | Exit 2, valid explicit deny JSON, nonempty stderr |
| Child `agent_id` present | Exit 2 with deny; no claim marker created |
| Malformed JSON | Exit 2 with deny; no claim marker created |
| Nonmatching tool | Exit 0, empty output; no claim marker created |
| Claim path is a directory, causing a write error | Exit 2 with deny |
| Two simultaneous root requests, same claim path | Exactly one exit 0 and one exit 2; a single marker remains |

The two race outcomes were checked separately: eight result assertions total. All denied JSON outputs carried `PreToolUse`, `permissionDecision:deny`, a reason, and no additional context. Evidence remains in the disposable `ss-guard-review-vBckEw/results.json` directory outside Git. `node --check` also passed for the driver, RPC helper and budget helper. These tests establish the guard script's observed ordinary paths and exclusive-create behavior; they do not test native hook matching, inheritance, host timeout/failure behavior, or a model's delegation.

The controller author will inspect native preflight before launching. Do not reinterpret a trusted listing as observed execution, or require perfect crash immunity as a feasibility prerequisite. Reconcile any external interruption, lingering process, prepared credential copy or incomplete capture honestly; stop further trials while their state is uncertain.

## Initial reviewed snapshot

The controller was changing during review. Findings below refer to the following byte snapshots; later fixes require a delta review before this becomes a launch clearance.

| File | SHA-256 |
| --- | --- |
| `experiments/pilot/codex-pilot.cjs` | `9eca86046a13881233c27d5e735c120bb63f9a2dad1ba79f82636efcae461322` |
| `experiments/pilot/codex-rpc.cjs` | `90b82b22cff9593e9d1dae08b60dbb5a94743f4567d91c31672fd1bd8b0e7d21` |
| `experiments/pilot/session-budget.cjs` | `60846785903eb5a11d2ad84bf540a2fc2cc3dbea14a903cfef494cd4939045b0` |
| `docs/pilot-plan.md` | `9037e1256f0c6e9ee6b7d212e8b1b89d7bdb93a8c1b5c69fb0dbbd8912ba60e2` |
| `docs/pilot-criteria.md` | `2ec3075d5b72cc49e09af5a623e03c791583abb1ae951f1b43c17c430784659d` |
| `experiments/pilot/cases.json` | `26db3a74932254c6c293369c3714f497dc748bbed191652a8d26dd17a628c5db` |

Read all six files fully. The frozen case/criteria commit is `9b5f6c9`. The supplied handoff and architecture-focused reference audit are background evidence; neither authorizes additional trials or production changes.

## Initial findings and source rationale

### 1. Native child limits do not enforce the approved session allocation

`codex-pilot.cjs:41` sets `max_threads = 2` for delegation, `1` otherwise, with multi-agent enabled in every cell. In pinned Codex 0.163.0, the alias counts **spawned open threads**, and V2 adds one for the root. `max_depth` applies only to V1. Thus the written configuration is not a one-child ceiling for delegation and does not establish zero children for other tasks. See [pinned agent configuration](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/config/src/config_toml.rs#L690-L700) and [V2 limit resolution](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/config/mod.rs#L2621-L2632).

The event observer stops only after excess child identifiers are returned. The extra subject has already been attempted by then. A concurrency cap also permits later replacement children after a slot is released. The pinned [close-agent implementation](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/agent/control/legacy.rs#L5-L43) releases a spawned thread slot.

Required: establish the effective backend without a model call; disable delegation for the six nondelegation roots; limit delegation concurrency to one spawned child; enforce a cumulative one-spawn/no-descendant rule before dispatch or classify the native boundary as blocked. A safety gate must be identical in matched conditions and must not inject candidate style. Any attempted excess child must still be disclosed and counted, never erased by termination.

A native `PreToolUse` guard is a source-supported option: `spawn_agent` is the [canonical hook name](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/tools/hook_names.rs#L36-L45), and the [tool registry](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core/src/tools/registry.rs#L653-L677) returns a block before invoking the handler. The guard can claim a single spawn atomically and deny further calls or subagent-origin calls. However, the host is not universally fail-closed: [PreToolUse parsing and tests](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/hooks/src/events/pre_tool_use.rs#L295-L302) permit processing after serialization/malformed-output failures. Explicit deny JSON or exit code 2 blocks; an unsupported plain `permissionDecision:allow` response is not a valid success signal. Review and exercise any guard without a model, retain its exact trust hash, and disclose remaining host failure behavior rather than promising an absolute limit from an untested hook.

`session-budget.cjs:14–20` enforces a mutable ledger's global limit, initially 24. It does not enforce the active Codex-only 12 ceiling or diagnostic trigger. The fixed controller list currently totals 10 sessions, which helps, but is not equivalent to independent ledger enforcement. Diagnostics must remain unavailable until a recorded qualifying defect and a central reservation.

### 2. A fresh profile is not proven isolated from remote account tools

The parent independently reported that preflight native inventory, with a fresh profile and zero local hooks, still returned six enabled account plugins. This reviewer did not reproduce that observation and has not inspected the sanitized inventory artifact. It is nevertheless a concrete preflight finding that invalidates a claim that a new `CODEX_HOME` alone isolates this account.

Pinned source provides a local activation default: `[plugins._default] enabled = false`, with an explicit allow for the disposable local plugin only where the condition requires it. The [configuration implementation](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/config/src/types.rs#L957-L988) preserves source/account enablement when this default is absent. The [loader](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/core-plugins/src/loader.rs#L175-L178) applies that policy to configured plugins. `[features] apps = false` is a separate supported switch; the [feature registry](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/features/src/lib.rs#L1488-L1493) defaults apps on. These are source-supported candidates, not proof the actual remote loading path is isolated.

Required: use only disposable configuration, verify effective native inventories and available tools/skills, and stop if unrelated account plugins remain active. Do not disable or uninstall real account plugins. Check ancestor instruction discovery, inherited environment, memory, and effective provider/config layers as well. `hooks/list` returning no hook does not establish no plugins, skills, apps, or instructions.

### 3. Unhandled process/stream errors can skip cleanup and leave work running

The first review identified no credential cleanup, substring-only hook trust, capture on `exit`, and a timeout killing only the immediate child. The updated snapshot materially improves all four: validated-root `removeAuth`, exact hook fields and installed bytes, `close` plus stream finish, and exact-PID Windows tree termination.

Remaining holes:

- `CodexRpc` handles process `exit` but not child-process `error` or stdin `error`. A spawn failure or broken pipe can terminate Node outside the pending request rejection path. Its `close()` neither waits for shutdown nor confirms descendants have stopped.
- The run creates a finish promise and waits for it only after the process closes. An early file-stream rejection can become unhandled while the host continues. Subject stdin has no broken-pipe handler.
- `taskkill` exit status is ignored; timeout is not explicitly recorded. A failed termination can leave the controller awaiting `close` indefinitely. Error cleanup must stop and confirm the precise owned tree before declaring it finished.
- The auth write occurs before the surrounding `try`. An interrupted/failed write or unhandled event can leave a partial or complete copy. Successful prepare intentionally retains credentials awaiting run; abandoning a prepared cell has no explicit cleanup operation.

Required: handle all owned process/stdin/output errors immediately, stop the tree on capture failure, bound shutdown, record timeout/termination status, and place credential creation and all subsequent operations inside cleanup coverage. Provide a narrow cleanup path for prepared-but-unlaunched cells and verify all disposable copies are gone at the pilot end. External controller termination cannot be solved by `finally` alone; disclose and reconcile it.

### 4. Frozen provenance is recorded incompletely and not checked at launch

`freeze()` stores a hardcoded source commit, cases hash, and policy/minimal hashes. It omits the required criteria hash and actual controller/package hashes. `run()` checks only that preflight exists and result does not; it does not compare the current configuration, prompt, fixtures, policy, package, criteria, or controller with the frozen/preflight hashes. Recording `configHash` is insufficient if it is not checked.

Required: freeze criteria, controller, package, prompt and fixture identity before the first trial, preserve original fixture hashes separately from final artifacts, verify relevant identities immediately before each launch, and retain the actual executable version/hash and effective model/effort. A manifest's declared model is not evidence that the subject used it. Make any necessary pretrial repair explicit; do not retroactively change a frozen task after trials start.

### 5. Treatment success is not asserted for every native state

The controller calls native marketplace/add/list and uses native hooks RPC; it does not merely prepend the candidate to a user prompt. That is a useful design property. However, only enabled sessions assert a matching hook. Absent/disabled/minimal cells log inventory and hook counts without asserting that the disposable candidate is absent or installed-disabled as intended, that unrelated hooks are absent, or that native warnings/errors are empty.

Required: check exact selector, installation and activation state for every cell; reject unexpected hooks, warnings/errors that prevent interpretation, and unrelated active capabilities. Retain native disable evidence or effective native readback of the disposable disable configuration. After launch, bind hook event records to the native session and policy hash. A trusted hook listing proves trust configuration, not successful execution or model adherence.

### 6. Neutrality and output evidence still need explicit checks

The input files are extracted from `input.fixture_files` with path containment and only `input.prompt` is written to subject stdin. Rubrics and expected values are not intentionally supplied. But the absolute task path contains the product name and condition aliases, and the process inherits most of the real environment. These are avoidable cues and configuration paths. A workspace-write policy alone is not evidence of a restricted read boundary; the credential profile, other trials, and repository criteria are outside the task folder but remain under the same user.

Required: use opaque neutral paths, sanitize inherited host/provider/session state and review effective shell settings, verify discovered instruction sources, and document actual read/tool boundaries. Do not claim subjects had no project/personal access from `cwd` alone. Keep evaluator and other-condition material out of the exposed workspace and review captures for accidental access before interpreting blinding.

The pinned [exec JSON schema](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/exec/src/exec_events.rs#L233-L242) supports `collab_tool_call` with request prompt, sender/receiver thread IDs, and agent states. That makes the observer's principal field names plausible; live completeness is still untested. Preserve real child request/ID/report, descendants, files, tool output and root reply. Missing actual child capture must remain unknown, not reconstructed from root narration. `result.json` currently records process metadata, not the complete criteria evidence; later collection may supply it, but must occur before any success claim.

## Native hook trust assessment

The native TUI itself uses `hooks/list` and `config/batchWrite` to store `hooks.state.<key>.trusted_hash` with reload enabled. The controller's use of that path is not inherently a trust bypass. See [Codex 0.163.0 TUI hook RPC](https://github.com/openai/codex/blob/rust-v0.163.0/codex-rs/tui/src/hooks_rpc.rs#L21-L85).

The current exact command/handler/matcher/timeout/managed checks and comparison of four installed files against the disposable source are substantially stronger than the initial substring test. Still verify the entire hook set and package allowlist, compare the native hash again after trusting, record the reviewed package hash, and revalidate immediately before launch. Byte equality with a mutable source is not itself proof of an immutable reviewed version. Do not add hook-trust, rule, or permission bypass flags.

## Scope-compatible features and remaining limits

- The controller has no Claude launch path, no model judging, and no direct paid API fallback. ChatGPT-only login is forced; copied auth rejects API-key mode. The inherited environment filter helps, but case-sensitive denylisting is not a complete provider/environment isolation proof.
- The two delegation roots reserve two slots each in advance. Failed starts remain charged. Duplicate IDs are rejected. These conservative rules should remain.
- The ledger lock prevents concurrent cooperative writers. Its content is overwritten in place, so the plan's wording “atomically records” overstates crash durability. A malformed existing ledger currently fails closed; do not replace it with an empty default. Prefer an atomic replacement and validate fixed ceilings/schema; check finish-command failure rather than silently discarding it.
- No result in this review establishes clearer chat, preserved artifacts, native child safety, successful auth cleanup in a real trial, or cross-host behavior. The initial findings were static review plus explicitly attributed parent observations; the later independent guard and syntax checks are listed separately above. No model trial or fake-host test was run by this reviewer.

This final snapshot closes the static blockers for the narrowly approved pilot, with native per-cell preflight and actual capture checks retained as execution gates. It does not approve production implementation or publication. The approved owner checkpoint after the bounded pilot still applies.

## Lead's post-trial observations

These observations were supplied by the lead after the independent static/guard review; they are not additional model executions by this reviewer. r08 completed with the native V2 guard record `collaborationspawn_agent`, root context false, and an actual atomic claim marker. The supported local API confirmed one completed child and recovered its public report. The independent artifact reviewer checked all ten pairs and saved-file preservation. Incoming directives remain unobservable, and the failed baseline leaves this unpaired.

Final accounting confirms nine roots plus two actual native children, 11 charged sessions, no further scheduled runs, and zero remaining pilot auth copies. A native removal check left generated task hashes and unrelated temporary settings unchanged. See [the factual results and remaining limits](pilot-results.md) and [independent output checks](pilot-independent-results.md). These observations close specific pilot evidence gaps without establishing release readiness or human comprehension benefit.
