Keep the current reference card in place while planning a limited, staffed check. The existing exercise suggests a possible time benefit from the reorganized guide, but it does not establish better accuracy or justify standardizing the guide. This handoff explains how to reproduce that conclusion and proposes a future check for review. No check has been launched and no committee message has been sent.

Use [the recorded protocol](../study/protocol.md) as the analysis specification, [pairs.csv](../evidence/pairs.csv) as the participant/task/order register, and [reference.csv](../evidence/reference.csv) and [guide.csv](../evidence/guide.csv) as the outcome records. [Capture notes](../evidence/capture-notes.md) explain the missing stopwatch entry and coaching. The [audit findings](../audit/findings.md) and [metrics](../audit/metrics.json) contain the reconciled results. The guide texts describe the materials, not additional outcomes.

[original-summary.md](original-summary.md) is a byte-for-byte archive of the full supplied [draft-summary.md](../draft-summary.md), including its title and status line. It preserves the original claims for traceability; those claims are not verified findings. Do not edit that archive to correct the claims. Keep corrections in the audit and handoff. All pre-existing files have been retained unchanged.

To reproduce the analysis, first distinguish three units. A person is one volunteer, V1-V4. A task pair is that person's lookup of the same part using both formats, P1-P8. A format attempt is one of those two lookups. Thus the pack contains four people, eight pairs, and sixteen first-selection observations, eight per format. There are fifteen recorded times, but only fourteen belong to complete time pairs.

| Volunteer | Task pairs | First-format assignments |
| --- | --- | --- |
| V1 | P1 find_patch; P2 find_pump | P1 reference; P2 guide |
| V2 | P3 find_cable; P4 find_tube | P3 reference; P4 guide |
| V3 | P5 find_brake; P6 find_lamp | P5 reference; P6 guide |
| V4 | P7 find_chain; P8 find_valve | P7 reference; P8 guide |

The two pairs contributed by a person share that person's reading speed, store knowledge, habits and familiarity with the materials. Their outcomes can therefore move together. Pairing compares the formats within the same person and task, which helps avoid confusing a fast person's performance with a format advantage. It does not make that person's second task pair an independent new person. Nor are the two format attempts within a pair independent: the second attempt repeats a lookup and may benefit from learning the answer or route.

Order was balanced within each person: one task began with the reference and one with the guide. This reduces a simple tendency for one format always to come second, but does not erase task-specific learning, establish random assignment, or make these four volunteers a random sample of all shifts. After excluding P7 from timing, three eligible pairs are reference-first and four are guide-first, and V4 contributes only P8 to time totals. A calculation that treats eight pairs, seven timed differences or sixteen attempts as independent volunteers would overstate the amount of independent information. Any later uncertainty analysis must account for repeated observations within people and task/order effects; four people provide little information for such an analysis. This handoff reports descriptive arithmetic rather than an unjustified population confidence interval.

Apply the inclusion rules separately to timing and accuracy:

1. Validate that pair IDs are unique in each CSV, that the ID sets agree, and that each ID maps to one volunteer, task and first-format assignment. Join on pair_id; row position is not a matching key.
2. Read seconds as missing when the cell is blank. For a recorded time, require a finite positive number. Do not convert a blank to zero. Investigate invalid values rather than silently using them; this pack has no nonpositive recorded times.
3. Include a pair in timing only when both format times are present and positive. Sum both formats over exactly that same set. Retain eligible times even if the first selection was wrong or later assistance occurred; neither is a timing exclusion in the recorded protocol.
4. For each eligible pair calculate reference seconds minus guide seconds. Positive means guide faster, negative means guide slower, zero means tied. Sum the reference times and guide times separately, subtract the totals, then divide that saving by the matched reference total and multiply by 100.
5. For accuracy, count the observed first bin selected before coaching. Include all eight pairs because both first-selection outcomes are recorded for every pair. A missing time does not remove an observed accuracy outcome. Later successful completion is a different event and cannot replace an incorrect first selection.
6. Preserve assistance as its own observation. It is neither a correctness override nor proof of a particular effect on time. Report missing measurements and assistance alongside the results, rather than hiding them in a single success rate.

The complete arithmetic is visible at pair level below. First-selection values are the recorded booleans, not eventual completion after help. The assistance columns refer to later coaching.

