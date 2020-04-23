const mongoCollections = require('../config/mongoCollections');
const tutors = mongoCollections.tutors;
// const {ObjectId} = require('mongodb');

async function getAlltutors(){
    const tutorCollection = await tutors();
    const tutorList = await tutorCollection.find({}).toArray();
    return tutorList;
}

module.exports = {getAlltutors}
