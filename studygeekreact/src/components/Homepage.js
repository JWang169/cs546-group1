import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>This is Homepage.
      <div className="home-link">
        <h1>Welcome to the Study Geek.</h1>
        <Link exact to='/tutors'>I am a student.</Link>
        <Link exact to='/students'>I am a tutor.</Link>
      </div>

    </div>
  );
}

export default Homepage;
