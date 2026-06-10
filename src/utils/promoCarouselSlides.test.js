import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizePromoCarouselSlides,
  removeFailedPromoSlide,
} from './promoCarouselSlides.js';

const fallbackSlides = [{ id: 'fallback', isFallback: true }];

test('normalizes only complete API slides', () => {
  const slides = normalizePromoCarouselSlides([
    { id: 'valid', image_url: 'image.jpg', heading: 'Heading', text: 'Text' },
    { id: 'missing-image', heading: 'Heading', text: 'Text' },
    { id: 'blank-copy', image_url: 'image.jpg', heading: ' ', text: 'Text' },
  ]);

  assert.deepEqual(slides.map((slide) => slide.id), ['valid']);
});

test('removes a failed remote slide while preserving remaining slides', () => {
  const slides = [{ id: 'one' }, { id: 'two' }];
  assert.deepEqual(
    removeFailedPromoSlide(slides, 'one', fallbackSlides),
    [{ id: 'two' }]
  );
});

test('restores bundled slides when every remote image has failed', () => {
  assert.equal(
    removeFailedPromoSlide([{ id: 'one' }], 'one', fallbackSlides),
    fallbackSlides
  );
});
