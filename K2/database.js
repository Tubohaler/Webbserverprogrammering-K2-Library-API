const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
  console.log("Were talking now!");

  const statement = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    genre TEXT)`;

  db.run(statement, (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    const insert = `INSERT INTO books (title, author, genre)
      VALUES (?, ?, ?)`;

    db.run(insert, ["Bibeln", "Gubben", "Skräck"], (error) => {
      if (error) {
        console.error(error);
      }
    });
  });
});
module.exports = db;
