import { caseStudies } from './case-studies.js';

const caseStudyDialog = document.querySelector('#case-study-dialog');
const dialogTitle = document.querySelector('#case-study-dialog-title');
const dialogBody = document.querySelector('#case-study-dialog-body');
const dialogEvidence = document.querySelector('#case-study-dialog-evidence');
const dialogCloseButton = document.querySelector('[data-case-study-close]');
let triggeringButton = null;

function setCaseStudyHash(id) {
  history.replaceState(null, '', `#case-study=${id}`);
}

export function openCaseStudy(caseStudy) {
  if (!caseStudy || !caseStudyDialog) return;

  dialogTitle.textContent = caseStudy.title;
  dialogBody.textContent = caseStudy.body;
  dialogEvidence.textContent = caseStudy.evidenceStatus;
  setCaseStudyHash(caseStudy.id);

  if (!caseStudyDialog.open) caseStudyDialog.showModal();
  dialogCloseButton.focus();
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
