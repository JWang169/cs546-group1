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

module.exports = {getAllstudents, getStudent}
