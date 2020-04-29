import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import '../App.css';

import Homepage from './Homepage';
import Navigation from './Navigation';
import SignUp from './SignUp';
import LogIn from './Login';
import LogOut from './Logout';
import SearchStudents from './SearchStudents';
import SearchTutors from './SearchTutors';
import Demo from './Demo';
import PersonInfo from './PersonInfo';
import MyAccount from './MyAccount';
import UserContext from "./context/UserContext";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    
    <Router>
      <UserContext.Provider value={{ token, setToken }}>
        <Container>
          <Navigation />
          <Route exact path='/' component={Homepage} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={LogIn} />
          <Route exact path='/logout' component={LogOut} token={token} />
          <Route exact path='/demo' component={Demo} />
          <Route exact path='/searchtutors' component={SearchTutors} />
          <Route exact path='/searchstudents' component={SearchStudents} />
          <Route exact path='/students/:id' component={PersonInfo} />
          <Route exact path='/myaccount' component={MyAccount} />
        </Container>
      </UserContext.Provider>
    </Router>
    
  );
}

export default App;
