// Modal management for SF Symbols demo
import { copyToClipboard } from './utils.js';
import { state } from './data.js';

// About modal: create DOM once and control via show/hide
const aboutButton = document.getElementById('about-button');
const aboutModalOverlay = document.createElement('div');
aboutModalOverlay.className = 'modal-overlay';
aboutModalOverlay.id = 'about-modal';
aboutModalOverlay.setAttribute('role', 'dialog');
aboutModalOverlay.setAttribute('aria-modal', 'true');
aboutModalOverlay.setAttribute('aria-hidden', 'true');

const aboutModal = document.createElement('div');
aboutModal.className = 'about-modal';

const aboutTitle = document.createElement('h2');
aboutTitle.textContent = 'SF Symbols Library';

const aboutContent = document.createElement('div');
aboutContent.className = 'about-content';
aboutContent.innerHTML = `<!-- ABOUT_CONTENT -->`;

const okWrap = document.createElement('div');
okWrap.style.display = 'flex';
okWrap.style.justifyContent = 'center';
okWrap.style.marginTop = '12px';

const okButton = document.createElement('button');
okButton.className = 'theme-toggle';
okButton.type = 'button';
okButton.textContent = 'OK';
okButton.addEventListener('click', () => closeAboutModal());

okWrap.appendChild(okButton);

aboutModal.appendChild(aboutTitle);
aboutModal.appendChild(aboutContent);
aboutModal.appendChild(okWrap);

aboutModalOverlay.appendChild(aboutModal);
document.body.appendChild(aboutModalOverlay);

export function openAboutModal() {
  aboutModalOverlay.classList.add('show');
  aboutModalOverlay.setAttribute('aria-hidden', 'false');
  // small timeout to ensure transitions can run; focus OK button
  setTimeout(() => okButton.focus(), 60);
}

export function closeAboutModal() {
  aboutModalOverlay.classList.remove('show');
  aboutModalOverlay.setAttribute('aria-hidden', 'true');
  aboutButton.focus();
}

if (aboutButton) {
  aboutButton.addEventListener('click', (ev) => {
    ev.stopPropagation();
    openAboutModal();
  });
}

// Close modal on overlay click outside content
aboutModalOverlay.addEventListener('click', (ev) => {
  if (ev.target === aboutModalOverlay) closeAboutModal();
});

// Close modal on Escape
document.addEventListener('keydown', (event) => {
  if ((event.key === 'Escape' || event.key === 'Esc') && aboutModalOverlay.classList.contains('show')) {
    closeAboutModal();
  }
});

// Copy modal: create DOM once and control via show/hide
const copyModalOverlay = document.createElement('div');
copyModalOverlay.className = 'modal-overlay';
copyModalOverlay.id = 'copy-modal';
copyModalOverlay.setAttribute('role', 'dialog');
copyModalOverlay.setAttribute('aria-modal', 'true');
copyModalOverlay.setAttribute('aria-hidden', 'true');

const copyModal = document.createElement('div');
copyModal.className = 'copy-modal';

const copyTitle = document.createElement('h3');
copyTitle.textContent = 'Copy to Clipboard';

const copyOptionsContainer = document.createElement('div');
copyOptionsContainer.className = 'copy-options';

copyModal.appendChild(copyTitle);
copyModal.appendChild(copyOptionsContainer);
copyModalOverlay.appendChild(copyModal);
document.body.appendChild(copyModalOverlay);

let copyModalFocusedIndex = 0;
let copyOptions = [];

