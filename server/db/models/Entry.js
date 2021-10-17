const Sequelize = require("sequelize");
const db = require("../db");

const Entry = db.define("entry", {
  notes: {
    type: Sequelize.TEXT,
  },
  // for dummy data purposes
  imgUrl: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Entry;
