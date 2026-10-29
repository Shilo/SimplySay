# Finding-parts study: methods and coordinator handoff

## Decision and status

Keep the current reference card in place while planning a limited, staffed check. The existing exercise suggests a possible time benefit from the reorganized guide: 110 fewer recorded seconds across seven complete task pairs, or 12.09% less total matched lookup time. It does not demonstrate improved first-selection accuracy or establish that the guide is ready for standard use. Both formats had seven correct first selections out of eight.

This document explains how to reproduce the existing audit and proposes a future check. It does not launch that check. No recruitment, volunteer contact, committee message or rollout has been initiated.

## Records to use and preserve

All paths below are relative to the task directory.

| File | Role |
| --- | --- |
| `study/protocol.md` | Governs the study units, time inclusion, accuracy denominator and ten numeric JSON fields. |
| `evidence/pairs.csv` | Maps each `pair_id` to a volunteer, lookup task and first format. |
| `evidence/reference.csv`, `evidence/guide.csv` | Record elapsed seconds, first-selection correctness and later assistance for each format. |
| `evidence/capture-notes.md` | Explains P7's lost stopwatch entry and the distinction between first selection and later coaching. |
| `guides/reference-card.txt`, `guides/reorganized-guide.txt` | Describe the formats; they supply no additional outcome records. |
| `draft-summary.md` | Original, unchecked narrative; not a source of verified results. |
| `audit/findings.md`, `audit/metrics.json` | Corrected interpretation and machine-readable audit results. |
| `tools/check-evidence.cjs` | Structural check of the supplied records; does not calculate or validate the draft's benefit claims. |

[original-summary.md](original-summary.md) is a complete, byte-for-byte copy of `draft-summary.md`, including its incorrect claims and original status note. It is retained as historical input, not endorsed as the study conclusion. Do not correct that archived copy or the supplied source records. Put corrections in separately identified analysis documents. If a new check is later approved, give it a separate protocol and dataset so its observations cannot be mistaken for this exercise.

## What was measured, and why the participant count matters

A **task pair** is one volunteer attempting the same lookup once with the reference card and once with the reorganized guide. The records contain eight such pairs from four volunteers, giving eight format observations per format. The same person contributes two task pairs:

| Volunteer | Reference-first task pair | Guide-first task pair |
| --- | --- | --- |
| V1 | P1: find_patch | P2: find_pump |
| V2 | P3: find_cable | P4: find_tube |
| V3 | P5: find_brake | P6: find_lamp |
| V4 | P7: find_chain | P8: find_valve |

Pairing is useful because each comparison involves the same person and lookup task. But neither repeating a task nor giving someone a second task creates another person. For example, P5 and P6 both reflect V3's experience, reading habits and knowledge of the store. Their results may therefore be related. Within each pair, the second attempt may benefit from remembering the first attempt. Calling the eight pairs eight independent people would make the evidence appear broader and more certain than it is.

The format order was balanced: every volunteer had one reference-first pair and one guide-first pair. This gives both formats opportunities to be attempted first, but it cannot erase what a volunteer learned on the first attempt. The supplied records do not establish random assignment, and the four participants were not a randomized sample of all store volunteers. All observations also came from one staffed exercise, not independent replications across shifts.

Keep the units explicit when reporting: four participants, eight observed task pairs for accuracy, and seven complete task pairs for timing. A future statistical analysis should retain volunteer identifiers and account for repeated observations from each person rather than treating every task as an independent participant. The current audit reports descriptive results, without a population confidence interval or significance claim.

## Reproducing the inclusion rules

