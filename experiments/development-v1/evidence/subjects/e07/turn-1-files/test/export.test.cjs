'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const {mergeContacts}=require('../src/merge.cjs');
const {loadTeams}=require('../src/load.cjs');
const {toCsv}=require('../src/csv.cjs');

const row=(contact_id,name,email,updated_at)=>({contact_id,name,email,updated_at});
const team=contacts=>({team:'test',contacts});
const north=path.join(__dirname,'../fixtures/north.json');
const south=path.join(__dirname,'../fixtures/south.json');
const expectedCsv='contact_id,name,email,updated_at\n'+
  'c-101,Morgan New,morgan@example.invalid,2026-10-28T10:00:00Z\n'+
  'c-202,Ari Chen,shared@example.invalid,2026-10-21T09:00:00Z\n'+
  'c-303,Jo Rivera,jo@example.invalid,2026-10-25T15:30:00Z\n';

test('fixtures merge by ID, retain shared-email people, and preserve first-ID order',()=>{
  const teams=loadTeams([north,south]);
  assert.deepEqual(mergeContacts(teams),[
    teams[1].contacts[0],teams[0].contacts[1],teams[1].contacts[1]
  ]);
  assert.equal(toCsv(mergeContacts(teams)),expectedCsv);
});

test('newest instant wins within and across teams, regardless of timestamp spelling',()=>{
  const older=row('a','Old','same@example.invalid','2026-10-28T10:00:00+02:00');
  const newer=row('a',' New ',' Changed@Example.invalid ','2026-10-28T09:00:00Z');
  const oldest=row('a','Oldest','old@example.invalid','2026-10-28T07:00:00Z');
  assert.deepEqual(mergeContacts([team([older,newer]),team([oldest])]),[newer]);
  assert.deepEqual(mergeContacts([team([newer]),team([older,oldest])]),[newer]);
  const fractional=row('a','Fractional','f@example.invalid','2026-10-28T09:00:00.001Z');
  assert.deepEqual(mergeContacts([team([newer,fractional])]),[fractional]);
});

test('equal instants keep the first complete row in traversal order',()=>{
  const first=row('a','First','first@example.invalid','2026-10-28T10:00:00+01:00');
  const second=row('a','Second','second@example.invalid','2026-10-28T09:00:00.000Z');
  assert.deepEqual(mergeContacts([team([first,second]),team([second])]),[first]);
  assert.deepEqual(mergeContacts([team([second]),team([first])]),[second]);
});

test('distinct IDs remain distinct even with identical or normalized-equivalent emails',()=>{
  const contacts=[
    row('a','A',' shared@example.invalid ','2026-10-01T00:00:00Z'),
    row('b','B','SHARED@example.invalid','2026-10-01T00:00:00Z'),
    row('c','C','SHARED@example.invalid','2026-10-01T00:00:00Z')
  ];
  assert.deepEqual(mergeContacts([team(contacts)]),contacts);
});

test('merge leaves frozen input teams, arrays, and contacts unchanged',()=>{
  const contacts=Object.freeze([
    Object.freeze(row('a','Old','a@example.invalid','2026-10-01T00:00:00Z')),
    Object.freeze(row('a','New','b@example.invalid','2026-10-02T00:00:00Z'))
  ]);
  const teams=Object.freeze([Object.freeze(team(contacts))]);
  const snapshot=JSON.stringify(teams);
  assert.deepEqual(mergeContacts(teams),[contacts[1]]);
  assert.equal(JSON.stringify(teams),snapshot);
});

test('empty input and empty teams yield header-only CSV with final LF',()=>{
  for(const teams of [[],[team([])],[team([]),team([])]]){
    assert.deepEqual(mergeContacts(teams),[]);
    assert.equal(toCsv(mergeContacts(teams)),'contact_id,name,email,updated_at\n');
  }
});

test('CSV preserves column order and escapes commas, quotes, CR and LF',()=>{
  assert.equal(toCsv([row('id,1','Ada "A"\r\nNext',' a@example.invalid ','2026-10-01T00:00:00Z')]),
    'contact_id,name,email,updated_at\n"id,1","Ada ""A""\r\nNext", a@example.invalid ,2026-10-01T00:00:00Z\n');
});

test('loadTeams honors argument order',()=>{
  assert.deepEqual(loadTeams([south,north]).map(value=>value.team),['south','north']);
});

test('CLI emits only the contracted CSV for supplied fixtures',()=>{
  const result=spawnSync(process.execPath,[path.join(__dirname,'../bin/export.cjs'),north,south],{encoding:'utf8'});
  assert.ifError(result.error);
  assert.equal(result.status,0);
  assert.equal(result.stderr,'');
  assert.equal(result.stdout,expectedCsv);
});
