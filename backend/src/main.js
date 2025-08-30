import "dotenv/config";
import express from "express";
import contactsRoute from "./routes/contacts.routes.js";
import authRoute from "./routes/auth.routes.js";
import { connectToDb } from "./config/db.config.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/api/auth", authRoute);
app.use("/api/contacts", contactsRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 5052;

connectToDb();

app.listen(port, () => {
  console.log(`server is running at -> http://localhost:${port}`);
});
