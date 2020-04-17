const mongoCollections = require('../config/mongoCollections');
const students = mongoCollections.students;
const {ObjectId} = require('mongodb');

async function getAllstudents(){
    const studentCollection = await students();
    const studentList = await studentCollection.find({}).toArray();
    return studentList;
}

module.exports = {getAllstudents}
