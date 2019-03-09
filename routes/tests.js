const router = require("express").Router();

const Test = require("../db/models/test");

router.get("/", async (req, res, next) => {
  try {
    let tests = await Test.findAll();
    res.send(tests);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let id = await Number(req.params.id);
    let test = await Test.findById(id);
    res.send(test);
  } catch (err) {
    next(err);
  }
});

router.post("/student/:studentId", async (req, res, next) => {
  try {
    let studentId = await req.params.studentId;
    let newTest = await req.body;
    Test.findOrCreate(newTest).spread((newTest, created) => {
      res.status(201).send(newTest);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
