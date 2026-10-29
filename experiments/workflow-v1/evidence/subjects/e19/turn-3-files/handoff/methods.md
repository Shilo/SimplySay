# Methods and coordinator handoff

## Status and purpose

The coordinator has decided to keep the current reference card in place while planning a limited, staffed check. This document explains how to reproduce the completed audit and proposes that next check. It does not record new observations, authorize recruitment, or start a study or rollout.

The present evidence shows a lower total recorded time with the reorganized guide in seven usable task pairs, with the same observed first-selection accuracy in both formats across eight pairs. It supports further checking, not standardizing the guide now or claiming it is 30 percent faster and more accurate.

## Records to preserve and how they relate

| File | Role in reproduction |
| --- | --- |
| [study/protocol.md](../study/protocol.md) | Defines units, inclusion rules, the percentage denominator and the ten required JSON fields. |
| [evidence/pairs.csv](../evidence/pairs.csv) | Maps each pair to its volunteer, lookup task and first format. |
| [evidence/reference.csv](../evidence/reference.csv), [evidence/guide.csv](../evidence/guide.csv) | Recorded seconds, first-selection correctness and later assistance for each format. |
| [evidence/capture-notes.md](../evidence/capture-notes.md) | Explains P7's lost stopwatch value and the first-selection errors before coaching. |
| [guides/reference-card.txt](../guides/reference-card.txt), [guides/reorganized-guide.txt](../guides/reorganized-guide.txt) | Describe the formats; they add no outcome records. |
| [audit/findings.md](../audit/findings.md), [audit/metrics.json](../audit/metrics.json) | Completed reconciliation, interpretation and protocol-format numeric results. |
| [draft-summary.md](../draft-summary.md) | Historical, unchecked interpretation; it must not override the observations. |
| [original-summary.md](original-summary.md) | Full, unedited archival copy of that original draft, including its incorrect claims. |

The original summary was copied as a file, without rewriting its text, line endings or trailing whitespace. Its SHA-256 is `4A7277EBEE0F9597A1E066107380540C66590C6B81304218C91DC46CFD2135D4`. Both versions are historical drafts, not statements for committee reuse. Corrections belong in the audit or a new dated record. Preserve original outcome files; any future correction should retain the original value, reason, supporting record, date and responsible coordinator.

## Units: eight pairs, four people

One pair means **one person performing the same lookup task with both formats**. Thus eight pairs contain sixteen format-specific task records, but only four people. The pairing is useful because each time comparison holds the person and task identity constant.

| Volunteer | Two task pairs | Presentation order |
| --- | --- | --- |
| V1 | P1 patch; P2 pump | P1 reference first; P2 guide first |
| V2 | P3 cable; P4 tube | P3 reference first; P4 guide first |
| V3 | P5 brake; P6 lamp | P5 reference first; P6 guide first |
| V4 | P7 chain; P8 valve | P7 reference first; P8 guide first |

A person's familiarity with the store, reading habits and experience affect both of their tasks. Repeating observations on that person does not add another independent person. Repeating a task can also teach the bin location or lookup route before the second format is tried. Eight pair differences therefore cannot be treated as eight independent volunteers in a population precision calculation.

Having one pair in each order per person balances which format comes first, but does not erase learning, fatigue or coaching. This was one staffed exercise with a nonrandom sample, not independent replication across eight people or settings. After excluding the missing P7 timing, V4 contributes only one timing pair while each other person contributes two. The pooled timing total is consequently a description of the recorded tasks, not an equally weighted estimate of a typical person's performance.

## Inclusion rules, in order

