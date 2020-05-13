import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import UserContext from './context/UserContext';

const TutorInfo = (props) => {
    console.log(props.match.params.id)
    const [student, setStudent] = useState(undefined);
    const {token, setToken} = useContext(UserContext);
    const history = useHistory();
    if (!token){
        console.log("no tokens");
        history.push('/login')
    }
    
    const tokenInfo = jwt_decode(localStorage.getItem("token"));
    console.log(tokenInfo)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [subjects, setSubjects] = useState("");
    const [availability, setAvailability] = useState("");
    const [state, setState] = useState("");
    const [town, setTown] = useState("");
    const [paired, setPaired] = useState("");
    
    const requestTutor = async()=>{
        try{
            const { data } = await axios.post('http://localhost:3003/tutorPair/',{
                'tutorId': props.match.params.id,
                'studentId' : tokenInfo.statusId
            })


        }catch(e){
            console.log(e);
        }
    }

    const getStudent = async() => {
        try{
            const { data } = await axios.get('http://localhost:3003/tutors/' + props.match.params.id);
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
                    <h2>Subjects: </h2>
                    {subjects && subjects.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s.subjectName}</p>
                        </div>
                    ))}               
                </div>

                <div className="col">
                    <h2>Availability: </h2>
                    {availability && availability.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s}</p>
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
            <br/>
            { tokenInfo.status === 'students' && <button className='ui positive button' onClick={requestTutor}>Request Tutor.</button>}  
        </div>
    )

};

export default TutorInfo
