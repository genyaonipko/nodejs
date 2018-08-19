const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let json = {};

app.use(bodyParser.json());

app.post("/", (req, res) => {
  json = req.body;
  res.json(json);
});

app.get("/", (req, res) => {
  res.json(json);
});

console.log("Port is running");

app.listen(3000);
