//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Mole = require("./models/Mole");
const Entry = require("./models/Entry");
const Tag = require("./models/Tag");

User.hasMany(Mole);
Mole.belongsTo(User);

Mole.hasMany(Entry);
Entry.belongsTo(Mole);

Entry.hasMany(Tag);

module.exports = {
  db,
  models: {
    User,
    Mole,
    Entry,
    Tag,
  },
};
