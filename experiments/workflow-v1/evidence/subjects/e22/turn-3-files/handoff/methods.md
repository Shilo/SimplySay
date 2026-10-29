# Finding-parts study: methods and coordinator handoff

## Current decision and status

Keep the current reference card in place while planning a limited staffed check of the reorganized guide. The existing exercise shows a local aggregate time saving and equal observed first-selection accuracy. It does not establish that the guide should become standard on every shift. Planning below is a proposal: no volunteers have been contacted, no sessions have been scheduled or run, and no rollout has been started by this handoff.

The coordinator must settle the next check's scope, staffing, measurement definitions, acceptance criteria and stopping rules before it starts. Those choices were not specified by the original protocol and cannot be declared satisfied retrospectively.

## Source map and preservation

| Record | Role |
| --- | --- |
| [study/protocol.md](../study/protocol.md) | Controlling definitions, eligibility rules, arithmetic and audit JSON field names. |
| [evidence/pairs.csv](../evidence/pairs.csv) | Pair-to-volunteer and task mapping; which format was tried first. |
| [evidence/reference.csv](../evidence/reference.csv), [evidence/guide.csv](../evidence/guide.csv) | Elapsed seconds, observed first-selection correctness and later assistance, keyed by `pair_id`. |
| [evidence/capture-notes.md](../evidence/capture-notes.md) | Explains P7's lost guide time and the pre-coaching meaning of correctness. |
| [guides/reference-card.txt](../guides/reference-card.txt), [guides/reorganized-guide.txt](../guides/reorganized-guide.txt) | Format context, not extra outcome observations. |
| [audit/findings.md](../audit/findings.md), [audit/metrics.json](../audit/metrics.json) | Existing reconciled findings and ten-field numeric audit. |
| [original-summary.md](original-summary.md) | Full original unchecked draft, copied byte for byte from [draft-summary.md](../draft-summary.md). Historical record only; its claims are not validated by preserving it. |

Keep source records and the original draft unchanged. Record future corrections separately with their reason, source and date. Do not replace an observed first-selection error with an eventual corrected completion or fill a missing stopwatch value from memory, task order or another person's time.

## What was observed, and what counts as a unit

There are four distinct volunteers, V1-V4. Each performed two lookup tasks. For each task, the same person tried both the reference card and guide; those two format observations form one matched task pair. Thus there are eight task pairs and sixteen format observations, with fifteen recorded times and sixteen first-selection outcomes.

| Volunteer | Task pairs | Recorded order |
| --- | --- | --- |
| V1 | P1 patch; P2 pump | P1 reference first; P2 guide first |
| V2 | P3 cable; P4 tube | P3 reference first; P4 guide first |
| V3 | P5 brake; P6 lamp | P5 reference first; P6 guide first |
| V4 | P7 chain; P8 valve | P7 reference first; P8 guide first |

A task pair is the unit of the descriptive time comparison. A person is the participant unit. V1's two pairs share that person's experience, habits and reading speed; the same is true for each other volunteer. Within a pair, the second attempt can benefit from remembering the part or bin. All observations also come from one staffed exercise. Counting eight rows as eight independent people would invent participants and overstate how much separate evidence exists.

Pairing is useful because it compares the same person on the same lookup task, reducing some differences between people and tasks. Balancing first format within each volunteer spreads practice opportunities across formats. Neither step removes learning, assistance or the dependence of repeated observations. The complete timing subset also loses P7, leaving three reference-first and four guide-first pairs. The people were not randomly sampled from all store volunteers. These records support a description of this exercise; they do not establish independent replication or population precision.

## Reproduce the inclusion rules

1. Read the three CSVs and validate their headers, unique pair IDs, exact ID agreement and `true`/`false` outcome and assistance values. Join by `pair_id`; row position is not a key. Investigate duplicate, missing or invalid records before reporting results rather than silently discarding them.
2. Keep timing and accuracy as separate outcomes. A nonblank positive time is a measurement. A blank is missing, not zero, failure or an inferred duration.
3. Include a pair in the primary time comparison only when **both** format times are positive. Sum both formats over that identical set. Do not exclude a complete pair because a first choice was wrong or coaching occurred: the recorded protocol does not impose either exclusion.
4. For each eligible pair calculate `saved = reference_seconds - guide_seconds`. Positive means guide faster; negative means guide slower; zero means tied. Count those categories over eligible pairs only.
5. Calculate aggregate saved time as the matched reference total minus the matched guide total. Divide this difference by the matched reference total and multiply by 100 for percentage reduction in time. This is not the mean of pair percentages, the percentage with the guide total as denominator, or a guaranteed reduction for each task.
6. For accuracy, use all eight pairs with their observed first-selection outcomes, independently of stopwatch completeness. Count `correct == true` for each format. Later coaching cannot change that observed first choice. A correct first choice with later assistance is still not proof of fully independent completion.
7. Write the ten numeric fields specified by the protocol to the audit metrics object. Keep percentage rounding, secondary analyses and interpretation outside that object. Here the existing [audit/metrics.json](../audit/metrics.json) remains unchanged.

