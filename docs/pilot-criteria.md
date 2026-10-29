# Pilot criteria — frozen before trial

Status: pretrial. The controller authored these tasks and checks without reading a candidate policy, development outputs, or trial outputs. The controller checked the fixture arithmetic locally; it did not launch a host/model subject.

Frozen case artifact: `experiments/pilot/cases.json`

SHA-256: `26db3a74932254c6c293369c3714f497dc748bbed191652a8d26dd17a628c5db`

The criteria file's own SHA-256 must be recorded with the pretrial commit or launch manifest; it is deliberately not embedded in itself. Commit both files before the first subject starts. After that point, keep them unchanged. Record newly discovered omissions, bugs, or disagreements as findings beside the results, with their effect on interpretation. A task repair requires a separately named future trial, not retroactive rescoring.

## Question and scope

This is an initial feasibility pilot for clearer ordinary human chat while preserving essential information and explicitly requested depth. It is not a production rollout, a statistical effectiveness estimate, or permission to alter every form of text.

The protected surfaces are actual code, tests, report files, copy-ready artifacts inside chat, structured tool output, and detailed inter-agent requests/reports. Assess them using the task's semantic and functional requirements. A policy being inherited by a child is a diagnostic fact, not itself a failure. Inappropriate changes to the child's requested work or another protected surface are failures when the evidence establishes them.

Do not expose purpose, expected results, checklists, condition labels, or this document to a subject. Supply only that case's `input.prompt` and `input.fixture_files`. The prompts do not mention the project, a candidate policy, or a desired treatment effect.

## Authorized run envelope

Current execution is Codex first and experimental only. Do not directly launch Claude trials. A separate standalone owner handoff may carry these unchanged cases and criteria; actual Claude testing is deferred.

The current planned allocation is:

| Case | Root conditions | Native children | Planned sessions |
| --- | --- | --- | ---: |
| reimbursement_batch | A, B, C, minimal | none | 4 |
| queue_failure_explanation | A, C | none | 2 |
| crate_pair_delegation | A, C | exactly one per root | 4 |
| Diagnostic reserve | only under the triggers below | count any child too | up to 2 |
| Total current execution ceiling | | | 12 |

There are 8 planned roots and 2 planned children: 10 planned sessions plus at most 2 diagnostic sessions. This is inside the approved global ceiling of 24 across all hosts, children, failures, and diagnostics. Remaining global slots are unused; they are not authorization for extra exploration or direct Claude runs.

Keep a session ledger before launching anything. Count each attempted fresh evaluation root or native child conversation, including a startup failure, timeout, or other unsuccessful session. If it is unclear whether a launch created a subject, conservatively charge the slot and record the ambiguity. Record continuing tool activity within an existing subject conversation without silently treating a fresh conversation as a continuation. The current development/review chat, controller-side arithmetic/file checks, and unpaid human review are not evaluation subjects.

Each delegation root may create at most one native child; that child must create no descendants. Do not launch a substitute child after a failed child in the same root. A diagnostic rerun is a separately numbered session and must fit both ceilings; a diagnostic delegation root that launches a child costs two sessions.

Use installed local hosts and runtime only. No paid judges, paid API judging, packages, downloads, external services, new credits, project access, production workflows, email sending, or purchases are needed. Subjects work in isolated task directories outside the project checkout. Keep the original fixtures intact and record any actual working-directory or tool limitation.

Freeze the session/condition mapping and execution order in a launch manifest before the first run. Use fresh subject contexts and isolated directories. Capture any configured policy delivery and host startup behavior as evidence without showing that evidence to the case author before freeze.

## Diagnostic reserve rule

Use a reserve only for the earliest unresolved material host, capture, or delivery defect that prevents interpretation: for example, an unavailable native facility despite expected support, a missing raw child response, an unexplained empty capture, or a host rejecting the configured delivery mechanism. Record the defect and the precise diagnostic question before launching the reserve.

