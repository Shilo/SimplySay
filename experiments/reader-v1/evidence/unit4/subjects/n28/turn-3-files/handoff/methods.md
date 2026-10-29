# Methods handoff: finding-parts guide records

## Current decision and purpose

The record maintainer has decided to keep the current reference card in place while planning a limited, staffed check of the reorganized guide. The audited exercise supports planning that check. It does not justify standardizing the reorganized guide or telling the committee that it is 30 percent faster and more accurate.

This handoff explains how to reproduce the existing audit, why its units matter, and how to plan the next check. It records no new observations. The next-check details below are proposals, not additions to the original protocol, recruitment, scheduling, or a launched study.

## Record provenance and preservation

Read [the recorded protocol](../study/protocol.md) before calculating. It determines inclusion and the required machine-readable fields. The three CSVs are the outcome records; [capture notes](../evidence/capture-notes.md) explain their collection and known limitations.

| Record | Use |
| --- | --- |
| [pairs.csv](../evidence/pairs.csv) | Links each pair ID to a volunteer, lookup task and the format tried first. |
| [reference.csv](../evidence/reference.csv) | Reference-card elapsed time, observed first-selection correctness, and later assistance. |
| [guide.csv](../evidence/guide.csv) | The same fields for the reorganized guide. |
| [capture-notes.md](../evidence/capture-notes.md) | Confirms P7's unrecoverable guide time, P3's reference error, P5's guide error, and the staffed, repeated-task setting. |
| [audit/findings.md](../audit/findings.md) | Reconciled records, interpretation, draft corrections and the original audit's verification notes. |
| [audit/metrics.json](../audit/metrics.json) | The ten protocol metrics against which a recomputation can be checked. |
| [original-summary.md](original-summary.md) | The full original unchecked draft, copied byte for byte from [draft-summary.md](../draft-summary.md). It is historical evidence of what needed correcting, not an endorsed conclusion. |
| [committee-message.md](committee-message.md) | A corrected message for the coordinator to copy; it has not been sent. |

The two guide texts describe lookup steps, including checking labels and asking a helper when unclear. They contain no additional study outcomes. Preserve supplied source files and the existing audit. Keep any future guide revision, protocol and dataset separately versioned so later results cannot silently change this exercise's meaning.

## Units: people, task pairs and attempts

There are four people, V1 through V4. Each person performed two lookup tasks. For each task, that same person tried the reference-card format and the guide format. Consequently the pack has four people, eight task pairs and sixteen format attempts. A pair is the unit of the matched comparison: compare the two formats for that person and that task.

| Person | Task pairs | Reference-first pair | Guide-first pair |
| --- | --- | --- | --- |
| V1 | P1, P2 | P1 | P2 |
| V2 | P3, P4 | P3 | P4 |
| V3 | P5, P6 | P5 | P6 |
| V4 | P7, P8 | P7 | P8 |

Pairing helps because the two times within a pair come from the same person and lookup task. It reduces differences caused by comparing different people or unrelated tasks. It does not make the two task pairs contributed by one person independent. For example, V3 brings the same experience and habits to P5 and P6; what V3 learns during the exercise can affect later attempts. Counting V3 twice does not recruit a second person or provide a second independent confirmation.

The same lookup is also repeated within each pair. A volunteer may remember a part location or learn from coaching before trying the second format. The recorded order is counterbalanced: each person has one reference-first pair and one guide-first pair. This spreads which format goes second, but it cannot erase familiarity, equalize all tasks, or isolate the guide's causal effect. The record establishes balanced order, not random participant sampling or a documented randomized assignment procedure.

Do not calculate uncertainty as if eight pairs were eight independent people. That assumption can make the result appear more precise than the four-person exercise warrants. If a later analysis estimates uncertainty, it must account for observations grouped within people and for its task design. With only four people here, this handoff reports descriptive arithmetic rather than a population confidence interval or significance claim. The additional rows do provide information about these tasks; they do not establish broad coverage of volunteers or independent replication.

## Inclusion rules, in reproducible order

