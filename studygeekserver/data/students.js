const mongoCollections = require('../config/mongoCollections');
const students = mongoCollections.students;
const tutorPairs = mongoCollections.tutorPairs;
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

async function addAvailability(id, start, end){
    //this code was written assuming that the HTML date input type='datetime-local'

    const studentCollection = await students();

    const newStart = new Date(start);//creates item of milliseconds since Jan 1st 1970 began
    console.log(newStart);
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
    const currentStudent = await this.getStudent(id);
    const availableArray = currentStudent.availability;

    var i;
    for(i=0;i<availableArray.length;i++){
        if(availableArray[i].dayNum==newDay){
            if(availableArray[i].startH>newStartHours){
                if(availableArray[i].startH<newEndHours) throw `The available time range cannot overlap with the pre-existing availability, ${availableArray[i]}`;
                if(availableArray[i].startH==newEndHours){//if end and start in same hour, check the minutes
                    if(availableArray[i].startM<newEndMinutes)throw `The available time range cannot overlap with the pre-existing availability, ${availableArray[i]}`;
                }
            }
            if(availableArray[i].startH<newStartHours){
                if(availableArray[i].endH>newStartHours) throw `The available time range cannot overlap with the pre-existing availability, ${availableArray[i]}`;
                if(availableArray[i].endH==newStartHours){//if end and start in same hour, check the minutes
                    if(availableArray[i].endM>newStartMinutes)throw `The avaialable time range cannot overlap with the pre-existing avaialbility, ${availableArray[i]}`;
                }
            }
            if(availableArray[i].startH==newStartHours){//if both start in same hour, check minutes (mostly the same checks as above)
                if(availableArray[i].startM>newStartMinutes){
                    if(availableArray[i].startH<newEndHours) throw `The available time range cannot overlap with the pre-existing availability, ${availableArray[i]}`;
                    if(availableArray[i].startH==newEndHours){//if end and start in same hour, check the minutes
                        if(availableArray[i].startM<newEndMinutes)throw `The available time range cannot overlap with the pre-existing availability, ${availableArray[i]}`;
                    }
                }
                if(availableArray[i].startM<newStartMinutes){
                    if(availableArray[i].endH>newStartHours) throw `The available time range cannot overlap with the pre-existing availability, ${availableArray[i]}`;
                    if(availableArray[i].endH==newStartHours){//if end and start in same hour, check the minutes
                        if(availableArray[i].endM>newStartMinutes)throw `The avaialable time range cannot overlap with the pre-existing avaialbility, ${availableArray[i]}`;
                    }
                }
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
    const updateInfo = await studentCollection.updateOne(
        {_id: id},
        {$addToSet: {availability: newAvailability}}
    );

    if(!updateInfo.matchedCount || !updateInfo.modifiedCount) throw "addition failed";

    return newAvailability;
}

async function getPair(id){
    const pairCollection = await tutorPairs();
    if(!id)throw"needs a pair ID in url";
    if(typeof id !=="string")throw "PairId must be of type string";
    const thePair = await pairCollection.findOne({_id: id});
    if(!thePair)throw `There is no pair with ID: ${id}`;
    return thePair;
}

async function createPair(tutorId,studentId,subject, proficiency){
    console.log(tutorId,studentId,subject, proficiency)
    const pairCollection= await tutorPairs();
    const studentCollection = await students();
    if(!tutorId) throw "tutor must be provided";
    if(typeof tutorId !== "string") throw "tutorId must be of type string";
    const currentStudent= await this.getStudent(studentId);
    if(!subject)throw "subject must be provided";
    if(typeof subject !=="string")throw "subject must be of type string";
    if(!proficiency)throw"The student must provide thier level of proficiency";
    if(typeof proficiency !== "string")throw "The subect's proficiency must be of type string";
    //check if it exists
    const pairAlreadyExists = await pairCollection.findOne({
        "tutorId": tutorId,
        "studentId":studentId,
        "subject":subject,
        "proficiency":proficiency
    });
    if(pairAlreadyExists)throw "this student tutor pair already exists";
    //add to tutorPairDB
    let newTutorPair = {
        _id: uuid(),
        tutorId: tutorId,
        studentId: studentId,
        subject: subject,
        proficiency: proficiency
    };

    const insertInfo = await pairCollection.insertOne(newTutorPair);
    if (insertInfo.insertedCount === 0) throw `Could not add new pair`;
    const tutoredBy = newTutorPair._id;//ID of tutorPair

    //add to tutorsDB
    const tutors = mongoCollections.tutors;
    const tutorCollection = await tutors();
    try{
        const foundTutor= await tutorCollection.findOne({_id:tutorId});
        if(!foundTutor)throw "tutor with tutorId not found";

        const updatedTutor= await tutorCollection.updateOne(
                {_id:tutorId,"tutorSubjects.subjectName":subject, "tutorSubjects.proficiency": proficiency},
                {$addToSet:{"tutorSubjects.$.teaches": studentId}}
            );
        if(!updatedTutor.matchedCount || ! updatedTutor.modifiedCount)throw "failed to add studentId to teaches array";
    }catch(e){
        await pairCollection.removeOne({_id: newTutorPair._id});
        throw e;
    }

    try{
    let newStudentSubject = {
        subjectName: subject,
        proficiency: proficiency,
        tutoredBy: tutoredBy
    };

    const addStudentSubject = await studentCollection.updateOne(
        {_id: studentId},
        {$addToSet: {"studentSubjects": newStudentSubject}}
    );
    if(!addStudentSubject.matchedCount || !addStudentSubject.modifiedCount) throw "subject addition to student failed";
    }catch(e){
        await pairCollection.removeOne({_id:newTutorPair._id});
  /*    //  await tutor.deleteTeaches(tutorId, studentId, subject, proficiency);*/
        throw e;
    }
    //Note: this does not update the tutor database
    return newTutorPair
}

async function removePair(pair){//pair contains everything in a tutorPair
    const pairCollection = await tutorPairs();
    const studentCollection = await students();
    const student = await this.getStudent(pair.studentId);
    if(!student) throw "no student with matchingId found";
    if(!pair.proficiency)throw "no subject proficiency found in pair";
    if(typeof pair.proficiency !== "string")throw "tutorPair's proficiency must be a string";
    if(!pair.subject)throw "no subject found in pair";
    if(typeof pair.subject !== "string")throw "tutorPair's subject must be a string";
    if(!pair.tutorId)throw "no tutorID found in pair";
    if(typeof pair.tutorId !== "string")throw "tutorPair's tutorId must be a string";
    //student
    const updatedStudent = await studentCollection.updateOne({_id: pair.studentId},
        {$pull:
            { studentSubjects:
                {
                    tutoredBy: pair._id,
                    subjectName: pair.subject,
                    proficiency: pair.proficiency
                }
            }
        });
    if(!updatedStudent.matchedCount || !updatedStudent.modifiedCount) throw "pair removal from student failed";
    //tutor
    const tutors = mongoCollections.tutors;
    const tutorCollection = await tutors();
    const updatedTutor = await tutorCollection.updateOne(
        {_id: pair.tutorId, "tutorSubjects.subjectName": pair.subject, "tutorSubjects.proficiency":pair.proficiency},
        {$pull: {"tutorSubjects.$.teaches": pair.studentId}});
    if(!updatedTutor.matchedCount || !updatedTutor.modifiedCount)throw "studentId removal from tutorSubjects failed";
    //tutorPair
    const removedPair = await pairCollection.removeOne({_id:pair._id});
    if(removedPair.deletedCount===0)throw "failed to delete tutorPair";
    return true;
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

async function updateStudent(id, updatedStudent){
    const student = await this.getStudent(id);
    if (typeof updatedStudent.email != 'string') throw 'Email must be a string';
    const emailDup= updatedStudent.email;//converts email to lowercase
    const emailLow = emailDup.toLowerCase();
    if (typeof updatedStudent.firstName != 'string') throw 'You must provide a first name of type string';
    if (typeof updatedStudent.lastName != 'string') throw 'You must provide a last name of type string';
    if (typeof updatedStudent.town != 'string') throw 'You must provide a string of the town you reside in';
    if (typeof updatedStudent.state != 'string') throw 'You must provide a string of the state you reside in';
    if (typeof updatedStudent.password !='string') throw 'you must provide a valid password of type string';
    const unhashedPassword = updatedStudent.password;
    //NOTE: neither the availability nor the StudentSubjects arrays will  be updated here. Those will need their own functions.
    
    //I think thatthe chat history should remain the same, regardless of name change because your past name will not be changed
    const hashedPassword= await bcrypt.hash(unhashedPassword, saltRounds);

    let studentUpdateInfo = {
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        email: emailLow,
        town: updatedStudent.town,
        state: updatedStudent.state,
        hashedPassword: hashedPassword,
        availability: student.availability, //this will not update
        studentSubjects: student.studentSubjects
    };

    const studentCollection = await students();
    const updateInfo = await studentCollection.updateOne({_id:id}, {$set: studentUpdateInfo});
    if(!updateInfo.matchedCount || !updateInfo.modifiedCount) throw 'student update failed';
    return studentUpdateInfo;

}

async function removeStudent(id){
    const studentCollection = await students();
    //let student = null;//Unecessary, but allows return to contain the info
    const theStudent = await this.getStudent(id);//of the deleted Student
    const tutorPairArray = theStudent.studentSubjects;
    for( i in tutorPairArray){
        const foundPair = await this.getPair(tutorPairArray[i].tutoredBy);
        await this.removePair(foundPair); 
    }
    const deletedInfo = studentCollection.removeOne({_id: id});
    if (deletedInfo.deletedCount === 0)throw `deletion of student: (${id}) failed`;
    return {deleted: true};
}

/* TO IMPLEMENT:
some form of remove availability function, but first need html delete specification info
*/

module.exports = {getAllstudents, getStudent, createStudent, addAvailability, removeStudent, login, createPair, getPair, removePair, removeAvailability, updateStudent}