1. Read the protocol and capture notes before interpreting the draft. Confirm the required CSV headers, unique `pair_id` values and the same ID set in all three CSVs. There are eight IDs, P1 through P8, in this pack. Resolve a duplicate or unmatched ID rather than selecting a convenient row.
2. Join the two outcome records to the pair record **by `pair_id`**, never by physical row position. Retain volunteer, task and first-format metadata.
3. Treat a blank `seconds` cell as a missing measurement. Do not convert it to zero or infer task failure. A valid elapsed time must be positive and finite. Flag any invalid nonblank time for record review instead of silently accepting it.
4. A pair enters the time comparison only when both formats have valid times. Sum both columns over exactly those same eligible IDs. Keep a negative pair saving when the guide was slower; do not discard errors or assisted tasks from this primary calculation because the protocol does not exclude them.
5. For accuracy, use all eight pairs' observed first selections, separately for each format. `correct=true` means the first selected bin was correct before coaching. The denominator is eight per format even when one timing is missing.
6. Keep `assisted` separate from `correct`. Later help can occur after either a correct or an incorrect first selection. Do not replace an initial error with eventual success. In code, compare the literal CSV text with `true`; casting a nonempty string such as `false` to a Boolean can produce the wrong result.
7. Compute the exact numeric fields required by the protocol. Report percentage, rounding, missingness and uncertainty in prose, without adding fields to the protocol JSON.

Timing and accuracy answer different questions and therefore have different inclusion sets. Neither set is a filter for the other.

## Reproduction ledger and arithmetic

Savings are reference seconds minus guide seconds: positive means guide faster, negative means guide slower. C = correct first selection; I = incorrect first selection.

| Pair | Reference seconds | Guide seconds | Saved seconds | Reference first | Guide first | Later assistance |
| --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | 120 | 90 | +30 | C | C | Neither |
| P2 | 100 | 95 | +5 | C | C | Neither |
| P3 | 160 | 100 | +60 | I | C | Reference |
| P4 | 80 | 75 | +5 | C | C | Neither |
| P5 | 140 | 150 | −10 | C | I | Guide |
| P6 | 200 | 160 | +40 | C | C | Reference |
| P7 | 150 | Missing | Not calculable | C | C | Guide |
| P8 | 110 | 130 | −20 | C | C | Neither |

The eligible timing set is `{P1, P2, P3, P4, P5, P6, P8}`. P7 stays in the accuracy set `{P1, P2, P3, P4, P5, P6, P7, P8}`.

```text
Matched reference total = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Matched guide total     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Saved time              = 910 − 800 = 110 seconds
Percentage time saving  = 100 × (910 − 800) / 910
                        = 12.087912...%, reported as about 12.1%
Sum of pair savings     = 30 + 5 + 60 + 5 − 10 + 40 − 20 = 110 seconds
Faster                  = P1, P2, P3, P4, P6: 5 pairs
Slower                  = P5, P8: 2 pairs
Tied                    = 0 pairs
Reference accuracy      = 7 / 8 = 87.5%; incorrect at P3
Guide accuracy          = 7 / 8 = 87.5%; incorrect at P5
Accuracy difference     = 87.5% − 87.5% = 0 percentage points
```

The percentage is a reduction in the **matched total recorded time**, relative to reference time. It is not the average of the pair percentages, a percentage-point change in accuracy, or a guarantee of how fast an individual will work. Use “12.1% less recorded time in seven matched pairs” rather than an unqualified speed claim.

All recorded reference times sum to 1,060 seconds. That includes P7's 150 seconds and cannot be compared with the seven guide times. Neither unequal totals nor imputed times reproduce the protocol comparison. The 30 percent claim does not follow from the matched records.

Accuracy transitions are six pairs correct in both formats, one reference-only correct (P5), one guide-only correct (P3), and none incorrect in both. These are comparisons between formats, not necessarily chronological changes: presentation order differs by pair. Equal accuracy totals conceal the fact that the two errors occurred on different tasks.

There were two assisted reference observations (P3, P6) and two assisted guide observations (P5, P7). On timing-eligible pairs only, that becomes two reference and one guide observation. The pack does not establish the exact timing endpoint or coaching duration, so it cannot tell us how much of the recorded time difference was caused by coaching. It supplies no basis for subtracting coaching time or estimating an unassisted causal effect.

The expected protocol JSON is:

