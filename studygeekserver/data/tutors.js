const mongoCollections = require('../config/mongoCollections');
const tutors = mongoCollections.tutors;
const {ObjectId} = require('mongodb');

async function getAlltutors(){
    const tutorCollection = await tutors();
    const tutorList = await tutorCollection.find({}).toArray();
    return tutorList;
}

async function getTutor(id){
    const tutorCollection = await tutors();
    if (typeof(id) == "string" ){
        id = ObjectId.createFromHexString(id)
    }
    const theTutor = await tutorCollection.findOne({ "_id": id });
    if (theTutor === null) throw 'No student with that id';
    return theTutor;
}

async function createTutor(email, firstName, lastName){
    const tutorCollection = await tutors();
    let newTutor = {
        'email': email,
        'firstName': firstName,
        'lastName': lastName,
    }
    const insertInfo = await tutorCollection.insertOne(newTutor);
    if (insertInfo.insertedCount === 0) throw `Could not add new student`;
    // const newId = insertInfo.insertedId;
    return insertInfo.insertedId;
}

module.exports = {getAlltutors, getTutor, createTutor}
