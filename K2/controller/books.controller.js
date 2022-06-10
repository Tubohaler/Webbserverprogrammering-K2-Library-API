// Models:
const books = require("../models/books.model");

async function getBooks(req, res) {
  const result = await books.getAllBooks();

  res.json(result);
}

async function getBook(req, res) {
  const wantedBook = req.params.id;
  const foundBook = await books.getBook(wantedBook);

  res.json(foundBook);
}

async function addBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).send("Något gick fel!");
  }
  const newBook = {
    title,
    author,
    genre,
  };

  await books.addBook(newBook);

  res.json(newBook);
}

async function changeBook(req, res) {
  const { title, author, genre } = req.body;
  const wantedBook = req.params.id;
  const changeBook = {
    title,
    author,
    genre,
  };

  await books.changeBook(wantedBook, changeBook);
  res.json(changeBook);
}

async function editBook(req, res) {
  const { title } = req.body;

  const wantedBook = req.params.id;
  const editBook = await books.editBook(wantedBook, title);

  res.json(editBook);
}

async function deleteBook(req, res) {
  const wantedBook = req.params.id;
  const deletedBook = await books.deleteBook(wantedBook);

  res.json(deletedBook);
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  changeBook,
  editBook,
  deleteBook,
};
