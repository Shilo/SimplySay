The current reference card will remain in place while a limited staffed check is planned. The existing exercise shows a descriptive time saving on the complete records and equal observed first-selection accuracy. It does not establish that the reorganized guide is 30 percent faster, more accurate, or ready for every shift. This handoff explains how to reproduce that conclusion and proposes a next check for later authorization; it does not launch one.

**Sources and record stewardship**

Use [study/protocol.md](../study/protocol.md) for the recorded rules, [pairs.csv](../evidence/pairs.csv) for volunteer, task and order, [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) for outcomes, and [capture-notes.md](../evidence/capture-notes.md) for observation and export explanations. The guide texts describe the formats and add no outcome records. [audit/findings.md](../audit/findings.md) contains the detailed reconciliation and [audit/metrics.json](../audit/metrics.json) the ten protocol metrics.

[original-summary.md](original-summary.md) is a complete, byte-for-byte copy of the supplied draft, including its unsupported claims and original status line. It is retained as historical input, not endorsed as a result. The source [draft-summary.md](../draft-summary.md) and all other supplied files remain unchanged. Keep future corrections and future observations in separate, dated records with a protocol version; never overwrite first selections after help or backfill old missing measurements from a new exercise.

**What was observed, and what counts as a person**

Four volunteers, V1 through V4, each performed two lookup tasks. For each task, that volunteer used both formats. A pair therefore means one person doing one task in two formats. There are eight task pairs and sixteen format-level records, but only four distinct people. Seven pairs have both timings.

For example, V3 supplied P5 (brake) and P6 (lamp). Those observations share V3's experience, reading habits and familiarity with the store. They cannot be treated as two independently recruited volunteers. Within P5, the two format results also share the person and task; matching uses that shared context to make a local comparison. Counting more tasks can describe those people's work in more detail without adding new independent people.

Each volunteer used the reference first for one pair and the guide first for the other. Reference-first pairs are P1, P3, P5 and P7; guide-first pairs are P2, P4, P6 and P8. This balances recorded order but does not erase learning: a person may remember the part or bin on the second attempt. The protocol does not establish a random sample of store volunteers, and the pack does not establish randomized order assignment. All records come from one staffed exercise, not independent replications or unattended shifts. Even the four people share that setting.

Report the number of people alongside task counts. A statistical analysis that treats the eight task pairs as eight independent volunteers would overstate the independent information. With only four people and no representative sampling, do not attach a population guarantee to these totals. No significance claim or population confidence interval is made here.

**Reproducing the inclusion rules**

1. Read the three CSVs without altering them. Check unique `pair_id` values, exactly one matching outcome row per format and pair, Boolean `correct` and `assisted` fields, and positive finite recorded times. Investigate duplicates, unmatched records or invalid values rather than silently discarding them.
2. Join each outcome to the register by `pair_id`, never by row position. Task and volunteer come from the register, not an inferred row order.
3. For timing, require positive recorded seconds in both formats. A blank is missing, not zero or a failure. If one time is missing, exclude both times in that pair from this comparison. Do not impute a value.
4. Include every otherwise eligible timing pair even if a first selection was incorrect or assistance occurred. Removing those tasks would change the recorded protocol and could hide difficulties with a format.
5. For each eligible pair, calculate `saved = reference_seconds - guide_seconds`. Positive means the guide was faster, negative slower, and zero tied. Sum each format over exactly that same eligible set.
6. Calculate percentage time saving as `100 * (matched reference total - matched guide total) / matched reference total`. This is a reduction in summed elapsed time, weighted by the recorded durations. It is not the mean of pair percentages or a promise for an individual lookup. Use the wording “less total time”; a percentage increase in lookup rate would use a different denominator.
7. For accuracy, retain all eight pairs with observed first selections, including those missing timing. Count `correct=true` separately for each format. A later assisted correction does not change an incorrect first selection. Record assistance separately from accuracy.

