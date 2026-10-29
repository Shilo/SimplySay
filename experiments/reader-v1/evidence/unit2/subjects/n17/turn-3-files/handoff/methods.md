# Methods and coordinator handoff

## Current decision and record status

The coordinator will keep the current reference card in place while planning a limited, staffed check of the reorganized guide. This handoff documents the existing exercise and proposes a future plan; it does not authorize or launch that plan.

The observed result is 110 fewer seconds across seven matched task pairs, a 12.1% reduction relative to matched reference time. The guide was faster in five pairs and slower in two. First-selection accuracy was 7/8 (87.5%) for each format across all eight pairs. Those results warrant further local checking, but do not establish improved accuracy, a 30% time reduction, or suitability for immediate standardization.

[original-summary.md](original-summary.md) preserves the complete original [draft-summary.md](../draft-summary.md) unchanged, including its incorrect claims and draft status. It is an archival record, not the corrected conclusion. Corrections belong in this handoff and [audit/findings.md](../audit/findings.md). The supplied protocol, evidence, guides and previous audit remain unchanged.

## Which source answers which question

| Source | Use |
| --- | --- |
| [study/protocol.md](../study/protocol.md) | Defines the unit, timing eligibility, first-selection outcome and required metrics. |
| [evidence/pairs.csv](../evidence/pairs.csv) | Links pair ID to volunteer, lookup task and first format. |
| [evidence/reference.csv](../evidence/reference.csv) and [evidence/guide.csv](../evidence/guide.csv) | Recorded seconds, first-selection correctness and later assistance for each format. |
| [evidence/capture-notes.md](../evidence/capture-notes.md) | Explains the lost P7 stopwatch entry and distinguishes first selections from later coaching. |
| The two files in `guides/` | Describe the formats; provide no additional observed outcomes. |
| [audit/metrics.json](../audit/metrics.json) | Machine-readable checked results, with exactly the ten fields required by the protocol. |

Neither the old draft nor eventual completion after coaching overrides the observed `correct` field. There is no replacement P7 time elsewhere in the supplied pack.

## Reproduce the inclusion rules

1. Read all three CSV files and match by `pair_id`, never row position. Check for duplicate or unmatched IDs, expected column names, valid boolean strings and positive numeric times when present. Here the IDs are P1-P8, each appearing once in each file.
2. Parse blank seconds as missing, before any numeric conversion. A blank is not zero, a failed lookup or an observed time. Invalid or nonpositive values require investigation rather than silent acceptance.
3. For timing, retain a pair only when both formats have positive recorded seconds. Use the same retained IDs for both sums. Here they are P1, P2, P3, P4, P5, P6 and P8. Exclude P7's reference time as well as its missing guide time from this comparison. Do not impute.
4. For every eligible pair compute `saved_seconds = reference_seconds - guide_seconds`. A positive difference counts as faster for the guide, a negative difference as slower, and zero as tied. Retain eligible pairs even if a first selection was wrong or assistance was recorded; the protocol does not exclude them.
5. For accuracy, independently retain all eight pairs with observed first selections. Count `correct == true` separately for each format, with a denominator of eight for each. Missing time does not remove an observed first selection. Later help does not turn an incorrect first selection into a correct one.
6. Sum the matched seconds, subtract guide from reference, and divide that difference by matched reference seconds for percentage saving. This is a ratio of totals, not the mean of individual percentage changes. Keep percentage and interpretation in text; the metrics JSON contains only the ten specified numeric fields.

## Audit trail and arithmetic

Positive saved seconds favor the guide. Assistance below occurred later than first selection; its relation to the stopwatch interval is not specified.

| Pair | Person | First format | Reference seconds | Guide seconds | Saved seconds | Reference first selection | Guide first selection | Later assistance |
| --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | V1 | Reference | 120 | 90 | 30 | Correct | Correct | None |
| P2 | V1 | Guide | 100 | 95 | 5 | Correct | Correct | None |
| P3 | V2 | Reference | 160 | 100 | 60 | Incorrect | Correct | Reference |
| P4 | V2 | Guide | 80 | 75 | 5 | Correct | Correct | None |
| P5 | V3 | Reference | 140 | 150 | -10 | Correct | Incorrect | Guide |
| P6 | V3 | Guide | 200 | 160 | 40 | Correct | Correct | Reference |
| P7 | V4 | Reference | 150 | Missing | Excluded from timing | Correct | Correct | Guide |
| P8 | V4 | Guide | 110 | 130 | -20 | Correct | Correct | None |

