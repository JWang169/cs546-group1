import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from './SearchBar';
import TutorList from './TutorList';

function Tutors() {
  return (
    <Router>
    <div>
        <h2>This is a list of all the students. </h2>
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

