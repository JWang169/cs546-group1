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

router.post("/", async (req, res) => {//NOTE: when creating a new student profile, the studentSubjects and availability Arrays are initially empty
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

module.exports = router;