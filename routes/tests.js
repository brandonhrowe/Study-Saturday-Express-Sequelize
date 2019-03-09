const router = require("express").Router();

const Test = require("../db/models/test");
const Student = require("../db/models/student")

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
    let studId = await Number(req.params.studentId);
    let newTestInfo = await Object.create(req.body);
    newTestInfo.studentId = studId;
    let newTest = await Test.create(newTestInfo);
    res.status(201).send(newTest);
    //Alternate way by set[Parent] method on instance
    //let student = await Student.findById(studId);
    // let newTest = await Test.create(req.body);
    // newTest.setStudent(student);
    // res.status(201).send(newTest)
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let testId = await Number(req.params.id);
    await Test.destroy({ where: { id: testId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
