# Development screening and next check

Eight screening subjects completed all 28 same-ID turns; no failed or replacement conversation. Both independent blinded development reviewers pass all four unchanged calibration controls. Strict schema and literal-quote ingestion succeeded directly; no format conversion or reviewer retry was needed. These are automated assessments, not measured human comprehension.

| Whole-conversation pair | Reviewer one | Opposite reviewer two |
| --- | --- | --- |
| D1 absent–A v2 | Tie | A, modest framing clarity |
| D1 absent–B v2 | Tie | B, modest framing clarity |
| D1 absent–manual | Tie | Manual, modest framing clarity |
| D1 A v2–B v2 | Tie | Tie |
| D2 absent–A v2 | Tie | Tie |
| D2 absent–B v2 | Tie | Tie |
| D2 absent–manual | Absent | Absent |
| D2 A v2–B v2 | Tie | Tie |

No consistent clutter, jargon or interruption reduction is established for A/B v2. Reviewer two prefers separating passed checks from outstanding attention in D1; reviewer one finds the baseline's later clarification sufficient. All D1 pairs tie on filler, repetition, jargon and excessive updates. Keep that disagreement; do not promote the modest framing preference into evidence of less unnecessary reading.

Both reviewers prefer absent over manual in D2 because manual announces an incorrect CSV diagnosis, then corrects itself. The correction is useful once the error has been sent; the initial unverified detour is avoidable confusion and an interruption. This is an observed communication regression in that run, not proof the manual instruction caused the reasoning mistake. Both reviewers otherwise value the requested maintainer examples, causal reasoning and actual coverage descriptions. One notes that the handoff-start announcement mostly repeats the request on both sides. Useful technical depth is not scored as filler.

The separate instruction challenger inspected all actual matched replies and progress before seeing blind judgments. It identifies a plausible general selection problem: v2 still permits any broadly relevant source detail. D1's opening decision is accompanied by passed-check mechanics, check-in context and a local-exercise recap; the practical D2 staff follow-up includes implementation details. Some context is reasonable and warning repetition can be justified, so this is a revision hypothesis rather than a claimed defect in every extra sentence. Early D2 diagnosis updates arrive about 14–24 seconds after turn start; their factual accuracy alone does not establish that the reader needed an interruption. Host opening/periodic requirements still constrain what may be suppressed.

## Information and actual work, separately

D1's requested facts and standalone volunteer drafts are preserved. All four D2 arms actually repair the tested identity/ordering/timestamp-offset behavior, preserve CSV/CLI behavior and supplied inputs, add meaningful regression tests, run observed tests and retain substantial maintainer documents, handoffs and standalone staff drafts. Test totals differ (9/8/7/7 for absent/A/B/manual); counts alone do not measure effort or quality. Independent inspection covered all 176 actual snapshot files before the offline evaluator probes ran. Every fixed supplied probe passes, and every observed native capture/loading/continuation check passes.

That is **not a full literal-contract work pass**. Both blind reviewers independently identify the same timestamp precision limitation as the separate source verifier: the identical merge code uses Date.parse and collapses valid sub-millisecond instants. The verifier also executes an exact counterexample, retaining the older `.0001Z` row over a later `.0002Z` row. The frozen millisecond/offset probes remain unchanged and narrower. Absent/A handoffs disclose millisecond precision; B/manual do not disclose that edge. Disclosure does not make the unrestricted newest-instant contract conformant. Real-data precision is unknown; no export-specific instruction is added to fix this shared defect. Preserve the failure without automatically calling it a policy-caused regression.

Incoming original native child instructions remain unverified. No new native child/capture route, direct Claude execution, paid service or runtime evaluator was introduced. The raw CLI usage snapshots may be cumulative across resumes and are not summed. All temporary subject sign-in copies were removed.

## Revised hypotheses and finite development gate

Before D3 outputs, the independent challenger proposes A v3 (131 words, 944 bytes) and B v3 (136 words, 966 bytes). Both are new compact versions retained beside v1/v2. A strengthens selection around the current question, admits extra background only when requested/needed, and stops after satisfying it. B supplies the changed answer or missing explanation from established conversational context. Both explicitly request concision, preserve requested depth/full work/protected outputs and narrow discretionary interruptions to needed action, a blocker or a meaningful expectation change. Host updates and timely warnings/approvals remain mandatory.

Use the remaining four development subject slots for the D3 quartet: natural absent, A v3 enabled, B v3 enabled and unchanged manual. The new versions address observed general behavior; this is not another run of unchanged v2. Policy developer did not inspect D3 requests or sealed holdouts. D3 is developmental; the two sealed final conversations remain unopened and unavailable for tuning.

Concrete go/no-go interpretation, recorded before D3 subjects: a version is promising enough for the separate holdouts only if both calibrated development reviewers prefer it to absent on D3 for a specific reduction in unnecessary reading or interruption, without a policy-specific essential loss or material regression. A generic formatting preference, a word count, an unreviewed impression, or a split vote alone is insufficient. Preserve clear-baseline ties. If neither is promising, stop and diagnose the specific obstacle rather than spend the holdout allocation repeatedly evaluating unchanged text. If both qualify, choose the smaller adequate mechanism after comparing preservation and the direct A/B pair. This gate does not change the previously recorded final four-pair repeatability rule or any historical criterion.

At this checkpoint, 12 of the 32 additional conversations are used/reserved: two challenge agents, eight subjects and two development reviewers. Their scheduled follow-ups remain inside those same conversations and turn caps. Four development subjects, twelve holdout/repetition subjects, two fresh holdout reviewers and two failure reserves are still unspent. No production architecture, final names or publication is approved by this record.
