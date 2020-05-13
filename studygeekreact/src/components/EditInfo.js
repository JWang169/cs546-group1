import axios from 'axios';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';


// users can edit their personal information on this page 
// it works for both students and tutors 

const EditInfo =() => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [state, setState] = useState("");
    const [town, setTown] = useState("");
    const history = useHistory();


    const getAccount = async() =>{
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.get(urlString);
            setLastName(data.lastName);
            setFirstName(data.firstName);
            setState(data.state);
            setTown(data.town);
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
            'state': state
        };

        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        console.log(urlString)
        try{
            const { data } = await axios.put(urlString, newData);
            history.push('/myaccount');
        }catch(e){
            console.log(e)
        }
    }
    const onClickNoChange = (event) => {
        event.preventDefault();
        history.push('/myaccount');
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
                
            </div>    
            <button className="ui negative button" onClick={onClickNoChange}>Discard Change</button>
            <button className="ui positive button" type='submit' style={{position: 'absolute', right: 50}}>Save Change </button>
            </form>
            <br/>


        </div>
    )
}

export default EditInfo;
