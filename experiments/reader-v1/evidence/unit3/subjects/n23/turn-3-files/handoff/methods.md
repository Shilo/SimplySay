# Methods handoff: finding-parts guide study

## Current decision and purpose

Keep the existing reference card in place while planning a limited, staffed check of the reorganized guide. The audited exercise shows less recorded lookup time on the seven comparable task pairs, with equal observed first-selection accuracy across all eight pairs. It does not establish readiness to standardize the guide.

This document lets the next coordinator reproduce the historical results, preserve the records, and plan the next check. The plan below has not been launched. No participants have been contacted and no committee message has been sent.

## Records to use and preserve

The [recorded protocol](../study/protocol.md) governs inclusion, arithmetic and the ten-field metrics format. [pairs.csv](../evidence/pairs.csv) identifies each volunteer, task and first format; [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) contain the measurements. The [capture notes](../evidence/capture-notes.md) explain the lost P7 stopwatch value and clarify first selections and later assistance. The [audit findings](../audit/findings.md) and [metrics](../audit/metrics.json) contain the reconciled results. The guide texts describe procedures, not additional observations.

[original-summary.md](original-summary.md) is a complete, byte-for-byte copy of [draft-summary.md](../draft-summary.md), including its incorrect claims and draft status. Preserve it as historical input; it is not the corrected committee conclusion. Corrections belong in audit or handoff documents, without rewriting the supplied protocol, raw records, observation notes or draft. Keep a future check in separately identified records with its own dated protocol and guide versions; do not append it to these CSVs and present the combined data as this exercise.

## What was measured, and how many people participated

There are four volunteers, V1 through V4. Each volunteer undertook two lookup tasks. For each task, that person tried both the reference card and the reorganized guide. That creates eight task pairs and sixteen format-specific attempts, with one missing elapsed-time measurement.

A pair is a comparison within the same person and lookup task. It controls some differences in person and task when describing the two formats. It does not create another person. For example, V3 supplies both P5 and P6: V3's store knowledge, habits and experience can affect both comparisons. Those two observations may resemble each other for reasons that have nothing to do with the guide. Treating them as two independent volunteers would exaggerate how many different people the evidence covers and could make uncertainty look smaller than it is.

Keep all valid comparisons for the descriptive calculation, but report both counts: eight task pairs from four volunteers, with seven pairs usable for timing. The seven timing pairs still involve all four people, although V4 contributes only one measured comparison. Any later statistical analysis must account for repeated measurements from people; calling the pairs independent is not a substitute. Even a person-aware analysis would not turn this small, nonrandom volunteer group in one staffed exercise into a representative sample of all shifts.

Order was balanced within each person: one task used the reference first and the other used the guide first. Overall, four pairs were reference-first and four guide-first. This reduces a systematic preference for one format always coming second, but repeating a lookup can teach the person its location. Coaching in an earlier attempt can also affect a later attempt. Balanced order cannot prove that familiarity and help had no effect. Excluding P7 leaves only three reference-first versus four guide-first timing pairs.

## Inclusion rules another coordinator should apply

1. Read all three CSVs and match by `pair_id`, never by row position. Check that each file contains P1 through P8 once, with no duplicate or unexpected IDs. Check volunteer/task/order assignments in `pairs.csv`.
2. Treat `seconds` as elapsed time. A usable value is present, numeric, finite and positive. A blank is missing, not zero, not an incorrect selection and not evidence of a particular speed. Flag invalid entries for review rather than silently coercing them.
3. Include a pair in timing only when both formats have usable times. Exclude both sides of an incomplete pair from the matched totals. Do not estimate missing seconds or borrow a measurement from another pair.
4. Retain all eligible timing pairs even if the first choice was wrong or help was used. The recorded protocol does not specify an accuracy-only or unaided-only timing subset. Removing inconvenient attempts would change the question after observing the results.
5. For each eligible pair, compute `reference seconds - guide seconds`. A positive value means the guide took less time; a negative value means it took more time; zero is a tie.
6. Sum reference and guide seconds over exactly the same eligible pairs. Divide their difference by the matched reference total to obtain percentage time saved. This is a ratio of totals, not an average of percentages from individual tasks.
7. Count first-selection accuracy independently of timing eligibility. A `true` value means the first bin selected was correct; `false` means it was incorrect. All eight pairs have both outcomes, including P7. Do not replace a first selection with eventual completion after coaching.
8. Retain `assisted` separately. A correct first choice can still be followed by help. Describe assistance without claiming its effect has been measured or subtracting an invented coaching duration from elapsed time.

