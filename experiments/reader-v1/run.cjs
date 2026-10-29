// Phase-only scope wrapper; the installed plugin and native capture stay thin.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const engine=require('../workflow-v1/run.cjs'),{included}=require('../workflow-v1/continue.cjs');
const ROOT=path.resolve(__dirname,'../..'),LEDGER=path.join(__dirname,'usage.json');
const j=p=>JSON.parse(fs.readFileSync(p,'utf8')),sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
async function main(){const[action,id]=process.argv.slice(2),unit=j(path.join(__dirname,'unit.json')),old=j(path.join(ROOT,'experiments/workflow-v1/replication.manifest.json.freeze.json'));
  const MANIFEST=unit.manifest||'experiments/workflow-v1/reader-screen.manifest.json';
  assert.equal(unit.authorization,'owner-reader-development-2026-10-29');assert.equal(unit.status,'ready');
  assert.equal(sha(process.env.CODEX_APP_RUNTIME_CLI_PATH),old.binary_sha256,'Pinned host changed; record a new integration check before dispatch');
  if(action==='freeze')engine.freeze(MANIFEST);
  else if(action==='run'){assert(unit.exact_fresh_assignments.some(s=>s.ids.includes(id)),'Unallocated subject');await engine.run(MANIFEST,id,{allocation:unit,authorization_key:'reader_development',ledger_file:LEDGER,admit:async rpc=>included(await rpc.request('account/rateLimits/read',{}))});}
  else throw Error('Use freeze or run ALLOCATED_ID');
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
