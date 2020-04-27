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


async function updateTutor(tutorId, info, subjects){
    if(!tutorId) throw `No tutor id provided.`
    if(!info) throw `No info provided.`
    if(!subjects) throw `No subjects provided.`
    if (typeof(tutorId) === "string"){
        tutorId = ObjectId.createFromHexString(tutorId);
    }
    const tutorCollection = await tutors();
    const oldInfo = this.getTutor(tutorId);
    const updatedTutor = {
        'email': oldInfo.email,
        'firstName': oldInfo.firstName,
        'lastName': oldInfo.lastName,
        'info': info,
        'subjects': subjects
    }
    const updatedInfo = await tutorCollection.updateOne({_id:tutorId}, { $set : updatedTutor});
    console.log("this is the updatedInfo")
    console.log(updatedInfo)
    return await this.getTutor(tutorId);
}


module.exports = {getAlltutors, getTutor, createTutor, updateTutor}
