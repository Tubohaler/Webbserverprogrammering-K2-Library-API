const express = require("express");
const app = express();
const port = 5000;

const booksController = require("./controller/books.controller");
const booksRouter = require("./router/booksRouter.js");
const books = require("./models/books.model");

app.use(express.json());

app.use("/books", booksRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});
