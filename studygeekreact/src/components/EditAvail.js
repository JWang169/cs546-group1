import axios from 'axios';
import UserContext from './context/UserContext';
import React, { useState, useContext, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';


// users can edit their availability on this page 
// it works for both students and tutors 

const EditInfo =() => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [availability, setAvailability] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);
    const history = useHistory();
    const {token, setToken} = useContext(UserContext);

    const getAccount = async() =>{
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.get(urlString);
            setAvailability(data.availability);
        }catch(e){
            console.log(e);
        }
    };


    const addAvailability = async(event) => {
        event.preventDefault();
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}/availability`;
        console.log(urlString);
        try{
            const { data } = await axios.post(urlString, {
                startTime: startTime,
                endTime: endTime
            });
            setErrorMsg(false);
            history.push('/myaccount');
        }catch(e){
            console.log(e);
            setErrorMsg(true);
        }
 
    }

    const onClickBack = (event) => {
        event.preventDefault();
        history.push('/myaccount');
    }

    // post to server to delete an availability.
    const deleteAvailability= async(event, index) => {
        event.preventDefault();
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}/availability/delete`;
        try{
            const delInfo = {
                start: availability[index].start,
                end: availability[index].end
            }
            console.log(delInfo);
            const {data} = await axios.post(urlString, delInfo);
            history.push('/myaccount');
        }catch(e){
            console.log(e)
        }   
    }

    useEffect(() => {
        getAccount()
    }, []);

    return (
        <div className="container">
            <h1>Edit My Availability.</h1>
            <br/>
            <hr/>
            
            <form className="ui form">
            <div className="field">
                <div className='field'>
                <h3>Availability</h3>
                    {availability && availability.map((s, index) => (
                        <div key={Math.random() * 100000}>
                            <h4>{s.day}, {s.startH}:{s.startM} - {s.endH}:{s.endM}
                            <button className="button" onClick={(e) =>deleteAvailability(e, index)} style={{position: 'absolute', right: 550}}>Delete</button></h4>                           
                        </div>
                    ))}  
                </div>
                <div className='field'>
                <h3>Add availability</h3>
                <div className="field">                    
                    { errorMsg && <div
                        className="ui pointing below prompt label"
                        id="form-input-control-error-email-error-message"
                        role="alert"
                        aria-atomic="true"
                    >
                        Couldn't add that availability.
                    </div>} 
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
                   
                    <button className="ui positive button" onClick={addAvailability}> Add Availability </button>
                    <button className="ui button" onClick={onClickBack} style={{position: 'absolute', right: 50}}>Back to My Page</button>

                </div>
            </div>    
            </form>
            <br/>


        </div>
    )
}

export default EditInfo;
