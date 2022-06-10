const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
  console.log("yay, ansluten till bokbussen!");

  //   SQL-statement för tabell books, innehåller id, titel, författare och genre.
  const statement = `
  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    genre TEXT)`;

  db.run(statement, (error) => {
    // Om tabellen redan finns så kommer det här felmeddelandet att köras:
    if (error) {
      console.error(error.message);
      // return;
    } else {
      // Lägga till flera böcker genom detta SQL-statementet
      const insert = `INSERT INTO books
      (title, author, genre)
      VALUES (?, ?, ?)`;

      // Prövar att lägga till en bok här:
      db.run(insert, ["Bibeln", "Torahn", "Dhammapada"]);
    }
  });
});
module.exports = db;
