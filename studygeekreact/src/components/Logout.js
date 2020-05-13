import React, { useContext } from 'react';
import UserContext from './context/UserContext';
import { useHistory } from 'react-router-dom';

const LogOut = () => {
    const {token, setToken} = useContext(UserContext);
    const history = useHistory();
    console.log(token);
    if(token === null){
      history.push('/')
    }
    const submitInfo = async(event) =>{
      event.preventDefault();
      setToken(null)
      
      localStorage.clear("token");
    }

    return (
    <form className="ui form" onSubmit={submitInfo}>
      { token && 
        <button className='ui button' type='submit'>Log Out </button>
      }
      
      { !token && <h2>
          Dobby is free.
          </h2>
      }
    </form>

    );
}

export default LogOut;
