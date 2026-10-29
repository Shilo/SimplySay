'use strict';

function reconcile(rows) {
  if (!Array.isArray(rows)) {
    throw new TypeError('rows must be an array');
  }

  const byId = new Map();
  for (const row of rows) {
    if (row === null || typeof row !== 'object' || Array.isArray(row)) {
      throw new TypeError('each row must be a work-order object');
    }

    const { record_id, revision } = row;
    if (typeof record_id !== 'string' || record_id.length === 0) {
      throw new TypeError('record_id must be a nonempty string');
    }
    if (!Number.isSafeInteger(revision) || revision < 0) {
      throw new TypeError('revision must be a nonnegative safe integer');
    }

    const previous = byId.get(record_id);
    if (previous === undefined || revision > previous.revision) {
      // Replacing a Map value preserves the ID's first appearance position.
      byId.set(record_id, row);
    }
  }

  return Array.from(byId.values(), row => ({ ...row }));
}

module.exports = { reconcile };
