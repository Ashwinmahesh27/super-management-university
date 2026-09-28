// Variant assignment, per the brief:
// ?v=A or ?v=B always wins. With no ?v, assign A or B at random once and keep it in localStorage.
// NOTE: only variant A is built. Variant B waits until AUDIT.md is committed (pre-registration).
const KEY = 'wl_variant';

export function getAssignedVariant() {
  const q = new URLSearchParams(window.location.search).get('v');
  if (q === 'A' || q === 'B') return q;
  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
  if (stored === 'A' || stored === 'B') return stored;
  const pick = Math.random() < 0.5 ? 'A' : 'B';
  try { localStorage.setItem(KEY, pick); } catch (e) { /* ignore */ }
  return pick;
}

export const B_IS_BUILT = false;
