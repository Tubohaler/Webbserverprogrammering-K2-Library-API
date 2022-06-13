const express = require("express");
const booksRouter = express.Router();
const booksController = require("../controller/books.controller");

booksRouter.get("/", booksController.getBooks);
booksRouter.get("/:id", booksController.getBook);
booksRouter.post("/", booksController.addBook);
booksRouter.put("/:id", booksController.changeBook);
booksRouter.patch("/:id", booksController.editBook);
booksRouter.delete("/:id", booksController.deleteBook);

module.exports = booksRouter;
