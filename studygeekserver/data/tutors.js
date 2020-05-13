//update tutor
//update subject
//delete subject
//delete tutor
//search by features
//review delete if student is deleted
//can review be deleted if student tries to delete?
//delete review when tutor is delete

const mongoCollections = require('../config/mongoCollections');
const tutors = mongoCollections.tutors;
const reviews = mongoCollections.reviews;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const saltRounds = 16;
const dayOfWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const jwt = require("jsonwebtoken");

//checked
async function getAlltutors(){
    const tutorCollection = await tutors();
    const tutorList = await tutorCollection.find({}).toArray();
    return tutorList;
}

//checked
async function getTutor(id){
    if (!id) throw "The id must be provided"
    if (typeof(id) !== "string" ) throw "The id must be a string";
    const tutorCollection = await tutors();
    const theTutor = await tutorCollection.findOne({ "_id": id });
    if (!theTutor) throw 'No tutor with that id';
    return theTutor;
}

//checked
async function getTutorByEmail(email){
  if (!email) throw "The email must be provided";
  if (typeof(email) !== "string") throw "Email must be of type string"
  const tutorCollection = await tutors();
  const emailLow = email.toLowerCase();
  const theTutor = await tutorCollection.findOne({"email":emailLow});
  if (!theTutor) throw "No Tutor with that mail ID";
  return theTutor;
}

// async function getTutorBySubject(subject){
//   if (!subject) throw "The id must be provided"
//   if (typeof(subject) !== "string") throw "The subject must be a string";
//   const tutorCollection = await tutors();
//   const theTutor = await tutorCollection.find({"subject":subject}).toArray();
//   return theTutor;
// }
//
// //checked
// async function getTutorByPriceHighToLow(subject){
//   if (!subject) throw "The subject must be provided";
//   if (typeof(subject) !== "string") throw "Subject must be of type string";
//   const tutorCollection = await tutors();
//   const theTutor = await tutorCollection.find({"subject":subject}).sort({"price": -1}).toArray();
//   return theTutor;
// }
//
// //checked
// async function getTutorByPriceLowToHigh(subject){
//   if (!subject) throw "The subject must be provided";
//   if (typeof(subject) !== "string") throw "Subject must be of type string";
//   const tutorCollection = await tutors();
//   const theTutor = await tutorCollection.find({"subject":subject}).sort({"price": 1}).toArray();
//   return theTutor;
// }
//
// //checked
// async function getTutorByTownState(town,state){
//   if (!town) throw "The town must be provided";
//   if(!state) throw "The state must be provided";
//   if (typeof(town) !=="string") throw "Town must be a string";
//   if (typeof(state) !== "string") throw "State must be a string";
//   const tutorCollection = await tutors();
//   const theTutor = await tutorCollection.find({"town":town,"state":state}).toArray();
//   return theTutor
// }
//
// async function getTutorByRatingHighToLow(){
//   const tutorCollection = await tutors();
//   const theTutor = await tutorCollection.find({}).sort({"ratings": -1}).toArray();
//   return theTutor;
// }
//
// async function getTutorByRatingLowToHigh(){
//   const tutorCollection = await tutors();
//   const theTutor = await tutorCollection.find({}).sort({"ratings": 1}).toArray();
//   return theTutor;
// }
//
// async function getTutorByProficiency(subject, proficiency){
//   if (!proficiency) throw "proficiency must be provided";
//   if (typeof proficiency !="string") "proficiency must be a string";
//   const tutorCollection = await tutors();
//   const theTutor = await tutorCollection.find({"subject":subject , "proficiency":proficiency});
//   return theTutor;
// }

async function search(subject, proficiency, startTime, endTime, sorts){
  if (typeof subject !== "string") throw "Subject must be string";
  if (typeof proficiency !== "string") throw "Proficiency must be a string";
  // if (typeof startTime !== "object") throw "Start Time must be a object";
  // if (typeof endTime !== "object") throw "End Time must be a object";
  if (typeof sorts !== "string") throw "Sorting should be a string of Price/ Rating";
  const tutorCollection = await tutors();
  if (sorts === "price"){
    const theTutor = await tutorCollection.find({'tutorSubjects.subject':subject},{'tutorSubjects.proficiency':proficiency}).sort({price:-1}).toArray();
  }
  else if (sorts === "rate"){
    const theTutor = await tutorCollection.find({'tutorSubjects.subject':subject},{'tutorSubjects.proficiency':proficiency}).sort({avgRatings:1}).toArray();
  }
  return thetutor;
}

