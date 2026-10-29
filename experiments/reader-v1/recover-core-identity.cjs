// One-off offline field recovery. Existing normalization, validation and scoring;
// no inference, new judgment, policy/control change or installed component.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {normalize}=require('../assessment-v2/normalize-review-format.cjs');
const {validate,diagnose,report}=require('./review.cjs');
const ROOT=path.resolve(__dirname,'../..'),RAW=path.join(__dirname,'evidence/core-chat1/review'),OUT=path.join(__dirname,'evidence/core-chat1/format-recovery'),REPLAY=path.join(ROOT,'.local/core-identity-replay');
const read=p=>fs.readFileSync(p),j=p=>JSON.parse(read(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),id='reader-core-chat1-review-2';
function recover(raw,packet,mapping,spec){
 validate(raw,packet);assert.equal(sha(JSON.stringify(raw)),spec.raw_object_sha256,'Raw meaning/fields changed');
 const before=diagnose(raw,mapping,packet,spec.calibration_file,spec.mode);
 assert.equal(before.legacy.pass,false);assert.equal(before.legacy.controls.identity.pass,false);assert(Object.entries(before.legacy.controls).every(([k,v])=>k==='identity'||v.pass));assert(Object.values(before.diagnostics).every(x=>x.pass));
 const m=mapping.pairs.find(x=>x.pair_id===spec.pair_id);assert(m&&m.kind==='control'&&m.key==='identity');
 const p=raw.review.pair_reviews.find(x=>x.pair_id===spec.pair_id),note=raw.goal_notes.find(x=>x.pair_id===spec.pair_id).goals.clarity;
 assert.equal(p.communication.preference,'tie');assert.equal(p.left_information.status,'preserved');assert.equal(p.right_information.status,'preserved');assert(Object.values(p.communication.dimensions).every(x=>x==='tie'));
 assert.equal(spec.statement,note.rationale);assert(spec.statement.includes('identical'));assert(!p.communication.rationale.includes(spec.statement));
 const pair=packet.pairs.find(x=>x.pair_id===spec.pair_id),left=structuredClone(packet.candidates.find(x=>x.alias===pair.left)),right=structuredClone(packet.candidates.find(x=>x.alias===pair.right));delete left.alias;delete right.alias;assert.deepEqual(left,right,'Identity content differs');
 const normalized=normalize(raw.review,packet);assert.equal(normalized.changes.length,0);
 const result=structuredClone(raw);result.review=normalized.result;
 result.review.pair_reviews.find(x=>x.pair_id===spec.pair_id).communication.rationale+=' '+spec.statement;
 const undone=structuredClone(result);undone.review.pair_reviews.find(x=>x.pair_id===spec.pair_id).communication.rationale=p.communication.rationale;assert.deepEqual(undone,raw,'Only one same-control rationale append is allowed');
 validate(result,packet);assert(diagnose(result,mapping,packet,spec.calibration_file,spec.mode).legacy.pass);
 return result;
}
function main(){
 const map=j(path.join(RAW,'controller-map.json')),freeze=j(path.join(RAW,'reader-freeze.json')),packet=j(path.join(RAW,id,'packet.json')),rawFile=path.join(RAW,'reviews',id+'.json'),rawBytes=read(rawFile),raw=JSON.parse(rawBytes),original=j(path.join(RAW,'assessment.json')),mapping=map.reviewers[id],pair=mapping.pairs.find(x=>x.key==='identity');
 assert.equal(sha(read(path.join(ROOT,'experiments/assessment-v2/assess.cjs'))),freeze.validator_sha256);assert.equal(sha(read(path.join(ROOT,'experiments/reader-v1/review.cjs'))),freeze.adapter_sha256);
 const spec={pair_id:pair.pair_id,statement:raw.goal_notes.find(x=>x.pair_id===pair.pair_id).goals.clarity.rationale,raw_object_sha256:sha(JSON.stringify(raw)),calibration_file:path.join(ROOT,freeze.calibration_file),mode:freeze.goal_calibration_mode};
 const derived=recover(raw,packet,mapping,spec);let guards=0;
 for(const patch of [s=>({...s,statement:s.statement+' New inference.'}),s=>({...s,pair_id:mapping.pairs.find(x=>x.kind==='real').pair_id})]){assert.throws(()=>recover(raw,packet,mapping,patch(spec)));guards++;}
 for(const change of [x=>{x.review.pair_reviews.find(p=>p.pair_id===pair.pair_id).left_information.status='omitted-essential';},x=>{x.review.pair_reviews.find(p=>p.pair_id===pair.pair_id).communication.preference='left';},x=>{x.review.pair_reviews.find(p=>p.pair_id===mapping.pairs.find(v=>v.kind==='real').pair_id).communication.preference='left';},x=>{x.goal_notes.find(p=>p.pair_id===pair.pair_id).goals.clarity.rationale+=' Invented equality.';}]){const x=structuredClone(raw);change(x);assert.throws(()=>recover(x,packet,mapping,spec));guards++;}
 assert.throws(()=>recover(derived,packet,mapping,spec));guards++;
 const rels=['controller-map.json','deterministic.json','reader-freeze.json','chat-content-screens.json',...[1,2].flatMap(n=>[`reader-core-chat1-review-${n}/packet.json`,`reader-core-chat1-review-${n}/response-template.json`,`reviews/reader-core-chat1-review-${n}.json`])];
 for(const rel of rels){const dest=path.join(REPLAY,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,read(path.join(RAW,rel)));}
 fs.writeFileSync(path.join(REPLAY,'reviews',id+'.json'),JSON.stringify(derived,null,2)+'\n');const result=report(REPLAY);assert(result.reviewers.every(x=>x.calibration.legacy.pass));
 function stripEligibility(x){if(Array.isArray(x))return x.map(stripEligibility);if(x&&typeof x==='object')return Object.fromEntries(Object.entries(x).filter(([k])=>!['claim_eligible','calibration_eligible'].includes(k)).map(([k,v])=>[k,stripEligibility(v)]));return x;}
 assert.deepEqual(stripEligibility(result.comparisons),stripEligibility(original.comparisons),'Real judgments must remain unchanged');
 const audit={label:'Offline format-only recovery; original failed identity gate retained',operation:'Append one verbatim existing equality sentence from the same identity-control goal rationale into its communication rationale',raw_review_sha256:sha(rawBytes),packet_sha256:sha(read(path.join(RAW,id,'packet.json'))),original_assessment_sha256:sha(read(path.join(RAW,'assessment.json'))),source_pointer:'/goal_notes/'+raw.goal_notes.findIndex(x=>x.pair_id===pair.pair_id)+'/goals/clarity/rationale',target_pointer:'/review/pair_reviews/'+raw.review.pair_reviews.findIndex(x=>x.pair_id===pair.pair_id)+'/communication/rationale',copied_statement:spec.statement,old_communication_rationale:raw.review.pair_reviews.find(x=>x.pair_id===pair.pair_id).communication.rationale,scorer_sha256:freeze.validator_sha256,controls_and_success_criteria_changed:false,all_other_review_fields_unchanged:true,all_real_comparisons_unchanged:true,original_legacy_pass:false,recovered_legacy_pass:true,negative_guards_passed:guards,new_model_sessions:0,new_judgments:0};
 fs.mkdirSync(OUT,{recursive:true});for(const [name,bytes]of [[id+'.derived.json',Buffer.from(JSON.stringify(derived,null,2)+'\n')],['assessment.json',read(path.join(REPLAY,'assessment.json'))],['audit.json',Buffer.from(JSON.stringify(audit,null,2)+'\n')]]){const p=path.join(OUT,name);if(fs.existsSync(p))assert(read(p).equals(bytes),'Refuse changed derivative');else fs.writeFileSync(p,bytes);}
 assert.equal(sha(read(rawFile)),sha(rawBytes));console.log(JSON.stringify({recovered_reviewers:2,real_judgments_unchanged:true,all_real_preferences:result.comparisons.map(x=>x.votes.map(v=>v.overall_preference_descriptive)),negative_guards:guards,new_model_work:0}));
}
if(require.main===module)main();
module.exports={recover};
