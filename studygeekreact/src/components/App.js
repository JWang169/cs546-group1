import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import '../App.css';

import Homepage from './Homepage';
import Navigation from './Navigation';
import SignUp from './SignUp';
import LogIn from './Login';
import SearchStudents from './SearchStudents';
import SearchTutors from './SearchTutors';
import TutorInfo from './TutorInfo';


function App() {
  return (
    <Router>
      <Container>
        <Navigation />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/searchtutors' component={SearchTutors} />
        <Route exact path='/searchstudents' component={SearchStudents} />
      </Container>
    </Router>
  );
}

export default App;