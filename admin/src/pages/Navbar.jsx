import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="nav-links">
        <li className="nav-item">Home</li>
        <li className="nav-item">Bookings</li>
        <Link to={'/addmech'}>
        <li className="nav-item">Mechs</li>
        </Link>
        <li className="nav-item">Services</li>
      </ul>
    </div>
  );
};

export default Navbar;
