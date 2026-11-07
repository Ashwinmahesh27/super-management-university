# eLearn Version A: project copy for hand-off

Start with `../handoff.md` (RESUME HERE and next actions) and `../sitemap.md`. `../session_handoff.json` is the structured summary of the whole session. The finished prototype is `../elearn_version_a.html` (one file, opens by double-click, no server).

## What is in this folder
- `capture/` scripts: `driver.js` (capture), `caplib.js` (in-page DOM serialiser), `build.js` (assembles the HTML), `runtime.js` (routing, menus, hover, tooltip), `sample-sanitize.js` (privacy and sample-data rules applied at build time), `audit.js` and `audit2.js` (audit helpers), `srv.js` (test server), `patch-interactions.js`.
- `capture/cap_*.json`, `states.json`, `screens.json`, `shared.json`, `fonts.json`, `config.json`: the captured data the build reads (76 screens, 3 layouts: phone 390, tablet 820, desktop 1440).
- `capture/audit-results.json`: results of the one full audit run.
- `_instructions/`: the two original briefs (build and audit).

## Rebuild
    node capture/build.js            # writes ../elearn_version_a.html next to capture/
    node capture/build.js --check    # validates without writing

## Not included on purpose
- Screenshots (`audit-shots/`), archived data for three dropped courses (`_archive/`), course table-of-contents dumps, and the private scrub list. They contain live-site content from before masking.
- Real names. The masking rules no longer contain any. To capture or audit again, supply names locally:
  - build: `SANITIZE_NAMES="First Last|Other Name" node capture/build.js`
  - capture/audit session: set `globalThis.rawNames=[...]`, `globalThis.ACCOUNT_NAMES=[...]` and `globalThis.ACCOUNT_RE='<regex>'` before `setupMasking()`.
  Do not save real names back into these files.

## Re-capturing or re-auditing needs
A signed-in browser session on the live site (not shared), the steps in `capture/BOOT.md`, and the test server (`node capture/srv.js <this folder>`, port 18423), because the browser tool could not open `file://` pages. The delivered HTML itself needs none of this.

## Known limits
Nothing is marked Complete. One full audit ran; two clean runs in a row are required. See `../handoff.md` for the failed checks and the prioritised next actions.
