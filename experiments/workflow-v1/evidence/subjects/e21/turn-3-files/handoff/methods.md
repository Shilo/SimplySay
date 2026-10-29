# Methods handoff: finding-parts guide

The coordinator will keep the current reference card in place while planning a limited, staffed check. The present evidence supports investigating a possible timing benefit, not standardizing the reorganized guide or claiming better accuracy. This document explains how to reproduce the existing results and proposes a next check for later authorization. No check, recruitment, scheduling or committee message has been initiated.

## Record roles and preservation

Use [study/protocol.md](../study/protocol.md) for the recorded definitions and inclusion rules. [pairs.csv](../evidence/pairs.csv) links each task pair to a volunteer, task and first format. [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) contain the measurements. [capture-notes.md](../evidence/capture-notes.md) explains P7's missing time and the first-selection errors. The two files in `guides/` describe the formats, not additional outcomes. The draft was written before reconciliation and has no authority over the records.

[original-summary.md](original-summary.md) is a byte-for-byte copy of the full supplied [draft-summary.md](../draft-summary.md), including its title and status line. It is preserved as historical input, not corrected or endorsed. Keep annotations and future revisions separate from that copy and from the supplied sources. The earlier [audit findings](../audit/findings.md) and [metrics](../audit/metrics.json) are also unchanged.

## What a pair means, and why it is not a person

One pair is **one volunteer doing the same lookup task with both formats**. Thus eight pairs mean 16 format attempts from four people, not eight people. The repeated task allows comparison within a volunteer and task, but creates a second-attempt familiarity effect. Two pairs from the same person also share that person's experience, habits and pace.

| Volunteer | Pair performed reference first | Pair performed guide first |
| --- | --- | --- |
| V1 | P1: patch | P2: pump |
| V2 | P3: cable | P4: tube |
| V3 | P5: brake | P6: lamp |
| V4 | P7: chain | P8: valve |

The first-format order is balanced within each volunteer in the complete record. Balance helps avoid always giving one format the benefit of being second; it does not erase memory, guarantee comparable practice effects, or establish random assignment. The source records do not describe a randomized sample of store volunteers. Task and person differences cannot be separated reliably with this design: each particular task pair belongs to just one volunteer.

Count four volunteers when describing participation, eight pairs when describing task comparisons, and seven complete pairs when describing timing. Do not count the 16 attempts as independent participants either. Treating eight pairs as eight independent people would overstate the amount of independent evidence and could make uncertainty appear too small. Any future statistical analysis must account for observations grouped within volunteers and for repeated tasks; even then, four volunteers provide little information about variation across people. These data support a local descriptive calculation, not a population-wide confidence or safety guarantee.

## Inclusion rules that must be reproduced

1. **Validate before calculating.** Require one unique row per `pair_id` in each CSV and identical ID sets across the three files. Check the headers, `true`/`false` fields and positive, finite nonblank times. Do not silently drop duplicate IDs, malformed values or unmatched rows. Join by ID; row order is irrelevant.
2. **Timing has its own denominator.** A pair is eligible only if both recorded times are positive. A blank time means a missing measurement, not zero or an incorrect selection. Do not reconstruct it from order, another person or eventual completion. Include both format times for an eligible pair; exclude both times otherwise.
3. **Do not select times according to the result.** An incorrect first selection or later assistance does not exclude an otherwise complete pair under this protocol. Keep P3, P5 and P6 in the primary time comparison. Their context limits interpretation rather than changing the recorded inclusion rule.
4. **Accuracy has a separate denominator.** Compare observed first bin selections on all eight pairs. `correct` refers to the selection before coaching, not successful completion after help. Missing timing does not discard an observed selection. If future data lack an outcome, flag it and report the observed denominator rather than inventing a success or failure.
5. **Keep assistance distinct.** `assisted` records later coaching; it neither changes `correct` nor supplies a missing time. Count assistance separately and preserve its context.
6. **Calculate on the matched set.** For each eligible pair, saved seconds = reference seconds minus guide seconds. Positive means the guide was faster; negative means slower; zero means tied. Sum both formats over precisely that set. Percentage time saved = `(reference total - guide total) / reference total * 100`. This uses reference time as the baseline; it is not the average of individual percentage reductions.

## Reproducing the arithmetic

All times below are seconds. “Missing” is deliberately not a number. Correctness and assistance entries list reference / guide.

