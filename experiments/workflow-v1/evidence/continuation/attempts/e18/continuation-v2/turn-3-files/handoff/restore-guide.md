# Reference-pack repair and restore guide

Status: repaired local staging; all three expected files match the retained source. No clean-directory restore rehearsal or independent backup was performed.

## What changed and what is preserved

The repair was explicitly requested after the initial audit. Copied the complete source-pack/labels.csv over the incomplete staged file and added source-pack/layout.svg to staging. The already matching staged manual.txt was left unchanged. Re-read all three source/staged pairs and verified full raw-byte equality, byte lengths, and SHA-256 hashes.

| Basename | Source bytes | Repaired staged bytes | Status |
| --- | ---: | ---: | --- |
| labels.csv | 60 | 60 | matching |
| layout.svg | 196 | 196 | matching |
| manual.txt | 122 | 122 | matching |

[verification.json](verification.json) records the repaired state in the exact archive-plan.md inventory schema and file order. Summary: 3 expected, 3 present, 3 matching, 0 mismatched, 0 missing. Each staged hash now equals its corresponding source hash.

All three source files, the copy log, restore note, original draft, README, plan, supplied inspection tool, and both initial audit files are preserved. The initial audit intentionally still describes the earlier mismatch and missing file; it is historical evidence, not the current-state inventory. Do not replace it with the repaired results. No file was deleted and no external storage or service was accessed.

Initial-audit SHA-256 values retained through this repair:

| Path | SHA-256 |
| --- | --- |
| audit/findings.md | 4ef55096e517d622f994d08ee9415cb7f68448e47e7ab3978a0972db791a9f56 |
| audit/inventory.json | 553f3b6ac645db1ba06d7df39c30e019f1e0d2758bba60e26d67a2461890d2a4 |

## What the evidence establishes

A checksum is a digest computed from file bytes. SHA-256 produces a 64-character hexadecimal value. A changed byte, a missing record, or a changed line ending normally produces a different digest. Equal SHA-256 values and equal lengths provide very strong evidence of byte equality; this repair also compared the complete byte buffers directly. A checksum does not establish that the source content is correct, current, readable by a particular application, or recoverable from an unavailable device.

A manifest names the complete expected set and records reference sizes and checksums. It lets a later check detect missing files as well as changed files. Here the manifest is handoff/verification.json, anchored to the retained source and the source measurements in the original audit. Iterating only files returned by a directory listing could miss layout.svg entirely; always check the three expected names. Keep this manifest and its provenance with recovery documentation. Hashes are not signatures: replacing both files and their reference manifest could conceal a change. A new manifest generated from untrusted or already damaged files cannot establish that they match the original.

The earlier exit-zero log reported command success and three copies, but supplied no per-file hashes. The initial inventory found only two staged files, one incomplete. The log could not establish current completeness or byte equality, and the evidence does not identify when or why the discrepancy arose. Opening manual.txt and reading Revision: 3 checked one line of one file. It did not test the other files or restore anything into a clean directory.

The repaired local copy now proves that, at verification time, all expected staged files are present and identical to their retained source. It establishes no independent recovery capability. Source and staging share one local environment; they could be lost together. There is still no evidence of an independent backup, a complete restore rehearsal, media-failure recovery, permission/credential recovery, or a recovery-time guarantee. The original source remains retained and source retirement remains unauthorized.

## Repeat the checks without changing evidence

Use installed PowerShell and Node. Run from the supplied task directory, keep writers idle during the checks, and investigate any failure. Do not regenerate verification.json to make a failed check pass. Record new check results separately. No command in the following check block copies, changes, or deletes pack files.

The path below is the supplied workspace. If a maintainer later relocates the pack, deliberately select that known local root before running; do not point these commands at an unrelated project or storage location.

~~~powershell
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath '<TASK_ROOT>'
$referenceRoot = (Get-Item -LiteralPath '.').FullName
$referenceManifestPath = Join-Path $referenceRoot 'handoff/verification.json'
$referenceManifest = Get-Content -LiteralPath $referenceManifestPath -Raw |
    ConvertFrom-Json

