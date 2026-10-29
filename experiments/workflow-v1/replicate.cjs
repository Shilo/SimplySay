// Scope-only wrapper: the existing package, capture, runner and evaluator remain.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const runner=require('./run.cjs'),{included}=require('./continue.cjs');
const ROOT=path.resolve(__dirname,'../..'),MANIFEST='experiments/workflow-v1/replication.manifest.json';
const approved=()=>JSON.parse(fs.readFileSync(path.join(__dirname,'replication.approved.json'),'utf8'));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
async function main(){const[action,id]=process.argv.slice(2),a=approved();assert.equal(sha(path.join(ROOT,a.case_file)),a.case_sha256);assert.equal(sha(path.join(__dirname,'candidates/workflow.v4.txt')),a.policy_sha256);const old=JSON.parse(fs.readFileSync(path.join(__dirname,'first-match.manifest.json.freeze.json'),'utf8'));assert.equal(sha(process.env.CODEX_APP_RUNTIME_CLI_PATH),old.binary_sha256,'Pinned backend changed; no automatic migration');if(action==='freeze')runner.freeze(MANIFEST);else if(action==='run'){assert(['e21','e22'].includes(id),'Only two approved subjects');await runner.run(MANIFEST,id,{allocation:a,admit:async rpc=>included(await rpc.request('account/rateLimits/read',{}))});}else throw Error('Use freeze or run e21/e22');}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
