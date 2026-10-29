'use strict';

function reconcile(rows) {
  if (!Array.isArray(rows)) {
    throw new TypeError('rows must be an array');
  }

  const byId = new Map();
  for (const row of rows) {
    if (row === null || typeof row !== 'object' || Array.isArray(row)) {
      throw new TypeError('Each row must be a work-order object');
    }
    if (typeof row.record_id !== 'string' || row.record_id.length === 0) {
      throw new TypeError('record_id must be a nonempty string');
    }
    if (!Number.isSafeInteger(row.revision) || row.revision < 0) {
      throw new TypeError('revision must be a nonnegative safe integer');
    }

    const previous = byId.get(row.record_id);
    if (!previous || row.revision > previous.revision) {
      // Replacing a value keeps the ID's original position in the Map.
      byId.set(row.record_id, { ...row });
    }
  }
  return [...byId.values()];
}

module.exports = { reconcile };
