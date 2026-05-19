import { useState } from 'react';
import { ShieldHalf, CheckCircle } from 'lucide-react';
import GoogleAddressAutofill from '@components/join/GoogleAddressAutofill';
import { submitApplicationRequest } from '@/services/promoClients';
import '@/styles/booking.css';

const today = new Date().toISOString().split('T')[0];

const initialForm = {
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  dateOfBirth: '',
  gender: '',
  civilStatus: '',
  educationalLevel: '',
  heightCm: '',
  phoneNumber: '',
  email: '',
  residentialAddress: '',
  latitude: null,
  longitude: null,
  emergencyContactName: '',
  emergencyContactNumber: '',
  emergencyContactRelationship: '',
  positionApplied: 'Security Guard',
  yearsExperience: '',
  availabilityDate: '',
  preferredShift: '',
  licenseNumber: '',
  badgeNumber: '',
  licenseExpiryDate: '',
};

const stepFields = {
  1: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'heightCm', 'phoneNumber', 'email', 'residentialAddress'],
  2: ['positionApplied', 'yearsExperience', 'availabilityDate', 'preferredShift', 'emergencyContactName', 'emergencyContactNumber'],
};

const labels = {
  firstName: 'First name',
  middleName: 'Middle name',
  lastName: 'Last name',
  dateOfBirth: 'Date of birth',
  gender: 'Gender',
  heightCm: 'Height',
  phoneNumber: 'Mobile number',
  email: 'Email address',
  residentialAddress: 'Residential address',
  positionApplied: 'Position applied',
  yearsExperience: 'Years of security experience',
  availabilityDate: 'Availability date',
  preferredShift: 'Preferred shift',
  emergencyContactName: 'Emergency contact name',
  emergencyContactNumber: 'Emergency contact number',
  emergencyContactRelationship: 'Emergency contact relationship',
};

const namePattern = /^[A-Za-zÑñ .'-]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const licensePattern = /^[A-Za-z0-9 -]+$/;

function calculateAge(dateValue) {
  const birthday = new Date(dateValue);
  const now = new Date();
  let age = now.getFullYear() - birthday.getFullYear();
  const monthDiff = now.getMonth() - birthday.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthday.getDate())) age -= 1;
  return age;
}

function FieldError({ message }) {
  return message ? <p className="field-error">{message}</p> : null;
}

function ReviewField({ label, value, className = '' }) {
  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <div className="form-control read-only">{value || 'N/A'}</div>
    </div>
  );
}

