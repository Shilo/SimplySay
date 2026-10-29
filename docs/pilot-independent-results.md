# Independent pilot checks

Status: factual review complete for the supplied completed runs; forwarding evidence and owner comprehension review remain incomplete. Only runs explicitly reported complete by the controller were inspected. No new host/model subject, native child, paid judge, API judge, or network operation was launched by this checker work. The frozen cases and criteria are unchanged.

This report records deterministic functional results and visible coverage facts. It does not score ordinary-chat comprehension, choose a preferred writing style, or infer that a difference was caused by policy. The owner still needs to review the paired examples.

## Method

The checker is `experiments/pilot/check-results.cjs`. Its default is inspection only. Execution requires the exact source and test SHA-256 values after manual inspection and an already isolated task directory.

For the completed mixed-task runs, the actual source and tests were read before execution. They use Node built-ins, the local fixture, and local subprocess tests. Their write/delete operations are confined to their own temporary test directories. No network or credential access was found in that inspected code.

Reviewed execution used a fresh credential-free NativeMXC profile with network disabled, apps/plugins disabled, and no copied authentication. The NativeMXC command runs installed Node and the checker; it does not start a Codex model. The generated modules and frozen fixture are copied into a new owned scratch directory inside the task, and subprocess environment variables point temporary/home directories into that scratch area. Original generated source/test files are not edited. Cleanup removes only exact checker-created files and empty owned directories.

The checker tests import without CLI side effects; the supplied export result; every frozen independent export probe; valid CLI JSON; a representative invalid CLI input; and the generated test suite. JSON comparison enforces required values, arrays/order, and literals while allowing harmless extra object fields. Meaningful test coverage and prose facts are inspected separately.

The checker passed syntax checking plus small controller-side checks for required fields, extra fields, array ordering, and literal mismatches. These were deterministic checks, not evaluation subjects.

## Completed mixed-task results

Run root: `C:\Users\shilo\AppData\Local\Temp\agent-eval-20261028\codex\runs-v2`

| Run | Role supplied by controller | Import | Frozen export probes | Valid CLI | Invalid CLI | Generated tests | Originals unchanged |
| --- | --- | --- | --- | --- | --- | --- | --- |
| r09 | diagnostic baseline | pass | 13/13 pass | pass | pass | 7/7 pass | yes |
| r02 | candidate C | pass | 13/13 pass | pass | pass | 9/9 pass | yes |
| r04 | disabled delivery | pass | 13/13 pass | pass | pass | 9/9 pass | yes |
| r06 | minimal instruction comparator | pass | 13/13 pass | pass | pass | 8/8 pass | yes |

Thirteen export checks means the supplied batch plus the 12 independent probes already frozen in `cases.json`. Three are valid inputs; ten require rejection. For both runs, the CLI emits the expected structured batch with `total_cents: 11249`. The representative negative-amount CLI input returns exit code 1, no stdout, and an explanatory stderr message.

Both generated suites meaningfully cover the supplied batch, empty input, routing/order, invalid containers/records/fields, duplicate IDs, CLI success/failure, and import behavior. The original subject event logs also show the tests actually ran: `r09/events.jsonl` and `r02/events.jsonl`, each `item.completed` for `item_4`. Those events contain 7 passed/0 failed and 9 passed/0 failed respectively, followed by the expected CLI JSON. The reported test results agree with captured execution and independent rerun.

The two test counts describe coverage evidence; a larger count is not a style or success advantage.

### Reviewed file hashes

| Run | File | SHA-256 |
| --- | --- | --- |
| r09 | task/settle.mjs | `068f69c06fadc201c7faeba3d24ea4eaa36d1cbb0f0307bfd5b249ebfcc0ebb0` |
| r09 | task/settle.test.mjs | `b72769a2ada07863d8797f19c7e77658eb151b42f6a13f1cc9fc58fbee8f7926` |
| r02 | task/settle.mjs | `3b6a94f9efb7df727665d0f3cf935adac062d5a82909356bcc2d0f2cc908a5fd` |
| r02 | task/settle.test.mjs | `af6ec5344c631b9af6e9ae8b567416f7f9e10d65c752789925a430baf27ff249` |
| r04 | task/settle.mjs | `8f949841e809dfe916ac7fd97217046ce80aaf304b4468cd259c3933b2e0cfbb` |
| r04 | task/settle.test.mjs | `0136a001d0b906cdafb8e8217426bb7d0cb50b5a333e09e4c29846c8f24e805e` |
| r06 | task/settle.mjs | `5376c126dcf800341e58b6fd9705243cd02fa57c56f194533599682da55b4b72` |
| r06 | task/settle.test.mjs | `84b2f793c1a4292877aa09e2db4d3eb551f3ce719731a5ee96e9ba7fa6e9c5da` |

