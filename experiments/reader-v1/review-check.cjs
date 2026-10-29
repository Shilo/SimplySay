// Offline contract/oracle checks only; all graded examples here are synthetic.
'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const review=require('./review.cjs');
const ROOT=path.resolve(__dirname,'../..'),OUT=path.join(ROOT,'.local','reader-review-smoke-'+Date.now()),OLD=path.join(__dirname,'../workflow-v1/evidence/replication'),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>fs.readFileSync(p),j=p=>JSON.parse(read(p));
const copy=x=>structuredClone(x),put=(p,x)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,typeof x==='string'?x:JSON.stringify(x,null,2)+'\n');};
const simpleNote=(choice,surface,evidence=[])=>({choice,surface,tie_basis:choice==='tie'?'both_satisfactory':choice==='unknown'?'insufficient_evidence':null,rationale:'Synthetic contract fixture; no live grading result.',evidence});
let checks=0;const ok=(name,fn)=>{fn();checks++;};
const a=j(path.join(__dirname,'cases/a.case.json')),b=j(path.join(__dirname,'cases/b.case.json'));
for(const c of [a,b])for(const f of c.fixture_files)assert.equal(sha(Buffer.from(f.content)),f.sha256);
ok('three turns per case',()=>{assert.equal(a.turns.length,3);assert.equal(b.turns.length,3);});
for(const s of ['3:20 pm.','15:20','Twenty-past-three.','Twenty past three.'])ok('equivalent time screen',()=>assert.equal(review.timeScreen(s).status,'positive-lexical-evidence'));
ok('unrecognized time is not an automatic omission',()=>assert.equal(review.timeScreen('Join after the twenty-minute check finishes.').status,'unverified'));
ok('wrong time does not pass screen',()=>assert.equal(review.timeScreen('3:30 pm.').status,'unverified'));
for(const s of ['9:55 am.','09:55','Five to ten.'])ok('case C equivalent time screen',()=>assert.equal(review.timeScreen(s,'9:55 am').status,'positive-lexical-evidence'));
ok('case C wrong time does not pass screen',()=>assert.equal(review.timeScreen('10:55 am.','9:55 am').status,'unverified'));

// Inspected source consists only of built-in local file/CLI operations. No host,
// network, installation or external service is executed by these oracle probes.
const corrected="'use strict';\nfunction reconcile(rows){\n if(!Array.isArray(rows))throw new TypeError('rows must be an array');\n const chosen=new Map();\n for(const row of rows){\n  if(!row||typeof row!=='object'||Array.isArray(row)||typeof row.record_id!=='string'||!row.record_id||!Number.isSafeInteger(row.revision)||row.revision<0)throw new TypeError('invalid row');\n  const key=row.record_id; const previous=chosen.get(key);\n  if(!previous||row.revision>previous.revision)chosen.set(key,{...row});\n }\n return [...chosen.values()];\n}\nmodule.exports={reconcile};\n";
function probe(name,source){const dir=path.join(OUT,'oracle',name);for(const f of b.fixture_files)put(path.join(dir,f.path),f.path==='lib/reconcile.cjs'&&source?source:f.content);return cp.spawnSync(process.execPath,['-e',b.objective.code_probes[0].source],{cwd:dir,encoding:'utf8',timeout:7000,windowsHide:true});}
const seeded=probe('seed'),fixed=probe('corrected',corrected);
ok('seeded faults fail contract probe',()=>assert.notEqual(seeded.status,0));
ok('corrected fixture passes module and CLI probe',()=>assert.equal(fixed.status,0,fixed.stderr));
for(const[name,source]of [['id-mutant',corrected.replace('const key=row.record_id;','const key=row.title;')],['revision-mutant',corrected.replace('row.revision>previous.revision','row.revision<previous.revision')],['order-mutant',corrected.replace('return [...chosen.values()];','return [...chosen.values()].sort((a,b)=>a.title.localeCompare(b.title));')]])ok(name+' fails probe',()=>assert.notEqual(probe(name,source).status,0));