| Pair | Volunteer / task | First format | Reference seconds | Guide seconds | Saved seconds | First selections: reference / guide | Later assistance: reference / guide |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| P1 | V1 / patch | reference | 120 | 90 | 30 | correct / correct | no / no |
| P2 | V1 / pump | guide | 100 | 95 | 5 | correct / correct | no / no |
| P3 | V2 / cable | reference | 160 | 100 | 60 | incorrect / correct | yes / no |
| P4 | V2 / tube | guide | 80 | 75 | 5 | correct / correct | no / no |
| P5 | V3 / brake | reference | 140 | 150 | -10 | correct / incorrect | no / yes |
| P6 | V3 / lamp | guide | 200 | 160 | 40 | correct / correct | yes / no |
| P7 | V4 / chain | reference | 150, excluded | missing | unavailable | correct / correct | no / yes |
| P8 | V4 / valve | guide | 110 | 130 | -20 | correct / correct | no / no |

Eligible timing IDs are P1, P2, P3, P4, P5, P6 and P8. The arithmetic is:

```text
Reference = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Guide     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Saved     = 910 - 800 = 110 seconds
Check     = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110 seconds
Saving %  = 100 * 110 / 910 = 12.087912...%, reported as 12.1%
Faster    = P1, P2, P3, P4, P6: 5
Slower    = P5, P8: 2
Tied      = 0
```

Accuracy uses P1 through P8: reference is correct on every pair except P3, and guide on every pair except P5. Each is `7 / 8 = 87.5%`; the observed difference is zero percentage points. Six pairs are correct under both formats, P3 only under the guide, P5 only under the reference, and none incorrect under both. These are equal observed totals, not proof of equal underlying accuracy.

The exact protocol JSON is:

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

**P5: an incorrect first selection remains incorrect**

P5 is V3 finding a brake, with the reference first. Reference time is 140 seconds, the first selection is correct, and no later assistance is recorded. Guide time is 150 seconds, the first selection is incorrect, and later coaching is recorded. Both times exist and are positive, so P5 belongs in timing: `140 - 150 = -10` seconds. The guide was ten seconds slower on this observed task.

P5 also belongs in accuracy: it adds one correct reference selection and zero correct guide selections. Coaching after the mistake does not make the guide's first selection correct. Excluding P5 because help was needed, or relabeling it after help, would conceal the observed difficulty and inflate the guide's accuracy. The records do not establish the reason for the wrong selection or how much coaching influenced elapsed time. A future diagnostic observation may investigate the guide, bin mapping and physical labels, but must not assert a cause from this flag alone.

**P7: a missing time does not erase an observed selection**

P7 is V4 finding a chain, with the reference first. Its reference time is 150 seconds; the guide time is blank. The notes say the guide stopwatch entry was lost during export and no other time exists. There is no valid pair difference or faster/slower classification. Neither its 150 reference seconds nor an invented guide value enters the matched totals.

P7's first selections are recorded correct for both formats, so it contributes one success to each accuracy numerator and one pair to the accuracy denominator. Later guide assistance is also retained. A correct initial selection and later help can coexist; the fields describe different events. Neither the missing stopwatch value nor the assistance flag proves a failed first selection.

Including all eight reference times would produce 1,060 seconds, while the guide's seven measured times total 800. That mismatched subtraction gives 260 seconds and is invalid. Dropping P7 from accuracy instead would produce 6/7 for each format, also contrary to the protocol. Neither shortcut is used. The missing value's cause is documented, but that does not reveal the unobserved time or prove that its exclusion has no effect on the speed result. A new chain lookup would be a new observation, not a replacement value for P7.

**What the results establish and what remains uncertain**

| Evidence | Supported interpretation | Limit |
| --- | --- | --- |
| 910 versus 800 seconds over seven complete pairs | These measured pairs used 110 fewer total seconds with the guide, a 12.1% saving. | Not a 30% saving, a universal improvement, or an estimate of all eight pairs' total saving. P5 and P8 were slower. |
| 7/8 correct first selections for each format | No net first-selection accuracy improvement was observed. | Equal totals in four people do not establish equivalence, noninferiority, or safety in ordinary work. |
| Reference assistance at P3 and P6; guide assistance at P5 and P7 | Assistance occurred twice under each format. | Equal counts do not show equal effects or independent usability. The source does not fully specify stopwatch endpoints relative to later assistance. |
| Same people repeat the same lookup in both formats | Matching reduces some differences between people and tasks. | Familiarity, order and coaching can still affect observed differences; the guide's isolated causal effect is not established. |
| One staffed exercise | Enough local information to plan a focused further check. | No representative population evidence, independent replication, or unattended-work guarantee. |

