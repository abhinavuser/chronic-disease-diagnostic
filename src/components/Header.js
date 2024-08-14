import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png'; // Ensure this is the correct path to your logo

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <Link to="/dashboard">Dashboard</Link>
            <ul className="dropdown-content">
              <li><Link to="/upload-report">Upload Report</Link></li>
              <li><Link to="/results">Results</Link></li>
            </ul>
          </li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
