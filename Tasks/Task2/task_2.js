const data = require("./inform");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(data);
});

app.post("/", (req, res) => {
  data.push(req.body);
  res.json(data);
});

app.put("/:id", (req, res) => {
  const { id } = req.params;

  if (!data[id]) {
    res.status(404).end();
  } else {
    data[id] = req.body;
    res.json(data);
  }
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  delete data[id];
  res.json(data);
});

console.log("server started");

app.listen(3030);
