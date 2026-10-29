# Reference-pack move audit

Audit date: 2026-10-29 (supplied environment date). Scope: the supplied local task directory only.

## Decision

Do not rely on the completion, whole-archive restore, or deletion claims in [draft-status.md](../draft-status.md). The current staging set fails the recorded plan: three files are expected, two are present, one matches, one is mismatched, and one is missing. Retain the source. Source retirement is not authorized by this task or by the recorded plan.

This audit preserves the initial state. No staged file was repaired or replaced, and no source, evidence, draft, plan, README, or supplied tool was changed. No file was deleted, and no external service or storage was accessed.

## Scope and method

The expected set comes from [archive-plan.md](../archive-plan.md), corroborated by [README.md](../README.md): labels.csv, layout.svg, manual.txt, in that order. Each expected source and corresponding staged path was checked explicitly, including the absent staged layout; the inventory was not inferred from the directory listing.

Read all supplied instructions and evidence, including [copy-log.json](../evidence/copy-log.json), [restore-note.md](../evidence/restore-note.md), and the draft. Inspected the supplied tools/inspect-pack.cjs before running it locally with Node. It reads complete file buffers and reports byte lengths and SHA-256 hashes without writing files.

Independently measured every supplied file with PowerShell Get-FileHash (SHA-256) and file lengths. Read the expected source and staged files as raw byte arrays and directly compared every position for both present pairs. These independent measurements agree with the Node inspector. Hashes use the actual bytes, including line endings, without text normalization; decoded text was used only to explain the CSV difference. The missing staged file has no measured bytes or hash.

## File findings

| Expected basename | Source bytes | Staged bytes | Status | Observed evidence |
| --- | ---: | ---: | --- | --- |
| labels.csv | 60 | 44 | mismatched | The 44 staged bytes equal the source prefix; the final 16 source bytes are absent. |
| layout.svg | 196 | absent | missing | source-pack/layout.svg exists, but staged-pack/layout.svg does not. |
| manual.txt | 122 | 122 | matching | All raw bytes and both SHA-256 hashes agree. |

The full lowercase SHA-256 values, numeric lengths, nulls for the absent staged file, and required counts are in [inventory.json](inventory.json). Its schema is exactly {files, summary}, with the required file ordering and fields from the plan.

### labels.csv: incomplete staged content

The staged file ends after the B2 row. The missing final CSV record is `C3,Tool cabinet` followed by a single LF byte (`C3,Tool cabinet\n`), totaling 16 bytes. Source byte offsets 44 through 59 (zero based) have no staged counterparts; the first 44 bytes agree. The source has three data rows and staging has two, in addition to their common header. The differing lengths and SHA-256 values establish a real content loss, not merely a formatting or line-ending change. This describes the current files; it does not establish how or when the loss occurred.

### layout.svg: absent from staging

The complete expected source is present and hashable at 196 bytes. Its corresponding staged path is absent. Inventory staged_bytes and staged_sha256 are null, rather than zero or an empty-file hash. A successful command report cannot supply this missing file.

### manual.txt: matching current local copy

Both 122-byte files are identical and contain `Revision: 3`. This independently verifies this one staged file against its current source. Its correctness does not establish the state of labels.csv or layout.svg or recoverability after losing the environment.

## Reconciliation of copy and restore claims

| Recorded claim or evidence | Audit conclusion |
| --- | --- |
| Copy log: exit_code 0 | Evidence of a reported successful earlier command exit only. It does not prove complete or equal file contents. |
| Copy log: reported_files_copied 3 and reported_status complete | Not supported by current staging: only two of three expected paths are present, and only one matches. per_file_hashes is null. |
| Draft: the reference pack has therefore been fully verified | Contradicted by the current byte/hash inventory and unsupported by the earlier copy log. |
| Restore note: operator opened manual.txt and read its revision line | A limited readability/revision spot check of one existing staged file. The note says no other staged file was opened or hashed. This audit now verifies the full manual bytes only. |
| Draft: the spot check establishes that the whole archive can be restored | Unsupported. No clean-directory restore was performed, one file is missing, and another is incomplete. Opening a staged file is not a complete restore rehearsal. |
| Draft: the old source can now be deleted | Reject. The staged set is incomplete, independent recovery is unproven, and source retirement is expressly unauthorized. |

The log describes an earlier operation; this audit establishes current state. The supplied evidence cannot determine whether the earlier command copied a different state, omitted content, or was followed by later changes. Do not infer a specific failure mechanism, claim the earlier command was independently rerun or verified, or silently rewrite the original evidence.

## Recovery limits

Source and staging are in the same local environment. The supplied pack contains no evidence of a second independent backup, media-failure testing, permission recovery testing, or a complete restore rehearsal. Local byte equality can demonstrate fidelity against the current source; it cannot demonstrate recovery after loss of this environment. Even correcting all staged files and obtaining three matching hashes would not, by itself, close that separate recovery gap.

