import express from "express";
const app = express();
import contactsRoute from "./routes/contacts.routes.js";

app.use(express.json());
app.use(contactsRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(5052, () => {
  console.log("server is running at port 5052 ");
});
