import axios from 'axios';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';


// users can edit their availability on this page 
// it works for both students and tutors 

const EditInfo =() => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [availability, setAvailability] = useState("");
    const [newAvailability, setNewAvailability] = useState("");
    const history = useHistory();


    const getAccount = async() =>{
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.get(urlString);
            setAvailability(data.availability)
        }catch(e){
            console.log(e)
        }
    };


    const addAvailability = async(event) => {
        event.preventDefault();
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}/availability`;
        try{
            const { data } = await axios.post(urlString, {
                startTime: startTime,
                endTime: endTime
            });
        }catch(e){
            console.log(e)
        }
 
    }

    const deleteAvailability= (event) => {
        event.preventDefault();
        // post to server to delete an availability.
    }
    // const deleteAvailability= (event) => {
    //     event.preventDefault();
    //     const {id} = event.target.parentElement;
    //     availability.splice(id, 1)
    //     setAvailability([...availability])
    // }


    useEffect(() => {
        getAccount()
    }, []);

    return (
        <div className="container">
            <h1>Edit My Account.</h1>
            <br/>
            <hr/>
            
            <form className="ui form">
            <div className="field">
                <div className='field'>
                <h3>Availability</h3>
                    {availability && availability.map(s => (
                        <div key={s.start}>
                            <p>From: {s.start}  To: {s.end} <button color='red' onClick={deleteAvailability}>Delete</button></p>                           
                        </div>
                    ))}  
                </div>
                <div className='field'>
                <h3>Add availability</h3>
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


                <button onClick={addAvailability}>Add Availability</button>   
                </div>
            </div>    
            </form>
            <br/>


        </div>
    )
}

export default EditInfo;