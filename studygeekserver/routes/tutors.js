const express = require("express");
const router = express.Router();
const data = require("../data");
const tutorData = data.tutors;

router.get('/', async (req, res) => {
  try {
    let tutor = await tutorData.getAlltutors();
    res.json(tutor);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let tutor = await tutorData.getTutor(req.params.id);
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.get('/email/:email', async (req, res) => {
  try {
    let tutor = await tutorData.getTutorByEmail(req.params.email);
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.get('/pricehightolow/:subject', async (req, res) => {
  try {
    let tutor = await tutorData.getTutorByPriceHighToLow(req.params.subject);
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.get('/pricelowtohigh/:subject', async (req, res) => {
  try {
    let tutor = await tutorData.getTutorByPriceLowToHigh(req.params.subject);
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.get('/townstate/:town/:state', async (req, res) => {
  try {
    let tutor = await tutorData.getTutorByTownState(req.params.town,req.params.state);
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.get('/ratehightolow/', async (req, res) => {
  try {
    let tutor = await tutorData.getTutorByRatingHighToLow();
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.get('/ratelowtohigh/', async (req, res) => {
  try {
    let tutor = await tutorData.getTutorByRatingLowToHigh();
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.post('/createSubject', async (req, res) => {
  const tutorID = req.body['_id'];
  const subjectName = req.body['subjectName'];
  const proficiency = req.body['proficiency'];
  const price = req.body['price'];
  try {
    let tutor = await tutorData.createSubject(tutorID, subjectName, proficiency, price);
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

// router.get('/search', async (req, res) => {
//   const theTutor = req.body;
//   if (!tutor.subject){
//     res.status(400).json({error:"No Subject was provided"});
//   }
//   if (!tutor.)
//   const startTime = req.body['startTime'];
//   const endTime = req.body['endTime'];
//   try {
//     let tutor = await tutorData.getTutorByRatingLowToHigh();
//     res.json(tutor);
//   } catch (e) {
//     res.status(404).json({ error: 'Tutor not found' });
//   }
// });

router.post('/signup', async (req, res) => {
  const tutor = req.body;
    if(!tutor.email){
        res.status(400).json({error:"No email provided!"})
    }
    //check for parameters
    const email = req.body['email'];
    const password = req.body['password'];
    const lastName = req.body['lastName'];
    const firstName = req.body['firstName'];
    const town = req.body['town'];
    const state = req.body['state'];
//     const subject = req.body['subject'];
//     const proficiency = req.body['proficiency'];
//     const price = req.body['price'];
    try{
      const tutor = await tutorData.createTutor(email, firstName, lastName, password, town, state)//subject, proficiency, price, password)
      res.status(200).json(tutor)
    }catch(e){
      res.status(409).json({error: e});
    }
});

router.post('/login', async (req, res) => {
  const email = req.body['email'];
  const password = req.body['password'];
  try{
    const token = await tutorData.login(email,password)
    res.send(token);
	}catch(e){
        res.status(401).json({error: e})
    }
});

router.post("/:id/availability", async (req, res) => {
  const availability = await req.body;
  if(!availability.startTime){
    res.status(400).json({error:"You must select the time of day that you become available"});
    return;
  }
  if(!availability.endTime){
    res.status(400).json({error:"You must select the time of day that you become unavailable"});
    return;
  };
  try{
    const tutorAddTime = await tutorData.addAvailability(req.params.id, availability.startTime, availability.endTime);
    res.status(200).json(studentAddTime);//returns all available times
    return;
  }catch(e){
    console.log(e);
    res.status(500).json({error: e});
    return;
  }
});

// update tutor info
// router.put("/:id", async (req, res) => {
//   console.log('in routes/tutors.js')
//   const info = req.body['info'];
//   const subjects = req.body['subjects'];
//   if(!info){
//     res.status(400).json({error: "No Tutor info provided."})
//     return
//   }
//   if(!subjects){
//     res.status(400).json({error: "No Tutor subjects provided."})
//     return
//   }

//   try{
//     const updatedTutor = await tutorData.updateTutor(req.params.id, info, subjects);
//     res.status(200).json(updatedTutor);
//   }catch(e){
//     console.log(e)
//     res.status(500).json({error: e});
//   }
// });

// router.post


// //GET /tutors/{id}
// router.get("/:id", async (req, res) => {
//   try {
//     // console.log('in get tutors')
//     const tutor = await tutorData.getTutor(req.params.id);
//     // console.log(tutor)
//     res.status(200).send(tutor);
//   } catch (e) {
//     console.log(e)
//     res.status(404).json({ message: "Tutor not found!" });
//   }
// });

module.exports = router;