async function login(email,password){
  if (!email) throw "Username must be provided";
  if (!password) throw "Passsword must be provided";
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.findOne({email:email})
  if (!theTutor) throw "No user available";
  let matched = false;
  matched = await bcrypt.compare(password, theTutor.hashedPassword);
  if(matched){
      const token = jwt.sign({
                statusId: theTutor._id,
                email: theTutor.email,
                status: "tutors"
            },
            "Flibbertigibbet",
            {
                expiresIn: "7d"
            }
        )
        return token;
    }else{
        throw `Password doesn't match.`
    }
}

async function createTutor(email, firstName, lastName,password , town, state)
  {
  if (!email ) throw "Email Must be provided";
  if (!firstName ) throw "First Name must be provided";
  if (!lastName ) throw "Last Name must be provided";
  if (!password ) throw "Password must be provided";
  if (!town ) throw "Town must be provided";
  if (!state ) throw "State must be provided";
  if (typeof email != 'string') throw 'Email must be a string';
  if (typeof firstName != 'string') throw 'You must provide a first name of type string';
  if (typeof lastName != 'string') throw 'You must provide a last name of type string';
  if (typeof town != 'string') throw 'You must provide a string of the town you reside in';
  if (typeof state != 'string') throw 'You must provide a string of the state you reside in';
  if (typeof password !='string') throw 'you must provide a valid password of type string';
  const emailLow = email.toLowerCase();
  const tutorCollection = await tutors();
  const accountAlreadyExists = await tutorCollection.findOne({"email":emailLow});
  if (accountAlreadyExists) throw "Account Already Exists";
  const hashedPassword = await bcrypt.hash(password,saltRounds);
  let newTutor = {
        _id : uuid(),
        'email': email,
        'firstName': firstName,
        'lastName': lastName,
        'state': state,
        'town': town,
        'tutorSubjects' : [],
        'reviews' :[],
        //'info': "",
        'availability' : [],
        'hashedPassword' : hashedPassword,
        'avgRatings' : 0
        }
  const insertInfo = await tutorCollection.insertOne(newTutor);
  if (insertInfo.insertedCount === 0) throw `Could not add new Tutor`;
  return insertInfo.insertedId;
}

async function createSubject(tutorID, subjectName, proficiency, price){
  if (typeof tutorID !== "string") throw "Id must be a string";
  if (typeof subjectName !== "string") throw "Subject Name must be a string";
  if (typeof proficiency !== "string") throw "proficiency must be a string";
  if (typeof price !== "number") throw "Price must be a number";
  const tutorCollection = await tutors();
  const tutorInfo = await this.getTutor(tutorID);
  if (!tutorInfo) throw "Tutor not available";
  const tutor = {
    'subjectName' : subjectName,
    'proficiency' : proficiency,
    'price' : price,
    'teaches' : [],
  }
  const updateTutor = await tutorCollection.updateOne({_id: tutorID},{ $addToSet: { tutorSubjects: tutor }});
  if (!updateTutor.matchedCount && !updateTutor.modifiedCount) throw 'could not update tutor successfully';
  return await this.getTutor(tutorID);
}

async function removeSubject(tutorId, subjectName, proficiency, price){
  if (typeof tutorID !== "string") throw "Id must be a string";
  if (typeof subjectName !== "string") throw "Subject Name must be a string";
  // if (typeof proficiency !== "string") throw "proficiency must be a string";
  // if (typeof price !== "number") throw "Price must be a number";
  const tutorCollection = await tutors();
  const tutorInfo = await this.getTutor(tutorID);
  if (!tutorInfo) throw "Tutor not available";
  const findSubject = await tutorCollection.findOne({_id:tutorId},{'tutorSubjects.subjectName':subjectName});
  if (!findSubject) throw "Subject Not Found";
  const removeSubject = await tutorCollection.removeOne({_id:tutorId},{'tutorSubjects.subjectName':subjectName});
  if(removeSubject.deletedCount===0)throw "failed to delete review";
  return this.getTutor(tutorId);
}

async function updateSubject(tutorId, subjectName, proficiency, price){
  if (typeof tutorID !== "string") throw "Id must be a string";
  if (typeof subjectName !== "string") throw "Subject Name must be a string";
  if (typeof proficiency !== "string") throw "proficiency must be a string";
  if (typeof price !== "number") throw "Price must be a number";
  const tutorCollection = await tutors();
  const tutorInfo = await this.getTutor(tutorID);
  if (!tutorInfo) throw "Tutor not available";
  const findSubject = await tutorCollection.findOne({_id:tutorId},{'tutorSubjects.subjectName':subjectName});
  if (!findSubject) throw "Subject Not Found";
  const updateSubject ={
    'subjectName' : subjectName,
    'proficiency' : proficiency,
    'price' : price,
    'teaches' : tutorInfo.tutorSubjects.teaches,
  }
  const updateTutor = await tutorCollection.updateOne({_id:tutorId},{'tutorSubjects.subjectName': subjectName},{set : {tutorSubjects:updateSubject}});
  if (!updateTutor.matchedCount && !updateTutor.modifiedCount) throw 'could not update subject successfully';
  return await this.getTutor(tutorID);
}

