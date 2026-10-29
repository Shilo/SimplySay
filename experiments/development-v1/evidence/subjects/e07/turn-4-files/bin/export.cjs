'use strict';
const {loadTeams}=require('../src/load.cjs');
const {mergeContacts}=require('../src/merge.cjs');
const {toCsv}=require('../src/csv.cjs');
const files=process.argv.slice(2);
if(!files.length){process.stderr.write('Usage: node bin/export.cjs FILE.json [FILE.json ...]\n');process.exitCode=2;}
else process.stdout.write(toCsv(mergeContacts(loadTeams(files))));
