const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;


router.post("/signup", async (req, res) => {
    const userPostData = req.body;
    if(!userPostData.email){
        res.status(400).json({error:"No email provided!"})
    }
    const email = req.body['email'];
    const password = req.body['password'];
    const lastName = req.body['lastName'];
    const firstName = req.body['firstName'];
    try{
        const newUser = await userData.createUser(email, password, firstName, lastName);
        res.status(200).json(newUser.email);
    }catch(e){
        res.status(409).json({error: e})
    }
});


router.post("/login", async (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
	try {
        const token = await userData.getUser(email, password);
        console.log(token)
        res.status(200).send(token);
	}catch(e){
        res.status(401).json({error: e})
    }
});


module.exports = router;