## Record-level arithmetic

Positive saved seconds favor the guide. The coaching column lists the format with later assistance, not a correction to first-selection accuracy.

| Pair | Reference seconds | Guide seconds | Saved seconds | Reference first correct | Guide first correct | Later coaching |
| --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | 120 | 90 | 30 | Yes | Yes | None |
| P2 | 100 | 95 | 5 | Yes | Yes | None |
| P3 | 160 | 100 | 60 | No | Yes | Reference |
| P4 | 80 | 75 | 5 | Yes | Yes | None |
| P5 | 140 | 150 | -10 | Yes | No | Guide |
| P6 | 200 | 160 | 40 | Yes | Yes | Reference |
| P7 | 150 | Missing | Not eligible | Yes | Yes | Guide |
| P8 | 110 | 130 | -20 | Yes | Yes | None |

Eligible time pairs: P1, P2, P3, P4, P5, P6 and P8.

```text
Matched reference = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910 s
Matched guide     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800 s
Saved             = 910 - 800 = 110 s
Time reduction    = (110 / 910) * 100 = 12.087912...%, or 12.1% rounded
Faster guide      = P1, P2, P3, P4, P6: 5 pairs
Slower guide      = P5, P8: 2 pairs
Tied              = 0 pairs
Reference correct = 7 / 8 = 87.5% (P3 was incorrect)
Guide correct     = 7 / 8 = 87.5% (P5 was incorrect)
Accuracy change   = 87.5% - 87.5% = 0 percentage points
```

The accuracy comparison has six pairs correct with both formats, one reference error with a correct guide choice (P3), and one guide error with a correct reference choice (P5). No pair had both first selections wrong. There is no net observed accuracy improvement, and eight outcomes per format are too little evidence to claim equivalence or guaranteed safety.

### P5: a measured slowdown and a first-selection error

P5 is V3's brake lookup, with the reference tried first. The reference record is `140,true,false`; the guide record is `150,false,true` for seconds, correctness and assistance. Both times are positive, so P5 contributes 140 seconds to the reference total, 150 to the guide total and -10 saved seconds: the guide was ten seconds slower on this pair.

For accuracy, P5 contributes one correct reference choice and one incorrect guide choice. The observer later coached the guide attempt. That does not turn its first selection into a correct one and does not make its measured time disappear. If P5 were recoded as correct after help, guide accuracy would incorrectly become 8/8; if it were dropped because it was assisted or incorrect, the timing comparison would no longer follow the protocol. This one pair warrants attention to brake categories, bin-code interpretation and physical labels in a next check, but the records do not identify the cause of the error.

### P7: missing time, retained accuracy and assistance

P7 is V4's chain lookup, with the reference tried first. The reference record is `150,true,false`; the guide record is `,true,true`. The blank guide seconds are a stopwatch entry lost during export, with no replacement timing in the supplied records. This is a missing measurement, not a zero-second lookup or evidence that the task failed.

P7 contributes **neither** its 150 reference seconds nor a guide time to the matched timing totals. It is not classified as faster, slower or tied. Its two correct first-selection cards remain in the accuracy comparison, and its guide assistance flag remains in the record. Correct first selection and later assistance can coexist: they describe different stages of the task.

This missing value matters to the scope of the conclusion. Across all eight pairs the known reference total is 1,060 seconds. If the unknown guide time is called `x`, the all-eight guide total would be `800 + x` and the saving would be `260 - x`. The records do not supply `x`, so neither the all-eight percentage saving nor even its direction is established. This algebra is an explanation of what is unknown, not an imputation. The report's 12.1% is explicitly for seven complete pairs.

## Reproduction command

Run the following in PowerShell from the pack's root directory, where `evidence/` and `audit/` are located. It uses installed Node.js and built-in modules only. It reads sources, computes the protocol metrics, checks them against the existing JSON and prints them without writing files. The simple comma split is sufficient for these supplied CSVs, whose cells have no quoted commas; use a proper CSV parser if a future export permits quoted fields.

