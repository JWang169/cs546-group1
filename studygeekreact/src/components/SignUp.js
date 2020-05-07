import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from './context/UserContext';


const SignUp = () => {
    const {token, setToken} = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [town, setTown] = useState("");
    const [state, setState] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [noMatch, setNoMatch] = useState(false);
    const history = useHistory();
    const [error, setError] = useState("");
    const [status, setStatus] = useState("students");

    const submitInfo = async(event) =>{
      event.preventDefault();
      if(password !== confirmPassword){
          setConfirmPassword("");
          setNoMatch(true);
          return 
      }else{
        setNoMatch(false);
      }

      try {
        const result = await axios.post('http://localhost:3003/signup',{
          'firstName': firstName,
          'lastName': lastName,
          'status': status,
          'email': email,
          'password': password,
          'town': town,
          'state': state
        });
        history.push('/login');
      }catch(e){
        const jsonResponse = e.response;
        if (jsonResponse.status === 409){
          // console.log('we had a 409')
          // user already exists.
          setError(jsonResponse.data.error);
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
          { error && <div
            className="ui pointing below prompt label"
            id="form-input-control-error-email-error-message"
            role="alert"
            aria-atomic="true"
          >
            {error}
          </div>}
          <input 
          className='form-control is-invalid'
          type='email' 
          name='email' 
          placeholder='triddle@slytherin.edu' 
          value={email} 
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
            }
          }
          required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input 
          type='password' 
          name='password'  
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>

        <div className="field">
          <label>Confirm Password</label>
          { noMatch && <div
            className="ui pointing below prompt label"
            id="form-input-control-error-email-error-message"
            role="alert"
            aria-atomic="true"
          >
            Password didn't match.
          </div>}
          
          <input 
          // className={passwordMatch}
          type='password' 
          name='confirm-password'  
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
        </div>

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

        <div className="field">
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
          </div>
        </div>

        <div className="field">
          <div className='ui checkbox'>
          <input type='checkbox' tabIndex='0' required/>
          <label>I solemnly swear that I am up to no good. </label>
          </div>
        </div>
        <button className='ui button' type='submit'>Sign Up</button>
      </form>
    );
}

export default SignUp;


