'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const names=['labels.csv','layout.svg','manual.txt'];
const read=relative=>{const file=path.join(root,relative);if(!fs.existsSync(file))return null;const bytes=fs.readFileSync(file);return {bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};};
process.stdout.write(JSON.stringify(names.map(name=>({name,source:read('source-pack/'+name),staged:read('staged-pack/'+name)})),null,2)+'\n');
