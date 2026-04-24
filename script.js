const yearEl = document.getElementById('year');
const ctaButton = document.getElementById('cta-button');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (ctaButton) {
  ctaButton.addEventListener('click', () => {
    const features = document.getElementById('features');
    if (features) {
      features.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