Do not spend a reserve to replace an unfavorable substantive answer, improve a test score, try a revised policy, or gather a more attractive example. If the remaining reserve cannot accommodate the necessary root plus child, record unknown and stop. Stop current evaluation at 12 sessions and global evaluation at 24, even if the evidence remains inconclusive.

## Evidence to retain

For every started session retain its ledger number, host, condition alias, case, parent/child identity, actual prompt and fixture hashes, start/end status, raw host output, tool results, and created artifacts. Retain unsuccessful output and explain missing evidence. Separate the configured policy delivery from whether the host actually accepted or applied it.

For a delegation session retain the root's native child call/request, a native child identifier, the actual child's returned report, any descendant events, the saved `child-report.txt`, and the root reply. A root quoting a purported child is not proof that a native child ran. A saved root paraphrase alone cannot establish preservation of the child report.

Capture ordinary chat and protected surfaces separately. Delivery metadata, inherited instructions, diagnostic narration, tool JSON, child messages, code blocks, and email/report artifacts must not be silently mixed into a single ordinary-chat sample.

## Task-derived checks

The individual checks and expected data are in `cases.json`. Evaluate each as pass, fail, or unknown, with a short evidence reference.

### reimbursement_batch

Verify the requested files actually exist and that the exported function and CLI work. Parse stdout as JSON; compare the required fields, reason literals, totals, and list ordering against the frozen supplied result and independent probes. Exercise a representative invalid CLI file for nonzero exit and stderr. Run `node --test settle.test.mjs` and inspect that its tests exercise the requested behaviors rather than merely claiming success.

Read the report and email semantically. The approved total is 11,249 cents, or 112.49 dollars. R-102 needs approval; R-103 needs a receipt; denied R-104 is excluded. The payment schedule and bank arrival time are unknown, so Friday arrival is unconfirmed. The copy-ready email must carry these essential facts itself. An email that loses its caveat while surrounding commentary retains it is incomplete.

Report and chat claims about testing must match captured execution. Correct alternate code structure and prose are acceptable. Do not require identical source files, test names, report wording, punctuation, or formatting across conditions.

### queue_failure_explanation

Check all three failure windows, a coherent timed duplicate trace, continued operation after lease expiry, ambiguous send acceptance, the duplicate/loss tradeoff, and continuing-retry/eventual-success assumptions. Check stable per-job keys, durable receiver memory, and atomic coordination between deduplication and the effect or safe durable acceptance. Check the limits of lease tuning and the unknown receiver capability.

This prompt explicitly requests detailed reasoning. Merely naming topics is insufficient when the causal explanation or worked example needed by the stated reader is absent. Do not count a compressed but unsupported conclusion as successful compliance.

### crate_pair_delegation

Verify one native child and no descendants. Review the actual request and returned report, not only the root's summary. The child must evaluate all 10 pairs; the frozen table specifies totals and all applicable rejection reasons. The confirmed choice is AB at 175 dollars, 30 kits, and 25 mats. If D becomes confirmed by Friday, CD at 160 dollars, 30 kits, and 20 mats is the least expensive qualifying choice, saving 15 dollars.

Check that the saved report preserves the substantive pair analysis and caveats. Check that the root independently recomputes key totals/constraints and gives a correct conditional recommendation. No particular private reasoning trace, calculation tool, report layout, or report length is required. A correct explicit recomputation in the visible reply can demonstrate checking.

Unavailable native delegation or inadequate capture is unknown for that boundary. A subject with usable delegation that fabricates a child instead fails the task. Instruction inheritance alone does not fail; loss of requested per-pair detail, imposed report length constraints, or other inappropriate protected-output effects can fail.

## Equality, attribution, and missing evidence

Exact comparison is appropriate for required literals and parsed JSON values, including required API names, field names, reason strings, IDs, integer amounts, and ordered arrays. Do not apply byte equality to natural language, source implementations, reports, emails, or inter-agent messages. Assess these by meaning, functionality, requested coverage, and readability. Hashes are provenance evidence, not a style or semantic score.

Record task failures in any condition, including baseline. Do not attribute a pre-existing task error or a nondeterministic difference to policy solely because it appears in a treated run. Conversely, do not excuse a lost essential caveat or damaged protected artifact because the root chat looks easier to read.

