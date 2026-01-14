// Utility functions for SF Symbols demo
import { state, sfToastElement } from './data.js';

// Performance tuning
export const FLIP_MEASURE_THRESHOLD = 300; // only run expensive FLIP measurements for small sets

/**
 * Simple debounce helper to avoid re-rendering on every keystroke
 */
export function debounce(func, wait = 150) {
  let timeoutId = null;
  return function debounced(...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
}

// Keyboard navigation helper functions
export function getVisibleCards() {
  return Array.from(document.querySelectorAll('#icons .card'));
}

export function setFocusedCard(index) {
  const cards = getVisibleCards();
  // Remove old focus
  cards.forEach(card => card.classList.remove('focused'));

  if (index >= 0 && index < cards.length) {
    state.focusedIndex = index;
    const card = cards[index];
    card.classList.add('focused');
    // Auto-scroll into visible area
    card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  } else {
    state.focusedIndex = -1;
  }
}

export function getGridColumns() {
  const container = document.getElementById('icons');
  const style = getComputedStyle(container);
  const columns = style.gridTemplateColumns.split(' ').length;
  return columns;
}

/**
 * Convert dot-notation / kebab-case strings to PascalCase.
 * Examples:
 *  - "arrow.down.backward.and.arrow.up.forward.square.fill" -> "ArrowDownBackwardAndArrowUpForwardSquareFill"
 *  - "my-icon-name" -> "MyIconName"
 */
export function kebabToPascalCase(inputString) {
  if (!inputString || typeof inputString !== 'string') return '';
  // split on dots, hyphens, underscores and spaces
  const parts = inputString.split(/[.\-_/\s]+/).filter(Boolean);
  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

export function getCenteredCardIndex() {
  const cards = getVisibleCards();
  if (cards.length === 0) return 0;

  const viewportCenterY = window.scrollY + window.innerHeight / 2;
  const viewportCenterX = window.innerWidth / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + window.scrollY + rect.height / 2;

    const distance = Math.hypot(cardCenterX - viewportCenterX, cardCenterY - viewportCenterY);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

// Toast helper
let toastTimer = null;
export function showToast(message, duration = 2500) {
  if (!sfToastElement) return;
  sfToastElement.hidden = false;
  sfToastElement.textContent = message;
  sfToastElement.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    sfToastElement.classList.remove('show');
    setTimeout(() => { sfToastElement.hidden = true; }, 300);
  }, duration);
}

// Copy to clipboard helper
export function copyToClipboard(text, successMessage = 'Copied to clipboard', errorMessage = 'Failed to copy') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage);
  }).catch(() => {
    showToast(errorMessage);
  });
}