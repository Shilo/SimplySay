// One-off offline recovery for the two saved reviews; existing grading is reused.
// No inference, paraphrase, scoring change, new reviewer or installed component.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {normalize}=require('../assessment-v2/normalize-review-format.cjs');
const {validateReview,calibrated}=require('../assessment-v2/assess.cjs');
const ROOT=path.resolve(__dirname,'../..'),DIR=path.join(__dirname,'evidence/replication'),RAW=path.join(DIR,'review'),OUT=path.join(DIR,'format-recovery');
const read=p=>fs.readFileSync(p),json=p=>JSON.parse(read(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function recover(raw,packet,mapping,spec){
  validateReview(raw,packet);
  const before=calibrated(raw,mapping),m=mapping.pairs.find(p=>p.pair_id===spec.pair_id);
  assert.equal(before.pass,false);assert.equal(before.controls.omission.pass,false);
  assert(Object.entries(before.controls).every(([key,c])=>key==='omission'||c.pass),'Other grading defect: do not recover');
  assert(m&&m.kind==='control'&&m.key==='omission','Only the named formatting control may change');
  assert.equal(m[spec.side+'_source'],'cMissing');
  const p=raw.pair_reviews.find(p=>p.pair_id===spec.pair_id),statement=spec.verbatim_existing_statement;
  assert.equal(p[spec.side+'_information'].status,'omitted-essential','Do not infer an omission judgment');
  assert.equal(p[spec.side==='left'?'right_information':'left_information'].status,'preserved');
  assert(p.communication.rationale.includes(statement),'Do not invent or paraphrase an explanation');
  assert.equal(p.communication.rationale.split(statement).length,2,'Statement must be unambiguous');
  assert(statement.toLowerCase().includes(spec.side+' standalone email omits'),'Explanation must explicitly identify this side and deliverable');
  assert(!p[spec.side+'_information'].issues.includes(statement),'Do not append twice');
  const {result,changes}=normalize(raw,packet);assert.equal(changes.length,0,'Unexpected additional format repair');
  const target=result.pair_reviews.find(p=>p.pair_id===spec.pair_id);
  target[spec.side+'_information'].issues.push(statement);
  const undone=structuredClone(result);undone.pair_reviews.find(p=>p.pair_id===spec.pair_id)[spec.side+'_information'].issues.pop();
  assert.deepEqual(undone,raw,'Every other field must be unchanged');
  validateReview(result,packet);assert(calibrated(result,mapping).pass);
  return result;
}
function main(){
  const planFile=path.join(__dirname,'review-format-recovery.json'),plan=json(planFile),map=json(path.join(RAW,'controller-map.json')),freeze=json(path.join(RAW,'review-freeze.json')),rawAssessment=json(path.join(RAW,'assessment.json'));
  assert.equal(sha(read(path.join(ROOT,'experiments/assessment-v2/assess.cjs'))),freeze.validator_sha256,'Original scoring code changed');
  const outputs=[],audits=[],votes=[];let negativeTests=0;
  for(const spec of plan.entries){
    const rawFile=path.join(RAW,'reviews',spec.reviewer_id+'.json'),packetFile=path.join(RAW,spec.reviewer_id,'packet.json'),rawBytes=read(rawFile),packetBytes=read(packetFile),raw=JSON.parse(rawBytes),packet=JSON.parse(packetBytes),mapping=map.reviewers[spec.reviewer_id];
    assert.equal(sha(rawBytes),spec.raw_review_sha256);assert.equal(sha(packetBytes),spec.packet_sha256);assert.equal(mapping.packet_sha256,spec.packet_sha256);
    const recovered=recover(raw,packet,mapping,spec);
    // Refuse changed judgments, newly supplied prose, wrong-side attribution,
    // a real-pair edit or a second substantive/calibration defect.
    const incorrect=structuredClone(raw);incorrect.pair_reviews.find(p=>p.pair_id===spec.pair_id)[spec.side+'_information'].status='preserved';assert.throws(()=>recover(incorrect,packet,mapping,spec));negativeTests++;
    assert.throws(()=>recover(raw,packet,mapping,{...spec,verbatim_existing_statement:spec.verbatim_existing_statement+' Invented explanation.'}));negativeTests++;
    assert.throws(()=>recover(raw,packet,mapping,{...spec,side:spec.side==='left'?'right':'left'}));negativeTests++;
    const real=mapping.pairs.find(p=>p.kind==='real');assert.throws(()=>recover(raw,packet,mapping,{...spec,pair_id:real.pair_id}));negativeTests++;
    const otherFailure=structuredClone(raw),filler=mapping.pairs.find(p=>p.key==='filler');otherFailure.pair_reviews.find(p=>p.pair_id===filler.pair_id).communication.preference='tie';assert.throws(()=>recover(otherFailure,packet,mapping,spec));negativeTests++;
    const actual=raw.pair_reviews.find(p=>p.pair_id===real.pair_id),recoveredActual=recovered.pair_reviews.find(p=>p.pair_id===real.pair_id);assert.deepEqual(actual,recoveredActual);
    const normalizedBytes=Buffer.from(JSON.stringify(recovered,null,2)+'\n');outputs.push({rel:'reviews/'+spec.reviewer_id+'.json',bytes:normalizedBytes});
    audits.push({reviewer_id:spec.reviewer_id,raw_review_sha256:sha(rawBytes),packet_sha256:sha(packetBytes),recovered_review_sha256:sha(normalizedBytes),original_calibration:calibrated(raw,mapping),recovered_calibration:calibrated(recovered,mapping),operation:'Append verbatim existing same-pair rationale sentence; retain original excerpt and rationale',source_pointer:'/pair_reviews/'+raw.pair_reviews.findIndex(p=>p.pair_id===spec.pair_id)+'/communication/rationale',target_pointer:'/pair_reviews/'+raw.pair_reviews.findIndex(p=>p.pair_id===spec.pair_id)+'/'+spec.side+'_information/issues/-',copied_statement:spec.verbatim_existing_statement,all_other_fields_unchanged:true,real_comparison_unchanged:true});
    votes.push({reviewer:spec.reviewer_id,left_source:real.left_source,right_source:real.right_source,format_recovered_calibration:true,preference:actual.communication.preference,dimensions:actual.communication.dimensions,information:{left:actual.left_information.status,right:actual.right_information.status},confidence:actual.communication.confidence,rationale:actual.communication.rationale,missing_evidence:actual.missing_evidence});
    assert.equal(sha(read(rawFile)),spec.raw_review_sha256);assert.equal(sha(read(packetFile)),spec.packet_sha256);
  }
  assert.equal(rawAssessment.reviewers.filter(r=>r.calibration.pass).length,0);assert(votes.every(v=>v.preference==='tie'&&Object.values(v.dimensions).every(d=>d==='tie')));
  const ledger=json(path.join(ROOT,'.local/development-v1-sessions.json'));assert.equal(ledger.starts.length,25);assert.equal(ledger.starts.reduce((n,s)=>n+s.turns,0),78);assert(ledger.dispatch_blocked);
  const audit={label:'Owner-authorized post-hoc offline format recovery; original failed grading retained',plan_sha256:sha(read(planFile)),scorer_sha256:freeze.validator_sha256,scoring_thresholds_and_success_definition_changed:false,new_model_sessions:0,new_judgments:0,raw_assessment_sha256:sha(read(path.join(RAW,'assessment.json'))),raw_reviews_and_packets_unchanged:true,negative_guard_tests_passed:negativeTests,entries:audits};
  const assessment={label:'Automated assessments, not measured human comprehension',status:'tie-after-owner-authorized-format-only-recovery',original_dispatch_result:'inconclusive; both original omission field gates failed',recovered_reviewers:2,original_failed_control_judgments:2,recovered_controls_passed:8,recovered_controls_total:8,judgments_changed:false,success_definition_changed:false,scope:'Consistency check on the same used W1 workflow; not whole-product validation',votes,information_and_work:'Both original judgments preserved; unchanged deterministic/actual-work checks retained',original_child_instructions:'unverified',desktop_notifications_and_human_comprehension:'unverified',order_bias:'Opposite orientations agree; two reviewers do not establish absence of bias',conversations_used:25,task_starts_used:78,new_model_sessions:0,production:'hold',publication:'hold'};
  outputs.push({rel:'audit.json',bytes:Buffer.from(JSON.stringify(audit,null,2)+'\n')},{rel:'assessment.json',bytes:Buffer.from(JSON.stringify(assessment,null,2)+'\n')});
  for(const o of outputs){const dest=path.join(OUT,o.rel);fs.mkdirSync(path.dirname(dest),{recursive:true});if(fs.existsSync(dest))assert(read(dest).equals(o.bytes),'Refuse changed existing derivative');else fs.writeFileSync(dest,o.bytes,{flag:'wx'});}
  console.log(JSON.stringify({original_calibrated_reviewers:0,recovered_calibrated_reviewers:2,recovered_controls_passed:8,real_comparisons_unchanged:true,votes:votes.map(v=>v.preference),negative_guard_tests_passed:negativeTests,new_model_sessions:0}));
}
if(require.main===module)main();
