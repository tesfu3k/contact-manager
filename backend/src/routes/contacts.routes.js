import { Router } from "express";
import { generateId } from "../utils/id.js";
import { contacts } from "../data/contacts.js";
const route = new Router();

/*
 - GET /api/contacts/:id
 - GET /api/contacts
 - POST /api/contacts
 - PUT /api/contacts/:id
 - DELETE /api/contacts/:id
*/

route.get("/api/contacts", (req, res) => {
  res.json(contacts);
});
route.get("/api/contacts/:contactId", (req, res) => {
  const id = Number(req.params.contactId);

  if (!id)
    return res.status(400).json({ message: "invalid id params recived" });
  const contact = contacts.find((contact) => (contact.id == id ? true : false));
  if (!contact) return res.status(404).json({ message: "contact not found" });

  res.json(contact);
});

route.post("/api/contacts", (req, res) => {
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
});

//PUT /api/contacts/:id

route.put("/api/contacts/:contactId", (req, res) => {
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
  contacts = updatedContact;
  res
    .status(200)
    .json({ message: "the contact has been updated successfully" });
});

// DELETE /api/contacts/:id

route.delete("/api/contacts/:contactId", (req, res) => {
  const id = Number(req.params.contactId);
  if (!id) res.status(400).json({ message: "valid is required" });

  const deletedContact = contacts.filter((contact) => {
    return contact.id === id ? false : true;
  });
  contacts = deletedContact;
  res.status(200).json({ message: "contact has been deleted successfully " });
});

export default route;
