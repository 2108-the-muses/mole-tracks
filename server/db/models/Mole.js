const Sequelize = require('sequelize');
const db = require('../db');

const Mole = db.define('mole', {
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  side: {
    type: Sequelize.ENUM('front', 'back'),
    allowNull: false,
  },
  // only certain body parts will show up on the front end depending on
  // which "side" is selected
  bodyPart: {
    type: Sequelize.ENUM('head', 'torso', 'arm-l', 'arm-r', 'leg-l', 'leg-r', 'groin', 'butt'),
    allowNull: false,
  },
  X:{
    type:Sequelize.INTEGER
  },
  Y:{
    type:Sequelize.INTEGER
  }
});

module.exports = Mole;
