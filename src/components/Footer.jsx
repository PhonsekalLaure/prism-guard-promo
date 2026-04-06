const quickLinks = [
  { label: 'Our Services', href: '/services' },
  { label: 'Our Clients', href: '/clients' },
  { label: 'Company Profile', href: '/about' },
  { label: 'Join Us', href: '/join' },
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
          <div className="logo-group">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.83-3.13 9.37-7 10.5-3.87-1.13-7-5.67-7-10.5V6.3l7-3.12z" />
                <path d="M12 7l-4 2v3c0 2.5 1.7 4.8 4 5.5 2.3-.7 4-3 4-5.5V9l-4-2z" />
              </svg>
            </div>
            <span className="logo-text">
              PRAISE <span className="gold">SECURITY</span>
            </span>
          </div>
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
            <a key={link.label} href={link.href} className="footer-link">
              {link.label}
            </a>
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