For any future records with missing accuracy, flag the missing outcome explicitly and follow a prospectively defined rule. Nothing in this pack requires guessing an accuracy outcome: all sixteen first selections are recorded.

## Pair ledger and arithmetic

The times and savings below are in seconds. First selections are shown as reference / guide; help identifies the format with a later assistance flag.

| Pair | Person | First format | Reference | Guide | Saving | First selections | Later help |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| P1 | V1 | reference | 120 | 90 | 30 | correct / correct | none recorded |
| P2 | V1 | guide | 100 | 95 | 5 | correct / correct | none recorded |
| P3 | V2 | reference | 160 | 100 | 60 | incorrect / correct | reference |
| P4 | V2 | guide | 80 | 75 | 5 | correct / correct | none recorded |
| P5 | V3 | reference | 140 | 150 | -10 | correct / incorrect | guide |
| P6 | V3 | guide | 200 | 160 | 40 | correct / correct | reference |
| P7 | V4 | reference | 150 | missing | excluded | correct / correct | guide |
| P8 | V4 | guide | 110 | 130 | -20 | correct / correct | none recorded |

### Timing

Use P1, P2, P3, P4, P5, P6 and P8:

```text
Reference total = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Guide total     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Time saved      = 910 - 800 = 110 seconds
Pair-sum check  = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110 seconds
Percent saved   = 100 * 110 / 910 = 12.087912...%, approximately 12.09%
```

The guide was faster on P1/P2/P3/P4/P6, slower on P5/P8 and tied on none: `5 + 2 + 0 = 7`. P7 has no measured speed comparison. The total reference time including P7 is 1,060 seconds; comparing that total against the seven guide times would mix different sets of tasks. The full eight-pair time saving is unknown.

Use the precise phrase **12.09% less total recorded time on the seven measured pairs**. This describes elapsed time over these observations. It is not a 30% saving, an improvement on every task, an average individual benefit, or a promise about the next lookup. It also does not isolate the effect of the guide from practice and assistance.

### First-selection accuracy and assistance

Both formats were initially correct on six pairs: P1, P2, P4, P6, P7 and P8. The reference was wrong and the guide correct on P3; the reference was correct and the guide wrong on P5. Neither pair was wrong in both formats.

```text
Reference correct = 6 both-correct pairs + P5 = 7 of 8 = 87.5%
Guide correct     = 6 both-correct pairs + P3 = 7 of 8 = 87.5%
Observed accuracy difference = 87.5% - 87.5% = 0 percentage points
```

There is no observed accuracy improvement. Equal totals also do not prove equivalent accuracy: the errors occurred on different tasks, and a small exercise may miss problems that occur in ordinary work. First-selection accuracy says nothing by itself about eventual unaided completion or safety.

Reference assistance was recorded on P3 and P6; guide assistance on P5 and P7. Each format therefore has two assisted attempts out of eight, spread across four distinct pairs. Equal assistance counts do not establish equal difficulty, identical coaching or no coaching effect. P6 reference and P7 guide were initially correct despite later assistance.

## Worked example: P5

V3 looked up `find_brake`, reference first. The reference record is 140 seconds, correct first selection, no later assistance. The guide record is 150 seconds, incorrect first selection, later assistance.

