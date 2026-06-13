import { CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { submitContactMessage } from '@/services/promoClients';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const NAME_REGEX = /^[A-Za-z\u00D1\u00F1 .'-]+$/;
const BLOCKED_CONTENT_REGEX = /\b(?:https?:\/\/|www\.|[a-z0-9-]+\.(?:com|net|org|io|ph|xyz|info|biz|ru|cn)\b|script|iframe|object|embed|onerror|onload|javascript:|data:text\/html|base64|eval\(|document\.|window\.|<\?php)|<[^>]+>/i;

const infoCards = [
  {
    Icon: MapPin,
    label: 'LOCATION',
    text: 'Blk2-Lot6 Marbellas St., El Puentebello Subdivision, Fourth Estate, Brgy. San Antonio, Paranaque City, Metro Manila, 1715',
  },
  {
    Icon: Phone,
    label: 'TELEPHONE / MOBILE',
    text: '(02) 8299-344 / 0920-710-5076',
  },
  {
    Icon: Mail,
    label: 'EMAIL',
    text: 'praisesecurity@gmail.com',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showSuccessModal) return undefined;

    const timeoutId = window.setTimeout(() => {
      setShowSuccessModal(false);
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [showSuccessModal]);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setSubmitError('');
  };

  const validateForm = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) nextErrors.name = 'Name is required.';
    else if (!NAME_REGEX.test(name)) nextErrors.name = 'Use letters, spaces, apostrophes, periods, and hyphens only.';

    if (!email) nextErrors.email = 'Email address is required.';
    else if (!EMAIL_REGEX.test(email)) nextErrors.email = 'Enter a valid email address.';

    if (!subject) nextErrors.subject = 'Subject is required.';
    else if (subject.length < 3) nextErrors.subject = 'Subject must be at least 3 characters.';
    else if (BLOCKED_CONTENT_REGEX.test(subject)) nextErrors.subject = 'Links, HTML, or code are not allowed.';

    if (!message) nextErrors.message = 'Message is required.';
    else if (message.length < 10) nextErrors.message = 'Message must be at least 10 characters.';
    else if (BLOCKED_CONTENT_REGEX.test(message)) nextErrors.message = 'Links, HTML, or code are not allowed.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getErrorMessage = (error) => {
    if (error?.response?.status === 429) {
      const retryAfter = error.response.data?.retryAfterSeconds;
      return retryAfter
        ? `Too many contact messages. Please try again in ${retryAfter} seconds.`
        : 'Too many contact messages. Please try again later.';
    }

    return error?.response?.data?.error || 'Unable to send your message. Please try again.';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      setFormData(INITIAL_FORM);
      setShowSuccessModal(true);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" ref={ref}>
      <div className="container">
        <div
          className="section-title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>AGENCY CONTACT</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle contact-subtitle">
            Reach out to us for deployments, inquiries, or security consultations.
          </p>
        </div>

        <div className="contact-grid">
          <div
            className="contact-form-card"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-28px)',
              transition: 'all 0.7s ease 0.15s',
            }}
          >
            <div className="form-card-header">
              <span className="form-card-tag">// SEND MESSAGE</span>
              <h3>Get In Touch</h3>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">NAME</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    maxLength={120}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && <span id="contact-name-error" className="field-error contact-field-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">EMAIL ADDRESS</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    maxLength={160}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && <span id="contact-email-error" className="field-error contact-field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">SUBJECT</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(event) => updateField('subject', event.target.value)}
                  maxLength={160}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                />
                {errors.subject && <span id="contact-subject-error" className="field-error contact-field-error">{errors.subject}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">MESSAGE</label>
                <textarea
                  id="contact-message"
                  placeholder="Describe your security needs or inquiry..."
                  value={formData.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  maxLength={1500}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && <span id="contact-message-error" className="field-error contact-field-error">{errors.message}</span>}
              </div>
              {submitError && <div className="contact-submit-error">{submitError}</div>}
              <button type="submit" className="btn-send" disabled={isSubmitting}>
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

          <div
            className="contact-info-col"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(28px)',
              transition: 'all 0.7s ease 0.25s',
            }}
          >
            {infoCards.map((card) => {
              const InfoIcon = card.Icon;

              return (
                <div key={card.label} className="info-card">
                  <div className="info-icon">
                    <InfoIcon size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div className="info-content">
                    <div className="info-label">{card.label}</div>
                    <div className="info-text">{card.text}</div>
                  </div>
                </div>
              );
            })}

            <div className="map-card">
              <div className="map-header">
                <span className="map-tag">// HEADQUARTERS</span>
              </div>
              <iframe
                title="Praise Security Location"
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7726.637204994879!2d121.02547068789391!3d14.466385782729981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBlk2-Lot6%20Marbellas%20St.%2C%20El%20Puentebello%20Subdivision%2C%20Fourth%20Estate%2C%20Brgy.%20San%20Antonio%2C%20Paranaque%20City%2C%20Metro%20Manila%2C%201715!5e0!3m2!1sen!2sph!4v1778427300040!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(event) => event.stopPropagation()}>
            <div className="success-modal-icon">
              <CheckCircle size={36} />
            </div>
            <h3>MESSAGE SENT</h3>
            <p>Message sent. Our team will get back to you soon.</p>
            <button className="success-modal-btn" type="button" onClick={() => setShowSuccessModal(false)}>
              DONE
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
