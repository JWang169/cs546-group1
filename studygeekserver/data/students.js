const mongoCollections = require('../config/mongoCollections');
const students = mongoCollections.students;
const {ObjectId} = require('mongodb');
const bcrypt = require("bcryptjs");
const uuid = require('uuid/v4');
const saltRounds = 16;


async function getAllstudents(){
    const studentCollection = await students();
    const studentList = await studentCollection.find({}).toArray();
    return studentList;
}

async function getStudent(id){
    const studentCollection = await students();
    if (typeof id !== "string" )throw "The id must be of type String";
    const theStudent = await studentCollection.findOne({ "_id": id });
    if (theStudent === null) throw 'No student with that id';
    return theStudent;
}

async function getStudentByEmail(email){
    const studentCollection = await students();
    const emailLow = email.toLowerCase();
    const theStudent = await studentCollection.findOne({ "email": emailLow });
    if (!theStudent) throw 'No student account with that email';
    return theStudent;
}

async function createStudent(email, firstName, lastName, password, town, state){
    if (typeof email != 'string') throw 'Email must be a string';
    if (typeof firstName != 'string') throw 'You must provide a first name of type string';
    if (typeof lastName != 'string') throw 'You must provide a last name of type string';
    if (typeof town != 'string') throw 'You must provide a string of the town you reside in';
    if (typeof state != 'string') throw 'You must provide a string of the state you reside in';
    if (typeof password !='string') throw 'you must provide a valid password of type string';
    const emailLow= email.toLowerCase();//converts email to lowercase
    const studentCollection = await students();//need error checking for email duplicates
    const accountAlreadyExist = await studentCollection.findOne({"email":emailLow});
    if(accountAlreadyExist)throw "There is already an account registered under that email!";
    const hashedPassword = await bcrypt.hash(password, saltRounds);// passsword double checked in front end

    let newStudent = {
        _id: uuid(),
        'email': emailLow,
        'firstName': firstName,
        'lastName': lastName,
        //'info': "",//might be unnecessary, maybe.
        'studentSubjects': [],
        'state': state,
        'town': town,
        'availability': [],
        'hashedPassword': hashedPassword,
        __v:0 //this value was created by the use of mongoose in the seed file, can probably be removed in the end
    }

    const insertInfo = await studentCollection.insertOne(newStudent);
    if (insertInfo.insertedCount === 0) throw `Could not add new student`;
    // const newId = insertInfo.insertedId;
    return insertInfo.insertedId;
}


module.exports = {getAllstudents, getStudent, createStudent}
