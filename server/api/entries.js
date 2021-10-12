const router = require("express").Router();
const {
  models: {Entry},
} = require("../db");
module.exports = router;

// GET one /api/entries/:entryId
router.get("/:entryId", async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.entryId);
    res.json(entry);
  } catch (err) {
    next(err);
  }
});

// GET all /api/entries/all/:moleId
router.get("/all/:moleId", async (req, res, next) => {
  try {
    const entries = await Entry.findAll({
      where: {
        moleId: req.params.moleId,
      },
    });
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

// PUT /api/entries/:entryId
router.put("/:entryId", async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.entryId);
    res.json(await entry.update(req.body));
  } catch (err) {
    next(err);
  }
});

// POST /api/entries
router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await Entry.create(req.body));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/entries/:entryId
router.delete("/:entryId", async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.entryId);
    res.json(await entry.destroy());
  } catch (err) {
    next(err);
  }
});
