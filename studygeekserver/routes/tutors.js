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


//GET /tutors/{id}
router.get("/:id", async (req, res) => {
  try {
    // console.log('in get tutors')
    const tutor = await tutorData.getTutor(req.params.id);
    // console.log(tutor)
    res.status(200).send(tutor);
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: "Tutor not found!" });
  }
});

module.exports = router;