1. Read the protocol and capture notes before calculating. Check the CSV headers, unique IDs, matching ID sets, Boolean outcome fields and positive recorded times. Stop and resolve malformed or unmatched records rather than silently dropping them. The current pack has P1 through P8 exactly once in each CSV.
2. Join the two outcome files to `pairs.csv` using `pair_id`. Row position is not a key; sorting or re-exporting a file must not change which observations are compared.
3. For **timing**, include a pair only when both formats have a positive elapsed time. If either time is blank, exclude that entire pair from both time totals. Do not convert the blank to zero, borrow a time, or infer it from task order. P7 is the only timing exclusion here.
4. For each eligible pair, calculate `saved_seconds = reference_seconds - guide_seconds`. Positive means the guide took less time; negative means it took more time; zero means a tie. Count each eligible pair once in one of those categories.
5. Sum reference and guide times over exactly that same eligible set. Calculate `time_saved_seconds = reference_total - guide_total`, then `percentage_saving = time_saved_seconds / reference_total * 100`. This is the protocol's reduction in total elapsed time relative to the reference. It is not the arithmetic average of the eight tasks' percentage changes, and it is not a speed guarantee for each person or task.
6. For **accuracy**, use all eight pairs with observed first-selection outcomes, regardless of timing eligibility. Count the `correct` field separately for each format. This field describes the first bin selected before coaching. An incorrect first selection stays incorrect even if help later leads to successful completion.
7. Preserve `assisted` as a separate observation about later coaching. Do not recode correctness, adjust recorded seconds, or remove coached pairs from the protocol metrics. The pack does not quantify how much elapsed time coaching contributed.
8. Keep the machine-readable results in the protocol's ten numeric fields. Put percentages, exclusions and interpretation in prose. Displaying 12.09% rounds the calculated percentage for readability; it does not imply that the underlying study has that degree of population precision.

## The matched records and arithmetic

The table keeps the first-selection outcomes separate from the assistance that followed. A dash means no time comparison is available, not zero seconds saved.

| Pair | Reference seconds | Guide seconds | Saved seconds | Reference first selection | Guide first selection | Later assistance |
| --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | 120 | 90 | 30 | Correct | Correct | Neither |
| P2 | 100 | 95 | 5 | Correct | Correct | Neither |
| P3 | 160 | 100 | 60 | Incorrect | Correct | Reference |
| P4 | 80 | 75 | 5 | Correct | Correct | Neither |
| P5 | 140 | 150 | -10 | Correct | Incorrect | Guide |
| P6 | 200 | 160 | 40 | Correct | Correct | Reference |
| P7 | 150 | Missing | — | Correct | Correct | Guide |
| P8 | 110 | 130 | -20 | Correct | Correct | Neither |

The eligible timing IDs are **P1, P2, P3, P4, P5, P6 and P8**:

```text
Reference total = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Guide total     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Time saved      = 910 - 800 = 110 seconds
Cross-check     = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110 seconds
Percent saving  = 110 / 910 * 100 = 12.087912...% = 12.09% when displayed
```

The guide was faster on P1, P2, P3, P4 and P6 (**five pairs**), slower on P5 and P8 (**two pairs**), and tied on none. The counts sum to seven eligible timing pairs. Summing all eight reference times would give 1,060 seconds; comparing that with 800 guide seconds would wrongly include P7 on only one side.

For accuracy, include P7 and use a denominator of eight for each format:

```text
Reference correct = P1, P2, P4, P5, P6, P7, P8 = 7/8 = 87.5%
Guide correct     = P1, P2, P3, P4, P6, P7, P8 = 7/8 = 87.5%
Guide minus reference accuracy = 87.5% - 87.5% = 0 percentage points
```

Six pairs were correct under both formats. The guide alone was correct on P3; the reference alone was correct on P5. No pair had two incorrect first selections. The equal overall totals therefore conceal two different error locations, and do not establish that the formats are equally accurate in ordinary work.

The expected JSON object is:

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

## Worked example: P5 keeps both the slow lookup and the error

P5 is V3's brake lookup, attempted with the reference first. The reference record is `140,true,false`: 140 seconds, a correct first bin, no later coaching. The guide record is `150,false,true`: 150 seconds, an incorrect first bin, later coaching.

