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
    res.status(200).send(student);
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: "Student not found!" });
  }
});

router.post("/login", async (req, res) => {
  const reqStudent= req.body;
  
  try{
    if(!reqStudent)throw "needs a login request";
    if(!reqStudent.email)throw "needs an email";
    if(!reqStudent.password)throw"needs a password";
    const token = await studentData.login(reqStudent.email,reqStudent.password);
    res.send(token);
  }catch(e){
    res.status(404).json({error: e});
  }
});

router.post('/tutorPair',async(req, res) =>{
  const reqPair = req.body;

  try{
    if (!reqPair)throw "needs a request";
    if(!reqPair.tutorId)throw"needs a tutorId";
    if(!reqPair.studentId)throw "needs a studentId";
    if(!reqPair.subject)throw "needs a requested subject";
    if(!reqPair.proficiency)throw"there needs to be a proficiency for the subject";
  }catch(e){
    res.status(404).json({error: e});
  }
  try{
    const newPair= await studentData.createPair(reqPair.tutorId, reqPair.studentId, reqPair.subject, reqPair.proficiency);
    res.status(200).json(newPair);
  }catch(e){
    res.status(503).json({error:e});
  }
})

router.post("/signup", async (req, res) => {
  //NOTE: when creating a new student profile, the studentSubjects and availability Arrays are initially empty
  const reqStudent = req.body;//NOTE: These will need to be updated to match the form data passed in by html

  if(!reqStudent){
    res.status(400).json({error: "You must provide student profile data"});//this should be replaced by an error page redirect in the future
    return;
  }
/*let time;
  if(reqStudent.time){
    time= reqStudent.time;
  }else{
    time = 0;//some empty value for when the item isnt there
  }*/


  if(!reqStudent.firstName){//type checking is done in data file
    res.status(400).json({error: "You must provide a first name"});
		return;
  }
  if(!reqStudent.lastName){
    res.status(400).json({error: "You must provide a last name"});
		return;
  }
  if(!reqStudent.town){
    res.status(400).json({error: "You must provide a town"});
		return;
  }
  if(!reqStudent.state){
    res.status(400).json({error: "You must provide a state"});
		return;
  }
  if(!reqStudent.email){
    res.status(400).json({error: "You must provide an email"});
		return;
  }
  if(!reqStudent.password){
    res.status(400).json({error: "You must provide a password"});
		return;
  }
  try{
    const newStudent = await studentData.createStudent(reqStudent.email, reqStudent.firstName, reqStudent.lastName, reqStudent.password, reqStudent.town, reqStudent.state);
    res.status(200).json({id: newStudent});
    return;
  }catch(e){
    res.status(501).json({error: e});
    return;
  }
});

router.post("/:id/availability", async (req, res) => {//for form POST submission of available times for student
  const availability = await req.body;
  //will need to get the start/end times from HTML, I RECOMMEND HTML FILE USE input type= 'datetime-local',
  //despite its lack of compatability accross browsers, it is provided to the class in the html intro slides


  if(!availability.startTime){
    res.status(400).json({error:"You must select the time of day that you become available"});
    return;
  }

  if(!availability.endTime){
    res.status(400).json({error:"You must select the time of day that you become unavailable"});
    return;
  };

  try{
    const studentAddTime = await studentData.addAvailability(req.params.id, availability.startTime, availability.endTime);
    res.status(200).json(studentAddTime);//returns all available times
    return;
  }catch(e){
    console.log(e);
    res.status(500).json({error: e});
    return;
  }
});

router.delete("/tutorPair/:id", async (req, res) =>{
  try{
    const oldPair = await studentData.getPair(req.params.id);
    await studentData.removePair(oldPair);
    res.status(200).json(oldPair);
  }catch(e){
    res.status(503).json({error: e});
  }
})

router.delete("/:id", async (req, res) =>{
  //NOTE 1: Needs authentification and confirmation to be done before hand (but not here)
  //NOTE 2: TutorPairs will need to be deleted, and all the corresponding entries that that would entail as well
  //NOTE 3: Cookie for this student should be deleted, as well as Chat History
  //NOTE 4: Reviews do not need to be deleted
  try{
    await studentData.getStudent(req.params.id);
  }catch(e){
    res.status(404).json({
      error: "student with this ID not found",
      reason: e
    });
  }
  try{
    const deletedStudent = await studentData.removeStudent(req.params.id);
    res.status(200).json(deletedStudent);//Should have link to home page/account creation.
  }catch(e){
    res.status(500).json({error: e});
  }
});

/* To implement here:
  delete availability (need to know how the html form will select array item to delete)
  delete Student
  post/delete studentSubjects (need for the tutorPairs database to be created first)
*/

module.exports = router;
