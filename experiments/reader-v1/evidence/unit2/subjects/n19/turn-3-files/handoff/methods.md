# Methods handoff: finding-parts guide exercise

## Current decision and scope

Keep the existing reference card in place while planning a limited, staffed check. The current exercise provides a local indication of shorter total lookup time with the reorganized guide, with no observed aggregate accuracy improvement. It does not justify standardizing the guide now or telling the committee it is "30 percent faster and more accurate."

This handoff explains the original analysis, preserves its denominators and gives a proposed next-check design. It does not launch that check, authorize recruitment or change the guide in use. The proposed design below needs a new, agreed protocol before implementation.

## Records and provenance

The governing source is [study/protocol.md](../study/protocol.md). Use it with these records:

| Source | What it establishes |
| --- | --- |
| [evidence/pairs.csv](../evidence/pairs.csv) | Pair ID, volunteer ID, lookup task and first format. |
| [evidence/reference.csv](../evidence/reference.csv) | Reference-card seconds, observed first-selection correctness and later assistance. |
| [evidence/guide.csv](../evidence/guide.csv) | The same fields for the reorganized guide. |
| [evidence/capture-notes.md](../evidence/capture-notes.md) | P7's lost guide timing, the meaning of first selection, and the staffed, repeated-task setting. |
| [audit/findings.md](../audit/findings.md) and [audit/metrics.json](../audit/metrics.json) | Reconciled audit, calculations and the protocol's ten numeric metrics. |
| [original-summary.md](original-summary.md) | The full historical draft, copied byte for byte from [draft-summary.md](../draft-summary.md), including its unchecked claims and status note. It is not a corrected summary. |

The two files in `guides/` describe the formats; they contain no additional outcome records. Preserve the supplied files and the original draft. Keep interpretations and later changes in separate, versioned records so that eventual coaching, a corrected guide or a later check cannot overwrite this exercise's observations.

## What the observations represent

There are **four people, eight task pairs and sixteen format-specific first-selection records**. V1 contributes P1/P2, V2 contributes P3/P4, V3 contributes P5/P6 and V4 contributes P7/P8. A task pair is one person performing the same lookup with both formats. It is not a new person each time.

Pairing makes the comparison more useful: within a pair, the person and task are held constant. However, a person's two pairs can share their experience, reading habits and familiarity with the store. The two format attempts within a pair can also share learning from the first attempt. Treating the eight pairs as eight independent people would exaggerate the amount of independent information. Sixteen format attempts are not sixteen independent participants either.

Each volunteer did one reference-first pair and one guide-first pair, so the full exercise has four pairs in each order. This counterbalancing distributes order across formats; it does not erase learning from repeating a task, establish randomized sampling or provide an independent replication. After P7 is excluded from timing, the seven timed pairs have three reference-first and four guide-first pairs. These are descriptive observations from one staffed exercise, not a random sample of store volunteers or shifts. Future inference would need to account for repeated observations within participants and task allocation; an analysis that treats every row as independent would not do that.

## Inclusion rules, in reproducible order

1. Read the three CSVs without changing them. Treat `pair_id` as a key. Verify one unique record per ID in each file, the same ID set across files, valid Boolean text (`true`/`false`) and either a positive time or a blank time. Resolve duplicate or unmatched records explicitly; never align by row position or silently drop a failed join.
2. Join reference and guide records to the pair metadata by ID. Here the ID set is P1 through P8. A blank `seconds` field means a missing measurement. It is not zero, a failed lookup or permission to estimate a time from another record.
3. For **timing**, include a pair only when both formats have positive recorded seconds. Apply that one eligible ID set to both timing columns. Do not filter out a pair because it was incorrect or assisted: the recorded protocol does not make those timing exclusion criteria.
4. For each eligible pair compute `reference_seconds - guide_seconds`. A positive difference is a faster guide result; a negative difference is a slower result; zero is a tie. Sum each format over the same eligible IDs, then subtract the guide total from the reference total.
5. Calculate percentage saving as `100 * time_saved_seconds / matched_reference_seconds`. This is a reduction in matched elapsed time. It is not an average of pair percentages or a guarantee of how much faster a future volunteer will be. Use the unrounded totals in the calculation; display about 12.1% in prose.
6. For **accuracy**, independently retain all eight pairs with observed first selections, even if time is missing. Count the `correct` values as recorded. `assisted` records later coaching; it never upgrades an initially incorrect selection to correct. Keep assistance as a separate outcome/context field.
7. Write the ten numeric protocol fields only to `audit/metrics.json`. Put percentages, missingness and interpretation in prose. Do not mix the timing denominator of seven with the accuracy denominator of eight.

## Record ledger and arithmetic

All times and differences below are seconds. First-correct and assisted values are reference / guide. A dash means the timing difference is unavailable, not zero.

