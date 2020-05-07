const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/hogwarts",{
    useNewUrlParser: true,
    useCreateIndex: true
})

const Tutor = mongoose.model('Tutor', {
    name: {
        type:String
    },
    info: {
        type:String
    },
    subjects: {
        type: Array,
        "default": []
    }
})

let tutorArray = [];
const Snape = new Tutor({
    name: "Severus Snape",
    info: "Half-blood Prince",
    subjects: ["Potions", "Defence Against the Dark Arts"]
})
tutorArray.push(Snape)

const Moody = new Tutor({
    name:"Alastor Moody",
    info:"Mad Eye",
    subjects: ["Defence Against the Dark Arts"]
})
tutorArray.push(Moody)

const Lupin = new Tutor({
    name:"Remus JohnLupin",
    info:"Moony",
    subjects: ["Defence Against the Dark Arts"]
})
tutorArray.push(Lupin)


const Minerva = new Tutor({
    name:"Minerva McGonagall",
    info: "Babbling bumbling band of baboons",
    subjects: ["Transfiguration"]
})
tutorArray.push(Minerva)
const Sybill = new Tutor({
    name:"Sybill Trelawney",
    info:"Together we shall cast ourselves into the future",
    subjects: ["Divination"]
})
tutorArray.push(Sybill)
const Rolanda = new Tutor({
    name:"Rolanda Hooch",
    info:"'UP'",
    subjects: ["Flying"]
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

