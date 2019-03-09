const router = require('express').Router();
const Student = require("../db/models/student");

router.get("/students", async (req, res, next) => {
  try {
    let allStudents = await Student.findAll();
    console.log(allStudents)
    res.send(allStudents);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
