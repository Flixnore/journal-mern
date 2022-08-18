const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const fs = require("fs");
const toml = require("toml");

const app = express();
const port = process.env.PORT || 5000;

const config = toml.parse(fs.readFileSync("./db.toml", "utf-8"));
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

app.get("/getEntries", (req, res) => {
  let words = req.query.words;
  let type = req.query.type;
  let entryID = req.query.entryID;

  let sql = `
  SELECT entryID, title, type, date, text FROM entries 
    ${words ? `WHERE text like '%${words}%' or title like '%${words}%'` : ""}
    ${type ? `WHERE type like '%${words}%' ` : ""}
    ${entryID ? `WHERE entryID = ${entryID} ` : ""} 
  ORDER BY date DESC, timestamp DESC;`;
  console.log(sql);

  conn.query(sql, function (err, rows) {
    if (err) throw err;
    let objs = [];
    for (var i = 0; i < rows.length; i++) {
      objs.push({
        entryID: rows[i].entryID,
        title: rows[i].title,
        type: rows[i].type,
        date: rows[i].date,
        text: rows[i].text,
      });
    }
    res.json(objs);
  });
});

app.post("/journalPost", (req, res) => {
  console.log(req.body);
  const date = req.body.date;
  const type = req.body.type.replace(/(["'])/g, "\\$1");
  const title = req.body.title.replace(/(["'])/g, "\\$1");
  const text = req.body.text.replace(/(["'])/g, "\\$1");
  const lat = req.body.lat;
  const long = req.body.long;

  const sql = `INSERT INTO entries (title, text, date, dayOfWeek,  type, location) 
            VALUES ('${title}', "${text}", '${date}', DAYOFWEEK('${date}'), '${type}', POINT(${lat}, ${long})) 
            ON DUPLICATE KEY UPDATE text = '${text}';`;

  conn.query(sql, function (err, result) {
    if (err) throw err;
    res.send("yeeted");
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
