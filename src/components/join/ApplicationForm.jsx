import React, { useMemo, useState } from 'react';
import { ShieldHalf, Image as ImageIcon, CheckCircle } from 'lucide-react';
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
  citizenship: '',
  educationalLevel: '',
  bloodType: '',
  placeOfBirth: '',
  height: '',
  email: '',
  mobile: '',
  address: '',
  provincialAddress: '',
  city: '',
  province: '',
  zipCode: '',
  emergencyName: '',
  emergencyContact: '',
  emergencyRelationship: '',
  position: 'Security Guard',
  licenseNumber: '',
  badgeNumber: '',
  licenseType: '',
  licenseExpiryDate: '',
  licensePhoto: null,
  yearsExperience: '',
  availability: '',
};

const stepFields = {
  1: [
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
    'civilStatus',
    'citizenship',
    'educationalLevel',
    'height',
  ],
  2: ['email', 'mobile', 'address', 'city', 'province', 'zipCode', 'emergencyName', 'emergencyContact'],
  3: ['position', 'licenseNumber', 'licenseType', 'licenseExpiryDate', 'licensePhoto'],
  4: ['yearsExperience', 'availability'],
};

const labels = {
  firstName: 'First name',
  lastName: 'Last name',
  dateOfBirth: 'Date of birth',
  gender: 'Gender',
  civilStatus: 'Civil status',
  citizenship: 'Citizenship',
  educationalLevel: 'Educational attainment',
  height: 'Height',
  email: 'Email address',
  mobile: 'Mobile number',
  address: 'Complete address',
  city: 'City / municipality',
  province: 'Province',
  zipCode: 'ZIP code',
  emergencyName: 'Emergency contact name',
  emergencyContact: 'Emergency contact number',
  position: 'Position / rank',
  licenseNumber: 'License number',
  licenseType: 'License type',
  licenseExpiryDate: 'License expiry date',
  licensePhoto: 'License photo',
  yearsExperience: 'Years of experience',
  availability: 'Availability',
};

const namePattern = /^[A-Za-zÑñ .'-]+$/;
const licensePattern = /^[A-Za-z0-9 -]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function calculateAge(dateValue) {
  const birthday = new Date(dateValue);
  const now = new Date();
  let age = now.getFullYear() - birthday.getFullYear();
  const monthDiff = now.getMonth() - birthday.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthday.getDate())) age -= 1;
  return age;
}

function formatFileName(file) {
  return file?.name || 'JPG OR PNG\nMAX. 5 MB';
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="field-error">{message}</p>;
}

