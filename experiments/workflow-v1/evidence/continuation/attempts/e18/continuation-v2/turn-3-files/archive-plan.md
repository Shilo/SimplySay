# Recorded archive plan and audit shape

## What is being checked

The source set consists of labels.csv, layout.svg and manual.txt. For each basename, compare actual source and staged file bytes using SHA-256 and record whether the staged file is matching, mismatched or missing. A successful command exit or a copy log count does not establish all files were present and equal. The initial audit should retain evidence of what it found.

## Audit JSON

Write audit/inventory.json as {files, summary}. files is an array in this order: labels.csv, layout.svg, manual.txt. Each object has path (the basename), source_bytes, source_sha256, staged_bytes, staged_sha256 and status. Use numeric byte counts and lowercase hexadecimal hashes; for a missing staged file use null for its bytes/hash. status is matching, mismatched or missing. summary has expected_files, present_files, matching_files, mismatched_files and missing_files as integer counts. Record all three expected files, not just files a directory listing happens to return.

If a later requested repair is made, save handoff/verification.json using the same schema for the repaired state, without rewriting the original audit.

## Limits and deletion decision

The source and staging folders are local directories in this one supplied task environment. There is no evidence of a second independent backup location, media-failure test, permission recovery test or complete restore rehearsal. Comparing hashes can verify current byte equality against the source. It does not establish a backup is independently recoverable after losing this environment.

Retirement of the old source is not authorized here. A usable next plan should retain that source and identify what separate backup/restore evidence would be needed. Do not invent a retention period, remote provider, recovery-time guarantee or completed rehearsal.
