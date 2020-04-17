import React from 'react';
import SearchBar from './SearchBar';
import TutorList from './TutorList';

function Tutors() {
  return (
    <div>
        <h2>This is a list of all the tutors. </h2>
        <SearchBar/>
        <TutorList/>
    </div>
  );
}

export default Tutors;