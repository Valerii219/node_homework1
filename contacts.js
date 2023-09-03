const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');
console.log(contactsPath);

async function listContacts() {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
        
}
  
async function getContactById(id) {
  const contactId = String(id);
   const contacts = await listContacts();
   const result = contacts.find(contact => contact.id === contactId);
   return result || null;
  }
  
  async function removeContact(id) {
    const contactId = String(id);
    const contacts = await listContacts();
    const currentContactIndex = contacts.findIndex((contact) => contact.id === contactId);
    
    if (currentContactIndex === -1) {
        return null;
    }

    const removedContact = contacts.splice(currentContactIndex, 1)[0];

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    
    return removedContact;
}
  
  async function addContact(data) {

    const contacts = await listContacts();
    const newContact = {  id: nanoid(),
    ...data };
    contacts.push(newContact);
  
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}