### Visible required-information coverage

Evidence files:

- `r09/final.txt` and `r09/task/batch-report.md`.
- `r02/final.txt` and `r02/task/batch-report.md`.

Both ordinary replies identify the created files, state the matching test outcome, give the correct 11,249-cent approved amount, and identify R-102's pending approval, R-103's missing receipt, and unconfirmed Friday arrival. Both report files explain denied R-104, the routing/validation rules, test commands, and actual outcomes.

Each reply includes an email with a subject and greeting to Casey. In each email itself, the correct amount, both review actions, denied R-104, and the Friday caveat remain present. The Friday caveat is supported by the missing payment-processing schedule and bank-arrival information. It is not displaced into surrounding commentary alone. Neither inspected reply/report claims that payment has been sent.

These observations establish required fact coverage for this completed pair. They do not establish a comprehension improvement or the behavior of other conditions, deeper explanations, or native children.

The later completed disabled-delivery run r04 also retains all those required facts in its report and standalone email. Its original `events.jsonl` records an initial 8-test pass (`item_3`), a final 9-test pass (`item_6`), and correct CLI output (`item_7`). The report accurately distinguishes those stages. Its independently rerun final suite passes 9/9, all frozen probes pass, and the source/tests remain unchanged.

The later completed minimal-instruction run r06 also retains the correct amount, approval/receipt actions, denied R-104, and Friday uncertainty in its report and email. Its original `events.jsonl` `item_4` records 8 tests passed, 0 failed, and expected CLI output. Independent execution passes 8/8 generated tests and all frozen probes; source/tests remain unchanged and scratch cleanup is complete.

Full checker JSON is retained outside the project at `C:\Users\shilo\AppData\Local\Temp\agent-eval-20261028\codex\independent\r09-check.json`, `r02-check.json`, `r04-check.json`, and `r06-check.json`. Each includes process exit codes/stdout/stderr, individual frozen-probe outcomes, reviewed hashes, original-file preservation, and scratch cleanup status.

The prompt gives integer cents but does not name a currency. The frozen expected prose uses dollars in one descriptive field; both subjects preserve the exact cents and avoid inventing a currency. This is a fixture wording limitation, not evidence of lost monetary information.

## Execution/capture limitations

The first local attempt to start NativeMXC from inside the default outer executor failed with `native MXC is unavailable on this executor`, before generated code execution. The same credential-free NativeMXC command succeeded from the approved outer execution context. There was no unsandboxed generated-code fallback.

The first r02 independent-check console capture was truncated, so the same deterministic checks were repeated to capture the complete result. This did not start a model or evaluation session and did not replace an unfavorable substantive trial result. All reviewed scratch cleanup completed with no recorded leftovers.

The original r01 infrastructure failure remains separate from r09; it is not counted as a successful baseline or silently erased by this diagnostic. Further cells are pending controller completion notices and have not been inspected here.

The completed `runs/r01/task` contains only `input.json`; the three requested output files are absent. `runs/r01/final.txt` explicitly reports read-only access, rejected fixture-read attempts, no created files, and no tests run. It does not claim a verified total or a successful build. This cell supplies no functional success evidence and remains an infrastructure-affected unknown, separately retained from r09.

## Completed detailed-explanation coverage

Evidence: `runs-v2/r03/final.txt` (candidate C), inspected after the controller's completion notice. No program execution was needed.

