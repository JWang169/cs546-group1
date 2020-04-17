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

router.post("/", async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;