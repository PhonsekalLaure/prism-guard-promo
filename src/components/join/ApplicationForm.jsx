import { useEffect, useRef, useState } from 'react';
import { ShieldHalf, CheckCircle, UploadCloud } from 'lucide-react';
import GoogleAddressAutofill from '@components/join/GoogleAddressAutofill';
import { submitApplicationRequest } from '@/services/promoClients';
import {
  getApplicantAgeError,
  getApplicantHeightError,
} from '../../utils/guardEligibility';

function getTodayIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const today = getTodayIsoDate();

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
  avatarFile: null,
  avatarPreview: '',
  licensePhotoFile: null,
  licensePhotoPreview: '',
  positionApplied: 'Security Guard',
  employmentType: 'Regular',
  yearsExperience: '',
  licenseNumber: '',
  licenseExpiryDate: '',
};

const stepFields = {
  1: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'heightCm', 'phoneNumber', 'email', 'residentialAddress', 'avatarFile'],
  2: ['positionApplied', 'employmentType', 'yearsExperience', 'licenseNumber', 'licenseExpiryDate', 'licensePhotoFile'],
};

const labels = {
  firstName: 'First name',
  middleName: 'Middle name',
  lastName: 'Last name',
  suffix: 'Suffix',
  dateOfBirth: 'Date of birth',
  gender: 'Gender',
  heightCm: 'Height',
  phoneNumber: 'Mobile number',
  email: 'Email address',
  residentialAddress: 'Residential address',
  avatarFile: 'Avatar/profile picture',
  licensePhotoFile: 'Security license photo',
  positionApplied: 'Position applied',
  employmentType: 'Employment type',
  yearsExperience: 'Years of security experience',
  licenseNumber: 'License number',
  licenseExpiryDate: 'License expiry date',
};