1. Read the three CSVs. Check headers, unique `pair_id` values, and agreement of the ID sets. The existing pack has exactly one row for each of P1 through P8 in each CSV. Validate `correct` and `assisted` as the literal booleans `true` or `false`; a nonblank time must be finite and positive. Investigate malformed records rather than silently dropping them.
2. Join reference and guide observations to `pairs.csv` by `pair_id`. Never assume row position identifies a pair. The join must survive independent reordering of either outcome CSV.
3. Create a timing inclusion flag for each pair: both format times must be present and positive. Blank means missing measurement, not zero, failure, or evidence of either format being faster. Do not impute a value from another task, person, order or outcome.
4. Sum both formats over exactly that same timing subset. Exclude an incomplete pair's measured side as well as its missing side. For each eligible pair calculate `reference seconds - guide seconds`: positive means faster with the guide, negative means slower, zero means tied.
5. Calculate total seconds saved as the matched reference total minus the matched guide total. Divide that difference by the matched reference total and multiply by 100 for percentage time saved. This is the protocol's reduction in total time, not an average of individual percentage changes and not a guarantee of faster performance for a person or shift.
6. Evaluate accuracy separately from timing. In this pack all eight pairs have both observed first selections, so the accuracy denominator is eight for each format. Count `correct=true`, including P7 even though its guide time is missing. Do not equate a missing time with an incorrect selection or discard a known accuracy outcome because of it.
7. Preserve assistance as a separate observation. `correct` describes the first bin selected before help; `assisted` describes coaching later. Coaching can occur after either a correct or an incorrect first selection. Do not recode an error as correct after help, and do not exclude assisted pairs from the protocol's primary totals.
8. Produce the ten numeric protocol metrics. Keep percentages, denominators, interpretation and uncertainty in prose. If future records are missing accuracy outcomes as well as times, document that explicitly under a versioned protocol rather than reusing an eight-pair denominator or coding missingness as failure.

## Reproduce the current arithmetic

All times below are seconds. "Missing" is explanatory text, not a replacement value in the source CSV.

| Pair | Person | Reference | Guide | Difference | Timing | Reference first correct | Guide first correct |
| --- | --- | ---: | ---: | ---: | --- | --- | --- |
| P1 | V1 | 120 | 90 | +30 | Include | Yes | Yes |
| P2 | V1 | 100 | 95 | +5 | Include | Yes | Yes |
| P3 | V2 | 160 | 100 | +60 | Include | No | Yes |
| P4 | V2 | 80 | 75 | +5 | Include | Yes | Yes |
| P5 | V3 | 140 | 150 | -10 | Include | Yes | No |
| P6 | V3 | 200 | 160 | +40 | Include | Yes | Yes |
| P7 | V4 | 150 | Missing | Unknown | Exclude | Yes | Yes |
| P8 | V4 | 110 | 130 | -20 | Include | Yes | Yes |

```text
Timing IDs: P1, P2, P3, P4, P5, P6, P8 (7 pairs)
Reference total = 120 + 100 + 160 + 80 + 140 + 200 + 110 = 910
Guide total     =  90 +  95 + 100 + 75 + 150 + 160 + 130 = 800
Seconds saved   = 910 - 800 = 110
Pairwise check  = 30 + 5 + 60 + 5 - 10 + 40 - 20 = 110
Time saving     = (110 / 910) * 100 = 12.087912...% (12.09% rounded)
Faster IDs      = P1, P2, P3, P4, P6 (5)
Slower IDs      = P5, P8 (2)
Tied IDs        = none (0)
Direction check = 5 + 2 + 0 = 7

Accuracy IDs: P1 through P8 (8 pairs)
Reference correct = 7/8 = 87.5%; only P3 is incorrect
Guide correct     = 7/8 = 87.5%; only P5 is incorrect
Guide minus reference accuracy = 0 percentage points
```

P3 changes from incorrect with the reference to correct with the guide, while P5 changes in the opposite direction. Six pairs are correct with both formats. That cancellation explains equal totals; it does not establish that the formats behave identically for each task.

Assistance is flagged for reference P3 and P6, and guide P5 and P7: two assisted attempts per format. P3, P5 and P6 have complete timing and remain in the totals. There is no separate duration for coaching and no comparison that isolates its effects, so the records cannot quantify whether or how much help changed measured time or later attempts.

### P5: a measured guide error that later coaching cannot remove

P5 is V3's brake lookup, with the reference tried first. Reference fields are `140,true,false`; guide fields are `150,false,true`. Both times are positive, so P5 belongs in timing even though the guide's first selection was wrong and coaching followed.

