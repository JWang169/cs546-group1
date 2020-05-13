const mongoCollections = require('../config/mongoCollections');
const students = mongoCollections.students;
const tutors = mongoCollections.tutors;
const pairs = mongoCollections.tutorPairs;

async function getAllPairs(){
    const pairCollection = await pairs();
    const pairList = await pairCollection.find({}).toArray();
    return pairList;
}

async function getPairFromIds(tutorId, studentId){
    const pairCollection = await pairs();
    const pair = await pairCollection.findOne({"tutorId": tutorId, "studentId": studentId});
    return pair;
}

async function getPairsWithTutor(tutorId){
    const tutorCollection = await tutors();
    if (typeof tutorId !== "string") throw "The id must be of type String";

    const pairs = await tutorCollection.find({"tutorId": tutorId});

    return pairs;
}

async function getPairsWithStudent(studentId){
    const studentCollection = await students();
    if (typeof studentId !== "string" )throw "The id must be of type String";

    const pairs = await studentCollection.find({"studentId": studentId});

    return pairs;
}

module.exports = {getAllPairs, getPairFromIds, getPairsWithTutor, getPairsWithStudent};