# Finding-parts study: methods and coordinator handoff

## Current decision and record status

The current reference card will remain in place while a limited, staffed check is planned. The existing exercise provides a local timing signal, with no observed aggregate accuracy improvement. It does not justify immediate standardization. Nothing in this handoff schedules a session, recruits a volunteer, or starts another study.

The authoritative inclusion rules are in [study/protocol.md](../study/protocol.md). The completed [audit](../audit/findings.md) documents the corrections, and [audit/metrics.json](../audit/metrics.json) holds the ten required numeric fields. [original-summary.md](original-summary.md) is an exact byte-for-byte copy of [draft-summary.md](../draft-summary.md), including its title, incorrect claims, status line, encoding, and line endings. It is retained as historical input; the corrected committee wording is at the end of this document. The original draft and all other pre-existing files remain unchanged.

## What was observed and what counts as a unit

[pairs.csv](../evidence/pairs.csv) links each task pair to a volunteer, lookup task, and first format. [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) supply elapsed seconds, the first-selection outcome, and later assistance. [capture-notes.md](../evidence/capture-notes.md) explains the missing time and coached errors. The two guide texts describe the formats; they add no outcome observations.

There are four people, eight task pairs, and sixteen format-specific records. Each person performed two different lookup tasks; each task was attempted with both formats. A pair is therefore one person's comparison of the two formats on one lookup. The eight pairs are useful units for matching observations, but they are not eight independent people.

For example, V3 contributes both P5 and P6. V3's familiarity with parts, reading habits, and working speed can influence both pairs. Within P5, doing the lookup once may teach V3 the answer before the second attempt. All participants were also observed in one staffed exercise, so shared instructions and staff conditions can affect multiple observations. Counting pairs or individual format attempts as separate people would overstate the independent information and could make statistical uncertainty look artificially small.

Each volunteer had one reference-first pair and one guide-first pair. This is counterbalancing: it distributes which format gets the second attempt. It does not erase learning, prove randomized task assignment, or create independent replication. The volunteers were not a random sample of all store volunteers. A paired comparison helps control person and task differences within a lookup; it cannot by itself separate the guide's effect from practice, coaching, or order effects.

Use the counts precisely: **four volunteers; eight observed accuracy pairs; seven usable timing pairs**. Any future statistical model would need to recognize repeated observations within volunteers and the small number of people. This handoff reports descriptive totals without treating eight pairs as eight independently sampled people.

## Inclusion rules that must be reproduced

1. Read each CSV with its named columns and validate the records before calculating. Each file must contain exactly one row per pair ID, with no duplicates, unmatched IDs, or invalid flags. Recorded times must be positive numbers; an invalid nonblank time is a data issue to resolve, not silently discard.
2. Join each reference row and guide row to `pairs.csv` by `pair_id`. Never compare row positions: a reordered export should produce identical results.
3. Build the timing set from pairs that have a positive recorded time in both formats. A blank cell is missing measurement, not zero, failure, or evidence that no time was used. Do not reconstruct it from another task, task order, or another volunteer.
4. Sum reference and guide seconds over that same timing set. Define each saving as reference minus guide, so positive means less time with the guide. Count positive, negative, and zero differences as faster, slower, and tied, respectively.
5. Calculate percentage time saved as `100 * (matched reference seconds - matched guide seconds) / matched reference seconds`. This is the reduction in summed matched time. It gives longer reference lookups more weight than an unweighted average of pair percentages. It is not a percentage improvement promised for every volunteer or task. Use the words "less total lookup time" rather than treating this as a measured change in work throughput.
6. Calculate first-selection accuracy separately on all eight pairs with observed outcomes. Count `correct=true`, divide by eight for each format, and retain P7 despite its missing guide time. Do not restrict accuracy to timed pairs.
7. Preserve `correct` as observed before coaching. The separate `assisted` flag records later help; it cannot convert `correct=false` to true. The recorded protocol does not exclude assisted pairs from timing or accuracy.

