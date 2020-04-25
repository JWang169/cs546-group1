import axios from 'axios';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";


const MyAccount =() => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const getAccount = async() =>{
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.get(urlString);
            setEmail(data.email);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        }catch(e){
            console.log(e)
        }
    };

    useEffect(() => {
        getAccount()
    }, []);

    return (
        <div>{ email }</div>
    )
}

export default MyAccount;
