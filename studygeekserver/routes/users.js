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

    if(status === 'students'){
        try{
            const insertId = await studentData.createStudent(email, firstName, lastName)
            userId = insertId;
        }catch(e){
            res.status(409).json({error: e});
        }
    }else{
        try{
            const insertId = await tutorData.createTutor(email, firstName, lastName)
            userId = insertId;
        }catch(e){
            res.status(409).json({error: e});
        }          
    }
    // console.log("this is userId from routes/user.js"+ userId)
    try{
        const statusId = await userData.createUser(userId, email, password, status);
        res.status(200).json(statusId);
    }catch(e){
        res.status(409).json({error: e})
    }
});


router.post("/login", async (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
	try {
        const token = await userData.getUser(email, password);
        // console.log('token from routes/users')
        // console.log(token)
        res.status(200).send(token);
	}catch(e){
        res.status(401).json({error: e})
    }
});


module.exports = router;