For this pack, the eligible timing IDs are P1, P2, P3, P4, P5, P6, and P8. Only the guide time for P7 is missing. Therefore exclude P7's reference time as well as its unavailable guide time from the timing comparison. After that exclusion, timing includes three reference-first and four guide-first pairs; V4 contributes only P8 to timing. Accuracy still includes both tasks from every volunteer.

## Worked arithmetic

| Pair | Volunteer | Reference seconds | Guide seconds | Reference minus guide | Timing result |
| --- | --- | ---: | ---: | ---: | --- |
| P1 | V1 | 120 | 90 | 30 | Guide faster |
| P2 | V1 | 100 | 95 | 5 | Guide faster |
| P3 | V2 | 160 | 100 | 60 | Guide faster |
| P4 | V2 | 80 | 75 | 5 | Guide faster |
| P5 | V3 | 140 | 150 | -10 | Guide slower |
| P6 | V3 | 200 | 160 | 40 | Guide faster |
| P7 | V4 | 150, excluded | Missing | Unknown | Excluded from both time totals |
| P8 | V4 | 110 | 130 | -20 | Guide slower |

```text
Matched reference = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Matched guide     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Total time saved  = 910 - 800 = 110 seconds
Cross-check       = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110 seconds
Percentage saved  = 100 * 110 / 910 = 12.087912...%, reported as 12.1%
Direction counts  = 5 faster + 2 slower + 0 tied = 7 eligible pairs
```

The denominator is 910 matched reference seconds. Adding P7's 150 seconds only to the reference side would compare eight reference attempts with seven guide attempts. Treating the blank guide cell as zero would invent a 150-second saving for P7. Neither follows the protocol, and neither recovers the lost stopwatch observation. The records do not support the original draft's 30% claim.

Accuracy is calculated on P1-P8:

| Paired first-selection outcome | Pair IDs | Count |
| --- | --- | ---: |
| Both formats correct | P1, P2, P4, P6, P7, P8 | 6 |
| Only guide correct | P3 | 1 |
| Only reference correct | P5 | 1 |
| Neither correct | None | 0 |

```text
Reference correct = 6 both-correct + 1 reference-only = 7/8 = 87.5%
Guide correct     = 6 both-correct + 1 guide-only     = 7/8 = 87.5%
Guide minus reference accuracy = 0 percentage points
```

There is one error with each format, on different tasks. Equal totals do not mean every pair behaved the same way, and they do not establish that the formats are equally accurate in ordinary work.

## P5: an error remains an error after coaching

P5 is V3's `find_brake` task, with the reference card first. The reference record is `140,true,false`; the guide record is `150,false,true`, in the order seconds, correct, assisted.

Both times are positive, so P5 belongs in the timing comparison. Its contribution is `140 - 150 = -10` seconds: the guide took ten seconds longer. The first reference selection was correct; the first guide selection was incorrect. P5 contributes one correct observation to the reference numerator and none to the guide numerator, while remaining in both eight-pair accuracy denominators.

Later coaching is recorded for the guide attempt. It does not make that first selection correct, even if eventual completion was successful. The pack does not provide enough detail to isolate how help contributed to the elapsed time, or to attribute the mistake to a particular guide instruction. The repeat also means the guide was tried after prior exposure to this lookup. P5 is direct evidence against the draft's claims of a faster guide in every pair and eight correct guide first selections. It is a reason to examine the brake lookup and assistance needs before expansion, not proof of the cause of the error or a general failure rate.

## P7: missing time and observed accuracy are separate facts

P7 is V4's `find_chain` task, with the reference card first. The reference record is `150,true,false`; the guide record is `blank,true,true`. The capture notes explicitly say the guide stopwatch entry was lost during export and no other timing exists in this pack.

