// Fixed final-round adapter: reuses reviewed CodexRpc, native package and CLI route.
// Not a general runner, new evaluation framework or installed runtime file.
'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process'),crypto=require('node:crypto'),readline=require('node:readline');
const {CodexRpc}=require('../pilot/codex-rpc.cjs');
const ROOT=path.resolve(__dirname,'../..');
const BASE=path.join(os.homedir(),'AppData/Local/Temp/agent-eval-final-20261028');
const OLD=path.join(os.homedir(),'AppData/Local/Temp/agent-eval-20261028/codex');
const BINARY=path.join(os.homedir(),'AppData/Roaming/npm/node_modules/@openai/codex/node_modules/@openai/codex-win32-x64/vendor/x86_64-pc-windows-msvc/bin/codex.exe');
const LEDGER=path.join(ROOT,'.local/final-pilot-sessions.json');
const SELECTOR='ss-feasibility@ss-feasibility-catalog';
const PACKAGE_FILES=['.codex-plugin/plugin.json','hooks/hooks.json','session-start.cjs','policy.txt'];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=p=>fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
const json=p=>JSON.parse(read(p));
const put=(p,v)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,typeof v==='string'||Buffer.isBuffer(v)?v:JSON.stringify(v,null,2)+'\n');};
const env={...process.env};
for(const key of Object.keys(env))if(/^CODEX_|API_KEY|AUTH_TOKEN|ACCESS_TOKEN|GITHUB_TOKEN|GH_TOKEN/.test(key))delete env[key];
const inputs=['experiments/final-pilot/case.json','experiments/final-pilot/run.cjs','experiments/final-pilot/assess-round.cjs','experiments/final-pilot/allocation.json','docs/final-pilot-plan.md','experiments/pilot/codex-rpc.cjs','experiments/pilot/export-evidence.cjs','experiments/pilot/policy.txt','experiments/pilot/minimal.txt','experiments/assessment-v2/assess.cjs','experiments/assessment-v2/calibration-spec.json','experiments/assessment-v2/results/controller-map.json',...['review-1','review-2'].flatMap(id=>[`experiments/assessment-v2/results/${id}/packet.json`,`experiments/assessment-v2/results/${id}/response-template.json`])];
const fingerprints=()=>Object.fromEntries([...inputs.map(p=>[p,hash(fs.readFileSync(path.join(ROOT,p)))]),...PACKAGE_FILES.map(p=>['prior-reviewed-package/'+p,hash(fs.readFileSync(path.join(OLD,'catalog/plugin',p)))])]);
function reserve(id,role){
  const lock=LEDGER+'.lock';let fd;
  try{fd=fs.openSync(lock,'wx');const ledger=json(LEDGER);
    if(ledger.prior_used!==18||ledger.starts.length>=6||ledger.starts.some(x=>x.id===id))throw Error('Final session allocation exhausted or duplicate');
    ledger.starts.push({id,role,status:'reserved-before-launch',reserved_utc:new Date().toISOString()});put(LEDGER,ledger);
  }finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);}}
}
function native(profile,cwd,args){const r=cp.spawnSync(BINARY,args,{cwd,env:{...env,CODEX_HOME:profile},encoding:'utf8',timeout:30000,windowsHide:true});if(r.status!==0)throw Error('Native preflight command failed: '+args[0]+' '+args[1]+' (status '+r.status+')');return r.stdout;}
function safeInside(root,relative){const p=path.resolve(root,relative);if(!p.startsWith(path.resolve(root)+path.sep))throw Error('Path escaped neutral directory');return p;}
function config(condition){return `model = "gpt-6.1-sol"\nmodel_reasoning_effort = "low"\nforced_login_method = "chatgpt"\ncli_auth_credentials_store = "file"\nweb_search = "disabled"\nsandbox_mode = "workspace-write"\napproval_policy = "never"\n${condition==='minimal'?'developer_instructions = '+JSON.stringify(read(path.join(ROOT,'experiments/pilot/minimal.txt')))+'\n':''}[sandbox_workspace_write]\nnetwork_access = false\nexclude_tmpdir_env_var = true\nexclude_slash_tmp = true\n[windows]\nsandbox = "mxc"\n[features]\napps = false\nmulti_agent = false\n[agents]\nenabled = false\nmax_threads = 1\nmax_depth = 0\n[plugins._default]\nenabled = false\n`;}
function removeAuth(profile){const p=safeInside(profile,'auth.json');if(!p.startsWith(path.resolve(BASE)+path.sep))throw Error('Cleanup escaped round');if(fs.existsSync(p))fs.unlinkSync(p);}
function quota(x){const limit=x?.rateLimits;return limit?{primary:limit.primary,secondary:limit.secondary,limitId:limit.limitId}: {unavailable:true};}
async function preflight(trial,profile,cwd,condition){
  const credentials=json(path.join(os.homedir(),'.codex/auth.json'));
  if(credentials.auth_mode!=='chatgpt'||credentials.OPENAI_API_KEY||!credentials.tokens?.access_token)throw Error('Existing-subscription-only authentication gate failed');
  put(path.join(profile,'auth.json'),{auth_mode:credentials.auth_mode,tokens:credentials.tokens,last_refresh:credentials.last_refresh});
  const version=native(profile,cwd,['--version']).trim();if(version!=='codex-cli 0.163.0')throw Error('Pinned host version changed; stop, no migration');
  if(condition==='enabled'){
    native(profile,cwd,['plugin','marketplace','add',path.join(OLD,'catalog'),'--json']);native(profile,cwd,['plugin','add',SELECTOR,'--json']);
  }
  const rpc=new CodexRpc(BINARY,profile,cwd,env);let evidence;
  try{await rpc.initialize();let hooks=await rpc.request('hooks/list',{cwds:[cwd]});
    const owned=hooks.data.flatMap(x=>x.hooks).filter(h=>h.pluginId===SELECTOR);
    if(condition==='enabled'){
      if(owned.length!==1)throw Error('Expected one candidate startup hook');
      const h=owned[0],command=`node -e "require(process.env.PLUGIN_ROOT + '/session-start.cjs')"`;
      if(h.command!==command||h.matcher!=='startup'||h.eventName!=='sessionStart'||h.timeoutSec!==10||h.handlerType!=='command'||h.isManaged)throw Error('Unexpected hook definition');
      const installed=path.resolve(path.dirname(h.sourcePath),'..');if(!installed.startsWith(BASE+path.sep))throw Error('Installed plugin outside fresh profile');
      for(const relative of PACKAGE_FILES)if(!fs.readFileSync(path.join(installed,relative)).equals(fs.readFileSync(path.join(OLD,'catalog/plugin',relative))))throw Error('Installed bytes differ');
      if(hash(fs.readFileSync(path.join(installed,'policy.txt')))!==hash(fs.readFileSync(path.join(ROOT,'experiments/pilot/policy.txt'))))throw Error('Candidate policy changed');
      await rpc.request('config/batchWrite',{edits:[{keyPath:'hooks.state',value:{[h.key]:{trusted_hash:h.currentHash}},mergeStrategy:'upsert'}],filePath:path.join(profile,'config.toml'),reloadUserConfig:true});
      hooks=await rpc.request('hooks/list',{cwds:[cwd]});if(!hooks.data.flatMap(x=>x.hooks).some(hook=>hook.key===h.key&&hook.trustStatus==='trusted'))throw Error('Reviewed hook trust not effective');
    }else if(owned.length)throw Error('Unexpected candidate hook in control');
    const effective=await rpc.request('config/read',{includeLayers:true,cwd});
    const c=effective.config;
    if(c.features?.apps!==false||c.features?.multi_agent!==false||c.agents?.enabled!==false||c.plugins?._default?.enabled!==false)throw Error('Isolation feature readback failed');
    if(c.sandbox_mode!=='workspace-write'||c.windows?.sandbox!=='mxc'||c.sandbox_workspace_write?.network_access!==false||c.approval_policy!=='never'||c.forced_login_method!=='chatgpt')throw Error('Native isolation/subscription readback failed');
    let limits;try{limits=quota(await rpc.request('account/rateLimits/read',{}));}catch{limits={unavailable:true};}
    evidence={version,condition,subscription_only:true,hooks_effective:hooks,config_hash:hash(fs.readFileSync(path.join(profile,'config.toml'))),effective_isolation:{apps:c.features.apps,multi_agent:c.features.multi_agent,agents:c.agents.enabled,default_plugins:c.plugins._default.enabled},quota_before:limits};
  }finally{rpc.close();}
  put(path.join(trial,'preflight.json'),evidence);return evidence;
}
async function turn(trial,profile,cwd,prompt,index,thread){
  const final=path.join(trial,`turn-${index+1}-final.txt`),events=path.join(trial,`turn-${index+1}-events.jsonl`),stderr=path.join(trial,`turn-${index+1}-stderr.txt`);
  const args=['--no-daemon','exec',...(thread?['resume']:[]),'--skip-git-repo-check','--json','-o',final,...(thread?[thread]:['-C',cwd]),'-'];
  put(events,'');put(stderr,'');put(path.join(trial,`turn-${index+1}-prompt.txt`),prompt);
  const result={turn:index+1,expected_thread:thread||null,thread:null,observed_thread:null,exit_code:null,error:null,timed_out:false,usage:null};let child,timer;
  const stop=()=>{if(child?.pid)cp.spawnSync('taskkill.exe',['/PID',String(child.pid),'/T','/F'],{windowsHide:true,timeout:10000});};
  try{child=cp.spawn(BINARY,args,{cwd,env:{...env,CODEX_HOME:profile},windowsHide:true,stdio:['pipe','pipe','pipe']});
    const captureFailure=e=>{result.error=e.message;stop();};
    child.stdout.on('data',b=>{try{fs.appendFileSync(events,b);}catch(e){captureFailure(e);}});child.stderr.on('data',b=>{try{fs.appendFileSync(stderr,b);}catch(e){captureFailure(e);}});
    child.stdout.on('error',captureFailure);child.stderr.on('error',captureFailure);
    readline.createInterface({input:child.stdout}).on('line',line=>{let e;try{e=JSON.parse(line);}catch{return;}
      if(e.type==='thread.started'){result.thread=e.thread_id;result.observed_thread=e.thread_id;if(thread&&e.thread_id!==thread){result.error='Resume returned a different conversation; stop and reconcile before any further launch';stop();}}
      if(e.type==='turn.completed')result.usage=e.usage;
      const command=e.item?.command;if(typeof command==='string'&&/\b(?:codex|claude)(?:\.exe)?\s+(?:exec|resume|fork|chat|[-])/i.test(command)){result.error='Unexpected model-host command in subject';stop();}
    });
    child.stdin.on('error',e=>{result.error=e.message;stop();});
    timer=setTimeout(()=>{result.timed_out=true;stop();},180000);
    child.stdin.end(prompt);result.exit_code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',resolve);});
  }catch(e){result.error=e.message;stop();}finally{clearTimeout(timer);}
  if(!result.thread&&thread)result.thread=thread;
  result.continuation_observed=!!result.observed_thread&&(!thread||result.observed_thread===thread);
  if(!result.continuation_observed||result.exit_code!==0||result.error||result.timed_out||!fs.existsSync(final))result.failed=true;
  put(path.join(trial,`turn-${index+1}-result.json`),result);return result;
}
function freeze(){const target=path.join(__dirname,'freeze.json');if(fs.existsSync(target))throw Error('Final-round freeze already exists');
  put(target,{frozen_before_subjects:true,source_revision:cp.spawnSync('git',['rev-parse','HEAD'],{cwd:ROOT,encoding:'utf8'}).stdout.trim(),fingerprints:fingerprints(),host:'codex-cli 0.163.0',model:'gpt-6.1-sol',effort:'low',order:[['f22','minimal'],['f20','absent'],['f21','enabled']],turns_per_conversation:json(path.join(__dirname,'case.json')).turns.length,no_retries:true,no_native_delegation:true});
  console.log(JSON.stringify({frozen:target}));
}
async function run(id){const frozen=json(path.join(__dirname,'freeze.json'));if(JSON.stringify(frozen.fingerprints)!==JSON.stringify(fingerprints()))throw Error('Pretrial input/controller changed');
  const row=frozen.order.find(r=>r[0]===id);if(!row)throw Error('Unplanned subject');
  const trial=path.join(BASE,id),profile=path.join(trial,'profile'),cwd=path.join(trial,'task');if(fs.existsSync(trial))throw Error('Refuse rerun/reused profile');
  reserve(id,row[1]+'-subject');let result={id,condition:row[1],turns:[],failed:false};
  try{fs.mkdirSync(profile,{recursive:true});fs.mkdirSync(cwd);const task=json(path.join(__dirname,'case.json'));put(path.join(profile,'config.toml'),config(row[1]));
    for(const f of task.fixture_files)put(safeInside(cwd,f.path),f.content);
    await preflight(trial,profile,cwd,row[1]);let thread;
    for(let n=0;n<task.turns.length;n++){const r=await turn(trial,profile,cwd,task.turns[n].prompt,n,thread);result.turns.push(r);
      const snapshot=path.join(trial,`turn-${n+1}-files`);fs.mkdirSync(snapshot);
      // Case fixture/output names only; never traverse profile/session/auth directories.
      for(const name of new Set([...task.fixture_files.map(f=>f.path),...(task.capture_files||task.expected_files||[]).map(f=>typeof f==='string'?f:f.path)])){const source=safeInside(cwd,name);if(fs.existsSync(source))put(safeInside(snapshot,name),fs.readFileSync(source));}
      if(r.failed){result.failed=true;break;}thread=r.thread;
    }
    const rpc=new CodexRpc(BINARY,profile,cwd,env);try{await rpc.initialize();result.quota_after=quota(await rpc.request('account/rateLimits/read',{}));}catch{result.quota_after={unavailable:true};}finally{rpc.close();}
  }catch(e){result.failed=true;result.error=e.message;}
  finally{removeAuth(profile);result.auth_copy_removed=!fs.existsSync(path.join(profile,'auth.json'));put(path.join(trial,'result.json'),result);const ledger=json(LEDGER);ledger.starts.find(r=>r.id===id).status=result.failed?'failed':'completed';put(LEDGER,ledger);}
  console.log(JSON.stringify(result));
}
if(require.main===module){const [action,id]=process.argv.slice(2);(async()=>{if(action==='freeze')freeze();else if(action==='run')await run(id);else throw Error('Use freeze or run f20/f21/f22');})().catch(e=>{console.error(e.message);process.exitCode=1;});}
module.exports={config,fingerprints,writeCapture:put,safeInside};
