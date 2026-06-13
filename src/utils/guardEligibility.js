export const MIN_GUARD_AGE = 18;
export const MAX_GUARD_AGE = 45;
export const MAX_GUARD_HEIGHT_CM = 230;
export const MIN_HEIGHT_CM_BY_GENDER = Object.freeze({
  male: 162.56,
  female: 157.48,
});

export function calculateAge(dateValue, referenceDate = new Date()) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateValue || ''));
  if (!match) return null;

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const birthday = new Date(year, month - 1, day);

  if (
    birthday.getFullYear() !== year
    || birthday.getMonth() !== month - 1
    || birthday.getDate() !== day
  ) {
    return null;
  }

  let age = referenceDate.getFullYear() - year;
  const monthDiff = referenceDate.getMonth() - (month - 1);
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < day)) age -= 1;
  return age;
}

export function getApplicantAgeError(dateOfBirth) {
  const age = calculateAge(dateOfBirth);
  if (age === null) return 'Date of birth is invalid.';
  if (age < MIN_GUARD_AGE || age > MAX_GUARD_AGE) {
    return `Applicant must be between ${MIN_GUARD_AGE} and ${MAX_GUARD_AGE} years old.`;
  }
  return '';
}

export function getApplicantHeightError(gender, heightCm) {
  const normalizedGender = typeof gender === 'string' ? gender.trim().toLowerCase() : '';
  const minimumHeight = MIN_HEIGHT_CM_BY_GENDER[normalizedGender];
  if (!minimumHeight) return 'Select Male or Female before entering height.';

  const numericHeight = Number(heightCm);
  if (!Number.isFinite(numericHeight)) return 'Height is required.';
  if (numericHeight > MAX_GUARD_HEIGHT_CM) {
    return `Height cannot exceed ${MAX_GUARD_HEIGHT_CM} cm.`;
  }
  if (numericHeight < minimumHeight) {
    const heightLabel = normalizedGender === 'male' ? "5'4\"" : "5'2\"";
    return `Minimum height requirement for ${normalizedGender === 'male' ? 'male' : 'female'} applicants is ${heightLabel} (${minimumHeight} cm).`;
  }
  return '';
}