P3 and P6 supply 100 of the net 110 seconds saved, and both have reference assistance. This does not prove assistance caused the saving, but it makes a design-only explanation uncertain. Keep these records in the primary analysis rather than selecting a more favorable subset. V4 has only P8 in timing, where the guide was slower; the full data do not show every volunteer benefiting.

**Practical next-check plan, for planning only**

The purpose is to find out whether the guide supports accurate, usable ordinary lookups with an acceptable need for help. The current reference card remains standard. No sessions, invitations, assignments or deployment have been initiated.

1. **Agree a small scope before scheduling.** A workable starting proposal is two short staffed blocks, four or six volunteers with a mix of store experience, and four ordinary lookup tasks per person. That is 16 or 24 format-level lookups, not 16 or 24 independent people. Use available staffing and retain the card as a fallback. This is a workload cap for an exploratory check, not a calculated sample size for proving equivalence. Record any returning volunteers; a repeat by the same people is not independent replication.
2. **Use fresh tasks and a recorded allocation.** Select four comparable ordinary lookup tasks in advance, including brake, chain and valve plus one routine lookup. Give each person each selected task once, two using each format. Across volunteers, balance which format is used for each task and vary task sequence and format order using a written schedule. Do not teach a task's answer and immediately time the other format on the same task. Record prior familiarity and any deviations. This reduces immediate answer memorization but cannot remove every difference between tasks or people.
3. **Write a prospective protocol.** Define the task prompts, guide versions, allocation, observation fields, timing endpoints, inclusion rules and review criteria before collecting anything. A practical new primary time is from a completed prompt to the first bin selection, with correctness recorded before feedback. Record any subsequent coaching and time to eventual resolution separately; do not delay needed help to obtain a measurement. This timing definition is a proposal for the new check, not a claim about the old stopwatch endpoint. Do not pool old and new times unless their meanings are confirmed comparable.
4. **Capture events as separate fields.** Record session and volunteer IDs, experience, task, assigned format, sequence, first selected bin, first-selection correctness, elapsed time, missing-time reason, assistance and its timing, eventual outcome, and brief usability observations. Check stopwatch transfer and completeness before closing each session. Keep originals and an amendment log; never silently repair a blank with zero or change a first selection after coaching.
5. **Make the problem cases observable.** For brake lookups, note where a selection goes wrong or help is requested; inspect the guide's instructions, bin mapping and label clarity without presuming which caused P5. For chain, verify both usability and reliable timing capture. For valve, look for the steps associated with slower lookup. Treat any observed issue as a new finding, keeping it distinct from historical P5, P7 and P8.
6. **Set decision criteria before seeing results.** The coordinator must agree the minimum acceptable first-selection performance, what accuracy loss would be unacceptable, acceptable assistance needs, and what time saving would justify a change. These records do not determine defensible numerical thresholds. For this exploratory check, a wrong-bin selection or unresolved label ambiguity should prompt immediate staff help and a documented review before using that task again. Recurring errors or inability to use the guide without frequent help should trigger revision and further review rather than expansion. A small check with no observed errors would still not prove population safety or equivalence.
7. **Review before any expansion.** Report people, tasks, missing records, first-selection results, assistance and timing separately. Compare formats with attention to task and volunteer, showing the allocations and any imbalances. The proposed fresh-task design does not create the old same-person, same-task pairs: do not join unrelated trials and reuse the historical paired calculation. Use a new analysis plan appropriate to that allocation, and report the limited check descriptively if the numbers remain small. Decide whether to revise the guide, gather more evidence, or consider a separate standardization decision only after reviewing ordinary-work accuracy and usability.

Before any launch, the planning decisions are the staffing and workload cap, task/allocation schedule, timing definition and agreed accuracy/assistance/time criteria. The immediate operating decision is already settled: retain the reference card. This document does not authorize recruiting volunteers or starting data collection.

