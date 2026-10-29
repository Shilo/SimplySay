// Offline reproduction of the actual resume-notification race; no model/host.
'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {turn}=require('./run.cjs');
async function scenario(name,events,check,admissionEvent){
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ss-resume-capture-'));
  const monitor={current:null,unexpected:new Set(),historyTurnIds:new Set(['completed-before-resume'])};
  const emit=e=>monitor.current(e),finish=(alreadyStarted=false)=>{
    if(!alreadyStarted)emit({kind:'started',thread:'same-chat',turn:'new-turn'});
    emit({kind:'item',thread:'same-chat',turn:'new-turn',item:{id:'public-final',type:'agent_message',phase:'final_answer',text:'Complete response.'}});
    emit({kind:'completed',thread:'same-chat',turn:'new-turn',status:'completed'});
  };
  const rpc={async request(method){if(method==='turn/interrupt')return {};assert.equal(method,'turn/start');events({emit,finish});return {turn:{id:'new-turn'}};}};
  try{const r=await turn(rpc,dir,'Synthetic local capture probe',1,'same-chat',monitor,async()=>{if(admissionEvent)emit(admissionEvent);return {ordinaryUsageAllowed:true};});check(r,dir,monitor);return {name,pass:true};}
  finally{for(const e of fs.readdirSync(dir,{withFileTypes:true})){assert(e.isFile()&&!e.isSymbolicLink());fs.unlinkSync(path.join(dir,e.name));}fs.rmdirSync(dir);}
}
const oldUsage={kind:'usage',thread:'same-chat',turn:'completed-before-resume',usage:{last:{outputTokens:370}}};
function success(r,dir){assert(!r.failed,r.error);assert.equal(r.accepted_turn_id,'new-turn');assert(r.continuation_observed);assert.equal(fs.readFileSync(path.join(dir,'turn-2-final.txt'),'utf8'),'Complete response.');}
function rejected(r){assert(r.failed);assert(r.error);assert.equal(r.ignored_historical_usage_snapshots||0,0);}
(async()=>{
  const cases=[];
  cases.push(await scenario('historical usage before acceptance',({emit,finish})=>{emit(oldUsage);setTimeout(finish,0);},(r,d)=>{success(r,d);assert.equal(r.ignored_historical_usage_snapshots,1);}));
  cases.push(await scenario('historical usage during admission',({finish})=>setTimeout(finish,0),(r,d)=>{success(r,d);assert.equal(r.ignored_historical_usage_snapshots,1);},oldUsage));
  cases.push(await scenario('late historical usage preserves current usage',({emit,finish})=>setTimeout(()=>{emit({kind:'started',thread:'same-chat',turn:'new-turn'});emit(oldUsage);emit({kind:'usage',thread:'same-chat',turn:'new-turn',usage:{last:{outputTokens:42}}});finish(true);},0),(r,d)=>{success(r,d);assert.equal(r.ignored_historical_usage_snapshots,1);assert.equal(r.usage.last.outputTokens,42);}));
  cases.push(await scenario('other chat is rejected',({emit})=>emit({...oldUsage,thread:'other-chat'}),(r,d,m)=>{rejected(r);assert(m.unexpected.has('other-chat'));}));
  cases.push(await scenario('unknown turn is rejected',({emit})=>emit({...oldUsage,turn:'unknown-turn'}),rejected));
  cases.push(await scenario('historical completion is rejected',({emit})=>emit({kind:'completed',thread:'same-chat',turn:'completed-before-resume',status:'completed'}),rejected));
  cases.push(await scenario('historical message is not silently ignored',({emit})=>emit({kind:'item',thread:'same-chat',turn:'completed-before-resume',item:{id:'old-public',type:'agent_message',phase:'final_answer',text:'Old answer.'}}),rejected));
  console.log(JSON.stringify({offline_only:true,actual_race_reproduced:true,cases,passed:true,new_model_sessions:0}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
