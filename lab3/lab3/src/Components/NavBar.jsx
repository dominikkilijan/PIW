import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="fixed-navigation">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <ul className="nav-links">
        <li> <Link to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/browse" style={{ textDecoration: 'none' }}>Browse</Link></li>
        <li><Link to="/rent-with-us" style={{ textDecoration: 'none' }}>Rent with us</Link></li>
        <li><Link to="/sign-up" style={{ textDecoration: 'none' }}>Sign up</Link></li>
        {/* Jeśli masz formularz logowania, możesz również użyć Link do nawigacji */}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button className="button primary">Log in</button>
        </Link>
      </ul>
      <button className="button primary hidden">Menu</button>
    </nav>
  );
}

export default Navbar;