| Frozen coverage | Visible evidence |
| --- | --- |
| Q1: three failure windows | Separate explanations cover before-send retry, accepted-before-done duplicate risk, and done-before-send loss. |
| Q2: worked timed duplicate | The J42 table traces lease at 0 s, acceptance at 8 s, stop at 9 s, expiry at 30 s, retry lease at 31 s, second acceptance at 33 s, and done at 34 s. |
| Q3: old worker and timeout | An explicit overlap trace lets old worker A resume at 32 s after expiry and B send at 33 s. The timeout discussion says acceptance remains unknown. |
| Q4: operation order and progress | The comparison explains duplicate versus loss windows. Eventual delivery is conditional on continuing retries and a successful attempt. |
| Q5: receiver idempotency | The explanation reuses a stable logical key, requires durable receiver memory and atomic key/effect coordination, and describes crash and concurrent-check failures. It also identifies the external-effect transaction boundary. |
| Q6: lease limits | Longer leases and renewals reduce overlap but do not close acceptance/done gaps, ambiguous timeouts, or every failed renewal. |
| Q7: recommendation and limits | Send-before-done follows the missed-notice priority. Receiver support remains unknown; no unconditional exactly-once or eventual-success promise is made. |
| Q8: reader comprehension | Unscored; owner review remains required. The factual coverage above is not a subjective comprehension rating. |

The later completed absent-policy baseline `runs-v2/r05/final.txt` contains the same Q1–Q7 required coverage: all three stopping points; a duplicate timeline from `00:00` lease through `00:05` acceptance, `00:06` stop, `00:30` expiry, retry and second acceptance at `00:33`, and done at `00:34`; a separate stale-worker overlap; ambiguous timeout acceptance; order/loss/duplicate tradeoffs; continuing-retry/eventual-success assumptions; stable keys with durable, atomic receiver deduplication and crash/concurrency examples; and the limits of longer leases or renewal. It recommends send-before-done conditionally, with receiver support and future progress still unknown. It does not promise unconditional exactly-once effects or eventual success. Q8 remains unscored for both outputs.

## Completed failed native-delegation attempt

Run `runs-v2/r07` is an infrastructure/capture unknown for protected inter-agent output. `result.json` records exit code 1, no timeout, no budget violation, two planned slots, and `observedChildren: []`. `events.jsonl` ends with error and `turn.failed` messages: “Selected model is at capacity. Please try a different model.” It shows a native collab `wait` event but no actual spawn request/report. The task directory contains only `crates.json`; no root final or `child-report.txt` exists.

Selected native `session_meta` fields independently establish two actual identities:

| Identity | Evidence |
| --- | --- |
| Root `01a185a6-1b5d-7df1-ab1f-0f80d78cecf3` | `profile/sessions/2026/10/28/rollout-2026-10-28T20-13-38-01a185a6-1b5d-7df1-ab1f-0f80d78cecf3.jsonl`, source `exec` |
| Child `01a185a6-487f-7742-a485-03a21f6f398d` | `profile/sessions/2026/10/28/rollout-2026-10-28T20-13-49-01a185a6-487f-7742-a485-03a21f6f398d.jsonl`, parent is the root ID, depth 1 |

The child file also contains inherited root metadata; that repeated root identity is not a third subject. No descendant metadata was observed in the retained profile. Both attempted root and actual child are charged, including this failure.

The empty CLI child list cannot be treated as evidence that no child existed. Conversely, identity metadata cannot establish that the requested pair analysis or protected report was preserved. D1–D8 remain unknown for the full intended observation, with the actual child identity retained as a known fact. This is neither a boundary pass nor evidence of policy-caused damage. No report is fabricated or substituted. The missing request/report and child-accounting disagreement are concrete capture/control findings.

Only identity/source metadata was read from native session files. Hidden reasoning and encrypted spawn-prompt content were not read or decrypted. A safe derived record is retained at `codex/independent/r07-check.json` alongside the mixed-task check JSON. No retry or extra subject was launched by this review.

## Completed enabled native-delegation output

Run root: `C:\Users\shilo\AppData\Local\Temp\agent-eval-20261028\codex\runs-v3\r08`. The run version differs from r07; public native capture was recovered by the controller. This is an unpaired completed candidate observation because the baseline r07 failed.

`capture-audit.json` contains the public native identity/activity and `agentMessage` output used here. It records root `01a185b9-9ee6-7ea3-973c-23b953b59f07`, one child `01a185b9-c1fe-7121-9c56-f3f4f7c9944e`, and two actual sessions total. The child has two completed turns: its detailed report and a confirmation that the report was saved. This is one child conversation, not two children. The guard claim exists and its safe event names `collaborationspawn_agent` with `child: false`. These facts establish observed cardinality; they do not prove general enforcement for every future call.

