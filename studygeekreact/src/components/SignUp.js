import React, {useState} from 'react';
import axios from 'axios';

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitInfo = async(event) =>{
      event.preventDefault();
      if(password !== confirmPassword){
        // password doesn't match
      }
      try {
        const res = await axios.post('http://localhost:3003/signup',{
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'password': password
        });
      }catch(e){
        console.log(e);
      }
    }

    return (
    <form className="ui form" onSubmit={submitInfo}>
      <div className="field">
        <label>Email</label>
        <input 
        type='email' 
        name='email' 
        placeholder='triddle@slytherin.edu' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input 
        type='password' 
        name='password'  
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Confirm Password</label>
        <input 
        type='password' 
        name='confirm-password'  
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        />
      </div>
      <div className="field">
        <label>Last Name</label>
        <input 
        type='text' 
        name='last-name' 
        placeholder='First Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="field">
        <div className='ui checkbox'>
        <input type='checkbox' tabIndex='0' />
        <label>I solemnly swear that I am up to no good. </label>
        </div>
      </div>
      <button className='ui button' type='submit'>Sign Up</button>
    </form>
    );
}

export default SignUp;