| Pair | Person | Task | First format | Reference | Guide | Reference minus guide | First correct R/G | Assisted R/G |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| P1 | V1 | find_patch | reference | 120 | 90 | +30 | true / true | false / false |
| P2 | V1 | find_pump | guide | 100 | 95 | +5 | true / true | false / false |
| P3 | V2 | find_cable | reference | 160 | 100 | +60 | false / true | true / false |
| P4 | V2 | find_tube | guide | 80 | 75 | +5 | true / true | false / false |
| P5 | V3 | find_brake | reference | 140 | 150 | -10 | true / false | false / true |
| P6 | V3 | find_lamp | guide | 200 | 160 | +40 | true / true | true / false |
| P7 | V4 | find_chain | reference | 150, excluded from timing | missing | - | true / true | false / true |
| P8 | V4 | find_valve | guide | 110 | 130 | -20 | true / true | false / false |

The eligible timing set is P1, P2, P3, P4, P5, P6 and P8:

```text
Reference total = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 seconds
Guide total     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 seconds
Time saved      = 910 - 800 = 110 seconds
Saving percent  = 100 * 110 / 910 = 12.087912...%, approximately 12.1%
Delta crosscheck = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110 seconds
```

Faster pairs are P1, P2, P3, P4 and P6 (5). Slower pairs are P5 and P8 (2). There are no ties. These counts add to the seven eligible pairs.

Accuracy uses P1 through P8. Reference is incorrect only on P3, so it is 7/8 = 87.5%. Guide is incorrect only on P5, so it is also 7/8 = 87.5%. The guide-minus-reference accuracy difference is zero percentage points. Six pairs are correct under both formats; P3 favors the guide, P5 favors the reference, and no pair is incorrect under both. Thus equal totals do not mean identical performance on every task.

The expected machine-readable result, matching the existing audit, is:

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

## Worked example: P5, the brake lookup

V3 tried the reference card first. Its record is `140,true,false`; the guide record is `150,false,true`. Both elapsed times are present and positive, so P5 belongs in the timing calculation. Its difference is `140 - 150 = -10` seconds: the guide took ten seconds longer. This contributes one slower pair, not a faster pair.

The reference first selection was correct and the guide first selection was wrong. Later coaching on the guide attempt does not change that first-selection error. P5 contributes one correct reference outcome and zero correct guide outcomes, both within denominators of eight. Removing P5 for being wrong or assisted would discard an unfavorable observation and violate the inclusion rules. Counting eventual completion as first-selection correctness would invent the draft's eighth guide success.

The record establishes an observed guide error and a slower elapsed time on this task. It does not establish that the guide caused the error, how much coaching affected the elapsed time, or which category, instruction or label caused difficulty. Review the brake route when planning the next check, and record the reason only if evidence supports it. Do not retroactively relabel P5 based on that review.

## Worked example: P7, the chain lookup

V4 tried the reference card first. Its record is `150,true,false`; the guide record is blank time with `correct=true,assisted=true`. Capture notes say the guide stopwatch entry was lost during export and there is no other timing in this pack. The missing time supplies no information about how fast or slow the guide was.

Exclude P7 from **both** timing sums, not just the guide sum. The raw reference column adds to 1,060 seconds; subtract P7's 150 to obtain the matched 910. Comparing 1,060 with the seven guide times totaling 800 would manufacture a 260-second saving, about 24.5%, from different sets of tasks. Treating the blank as zero creates the same invalid comparison. Neither procedure is allowed, and no value should be imputed.

Keep P7 in **both** accuracy denominators: it contributes one correct selection for each format. Keep the guide assistance flag too. A correct first selection can coexist with later assistance; these fields measure different events. Excluding P7 from accuracy would throw away observed outcomes merely because the stopwatch measurement is missing. No causal explanation for the later assistance is recorded.

Consequently, P7 is neither faster, slower nor tied in this audit. Its time contribution is unknown, not zero. The seven-pair timing saving describes only the complete timings; it cannot establish the total saving over all eight pairs or justify assuming missing timing is unrelated to performance.

## What the results establish, and their limits

| Outcome | Supported description | What it does not establish |
| --- | --- | --- |
| Timing | Over seven complete pairs in this staffed exercise, recorded total time was 110 seconds, or about 12.1%, lower for the guide; five pairs were faster and two slower. | A 30% reduction, faster performance on every task, a causal effect separated from practice/coaching, the full eight-pair time result, or a population-wide speed guarantee. |
| First selection | Both formats had seven correct first selections out of eight, with different errors. | Improved guide accuracy, equivalent accuracy, absence of guide-specific problems, or a safety guarantee. |
| Assistance | Reference assistance occurred on P3/P6; guide assistance on P5/P7, two attempts per format. | That coaching had no effect, equal coaching duration/intensity, or successful unattended use. |
| Transfer | The exercise warrants examining the guide further under staff supervision. | Readiness for every shift, representative results for all volunteers/tasks, or independent replication. |

