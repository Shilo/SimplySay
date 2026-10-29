'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {mergeContacts}=require('../src/merge.cjs');
const {toCsv}=require('../src/csv.cjs');
const {loadTeams}=require('../src/load.cjs');
const {resolve}=require('node:path');
const {spawnSync}=require('node:child_process');
test('single contact is exported',()=>{const row={contact_id:'a',name:'Ada',email:'ada@example.invalid',updated_at:'2026-10-01T00:00:00Z'};assert.deepEqual(mergeContacts([{team:'one',contacts:[row]}]),[row]);assert.equal(toCsv([row]),'contact_id,name,email,updated_at\na,Ada,ada@example.invalid,2026-10-01T00:00:00Z\n');});

const contact=(contact_id,name,updated_at,email='shared@example.invalid')=>({contact_id,name,email,updated_at});
const team=contacts=>({team:'sample',contacts});

test('merges by exact ID, preserves complete winning values and first ID order',()=>{
  const old=contact('a','Old','2026-10-01T00:00:00Z');
  const shared=contact('b','Other person','2026-10-02T00:00:00Z');
  const winner=contact('a',' New name ','2026-10-03T00:00:00Z',' New@Example.invalid ');
  const distinct=contact('A','Case-sensitive ID','2026-10-01T00:00:00Z');
  const teams=[team([old,shared]),team([winner,distinct,old])];
  const before=structuredClone(teams);
  for(const item of teams){item.contacts.forEach(Object.freeze);Object.freeze(item.contacts);Object.freeze(item);}
  Object.freeze(teams);
  assert.deepEqual(mergeContacts(teams),[winner,shared,distinct]);
  assert.deepEqual(teams,before);
});

test('compares actual instants across offsets and fractional precision',()=>{
  const newer=contact('a','Newer','2026-10-20T09:30:00Z');
  const older=contact('a','Older','2026-10-20T10:00:00+02:00');
  const fractional=contact('b','Fractional','2026-10-20T09:00:00.100Z');
  const whole=contact('b','Whole second','2026-10-20T09:00:00Z');
  assert.deepEqual(mergeContacts([team([older,whole,newer,fractional])]),[newer,fractional]);
  assert.deepEqual(mergeContacts([team([newer,fractional,older,whole])]),[newer,fractional]);
});

test('equal instants retain the first row within and across teams',()=>{
  const first=contact('a','First','2026-10-20T09:00:00Z');
  const second=contact('a','Second','2026-10-20T11:00:00+02:00');
  const third=contact('a','Third','2026-10-20T09:00:00.000Z');
  assert.deepEqual(mergeContacts([team([first,second]),team([third])]),[first]);
  assert.deepEqual(mergeContacts([team([second]),team([first,third])]),[second]);
});

test('empty inputs produce header-only CSV with a final LF',()=>{
  for(const teams of [[],[team([])],[team([]),team([])]]){
    assert.deepEqual(mergeContacts(teams),[]);
    assert.equal(toCsv(mergeContacts(teams)),'contact_id,name,email,updated_at\n');
  }
});

test('CSV retains column order and escapes commas, quotes, CR and LF',()=>{
  const row=contact('a,1','Ada "A"\r\nLovelace','2026-10-01T00:00:00Z','a\rb@example.invalid');
  assert.equal(toCsv([row]),'contact_id,name,email,updated_at\n"a,1","Ada ""A""\r\nLovelace","a\rb@example.invalid",2026-10-01T00:00:00Z\n');
});

test('fixture loading respects argument order and CLI prints only expected CSV',()=>{
  const north=resolve(__dirname,'../fixtures/north.json');
  const south=resolve(__dirname,'../fixtures/south.json');
  assert.deepEqual(loadTeams([south,north]).map(item=>item.team),['south','north']);
  const expected='contact_id,name,email,updated_at\n'+
    'c-101,Morgan New,morgan@example.invalid,2026-10-28T10:00:00Z\n'+
    'c-202,Ari Chen,shared@example.invalid,2026-10-21T09:00:00Z\n'+
    'c-303,Jo Rivera,jo@example.invalid,2026-10-25T15:30:00Z\n';
  assert.equal(toCsv(mergeContacts(loadTeams([north,south]))),expected);
  const result=spawnSync(process.execPath,[resolve(__dirname,'../bin/export.cjs'),north,south],{encoding:'utf8'});
  assert.ifError(result.error);
  assert.equal(result.status,0);
  assert.equal(result.stderr,'');
  assert.equal(result.stdout,expected);
});