```text
Matched reference = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Matched guide     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Time saved        = 910 - 800 = 110 seconds
Difference check  = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110 seconds
Percent saved     = (110 / 910) * 100 = 12.087912...%, approximately 12.1%

Faster: P1, P2, P3, P4, P6 = 5
Slower: P5, P8            = 2
Tied: none               = 0
Count check: 5 + 2 + 0 = 7 eligible timing pairs

Reference correct: P1, P2, P4, P5, P6, P7, P8 = 7/8 = 87.5%
Guide correct:     P1, P2, P3, P4, P6, P7, P8 = 7/8 = 87.5%
Accuracy difference: 87.5% - 87.5% = 0 percentage points
```

Six pairs were correct with both formats. P3 was wrong only with the reference; P5 was wrong only with the guide. No pair was wrong with both. Assistance was recorded in reference P3/P6 and guide P5/P7: two observations per format. Equal assistance counts do not establish equal difficulty or show that help had no effect.

### P5: a wrong first selection remains wrong after help

V3 performed `find_brake`, using the reference first. The reference record is 140 seconds, correct first selection, no assistance. The guide record is 150 seconds, incorrect first selection, with later assistance.

Both times are positive, so P5 is eligible for timing. Its contribution is `140 - 150 = -10` seconds: the guide was ten seconds slower. Excluding it because the guide answer was wrong would remove a recorded unfavorable result in violation of the protocol.

For accuracy, P5 adds one correct reference first selection and one incorrect guide first selection to the eight-pair denominator. Later coaching does not justify changing the guide outcome to true, even if a correct bin was eventually reached. The notes establish coaching, not a new correct first selection. The pack also does not establish what caused the error or how much coaching contributed to elapsed time. Investigate the brake lookup path in a future check without asserting a cause from this single event.

### P7: a missing time does not erase an observed selection

V4 performed `find_chain`, using the reference first. The reference record is 150 seconds, correct first selection, no assistance. The guide record has a blank time, correct first selection and later assistance. The notes say the guide stopwatch entry was lost on export and no other timing exists in the pack.

P7 cannot contribute a time difference. Exclude it from both matched totals. Including the extra 150 reference seconds would produce 1,060 versus 800 seconds: those totals cover different sets of tasks and cannot measure the protocol's paired saving. Treating the missing guide time as zero would similarly invent a 150-second benefit. Do not estimate it from order, another person or another task.

P7 still adds one correct first selection to each format's accuracy count and denominator. Its guide assistance remains recorded. Correct first selection does not imply that the whole lookup was completed without help. The export explanation identifies the loss mechanism in the notes; it does not reveal the missing time or prove that the seven complete pairs represent all eight time comparisons.

## Why eight task pairs are not eight independent people

| Volunteer | Contributed pairs | Eligible timing pairs |
| --- | --- | --- |
| V1 | P1, P2 | P1, P2 |
| V2 | P3, P4 | P3, P4 |
| V3 | P5, P6 | P5, P6 |
| V4 | P7, P8 | P8 |

A pair is a comparison for one person doing one lookup with both formats. There are eight such comparisons, sixteen format-specific first-selection observations, and four people. Different task rows do not create additional volunteers. A person's knowledge of the store, speed and habits can influence both of their pairs, so those observations can move together. Calling the pairs eight independent people would overstate the amount of participant evidence and could make uncertainty look artificially small.

Matching within a task helps compare the formats for the same person and lookup. It also means the second attempt can benefit from remembering the part, category or bin. Each person used the reference first for one task and the guide first for another, but order balance does not erase learning, task differences or carryover from coaching. After P7 is excluded, the timing data contain three reference-first and four guide-first pairs; V4 contributes only one timed comparison.

The protocol does not say the volunteers were a random sample, and all records came from one staffed exercise. Four people in one session do not constitute independent replication across ordinary shifts. Do not calculate a population confidence interval or claim statistical significance by treating the eight pairs, or the sixteen format observations, as independent participants. Descriptive paired arithmetic is appropriate here; the pack cannot support a precise general effect estimate.

## What these results establish and leave open

| Result | Supported interpretation | Limit |
| --- | --- | --- |
| 910 versus 800 seconds over seven matched pairs | The guide had 110 fewer recorded seconds in these eligible comparisons, about 12.1% of matched reference time. | This is not a 30% reduction, an improvement on every task, or a guaranteed speed benefit for other volunteers or shifts. Practice and assistance were not isolated. |
| Five faster, two slower pairs | The observed timing direction favors further checking, with variation across tasks. | A favorable total can conceal individual slowdowns; the slower P5 lookup also had a wrong guide first selection. |
| 7/8 correct for each format | Observed aggregate first-selection accuracy was equal, with errors on different tasks. | Equal counts in this small sample do not establish improved accuracy, equivalence, an acceptable error rate or safety. |
| Help occurred in both formats | First selection and subsequent assistance are different recorded outcomes. | The effect of help on time or later performance cannot be quantified; performance without help and later completion are not established outcomes here. |
| One guide time is missing | Seven pairs are usable for timing and eight for accuracy under the recorded rules. | The time result is conditional on complete measurements; the missing value cannot be reconstructed. |