const v2=process.argv.includes('--calibration-v2'),independent=process.argv.includes('--independent-goals'),mode=independent?'independent-goals-v1':'joint-v1',calibrationFile=path.join(__dirname,v2?'calibration-v2.json':'calibration.json');
assert(!independent||v2,'Independent-mode smoke uses the existing v2 controls');
let manifestFile='experiments/workflow-v1/replication.manifest.json';
if(v2){const smoke=copy(j(path.join(ROOT,manifestFile)));smoke.calibration_file='experiments/reader-v1/calibration-v2.json';if(independent)smoke.goal_calibration_mode=mode;manifestFile=path.relative(ROOT,path.join(OUT,'prospective.manifest.json'));put(path.join(ROOT,manifestFile),smoke);}
review.prepare(manifestFile,path.join(OUT,'review'),'reader-smoke');
const dir=path.join(OUT,'review'),map=j(path.join(dir,'controller-map.json')),oldMap=j(path.join(OLD,'review/controller-map.json')),calibration=j(calibrationFile);
const originals=new Map();
for(let n=1;n<=2;n++){
  const id='reader-smoke-review-'+n,oldId='replication-review-'+n,oldFile=path.join(OLD,'format-recovery/reviews',oldId+'.json'),old=j(oldFile);originals.set(oldFile,sha(read(oldFile)));
  const packet=j(path.join(dir,id,'packet.json')),wrapper=j(path.join(dir,id,'response-template.json')),m=map.reviewers[id];wrapper.review={...old,reviewer_id:id,pair_reviews:[]};
  for(const p of m.pairs){
    let r;
    if(p.kind!=='diagnostic-control'){
      const source=oldMap.reviewers[oldId].pairs.find(x=>x.key===p.key);assert(source);r=copy(old.pair_reviews.find(x=>x.pair_id===source.pair_id));r.pair_id=p.pair_id;
    }else{
      const d=calibration.diagnostics.find(d=>d.id===p.diagnostic_id),good=p.left_source===p.good_source?'left':'right',bad=good==='left'?'right':'left';
      const candidate=side=>packet.candidates.find(c=>c.alias===p[side]);
      const evidence=side=>[candidate(side).ordinary_chat];
      r={pair_id:p.pair_id,left_information:{status:'preserved',issues:[],evidence:evidence('left')},right_information:{status:'preserved',issues:[],evidence:evidence('right')},communication:{preference:good,dimensions:Object.fromEntries(review.GOALS.filter(g=>g!=='unnecessary_explanation').map(g=>[g,'tie'])),evidence:[],rationale:'Synthetic valid fixture for the fixed expectation; not a new model assessment.',confidence:'high'},missing_evidence:[]};
      if(d.expected.type==='style'){
        for(const g of d.expected.goals)if(g!=='unnecessary_explanation')r.communication.dimensions[g]=good;
        r.communication.evidence=[d.expected.mutant_changed_text[0]];
      }else{
        r[bad+'_information'].status='omitted-essential';r[bad+'_information'].issues=['The required archive-or-cancel decision question is missing.'];r[good+'_information'].evidence.push(d.expected.good_required_quote);r.communication.evidence=[d.expected.good_required_quote];
      }
    }
    wrapper.review.pair_reviews.push(r);
    const notes=wrapper.goal_notes.find(x=>x.pair_id===p.pair_id).goals;
    for(const g of review.GOALS){const choice=g==='unnecessary_explanation'?'tie':r.communication.dimensions[g],left=packet.candidates.find(c=>c.alias===p.left),right=packet.candidates.find(c=>c.alias===p.right),surface=(p.diagnostic_id==='d5'&&calibration.diagnostics.find(d=>d.id===p.diagnostic_id).expected.goals.includes(g))||g==='excessive_updates'?'progress':'final';let evidence=surface==='progress'?(left.progress.length?[left.progress[0]]:[]):[left.ordinary_chat];if(p.kind==='diagnostic-control'){const d=calibration.diagnostics.find(d=>d.id===p.diagnostic_id);if(d.expected.goals.includes(g))evidence=[d.expected.type==='style'?d.expected.mutant_changed_text[0]:d.expected.good_required_quote];}notes[g]=simpleNote(choice,surface,evidence);}
    if(p.kind==='diagnostic-control'){
      const d=calibration.diagnostics.find(d=>d.id===p.diagnostic_id),good=p.left_source===p.good_source?'left':'right';if(d.expected.goals.includes('unnecessary_explanation'))notes.unnecessary_explanation=simpleNote(good,d.id==='d5'?'progress':'final',[d.expected.mutant_changed_text[0]]);
    }
  }
  ok('wrapper accepts complete legacy plus companion',()=>assert(review.validate(wrapper,packet)));
  ok('all prospective claim diagnostics pass fixture',()=>{const d=review.diagnose(wrapper,m,packet,calibrationFile,mode);assert(Object.values(d.eligible_claims).every(Boolean));assert(Object.values(d.diagnostics).every(d=>d.pass));});
  const real=m.pairs.find(p=>p.kind==='real');
  const onlyProgress=copy(wrapper),sp=m.pairs.find(p=>p.diagnostic_id==='d1'),sn=onlyProgress.goal_notes.find(p=>p.pair_id===sp.pair_id).goals.clarity;sn.surface='final';sn.evidence=['The column names match the required output.'];ok('progress-only evidence cannot claim final clarity',()=>assert.throws(()=>review.validate(onlyProgress,packet)));
  const onlyFinal=copy(wrapper),fn=onlyFinal.goal_notes.find(p=>p.pair_id===sp.pair_id).goals.relevance;fn.surface='progress';fn.evidence=[packet.candidates.find(c=>c.alias===sp.left).ordinary_chat];ok('final-only evidence cannot claim progress',()=>assert.throws(()=>review.validate(onlyFinal,packet)));
  const incompleteBoth=copy(wrapper),bn=incompleteBoth.goal_notes.find(p=>p.pair_id===sp.pair_id).goals.clarity;bn.surface='both';bn.evidence=['The column names match the required output.'];ok('both needs evidence from each surface',()=>assert.throws(()=>review.validate(incompleteBoth,packet)));
  const validBoth=copy(wrapper),vn=validBoth.goal_notes.find(p=>p.pair_id===sp.pair_id).goals.clarity;vn.surface='both';vn.evidence=['The column names match the required output.',packet.candidates.find(c=>c.alias===sp.left).ordinary_chat];ok('both-surface evidence is accepted',()=>assert(review.validate(validBoth,packet)));
  const crossPacket=copy(packet),crossReview=copy(wrapper),gs=sp.left_source===sp.good_source?'left':'right',bs=gs==='left'?'right':'left',gc=crossPacket.candidates.find(c=>c.alias===sp[gs]),bc=crossPacket.candidates.find(c=>c.alias===sp[bs]),crossQuote=gc.ordinary_chat;gc.progress=['A different required opening.'];bc.progress.push(crossQuote);const cn=crossReview.goal_notes.find(p=>p.pair_id===sp.pair_id).goals.clarity;cn.surface='progress';cn.tie_basis='both_problem';cn.evidence=[crossQuote];ok('both-problem evidence must support each side on declared surface',()=>assert.throws(()=>review.validate(crossReview,crossPacket)));
  const invalidQuote=copy(wrapper);invalidQuote.goal_notes.find(x=>x.pair_id===real.pair_id).goals.clarity.evidence=['invented quotation'];ok('invalid quotation rejected',()=>assert.throws(()=>review.validate(invalidQuote,packet)));
  const changedChoice=copy(wrapper),note=changedChoice.goal_notes.find(x=>x.pair_id===real.pair_id).goals.clarity;note.choice=note.choice==='left'?'right':'left';note.tie_basis=null;ok('companion cannot change legacy choice',()=>assert.throws(()=>review.validate(changedChoice,packet)));
  const missingTie=copy(wrapper);missingTie.goal_notes.find(x=>x.pair_id===real.pair_id).goals.clarity.tie_basis=null;ok('tie requires explicit interpretation',()=>assert.throws(()=>review.validate(missingTie,packet)));
  const omitted=copy(wrapper);omitted.goal_notes.pop();ok('missing pair notes rejected',()=>assert.throws(()=>review.validate(omitted,packet)));
  const wrongProgress=copy(wrapper),pm=m.pairs.find(p=>p.diagnostic_id==='d1'),pnotes=wrongProgress.goal_notes.find(p=>p.pair_id===pm.pair_id).goals;wrongProgress.review.pair_reviews.find(p=>p.pair_id===pm.pair_id).communication.preference=pm.left_source===pm.good_source?'right':'left';ok('truthful unnecessary progress error fails eligibility',()=>assert.equal(review.diagnose(wrongProgress,m,packet,calibrationFile,mode).eligible_claims.excessive_updates,false));
  const lostWarning=copy(wrapper),wm=m.pairs.find(p=>p.diagnostic_id==='d4'),wrow=lostWarning.review.pair_reviews.find(p=>p.pair_id===wm.pair_id);wrow[wm.left_source===wm.good_source?'right_information':'left_information'].status='preserved';ok('missing needed interruption cannot pass preservation',()=>assert.equal(review.diagnose(lostWarning,m,packet,calibrationFile,mode).eligible_claims.information,false));
  const badExplanation=copy(wrapper),em=m.pairs.find(p=>p.diagnostic_id==='d2');badExplanation.goal_notes.find(p=>p.pair_id===em.pair_id).goals.unnecessary_explanation.choice='tie';ok('plausible overexplanation diagnostic is active',()=>assert.equal(review.diagnose(badExplanation,m,packet,calibrationFile,mode).eligible_claims.unnecessary_explanation,false));
  const badJargon=copy(wrapper),jm=m.pairs.find(p=>p.diagnostic_id==='d3');badJargon.goal_notes.find(p=>p.pair_id===jm.pair_id).goals.unnecessary_jargon.choice='tie';ok('unexplained terms diagnostic is active',()=>assert.equal(review.diagnose(badJargon,m,packet,calibrationFile,mode).eligible_claims.unnecessary_jargon,false));
  if(v2){
    const oldCalibration=j(path.join(__dirname,'calibration.json'));ok('old diagnostic objects unchanged',()=>assert.deepEqual(calibration.diagnostics.slice(0,4),oldCalibration.diagnostics));
    const dm=m.pairs.find(p=>p.diagnostic_id==='d5'),d=calibration.diagnostics.find(d=>d.id==='d5');
    ok('required presence and timing are matched',()=>{assert.equal(d.good.progress.length,d.mutant.progress.length);assert.deepEqual(d.good.trace,d.mutant.trace);assert.equal(d.good.ordinary_chat,d.mutant.ordinary_chat);});
    const missed=copy(wrapper);for(const g of d.expected.goals)missed.goal_notes.find(p=>p.pair_id===dm.pair_id).goals[g].choice='tie';
    const eligibility=review.diagnose(missed,m,packet,calibrationFile,mode);
    ok('required progress payload error blocks progress claims',()=>assert.equal(review.eligibleOnSurface(eligibility,'unnecessary_explanation','progress'),false));
    ok('progress payload gate leaves final claims unchanged',()=>assert.equal(review.eligibleOnSurface(eligibility,'unnecessary_explanation','final'),true));
    ok('both-surface claims also need progress sensitivity',()=>assert.equal(review.eligibleOnSurface(eligibility,'filler','both'),false));
  }
  if(independent){
    const selected=(w,did)=>{const dm=m.pairs.find(p=>p.diagnostic_id===did);return {mapping:dm,row:w.review.pair_reviews.find(p=>p.pair_id===dm.pair_id),notes:w.goal_notes.find(p=>p.pair_id===dm.pair_id).goals};};
    const tieGoal=(w,did,g)=>{const s=selected(w,did);if(g!=='unnecessary_explanation')s.row.communication.dimensions[g]='tie';s.notes[g].choice='tie';s.notes[g].tie_basis='both_satisfactory';};
    const diagnostic=w=>review.diagnose(w,m,packet,calibrationFile,mode);
    const categorized=copy(wrapper);tieGoal(categorized,'d2','filler');tieGoal(categorized,'d5','filler');
    const c=selected(categorized,'d5');c.notes.filler.surface='final';c.notes.filler.evidence=[packet.candidates.find(p=>p.alias===c.mapping.left).ordinary_chat];
    ok('category disagreement is a valid synthetic review',()=>assert(review.validate(categorized,packet)));
    const qualified=diagnostic(categorized),joint=review.diagnose(categorized,m,packet,calibrationFile);
    ok('default joint semantics retain original disqualification',()=>assert.equal(joint.eligible_claims.unnecessary_explanation,false));
    ok('explanation uses its own unchanged controls',()=>assert(review.eligibleOnSurface(qualified,'unnecessary_explanation','progress')));
    ok('filler disagreement remains a filler failure',()=>{assert.equal(qualified.eligible_claims.filler,false);assert.equal(review.eligibleOnSurface(qualified,'filler','progress'),false);});
    ok('unrelated repetition control stays qualified',()=>assert(qualified.eligible_claims.repetition));
    ok('one strict payload goal supports supplementary screen',()=>{assert(qualified.diagnostics.d5.payload_recognized.pass);assert(review.eligibleOnSurface(qualified,'excessive_updates','progress'));});
    const reverse=copy(wrapper);tieGoal(reverse,'d2','unnecessary_explanation');tieGoal(reverse,'d5','unnecessary_explanation');const reversed=diagnostic(reverse);
    ok('filler cannot repair a failed explanation judgment',()=>{assert.equal(reversed.eligible_claims.unnecessary_explanation,false);assert.equal(review.eligibleOnSurface(reversed,'unnecessary_explanation','progress'),false);});
    ok('correct filler independently supports its own claim',()=>assert(review.eligibleOnSurface(reversed,'filler','progress')));
    const missedRep=copy(wrapper);tieGoal(missedRep,'d2','repetition');const rep=diagnostic(missedRep);
    ok('repetition failure does not invalidate explanation or filler',()=>{assert.equal(rep.eligible_claims.repetition,false);assert(rep.eligible_claims.filler&&rep.eligible_claims.unnecessary_explanation);});
    for(const[g,other]of[['clarity','unnecessary_jargon'],['unnecessary_jargon','clarity']]){const wrong=copy(wrapper);tieGoal(wrong,'d3',g);const d=diagnostic(wrong);ok(g+' has its own unchanged test',()=>{assert.equal(d.eligible_claims[g],false);assert(d.eligible_claims[other]);});}
    const low=copy(wrapper);selected(low,'d2').row.communication.confidence='low';ok('low confidence fails all own claims from that control',()=>{const d=diagnostic(low);assert(!d.eligible_claims.filler&&!d.eligible_claims.repetition&&!d.eligible_claims.unnecessary_explanation);});
    const wrongOverall=copy(wrapper),wo=selected(wrongOverall,'d2');wo.row.communication.preference=wo.mapping.left_source===wo.mapping.good_source?'right':'left';ok('intended overall direction remains mandatory',()=>assert.equal(diagnostic(wrongOverall).eligible_claims.unnecessary_explanation,false));
    const omittedInfo=copy(wrapper);selected(omittedInfo,'d2').row.left_information.status='omitted-essential';ok('shorter but omitted essential cannot pass a style control',()=>assert.equal(diagnostic(omittedInfo).eligible_claims.unnecessary_explanation,false));
    const wrongSurface=copy(wrapper),ws=selected(wrongSurface,'d5');ws.notes.unnecessary_explanation.surface='final';ws.notes.unnecessary_explanation.evidence=[packet.candidates.find(p=>p.alias===ws.mapping.left).ordinary_chat];ok('own changed surface is required',()=>assert.equal(review.eligibleOnSurface(diagnostic(wrongSurface),'unnecessary_explanation','progress'),false));
    const sharedQuote=copy(wrapper),sq=selected(sharedQuote,'d5');sq.notes.unnecessary_explanation.evidence=[calibration.diagnostics.find(d=>d.id==='d5').expected.needed_status_identical];ok('shared warning does not prove changed-payload recognition',()=>assert.equal(review.eligibleOnSurface(diagnostic(sharedQuote),'unnecessary_explanation','progress'),false));
    const borrowed=copy(wrapper),bg=selected(borrowed,'d2');bg.notes.filler.evidence=[packet.candidates.find(p=>p.alias===bg.mapping[bg.mapping.left_source===bg.mapping.good_source?'left':'right']).ordinary_chat];ok('another goal quotation cannot qualify filler',()=>assert.equal(diagnostic(borrowed).eligible_claims.filler,false));
    const neither=copy(categorized);tieGoal(neither,'d5','unnecessary_explanation');ok('neither strict payload detection blocks broader progress screen',()=>{const d=diagnostic(neither);assert.equal(d.diagnostics.d5.payload_recognized.pass,false);assert.equal(review.eligibleOnSurface(d,'excessive_updates','progress'),false);});
    ok('future mode is selected in the frozen inputs',()=>assert.equal(j(path.join(dir,'reader-freeze.json')).goal_calibration_mode,mode));
  }
  put(path.join(dir,'reviews',id+'.json'),wrapper);
}
const before=map.reviewers['reader-smoke-review-1'].pairs.filter(p=>p.kind==='real').map(p=>p.left_source),after=map.reviewers['reader-smoke-review-2'].pairs.filter(p=>p.kind==='real').map(p=>p.left_source);ok('real pair orientations differ',()=>assert.notDeepEqual(before,after));
const result=review.report(dir);ok('report retains two valid synthetic reviewers',()=>assert(result.reviewers.every(r=>r.status==='received')));
const reportBytes=read(path.join(dir,'assessment.json'));review.report(dir);ok('report replay is byte-identical',()=>assert(read(path.join(dir,'assessment.json')).equals(reportBytes)));
if(independent){
  const frozenFile=path.join(dir,'reader-freeze.json'),frozenBytes=read(frozenFile),manifestBytes=read(path.join(ROOT,manifestFile));
  try{const changed=j(frozenFile);changed.goal_calibration_mode='joint-v1';put(frozenFile,changed);ok('mode must match its hashed manifest',()=>assert.throws(()=>review.report(dir),/scoring mode differs/));}finally{fs.writeFileSync(frozenFile,frozenBytes);}
  try{const changed=j(path.join(ROOT,manifestFile));changed.goal_calibration_mode='joint-v1';put(path.join(ROOT,manifestFile),changed);ok('post-freeze manifest change is rejected',()=>assert.throws(()=>review.report(dir),/Frozen manifest changed/));}finally{fs.writeFileSync(path.join(ROOT,manifestFile),manifestBytes);}
  ok('failed report checks leave assessment bytes unchanged',()=>assert(read(path.join(dir,'assessment.json')).equals(reportBytes)));

  // Reuse saved outputs only. Host facts are assessor task data, not another
  // subject prompt, control or scoring mode. Old packets/grades are untouched.
  const caseId='w1-study-evidence-audit',hostManifest=copy(j(path.join(ROOT,manifestFile))),facts=review.hostAssessmentFacts([caseId]);
  hostManifest.assessor_host_facts=facts;
  const hostManifestFile=path.relative(ROOT,path.join(OUT,'host.manifest.json')),hostOut=path.join(OUT,'host-review');put(path.join(ROOT,hostManifestFile),hostManifest);
  review.prepare(hostManifestFile,hostOut,'reader-smoke');
  const supplied={case_ids:facts.case_ids,...Object.fromEntries(Object.entries(facts).filter(([k])=>k!=='case_ids'))};
  ok('host metadata is bound in the existing manifest freeze',()=>{const f=j(path.join(hostOut,'reader-freeze.json'));assert.equal(f.manifest_sha256,sha(read(path.join(ROOT,hostManifestFile))));assert.equal(f.assessor_host_facts_sha256,sha(JSON.stringify(supplied)));assert.equal(f.goal_calibration_mode,mode);});
  let commonFacts;
  for(let n=1;n<=2;n++){
    const id='reader-smoke-review-'+n,plain=j(path.join(dir,id,'packet.json')),withFacts=j(path.join(hostOut,id,'packet.json')),embedded=withFacts.tasks[caseId].host_communication_facts;
    ok('only the listed observed task receives host facts '+n,()=>assert.deepEqual(Object.keys(withFacts.tasks).filter(k=>Object.hasOwn(withFacts.tasks[k],'host_communication_facts')),[caseId]));
    ok('both observed arms reference the same task facts '+n,()=>{const rm=map.reviewers[id].pairs.find(p=>p.kind==='real');for(const side of ['left','right'])assert.equal(withFacts.candidates.find(c=>c.alias===rm[side]).case_id,caseId);assert.deepEqual(embedded,Object.fromEntries(Object.entries(facts).filter(([k])=>k!=='case_ids')));});
    ok('unlisted/control task data and all candidate content stay unchanged '+n,()=>{const stripped=copy(withFacts);delete stripped.tasks[caseId].host_communication_facts;assert.deepEqual(stripped,plain);});
    if(commonFacts)ok('reversed reviewers receive identical host facts',()=>assert.deepEqual(embedded,commonFacts));commonFacts=embedded;
    ok('host facts contain relative provenance and limits only '+n,()=>{assert.equal(embedded.source_role,'developer');assert.equal(embedded.source_sha256,'2181ecc51528326182f349c9d83effa598156a4a307e9fd50bc7bd050496fa7a');assert(!/[A-Za-z]:[\\/]|<PROFILE|condition|concrete\.v|installed-enabled/i.test(JSON.stringify(embedded)));assert(embedded.limits.some(s=>/receipt timestamps.*not exact authoring/.test(s)));assert(embedded.limits.some(s=>/native parent-to-child/.test(s)));});
    const response=j(path.join(dir,'reviews',id+'.json'));
    ok('host facts cannot be quoted as model-written chat '+n,()=>{const invalid=copy(response);invalid.goal_notes.find(p=>p.pair_id===map.reviewers[id].pairs.find(p=>p.kind==='real').pair_id).goals.clarity.evidence=[embedded.summary];assert.throws(()=>review.validate(invalid,withFacts),/declared surface exactly/);});
    put(path.join(hostOut,'reviews',id+'.json'),response);
  }
  const hostResult=review.report(hostOut);ok('metadata does not change any synthetic grading choice or eligibility',()=>{const stripped=copy(hostResult);delete stripped.assessor_host_facts;assert.deepEqual(stripped,result);assert.deepEqual(hostResult.assessor_host_facts,facts);});
  const hostReportBytes=read(path.join(hostOut,'assessment.json')),hostFreezeFile=path.join(hostOut,'reader-freeze.json'),hostFreezeBytes=read(hostFreezeFile),hostManifestPath=path.join(ROOT,hostManifestFile),hostManifestBytes=read(hostManifestPath);
  try{const changed=j(hostFreezeFile);changed.assessor_host_facts_sha256='0'.repeat(64);put(hostFreezeFile,changed);ok('host metadata digest mismatch is rejected',()=>assert.throws(()=>review.report(hostOut),/Frozen assessor host facts differ/));}finally{fs.writeFileSync(hostFreezeFile,hostFreezeBytes);}
  try{const changed=j(hostManifestPath);changed.assessor_host_facts.case_ids=[];put(hostManifestPath,changed);ok('host context change after freeze is rejected',()=>assert.throws(()=>review.report(hostOut),/Frozen manifest changed/));}finally{fs.writeFileSync(hostManifestPath,hostManifestBytes);}
  ok('failed context checks leave synthetic report unchanged',()=>assert(read(path.join(hostOut,'assessment.json')).equals(hostReportBytes)));
  const malformed=[null,{},review.hostAssessmentFacts([]),review.hostAssessmentFacts([caseId,caseId]),review.hostAssessmentFacts(['unknown-case']),review.hostAssessmentFacts(['reader-a-shared-files']),review.hostAssessmentFacts(['reimbursement_batch']),review.hostAssessmentFacts(['C:/private/path']),{...facts,summary:'A candidate should win.'},{...facts,source_role:'system'},{...facts,source_sha256:'0'.repeat(64)},{...facts,provenance:'C:/private/source'},{...facts,unexpected_instruction:'Change the grading choice.'}];
  malformed.forEach((value,i)=>{const m=copy(hostManifest);m.assessor_host_facts=value;const f=path.relative(ROOT,path.join(OUT,'bad-host-'+i+'.json')),o=path.join(OUT,'bad-host-'+i);put(path.join(ROOT,f),m);ok('malformed or unobserved host context refused '+i,()=>{assert.throws(()=>review.prepare(f,o,'reader-smoke'));assert(!fs.existsSync(path.join(o,'reader-freeze.json')));});});

  // Compare default packet generation to the already committed predecessor.
  // This is preparation of local synthetic test inputs, not historical regrading.
  const Module=require('node:module'),originalPath=path.join(__dirname,'review.cjs'),oldModule=new Module(originalPath);
  oldModule.filename=originalPath;oldModule.paths=Module._nodeModulePaths(__dirname);
  oldModule._compile(cp.execFileSync('git',['show','78d13e1:experiments/reader-v1/review.cjs'],{cwd:ROOT,encoding:'utf8'}),originalPath);
  const oldOut=path.join(OUT,'pre-context-packets');oldModule.exports.prepare(manifestFile,oldOut,'reader-smoke');
  for(let n=1;n<=2;n++)for(const file of ['packet.json','response-template.json'])ok('no-metadata '+file+' retains predecessor bytes '+n,()=>assert(read(path.join(dir,'reader-smoke-review-'+n,file)).equals(read(path.join(oldOut,'reader-smoke-review-'+n,file)))));
}
for(const[p,h]of originals)ok('source recovered review unchanged',()=>assert.equal(sha(read(p)),h));
const summary={label:'Offline synthetic contract/oracle checks, not model trial results',checks_passed:checks,case_files:2,seeded_probe:'expected-fail',corrected_probe:'pass',independent_id_revision_order_mutants:'all-expected-fail',legacy_validator_and_calibrator_reused:true,real_response_sources_unchanged:true,new_model_sessions:0,output_directory:path.relative(ROOT,OUT)};
put(path.join(OUT,'checks.json'),summary);console.log(JSON.stringify(summary));