export function openCopyModal() {
  if (!state.selectedSymbolKey) return;

  const displayName = (globalThis.symbolNames || {})[state.selectedSymbolKey] || state.selectedSymbolKey;

  // Clear and rebuild options
  copyOptionsContainer.innerHTML = '';
  copyOptions = [];

  // Package Symbol Name option
  const packageOption = document.createElement('div');
  packageOption.className = 'copy-option';
  packageOption.innerHTML = `
    <span class="copy-option-label">Package Symbol Name</span>
    <span class="copy-option-value">${displayName}</span>
  `;
  packageOption.dataset.copyValue = displayName;
  packageOption.addEventListener('click', () => copyAndClose(displayName));
  copyOptionsContainer.appendChild(packageOption);
  copyOptions.push(packageOption);

  // Apple Symbol Name option
  const appleOption = document.createElement('div');
  appleOption.className = 'copy-option';
  appleOption.innerHTML = `
    <span class="copy-option-label">Apple Symbol Name</span>
    <span class="copy-option-value">${state.selectedSymbolKey}</span>
  `;
  appleOption.dataset.copyValue = state.selectedSymbolKey;
  appleOption.addEventListener('click', () => copyAndClose(state.selectedSymbolKey));
  copyOptionsContainer.appendChild(appleOption);
  copyOptions.push(appleOption);

  // React Component option
  const reactOption = document.createElement('div');
  reactOption.className = 'copy-option';
  reactOption.innerHTML = `
    <span class="copy-option-label">React Component</span>
    <span class="copy-option-value">&lt;SFSymbol name={${displayName}} size={32} /&gt;</span>
  `;
  reactOption.dataset.copyValue = `<SFSymbol name={${displayName}} size={32} />`;
  reactOption.addEventListener('click', () => copyAndClose(`<SFSymbol name={${displayName}} size={32} />`));
  copyOptionsContainer.appendChild(reactOption);
  copyOptions.push(reactOption);

  // Reset focus to first option
  copyModalFocusedIndex = 0;
  updateCopyModalFocus();

  copyModalOverlay.classList.add('show');
  copyModalOverlay.setAttribute('aria-hidden', 'false');
}

export function closeCopyModal() {
  copyModalOverlay.classList.remove('show');
  copyModalOverlay.setAttribute('aria-hidden', 'true');
}

function updateCopyModalFocus() {
  copyOptions.forEach((option, index) => {
    option.classList.toggle('focused', index === copyModalFocusedIndex);
  });
}

function copyAndClose(text) {
  copyToClipboard(text);
  closeCopyModal();
}

// Close copy modal on overlay click outside content
copyModalOverlay.addEventListener('click', (event) => {
  if (event.target === copyModalOverlay) closeCopyModal();
});

// Copy modal keyboard navigation
document.addEventListener('keydown', (event) => {
  if (!copyModalOverlay.classList.contains('show')) return;

  switch (event.key) {
    case 'Escape':
    case 'Esc':
      event.preventDefault();
      closeCopyModal();
      break;

    case 'ArrowDown':
      event.preventDefault();
      copyModalFocusedIndex = (copyModalFocusedIndex + 1) % copyOptions.length;
      updateCopyModalFocus();
      break;

    case 'ArrowUp':
      event.preventDefault();
      copyModalFocusedIndex = (copyModalFocusedIndex - 1 + copyOptions.length) % copyOptions.length;
      updateCopyModalFocus();
      break;

    case 'Enter':
      event.preventDefault();
      if (copyOptions[copyModalFocusedIndex]) {
        const text = copyOptions[copyModalFocusedIndex].dataset.copyValue;
        copyAndClose(text);
      }
      break;
  }
});

// Search help popover handlers
const searchHelpButton = document.getElementById('search-help-button');
const searchHelpPopover = document.getElementById('search-help-popover');

if (searchHelpButton && searchHelpPopover) {
  searchHelpButton.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const willShow = !searchHelpPopover.classList.contains('show');
    if (willShow) {
      searchHelpPopover.classList.add('show');
      searchHelpPopover.setAttribute('aria-hidden', 'false');
    } else {
      searchHelpPopover.classList.remove('show');
      searchHelpPopover.setAttribute('aria-hidden', 'true');
    }
  });

  // Clicking outside closes the popover
  document.addEventListener('click', (ev) => {
    if (!searchHelpPopover.classList.contains('show')) return;
    if (searchHelpPopover.contains(ev.target) || searchHelpButton.contains(ev.target)) return;
    searchHelpPopover.classList.remove('show');
    searchHelpPopover.setAttribute('aria-hidden', 'true');
  });

  // Close popover on Escape
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' || ev.key === 'Esc') {
      if (searchHelpPopover.classList.contains('show')) {
        searchHelpPopover.classList.remove('show');
        searchHelpPopover.setAttribute('aria-hidden', 'true');
      }
    }
  });
}