First-selection accuracy is protected from later coaching by its definition, but measured time may reflect help and its timing is not decomposed in these records. The flags cannot quantify or remove that influence. Matching and counterbalancing strengthen the local description without isolating all causes.

The small number of people, repeated tasks, staff presence, lost time and nonrandom sample limit certainty. No significance test, equivalence claim or population confidence interval should be based on pretending the eight pairs are eight independent people. Equal observed accuracy is not proof that the formats have the same underlying error rate. The audit reports descriptive arithmetic, not an estimate of guaranteed benefit.

## Reproduce the calculation locally

From the supplied task directory, `node tools/check-evidence.cjs` checks structure and reports P7's missing guide time. It does not validate the draft's benefit claims. The following separate PowerShell command uses only installed Node and built-in modules, joins by ID and recomputes the metrics. It prints results and checks the existing audit JSON; it writes no files and uses no network.

```powershell
@'
const fs = require('node:fs');
const assert = require('node:assert/strict');
function readCsv(file, header) {
  const lines = fs.readFileSync(file, 'utf8').trimEnd().split(/\r?\n/);
  assert.equal(lines.shift(), header.join(','));
  return lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, header.length);
    return Object.fromEntries(header.map((key, i) => [key, cells[i]]));
  });
}
const pairs = readCsv('evidence/pairs.csv',
  ['pair_id', 'volunteer_id', 'task', 'first_format']);
const fields = ['pair_id', 'seconds', 'correct', 'assisted'];
const reference = readCsv('evidence/reference.csv', fields);
const guide = readCsv('evidence/guide.csv', fields);
const ids = pairs.map(row => row.pair_id).sort();
assert.equal(new Set(ids).size, ids.length);
function keyed(rows) {
  const map = new Map(rows.map(row => [row.pair_id, row]));
  assert.equal(map.size, rows.length);
  assert.deepEqual([...map.keys()].sort(), ids);
  for (const row of rows) {
    assert.ok(['true', 'false'].includes(row.correct));
    assert.ok(['true', 'false'].includes(row.assisted));
    assert.ok(row.seconds === '' ||
      (Number.isFinite(Number(row.seconds)) && Number(row.seconds) > 0));
  }
  return map;
}
const r = keyed(reference), g = keyed(guide);
const m = {
  eligible_time_pairs: 0, reference_seconds: 0, guide_seconds: 0,
  time_saved_seconds: 0, faster_pairs: 0, slower_pairs: 0, tied_pairs: 0,
  accuracy_pairs: 0, reference_correct: 0, guide_correct: 0
};
const eligible = [], missing = [];
for (const pair of pairs) {
  const a = r.get(pair.pair_id), b = g.get(pair.pair_id);
  m.accuracy_pairs++;
  m.reference_correct += Number(a.correct === 'true');
  m.guide_correct += Number(b.correct === 'true');
  if (a.seconds === '' || b.seconds === '') {
    missing.push(pair.pair_id);
    continue;
  }
  eligible.push(pair.pair_id);
  const delta = Number(a.seconds) - Number(b.seconds);
  m.eligible_time_pairs++;
  m.reference_seconds += Number(a.seconds);
  m.guide_seconds += Number(b.seconds);
  m.time_saved_seconds += delta;
  m[delta > 0 ? 'faster_pairs' : delta < 0 ? 'slower_pairs' : 'tied_pairs']++;
}
assert.equal(m.reference_seconds - m.guide_seconds, m.time_saved_seconds);
assert.equal(m.faster_pairs + m.slower_pairs + m.tied_pairs, m.eligible_time_pairs);
assert.deepEqual(m, JSON.parse(fs.readFileSync('audit/metrics.json', 'utf8')));
console.log(JSON.stringify({
  eligible_time_ids: eligible, missing_time_ids: missing, metrics: m,
  percentage_saving: 100 * m.time_saved_seconds / m.reference_seconds
}, null, 2));
'@ | node
```

This small CSV reader is for the supplied, unquoted CSV layout. If future data contain quoted commas or multiline fields, use a suitable CSV reader rather than changing data to fit this example. The current timing percentage is a prose result; do not add it as an eleventh field in the protocol JSON.

## Practical next-check proposal: planning only

**Purpose:** determine whether the guide is accurate and usable on representative ordinary-work lookups with staff available, and whether any timing benefit persists when immediate repetition of the same lookup is reduced. Keep the current reference card as the default while planning and during any separately authorized, bounded check.

