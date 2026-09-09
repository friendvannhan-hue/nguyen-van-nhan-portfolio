document.documentElement.classList.add('js-ready');

const revealTargets = [...document.querySelectorAll('.reveal')];
const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navDisclosure = document.querySelector('[data-nav-disclosure]');
const navSummary = document.querySelector('[data-menu-toggle]');
const mobileViewport = window.matchMedia('(max-width: 768px)');

function syncNavigation(viewport) {
  if (!navDisclosure) return;
  if (viewport.matches) navDisclosure.removeAttribute('open');
  else navDisclosure.setAttribute('open', '');
}

syncNavigation(mobileViewport);
mobileViewport.addEventListener?.('change', (event) => syncNavigation(event));

document.querySelectorAll('[data-primary-nav] a').forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileViewport.matches) navDisclosure?.removeAttribute('open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navDisclosure?.open && mobileViewport.matches) {
    navDisclosure.removeAttribute('open');
    navSummary?.focus();
  }
});

function setActiveSection(sectionId) {
  sectionLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${sectionId}`);
  });
}

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => revealObserver.observe(target));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -55%' });

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) sectionObserver.observe(section);
  });
}
