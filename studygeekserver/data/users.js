const jwt = require("jsonwebtoken");
const mongoCollections = require('../config/mongoCollections');
const bcrypt = require('bcryptjs');
const users = mongoCollections.users;
const saltRounds = 16;


async function getAllUsers(){
    const userCollection = await users();
    const allUsers = await userCollection.find({}).toArray();
    return allUsers;
}

async function createUser(email, password, status, firstName, lastName){
    const userCollection = await users();
    // first check if the email already exists
    const matchedUser = await userCollection.findOne({email: email})
    if(matchedUser !== null) throw `The email already exists`;
    const hashed = await bcrypt.hash(password, saltRounds);
    let newUser = {
        'email': email,
        'password': hashed,
        'status': status,
        'firstName': firstName,
        'lastName': lastName,
    }
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw `Could not add new user`;
    // const newId = insertInfo.insertedId;
    return newUser;
}


async function getUser(email, password){
    const userCollection = await users();
    // first check if the email already exists
    const theUser = await userCollection.findOne({email: email})
    if(theUser === null) throw `No such user`;

    let matched = false;
	try {
		matched = await bcrypt.compare(password, theUser.password);
	} catch (e) {
		console.log(e)
    }
    
    if(matched){
        const token = jwt.sign(
            {
                userId: theUser._id,
                status: theUser.status,
                email: theUser.email,
                firstName: theUser.firstName,
                lastName: theUser.lastName
            },
            "Flibbertigibbet",
            {
                expiresIn: "365d"
            }
        )
        return token;
    }else{
        throw `Password doesn't match.`
    }
}


module.exports = {getAllUsers, createUser, getUser}
