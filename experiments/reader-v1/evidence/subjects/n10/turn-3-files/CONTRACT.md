# Work-order merge contract

The module exports reconcile(rows). rows is an array of flat work-order objects. record_id is a nonempty string and identifies a work order; different IDs may have the same title. revision is a nonnegative safe integer, not a timestamp or text sort key.

Return one complete row per record_id. For a repeated ID choose the row with the highest numeric revision. If revisions tie, keep the first encountered row. Retain the order in which distinct IDs first appeared, even if a later row wins. Keep every field from the winning row, not a blend of old and new fields. Do not mutate the input array or its rows. Empty input returns an empty array. Throw TypeError for a non-array input, a non-object row, an empty/non-string ID, or an invalid revision. Other row fields are copied without adding a new validation policy.

The CLI is node bin/reconcile.cjs INPUT.json and prints the reconciled JSON array followed by a newline. Keep this interface and row shape. Use built-in Node modules only. Existing data/work-orders.json and this contract are inputs and must remain unchanged. Local tests do not establish a successful live import.