| Pair | Reference seconds | Guide seconds | Saving seconds | Reference correct | Guide correct | Reference assisted | Guide assisted |
| --- | ---: | ---: | ---: | --- | --- | --- | --- |
| P1 | 120 | 90 | 30 | true | true | false | false |
| P2 | 100 | 95 | 5 | true | true | false | false |
| P3 | 160 | 100 | 60 | false | true | true | false |
| P4 | 80 | 75 | 5 | true | true | false | false |
| P5 | 140 | 150 | -10 | true | false | false | true |
| P6 | 200 | 160 | 40 | true | true | true | false |
| P7 | 150 | missing | not comparable | true | true | false | true |
| P8 | 110 | 130 | -20 | true | true | false | false |

```text
Timing inclusion = P1, P2, P3, P4, P5, P6, P8 = 7 pairs
Reference total  = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Guide total      =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Time saved       = 910 - 800 = 110 seconds
Percentage saved = 110 / 910 * 100 = 12.087912...% = 12.1% rounded
Faster           = P1, P2, P3, P4, P6 = 5
Slower           = P5, P8 = 2
Tied             = none = 0

Accuracy inclusion = P1 through P8 = 8 pairs
Reference correct  = 8 - 1 (P3) = 7; 7 / 8 * 100 = 87.5%
Guide correct      = 8 - 1 (P5) = 7; 7 / 8 * 100 = 87.5%
Accuracy difference, guide minus reference = 0 percentage points
Reference assistance = P3, P6 = 2/8
Guide assistance     = P5, P7 = 2/8
```

The percentage describes a reduction in total elapsed time for this matched set, using reference time as the baseline. It is not the average of seven individual percentage savings, a percentage improvement for every volunteer, or a guaranteed change in lookup rate. Longer reference lookups contribute more to the total-time percentage. The 30% claim does not follow from the protocol calculation. Prefer the precise wording "12.1% lower recorded total time across seven usable task pairs" over a broad claim that the guide is a certain percentage faster.

P5 is V3's find_brake task, with the reference used first. Reference took 140 seconds with a correct first bin and no later help. Guide took 150 seconds with an incorrect first bin and later coaching. Both times are valid, so P5 contributes 140 and 150 to the matched totals, a saving of 140 - 150 = -10 seconds: the guide was slower by ten seconds. It also contributes one correct reference first selection and one incorrect guide first selection. Reclassifying the guide outcome after coaching would turn 7/8 into a false 8/8. Excluding P5 because it was wrong would also violate the time rules and selectively remove unfavorable evidence. The records show the error and assistance; they do not identify whether the cause was the guide's categories, its wording, a physical label, unfamiliarity or something else. Inspect that lookup path in planning rather than asserting a cause from this row.

P7 is V4's find_chain task, with the reference used first. Reference took 150 seconds; guide seconds are blank because the stopwatch entry was lost during export. The notes say no alternative timing exists. There is no usable P7 time difference. Exclude P7 from both timing sums, not just the guide sum: otherwise the totals would describe different workloads. Treating its blank as zero would invent an instantaneous guide lookup and a 150-second benefit. Borrowing another task's or volunteer's time would invent a measurement. Missing time also does not establish a failed or abandoned task. Both P7 first-selection cards say correct, so both stay in accuracy, and its later guide assistance remains recorded. A correct first choice and later assistance can coexist. Consequently the timing denominator is seven pairs while the accuracy denominator is eight; that difference is intentional.

For a coordinator who wants to rerun the arithmetic, the following uses only installed Node and built-in modules. Run the block in PowerShell from the local pack's root. It reads the simple CSV layout supplied here and prints results without modifying any file. It validates IDs, headers, flags and recorded times before calculating. The existing `node tools/check-evidence.cjs` is a useful structural check, but does not calculate the benefit independently.

