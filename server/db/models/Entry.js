const Sequelize = require('sequelize');
const db = require('../db');

const Entry = db.define('Entry', {
  notes: {
    type: Sequelize.TEXT,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.ENUM('asymmetry', 'border', 'color', 'elevation')),
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
