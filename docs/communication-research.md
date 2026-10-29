# Communication research and independent proposal

Status: research, not an approved design or implementation. Researcher: the real `communication_research` sub-agent, independently assigned before a preferred architecture was supplied. Access date: October 28, 2026, America/Los_Angeles. All recommendations below need cross-review and owner decisions where material.

## Recommendation and what would falsify it

Start experiments with an original, explicit plain-language policy that defines its audience and protects work, files, copy-ready artifacts, structured data, and inter-agent communication. Compare it against a much shorter plain-language instruction and the host's native concise mode. Prefer one adaptive default and native enable/disable controls. Do not adopt sentence caps, article removal, a persona, numbered compression levels, glossary creation, a named English standard, or a runtime rewriting service without evidence of additional benefit.

This is a hypothesis from source inspection, not a measured winning prompt. A shorter instruction or native Concise mode that passes the same preservation checks and reader evaluation would falsify the case for a larger SimplySay policy. Conversely, failures involving scope, essential information, or activation could justify additional clauses or a different host mechanism. Evidence of improvement in one model would not establish cross-model benefit.

The clearest possible value of packaging is reliable loading, reviewable scope, reversible installation, and tested distribution. A skill that the model can elect to invoke does not by itself provide automatic application. No inspected competitor has been shown here to satisfy SimplySay's complete contract.

## Acquisition and provenance

Repositories were obtained as source ZIPs, not executed during acquisition. Initial credential-free shallow `git clone` attempts failed when this environment denied writes to `.git/config` in per-command temporary folders. Nothing was substituted for a failed clone: GitHub's unauthenticated commit API resolved `HEAD`, then codeload downloaded the archive for that exact SHA. Extraction used PowerShell `Expand-Archive`. No submodules, dependency installation, global configuration, or model calls were used.

Stable local research root is the session's permitted visualization directory, under `communication-research/`, outside SimplySay's instruction-discovery tree. Archives and competitor source are not in the product repository or runtime package. This local root was retained after the lead approved a permitted location outside instruction discovery. No access credentials were supplied to GitHub.

Reproduction pattern (PowerShell, with an appropriately isolated writable destination):

```powershell
$repo = 'pedrosantospt/noyap'
$sha = (Invoke-RestMethod "https://api.github.com/repos/$repo/commits/HEAD").sha
Invoke-WebRequest "https://codeload.github.com/$repo/zip/$sha" -OutFile $zipPath
Get-FileHash -LiteralPath $zipPath -Algorithm SHA256
Expand-Archive -LiteralPath $zipPath -DestinationPath $sourceDirectory
```

For exact reproduction, replace the lookup with the recorded SHA, rather than asking for today's `HEAD`.