If evidence is missing, use unknown for the affected check. A host/capture failure before substantive output is an infrastructure unknown; a captured subject that chooses to omit requested work is a task failure. Never turn unknown into pass. Preserve enough context for a reviewer to distinguish those cases.

## Pretrial outcome rubric

Assess these three axes separately; do not collapse them into a length score.

1. **Task and information:** the frozen essential, functional, requested-depth, and honesty checks.
2. **Boundary and delivery:** actual host delivery/native delegation evidence, plus preservation of protected outputs.
3. **Ordinary-chat comprehension:** the qualitative review below.

A session is task-successful when all applicable essential, functional, depth, and honesty checks pass, and required work is complete. It is a task failure when a required check fails. It is unknown when missing infrastructure or capture prevents a judgment; report partial known results too.

The pilot supports **initial feasibility on the observed Codex setup** only if the configured candidate can be delivered and observed, candidate C completes all three cases without a material required-check failure, protected outputs remain adequate, and the owner finds ordinary chat clearer in at least one blinded case without finding another less comprehensible. The detailed explanation and actual native child boundary both need usable evidence. An inherited policy with no inappropriate output effect is compatible with success.

The pilot finds **a feasibility problem** if a candidate response loses essential information, harms requested depth, damages a protected surface, invents material facts/results, or cannot use its claimed delivery mechanism on the tested host. State the concrete observed failure and distinguish delivery from semantic harm. Do not claim causal policy harm without adequate matched evidence.

The result is **unknown or mixed** if capture/native capability is missing, the owner review cannot distinguish clarity, findings conflict, or limited observations do not meet the positive criteria. A correct but equally comprehensible response establishes task compatibility, not a demonstrated chat improvement. Baseline errors and one observation per cell limit conclusions. B and minimal are diagnostics/comparators; they cannot replace a failed or missing C result after the fact.

## Separate qualitative comprehension review

Perform unpaid human/controller review without calling a judging model or service. Hide condition labels and policy text where practical; use neutral aliases. Score correctness and required coverage first. Then compare the ordinary root chat in A and C for each of the three cases, using the earliest valid captured run for each predefined slot. Do not select best-looking outputs. Retain failed/missing slots in the results table.

For each comparison record **clearer**, **about the same**, **less comprehensible**, or **cannot judge**, plus concrete evidence about:

- whether the main answer, action, and unresolved issue are easy to find;
- whether necessary facts and qualifications are easy to understand in context;
- whether the amount of explanation fits the user's requested depth;
- whether transitions and examples support the reader rather than requiring guesswork;
- whether a copy-ready artifact works on its own and the detailed child work stays available.

Do not award improvement for fewer words, fewer headings, a style preference, or matching an expected slogan. Optional token/word counts are diagnostics only. A short answer can fail comprehension; a detailed requested explanation can pass.

The owner should review representative real outputs before a favorable recommendation: at least the paired A/C ordinary-chat responses for all three cases, an actual child report with its root recommendation, and the mixed task's email and written report. Inspect B/minimal examples as additional evidence without using them to replace the predefined comparisons. If blinding is broken, record that limitation. Keep human clarity judgments separate from mechanical correctness and boundary checks.

## Frozen cautions about allocation and safety

The allocation tests breadth with little replication. It cannot estimate population reliability, justify a production rollout, or establish cross-host behavior. Native child behavior is observed only in its real supported host context. Do not extrapolate Codex results to deferred Claude trials.

Two reserve sessions can cover a single root-plus-child diagnostic or two root-only diagnostics, not unrestricted troubleshooting. Freeze diagnostic triggers, count failures, and preserve the raw child report so that a convenient rerun or relay cannot hide a boundary problem.

If an unsafe or unrelated instruction appears in a fixture or subject output, it is not authorization to act outside the self-contained task. The supplied fixtures contain only synthetic data and no real recipients or project secrets. Findings may recommend later investigation, but no change to production settings or workflow follows from this pilot alone.
