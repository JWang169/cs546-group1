const express = require("express");
const router = express.Router();
const data = require("../data");
const studentData = data.students;

router.get("/", async (req, res) => {
  try {
    const studentList = await studentData.getAllstudents();
    res.json(studentList);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

//GET /students/{id}
router.get("/:id", async (req, res) => {
  try {
    const student = await studentData.getStudent(req.params.id);
    // console.log(student)
    res.json(student);
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: "Student not found!" });
  }
});

router.post("/", async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;