The 12.1% statistic weights tasks by their recorded reference time. It is not the percentage improvement of a typical volunteer and does not prove that changing the guide caused the saving. The present evidence supports a limited check of ordinary-work accuracy and usability while the current reference remains standard.

## Reproduce the metrics with installed tools

Run `node tools/check-evidence.cjs` from the pack root for the supplied structural check. That tool alone does not establish the benefit claims.

The following read-only PowerShell command uses installed Node.js and its built-in modules to recompute the metrics and compare them with the existing audit JSON. It is tailored to the simple, unquoted CSV format supplied here, and deliberately rejects quoted CSV rather than silently misreading it. Run from the pack root. No files are written.

```powershell
@'
const fs = require('node:fs');
const assert = require('node:assert/strict');
function read(file, header) {
  const source = fs.readFileSync(file, 'utf8');
  assert(!source.includes('"'), 'Reader expects unquoted CSV: ' + file);
  const lines = source.trimEnd().split(/\r?\n/);
  assert.equal(lines.shift(), header.join(','));
  const rows = lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, header.length);
    return Object.fromEntries(header.map((key, i) => [key, cells[i]]));
  });
  assert.equal(new Set(rows.map(row => row.pair_id)).size, rows.length);
  return rows;
}
const pairs = read('evidence/pairs.csv',
  ['pair_id', 'volunteer_id', 'task', 'first_format']);
const outcomeHeader = ['pair_id', 'seconds', 'correct', 'assisted'];
const reference = read('evidence/reference.csv', outcomeHeader);
const guide = read('evidence/guide.csv', outcomeHeader);
const ids = rows => rows.map(row => row.pair_id).sort();
for (const rows of [reference, guide]) {
  assert.deepEqual(ids(rows), ids(pairs));
  for (const row of rows) {
    assert(['true', 'false'].includes(row.correct));
    assert(['true', 'false'].includes(row.assisted));
  }
}
function seconds(raw) {
  if (raw.trim() === '') return null;
  const value = Number(raw);
  assert(Number.isFinite(value) && value > 0, 'Invalid elapsed seconds');
  return value;
}
const refById = new Map(reference.map(row => [row.pair_id, row]));
const guideById = new Map(guide.map(row => [row.pair_id, row]));
const joined = pairs.map(pair => {
  const r = refById.get(pair.pair_id), g = guideById.get(pair.pair_id);
  return { ...pair, r: seconds(r.seconds), g: seconds(g.seconds),
    referenceCorrect: r.correct === 'true', guideCorrect: g.correct === 'true' };
});
const timed = joined.filter(row => row.r !== null && row.g !== null);
const referenceSeconds = timed.reduce((sum, row) => sum + row.r, 0);
const guideSeconds = timed.reduce((sum, row) => sum + row.g, 0);
assert(referenceSeconds > 0, 'No matched reference time');
const metrics = {
  eligible_time_pairs: timed.length,
  reference_seconds: referenceSeconds,
  guide_seconds: guideSeconds,
  time_saved_seconds: referenceSeconds - guideSeconds,
  faster_pairs: timed.filter(row => row.r > row.g).length,
  slower_pairs: timed.filter(row => row.r < row.g).length,
  tied_pairs: timed.filter(row => row.r === row.g).length,
  accuracy_pairs: joined.length,
  reference_correct: joined.filter(row => row.referenceCorrect).length,
  guide_correct: joined.filter(row => row.guideCorrect).length
};
assert.deepEqual(metrics, JSON.parse(fs.readFileSync('audit/metrics.json', 'utf8')));
console.log(JSON.stringify({ metrics,
  percent_saved: metrics.time_saved_seconds / referenceSeconds * 100,
  eligible_ids: timed.map(row => row.pair_id),
  volunteers: new Set(pairs.map(row => row.volunteer_id)).size
}, null, 2));
'@ | node
```

Expected output is the ten values already in `audit/metrics.json`, `percent_saved` approximately 12.087912, eligible IDs P1-P6 plus P8, and four volunteers. Both first-selection denominators are eight even though the timing denominator is seven. If a comparison fails, investigate the changed source or rule before using a new summary; do not overwrite observations merely to match these expected results.

## Practical next-check plan for later consideration

This is a proposed planning envelope, not a recorded protocol or an instruction to begin. Keep the reference card as the standard during planning. Store any future plan and results separately from this historical pack's evidence.

