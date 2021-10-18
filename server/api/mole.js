const router = require("express").Router();
const {
  models: { Mole, User, Entry },
} = require("../db");
module.exports = router;
const { checkAuth } = require("../auth-middleware");

// GET /api/mole/
router.get("/", checkAuth, async (req, res, next) => {
  try {
    const moles = await Mole.findAll({
      where: {
        userUid: req.user.uid,
      },
      include: {
        model: Entry,
      },
    });
    res.json(moles);
  } catch (err) {
    next(err);
  }
});

// GET /api/mole/:moleId
router.get("/:moleId", checkAuth, async (req, res, next) => {
  try {
    const mole = await Mole.findOne({
      where: {
        userUid: req.user.uid,
        id: req.params.moleId,
      },
      include: {
        model: Entry,
      },
    });
    res.json(mole);
  } catch (err) {
    next(err);
  }
});

//POST /api/mole/
router.post("/", checkAuth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.uid);
    const mole = await Mole.create(req.body);
    res.status(201).json(await mole.setUser(user));
  } catch (err) {
    next(err);
  }
});

// PUT /api/mole/:moleId
router.put("/:moleId", checkAuth, async (req, res, next) => {
  try {
    const mole = await Mole.findOne({
      where: {
        id: req.params.moleId,
        userUid: req.user.uid,
      },
    });

    if (mole) {
      res.json(await mole.update(req.body));
    } else {
      throw { status: 401, message: "Mole Not Found!" };
    }
  } catch (err) {
    next(err);
  }
});

//DELETE /api/mole/:moleId
router.delete("/:moleId", checkAuth, async (req, res, next) => {
  try {
    const mole = await Mole.destroy({
      where: {
        id: req.params.moleId,
        userUid: req.user.uid,
      },
    });
    if (mole) {
      res.sendStatus(200);
    } else {
      throw { status: 401, message: "Mole Not Found!" };
    }
  } catch (err) {
    next(err);
  }
});
