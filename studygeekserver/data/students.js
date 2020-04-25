const mongoCollections = require('../config/mongoCollections');
const students = mongoCollections.students;
const {ObjectId} = require('mongodb');

async function getAllstudents(){
    const studentCollection = await students();
    const studentList = await studentCollection.find({}).toArray();
    return studentList;
}

async function getStudent(id){
    const studentCollection = await students();
    if (typeof(id) == "string" ){
        id = ObjectId.createFromHexString(id)
    }
    const theStudent = await studentCollection.findOne({ "_id": id });
    if (theStudent === null) throw 'No student with that id';
    s = [theStudent.name, theStudent.info, theStudent.subjects];
    return s;
}

async function createStudent(newUser_id, email, firstName, lastName){
    const studentCollection = await students();
    let newStudent = {
        'userId': newUser_id,
        'email': email,
        'firstName': firstName,
        'lastName': lastName,
    }
    const insertInfo = await studentCollection.insertOne(newStudent);
    if (insertInfo.insertedCount === 0) throw `Could not add new student`;
    // const newId = insertInfo.insertedId;
    return newStudent;
}


module.exports = {getAllstudents, getStudent, createStudent}