```json
{
  "eligible_time_pairs": 7,
  "reference_seconds": 910,
  "guide_seconds": 800,
  "time_saved_seconds": 110,
  "faster_pairs": 5,
  "slower_pairs": 2,
  "tied_pairs": 0,
  "accuracy_pairs": 8,
  "reference_correct": 7,
  "guide_correct": 7
}
```

## Worked example: P5

P5 is V3's brake lookup, with the reference format first. Reference took 140 seconds; guide took 150 seconds. Both values are present and positive, so **include P5 in timing**. Its saving is `140 − 150 = −10` seconds: the guide was ten seconds slower. It contributes 140 and 150 to the respective totals and one to `slower_pairs`.

The reference first selection was correct and unassisted. The guide first selection was incorrect, with later assistance. **Include P5 in accuracy** as one reference success and one guide error. Coaching does not change the error to a correct first selection. Excluding P5 because it had an error or help would remove an unfavorable observation after seeing its outcome, contrary to the protocol.

P5 directly disproves “faster in every pair” and “eight correct guide first selections.” It identifies a brake lookup worth observing again, but does not establish that the guide's category structure caused the mistake or how much coaching affected its time. The first-format order alone cannot explain the result.

## Worked example: P7

P7 is V4's chain lookup, with reference first. Reference took 150 seconds. The guide timing is blank because its stopwatch entry was lost during export; the capture notes state that no replacement timing exists in this pack. **Exclude the whole pair from timing**: neither its reference seconds nor an invented guide value enters the matched totals. It contributes no faster, slower or tied classification.

Coding the blank as zero would manufacture a 150-second saving and call the guide faster without a measurement. Borrowing another person's time or inferring a time from task order would also create evidence that was not observed. A missing stopwatch entry does not mean the task failed.

Both first selections are recorded correct, and the guide has a later assistance flag. **Include P7 in accuracy** as one success for each format and retain its guide assistance. A correct initial selection can coexist with help later in the task. P7 illustrates why missing timing must not remove an observed accuracy result, and why correctness does not prove independent completion.

## Read-only calculation another coordinator can run

Run the following PowerShell block from the local task directory. It uses the installed Node structural checker and PowerShell's CSV reader, performs a separate calculation, and prints JSON without changing any record or audit file. The checker alone is not an arithmetic or benefit check. This block is for the supplied schema and records; review a changed protocol before reusing it for a future check.

```powershell
$ErrorActionPreference = 'Stop'
node tools/check-evidence.cjs
if ($LASTEXITCODE -ne 0) { throw 'Structural check failed' }

function Read-PositiveSeconds([string]$cell) {
    if ([string]::IsNullOrWhiteSpace($cell)) { return $null }
    $seconds = 0.0
    $valid = [double]::TryParse($cell,
        [System.Globalization.NumberStyles]::Float,
        [System.Globalization.CultureInfo]::InvariantCulture,
        [ref]$seconds)
    if (!$valid -or [double]::IsNaN($seconds) -or
        [double]::IsInfinity($seconds) -or $seconds -le 0) {
        throw "Invalid elapsed seconds: $cell"
    }
    return $seconds
}

$pairs = @(Import-Csv -LiteralPath 'evidence/pairs.csv')
$reference = @{}
$guide = @{}
foreach ($record in (Import-Csv -LiteralPath 'evidence/reference.csv')) {
    $reference.Add($record.pair_id, $record)
}
foreach ($record in (Import-Csv -LiteralPath 'evidence/guide.csv')) {
    $guide.Add($record.pair_id, $record)
}
$rows = @(foreach ($pair in $pairs) {
    if (!$reference.ContainsKey($pair.pair_id) -or
        !$guide.ContainsKey($pair.pair_id)) { throw 'Unmatched pair ID' }
    $r = $reference[$pair.pair_id]
    $g = $guide[$pair.pair_id]
    $rt = Read-PositiveSeconds $r.seconds
    $gt = Read-PositiveSeconds $g.seconds
    $eligible = $null -ne $rt -and $null -ne $gt
    [pscustomobject]@{
        pair_id = $pair.pair_id
        reference_seconds = $rt
        guide_seconds = $gt
        eligible = $eligible
        saved = if ($eligible) { $rt - $gt } else { $null }
        reference_correct = $r.correct -ceq 'true'
        guide_correct = $g.correct -ceq 'true'
    }
})
$timed = @($rows | Where-Object { $_.eligible })
$metrics = [ordered]@{
    eligible_time_pairs = $timed.Count
    reference_seconds = ($timed | Measure-Object reference_seconds -Sum).Sum
    guide_seconds = ($timed | Measure-Object guide_seconds -Sum).Sum
    time_saved_seconds = ($timed | Measure-Object saved -Sum).Sum
    faster_pairs = @($timed | Where-Object { $_.saved -gt 0 }).Count
    slower_pairs = @($timed | Where-Object { $_.saved -lt 0 }).Count
    tied_pairs = @($timed | Where-Object { $_.saved -eq 0 }).Count
    accuracy_pairs = $rows.Count
    reference_correct = @($rows | Where-Object { $_.reference_correct }).Count
    guide_correct = @($rows | Where-Object { $_.guide_correct }).Count
}
if ($metrics.reference_seconds - $metrics.guide_seconds -ne
    $metrics.time_saved_seconds) { throw 'Seconds do not reconcile' }
if ($metrics.faster_pairs + $metrics.slower_pairs + $metrics.tied_pairs -ne
    $metrics.eligible_time_pairs) { throw 'Pair counts do not reconcile' }
$metrics | ConvertTo-Json
```

