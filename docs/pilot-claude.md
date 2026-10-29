# Claude feasibility pilot

Status: deferred by owner steering. No Claude model session has been launched (zero attempts). The owner has instructed this development agent to stop all direct Claude use, including further help/status/control commands. Future Claude trials belong in a standalone handoff that the owner can link and run separately. This work is disposable feasibility research, not production implementation. Access date: 2026-10-28, America/Los_Angeles.

## Approved boundary and coordination

The original approval covered a maximum of 24 evaluation sessions across hosts, including child agents, failures, and diagnostics. Subsequent owner steering prohibits this development agent from all direct Claude use, even if authentication or frozen inputs become available. Claude execution is reserved for a separate owner-directed run using the standalone handoff. New paid APIs, paid judging, production implementation, publication, permission bypasses, global preference changes, and copying whole credential/config/history stores remain excluded. The lead owns the allocation and reservation controller. Historical CLI help, version, and sanitized authentication metadata checks below were not model sessions.

Claude work is isolated to a stable temporary `SimplySay-pilot-20261028/claude` directory and assigned experimental files. No actual sign-in material is stored in the repository. No personal project content is used.

## Executed preflight

Claude Code version: 2.1.312. Inspected `claude --help`, `claude auth --help`, `claude auth status --help`, and `claude setup-token --help` in a fresh `CLAUDE_CONFIG_DIR`. Then checked existing-profile and fresh-profile `auth status --json`, retaining only allowlisted nonpersonal fields.

Observed:

- Existing default profile: `loggedIn: false`, `authMethod: none`, `apiProvider: firstParty`.
- Fresh isolated profile: the same unauthenticated state.
- No process-level Anthropic API key, bearer token, Claude OAuth token, Bedrock, Vertex, or Foundry selection was present.
- A credential file exists at the documented default Windows location. A metadata-only check found an OAuth entry but no nonempty access or refresh token. No token, account email, credential contents, or entire store was printed or copied. Its presence does not establish a usable sign-in.
- Default-profile resolution was verified to match the expected user default; the unauthenticated result was not caused by an accidentally inherited profile override.

These checks did not call a model and consumed zero evaluation sessions. A failed inference request must not be used merely to reconfirm the already observed authentication gap. The lead has been informed. No further direct authentication check will be run by this development agent under the revised instruction.

Before the stop instruction arrived, a separate inert packaging setup completed using `experiments/pilot/claude-setup.ps1 -RunId inert-preflight-1`, with no policy input and no model calls. Both local catalog/plugin manifests passed strict validation. Six separate temporary profiles were configured: absent inventory empty; installed-disabled inventory reported false; installed forced and one-time-selected variants reported enabled; native Concise profile held only the built-in setting; minimal profile inventory was empty. The one-time-selected profile stored `outputStyle: SimplySay pilot`. This is native installation/control evidence only. Neither the inert style nor a candidate policy was observed loading into a model, and no communication quality, subagent, machine-caller, or non-interference result follows. Raw control logs and package digests remain in the local temporary run directory; the repository contains the original setup script for traceability.

## Documented mechanisms and open decisions

The [authentication reference](https://code.claude.com/docs/en/authentication) distinguishes subscription OAuth from API/cloud credentials and documents the Windows credential location, profile-specific credentials, authentication precedence, and setup-token OAuth for scripts. Generating a new token opens an authorization flow and prints a credential, so it has not been run. Do not substitute API billing when subscription authentication is unavailable.

The [settings reference](https://code.claude.com/docs/en/settings) documents `CLAUDE_CONFIG_DIR` for separate settings/history/plugins. The [CLI reference](https://code.claude.com/docs/en/cli-reference) and installed help expose model/effort flags, source selection, explicit settings, MCP restriction, no-persistence operation, stream JSON, hook events, and forwarding child text. A separate profile is necessary but does not itself establish complete instruction or OS isolation. Inherited managed guidance, ancestor project files, plugin caches, memory, and tool reach still need inspection before a subject starts.

Candidate research routes, not yet assembled: actual local marketplace installation of a native output-style plugin, forced application versus one-time selected style, absent and installed-disabled states, native Concise, and a minimal instruction comparator. The central allocation may omit or defer arms within the 24-session cap; omissions must remain visible. Model and effort must be identical across matched arms. Actual stream events and changed artifacts must be retained, with child text distinguished from ordinary user-directed prose. A projected token estimate or plugin inventory is insufficient proof that style instructions loaded.

CLI `--bare` and `--safe-mode` alter customization/loading behavior and would invalidate ordinary installed-plugin testing. Neither is a shortcut to an enabled treatment. Permission bypass flags will not be used. Tool access must stay within the approved synthetic workspace; only task-needed permissions may be granted, identically across matched arms.

## Current deferral and blocker

Claude's documented status reported no usable existing sign-in during preflight. No new account, login flow, token generation, paid fallback, or diagnostic inference has been attempted. This is an access limitation, not evidence against the policy or native integration. More importantly, the owner has now deferred direct Claude execution and selected a Codex-first feasibility path. The standalone `docs/Claude_Pilot_Handoff.md` will carry independent instructions for any later owner-directed Claude run; the current agent must not resume direct Claude use because sign-in becomes available.

Sanitized preflight facts are recorded in `experiments/pilot/claude-preflight.json`. Raw credentials and private default configuration are not research artifacts. The standalone `docs/Claude_Pilot_Handoff.md` now includes the original frozen candidate/minimal text, all three independently authored task prompts and fixtures, and complete controller-only expected data/checks. Its embedded inputs/checks and policy wording were checked against the frozen source. A later receiving chat must obtain a newly confirmed allowance reconciled with the shared pilot budget; it does not inherit a second 24-session pool.