| Pair | Reference | Guide | Reference minus guide | Correct, ref / guide | Assisted, ref / guide |
| --- | ---: | ---: | ---: | --- | --- |
| P1 | 120 | 90 | 30 | Yes / Yes | No / No |
| P2 | 100 | 95 | 5 | Yes / Yes | No / No |
| P3 | 160 | 100 | 60 | No / Yes | Yes / No |
| P4 | 80 | 75 | 5 | Yes / Yes | No / No |
| P5 | 140 | 150 | -10 | Yes / No | No / Yes |
| P6 | 200 | 160 | 40 | Yes / Yes | Yes / No |
| P7 | 150 | Missing | Unavailable | Yes / Yes | No / Yes |
| P8 | 110 | 130 | -20 | Yes / Yes | No / No |

The timing set is P1, P2, P3, P4, P5, P6 and P8:

```text
Reference seconds = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910
Guide seconds     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800
Saved seconds     = 910 - 800 = 110
Cross-check       = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110
Percentage saved  = 110 / 910 * 100 = 12.087912...%, about 12.1%
Faster / slower / tied = 5 / 2 / 0; total = 7
```

The five faster pairs are P1, P2, P3, P4 and P6. P5 and P8 are slower. P7's speed direction is unknown. Adding P7's 150 reference seconds without a guide time would compare different sets and is invalid. Round only the displayed percentage, not the underlying totals. Prefer “12.1% less total lookup time across seven usable pairs” to an unqualified claim of being “faster”; the protocol measures a reduction in elapsed time, not a measured population increase in work throughput.

Accuracy includes P1 through P8. Reference is correct on all except P3: `7 / 8 = 87.5%`. Guide is correct on all except P5: also `7 / 8 = 87.5%`. The observed difference is zero percentage points. Six pairs are correct under both formats; P3 favors the guide and P5 favors reference. There is no pair with both first selections incorrect. Neither the denominator of seven used for timing nor eventual success after coaching belongs in this accuracy calculation.

Assistance appears on reference P3 and P6 and guide P5 and P7: two attempts per format, each out of eight. Equal counts do not establish equal coaching duration or no effect on time.

The protocol's machine-readable result is:

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

Keep exactly these ten numeric fields in a protocol-format metrics file. Percentages, caveats, assistance summaries and participant counts belong in the accompanying text.

## P5: a measured pair with an incorrect first selection

P5 is V3 finding a brake, with reference used first. Reference took 140 seconds, its first selection was correct, and no later assistance was flagged. Guide took 150 seconds, its first selection was incorrect, and later coaching was flagged.

Both times are positive, so P5 contributes 140 reference seconds and 150 guide seconds to the primary timing sums. Its saving is `140 - 150 = -10` seconds: the guide was 10 seconds slower in this pair. Its accuracy contribution is one reference success and zero guide successes, with one observation added to each denominator. It also contributes one guide assistance flag.

Later help does not make P5 a correct first selection. Removing it because it was incorrect would selectively discard an unfavorable guide outcome and violate the protocol. Conversely, the flags do not tell us how much of its elapsed time was caused by coaching, how serious the error was, or whether the guide wording caused it. Review the brake lookup in a future check without presuming a cause from this one record.

## P7: a missing time with retained observed outcomes

P7 is V4 finding a chain, with reference used first. Reference took 150 seconds and was correct without later assistance. The guide time is blank, its first selection is recorded correct, and later assistance is flagged. The capture notes say the guide stopwatch entry was lost during export and no replacement exists in this pack.

P7 adds **nothing to either timing total** and is not counted as faster, slower or tied. Excluding its 150 reference seconds is essential to preserve matching. A blank guide time cannot be turned into a zero-second success, a timeout or an estimated value.

P7 still adds one correct first selection to each format and one observation to each accuracy denominator. Its guide assistance flag also remains. That combination is valid: a person can choose the right first bin and receive help later. P7 therefore illustrates why timing completeness, first-selection accuracy and assistance are three separate facts.

P7's exclusion leaves three reference-first pairs but four guide-first pairs in the timing set. The corresponding totals are 420 reference versus 340 guide seconds for reference-first pairs, and 490 versus 460 for guide-first pairs. These tiny groups cannot estimate a practice effect, but the original order balance should not be described as intact in the timing analysis. There is no basis to assume the lost measurement would have resembled the observed ones.