```powershell
@'
const fs = require('node:fs');
const assert = require('node:assert/strict');
function read(file, fields) {
  const [header, ...lines] = fs.readFileSync(file, 'utf8').trim().split(/\r?\n/);
  assert.equal(header, fields.join(','));
  return lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, fields.length);
    return Object.fromEntries(fields.map((key, i) => [key, cells[i]]));
  });
}
function index(rows) {
  const result = new Map(rows.map(row => [row.pair_id, row]));
  assert.equal(result.size, rows.length, 'Duplicate pair ID');
  return result;
}
function seconds(cell) {
  if (cell.trim() === '') return null;
  const value = Number(cell);
  assert(Number.isFinite(value) && value > 0, 'Invalid recorded time');
  return value;
}
const pairs = read('evidence/pairs.csv',
  ['pair_id', 'volunteer_id', 'task', 'first_format']);
const outcomes = ['pair_id', 'seconds', 'correct', 'assisted'];
const reference = index(read('evidence/reference.csv', outcomes));
const guide = index(read('evidence/guide.csv', outcomes));
const ids = [...index(pairs).keys()].sort();
for (const records of [reference, guide]) {
  assert.deepEqual([...records.keys()].sort(), ids);
  for (const row of records.values()) {
    assert(['true', 'false'].includes(row.correct));
    assert(['true', 'false'].includes(row.assisted));
  }
}
const rows = pairs.map(pair => {
  const r = reference.get(pair.pair_id), g = guide.get(pair.pair_id);
  return { id: pair.pair_id, r, g, rt: seconds(r.seconds), gt: seconds(g.seconds) };
});
const eligible = rows.filter(row => row.rt !== null && row.gt !== null);
const rTotal = eligible.reduce((sum, row) => sum + row.rt, 0);
const gTotal = eligible.reduce((sum, row) => sum + row.gt, 0);
const metrics = {
  eligible_time_pairs: eligible.length,
  reference_seconds: rTotal,
  guide_seconds: gTotal,
  time_saved_seconds: rTotal - gTotal,
  faster_pairs: eligible.filter(row => row.gt < row.rt).length,
  slower_pairs: eligible.filter(row => row.gt > row.rt).length,
  tied_pairs: eligible.filter(row => row.gt === row.rt).length,
  accuracy_pairs: rows.length,
  reference_correct: rows.filter(row => row.r.correct === 'true').length,
  guide_correct: rows.filter(row => row.g.correct === 'true').length
};
assert.equal(metrics.faster_pairs + metrics.slower_pairs + metrics.tied_pairs,
  metrics.eligible_time_pairs);
console.log(JSON.stringify({
  metrics,
  percentage_saved: rTotal > 0 ? 100 * (rTotal - gTotal) / rTotal : null,
  eligible_ids: eligible.map(row => row.id),
  reference_assisted: rows.filter(row => row.r.assisted === 'true').map(row => row.id),
  guide_assisted: rows.filter(row => row.g.assisted === 'true').map(row => row.id)
}, null, 2));
'@ | node
```

Expected metrics, in the protocol's exact ten-field format, are:

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

These results establish what was observed in this exercise: less total recorded time on the usable pairs, with variation across tasks, and equal first-selection totals. They do not establish that the guide caused all 110 seconds of difference, that it is faster for every task or person, or that it improves accuracy. Six pairs were correct under both formats; P3 favors the guide and P5 favors the reference. Equal 7/8 totals do not prove equivalent accuracy, because a small sample can miss important differences. Each format had assistance twice, but equal counts do not show assistance had no effect. The timing endpoint relative to later coaching is not specified well enough to separate their contributions. No safety outcome, population guarantee or independent replication follows from these records.

The descriptive checks in the audit reinforce these limits. Reference-first eligible pairs saved 80/420 = 19.0%; guide-first pairs saved 30/490 = 6.1%. They involve different tasks and people, so this difference cannot identify a practice effect. Eligible pairs with no assistance under either format saved 20/410 = 4.9%. Selecting that subgroup changes the task mix and does not isolate a coaching effect or replace the main analysis. No P7 time can be inferred from any of these summaries. None of the pack documents a later unattended shift or ordinary-work rollout.

A practical next-check proposal follows. The scope and review rules below are planning suggestions, not a statistical power calculation or an approved study. The current reference card remains the normal guide throughout planning and any separately authorized limited exercise.

