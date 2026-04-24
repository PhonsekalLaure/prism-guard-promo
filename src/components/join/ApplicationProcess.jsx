import React from 'react';
import { Building2, ShieldHalf } from 'lucide-react';

export default function ApplicationProcess({ onBookNow, onApplyNow }) {
  return (
    <section className="portal-section">
      <div className="portal-header">
        <h2>GET STARTED WITH PRAISE SECURITY.</h2>
        <p className="mono">Select your portal below to proceed.</p>
      </div>
      
      <div className="portal-grid">
        {/* Card 1 */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h3>I WANT TO HIRE SECURITY</h3>
            <div className="portal-icon">
              <Building2 size={64} strokeWidth={1} />
            </div>
          </div>
          <ul className="portal-list">
            <li>&gt;&gt; Schedule Site Analysis</li>
            <li>&gt;&gt; Request Quotation</li>
            <li>&gt;&gt; Deploy Units</li>
          </ul>
          <button className="portal-btn" onClick={onBookNow}>BOOK NOW</button>
        </div>

        {/* Card 2 */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h3>JOIN THE FORCE</h3>
            <div className="portal-icon">
              <ShieldHalf size={64} strokeWidth={1} />
            </div>
          </div>
          <ul className="portal-list">
            <li>&gt;&gt; Submit Credentials</li>
            <li>&gt;&gt; Background Check</li>
            <li>&gt;&gt; Begin Deployment</li>
          </ul>
          <button className="portal-btn" onClick={onApplyNow}>APPLY NOW</button>
        </div>
      </div>
    </section>
  );
}
