// Offline contract test only. Completed raw judgments are never changed/regraded.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {validateReview,calibrated}=require('../assessment-v2/assess.cjs');
const DIR=path.join(require('node:os').homedir(),'AppData/Local/Temp/agent-comm-review-development-20261029/replication');
const j=p=>JSON.parse(fs.readFileSync(p,'utf8')),sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const map=j(path.join(DIR,'controller-map.json')),rows=[];
for(const n of [1,2]){
  const id='replication-review-'+n,file=path.join(DIR,'reviews',id+'.json'),before=sha(file),raw=j(file),packet=j(path.join(DIR,id,'packet.json')),m=map.reviewers[id],control=m.pairs.find(p=>p.key==='omission'),judgment=raw.pair_reviews.find(p=>p.pair_id===control.pair_id),mutant=control.left_source==='cMissing'?'left':'right';
  validateReview(raw,packet);assert.equal(calibrated(raw,m).pass,false);assert.equal(calibrated(raw,m).controls.omission.pass,false);
  const issues=judgment[mutant+'_information'].issues.join(' '),reason=judgment.communication.rationale;
  assert(!/R-103/.test(issues));assert(/R-103/.test(reason)&&/receipt/i.test(reason)&&/email|draft/i.test(reason));
  // A synthetic fixture tests the existing schema/gate's issue-field contract.
  // It is not saved as a judgment, aggregated, or used to pass the real review.
  const synthetic=structuredClone(raw),p=synthetic.pair_reviews.find(p=>p.pair_id===control.pair_id);
  p[mutant+'_information'].issues=['The standalone email omits the required R-103 receipt action.'];
  validateReview(synthetic,packet);assert(calibrated(synthetic,m).controls.omission.pass);assert.equal(sha(file),before);
  rows.push({id,raw_review_sha256:before,raw_calibration:'failed',omission_status_correct:true,specific_omission_explained_in_rationale:true,issue_field_lacks_required_explanation:true,synthetic_contract_fixture_pass:true,raw_review_unchanged:true});
}
console.log(JSON.stringify({offline_only:true,rows,raw_reviews_rescored_or_converted:false,actual_replication_status:'inconclusive-under-frozen-calibration',new_model_sessions:0}));
