const router = require("express").Router();
const {checkAuth} = require("../auth-middleware.js");
const {
  models: {User},
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({token: await User.authenticate(req.body)});
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", checkAuth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.uid);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