// async function updateSubject(tutorId,subjectName,proficiency, price){
//   if (typeof tutorID !== "string") throw "Id must be a string";
//   if (typeof subjectName !== "string") throw "Subject Name must be a string";
//   if (typeof proficiency !== "string") throw "proficiency must be a string";
//   if (typeof price !== "number") throw "Price must be a number";
//   const tutorCollection = await tutors();
//   const tutorInfo = await this.getTutor(tutorID);
//   if (!tutorInfo) throw "Tutor not available";
//   const tutor = {
//     _id : tutorInfo.tutorSubjects._id,
//     'subjectName': subjectName
//   }
// }
async function getReviewById(id){
    if (!id) throw "The id must be provided"
    if (typeof(id) !== "string" ) throw "The id must be a string";
    const reviewCollection = await reviews();
    const theReview = await reviewCollection.findOne({ "_id": id });
    if (!theReview) throw 'No tutor with that id';
    return theReview;
}

async function createReviews(tutorId, studentId, content ,rating){
  if (typeof tutorId !== "string") throw "Id must be a string";
  if (typeof studentId !== "string") throw "Id must be a string";
  if (typeof content !== "string") throw "Content must be a string";
  if (typeof rating !== "number") throw "Rating must be a number";
  const reviewCollection = await reviews();
  const reviewExists = await reviewCollection.findOne({tutorId:tutorId,subjectId:subjectId,content:content,rating:rating})
  if (reviewExists) throw "The student has already reviewd the tutor";
  let newReview ={
    _id :uuid(),
    'tutorId' : tutorId,
    'studentId' : studentId,
    'content' : content,
    'rating' : rating
  }
  const insertReview = await reviewCollection.insertOne(newReview);
  if (insertReview.insertedCount === 0) throw "Review not added";
  try{
    const students = mongoCollections.students;
    const studentCollection = await students();
    const findStudent = await studentCollection.findOne({_id:studentId});
    if (!findStudent) throw "Student not found";
    const tutorCollection = await tutors();
    const addReviewToTutor = await tutorCollection.updateOne({_id:tutorId},{$addToSet:{reviews:newReview._id}})
    if (!addReviewToTutor.matchedCount && !addReviewToTutor.modifiedCount) throw 'Review to Tutor was not added';
  }catch(e){
    await reviewCollection.removeOne({_id:newReview._id});
    throw "The update didnt happen";
  }
  const avgRatings = await this.calcRating(tutorId);
  const updateTutorRating = await this.updateTutorRating(tutorId, avgRatings);
  return newReview;
}

async function updateTutorRating(tutorId, rating){
  if (typeof tutorId !== "string") throw "Id must be a string";
  if (typeof rating !== "number") throw "Rating must be a number";
  const theTutor = await this.getTutor(tutorId);
  if (!theTutor) throw "The tutor is not found";
  const updateInfo = await tutorCollection.updateOne({_id: tutorId},{$set: {avgRatings:rating}});
  if(!updateInfo.matchedCount || !updateInfo.modifiedCount) throw "addition failed";
  return this.getTutor(id);
}

async function calcRating(tutorId){
  if (typeof tutorId !== "string") throw "Id must be a string";
  const reviewCollection = await reviews();
  const tutorReview = await reviewCollection.find({tutorId:tutorId}).toArray();
  let rating = 0;
  let count = 0;
  for (i in tutorReview){
    rating = rating + tutorReview[i].rating;
    count = count + 1;
  }
  return rating/count;
}

async function removeReview(tutorId, studentId, reviewId){
  if (typeof tutorId !== "string") throw "Id must be a string";
  if (typeof studentId !== "string") throw "Id must be a string";
  if (typeof content !== "string") throw "Content must be a string";
  if (typeof rating !== "number") throw "Rating must be a number";
  const reviewCollection = await reviews();
  const tutorCollection = await tutors();
  const theTutor = await this.getTutor(tutorId);
  if (!theTutor) throw "The tutor is not found";
  const updateTutor = await tutorCollection.updateOne({_id:tuorId},{pull:{reviews:reviewId}});
  if (!updateTutor.matchedCount && !updateTutor.modifiedCount) throw 'Review to Tutor was not deleted';
  const removeReview = await reviewCollection.removeOne({_id:reviewId});
  if(removedReview.deletedCount===0)throw "failed to delete review";
}