Its difference is `140 - 150 = -10`: the guide took ten seconds longer. For accuracy it contributes one correct reference selection and one incorrect guide selection. The later assistance flag records help, not a corrected first selection. Counting P5 as guide-correct would create the draft's erroneous 8/8 guide result; dropping it because it was assisted or wrong would remove an unfavorable observed outcome against the protocol.

This single record also cannot prove that the guide caused the error or that its category structure is defective. The records do not identify the wrong bin, the reason for confusion or the time attributable to coaching. A future review should inspect the brake lookup path and physical labels before proposing a fix. Do not rewrite P5 after that review: preserve the original observation and record any diagnosis or revision separately.

### P7: missing time with retained accuracy and assistance

P7 is V4's chain lookup, with the reference tried first. Reference fields are `150,true,false`; guide fields are a blank time, `true`, and `true`. The capture notes say the guide stopwatch entry was lost during export and no alternative measurement exists in this pack.

Exclude P7 from both timing sums and the faster/slower/tied counts. Including its 150 reference seconds while adding no guide time would compare different task sets: 1,060 reference seconds against 800 guide seconds. Treating the blank as zero would falsely award P7 a 150-second saving. Neither calculation follows the protocol. Its actual timing difference remains unknown.

Retain P7 in accuracy because both first selections were observed as correct. It contributes one correct outcome to each format's eight-pair denominator, and its later guide assistance remains recorded. Assistance after a correct first selection is permitted by the field definitions; a missing stopwatch entry does not erase either observation.

P7's exclusion also affects interpretation of order. The full exercise has four pairs of each first format, but complete timing has only three reference-first and four guide-first pairs. Those groups save 80 seconds (420 reference versus 340 guide) and 30 seconds (490 versus 460), respectively. These small, differently composed groups cannot estimate a practice effect. V4's only timed comparison is P8, where the guide is slower; P7 cannot establish V4's overall time benefit.

## Executable reproduction using installed Node.js

From the pack root, run the following in PowerShell. It uses only Node.js built-in modules, reads the original CSVs, prints the ten metrics, and checks them against the existing audit. It writes no files. The small CSV reader is specific to this pack's simple, unquoted cells; use a suitable parser if a future format introduces quoted commas or multiline fields.

```powershell
@'
'use strict';
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
const reference = readCsv('evidence/reference.csv',
  ['pair_id', 'seconds', 'correct', 'assisted']);
const guide = readCsv('evidence/guide.csv',
  ['pair_id', 'seconds', 'correct', 'assisted']);
const ids = pairs.map(row => row.pair_id).sort();
assert.equal(new Set(ids).size, ids.length);
for (const rows of [reference, guide]) {
  assert.deepEqual(rows.map(row => row.pair_id).sort(), ids);
  for (const row of rows) {
    assert(['true', 'false'].includes(row.correct));
    assert(['true', 'false'].includes(row.assisted));
    assert(row.seconds === '' ||
      (Number.isFinite(Number(row.seconds)) && Number(row.seconds) > 0));
  }
}
const referenceById = new Map(reference.map(row => [row.pair_id, row]));
const guideById = new Map(guide.map(row => [row.pair_id, row]));
const joined = pairs.map(pair => ({
  pair,
  reference: referenceById.get(pair.pair_id),
  guide: guideById.get(pair.pair_id)
}));
const eligible = joined.filter(row =>
  row.reference.seconds !== '' && row.guide.seconds !== '' &&
  Number(row.reference.seconds) > 0 && Number(row.guide.seconds) > 0);
const referenceSeconds = eligible.reduce(
  (sum, row) => sum + Number(row.reference.seconds), 0);
const guideSeconds = eligible.reduce(
  (sum, row) => sum + Number(row.guide.seconds), 0);
const differences = eligible.map(row =>
  Number(row.reference.seconds) - Number(row.guide.seconds));
const metrics = {
  eligible_time_pairs: eligible.length,
  reference_seconds: referenceSeconds,
  guide_seconds: guideSeconds,
  time_saved_seconds: referenceSeconds - guideSeconds,
  faster_pairs: differences.filter(value => value > 0).length,
  slower_pairs: differences.filter(value => value < 0).length,
  tied_pairs: differences.filter(value => value === 0).length,
  accuracy_pairs: joined.length,
  reference_correct: joined.filter(row => row.reference.correct === 'true').length,
  guide_correct: joined.filter(row => row.guide.correct === 'true').length
};
assert.equal(differences.reduce((sum, value) => sum + value, 0),
  metrics.time_saved_seconds);
assert.deepEqual(metrics,
  JSON.parse(fs.readFileSync('audit/metrics.json', 'utf8')));
process.stdout.write(JSON.stringify(metrics, null, 2) + '\n');
'@ | node
```

