import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Our Services', href: '/services' },
  { label: 'Our Clients', href: '/our-clients' },
  { label: 'Company Profile', href: '/about' },
  { label: 'Join the Force', href: '/join-the-force' },
];

const contactInfo = [
  { label: '(02) 8123-4567', href: 'tel:0281234567' },
  { label: 'inquiry@psiai.ph', href: 'mailto:inquiry@psiai.ph' },
  { label: 'Paranaque, Philippines', href: '#' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="logo-group" style={{ textDecoration: 'none' }}>
            <div className="logo-icon">
              <img src="/favicon.png" alt="Praise Security Logo" className="logo-img" />
            </div>
            <span className="logo-text">
              PRAISE <span className="gold">SECURITY</span>
            </span>
          </Link>
          <p className="company-name">Praise Security & Investigation Agency Inc.</p>
          <p className="license-info">
            License to Operate: PSA-2025-68123<br />
            Regulated by PNP-SOSIA
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="footer-heading">QUICK LINKS</div>
          {quickLinks.map((link) => (
            <Link key={link.label} to={link.href} className="footer-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div className="footer-heading">CONTACT</div>
          {contactInfo.map((item) => (
            <a key={item.label} href={item.href} className="footer-link">
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Praise Security & Investigation Agency Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
