# Coordinator handoff: finding-parts guide methods and next-check proposal

The current guide remains in place while a limited, staffed check is planned. The existing exercise provides a local reason to investigate the reorganized guide further; it does not support standardization or the claim that the guide is “30 percent faster and more accurate.” This handoff explains the existing results and proposes a future check. It does not launch that check.

## Record map and preservation

Use the [recorded protocol](../study/protocol.md) for definitions and inclusion rules. [pairs.csv](../evidence/pairs.csv) identifies volunteers, tasks and first format; [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) contain the two sets of observations. [Capture notes](../evidence/capture-notes.md) explain P7's missing timing and the first-selection errors. The guide texts describe the procedures but add no outcome observations.

The reconciled audit is in [findings.md](../audit/findings.md) and the required ten numeric fields are in [metrics.json](../audit/metrics.json). The [original summary](original-summary.md) is an exact, unchanged copy of [draft-summary.md](../draft-summary.md), including its incorrect claims and draft status. It is preserved as historical input, not endorsed as a result. Keep it separate from corrected communications. The original records and prior audit files remain unchanged.

## What was observed, and what is independent

Each of four volunteers did two lookup tasks. For each task, the person used both formats, creating one matched task pair. Thus there are **four people, eight task pairs and sixteen format attempts**, with eight first-selection observations per format. These are different denominators for different questions.

| Volunteer | First task pair | Second task pair | Recorded order |
| --- | --- | --- | --- |
| V1 | P1: find_patch | P2: find_pump | P1 reference first; P2 guide first |
| V2 | P3: find_cable | P4: find_tube | P3 reference first; P4 guide first |
| V3 | P5: find_brake | P6: find_lamp | P5 reference first; P6 guide first |
| V4 | P7: find_chain | P8: find_valve | P7 reference first; P8 guide first |

Pairing compares the same person's performance on the same lookup under both formats. It reduces differences due to comparing different people or tasks, but introduces repeated-task familiarity: the second attempt may benefit from knowing the part or bin already. Every person had one pair starting with each format, so order was balanced in the recorded exercise. Counterbalancing cannot demonstrate that practice effects disappeared.

The two pairs from V3, for example, share that person's experience, familiarity and approach to the store. They cannot be counted as two independently sampled people. More task observations can describe that person's performance better without increasing the number of people observed. All four volunteers also participated in the same staffed exercise, rather than independent sessions or replications. This was not a random sample of all store volunteers.

The seven usable time differences therefore are not seven independent people. Do not attach a population precision claim by treating those differences as independent volunteer observations. This handoff reports descriptive results, without a population confidence interval, significance test, or assertion that equal observed accuracy proves equivalence.

## Inclusion and coding rules

1. Read the three CSVs and join on `pair_id`, never row position. Check for duplicate IDs, unmatched IDs, unexpected columns, invalid booleans and invalid observed times before calculating. All three supplied files contain P1–P8 exactly once.
2. Interpret a blank timing cell as missing. A measured time must be positive. Do not convert a blank to zero, call it a failure, substitute another person's time or infer a value from task order. Invalid nonblank values would need reconciliation, not silent repair.
3. Include a task pair in the time comparison only when both format times are positive. Use exactly the same eligible pair set in the reference and guide sums. Do not drop a timed pair because its first selection was incorrect or coaching occurred; the recorded protocol does not make either an exclusion.
4. For every eligible pair, calculate `reference seconds - guide seconds`. A positive difference means the guide was faster; a negative difference means it was slower; zero means tied.
5. Sum the matched times. Calculate the percentage reduction as `100 * (matched reference total - matched guide total) / matched reference total`. This is a reduction in total time for the observed matched tasks, not an average of individual percentage savings or a guarantee for each lookup. Keep percentages out of the protocol JSON.
6. Calculate accuracy separately on all eight pairs with observed first selections. `correct=true` means the first bin selected was correct before coaching. A missing time does not remove a known first selection.
7. Keep `assisted` separate. Later help does not turn an incorrect first selection into a correct one. Conversely, a correct first selection can still be followed by help. Preserve both fields as recorded.

