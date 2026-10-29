// Development-only translation into the existing assessment capture format.
// Allowlist public fields before persistence. Never serialize a native turn/thread.
'use strict';
const crypto=require('node:crypto');
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
function publicEvent(value){
  const p=value.params||{},m=value.method,thread=p.threadId;
  if(value.id!==undefined&&m)return {kind:'blocked-request',method:m,id:value.id};
  if(m==='thread/started')return {kind:'thread',thread:p.thread?.id};
  if(m==='turn/started')return {kind:'started',thread,turn:p.turn?.id};
  if(m==='turn/completed')return {kind:'completed',thread,turn:p.turn?.id,status:p.turn?.status,error:p.turn?.error?.message||null};
  if(m==='thread/tokenUsage/updated')return {kind:'usage',thread,turn:p.turnId,usage:{last:usage(p.tokenUsage?.last),total:usage(p.tokenUsage?.total)}};
  if(m==='hook/started'||m==='hook/completed'){
    const h=p.run||{};return {kind:'hook',thread,turn:p.turnId,method:m,hook:{id:h.id,eventName:h.eventName,sourcePath:h.sourcePath,source:h.source,status:h.status,statusMessage:h.statusMessage,scope:h.scope,handlerType:h.handlerType,executionMode:h.executionMode,durationMs:h.durationMs,entries:(h.entries||[]).map(e=>({kind:e.kind,text_sha256:sha(e.text||'')}))}};
  }
  if(m==='error')return {kind:'error',thread,turn:p.turnId,message:p.error?.message||'Native error',willRetry:!!p.willRetry};
  if(m!=='item/started'&&m!=='item/completed')return null;
  const i=p.item||{};
  if(i.type==='collabAgentToolCall'||i.type==='collabToolCall')return {kind:'unexpected-delegation',thread,turn:p.turnId};
  if(m==='item/started')return i.type==='commandExecution'?{kind:'command-start',thread,turn:p.turnId,command:i.command}:null;
  let item;
  if(i.type==='agentMessage'){
    if(typeof i.text!=='string'||(i.phase!=null&&!['commentary','partial_answer','final_answer'].includes(i.phase)))return {kind:'invalid-public-message',thread,turn:p.turnId};
    item={id:i.id,type:'agent_message',text:i.text,phase:i.phase??null};
  }
  if(i.type==='commandExecution')item={id:i.id,type:'command_execution',command:i.command,aggregated_output:i.aggregatedOutput||'',exit_code:i.exitCode,status:i.status};
  if(i.type==='fileChange')item={id:i.id,type:'file_change',status:i.status,changes:(i.changes||[]).map(c=>({path:c.path,kind:c.kind,diff:c.diff}))};
  return item?{kind:'item',thread,turn:p.turnId,item}:null;
}
function usage(x){if(!x)return null;return Object.fromEntries(['inputTokens','cachedInputTokens','outputTokens','reasoningOutputTokens','cacheWriteInputTokens','totalTokens'].map(k=>[k,x[k]??0]));}
module.exports={publicEvent};
