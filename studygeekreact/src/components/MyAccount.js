import axios from 'axios';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";


const MyAccount =() => {
    const [email, setEmail] = useState("");
    const [edit, setEdit] = useState(false);
    const [newSubject, setNewSubject] = useState("");
    // const [allSubjects, setAllSubjects] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [info, setInfo] = useState("");
    const [newInfo, setNewInfo] = useState(undefined);

    const getAccount = async() =>{
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        // console.log(tokenInfo)
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.get(urlString);
            setEmail(data.email);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setSubjects(data.subjects);
            setInfo(data.info);
        }catch(e){
            console.log(e)
        }
    };

    const submitInfo = async(event) => {
        event.preventDefault();
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        let newData = {'info': newInfo, 'subjects': subjects};
        if(!newInfo){
            console.log('no new info')
            newData['info'] = info;
        }
        // console.log(newData)
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.put(urlString, newData);
            // console.log(data);
        }catch(e){
            console.log(e)
        }
        setEdit(false)
    }

    const addSubject = (event) => {
        event.preventDefault();
        setSubjects([...subjects, newSubject]);
    }

    const addInfo = (event) => {
        event.preventDefault();
        setInfo(newInfo);
        setNewInfo(newInfo);
    }

    const onClickFunc = () => {
        setEdit(true);
    }

    useEffect(() => {
        getAccount()
    }, []);

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
                            <p>{s}</p>
                        </div>
                    ))}               
                </div>
                <div className="col">
                    <h2>My Account: </h2>
                    <div className="form-group">First name: {firstName}</div>
                    <div className="form-group">Last name: {lastName}</div>
                    <div className="form-group">Email: {email}</div>
                </div>
                <div className="col">
                    <h2>About Me: </h2>
                    <p>{ info }</p>                  
                </div>
            </div>    
            {!edit && <button className='ui button' onClick={onClickFunc}>Edit My Account</button>}        
     
            {edit && <form className="ui form" onSubmit={submitInfo}>
                <div className="field">
                    <label>Add a subject</label>
                    <input
                    type="text"
                    name="subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    />
                <button className='ui button' onClick={addSubject}>Update Subject</button>
                </div>
                
                <div className="field">
                    <label>Add About Me</label>
                    <textarea 
                    rows="3"
                    placeholder="Say something about you." 
                    value={newInfo}
                    onChange={(e) => setNewInfo(e.target.value)} 
                    />
                    <button className='ui button' onClick={addInfo}>Update About Me </button>
                </div>
                           

            <div className="col"><button className='ui button' type='submit' style={{position: 'absolute', right: 50}}>Save Change </button></div>
            </form>}
        </div>
    )
}

export default MyAccount;
