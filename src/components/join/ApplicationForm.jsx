import React, { useState } from 'react';
import { ShieldHalf, Image as ImageIcon } from 'lucide-react';
import '@/styles/booking.css';

export default function ApplicationForm({ onCancel }) {
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
            <ShieldHalf size={48} className="portal-icon" strokeWidth={1.5} color="#e6b215" />
            <h2>APPLICATION FORM</h2>
          </div>
          <button className="booking-cancel-btn" onClick={onCancel}>CANCEL</button>
        </div>

        {/* Progress Bar */}
        <div className="booking-progress">
          <div className="booking-progress-line"></div>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className={`booking-step-circle ${step >= num ? 'active' : ''}`}>
              {num}
            </div>
          ))}
        </div>

        {/* Form Content */}
        {step === 1 && (
          <div className="step-content">
            <h3 className="booking-step-title">PERSONAL DETAILS</h3>
            <span className="required-text">* REQUIRED</span>
            
            <div className="grid-6">
              <div className="form-group col-span-2">
                <label>FIRST NAME <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER FIRST NAME" />
              </div>
              <div className="form-group col-span-2">
                <label>MIDDLE NAME <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER MIDDLE NAME" />
              </div>
              <div className="form-group col-span-2">
                <label>LAST NAME <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER LAST NAME" />
              </div>

              <div className="form-group col-span-2">
                <label>DATE OF BIRTH <span className="req">*</span></label>
                <input type="date" className="form-control date-input" />
              </div>
              <div className="form-group col-span-2">
                <label>GENDER <span className="req">*</span></label>
                <select className="form-control select-input">
                  <option value="" disabled selected></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group col-span-2">
                <label>CIVIL STATUS <span className="req">*</span></label>
                <select className="form-control select-input">
                  <option value="" disabled selected></option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div className="form-group col-span-3">
                <label>WEIGHT (KG) <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER WEIGHT" />
              </div>
              <div className="form-group col-span-3">
                <label>HEIGHT (CM) <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER HEIGHT" />
              </div>
            </div>

            <div className="booking-actions center">
              <button className="btn-proceed" onClick={handleNext}>PROCEED</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h3 className="booking-step-title">CONTACT INFORMATION</h3>
            <span className="required-text">* REQUIRED</span>
            
            <div className="grid-6">
              <div className="form-group col-span-3">
                <label>EMAIL ADDRESS <span className="req">*</span></label>
                <input type="email" className="form-control" placeholder="ENTER EMAIL" />
              </div>
              <div className="form-group col-span-3">
                <label>MOBILE NUMBER <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="+63 XXX XXX XXXX" />
              </div>

              <div className="form-group col-span-6">
                <label>COMPLETE ADDRESS <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER COMPLETE ADDRESS" />
              </div>

              <div className="form-group col-span-2">
                <label>CITY / MUNICIPALITY <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER CITY / MUNICIPALITY" />
              </div>
              <div className="form-group col-span-2">
                <label>PROVINCE <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER PROVINCE" />
              </div>
              <div className="form-group col-span-2">
                <label>ZIP CODE <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER ZIP CODE" />
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
            <h3 className="booking-step-title">SECURITY LICENSE DETAILS</h3>
            <span className="required-text">* REQUIRED</span>
            
            <div className="grid-6">
              <div className="form-group col-span-3">
                <label>LICENSE NUMBER <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER LICENSE NUMBER" />
              </div>
              <div className="form-group col-span-3">
                <label>LICENSE TYPE <span className="req">*</span></label>
                <select className="form-control select-input">
                  <option value="" disabled selected></option>
                  <option value="security">Security Guard</option>
                  <option value="officer">Security Officer</option>
                  <option value="investigator">Private Investigator</option>
                </select>
              </div>

              <div className="form-group col-span-2">
                <label>ISSUING AUTHORITY <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="ENTER ISSUING AUTHORITY" />
              </div>
              <div className="form-group col-span-2">
                <label>ISSUE DATE <span className="req">*</span></label>
                <input type="date" className="form-control date-input" />
              </div>
              <div className="form-group col-span-2">
                <label>EXPIRY DATE <span className="req">*</span></label>
                <input type="date" className="form-control date-input" />
              </div>

              <div className="form-group col-span-6">
                <label>LICENSE PHOTO UPLOAD <span className="req">*</span></label>
                <div className="upload-box">
                  <ImageIcon size={32} />
                  <span>JPG OR PNG<br/>MAX. 5 MB</span>
                </div>
              </div>
            </div>

            <div className="booking-actions">
              <button className="btn-back" onClick={handleBack}>BACK</button>
              <button className="btn-proceed" onClick={handleNext}>PROCEED</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h3 className="booking-step-title">ADDITIONAL INFORMATION</h3>
            <span className="required-text">* REQUIRED</span>
            
            <div className="grid-6">
              <div className="form-group col-span-3">
                <label>YEARS OF EXPERIENCE <span className="req">*</span></label>
                <input type="text" className="form-control" placeholder="0, 1, 2, ETC." />
              </div>
              <div className="form-group col-span-3">
                <label>AVAILABILITY <span className="req">*</span></label>
                <select className="form-control select-input">
                  <option value="" disabled selected></option>
                  <option value="immediate">Immediate</option>
                  <option value="one_week">1 Week Notice</option>
                  <option value="two_weeks">2 Weeks Notice</option>
                </select>
              </div>

              <div className="form-group col-span-6">
                <label>PREVIOUS EMPLOYERS</label>
                <textarea className="form-control" placeholder="ENTER TEXT HERE"></textarea>
              </div>

              <div className="form-group col-span-6">
                <label>SPECIAL SKILLS / CERTIFICATIONS</label>
                <textarea className="form-control" placeholder="ENTER TEXT HERE"></textarea>
              </div>
            </div>

            <div className="booking-actions">
              <button className="btn-back" onClick={handleBack}>BACK</button>
              <button className="btn-proceed" onClick={handleNext}>PROCEED</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step-content">
            <h3 className="booking-step-title">SUBMISSION CONFIRMATION</h3>
            
            <div className="grid-6">
              {/* Row 1 */}
              <div className="form-group col-span-2">
                <label>FIRST NAME</label>
                <div className="form-control read-only">FIRST NAME</div>
              </div>
              <div className="form-group col-span-2">
                <label>MIDDLE NAME</label>
                <div className="form-control read-only">MIDDLE NAME</div>
              </div>
              <div className="form-group col-span-2">
                <label>LAST NAME</label>
                <div className="form-control read-only">LAST NAME</div>
              </div>

              {/* Row 2 */}
              <div className="form-group col-span-2">
                <label>DATE OF BIRTH</label>
                <div className="form-control read-only">DATE OF BIRTH</div>
              </div>
              <div className="form-group col-span-2">
                <label>GENDER</label>
                <div className="form-control read-only">GENDER</div>
              </div>
              <div className="form-group col-span-2">
                <label>CIVIL STATUS</label>
                <div className="form-control read-only">CIVIL STATUS</div>
              </div>

              {/* Row 3 */}
              <div className="form-group col-span-3">
                <label>WEIGHT (KG)</label>
                <div className="form-control read-only">WEIGHT</div>
              </div>
              <div className="form-group col-span-3">
                <label>HEIGHT (CM)</label>
                <div className="form-control read-only">HEIGHT</div>
              </div>

              <div className="divider-line" />

              {/* Row 4 */}
              <div className="form-group col-span-3">
                <label>EMAIL ADDRESS</label>
                <div className="form-control read-only">EMAIL</div>
              </div>
              <div className="form-group col-span-3">
                <label>MOBILE NUMBER</label>
                <div className="form-control read-only">+63 XXX XXX XXXX</div>
              </div>

              <div className="form-group col-span-6">
                <label>COMPLETE ADDRESS</label>
                <div className="form-control read-only">ENTER COMPLETE ADDRESS</div>
              </div>

              <div className="form-group col-span-2">
                <label>CITY / MUNICIPALITY</label>
                <div className="form-control read-only">CITY / MUNICIPALITY</div>
              </div>
              <div className="form-group col-span-2">
                <label>PROVINCE</label>
                <div className="form-control read-only">PROVINCE</div>
              </div>
              <div className="form-group col-span-2">
                <label>ZIP CODE</label>
                <div className="form-control read-only">ZIP CODE</div>
              </div>

              <div className="divider-line" />

              {/* Row 5 */}
              <div className="form-group col-span-3">
                <label>LICENSE NUMBER</label>
                <div className="form-control read-only">ENTER LICENSE NUMBER</div>
              </div>
              <div className="form-group col-span-3">
                <label>LICENSE TYPE</label>
                <div className="form-control read-only">LICENSE TYPE</div>
              </div>

              <div className="form-group col-span-2">
                <label>ISSUING AUTHORITY</label>
                <div className="form-control read-only">ENTER ISSUING AUTHORITY</div>
              </div>
              <div className="form-group col-span-2">
                <label>ISSUE DATE</label>
                <div className="form-control read-only">ISSUE DATE</div>
              </div>
              <div className="form-group col-span-2">
                <label>EXPIRY DATE</label>
                <div className="form-control read-only">EXPIRY DATE</div>
              </div>

              <div className="form-group col-span-6">
                <label>LICENSE PHOTO UPLOAD</label>
                <div className="upload-box" style={{pointerEvents: 'none'}}>
                  <ImageIcon size={32} />
                  <span>JPG OR PNG<br/>MAX. 5 MB</span>
                </div>
              </div>

              <div className="divider-line" />

              <div className="form-group col-span-3">
                <label>YEARS OF EXPERIENCE</label>
                <div className="form-control read-only">0, 1, 2, ETC.</div>
              </div>
              <div className="form-group col-span-3">
                <label>AVAILABILITY</label>
                <div className="form-control read-only">AVAILABILITY</div>
              </div>

              <div className="form-group col-span-6">
                <label>PREVIOUS EMPLOYERS</label>
                <div className="form-control read-only textarea-readonly">ENTER TEXT HERE</div>
              </div>

              <div className="form-group col-span-6">
                <label>SPECIAL SKILLS / CERTIFICATIONS</label>
                <div className="form-control read-only textarea-readonly">ENTER TEXT HERE</div>
              </div>
            </div>

            <div className="booking-actions">
              <button className="btn-back" onClick={handleBack}>BACK</button>
              <button className="btn-proceed submit" onClick={handleSubmit}>PROCEED</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
