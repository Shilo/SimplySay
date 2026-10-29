'use strict';
function mergeContacts(teams){
  const rows=new Map();
  for(const team of teams) for(const contact of team.contacts){
    const key=contact.email.trim().toLowerCase();
    const previous=rows.get(key);
    if(!previous||contact.updated_at>previous.updated_at) rows.set(key,{...contact});
  }
  return [...rows.values()];
}
module.exports={mergeContacts};