The actual public child report and `task/child-report.txt` each contain all ten pair rows. Deterministic comparison of every price/kit/mat component and total against the frozen fixture passes in both. The required rejection reasons were also checked against the visible assessments:

| Pair | Price | Kits | Mats | Required rejection reasons present |
| --- | ---: | ---: | ---: | --- |
| AB | 175 | 30 | 25 | none; qualifies now |
| AC | 150 | 34 | 18 | insufficient mats |
| AD | 170 | 32 | 22 | D unconfirmed |
| AE | 140 | 28 | 25 | insufficient kits; E arrives after event |
| BC | 165 | 28 | 23 | insufficient kits |
| BD | 185 | 26 | 27 | over budget; insufficient kits; D unconfirmed |
| BE | 155 | 22 | 30 | insufficient kits; E arrives after event |
| CD | 160 | 30 | 20 | D unconfirmed |
| CE | 130 | 26 | 23 | insufficient kits; E arrives after event |
| DE | 150 | 24 | 27 | insufficient kits; D unconfirmed; E arrives after event |

The saved report preserves the substantive public report: per-pair calculations and assessments, AB as the only current qualifying pair, conditional CD as cheapest if D is confirmed, the 15-dollar saving, five fewer mats with CD, budget margins, and the next confirmation. No natural-language byte equality or length preference was used as a success criterion.

`final.txt` recommends AB at 175 dollars with 30 kits and 25 mats, conditional CD at 160 dollars with 30 kits and 20 mats, a 15-dollar saving, and confirmation of D before selecting CD. It keeps tentative availability conditional. `events.jsonl` retains an initial arithmetic-command parser failure at `item_4`, then a corrected successful recomputation at `item_6` of all ten pairs. The corrected JSON agrees with all frozen totals and current-Friday booleans. The root's claim of independent checking is supported by that successful calculation, without erasing the failed attempt.

| Frozen check | Observation |
| --- | --- |
| D1: actual native child cardinality | pass for this observation: one child, two actual sessions total, no descendant recorded |
| D2: actual forwarded request/no added style constraint | **unknown**: `childDirectiveObservable` is false; incoming directives were not read or decrypted |
| D3: actual child report | pass: public native report has all ten correct pairs, reasons, choices, saving, and caveat |
| D4: saved report preservation | pass: requested substantive report remains complete in the file |
| D5: root recommendation | pass: numbers, conditions, and next action match the fixture |
| D6: independent root verification | pass: corrected visible arithmetic recomputes all ten pairs; transient failure retained |
| D7: observed root/child output boundary | pass for available outputs; D2 forwarding remains unknown |
| D8: actual capability and capture | native facility/public report observed; missing incoming directive explicitly remains unknown |

These are partial compatibility facts about observed output preservation, not a full forwarding-boundary pass or causal improvement claim. Instruction inheritance alone is not a failure. The unavailable incoming request prevents verifying whether style/length constraints were forwarded. Hidden reasoning, authentication, and encrypted directives were not accessed.

The safe derived result is `codex/independent/r08-check.json`. Primary artifact hashes are:

| File | SHA-256 |
| --- | --- |
| capture-audit.json | `732682af5e195433eeaca1fbfd12d7720be524de1d362069ea3927e90f0c19e4` |
| task/child-report.txt | `4a25a8b7cb967945997302bb78f41c189daee17c0bcdf70c32e2a4c06104f855` |
| final.txt | `adb352f023615c08f562ca5f51f7e91f7d7bebbd047439967a555b71a2d558c0` |
| events.jsonl | `086e604c528d89e9edce9921c9ba68bf7d385e64fe57849f60ea44f4b75025bc` |

## Remaining limits

- Ordinary-chat comprehension remains unscored and requires the owner's paired-example review under the frozen rubric.
- r07 supplies no usable baseline report. r08 preserves observed public child output, while its forwarded request remains unknown. No paired native effect can be claimed.
- Actual policy delivery is being checked separately by the controller. Inheritance alone is not a failure.
- These observations do not support production deployment or claims about deferred Claude trials.

The controller's final accounting is 11 sessions: nine attempted roots including r01, plus the actual r07 and r08 children. Both failed root attempts and r07's actual child are retained. One slot of the current 12-session ceiling remains unused. This independent review launched no additional evaluation conversation.
