// Development-only feasibility bookkeeping. Never included in an installed package.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const local = path.join(root, '.local');
fs.mkdirSync(local, { recursive: true });
const ledgerPath = path.join(local, 'pilot-sessions.json');
const lockPath = path.join(local, 'pilot-sessions.lock');
const action = process.argv[2];
if (!['reserve', 'status', 'finish'].includes(action)) throw new Error('Use reserve ID HOST CASE [SLOTS], status, or finish ID STATUS');
let lock;
try {
  lock = fs.openSync(lockPath, 'wx');
  const ledger = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, 'utf8')) : { limit: 24, reservations: [] };
  if (action === 'reserve') {
    const [id, host, caseId, slotsText = '1'] = process.argv.slice(3);
    const slots = Number(slotsText);
    if (!id || !['claude', 'codex'].includes(host) || !caseId || !Number.isInteger(slots) || slots < 1 || slots > 2) throw new Error('Invalid reservation');
    if (ledger.reservations.some(r => r.id === id)) throw new Error('ID already reserved; retries require a new reservation');
    if (ledger.reservations.reduce((n, r) => n + r.slots, 0) + slots > ledger.limit) throw new Error('24-session cap reached');
    ledger.reservations.push({ id, host, caseId, slots, state: 'reserved', reservedAt: new Date().toISOString() });
  }
  if (action === 'finish') {
    const [id, state] = process.argv.slice(3);
    const row = ledger.reservations.find(r => r.id === id);
    if (!row || !['completed', 'failed', 'blocked-before-launch'].includes(state)) throw new Error('Invalid completion');
    row.state = state;
    row.finishedAt = new Date().toISOString();
    // Reservations are never refunded, even on early failure. This is conservative.
  }
  fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + '\n');
  console.log(JSON.stringify({ limit: ledger.limit, reserved: ledger.reservations.reduce((n, r) => n + r.slots, 0), reservations: ledger.reservations }));
} finally {
  if (lock !== undefined) { fs.closeSync(lock); fs.unlinkSync(lockPath); }
}