P7 cannot contribute a time difference. Remove its 150 reference seconds from the comparison as well as the unavailable guide value; do not estimate a guide time, record zero, or label the guide faster or slower. This leaves 910 reference seconds and 800 guide seconds over the same seven pairs. The timing loss means the pack cannot establish the total time change over all eight pairs.

Both first selections were observed and correct, so P7 contributes one correct observation to each numerator and one pair to each accuracy denominator. Removing it from accuracy would throw away valid outcome data because a different measurement was lost. Later guide assistance remains recorded, despite a correct first selection. A correct selection therefore does not establish that the task needed no help. P7 illustrates why correctness, assistance, and timing completeness must be stored and analyzed as separate fields.

## Reproduce the calculation locally

Run the following PowerShell block from the pack root, the directory containing `README.md`. It uses installed Node.js for the supplied structural check and built-in PowerShell CSV handling for independent arithmetic. It reads files and prints results; it does not rewrite evidence, the draft, or the audit. For this pack the supplied checker validates file shape, pair coverage, flags, and positive nonblank times. Its pass alone does not verify benefit claims.

```powershell
$ErrorActionPreference = 'Stop'
node tools/check-evidence.cjs
if ($LASTEXITCODE -ne 0) { throw 'Structural check failed; resolve records first.' }

$pairs = @(Import-Csv -LiteralPath evidence/pairs.csv)
$referenceRows = @(Import-Csv -LiteralPath evidence/reference.csv)
$guideRows = @(Import-Csv -LiteralPath evidence/guide.csv)
$reference = @{}
$guide = @{}
foreach ($row in $referenceRows) { $reference[$row.pair_id] = $row }
foreach ($row in $guideRows) { $guide[$row.pair_id] = $row }

# The structural check establishes one valid row per pair in both lookups.
# Test for a blank before converting seconds to a number.
$matched = @(foreach ($pair in $pairs) {
    $r = $reference[$pair.pair_id]
    $g = $guide[$pair.pair_id]
    if ($r.seconds -eq '' -or $g.seconds -eq '') { continue }
    [pscustomobject]@{
        pair_id = $pair.pair_id
        reference_seconds = [decimal]$r.seconds
        guide_seconds = [decimal]$g.seconds
        saved_seconds = [decimal]$r.seconds - [decimal]$g.seconds
    }
})

$referenceTotal = ($matched | Measure-Object reference_seconds -Sum).Sum
$guideTotal = ($matched | Measure-Object guide_seconds -Sum).Sum
$sumOfDifferences = ($matched | Measure-Object saved_seconds -Sum).Sum
if ($referenceTotal - $guideTotal -ne $sumOfDifferences) {
    throw 'Difference of totals must equal sum of pair differences.'
}

$metrics = [ordered]@{
    eligible_time_pairs = $matched.Count
    reference_seconds = $referenceTotal
    guide_seconds = $guideTotal
    time_saved_seconds = $referenceTotal - $guideTotal
    faster_pairs = @($matched | Where-Object { $_.saved_seconds -gt 0 }).Count
    slower_pairs = @($matched | Where-Object { $_.saved_seconds -lt 0 }).Count
    tied_pairs = @($matched | Where-Object { $_.saved_seconds -eq 0 }).Count
    accuracy_pairs = $pairs.Count
    reference_correct = @($referenceRows | Where-Object correct -eq 'true').Count
    guide_correct = @($guideRows | Where-Object correct -eq 'true').Count
}
if ($metrics.faster_pairs + $metrics.slower_pairs + $metrics.tied_pairs -ne $matched.Count) {
    throw 'Direction counts must equal eligible timing pairs.'
}
$metrics | ConvertTo-Json
$percent = [decimal]100 * $metrics.time_saved_seconds / $metrics.reference_seconds
Write-Output ('Percentage time saved: {0:N1}%' -f $percent)
```

