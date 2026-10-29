'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {mergeContacts}=require('../src/merge.cjs');
const {toCsv}=require('../src/csv.cjs');
test('single contact is exported',()=>{const row={contact_id:'a',name:'Ada',email:'ada@example.invalid',updated_at:'2026-10-01T00:00:00Z'};assert.deepEqual(mergeContacts([{team:'one',contacts:[row]}]),[row]);assert.equal(toCsv([row]),'contact_id,name,email,updated_at\na,Ada,ada@example.invalid,2026-10-01T00:00:00Z\n');});
