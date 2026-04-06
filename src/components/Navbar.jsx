import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our Clients', href: '/clients' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Join the Force', href: '/join' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="logo-group" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.83-3.13 9.37-7 10.5-3.87-1.13-7-5.67-7-10.5V6.3l7-3.12z" />
              <path d="M12 7l-4 2v3c0 2.5 1.7 4.8 4 5.5 2.3-.7 4-3 4-5.5V9l-4-2z" />
            </svg>
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

        {/* Client Login */}
        <button className="btn-login">CLIENT LOGIN</button>

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
          <button className="btn-login">CLIENT LOGIN</button>
        </div>
      )}
    </nav>
  );
}
