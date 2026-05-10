import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import JoinHero from '@components/join/JoinHero';
import ApplicationProcess from '@components/join/ApplicationProcess';
import BookingForm from '@components/join/BookingForm';
import ApplicationForm from '@components/join/ApplicationForm';

export default function JoinTheForce() {
  const [isBooking, setIsBooking] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Auto-open the correct form when arriving with ?form=booking or ?form=application
  useEffect(() => {
    const form = searchParams.get('form');
    if (form === 'booking') setIsBooking(true);
    else if (form === 'application') setIsApplying(true);
  }, [searchParams]);

  const handleCancel = () => {
    setIsBooking(false);
    setIsApplying(false);
    navigate('/join-the-force', { replace: true });
  };

  return (
    <>
      {isBooking ? (
        <BookingForm onCancel={handleCancel} />
      ) : isApplying ? (
        <ApplicationForm onCancel={handleCancel} />
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
