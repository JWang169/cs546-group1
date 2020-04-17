const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/hogwarts",{
    useNewUrlParser: true,
    useCreateIndex: true
})

// const Tutor = mongoose.model('Tutor', {
//     name: {
//         type:String
//     },
//     subjects: {
//         type: Array,
//         "default": []
//     }
// })

// let tutorArray = [];
// const Snape = new Tutor({
//     name: "Severus Snape",
//     subjects: ["Potions", "Defence Against the Dark Arts"]
// })
// tutorArray.push(Snape)
// const Moody = new Tutor({
//     name:"Alastor Moody",
//     subjects: ["Defence Against the Dark Arts"]
// })
// tutorArray.push(Moody)
// const Minerva = new Tutor({
//     name:"Minerva McGonagall",
//     subjects: ["Transfiguration"]
// })
// tutorArray.push(Minerva)
// const Sybill = new Tutor({
//     name:"Sybill Trelawney",
//     subjects: ["Divination"]
// })
// tutorArray.push(Sybill)
// const Rolanda = new Tutor({
//     name:"Rolanda Hooch",
//     subjects: ["Flying"]
// })
// tutorArray.push(Rolanda)


// for(t in tutorArray){
//     tutorArray[t].save().then(() => {
//         console.log(Snape)
//     }).catch((error) => {
//         console.log('Error', error)
//     })
// }


const Student = mongoose.model('Student', {
    name: {
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
    subjects: ["Flying", "Defence Against the Dark Arts", "Potions"]
})
studentArray.push(harry)

const hermoine = new Student({
    name: "Hermoine Granger",
    subjects: ["Defence Against the Dark Arts", "Potions", "Transfiguration", "Divination"]
})
studentArray.push(hermoine)

const luna = new Student({
    name: "Luna Lovegood",
    subjects: ["Defence Against the Dark Arts", "Divination"]
})
studentArray.push(luna)

const malfoy = new Student({
    name: "Draco Lucius Malfoy",
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




