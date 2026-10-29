# Door scanner: local demo implementation notes

This is a fictional community open-house prototype, with no live service connected to this pack. All example times are local times on the same demo day. Doors open at 10:00.

## Verification path

QR v2 payload: event_id, ticket_id, nbf, exp, kid, sig. kid selects a bundled Ed25519 public key. sig covers the canonical event/ticket/time payload. Successful signature verification establishes that the trusted issuer signed those fields and that they were not altered; it does not query an admission or cancellation service. nbf and exp are the payload validity window.

The offline green predicate is: signature verifies with a bundled key; the phone clock is inside the signed validity window; ticket_id is absent from the last imported cancellation snapshot; and ticket_id is absent from this phone’s local consumed-ID set. A successful offline admission adds the ID to that local set. The two phones have independent consumed-ID sets. There is no peer-to-peer exchange while offline. A second scan on the same phone is rejected after its first acceptance.

## State freshness

Both phones last imported the cancellation snapshot at 09:00. An offline signature check does not fetch a newer snapshot. A cancellation after 09:00 does not alter the already-issued QR payload or signature. The prototype does not display a separate freshness warning when it shows offline green.

At actual 10:00 phone A reads 10:00 and phone B reads 09:58. No clock correction occurs while offline. Both local consumed-ID sets initially contain no IDs.

T-41: event matches, signature valid, nbf 09:00, exp 13:00. The server canceled T-41 at 09:10. At actual 10:00 its holder presents the same QR to phone A and then phone B while both remain offline.

T-99: event matches, signature valid, nbf 09:00, exp 09:59, not canceled. Consider a first scan on each phone at actual 10:00.

## Online path

With a working server connection, a scan uses server time and the current cancellation state. The server’s admission endpoint performs an atomic check-and-consume of a shared ticket-ID ledger: it accepts an otherwise allowed unused ticket and records that use as one indivisible operation. A later competing online scan of that ID is rejected. The offline green check is not this endpoint.

Reconnecting sends local offline admission records for audit. It does not undo entries already allowed through a door and cannot retroactively prevent two earlier offline admissions. The pack supplies no guarantee about reconnect duration or the handling of real incidents.
