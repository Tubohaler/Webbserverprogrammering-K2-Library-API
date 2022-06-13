const books = require("../models/books.model");

async function getBooks(req, res) {
  const result = await books.getAllBooks();

  res.json(result);
}

async function getBook(req, res) {
  const id = req.params.id;
  const foundBook = await books.getBook(id);

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
  const id = req.params.id;
  const changeBook = {
    title,
    author,
    genre,
  };

  await books.changeBook(id, changeBook);
  res.json(changeBook);
}

async function editBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title && !author && !genre) {
    return res.status(400).json({ error: "Bad request!" });
  }

  const id = req.params.id;
  const editBook = await books.editBook(id, title, author, genre);

  res.json(editBook);
}

async function deleteBook(req, res) {
  const id = req.params.id;
  const result = await books.getBook(id);
  if (!result) {
    return res.status(404).json({ error: `${id} Does not exist!` });
  }
  const deletedBook = await books.deleteBook(id);

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
