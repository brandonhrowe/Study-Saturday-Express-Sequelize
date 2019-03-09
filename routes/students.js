const router = require("express").Router();
const Student = require("../db/models/student");
const Test = require("../db/models/test");

// router.get("/students", async (req, res, next) => {
//   try {
//     let allStudents = await Student.findAll();
//     res.send(allStudents);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
