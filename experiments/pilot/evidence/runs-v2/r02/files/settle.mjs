import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function prepareBatch(claims) {
  if (!Array.isArray(claims)) throw new TypeError('Claims must be an array.');
  const result = { approved: [], needs_review: [], excluded: [], total_cents: 0 };
  const ids = new Set();
  for (const [index, claim] of claims.entries()) {
    const fail = (message) => { throw new TypeError(`Claim at index ${index}: ${message}`); };
    if (claim === null || typeof claim !== 'object' || Array.isArray(claim)) {
      fail('must be an object.');
    }
    const { id, amount_cents, status, receipt_present } = claim;
    if (typeof id !== 'string' || id.trim().length === 0) fail('id must be a nonempty string.');
    if (ids.has(id)) fail(`duplicate id ${JSON.stringify(id)}.`);
    ids.add(id);
    if (!['approved', 'pending', 'denied'].includes(status)) fail('unknown status; expected approved, pending, or denied.');
    if (typeof receipt_present !== 'boolean') fail('receipt_present must be a boolean.');
    if (!Number.isSafeInteger(amount_cents) || amount_cents < 0) fail('amount_cents must be a nonnegative safe integer.');

    if (status === 'denied') result.excluded.push(id);
    else if (status === 'pending') result.needs_review.push({ id, reason: 'pending_approval' });
    else if (!receipt_present) result.needs_review.push({ id, reason: 'missing_receipt' });
    else {
      if (!Number.isSafeInteger(result.total_cents + amount_cents)) fail('approved total exceeds the safe integer range.');
      result.approved.push({ id, amount_cents });
      result.total_cents += amount_cents;
    }
  }
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: node settle.mjs input.json');
    const claims = JSON.parse(await readFile(process.argv[2], 'utf8'));
    process.stdout.write(`${JSON.stringify(prepareBatch(claims), null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exitCode = 1;
  }
}
