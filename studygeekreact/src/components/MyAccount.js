import axios from 'axios';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";


const MyAccount =() => {
    const [email, setEmail] = useState("");
    const [edit, setEdit] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [subjects, setSubjects] = useState(undefined);
    const [info, setInfo] = useState("");
    const getAccount = async() =>{
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.get(urlString);
            setEmail(data.email);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setSubjects(data.subjects);
            console.log(data.subjects)
            setInfo(data.info);
        }catch(e){
            console.log(e)
        }
    };

    useEffect(() => {
        getAccount()
    }, []);

    return (
        <div className="container">
            <h1>{firstName}'s Page.</h1>
            <div className="row">
                <div className="col">
                    <h2>Subjects: </h2>
                    <hr/>
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
                    <hr/>
                    <p>{ info }</p>
                    
                    {edit && <div>
                        <form className="ui form">
                            <textarea placeholder="Tell us more" rows="3"></textarea>
                        </form>
                        <button>Submit</button>
                    </div>}
                    
                </div>
            </div>

        </div>
    )
}

export default MyAccount;
