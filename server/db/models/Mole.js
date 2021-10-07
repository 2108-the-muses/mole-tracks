const Sequelize = require('sequelize');
const db = require('../db');

const Mole = db.define('mole', {
  nickname: {
    type: Sequelize.STRING,
  },
  side: {
    type: Sequelize.ENUM('front', 'back'),
    allowNull: false,
  },
  bodyPart: {
    type: Sequelize.ENUM(
      'head',
      'torso',
      'left arm',
      'right arm',
      'left leg',
      'right leg',
      'groin',
      'butt'
    ),
  },
});
