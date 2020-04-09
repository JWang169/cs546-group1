import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./Home";
import Navigation from "./Navigation";
import Landing from "./Landing";
import ChangePassword from "./ChangePassword";
import Account from "./Account";
import SignIn from "./SignIn";


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation/>
        </header>
      </div>
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} /> 
      <Route path='/changepassword' component={ChangePassword} /> 
      <Route path='/account' component={Account} /> 
      <Route path='/signin' component={SignIn} /> 
    </Router>
  );
}

export default App;
