'use strict';
const fs=require('node:fs');
function loadTeams(files){return files.map(file=>JSON.parse(fs.readFileSync(file,'utf8')));}
module.exports={loadTeams};
