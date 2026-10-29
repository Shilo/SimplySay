// Disposable feasibility controller, not SimplySay runtime or a release installer.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const readline = require('node:readline');
const { CodexRpc } = require('./codex-rpc.cjs');
const root = path.resolve(__dirname, '../..');
const base = path.join(os.homedir(), 'AppData/Local/Temp/agent-eval-20261028/codex');
const binary = path.join(os.homedir(), 'AppData/Roaming/npm/node_modules/@openai/codex/node_modules/@openai/codex-win32-x64/vendor/x86_64-pc-windows-msvc/bin/codex.exe');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const frozen = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases.json'), 'utf8'));
if (hash(fs.readFileSync(path.join(__dirname, 'cases.json'))) !== '26db3a74932254c6c293369c3714f497dc748bbed191652a8d26dd17a628c5db') throw new Error('Frozen cases changed');
const policy = fs.readFileSync(path.join(__dirname, 'policy.txt'), 'utf8');
const minimal = fs.readFileSync(path.join(__dirname, 'minimal.txt'), 'utf8');
const selector = 'ss-feasibility@ss-feasibility-catalog';
const manifestPath = path.join(base, 'launch-manifest.json');
const env = { ...process.env };
for (const key of Object.keys(env)) {
  if (/API_KEY|AUTH_TOKEN|ACCESS_TOKEN|GITHUB_TOKEN|GH_TOKEN/.test(key) ||
      ['CODEX_HOME','CODEX_SESSION_ID','CODEX_THREAD_ID','CODEX_TOOL_CALL_ID','CODEX_INTERNAL_ORIGINATOR_OVERRIDE','CODEX_APP_TOOLS_PIPE_PATH','CODEX_APP_RUNTIME_CLI_PATH','CODEX_MCP_NODE_PATH','CODEX_TASK_WORKSPACE_VERIFYING_IDENTITY'].includes(key)) delete env[key];
}
function put(file, content) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); }
function native(profile, cwd, args) {
  const result = cp.spawnSync(binary, args, { cwd, env: { ...env, CODEX_HOME: profile }, encoding: 'utf8', timeout: 30000, windowsHide: true });
  if (result.status !== 0) throw new Error(`Native command failed: ${JSON.stringify({ args, code: result.status, stdout: result.stdout, stderr: result.stderr })}`);
  return result.stdout;
}
function removeAuth(profile) {
  const target = path.resolve(profile, 'auth.json');
  if (!target.startsWith(path.resolve(base) + path.sep)) throw new Error('Auth cleanup escaped pilot root');
  if (fs.existsSync(target)) fs.unlinkSync(target);
}
function reviewedCommand() { return `node -e "require(process.env.PLUGIN_ROOT + '/session-start.cjs')"`; }
function config(condition, caseId, profile) {
  let text = 'model = "gpt-6.1-sol"\nmodel_reasoning_effort = "low"\nforced_login_method = "chatgpt"\ncli_auth_credentials_store = "file"\nweb_search = "disabled"\nsandbox_mode = "workspace-write"\napproval_policy = "never"\n';
  if (condition === 'minimal') text += `developer_instructions = ${JSON.stringify(minimal)}\n`;
  const delegation = caseId === 'crate_pair_delegation';
  text += `[sandbox_workspace_write]\nnetwork_access = false\n[features]\napps = false\nmulti_agent = ${delegation}\n[agents]\nenabled = ${delegation}\nmax_threads = 1\nmax_depth = ${delegation ? 1 : 0}\n[plugins._default]\nenabled = false\n`;
  if (delegation) {
    const command=`node "${path.join(profile,'spawn-guard.cjs').replaceAll('\\','/')}"`;
    text += `\n[hooks]\nPreToolUse = [{ matcher = "spawn_agent", hooks = [{ type = "command", command = ${JSON.stringify(command)}, timeout = 5 }] }]\n`;
  }
  return text;
}
function fingerprints(profile, cwd, trial, subject) {
  const files = { config: path.join(profile, 'config.toml'), prompt: path.join(trial, 'prompt.txt') };
  for (const f of subject.input.fixture_files) files[`fixture:${f.path}`] = path.join(cwd, f.path);
  return Object.fromEntries(Object.entries(files).map(([key, file]) => [key, hash(fs.readFileSync(file))]));
}
function controllerHashes() {
  return Object.fromEntries(['codex-pilot.cjs','codex-rpc.cjs','session-budget.cjs','policy.txt','minimal.txt','cases.json'].map(file => [file, hash(fs.readFileSync(path.join(__dirname, file)))]).concat([['criteria',hash(fs.readFileSync(path.join(root,'docs/pilot-criteria.md')))]]));
}
function freeze() {
  const ledgerPath = path.join(root, '.local/pilot-sessions.json');
  if (fs.existsSync(ledgerPath) && JSON.parse(fs.readFileSync(ledgerPath,'utf8')).reservations.length) throw new Error('Cannot change manifest after session reservations');
  const order = [
    ['r01', 'reimbursement_batch', 'absent', 1],
    ['r02', 'reimbursement_batch', 'enabled', 1],
    ['r03', 'queue_failure_explanation', 'enabled', 1],
    ['r04', 'reimbursement_batch', 'disabled', 1],
    ['r05', 'queue_failure_explanation', 'absent', 1],
    ['r06', 'reimbursement_batch', 'minimal', 1],
    ['r07', 'crate_pair_delegation', 'absent', 2],
    ['r08', 'crate_pair_delegation', 'enabled', 2],
  ];
  const sourceCommit = cp.spawnSync('git', ['-C', root, 'rev-parse', 'HEAD'], {encoding:'utf8'}).stdout.trim();
  put(manifestPath, JSON.stringify({ frozenBeforeTrials: true, sourceCommit, host: 'codex-cli 0.163.0', model: 'gpt-6.1-sol', effort: 'low', controllerHashes: controllerHashes(), policyHash: hash(policy), minimalHash: hash(minimal), caseHash: hash(fs.readFileSync(path.join(__dirname, 'cases.json'))), ceiling: 12, diagnosticSlots: 2, order }, null, 2));
  const plugin = path.join(base, 'catalog/plugin');
  put(path.join(plugin, '.codex-plugin/plugin.json'), JSON.stringify({ name: 'ss-feasibility', version: '0.0.0', description: 'Disposable communication experiment', hooks: './hooks/hooks.json' }, null, 2));
  put(path.join(plugin, 'policy.txt'), policy);
  const command = reviewedCommand();
  put(path.join(plugin, 'hooks/hooks.json'), JSON.stringify({ hooks: { SessionStart: [{ matcher: 'startup', hooks: [{ type: 'command', command, timeout: 10 }] }] } }, null, 2));
  put(path.join(plugin, 'session-start.cjs'), `const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');let raw='';process.stdin.on('data',b=>raw+=b);process.stdin.on('end',()=>{const input=JSON.parse(raw);const policy=fs.readFileSync(path.join(__dirname,'policy.txt'),'utf8');if(process.env.PLUGIN_DATA){fs.mkdirSync(process.env.PLUGIN_DATA,{recursive:true});fs.appendFileSync(path.join(process.env.PLUGIN_DATA,'events.jsonl'),JSON.stringify({event:input.hook_event_name,source:input.source,session_id:input.session_id,policyHash:crypto.createHash('sha256').update(policy).digest('hex')})+'\\n');}process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:'SessionStart',additionalContext:policy}}));});\n`);
  put(path.join(base, 'catalog/.agents/plugins/marketplace.json'), JSON.stringify({ name: 'ss-feasibility-catalog', plugins: [{ name: 'ss-feasibility', source: { source: 'local', path: './plugin' }, policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' } }] }, null, 2));
  console.log(JSON.stringify({ manifestPath, policyHash: hash(policy), count: order.length }));
}
async function prepare(id) {
  const plan = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const row = plan.order.find(r => r[0] === id);
  if (!row) throw new Error('Unknown planned ID');
  const [, caseId, condition] = row;
  const trial = path.join(base, 'runs', id), profile = path.join(trial, 'profile'), cwd = path.join(trial, 'task');
  if (fs.existsSync(trial)) throw new Error('Fresh profile required');
  fs.mkdirSync(profile, { recursive: true }); fs.mkdirSync(cwd);
  const subject = frozen.cases.find(c => c.id === caseId);
  for (const file of subject.input.fixture_files) {
    const target = path.resolve(cwd, file.path);
    if (!target.startsWith(cwd + path.sep)) throw new Error('Fixture escaped workspace');
    put(target, file.content);
  }
  put(path.join(trial, 'prompt.txt'), subject.input.prompt);
  put(path.join(profile, 'config.toml'), config(condition, caseId, profile));
  if(caseId==='crate_pair_delegation') put(path.join(profile,'spawn-guard.cjs'),`const fs=require('node:fs'),path=require('node:path');let s='';process.stdin.on('data',b=>s+=b);function deny(){const reason='This synthetic task permits one root child and no descendants.';process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:'PreToolUse',permissionDecision:'deny',permissionDecisionReason:reason}}));process.stderr.write(reason);process.exitCode=2;}process.stdin.on('end',()=>{try{const i=JSON.parse(s);if(i.tool_name!=='spawn_agent')return;if(i.agent_id)return deny();fs.writeFileSync(path.join(__dirname,'spawn-used'),'1',{flag:'wx'});}catch(e){deny();}});\n`);
  const auth = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.codex/auth.json'), 'utf8'));
  if (auth.auth_mode !== 'chatgpt' || auth.OPENAI_API_KEY || !auth.tokens?.access_token) throw new Error('Subscription auth gate failed');
  put(path.join(profile, 'auth.json'), JSON.stringify({ auth_mode: auth.auth_mode, tokens: auth.tokens, last_refresh: auth.last_refresh }));
  const evidence = { id, caseId, condition, policyHash: plan.policyHash, installation: [] };
  try {
  if (['disabled', 'enabled'].includes(condition)) {
    evidence.installation.push(native(profile, cwd, ['plugin', 'marketplace', 'add', path.join(base, 'catalog'), '--json']));
    evidence.installation.push(native(profile, cwd, ['plugin', 'add', selector, '--json']));
  }
  evidence.inventory = JSON.parse(native(profile, cwd, ['plugin', 'list', '--json']));
  const rpc = new CodexRpc(binary, profile, cwd, env);
  try {
    await rpc.initialize();
    if(condition==='disabled') await rpc.request('config/batchWrite',{edits:[{keyPath:`plugins.${JSON.stringify(selector)}.enabled`,value:false,mergeStrategy:'replace'}],filePath:path.join(profile,'config.toml'),reloadUserConfig:true});
    evidence.hooksBefore = await rpc.request('hooks/list', { cwds: [cwd] });
    if (condition === 'enabled') {
      const hooks = evidence.hooksBefore.data.flatMap(x => x.hooks).filter(h => h.pluginId === selector && h.eventName === 'sessionStart');
      if (hooks.length !== 1) throw new Error(`Expected one owned hook, saw ${hooks.length}`);
      const hook = hooks[0];
      // Exact-definition trust follows the native TUI's hooks_rpc.rs path after source review.
      if (hook.command !== reviewedCommand() || hook.matcher !== 'startup' || hook.timeoutSec !== 10 || hook.handlerType !== 'command' || hook.isManaged) throw new Error('Unexpected hook definition');
      const installedRoot = path.resolve(path.dirname(hook.sourcePath), '..');
      if (!installedRoot.startsWith(path.resolve(base) + path.sep)) throw new Error('Installed hook outside disposable root');
      for (const relative of ['.codex-plugin/plugin.json', 'hooks/hooks.json', 'session-start.cjs', 'policy.txt']) {
        if (!fs.readFileSync(path.join(installedRoot, relative)).equals(fs.readFileSync(path.join(base, 'catalog/plugin', relative)))) throw new Error(`Installed artifact differs: ${relative}`);
      }
      await rpc.request('config/batchWrite', { edits: [{ keyPath: 'hooks.state', value: { [hook.key]: { trusted_hash: hook.currentHash } }, mergeStrategy: 'upsert' }], filePath: path.join(profile, 'config.toml'), reloadUserConfig: true });
      evidence.hooksAfter = await rpc.request('hooks/list', { cwds: [cwd] });
      if (!evidence.hooksAfter.data.flatMap(x => x.hooks).some(h => h.key === hook.key && h.trustStatus === 'trusted')) throw new Error('Exact hook trust not effective');
    }
    if(caseId==='crate_pair_delegation'){
      const guards=evidence.hooksBefore.data.flatMap(x=>x.hooks).filter(h=>h.eventName==='preToolUse'&&h.source==='user');
      if(guards.length!==1)throw new Error('Missing one-child budget guard');
      const guard=guards[0],expected=`node "${path.join(profile,'spawn-guard.cjs').replaceAll('\\','/')}"`;
      if(guard.command!==expected||guard.matcher!=='spawn_agent'||guard.timeoutSec!==5)throw new Error('Unexpected budget guard');
      await rpc.request('config/batchWrite',{edits:[{keyPath:'hooks.state',value:{[guard.key]:{trusted_hash:guard.currentHash}},mergeStrategy:'upsert'}],filePath:path.join(profile,'config.toml'),reloadUserConfig:true});
    }
    evidence.hooksEffective=await rpc.request('hooks/list',{cwds:[cwd]});
    evidence.configEffective=await rpc.request('config/read',{includeLayers:true,cwd});
  } finally { rpc.close(); }
  evidence.inventory=JSON.parse(native(profile,cwd,['plugin','list','--json']));
  const candidate=evidence.inventory.installed.find(p=>p.pluginId===selector);
  if(condition==='absent'||condition==='minimal'){if(candidate)throw new Error('Unexpected candidate installation');}
  else if(!candidate||candidate.enabled!==(condition==='enabled'))throw new Error('Candidate install/enable readback mismatch');
  const candidateHooks=evidence.hooksEffective.data.flatMap(x=>x.hooks).filter(h=>h.pluginId===selector);
  if(condition!=='enabled'&&candidateHooks.length)throw new Error('Candidate hook reached control condition');
  evidence.configHash = hash(fs.readFileSync(path.join(profile, 'config.toml')));
  evidence.fingerprints = fingerprints(profile,cwd,trial,subject);
  evidence.runtimeFiles={};
  for(const hook of evidence.hooksEffective.data.flatMap(x=>x.hooks)){
    if(hook.pluginId===selector){const installedRoot=path.resolve(path.dirname(hook.sourcePath),'..');for(const relative of ['.codex-plugin/plugin.json','hooks/hooks.json','session-start.cjs','policy.txt']){const file=path.join(installedRoot,relative);evidence.runtimeFiles[file]=hash(fs.readFileSync(file));}}
  }
  if(caseId==='crate_pair_delegation'){const file=path.join(profile,'spawn-guard.cjs');evidence.runtimeFiles[file]=hash(fs.readFileSync(file));}
  put(path.join(trial, 'preflight.json'), JSON.stringify(evidence, null, 2));
  console.log(JSON.stringify({ id, prepared: true, inventory: evidence.inventory, hookCount: evidence.hooksBefore.data.flatMap(x => x.hooks).length }));
  } catch (error) { removeAuth(profile); throw error; }
}
async function run(id) {
  const plan = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const row = plan.order.find(r => r[0] === id);
  if (!row) throw new Error('Unknown planned ID');
  const trial = path.join(base, 'runs', id), profile = path.join(trial, 'profile'), cwd = path.join(trial, 'task');
  if (!fs.existsSync(path.join(trial, 'preflight.json')) || fs.existsSync(path.join(trial, 'result.json'))) throw new Error('Not prepared or already run');
  const preflight=JSON.parse(fs.readFileSync(path.join(trial,'preflight.json'),'utf8'));
  const subject=frozen.cases.find(c=>c.id===row[1]);
  if(JSON.stringify(controllerHashes())!==JSON.stringify(plan.controllerHashes)||JSON.stringify(fingerprints(profile,cwd,trial,subject))!==JSON.stringify(preflight.fingerprints)){removeAuth(profile);throw new Error('Controller/config/prompt/fixture fingerprint changed');}
  for(const [file,digest]of Object.entries(preflight.runtimeFiles||{}))if(hash(fs.readFileSync(file))!==digest){removeAuth(profile);throw new Error('Installed runtime fingerprint changed');}
  const reservation = cp.spawnSync(process.execPath, [path.join(__dirname, 'session-budget.cjs'), 'reserve', id, 'codex', row[1], String(row[3])], { cwd: root, encoding: 'utf8' });
  if (reservation.status !== 0) { removeAuth(profile); throw new Error(reservation.stderr); }
  const args = ['--no-daemon', 'exec', '--skip-git-repo-check', '--json', '--color', 'never', '-C', cwd, '-o', path.join(trial, 'final.txt'), '-'];
  const started = Date.now();
  let code = null, error = null, timeout;
  const observedChildren = new Set();
  let budgetViolation = false;
  try {
    const child = cp.spawn(binary, args, { cwd, env: { ...env, CODEX_HOME: profile }, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    const stopTree = () => { if (child.pid) cp.spawnSync('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true, encoding: 'utf8', timeout: 10000 }); };
    put(path.join(trial, 'events.jsonl'),'');put(path.join(trial,'stderr.txt'),'');
    const ioFailure=failure=>{error=failure.message;stopTree();};
    child.stdout.on('data',chunk=>{try{fs.appendFileSync(path.join(trial,'events.jsonl'),chunk);}catch(failure){ioFailure(failure);}});
    child.stderr.on('data',chunk=>{try{fs.appendFileSync(path.join(trial,'stderr.txt'),chunk);}catch(failure){ioFailure(failure);}});
    child.stdout.on('error',ioFailure);child.stderr.on('error',ioFailure);child.stdin.on('error',ioFailure);
    readline.createInterface({ input: child.stdout }).on('line', line => {
      let event; try { event = JSON.parse(line); } catch { return; }
      const item = event.item;
      if (item && ['collab_tool_call', 'collab_agent_tool_call'].includes(item.type) && /spawn/i.test(item.tool || '')) {
        for (const receiver of item.receiver_thread_ids || []) observedChildren.add(receiver);
        if (observedChildren.size > row[3] - 1) { budgetViolation = true; stopTree(); }
      }
    });
    child.stdin.end(fs.readFileSync(path.join(trial, 'prompt.txt')));
    timeout = setTimeout(stopTree, 240000);
    code = await new Promise((resolve, reject) => { child.once('error', reject); child.once('close', resolve); });
  } catch (failure) { error = failure.message; }
  finally { clearTimeout(timeout); removeAuth(profile); }
  put(path.join(trial, 'result.json'), JSON.stringify({ id, code, error, budgetViolation, observedChildren: [...observedChildren], durationMs: Date.now() - started, model: plan.model, effort: plan.effort, plannedSlots: row[3], authCopyRemoved: !fs.existsSync(path.join(profile, 'auth.json')) }, null, 2));
  cp.spawnSync(process.execPath, [path.join(__dirname, 'session-budget.cjs'), 'finish', id, code === 0 && !error && !budgetViolation ? 'completed' : 'failed'], { cwd: root, encoding: 'utf8' });
  console.log(JSON.stringify({ id, code, error, budgetViolation, durationMs: Date.now() - started }));
}
const [action, id] = process.argv.slice(2);
(async () => { if (action === 'freeze') freeze(); else if (action === 'prepare') await prepare(id); else if (action === 'run') await run(id); else throw new Error('Use freeze, prepare ID, or run ID'); })().catch(e => { console.error(e.message); process.exitCode = 1; });
