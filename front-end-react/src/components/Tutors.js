import React from 'react';
import NewTutorForm from './NewTutorForm';

function Tutors() {
  return (
    <div>
        <h2>This is a list of all the tutors. </h2>
        <ul className="tutor-list">


        </ul>
        <NewTutorForm/>
    </div>
  );
}

export default Tutors;  