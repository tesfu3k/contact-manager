import { contacts, updateContacts } from "../data/contacts.js";
import { generateId } from "../utils/id.js";

const getAllContacts = (req, res) => {
  res.json(contacts);
};

const getContact = (req, res) => {
  const id = Number(req.params.contactId);
  if (!id)
    return res.status(400).json({ message: "invalid id params recived" });
  const contact = contacts.find((contact) => (contact.id == id ? true : false));
  if (!contact) return res.status(404).json({ message: "contact not found" });
  res.json(contact);
};

const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "invalid data" });
  }

  // generateId current
  const id = generateId();

  // .push data save
  contacts.push({
    id,
    name,
    email,
    phone,
  });

  // res json message success
  res.status(201).json({ message: "data created successfuly" });
};

const updateContact = (req, res) => {
  // grap data
  const id = Number(req.params.contactId);
  const { name, email, phone } = req.body;

  // validate the data
  if (!id) return res.status(400).json({ message: "invalid contact ID" });
  if (!name && !email && !phone)
    return res.status(400).json({ message: "At list one data is reqired " });
  // update the target contact data
  const updatedContact = contacts.map((contact) => {
    if (contact.id === id) {
      return {
        ...contact,
        name: name || contact.name,
        email: email || contact.email,
        phone: phone || contact.phone,
      };
    }
    return contact;
  });

  // update the main contacts
  updateContacts(updatedContact);
  res
    .status(200)
    .json({ message: "the contact has been updated successfully" });
};
const deletedContact = (req, res) => {
  const id = Number(req.params.contactId);
  if (!id) res.status(400).json({ message: "valid is required" });

  const updatedContact = contacts.filter((contact) => {
    return contact.id === id ? false : true;
  });

  // updated contact list contact after delete operation

  updateContacts(updatedContact);
  res.status(200).json({ message: "contact has been deleted successfully " });
};

export {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deletedContact,
};