Both times are positive, so P5 belongs in the time comparison. Its contribution is `140 - 150 = -10` seconds, meaning the guide took 10 seconds longer. Include it among the slower pairs even though the guide was attempted second and could have benefited from practice. The record does not explain why the guide was slower, so it cannot isolate an effect of the guide, the task or coaching.

P5 also belongs in the accuracy comparison: add one correct selection to the reference count and none to the guide count. Later help does not change the already observed first error. Rewriting `false` as `true` would incorrectly produce the draft's eight guide successes and erase the outcome the protocol measures. Removing P5 because assistance occurred would also change the protocol after seeing an unfavorable result. The record establishes a guide first-selection error; it does not identify its cause or prove that the guide itself contained a wrong bin code.

## Worked example: P7 has usable accuracy but no usable time comparison

P7 is V4's chain lookup, also reference-first. The reference record is `150,true,false`; the guide record is `,true,true`. The blank is a lost stopwatch entry during export. The capture notes state that no other timing exists in this pack.

Exclude P7 from both timing totals, including its known 150-second reference time. Without a guide time, there is no matched difference and no basis to call P7 faster, slower or tied. A correct selection, assistance flag or known task order does not recover seconds. Do not treat the blank as a failure or as zero, and do not replace it with another volunteer's time.

Retain P7 for accuracy because both first-selection cards are observed and correct. Add one correct selection to each format. Preserve guide assistance as `true`: it records later coaching and does not overturn the correct first selection. Timing completeness and first-selection correctness answer different questions. Excluding P7 from all analyses would unnecessarily discard valid outcome evidence and change the accuracy denominator to seven.

## What the results establish and leave unresolved

The records establish a local descriptive result: on the seven complete timed pairs, summed guide time was lower by 110 seconds, and most eligible pairs favored the guide. Say **“12.09% less total recorded lookup time across seven complete pairs”**, rather than claiming “30 percent faster.” Longer reference tasks contribute more to this aggregate comparison; it does not mean each task or volunteer improved by 12.09%.

The records do not establish that changing the guide caused the full reduction. Repeating lookups can improve recall. Balanced order helps but cannot remove that learning, and P7's exclusion leaves three reference-first and four guide-first comparisons in the timing set. Four volunteers and eight task types cannot represent every volunteer, part, label, shift or working condition. No later unattended shift or live rollout is recorded. The missing time leaves one task's contribution unknown; these records cannot establish whether its absence changes the overall picture in either direction.

Coaching occurred on reference P3 and P6 and guide P5 and P7: two observations per format, with at least one assisted format in four of eight task pairs. Three of seven eligible timing pairs involve assistance. Equal assistance counts do not demonstrate equal amounts or effects of help. The historical protocol does not fully specify the stopwatch's start/stop events or how any coaching relates to them, so do not subtract a guessed coaching duration or interpret the totals as isolated unaided lookup speed.

The accuracy results establish seven correct first selections under each format, not improved accuracy. Equal counts in a small exercise do not prove equivalent error risks. Later completion after coaching is a different outcome, not a replacement for first-selection accuracy. Neither the accuracy field nor the elapsed times measure all aspects of safe repair-store work, so neither a safety guarantee nor readiness for all shifts follows. These limits justify a bounded check while the reference remains in place.

## Practical next-check plan — proposal only

The current decision to retain the reference is settled. Before any check starts, the coordinator still needs to set its staffing, scope, measurement definitions and criteria for reviewing the results. Use the following as a planning checklist, not authorization to contact participants or collect data.

