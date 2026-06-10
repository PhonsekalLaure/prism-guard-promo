export function normalizePromoCarouselSlides(items) {
  if (!Array.isArray(items)) return [];

  return items.filter((slide) => (
    slide?.id
    && slide?.image_url
    && String(slide?.heading || '').trim()
    && String(slide?.text || '').trim()
  ));
}

export function removeFailedPromoSlide(slides, failedId, fallbackSlides) {
  const remaining = slides.filter((slide) => slide.id !== failedId);
  return remaining.length > 0 ? remaining : fallbackSlides;
}
