import React from 'react';
import '../styles/Navbar.css';
import logo from '../assets/health_assets/logo.png';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        <li>Home</li>
        <li>Programs</li>
        <li>About Us</li>
        <li>Testimonials</li>
        <li>Contact Us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
