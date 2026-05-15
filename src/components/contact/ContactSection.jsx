import { MapPin, Phone, Mail } from 'lucide-react';
import { createElement, useEffect, useRef, useState } from 'react';

const infoCards = [
  {
    Icon: MapPin,
    label: 'LOCATION',
    text: 'Blk2-Lot6 Marbellas St., El Puentebello Subdivision, Fourth Estate, Brgy. San Antonio, Parañaque City, Metro Manila, 1715',
  },
  {
    Icon: Phone,
    label: 'TELEPHONE / MOBILE',
    text: '(02) 8299-344  ·  0920-710-5076',
  },
  {
    Icon: Mail,
    label: 'EMAIL',
    text: 'praise02771@gmail.com',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section" ref={ref}>
      {/* Ambient orbs */}
      <div className="contact-orb contact-orb--tl" />
      <div className="contact-orb contact-orb--br" />

      <div className="container">
        <div
          className="section-title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>AGENCY CONTACT</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle contact-subtitle">
            Reach out to us for deployments, inquiries, or security consultations.
          </p>
        </div>

        <div className="contact-grid">
          {/* === FORM === */}
          <div
            className="contact-form-card"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-28px)',
              transition: 'all 0.7s ease 0.15s',
            }}
          >
            <div className="form-card-header">
              <span className="form-card-tag">// SEND MESSAGE</span>
              <h3>Get In Touch</h3>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>NAME</label>
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label>EMAIL ADDRESS</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
              </div>
              <div className="form-group">
                <label>SUBJECT</label>
                <input type="text" placeholder="What is this about?" />
              </div>
              <div className="form-group">
                <label>MESSAGE</label>
                <textarea placeholder="Describe your security needs or inquiry…" />
              </div>
              <button type="submit" className="btn-send">
                SEND MESSAGE →
              </button>
            </form>
          </div>

          {/* === INFO COLUMN === */}
          <div
            className="contact-info-col"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(28px)',
              transition: 'all 0.7s ease 0.25s',
            }}
          >
            {/* Info cards */}
            {infoCards.map(({ Icon, label, text }) => (
              <div key={label} className="info-card">
                <div className="info-icon">
                  {createElement(Icon, { size: 22, strokeWidth: 1.5 })}
                </div>
                <div className="info-content">
                  <div className="info-label">{label}</div>
                  <div className="info-text">{text}</div>
                </div>
              </div>
            ))}

            {/* Google Map embed */}
            <div className="map-card">
              <div className="map-header">
                <span className="map-tag">// HEADQUARTERS</span>
              </div>
              <iframe
                title="Praise Security Location"
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7726.637204994879!2d121.02547068789391!3d14.466385782729981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBlk2-Lot6%20Marbellas%20St.%2C%20El%20Puentebello%20Subdivision%2C%20Fourth%20Estate%2C%20Brgy.%20San%20Antonio%2C%20Paranaque%20City%2C%20Metro%20Manila%2C%201715!5e0!3m2!1sen!2sph!4v1778427300040!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
