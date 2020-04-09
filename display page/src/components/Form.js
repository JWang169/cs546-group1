import React, {useState} from 'react';

const Form = () => {

    const [user, setUser] = useState({});
    const [toggle, setToggle] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const formSubmit = (e) =>{
        e.preventDefault();
        let firstName = document.getElementById('firstName').value
        let lastName = document.getElementById('lastName').value
        let userName = document.getElementById('userName').value
        const user={
            firstName, 
            lastName, 
            userName
        };
        setUser(user);
    }

    return (
        <div>
            <form id='sign-up-form' onSubmit={formSubmit}>
                <label>
                    First Name:
                    <input id='firstName' type='text' placeholder='Enter your first name'/>
                </label>
                <label>
                    Last Name:
                    <input id='lastName' type='text' placeholder='Enter your last name'/>
                </label>
                <label>
                    User Name:
                    <input id='userName' type='text' placeholder='Enter your user name'/>
                </label>
                <input type='submit' value='Submit' />
            </form>
            <p>{user.userName}</p>
    <button onClick={()=>setToggle(!toggle)}>{toggle === true ? 'On' : 'Off'}</button>
    <input type='text' onChange={(e) => setInputVal(e.target.value) } />
    <p>The input State is: {inputVal}</p>
        </div>
    )
};

export default Form

