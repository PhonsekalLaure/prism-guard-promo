import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAge,
  getApplicantAgeError,
  getApplicantBirthDateBounds,
  getApplicantHeightError,
  MAX_GUARD_AGE,
  MIN_GUARD_AGE,
} from './guardEligibility.js';

const referenceDate = new Date(2026, 5, 12);
const ageLimitMessage = `Applicant must be between ${MIN_GUARD_AGE} and ${MAX_GUARD_AGE} years old.`;

test('calculates age after the birthday has occurred in the reference year', () => {
  assert.equal(calculateAge('2000-06-11', referenceDate), 26);
});

test('calculates age before the birthday has occurred in the reference year', () => {
  assert.equal(calculateAge('2000-06-13', referenceDate), 25);
});

test('rejects malformed and impossible birth dates', () => {
  assert.equal(calculateAge('06/12/2000', referenceDate), null);
  assert.equal(calculateAge('2000-02-30', referenceDate), null);
  assert.equal(calculateAge('', referenceDate), null);
});

test('returns an age validation error for invalid dates', () => {
  assert.equal(getApplicantAgeError('not-a-date'), 'Date of birth is invalid.');
});

test('returns an age validation error outside the guard age range', () => {
  assert.equal(getApplicantAgeError('1900-01-01'), ageLimitMessage);
});

test('accepts applicants inside the guard age range', () => {
  assert.equal(getApplicantAgeError('2000-01-01'), '');
});

test('returns applicant birth date input bounds from guard age limits', () => {
  const originalDate = globalThis.Date;
  const fixedNow = new originalDate(2026, 5, 22);

  class FixedDate extends originalDate {
    constructor(...args) {
      if (args.length === 0) return new originalDate(fixedNow);
      return new originalDate(...args);
    }

    static now() {
      return fixedNow.getTime();
    }
  }

  globalThis.Date = FixedDate;
  try {
    assert.deepEqual(getApplicantBirthDateBounds(), {
      min: '1980-06-23',
      max: '2008-06-22',
    });
  } finally {
    globalThis.Date = originalDate;
  }
});
test('validates gender-specific minimum heights', () => {
  assert.equal(getApplicantHeightError('Male', 162.55), 'Minimum height requirement for male applicants is 5\'4" (162.56 cm).');
  assert.equal(getApplicantHeightError('Female', 157.47), 'Minimum height requirement for female applicants is 5\'2" (157.48 cm).');
  assert.equal(getApplicantHeightError(' male ', 162.56), '');
  assert.equal(getApplicantHeightError('FEMALE', 157.48), '');
});

test('validates missing, invalid, and excessive height values', () => {
  assert.equal(getApplicantHeightError('', 170), 'Select Male or Female before entering height.');
  assert.equal(getApplicantHeightError('Male', 'abc'), 'Height is required.');
  assert.equal(getApplicantHeightError('Male', 231), 'Height cannot exceed 230 cm.');
});
