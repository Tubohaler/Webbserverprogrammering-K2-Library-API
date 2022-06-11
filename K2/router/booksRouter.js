const express = require("express");
const booksRouter = express.Router();
const booksController = require("../controller/books.controller");

booksRouter.get("/books", booksController.getBooks);
booksRouter.get("/books/:id", booksController.getBook);
booksRouter.post("books", booksController.addBook);
booksRouter.put("/books/:id", booksController.changeBook);
booksRouter.patch("/books/:id", booksController.editBook);
booksRouter.delete("/books/:id", booksController.deleteBook);

module.exports = booksRouter;