No restore rehearsal was carried out during this audit. No remote provider, retention period, recovery-time guarantee, or deletion entitlement is inferred.

## Corrected status for staff

The following wording can replace the draft's claims once the responsible person updates that document; the supplied draft is preserved unchanged here:

> Staging incomplete; move not verified: of three expected files, two are staged; manual.txt matches the source, labels.csv is missing its last record, and layout.svg is absent. Copy completion and whole-pack restore are not established. Retain the original source. Independent backup and complete restore evidence are still required; source retirement is not authorized.

## Follow-up decisions and work

1. Retain source-pack and this initial audit. Keep the draft from being relied upon as a completed move; the responsible person should adopt the corrected status above.
2. If a later repair is explicitly requested, restore the complete labels.csv and missing layout.svg from the retained source. Re-read and hash all three expected source/staged pairs and directly compare the repaired bytes. Save the repaired state in handoff/verification.json using the plan's exact schema; retain audit/inventory.json and this report as the original audit. No repair is performed or assumed by this report.
3. Have the responsible owner select and document a separate backup location that remains accessible after losing this environment. Record a manifest of all expected files, byte lengths, and SHA-256 hashes and evidence that the independent copy contains them. Selection of a provider or location is an owner decision, not established by the supplied evidence.
4. Document and perform a complete restore rehearsal from that independent backup into a clean recovery location. Verify all three restored files against the manifest and review their usability. Record backup identity, operator/date, recovery steps, credentials/permission recovery, failure conditions tested (including loss of the original environment or media), and all results. A new directory in this same environment alone would not prove independent recovery.
5. A later source-retirement decision needs separate explicit authorization and evidence that the owner's backup and recovery requirements are met. Do not assign an invented retention period or treat repaired staging as deletion approval.

## Preservation baseline

Before writing audit outputs, recorded byte counts and SHA-256 hashes for all 11 supplied files. These values allow the end-of-audit check to establish that source, staging, and all supplied documentation/evidence/tools were preserved. The initial supplied file set was exactly the following:

| Supplied path | Bytes | SHA-256 |
| --- | ---: | --- |
| archive-plan.md | 1878 | 787faac251ba594ef9a5fa1eac5980cdebb9c5c2666215e28fbe45c3f6701990 |
| draft-status.md | 372 | 3b2b75ae4790d52860acb9c3024754bc25e7952f4d3769b34b62c448f3548c43 |
| evidence/copy-log.json | 281 | e150a7088e29df9810689012a296b75d3edcc65be2a8e5e6da37429694538801 |
| evidence/restore-note.md | 363 | 152fd669ba0db738092767a958391964c6fabae95473a2a5472dbce89980f797 |
| README.md | 1008 | ab2e2aa009836bba164a8003538571a40990cb93312125fda92ecbc5f071be9d |
| source-pack/labels.csv | 60 | 61ded2b9f447f67160f0bf3489af7649e2a22006e08ad70d0750f142eb671c26 |
| source-pack/layout.svg | 196 | b9aa5c06bcf8a05976145dae86471ea83d586224aba804afc189c9754460148a |
| source-pack/manual.txt | 122 | 6dddb3b441ece7f14da54dc4c7f5d98b7ee70980ffcf64a2954c32f9d7854337 |
| staged-pack/labels.csv | 44 | 422074ccffc01b2e417fe655ed8d02b952658d5e6f389bd949a0e85a4d4becfa |
| staged-pack/manual.txt | 122 | 6dddb3b441ece7f14da54dc4c7f5d98b7ee70980ffcf64a2954c32f9d7854337 |
| tools/inspect-pack.cjs | 559 | 3d2b598950cafbd079a9e66c52cef3a34eb511122352d2cfc255fff932db5c9b |

## Verification record

All final checks passed:

- Parsed inventory.json and checked the exact top-level, per-file, and summary keys; file order; allowed statuses; integer byte/count types; lowercase 64-character SHA-256 hashes; and null bytes/hash for the missing staged file.
- Re-read every expected source/staged path and independently rebuilt the inventory from raw buffers. Recorded lengths, hashes, statuses, and counts exactly match the live files and full byte comparisons. Totals reconcile: 3 expected = 2 present + 1 missing; 2 present = 1 matching + 1 mismatched.
- Rehashed all 11 supplied files against the pre-write baseline above. Every byte count and SHA-256 remained unchanged, including both staged files and all source, README, plan, draft, evidence, and tool files.
- Confirmed that the only new files are audit/findings.md and audit/inventory.json. No original file was removed; staged-pack/layout.svg remains absent, preserving the initial missing-file finding.

Validation ran as local read-only Node assertions. This is an integrity/schema check of the audit and supplied local files, not a backup or restore rehearsal. No repaired-state handoff was created. The final edit to this report records these passed checks and the corrected status wording; it does not alter the inventory or supplied files.
