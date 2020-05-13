import axios from 'axios';
import UserContext from './context/UserContext';
import React, { useState, useContext, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

// this shows the user its personal account 

const MyAccount =() => {
    const {token, setToken} = useContext(UserContext);
    const history = useHistory();
    if (!token){
        // console.log("no tokens");
        history.push('/login')
    }
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [subjects, setSubjects] = useState("");
    const [availability, setAvailability] = useState("");
    const [state, setState] = useState("");
    const [town, setTown] = useState("");


    const getAccount = async() =>{
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        // console.log(tokenInfo)
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.get(urlString);
            setLastName(data.lastName);
            setFirstName(data.firstName);
            setEmail(data.email);
            setState(data.state);
            setTown(data.town);
            if(tokenInfo.status === 'tutors'){
                setSubjects(data.tutorSubjects)
            }else{
                setSubjects(data.studentSubjects)
            }
            setAvailability(data.availability)
            // console.log(data.subjects)
        }catch(e){
            console.log(e)
        }
    };
    
    const onClickAccount = () => {
        // setEdit(true);
        history.push('/editinfo');
    }
    const onClickAvail = () => {
        // setEdit(true);
        history.push('/editavail');
    }
    const onClickSub = () => {
        // setEdit(true);
        history.push('/editsub');
    }

    useEffect(() => {
        // if (token === null){
        //     history.push('/login')
        // }
        getAccount()
    },[]);

    return (
        <div className="container">
            <h1>{firstName}'s Page.</h1>
            <br/>
            <hr/>
            <div className="row">
                <div className="col">
                    <h2>My Subjects: </h2>
                    <button className='ui button' onClick={onClickSub}>Edit My Subjects</button>   
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
                    <button className='ui button' onClick={onClickAvail}>Edit My Availability</button>   
                </div>
                <div className="col">
                    <h2>My Account: </h2>
                    <button className='ui button' onClick={onClickAccount}>Edit My Account</button>  
                    <div className="form-group">First name: {firstName}</div>
                    <div className="form-group">Last name: {lastName}</div>
                    <div className="form-group">Email: {email}</div>
                    <div className="form-group">State: {state}</div>
                    <div className="form-group">Town: {town}</div>                     
                </div>
            </div> 
        </div>
    )
}

export default MyAccount;