The numeric object must agree with [audit/metrics.json](../audit/metrics.json): `eligible_time_pairs=7`, `reference_seconds=910`, `guide_seconds=800`, `time_saved_seconds=110`, `faster_pairs=5`, `slower_pairs=2`, `tied_pairs=0`, `accuracy_pairs=8`, `reference_correct=7`, and `guide_correct=7`. Percentage is printed separately, as the protocol requires. Reordering either outcome CSV must leave all results unchanged because the lookups are keyed by ID. Keep source corrections, if any are later documented, in a separately versioned record rather than overwriting this historical pack.

## What the results establish and what remains uncertain

The observed aggregate time reduction is real arithmetic on the seven recorded comparisons, and it provides a reason to investigate the guide further. Five observed tasks were quicker with the guide, while P5 and P8 were slower. The observed first-selection totals are identical, with errors on different tasks. These findings directly correct the draft's factual claims.

The totals do not estimate a guaranteed benefit for all volunteers, every shift, or every lookup. They do not show that the guide caused the entire 110-second reduction. Pairing cannot disentangle repetition and coaching, and the missing P7 time leaves one comparison unknown. The original timer's boundaries relative to later help are not fully specified in the supplied records, so the elapsed times cannot be decomposed into independent and assisted work. Three timed pairs have assistance in one format: reference P3 and P6, and guide P5. The protocol retains them; removing them would be a different analysis.

Across all eight pairs there are two assistance flags with each format: reference P3/P6 and guide P5/P7. Those equal counts do not show that help had no effect or that ordinary staffing needs are equal. Likewise, seven correct selections out of eight with each format is neither evidence of improved accuracy nor a demonstration of equivalent accuracy, acceptable safety, or successful independent use. A short staffed exercise with four nonrandom volunteers cannot resolve those questions. No unattended-shift evidence or separate replication is present.

## Practical next-check plan, for planning only

The next question is whether the reorganized guide remains accurate and usable during ordinary work with available staff support. Keep the current reference card in normal use while this is planned. Preserve this exercise as its own dataset. Any later check needs a new written protocol and separately versioned records; its observations should not be appended to these eight pairs as though they were the same study.

### Proposed bounded scope and task allocation

A concrete planning option is **at most two staffed sessions with up to six volunteers and four fresh lookups per person**, two using each format. That is a cap of 24 format attempts, not 24 people, and it is a feasibility screen rather than a sample-size claim that a benefit will be proved. These limits are proposed, not scheduled or authorized by this document. Include volunteers with varied store familiarity, with some beyond the original four where feasible, and record who has already seen the tasks or guide.

Prepare two blocks of comparable ordinary-work lookup tasks per volunteer. Within each block, assign one fresh lookup to each format. Balance which format comes first across the two blocks, and rotate exact task-to-format assignments across volunteers so that a difficult task is not always assigned to the guide. Use a recorded random assignment within that balanced schedule if practical. Include brake and valve lookups or comparable tasks that probe the P5 error and P8 slowdown, alongside routine categories. Check category wording, bin codes, and physical labels before any participant session; record suspected problems as hypotheses, not established causes. Preserve an explicit version of each format used.

Fresh comparable tasks reduce recall of an identical answer, but they introduce task-difficulty differences. Record the matching rationale and assignments. A block in this proposed design is not an identical-task pair from the old study. Analyze it under the new protocol, retain volunteer IDs, and describe remaining task differences; do not apply old paired arithmetic blindly or claim independent replication from additional tasks by the same person.

### Proposed observation and capture procedure

Use a named helper and an observer for each session; define their responsibilities and a consistent instruction/help script. Record whether a volunteer can use the guide and physical labels with the staffing the store can actually provide. The observer should capture the following for every attempt:

