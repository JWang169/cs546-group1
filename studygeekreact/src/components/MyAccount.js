import axios from 'axios';
import UserContext from './context/UserContext';
import React, { useState, useContext, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const MyAccount =() => {
    const {token, setToken} = useContext(UserContext);
    const history = useHistory();
    if (!token){
        console.log("no tokens");
        history.push('/login')
    }
    const [edit, setEdit] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [subjects, setSubjects] = useState("");
    const [availability, setAvailability] = useState("");
    const [state, setState] = useState("");
    const [town, setTown] = useState("");
    const [newSubject, setNewSubject] = useState("")
    const [newAvailability, setNewAvailability] = useState("")



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
            setSubjects(data.studentSubjects)
            setAvailability(data.availability)
        }catch(e){
            console.log(e)
        }
    };
    


    // const submitInfo = async(event) => {
    //     event.preventDefault();
    //     const tokenInfo = jwt_decode(localStorage.getItem("token"));
    //     let newData = {'info': newInfo, 'subjects': subjects};
    //     if(!newInfo){
    //         console.log('no new info')
    //         newData['info'] = info;
    //     }
    //     // console.log(newData)
    //     const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
    //     try{
    //         const { data } = await axios.put(urlString, newData);
    //         // console.log(data);
    //     }catch(e){
    //         console.log(e)
    //     }
    //     setEdit(false)
    // }

    const addSubject = (event) => {
        event.preventDefault();
        setSubjects([...subjects, newSubject]);
    }

    const addAvailability = (event) => {
        event.preventDefault();
        setAvailability([...availability, newAvailability]);
    }

    const onClickAccount = () => {
        // setEdit(true);
        history.push('/editinfo');
    }

    const onClickNoChange = () => {
        setEdit(false);

    }

    const deleteSubject = (event) => {
        event.preventDefault();
        const {id} = event.target.parentElement;
        subjects.splice(id, 1)
        setSubjects([...subjects])
        console.log(subjects)
    }

    const deleteAvailability= (event) => {
        event.preventDefault();
        const {id} = event.target.parentElement;
        availability.splice(id, 1)
        setAvailability([...availability])
        console.log(availability)
    }

    useEffect(() => {
        // if (token === null){
        //     history.push('/login')
        // }
        getAccount()
    });

    return (
        <div className="container">
            <h1>{firstName}'s Page.</h1>
            <br/>
            <hr/>
            {!edit && <div className="row">
                <div className="col">
                    <h2>My Subjects: </h2>
                    {subjects && subjects.map(s => (
                        <div key={subjects.value}>
                            <p>{s}</p>
                        </div>
                    ))}               
                </div>
                <div className="col">
                    <h2>My Availability: </h2>
                    {availability && availability.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s}</p>
                        </div>
                    ))}  
                </div>
                <div className="col">
                    <h2>My Account: </h2>
                    <div className="form-group">First name: {firstName}</div>
                    <div className="form-group">Last name: {lastName}</div>
                    <div className="form-group">Email: {email}</div>
                    <div className="form-group">State: {state}</div>
                    <div className="form-group">Town: {town}</div>
                </div>
            </div>}

            {!edit && <button className='ui button' onClick={onClickAccount}>Edit My Account</button>}        
            
            {edit && <form className="ui form">
            <div className="field">
                <div className="field">
                <label>First Name</label>
                <input 
                type='text' 
                name='first-name' 
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                />
                </div>
                <div className="field">
                <label>Last Name</label>
                <input 
                type='text' 
                name='last-name' 
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                />
                </div>
                <div className="field">
                <label>State</label>
                <input 
                type='text' 
                name='state' 
                placeholder='State'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
                </div>
                <div className="field">
                <label>Town</label>
                <input 
                type='text' 
                name='town' 
                placeholder='Town'
                value={town}
                onChange={(e) => setTown(e.target.value)}
                required
                />
                </div>
                <div className='field'>
                <label>Subjects</label>
                    {subjects && subjects.map(s => (
                        <div key={subjects.value}>
                            <p>{s}
                            <button color='red' onClick={deleteSubject}>Delete</button>
                            </p>
                        </div>
                    ))}  
                </div>
                <div className='field'>
                <label>Add a subject</label>
                    <input
                    type="text"
                    name="subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    />
                <button onClick={addSubject}>Add Subject</button>   
                </div>

                <div className='field'>
                <label>Availability</label>
                    {availability && availability.map(s => (
                        <div key={availability.value}>
                            <p>{s}
                            <button color='red' onClick={deleteAvailability}>Delete</button>
                            </p>
                        </div>
                    ))}  
                </div>
                <div className='field'>
                <label>Add availability</label>
                    <input
                    type="text"
                    name="newAvailability"
                    value={newAvailability}
                    onChange={(e) => setNewAvailability(e.target.value)}
                    />
                <button onClick={addAvailability}>Add Availability</button>   
                </div>

            </div>    
            </form>}
            <br/>
            { edit && <button className='ui button' onClick={onClickNoChange}>Discard Change</button>}  

        </div>
    )
}

export default MyAccount;
