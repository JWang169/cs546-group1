import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Navigation() {
  return (
    <nav className="navigation">
        <NavLink className="link" exact to='/home' activeClassName='active'>Home</NavLink>
        <NavLink className="link" exact to='/signup' activeClassName='active'>Sign Up</NavLink>
        <NavLink className="link" exact to='/signin' activeClassName='active'>Sign In</NavLink>
    </nav>
  );
}

export default Navigation;