async function addAvailability(id, start, end){
    const tutorCollection = await tutors();
    const newStart = new Date(start);
    const newEnd = new Date(end);
    const newDay= newStart.getDay();
    if(newDay!= newEnd.getDay()) throw "The new available time range must start and end on the same day";
    const newStartTime = newStart.getTime();
    const newStartHours = newStart.getHours();
    const newStartMinutes = newStart.getMinutes();
    const newEndTime = newEnd.getTime();
    const newEndHours = newEnd.getHours();
    const newEndMinutes = newEnd.getMinutes();
    if(newStartTime>=newEndTime)throw "The available time range must end after it begins";
    const currentTutor = await this.getTutor(id);
    const availableArray = currentTutor.availability;
    var i;
    for(i=0;i<availableArray.length;i++){
        if(availableArray[i].dayNum==newDay){
            if(availableArray[i].start>=newStartTime){
                if(availableArray[i].start<newEndTime) throw `The available time range cannot overlap with the pre-existing availability, ${availableArray[i]}`;
            }
            if(availableArray[i].start<=newStartTime){
                if(availableArray[i].end>newStartTime) throw `The available time range cannot overlap with the pre-existing availability, ${availableArray[i]}`;
            }
        }
    }
    let newAvailability = {
        day: dayOfWeek[newDay],
        dayNum: newDay,
        start: newStartTime,
        startH: newStartHours,
        startM: newStartMinutes,
        startExtended: newStart,
        end: newEndTime,
        endH: newEndHours,
        endM: newEndMinutes,
        endExtended: newEnd//NOTE: this will output the time relative to the UTC timezone, making output look slightly off if not expected.
    };
    const updateInfo = await tutorCollection.updateOne({_id: id},{$addToSet: {availability: newAvailability}});
    if(!updateInfo.matchedCount || !updateInfo.modifiedCount) throw "addition failed";
    return newAvailability;
}

async function removeAvailability(id, start, end){
    const studentCollection=await students();
    const startDate = new Date(start);
    const endDate = new Date(end);
    const foundAvailability = await studentCollection.findOne({_id:id,
        "availability.startExtended":startDate,
        "availability.endExtended":endDate
    });
    if(foundAvailability===null)throw "availability not found";
    const deleteAvailability =await studentCollection.updateOne({_id:id},
        {$pull:
            { availability:
                {
                    startExtended: startDate,
                    endExtended:endDate
                }
            }
        });
    if(!deleteAvailability.matchedCount && !deleteAvailability.modifiedCount)throw "failed to delete availability";
    return foundAvailability;
}

async function updateTutor(tutorId, email, firstName, lastName, password, state, town,){
    if (typeof email != 'string') throw 'Email must be a string';
    if (typeof firstName != 'string') throw 'You must provide a first name of type string';
    if (typeof lastName != 'string') throw 'You must provide a last name of type string';
    if (typeof town != 'string') throw 'You must provide a string of the town you reside in';
    if (typeof state != 'string') throw 'You must provide a string of the state you reside in';
    if (typeof password !='string') throw 'you must provide a valid password of type string';
    const tutor = await this.getTutor(tutorId);
    if(!tutor) throw `No tutor available.`;
    const emailLow = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let tutorUpdate = {
      firstName: firstName,
      lastName: lastName,
      email: emailLow,
      town: town,
      state: state,
      password: hashedPassword,
      availability : tutor.availability,
      tutorSubjects : tutor.tutorSubjects,
      reviews: tutor.reviews,
      avgRatings: tutor.avgRatings
    }
    const tutorCollection = await tutors();
    const updateTutor = await tutorCollection.updateOne({_id:tutorId},{$set:tutorUpdate});
    if(!updateTutor.matchedCount || !updateTutor.modifiedCount) throw 'Tutor update failed';
    return tutorUpdate;
}

async function removeTutor(tutorId){
  if (!tutorId) throw "No tutor id provided";
  const theTutor = await this.getTutor(id);
  const reviewArray = theTutor.reviews;
  for (i in reviewArray){
    let foundReview = await this.getReview(reviewArray[i])
    await this.removeReview(foundReview);
  }
  const tutorCollection = await tutor();
  const deleteTutor = await tutorCollection.removeOne({_id:tutorId});
  if (deletionTutor.deletedCount === 0) throw "User wasn't delete";
  return {delete:true};
}

module.exports = {getAlltutors,
getTutor,
createTutor,
getTutorByEmail,
// getTutorBySubject,
// getTutorByTownState,
// getTutorByRatingLowToHigh,
// getTutorByRatingHighToLow,
// getTutorByProficiency,
// getTutorByPriceHighToLow,
// getTutorByPriceLowToHigh,
removeSubject,
updateSubject,
updateTutorRating,
createReviews,
removeReview,
removeAvailability,
updateTutor,
removeTutor,
login,
addAvailability,
createSubject
};