function Assert-ReferencePack {
    param(
        [Parameter(Mandatory)][string]$PackDirectory,
        [Parameter(Mandatory)][object]$Manifest
    )

    $expected = @('labels.csv', 'layout.svg', 'manual.txt')
    $records = @($Manifest.files)
    if ($records.Count -ne 3 -or
        ($records.path -join '|') -cne ($expected -join '|')) {
        throw 'Manifest must name all three expected basenames in plan order.'
    }
    if ($Manifest.summary.expected_files -ne 3 -or
        $Manifest.summary.present_files -ne 3 -or
        $Manifest.summary.matching_files -ne 3 -or
        $Manifest.summary.mismatched_files -ne 0 -or
        $Manifest.summary.missing_files -ne 0) {
        throw 'Manifest is not the verified repaired state.'
    }

    $directory = Get-Item -LiteralPath $PackDirectory -Force
    if (-not $directory.PSIsContainer -or
        (($directory.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0)) {
        throw 'Pack must be a real local directory, not a link or junction.'
    }
    $entries = @(Get-ChildItem -LiteralPath $directory.FullName -Force)
    if ((($entries.Name | Sort-Object) -join '|') -cne
        (($expected | Sort-Object) -join '|')) {
        throw "Unexpected or missing pack entries in $PackDirectory"
    }

    foreach ($record in $records) {
        if (($record.source_bytes -isnot [int] -and
             $record.source_bytes -isnot [long]) -or
            ($record.staged_bytes -isnot [int] -and
             $record.staged_bytes -isnot [long]) -or
            $record.source_bytes -lt 0 -or
            $record.source_sha256 -cnotmatch '^[0-9a-f]{64}$' -or
            $record.status -cne 'matching' -or
            $record.source_bytes -ne $record.staged_bytes -or
            $record.source_sha256 -cne $record.staged_sha256) {
            throw "Invalid repaired-manifest record: $($record.path)"
        }

        # Names were checked against the exact allowlist before path joining.
        $file = Get-Item -LiteralPath (
            Join-Path $directory.FullName $record.path
        ) -Force
        if ($file.PSIsContainer -or
            (($file.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0)) {
            throw "Expected a regular file: $($record.path)"
        }

        # Hash the same complete byte buffer used for the length check.
        $bytes = [IO.File]::ReadAllBytes($file.FullName)
        $sha = [Security.Cryptography.SHA256]::Create()
        try {
            $hash = [BitConverter]::ToString($sha.ComputeHash($bytes)).
                Replace('-', '').ToLowerInvariant()
        } finally {
            $sha.Dispose()
        }
        if ($bytes.Length -ne $record.source_bytes -or
            $hash -cne $record.source_sha256) {
            throw "Length or SHA-256 mismatch: $($file.FullName)"
        }
        [pscustomobject]@{
            path = $record.path
            bytes = $bytes.Length
            sha256 = $hash
            status = 'matching'
        }
    }
}

$sourceCheck = @(Assert-ReferencePack -PackDirectory (Join-Path $referenceRoot 'source-pack') -Manifest $referenceManifest)
$stagedCheck = @(Assert-ReferencePack -PackDirectory (Join-Path $referenceRoot 'staged-pack') -Manifest $referenceManifest)
$sourceCheck | Format-Table -AutoSize
$stagedCheck | Format-Table -AutoSize
Write-Output 'PASS: all three source and staged files match the saved manifest.'
~~~

Expected lengths are 60, 196, and 122 bytes. Both tables must show three matching records. Missing files, mismatches, unexpected entries, or links cause an exception. Do not catch and ignore that exception or use a command exit alone as the result. For automated use, run the check in a PowerShell process that exits with a failure status on an uncaught error.

The supplied tool also offers a quick read-only display:

~~~powershell
node .\tools\inspect-pack.cjs
if ($LASTEXITCODE -ne 0) { throw 'Inspector could not run.' }
~~~

That tool prints measured lengths and hashes but does not itself assert that the sets match. A zero exit from it is not the verification decision; the explicit checks above make that decision.

## Plan a clean-directory restore rehearsal

This section is a procedure for a later maintainer. It was not executed during this repair. First run the read-only block above in the same PowerShell session and require it to pass.

For a local procedure exercise, the following block creates a fresh, uniquely named rehearsal directory under this task root. It refuses an existing destination, checks the resolved parent, copies only the three allowlisted files from staging, refuses file overwrite, and validates the restored files against the saved manifest. It never copies back into source, staging, audit, or handoff and never deletes anything. Keep the rehearsal output as evidence; do not clean it up as part of this procedure.

~~~powershell
$ErrorActionPreference = 'Stop'
# Requires $referenceRoot, $referenceManifest, $referenceManifestPath,
# and Assert-ReferencePack from the read-only check block.
$null = @(Assert-ReferencePack -PackDirectory (Join-Path $referenceRoot 'staged-pack') -Manifest $referenceManifest)

$rehearsalDirectory = [IO.Path]::GetFullPath(
    (Join-Path $referenceRoot (
        'restore-rehearsal-' + [Guid]::NewGuid().ToString('N')
    ))
)
if ([IO.Path]::GetDirectoryName($rehearsalDirectory) -cne $referenceRoot) {
    throw 'Rehearsal destination must be directly under the checked task root.'
}
if (Test-Path -LiteralPath $rehearsalDirectory) {
    throw 'Refusing an existing rehearsal destination.'
}
$null = New-Item -ItemType Directory -Path $rehearsalDirectory
$restorePack = Join-Path $rehearsalDirectory 'pack'
$null = New-Item -ItemType Directory -Path $restorePack

foreach ($name in @('labels.csv', 'layout.svg', 'manual.txt')) {
    $from = Join-Path (Join-Path $referenceRoot 'staged-pack') $name
    $to = Join-Path $restorePack $name
    [IO.File]::Copy($from, $to, $false) # false means do not overwrite
}
$restoredCheck = @(Assert-ReferencePack -PackDirectory $restorePack -Manifest $referenceManifest)
$restoredCheck | Format-Table -AutoSize

$receipt = [ordered]@{
    recorded_utc = (Get-Date).ToUniversalTime().ToString('o')
    restored_from = (Join-Path $referenceRoot 'staged-pack')
    restored_to = $restorePack
    manifest_sha256 = (Get-FileHash -LiteralPath $referenceManifestPath -Algorithm SHA256).Hash.ToLowerInvariant()
    clean_directory_copy_and_hash_check = 'passed'
    files = $restoredCheck
    content_usability_review = 'pending'
    independent_backup_recovery = 'not exercised'
    media_failure_recovery = 'not exercised'
    permission_recovery = 'not exercised'
}
$receiptPath = Join-Path $rehearsalDirectory 'receipt.json'
$receiptText = $receipt | ConvertTo-Json -Depth 6
$null = New-Item -ItemType File -Path $receiptPath -Value $receiptText
Write-Output "Rehearsal evidence retained at $rehearsalDirectory"
~~~

If any command fails, stop, preserve the partial rehearsal directory, and record the error. Do not print or claim a successful rehearsal, reuse that directory, or overwrite evidence. A later retry should create a new unique destination.

After a successful copy/hash check, review the restored manual, all CSV records (including C3,Tool cabinet), and the SVG with a suitable local viewer. Byte checks do not decide whether the content is useful or applications render it correctly. Record the operator, actual date, source used, exact commands, receipt path, all file results, errors, and usability outcome in a new report beside the receipt. The receipt deliberately leaves usability and broader recovery tests pending.

A rehearsal from staging in this environment exercises local copy/restore steps and manifest checking. It does not demonstrate recovery after losing this environment. Do not label that local exercise as an independent-backup recovery test.

## Evidence still needed for independent recovery

The responsible owner must choose and document a separate backup location or medium that remains available if this environment is lost. No provider or location is selected here and no external backup operation is authorized or run by this guide.

For a later independent recovery exercise:

1. Establish the independent copy and retain its full manifest/provenance where the recovery operator can reach them without the original environment. Verify that all expected backup files match the known manifest.
2. Arrange a clean recovery destination and test access using the documented recovery identity and credentials. Establish how access would be recovered if the normal account or permissions were unavailable.
3. Make the original source and local staging unavailable to the rehearsal operator through isolation or access arrangements, without deleting them. Restore using only the independent backup and recovery documentation. Do not silently fall back to the source.
4. Verify every restored basename, length, and SHA-256 against the known manifest; perform content/usability review. Document the backup/medium identity, failure scenario (including original-environment or media loss), operator/date, steps, permissions tested, results, and limitations.
5. Record actual timings only if measured; agree any future recovery requirements separately. Keep the source. Neither this repair nor a successful rehearsal grants source-retirement authorization or defines a retention period.

## Handoff validation performed

Validated verification.json against its exact required keys, file order, integer byte/count fields, lowercase hashes, statuses, and live measurements. Re-read all six source/staged files and directly compared all three pairs. Rehashed the 12 unchanged pre-existing files against the baseline captured immediately before repair, including every source, log, supplied document/tool, both initial audit files, and the staged manual. All matched. The only changed pre-existing file is staged-pack/labels.csv; the only additions are staged-pack/layout.svg and the two requested handoff files.

Executed the guide's read-only PowerShell check block successfully against source and staging. Syntax-parsed all three documented PowerShell blocks without errors. The future restore block was not executed, and no rehearsal directory or restore receipt was created. These checks validate the current local files and repeat-check commands; they do not close the independent-recovery gaps described above.

## Staff message to copy (not sent)

> The staged reference pack has been repaired from the retained source. All three expected files are present and match the source byte for byte and by SHA-256. The original source, logs, and initial audit are unchanged; the repaired results are in handoff/verification.json. Use this status in place of the earlier unchecked draft. This verifies the current local copy only. We have not performed a clean-directory restore rehearsal or established an independent backup, media-failure recovery, or permission recovery. We will keep the old source. The next decision is to assign responsibility for an independent backup and a documented full restore rehearsal.
