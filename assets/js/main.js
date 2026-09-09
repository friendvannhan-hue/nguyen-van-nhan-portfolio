document.documentElement.classList.add('js-ready');

const revealTargets = [...document.querySelectorAll('.reveal')];
const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
