import { useMemo, useState } from 'react';
import { Building2, CheckCircle } from 'lucide-react';
import { submitAppointmentRequest } from '../../services/promoClients';

const PURPOSE_OPTIONS = [
  {
    value: 'site_inspection_and_service_consultation',
    label: 'SITE INSPECTION AND SERVICE CONSULTATION',
  },
  {
    value: 'quotation_discussion',
    label: 'QUOTATION DISCUSSION',
  },
  {
    value: 'contract_negotiation',
    label: 'CONTRACT NEGOTIATION',
  },
  {
    value: 'security_assessment',
    label: 'SECURITY ASSESSMENT',
  },
];

const INITIAL_FORM = {
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  landline: '',
  purposes: ['site_inspection_and_service_consultation'],
  preferredDate: '',
  preferredTimeSlot: '',
  notes: '',
};

const TIME_SLOT_GROUPS = [
  {
    label: 'Morning',
    options: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    label: 'Afternoon',
    options: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
  },
];

function getPurposeLabel(value) {
  return PURPOSE_OPTIONS.find((option) => option.value === value)?.label || value;
}

function getErrorMessage(error) {
  const response = error?.response;

  if (response?.status === 429) {
    const retryAfter = response.data?.retryAfterSeconds;
    return retryAfter
      ? `Too many appointment requests. Please try again in ${retryAfter} seconds.`
      : 'Too many appointment requests. Please try again later.';
  }

  return response?.data?.error || 'Unable to submit the appointment request. Please try again.';
}

function getTodayIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function BookingForm({ onCancel }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const minAppointmentDate = useMemo(getTodayIsoDate, []);

  const selectedPurposes = formData.purposes.map(getPurposeLabel).join(', ');

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setSubmitError('');
  };

  const updatePhoneField = (field, value) => {
    updateField(field, value.replace(/\D/g, '').slice(0, 10));
  };

  const togglePurpose = (value) => {
    setFormData((current) => {
      const isSelected = current.purposes.includes(value);
      const purposes = isSelected
        ? current.purposes.filter((purpose) => purpose !== value)
        : [...current.purposes, value];

      return { ...current, purposes };
    });
    setErrors((current) => ({ ...current, purposes: '' }));
    setSubmitError('');
  };

  const validateStep = (targetStep) => {
    const nextErrors = {};

    if (targetStep === 1) {
      if (!formData.companyName.trim()) nextErrors.companyName = 'Company name is required.';
      if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required.';
      if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required.';
      if (!formData.email.trim()) {
        nextErrors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        nextErrors.email = 'Enter a valid email address.';
      }
      if (!formData.mobile.trim()) {
        nextErrors.mobile = 'Mobile number is required.';
      } else if (!/^9\d{9}$/.test(formData.mobile.trim())) {
        nextErrors.mobile = 'Enter a valid 10-digit Philippine mobile number starting with 9.';
      }
    }

    if (targetStep === 2) {
      if (formData.purposes.length === 0) nextErrors.purposes = 'Select at least one purpose.';
      if (!formData.preferredDate) {
        nextErrors.preferredDate = 'Preferred date is required.';
      } else if (formData.preferredDate < minAppointmentDate) {
        nextErrors.preferredDate = 'Preferred date cannot be in the past.';
      }
      if (!formData.preferredTimeSlot) nextErrors.preferredTimeSlot = 'Preferred time slot is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    setSubmitError('');
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2)) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitAppointmentRequest({
        ...formData,
        email: formData.email.trim(),
        mobile: `+63${formData.mobile}`,
      });
      setShowSuccess(true);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    onCancel();
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        <div className="booking-header">
          <div className="booking-header-left">
            <Building2 size={48} className="portal-icon" strokeWidth={1.5} color="#e6b215" />
            <h2>BOOK AN APPOINTMENT</h2>
          </div>
          <button className="booking-cancel-btn" onClick={onCancel}>CANCEL</button>
        </div>

        <div className="booking-progress">
          <div className="booking-progress-line"></div>
          <div className={`booking-step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`booking-step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`booking-step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {step === 1 && (
          <div className="step-content">
            <h3 className="booking-step-title">CLIENT DETAILS</h3>
            <span className="required-text">* REQUIRED</span>

            <div className="booking-form-grid">
              <div className="form-group">
                <label>COMPANY NAME <span className="req">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ENTER COMPANY NAME"
                  value={formData.companyName}
                  onChange={(event) => updateField('companyName', event.target.value)}
                />
                {errors.companyName && <span className="field-error">{errors.companyName}</span>}
              </div>
              <div className="form-group">
                <label>REPRESENTATIVE FIRST NAME <span className="req">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ENTER FIRST NAME"
                  value={formData.firstName}
                  onChange={(event) => updateField('firstName', event.target.value)}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>REPRESENTATIVE LAST NAME <span className="req">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ENTER LAST NAME"
                  value={formData.lastName}
                  onChange={(event) => updateField('lastName', event.target.value)}
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label>EMAIL ADDRESS <span className="req">*</span></label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="ENTER EMAIL ADDRESS"
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>MOBILE NUMBER <span className="req">*</span></label>
                <div className="input-with-prefix">
                  <span>+63</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    className="form-control"
                    placeholder="9123456789"
                    value={formData.mobile}
                    onChange={(event) => updatePhoneField('mobile', event.target.value)}
                  />
                </div>
                {errors.mobile && <span className="field-error">{errors.mobile}</span>}
              </div>
              <div className="form-group">
                <label>LANDLINE NUMBER (OPTIONAL)</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="(0XX) XXX-XXXX"
                  value={formData.landline}
                  onChange={(event) => updateField('landline', event.target.value)}
                />
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
                    <input
                      type="checkbox"
                      checked={formData.purposes.includes(PURPOSE_OPTIONS[0].value)}
                      onChange={() => togglePurpose(PURPOSE_OPTIONS[0].value)}
                    />
                    {PURPOSE_OPTIONS[0].label}
                  </label>
                  <div className="checkbox-addon-title">ADDITIONAL OPTIONS:</div>
                  {PURPOSE_OPTIONS.slice(1).map((purpose) => (
                    <label className="checkbox-item checkbox-indent" key={purpose.value}>
                      <input
                        type="checkbox"
                        checked={formData.purposes.includes(purpose.value)}
                        onChange={() => togglePurpose(purpose.value)}
                      />
                      {purpose.label}
                    </label>
                  ))}
                </div>
                {errors.purposes && <span className="field-error">{errors.purposes}</span>}
              </div>

              <div className="form-col-right">
                <div className="form-group mb-24">
                  <label>PREFERRED APPOINTMENT DATE</label>
                  <input
                    type="date"
                    className="form-control date-input"
                    min={minAppointmentDate}
                    value={formData.preferredDate}
                    onChange={(event) => updateField('preferredDate', event.target.value)}
                  />
                  {errors.preferredDate && <span className="field-error">{errors.preferredDate}</span>}
                </div>
                <div className="form-group">
                  <label>PREFERRED TIME SLOT</label>
                  <select
                    className="form-control select-input"
                    value={formData.preferredTimeSlot}
                    onChange={(event) => updateField('preferredTimeSlot', event.target.value)}
                  >
                    <option value="" disabled>SELECT TIME</option>
                    {TIME_SLOT_GROUPS.map((group) => (
                      <optgroup label={group.label} key={group.label}>
                        {group.options.map((time) => (
                          <option value={time} key={time}>{time}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.preferredTimeSlot && <span className="field-error">{errors.preferredTimeSlot}</span>}
                </div>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / 2' }}>
                <label>ADDITIONAL NOTES FOR APPOINTMENT</label>
                <textarea
                  className="form-control"
                  placeholder="ENTER TEXT HERE"
                  value={formData.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                ></textarea>
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
              {/* Company — full width */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>COMPANY NAME</label>
                <div className="form-control read-only">{formData.companyName}</div>
              </div>

              {/* Representative names */}
              <div className="form-group">
                <label>REPRESENTATIVE FIRST NAME</label>
                <div className="form-control read-only">{formData.firstName}</div>
              </div>
              <div className="form-group">
                <label>REPRESENTATIVE LAST NAME</label>
                <div className="form-control read-only">{formData.lastName}</div>
              </div>

              {/* Contact info */}
              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <div className="form-control read-only">{formData.email}</div>
              </div>
              <div className="form-group">
                <label>MOBILE NUMBER</label>
                <div className="form-control read-only">{formData.mobile ? `+63 ${formData.mobile}` : ''}</div>
              </div>
              <div className="form-group">
                <label>LANDLINE NUMBER (OPTIONAL)</label>
                <div className="form-control read-only">{formData.landline || 'NONE'}</div>
              </div>

              {/* Purpose — full width */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>PURPOSE OF APPOINTMENT</label>
                <div className="form-control read-only">{selectedPurposes}</div>
              </div>

              {/* Schedule */}
              <div className="form-group">
                <label>PREFERRED APPOINTMENT DATE</label>
                <div className="form-control read-only">{formData.preferredDate}</div>
              </div>
              <div className="form-group">
                <label>PREFERRED TIME SLOT</label>
                <div className="form-control read-only">{formData.preferredTimeSlot}</div>
              </div>

              {/* Notes — full width */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>ADDITIONAL NOTES FOR APPOINTMENT</label>
                <div className="form-control read-only textarea-readonly">{formData.notes || 'NONE'}</div>
              </div>
            </div>

            {submitError && <div className="booking-submit-error">{submitError}</div>}

            <div className="booking-actions">
              <button className="btn-back" onClick={handleBack} disabled={isSubmitting}>BACK</button>
              <button
                className="btn-proceed submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="success-modal-overlay" onClick={closeSuccess}>
            <div className="success-modal" onClick={(event) => event.stopPropagation()}>
              <div className="success-modal-icon">
                <CheckCircle size={36} />
              </div>
              <h3>SUBMISSION RECEIVED</h3>
              <p>Thank you for submitting your appointment request. Our team will review the details and contact you to confirm your schedule.</p>
              <button className="success-modal-btn" onClick={closeSuccess}>DONE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
