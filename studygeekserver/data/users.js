const mongoCollections = require('../config/mongoCollections');
const userData = require("./users");
const users = mongoCollections.users;
// const {ObjectId} = require('mongodb');

async function getAllUsers(){
    const userCollection = await users();
    const allUsers = await userCollection.find({}).toArray();
    return allUsers;
}

async function createUser(email, password, firstName, lastName){
    const userCollection = await users();
    // first check if the email already exists
    const matchedUser = await userCollection.findOne({email: email})
    if(matchedUser !== null) throw `User already exists`;
    let newUser = {
        'email': email,
        'password': password,
        'firstName': firstName,
        'lastName': lastName
    }
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw `Could not add band`;
    // const newId = insertInfo.insertedId;
    return newUser;
}

module.exports = {getAllUsers, createUser}