**Suggested capacity envelope, subject to approval:** two staffed sessions, up to eight volunteers with a mix of store familiarity, and four distinct lookups per person, two using each format. These are capacity limits for a local check, not a statistically powered sample-size calculation or eight guaranteed recruits. Choose tasks to cover common work and scrutinize the brake, chain and valve routes highlighted by P5, P7 and P8. The existing records do not identify a cause of difficulty on those routes.

1. **Write the new protocol first.** Name the owner, staff coverage, session cap, task list, guide versions, recording process, analysis rules and review point. Agree what would count as acceptable first-selection accuracy, assistance and usability, plus a useful timing benefit. Set numeric margins where a comparison is intended. This pack does not justify inventing those decision thresholds or promising an error-free result.
2. **Use fresh tasks with planned allocation.** Organize the four distinct lookups into two comparable task blocks per person, one task per format within each block. Balance format order and rotate which exact task uses which format across people; record the allocation before the attempts. Choose tasks using local knowledge of difficulty, without assuming they are equivalent merely because they share a category. Avoid giving the same person the same lookup in both formats. This reduces immediate same-task practice while leaving task differences to manage.
3. **Record the changed comparison honestly.** These proposed blocks are comparisons of different, intended-to-be-comparable tasks, not the original exercise's same-task pairs. Create a separate dataset and protocol version with participant, block, task, format, order and session IDs. Compare within participant/block only as predefined, inspect task allocation and keep participant totals visible. Do not merge these observations with P1-P8 or claim an exact replication. If comparable tasks cannot be defined, revise the design before starting rather than apply the old paired arithmetic to unrelated lookups.
4. **Define the observations.** Before sessions, agree a timer start and stop event, an independent way to check the correct bin, and consistent staff intervention rules. Record first bin before coaching, later assistance with its timing/reason, elapsed time, eventual completion and any confusing step or label. Preserve unsuccessful and assisted attempts. Verify capture at the session so missing timing can be identified immediately; retain the original entry and any documented correction rather than silently filling blanks.
5. **Keep support and pause rules explicit.** Staff should correct an incorrect selection before a part is used and record the original selection. A suspected misleading instruction, unresolved wrong-bin route or staff concern should pause that route for review; helping someone complete a task must not erase its error. Decide these rules and who applies them in advance. Continue using the reference card outside the approved check.
6. **Predefine reporting and review.** Report all observed first selections separately from complete timing comparisons, missingness reasons, assistance and task-specific problems. Display participant-level contributions as well as totals so repeated observations remain visible. Retain the principle that blank times are missing, and define any new timing endpoint or incomplete-attempt rule explicitly. Review errors and assistance before interpreting a favorable time total; do not remove difficult cases to improve the result.
7. **End at the agreed boundary.** Review the check against its agreed criteria and ordinary-work coverage before deciding to revise, gather additional evidence or consider broader use. A favorable small check can support a next decision, but does not by itself prove population-wide accuracy, safety or speed. If general guarantees are needed, the design and number of independent participants need further justification.

**Decisions to make before any launch:** approve or amend the proposed scope and task-allocation design; identify the responsible staff and session limits; agree accuracy, assistance, usability and timing criteria; define pause rules and the end-of-check review. Planning this proposal does not provide permission to recruit volunteers, schedule sessions or deploy the guide. No such action has been taken.

## Committee message to copy (not sent)

> We will keep the current reference card in place while planning a limited, staffed check of the reorganized guide. The audit does not support the draft claim that the guide is 30 percent faster and more accurate. Four volunteers completed eight task comparisons; seven had both recorded times. In those seven, total time fell from 910 to 800 seconds, a saving of 110 seconds or about 12.1%. The guide was faster in five comparisons and slower in two. First-selection accuracy was 7 out of 8 for both formats.
>
> These results suggest a possible local time benefit, but repeated tasks, practice, coaching, one missing time and the small number of volunteers leave ordinary-work performance uncertain. Equal observed accuracy does not establish equivalent accuracy or safety. We should agree the scope, staff support and success criteria for a limited next check before launching it; the current evidence does not justify standardizing the guide. No new check has started.

## Handoff verification notes

- Rechecked the protocol, raw records and capture notes against the earlier audit; the inclusion rules and ten metrics agree.
- Executed the reproduction command above against the local records and existing audit JSON. It passed and printed the seven eligible timing IDs, P7 as the missing-time ID and the expected arithmetic.
- Verified `handoff/original-summary.md` against `draft-summary.md` byte for byte. Both have SHA-256 `4A7277EBEE0F9597A1E066107380540C66590C6B81304218C91DC46CFD2135D4`.
- Verified that all twelve files present before this handoff, including the supplied sources and the two audit outputs, retained their SHA-256 hashes. Only the two requested handoff files were added. The audit's source inventory remains the historical record of that earlier audit.
- Work stayed in the supplied local directory using installed tools. No external service, volunteer contact, committee message, new study or rollout was initiated.
