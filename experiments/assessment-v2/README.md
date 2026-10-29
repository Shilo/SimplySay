# Development-only automated assessment

This retrospective amendment keeps original pilot criteria, evidence and results unchanged. Nothing here belongs in the installed plugin. Read `docs/automated-evaluation.md` and `calibration-spec.json` before changing the development protocol. Findings are automated assessments, not measured human-comprehension improvements.

Run from the repository root with installed Node.js; built-in modules only:

```text
node experiments/assessment-v2/assess.cjs self-test
node experiments/assessment-v2/assess.cjs prepare --out ABSOLUTE_NEUTRAL_TEMP_DIRECTORY
node experiments/assessment-v2/assess.cjs ingest ABSOLUTE_NEUTRAL_TEMP_DIRECTORY REVIEW_JSON
node experiments/assessment-v2/assess.cjs report ABSOLUTE_NEUTRAL_TEMP_DIRECTORY
node experiments/assessment-v2/assess.cjs export ABSOLUTE_NEUTRAL_TEMP_DIRECTORY experiments/assessment-v2/results
```

`prepare` verifies frozen originals and the existing exported evidence registry, rebinds historical executed checks to actual files, tests task-specific deterministic detectors against originals/mutants, and prepares four neutral packets. Existing code is inspected through its actual saved contents and executed evidence; the harness does not run generated code again. Text probes are explicitly limited lexical evidence, with independent semantic assessments kept separate.

The controller reads `jobs.json`, reconciles each launch against `allocation.json`, and dispatches four **fresh-context built-in agents**. Give each only its own absolute `packet.json` and `response-template.json`, a designated response output path, and instructions to read those files only. Do not pass project history, treatment labels, other packets, reveal map, calibration expectations or prior reviews. Reviewers may use the installed file reader to read their assigned files; do not launch another Codex/Claude subject or external judging API. The development harness itself has no model/network/credential/host launcher. Manual owner grading is optional, not a prerequisite for this controller workflow.

Each reviewer returns the full strict JSON template with exact pair coverage, literal nonempty quotes, separate per-side information status and communication preference/dimensions, honest confidence and missing evidence. An omission is described in `issues`; anchor its absence with surrounding literal text, and quote the matching essential from the other side. Tie rationales should state substantive equality. Useful explanation is judged against the requested depth. Quotes must refer to displayed sample content, not invented reconstruction. Actual incoming delegation instructions remain `unknown` regardless of report quality.

`ingest` rejects missing pairs, bad enums, ungrounded/empty quotes and spurious fields. `report` rechecks protocol/code/packet/evidence hashes, retains raw judgments, all-reviewer and calibrated-only views, ties/disagreements, orientation-specific choices and missing evidence. All four frozen controls must pass with medium/high confidence and intended-defect/equality evidence for a reviewer to establish a primary preference claim. Failure does not trigger a favorable rerun. An empty calibrated set yields no calibrated verdict. Reviewer variation is confounded with orientation in this small design; this is a sensitivity check, not proof of no order bias.

`export` writes the neutral packets, templates, raw structured reviews, reveal map and full aggregates with an archive hash index. Local dispatch paths and session ledgers stay outside the archive. Frozen input directories cannot be overwritten by `prepare`; choose a new directory for an amended development protocol. All commands are offline. No subject trial, auth-cache copy, Claude execution or paid service is required.

## Structured-format compatibility

The frozen schema requires string arrays for `issues` and `evidence`. Two reviewers initially supplied richer objects despite retaining the prescribed fields. Strict ingestion rejected them. The separate offline `normalize-review-format.cjs INPUT.json OUTPUT.json` adapter extracts literal `quote` strings and serializes complete issue objects; it asserts that every other field remains identical. It neither generates judgments nor repairs quotes that fail validation. Preserve the original bytes and emitted conversion audit, then pass the converted record through the unchanged strict ingester. This is a format-only correction after packet freeze; calibration criteria, packets and frozen scoring code remain unchanged. Raw originals and audits accompany the final archive. No replacement reviewer is needed for this mechanical conversion.
