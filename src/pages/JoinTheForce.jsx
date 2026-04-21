import React, { useState } from 'react';
import JoinHero from '@components/join/JoinHero';
import ApplicationProcess from '@components/join/ApplicationProcess';
import BookingForm from '@components/join/BookingForm';
import ApplicationForm from '@components/join/ApplicationForm';

export default function JoinTheForce() {
  const [isBooking, setIsBooking] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  return (
    <>
      {isBooking ? (
        <BookingForm onCancel={() => setIsBooking(false)} />
      ) : isApplying ? (
        <ApplicationForm onCancel={() => setIsApplying(false)} />
      ) : (
        <>
          <JoinHero />
          <ApplicationProcess 
            onBookNow={() => setIsBooking(true)} 
            onApplyNow={() => setIsApplying(true)} 
          />
        </>
      )}
    </>
  );
}
