const mongoCollections = require('../config/mongoCollections');
const tutors = mongoCollections.tutors;
// const {ObjectId} = require('mongodb');

async function getAlltutors(){
    const tutorCollection = await tutors();
    const tutorList = await tutorCollection.find({}).toArray();
    return tutorList;
}

async function createTutor(newUser_id, email, firstName, lastName){
    const tutorCollection = await tutors();
    let newTutor = {
        'userId': newUser_id,
        'email': email,
        'firstName': firstName,
        'lastName': lastName,
    }
    const insertInfo = await tutorCollection.insertOne(newTutor);
    if (insertInfo.insertedCount === 0) throw `Could not add new student`;
    // const newId = insertInfo.insertedId;
    return newTutor;
}

module.exports = {getAlltutors, createTutor}
