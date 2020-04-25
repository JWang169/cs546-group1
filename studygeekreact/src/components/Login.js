import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const history = useHistory();

    const submitInfo = async(event) =>{
      event.preventDefault();
      try {
        const token = await axios.post('http://localhost:3003/login',{
          'email': email,
          'password': password
        });
        // login succeed
        // console.log(token);
        localStorage.setItem("token", token.data);
        history.push('/')
      }catch(e){
        const jsonResponse = e.response;
        if(jsonResponse.data.error === 'No such user'){
          setEmailError("User Email doesn't exist.");
        }else{
          setErrorMessage(jsonResponse.data.error);
        }
      }  
    }

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
      <div className="field">
        <div className='ui checkbox'>
        <input type='checkbox' tabIndex='0' required/>
        <label>You're just as sane as I am. </label>
        </div>
      </div>
      <button className='ui button' type='submit'>Log In</button>
    </form>
    );
}

export default LogIn;
