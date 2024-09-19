import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Link to the CSS file

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div id="logo">
        <img src="/path_to_your_logo_image" alt="Logo" />
      </div>
      <div className="navbarUl">
        <ul className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
          <li className="items"><Link to="/">Home</Link></li>
          <li className="items"><Link to="/Diseases">Diseases</Link></li>
          <li className="items"><Link to="/Login">Login</Link></li>
          <li className="items"><Link to="/Signup">Signup</Link></li>
          <li className="items"><Link to="/Settings">Settings</Link></li>
        </ul>
        <li className="barsNavLi" onClick={toggleMenu}>
          <div className="barsNav"></div>
          <div className="barsNav"></div>
          <div className="barsNav"></div>
        </li>
      </div>
      <div className={`navbarHamDiv ${isMenuOpen ? 'active' : ''}`}>
        <ul className="navHomeList">
          <li className="home-nav-items"><Link to="/">Home</Link></li>
          <li className="home-nav-items"><Link to="/Diseases">Diseases</Link></li>
          <li className="home-nav-items"><Link to="/Login">Login</Link></li>
          <li className="home-nav-items"><Link to="/Signup">Signup</Link></li>
          <li className="home-nav-items"><Link to="/settings">Settings</Link></li>
        </ul>
        <div className="nav-cross" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
