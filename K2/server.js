const express = require("express");
const app = express();
const port = 5000;

const booksRouter = require("./router/booksRouter.router.js");

app.use(express.json());

app.use("/books", booksRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});
