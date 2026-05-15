import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import JoinHero from '@components/join/JoinHero';
import ApplicationProcess from '@components/join/ApplicationProcess';
import BookingForm from '@components/join/BookingForm';
import ApplicationForm from '@components/join/ApplicationForm';

export default function JoinTheForce() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const form = searchParams.get('form');
  const isBooking = form === 'booking';
  const isApplying = form === 'application';

  const openForm = (targetForm) => {
    navigate(`/join-the-force?form=${targetForm}`);
  };

  const handleCancel = () => {
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
            onBookNow={() => openForm('booking')}
            onApplyNow={() => openForm('application')}
          />
        </>
      )}
    </>
  );
}
