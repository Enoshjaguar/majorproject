import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="admin-navbar">
      <ul className="admin-nav-links">
       
        <li className="admin-nav-item"><Link to="/">Bookings</Link></li>
        <li className="admin-nav-item"><Link to="/addmech">Add Mech</Link></li>
        <li className="admin-nav-item"><Link to="/allmechs">All Mechs</Link></li>
        <li className="admin-nav-item"><Link to="/addservice">Add Service</Link></li>
        <li className="admin-nav-item"><Link to="/allservices">All Services</Link></li>
        <li className='admin-nav-item'><Link to='/allusers'>All Users</Link></li>
        <li className='admin-nav-item'><Link to='/addspareparts'>Add SpareParts</Link></li>
        <li className='admin-nav-item'><Link to='/allspareparts'>Spare Parts</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
