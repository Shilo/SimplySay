import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function prepareBatch(claims) {
  if (!Array.isArray(claims)) throw new TypeError('Claims must be an array');
  const result = { approved: [], needs_review: [], excluded: [], total_cents: 0 };
  const ids = new Set();
  for (const [index, claim] of claims.entries()) {
    const fail = (message) => { throw new TypeError(`Claim ${index + 1}: ${message}`); };
    if (claim === null || typeof claim !== 'object' || Array.isArray(claim)) {
      fail('must be an object');
    }
    if (typeof claim.id !== 'string' || claim.id.trim() === '') fail('id must be a nonempty string');
    if (ids.has(claim.id)) fail(`duplicate id ${claim.id}`);
    ids.add(claim.id);
    if (!['approved', 'pending', 'denied'].includes(claim.status)) fail('unknown or missing status');
    if (typeof claim.receipt_present !== 'boolean') fail('receipt_present must be a boolean');
    if (!Number.isSafeInteger(claim.amount_cents) || claim.amount_cents < 0) {
      fail('amount_cents must be a nonnegative safe integer');
    }
    if (claim.status === 'denied') result.excluded.push(claim.id);
    else if (claim.status === 'pending') result.needs_review.push({ id: claim.id, reason: 'pending_approval' });
    else if (!claim.receipt_present) result.needs_review.push({ id: claim.id, reason: 'missing_receipt' });
    else {
      if (!Number.isSafeInteger(result.total_cents + claim.amount_cents)) fail('approved total exceeds the safe integer range');
      result.approved.push({ id: claim.id, amount_cents: claim.amount_cents });
      result.total_cents += claim.amount_cents;
    }
  }
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: node settle.mjs input.json');
    const claims = JSON.parse(await readFile(process.argv[2], 'utf8'));
    process.stdout.write(`${JSON.stringify(prepareBatch(claims))}\n`);
  } catch (error) {
    process.stderr.write(`Cannot prepare batch: ${error.message}\n`);
    process.exitCode = 1;
  }
}
