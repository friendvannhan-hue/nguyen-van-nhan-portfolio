import { caseStudies } from './case-studies.js';

document.documentElement.classList.add('js-ready');

const caseStudyDialog = document.querySelector('#case-study-dialog');
const dialogTitle = document.querySelector('#case-study-dialog-title');
const dialogCloseButton = document.querySelector('[data-case-study-close]');
const dialogSlots = [...document.querySelectorAll('[data-case-study-slot]')];
let triggeringButton = null;

function setCaseStudyHash(id) {
  history.replaceState(null, '', `#case-study=${id}`);
}

export function openCaseStudy(caseStudy) {
  if (!caseStudy || !caseStudyDialog) return;

  dialogTitle.textContent = caseStudy.title;
  dialogSlots.forEach((slot) => {
    const field = slot.dataset.caseStudySlot === 'evidence' ? 'evidenceStatus' : slot.dataset.caseStudySlot;
    slot.textContent = caseStudy[field];
  });
  setCaseStudyHash(caseStudy.id);

  if (!caseStudyDialog.open) caseStudyDialog.showModal();
  dialogCloseButton?.focus();
}

export function closeCaseStudy() {
  if (!caseStudyDialog?.open) return;
  caseStudyDialog.close();
  history.replaceState(null, '', `${location.pathname}${location.search}`);
}

document.querySelectorAll('[data-case-study-id]').forEach((button) => {
  button.addEventListener('click', () => {
    triggeringButton = button;
    openCaseStudy(caseStudies.find((caseStudy) => caseStudy.id === button.dataset.caseStudyId));
  });
});

dialogCloseButton?.addEventListener('click', closeCaseStudy);
caseStudyDialog?.addEventListener('cancel', (event) => {
  if (event.key === 'Escape') event.preventDefault();
  closeCaseStudy();
});
caseStudyDialog?.addEventListener('close', () => {
  history.replaceState(null, '', `${location.pathname}${location.search}`);
  triggeringButton?.focus();
  triggeringButton = null;
});

const initialCaseStudyId = new URLSearchParams(location.hash.slice(1)).get('case-study');
if (initialCaseStudyId) openCaseStudy(caseStudies.find((caseStudy) => caseStudy.id === initialCaseStudyId));

const revealTargets = document.querySelectorAll('.reveal');
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
  }, { threshold: 0.15 });
  revealTargets.forEach((target) => revealObserver.observe(target));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -45%' });
  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) sectionObserver.observe(section);
  });
}
