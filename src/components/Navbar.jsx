import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our Clients', href: '/our-clients' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Join the Force', href: '/join-the-force' },
];

const clientLoginUrl = import.meta.env.VITE_CLIENT_LOGIN_URL || 'http://localhost:5173/login';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="logo-group" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">
            <img src="/favicon.png" alt="Praise Security Logo" className="logo-img" />
          </div>
          <span className="logo-text">
            PRAISE <span className="gold">SECURITY</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {isActive && '● '}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Login */}
        <a className="btn-login" href={clientLoginUrl}>
          LOGIN
        </a>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="btn-login"
            href={clientLoginUrl}
            onClick={() => setMobileOpen(false)}
          >
            LOGIN
          </a>
        </div>
      )}
    </nav>
  );
}
