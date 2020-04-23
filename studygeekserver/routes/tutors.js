const express = require("express");
const router = express.Router();
const data = require("../data");
const tutorData = data.tutors;


router.get("/", async (req, res) => {
  try {
    const tutorList = await tutorData.getAlltutors();
    res.json(tutorList);
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