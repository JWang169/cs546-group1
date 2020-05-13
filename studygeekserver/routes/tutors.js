const express = require("express");
const router = express.Router();
const data = require("../data");
const tutorData = data.tutors;
const studentData = data.students;
const pairData = data.pairs;

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
    res.status(200).json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

// router.get('/email/:email', async (req, res) => {
//   try {
//     let tutor = await tutorData.getTutorByEmail(req.params.email);
//     res.json(tutor);
//   } catch (e) {
//     res.status(404).json({ error: 'Tutor not found' });
//   }
// });
//
// router.get('/pricehightolow/:subject', async (req, res) => {
//   try {
//     let tutor = await tutorData.getTutorByPriceHighToLow(req.params.subject);
//     res.json(tutor);
//   } catch (e) {
//     res.status(404).json({ error: 'Tutor not found' });
//   }
// });
//
// router.get('/pricelowtohigh/:subject', async (req, res) => {
//   try {
//     let tutor = await tutorData.getTutorByPriceLowToHigh(req.params.subject);
//     res.json(tutor);
//   } catch (e) {
//     res.status(404).json({ error: 'Tutor not found' });
//   }
// });
//
// router.get('/townstate/:town/:state', async (req, res) => {
//   try {
//     let tutor = await tutorData.getTutorByTownState(req.params.town,req.params.state);
//     res.json(tutor);
//   } catch (e) {
//     res.status(404).json({ error: 'Tutor not found' });
//   }
// });
//
// router.get('/ratehightolow/', async (req, res) => {
//   try {
//     let tutor = await tutorData.getTutorByRatingHighToLow();
//     res.json(tutor);
//   } catch (e) {
//     res.status(404).json({ error: 'Tutor not found' });
//   }
// });
//
// router.get('/ratelowtohigh/', async (req, res) => {
//   try {
//     let tutor = await tutorData.getTutorByRatingLowToHigh();
//     res.json(tutor);
//   } catch (e) {
//     res.status(404).json({ error: 'Tutor not found' });
//   }
// });

// List the people this tutor can chat with
router.get('/chat', async (req, res) => {
  const people = req.body;

  try {
    const tutor = await tutorData.getTutor(people.tutorId);
    const student = await studentData.getStudent(people.studentId);
    const pair = await pairData.getPairFromIds(tutor, student);
    console.log(pair);
    res.render('chat.ejs', {roomId: pair._id});
  } catch (e) {
    console.log(e);
    res.status(404).json({error: e});
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

router.post('/removeSubject', async (req, res) => {
  const tutorId = req.body['_id'];
  const subjectName =req.body ['subjectName'];
  try {
    let tutor = await tutorData.removeSubject(tutorId, subjectName);
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.put('/updateSubject', async (req, res) => {
  const tutorId = req.body['_id'];
  const subjectName =req.body ['subjectName'];
  const proficiency = req.body['proficiency'];
  const price = req.body['price'];
  try{
    let tutor = await tutorData.updateSubject(tutorId, subjectName, proficiency, price);
    res.json(tutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.get('/search', async (req, res) => {
  //const theTutor = req.body;
  // if (!theTutor.subject){
  //   res.status(400).json({error:"No Subject was provided"});
  // }
  // if (!tutor.)
  // const startTime = req.body['startTime'];
  // const endTime = req.body['endTime'];
  try {
    let theTutor = await tutorData.search("Maths","Advanced","price");//req.body.subject,req.body.proficiency,req.body.sort);
    res.json(theTutor);
  } catch (e) {
    res.status(404).json({ error: 'Tutor not found' });
  }
});

router.post('/review', async (req, res) => {
  try{
    if(!req.body.tutorId) throw "Tutor Id must be given";
    if(!req.body.studentId) throw "Tutor Id must be given";
    if(!req.body.content) throw "Tutor Id must be given";
    if(!req.body.rating) throw "Tutor Id must be given";
  }catch(e){
  res.status(404).json({error: e});
  }
  try{
  const newReview= await tutorsData.createReview(req.body.tutorId, req.body.studentId, req.body.content, req.tutor.rating);
  res.status(200).json(newReview);
}catch(e){
  res.status(503).json({error:e});
}
});

router.post('/review/:id', async (req, res) => {
  try{
  const review = await tutorData.getReview(req.params.id);
  await studentData.removeReview(oldPair);
    res.status(200).json(review);
  }catch(e){
    res.status(503).json({error: e});
  }
});

router.post('/signup', async (req, res) => {
  const tutor = req.body;
    if(!tutor.email){
        res.status(400).json({error:"No email provided!"})
    }
    if(!tutor.firstName){
      res.status(400).json({error: "You must provide a first name"});
  		return;
    }
    if(!tutor.lastName){
      res.status(400).json({error: "You must provide a last name"});
  		return;
    }
    if(!tutor.town){
      res.status(400).json({error: "You must provide a town"});
  		return;
    }
    if(!tutor.state){
      res.status(400).json({error: "You must provide a state"});
  		return;
    }
    if(!tutor.email){
      res.status(400).json({error: "You must provide an email"});
  		return;
    }
    if(!tutor.password){
      res.status(400).json({error: "You must provide a password"});
  		return;
    }
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
      res.status(501).json({error: e});
    }
});

router.post('/login', async (req, res) => {
  try{
    if (!req.body.email) throw "Email should be given";
    if (!req.body.password) throw "Password should be given";
    const email = req.body['email'];
    const password = req.body['password'];
    const token = await tutorData.login(email,password)
    res.send(token);
	}catch(e){
        res.status(404).json({error: e})
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

    res.status(200).json(tutorAddTime);//returns all available times
    return;
  }catch(e){
    console.log(e);
    res.status(500).json({error: e});
    return;
  }
});

router.post('/:id/availability/delete', async (req,res) => {
  const reqAvailable = req.body;
  console.log(reqAvailable)
  try{
    if(!reqAvailable)throw"No request body passed into delete function";
    if(!reqAvailable.start)throw"No start time passed into delete availability";
    if(!reqAvailable.end)throw"No end time passed into delete availability";
  }catch(e){
    res.status(404).json({error: e});
    return;
  }
  try{
    const deletedAvailability = await tutorData.removeAvailability(req.params.id, reqAvailable.start, reqAvailable.end);
    res.status(200).json(deletedAvailability);
  }catch(e){
    res.status(503).json({error:e});
  }
})

router.put('/:id', async (req, res) => {
  if(!req.body.firstName){
    res.status(404).json({error:"no first name found"});
    return;
  }
  if(!req.body.lastName){
    res.status(404).json({error:"no last name found"});
    return;
  }
  if(!req.body.town){
    res.status(404).json({error:"no town found"});
    return;
  }
  if(!req.body.state){
    res.status(404).json({error:"no state found"});
    return;
  }
  try{
  const theTutor = await tutorData.updateTutor(req.params.id, req.body.firstName,req.body.lastName, req.body.state, req.body.town,);
  res.status(200).json(theTutor);
  }catch(e){
    res.status(503).json({error:e})
  }

})

router.delete("/:id", async (req, res) =>{
  try{
    await tutorData.getTutor(req.params.id);
  }catch(e){
    res.status(404).json({
      error: "Tutor with this ID not found",
      reason: e
    });
  }
  try{
    const deletedTutor = await tutorData.removeTutor(req.params.id);
    res.status(200).json(deletedTutor);
  }catch(e){
    res.status(500).json({error: e});
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