| Record | Purpose |
| --- | --- |
| Volunteer ID, prior exposure, session, task/block ID, format/version, order | Reconstruct allocation and recognize repeated observations |
| Start event and first-selection event, with elapsed seconds | Make the primary timing endpoint reproducible |
| First bin selected and correctness before help | Preserve accuracy independently of eventual completion |
| Whether help occurred, when it began, and what was needed | Describe assistance and interpret elapsed time |
| Optional time to eventual correct completion, separately labeled | Avoid mixing first-selection time with post-help completion time |
| Confusing category, wording, bin code, label, or observer intervention | Identify usability problems for review |
| Missing-data flag and reason, plus backup timing record | Prevent another lost-time value from becoming an invented observation |

A proposed primary endpoint is elapsed time from presenting the task to the first bin selection, with correctness assessed at that selection. A wrong first selection remains wrong even if the helper subsequently assists. If intervention is needed before a selection, mark that explicitly and use a prewritten rule; never call an unobserved independent selection correct. The new endpoint must be agreed before collection and is not assumed to match the old stopwatch endpoint. Keep eventual completion time separate. At the end of each session, reconcile first-selection cards, timing sheets, assistance notes, and exported IDs while the records can still be checked; preserve missing values rather than filling them from memory.

### Review gates and decisions to settle before collection

The coordinator should record the session/task cap, staffing, exact allocation, timing endpoints, and acceptable accuracy and assistance criteria before seeing new results. The current 7/8 accuracy is an observation, not an acceptance threshold. A practical proposed stop rule is to pause the affected task immediately after a wrong-bin selection or unresolved label, provide help, document what happened, and review the cause before reuse. A potentially consequential selection error should halt further use of that guide version pending review. These are proposed operating rules to settle in the new protocol, not findings about harm in this pack.

At the planned review, report all first-selection outcomes, help and intervention counts, missing measurements, timing on comparable eligible observations, and variation across people and tasks. Keep incorrect attempts visible in the primary results; any time analysis limited to correct or unassisted attempts must be labeled as secondary. Review the P5/P8 task concerns explicitly. Require accuracy and usability to meet the criteria agreed in advance before considering speed as a reason to expand. If records are incomplete or errors/confusion remain unresolved, retain the current card and revise or investigate before proposing another bounded check.

Even a clean small check would support a staged decision about further use; it would not prove population-wide speed, safety, or equal accuracy. The planning decisions now are the bounded scope, staff availability, task allocation, and acceptance/stop rules. No participant contact, scheduling, data collection, or rollout has occurred as part of this handoff.

## Committee message to copy, not sent

> We will keep the current reference card in place while we plan a limited, staffed check of the reorganized guide. The audit corrected the draft: four volunteers provided eight task pairs, with seven usable timing comparisons. Across those seven, total lookup time was 910 seconds with the reference card and 800 seconds with the guide, a reduction of 110 seconds (12.1%). The guide was faster in five pairs and slower in two. First-selection accuracy was 7/8 with each format across all eight pairs, so the claim of improved accuracy is unsupported, as is the claim of a 30% time saving. One guide time is missing, tasks were repeated, and coaching occurred within a single staffed exercise. These limits leave the guide's accuracy, assistance needs, and performance in ordinary work uncertain. We will define the next check's scope, staffing, and decision criteria before any sessions begin. No further study has started.

## Handoff verification

The PowerShell reproduction block above was executed against this pack and reproduced all ten audit metrics and the 12.1% rounded time reduction. The supplied structural checker passed. P5's timing/error/assistance fields, P7's missing timing and retained correct outcomes, accuracy transitions, and recorded order were checked against the CSVs and capture notes. The archived draft was verified as byte-for-byte identical to the supplied draft using direct byte comparison and SHA-256. Its SHA-256 is `4a7277ebee0f9597a1e066107380540c66590c6b81304218c91dc46cfd2135d4`.

Hashes of all twelve pre-existing files, including both audit outputs, matched the baseline captured before writing this handoff. Local document links were checked. Only `handoff/methods.md` and `handoff/original-summary.md` were added. All work used this local pack and installed tools; no external service was used and the committee message was not sent.
