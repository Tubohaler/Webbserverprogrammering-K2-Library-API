const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    //ifall det inte gick att öppna databasen
    console.error(error.message);
    throw error;
  }
  console.log("Were talking now!");

  //   SQL-statement för tabell books, innehåller id, titel, författare och genre.
  const statement = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    genre TEXT)`;

  db.run(statement, (error) => {
    // Om tabellen redan finns kör detta felmeddelande:
    if (error) {
      console.error(error.message);
      throw error;
      // return;
    }
    // Lägga till flera böcker genom detta SQL-statementet
    const insert = `INSERT INTO books (title, author, genre)
      VALUES (?, ?, ?)`;

    // Prövar att lägga till en bok här:
    db.run(insert, ["Bibeln", "Gubben", "Skräck"], (error) => {
      if (error) {
        console.error(error);
      }
    });
  });
});
module.exports = db;