Both times are positive, so P5 remains in timing. Its saving is `140 - 150 = -10` seconds: the guide was ten seconds slower. Its reference outcome contributes one correct selection; its guide outcome contributes zero correct selections. Later coaching does not change the guide's recorded first selection. Removing P5 because it was incorrect or assisted would improperly improve the guide's reported results.

This pair directly contradicts claims that the guide was faster on every measured pair or initially correct on all eight tasks. It also shows that going second did not guarantee a faster guide attempt. It does not prove the guide caused the wrong choice or delay: the record does not isolate task-specific confusion, labels, coaching duration or other influences. A future observer should investigate where the brake lookup became unclear without rewriting this outcome.

## Worked example: P7

V4 looked up `find_chain`, reference first. The reference took 150 seconds and its first selection was correct, with no assistance recorded. The guide's first selection was also correct and later assistance was recorded, but its stopwatch value was lost during export. The capture notes state that no alternative time exists in the pack.

Exclude P7 from timing on both sides. Do not use its 150 reference seconds in the matched denominator, enter zero for the guide, infer a time from task order, or substitute another volunteer's time. There is no basis to label P7 faster, slower or tied.

Retain P7 in accuracy: it adds one correct first selection to each format and one pair to the accuracy denominator. Retain the guide assistance flag as well. A missing stopwatch value does not erase an observed first selection, and a correct first selection does not establish that the whole task was completed unaided. This is why timing has seven pairs while accuracy has eight.

## Reproduce the results with installed tools

Run the following from the supplied task directory in PowerShell. It reads files and prints results; it does not modify records. The supplied checker establishes structural consistency, not the benefit claim. The separate calculation below recomputes every required metric and compares it with the audited JSON. Its small CSV reader is appropriate for this pack's plain, unquoted fields; use a CSV parser if future files introduce quoted commas or multiline fields.

```powershell
node tools/check-evidence.cjs
@'
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');

function read(file, header) {
  const lines = fs.readFileSync(file, 'utf8').trimEnd().split(/\r?\n/);
  assert.equal(lines.shift(), header);
  const keys = header.split(',');
  return lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, keys.length);
    return Object.fromEntries(keys.map((key, i) => [key, cells[i]]));
  });
}
function index(rows) {
  const result = new Map(rows.map(row => [row.pair_id, row]));
  assert.equal(result.size, rows.length, 'duplicate pair_id');
  return result;
}
function time(value) {
  if (value === '') return null;
  const number = Number(value);
  assert(Number.isFinite(number) && number > 0, 'invalid elapsed time');
  return number;
}
const pairs = read('evidence/pairs.csv',
  'pair_id,volunteer_id,task,first_format');
const ref = index(read('evidence/reference.csv',
  'pair_id,seconds,correct,assisted'));
const guide = index(read('evidence/guide.csv',
  'pair_id,seconds,correct,assisted'));
const ids = [...index(pairs).keys()].sort();
assert.deepEqual(ids, ['P1','P2','P3','P4','P5','P6','P7','P8']);
for (const records of [ref, guide]) {
  assert.deepEqual([...records.keys()].sort(), ids);
  for (const row of records.values()) {
    assert(['true', 'false'].includes(row.correct));
    assert(['true', 'false'].includes(row.assisted));
  }
}
const joined = pairs.map(pair => {
  const r = ref.get(pair.pair_id), g = guide.get(pair.pair_id);
  return {id: pair.pair_id, rt: time(r.seconds), gt: time(g.seconds),
    rc: r.correct === 'true', gc: g.correct === 'true'};
});
const eligible = joined.filter(row => row.rt !== null && row.gt !== null);
const sum = (rows, value) => rows.reduce((total, row) => total + value(row), 0);
const metrics = {
  eligible_time_pairs: eligible.length,
  reference_seconds: sum(eligible, row => row.rt),
  guide_seconds: sum(eligible, row => row.gt),
  time_saved_seconds: sum(eligible, row => row.rt - row.gt),
  faster_pairs: eligible.filter(row => row.gt < row.rt).length,
  slower_pairs: eligible.filter(row => row.gt > row.rt).length,
  tied_pairs: eligible.filter(row => row.gt === row.rt).length,
  accuracy_pairs: joined.length,
  reference_correct: joined.filter(row => row.rc).length,
  guide_correct: joined.filter(row => row.gc).length
};
assert.equal(metrics.faster_pairs + metrics.slower_pairs + metrics.tied_pairs,
  metrics.eligible_time_pairs);
assert.equal(metrics.reference_seconds - metrics.guide_seconds,
  metrics.time_saved_seconds);
assert.deepEqual(metrics,
  JSON.parse(fs.readFileSync('audit/metrics.json', 'utf8')));
console.log(JSON.stringify(metrics, null, 2));
console.log('Percentage time saved: ' +
  (100 * metrics.time_saved_seconds / metrics.reference_seconds).toFixed(2) + '%');
console.log('Excluded from timing: ' +
  joined.filter(row => row.rt === null || row.gt === null).map(row => row.id).join(', '));
'@ | node
```

