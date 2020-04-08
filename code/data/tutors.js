const mongoCollection = require('../config/mongoCollections');
const tutors = mongoCollection.tutors;
const uuid = require('uuid/v4');

async function addTutor(email, firstName, lastName, town, state, tutorSubjects, availability) {
    if (typeof email != 'string') throw 'Email must be a string';
    if (typeof firstName != 'string') throw 'You must provide a first name';
    if (typeof lastName != 'string') throw 'You must provide a last name';
    if (typeof town != 'string') throw 'You must provide the town you reside in';
    if (typeof state != 'string') throw 'You must provide the state you reside in';
    if (!tutorSubjects || !Array.isArray(tutorSubjects) || tutorSubjects.length < 1) throw 'You must provide the subjects you are proficient in';
    if (!availability || !Array.isArray(availability) || availability.length < 1) throw 'You must provide the times you are available';
    
	let tutorColl = await tutors();
	let newTutor = {
        _id: uuid(),
		email: email,
        firstName: firstName,
        lastName: lastName,
        town: town,
        state: state,
        reviews: [],
        avgRating: -1,
        tutorSubjects: tutorSubjects,
        availability: availability
	};

	let insertInfo = await tutorColl.insertOne(newTutor);
    
    if (insertInfo.insertedCount == 0) throw 'Could not add tutor';

    let newId = insertInfo.insertedId;
    return await this.getTutor(String(newId));
}

async function getAllTutors() {
    let tutorColl = await tutors();
    let tutorList = await tutorColl.find({}).toArray();
    
    if (!tutorList) throw 'There are no tutors!';

	return tutorList;
}

async function getTutor(id) {
    let tutorColl = await tutors();
    let tutor = await tutorColl.findOne({_id: id});

    if (tutor == null) throw `No tutor with id ${id}`;

    return tutor;
}

async function updateTutor(id, email, firstName, lastName, town, state, reviews, avgRating, tutorSubjects, availability) {
    if (typeof email != 'string') throw 'Email must be a string';
    if (typeof firstName != 'string') throw 'You must provide a first name';
    if (typeof lastName != 'string') throw 'You must provide a last name';
    if (typeof town != 'string') throw 'You must provide the town you reside in';
    if (typeof state != 'string') throw 'You must provide the state you reside in';
    if (!reviews || !Array.isArray(reviews) || reviews.length < 1) throw 'You must provide reviews';
    if (typeof avgRating != 'number') throw 'Your average rating must be a number';
    if (!tutorSubjects || !Array.isArray(tutorSubjects) || tutorSubjects.length < 1) throw 'You must provide the subjects you are proficient in';
    if (!availability || !Array.isArray(availability) || availability.length < 1) throw 'You must provide the times you are available';

    try {
        await this.getTutor(id);
    } catch (e) {
        throw `Could not find tutor ${id}`;
    }

    let tutorColl = await tutors();
    let updatedTutor = {
        _id: uuid(),
		email: email,
        firstName: firstName,
        lastName: lastName,
        town: town,
        state: state,
        reviews: reviews,
        avgRating: avgRating,
        tutorSubjects: tutorSubjects,
        availability: availability
    };

    let updatedInfo = await tutorColl.updateOne({_id: id}, {$set: updatedTutor});

    if (updatedInfo.modifiedCount == 0) throw `Could not update tutor ${id}`;

    return await this.getTutor(id);
}

async function removeTutor(id) {
    if (!id) throw 'You must provide an id to search by';

    let tutorColl = await tutors();
    let tutor = await this.getTutor(id);
    let deleteInfo = await tutorColl.deleteOne({ _id: id });

    if (deleteInfo.deletedCount == 0) throw `Could not delete tutor ${id}`;
    
    return {deleted: true, data: tutor};
}

module.exports = {addTutor, getAllTutors, getTutor, updateTutor, removeTutor};