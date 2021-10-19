const Sequelize = require("sequelize");
const db = require("../db");

const Entry = db.define("entry", {
  notes: {
    type: Sequelize.TEXT,
  },
  date: {
    type: Sequelize.DATE,
  },
  imgUrl: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true,
    },
  },
  asymmetryTag: {
    type: Sequelize.ENUM("Symmetric", "Asymmetric", ""),
    defaultValue: "",
  },
  borderTag: {
    type: Sequelize.ENUM("Defined", "Fuzzy", ""),
    defaultValue: "",
  },
  colorTag: {
    type: Sequelize.ENUM("Single Color", "Many Colors", ""),
    defaultValue: "",
  },
  elevationTag: {
    type: Sequelize.ENUM("Flat", "Raised", ""),
    defaultValue: "",
  },
  diameterTag: {
    type: Sequelize.ENUM("Under 6mm", "Over 6mm", ""),
    defaultValue: "",
  },
});

module.exports = Entry;