## What the results establish and leave open

The records establish a 110-second aggregate advantage for the guide among seven usable pairs in this staffed exercise, mixed pair directions, and equal observed accuracy totals across all eight. This is enough to motivate a limited next check. It contradicts the draft's 30% saving, universal improvement and eight correct guide selections. It does not establish an improvement for every person or task, improved accuracy, equivalent population accuracy, a lasting effect, or readiness for every shift.

Practice from repeated lookups, assistance, task differences, shared volunteers, nonrandom participation and P7's missing time all limit attribution and transfer. There is no observation of a later unattended shift, independent replication or a safety outcome. Equal 7/8 accuracy totals are compatible with differences that this small exercise cannot resolve. An observed guide error deserves review even though the total matches reference.

For context, excluding every eligible pair with any assistance leaves P1, P2, P4 and P8: reference 410 seconds, guide 390, saving 20 seconds or 4.88%. This is a sensitivity description, not a replacement for the primary result or an estimate of coaching's causal effect. Assistance is associated with which observations are removed; the remaining tasks are a selected, very small subset. Preserve the primary seven-pair result and label any such exploratory analysis separately.

## Reproduction using installed tools

From the pack root, `node tools/check-evidence.cjs` checks structure and reports eight pairs, four volunteers and P7's missing guide time. It does not validate benefit claims.

The following read-only PowerShell command independently recalculates the result using Node.js built-ins. Run it from the pack root. It prints the ten-field object and a separately labeled percentage, without writing or changing files. Its CSV reader is deliberately limited to this pack's simple unquoted fields; use a proper CSV reader if later records introduce quoted commas or embedded newlines.

```powershell
@'
const fs = require('node:fs');
const assert = require('node:assert/strict');
function read(file, header) {
  const [line, ...lines] = fs.readFileSync(file, 'utf8').trimEnd().split(/\r?\n/);
  assert.equal(line, header.join(','));
  const rows = lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, header.length);
    return Object.fromEntries(header.map((key, i) => [key, cells[i]]));
  });
  assert.equal(new Set(rows.map(row => row.pair_id)).size, rows.length);
  assert(rows.every(row => row.pair_id !== ''));
  return rows;
}
function time(cell) {
  if (cell === '') return null;
  const value = Number(cell);
  assert(Number.isFinite(value) && value > 0);
  return value;
}
const pairs = read('evidence/pairs.csv',
  ['pair_id', 'volunteer_id', 'task', 'first_format']);
const columns = ['pair_id', 'seconds', 'correct', 'assisted'];
const reference = read('evidence/reference.csv', columns);
const guide = read('evidence/guide.csv', columns);
const ids = rows => rows.map(row => row.pair_id).sort();
assert.deepEqual(ids(reference), ids(pairs));
assert.deepEqual(ids(guide), ids(pairs));
for (const row of [...reference, ...guide]) {
  for (const key of ['correct', 'assisted']) {
    assert(['true', 'false'].includes(row[key]));
  }
  time(row.seconds);
}
const refById = new Map(reference.map(row => [row.pair_id, row]));
const guideById = new Map(guide.map(row => [row.pair_id, row]));
const joined = pairs.map(pair => ({
  reference: refById.get(pair.pair_id), guide: guideById.get(pair.pair_id)
}));
const timed = joined.map(row => ({
  reference: time(row.reference.seconds), guide: time(row.guide.seconds)
})).filter(row => row.reference !== null && row.guide !== null);
const sum = key => timed.reduce((total, row) => total + row[key], 0);
const metrics = {
  eligible_time_pairs: timed.length,
  reference_seconds: sum('reference'),
  guide_seconds: sum('guide'),
  time_saved_seconds: sum('reference') - sum('guide'),
  faster_pairs: timed.filter(row => row.guide < row.reference).length,
  slower_pairs: timed.filter(row => row.guide > row.reference).length,
  tied_pairs: timed.filter(row => row.guide === row.reference).length,
  accuracy_pairs: joined.length,
  reference_correct: joined.filter(row => row.reference.correct === 'true').length,
  guide_correct: joined.filter(row => row.guide.correct === 'true').length
};
assert.equal(metrics.time_saved_seconds,
  timed.reduce((total, row) => total + row.reference - row.guide, 0));
assert.equal(metrics.eligible_time_pairs,
  metrics.faster_pairs + metrics.slower_pairs + metrics.tied_pairs);
console.log(JSON.stringify(metrics, null, 2));
console.log('Matched time reduction (%):',
  metrics.time_saved_seconds / metrics.reference_seconds * 100);
'@ | node -
```

