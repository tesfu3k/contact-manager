import express from "express";
const app = express();

app.use(express.json());

let contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "l2M0y@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "V2d1d@example.com",
    phone: "987-654-3210",
  },
];
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/*
 - GET /api/health
 - GET /api/contacts
 - POST /api/contacts
 - PUT /api/contacts/:id
 - DELETE /api/contacts/:id
*/

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/api/contacts", (req, res) => {
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

app.put("/api/contacts/:contactId", (req, res) => {
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

app.delete("/api/contacts/:contactId", (req, res) => {
  const id = Number(req.params.contactId);
  if (!id) res.status(400).json({ message: "valid is required" });

  const deletedContact = contacts.filter((contact) => {
    return contact.id === id ? false : true;
  });
  contacts = deletedContact;
  res.status(200).json({ message: "contact has been deleted successfully " });
});

const generateId = () => contacts.length + 1;

app.listen(5052, () => {
  console.log("server is running at port 5052 ");
});

//filter
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "l2M0y@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "V2d1d@example.com",
    phone: "987-654-3210",
  },
];
const targetId = 1;

const filteredUsers = users.filter((user) => false);

console.log(filteredUsers);
