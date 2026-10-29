// Synthetic-only check of shared-runner ledger and disabled preflight changes.
// The VM replaces native commands, RPC, credentials paths and all default-ledger
// writes. No host, provider, model, real sign-in or historical ledger is used.
'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'../..'),file=path.join(ROOT,'experiments/workflow-v1/run.cjs'),source=fs.readFileSync(file,'utf8'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'ss-reader-runner-check-')),legacy=path.join(ROOT,'.local/development-v1-sessions.json'),legacyBefore=sha(fs.readFileSync(legacy)),defaultFile=path.join(fixture,'default-ledger.json');
const map=f=>typeof f==='string'&&(f===legacy||f===legacy+'.lock')?defaultFile+(f.endsWith('.lock')?'.lock':''):f;
const proxy={...fs};for(const name of ['readFileSync','openSync','unlinkSync','existsSync'])proxy[name]=(f,...args)=>fs[name](map(f),...args);
const put=(f,v)=>{f=map(f);assert(path.resolve(f).startsWith(fixture+path.sep));fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,typeof v==='string'||Buffer.isBuffer(v)?v:JSON.stringify(v,null,2)+'\n');};
const inside=(root,rel)=>{const p=path.resolve(root,rel);assert(p.startsWith(path.resolve(root)+path.sep),'Outside fixture');return p;};
const selector='ss-feasibility@ss-feasibility-catalog',files=['.codex-plugin/plugin.json','hooks/hooks.json','session-start.cjs','policy.txt'];let syntheticVersionReads=0;
const context={module:{exports:{}},__dirname:path.dirname(file),__filename:file,process:{env:{...process.env,CODEX_APP_RUNTIME_CLI_PATH:'SYNTHETIC_NEVER_EXECUTED'}},Buffer,console,setTimeout,clearTimeout};
context.require=name=>{
  if(name==='node:fs')return proxy;
  if(name==='node:child_process')return {spawnSync(cmd,args){assert.equal(cmd,'SYNTHETIC_NEVER_EXECUTED');assert.equal(JSON.stringify(args),'["--version"]');syntheticVersionReads++;return {status:0,stdout:'codex-cli 0.165.0-alpha.1.2\n'};}};
  if(name==='../pilot/codex-rpc.cjs')return {CodexRpc:class {constructor(){throw Error('Native RPC forbidden in this check');}}};
  if(name==='../final-pilot/run.cjs')return {config:()=>'',writeCapture:put,safeInside:inside};
  if(name==='../development-v1/run.cjs')return {BASE:fixture,snapshot:()=>[],loading:()=>[]};
  if(name==='./capture.cjs')return require('../workflow-v1/capture.cjs');
  return require(name);
};
const prefix='for(let n=0;n<task.turns.length;n++){',start=source.indexOf(prefix+'ledger('),end=source.indexOf(';const prompt=',start);assert(start>=0&&end>start,'Per-turn guard must remain identifiable');
const turnGuard=source.slice(start+prefix.length,end),unexpected=source.match(/const slot=(options\.ledger_file\?[^;]+);x\.starts\.push/);assert(unexpected,'Unexpected-native accounting must remain identifiable');
vm.runInNewContext(source+`\nmodule.exports.synthetic={ledger,update,preflight,removeAuth,reserveTurn:(id,n,options,ledgerFile)=>{${turnGuard};},unexpectedId:(options,x,t)=>(${unexpected[1]})};`,context,{filename:file});
const api=context.module.exports.synthetic,checks=[];
async function check(name,fn){await fn();checks.push({name,pass:true});}
function trial(id,{disabled=true,listed=false,active=false,corrupt=false,setting=true,missing=false,initiallyDisabled=false,failWrite=false}={}){
  const dir=path.join(fixture,id),profile=path.join(dir,'profile'),cwd=path.join(dir,'task'),cache=path.join(profile,'plugins/cache/catalog/plugin');fs.mkdirSync(cwd,{recursive:true});put(path.join(profile,'config.toml'),'# synthetic configuration\n');
  for(const f of files){const b=f==='policy.txt'?fs.readFileSync(path.join(ROOT,'experiments/workflow-v1/candidates/workflow.v5.txt')):f==='.codex-plugin/plugin.json'?JSON.stringify({name:'ss-feasibility'}):'synthetic '+f;put(path.join(dir,'catalog/plugin',f),b);if(!missing)put(path.join(cache,f),b);}
  if(corrupt)put(path.join(cache,'policy.txt'),'wrong synthetic bytes');
  const hook={pluginId:selector,command:`node -e "require(process.env.PLUGIN_ROOT + '/session-start.cjs')"`,matcher:'startup',eventName:'sessionStart',timeoutSec:10,handlerType:'command',isManaged:false,sourcePath:path.join(cache,'hooks/hooks.json'),enabled:active,key:'synthetic-key',currentHash:'synthetic-hash',trustStatus:'trusted'};
  const config={model:'gpt-6.1-sol',model_reasoning_effort:'xhigh',features:{apps:false,multi_agent:false},agents:{enabled:false},plugins:{_default:{enabled:false,fixture_marker:'retain-default'},[selector]:{enabled:!initiallyDisabled,fixture_marker:'retain-owned'},'unrelated@fixture':{enabled:true,fixture_marker:'retain-unrelated'}},sandbox_mode:'workspace-write',windows:{sandbox:'mxc'},sandbox_workspace_write:{network_access:false},approval_policy:'never',forced_login_method:'chatgpt'};
  const initialPlugins=JSON.parse(JSON.stringify(config.plugins)),calls=[];
  const rpc={async initialize(){calls.push({method:'initialize'});},async request(method,params){calls.push({method,params:JSON.parse(JSON.stringify(params||{}))});if(method==='hooks/list')return {data:[{hooks:listed?[{...hook,enabled:active||config.plugins[selector].enabled}]:[]}]};if(method==='config/read')return {config:JSON.parse(JSON.stringify(config))};if(method==='config/batchWrite'){
    if(params.edits[0].keyPath==='plugins'){
      assert(disabled,'Only the disabled arm may change the plugins table');assert.equal(params.filePath,path.join(profile,'config.toml'));assert.equal(params.reloadUserConfig,true);assert.equal(params.edits.length,1);assert.equal(params.edits[0].mergeStrategy,'upsert');
      if(failWrite)throw Error('Synthetic configuration write failed');
      if(setting)config.plugins=JSON.parse(JSON.stringify(params.edits[0].value));
    }else assert.equal(params.edits[0].keyPath,'hooks.state');
    return {};
  }throw Error('Unexpected RPC: '+method);}};
  return {dir,profile,cwd,rpc,config,initialPlugins,calls,row:{condition:disabled?'disabled':'enabled',policy:'experiments/workflow-v1/candidates/workflow.v5.txt'}};
}
const preflight=t=>api.preflight(t.dir,t.profile,t.cwd,t.row,t.rpc,async()=>({ordinaryUsageAllowed:true,synthetic:true}));
async function main(){
  await check('separate-ledger counts and updates',()=>{const p=path.join(fixture,'separate.json');put(p,{starts:[{id:'one',turns:2}]});api.ledger(x=>x.starts.push({id:'two',turns:0}),p);let x=JSON.parse(fs.readFileSync(p));assert.equal(x.new_conversations,2);assert.equal(x.new_task_starts,2);api.update('two',{turns:1},p);x=JSON.parse(fs.readFileSync(p));assert.equal(x.new_task_starts,3);assert(!fs.existsSync(p+'.lock'));});
  await check('default ledger retains old shape without real write',()=>{put(defaultFile,{starts:[]});api.ledger(x=>x.starts.push({id:'old-route',turns:1}));const x=JSON.parse(fs.readFileSync(defaultFile));assert.equal(x.starts.length,1);assert.equal(x.new_conversations,undefined);assert.equal(x.new_task_starts,undefined);});
  await check('ledger mutation failure removes only acquired lock',()=>{const p=path.join(fixture,'failed.json');put(p,{starts:[]});assert.throws(()=>api.ledger(()=>{throw Error('fixture');},p),/fixture/);assert(!fs.existsSync(p+'.lock'));assert.equal(JSON.parse(fs.readFileSync(p)).starts.length,0);fs.writeFileSync(p+'.lock','held');assert.throws(()=>api.ledger(()=>{},p));assert(fs.existsSync(p+'.lock'));});
  await check('interleaved subjects cannot exceed work-unit task cap',()=>{const p=path.join(fixture,'turn-cap.json'),opts={allocation:{end_task_cap:3}};put(p,{dispatch_blocked:false,allowed_subjects:['a','b'],starts:[{id:'a',turns:0,max_turns:2},{id:'b',turns:0,max_turns:2}]});api.reserveTurn('a',0,opts,p);api.reserveTurn('b',0,opts,p);api.reserveTurn('a',1,opts,p);assert.throws(()=>api.reserveTurn('b',1,opts,p),/Per-turn/);assert.equal(JSON.parse(fs.readFileSync(p)).new_task_starts,3);});
  await check('per-turn sequence and own max are enforced',()=>{const p=path.join(fixture,'turn-sequence.json'),opts={allocation:{end_task_cap:20}};put(p,{dispatch_blocked:false,allowed_subjects:['a'],starts:[{id:'a',turns:0,max_turns:1}]});assert.throws(()=>api.reserveTurn('a',1,opts,p),/Per-turn/);api.reserveTurn('a',0,opts,p);assert.throws(()=>api.reserveTurn('a',1,opts,p),/Per-turn/);});
  await check('dispatch stop blocks already-started next turn',()=>{const p=path.join(fixture,'turn-stopped.json');put(p,{dispatch_blocked:true,allowed_subjects:['a'],starts:[{id:'a',turns:0,max_turns:1}]});assert.throws(()=>api.reserveTurn('a',0,{allocation:{end_task_cap:20}},p),/Per-turn/);assert.equal(JSON.parse(fs.readFileSync(p)).starts[0].turns,0);});
  await check('withdrawn subject blocks already-started next turn',()=>{const p=path.join(fixture,'turn-withdrawn.json');put(p,{dispatch_blocked:false,allowed_subjects:[],starts:[{id:'a',turns:0,max_turns:1}]});assert.throws(()=>api.reserveTurn('a',0,{allocation:{end_task_cap:20}},p),/Per-turn/);});
  await check('unexpected native accounting is separate from legacy IDs',()=>{const a=api.unexpectedId({ledger_file:'synthetic'}, {starts:[]},'native-a'),b=api.unexpectedId({ledger_file:'synthetic'}, {starts:[]},'native-b');assert(a.startsWith('unexpected-'));assert.notEqual(a,b);assert.equal(api.unexpectedId({}, {starts:[]},'native-a'),'e31');assert.equal(api.unexpectedId({}, {starts:[{id:'e31'}]},'native-a'),'e32');});
  await check('unsupported native disable command is absent',()=>{assert(!/\[\s*['"]plugin['"]\s*,\s*['"]disable['"]/.test(source));});
  await check('disabled control switches off before hook discovery and preserves entries',async()=>{const t=trial('disabled-transition',{listed:true});assert.equal(t.config.plugins[selector].enabled,true);await preflight(t);assert.equal(t.config.plugins[selector].enabled,false);assert.deepEqual(t.config.plugins._default,t.initialPlugins._default);assert.deepEqual(t.config.plugins['unrelated@fixture'],t.initialPlugins['unrelated@fixture']);assert.equal(t.config.plugins[selector].fixture_marker,t.initialPlugins[selector].fixture_marker);assert.equal(t.calls.slice(0,4).map(c=>c.method).join(','),'initialize,config/read,config/batchWrite,hooks/list');});
  await check('already-disabled control remains disabled without losing entries',async()=>{const t=trial('disabled-idempotent',{initiallyDisabled:true});await preflight(t);assert.deepEqual(t.config.plugins,t.initialPlugins);});
  await check('disabled write failure stops before discovery',async()=>{const t=trial('disabled-write-failure',{failWrite:true});await assert.rejects(()=>preflight(t),/Synthetic configuration write failed/);assert(!t.calls.some(c=>c.method==='hooks/list'));});
  await check('disabled package with unlisted hook is verified',async()=>{const r=await preflight(trial('disabled-hidden'));assert.equal(r.installed_roots_verified,1);assert.equal(Object.keys(r.installed_package).length,4);});
  await check('disabled package with explicitly inactive hook is verified',async()=>{await preflight(trial('disabled-listed',{listed:true}));});
  await check('active owned hook in disabled arm is rejected',async()=>{await assert.rejects(()=>preflight(trial('disabled-active',{listed:true,active:true})),/active in control/);});
  await check('disabled setting must be effective',async()=>{await assert.rejects(()=>preflight(trial('disabled-setting',{setting:false})),/Disabled setting/);});
  await check('disabled actual cache corruption is rejected',async()=>{await assert.rejects(()=>preflight(trial('disabled-corrupt',{corrupt:true})),/cache bytes differ/);});
  await check('disabled missing actual cache is rejected',async()=>{await assert.rejects(()=>preflight(trial('disabled-missing',{missing:true})),/Actual installed package absent/);});
  await check('enabled original byte/trust path still works synthetically',async()=>{const t=trial('enabled',{disabled:false,listed:true,active:true});await preflight(t);assert(!t.calls.some(c=>c.method==='config/batchWrite'&&c.params.edits[0].keyPath==='plugins'));assert.deepEqual(t.config.plugins,t.initialPlugins);});
  await check('absent route rejects installed owned hook without config mutation',async()=>{const t=trial('absent-owned',{listed:true});t.row={condition:'absent'};await assert.rejects(()=>preflight(t),/active in control|Plugin present in absent profile/);assert(!t.calls.some(c=>c.method==='config/batchWrite'));});
  await check('auth cleanup is restricted to synthetic base',()=>{const profile=path.join(fixture,'auth-cleanup/profile');put(path.join(profile,'auth.json'),'synthetic-only');api.removeAuth(profile);assert(!fs.existsSync(path.join(profile,'auth.json')));assert.throws(()=>api.removeAuth(path.dirname(fixture)),/Cleanup outside/);});
  assert.equal(sha(fs.readFileSync(legacy)),legacyBefore);console.log(JSON.stringify({offline_only:true,source_sha256:sha(source),checks:checks.length,results:checks,native_commands_executed:0,synthetic_version_reads:syntheticVersionReads,model_or_provider_calls:0,real_credentials_read:false,historical_ledger_unchanged:true}));
}
function cleanup(){const paths=[];function walk(dir){assert(path.resolve(dir).startsWith(fixture));for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);assert(!e.isSymbolicLink());if(e.isDirectory())walk(p);else fs.unlinkSync(p);}paths.push(dir);}walk(fixture);for(const p of paths)fs.rmdirSync(p);}
main().catch(e=>{console.error(e.stack);process.exitCode=1;}).finally(cleanup);
