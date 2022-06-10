const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const booksController = require("./controller/books.controller");
const booksRouter = "./router/booksRouter.js";
const books = require("./models/books.model");

app.get("/", (req, res) => {
  res.send("Welcome to the library system");
});

app.use("/books", booksRouter.router);

app.listen(port, () => {
  console.log(`Servern är igång i port ${port}.`);
});
