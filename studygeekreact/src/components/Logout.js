import React, { useContext } from 'react';
import UserContext from './context/UserContext';


const LogOut = () => {
    const {token, setToken} = useContext(UserContext);
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
