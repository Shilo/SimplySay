'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
function read(relative,header){const lines=fs.readFileSync(path.join(root,relative),'utf8').trim().split(/\r?\n/);assert.equal(lines.shift(),header.join(','));return lines.map(line=>{const cells=line.split(',');assert.equal(cells.length,header.length);return Object.fromEntries(header.map((key,i)=>[key,cells[i]]));});}
const pairs=read('evidence/pairs.csv',['pair_id','volunteer_id','task','first_format']);
const reference=read('evidence/reference.csv',['pair_id','seconds','correct','assisted']);
const guide=read('evidence/guide.csv',['pair_id','seconds','correct','assisted']);
const ids=pairs.map(row=>row.pair_id).sort();assert.equal(new Set(ids).size,ids.length);
for(const rows of [reference,guide]){assert.deepEqual(rows.map(row=>row.pair_id).sort(),ids);for(const row of rows){assert(['true','false'].includes(row.correct));assert(['true','false'].includes(row.assisted));assert(row.seconds===''||Number(row.seconds)>0);}}
process.stdout.write(JSON.stringify({pairs:pairs.length,volunteers:new Set(pairs.map(row=>row.volunteer_id)).size,reference_rows:reference.length,guide_rows:guide.length,missing_guide_times:guide.filter(row=>row.seconds==='').map(row=>row.pair_id)},null,2)+'\n');
