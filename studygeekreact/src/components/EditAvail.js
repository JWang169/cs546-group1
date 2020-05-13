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
        console.log(urlString)
        try{
            const { data } = await axios.post(urlString, {
                startTime: startTime,
                endTime: endTime
            });
            history.push('/myaccount')
        }catch(e){
            console.log(e)
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
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}/availability`;
        console.log( {
            startTime: availability[index].start,
            endTime: availability[index].end
        })
        try{
            const {data} = await axios.delete(urlString, {
                startTime: availability[index].start,
                endTime: availability[index].end
            });
            history.push('/myaccount')
        }catch(e){
            console.log(e)
        }   
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
            <h1>Edit My Availability.</h1>
            <br/>
            <hr/>
            
            <form className="ui form">
            <div className="field">
                <div className='field'>
                <h3>Availability</h3>
                    {availability && availability.map((s, index) => (
                        <div key={s.start}>
                            <h4>From: {s.start}  To: {s.end} 
                            <button className="button" onClick={(e) =>deleteAvailability(e, index)} style={{position: 'absolute', right: 550}}>Delete</button></h4>                           
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