export default function ApplicationForm({ onCancel }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const setValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSubmitError('');
  };

  const handleTextChange = (field, value, type = 'text') => {
    let nextValue = value;
    if (type === 'name') nextValue = value.replace(/[^A-Za-zÑñ .'-]/g, '');
    if (type === 'decimal' || type === 'number') nextValue = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
    if (type === 'phone') nextValue = value.replace(/\D/g, '').slice(0, 10);
    if (type === 'license') nextValue = value.replace(/[^A-Za-z0-9 -]/g, '').toUpperCase();
    setValue(field, nextValue);
  };

  const handleAddressChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      residentialAddress: value,
      latitude: null,
      longitude: null,
    }));
    setErrors((prev) => {
      if (!prev.residentialAddress) return prev;
      const next = { ...prev };
      delete next.residentialAddress;
      return next;
    });
  };

  const validateField = (field, value, targetStep = step) => {
    const text = typeof value === 'string' ? value.trim() : value;
    if (stepFields[targetStep]?.includes(field) && !text) return `${labels[field]} is required.`;

    if (['firstName', 'middleName', 'lastName', 'emergencyContactName', 'emergencyContactRelationship'].includes(field) && text && !namePattern.test(text)) {
      return `${labels[field]} can only contain letters, spaces, apostrophes, periods, and hyphens.`;
    }

    if (field === 'dateOfBirth' && text) {
      if (text > today) return 'Date of birth cannot be in the future.';
      if (calculateAge(text) < 18) return 'Applicant must be at least 18 years old.';
    }

    if (field === 'email' && text && !emailPattern.test(text)) return 'Enter a valid email address.';
    if (['phoneNumber', 'emergencyContactNumber'].includes(field) && text && !/^9\d{9}$/.test(text)) {
      return 'Enter a valid 10-digit Philippine mobile number starting with 9.';
    }
    if (field === 'residentialAddress' && text && (formData.latitude == null || formData.longitude == null)) {
      return 'Select a validated address from the suggestions.';
    }
    if (field === 'heightCm' && text && (Number(text) < 120 || Number(text) > 230)) {
      return 'Height must be between 120 and 230 cm.';
    }
    if (field === 'yearsExperience' && text && (Number(text) < 0 || Number(text) > 60)) {
      return 'Years of experience must be between 0 and 60.';
    }
    if (['licenseNumber', 'badgeNumber'].includes(field) && text && !licensePattern.test(text)) {
      return 'Use letters, numbers, spaces, and hyphens only.';
    }
    if (field === 'licenseExpiryDate' && text && text < today) return 'License expiry date cannot be earlier than today.';

    return '';
  };

  const validateStep = (targetStep = step) => {
    const fields = [...(stepFields[targetStep] || [])];
    if (targetStep === 1) fields.push('middleName');
    if (targetStep === 2) fields.push('emergencyContactRelationship', 'licenseNumber', 'badgeNumber', 'licenseExpiryDate');

    const nextErrors = {};
    fields.forEach((field) => {
      const error = validateField(field, formData[field], targetStep);
      if (error) nextErrors[field] = error;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((current) => Math.min(current + 1, 3));
  };

  const handleBack = () => {
    setErrors({});
    setSubmitError('');
    setStep((current) => Math.max(current - 1, 1));
  };

  const buildPayload = () => ({
    ...formData,
    citizenship: 'Filipino',
    phoneNumber: formData.phoneNumber ? `+63${formData.phoneNumber}` : '',
    emergencyContactNumber: formData.emergencyContactNumber ? `+63${formData.emergencyContactNumber}` : '',
  });

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2)) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitApplicationRequest(buildPayload());
      setShowSuccess(true);
    } catch (error) {
      setSubmitError(error.response?.data?.error || 'Failed to submit application. Please try again.');
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
            <ShieldHalf size={48} className="portal-icon" strokeWidth={1.5} color="#e6b215" />
            <h2>APPLICATION FORM</h2>
          </div>
          <button className="booking-cancel-btn" type="button" onClick={onCancel}>CANCEL</button>
        </div>

        <div className="booking-progress">
          <div className="booking-progress-line" />
          {[1, 2, 3].map((num) => (
            <div key={num} className={`booking-step-circle ${step >= num ? 'active' : ''}`}>{num}</div>
          ))}
        </div>

        <form onSubmit={(event) => event.preventDefault()} noValidate>
          {step === 1 && (
            <div className="step-content">
              <h3 className="booking-step-title">PERSONAL AND CONTACT DETAILS</h3>
              <span className="required-text">* REQUIRED</span>

              <div className="grid-6">
                <div className="form-group col-span-2">
                  <label>FIRST NAME <span className="req">*</span></label>
                  <input className="form-control" value={formData.firstName} onChange={(e) => handleTextChange('firstName', e.target.value, 'name')} placeholder="ENTER FIRST NAME" />
                  <FieldError message={errors.firstName} />
                </div>
                <div className="form-group col-span-2">
                  <label>LAST NAME <span className="req">*</span></label>
                  <input className="form-control" value={formData.lastName} onChange={(e) => handleTextChange('lastName', e.target.value, 'name')} placeholder="ENTER LAST NAME" />
                  <FieldError message={errors.lastName} />
                </div>
                <div className="form-group col-span-2">
                  <label>MIDDLE NAME</label>
                  <input className="form-control" value={formData.middleName} onChange={(e) => handleTextChange('middleName', e.target.value, 'name')} placeholder="ENTER MIDDLE NAME" />
                  <FieldError message={errors.middleName} />
                </div>
                <div className="form-group col-span-2">
                  <label>DATE OF BIRTH <span className="req">*</span></label>
                  <input type="date" className="form-control date-input" value={formData.dateOfBirth} max={today} onChange={(e) => setValue('dateOfBirth', e.target.value)} />
                  <FieldError message={errors.dateOfBirth} />
                </div>
                <div className="form-group col-span-2">
                  <label>GENDER <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.gender} onChange={(e) => setValue('gender', e.target.value)}>
                    <option value="">SELECT GENDER</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <FieldError message={errors.gender} />
                </div>
                <div className="form-group col-span-2">
                  <label>HEIGHT (CM) <span className="req">*</span></label>
                  <input className="form-control" inputMode="decimal" value={formData.heightCm} onChange={(e) => handleTextChange('heightCm', e.target.value, 'decimal')} placeholder="170" />
                  <FieldError message={errors.heightCm} />
                </div>
                <div className="form-group col-span-3">
                  <label>MOBILE NUMBER <span className="req">*</span></label>
                  <div className="input-with-prefix">
                    <span>+63</span>
                    <input className="form-control" inputMode="numeric" value={formData.phoneNumber} onChange={(e) => handleTextChange('phoneNumber', e.target.value, 'phone')} placeholder="9123456789" />
                  </div>
                  <FieldError message={errors.phoneNumber} />
                </div>
                <div className="form-group col-span-3">
                  <label>EMAIL ADDRESS <span className="req">*</span></label>
                  <input type="email" className="form-control" value={formData.email} onChange={(e) => setValue('email', e.target.value)} placeholder="ENTER EMAIL" />
                  <FieldError message={errors.email} />
                </div>
                <div className="form-group col-span-6">
                  <label>RESIDENTIAL ADDRESS <span className="req">*</span></label>
                  <GoogleAddressAutofill
                    value={formData.residentialAddress}
                    className="form-control"
                    placeholder="SEARCH AND SELECT RESIDENTIAL ADDRESS"
                    onChange={(e) => handleAddressChange(e.target.value)}
                    onPlaceSelected={({ formattedAddress, lat, lng }) => {
                      setFormData((prev) => ({ ...prev, residentialAddress: formattedAddress, latitude: lat, longitude: lng }));
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.residentialAddress;
                        return next;
                      });
                    }}
                  />
                  <FieldError message={errors.residentialAddress} />
                </div>
              </div>

              <div className="booking-actions center">
                <button className="btn-proceed" type="button" onClick={handleNext}>PROCEED</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3 className="booking-step-title">APPLICATION SCREENING</h3>
              <span className="required-text">* REQUIRED</span>

              <div className="grid-6">
                <div className="form-group col-span-2">
                  <label>POSITION APPLIED <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.positionApplied} onChange={(e) => setValue('positionApplied', e.target.value)}>
                    <option value="Security Guard">Security Guard</option>
                    <option value="Lady Guard">Lady Guard</option>
                    <option value="Security Officer">Security Officer</option>
                    <option value="Detachment Commander">Detachment Commander</option>
                  </select>
                </div>
                <div className="form-group col-span-2">
                  <label>YEARS OF EXPERIENCE <span className="req">*</span></label>
                  <input className="form-control" inputMode="decimal" value={formData.yearsExperience} onChange={(e) => handleTextChange('yearsExperience', e.target.value, 'number')} placeholder="0" />
                  <FieldError message={errors.yearsExperience} />
                </div>
                <div className="form-group col-span-2">
                  <label>AVAILABLE FROM <span className="req">*</span></label>
                  <input type="date" className="form-control date-input" value={formData.availabilityDate} min={today} onChange={(e) => setValue('availabilityDate', e.target.value)} />
                  <FieldError message={errors.availabilityDate} />
                </div>
                <div className="form-group col-span-2">
                  <label>PREFERRED SHIFT <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.preferredShift} onChange={(e) => setValue('preferredShift', e.target.value)}>
                    <option value="">SELECT SHIFT</option>
                    <option value="Day shift">Day shift</option>
                    <option value="Night shift">Night shift</option>
                    <option value="Any shift">Any shift</option>
                  </select>
                  <FieldError message={errors.preferredShift} />
                </div>
                <div className="form-group col-span-2">
                  <label>CIVIL STATUS</label>
                  <select className="form-control select-input" value={formData.civilStatus} onChange={(e) => setValue('civilStatus', e.target.value)}>
                    <option value="">SELECT STATUS</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div className="form-group col-span-2">
                  <label>EDUCATIONAL ATTAINMENT</label>
                  <select className="form-control select-input" value={formData.educationalLevel} onChange={(e) => setValue('educationalLevel', e.target.value)}>
                    <option value="">SELECT LEVEL</option>
                    <option value="High School Graduate">High School Graduate</option>
                    <option value="Vocational / TESDA">Vocational / TESDA</option>
                    <option value="College Level">College Level</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                  </select>
                </div>
                <div className="form-group col-span-2">
                  <label>LICENSE NUMBER</label>
                  <input className="form-control" value={formData.licenseNumber} onChange={(e) => handleTextChange('licenseNumber', e.target.value, 'license')} placeholder="OPTIONAL" />
                  <FieldError message={errors.licenseNumber} />
                </div>
                <div className="form-group col-span-2">
                  <label>BADGE NUMBER</label>
                  <input className="form-control" value={formData.badgeNumber} onChange={(e) => handleTextChange('badgeNumber', e.target.value, 'license')} placeholder="OPTIONAL" />
                  <FieldError message={errors.badgeNumber} />
                </div>
                <div className="form-group col-span-2">
                  <label>LICENSE EXPIRY DATE</label>
                  <input type="date" className="form-control date-input" value={formData.licenseExpiryDate} min={today} onChange={(e) => setValue('licenseExpiryDate', e.target.value)} />
                  <FieldError message={errors.licenseExpiryDate} />
                </div>
                <div className="form-group col-span-2">
                  <label>EMERGENCY CONTACT <span className="req">*</span></label>
                  <input className="form-control" value={formData.emergencyContactName} onChange={(e) => handleTextChange('emergencyContactName', e.target.value, 'name')} placeholder="ENTER CONTACT NAME" />
                  <FieldError message={errors.emergencyContactName} />
                </div>
                <div className="form-group col-span-2">
                  <label>EMERGENCY NUMBER <span className="req">*</span></label>
                  <div className="input-with-prefix">
                    <span>+63</span>
                    <input className="form-control" inputMode="numeric" value={formData.emergencyContactNumber} onChange={(e) => handleTextChange('emergencyContactNumber', e.target.value, 'phone')} placeholder="9123456789" />
                  </div>
                  <FieldError message={errors.emergencyContactNumber} />
                </div>
                <div className="form-group col-span-2">
                  <label>RELATIONSHIP</label>
                  <input className="form-control" value={formData.emergencyContactRelationship} onChange={(e) => handleTextChange('emergencyContactRelationship', e.target.value, 'name')} placeholder="PARENT, SPOUSE, ETC." />
                  <FieldError message={errors.emergencyContactRelationship} />
                </div>
              </div>

              <div className="booking-actions">
                <button className="btn-back" type="button" onClick={handleBack}>BACK</button>
                <button className="btn-proceed" type="button" onClick={handleNext}>PROCEED</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h3 className="booking-step-title">SUBMISSION CONFIRMATION</h3>
              {submitError && <div className="booking-submit-error">{submitError}</div>}

              <div className="grid-6">
                <ReviewField label="FIRST NAME" value={formData.firstName} className="col-span-2" />
                <ReviewField label="LAST NAME" value={formData.lastName} className="col-span-2" />
                <ReviewField label="MIDDLE NAME" value={formData.middleName} className="col-span-2" />
                <ReviewField label="DATE OF BIRTH" value={formData.dateOfBirth} className="col-span-2" />
                <ReviewField label="GENDER" value={formData.gender} className="col-span-2" />
                <ReviewField label="HEIGHT" value={formData.heightCm ? `${formData.heightCm} cm` : ''} className="col-span-2" />
                <ReviewField label="MOBILE NUMBER" value={formData.phoneNumber ? `+63 ${formData.phoneNumber}` : ''} className="col-span-3" />
                <ReviewField label="EMAIL ADDRESS" value={formData.email} className="col-span-3" />
                <ReviewField label="RESIDENTIAL ADDRESS" value={formData.residentialAddress} className="col-span-6" />
                <div className="divider-line" />
                <ReviewField label="POSITION APPLIED" value={formData.positionApplied} className="col-span-2" />
                <ReviewField label="EXPERIENCE" value={`${formData.yearsExperience || 0} year(s)`} className="col-span-2" />
                <ReviewField label="AVAILABLE FROM" value={formData.availabilityDate} className="col-span-2" />
                <ReviewField label="PREFERRED SHIFT" value={formData.preferredShift} className="col-span-2" />
                <ReviewField label="LICENSE NUMBER" value={formData.licenseNumber} className="col-span-2" />
                <ReviewField label="LICENSE EXPIRY" value={formData.licenseExpiryDate} className="col-span-2" />
                <ReviewField label="EMERGENCY CONTACT" value={formData.emergencyContactName} className="col-span-2" />
                <ReviewField label="EMERGENCY NUMBER" value={formData.emergencyContactNumber ? `+63 ${formData.emergencyContactNumber}` : ''} className="col-span-2" />
                <ReviewField label="RELATIONSHIP" value={formData.emergencyContactRelationship} className="col-span-2" />
              </div>

              <div className="booking-actions">
                <button className="btn-back" type="button" disabled={isSubmitting} onClick={handleBack}>BACK</button>
                <button className="btn-proceed submit" type="button" disabled={isSubmitting} onClick={handleSubmit}>
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                </button>
              </div>
            </div>
          )}
        </form>

        {showSuccess && (
          <div className="success-modal-overlay" onClick={closeSuccess}>
            <div className="success-modal" onClick={(e) => e.stopPropagation()}>
              <div className="success-modal-icon">
                <CheckCircle size={36} />
              </div>
              <h3>SUBMISSION RECEIVED</h3>
              <p>Thank you for submitting your application. Our HR team will review your details and schedule an interview if you qualify.</p>
              <button className="success-modal-btn" onClick={closeSuccess}>DONE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