## Arithmetic from the records

The eligible timing set is **P1, P2, P3, P4, P5, P6 and P8**. P7 is excluded from both timing sums.

| Pair | Reference seconds | Guide seconds | Saved seconds | First selection: reference / guide | Assistance: reference / guide |
| --- | ---: | ---: | ---: | --- | --- |
| P1 | 120 | 90 | 30 | Correct / correct | No / no |
| P2 | 100 | 95 | 5 | Correct / correct | No / no |
| P3 | 160 | 100 | 60 | Incorrect / correct | Yes / no |
| P4 | 80 | 75 | 5 | Correct / correct | No / no |
| P5 | 140 | 150 | -10 | Correct / incorrect | No / yes |
| P6 | 200 | 160 | 40 | Correct / correct | Yes / no |
| P7 | 150 | Missing | Not eligible | Correct / correct | No / yes |
| P8 | 110 | 130 | -20 | Correct / correct | No / no |

The matched reference total is `120 + 100 + 160 + 80 + 140 + 200 + 110 = 910` seconds. The matched guide total is `90 + 95 + 100 + 75 + 150 + 160 + 130 = 800` seconds. Saving is `910 - 800 = 110` seconds, also the sum of the seven eligible differences: `30 + 5 + 60 + 5 - 10 + 40 - 20 = 110`.

The percentage reduction is `100 * 110 / 910 = 12.087912...%`, rounded to **12.1%** in prose. Say “12.1% less total lookup time on the seven usable pairs.” Neither “30% faster” nor “faster on every task” is supported. Five eligible pairs were faster (P1, P2, P3, P4, P6), two were slower (P5, P8), and none tied. These counts sum to seven.

Reference first-selection accuracy is `7 / 8 = 87.5%`; guide accuracy is also `7 / 8 = 87.5%`. The guide-minus-reference difference is **0 percentage points**. P3 changes from incorrect under the reference to correct under the guide; P5 changes in the opposite direction. The other six pairs were correct under both. The same totals conceal those different errors and do not prove equal underlying accuracy.

Assistance was recorded on reference P3 and P6 and guide P5 and P7: **two of eight attempts per format**. These equal counts do not establish equal dependence on help or show that coaching had no effect. The records do not isolate coaching's effect on recorded elapsed time or later performance.

## Worked example: P5 is slower and incorrect under the guide

P5 is V3's brake lookup, performed with the reference first. Its reference record is `140,true,false`; its guide record is `150,false,true` after the pair ID.

Both times are positive, so P5 contributes **140 reference seconds and 150 guide seconds**, giving `140 - 150 = -10` seconds. It is one of the two slower guide pairs. Incorrect first selection and later assistance do not disqualify its times under this protocol.

For accuracy, P5 contributes **one correct reference selection and zero correct guide selections**, with one observed outcome in each format's denominator. The guide's later assistance flag agrees with the note about coaching after the wrong first selection. Eventual coached completion cannot be counted as a correct first selection. Reclassifying this row would falsely produce the draft's claimed guide score of eight out of eight.

P5 shows an observed guide error and slowdown, not why they happened. The cause could involve navigation, task familiarity or other unrecorded circumstances; the record does not establish a guide defect or a causal effect of coaching. Review the brake lookup path as part of planning, without editing this historical outcome. V3 also contributed P6, so these two observations do not constitute two different volunteers confirming an effect.

## Worked example: P7 has known accuracy and unknown duration

P7 is V4's chain lookup, with the reference first. Its reference record is `150,true,false`; its guide record is `,true,true` after the pair ID. The blank is specifically the guide stopwatch value. Capture notes say that value was lost on export and no alternative timing exists in the pack.

