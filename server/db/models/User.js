const Sequelize = require("sequelize");
const db = require("../db");


const User = db.define("user", {
  // username: {
  //   type: Sequelize.STRING,
  //   unique: true,
  //   allowNull: false,
  // },
  uid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