function ReviewField({ label, value, className = 'col-span-3' }) {
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

  const licensePhotoName = useMemo(() => formatFileName(formData.licensePhoto), [formData.licensePhoto]);

  const setValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleTextChange = (field, value, type = 'text') => {
    let nextValue = value;

    if (type === 'name') nextValue = value.replace(/[^A-Za-zÑñ .'-]/g, '');
    if (type === 'numeric') nextValue = value.replace(/\D/g, '');
    if (type === 'decimal') nextValue = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
    if (type === 'phone') nextValue = value.replace(/\D/g, '').slice(0, 10);
    if (type === 'license') nextValue = value.replace(/[^A-Za-z0-9 -]/g, '').toUpperCase();

    setValue(field, nextValue);
  };

  const validateField = (field, value) => {
    const text = typeof value === 'string' ? value.trim() : value;

    if (stepFields[step]?.includes(field) && (!text || (field === 'licensePhoto' && !value))) {
      return `${labels[field]} is required.`;
    }

    if (['firstName', 'middleName', 'lastName', 'suffix', 'city', 'province', 'emergencyName', 'emergencyRelationship', 'placeOfBirth'].includes(field) && text && !namePattern.test(text)) {
      return `${labels[field] || 'This field'} can only contain letters, spaces, apostrophes, periods, and hyphens.`;
    }

    if (field === 'dateOfBirth' && text) {
      if (text > today) return 'Date of birth cannot be in the future.';
      if (calculateAge(text) < 18) return 'Applicant must be at least 18 years old.';
    }

    if (field === 'email' && text && !emailPattern.test(text)) return 'Enter a valid email address.';
    if (['mobile', 'emergencyContact'].includes(field) && text && !/^9\d{9}$/.test(text)) {
      return 'Enter a valid 10-digit Philippine mobile number starting with 9.';
    }
    if (field === 'zipCode' && text && !/^\d{4}$/.test(text)) return 'ZIP code must be exactly 4 digits.';

    if (field === 'height' && text) {
      const height = Number(text);
      if (height < 120 || height > 230) return 'Height must be between 120 and 230 cm.';
    }

    if (field === 'licenseNumber' && text && !licensePattern.test(text)) {
      return 'License number can only contain letters, numbers, spaces, and hyphens.';
    }

    if (field === 'licenseExpiryDate' && text && text <= today) return 'License expiry date must be in the future.';

    if (field === 'yearsExperience' && text) {
      const years = Number(text);
      if (years < 0 || years > 60) return 'Years of experience must be between 0 and 60.';
    }

    if (field === 'licensePhoto' && value) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(value.type)) return 'Upload a JPG or PNG image.';
      if (value.size > 5 * 1024 * 1024) return 'File size must be 5 MB or less.';
    }

    return '';
  };

  const validateStep = () => {
    const fields = stepFields[step] || [];
    const nextErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) nextErrors[field] = error;
    });

    ['middleName', 'suffix', 'placeOfBirth', 'provincialAddress', 'emergencyRelationship', 'badgeNumber'].forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) nextErrors[field] = error;
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((current) => Math.min(current + 1, 5));
  };

  const handleBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = () => {
    setErrors({});
    setShowSuccess(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setValue('licensePhoto', file);
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
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className={`booking-step-circle ${step >= num ? 'active' : ''}`}>
              {num}
            </div>
          ))}
        </div>

        <form onSubmit={(event) => event.preventDefault()} noValidate>
          {step === 1 && (
            <div className="step-content">
              <h3 className="booking-step-title">PERSONAL DETAILS</h3>
              <span className="required-text">* REQUIRED</span>

              <div className="grid-6">
                <div className="form-group col-span-2">
                  <label>FIRST NAME <span className="req">*</span></label>
                  <input type="text" className="form-control" value={formData.firstName} onChange={(e) => handleTextChange('firstName', e.target.value, 'name')} placeholder="ENTER FIRST NAME" required />
                  <FieldError message={errors.firstName} />
                </div>
                <div className="form-group col-span-2">
                  <label>MIDDLE NAME</label>
                  <input type="text" className="form-control" value={formData.middleName} onChange={(e) => handleTextChange('middleName', e.target.value, 'name')} placeholder="ENTER MIDDLE NAME" />
                  <FieldError message={errors.middleName} />
                </div>
                <div className="form-group col-span-2">
                  <label>LAST NAME <span className="req">*</span></label>
                  <input type="text" className="form-control" value={formData.lastName} onChange={(e) => handleTextChange('lastName', e.target.value, 'name')} placeholder="ENTER LAST NAME" required />
                  <FieldError message={errors.lastName} />
                </div>

                <div className="form-group col-span-2">
                  <label>SUFFIX</label>
                  <input type="text" className="form-control" value={formData.suffix} onChange={(e) => handleTextChange('suffix', e.target.value, 'name')} placeholder="JR, SR, III" />
                  <FieldError message={errors.suffix} />
                </div>
                <div className="form-group col-span-2">
                  <label>DATE OF BIRTH <span className="req">*</span></label>
                  <input type="date" className="form-control date-input" value={formData.dateOfBirth} onChange={(e) => setValue('dateOfBirth', e.target.value)} max={today} required />
                  <FieldError message={errors.dateOfBirth} />
                </div>
                <div className="form-group col-span-2">
                  <label>GENDER <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.gender} onChange={(e) => setValue('gender', e.target.value)} required>
                    <option value="">SELECT GENDER</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <FieldError message={errors.gender} />
                </div>

                <div className="form-group col-span-2">
                  <label>CIVIL STATUS <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.civilStatus} onChange={(e) => setValue('civilStatus', e.target.value)} required>
                    <option value="">SELECT STATUS</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  <FieldError message={errors.civilStatus} />
                </div>
                <div className="form-group col-span-2">
                  <label>CITIZENSHIP <span className="req">*</span></label>
                  <input type="text" className="form-control" value={formData.citizenship} onChange={(e) => handleTextChange('citizenship', e.target.value, 'name')} placeholder="ENTER CITIZENSHIP" required />
                  <FieldError message={errors.citizenship} />
                </div>
                <div className="form-group col-span-2">
                  <label>EDUCATIONAL ATTAINMENT <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.educationalLevel} onChange={(e) => setValue('educationalLevel', e.target.value)} required>
                    <option value="">SELECT LEVEL</option>
                    <option value="Elementary Graduate">Elementary Graduate</option>
                    <option value="High School Graduate">High School Graduate</option>
                    <option value="Vocational / TESDA">Vocational / TESDA</option>
                    <option value="College Level">College Level</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                  </select>
                  <FieldError message={errors.educationalLevel} />
                </div>

                <div className="form-group col-span-3">
                  <label>HEIGHT (CM) <span className="req">*</span></label>
                  <input type="text" inputMode="decimal" className="form-control" value={formData.height} onChange={(e) => handleTextChange('height', e.target.value, 'decimal')} placeholder="170" required />
                  <FieldError message={errors.height} />
                </div>
                <div className="form-group col-span-3">
                  <label>BLOOD TYPE</label>
                  <select className="form-control select-input" value={formData.bloodType} onChange={(e) => setValue('bloodType', e.target.value)}>
                    <option value="">SELECT BLOOD TYPE</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-group col-span-6">
                  <label>PLACE OF BIRTH</label>
                  <input type="text" className="form-control" value={formData.placeOfBirth} onChange={(e) => handleTextChange('placeOfBirth', e.target.value, 'name')} placeholder="ENTER PLACE OF BIRTH" />
                  <FieldError message={errors.placeOfBirth} />
                </div>
              </div>

              <div className="booking-actions center">
                <button className="btn-proceed" type="button" onClick={handleNext}>PROCEED</button>
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
                  <input type="email" className="form-control" value={formData.email} onChange={(e) => setValue('email', e.target.value)} placeholder="ENTER EMAIL" required />
                  <FieldError message={errors.email} />
                </div>
                <div className="form-group col-span-3">
                  <label>MOBILE NUMBER <span className="req">*</span></label>
                  <div className="input-with-prefix">
                    <span>+63</span>
                    <input type="tel" inputMode="numeric" className="form-control" value={formData.mobile} onChange={(e) => handleTextChange('mobile', e.target.value, 'phone')} placeholder="9123456789" required />
                  </div>
                  <FieldError message={errors.mobile} />
                </div>

                <div className="form-group col-span-6">
                  <label>COMPLETE ADDRESS <span className="req">*</span></label>
                  <input type="text" className="form-control" value={formData.address} onChange={(e) => setValue('address', e.target.value)} placeholder="ENTER COMPLETE ADDRESS" required />
                  <FieldError message={errors.address} />
                </div>

                <div className="form-group col-span-2">
                  <label>CITY / MUNICIPALITY <span className="req">*</span></label>
                  <input type="text" className="form-control" value={formData.city} onChange={(e) => handleTextChange('city', e.target.value, 'name')} placeholder="ENTER CITY / MUNICIPALITY" required />
                  <FieldError message={errors.city} />
                </div>
                <div className="form-group col-span-2">
                  <label>PROVINCE <span className="req">*</span></label>
                  <input type="text" className="form-control" value={formData.province} onChange={(e) => handleTextChange('province', e.target.value, 'name')} placeholder="ENTER PROVINCE" required />
                  <FieldError message={errors.province} />
                </div>
                <div className="form-group col-span-2">
                  <label>ZIP CODE <span className="req">*</span></label>
                  <input type="text" inputMode="numeric" className="form-control" value={formData.zipCode} onChange={(e) => handleTextChange('zipCode', e.target.value, 'numeric')} placeholder="1000" maxLength={4} required />
                  <FieldError message={errors.zipCode} />
                </div>

                <div className="form-group col-span-6">
                  <label>PROVINCIAL ADDRESS</label>
                  <input type="text" className="form-control" value={formData.provincialAddress} onChange={(e) => setValue('provincialAddress', e.target.value)} placeholder="ENTER PROVINCIAL ADDRESS" />
                </div>

                <div className="form-group col-span-2">
                  <label>EMERGENCY CONTACT NAME <span className="req">*</span></label>
                  <input type="text" className="form-control" value={formData.emergencyName} onChange={(e) => handleTextChange('emergencyName', e.target.value, 'name')} placeholder="ENTER CONTACT NAME" required />
                  <FieldError message={errors.emergencyName} />
                </div>
                <div className="form-group col-span-2">
                  <label>EMERGENCY CONTACT NUMBER <span className="req">*</span></label>
                  <div className="input-with-prefix">
                    <span>+63</span>
                    <input type="tel" inputMode="numeric" className="form-control" value={formData.emergencyContact} onChange={(e) => handleTextChange('emergencyContact', e.target.value, 'phone')} placeholder="9123456789" required />
                  </div>
                  <FieldError message={errors.emergencyContact} />
                </div>
                <div className="form-group col-span-2">
                  <label>RELATIONSHIP</label>
                  <input type="text" className="form-control" value={formData.emergencyRelationship} onChange={(e) => handleTextChange('emergencyRelationship', e.target.value, 'name')} placeholder="SPOUSE, PARENT, ETC." />
                  <FieldError message={errors.emergencyRelationship} />
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
              <h3 className="booking-step-title">LICENSE AND CREDENTIALS</h3>
              <span className="required-text">* REQUIRED</span>

              <div className="grid-6">
                <div className="form-group col-span-3">
                  <label>POSITION / RANK <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.position} onChange={(e) => setValue('position', e.target.value)} required>
                    <option value="Security Guard">Security Guard</option>
                    <option value="Lady Guard">Lady Guard</option>
                    <option value="Security Officer I">Security Officer I</option>
                    <option value="Security Officer II">Security Officer II</option>
                    <option value="Detachment Commander">Detachment Commander</option>
                  </select>
                  <FieldError message={errors.position} />
                </div>
                <div className="form-group col-span-3">
                  <label>LICENSE TYPE <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.licenseType} onChange={(e) => setValue('licenseType', e.target.value)} required>
                    <option value="">SELECT LICENSE TYPE</option>
                    <option value="Security Guard License">Security Guard License</option>
                    <option value="Security Officer License">Security Officer License</option>
                    <option value="Private Investigator License">Private Investigator License</option>
                  </select>
                  <FieldError message={errors.licenseType} />
                </div>

                <div className="form-group col-span-2">
                  <label>LICENSE NUMBER <span className="req">*</span></label>
                  <input type="text" className="form-control" value={formData.licenseNumber} onChange={(e) => handleTextChange('licenseNumber', e.target.value, 'license')} placeholder="SG-12345678" required />
                  <FieldError message={errors.licenseNumber} />
                </div>
                <div className="form-group col-span-2">
                  <label>BADGE NUMBER</label>
                  <input type="text" className="form-control" value={formData.badgeNumber} onChange={(e) => handleTextChange('badgeNumber', e.target.value, 'license')} placeholder="B-1234" />
                </div>
                <div className="form-group col-span-2">
                  <label>LICENSE EXPIRY DATE <span className="req">*</span></label>
                  <input type="date" className="form-control date-input" value={formData.licenseExpiryDate} onChange={(e) => setValue('licenseExpiryDate', e.target.value)} min={today} required />
                  <FieldError message={errors.licenseExpiryDate} />
                </div>

                <div className="form-group col-span-6">
                  <label>LICENSE PHOTO UPLOAD <span className="req">*</span></label>
                  <label className="upload-box">
                    <ImageIcon size={32} />
                    <span>{licensePhotoName}</span>
                    <input type="file" className="file-input-hidden" accept="image/png,image/jpeg" onChange={handleFileChange} required />
                  </label>
                  <FieldError message={errors.licensePhoto} />
                </div>
              </div>

              <div className="booking-actions">
                <button className="btn-back" type="button" onClick={handleBack}>BACK</button>
                <button className="btn-proceed" type="button" onClick={handleNext}>PROCEED</button>
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
                  <input type="text" inputMode="numeric" className="form-control" value={formData.yearsExperience} onChange={(e) => handleTextChange('yearsExperience', e.target.value, 'numeric')} placeholder="0, 1, 2, ETC." required />
                  <FieldError message={errors.yearsExperience} />
                </div>
                <div className="form-group col-span-3">
                  <label>AVAILABILITY <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.availability} onChange={(e) => setValue('availability', e.target.value)} required>
                    <option value="">SELECT AVAILABILITY</option>
                    <option value="Immediate">Immediate</option>
                    <option value="1 Week Notice">1 Week Notice</option>
                    <option value="2 Weeks Notice">2 Weeks Notice</option>
                    <option value="1 Month Notice">1 Month Notice</option>
                  </select>
                  <FieldError message={errors.availability} />
                </div>

              </div>

              <div className="booking-actions">
                <button className="btn-back" type="button" onClick={handleBack}>BACK</button>
                <button className="btn-proceed" type="button" onClick={handleNext}>PROCEED</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="step-content">
              <h3 className="booking-step-title">SUBMISSION CONFIRMATION</h3>

              <div className="grid-6">
                <ReviewField label="FIRST NAME" value={formData.firstName} className="col-span-2" />
                <ReviewField label="MIDDLE NAME" value={formData.middleName} className="col-span-2" />
                <ReviewField label="LAST NAME" value={formData.lastName} className="col-span-2" />
                <ReviewField label="DATE OF BIRTH" value={formData.dateOfBirth} className="col-span-2" />
                <ReviewField label="GENDER" value={formData.gender} className="col-span-2" />
                <ReviewField label="CIVIL STATUS" value={formData.civilStatus} className="col-span-2" />
                <ReviewField label="CITIZENSHIP" value={formData.citizenship} className="col-span-2" />
                <ReviewField label="EDUCATIONAL ATTAINMENT" value={formData.educationalLevel} className="col-span-2" />
                <ReviewField label="BLOOD TYPE" value={formData.bloodType} className="col-span-2" />
                <ReviewField label="HEIGHT (CM)" value={formData.height} className="col-span-2" />

                <div className="divider-line" />

                <ReviewField label="EMAIL ADDRESS" value={formData.email} className="col-span-3" />
                <ReviewField label="MOBILE NUMBER" value={formData.mobile ? `+63 ${formData.mobile}` : ''} className="col-span-3" />
                <ReviewField label="COMPLETE ADDRESS" value={formData.address} className="col-span-6" />
                <ReviewField label="CITY / MUNICIPALITY" value={formData.city} className="col-span-2" />
                <ReviewField label="PROVINCE" value={formData.province} className="col-span-2" />
                <ReviewField label="ZIP CODE" value={formData.zipCode} className="col-span-2" />
                <ReviewField label="EMERGENCY CONTACT" value={formData.emergencyName} className="col-span-2" />
                <ReviewField label="EMERGENCY NUMBER" value={formData.emergencyContact ? `+63 ${formData.emergencyContact}` : ''} className="col-span-2" />
                <ReviewField label="RELATIONSHIP" value={formData.emergencyRelationship} className="col-span-2" />

                <div className="divider-line" />

                <ReviewField label="POSITION / RANK" value={formData.position} className="col-span-3" />
                <ReviewField label="LICENSE TYPE" value={formData.licenseType} className="col-span-3" />
                <ReviewField label="LICENSE NUMBER" value={formData.licenseNumber} className="col-span-2" />
                <ReviewField label="BADGE NUMBER" value={formData.badgeNumber} className="col-span-2" />
                <ReviewField label="LICENSE EXPIRY DATE" value={formData.licenseExpiryDate} className="col-span-2" />
                <ReviewField label="LICENSE PHOTO" value={formData.licensePhoto?.name} className="col-span-6" />

                <div className="divider-line" />

                <ReviewField label="YEARS OF EXPERIENCE" value={formData.yearsExperience} className="col-span-3" />
                <ReviewField label="AVAILABILITY" value={formData.availability} className="col-span-3" />
              </div>

              <div className="booking-actions">
                <button className="btn-back" type="button" onClick={handleBack}>BACK</button>
                <button className="btn-proceed submit" type="button" onClick={handleSubmit}>PROCEED</button>
              </div>
            </div>
          )}
        </form>

        {showSuccess && (
          <div className="success-modal-overlay" onClick={() => { setShowSuccess(false); onCancel(); }}>
            <div className="success-modal" onClick={(e) => e.stopPropagation()}>
              <div className="success-modal-icon">
                <CheckCircle size={36} />
              </div>
              <h3>SUBMISSION RECEIVED</h3>
              <p>Thank you for submitting your application. Our team will review your details and get back to you shortly.</p>
              <button className="success-modal-btn" onClick={() => { setShowSuccess(false); onCancel(); }}>DONE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
