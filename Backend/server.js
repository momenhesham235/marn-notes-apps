import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import notes from "./routes/notes.js";
import users from "./routes/users.js";
import { dbConnection } from "./config/db.js";
const app = express();
const port = 3000;

dotenv.config({
  path: "./config/.env",
});

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);

app.listen(port, () => {
  try {
    dbConnection();
    console.log(`Server running on port http://localhost:${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
