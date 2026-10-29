'use strict';

function reconcile(rows) {
  if (!Array.isArray(rows)) {
    throw new TypeError('rows must be an array');
  }

  const byId = new Map();
  for (const row of rows) {
    if (row === null || typeof row !== 'object' || Array.isArray(row)) {
      throw new TypeError('each row must be an object');
    }
    if (typeof row.record_id !== 'string' || row.record_id.length === 0) {
      throw new TypeError('record_id must be a nonempty string');
    }
    if (!Number.isSafeInteger(row.revision) || row.revision < 0) {
      throw new TypeError('revision must be a nonnegative safe integer');
    }

    const previous = byId.get(row.record_id);
    // Updating a Map entry preserves its original position; ties keep the first row.
    if (!previous || row.revision > previous.revision) {
      byId.set(row.record_id, row);
    }
  }

  return Array.from(byId.values(), row => ({ ...row }));
}

module.exports = { reconcile };