| Repository | Pinned SHA | ZIP SHA-256 |
|---|---|---|
| [mattpocock/skills](https://github.com/mattpocock/skills/tree/59db609eb1e18aaf59b63284d0e52255aff0c63c) | `59db609eb1e18aaf59b63284d0e52255aff0c63c` | `57B0F66DA2331D2F9BDBA65A6C990B3165D5C6EEC20537B28EB14607E10F71CA` |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail/tree/134b8e1a3a8078302b8ba77f86626c0802b2a6db) | `134b8e1a3a8078302b8ba77f86626c0802b2a6db` | `E3AD06C0811606C6A4B9F2A4D72B47D4196E1334413200B2BF6B7FF91D3EB064` |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman/tree/9b68f7ed12b05e7efaff18e65c5a3fc2849fd0a4) | `9b68f7ed12b05e7efaff18e65c5a3fc2849fd0a4` | `E6FD107A4BE45554FB0D5902C419B7C935D4AE7FB4A84344D99EE87F4F90B2CB` |
| [pedrosantospt/noyap](https://github.com/pedrosantospt/noyap/tree/5a21065dfac6526c011576a9065cd3c511580be3) | `5a21065dfac6526c011576a9065cd3c511580be3` | `3CBBEBC0FC78FA0A7D4B7F2AF5F5A2CE33475584AE21C6F99615F32654459DA6` |
| [obra/the-elements-of-style](https://github.com/obra/the-elements-of-style/tree/05fc4f0d2b97b7c042dd9949ad658568e4a1324e) | `05fc4f0d2b97b7c042dd9949ad658568e4a1324e` | `B3DD6A21360FE017C82393A3F719A9BFA936F244461E0DA5F485D0F91B142CAB` |
| [blader/humanizer](https://github.com/blader/humanizer/tree/0ef9fe5bc3572734fd3ae6c448fe00a30cd5dcf0) | `0ef9fe5bc3572734fd3ae6c448fe00a30cd5dcf0` | `3DD22EB2168514F05E66438911F66A8F1B391DB9C9F035A5280934E5A05FD6EA` |
| [shubhamv123/crisp](https://github.com/shubhamv123/crisp/tree/f0bbe514997b606e9c6aaa4544928eed47a16a62) | `f0bbe514997b606e9c6aaa4544928eed47a16a62` | `0C3E6CDF75F2D657C29A81B42C2384F1B9CC00DF18A9A2735A34F95F0F94E366` |
| [shengjiex98/say-it-well](https://github.com/shengjiex98/say-it-well/tree/3db4c178577ae2ab90de4ff5db44cbbcd449bb83) | `3db4c178577ae2ab90de4ff5db44cbbcd449bb83` | `AB99A0F10C9D45190D9903E2E219094E6E9AB218DB1B9CC7604B11A109712A30` |
| [cursor/plugins](https://github.com/cursor/plugins/tree/1ba91fc25c0977741dd0e267849e6234b037ed0a) | `1ba91fc25c0977741dd0e267849e6234b037ed0a` | `C3DD30859FBC60B08702CB0790B32A61404AF3BD8C029AD8127157C10722393C` |
| [Tradelord223/plain-english](https://github.com/Tradelord223/plain-english/tree/d108f2b61544cdabb33cd67f6365faf3f51259a9) | `d108f2b61544cdabb33cd67f6365faf3f51259a9` | `9EAA658D8E23D70F41DCCF2B3FB7F89425DC65A34409285664109F4BB8132609` |

## Inspected behavior and useful objections

Lengths below are measured whole-file whitespace words and raw UTF-8 bytes, including frontmatter. They are neither loaded-context measurements nor model tokens. Supporting references can add substantial context. No timing or network-overhead claim follows from these sizes.

| Candidate | Main instruction size | Source finding | Assessment for SimplySay |
|---|---:|---|---|
| wait-what | 60 words / 396 B | `skills/productivity/wait-what/SKILL.md` repairs misunderstood material; references ASD-STE100 and existing `GLOSSARY.md`/`GLOSSARY-MAP.md`. `disable-model-invocation: true`; OpenAI metadata also disables implicit invocation. | Strong repair comparator. Credit its intended repair scenario, not an automatic style feature. Restore missing context as well as removing filler. No proof that its tiny size causes better comprehension. |
| writing-for-agents | 1,777 / 10,886 B | Its skill distinguishes startup context, conditional references, completion criteria, and deletion experiments; `SKILL-MECHANICS.md` holds packaging-specific material. | Useful authoring hypotheses. Claims that a leading word recruits reliable behavior, or negation makes a forbidden behavior more likely, are not established experiments here. Reject importing its development workflow into end-user chat policy. |
| Ponytail | 592 / 3,496 B | Version 5.3.2; explicitly minimizes coding changes and adds coding procedures. Shared instruction builder reads the skill. `hooks/claude-codex-hooks.json` registers SessionStart, SubagentStart, UserPromptSubmit; activation can map a codebase and copy/nudge status-line setup. | Reject runtime philosophy and architecture reuse. Useful lifecycle and escaping tests. Three levels alter the work, so they are not SimplySay conciseness settings. Extra processes, persisted state, and coding instructions require justification rather than imitation. |
| Caveman base | 744 / 4,678 B | Version 4.0.1 manifest. Current base skill prioritizes clarity, preserves negations and literal payload, protects persisted content, and accommodates host communication requirements. Still allows dropped articles/fragments and imposes a 20-word ASD cue. Base/ultracave/megacave are different skills. | More boundary-aware than an old description may suggest. Reject persona, word cap, grammar removal, language compression, and deliberate propagation to ordinary subagents. Do not describe every current Caveman mode as identical. |
| NoYap | 827 / 5,326 B | Skill has truth/risk gates and tiny/normal/full budgets. Final boundary says final response only, while persistence and hook say every response. Hook contains a separate shorter ruleset. | Truthful verification and specific-risk reporting are useful goals. Hook/skill semantic drift is a caution against independently maintained copies. Does not establish SimplySay's full file, copy-ready artifact, or agent-message boundary. |
| Elements of Style | 325 / 2,211 B, plus large reference | Skill explicitly covers documentation, comments, UI copy, commits, reports, and any prose for people. Recommends a copyediting subagent when context is limited. OpenCode adapter registers the skills directory rather than enforcing invocation. | General writing advice is not a chat-only scope contract. Reject broad authoring scope, large compulsory guide, and runtime delegation. Selected ordinary principles need no bundled book. |
| Humanizer | 5,219 / 32,348 B | Version 3.1.0; current source protects factual meaning and literal code/data and recognizes harmful mechanical style rules. Has pasted, file, and embedded rewriting modes plus voice matching. | More nuanced than a phrase blacklist, but its job includes rewriting generated documents. Reject adopting that scope, voice workflow, and multi-pass artifact rewriting. Structural filler examples may inspire independent test cases. |
| Crisp, discovered | 373 / 2,567 B | Encourages article removal, technical abbreviation, fragments, arrows, no headings, and prose under three lines for coding tasks. Preserves technical literals; offers safety exceptions. | Useful compression counterexample. Preservation of symbols does not prove first-read comprehension. Reject fixed shapes and grammar stripping. Published token reductions do not measure SimplySay's desired outcome. |
| Say It Well, discovered | 902 / 6,092 B | Chat-specific guidance for progress, questions, explanations, reviews, and final handoffs; preserves requested format and terminology, distinguishes observation/inference/unknown, links conditional examples. Root and plugin skill copies. | Stronger conceptual alternative than persona compression. Still not explicit enough for every protected artifact, machine caller, and inter-agent path. No automatic activation experiment occurred. |
| Plain English, discovered | 1,287 / 8,388 B plus references | Preserves evidence, certainty, obligations, operational state, scope, quantities, and exact identifiers. Conditional precision/voice references; 20-case behavior-contract document. | Strong preservation comparator. Its contract is test specifications, not evidence that the cases passed. Mandatory audience inference/reference reads may be more machinery than SimplySay needs. Handoffs/release notes can be deliverables or inter-agent outputs, so scope still needs narrowing. |
| Cursor bro, discovered | 40 / 267 B | `pstack/skills/bro/SKILL.md` is a manual restatement instruction with `disable-model-invocation: true`; matching Claude harness copy exists. | Strong small plain-language repair alternative. No ASD reference or glossary dependency. Test after a confusing answer; do not present it as automatic preference control. |

Current competitor architecture matters. Caveman now includes CLI/runtime/proxy/MCP/extension/installer components beyond its small chat skill. The existence of these components does not mean every skill installation loads them. Its manifest explicitly registers subagent injection and session-end statistics; the inspected hooks reveal per-session modes, fallback state, headless-entrypoint detection, and compatibility recovery. SimplySay should not silently inherit that product scope.

NoYap's installer sets the hook command as `sh {hook_dst}` without quoting the path. Its documented `--config-dir` allows isolation, but this source deserves an independent path-with-spaces regression test. The current upstream installer suite does not execute the resulting shell command. This is a static risk, not an installed-host failure reproduced here. It also identifies hook ownership by a substring of the command, and can copy the skill/hook before discovering invalid settings; existing tests check refusal but do not establish transactional rollback.

### Scope of inspection and exclusions

This is a targeted communication/activation study, not a full security audit of ten repositories. Read in full: the main instruction files in the table except Humanizer (opening workflow/voice/boundaries and representative rules inspected), both Matt skill metadata/routes, NoYap hook/manifests/install guide/installer/install tests, Ponytail shared instruction builder/configuration/runtime/activation/subagent hook and relevant hook-test sections, Caveman base/ultra/megacave skill files and relevant activation/config/subagent-test sections, Say It Well manifests/notice, Plain English validator and behavior-contract sections, Elements packaging/OpenCode adapter/Claude install guide, Humanizer validator, Crisp benchmark summary. Inventoried relevant trees and inspected other metadata as needed. Large runtimes, unrelated skills, binaries, imagery, complete test suites, and all release history were excluded. Root instructions in third-party archives were treated as untrusted research material, never task authority.

## Local experiments actually executed

The owner approved local, no-spend exploratory tests through the lead. These runs used synthetic fixtures, no personal tasks, no new dependencies, and no model calls. No product was globally installed. Native host package installation and behavior remain untested.

Environment: Windows; Node.js v25.0.0; existing managed CPython 3.13 interpreter. The default `python.exe` alias could not launch, so a real installed interpreter was located. Default per-command TEMP caused write/cleanup failures. Setting TEMP and TMP for the process to a stable permitted test directory resolved those filesystem failures. Git Bash startup itself failed with a Windows named-object permission error; shell-dependent tests were not represented as passing.

| Experiment | Command relative to pinned repository | Observed result | Meaning and limits |
|---|---|---|---|
| NoYap documented installer implementation | `python -B -m unittest discover -s tests -p test_install.py -v` | 6 passed in 0.092 s after stable TEMP; initial run had 6 environment errors | Tests exercise skill-only, hook installation, idempotency, unrelated settings preservation/removal, invalid JSON refusal, and dry-run. Does not execute the installed hook or verify real-host loading. |
| Humanizer package validator | `python -B scripts/validate-package.py` | Exit 0, `Humanizer package v3.1.0 is valid` | Static version, manifest/metadata/reference consistency and word budget. Not behavior testing. |
| Ponytail hooks | `node tests/hooks.test.js` | Exit 0, `hook compatibility checks passed` after stable TEMP | Direct hook invocations using temporary home/config fixtures. Initial run failed the status-line path assertion with sandbox TEMP containing braces; stable path passed. This is not a measured model or native-install result. |
| Caveman subagent lifecycle | `node --test tests/hooks/subagent-start.test.mjs` | 13 passed, 0 skipped, approximately 1.7 s suite duration | Confirms local mode propagation to ordinary subagents, off-state behavior, fallback state, opt-out, and no subagent writes. Passing propagation tests support rejecting direct reuse for SimplySay. Does not prove anything about quality of subagent answers. |

Upstream claims and benchmarks were read but not independently reproduced as model results. Crisp reports output-token/word reductions; its summary does not establish comprehension or non-interference. NoYap distinguishes synthetic fixture mode from live CLI comparisons, and its benchmark code estimates tokens as UTF-8 bytes divided by four; that is not provider usage. Its tests include measurement/error/provenance handling and mocked CLI responses. Do not promote those unit tests or synthetic comparisons into live efficacy evidence. Ponytail's extensive benchmark machinery is not necessary for a small instruction product merely because it exists.

Reproduce the four commands in fresh permitted fixtures, inspect source before executing, set a stable TEMP/TMP, preserve the pinned SHAs, and capture new output rather than trusting this summary. The lead should have an independent reviewer do so before using the results as consequential evidence.

## ASD-STE100 decision

Primary sources: [official description](https://www.asd-ste100.org/about_STE.html) and [downloads/usage notice](https://www.asd-ste100.org/STE_downloads.html). The web browsing tool returned 403, but direct unauthenticated PowerShell HTTP retrieval returned 200 for both. Current official material identifies Issue 9, January 2025; a controlled English vocabulary and writing rules for technical documentation, with provision for technical nouns and verbs. The official download route requests a form for a free copy. No form was submitted, no full standard obtained, and no formal compliance evaluation was possible. The usage notice denies third-party endorsement/certification and directs readers to the edition's copyright statement.

| Candidate | Proposed test contrast | Strongest objection | Initial recommendation |
|---|---|---|---|
| Explicit ordinary language | Answer directly, write naturally, explain unfamiliar terms when useful; same scope boundaries in all variants | More words than a learned shorthand; may fail where a standard cue activates useful priors | Preferred baseline for experiments |
| Short named-standard cue | Replace only the plain-language clause with an ASD-STE100 reference | Interpretation/version knowledge may vary; English/documentation connotations and rigid limits may spill into chat | Research arm only, no compliance or branding claim |
| Selected principles | Explicit active constructions where clearer, one consistent term, clear referents, complete context | More instruction load, can become arbitrary mechanical rules | Retain individual clauses only if failures justify them |
| Hybrid | Ordinary instructions plus a named cue | Redundant size and unclear causal attribution | Add only if named cue shows benefit beyond explicit principles |

No current experiment demonstrates the cue's benefit across models or non-English conversations. Calling it unnecessary is a provisional engineering recommendation, not a measured negative result. Hold scope, language, model, effort, task, and environment constant; pre-register reader comprehension and preservation checks before comparing. Test technical terms, long necessary sentences, multilingual chat, a confused reader needing added context, and detailed requested artifacts. An English cue must not silently translate the user's language or make an answer unnaturally rigid. Do not copy a controlled dictionary or require a project glossary to test the hypothesis.

Independent challenge: the `host_distribution` sub-agent independently retrieved the two official pages and the pinned wait-what skill. It objected that STE's technical-term allowance defeats an argument that the standard necessarily removes domain terminology. It also required semantically comparable instructions rather than unequal examples across arms. Accepted: the concern is uncertain model interpretation and task fit, not demonstrated harm or a claim that formal STE prohibits technical terms. No experimental winner was selected.

## Video and creator-material evidence

Read the organizer's timestamped transcript and slide descriptions for [Building Great Agent Skills: The Missing Manual](https://ai.engineer/talks/UNzCG3lw6O0-building-great-agent-skills), linked to the [original recording](https://www.youtube.com/watch?v=UNzCG3lw6O0). Did not watch or listen to the recording. Approximate timestamps useful for verification: 3:28 invocation tradeoff; 7:22 steps versus conditional references; 16:18 pruning; 18:05 deletion tests. These are author proposals, not controlled evidence that minimal prompts necessarily improve SimplySay. Current repository files corroborate manual invocation and conditional-reference structures.

Also read the creator's [wait-what explanation](https://www.aihero.dev/skills-wait-what) and [writing-for-agents explanation](https://www.aihero.dev/skills-writing-for-agents). Current code uses `GLOSSARY.md`; older indexed copies mention `CONTEXT.md`. Do not rely on older mirrors. The claim that models copy an instruction's length is not established by an experiment inspected here.

Discovered a separate original video, [New Skills! v1.2 brings /wait-what, /writing-for-agents, and fixes /grill-me](https://www.youtube.com/watch?v=gaDdrDdczO4), via creator listings/transcript search. Opening YouTube exposed no usable transcript; no timestamped findings are claimed for it. A third-party auto-transcript lead was discovered but not relied on for implementation claims. The creator's [5 Agent Skills I Use Every Day](https://www.aihero.dev/5-agent-skills-i-use-every-day) provides additional workflow material, not a SimplySay efficacy study. Remaining video access is an explicit gap, not evidence that the demonstrations were watched.

## Discovery coverage and stopping rule

Search families included concise agent responses, plain-language chat skills, no-yap alternatives, response-style plugins, minimal narration, chat-only communication, ASD standard guidance, creator skill talks, and GitHub primary sources. Additional acquired original candidates were Crisp, Say It Well, Plain English, and Cursor's bro. Search-only leads included chat-only personal CEO rules, gist output styles, and shared-registry concise-answer entries. Excluded forks, aggregate skill mirrors, personal audience-specific rules, and prose/authenticity products whose scope would not change the mechanism choice. This is broad bounded discovery, not an exhaustive internet survey.

The strongest simple alternative now includes Claude's [native Concise output style](https://code.claude.com/docs/en/output-styles), independently opened and cross-checked against the host researcher. Its documentation preserves requested detail, safety content, and engineering thoroughness. That is a source claim, not our reproduced behavior result. A plugin output style can auto-apply but override a selected style; fork inheritance creates an audience concern. Its interaction with artifacts and delegated machine tasks still needs matched experiments.

Further discovery should focus on alternatives that solve a missing audience or loading mechanism, rather than collecting more examples of brevity prompts. Stop when additional candidates repeat known mechanisms and cannot plausibly change the design; reopen if a host introduces narrower output control or reliable audience metadata.

## Licensing and reuse

Source metadata/licenses inspected: Matt skills, Ponytail, NoYap, Humanizer, Crisp, Plain English, and Cursor pstack use MIT terms; Say It Well uses CC BY 4.0 and retains Google adaptation attribution; Elements metadata claims public domain for its 1918 basis; current Caveman uses Apache-2.0 with retained earlier MIT and third-party notices, not a blanket historical MIT assumption. These observations are not legal clearance for copying any entire repository. No third-party text or code was bundled into SimplySay by this work. Prefer original policy and original tests; if any substantial material is reused, inspect the exact file/revision license and preserve required notices.

## Decisions to take to the owner

1. Approve an experimental comparison, not a winning prompt: minimal ordinary instruction, explicit scope policy, native Concise, relevant unmodified competitors, and separate ASD variants.
2. Keep one adaptive default unless controls solve an observed need; native disable/re-enable first. No levels have been implemented.
3. Decide whether a host route that cannot reliably distinguish people from automated callers can be qualified support, or must remain excluded. This cannot be silently answered by writing another boundary sentence.
4. Approve actual host/model access and a trial budget separately. No model or installed-host efficacy result exists in this report. The current local no-spend scope is sufficient for structural and installer work, not live cross-model evaluation.
5. Judge meaningful communication benefit separately from essential-information and task-quality passes. Never let word reductions offset omissions or changed work.

## Independent review of the integrated proposal

Reviewed `docs/design.md` and the revised `docs/evaluation-plan.md` after this research recommendation was formed. No production policy or package was supplied. The revised proposal clearly distinguishes future SimplySay trials from the actual inert-catalog and upstream helper tests. No final improvement, perfect isolation, completed exhaustive source audit, licensing clearance, or published repository is claimed. Independently reran read-only reference inventory: 421 tracked files at observed HEAD `b9631bd8e3756f04c3cdbdff2dcc4dbf422754ba`; that verifies the inventory count, not working-tree cleanliness.

Remaining challenges sent to the lead before the approval brief:

1. A 24-task-session pilot is not by itself a monetary or model-call cap. Explicitly account for subagent calls, judges, failed starts, and diagnostics; authorize the host credentials and total usage separately. The high-risk multi-agent case can otherwise expand a superficially small allocation.
2. The independent holdout author needs a fresh context without candidate policy text or development outputs, with cases frozen before tuning. Merely being a different agent that has not seen the *final* policy can still allow candidate/example contamination through inherited context.
3. Report total shipped size and runtime prerequisites, including a preinstalled interpreter required by an adapter. A budget excluding optional artwork/licenses or measuring only new dependency installation can conceal real distribution or execution overhead. Separate policy bytes, total package bytes, host prerequisites, loaded tokens, and process cost.
4. Update stale report-status phrases: communication research is written and the ASD primary-source challenge occurred; the recommendation remains provisional because no model comparison ran. A completed reviewer discussion is distinct from an approved or behavior-validated decision.

These are planning corrections and approval questions, not failed SimplySay tests. The source-focused reference audit may be sufficient for the proposed product decision, but the remaining domain-file scope exception belongs to the owner; it cannot be silently called comprehensive.
