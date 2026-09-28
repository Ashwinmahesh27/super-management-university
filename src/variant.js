// Variant assignment, per the brief:
// ?v=A or ?v=B always wins. With no ?v, assign A or B at random once and keep it in localStorage.
// NOTE: variant B is not built yet. It waits until AUDIT.md is committed (pre-registration).
const KEY = 'wl_variant';

export function hasVariantParam() {
  const q = new URLSearchParams(window.location.search).get('v');
  return q === 'A' || q === 'B';
}

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

// Keep the address bar in step with the toggle, so a copied link opens the same design.
export function setVariantParam(v) {
  const u = new URLSearchParams(window.location.search);
  u.set('v', v);
  window.history.replaceState(null, '', window.location.pathname + '?' + u.toString());
}

export const B_IS_BUILT = false;
