const router = require("express").Router();
const {
  models: { Mole },
} = require("../db");
module.exports = router;
const {checkAuth} = require("../auth-middleware")

// GET /api/mole/:userId
router.get("/:userId", checkAuth, async (req, res, next) => {
  console.log("req params", req.params.userId)
  try {
    const moles = await Mole.findAll({
      where: {
        userUid: req.params.userId,
      },
    });
    res.json(moles);
  } catch (err) {
    next(err);
  }
});

// PUT /api/mole/:moleId
router.put("/:moleId", checkAuth, async (req, res, next) => {
  try {
    const mole = await Mole.findByPk(req.params.moleId);
    res.json(await mole.update(req.body));
  } catch (err) {
    next(err);
  }
});

//POST /api/mole/ -- //Pass User ID in req.body (in related thunk -- ask GIGI)
router.post("/", checkAuth, async (req, res, next) => {
  try {
    res.status(201).json(await Mole.create(req.body));
  } catch (err) {
    next(err);
  }
});

//DELETE /api/mole/:moleId
router.delete("/:moleId", checkAuth, async (req, res, next) => {
  try {
    const mole = await Mole.findByPk(req.params.moleId);
    res.json(await mole.destroy());
  } catch (err) {
    next(err);
  }
});
