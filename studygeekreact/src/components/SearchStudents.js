import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import SearchBar from './SearchBar';
import StudentList from './StudentList';


function Students() {
  return (
    <Router>
    <div class="container">
      <br/>
        <div class="row justify-content-center">
          <h3>Student List </h3>
        </div>
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