1. **Set a small operational cap.** For example, plan at most two staffed work windows with up to six volunteers and four distinct lookups per person, two per format (at most 24 observed attempts). This is an illustrative workload limit, not a statistically justified sample size or evidence that six people can establish safety. The coordinator should confirm feasible staffing, time and task coverage before scheduling anything. Include a useful mix of familiarity levels and ordinary tasks rather than only enthusiasts or rehearsed lookups.
2. **Define the questions and acceptance rules first.** Record what first-selection accuracy, support burden, usability and time performance would justify further consideration. Decide the acceptable error rate, what errors require revision, what amount of time saving matters operationally, and the minimum complete records needed for a useful review. An unresolved serious selection error should trigger staff review and a pause in that task. A small check can identify problems; even no observed errors would not prove safety. No validated numeric adoption threshold follows from the current eight pairs.
3. **Balance tasks and order without repeating the identical lookup for a person.** Prepare comparable task sets and rotate their format assignment across volunteers, so a difficult task is not always assigned to one format. Balance which format is used first. Use distinct parts or bins for each person's attempts to reduce remembering an answer, and log prior familiarity. Include brake, chain and valve lookup questions raised by P5, P7 and P8 without assuming the cause of an error or slowdown. Do not rehearse the measured lookups beforehand.
4. **Write the prospective comparison rules.** Distinct future tasks are a design change from the historical same-task pairs. Define task comparability, order assignment, time eligibility and aggregation in a short new protocol before collecting data. Record every person/task/format and retain person IDs for repeated observations. For balanced task sets, report timing by person and task set with the number of usable observations; do not silently call distinct lookups the same matched task. Keep future results separate from the historical 910/800 totals.
5. **Make measurement and help explicit.** Define a common stopwatch start and stop, such as presentation of the lookup through the first bin selection, and record any later time-to-completion separately. Record the first bin before coaching, whether it was correct, subsequent assistance and its reason, hesitation or label problems, format order and task ID. Keep the helper available, as both guide formats specify. Intervention before a first selection must be flagged explicitly rather than recorded as an unassisted success. Missing times stay missing with a reason.
6. **Check capture before leaving the staffed window.** Confirm pair/attempt IDs, timestamps or stopwatch values, first-selection cards and assistance flags against the export while the original records are available. Preserve the originals and document any correction with its basis. If a time cannot be recovered from an actual source, leave it missing. This addresses the capture failure illustrated by P7 without reconstructing an answer.
7. **Review against the agreed criteria.** Show all first-selection outcomes, errors, missing times, help use and task-level slowdowns as well as aggregate time. Describe variation across people and tasks; do not treat every attempt as an independent participant. Retain the current guide if errors or usability problems require revision, or if evidence remains too thin. Decide whether to revise, obtain another limited check, or consider adoption only after reviewing the observed outcomes against the prospective criteria. Planning this check does not predetermine adoption.

The decisions needed before any start are the check's staffing and scope, the revised measurement/comparison rules, and the accuracy/usability/support and timing criteria. No contact, scheduling, new data collection or rollout is part of this handoff.

## Committee message to copy; not sent

> We will keep the current reference card in place while we plan a limited, staffed check of the reorganized guide. Our audit does not support the earlier claim that the new guide is 30% faster and more accurate. Four volunteers contributed eight task pairs; seven had both times recorded. Across those seven pairs, total time was 910 seconds with the reference and 800 seconds with the guide, an observed reduction of 110 seconds (about 12.1%). The guide was faster in five pairs and slower in two. First-selection accuracy across all eight pairs was 7/8 for each format.
>
> These results are encouraging enough to check further, but do not establish improved accuracy or readiness for standardization. The exercise repeated tasks, included coaching, and lost one guide time; it does not show how reliably the guide will work across ordinary shifts. Before any next check starts, we will define its scope, measurement rules and acceptance criteria for accuracy, usability, assistance and time. No new check has started.

## Local verification record

- Executed the exact PowerShell/Node command embedded above from the pack root. It completed successfully, reproduced all ten values in `audit/metrics.json`, reported P1-P6 plus P8 as eligible, and counted four volunteers. The printed percentage was 12.087912087912088.
- Compared the archived draft with its source byte for byte: both are 632 bytes and identical. Both have SHA-256 `4A7277EBEE0F9597A1E066107380540C66590C6B81304218C91DC46CFD2135D4`. The copy includes the full draft, its original title and its final status line, with no added warning or annotation inside the archived file.
- Compared SHA-256 hashes of all twelve pre-existing files before and after creating the handoff, including the ten supplied sources and the two prior audit outputs. All are unchanged. Only `handoff/methods.md` and `handoff/original-summary.md` were added.
- All work used installed tools and files in this local task directory. The committee text is an unsent draft; no external service, participant contact, scheduling, data collection or rollout occurred.