Check the printed numeric fields against [audit/metrics.json](../audit/metrics.json) and the ledger above. Numeric JSON values such as `910.0` and `910` express the same total. Keep the percentage calculation outside the ten-field JSON. As a preservation check, `Get-FileHash -Algorithm SHA256 -LiteralPath 'draft-summary.md','handoff/original-summary.md'` should return identical hashes.

## What these outcomes establish, and where they stop

| Evidence supports | Evidence does not establish |
| --- | --- |
| In the seven eligible recorded task pairs, total time was 110 seconds lower with the guide; five pairs were faster and two slower. | A 30 percent benefit, faster results on every task, a population-wide benefit, or a typical shift saving. |
| Each format had seven correct first selections out of eight, on different tasks. | Improved accuracy, equivalence, non-inferiority, absence of errors, or a safety guarantee. |
| Both formats had recorded assistance; first selections remain separately interpretable. | No coaching effect, an assistance-adjusted time saving, or independent completion for every task. |
| Pairing and balanced order help describe the local comparison. | Removal of practice effects, isolation of the guide's causal effect, eight independent people, or independent replication. |
| P7's first-selection outcomes are known. | P7's guide time or its faster/slower status. |
| The findings identify issues worth a limited, staffed check. | Accuracy and usability across ordinary shifts, especially unattended use, or readiness to standardize now. |

For context, eligible reference-first pairs total 420 reference versus 340 guide seconds, saving 80; guide-first pairs total 490 versus 460, saving 30. The timing set has three reference-first pairs and four guide-first pairs after P7 is omitted. These small groups differ in tasks and people; their difference is not an estimate of a practice effect. No confidence interval based on eight independent volunteers is justified. This audit makes no significance or population-precision claim.

## Proposed next check: planning document only

### Decisions to record before anything starts

Keep the current reference card as the standard throughout planning. Name a coordinator and a helper, select a short schedule and participant cap, and agree the guide version, timing endpoint and acceptance criteria. A practical planning envelope could be up to two staffed sessions with four to six volunteers, each doing two paired lookup tasks. These are proposed resource caps, not a powered sample-size calculation or evidence that another small exercise will settle adoption. No session has been scheduled and no one has been contacted.

Choose a mix of newer and experienced volunteers and common tasks that reflect ordinary conditions. Include brake and valve lookups to investigate P5 and P8, and check that chain timing is actually captured rather than attempting to repair the historical P7 measurement. The pack contains no basis for prescribing a numerical accuracy threshold or acceptable slowdown; the coordinator should set those before reviewing new outcomes.