Exclude the **whole pair from timing**: neither the 150 reference seconds nor an invented guide value enters the matched sums. P7 receives no faster/slower/tied label. Using zero for the blank would manufacture a 150-second saving. Comparing all reference times, which total 1,060 seconds, with the guide's seven measured times would also be an unmatched comparison. Neither operation follows the protocol.

Retain P7 for **accuracy in both formats**: it contributes one correct first selection to each numerator and one observed selection to each denominator. Retain its guide assistance flag too. A correct first selection followed by help is consistent with the field definitions. Missing timing is not evidence of incorrect selection, failure to finish, or absence of assistance.

P7 also shows why the timing denominator of seven and accuracy denominator of eight are both correct. Its absence leaves V4 represented only by P8 in the timing comparison. The direction and magnitude of P7's missing time difference are unknown; the full eight-pair timing result cannot be determined from this pack.

## What the results establish and leave uncertain

| Evidence | Supported interpretation | Limit |
| --- | --- | --- |
| 910 versus 800 seconds on seven matched pairs | Lower aggregate observed guide time for those pairs | Does not establish the same saving on each task, in ordinary work, or for all volunteers; two observed pairs were slower. |
| 7/8 correct under each format | No observed aggregate first-selection accuracy improvement | Does not establish equivalence, absence of harm, or safety. One wrong selection under each format still matters. |
| One reference-first and one guide-first pair per volunteer | Order was counterbalanced as recorded | Repeated-task practice can remain; P7's missing timing leaves timed order groups at three versus four pairs. |
| Assistance recorded under both formats | The observations describe a staffed exercise with help available | They cannot establish an independent-use benefit or that coaching made no difference. |
| Four people in one exercise | Useful local observations for planning a limited next check | Not a population guarantee, a randomized volunteer sample, an independent replication or an ordinary-shift validation. |

As an exploratory illustration, the four eligible pairs with neither format assisted (P1, P2, P4, P8) total 410 reference versus 390 guide seconds, or `100 * 20 / 410 = 4.9%` less time. This different task subset is not the primary result and cannot estimate coaching's causal effect. It reinforces the need to distinguish a staffed observation from a demonstrated independent-use benefit. Do not filter out assisted or incorrect trials to make the primary comparison look better.

## Reproduce the calculation locally

Run from the supplied task directory in PowerShell. `node tools/check-evidence.cjs` checks structure and reports the missing guide time; it does not prove a benefit claim. Then run the read-only block below. It uses installed Node built-ins, handles this pack's simple unquoted CSVs, recalculates the results by ID and compares the ten numeric fields with the existing audit JSON. It writes no files and performs no network requests. A failed assertion should be investigated before quoting results.

