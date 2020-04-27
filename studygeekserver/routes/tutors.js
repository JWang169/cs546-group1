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

// update tutor info 
router.put("/:id", async (req, res) => {
  console.log('in routes/tutors.js')
  const info = req.body['info'];
  const subjects = req.body['subjects'];
  if(!info){
    res.status(400).json({error: "No Tutor info provided."})
    return 
  }
  if(!subjects){
    res.status(400).json({error: "No Tutor subjects provided."})
    return 
  }

  try{
    const updatedTutor = await tutorData.updateTutor(req.params.id, info, subjects);
    res.status(200).json(updatedTutor);
  }catch(e){
    console.log(e)
    res.status(500).json({error: e});
  }
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