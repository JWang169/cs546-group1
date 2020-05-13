import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PersonInfo = (props) => {
    // console.log(props.match.params.id)
    // const [student, setStudent] = useState(undefined);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [subjects, setSubjects] = useState("");
    const [availability, setAvailability] = useState("");
    const [state, setState] = useState("");
    const [town, setTown] = useState("");
    
    const getStudent = async() => {
        try{
            const { data } = await axios.get('http://localhost:3003/students/' + props.match.params.id);
            setLastName(data.lastName);
            setFirstName(data.firstName);
            setEmail(data.email);
            setState(data.state);
            setTown(data.town);
            setSubjects(data.studentSubjects)
            setAvailability(data.availability)

        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getStudent();
    }, []);


    // useEffect(() => {
    //     async function fetchData(){
    //         try{
    //             const {data} = await axios.get('http://localhost:3003/students/' + props.match.params.id);
    //             setStudent(data);
    //         }catch(e){
    //             console.log(e);
    //         }
    //     }
    //     fetchData();
    // },
    // [ props.match.params.id ]
   
    // );


    return (
        <div className="container">
            <h1>{firstName}'s Page.</h1>
            <br/>
            <hr/>
            <div className="row">
            <div className="col">
                    <h2>My Subjects: </h2>
                    {subjects && subjects.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s.subjectName}</p>
                        </div>
                    ))}               
                </div>


                <div className="col">
                    <h2>My Availability: </h2>
                    {availability && availability.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s.day}, {s.startH}:{s.startM} - {s.endH}:{s.endM}</p>
                        </div>
                    ))}
                    
                </div>
                <div className="col">
                    <h2>Contact Info: </h2>
                    <div className="form-group">First name: {firstName}</div>
                    <div className="form-group">Last name: {lastName}</div>
                    <div className="form-group">Email: {email}</div>
                    <div className="form-group">State: {state}</div>
                    <div className="form-group">Town: {town}</div>
                </div>
                
            </div>    
            
        </div>
    )

};

export default PersonInfo
