const router = require("express").Router();
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
    console.log("in signup", user);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
