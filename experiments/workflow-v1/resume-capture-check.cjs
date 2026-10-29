// Offline reproduction of the actual resume-notification race; no model/host.
'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {turn}=require('./run.cjs');
(async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ss-resume-capture-'));
  const monitor={current:null,unexpected:new Set(),historyTurnIds:new Set(['completed-before-resume'])};
  const rpc={async request(method){assert.equal(method,'turn/start');monitor.current({kind:'usage',thread:'same-chat',turn:'completed-before-resume',usage:{last:{outputTokens:370}}});setTimeout(()=>{monitor.current({kind:'started',thread:'same-chat',turn:'new-turn'});monitor.current({kind:'item',thread:'same-chat',turn:'new-turn',item:{id:'public-final',type:'agent_message',phase:'final_answer',text:'Complete response.'}});monitor.current({kind:'completed',thread:'same-chat',turn:'new-turn',status:'completed'});},0);return {turn:{id:'new-turn'}};}};
  try{const r=await turn(rpc,dir,'Synthetic local capture probe',1,'same-chat',monitor,async()=>({ordinaryUsageAllowed:true}));assert(!r.failed,r.error);assert.equal(r.accepted_turn_id,'new-turn');assert(r.continuation_observed);assert.equal(r.ignored_historical_usage_snapshots,1);assert.equal(fs.readFileSync(path.join(dir,'turn-2-final.txt'),'utf8'),'Complete response.');console.log(JSON.stringify({offline_only:true,actual_race_reproduced:true,passed:true,new_model_sessions:0}));}
  finally{for(const e of fs.readdirSync(dir,{withFileTypes:true})){assert(e.isFile()&&!e.isSymbolicLink());fs.unlinkSync(path.join(dir,e.name));}fs.rmdirSync(dir);}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
