import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Our Services', href: '/services' },
  { label: 'Our Clients', href: '/our-clients' },
  { label: 'Company Profile', href: '/about' },
  { label: 'Join the Force', href: '/join-the-force' },
];

const contactInfo = [
  { label: '(02) 8299-344 / 0920-710-5076', href: '/contact' },
  { label: 'praisesecurity@gmail.com', href: '/contact' },
  { label: 'Parañaque, Philippines', href: '/contact' },
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
            License to Operate: PSA-WGS-000033-2024<br />
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
            <Link key={item.label} to={item.href} className="footer-link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Praise Security & Investigation Agency Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
