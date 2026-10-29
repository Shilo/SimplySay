// New-phase data/format adapter only. Historical grading and runtime stay intact.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const base=require('../development-v1/assess.cjs');
const {validateReview,calibrated}=require('../assessment-v2/assess.cjs');
const ROOT=path.resolve(__dirname,'../..'),CAL=path.join(__dirname,'calibration.json');
const LEGACY=['clarity','relevance','filler','repetition','unnecessary_jargon','excessive_updates'],GOALS=[...LEGACY,'unnecessary_explanation'],CHOICES=['left','right','tie','unknown'],TIES=['both_satisfactory','both_problem','insufficient_evidence'];
const read=p=>fs.readFileSync(p),json=p=>JSON.parse(read(p).toString().replace(/^\uFEFF/,'')),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),clone=x=>structuredClone(x);
const put=(p,x)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,Buffer.isBuffer(x)||typeof x==='string'?x:JSON.stringify(x,null,2)+'\n');};
const text=x=>typeof x==='string'?x:Array.isArray(x)?x.map(text).join('\n'):x&&typeof x==='object'?Object.values(x).map(text).join('\n'):'';
const ordinary=c=>[c.ordinary_chat,...c.progress,c.complete_final||''].join('\n');
const finalText=c=>[c.ordinary_chat,c.complete_final||''].join('\n'),progressText=c=>c.progress.join('\n');
const surfaceText=(c,s)=>s==='final'?finalText(c):s==='progress'?progressText(c):s==='both'?ordinary(c):'';
const note=()=>({choice:'unknown',surface:'not-observed',tie_basis:'insufficient_evidence',rationale:'',evidence:[]});
function timeScreen(answer,clock='3:20 pm'){
  const forms=clock==='3:20 pm'?[/\b3[:.]20\s*(?:p\.?\s*m\.?)?\b/i,/\b15:20\b/,/\btwenty[ -]past[ -]three\b/i]:clock==='9:55 am'?[/\b0?9[:.]55\s*(?:a\.?\s*m\.?)?\b/i,/\bfive[ -]to[ -]ten\b/i]:null;
  assert(forms,'Unsupported request-derived clock check');
  return {status:forms.some(r=>r.test(answer))?'positive-lexical-evidence':'unverified',expected:clock+' or an equivalent correct expression',recognized_correct_form:forms.some(r=>r.test(answer)),clock_tokens:answer.match(/\b\d{1,2}[:.]\d{2}\s*(?:[ap]\.?\s*m\.?)?/gi)||[],limitation:'A conservative text screen, not a semantic pass. Unrecognized equivalent wording or contradictions require independent review.'};
}
function prepare(manifestFile,out,cohort){
  assert(!fs.existsSync(path.join(out,'reader-freeze.json')),'Refuse packet overwrite');
  const baseOut=path.join(out,'base');base.prepare(manifestFile,baseOut,cohort);
  const manifest=json(path.resolve(ROOT,manifestFile));
  const calibrationFile=path.resolve(ROOT,manifest.calibration_file||path.relative(ROOT,CAL));
  assert(calibrationFile.startsWith(__dirname+path.sep),'Calibration must remain inside this experimental adapter');
  const calibration=json(calibrationFile),map=json(path.join(baseOut,'controller-map.json')),det=json(path.join(baseOut,'deterministic.json')),jobs=[];
  const chatScreens={},clockCases={'reader-a-shared-files':{turn:'a3_simple_time',clock:'3:20 pm'},'reader-c-door-scanner':{turn:'c3_brief_time',clock:'9:55 am'}};
  for(const s of manifest.subjects){const c=base.capture(s),spec=clockCases[c.task.id];if(spec){const t=c.turns.find(t=>t.id===spec.turn);chatScreens[s.id]=t?timeScreen(t.final,spec.clock):{status:'unverified',reason:'Requested clock-answer capture missing'};}}
  for(let n=1;n<=2;n++){
    const id=cohort+'-review-'+n,packet=json(path.join(baseOut,id,'packet.json')),oldTemplate=json(path.join(baseOut,id,'response-template.json')),m=map.reviewers[id];
    const pairs=n===2?[...m.pairs].reverse():[...m.pairs],newCandidates=[];
    calibration.diagnostics.forEach((d,i)=>{
      const aliases={good:'sample-'+sha(cohort+':'+n+':'+d.id+':g').slice(0,12),mutant:'sample-'+sha(cohort+':'+n+':'+d.id+':m').slice(0,12)},goodSource='diagnostic-'+d.id+'-good',badSource='diagnostic-'+d.id+'-mutant',flip=(i+n)%2===0;
      for(const side of ['good','mutant'])newCandidates.push({alias:aliases[side],case_id:d.task_id,...clone(d[side]),complete_final:d[side].ordinary_chat});
      packet.tasks[d.task_id]=clone(d.task);
      const p={key:'diagnostic-'+d.id,kind:'diagnostic-control',diagnostic_id:d.id,pair_id:'pair-'+sha(cohort+':'+n+':'+d.id).slice(0,12),left:aliases[flip?'mutant':'good'],right:aliases[flip?'good':'mutant'],left_source:flip?badSource:goodSource,right_source:flip?goodSource:badSource,good_source:goodSource};
      pairs.splice(Math.min(pairs.length,(i+1)*2),0,p);
    });
    if(n===2)pairs.reverse();
    packet.candidates.push(...(n===2?newCandidates.reverse():newCandidates));
    packet.pairs=pairs.map(({pair_id,left,right})=>({pair_id,left,right}));
    packet.instructions.push('Return the supplied wrapper: review uses the original strict template; goal_notes records each goal separately. These required wrapper/goal objects are part of this template. The no-rich-objects restriction applies to evidence/issues STRING array entries, not the required template structure. Evidence arrays contain exact sample quotations. Issues and rationales explain judgments in your own words. Never put side labels inside an evidence quotation.',
      'Clarity means readability/ease of understanding for this request and audience. Separately judge unnecessary explanation: relevant background can still be unnecessary for the current question; required depth and causal reasoning remain benefits. Do not infer all goals from an overall preference.',
      'For every goal identify whether the decisive content is ordinary final answer, progress, both, or not observed. Quote the declared surface only; both needs support from final and progress. Do not score requested copy-ready text or file contents as chat verbosity. Distinguish host-required message presence from optional narration. A truthful task-related update still needs reader benefit before completion; a decision, blocker, consequential warning or changed expectation can justify interruption.',
      'For tie choices distinguish both_satisfactory, both_problem or insufficient_evidence. Quote both sides when claiming both retain a problem. Unknown or missing evidence is not satisfactory. Fewer words, fewer updates, silence or missing mandatory communication alone is not improvement. Repeated snapshot views are not repeated user messages.');
    const sample=oldTemplate.pair_reviews[0],review={...oldTemplate,pair_reviews:pairs.map(p=>({...clone(sample),pair_id:p.pair_id}))};
    const template={schema_version:1,review,goal_notes:pairs.map(p=>({pair_id:p.pair_id,goals:Object.fromEntries(GOALS.map(g=>[g,note()]))}))};
    put(path.join(out,id,'packet.json'),packet);put(path.join(out,id,'response-template.json'),template);
    map.reviewers[id]={pairs,packet_sha256:sha(read(path.join(out,id,'packet.json')))};
    jobs.push({reviewer_id:id,packet:path.join(out,id,'packet.json'),template:path.join(out,id,'response-template.json'),output:path.join(out,'reviews',id+'.json')});
  }
  put(path.join(out,'controller-map.json'),map);put(path.join(out,'deterministic.json'),det);put(path.join(out,'chat-content-screens.json'),chatScreens);put(path.join(out,'jobs.json'),jobs);
  put(path.join(out,'reader-freeze.json'),{adapter_sha256:sha(read(__filename)),calibration_file:path.relative(ROOT,calibrationFile).replaceAll('\\','/'),calibration_sha256:sha(read(calibrationFile)),validator_sha256:sha(read(path.join(ROOT,'experiments/assessment-v2/assess.cjs'))),base_adapter_sha256:sha(read(path.join(ROOT,'experiments/development-v1/assess.cjs'))),checks_sha256:sha(read(path.join(ROOT,'experiments/development-v1/cases/checks.cjs'))),manifest_sha256:sha(read(path.resolve(ROOT,manifestFile))),map_sha256:sha(read(path.join(out,'controller-map.json'))),deterministic_sha256:sha(read(path.join(out,'deterministic.json'))),chat_screens_sha256:sha(read(path.join(out,'chat-content-screens.json'))),reviewers:map.reviewers});
  console.log(JSON.stringify({prepared:cohort,real_pairs:map.pairs.length,legacy_controls:4,new_diagnostics:calibration.diagnostics.length,reviewers:2,model_sessions_started:0}));
}
function validate(wrapper,packet){
  assert.deepEqual(Object.keys(wrapper).sort(),['goal_notes','review','schema_version']);assert.equal(wrapper.schema_version,1);validateReview(wrapper.review,packet);
  assert(Array.isArray(wrapper.goal_notes));assert.deepEqual(wrapper.goal_notes.map(p=>p.pair_id).sort(),packet.pairs.map(p=>p.pair_id).sort());
  for(const entry of wrapper.goal_notes){
    assert.deepEqual(Object.keys(entry).sort(),['goals','pair_id']);assert.deepEqual(Object.keys(entry.goals).sort(),[...GOALS].sort());
    const pair=packet.pairs.find(p=>p.pair_id===entry.pair_id),legacy=wrapper.review.pair_reviews.find(p=>p.pair_id===entry.pair_id),left=packet.candidates.find(c=>c.alias===pair.left),right=packet.candidates.find(c=>c.alias===pair.right),lt=ordinary(left),rt=ordinary(right);
    for(const[g,n]of Object.entries(entry.goals)){
      assert.deepEqual(Object.keys(n).sort(),['choice','evidence','rationale','surface','tie_basis']);assert(CHOICES.includes(n.choice));assert(['final','progress','both','not-observed'].includes(n.surface));assert(typeof n.rationale==='string'&&n.rationale.trim());
      const sl=surfaceText(left,n.surface),sr=surfaceText(right,n.surface);
      assert(Array.isArray(n.evidence)&&n.evidence.every(q=>typeof q==='string'&&q.trim()&&(sl.includes(q)||sr.includes(q))),'Companion evidence must quote its declared surface exactly');
      if(n.surface==='both')assert(n.evidence.some(q=>finalText(left).includes(q)||finalText(right).includes(q))&&n.evidence.some(q=>progressText(left).includes(q)||progressText(right).includes(q)),'Both-surface claim needs final and progress evidence');
      if(LEGACY.includes(g))assert.equal(n.choice,legacy.communication.dimensions[g],'Companion must not alter the original dimension choice');
      if(g==='excessive_updates'&&n.choice!=='unknown'&&n.tie_basis!=='insufficient_evidence')assert(['progress','both'].includes(n.surface),'Progress assessment needs its own surface');
      if(n.choice==='tie')assert(TIES.includes(n.tie_basis));else if(n.choice==='unknown')assert.equal(n.tie_basis,'insufficient_evidence');else{assert.equal(n.tie_basis,null);assert(n.evidence.length,'Preference needs evidence');}
      if(n.choice==='tie'&&n.tie_basis==='both_problem')assert(n.evidence.some(q=>sl.includes(q))&&n.evidence.some(q=>sr.includes(q)),'Both-problem tie needs evidence from both sides on the declared surface');
      if(n.surface==='not-observed')assert(n.choice==='unknown'||n.tie_basis==='insufficient_evidence');
    }
  }
  return true;
}
function diagnose(wrapper,mapping,packet,calibrationFile=CAL){
  const legacy=calibrated(wrapper.review,mapping),diagnostics={},calibration=json(calibrationFile);
  for(const m of mapping.pairs.filter(p=>p.kind==='diagnostic-control')){
    const d=calibration.diagnostics.find(d=>d.id===m.diagnostic_id),p=wrapper.review.pair_reviews.find(p=>p.pair_id===m.pair_id),notes=wrapper.goal_notes.find(p=>p.pair_id===m.pair_id).goals,good=m.left_source===m.good_source?'left':'right',bad=good==='left'?'right':'left',mp=packet.pairs.find(p=>p.pair_id===m.pair_id),goodText=ordinary(packet.candidates.find(c=>c.alias===mp[good])),badText=ordinary(packet.candidates.find(c=>c.alias===mp[bad]));
    const quotes=[...p.communication.evidence,...d.expected.goals.flatMap(g=>notes[g].evidence)],confidence=p.communication.confidence!=='low';let pass;
    if(d.expected.type==='style'){
      const specific=quotes.some(q=>q.trim().length>=8&&!goodText.includes(q)&&d.expected.mutant_changed_text.some(s=>s.includes(q)||q.includes(s)));
      pass=p.left_information.status==='preserved'&&p.right_information.status==='preserved'&&p.communication.preference===good&&d.expected.goals.every(g=>notes[g].choice===good)&&specific&&confidence;
    }else{
      const specific=[...p[good+'_information'].evidence,...quotes].some(q=>q.trim().length>=8&&!badText.includes(q)&&(d.expected.good_required_quote.includes(q)||q.includes(d.expected.good_required_quote)));
      pass=p[good+'_information'].status==='preserved'&&p[bad+'_information'].status==='omitted-essential'&&/ask|choice|question|decision|archiv|cancel/i.test(p[bad+'_information'].issues.join(' '))&&p.communication.preference!==bad&&p.communication.preference!=='unknown'&&notes.excessive_updates.choice!==bad&&notes.excessive_updates.choice!=='unknown'&&specific&&confidence;
    }
    diagnostics[d.id]={pass:Boolean(pass),type:d.expected.type,eligible_claims:d.expected.eligibility,confidence:p.communication.confidence};
  }
  const pass=id=>diagnostics[id]?.pass===true,eligible={information:legacy.pass&&pass('d4'),clarity:legacy.pass&&pass('d3'),relevance:legacy.pass,filler:legacy.pass&&pass('d2'),repetition:legacy.pass&&pass('d2'),unnecessary_jargon:legacy.pass&&pass('d3'),excessive_updates:legacy.pass&&pass('d1')&&pass('d4'),unnecessary_explanation:legacy.pass&&pass('d2')};
  return {legacy,diagnostics,eligible_claims:eligible};
}
function eligibleOnSurface(calibration,goal,surface){
  if(!calibration.eligible_claims[goal])return false;
  // This prospective diagnostic concerns optional payload, not required presence.
  // Final-only claims continue to use the unchanged final-answer controls.
  if(['progress','both'].includes(surface)&&['excessive_updates','filler','repetition','unnecessary_explanation'].includes(goal)&&calibration.diagnostics.d5)return calibration.diagnostics.d5.pass;
  return true;
}
function report(out){
  const freeze=json(path.join(out,'reader-freeze.json')),map=json(path.join(out,'controller-map.json'));
  const calibrationFile=freeze.calibration_file?path.resolve(ROOT,freeze.calibration_file):CAL;
  assert(calibrationFile.startsWith(__dirname+path.sep),'Calibration must remain inside this experimental adapter');
  for(const[p,h]of[[__filename,freeze.adapter_sha256],[calibrationFile,freeze.calibration_sha256],[path.join(ROOT,'experiments/assessment-v2/assess.cjs'),freeze.validator_sha256],[path.join(ROOT,'experiments/development-v1/assess.cjs'),freeze.base_adapter_sha256],[path.join(ROOT,'experiments/development-v1/cases/checks.cjs'),freeze.checks_sha256],[path.join(out,'controller-map.json'),freeze.map_sha256],[path.join(out,'deterministic.json'),freeze.deterministic_sha256],[path.join(out,'chat-content-screens.json'),freeze.chat_screens_sha256]])assert.equal(sha(read(p)),h,'Frozen input changed');
  const reviewers=[];
  for(const[id,mapping]of Object.entries(map.reviewers)){
    const p=path.join(out,id,'packet.json');assert.equal(sha(read(p)),mapping.packet_sha256);const packet=json(p),file=path.join(out,'reviews',id+'.json');
    if(!fs.existsSync(file)){reviewers.push({id,status:'missing/unverified'});continue;}
    try{const response=json(file);validate(response,packet);reviewers.push({id,status:'received',calibration:diagnose(response,mapping,packet,calibrationFile),response,raw_sha256:sha(read(file))});}catch(e){reviewers.push({id,status:'invalid/unverified',error:e.message,raw_output_retained:true});}
  }
  const comparisons=map.pairs.map(p=>({key:p.key,votes:reviewers.filter(r=>r.response).map(r=>{const m=map.reviewers[r.id].pairs.find(m=>m.key===p.key),judgment=r.response.review.pair_reviews.find(x=>x.pair_id===m.pair_id),notes=r.response.goal_notes.find(x=>x.pair_id===m.pair_id).goals;return {reviewer:r.id,left_source:m.left_source,right_source:m.right_source,overall_preference_descriptive:judgment.communication.preference,information:{left:judgment.left_information,right:judgment.right_information,calibration_eligible:r.calibration.eligible_claims.information},goals:Object.fromEntries(GOALS.map(g=>[g,{...notes[g],preferred_source:['left','right'].includes(notes[g].choice)?m[notes[g].choice+'_source']:notes[g].choice,claim_eligible:eligibleOnSurface(r.calibration,g,notes[g].surface)&&judgment.communication.confidence!=='low'&&notes[g].choice!=='unknown'&&notes[g].tie_basis!=='insufficient_evidence'}])),missing_evidence:judgment.missing_evidence};})}));
  const result={label:'Automated experimental assessments, not measured human comprehension',deterministic:json(path.join(out,'deterministic.json')),chat_content_screens:json(path.join(out,'chat-content-screens.json')),reviewers,comparisons,original_child_instructions:'unverified',limits:['New diagnostic eligibility is claim-specific; old four-control results and thresholds remain unchanged.','Opposite orientation/order checks sensitivity but does not establish absence of order bias.','Overall preference or shorter text does not prove every goal.','Protected files/copy and necessary technical depth are separate from ordinary-chat style.']};put(path.join(out,'assessment.json'),result);console.log(JSON.stringify({reviewers:reviewers.map(r=>({id:r.id,status:r.status,eligible:r.calibration?.eligible_claims})),real_pairs:comparisons.length}));return result;
}
if(require.main===module){try{const[action,a,b,c]=process.argv.slice(2);if(action==='prepare')prepare(a,path.resolve(b),c);else if(action==='report')report(path.resolve(a));else throw Error('Use prepare MANIFEST OUT COHORT or report OUT');}catch(e){console.error(e.stack);process.exitCode=1;}}
module.exports={prepare,report,validate,diagnose,timeScreen,eligibleOnSurface,GOALS};
