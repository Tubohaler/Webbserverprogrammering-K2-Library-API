const res = require("express/lib/response");
const db = require("../database");

function getAllBooks() {
  const sql = "SELECT * FROM books";

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        // res.status(400);
        reject(error);
      }
      // res.status(200);
      resolve(rows);
    });
  });
}

function getBook(id) {
  const sql = "SELECT * FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error, rows) => {
      if (error) {
        console.error(error.message);
        // res.status(400);
        reject(error);
      }
      // res.status(200);
      resolve(rows);
    });
  });
}

function addBook(book) {
  const sql = "INSERT INTO books (title, author, genre) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [book.title, book.author, book.genre], (err) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        reject(err);
      }
      res.status(201);
      resolve();
    });
  });
}

function changeBook(id, book) {
  const sql = `UPDATE books SET title = '${book.title}', author = '${book.author}', genre = '${book.genre}' WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        reject(err);
      }
      res.status(200);
      resolve();
    });
  });
}

function editBook(id, title, author, genre) {
  const sql = `UPDATE books SET title = COALESCE(?,title),author = COALESCE(?,author), genre = COALESCE(?,genre) WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [title, author, genre, id], function (err) {
      if (err) {
        console.error(err.message);
        res.status(400);
        reject(err);
      }
      res.status(200);
      resolve(this);
    });
  });
}

function deleteBook(id) {
  const sql = "DELETE FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error) => {
      // if ? !== id :?
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve();
    });
  });
}

module.exports = {
  getBook,
  getAllBooks,
  addBook,
  changeBook,
  editBook,
  deleteBook,
};
