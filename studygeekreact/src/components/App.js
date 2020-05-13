import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import jwt_decode from "jwt-decode";
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
import EditInfo from './EditInfo';
import EditSub from './EditSub';
import EditAvail from './EditAvail';
import TutorInfo from './TutorInfo';
import TutorAccount from './TutorAccount';
import PrivateRoute from "./PrivateRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if(token){
      const tokenInfo = jwt_decode(token);
      const exp = tokenInfo.exp;
      if (exp < Date.now() / 1000){
        localStorage.clear("token");
        setToken(null);
      }
    }
  })

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
          <Route exact path='/tutors/:id' component={TutorInfo} />
          <Route exact path='/myaccount' component={MyAccount} />
          <Route exact path='/editinfo' component={EditInfo} />
          <Route exact path='/editsub' component={EditSub} />
          <Route exact path='/editavail' component={EditAvail} />
          <Route exact path='/tutoraccount' component={TutorAccount} />
        </Container>
      </UserContext.Provider>
    </Router>
    
  );
}

export default App;
