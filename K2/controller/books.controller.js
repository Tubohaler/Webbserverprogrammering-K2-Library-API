const books = require("../models/books.model");

async function getBooks(req, res) {
  const result = await books.getAllBooks();

  if (!result) {
    return res.status(400).json({ error: "No books to be found." });
  }
  if (result.length === 0) {
    return res.status(200).json({ error: "No books in the library." });
  }
  res.status(200).json({ message: "All the books have been fetched!", result });
}

async function getBook(req, res) {
  const id = req.params.id;
  const foundBook = await books.getBook(id);

  if (!id || !foundBook) {
    return res.status(404).json({ error: "Sorry! No book here with that ID." });
  }
  res.status(200).json({ message: `Book with ID ${id} retrieved`, foundBook });
}

async function addBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).send("Bad request.");
  }
  const newBook = {
    title,
    author,
    genre,
  };

  await books.addBook(newBook);

  res.status(201).json({ message: "Book now added!", newBook });
}

async function changeBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).json({ message: "You need to add proper info." });
  }

  const id = req.params.id;
  const changeBook = {
    title,
    author,
    genre,
  };

  await books.changeBook(id, changeBook);
  res
    .status(200)
    .json({ message: "Book now swopped for a new one.", updated: req.body });
}

async function editBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title && !author && !genre) {
    return res.status(400).json({ error: "Bad request!" });
  }

  const id = req.params.id;
  const editBook = await books.editBook(id, title, author, genre);

  res.status(200).json({ message: "Book edit completed.", updated: req.body });
}

async function deleteBook(req, res) {
  const id = req.params.id;
  const result = await books.getBook(id);
  if (!result) {
    return res.status(404).json({ error: `${id} Does not exist!` });
  }
  const deletedBook = await books.deleteBook(id);

  res.status(200).json({ message: `Book now erased.` });
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  changeBook,
  editBook,
  deleteBook,
};
