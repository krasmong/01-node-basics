const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf8");
    const listOfContacts = JSON.parse(allContacts);

    console.log("List of contacts:");
    console.table(listOfContacts);
    return listOfContacts;
  } catch (error) {
    return console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf8");
    const contactById = JSON.parse(allContacts).find(
      ({ id }) => id === contactId
    );
    console.table(contactById);
    return getContactById;
  } catch (error) {
    return console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf8");
    const newContacts = JSON.parse(allContacts).filter(
      ({ id }) => id !== contactId
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      "utf8"
    );

    console.table(newContacts);
    return newContacts;
  } catch (error) {
    return console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf8");
    const listOfContacts = JSON.parse(allContacts);

    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
    const newContactsList = [...listOfContacts, newContact];

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList, null, 2),
      "utf8"
    );

    console.table(newContactsList);
    return newContactsList;
  } catch (error) {
    return console.error(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
