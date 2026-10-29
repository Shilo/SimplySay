# Reference-pack repair and restore handoff

## Current status and retained evidence

The requested local staging repair is complete. The incomplete staged `labels.csv` was replaced from `source-pack/labels.csv`, and the missing `layout.svg` was copied from `source-pack/layout.svg`. The already matching staged `manual.txt` did not need replacement.

Every expected source/staged pair was read and compared byte for byte and by SHA-256 after repair:

| Basename, in manifest order | Source bytes | Staged bytes | Status | SHA-256 of both |
| --- | ---: | ---: | --- | --- |
| labels.csv | 60 | 60 | matching | `61ded2b9f447f67160f0bf3489af7649e2a22006e08ad70d0750f142eb671c26` |
| layout.svg | 196 | 196 | matching | `b9aa5c06bcf8a05976145dae86471ea83d586224aba804afc189c9754460148a` |
| manual.txt | 122 | 122 | matching | `6dddb3b441ece7f14da54dc4c7f5d98b7ee70980ffcf64a2954c32f9d7854337` |

`handoff/verification.json` records this repaired state using the exact `archive-plan.md` inventory format: `{files, summary}`, the three basenames in the table's order, numeric byte counts, lowercase SHA-256 hashes and the required status strings. Summary: 3 expected, 3 present, 3 matching, 0 mismatched, 0 missing.

The original `source-pack/`, copy log, restore note, README, plan, draft and inspection tool remain unchanged. The initial `audit/findings.md` and `audit/inventory.json` remain unchanged historical evidence of 1 matching, 1 mismatched and 1 missing file before repair. Their statements describe that initial audit, not the repaired state. The supplied `draft-status.md` still contains unsupported completion, restore and deletion claims; use the current staff message below instead.

Preserved initial-audit SHA-256 values:
- `audit/inventory.json`: `553f3b6ac645db1ba06d7df39c30e019f1e0d2758bba60e26d67a2461890d2a4`.
- `audit/findings.md`: `82c2b1776a80cb9279b986100807a0218d2bba6b18e22fd777708eb70bfd5140`.

No files were deleted. No external backup was run, no external storage was accessed, and no clean-directory restore rehearsal was performed.

## What the measurements establish

A checksum is a value calculated from file bytes. Here SHA-256 produces a 256-bit fingerprint, written as 64 lowercase hexadecimal characters. Reading and hashing the entire file can detect content differences against a trusted recorded value, including differences in line endings or otherwise invisible bytes. Equal byte counts and SHA-256 values provide strong practical evidence of byte equality; this repair also compared the actual buffers directly. A matching length alone cannot detect same-length corruption.

A manifest enumerates the expected names, byte lengths and checksums so a verifier can find a missing file instead of hashing only whatever files happen to be present. This pack's expected set is exactly labels.csv, layout.svg and manual.txt. In the inventory schema, `source_*` fields record reference measurements, and `staged_*` fields record measured candidate files. A missing staged file uses null for both bytes and hash; it is different from a present zero-byte file.

A manifest must itself be trusted and preserved. A checksum is not an encryption key or a signature, and an editable manifest can be changed along with a damaged file. These checks do not establish that the original source is historically authentic, that its content is correct for workshop use, or that metadata such as ownership, permissions, timestamps and extended attributes was preserved.

The repaired state proves that, when checked, every expected staged file contained exactly the same bytes as the retained source. Both directories are in this one local environment. This does not prove that either will survive loss of this environment or remain readable in the future.

## Why the earlier evidence was insufficient

The copy log records exit code zero, a reported count of three and status complete. It contains no per-file hashes. Exit zero means the earlier command reported success under its own rules; it does not demonstrate that every expected destination path was present and equal. The initial audit found only two staged files and only one matching file. Nothing supplied establishes whether the original operation was incomplete or files changed afterward.

The restore note says the operator opened only staged manual.txt and read its revision line. It records no checks of labels.csv or layout.svg, no full-file hashing and no clean-directory restore. That spot check supports readability of one line in one file at that time. It cannot establish the completeness or recoverability of the full pack.

The repaired manifest replaces neither the original log nor the initial audit. It adds evidence of the current local state. It is not a record of an independent backup or a restore rehearsal.

## Repeat the local checks

