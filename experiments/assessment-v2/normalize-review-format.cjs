// Optional offline format adapter. Never infers or edits a reviewer's judgments.
'use strict';
const fs = require('node:fs');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
function normalize(value) {
  const result = JSON.parse(JSON.stringify(value));
  const changes = [];
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
  const [input, output] = process.argv.slice(2);
  if (input === '--self-test') {
    const original = {status:'omitted-essential',preference:'tie',issues:[{issue:'Missing fact',anchor_quote:'anchor'}],evidence:[{source:'email',quote:'exact',supports:'fact'}]};
    const checked = normalize(original);
    assert.equal(checked.result.status,original.status); assert.equal(checked.result.preference,original.preference);
    assert.deepEqual(checked.result.evidence,['exact']); assert.equal(checked.result.issues[0],JSON.stringify(original.issues[0]));
    assert.deepEqual(normalize({evidence:['exact'],issues:[]}).result,{evidence:['exact'],issues:[]});
    assert.throws(() => normalize({evidence:[{supports:'no quote'}]}));
    assert.throws(() => normalize({issues:[7]}));
    process.stdout.write(JSON.stringify({passed:true,offline_format_checks:4,judgments_changed:false})+'\n');
  } else {
    assert(input && output && input !== output, 'Use INPUT.json OUTPUT.json; preserve original separately');
    const bytes = fs.readFileSync(input), converted = normalize(JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/,'')));
    const serialized = JSON.stringify(converted.result,null,2)+'\n';
    fs.writeFileSync(output,serialized,{flag:'wx'});
    process.stdout.write(JSON.stringify({original_sha256:hash(bytes),normalized_sha256:hash(serialized),judgments_changed:false,changes:converted.changes},null,2)+'\n');
  }
}
module.exports = {normalize};
