const mongoCollections = require('../config/mongoCollections');
const students = mongoCollections.students;
const {ObjectId} = require('mongodb');
const bcrypt = require("bcryptjs");
const uuid = require('uuid/v4');
const jwt = require("jsonwebtoken");
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
    if (theStudent === null) throw `No student with the id: ${id}`;
    return theStudent;
}

async function getStudentByEmail(email){
    const studentCollection = await students();
    const emailLow = email.toLowerCase();
    const theStudent = await studentCollection.findOne({ "email": emailLow });
    if (!theStudent) throw `No student account with the email: ${emailLow}`;
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
    if(accountAlreadyExist)throw `There is already an account registered under the email: ${emailLow}`;
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

const dayOfWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function addAvailability(id, start, end){
    //this code was written assuming that the HTML date input type='datetime-local'

    const studentCollection = await students();

    const newStart = new Date(start);//creates item of milliseconds since Jan 1st 1970 began
    const newEnd = new Date(end);
    const newDay= newStart.getDay();
    if(newDay!= newEnd.getDay()) throw "The new available time range must start and end on the same day";
    const newStartTime = newStart.getTime();//there also exists a getTimeLocal function, but I didn't want to use it
    const newEndTime = newEnd.getTime();//NOTE: The time is represented by the number of milliseconds since Jan 1st, 1970, 00:00:00
    if(newStartTime>=newEndTime)throw "The available time range must end after it begins";
    const currentStudent = await this.getStudent(id);
    const availableArray = currentStudent.availability;

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
        endExtended: newEnd//NOTE: this will output the time relative to the UTC timezone, making output look slightly off if not expected.
    };
    const updateInfo = await studentCollection.updateOne(
        {_id: id},
        {$addToSet: {availability: newAvailability}}
    );

    if(!updateInfo.matchedCount || !updateInfo.modifiedCount) throw "addition failed";

    return newAvailability;
}

async function login(email,password){
  if (!email) throw "Email must be provided";
  if (!password) throw "Passsword must be provided";
  if (typeof email !== "string") throw "Email must be a string";
  const emailLow = email.toLowerCase();
  const studentCollection = await students();
  const student = await studentCollection.findOne({email: emailLow})
  if (!student) throw "No student found";
  let matched = false;
   matched = await bcrypt.compare(password, student.hashedPassword);
  if(matched){
      const token = jwt.sign({
                statusId: student._id,
                email: student.email,
                status: "students"
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
/*
async function updateStudent(id, updatedStudent){
    const student = await this.getStudent(id);
    if (typeof updatedStudent.email != 'string') throw 'Email must be a string';
    const emailDup= updatedStudent.email;//converts email to lowercase
    const emailLow = emailDup.toLowerCase();
    if (typeof updatedStudent.firstName != 'string') throw 'You must provide a first name of type string';
    if (typeof updatedStudent.lastName != 'string') throw 'You must provide a last name of type string';
    if (typeof updatedStudent.town != 'string') throw 'You must provide a string of the town you reside in';
    if (typeof updatedStudent.state != 'string') throw 'You must provide a string of the state you reside in';
    //if (typeof updatedStudent.password !='string') throw 'you must provide a valid password of type string';

    //NOTE: neither the availability nor the StudentSubjects arrays will  be updated here. Those will need their own functions.
    //However, the tutor pairs database will need to be updated, if the student's name changes
    //I think thatthe chat history should remain the same, regardless of name change because your past name will not be changed
    //ALSO, password will not be changed here
    //As it stands, the availability object in the student database does not matter here, and is currently altered in different functions.
    //let me know if u want this function to change that.

    let studentUpdateInfo = {
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        email: emailLow,
        town: updatedStudent.town,
        state: updatedStudent.state,
        hashedPassword: student.hashedPassword,
        availability: student.availability, //change this if I need to update
    }

}*/

async function removeStudent(id){
    const studentCollection = await students();
    //let student = null;//Unecessary, but allows return to contain the info
    //student = await this.getStudent(id);//of the deleted Student
    const deletedInfo = studentCollection.removeOne({_id: id});
    if (deletedInfo.deletedCount === 0)throw `deletion of student: (${id}) failed`;
    return {deleted: true};
}

/* TO IMPLEMENT:
some form of remove availability function, but first need html delete specification info
*/

module.exports = {getAllstudents, getStudent, createStudent, addAvailability, removeStudent, login}