1. **Write a short separate protocol.** Name the coordinator, observer and available shift helper. Set a fixed session count or time budget, a roster target and task list within that capacity, plus a review date. Include less-experienced and experienced volunteers and common lookups across part categories. These are scope choices, not a sample size proven sufficient for standardization. Do not extend collection until a preferred result appears.
2. **Review the two first-selection errors.** Use P5 and P3 as prompts to inspect the relevant guide wording, category choice, bin code and physical label during planning. Record what can and cannot be learned from the existing pack; it does not identify the cause. If the reorganized guide is revised, assign it a version and describe the change. Future results for that version should not be silently pooled with this exercise.
3. **Reduce direct memorization while balancing order.** Prepare comparable lookup variants or task sets, balanced across formats and volunteers, so a person need not repeat the exact answer immediately. Document which tasks are considered comparable and why. Give both formats first-position exposure, record actual order and deviations, and assign order randomly where practical. If comparable rather than identical tasks are paired, document that change from the historical design and the new matching rule before collection; do not label them repetitions of the old same-task pairs.
4. **Set observable timing events and retain first selections.** For the proposed check, a workable definition is to start when the volunteer receives the lookup and can access the assigned format, and stop when the first bin is selected. Observe and record that selection before routine coaching. Record any necessary early intervention explicitly; do not relabel an assisted selection as an unaided first selection. If staff also want time to eventual completion, record a separate measurement with its own definition. These are proposed definitions for the new check, not facts recoverable about the old stopwatch sheets.
5. **Use a complete record for each attempt.** Capture study/session and guide version, volunteer ID and experience category, task/variant and pair ID, assigned format, order, elapsed seconds or a missing-value reason, first bin selected, first-selection correctness, assistance and when it occurred, and observer notes on label or usability problems. Retain volunteer IDs so paired tasks and repeated observations can be recognized in analysis. Keep the reference available as the normal guide and a helper available for the bounded exercise.
6. **Check capture while the session is staffed.** The observer should verify ID uniqueness, first-selection records and timing cells against the local capture sheet before export. Preserve the original measurement and a separate correction log if an entry is corrected. A genuinely lost time stays missing with a reason; an unplanned repeat attempt is a new observation with its own order and practice history, not a recovered original time.
7. **Agree the review criteria before seeing new results.** The coordinator and committee should specify what level and type of first-selection errors or required assistance would prevent adoption, what time improvement would matter operationally, and what coverage and missing-data limits they require. Define when an observed error requires staff intervention or guide revision. The existing four-person exercise cannot supply a justified universal accuracy threshold or guarantee that a chosen small follow-up will be sufficient.
8. **Review accuracy and usability alongside time.** Report complete-pair time totals, faster/slower/tied counts, all observed first selections, assistance and missingness, with results traceable to volunteers and task types. Review errors individually and look for dependence on experience, task, order and staff help. Decide whether the evidence meets the pre-agreed criteria, calls for revision, or remains inconclusive. A time saving alone should not trigger standardization. Until that review supports a change, the current reference stays in place.

## Runnable reproduction using installed tools

Run this from the local task directory in PowerShell. It uses Node's built-in modules, reads only the local files, prints the recalculated values and checks them against `audit/metrics.json`. It deliberately reverses the guide rows before joining to demonstrate that row order is irrelevant. The CSV reader is for this pack's simple, unquoted CSV format; it is not a general parser for future quoted CSV exports.