Expected metrics, with no percentage or extra fields added to the protocol JSON:

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

The final console lines should report `12.09%` and P7 as the excluded timing pair. A failed assertion requires investigation; do not change a source record just to make the check pass.

## What the results establish and leave unresolved

The matched times establish a local descriptive saving of 110 seconds over the recorded eligible pairs, with two slower guide attempts. The accuracy cards establish equal first-selection totals and identify the different wrong selections. The notes and assistance flags establish that coaching occurred. Those are useful reasons to examine the guide further and to target known difficulties.

They do not separate the effect of the guide from familiarity, coaching or conditions in the staffed exercise. The recorded elapsed times include attempts with errors and assistance; the pack does not provide a basis for removing coaching time or relabeling them as accurate, unaided completion times. No timing result is available for P7. There was no randomized sample of store volunteers, independent repeat study, unattended-shift evidence or live rollout. The records therefore do not establish a population-wide speed benefit, equivalent accuracy, a safety guarantee or readiness for every shift. Do not add a significance or confidence claim that treats the eight task pairs as independent people.

## Practical next-check plan, for agreement before any launch

### Scope, staffing and assignments

Use the current reference card for ordinary operations while the check is planned. A proposed planning envelope is two staffed sessions of at most 45 minutes each, with up to six volunteers total and two matched task pairs per person: at most twelve pairs and twenty-four format-specific attempts. These are suggested workload limits for the coordinator to agree, not a statistical sample-size calculation or a claim that twelve pairs will settle adoption. Confirm that the available helper and observer can manage the workload; if they cannot, reduce scope before recruiting rather than allowing incomplete logging. No sessions or invitations have been arranged by this handoff.

Include more than one experience level and, where feasible, two ordinary shift contexts within that envelope. Record experience and context so the coordinator can see whose work was represented. Include brake-related lookups to investigate P5 and valve-related lookups to investigate P8, alongside typical parts from other categories. Preserve the distinction between targeted problem tasks and routine tasks so the resulting total is not described as a representative average of all store work.

For the paired component, have each person attempt one task reference-first and a different task guide-first; document the assignment before observations. Vary which tasks receive each order across people. Keep instructions, starting position and available help consistent. A repeated lookup still permits learning, even with balanced order. If the time budget permits observation of fresh routine lookups after the paired tasks, record those separately as a transfer check: do not treat different, unmatched lookups as matched pairs or blend their seconds into the paired total. A staffed check can assess use in ordinary work with a helper available; it still cannot establish unattended performance.

### Measurements and record handling