```powershell
@'
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');

function read(file, expectedHeader) {
  const [header, ...lines] = fs.readFileSync(file, 'utf8').trim().split(/\r?\n/);
  assert.equal(header, expectedHeader.join(','));
  const rows = lines.map(line => {
    const cells = line.split(',');
    assert.equal(cells.length, expectedHeader.length);
    return Object.fromEntries(expectedHeader.map((key, i) => [key, cells[i]]));
  });
  const keyed = new Map(rows.map(row => [row.pair_id, row]));
  assert.equal(keyed.size, rows.length, 'Duplicate pair ID');
  return keyed;
}
const pairs = read('evidence/pairs.csv', ['pair_id', 'volunteer_id', 'task', 'first_format']);
const columns = ['pair_id', 'seconds', 'correct', 'assisted'];
const reference = read('evidence/reference.csv', columns);
const guide = read('evidence/guide.csv', columns);
assert.equal(pairs.size, 8);
assert.equal(new Set([...pairs.values()].map(p => p.volunteer_id)).size, 4);
for (const records of [reference, guide]) {
  assert.deepEqual([...records.keys()].sort(), [...pairs.keys()].sort());
  for (const row of records.values()) {
    assert(['true', 'false'].includes(row.correct));
    assert(['true', 'false'].includes(row.assisted));
    assert(row.seconds === '' ||
      (Number.isFinite(Number(row.seconds)) && Number(row.seconds) > 0));
  }
}
const rows = [...pairs.keys()].map(pair_id => {
  const r = reference.get(pair_id), g = guide.get(pair_id);
  const rt = r.seconds === '' ? null : Number(r.seconds);
  const gt = g.seconds === '' ? null : Number(g.seconds);
  const eligible = rt !== null && gt !== null && rt > 0 && gt > 0;
  return { pair_id, rt, gt, eligible, saved: eligible ? rt - gt : null,
    rc: Number(r.correct === 'true'), gc: Number(g.correct === 'true') };
});
const timed = rows.filter(row => row.eligible);
const sum = (records, key) => records.reduce((total, row) => total + row[key], 0);
const metrics = {
  eligible_time_pairs: timed.length,
  reference_seconds: sum(timed, 'rt'),
  guide_seconds: sum(timed, 'gt'),
  time_saved_seconds: sum(timed, 'saved'),
  faster_pairs: timed.filter(row => row.saved > 0).length,
  slower_pairs: timed.filter(row => row.saved < 0).length,
  tied_pairs: timed.filter(row => row.saved === 0).length,
  accuracy_pairs: rows.length,
  reference_correct: sum(rows, 'rc'),
  guide_correct: sum(rows, 'gc')
};
assert.deepEqual(metrics, JSON.parse(fs.readFileSync('audit/metrics.json', 'utf8')));
assert.equal(metrics.time_saved_seconds, metrics.reference_seconds - metrics.guide_seconds);
assert.equal(metrics.faster_pairs + metrics.slower_pairs + metrics.tied_pairs, timed.length);
console.log(JSON.stringify(metrics, null, 2));
console.log('Time reduction (%):', 100 * metrics.time_saved_seconds / metrics.reference_seconds);
'@ | node -
```

Expected metrics, in protocol field order: `7, 910, 800, 110, 5, 2, 0, 8, 7, 7`. The percentage output is approximately `12.087912087912088`. The supplied `node tools/check-evidence.cjs` is a useful separate structural check, but it does not establish the draft's benefit claims.

## What these results do and do not establish

The records establish that the guide used 110 fewer total seconds across these seven matched measured pairs, with five faster and two slower results, while both formats had seven correct first selections out of eight. These are descriptive observations from this exercise. Say "12.1% less total lookup time across seven usable pairs" rather than making an unqualified claim about every volunteer's speed. The records support neither a 30% time reduction nor improved overall first-selection accuracy.

The totals do not isolate a causal guide effect. Reference assistance was recorded on P3 and P6; guide assistance on P5 and P7. The elapsed-time endpoint and exact coaching timing are not specified sufficiently to separate unaided lookup speed from recovery or help. As a descriptive sensitivity check only, complete pairs with neither format assisted (P1, P2, P4, P8) total 410 reference seconds and 390 guide seconds: 20 seconds saved, or 4.9%. The other three timed pairs contribute 90 of the primary 110 saved seconds. This does not prove that coaching caused the difference; those tasks and people also differ. Assisted pairs stay in the primary protocol result.

Balanced order cannot erase memory of the same bin, and there is no later unattended-shift or expanded-study evidence here. Missing P7 time limits the observed timing subset; equal observed accuracy does not prove equivalent accuracy, acceptable error rates, safe use or usability without help. An analysis that treats eight pairs as independent people would overstate certainty. No population confidence interval, significance claim or adoption guarantee is warranted from the calculations in this handoff.

