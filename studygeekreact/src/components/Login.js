import React, {useState} from 'react';
import axios from 'axios';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitInfo = async(event) =>{
      event.preventDefault();
      try {
        const result = await axios.post('http://localhost:3003/login',{
          'email': email,
          'password': password
        });
        // login succeed
        console.dir(result)
        const obj = JSON.stringify(result)
        console.log(obj)
         // login fail 
        if(result.data.error === "Password didn't match"){
          // console.dir(result.data.error);
          console.log("tell user to enter the password again")
        }else{
          console.dir(result.email)
        }

      }catch(e){
        console.log(e)
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
