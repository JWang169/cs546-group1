import React from 'react';
// import logo from '../src/img/header.jpeg';
import '../App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Homepage from './Homepage';
import Navigation from './Navigation';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SearchStudents from './SearchStudents';
import SearchTutors from './SearchTutors';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className='App-logo' alt='logo'/> */}
        <Navigation />
      </header>      
    </div>
    <Redirect strict from='/' to='/home' /> 
    <Route path='/home' component={Homepage} /> 
    <Route path='/signup' component={SignUp} /> 
    <Route path='/signin' component={SignIn} /> 
    <Route path='/students' component={SearchStudents} /> 
    <Route path='/tutors' component={SearchTutors} /> 
    </Router>
  );
}

export default App;
