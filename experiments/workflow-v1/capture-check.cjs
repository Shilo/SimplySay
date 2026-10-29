// No host/model calls. Privacy/phase regression checks for the transport only.
'use strict';
const assert=require('node:assert/strict'),{publicEvent}=require('./capture.cjs');
const {forbiddenCommand,historicalUsage}=require('./run.cjs');
const hidden='DO_NOT_PERSIST_PRIVATE_CONTENT';
const fixtures=[
  {method:'item/completed',params:{threadId:'t',turnId:'u',item:{id:'a',type:'agentMessage',phase:'commentary',text:'A useful finding.',reasoning:hidden}}},
  {method:'turn/completed',params:{threadId:'t',turn:{id:'u',status:'completed',items:[{type:'reasoning',text:hidden}]}}},
  {method:'thread/started',params:{thread:{id:'t',turns:[{items:[{text:hidden}]}]}}},
  {method:'item/completed',params:{threadId:'t',item:{type:'reasoning',text:hidden}}},
  {method:'item/reasoning/summaryTextDelta',params:{delta:hidden}},
  {method:'hook/completed',params:{threadId:'t',run:{id:'h',status:'completed',entries:[{kind:'context',text:hidden}]}}},
  {id:9,method:'item/commandExecution/requestApproval',params:{private:hidden}},
  {method:'item/completed',params:{threadId:'t',turnId:'u',item:{id:'f',type:'agentMessage',phase:'final_answer',text:'Complete.'}}},
];
const outputs=fixtures.map(publicEvent);assert(!JSON.stringify(outputs).includes(hidden));assert.equal(outputs[0].item.phase,'commentary');assert.equal(outputs[7].item.phase,'final_answer');assert.equal(outputs[3],null);assert.equal(outputs[4],null);assert.equal(outputs[6].kind,'blocked-request');assert.equal(outputs[1].status,'completed');
assert.equal(publicEvent({method:'item/started',params:{item:{type:'collabAgentToolCall'}}}).kind,'unexpected-delegation');
const rejected=publicEvent({method:'item/completed',params:{item:{type:'agentMessage',phase:'analysis',text:hidden}}});assert.equal(rejected.kind,'invalid-public-message');assert(!JSON.stringify(rejected).includes(hidden));assert.equal(publicEvent({method:'item/completed',params:{item:{type:'agentMessage',text:{hidden}}}}).kind,'invalid-public-message');
assert(forbiddenCommand('codex app-server --listen stdio://'));assert(forbiddenCommand('claude -p example'));assert(!forbiddenCommand('node tools/check-evidence.cjs'));
const old=new Set(['past']);assert(historicalUsage({kind:'usage',thread:'t',turn:'past'},'t',old));assert(!historicalUsage({kind:'usage',thread:'t',turn:'current'},'t',old));assert(!historicalUsage({kind:'usage',thread:'other',turn:'past'},'t',old));assert(!historicalUsage({kind:'item',thread:'t',turn:'past'},'t',old));
console.log(JSON.stringify({offline_only:true,checks:18,passed:true,private_nested_content_excluded:true}));
