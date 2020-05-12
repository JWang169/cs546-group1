import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from './context/UserContext';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("students");
    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const history = useHistory();
    const {token, setToken} = useContext(UserContext);
    const submitInfo = async(event) =>{
      event.preventDefault();
      try {
        const urlString = `http://localhost:3003/${status}/login`;
        console.log(urlString)
        const newToken = await axios.post(urlString,{
          'email': email,
          'password': password,
        });

        localStorage.setItem("token", newToken.data);
        setToken(newToken.data);
        // const tokenInfo = jwt_decode(localStorage.getItem("token"));
        history.push('/')
      }catch(e){
        console.log(e);
        const jsonResponse = e.response;
        if(jsonResponse.data.error === 'No such user'){
          setEmailError("User Email doesn't exist.");
        }else{
          setErrorMessage(jsonResponse.data.error);
        }
      }  
    }

    useEffect(() => {
      if (token){
        history.push('/')
      }
    }); 

    return (

    <form className="ui form" onSubmit={submitInfo}>
      <div className="field">
        <label>Email</label>
        { emailError && <div
            className="ui pointing below prompt label"
            id="form-input-control-error-email-error-message"
            role="alert"
            aria-atomic="true"
          >
            {emailError}
          </div>}
        <input 
        type='email' 
        name='email' 
        placeholder='triddle@slytherin.edu' 
        value={email} 
        onChange={(e) => {
          setEmail(e.target.value)
          setEmailError("");  
        }
        }
        required
        />
      </div>
      <div className="field">
        <label>Password</label>
        { errorMessage && <div
            className="ui pointing below prompt label"
            id="form-input-control-error-email-error-message"
            role="alert"
            aria-atomic="true"
          >
            {errorMessage}
          </div>}
        <input 
        type='password' 
        name='password'  
        value={password} 
        onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
            localStorage.clear("token");
          }
        }
        required
        />
      </div>

      <div className="form-check">
      <label className="form-check-label">
        <input 
        type="radio" 
        className="form-check-input" 
        name="optradio" 
        onChange={(e) => setStatus("tutors")}
        /> I'm a tutor
      </label>
      </div>
      <div className="form-check">
        <label className="form-check-label">
          <input type="radio" 
          className="form-check-input" 
          name="optradio"
          onChange={(e) => setStatus("students")}
          /> I'm a student
        </label>
      </div>    
      {/* <div className="field">
          <div className="ui radio checkbox">
            <input
              type="checkbox"
              name="checkboxRadioGroup"
              readOnly=""
              tabIndex="0"
              value="tutor"
              onChange={(e) => setStatus("tutors")}
            />
            <label>I am a tutor.</label>
            <input
              type="checkbox"
              name="checkboxRadioGroup"
              readOnly=""
              tabIndex=""
              value="tutor"
              onChange={(e) => setStatus("tutors")}
            />
            <label>I am a tutor.</label>
          </div>
      </div> */}

      {/* <div className="field">
        <div className='ui checkbox'>
        <input type='checkbox' tabIndex='0' required/>
        <label>You're just as sane as I am. </label>
        </div>
      </div> */}
      <br />
      <button className='ui button' type='submit'>Log In</button>
    </form>
    );
}

export default LogIn;