## Proposed limited next check — planning only

The current reference card stays the standard while this is planned. The following is a practical proposal, not an instruction to start work or evidence of a check already performed.

1. **Set a finite boundary and responsible staff.** A possible initial cap is one staffed session, up to six volunteers contributing at most two task pairs each, with no more than 12 pairs in total. These are proposed workload limits, not a statistically justified sample size or a promise of conclusive evidence. The coordinator must confirm the cap, helper availability and named reviewer before any scheduling. End at the cap or session close, whichever comes first; do not expand automatically to seek a favorable result.
2. **Write a short protocol before collection.** State that the question is whether the guide remains accurate and usable on ordinary store tasks and whether a timing advantage persists with documented assistance and order. Define identical timer start/stop events for both formats, what constitutes a first selection, and when help is recorded. Agree acceptable accuracy, usability and assistance levels and what timing improvement would justify further consideration. The present pack supplies no established numerical adoption thresholds; decide them prospectively rather than choosing them after seeing results.
3. **Choose tasks and balance order deliberately.** Include ordinary lookup work with varied categories and experience levels, plus attention to the brake error, slower valve pair and chain lookup with missing timing. Do not fill the check only with known easy tasks. For comparable same-task pairs, record a unique pair ID and both formats, balance first format within anyone contributing two pairs, and separate repeats with intervening tasks where practical. Record prior exposure. Repetition still permits learning; acknowledge it. If an ordinary task cannot sensibly be repeated, record that observation separately rather than forcing it into the matched timing analysis. A design using different but supposedly equivalent tasks needs its own stated matching rule and should not be silently pooled with this study.
4. **Capture outcomes before helping and reconcile immediately.** Retain volunteer ID, task, pair ID, order, format, seconds, first-bin correctness and assistance for each attempt. Also record the point when help starts, the issue prompting it and any available eventual-completion result in separate fields. Do not delay needed help to preserve an unassisted measure. Check both time cells and outcome cards at session end while a recording problem can be identified. Preserve an unknown value as missing when no measurement exists; document corrections with provenance rather than reconstructing them from memory. Keep any new check's files and analysis separate from this pack's original evidence.
5. **Use an explicit pause and review rule.** At a wrong or unclear selection, pause that lookup, record the first selection, and use the helper and reference fallback before work continues. If the helper cannot resolve the location, the same guide ambiguity recurs, or staffing is unavailable, stop guide use for the session and review before resuming. Log these events and assistance; do not redefine them as successful first selections after correction. Review slower tasks and errors as well as successes. These operational safeguards are proposed rules, not proof of safety.
6. **Review once at the boundary.** Report people, task pairs, observed accuracy denominators, eligible matched times, missing values, assistance, order and results by person/task as well as totals. Apply the prospectively agreed rules and retain unfavorable outcomes. If accuracy or usability issues remain, revise or retain the reference card and decide separately whether further evidence is worthwhile. Even a favorable small staffed check does not automatically justify unattended or store-wide use. Decide explicitly whether the coverage and conditions support any later change; do not treat reduced total time alone as sufficient.

The decisions needed before launch are the session/task cap, responsible helper and reviewer, task/volunteer coverage, measurement definitions, and acceptable performance and pause/review criteria. Those decisions can be made during planning. This handoff requests no volunteer contact or rollout.

## Handoff verification notes

Executed the reproduction command above from the pack root and compared its calculated object with the unchanged audit metrics. It reproduces seven eligible time pairs, 910 reference seconds, 800 guide seconds, 110 saved seconds, five faster, two slower, zero tied, eight accuracy pairs and seven correct per format; the printed percentage is 12.087912087912088. The supplied structural check also passes. Local links in this document resolve.

Verified the preserved summary against the source by byte comparison and SHA-256. SHA-256 for both is `4a7277ebee0f9597a1e066107380540c66590c6b81304218c91dc46cfd2135d4`. No title, explanatory note or corrected claim was inserted into the preserved copy. Checked hashes of all ten supplied files and the two existing audit files before and after handoff creation; all remain unchanged. No external sources or services were used.
