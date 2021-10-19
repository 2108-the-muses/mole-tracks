const router = require("express").Router();
const { checkAuth } = require("../auth-middleware.js");
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    console.log("IN LOGIN");
    const user = await User.findByPk(req.body.uid);
    console.log("USER?", user);
    res.send(user);
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
    console.log("error in me");
    next(ex);
  }
});

// PUT /auth/update
router.put("/update", checkAuth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.uid);

    if (user) {
      console.log(await user.update(req.body));
      res.json(await user.update(req.body));
    } else {
      throw { status: 401, message: "User not Found!" };
    }
  } catch (err) {
    next(err);
  }
});
