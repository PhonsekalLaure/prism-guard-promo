import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import '../../styles/booking.css';

export default function BookingForm({ onCancel }) {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = () => {
    // Submit logic here
    onCancel();
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        {/* Header */}
        <div className="booking-header">
          <div className="booking-header-left">
            <Building2 size={48} className="portal-icon" strokeWidth={1.5} color="#e6b215" />
            <h2>BOOK AN APPOINTMENT</h2>
          </div>
          <button className="booking-cancel-btn" onClick={onCancel}>CANCEL</button>
        </div>

        {/* Progress Bar */}
        <div className="booking-progress">
          <div className="booking-progress-line"></div>
          <div className={`booking-step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`booking-step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`booking-step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {/* Form Content */}
        {step === 1 && (
          <div className="step-content">
            <h3 className="booking-step-title">CLIENT DETAILS</h3>
            <span className="required-text">* REQUIRED</span>
            
            <div className="booking-form-grid">
              <div className="form-group">
                <label>COMPANY NAME <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER COMPANY NAME" />
              </div>
              <div className="form-group hidden-desktop"></div>

              <div className="form-group">
                <label>REPRESENTATIVE FIRST NAME <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER FIRST NAME" />
              </div>
              <div className="form-group">
                <label>REPRESENTATIVE LAST NAME <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER LAST NAME" />
              </div>

              <div className="form-group">
                <label>POSITION/TITLE <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER POSITION/TITLE" />
              </div>
              <div className="form-group">
                <label>EMAIL ADDRESS <span className="req">*</span></label>
                <input type="email" className="form-control" placeholder="ENTER EMAIL ADDRESS" />
              </div>

              <div className="form-group">
                <label>MOBILE NUMBER <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="+63 XXX XXX XXXX" />
              </div>
              <div className="form-group">
                <label>LANDLINE NUMBER (OPTIONAL)</label>
                <input type="text" className="form-control" placeholder="(0XX) XXX-XXXX" />
              </div>
            </div>

            <div className="booking-actions center">
              <button className="btn-proceed" onClick={handleNext}>PROCEED</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h3 className="booking-step-title">APPOINTMENT DETAILS</h3>
            
            <div className="booking-form-grid">
              <div className="form-group">
                <label>PURPOSE OF APPOINTMENT (CHECK ALL THAT APPLY)</label>
                <div className="checkbox-group-container">
                  <label className="checkbox-item">
                    <input type="checkbox" defaultChecked /> SITE INSPECTION AND SERVICE CONSULTATION
                  </label>
                  <div className="checkbox-addon-title">ADDITIONAL OPTIONS:</div>
                  <label className="checkbox-item checkbox-indent">
                    <input type="checkbox" /> QUOTATION DISCUSSION
                  </label>
                  <label className="checkbox-item checkbox-indent">
                    <input type="checkbox" /> CONTRACT NEGOTIATION
                  </label>
                  <label className="checkbox-item checkbox-indent">
                    <input type="checkbox" /> SECURITY ASSESSMENT
                  </label>
                </div>
              </div>
              
              <div className="form-col-right">
                <div className="form-group mb-24">
                  <label>PREFERRED APPOINTMENT DATE</label>
                  <input type="date" className="form-control date-input" />
                </div>
                <div className="form-group">
                  <label>PREFERRED TIME SLOT</label>
                  <select className="form-control select-input">
                    <option value="" disabled selected></option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (1PM - 5PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{gridColumn: "1 / 2"}}>
                <label>ADDITIONAL NOTES FOR APPOINTMENT</label>
                <textarea className="form-control" placeholder="ENTER TEXT HERE"></textarea>
              </div>
            </div>

            <div className="booking-actions">
              <button className="btn-back" onClick={handleBack}>BACK</button>
              <button className="btn-proceed" onClick={handleNext}>PROCEED</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h3 className="booking-step-title">SUBMISSION CONFIRMATION</h3>
            
            <div className="booking-form-grid confirmation-grid">
              <div className="form-group">
                <label>COMPANY NAME</label>
                <div className="form-control read-only">COMPANY NAME</div>
              </div>
              <div className="form-group">
                <label>REPRESENTATIVE FIRST NAME</label>
                <div className="form-control read-only">FIRST NAME</div>
              </div>

              <div className="form-group">
                <label>PURPOSE OF APPOINTMENT (CHECK ALL THAT APPLY)</label>
                <div className="form-control read-only">PURPOSE</div>
              </div>
              <div className="form-group">
                <label>REPRESENTATIVE LAST NAME</label>
                <div className="form-control read-only">LAST NAME</div>
              </div>

              <div className="form-group">
                <label>PREFERRED APPOINTMENT DATE</label>
                <div className="form-control read-only">DATE</div>
              </div>
              <div className="form-group">
                <label>POSITION/TITLE</label>
                <div className="form-control read-only">POSITION/TITLE</div>
              </div>

              <div className="form-group">
                <label>PREFERRED TIME SLOT</label>
                <div className="form-control read-only">TIME SLOT</div>
              </div>
              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <div className="form-control read-only">EMAIL</div>
              </div>

              <div className="form-group">
                <label>ADDITIONAL NOTES FOR APPOINTMENT</label>
                <div className="form-control read-only textarea-readonly">NOTES</div>
              </div>
              <div className="form-col-right-spanned">
                <div className="form-group mb-24">
                  <label>MOBILE NUMBER</label>
                  <div className="form-control read-only">+63 XXX XXX XXXX</div>
                </div>
                <div className="form-group">
                  <label>LANDLINE NUMBER (OPTIONAL)</label>
                  <div className="form-control read-only">(0XX) XXX-XXXX</div>
                </div>
              </div>
            </div>

            <div className="booking-actions">
              <button className="btn-back" onClick={handleBack}>BACK</button>
              <button className="btn-proceed submit" onClick={handleSubmit}>SUBMIT</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
