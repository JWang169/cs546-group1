import React, {useState} from 'react';

const LogOut = () => {
    const [loggedout, setLoggedout] = useState(false);

    const submitInfo = async(event) =>{
      event.preventDefault();
      setLoggedout(true)
      localStorage.clear("token");

    }

    return (
    <form className="ui form" onSubmit={submitInfo}>
      <button className='ui button' type='submit'>Log Out </button>
      
      { loggedout && <p>
          Dobby is free.
          </p>}
    </form>

    );
}

export default LogOut;