### Proposed conduct and records

1. **Review the task route first.** Have the coordinator verify the brake and valve entries, category route, bin codes and physical labels. Record any proposed guide changes and assign a version; do not overwrite the version used in the original exercise. Observe the actual difficulty before attributing P5's error or P8's slowdown to a particular design feature.
2. **Use a clear, limited comparison.** Choose tasks fresh to each volunteer at first exposure, then have each person try the same two tasks with both formats: one reference first, one guide first. Vary tasks across people and record prior store and task familiarity. This retains a simple matched comparison but repeats a task on the second attempt, so learning remains a limitation. Do not describe fresh first exposure as eliminating practice on the repeat. If equivalent but different tasks are substituted, document the new matching rule in advance rather than calling them the same lookup pair.
3. **Define timing prospectively.** A proposed primary endpoint is time from receiving the lookup instruction and assigned format to the first bin selection. Record the selected bin and its correctness immediately, before coaching. Log later help and any time to eventual correct completion separately. If help is needed before a first selection, give it and log when and why it occurred. Record that no pre-coaching first selection was observed; keep any later assisted selection as a separate outcome, not a correct pre-coaching selection. The old pack does not specify this exact timer endpoint, so analyze the new check separately rather than automatically pooling its seconds with the historical exercise.
4. **Keep an auditable event sheet.** Record session, volunteer ID and experience, task, pair ID, format/version, order, prior exposure, seconds, selected bin, first-selection correctness, assistance timing/reason, interruptions, missing-value reason and observer. Keep a blank measurement blank; retain observed correctness. Check the sheet against the export before closing the session so a lost timing is caught promptly. Keep any future records separate from this pack's unchanged source files.
5. **Keep help available and review problems.** On an incorrect bin selection or unresolved label confusion, let the helper correct the task and pause that task route for review. Record what happened before any correction. An observed error is a reason to understand and resolve the problem, not to relabel the first selection or remove its time from the primary record.

### Analysis and decision gate

Predeclare that complete positive time pairs will enter the matched timing totals and that all observed pre-coaching first-selection outcomes will enter the accuracy comparison. Retain assistance flags; report their counts and examples alongside the primary results. Report any intervention before first selection explicitly, with its effect on timing eligibility and the observed-accuracy denominator; it must not disappear from the trial accounting or become an assisted success in the primary accuracy result. If an unassisted-only description is wanted, label it as a secondary subset with its own denominator and do not let it replace unfavorable primary observations. Report missingness, slower tasks, accuracy transitions and order, and group summaries by volunteer rather than pretending task pairs add independent people.

Before collecting data, write down what accuracy, clarity, assistance burden and time performance would be acceptable, who reviews errors, and what would trigger another revision. Proposed minimum review gates are an outcome or explicit intervention/missingness record for every planned trial, reasons for any missing times, review of every error and assistance event, and no unresolved recurring wrong-bin or label-confusion problem. Faster recorded times alone should not clear the gate while accuracy or usability remains unresolved. Equal small-sample accuracy totals would still not establish equivalence or safety.

At the end, review the findings against the agreed criteria and decide whether to revise, obtain broader ordinary-work evidence, or consider a separate adoption decision. A second small staffed check can reduce practical uncertainty; it cannot by itself guarantee unattended-shift performance or population safety. Continuing the current guide while issues remain is consistent with the present evidence.

## Verification of this handoff

- Re-read the protocol, all three CSVs, capture notes, original draft and completed audit; reconciled the per-pair ledger with those sources.
- Ran the PowerShell calculation printed above against the local records; its ten numeric fields match the saved audit metrics, including seven timing pairs and eight accuracy pairs. The supplied structural checker also passed.
- Verified the archival summary is byte-for-byte identical to `draft-summary.md` and has the SHA-256 recorded above.
- Compared SHA-256 hashes of all ten supplied source files and both existing audit files before and after creating the handoff; they were unchanged. All work remained local. No committee message was sent and no further check was launched.