const namePattern = /^[A-Za-z\u00d1\u00f1 .'-]+$/;
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const licensePattern = /^[A-Za-z0-9 -]+$/;
const maxImageUploadSizeBytes = 5 * 1024 * 1024;
const suffixOptions = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

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

function ReviewImageField({ label, src, fileName, className = '' }) {
  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <div className="review-image-field">
        <span className="review-avatar-preview">
          {src ? <img src={src} alt={`${label} preview`} /> : <UploadCloud size={24} />}
        </span>
        <span className="review-image-copy">
          <strong>{fileName || 'N/A'}</strong>
          <small>Profile picture preview</small>
        </span>
      </div>
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
  const previewUrlsRef = useRef({ avatarPreview: '', licensePhotoPreview: '' });

  useEffect(() => () => {
    Object.values(previewUrlsRef.current).forEach((previewUrl) => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    });
  }, []);

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
    if (type === 'name') nextValue = value.replace(/[^A-Za-z\u00d1\u00f1 .'-]/g, '');
    if (type === 'height') nextValue = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1').slice(0, 6);
    if (type === 'years') nextValue = value.replace(/\D/g, '').slice(0, 2);
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

  const handleImageUploadChange = ({ fileField, previewField, errorField, label }, file) => {
    if (previewUrlsRef.current[previewField]) {
      URL.revokeObjectURL(previewUrlsRef.current[previewField]);
      previewUrlsRef.current[previewField] = '';
    }

    if (!file) {
      setFormData((prev) => ({ ...prev, [fileField]: null, [previewField]: '' }));
      return;
    }

    const nextErrors = {};
    if (!file.type.startsWith('image/')) {
      nextErrors[errorField] = `${label} must be an image file.`;
    } else if (file.size > maxImageUploadSizeBytes) {
      nextErrors[errorField] = `${label} must be 5 MB or smaller.`;
    }

    if (nextErrors[errorField]) {
      setErrors((prev) => ({ ...prev, ...nextErrors }));
      setFormData((prev) => ({ ...prev, [fileField]: null, [previewField]: '' }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    previewUrlsRef.current[previewField] = previewUrl;

    setFormData((prev) => ({
      ...prev,
      [fileField]: file,
      [previewField]: previewUrl,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[errorField];
      return next;
    });
    setSubmitError('');
  };

  const handleAvatarChange = (file) => handleImageUploadChange({
    fileField: 'avatarFile',
    previewField: 'avatarPreview',
    errorField: 'avatarFile',
    label: 'Avatar/profile picture',
  }, file);

  const handleLicensePhotoChange = (file) => handleImageUploadChange({
    fileField: 'licensePhotoFile',
    previewField: 'licensePhotoPreview',
    errorField: 'licensePhotoFile',
    label: 'Security license photo',
  }, file);

  const validateField = (field, value, targetStep = step) => {
    const text = typeof value === 'string' ? value.trim() : value;
    if (stepFields[targetStep]?.includes(field) && !text) return `${labels[field]} is required.`;

    if (['firstName', 'middleName', 'lastName'].includes(field) && text && !namePattern.test(text)) {
      return `${labels[field]} can only contain letters, spaces, apostrophes, periods, and hyphens.`;
    }

    if (field === 'dateOfBirth' && text) {
      if (text > today) return 'Date of birth cannot be in the future.';
      return getApplicantAgeError(text);
    }

    if (field === 'email' && text && !emailPattern.test(text)) return 'Enter a valid email address.';
    if (field === 'phoneNumber' && text && !/^9\d{9}$/.test(text)) {
      return 'Enter a valid 10-digit Philippine mobile number starting with 9.';
    }
    if (field === 'residentialAddress' && text && (formData.latitude == null || formData.longitude == null)) {
      return 'Select a validated address from the suggestions.';
    }
    if (field === 'heightCm' && text) {
      return getApplicantHeightError(formData.gender, text);
    }
    if (field === 'yearsExperience' && text && (Number(text) < 0 || Number(text) > 60)) {
      return 'Years of experience must be between 0 and 60.';
    }
    if (field === 'suffix' && text && !suffixOptions.includes(text)) {
      return 'Select a valid suffix.';
    }
    if (field === 'licenseNumber' && text) {
      if (!licensePattern.test(text)) return 'Use letters, numbers, spaces, and hyphens only.';
      if (text.length < 6 || text.length > 24 || !/\d/.test(text)) return 'Enter a valid Philippine security license number. Example: LSG-2026-000123.';
    }
    if (field === 'licenseExpiryDate' && text && text < today) return 'License expiry date cannot be earlier than today.';
    if (['avatarFile', 'licensePhotoFile'].includes(field)) {
      const label = labels[field];
      if (!value) return `${label} is required.`;
      if (!value.type?.startsWith('image/')) return `${label} must be an image file.`;
      if (value.size > maxImageUploadSizeBytes) return `${label} must be 5 MB or smaller.`;
    }

    return '';
  };

  const validateStep = (targetStep = step) => {
    const fields = [...(stepFields[targetStep] || [])];
    if (targetStep === 1) fields.push('middleName');

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

  const buildPayload = () => {
    const payload = new FormData();
    Object.entries({
      ...formData,
      citizenship: 'Filipino',
      phoneNumber: formData.phoneNumber ? `+63${formData.phoneNumber}` : '',
    }).forEach(([key, value]) => {
      if (['avatarPreview', 'licensePhotoPreview'].includes(key)) return;
      if (key === 'avatarFile') {
        payload.append('avatar', value);
        return;
      }
      if (key === 'licensePhotoFile') {
        payload.append('licensePhoto', value);
        return;
      }
      payload.append(key, value ?? '');
    });
    return payload;
  };

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
                <div className="form-group">
                  <label>MIDDLE NAME</label>
                  <input className="form-control" value={formData.middleName} onChange={(e) => handleTextChange('middleName', e.target.value, 'name')} placeholder="ENTER MIDDLE NAME" />
                  <FieldError message={errors.middleName} />
                </div>
                <div className="form-group">
                  <label>SUFFIX</label>
                  <select className="form-control select-input" value={formData.suffix} onChange={(e) => setValue('suffix', e.target.value)}>
                    <option value="">NONE</option>
                    {suffixOptions.map((suffix) => (
                      <option key={suffix} value={suffix}>{suffix}</option>
                    ))}
                  </select>
                  <FieldError message={errors.suffix} />
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
                  <input className="form-control" inputMode="decimal" maxLength={6} value={formData.heightCm} onChange={(e) => handleTextChange('heightCm', e.target.value, 'height')} placeholder="170" />
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
                <div className="form-group col-span-6">
                  <label>AVATAR / PROFILE PICTURE <span className="req">*</span></label>
                  <label className={`avatar-upload ${formData.avatarPreview ? 'has-preview' : ''}`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleAvatarChange(event.target.files?.[0])}
                    />
                    <span className="avatar-upload-preview">
                      {formData.avatarPreview ? (
                        <img src={formData.avatarPreview} alt="Avatar preview" />
                      ) : (
                        <UploadCloud size={28} />
                      )}
                    </span>
                    <span className="avatar-upload-copy">
                      <strong>{formData.avatarFile?.name || 'Upload applicant profile picture'}</strong>
                      <small>JPG, PNG, or WebP up to 5 MB</small>
                    </span>
                  </label>
                  <FieldError message={errors.avatarFile} />
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

              <div className="grid-6 screening-grid">
                <div className="form-group col-span-2">
                  <label>POSITION APPLIED <span className="req">*</span></label>
                  <div className="form-control read-only">{formData.positionApplied}</div>
                </div>
                <div className="form-group col-span-2">
                  <label>EMPLOYMENT TYPE <span className="req">*</span></label>
                  <select className="form-control select-input" value={formData.employmentType} onChange={(e) => setValue('employmentType', e.target.value)}>
                    <option value="">SELECT TYPE</option>
                    <option value="Regular">Regular</option>
                    <option value="Reliever">Reliever</option>
                  </select>
                  <FieldError message={errors.employmentType} />
                </div>
                <div className="form-group col-span-2">
                  <label>YEARS OF EXPERIENCE <span className="req">*</span></label>
                  <input className="form-control" inputMode="numeric" maxLength={2} value={formData.yearsExperience} onChange={(e) => handleTextChange('yearsExperience', e.target.value, 'years')} placeholder="0" />
                  <FieldError message={errors.yearsExperience} />
                </div>
                <div className="form-group col-span-3">
                  <label>CIVIL STATUS</label>
                  <select className="form-control select-input" value={formData.civilStatus} onChange={(e) => setValue('civilStatus', e.target.value)}>
                    <option value="">SELECT STATUS</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated"> Separated</option>
                  </select>
                </div>
                <div className="form-group col-span-3">
                  <label>EDUCATIONAL ATTAINMENT</label>
                  <select className="form-control select-input" value={formData.educationalLevel} onChange={(e) => setValue('educationalLevel', e.target.value)}>
                    <option value="">SELECT LEVEL</option>
                    <option value="High School Graduate">High School Graduate</option>
                    <option value="Senior High School Graduate">Senior High School Graduate</option>
                    <option value="Vocational / TESDA">Vocational / TESDA</option>
                    <option value="College Level">College Level</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                  </select>
                </div>
                <div className="divider-line" />
                <div className="form-group col-span-3">
                  <label>LICENSE NUMBER <span className="req">*</span></label>
                  <input className="form-control" value={formData.licenseNumber} onChange={(e) => handleTextChange('licenseNumber', e.target.value, 'license')} placeholder="LSG-2026-000123" />
                  <p className="field-hint">Example: LSG-2026-000123</p>
                  <FieldError message={errors.licenseNumber} />
                </div>
                <div className="form-group col-span-3">
                  <label>LICENSE EXPIRY DATE <span className="req">*</span></label>
                  <input type="date" className="form-control date-input" value={formData.licenseExpiryDate} min={today} onChange={(e) => setValue('licenseExpiryDate', e.target.value)} />
                  <FieldError message={errors.licenseExpiryDate} />
                </div>
                <div className="form-group col-span-6">
                  <label>SECURITY LICENSE PHOTO <span className="req">*</span></label>
                  <label className={`avatar-upload ${formData.licensePhotoPreview ? 'has-preview' : ''}`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleLicensePhotoChange(event.target.files?.[0])}
                    />
                    <span className="avatar-upload-preview document-preview">
                      {formData.licensePhotoPreview ? (
                        <img src={formData.licensePhotoPreview} alt="Security license preview" />
                      ) : (
                        <UploadCloud size={28} />
                      )}
                    </span>
                    <span className="avatar-upload-copy">
                      <strong>{formData.licensePhotoFile?.name || 'Upload a clear photo of the security license'}</strong>
                      <small>JPG, PNG, or WebP up to 5 MB. Use a readable front-facing license photo.</small>
                    </span>
                  </label>
                  <FieldError message={errors.licensePhotoFile} />
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

              <div className="review-confirmation">
                <ReviewImageField
                  label="AVATAR / PROFILE PICTURE"
                  src={formData.avatarPreview}
                  fileName={formData.avatarFile?.name}
                  className="review-avatar-row"
                />

                <div className="divider-line review-divider" />

                <div className="review-section">
                  <div className="review-section-heading">PERSONAL DETAILS</div>
                  <div className="grid-6 review-grid">
                    <ReviewField label="FIRST NAME" value={formData.firstName} className="col-span-2" />
                    <ReviewField label="LAST NAME" value={formData.lastName} className="col-span-2" />
                    <ReviewField label="MIDDLE NAME" value={formData.middleName} />
                    <ReviewField label="SUFFIX" value={formData.suffix} />
                    <ReviewField label="DATE OF BIRTH" value={formData.dateOfBirth} className="col-span-2" />
                    <ReviewField label="GENDER" value={formData.gender} className="col-span-2" />
                    <ReviewField label="HEIGHT" value={formData.heightCm ? `${formData.heightCm} cm` : ''} className="col-span-2" />
                    <ReviewField label="CIVIL STATUS" value={formData.civilStatus} className="col-span-3" />
                    <ReviewField label="EDUCATIONAL ATTAINMENT" value={formData.educationalLevel} className="col-span-3" />
                  </div>
                </div>

                <div className="divider-line review-divider" />

                <div className="review-section">
                  <div className="review-section-heading">CONTACT DETAILS</div>
                  <div className="grid-6 review-grid">
                    <ReviewField label="MOBILE NUMBER" value={formData.phoneNumber ? `+63 ${formData.phoneNumber}` : ''} className="col-span-3" />
                    <ReviewField label="EMAIL ADDRESS" value={formData.email} className="col-span-3" />
                    <ReviewField label="RESIDENTIAL ADDRESS" value={formData.residentialAddress} className="col-span-6" />
                  </div>
                </div>

                <div className="divider-line review-divider" />

                <div className="review-section">
                  <div className="review-section-heading">APPLICATION AND LICENSE DETAILS</div>
                  <div className="grid-6 review-grid">
                    <ReviewField label="POSITION APPLIED" value={formData.positionApplied} className="col-span-2" />
                    <ReviewField label="EMPLOYMENT TYPE" value={formData.employmentType} className="col-span-2" />
                    <ReviewField label="YEARS OF EXPERIENCE" value={`${formData.yearsExperience || 0} year(s)`} className="col-span-2" />
                    <ReviewField label="LICENSE NUMBER" value={formData.licenseNumber} className="col-span-3" />
                    <ReviewField label="LICENSE EXPIRY" value={formData.licenseExpiryDate} className="col-span-3" />
                    <ReviewField label="SECURITY LICENSE PHOTO" value={formData.licensePhotoFile?.name} className="col-span-6" />
                  </div>
                </div>
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