- Give every attempt a session ID, person ID, task/item ID, guide version, format and order. Keep identities consistent across repeated observations. Record interruptions and unusual circumstances.
- Define timing start and stop before the check. One practical choice is task prompt to first bin selection as the primary time, with verified completion time and later help recorded separately. State the chosen definition in the new protocol; do not assume it is identical to the historical stopwatch endpoint or pool the two exercises.
- Record the first selection and its correctness before coaching. Then record whether help occurred, when it started and what caused it. Help remains available; never rewrite the first selection after a correction.
- Preserve wrong, slow and assisted attempts. Mark lost or interrupted times with the reason. Apply the pre-agreed timing rule consistently and report all missing values instead of filling them in.
- Check the record count and required cells before ending each session. Retain the original timing and outcome record alongside its transcription so a lost export can be detected. Correct transcription through a dated correction log with provenance rather than overwriting the original observation.
- Observe where brake or valve lookups become unclear. If the guide is revised, assign a new version and report it separately. Do not attribute a problem to the text without observing the point of confusion.

### Decisions the coordinator must settle before starting

The historical protocol supplies no adoption thresholds. Agree and record the following for the next check before reviewing its outcomes:

| Decision | Practical requirement |
| --- | --- |
| Workload and coverage | Confirm the session/time/person caps, available staff, task list and experience/shift coverage. Keep the check bounded; do not expand it automatically to obtain a favorable result. |
| Accuracy requirement | Specify the minimum acceptable first-selection performance and what decline or task-specific error would block adoption. Count wrong guide choices even if a helper fixes them. A small number of error-free attempts cannot prove equivalent accuracy. |
| Error and help response | Agree what assistance level is acceptable. A proposed rule is to stop and review each wrong-bin choice before that lookup continues and pause the exercise if the same confusion recurs. Keep the helper available and define when a guide revision is required. |
| Useful time improvement | Set a minimum practically useful reduction in comparable elapsed time. Consider accuracy and need for help alongside speed; a faster wrong choice is not an adoption success. |
| Completeness and interpretation | Define interruption/missing-data handling and the planned summaries by pair, person, order, errors and assistance. Acknowledge remaining practice effects and small-sample limits. |
| Review point | Review the bounded check once its agreed window ends. Unresolved errors, heavy reliance on help, missing comparisons or inconsistent results should lead to revision or a deferred decision, not automatic standardization. |

Summarize the next check with the same separation of timing eligibility and first-selection accuracy, while following its prospectively chosen timing definition. Show individual people and orders as well as the total. Report any routine-work observations separately. Use the results to decide whether ordinary-work accuracy and usability have been demonstrated sufficiently for a later adoption decision; treat a favorable limited check as further evidence, not a universal guarantee.

## Committee message, ready to copy; not sent

> We will keep the current reference card in place while we plan a limited, staffed check of the reorganized guide. The corrected audit covers eight task pairs from four volunteers. Seven pairs had usable times for both formats: 910 seconds with the reference card and 800 seconds with the guide, a saving of 110 seconds, or about 12.09% less total recorded time. The guide was faster on five pairs and slower on two. First-selection accuracy was equal at seven correct out of eight for each format, so the records do not support the draft's claim of a 30% time saving or improved accuracy.
>
> The tasks were repeated, coaching occurred, and one guide time was missing. These limits leave the guide's effect on ordinary-shift speed, accuracy and need for help uncertain. The results support planning a limited check before standardization. Before it starts, we need to agree its scope and the accuracy, assistance and useful time-saving criteria that will govern the next decision. No further check has started.

## Handoff verification

The reproduction commands above were executed successfully from this task directory using installed Node.js v25.0.0. The structural checker reported eight pairs, four volunteers, eight records per format and P7 as the only missing guide time. The separate calculation reproduced all ten audited metrics, the 12.09% saving and the P7 exclusion; the displayed expected JSON also matched `audit/metrics.json`.

The archived draft was compared byte-for-byte and by SHA-256 with `draft-summary.md`; both hashes are `4a7277ebee0f9597a1e066107380540c66590c6b81304218c91dc46cfd2135d4`. All twelve pre-existing files, including the audit outputs, retained their SHA-256 hashes. Only `handoff/methods.md` and `handoff/original-summary.md` were added. Work stayed within the supplied task directory and used no external services.
