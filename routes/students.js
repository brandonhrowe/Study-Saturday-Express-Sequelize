const router = require("express").Router();

const Student = require("../db/models/student");

router.get("/", async (req, res, next) => {
  //don't have to go to "/students" because in app.js students is set up in "/students" directory
  try {
    let students = await Student.findAll();
    res.send(students);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let id = await Number(req.params.id);
    let student = await Student.findById(id);
    if (student) {
      res.send(student);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let newInfo = req.body;
    let student = await Student.create(newInfo);
    res.status(201).send(student);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let studentId = await Number(req.params.id);
    let newInfo = await req.body;
    // student.update(newInfo).then(updatedStudent => {
    //   res.send(updatedStudent);
    // });
    let updatedStudent = await Student.update(newInfo, {
      where: { id: studentId },
      returning: true,
      plain: true
    });
    console.log(updatedStudent)
    res.send(updatedStudent[1]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    // let id = await Number(req.params.id);
    // let student = await Student.findById(id);
    // student.destroy({ force: true }).then(() => {
    //   res.sendStatus(204);
    // });
    let studentId = Number(req.params.id)
    await Student.destroy({where: {id: studentId}})
    res.sendStatus(204)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
