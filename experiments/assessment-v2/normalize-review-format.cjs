// Optional offline format adapter. Never infers or edits a reviewer's judgments.
'use strict';
const fs = require('node:fs');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
function normalize(value, packet) {
  const result = JSON.parse(JSON.stringify(value));
  const changes = [];
  // Rich reviews can explicitly cite the opposite candidate for a comparison.
  // The string schema requires those quotes on their own candidate's side.
  const displayed = o => typeof o === 'string' ? o : o && typeof o === 'object' ? Object.values(o).map(displayed).join('\n') : '';
  if (packet) for (const pair of result.pair_reviews) {
    const mapping = packet.pairs.find(p => p.pair_id === pair.pair_id);
    assert(mapping, 'Unknown pair');
    for (const [side, other] of [['left','right'],['right','left']]) {
      const own = packet.candidates.find(c => c.alias === mapping[side]);
      const opposite = packet.candidates.find(c => c.alias === mapping[other]);
      pair[side+'_information'].evidence = pair[side+'_information'].evidence.filter(item => {
        if (item && typeof item === 'object' && typeof item.source === 'string' && item.source.startsWith(mapping[other]+'.') && typeof item.quote === 'string' && !displayed(own).includes(item.quote)) {
          assert(displayed(opposite).includes(item.quote), 'Opposite-side quote is not displayed either');
          pair[other+'_information'].evidence.push(item);
          changes.push({pointer:'/pair_reviews/'+pair.pair_id+'/'+side+'_information/evidence',conversion:'relocate explicitly opposite-source quote to its named candidate; retain full raw original'});
          return false;
        }
        return true;
      });
    }
  }
  function visit(node, pointer = '') {
    if (!node || typeof node !== 'object') return;
    for (const [key, child] of Object.entries(node)) {
      const here = pointer + '/' + key;
      if ((key === 'evidence' || key === 'issues') && Array.isArray(child)) {
        node[key] = child.map((item, index) => {
          if (typeof item === 'string') return item;
          assert(item && typeof item === 'object' && !Array.isArray(item), 'Unsupported format at ' + here);
          const converted = key === 'evidence' ? item.quote : JSON.stringify(item);
          assert(typeof converted === 'string' && converted.trim(), 'Missing literal quote at ' + here);
          changes.push({pointer: here + '/' + index, conversion: key === 'evidence' ? 'extract exact quote; rich original retained' : 'serialize complete issue object without editing'});
          return converted;
        });
      } else visit(child, here);
    }
  }
  visit(result);
  // Every field outside the two array representations must remain identical.
  function judgments(node) {
    if (Array.isArray(node)) return node.map(judgments);
    if (!node || typeof node !== 'object') return node;
    return Object.fromEntries(Object.entries(node).filter(([k]) => !['evidence','issues'].includes(k)).map(([k,v]) => [k, judgments(v)]));
  }
  assert.deepEqual(judgments(result), judgments(value));
  return {result, changes};
}
if (require.main === module) {
  const [input, output, packetFile] = process.argv.slice(2);
  if (input === '--self-test') {
    const original = {status:'omitted-essential',preference:'tie',issues:[{issue:'Missing fact',anchor_quote:'anchor'}],evidence:[{source:'email',quote:'exact',supports:'fact'}]};
    const checked = normalize(original);
    assert.equal(checked.result.status,original.status); assert.equal(checked.result.preference,original.preference);
    assert.deepEqual(checked.result.evidence,['exact']); assert.equal(checked.result.issues[0],JSON.stringify(original.issues[0]));
    assert.deepEqual(normalize({evidence:['exact'],issues:[]}).result,{evidence:['exact'],issues:[]});
    assert.throws(() => normalize({evidence:[{supports:'no quote'}]}));
    assert.throws(() => normalize({issues:[7]}));
    const packet={pairs:[{pair_id:'p',left:'a',right:'b'}],candidates:[{alias:'a',text:'left fact'},{alias:'b',text:'right fact'}]};
    const cross={pair_reviews:[{pair_id:'p',left_information:{status:'preserved',issues:[],evidence:[]},right_information:{status:'omitted-essential',issues:[],evidence:[{source:'a.text',quote:'left fact'}]}}]};
    const relocated=normalize(cross,packet); assert.deepEqual(relocated.result.pair_reviews[0].left_information.evidence,['left fact']);assert.deepEqual(relocated.result.pair_reviews[0].right_information.evidence,[]);
    cross.pair_reviews[0].right_information.evidence[0].quote='not displayed';assert.throws(()=>normalize(cross,packet));
    process.stdout.write(JSON.stringify({passed:true,offline_format_checks:6,judgments_changed:false})+'\n');
  } else {
    assert(input && output && input !== output, 'Use INPUT.json OUTPUT.json; preserve original separately');
    const bytes = fs.readFileSync(input), converted = normalize(JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/,'')),packetFile?JSON.parse(fs.readFileSync(packetFile,'utf8')):undefined);
    const serialized = JSON.stringify(converted.result,null,2)+'\n';
    fs.writeFileSync(output,serialized,{flag:'wx'});
    process.stdout.write(JSON.stringify({original_sha256:hash(bytes),normalized_sha256:hash(serialized),judgments_changed:false,changes:converted.changes},null,2)+'\n');
  }
}
module.exports = {normalize};
