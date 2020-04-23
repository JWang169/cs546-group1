import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from './SearchBar';
import TutorList from './TutorList';

function Tutors() {
  return (
    <Router>
    <div className="container">
      <br/>
        <div className="row justify-content-center">
          <h3>A thousand years later the magic remains. </h3>
        </div>
        
        <SearchBar/>
        <hr/>
        <br/>
        <TutorList/>
        {/* <Route exact path='/students/:id' component={StudentInfo} /> */}
    </div>
    </Router>
  );
}

export default Tutors;

