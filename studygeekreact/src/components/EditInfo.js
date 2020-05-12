import axios from 'axios';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const EditInfo =() => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [availability, setAvailability] = useState("");
    const [state, setState] = useState("");
    const [town, setTown] = useState("");
    const [newSubject, setNewSubject] = useState("")
    const [newAvailability, setNewAvailability] = useState("")
    const history = useHistory();


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
            if(tokenInfo.status === 'students'){
                setSubjects(data.studentSubjects)
            }else{
                setSubjects(data.tutorSubjects)
            }
            
            setAvailability(data.availability)
            console.log(subjects);
        }catch(e){
            console.log(e)
        }
    };

    const submitInfo = async(event) => {
        event.preventDefault();
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        let newData = {
            'firstName': firstName,
            'lastName': lastName,
            'town': town,
            'state': state,
            'studentSubjects': subjects,
            'availability':availability
        };

        // console.log(newData)
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        console.log(urlString)
        try{
            const { data } = await axios.put(urlString, newData);
            // console.log(data);
        }catch(e){
            console.log(e)
        }
    }

    const addSubject = (event) => {
        event.preventDefault();
        setSubjects([...subjects, newSubject]);
    }

    const addAvailability = (event) => {
        event.preventDefault();
        let newS = startTime;
        let newE = endTime;
        setNewAvailability({
            'start': newS,
            'end': newE
        })
        setAvailability([...availability, newAvailability]);
    }

    const onClickNoChange = (event) => {
        event.preventDefault();
        history.push('/myaccount');
    }

    const deleteSubject = (event) => {
        event.preventDefault();
        const {id} = event.target.parentElement;
        subjects.splice(id, 1)
        setSubjects([...subjects])
    }

    const deleteAvailability= (event) => {
        event.preventDefault();
        const {id} = event.target.parentElement;
        availability.splice(id, 1)
        setAvailability([...availability])
    }


    useEffect(() => {
        getAccount()
    }, []);

    return (
        <div className="container">
            <h1>Edit My Account.</h1>
            <br/>
            <hr/>
            
            <form className="ui form" onSubmit={submitInfo}>
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
                <div className="field">
                    <label>Start time</label>
                    <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => {setStartTime(e.target.value);}}
                    required
                    />
                    </div>
                    <div className="field">
                    <label>End time</label>
                    <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => {setEndTime(e.target.value);}}
                    required
                    />
                    </div>
                    {/* <input
                    type="text"
                    name="newAvailability"
                    value={newAvailability}
                    onChange={(e) => setNewAvailability(e.target.value)}
                    /> */}

                <button onClick={addAvailability}>Add Availability</button>   
                </div>
            </div>    
            <button className="ui negative button" onClick={onClickNoChange}>Discard Change</button>
            <button className="ui positive button" type='submit' style={{position: 'absolute', right: 50}}>Save Change </button>
            </form>
            <br/>


        </div>
    )
}

export default EditInfo;
