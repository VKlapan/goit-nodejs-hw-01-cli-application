const fs = require("fs").promises;
const { Module } = require("module");
var path = require("path");

/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */

const contactsPath = "./db/";
const fileName = "contacts.json";

const file = path.join(contactsPath, fileName);
// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(file)
    .then((data) => console.log(data.toString()))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(file)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const foundContact = contacts.filter(
        ({ id }) => Number(id) === contactId
      );
      console.log(foundContact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(file)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const updatedContacts = contacts.filter(
        ({ id }) => Number(id) !== contactId
      );
      fs.writeFile(file, JSON.stringify(updatedContacts), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  const newContact = {
    id: new Date().toLocaleDateString(),
    name,
    email,
    phone,
  };
  fs.readFile(file)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      contacts.push(newContact);

      fs.writeFile(file, JSON.stringify(contacts), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
