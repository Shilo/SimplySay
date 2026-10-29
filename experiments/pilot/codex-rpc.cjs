// Development-only native app-server access. This does not create a thread or turn.
const { spawn } = require('node:child_process');
const readline = require('node:readline');
class CodexRpc {
  constructor(binary, profile, cwd, env) {
    this.sequence = 0;
    this.pending = new Map();
    this.stderr = '';
    this.fatal = null;
    this.child = spawn(binary, ['app-server', '--listen', 'stdio://'], {
      cwd, env: { ...env, CODEX_HOME: profile }, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'],
    });
    this.child.stderr.on('data', b => { this.stderr += b.toString(); });
    const fail = error => {
      this.fatal = error;
      for (const pending of this.pending.values()) { clearTimeout(pending.timer); pending.reject(error); }
      this.pending.clear();
    };
    this.child.on('error', fail);
    this.child.stdin.on('error', fail);
    readline.createInterface({ input: this.child.stdout }).on('line', line => {
      let value;
      try { value = JSON.parse(line); } catch { return; }
      if (value.id !== undefined && this.pending.has(value.id)) {
        const pending = this.pending.get(value.id);
        this.pending.delete(value.id);
        clearTimeout(pending.timer);
        if (value.error) pending.reject(new Error(JSON.stringify(value.error)));
        else pending.resolve(value.result);
      }
    });
    this.child.on('exit', code => {
      for (const pending of this.pending.values()) { clearTimeout(pending.timer); pending.reject(new Error(`app-server exited ${code}`)); }
      this.pending.clear();
    });
  }
  request(method, params) {
    if (this.fatal) return Promise.reject(this.fatal);
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { this.pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 20000);
      this.pending.set(id, { resolve, reject, timer });
      this.child.stdin.write(JSON.stringify({ id, method, params }) + '\n');
    });
  }
  async initialize() {
    const result = await this.request('initialize', { clientInfo: { name: 'simplysay_feasibility_controller', version: '0.0.0' }, capabilities: { experimentalApi: true } });
    this.child.stdin.write(JSON.stringify({ method: 'initialized' }) + '\n');
    return result;
  }
  close() { this.child.stdin.end(); this.child.kill(); }
}
module.exports = { CodexRpc };
