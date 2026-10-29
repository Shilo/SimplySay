'use strict';
function mergeContacts(teams){
  const rows=new Map();
  for(const team of teams) for(const contact of team.contacts){
    const key=contact.contact_id;
    const previous=rows.get(key);
    if(!previous||Date.parse(contact.updated_at)>Date.parse(previous.updated_at)) rows.set(key,{...contact});
  }
  return [...rows.values()];
}
module.exports={mergeContacts};
