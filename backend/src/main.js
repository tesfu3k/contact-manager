import express from "express";
import contactsRoute from "./routes/contacts.routes.js";
import authRoute from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/contacts", contactsRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 5052;
app.listen(port, () => {
  console.log(`server is running at -> http://localhost:${port}`);
});
