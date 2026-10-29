'use strict';
const columns=['contact_id','name','email','updated_at'];
const quote=value=>/[",\r\n]/.test(String(value))?'"'+String(value).replaceAll('"','""')+'"':String(value);
function toCsv(rows){return [columns.join(','),...rows.map(row=>columns.map(key=>quote(row[key])).join(','))].join('\n')+'\n';}
module.exports={toCsv};
