import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve( "db", "contacts.json");  

export const listContacts = async()=> {
    const res = await fs.readFile(contactsPath);
    return JSON.parse(res)
  }
  
export const getContactById= async(id) =>{
    const contacts = await listContacts();
    const res = contacts.find(item => item.id === id);
    return res || null;
  }

export const removeContact= async(contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
  }

export const addContact= async(name, email, phone) =>{
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,

    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }