# handoff.md (eLearn Version A)

## RESUME HERE
Deliverable: `elearn_version_a.html` (about 15 MB). One standalone file, inline CSS, JavaScript, SVG, fonts (Lato 400/700) and images. Open it by double-click; no server, no network calls, no external requests (checked: 0 requests, 0 console errors). Scope: the sample course MGMT6108 plus the global eLearn pages (76 screens, 3 layouts each).
Next 3 actions if work continues:
1. Run the full audit a second time (File 2 asks for two clean runs in a row). This session ran the audit once on all 76 screens x 3 layouts, then fixed defects; only parts were re-run after the fixes.
2. Capture per-screen kebab menus and hover states for the screens that do not have them yet (only 8 screens have page-level popups).
3. Add intermediate-width captures (for example 1100, 1280, 1024, 700) if fluid reflow between 390, 820 and 1440 matters; today the HTML holds the nearest captured layout.
Nothing is half-done on disk. Test server (only for audits, the HTML does not need it): node capture/srv.js <folder> on port 18423. The browser tool could not open file:// pages in this session, so audits used that server.

## What was built
- elearn_version_a.html, built by capture/build.js from capture/*.json (captured DOM with computed styles), capture/runtime.js (routing, menus, hover, tooltip, focus ring), capture/sample-sanitize.js (privacy and sample-data rules applied at build time).
- 76 screens: 10 global, 66 course (MGMT6108). Layouts: phone 390 (up to 767), tablet 820 (768 to 1099), desktop 1440 (1100 and up).
- Interactions in the HTML: every header menu and flyout (course selector, message, subscription and update alerts, profile, Class Info, Analytics, Tools, Links, Help, phone drawer with nested menus, tablet More menu) on all three layouts; kebab menus on 8 screens; Escape and click-outside close; focus moves into the opened menu and back; link, breadcrumb and back and forward navigation; "not captured yet" notice for anything else; H key outlines clickable regions.

## Method (no tool names)
1. Open the live page at the target width, mask the logo, avatar and names in the live DOM, and let content settle.
2. Walk the whole DOM including shadow roots and same-origin frames, record tag, text, attributes and computed styles per element, inline the SVG icons, and store fonts and images.
3. Open each menu or flyout for real (real mouse click, wait 3 seconds for flyouts that load data), then record the changed header or area again.
4. Rebuild from those records into one HTML file; keep one style dictionary so the file stays small.
5. Compare each screen with the live page: DOM text and positions, structure counts, styles, and a full-viewport screenshot diff with both images scaled to the logical viewport (the live tab and the test tab render at different pixel densities).
6. Fix shared causes first (table spacing, scrollbars, sticky bars, z-order of menus), then re-measure.

## Measured design facts
- Fonts: Lato 400 and 700. Live root font is 20px (body 19px) at 1440 wide.
- Colours: text #202122, link #006fbf (hover #004489), secondary button #e3e9f1 (hover #cdd5dc), primary button #006fbf (hover #004489), icon button hover #e3e9f1, table border #cdd5dc.
- Hover: links and nav items underline and turn #006fbf (blue links #004489); transitions are instant (0 s).
- Focus ring: 2px solid #006fbf.
- Header icon hover: icon and the 4px top bar turn #006fbf; tooltip appears 300 ms after hover and goes 120 ms after leaving; tooltip box #202122, radius 6px, white 14px text, padding 9/14/10, shadow 0 2px 12px rgba(0,0,0,.15). Only the logo and the header icons have tooltips.
- Breakpoints (live): phone header up to 767; tablet layout 768 to 1099; desktop from 1100. Content in the live site switches to the narrow layout near 640.
- Header 90px with 4px band; course nav row 58px.

## Assumptions
- The three other courses were dropped; the sample course is MGMT6108 and appears with other course names replaced by BUS200 and MKT300 sample labels.
- Slide pictures from lecture PDFs are replaced by one neutral sample slide; PDF topic pages are local sample previews.
- Live data (dates, "today", last login, alerts) is a snapshot; some live values have moved since capture.
- The live Grades page returns 403 for this account, so that screen is the 403 page.

## Known gaps and quirks (with evidence)
- Pixel limit of 1 percent met by 32 of 66 desktop, 28 of 66 tablet, 12 of 66 phone screens (sample document pages excluded). Averages 1.77, 2.39, 3.04 percent. Main causes: live data drift (calendar "today", last login, alerts), privacy masks that change text length (announcement email addresses wrap differently, +18px on three screens), the live scrollbar track, and a rich-text editor toolbar on the assignment folder pages that the recreation shows without its toolbar (30px shorter).
- Between captured widths the layout does not reflow fluidly (measured at 1200, 1100, 1024, 900, 768, 600, 360: nav and widget x positions differ from live because widths are fixed per capture). The switch points themselves match at 767/768 and 1099/1100.
- Open menu states: 46 of 49 header states passed the automatic open and close test and the other 3 opened when tested by hand; pixel match of open states averages 4.4 percent, none under 1 percent, mostly because the page behind the menu has changed.
- Structure counts differ on many screens because the real avatar is one placeholder image in the HTML and iframes are flattened.
- The phone drawer, tablet More menu and alert flyouts were verified against live screenshots only visually.
- Sample document pages and the 403 Grades page are excluded from fidelity numbers.

## Privacy changes
- Replaced: university name and logo ("Your University", neutral crest), account name ("Student", grey avatar), classlist names and usernames (Person n, userN), instructor and staff names (Sample Instructor, Sample Staff), all emails (student@example.com), feedback and portal links (example.edu), other course names (BUS200, MKT300), tenant ids in API hosts, student id and tokens.
- Final scan of the built file for: university name or domain, account name, student names, instructor and staff names, real emails, tenant ids, student id: no hits. No absolute URLs except placeholder example hosts and inert vendor strings.
- Not checked: text inside raster images (the sample slide is generated, other images are icons and the neutral avatar).

## Audit log
### 2026-11-06 19:27 audit 1 (full) and fixes
Screens audited: 76 screens x 3 layouts (228 measurements; Grades is the 403 page). Complete 0, Incomplete 75, Todo 0, Not capturable 1, external-blocked 0.
Overall pixel difference (sample documents excluded): desktop 1.77 percent, tablet 2.39 percent, phone 3.04 percent.
Failed checks, counted over screens x layouts: check 2 content 58 screen-layouts, check 3 structure 88, check 4 geometry 91, check 5 style 10, check 6 pixels 154 (out of 226 screen-layouts) (per screen detail in sitemap.md Notes). Checks 1, 7 and 10 passed; checks 8 and 9 are partial.
Defects found and fixed during this audit: sticky Save bar and wrapped buttons on form pages (phone), non-scrolling page wrapper blocking sticky behaviour, dropdown menus hidden under page widgets (z-order), alert flyouts captured empty (now captured after load), focus jumping to a page widget when a menu opened, missing tablet captures, privacy leftovers (a citation surname, one course code, a feedback URL, a tenant id).
Worst desktop and phone pairs after fixes: g-announcement-99011 t 16.93%; c6605-news-6605 t 16.93%; mycourses t 14.4%; g-ep-1859676698 m 11.44%; home t 11.16%; c6605-news-6605 d 11.1%; g-announcement-99011 d 10.6%; c462330-t2918835 m 10.13%.

### Next actions
High
- Second full audit (two clean runs in a row are required): re-run capture/audit2.js for all 76 x 3 after any change.
- Check 8 on main-path screens (course home, Content, Assignments, Quizzes, Discussions): replay the remaining states (row hover, sort, tabs, collapsible panels) on live and in the HTML; fixed means box, styles and timing within 50 ms.
Medium
- Check 9: add intermediate-width captures so the layout reflows like live between 390 and 1440; fixed means nav and widget positions within 2 px at 1200, 1024, 900, 700.
- Assignment folder pages (check 4, all layouts): capture the editor toolbar after it loads (wait 5 s); fixed means page height equals live within 2 px.
Low
- Announcement pages (check 4): choose a placeholder email that wraps like the original (about 15 characters).
- External destinations (reading list, My Results, INSIGHT, Zoom): capture landing screens or leave the notice.
