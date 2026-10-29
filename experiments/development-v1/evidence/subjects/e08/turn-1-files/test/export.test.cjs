'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const {mergeContacts}=require('../src/merge.cjs');
const {loadTeams}=require('../src/load.cjs');
const {toCsv}=require('../src/csv.cjs');
const root=path.resolve(__dirname,'..');
const files=['north','south'].map(team=>path.join(root,'fixtures',team+'.json'));
const row=(contact_id,name,email,updated_at)=>({contact_id,name,email,updated_at});

test('fixture IDs merge despite changed emails while shared emails stay distinct',()=>{
  const teams=loadTeams(files);
  assert.deepEqual(mergeContacts(teams),[teams[1].contacts[0],teams[0].contacts[1],teams[1].contacts[1]]);
});

test('newest actual instant wins in either encounter order with exact complete values',()=>{
  const older=row('a','Old','old@example.invalid','2026-10-28T12:00:00+02:00');
  const newer=row('a',' New, exact ',' New@Example.invalid ','2026-10-28T09:30:00-01:00');
  for(const contacts of [[older,newer],[newer,older]]){
    assert.deepEqual(mergeContacts([{team:'one',contacts}]),[newer]);
  }
});

test('equal instants keep the first row within and across teams',()=>{
  const first=row('a','First','first@example.invalid','2026-10-28T10:00:00Z');
  const second=row('a','Second','second@example.invalid','2026-10-28T12:00:00+02:00');
  const third=row('a','Third','third@example.invalid','2026-10-28T10:00:00.000Z');
  assert.deepEqual(mergeContacts([{team:'one',contacts:[first,second]},{team:'two',contacts:[third]}]),[first]);
  assert.deepEqual(mergeContacts([{team:'one',contacts:[second,first]}]),[second]);
});

test('fractional seconds and repeated IDs within a team are handled',()=>{
  const first=row('a','First','same@example.invalid','2026-10-28T10:00:00Z');
  const newer=row('a','Newer','same@example.invalid','2026-10-28T10:00:00.100Z');
  assert.deepEqual(mergeContacts([{team:'one',contacts:[first,newer,first]}]),[newer]);
});

test('IDs remain exact, replacements keep first-seen order, inputs remain unchanged',()=>{
  const contacts=[
    row('a','First','shared@example.invalid','2026-10-28T10:00:00Z'),
    row(' A ','Other','shared@example.invalid','2026-10-28T10:00:00Z'),
    row('a','Updated','changed@example.invalid','2026-10-29T10:00:00Z')
  ];
  const teams=[{team:'one',contacts}];
  const snapshot=JSON.parse(JSON.stringify(teams));
  contacts.forEach(Object.freeze);
  Object.freeze(contacts);
  Object.freeze(teams[0]);
  Object.freeze(teams);
  assert.deepEqual(mergeContacts(teams),[contacts[2],contacts[1]]);
  assert.deepEqual(teams,snapshot);
});

test('empty teams produce a header-only CSV with final LF',()=>{
  for(const teams of [[],[{team:'empty',contacts:[]}]]){
    assert.deepEqual(mergeContacts(teams),[]);
    assert.equal(toCsv(mergeContacts(teams)),'contact_id,name,email,updated_at\n');
  }
});

test('CSV keeps column order and escapes commas, quotes, CR and LF',()=>{
  assert.equal(toCsv([
    row('a','Ada','ada@example.invalid','2026-10-01T00:00:00Z'),
    row('b,2','Jo "JJ"\r\nRivera','line\rbreak\n@example.invalid','2026-10-02T00:00:00Z')
  ]),'contact_id,name,email,updated_at\n'+
    'a,Ada,ada@example.invalid,2026-10-01T00:00:00Z\n'+
    '"b,2","Jo ""JJ""\r\nRivera","line\rbreak\n@example.invalid",2026-10-02T00:00:00Z\n');
});

test('loader preserves file order and CLI emits only the expected fixture CSV',()=>{
  assert.deepEqual(loadTeams([...files].reverse()).map(team=>team.team),['south','north']);
  const result=spawnSync(process.execPath,[path.join(root,'bin','export.cjs'),...files],{encoding:'utf8'});
  assert.ifError(result.error);
  assert.equal(result.status,0);
  assert.equal(result.stderr,'');
  assert.equal(result.stdout,'contact_id,name,email,updated_at\n'+
    'c-101,Morgan New,morgan@example.invalid,2026-10-28T10:00:00Z\n'+
    'c-202,Ari Chen,shared@example.invalid,2026-10-21T09:00:00Z\n'+
    'c-303,Jo Rivera,jo@example.invalid,2026-10-25T15:30:00Z\n');
});
