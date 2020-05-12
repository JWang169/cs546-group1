const mongoCollections = require('../config/mongoCollections');
const tutors = mongoCollections.tutors;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const saltRounds = 16;
const dayOfWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

async function getTutorBySubject(subject){
  if (!subject) throw "The id must be provided"
  if (typeof(subject) !== "string") throw "The subject must be a string";
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.find({"subject":subject}).toArray();
  return theTutor;
}

//checked
async function getTutorByPriceHighToLow(subject){
  if (!subject) throw "The subject must be provided";
  if (typeof(subject) !== "string") throw "Subject must be of type string";
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.find({"subject":subject}).sort({"price": -1}).toArray();
  return theTutor;
}

//checked
async function getTutorByPriceLowToHigh(subject){
  if (!subject) throw "The subject must be provided";
  if (typeof(subject) !== "string") throw "Subject must be of type string";
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.find({"subject":subject}).sort({"price": 1}).toArray();
  return theTutor;
}

//checked
async function getTutorByTownState(town,state){
  if (!town) throw "The town must be provided";
  if(!state) throw "The state must be provided";
  if (typeof(town) !=="string") throw "Town must be a string";
  if (typeof(state) !== "string") throw "State must be a string";
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.find({"town":town,"state":state}).toArray();
  return theTutor
}

async function getTutorByRatingHighToLow(){
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.find({}).sort({"ratings": -1}).toArray();
  return theTutor;
}

async function getTutorByRatingLowToHigh(){
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.find({}).sort({"ratings": 1}).toArray();
  return theTutor;
}

async function getTutorByProficiency(subject, proficiency){
  if (!proficiency) throw "proficiency must be provided";
  if (typeof proficiency !="string") "proficiency must be a string";
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.find({"subject":subject , "proficiency":proficiency});
  return theTutor;
}

async function login(email,password){
  if (!email) throw "Username must be provided";
  if (!password) throw "Passsword must be provided";
  if (typeof email !== "string") throw "Username must be string";
  const emailLow = email.toLowerCase();
  const tutorCollection = await tutors();
  const theTutor = await tutorCollection.findOne({email:email})
  if (!theTutor) throw "No Tutor available";
  let matched = false;
  matched = await bcrypt.compare(password, theTutor.hashedpassword);
  if(matched){
      const token = jwt.sign({
                statusId: theTutor._id,
                email: theTutor.email,
                status: "tutor"
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

async function createTutor(email, firstName, lastName, password, town, state)//subject , proficiency , price ,password )
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
        'email': emailLow,
        'firstName': firstName,
        'lastName': lastName,
        //'info': "",np
        'state': state,
        'town': town,
        //'subject' : subject,
        //'price' : price,
        'availability' : [],
        'hashedPassword' : hashedPassword,
        //'proficiency' : proficiency
        //'ratings' : 0,
        //'tutorSubject': []
        }
  const insertInfo = await tutorCollection.insertOne(newTutor);
  if (insertInfo.insertedCount === 0) throw `Could not add new Tutor`;
  return insertInfo.insertedId;
}

async function addAvailability(id, start, end){
  const newStart = new Date(start);
  const newEnd = new Date(end);
  const newDay= newStart.getDay();
  if(newDay!= newEnd.getDay()) throw "The new available time range must start and end on the same day";
  const newStartTime = newStart.getTime();
  const newEndTime = newEnd.getTime();
  if(newStartTime>=newEndTime)throw "The available time range must end after it begins";
  const tutorCollection = await tutors();
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
        startExtended: newStart,
        end: newEndTime,
        endExtended: newEnd
    };
    const updateInfo = await tutorCollection.updateOne(
        {_id: id},
        {$addToSet: {availability: newAvailability}}
    );
    if(!updateInfo.matchedCount || !updateInfo.modifiedCount) throw "addition failed";
    return newAvailability;
}

// async function updateTutorGeneral(tutorId, info, subject, price, proficiency){
//     if(!tutorId) throw `No tutor id provided.`
//     if(!info) throw `No info provided.`
//     if(!subjects) throw `No subjects provided.`
//     if (typeof(tutorId) !== "string") throw "Id must be a string"
//     const tutorCollection = await tutors();
//     const oldInfo = await this.getTutor(tutorId);
//     const updatedTutor = {
//         'email': oldInfo.email,
//         'firstName': oldInfo.firstName,
//         'lastName': oldInfo.lastName,
//         //'info': info,
//         'subject': subject,
//         'rating' : oldInfo.rating
//
//     }
//     const updatedInfo = await tutorCollection.updateOne({_id:tutorId}, { $set : updatedTutor});
//     // console.log(updatedInfo)
//     return await this.getTutor(tutorId);
// }

// async function requestTutor(studentId){
//
// }
//
// async function removeTutor(tutorid){
//   if (!id) throw "No id is provided";
//   if (typeof(id) !== "string") throw "Id must be a string";
//   const tutorCollection = await tutors();
//   const
// }

// Task 1:
module.exports = {getAlltutors,
getTutor,
createTutor,
getTutorByEmail,
getTutorBySubject,
getTutorByTownState,
getTutorByRatingLowToHigh,
getTutorByRatingHighToLow,
getTutorByProficiency,
getTutorByPriceHighToLow,
getTutorByPriceLowToHigh,
login,
addAvailability,
}