Use PowerShell from the supplied task directory, with the installed local Node available for the optional inspection command. Pause edits and copying while measuring; a changing file set cannot be treated as a stable snapshot. These commands do not overwrite any manifest or audit file.

A quick raw inspection is:

```powershell
node .\tools\inspect-pack.cjs
if ($LASTEXITCODE -ne 0) { throw 'Inspection command failed.' }
```

Inspect all three entries. This tool reports measurements; its own successful exit is not a pass/fail verdict on file equality.

For a repeatable verdict, run the following whole block in one PowerShell session from the task root. It reads the preserved repaired manifest, independently checks both folders against it, then directly compares every source/staged byte. The helper functions are also used by the planned local rehearsal below. They accept only paths inside this task, reject links/reparse points and stop on unexpected directory entries.

```powershell
$ErrorActionPreference = 'Stop'
$taskRoot = (Get-Location).ProviderPath
$expected = @('labels.csv', 'layout.svg', 'manual.txt')

function Get-TaskPath {
    param([Parameter(Mandatory = $true)][string]$Relative)
    if ([IO.Path]::IsPathRooted($Relative)) { throw 'Use a task-relative path.' }
    $parts = @($Relative -split '[\\/]')
    if (@($parts | Where-Object { $_ -eq '' -or $_ -eq '.' -or $_ -eq '..' -or $_.Contains(':') }).Count) {
        throw 'Empty components, dot components and drive/stream syntax are not allowed.'
    }
    $resolved = [IO.Path]::GetFullPath((Join-Path $taskRoot $Relative))
    $prefix = $taskRoot.TrimEnd([char[]]'\/') + [IO.Path]::DirectorySeparatorChar
    if (-not $resolved.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) {
        throw 'Path leaves the task directory.'
    }
    $cursor = $taskRoot
    foreach ($part in @('') + $parts) {
        if ($part) { $cursor = Join-Path $cursor $part }
        if (Test-Path -LiteralPath $cursor) {
            $item = Get-Item -LiteralPath $cursor -Force
            if (($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
                throw "Refusing a link/reparse point: $cursor"
            }
        }
    }
    return $resolved
}

if (-not (Test-Path -LiteralPath (Get-TaskPath 'archive-plan.md') -PathType Leaf)) {
    throw 'Start from the supplied task directory.'
}
$manifestPath = Get-TaskPath 'handoff\verification.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
if (@($manifest.files).Count -ne 3 -or
    (($manifest.files.path -join '|') -cne ($expected -join '|'))) {
    throw 'Manifest does not enumerate the exact expected names in order.'
}
foreach ($entry in $manifest.files) {
    if (($entry.source_bytes -isnot [int] -and $entry.source_bytes -isnot [long]) -or
        $entry.source_bytes -lt 0 -or $entry.source_sha256 -cnotmatch '^[0-9a-f]{64}$' -or
        $entry.status -cne 'matching' -or
        $entry.source_bytes -ne $entry.staged_bytes -or
        $entry.source_sha256 -cne $entry.staged_sha256) {
        throw "Invalid repaired baseline: $($entry.path)"
    }
}

function Test-LocalPack {
    param([Parameter(Mandatory = $true)][string]$Folder)
    $folderPath = Get-TaskPath $Folder
    if (-not (Test-Path -LiteralPath $folderPath -PathType Container)) {
        throw "Pack directory is absent: $Folder"
    }
    $unexpected = @(Get-ChildItem -LiteralPath $folderPath -Force |
        Where-Object { $_.Name -cnotin $expected })
    if ($unexpected.Count) { throw "Unexpected entries in $Folder; stop and review them." }

    $records = @(foreach ($entry in $manifest.files) {
        $candidate = Get-TaskPath (Join-Path $Folder $entry.path)
        $length = $null
        $digest = $null
        $status = 'missing'
        if (Test-Path -LiteralPath $candidate) {
            if (-not (Test-Path -LiteralPath $candidate -PathType Leaf)) {
                throw "Expected a regular file: $candidate"
            }
            $buffer = [IO.File]::ReadAllBytes($candidate)
            $length = $buffer.LongLength
            $hasher = [Security.Cryptography.SHA256]::Create()
            try {
                $digest = [BitConverter]::ToString($hasher.ComputeHash($buffer)).Replace('-', '').ToLowerInvariant()
            } finally {
                $hasher.Dispose()
            }
            $status = 'mismatched'
            if ($length -eq $entry.source_bytes -and $digest -ceq $entry.source_sha256) {
                $status = 'matching'
            }
        }
        [pscustomobject][ordered]@{
            path = $entry.path
            source_bytes = $entry.source_bytes
            source_sha256 = $entry.source_sha256
            staged_bytes = $length
            staged_sha256 = $digest
            status = $status
        }
    })
    return [pscustomobject][ordered]@{
        files = $records
        summary = [pscustomobject][ordered]@{
            expected_files = 3
            present_files = @($records | Where-Object { $_.status -ne 'missing' }).Count
            matching_files = @($records | Where-Object { $_.status -eq 'matching' }).Count
            mismatched_files = @($records | Where-Object { $_.status -eq 'mismatched' }).Count
            missing_files = @($records | Where-Object { $_.status -eq 'missing' }).Count
        }
    }
}

$sourceNow = Test-LocalPack 'source-pack'
$stagedNow = Test-LocalPack 'staged-pack'
$sourceNow | ConvertTo-Json -Depth 6
$stagedNow | ConvertTo-Json -Depth 6
if ($sourceNow.summary.matching_files -ne 3 -or $stagedNow.summary.matching_files -ne 3) {
    throw 'Verification failed; retain all evidence and investigate. Do not refresh the baseline to hide a difference.'
}
foreach ($name in $expected) {
    $a = [IO.File]::ReadAllBytes((Get-TaskPath (Join-Path 'source-pack' $name)))
    $b = [IO.File]::ReadAllBytes((Get-TaskPath (Join-Path 'staged-pack' $name)))
    if ($a.Length -ne $b.Length) { throw "Byte length differs: $name" }
    for ($i = 0; $i -lt $a.Length; $i++) {
        if ($a[$i] -ne $b[$i]) { throw "Bytes differ: $name at offset $i" }
    }
}
'PASS: all three source and staged files match the recorded baseline and each other.'
```

In these repeat checks, `source_*` fields come from the frozen manifest; `staged_*` fields measure whichever folder is being tested. Testing source-pack first confirms that the current source still equals that recorded baseline. Testing a restored folder later needs only the manifest, not a readable original source.

If a fresh check fails, stop using a complete status, retain the source and record the failure separately. Do not modify the initial audit or the repaired verification manifest to make the result pass. Future snapshots belong in new, uniquely named files.

## Planned clean-directory rehearsal: local mechanics only

This procedure has not been run. It shows how to exercise reconstruction into a fresh local directory without changing the source or staging. It deliberately uses staged-pack as its input; even a passing result would demonstrate only local copying and verification, not recovery from an independent backup.

After loading the functions above, the following commands create a uniquely named run under `restore-rehearsal/` within this task. They refuse an existing destination and refuse overwriting copied files or the result record. They leave any failed run intact for investigation. They do not delete anything.

```powershell
# Planned procedure; not executed as part of this handoff.
$inputFolder = 'staged-pack'
$preflight = Test-LocalPack $inputFolder
if ($preflight.summary.matching_files -ne 3) { throw 'Rehearsal input failed verification.' }

$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssfffZ') + '-' + [guid]::NewGuid().ToString('N')
$parentPath = Get-TaskPath 'restore-rehearsal'
if (-not (Test-Path -LiteralPath $parentPath)) {
    New-Item -Path $parentPath -ItemType Directory -ErrorAction Stop | Out-Null
}
$runRelative = Join-Path 'restore-rehearsal' $runId
$runPath = Get-TaskPath $runRelative
if (Test-Path -LiteralPath $runPath) { throw 'Rehearsal destination must be new.' }
New-Item -Path $runPath -ItemType Directory -ErrorAction Stop | Out-Null
if (@(Get-ChildItem -LiteralPath $runPath -Force).Count -ne 0) {
    throw 'Rehearsal destination must be empty.'
}
foreach ($name in $expected) {
    $inputPath = Get-TaskPath (Join-Path $inputFolder $name)
    $outputPath = Get-TaskPath (Join-Path $runRelative $name)
    [IO.File]::Copy($inputPath, $outputPath, $false)
}

# Reads the restored files and the frozen manifest; does not read source-pack.
$restored = Test-LocalPack $runRelative
$record = [ordered]@{
    recorded_utc = (Get-Date).ToUniversalTime().ToString('o')
    input_folder = $inputFolder
    destination = $runRelative
    scope = 'local copy rehearsal; independent backup recovery not tested'
    verification = $restored
}
$resultPath = Get-TaskPath (Join-Path 'handoff' ("restore-check-$runId.json"))
$json = ConvertTo-Json -InputObject $record -Depth 8
# CreateNew refuses to overwrite any existing record.
$recordStream = [IO.File]::Open($resultPath, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write, [IO.FileShare]::None)
try {
    $encoded = [Text.UTF8Encoding]::new($false).GetBytes($json + [Environment]::NewLine)
    $recordStream.Write($encoded, 0, $encoded.Length)
} finally {
    $recordStream.Dispose()
}
$restored | ConvertTo-Json -Depth 6
if ($restored.summary.matching_files -ne 3) {
    throw "Restore verification failed; retain the destination and $resultPath."
}
"Local byte verification passed. Record content/usability checks separately for $runRelative."
```

