// Development-only, offline capture checks. Does not launch a host or model.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const messageTools = new Set(['spawn_agent', 'send_message', 'followup_task', 'collaborationspawn_agent', 'collaborationsend_message', 'collaborationfollowup_task']);

function classifyDirective(message) {
  if (typeof message !== 'string' || !message.trim()) return { observable: false, kind: 'missing' };
  // This recognizes the observed encoding, not arbitrary encryption or plaintext.
  if (/^gAAAA[A-Za-z0-9_-]+={0,2}$/.test(message)) return { observable: false, kind: 'opaque-observed-encoding', length: message.length, sha256: sha(message) };
  return { observable: null, kind: 'text-candidate-needs-provenance', length: message.length, sha256: sha(message) };
}

function captureToolEvent(event) {
  if (event?.hook_event_name !== 'PreToolUse' || !messageTools.has(event.tool_name)) return null;
  const message = event.tool_input?.message;
  return { event: 'PreToolUse', tool: event.tool_name, message: classifyDirective(message) };
}

function scanRollout(file) {
  const selected = [], publicMessages = [];
  let lines = 0;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    lines++;
    if (!line || !/"type"\s*:\s*"(?:response_item|event_msg|inter_agent_communication(?:_metadata)?)"/.test(line)) continue;
    const item = JSON.parse(line), p = item.payload;
    if (item.type === 'response_item' && p?.type === 'function_call' && messageTools.has(p.name)) {
      let args; try { args = JSON.parse(p.arguments); } catch { args = {}; }
      selected.push({ line: lines, type: 'message-tool-call', name: p.name, namespace: p.namespace || null, argumentKeys: Object.keys(args), message: classifyDirective(args.message) });
    } else if (item.type === 'inter_agent_communication_metadata') {
      selected.push({ line: lines, type: item.type, keys: Object.keys(p || {}) });
    } else if (item.type === 'inter_agent_communication') {
      // Do not dump unknown fields. This branch establishes shape only.
      selected.push({ line: lines, type: item.type, keys: Object.keys(p || {}) });
    } else if (item.type === 'response_item' && p?.type === 'message' && p.role === 'assistant') {
      const text = (p.content || []).filter(c => c.type === 'output_text' && typeof c.text === 'string').map(c => c.text).join('');
      if (text) publicMessages.push({ line: lines, phase: p.phase || null, length: text.length, sha256: sha(text) });
    } else if (item.type === 'event_msg' && p?.type === 'agent_message' && typeof p.message === 'string') {
      publicMessages.push({ line: lines, phase: p.phase || null, length: p.message.length, sha256: sha(p.message) });
    }
  }
  return { file: path.basename(file), sha256: sha(fs.readFileSync(file)), selected, publicMessages };
}

function selfTest() {
  const text = 'Evaluate all ten crate pairs; retain totals and uncertainties.';
  const opaque = 'gAAAA' + 'A'.repeat(40);
  for (const name of messageTools) {
    assert.equal(captureToolEvent({ hook_event_name: 'PreToolUse', tool_name: name, tool_input: { message: text, private: 'excluded' } }).message.kind, 'text-candidate-needs-provenance');
    const captured = captureToolEvent({ hook_event_name: 'PreToolUse', tool_name: name, tool_input: { message: opaque, private: 'excluded' } });
    assert.equal(captured.message.observable, false);
    assert.ok(!JSON.stringify(captured).includes(opaque));
    assert.ok(!JSON.stringify(captured).includes('excluded'));
  }
  assert.equal(captureToolEvent({ hook_event_name: 'PostToolUse', tool_name: 'spawn_agent' }), null);
  assert.equal(captureToolEvent({ hook_event_name: 'PreToolUse', tool_name: 'Bash' }), null);
  assert.equal(classifyDirective(null).kind, 'missing');
  assert.equal(classifyDirective('').kind, 'missing');
  assert.equal(classifyDirective(text).observable, null); // Mock text is never proof of a live route.
  return { passed: true, syntheticCases: 17, realDirectiveCaptureProven: false, modelSessionsStarted: 0 };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args[0] === '--self-test') console.log(JSON.stringify(selfTest(), null, 2));
  else if (args[0] === '--scan' && args[1]) {
    const result = scanRollout(path.resolve(args[1]));
    if (args[2]) fs.writeFileSync(path.resolve(args[2]), JSON.stringify(result, null, 2) + '\n');
    else console.log(JSON.stringify(result, null, 2));
  } else throw new Error('Use --self-test or --scan <owned-rollout.jsonl> [output.json]');
}
module.exports = { classifyDirective, captureToolEvent, scanRollout, selfTest };
