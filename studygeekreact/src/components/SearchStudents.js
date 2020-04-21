import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import StudentList from './StudentList';
import StudentInfo from './StudentInfo';


function Students() {
  return (
    <Router>
    <div>
        <h2>This is a list of all the students. </h2>
        <SearchBar/>
        <hr/>
        <br/>
        <StudentList/>
        {/* <Route exact path='/students/:id' component={StudentInfo} /> */}
    </div>
    </Router>
  );
}

export default Students;