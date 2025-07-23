import express from "express";
import bodyParser from "body-parser";
import database from "./config/db.js";

import "./models/index.js"; // import all models to be used at database

import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Health");
});

(async () => {
  try {
    await database.sync();
    console.log("Database connected");
  } catch (error) {
    console.log("Fail to connect on db:", error);
  }
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
