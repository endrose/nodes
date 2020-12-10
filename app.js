const { render } = require("ejs");
const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.use(express.static("public"));

// START DATABASE
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_test",
});

app.get("/", (req, res) => {
  res.render("top.ejs");
});

app.get("/index", (req, res) => {
  connection.query("SELECT * from items", (error, results) => {
    res.render("index.ejs", { items: results });
  });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

// POST
app.post("/create", (req, res) => {
  connection.query(
    "INSERT INTO items (name) VALUES (?)",
    [req.body.name],
    (error, results) => {
      res.redirect("/index");
    }
  );
});

app.listen(port, () => {
  `Server running port: ${port}`;
});
