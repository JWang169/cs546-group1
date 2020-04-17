import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Homepage from './Homepage';
import Navigation from './Navigation';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Students from './Students';
import Tutors from './Tutors';


function App() {
  return (
    <Router>

    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>      
    </div>
    <Redirect strict from='/' to='/home' /> 
    <Route path='/home' component={Homepage} /> 
    <Route path='/signup' component={SignUp} /> 
    <Route path='/signin' component={SignIn} /> 
    <Route path='/students' component={Students} /> 
    <Route path='/tutors' component={Tutors} /> 
    </Router>
  );
}

export default App;
