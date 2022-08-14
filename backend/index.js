const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const fs = require('fs');
const toml = require('toml');

const app = express();
const port = process.env.PORT || 5000;

const config = toml.parse(fs.readFileSync('./db.toml', 'utf-8'));
const conn = mysql.createConnection(config.conn);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get("/getPreviews", (req, res) => {
  const sql =
    "SELECT entryID, title, type, date FROM entries ORDER BY date DESC, timestamp DESC LIMIT 20;";

  conn.query(sql, function (err, rows) {
    if (err) throw err;
    let objs = [];
    for (var i = 0; i < rows.length; i++) {
      objs.push({
        entryID: rows[i].entryID,
        title: rows[i].title,
        type: rows[i].type,
        date: rows[i].date,
      });
    }
    res.json(objs);
  });
});

app.get("/getEntry", (req, res) => {
  const entryID = req.query.entryID;
  const sql = `SELECT * FROM entries WHERE entryID = ${entryID};`;

  conn.query(sql, function (err, [entry]) {
    if (err) throw err;
    // TODO, entry can be undefined here
    res.json({
      title: entry.title,
      date: entry.date,
      text: entry.text,
    });
  });
});

app.post("/journalPost", (req, res) => {
  console.log(req.body);
  const date = req.body.date;
  const type = req.body.type;
  const title = req.body.title;
  const text = req.body.text;

  const sql = `INSERT INTO entries (title, text, date, dayOfWeek,  type) 
            VALUES ('${title}', '${text}', '${date}', DAYOFWEEK('${date}'), '${type}') 
            ON DUPLICATE KEY UPDATE text = '${text}';`;

  conn.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      // Throw a success message here.
      res.send("yeeted");
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));