```powershell
@'
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');

function readCsv(file, fields) {
  const [header, ...lines] = fs.readFileSync(file, 'utf8').trim().split(/\r?\n/);
  assert.equal(header, fields.join(','), `Unexpected header: ${file}`);
  return lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, fields.length, `Unexpected row: ${file}`);
    return Object.fromEntries(fields.map((key, i) => [key, cells[i]]));
  });
}
function index(rows) {
  const result = new Map(rows.map(row => [row.pair_id, row]));
  assert.equal(result.size, rows.length, 'Duplicate pair ID');
  return result;
}
function seconds(value) {
  if (value.trim() === '') return null; // Check before Number('') could become 0.
  const number = Number(value);
  assert(Number.isFinite(number) && number > 0, 'Invalid measured time');
  return number;
}
const pairs = readCsv('evidence/pairs.csv',
  ['pair_id', 'volunteer_id', 'task', 'first_format']);
const fields = ['pair_id', 'seconds', 'correct', 'assisted'];
const reference = index(readCsv('evidence/reference.csv', fields));
const guide = index(readCsv('evidence/guide.csv', fields));
const ids = [...index(pairs).keys()].sort();
assert.deepEqual([...reference.keys()].sort(), ids);
assert.deepEqual([...guide.keys()].sort(), ids);

const rows = pairs.map(pair => {
  const r = reference.get(pair.pair_id), g = guide.get(pair.pair_id);
  for (const record of [r, g]) for (const field of ['correct', 'assisted']) {
    assert(['true', 'false'].includes(record[field]), 'Invalid boolean');
  }
  assert(['reference', 'guide'].includes(pair.first_format));
  const rt = seconds(r.seconds), gt = seconds(g.seconds);
  return {
    ...pair, reference_seconds: rt, guide_seconds: gt,
    saving: rt !== null && gt !== null ? rt - gt : null,
    reference_correct: r.correct === 'true', guide_correct: g.correct === 'true',
    reference_assisted: r.assisted === 'true', guide_assisted: g.assisted === 'true'
  };
});
const timed = rows.filter(row => row.saving !== null);
const sum = (list, field) => list.reduce((total, row) => total + row[field], 0);
const metrics = {
  eligible_time_pairs: timed.length,
  reference_seconds: sum(timed, 'reference_seconds'),
  guide_seconds: sum(timed, 'guide_seconds'),
  time_saved_seconds: sum(timed, 'saving'),
  faster_pairs: timed.filter(row => row.saving > 0).length,
  slower_pairs: timed.filter(row => row.saving < 0).length,
  tied_pairs: timed.filter(row => row.saving === 0).length,
  accuracy_pairs: rows.length,
  reference_correct: rows.filter(row => row.reference_correct).length,
  guide_correct: rows.filter(row => row.guide_correct).length
};
assert.deepEqual(metrics, JSON.parse(fs.readFileSync('audit/metrics.json', 'utf8')));
const volunteers = [...new Set(rows.map(row => row.volunteer_id))];
for (const person of volunteers) {
  assert.deepEqual(rows.filter(row => row.volunteer_id === person)
    .map(row => row.first_format).sort(), ['guide', 'reference']);
}
console.log(JSON.stringify({
  metrics,
  volunteers: volunteers.length,
  excluded_time_pairs: rows.filter(row => row.saving === null).map(row => row.pair_id),
  saving_percent: 100 * metrics.time_saved_seconds / metrics.reference_seconds,
  reference_accuracy_percent: 100 * metrics.reference_correct / metrics.accuracy_pairs,
  guide_accuracy_percent: 100 * metrics.guide_correct / metrics.accuracy_pairs,
  reference_assisted: rows.filter(row => row.reference_assisted).map(row => row.pair_id),
  guide_assisted: rows.filter(row => row.guide_assisted).map(row => row.pair_id)
}, null, 2));
'@ | node
```

Expected primary output: `eligible_time_pairs=7`, `reference_seconds=910`, `guide_seconds=800`, `time_saved_seconds=110`, `faster_pairs=5`, `slower_pairs=2`, `tied_pairs=0`, `accuracy_pairs=8`, `reference_correct=7`, `guide_correct=7`. The report also prints four volunteers, P7 as the excluded timing pair, 12.087912...% time reduction, 87.5% accuracy per format, and the assistance IDs listed above. The per-volunteer order assertion checks this particular recorded design; it is not an assumption to impose on a differently designed future check.

## Practical next-check proposal — planning only

