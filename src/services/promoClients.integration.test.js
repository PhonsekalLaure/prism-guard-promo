import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';
import {
  getPromoCarouselConfig,
  getPromoCarouselSlides,
  getPromoClients,
  getPromoServiceReviews,
  submitAppointmentRequest,
  submitApplicationRequest,
  submitContactMessage,
} from './promoClients.js';

const originalGet = axios.get;
const originalPost = axios.post;

afterEach(() => {
  axios.get = originalGet;
  axios.post = originalPost;
});

test('loads HRIS-managed promo carousel config from the public API shape', async () => {
  const calls = [];
  const slides = [{ id: 'slide-1', heading: 'Heading', text: 'Text', image_url: 'hero.jpg' }];
  axios.get = async (url) => {
    calls.push(url);
    return { data: { data: slides, use_default_hero: false } };
  };

  assert.deepEqual(await getPromoCarouselConfig(), {
    slides,
    useDefaultHero: false,
  });
  assert.deepEqual(await getPromoCarouselSlides(), slides);
  assert.deepEqual(calls, [
    'http://localhost:3000/api/promo/carousel',
    'http://localhost:3000/api/promo/carousel',
  ]);
});

test('preserves default hero mode and ignores malformed carousel data wrappers', async () => {
  axios.get = async () => ({
    data: {
      data: { id: 'not-an-array' },
      use_default_hero: true,
    },
  });

  assert.deepEqual(await getPromoCarouselConfig(), {
    slides: [],
    useDefaultHero: true,
  });
});

test('loads published HRIS service reviews with the requested public limit', async () => {
  const calls = [];
  const reviews = [{ id: 'review-1', rating: 4.8, client: 'PrimeTech Solutions' }];
  axios.get = async (url, config) => {
    calls.push({ url, config });
    return { data: { data: reviews } };
  };

  assert.deepEqual(await getPromoServiceReviews(6), reviews);
  assert.deepEqual(calls, [{
    url: 'http://localhost:3000/api/promo/service-reviews',
    config: { params: { limit: 6 } },
  }]);
});

test('loads active clients from either current or legacy public wrappers', async () => {
  axios.get = async () => ({ data: { data: [{ id: 'client-1', company: 'Apex' }] } });
  assert.deepEqual(await getPromoClients(), [{ id: 'client-1', company: 'Apex' }]);

  axios.get = async () => ({ data: { clients: [{ id: 'client-2', company: 'Beacon' }] } });
  assert.deepEqual(await getPromoClients(), [{ id: 'client-2', company: 'Beacon' }]);
});

test('posts public promo submissions to their API modules', async () => {
  const calls = [];
  axios.post = async (url, payload) => {
    calls.push({ url, payload });
    return { data: { ok: true, url } };
  };

  assert.equal((await submitAppointmentRequest({ name: 'Client' })).ok, true);
  assert.equal((await submitApplicationRequest({ firstName: 'Applicant' })).ok, true);
  assert.equal((await submitContactMessage({ message: 'Hello' })).ok, true);
  assert.deepEqual(calls, [
    { url: 'http://localhost:3000/api/promo/appointments', payload: { name: 'Client' } },
    { url: 'http://localhost:3000/api/promo/applications', payload: { firstName: 'Applicant' } },
    { url: 'http://localhost:3000/api/promo/contact', payload: { message: 'Hello' } },
  ]);
});
