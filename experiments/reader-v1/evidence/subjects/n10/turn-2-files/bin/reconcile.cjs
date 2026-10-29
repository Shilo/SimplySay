'use strict';
const fs=require('node:fs');
const {reconcile}=require('../lib/reconcile.cjs');
if(process.argv.length!==3){console.error('Use node bin/reconcile.cjs INPUT.json');process.exitCode=1;}else{try{const rows=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));process.stdout.write(JSON.stringify(reconcile(rows),null,2)+'\n');}catch(e){console.error(e.message);process.exitCode=1;}}