## Proposed limited staffed next check

### Decisions to record before starting

Keep the reference card as the routine guide during planning. Write a separate next-check protocol and settle the following with the person responsible for the store's work. Do not invent thresholds after seeing the outcomes.

| Decision | What to specify |
| --- | --- |
| Scope and limit | Which staffed shifts and ordinary lookup tasks are in scope; a fixed cap on sessions and distinct volunteers; a review date. Cover the brake and valve issues as well as typical lookups. Choose a feasible number to assess usability; do not describe an arbitrary small number as proof of equivalence. |
| Roles | A coordinator to maintain records and review results; a trained observer/helper available at every session. Decide whether observation and coaching need separate people so recording is practical. |
| Acceptance | A first-selection accuracy requirement, the largest acceptable loss versus reference, acceptable assistance/confusion, and the size and consistency of time benefit worth pursuing. Define how uncertainty and participant coverage affect the decision. No values were supplied for these requirements. |
| Stop and review | What wrong selections, repeated confusion or reliance on help require pausing that attempt or the check, and who reviews the issue before any restart. |
| Measurement | Exact start/stop events, treatment of coaching time, first-selection capture, missing measurements and interruptions. Preserve the separation of time, first-choice accuracy and eventual completion. |

### Session workflow

1. **Prepare a bounded comparison.** After the coordinator authorizes the separate check, select ordinary tasks spanning relevant categories and experience levels. Include brake and valve lookups to investigate P5 and P8 without assuming their causes. Record actual distinct people and tasks, not just a target count. Keep the new guide's version and any edits fixed and recorded for each comparison.
2. **Preserve pairing and document learning.** To retain the original same-task pair definition, give each volunteer tasks they have not already practised in the check, then have them try both formats for each task. Plan and balance first format within volunteers, using a recorded randomized or alternating schedule. Record which attempt is second. Repetition still allows learning; report it as a limitation. If using different but comparable tasks to reduce repetition instead, specify that changed design and how task difficulty is matched before collecting data; do not silently call them the original same-task pairs.
3. **Set explicit endpoints.** A practical proposal is to start when the task and assigned format are available, stop primary lookup timing at the first physical bin selection, and record time to confirmed completion/recovery separately. Record first-selection correctness before coaching. The coordinator must accept or revise this definition in advance; the original pack does not establish this endpoint, so new timing results must not be pooled with the old stopwatch totals as though definitions were identical.
4. **Keep help available and record its use.** Retain physical-label checking and the shift helper. Note whether help occurs before or after the first choice and what prompted it. If an observer must intervene before an independently observed first choice, flag the deviation and follow the new protocol's prewritten handling; do not invent a correct independent selection. Record the observed choice, later correction and eventual completion separately.
5. **Capture and verify records immediately.** Use fields such as `session_id`, `pair_id`, `volunteer_id`, `task`, `guide_version`, `format`, `first_format`, `exposure_number`, `seconds_to_first_selection`, `first_selection_correct`, `assisted`, `assistance_stage`, `completion_seconds`, `interruption`, and `missing_reason`. Check both format rows, units and timestamps before closing the session. Leave missing values explicit, preserve original sheets and log corrections without overwriting originals.
6. **Review at the planned limit.** Report distinct people, task coverage, complete/missing timing pairs, first-selection outcomes, assistance, recovery and order. Apply the prespecified missing-data and eligibility rules; use matched denominators, and label any subset analyses. Show participant-level patterns so repeated tasks do not masquerade as additional people. Compare the results with the recorded accuracy/usability requirements before considering speed. If results remain mixed or uncertain, retain the current guide and identify the specific unresolved issue rather than claiming standardization is established.

This plan supports a practical usability and accuracy check. If a later committee decision requires a population-wide or accuracy-equivalence claim, it will need a design and number of distinct participants appropriate to that question, with analysis that accounts for repeated observations. A successful small staffed check alone cannot establish a guarantee for unattended work.

## Handoff verification

- Re-read the protocol, observation notes, pair mapping, outcome CSVs and original draft; reconciled them with the existing audit.
- Executed the reproduction command above successfully and checked all ten results against the existing metrics JSON. Verified the worked timing rows and P5/P7 examples against the CSVs.
- Confirmed that `original-summary.md` is byte-identical to the complete source draft, including its original formatting and unchecked claims.
- Checked local document links and compared SHA-256 hashes of all twelve pre-existing files after creating this handoff; none changed. No external services, volunteer contact or new data collection were used.
