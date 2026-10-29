// Existing privacy scanner plus an explicit non-identifying drive-root exception.
// No text is rewritten. Full paths, user paths and secret categories stay blocked.
'use strict';
const {privacyFindings}=require('../pilot/export-evidence.cjs');
function publicPrivacy(text){
  const original=privacyFindings(text);
  if(!original.length)return {findings:[],generic_drive_roots:0};
  if(original.some(f=>f.category!=='remaining_machine_path'))return {findings:original,generic_drive_roots:0};
  let values;try{values=[JSON.parse(text)];}catch{try{values=text.trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);}catch{return {findings:original,generic_drive_roots:0};}}
  let roots=0,unsafe=false;
  function check(s){const masked=s.replace(/(?<![A-Za-z0-9_])[A-Za-z]:[\\/]+(?=[\s"'<>]|$)/g,()=>{roots++;return '<DRIVE_ROOT>';});if(privacyFindings(masked).length)unsafe=true;}
  function walk(v){if(typeof v==='string')check(v);else if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object')for(const[k,x]of Object.entries(v)){check(k);walk(x);}}
  values.forEach(walk);return {findings:!unsafe&&roots?[]:original,generic_drive_roots:roots};
}
module.exports={publicPrivacy};
