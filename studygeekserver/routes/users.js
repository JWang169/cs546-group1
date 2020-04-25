const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const studentData = data.students;
const tutorData = data.tutors;


router.post("/signup", async (req, res) => {
    const userPostData = req.body;
    if(!userPostData.email){
        res.status(400).json({error:"No email provided!"})
    }
    const email = req.body['email'];
    const password = req.body['password'];
    const lastName = req.body['lastName'];
    const firstName = req.body['firstName'];
    const status = req.body['status'];
    let userId = undefined;
    try{
        const newUser = await userData.createUser(email, password, status, firstName, lastName);
        userId = newUser._id;
        console.log('Im in the newUser');
    }catch(e){
        res.status(409).json({error: e})
    }

    if(status === 'students'){
        try{
            const newStudent = await studentData.createStudent(userId, email, firstName, lastName)
            res.status(200).json(newStudent._id);
        }catch(e){
            res.status(409).json({error: e});
        }
    }else{
        try{
            const newTutor = await tutorData.createTutor(userId, email, firstName, lastName)
            res.status(200).json(newTutor._id);
        }catch(e){
            res.status(409).json({error: e});
        }          
    }
    
});


router.post("/login", async (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
	try {
        const token = await userData.getUser(email, password);
        res.status(200).send(token);
	}catch(e){
        res.status(401).json({error: e})
    }
});


module.exports = router;
