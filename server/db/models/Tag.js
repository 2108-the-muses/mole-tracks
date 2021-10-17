const Sequelize = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
  category: {
    type: Sequelize.ENUM(
      "asymmetry",
      "border",
      "color",
      "elevation",
      "diameter"
    ),
  },
  value: {
    type: Sequelize.TEXT,
  },
});

module.exports = Tag;
