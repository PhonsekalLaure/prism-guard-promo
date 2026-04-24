import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="section-title">
          <h2>AGENCY CONTACT</h2>
          <div className="section-title-underline" />
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-card">
            <h3>SEND US A MESSAGE!</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>NAME</label>
                <input type="text" placeholder="ENTER NAME" />
              </div>
              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <input type="email" placeholder="ENTER EMAIL" />
              </div>
              <div className="form-group">
                <label>SUBJECT</label>
                <input type="text" placeholder="ENTER SUBJECT" />
              </div>
              <div className="form-group">
                <label>MESSAGE</label>
                <textarea placeholder="ENTER TEXT HERE"></textarea>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="btn-send">SEND</button>
              </div>
            </form>
          </div>

          {/* Info */}
          <div className="contact-info-col">
            <div className="info-card">
              <div className="info-icon">
                <MapPin />
              </div>
              <div className="info-content">
                <div className="info-label">LOCATION</div>
                <div className="info-text">
                  Blk2-Lot6 Marbellas St., El Puentebello Subdivision, Fourth Estate, Barangay San Antonio, Parañaque City, Metro Manila, 1715
                </div>
              </div>
            </div>

            <div className="map-card">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map View" />
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Phone />
              </div>
              <div className="info-content">
                <div className="info-label">TELEPHONE / MOBILE NUMBER</div>
                <div className="info-text">
                  (02) 8299-344 / 0920-710-5076
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Mail />
              </div>
              <div className="info-content">
                <div className="info-label">EMAIL</div>
                <div className="info-text">
                  praise02771@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
