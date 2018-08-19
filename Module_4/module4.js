const data = require("./books");
const slug = require("slug");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(data);
});

app.put("/:index", (req, res) => {
  const { index } = req.params;

  res.json((data[index].username = req.query.name));
});

app.delete("/:index", (req, res) => {
  const { index } = req.params;
  delete data[index];
  res.json(data);
});

app.post("/:index/books", (req, res) => {
  const { index } = req.params;
  data[index].books.push({
    title: req.query.title,
    author: req.query.author,
    get url() {
      return slug(this.title);
    }
  });
  res.json(data);
});

app.get("/users/:index/books/:title", (req, res) => {
  const { index, title } = req.params;
  const mainData = data[index].books.find(item =>
    item.title.toLowerCase().includes(title.toLowerCase())
  );
  res.json(mainData);
});

app.delete("/users/:index/books/:title", (req, res) => {
  const { index, title } = req.params;
  data[index].books = data[index].books.filter(
    item => !item.title.toLowerCase().includes(title.toLowerCase())
  );
  res.json(data);
});

app.put("/users/:index/books/:title", (req, res) => {
  const { index, title } = req.params;

  data[index].books = data[index].books.map(
    item =>
      item.title.toLowerCase().includes(title.toLowerCase())
        ? {
            title: req.query.title,
            author: req.query.author,
            get url() {
              return slug(this.title);
            }
          }
        : item
  );
  res.json(data);
});

console.log("server started");

app.listen(3030);
