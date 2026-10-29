'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {mergeContacts}=require('../src/merge.cjs');
const {toCsv}=require('../src/csv.cjs');
const {loadTeams}=require('../src/load.cjs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');

const contact=(contact_id,name,updated_at,email='shared@example.invalid')=>({contact_id,name,email,updated_at});
const team=contacts=>({team:'test',contacts});
const fixtures=['north.json','south.json'].map(file=>path.join(__dirname,'../fixtures',file));

test('merge uses stable IDs, keeps whole newest rows and preserves first-ID order',()=>{
  const old=contact('a','Old','2026-10-01T00:00:00Z');
  const other=contact('b','Other','2026-10-02T00:00:00Z');
  const newest=contact('a','New','2026-10-03T00:00:00Z',' New@Example.invalid ');
  const stale=contact('a','Stale','2026-09-01T00:00:00Z','stale@example.invalid');
  const third=contact('c','Third','2026-10-01T00:00:00Z');
  const teams=[team([old,other]),team([newest,third,stale])];
  const before=structuredClone(teams);
  for(const t of teams){ t.contacts.forEach(Object.freeze); Object.freeze(t.contacts); Object.freeze(t); }
  Object.freeze(teams);
  assert.deepEqual(mergeContacts(teams),[newest,other,third]);
  assert.deepEqual(teams,before);
});

test('timestamp comparisons use actual instants across offsets and fractional seconds',()=>{
  const cases=[
    ['2026-10-28T10:00:00+02:00','2026-10-28T09:00:00Z'],
    ['2026-10-28T10:00:00Z','2026-10-28T09:30:00-01:00'],
    ['2026-10-28T10:00:00Z','2026-10-28T10:00:00.001Z'],
    ['2026-10-28T23:30:00Z','2026-10-29T00:00:00+02:00']
  ];
  for(const [a,b] of cases){
    const first=contact('a','First',a), second=contact('a','Second',b);
    const winner=Date.parse(a)>Date.parse(b)?first:second;
    assert.deepEqual(mergeContacts([team([first,second])]),[winner]);
    assert.deepEqual(mergeContacts([team([second]),team([first])]),[winner]);
  }
});

test('equal instants retain the first complete row within and across teams',()=>{
  const first=contact('a','First','2026-10-28T10:00:00Z','first@example.invalid');
  const equivalent=contact('a','Second','2026-10-28T12:00:00+02:00');
  const fractional=contact('a','Third','2026-10-28T10:00:00.000Z');
  assert.deepEqual(mergeContacts([team([first,equivalent]),team([fractional])]),[first]);
  assert.deepEqual(mergeContacts([team([equivalent]),team([first])]),[equivalent]);
});

test('empty input and empty teams produce header-only CSV',()=>{
  for(const teams of [[],[team([])],[team([]),team([])]]){
    assert.deepEqual(mergeContacts(teams),[]);
    assert.equal(toCsv(mergeContacts(teams)),'contact_id,name,email,updated_at\n');
  }
});

test('CSV preserves column order, quotes special characters and ends in LF',()=>{
  const row={email:'a\rb\nc',updated_at:'2026-10-01T00:00:00Z',name:'A, "B"',contact_id:'plain-rn'};
  assert.equal(toCsv([row]),'contact_id,name,email,updated_at\nplain-rn,"A, ""B""","a\rb\nc",2026-10-01T00:00:00Z\n');
});

test('loader preserves file order and sample CLI prints exactly the contracted CSV',()=>{
  const teams=loadTeams(fixtures);
  assert.deepEqual(teams.map(t=>t.team),['north','south']);
  assert.deepEqual(loadTeams([...fixtures].reverse()).map(t=>t.team),['south','north']);
  const expected='contact_id,name,email,updated_at\n'+
    'c-101,Morgan New,morgan@example.invalid,2026-10-28T10:00:00Z\n'+
    'c-202,Ari Chen,shared@example.invalid,2026-10-21T09:00:00Z\n'+
    'c-303,Jo Rivera,jo@example.invalid,2026-10-25T15:30:00Z\n';
  assert.equal(toCsv(mergeContacts(teams)),expected);
  const result=spawnSync(process.execPath,[path.join(__dirname,'../bin/export.cjs'),...fixtures],{encoding:'utf8'});
  assert.ifError(result.error);
  assert.equal(result.status,0);
  assert.equal(result.stderr,'');
  assert.equal(result.stdout,expected);
});
test('single contact is exported',()=>{const row={contact_id:'a',name:'Ada',email:'ada@example.invalid',updated_at:'2026-10-01T00:00:00Z'};assert.deepEqual(mergeContacts([{team:'one',contacts:[row]}]),[row]);assert.equal(toCsv([row]),'contact_id,name,email,updated_at\na,Ada,ada@example.invalid,2026-10-01T00:00:00Z\n');});
