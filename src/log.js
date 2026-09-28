// Local-only event log for the pilot. No network calls: the debrief turns it into a short code
// that the tester pastes into the group's form.
const events = [];
const t0 = Date.now();

export function logEvent(name) {
  events.push({ name, s: Math.round((Date.now() - t0) / 1000) });
}

export function summary() {
  const first = (n) => { const e = events.find((x) => x.name === n); return e ? e.s : 'x'; };
  return {
    seconds: Math.round((Date.now() - t0) / 1000),
    openedReadings: first('open_readings'),
    openedPgpd: first('open_pgpd'),
    openedResults: first('open_my_results'),
    screens: events.filter((e) => e.name.startsWith('screen_')).length,
  };
}
