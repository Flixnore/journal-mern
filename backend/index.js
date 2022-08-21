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

app.get("/getSettings", (req, res) => res.json(config.conn));

app.get("/getEntries", (req, res) => {
  let type = req.query.type;
  let title = req.query.title;
  let words = req.query.words;
  let entryID = req.query.entryID;
  let date = req.query.date;
  let limit = req.query.limit;
  let where = "";

  function build_cond(bite, column) {
    if (!bite) return "";
    return bite.charAt(0) === "!"
      ? `${column} NOT LIKE '%${bite.substring(1)}%' AND `
      : `${column} LIKE '%${bite}%' AND `;
  }

  // build where clause
  if (type || title || words || entryID || date) {
    where += "WHERE ";
    where += build_cond(type, "type");
    where += build_cond(title, "title");
    where += build_cond(words, "text");
    where += build_cond(entryID, "entryID");
    where += build_cond(date, "CAST(date AS char)");

    where = where.slice(0, -4);
  }

  let sql = `
  SELECT entryID, title, type, DATE_FORMAT(date, '%m-%d-%Y') AS date, date as original_date, text FROM entries 
    ${where}
  ORDER BY original_date DESC, timestamp DESC
  LIMIT ${limit ? limit : limit === "" ? "18446744073709551615" : "15"};`;
  console.log(sql);

  conn.query(sql, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
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
    }
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
