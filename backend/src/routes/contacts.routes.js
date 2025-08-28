import { Router } from "express";

import {
  createContact,
  deletedContact,
  getAllContacts,
  getContact,
  updateContact,
} from "../controllers/contact.controllers.js";

const route = new Router();

/*
 - GET /api/contacts/:id
 - GET /api/contacts
 - POST /api/contacts
 - PUT /api/contacts/:id
 - DELETE /api/contacts/:id
*/

route.get("/", getAllContacts);
route.get("/:contactId", getContact);
route.post("/", createContact);
route.put("/:contactId", updateContact);
route.delete("/:contactId", deletedContact);

export default route;
