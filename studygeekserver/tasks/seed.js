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
    info: "Head of Gryffindor",
    subjects: ["Transfiguration"]
})
tutorArray.push(Minerva)
const Sybill = new Tutor({
    name:"Sybill Trelawney",
    info:"The great-great-granddaughter of the celebrated Cassandra Trelawney",
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
    name: {
        type:String
    },
    education: {
        type: String
    },

    info: {
        type:String
    },
    subjects: {
        type: Array,
        "default": []
    }
})

let studentArray = [];
const harry = new Student({
    name: "Harry Potter",
    info: "The boy who lived",
    education: "Junior", 
    subjects: ["Flying", "Defence Against the Dark Arts", "Potions"]
})
studentArray.push(harry)

const hermoine = new Student({
    name: "Hermoine Granger",
    info: "One of the most talented witch. ",
    education: "Ph.D", 
    subjects: ["Defence Against the Dark Arts", "Potions", "Transfiguration", "Divination"]
})
studentArray.push(hermoine)

const ron = new Student({
    name: "Ron Wesley",
    info: "Hermoine's future husband. ",
    education: "Fresh", 
    subjects: ["Flying"]
})
studentArray.push(ron)

const luna = new Student({
    name: "Luna Lovegood",
    education: "Senior", 
    info: "A true, delight Ravenclaw with a sing-song voice.",
    subjects: ["Defence Against the Dark Arts", "Divination"]
})
studentArray.push(luna)

const malfoy = new Student({
    name: "Draco Lucius Malfoy",
    info: "A charming boy who is a little bit lost",
    education: "Jonior", 
    subjects: ["Flying", "Potions", "Divination"]
})
studentArray.push(malfoy)

for(t in studentArray){
    studentArray[t].save().then(() => {
        console.log(studentArray[t])
    }).catch((error) => {
        console.log('Error', error)
    })
}

