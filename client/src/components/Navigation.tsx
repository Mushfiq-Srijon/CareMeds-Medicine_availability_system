import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Navigation.css';

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide navbar on landing page
  if (location.pathname === '/') {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/cart', label: 'Cart' },
    { path: '/profile', label: 'User Profile' },
    { path: '/about', label: 'About' },
    { path: '/help', label: 'Help' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Website Name */}
        <Link to="/home" className="navbar-brand">
          CareMeds
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="navbar-toggler"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