1. **Bound the activity and name its owner.** Propose two short staffed sessions across two shifts, with up to six volunteers contributing two task pairs each: at most twelve pairs from six people, not twelve independent people. Include a spread of store familiarity where feasible and record prior experience rather than calling the sample random. The coordinator must agree the scope, available helper/observer coverage and review date before scheduling. Do not recruit or book sessions from this handoff.
2. **Review the materials and select tasks before seeing new outcomes.** Trace the find_brake path behind P5 and the slower find_valve lookup at P8, checking category, part name, bin code and physical label. The old rows identify things to inspect, not proven defects. Include these kinds of lookup and other routine categories in a fixed task list. Preserve the guide version used; any revision gets a new version and its own record. Use tasks new to each participant at the outset. Balance reference-first and guide-first within each person, and separate repeats with another task where feasible. Repeating a task still leaves familiarity effects; document them rather than promising they are removed.
3. **Specify measurement events and preserve requested help.** For the new check, start timing when the lookup request and assigned material are available; stop the first-selection clock when the participant identifies the first physical bin. Record that bin and its correctness before corrective feedback, then record any assistance and later resolution separately. Staff remain available, and participants may ask for help at any point. If help precedes a first selection, record that sequence and that an uncoached first selection was not observed; do not invent one or silently omit the attempt. Record any abandonment and its reason separately. This explicit timing definition is a prospective choice: the old pack does not establish the same endpoint, so do not pool old and new time totals as one study.
4. **Make the record recoverable.** Use unique session, person and pair IDs; task and guide version; format/order; prior familiarity; start/stop or elapsed seconds; first bin and correctness; assistance timing; later resolution; and a missing-data reason when applicable. Check stopwatch and outcome records against the pair register before each session closes. Keep raw records read-only after capture and log corrections separately. In analysis, continue to compare complete positive time pairs, disclose exclusions, and preserve independently observed first selections even when timing is missing. Report early-help and no-selection cases explicitly with their denominators; they must not disappear into an apparently better accuracy rate.
5. **Agree the decision rules before collecting results.** Proposed review gates are no unexplained guide wrong-bin selections, no observed decline in first-selection accuracy, no increased assistance burden, and a useful time benefit spread across people and tasks. The coordinator must specify the minimum useful time reduction, acceptable data completeness and how early-help/no-selection cases enter the review. Counts and denominators must accompany those judgments. Any guide wrong-bin selection should pause the affected lookup for review; a repeated guide problem should pause candidate use until reviewed. Speed cannot compensate for an unresolved selection problem. These are operational review gates, not proof of statistical equivalence or a safety guarantee.
6. **Review at the agreed endpoint rather than expanding automatically.** Show pair-level results, matched totals, first-selection and assistance counts, missingness, and each person's pattern. Treat repeated pairs as grouped within people. Ask whether the guide works accurately and usefully with the available staffing in ordinary tasks, and whether the benefit depends on a few tasks, people or order assignments. At review, choose to retain the reference, revise and check again, or consider a further bounded evaluation. Even passing a small check does not compel standardization or establish performance for every shift. Obtain adequate ordinary-work evidence before revisiting a wider change.

The decisions still to make are the proposed check's scope, staffing and ownership, the measurement and review rules, and whether to authorize scheduling after those are concrete. Keeping the reference in place is already decided. No additional data or participant contact is needed to understand or preserve the current audit.

The following message is prepared for copying to the committee; it has not been sent:

> We will keep the current reference card in place while planning a limited, staffed check of the reorganized finding-parts guide. The audit does not support the draft claim that the guide is 30% faster and more accurate. Four volunteers contributed eight paired lookup tasks. Seven pairs had usable times: recorded total time was 910 seconds with the reference card and 800 with the guide, a reduction of 110 seconds (12.1%). The guide was faster in five pairs and slower in two. Both formats had 7/8 correct first selections; later coaching does not change those outcomes. One guide time was missing, but its recorded first selection remains included in accuracy. Repeated tasks, coaching and the small group leave practice effects and ordinary-work performance uncertain. We will define the scope and review criteria for a limited check before considering standardization. No new check has started.

Handoff verification: the reproduction block was executed against the supplied local records and its metrics matched audit/metrics.json and the JSON example above. Its eligible IDs and assistance IDs matched the recorded examples. Relative file links resolved. The archived draft matched the original byte for byte, and SHA-256 checks confirmed that all twelve pre-existing source and audit files remained unchanged. These are checks of record preservation and calculation consistency, not evidence resolving the study's remaining uncertainty.
