'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const {mergeContacts}=require('../src/merge.cjs');
const {loadTeams}=require('../src/load.cjs');
const {toCsv}=require('../src/csv.cjs');
const root=path.resolve(__dirname,'..');
const files=['north','south'].map(name=>path.join(root,'fixtures',name+'.json'));
const row=(contact_id,name,email='shared@example.invalid',updated_at='2026-10-01T00:00:00Z')=>({contact_id,name,email,updated_at});
const sampleCsv='contact_id,name,email,updated_at\nc-101,Morgan New,morgan@example.invalid,2026-10-28T10:00:00Z\nc-202,Ari Chen,shared@example.invalid,2026-10-21T09:00:00Z\nc-303,Jo Rivera,jo@example.invalid,2026-10-25T15:30:00Z\n';

test('fixtures merge by ID, retain shared emails, and preserve first-ID order',()=>{
  const teams=loadTeams(files);
  assert.deepEqual(teams.map(team=>team.team),['north','south']);
  const expected=[teams[1].contacts[0],teams[0].contacts[1],teams[1].contacts[1]];
  assert.deepEqual(mergeContacts(teams),expected);
  assert.equal(toCsv(mergeContacts(teams)),sampleCsv);
  const reversed=loadTeams([...files].reverse());
  assert.deepEqual(reversed.map(team=>team.team),['south','north']);
  assert.deepEqual(mergeContacts(reversed),[expected[0],expected[2],expected[1]]);
});

test('selects whole newest rows by instant, including offsets and fractional seconds',()=>{
  const old=row('a','Old','old@example.invalid','2026-10-02T00:30:00+02:00');
  const newest=row('a','New',' New@Example.invalid ','2026-10-01T23:00:00Z');
  const fractional=row('b','Fractional',undefined,'2026-10-01T00:00:00.100Z');
  const teams=[{contacts:[old,row('b','Whole')]},{contacts:[newest,fractional,old]}];
  assert.deepEqual(mergeContacts(teams),[newest,fractional]);
});

test('equal instants keep the first row within and across teams',()=>{
  const first=row('a','First',undefined,'2026-10-01T01:00:00+01:00');
  const equal=row('a','Later','changed@example.invalid','2026-10-01T00:00:00.000Z');
  assert.deepEqual(mergeContacts([{contacts:[first,equal]},{contacts:[equal]}]),[first]);
  assert.deepEqual(mergeContacts([{contacts:[equal]},{contacts:[first]}]),[equal]);
});

test('IDs are exact keys, and frozen inputs remain unchanged',()=>{
  const contacts=[row('A','Upper'),row('a','Lower'),row(' a ','Spaced'),row('__proto__','Special')];
  const teams=[{team:'one',contacts}];
  const before=JSON.stringify(teams);
  contacts.forEach(Object.freeze);
  Object.freeze(contacts);
  Object.freeze(teams[0]);
  Object.freeze(teams);
  assert.deepEqual(mergeContacts(teams),contacts);
  assert.equal(JSON.stringify(teams),before);
});

test('empty input and empty teams produce a header-only CSV',()=>{
  for(const teams of [[],[{contacts:[]}],[{contacts:[]},{contacts:[]}]]){
    assert.deepEqual(mergeContacts(teams),[]);
    assert.equal(toCsv(mergeContacts(teams)),'contact_id,name,email,updated_at\n');
  }
});

test('CSV preserves field order and escapes commas, quotes, CR and LF',()=>{
  const contact={updated_at:'2026-10-01T00:00:00Z',email:'line\rbreak',name:'Ada "Ace"\nLovelace',contact_id:'a,b'};
  assert.equal(toCsv([contact]),'contact_id,name,email,updated_at\n"a,b","Ada ""Ace""\nLovelace","line\rbreak",2026-10-01T00:00:00Z\n');
  assert.equal(toCsv([row('a','Ada','ada@example.invalid')]),'contact_id,name,email,updated_at\na,Ada,ada@example.invalid,2026-10-01T00:00:00Z\n');
});

test('CLI prints only the contracted CSV for the supplied files',()=>{
  const result=spawnSync(process.execPath,[path.join(root,'bin/export.cjs'),...files],{encoding:'utf8',cwd:root});
  assert.ifError(result.error);
  assert.equal(result.status,0);
  assert.equal(result.stderr,'');
  assert.equal(result.stdout,sampleCsv);
});
