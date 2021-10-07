const router = require("express").Router();
const {
  models: { Mole },
} = require("../db");
module.exports = router;

// GET /api/mole/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const moles = await Mole.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(moles);
  } catch (err) {
    next(err);
  }
});

// PUT /api/mole/:moleId
router.put("/:moleId", async (req, res, next) => {
  try {
    const mole = await Mole.findByPk(req.params.moleId);
    res.json(await mole.update(req.body));
  } catch (err) {
    next(err);
  }
});

//POST /api/mole/ -- //Pass User ID in req.body (in related thunk -- ask GIGI)
router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await Mole.create(req.body));
  } catch (err) {
    next(err);
  }
});

//DELETE /api/mole/:moleId
router.delete("/:moleId", async (req, res, next) => {
  try {
    const mole = await Mole.findByPk(req.params.moleId);
    res.json(await mole.destroy());
  } catch (err) {
    next(err);
  }
});
