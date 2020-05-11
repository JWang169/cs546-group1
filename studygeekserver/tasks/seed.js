const mongoose = require('mongoose');
const uuid = require('uuid/v4');

mongoose.connect("mongodb://localhost:27017/hogwarts",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Tutor = mongoose.model('Tutor', {
    _id: {
        type: String
    },
    email:{
        type:String
    },
    firstName: {
        type:String
    },
    lastName: {
      type:String
    },
    town:{
      type:String
    },
    state:{
      type:String
     },
    availability: {//lefft empty for now, have not yet implemented its database
        type: Array,
        "default": []
    },
    /*education: {// this does not exist in DB proposal
        type: String
    },*/

    /*info: {
        type:String
    },*/
    studentSubjects: {//left empty for now, have not yet implemented its database
        type: Array,
        "default": []
//     ,
//     subject:{
//         type:String
//     },
//     proficiency:{
//         type: String
//     },
//     price:{
//         type: Number
//     },
})

let tutorArray = [];
const Snape = new Tutor({
    _id:uuid(),
    //_id:"507f1f77bcf86cd799439011",
    email: "severus@snape.com",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    firstName: "Severus",
    lastName: "Snape",
    town: "Hoboken",
    state: "NJ"
//     subject: "Potions",
//     proficiency : "Advanced",
//     price : "10"
})
tutorArray.push(Snape)

const Moody = new Tutor({
    _id:uuid(),
    // _id: "5e1a0651741b255ddda996c4",
    email: "alastor@moody.com",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    firstName: "Alastor",
    lastName: "Moody",
    town: "Dublin",
    state: "CA"
//     subject: "Defence Against the Dark Arts",
//     proficiency : "Intermediate",
//     price : "25"
})
tutorArray.push(Moody)

const Lupin = new Tutor({
    // _id:"a4f8512b9a734baf863ff33f",
    _id:uuid(),
    email: "remus@lupin.com",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    firstName: "Remus",
    lastName: "JohnLupin",
    town: "Dallas",
    state: "TX",
//     subject: "Defence Against the Dark Arts",
//     proficiency : "Advanced",
//     price : "50"
})
tutorArray.push(Lupin)

const Minerva = new Tutor({
    _id:uuid(),
    email: "minerva@mcgonagall.com",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    firstName: "Minerva",
    lastName: "McGonagall",
    town: "Seattle",
    state: "Washington"
//     subject: "Transfiguration",
//     proficiency : "Beginner",
//     price : "15"
})
tutorArray.push(Minerva)

const Sybill = new Tutor({
    _id:uuid(),
    email: "sybill@trelawney.com",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    firstName: "Sybill",
    lastName: "Trelawney",
    town: "Baltimore",
    state: "Maryland"
//     subject: "Divination",
//     proficiency : "Beginner",
//     price : "25"
})
tutorArray.push(Sybill)

const Rolanda = new Tutor({
    _id:uuid(),
    email: "rolanda@hooch.com",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    firstName: "Rolanda",
    lastName: "Hooch",
    town: "Miami",
    state: "Florida"
//     subject: "Flying",
//     proficiency : "Advanced",
//     price : "100"
})
tutorArray.push(Rolanda)


for(t in tutorArray){
    tutorArray[t].save().then(() => {
        console.log(Snape)
    }).catch((error) => {
        console.log('Error', error)
    })
}

const Student = mongoose.model('Student', {
    _id: {
        type: String
    },
    firstName: {
        type:String
    },
    lastName: {
        type:String
    },
    hashedPassword: {
        type:String//For now, all passwords in seed will default to
        // $2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK
        //from the lab 10
    },
    town:{
        type:String
    },
    state:{
        type:String
    },
    email: {
        type:String
    },
    availability: {//lefft empty for now, have not yet implemented its database
        type: Array,
        "default": []
    },
    /*education: {// this does not exist in DB proposal
        type: String
    },*/

    /*info: {
        type:String
    },*/
    studentSubjects: {//left empty for now, have not yet implemented its database
        type: Array,
        "default": []
    }
})

let studentArray = [];
const harry = new Student({
    _id:"507f1f77bcf86cd799439011",//from lab 6 (also seen in mongodb objectId webpage)
    firstName: "Harry",
    lastName:"Potter",
    town:"Little Whinging",
    state:"Surrey",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    email: "horcrux@gmail.com"

    //info: "The boy who lived",
    //education: "Junior",
   // subjects: ["Flying", "Defence Against the Dark Arts", "Potions"]
})
studentArray.push(harry)

const hermoine = new Student({
    _id:"a4f8512b9a734baf863ff33f", //from lab 6
    firstName: "Hermoine",
    lastName: "Granger",
    town: "Hogsmeade",
    state: "Britain",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    email: "bestwitch@gmail.com"

    //info: "One of the most talented witch.",
    //education: "Ph.D",
    //subjects: ["Defence Against the Dark Arts", "Potions", "Transfiguration", "Divination"]
})
studentArray.push(hermoine)

const ron = new Student({
    _id:"5324fbb60f664dc38e540408",//from lab 4
    firstName: "Ron",
    lastName: "Weasley",
    town: "The Burrough",
    state: "Devon",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    email: "hermoineHusband@gmail.com"
    /*info: "Hermoine's future husband. ",
    education: "Fresh",
    subjects: ["Flying"]*/
})
studentArray.push(ron)

const luna = new Student({
    _id:"5b0b614d46a8445083b965b8",//from lab4
    firstName: "Luna",
    lastName: "Lovegood",
    town: "Rook",
    state: "New Jersey",
    hashedPassword:"$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    email: "nargles@gmail.com"
  /*  education: "Senior",
    info: "A true, delight Ravenclaw with a sing-song voice.",
    subjects: ["Defence Against the Dark Arts", "Divination"]*/
})
studentArray.push(luna)

const malfoy = new Student({
    _id: "5e1a0651741b255ddda996c4",//from mongodb objectid webpage
    firstName: "Draco",
    email: "lucius@gmail.com",
    lastName: "Malfoy",
    town: "Slytherin",
    state:"Hogwarts",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    availability: [
        {
            day: "Thursday",
            dayNum: 4,
            start: 1496320200000,
            startExtended: new Date(1496320200000),
            end: 1496323800000,
            endExtended: new Date(1496323800000)
        },
        {
            day: "Friday",
            dayNum: 5,
            start: 1496413800000,
            startExtended: new Date(1496413800000),
            end: 1496460600000,
            endExtended: new Date(1496460600000)
        }
    ]
  /* info: "A charming boy who is a little bit lost",
    education: "Jonior",
    subjects: ["Flying", "Potions", "Divination"]*/
})
studentArray.push(malfoy)

for(t in studentArray){
    studentArray[t].save().then(() => {
        console.log(studentArray[t])//this seems to only output malfoy for me.
    }).catch((error) => {
        console.log('Error', error)
    })
}
