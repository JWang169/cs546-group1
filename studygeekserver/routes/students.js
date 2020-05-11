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

router.post("/signup", async (req, res) => {//NOTE: when creating a new student profile, the studentSubjects and availability Arrays are initially empty
  const reqStudent = req.body;//NOTE: These will need to be updated to match the form data passed in by html

  if(!reqStudent){
    res.status(400).json({error: "You must provide student profile data"});//this should be replaced by an error page redirect in the future
    return;
  }
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
  
  
  
  //code could likely also be easily modified for Tutor page
  
  /*if(!availability.day){//The day should be changed to match HTML form submission, at the moment, I will assume that "day"
    res.status(400).json({error:"You must select a day of the week that you are available"});//This is the error line, modify it as needed
    return;
  }*///IGNORE THIS FUNCTION

  if(!availability.startTime){//For html input, I recommend 'type=time', though I've heard it has compatability problems with safari and Internet Explorer
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