```powershell
@'
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
function read(file, header) {
  const lines = fs.readFileSync(file, 'utf8').trimEnd().split(/\r?\n/);
  assert.equal(lines.shift(), header.join(','), file);
  return lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, header.length, file);
    return Object.fromEntries(header.map((key, i) => [key, cells[i]]));
  });
}
function index(rows) {
  const result = new Map(rows.map(row => [row.pair_id, row]));
  assert.equal(result.size, rows.length, 'Duplicate pair ID');
  return result;
}
const pairs = read('evidence/pairs.csv',
  ['pair_id', 'volunteer_id', 'task', 'first_format']);
const fields = ['pair_id', 'seconds', 'correct', 'assisted'];
const reference = index(read('evidence/reference.csv', fields));
const guide = index(read('evidence/guide.csv', fields).reverse());
const ids = [...index(pairs).keys()].sort();
for (const rows of [reference, guide]) {
  assert.deepEqual([...rows.keys()].sort(), ids);
  for (const row of rows.values()) {
    assert(['true', 'false'].includes(row.correct));
    assert(['true', 'false'].includes(row.assisted));
    assert(row.seconds === '' ||
      (Number.isFinite(Number(row.seconds)) && Number(row.seconds) > 0));
  }
}
const joined = pairs.map(pair => ({...pair,
  r: reference.get(pair.pair_id), g: guide.get(pair.pair_id)}));
const timed = joined.filter(pair => pair.r.seconds !== '' && pair.g.seconds !== '');
const sum = get => timed.reduce((total, pair) => total + get(pair), 0);
const r = sum(pair => Number(pair.r.seconds));
const g = sum(pair => Number(pair.g.seconds));
const delta = pair => Number(pair.r.seconds) - Number(pair.g.seconds);
const metrics = {
  eligible_time_pairs: timed.length,
  reference_seconds: r,
  guide_seconds: g,
  time_saved_seconds: r - g,
  faster_pairs: timed.filter(pair => delta(pair) > 0).length,
  slower_pairs: timed.filter(pair => delta(pair) < 0).length,
  tied_pairs: timed.filter(pair => delta(pair) === 0).length,
  accuracy_pairs: joined.length,
  reference_correct: joined.filter(pair => pair.r.correct === 'true').length,
  guide_correct: joined.filter(pair => pair.g.correct === 'true').length
};
assert.deepEqual(metrics, JSON.parse(fs.readFileSync('audit/metrics.json', 'utf8')));
console.log(JSON.stringify({metrics,
  percentage_saving: (r - g) / r * 100,
  excluded_time_pairs: joined.filter(pair => !timed.includes(pair))
    .map(pair => pair.pair_id)
}, null, 2));
'@ | node
```

Expected: the ten metrics shown above, `percentage_saving` approximately `12.087912087912088`, and `excluded_time_pairs` containing only `P7`. This checks arithmetic and matching; it cannot resolve practice effects, coaching effects or representativeness.

## Committee message — prepared for copying, not sent

We will keep the current reference card in place while planning a limited, staffed check of the reorganized guide. The audit found four volunteers contributing eight repeated task pairs, with complete timings for seven pairs. Across those seven pairs, total recorded lookup time was 910 seconds with the reference and 800 seconds with the guide: 110 seconds, or 12.09%, less time. The guide was faster in five pairs and slower in two. Both formats had seven correct first selections out of eight, so the records do not support the draft's claims of a 30% time reduction or improved accuracy.

The exercise suggests a possible time benefit, but repeated lookups, coaching, one missing guide time and limited participation leave performance in ordinary work uncertain. It does not establish readiness for standardization. Before a next check starts, we need to agree its scope, staffing, measurement rules and decision criteria for accuracy, usability, assistance and time. No further study has been launched.

## Handoff verification

- Executed the PowerShell reproduction block directly from this document using installed Node: passed. It reproduced all ten audit metrics, the 12.087912087912088% saving and P7 as the sole timing exclusion. This was a read-only calculation, not a new study.
- Parsed the expected JSON block and compared it with `audit/metrics.json`; checked all eight table rows against the raw outcome CSVs, the archive link and balanced code fences: passed.
- Compared the archived draft with the source as byte buffers: identical, 632 bytes. Both have SHA-256 `4a7277ebee0f9597a1e066107380540c66590c6b81304218c91dc46cfd2135d4`.
- Compared before/after SHA-256 hashes for all twelve pre-existing files, including the original sources and two audit outputs: every file was unchanged. This handoff adds only `handoff/methods.md` and `handoff/original-summary.md`. No external services, new dependencies, volunteer contact or data collection were used.
