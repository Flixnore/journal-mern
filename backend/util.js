const fs = require("fs");

module.exports = {
  readJSON: function (path) {
    return JSON.parse(fs.readFileSync(path));
  },
  writeJSON: function (path, object) {
    fs.writeFileSync(path, JSON.stringify(object));
  },
};