**Local reproduction and verification**

From the supplied task directory, `node tools/check-evidence.cjs` verifies file structure and the missing guide timing, but does not establish benefit claims. The following read-only PowerShell command uses installed Node.js and built-in libraries to independently reproduce the ten metrics and compare them with the saved audit. The small CSV reader matches this pack's unquoted layout. A changed schema or quoted CSV layout would require an appropriate parser change.

```powershell
@'
const fs = require('node:fs');
const assert = require('node:assert/strict');
function read(file, fields) {
  const lines = fs.readFileSync(file, 'utf8').trim().split(/\r?\n/);
  assert.deepEqual(lines.shift().split(','), fields);
  return lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, fields.length);
    return Object.fromEntries(fields.map((field, i) => [field, cells[i]]));
  });
}
const pairs = read('evidence/pairs.csv',
  ['pair_id', 'volunteer_id', 'task', 'first_format']);
const ids = pairs.map(row => row.pair_id).sort();
assert.equal(new Set(ids).size, ids.length);
function outcomes(file) {
  const rows = read(file, ['pair_id', 'seconds', 'correct', 'assisted']);
  assert.deepEqual(rows.map(row => row.pair_id).sort(), ids);
  return new Map(rows.map(row => {
    assert.ok(['true', 'false'].includes(row.correct));
    assert.ok(['true', 'false'].includes(row.assisted));
    const seconds = row.seconds === '' ? null : Number(row.seconds);
    assert.ok(seconds === null || (Number.isFinite(seconds) && seconds > 0));
    return [row.pair_id, {seconds, correct: row.correct === 'true'}];
  }));
}
const reference = outcomes('evidence/reference.csv');
const guide = outcomes('evidence/guide.csv');
const all = pairs.map(pair => ({
  id: pair.pair_id, r: reference.get(pair.pair_id), g: guide.get(pair.pair_id)
}));
const timed = all.filter(row => row.r.seconds !== null && row.g.seconds !== null);
const sum = select => timed.reduce((total, row) => total + select(row), 0);
const metrics = {
  eligible_time_pairs: timed.length,
  reference_seconds: sum(row => row.r.seconds),
  guide_seconds: sum(row => row.g.seconds),
  time_saved_seconds: sum(row => row.r.seconds - row.g.seconds),
  faster_pairs: timed.filter(row => row.g.seconds < row.r.seconds).length,
  slower_pairs: timed.filter(row => row.g.seconds > row.r.seconds).length,
  tied_pairs: timed.filter(row => row.g.seconds === row.r.seconds).length,
  accuracy_pairs: all.length,
  reference_correct: all.filter(row => row.r.correct).length,
  guide_correct: all.filter(row => row.g.correct).length
};
assert.deepEqual(metrics, JSON.parse(fs.readFileSync('audit/metrics.json', 'utf8')));
console.log(JSON.stringify(metrics, null, 2));
'@ | node
```

The embedded command was executed locally and reproduced all ten metrics. The supplied structural checker also passed. The archived original was compared with the source byte for byte: both have SHA-256 `4a7277ebee0f9597a1e066107380540c66590c6b81304218c91dc46cfd2135d4`. Preservation checks confirmed that all twelve files present before this handoff, including both audit files, remain unchanged. Only the two requested handoff files were added. No external services were used, no committee message was sent, and no further study was launched.

**Committee message to copy; not sent**

> We will keep the current reference card in place while planning a limited staffed check of the reorganized guide. The corrected evidence comes from four volunteers completing eight paired lookup tasks, with seven complete timing pairs. Across those seven pairs, total time was 910 seconds with the reference card and 800 seconds with the guide: 110 seconds, or 12.1%, less total time. The guide was faster in five pairs and slower in two. First selections were correct in seven of eight tasks for each format, so no accuracy improvement was observed. The earlier claim of a 30 percent speed improvement and greater accuracy is unsupported. Repeated tasks, coaching, one missing guide time and the small single-session sample leave uncertainty about the guide's own effect and its performance in ordinary work. We will agree the next check's scope and review criteria before collecting further observations; no new check has started, and standardization remains a later decision.
