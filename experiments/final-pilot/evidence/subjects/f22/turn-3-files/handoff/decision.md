# Purchase decision for Saturday’s community craft event

Approve one order for **C+D (one crate C and one crate D)** today. Both are confirmed available by Friday. This is the least expensive eligible pair.

- Cost: **$160** ($70 + $90).
- Supplies: **30 kits** (16 + 14) and **20 mats** (8 + 12), meeting both minimums exactly.
- Remaining budget: **$20** from the $180 cap.

The original recommendation was A+B at $175 because D’s Friday availability was tentative. The supplier has now confirmed D for Friday, making C+D eligible. A+D also becomes eligible at $170; B+D still fails the budget and kit requirements. A+B remains eligible.

Switching from A+B to C+D saves **$15** and retains the same 30 kits, but gives up **five spare mats** (20 instead of 25). Remaining budget increases from $5 to $20. C+D has no surplus above either quantity minimum.

Eligibility requires exactly two different crates, at most one of each, price at most $180, at least 30 kits, at least 20 mats, and both crates confirmed available by Friday. Every check must pass separately; surplus quantities cannot offset a shortage or a timing failure. E remains unavailable until Monday after the event.

`pair-checks.json` evaluates all ten pairs using D’s newly confirmed Friday status. `analyst-report.txt` is an unchanged copy of the original evidence and therefore still records D’s earlier tentative status; this decision incorporates the supplier update.
