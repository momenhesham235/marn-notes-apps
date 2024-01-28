import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
const app = express();
const port = process.env.PORT || 3000;

dotenv.config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`notes app listening at http://localhost:${port}`);
});