Expected output:

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

For the structural check alone, run `node tools/check-evidence.cjs`. It reports eight pairs, four volunteers and missing guide time P7. That check does not calculate a treatment benefit or verify the draft's assertions.

## What the observations establish and leave unresolved

| Question | Supported description of this exercise | Limit on the conclusion |
| --- | --- | --- |
| Was recorded total time lower with the guide? | Yes, by 110 seconds, or 12.09%, across the seven complete matched pairs. | This is a reduction in recorded total time for this subset. It does not show a 30% reduction, a constant benefit for every person, or what the missing eighth comparison would do to the total. |
| Was it faster on every task? | No: five eligible pairs are faster and two slower; P7 is unknown. | The total can fall while some tasks take longer. Task, volunteer and order breakdowns are descriptive and small. |
| Did first-selection accuracy improve? | No observed aggregate improvement: both formats are 7/8. | Equal observed accuracy is not proof of equivalent accuracy, noninferiority, or absence of harmful errors in wider use. P3 and P5 have opposite changes. |
| Was help unnecessary? | No: two attempts per format have assistance flags. | The records cannot isolate coaching time or its learning effects. A correct first selection does not prove the remainder of the task was unassisted. |
| Does the guide itself cause the time reduction? | The matched comparison is consistent with a local benefit. | Repeated tasks, practice, coaching and order are alternative contributors that this exercise cannot separate. |
| Is standardization justified? | The findings justify a limited staffed next check while retaining the reference card. | Four observed volunteers in one staffed exercise do not establish ordinary-work accuracy and usability, a population-wide speed guarantee, a safety guarantee, or independent replication. |

The protocol provides no adoption threshold and no measured criterion for the consequences of a wrong-bin selection. Do not add one retrospectively and declare the guide approved. The next check should specify what accuracy, help and usability evidence is needed before its outcomes are known.

## Practical next-check plan: draft for the coordinator

### Purpose, boundary and responsibilities

Ask whether the candidate guide can support accurate, usable lookups under ordinary staffed conditions, and whether a time benefit persists when errors, help and missing measurements are visible. Keep the current reference card as the standard during planning and the bounded check. Treat broader adoption as a later decision.

A concrete planning starting point is **two short staffed sessions across two typical shifts, up to six volunteers, with two paired tasks per volunteer**. This cap would produce at most twelve task pairs from at most six people. It is a proposed operational limit, not a calculation of the sample needed to establish accuracy or justify adoption. The coordinator must confirm the cap, the task coverage and who can staff it before scheduling; this handoff has not assigned people, contacted volunteers or reserved sessions.

Proposed roles are a coordinator who freezes the plan and reviews results, an observer who records first selection and timing, and an available shift helper who can assist after first selection. Confirm coverage for observation and help; if one person fills both roles, specify how they will preserve the before-help record and uninterrupted timing.

### Preparation before any session

1. Freeze a separately identified version of each guide and record the version on every attempt. Review the P5 brake lookup route, category wording and physical labels. Record any explanation or candidate revision separately; this pack does not establish the cause of the error. Verify task-bin answers before observing people.
2. Choose a bounded set of relevant ordinary lookup tasks and volunteer familiarity levels. Include a brake lookup or comparable confusing path, an opportunity for label uncertainty, and more routine tasks. Describe what shifts, task categories and experience levels the check does not cover. No volunteers are recruited by writing this plan.
3. Preserve the original pairing definition for the proposed check: the same person looks up the same part with each format. Use tasks that have not just been rehearsed where feasible. For each person, use one reference-first and one guide-first pair; set and record order before attempts. Repeating the same task still permits learning. If the coordinator instead chooses comparable but different tasks to reduce memory, document that as a new design with its own matching and task-assignment rules; do not pool it into the old same-task result.
4. Define timing precisely before observing: for example, start when the task and assigned format are available and stop at the first bin selection, before coaching. Record later help and eventual completion separately. The old pack does not specify enough timing detail to assume this new endpoint matches its stopwatch values; analyze the new check separately and document the endpoint rather than merging seconds across studies.
5. Set review criteria in advance: necessary task and volunteer coverage; an acceptable first-selection error standard; what types or amounts of help and confusion are acceptable in ordinary staffed use; and how complete timing must be for a useful time comparison. The coordinator needs to choose these operational criteria. A small check with no recorded errors would still not prove population-wide accuracy.

