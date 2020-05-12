import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import StudentList from './StudentList';


function Students() {
  return (
    <Router>
    <div className="container">
      <br/>
        <div className="row justify-content-center">
          <h3>Student List </h3>
        </div>
        <hr/>
        <br/>
        <StudentList/>
        {/* <Route exact path='/students/:id' component={StudentInfo} /> */}
    </div>
    </Router>
  );
}

export default Students;