After a real run, inspect every recovered file with appropriate local applications: all three data rows in labels.csv (including C3,Tool cabinet), the SVG rendering of the Bench 3 drawing, and the complete Revision 3 manual. Hashes do not test application compatibility or the accuracy of the instructions. Record who tested, when, the tools used, and any issues. Copy errors may stop the commands before a JSON result exists; preserve the partial directory and record that error separately. Do not report a full pass based only on the final copy command's exit status.

## Independent backup and recovery work still needed

No independent backup location, provider, retention period, recovery-time guarantee or completed rehearsal is established here. Keeping a source and staging folder in the same environment does not provide a separate failure domain.

For the next recovery decision, agree on a separate backup arrangement and a test plan. Keep this source while doing that work. A full independent rehearsal needs:

1. A backup that remains available after loss of this environment, including all expected files and a separately trusted copy of the inventory. Verify the backup's bytes and hashes after it is created. Merely copying the pack into another folder here does not meet this requirement.
2. A fresh recovery destination/environment, with no dependency on reading the original source or staging. Retrieve the files from the actual independent backup using the intended recovery identity and instructions. Validate every expected path, byte length and SHA-256 against the trusted manifest, then test usability of every recovered file.
3. Evidence of recovery when original media/environment is unavailable and of permission/access recovery using the intended recovery process. Conduct this through an isolated test setup without deleting live sources, damaging media or weakening live permissions. Record credentials/access prerequisites securely, not passwords in this guide.
4. A record of the actual input location, destination, dates, operator, commands/tool versions, complete results, application checks, failures and limits. Measure actual elapsed time if useful; do not turn a measurement into an unagreed guarantee.

The local commands above cannot access or prove recovery from an external backup. Develop commands for that independent arrangement only when its destination, access method and scope are known and authorized. A future successful rehearsal supports only the conditions actually exercised; media-failure and permission recovery remain unverified until separately tested and recorded.

The current decision is to retain the old source. No deletion is authorized by this repair or by a local checksum pass.

## Handoff verification notes

- Re-read all six expected source/staged paths, recorded actual byte counts and SHA-256 values, and directly compared every source/staged buffer after repair.
- Independently checked all six paths with PowerShell byte reads and `Get-FileHash -Algorithm SHA256`; results agree with the saved verification inventory.
- Executed the guide's full read-only PowerShell verification block against the repaired pack; both folder checks and all direct byte comparisons passed.
- Checked the PowerShell examples for syntax. The rehearsal block was not executed; it remains a planned procedure, not evidence of a completed restore.
- Compared the 11 protected source, evidence, audit and supporting files with their pre-repair byte counts and hashes. They remain unchanged. The already matching staged manual also remains unchanged.

## Staff message to copy (not sent)

> The staged reference pack has been repaired and all three expected files now match the retained source byte for byte and by SHA-256. The verification is recorded in handoff/verification.json. We are keeping the old source. This confirms the current local copy; independent backup and complete restore capability, including media-failure and permission recovery, remain unverified. The earlier completion/deletion draft should not be used.
