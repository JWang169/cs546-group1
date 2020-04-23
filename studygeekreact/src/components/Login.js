import React, {useState} from 'react';
import axios from 'axios';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitInfo = async(event) =>{
      event.preventDefault();
      try {
        const res = await axios.post('http://localhost:3003/login',{
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
        <div className='ui checkbox'>
        <input type='checkbox' tabIndex='0' />
        <label>You're just as sane as I am. </label>
        </div>
      </div>
      <button className='ui button' type='submit'>Log In</button>
    </form>
    );
}

export default LogIn;