### Capture and conduct after the plan is agreed

Use new pair IDs in a separate dataset. Retain participant IDs across each person's tasks so repeated observations remain identifiable. A proposed record for each attempt is:

| Field | Purpose |
| --- | --- |
| Session/shift, pair ID, participant ID and familiarity | Preserve context and identify repeated observations from a person. |
| Task/part, expected bin and guide version | Preserve task difficulty, the answer checked in preparation, and the material used. |
| Format, first format and actual attempt order | Expose order deviations and practice opportunities. |
| Positive elapsed time, endpoint and missing-time reason | Support a defined time comparison without filling gaps. |
| First selected bin and correctness before help | Preserve the actual first response, including errors. |
| Later assistance, reason for help and any later completion record | Distinguish help and eventual completion from initial correctness. |
| Observed confusion or brief usability comment | Explain practical obstacles without treating a comment as a timed result. |

Have the observer capture the first selection before offering correction, then make help available. Keep an independent backup timing note or a second manual capture when staffing permits, and reconcile paper and exported records at the end of each session. Preserve the raw record and document any correction and its basis. If no timing survives, mark it missing; do not reconstruct seconds from order or from another volunteer.

Proposed pause rule: if a wrong-bin selection occurs, stop that task, preserve the first-selection result, and have the helper resolve it before the part is used. If the guide or label remains ambiguous, suspend affected tasks until reviewed. Log the interruption; do not delete the error or silently restart it as a clean success. This rule is a recommendation for the new check, not a finding about what happened in the old exercise.

### Review before expanding use

Stop at the agreed session/task cap and review all records, including errors, help, interruptions and missing measurements. Reuse the explicit timing eligibility and separate accuracy logic where applicable under the new protocol. Report counts of people and pairs, matched time totals and directions, first-selection accuracy, assistance, order and task coverage. Keep participant and order breakdowns visible, and analyze the new check separately from P1 through P8.

Compare the observations with the agreed criteria for accuracy and usability before interpreting speed. Persistent wrong-bin selections or confusing instructions call for diagnosis and another bounded revision check. If the guide appears useful but coverage or outcomes remain uncertain, keep the reference card in place and specify the remaining question. Consider standardization only in a later review with evidence that the guide remains accurate and usable in ordinary work; completing the proposed small check does not automatically supply that evidence.

## Committee wording

Use [the copy-ready committee message](committee-message.md). It states the current decision, the corrected numerical result and the limits. The archived original summary remains intact so another maintainer can see both the historical claim and its correction. No message has been sent.

## Handoff verification

All checks below passed. Verification used installed local tools and no new observations.

| Check | Actual result |
| --- | --- |
| Saved reproduction command | Extracted and executed the PowerShell code block directly from this saved document. It completed successfully and printed the ten metrics shown above; its assertion against `audit/metrics.json` passed. |
| Documented records | Independently checked all eight timing/accuracy table rows against the three source CSVs, including P5's incorrect guide first selection and P7's timing-only exclusion. Parsed the expected-output JSON and confirmed exact agreement with the existing audit metrics. |
| Original draft archive | Compared the original draft and archived copy as byte buffers and by SHA-256: both are 632 bytes and match exactly, including the original heading and draft status. Their SHA-256 is `4a7277ebee0f9597a1e066107380540c66590c6b81304218c91dc46cfd2135d4`. No warning or editorial text was added to the archive. |
| Existing-file preservation | Fingerprinted all twelve pre-existing files before the handoff work and compared them afterward. All ten supplied sources and both audit files retained their SHA-256 fingerprints. |
| Links and output inventory | All twelve document links resolved within this local pack. The only added files were `handoff/methods.md`, `handoff/original-summary.md` and `handoff/committee-message.md`. |
| Committee wording and planning status | Reviewed the corrected conclusion and uncertainty against the records. The message reports four volunteers, seven complete timing pairs, 910 versus 800 seconds, 110 seconds saved, 12.09% lower matched time and accuracy of 7/8 for each format. The proposed check remains a plan; the message was not sent. |
