'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const {mergeContacts}=require('../src/merge.cjs');
const {loadTeams}=require('../src/load.cjs');
const {toCsv}=require('../src/csv.cjs');
const row=(contact_id,name,email,updated_at)=>({contact_id,name,email,updated_at});
const fixtures=['north','south'].map(n=>path.join(__dirname,'..','fixtures',n+'.json'));
const expected='contact_id,name,email,updated_at\nc-101,Morgan New,morgan@example.invalid,2026-10-28T10:00:00Z\nc-202,Ari Chen,shared@example.invalid,2026-10-21T09:00:00Z\nc-303,Jo Rivera,jo@example.invalid,2026-10-25T15:30:00Z\n';
test('fixtures merge by ID, preserve shared emails and replace whole rows in first-ID order',()=>{
 const teams=loadTeams(fixtures);
 assert.deepEqual(teams.map(t=>t.team),['north','south']);
 assert.deepEqual(loadTeams([...fixtures].reverse()).map(t=>t.team),['south','north']);
 assert.deepEqual(mergeContacts(teams),[teams[1].contacts[0],teams[0].contacts[1],teams[1].contacts[1]]);
 assert.equal(toCsv(mergeContacts(teams)),expected);
});
test('actual instants determine newest row regardless of offsets or fractions',()=>{
 for(const [older,newer] of [
 ['2026-10-28T10:00:00+02:00','2026-10-28T09:00:00Z'],
 ['2026-10-28T10:00:00Z','2026-10-28T09:30:00-01:00'],
 ['2026-10-28T10:00:00Z','2026-10-28T10:00:00.001Z']]){
 const old=row('a','Old','old@example.invalid',older);
 const fresh=row('a',' New ','NEW@example.invalid',newer);
 for(const contacts of [[old,fresh],[fresh,old]]) assert.deepEqual(mergeContacts([{contacts}]),[fresh]);
 }
});
test('equal instants keep first row within and across teams',()=>{
 const a=row('a','First','first@example.invalid','2026-10-28T10:00:00+02:00');
 const b=row('a','Second','second@example.invalid','2026-10-28T08:00:00.000Z');
 assert.deepEqual(mergeContacts([{contacts:[a,b]},{contacts:[b]}]),[a]);
 assert.deepEqual(mergeContacts([{contacts:[b]},{contacts:[a]}]),[b]);
});
test('exact IDs retain first position through replacements without mutating inputs',()=>{
 const a=row('a','Old','shared@example.invalid','2026-10-01T00:00:00Z');
 const b=row('A','Other','shared@example.invalid','2026-10-02T00:00:00Z');
 const c=row('a','New','changed@example.invalid','2026-10-03T00:00:00Z');
 const teams=[{contacts:[a,b,c]},{contacts:[a]}];
 const snapshot=JSON.parse(JSON.stringify(teams));
 for(const team of teams){team.contacts.forEach(Object.freeze);Object.freeze(team.contacts);Object.freeze(team);}
 Object.freeze(teams);
 assert.deepEqual(mergeContacts(teams),[c,b]);
 assert.deepEqual(teams,snapshot);
});
test('empty teams produce header-only CSV with final LF',()=>{
 for(const teams of [[],[{contacts:[]}],[{contacts:[]},{contacts:[]}]]){
 assert.deepEqual(mergeContacts(teams),[]);
 assert.equal(toCsv(mergeContacts(teams)),'contact_id,name,email,updated_at\n');
 }
});
test('CSV preserves column order and escapes commas, quotes, CR and LF',()=>{
 const contact={updated_at:'2026-10-01T00:00:00Z',email:'a\rb\nc',name:'Ada, "A"',contact_id:'a'};
 assert.equal(toCsv([contact]),'contact_id,name,email,updated_at\na,"Ada, ""A""","a\rb\nc",2026-10-01T00:00:00Z\n');
});
test('CLI prints exact fixture CSV with no diagnostics',()=>{
 const result=spawnSync(process.execPath,[path.join(__dirname,'..','bin','export.cjs'),...fixtures],{encoding:'utf8'});
 assert.ifError(result.error);assert.equal(result.status,0);assert.equal(result.stderr,'');assert.equal(result.stdout,expected);
});