1. **Set the scope and decision rules before scheduling.** Keep the current guide in routine use. Propose one bounded staffed session, with a fixed end time, a manageable lookup list and an agreed number of people/tasks suited to available staff. Include ordinary high-frequency lookups and the brake, chain and valve paths implicated by P5, P7 and P8. The coordinator must choose the actual scope and acceptance criteria; no sample size or adoption threshold was specified by this study. A small check is for finding usability problems and assessing whether another step is warranted, not for producing a population guarantee.
2. **Define success and pause conditions in writing.** Specify the acceptable first-selection error count/rate, assistance burden, usable timing completeness and timing comparison, along with what observed confusion needs correction. Review any wrong-bin event and unresolved guide ambiguity before widening use. Accuracy and usability must be acceptable alongside any speed benefit. Select these criteria prospectively rather than choosing them after seeing which comparisons favor the guide.
3. **Reduce practice and task confounding.** Where feasible, give people balanced sets of fresh, comparable ordinary-work lookups and rotate which task variant is assigned to each format across people. Balance format order and record prior familiarity, task variant and sequence. Define the new comparison/matching unit explicitly: different part lookups are not automatically the same-task pairs used in this exercise. If repeating exactly the same lookup to retain the old pairing rule, record the repetition and retain practice as a limitation even with balanced order. Include different familiarity levels when feasible; record who was observed rather than assuming they represent every shift.
4. **Fix observation rules and staffing.** Assign an observer and a helper, with roles combined only if accurate recording is feasible. Define a common timing start/stop rule in advance, for example request shown to first bin selected; record any later correction or total completion separately. That future definition must not be retroactively imposed on the old stopwatch values, whose precise endpoints are not documented here. Record the first selection before coaching where feasible, later assistance and reasons for confusion separately. If help occurs before a first selection, flag it explicitly and predefine its analysis treatment. Keep bin-label verification and access to staff; do not withhold necessary help for a cleaner measurement.
5. **Use a small versioned record set and check it immediately.** Preserve this pack as the historical baseline. In a separate future record set, capture unique pair/trial ID, volunteer ID, task/variant, guide version, first format, sequence/repetition, each elapsed time, first-selection correctness, assistance and observer notes. Preserve blanks as missing and log their reasons. Before closing the session, check IDs, first-selection entries and timing transfer against the original sheets so another P7-style export loss can be detected. Do not fill missing cells from memory or rewrite first selections after help.
6. **Review patterns as well as totals.** Reconcile the planned inclusion rules first, then examine matched timing, accuracy, assistance, wrong selections, confusion and differences by person/order/task. Report the numbers of people and observations separately. Keep assisted or incorrect trials in any primary analysis that the new protocol includes; optional subsets must be labeled and must not replace it silently. More trials from the same few people do not create additional independent volunteers. A population inference, if later needed, would require a design and analysis that address this dependence and broader coverage.
7. **Make a separate decision after review.** Decide whether to revise the guide, do another bounded check, or consider a wider introduction only when ordinary-work accuracy and usability justify it. Do not standardize automatically because a mean or total time improves. The practical unresolved choices now are the scope, staffing, task assignment, measurement endpoints and acceptance/pause criteria. None of these planning steps authorizes contacting volunteers or starting the session.

## Committee message to copy — not sent

> We will keep the current guide in place while we plan a limited, staffed check of the reorganized guide. The audit found 12.1% less total lookup time on seven usable task pairs (910 seconds with the reference card versus 800 with the new guide). The guide was faster in five pairs and slower in two. Both formats had seven correct first selections out of eight, so the records do not support the original claim of “30 percent faster and more accurate.” The eight task pairs came from four volunteers in one staffed exercise, with repeated-task practice, coaching and one missing guide time. These results do not establish performance across ordinary shifts or justify standardization now. Before any next check, we will define its scope and accuracy/usability acceptance criteria, record assistance and complete timings, and agree how errors will be reviewed. No next check has been launched.

## Handoff verification

The embedded reproduction block was run from the task directory and matched all ten fields in the prior audit JSON. The supplied structural checker also passed. The archived summary was compared byte for byte with the original draft; both have SHA-256 `4A7277EBEE0F9597A1E066107380540C66590C6B81304218C91DC46CFD2135D4`. All twelve pre-existing files, including the ten supplied sources and two prior audit outputs, retained their pre-handoff SHA-256 hashes. Only this methods file and the archived draft were added. No external services, outreach, study activity or rollout were used to prepare this handoff.
