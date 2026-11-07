# FILE 1 OF 2: BUILD eLearn "Version A" (exact copy of the live site), desktop and mobile

Read this file and File 2 (`2_AUDIT_eLearn_Version_A.md`) completely before you start. This file says what to build and how. File 2 says how to test it and keep going until it is right.

## What the person who gave you this needs
They have very little time and no context. So:
- Do not ask them questions. Make a sensible choice, write it in `handoff.md` under "Assumptions", and carry on. Ask only at the very end, and only about things that truly blocked you (for example a login you cannot pass).
- Do not stop early. You are finished only when File 2's "Definition of done" is met. If you run out of room first, follow "If you must stop" at the bottom, so a new chat can carry on exactly where you left off.
- Do not report anything as done without a measurement behind it.

## The goal
Recreate my SMU eLearn (Brightspace/D2L, https://elearn.smu.edu.sg) as **one working HTML file, `elearn_version_a.html`**, that looks and behaves exactly like the live site today, on a desktop screen and on a phone screen. "Version A" means as-is: do NOT redesign, restyle, tidy, modernise or improve anything. Reproduce quirks and flaws too.

I am already signed in to the site in my browser. Never ask for or type a password. Never enter credentials anywhere.

## The three files you create (in one folder named `elearn-version-a/`)
1. `elearn_version_a.html`: the working recreation. Opens from disk with a double-click. No server, no build step, no frameworks, no network calls when it runs. Plain HTML, CSS and a little vanilla JavaScript. Fonts, icons and images are stored inside or next to it. Real text, tables, lists, buttons and links (never a screenshot used as a page).
2. `sitemap.md`: the living map of every screen. Rules below.
3. `handoff.md`: the living notes. Rules below. It also holds the audit log and the next actions.
Also keep a folder `audit-shots/` for evidence screenshots.

## Rules that never change
- **Read-only.** Never submit, save, post, send, reply, enrol, delete, upload, start or resume a quiz, open a locked-browser quiz, or change any setting. If a screen only appears after one of those, do not do it; capture the screen before it and record the rest as "not capturable" with the reason.
- **Privacy.** Before anything is saved or screenshotted, replace my name, student ID, email, profile photo and any other person's details with neutral placeholders ("Student Name", "00000000"). Replace any password, code, token or private link shown on a page (for example inside a module description) with "••••••••". Include no grades and nothing from a proctored quiz.
- **Never fix the live site's mistakes.** If something is broken or inconsistent there, copy it and note it.

## What "end to end" means (scope)
Cover **every screen and every state** reachable by a student in my account, on **both** layouts. Discover them yourself; do not rely on this list being complete.
- **Global:** landing page, header, global navigation and every menu, flyout, drawer and pop-up (profile, notifications, messages, search, apps/waffle, help), the mobile menu, footer.
- **My Courses:** all tabs, filters, sorting, pinned and unpinned views, empty states.
- **Courses:** The 4 current-term (Term 4, 2026-27) courses: IS624-G1 Experimental Learning and Design Thinking (orgUnit 453354), MGMT6088-G1 Leading Transformation with AI (462326), MGMT6108-G1 Decision Architecture for Managers (462330), OBHR617-G1 Negotiating in Business (462346). Non-term courses (orientation, PGPD, etc.) appear only as rows on My Courses, not crawled. For each course: course home, every item in the course navigation bar, Content (every module, every topic, every viewer type; for files show page 1 of the viewer), Assignments (list, folder, submit page up to but not including submitting), Quizzes (list, summary, attempts list; never launch), Discussions (list, topic, thread), Classlist, Groups, Grades and My Results entry, Announcements, Calendar, and any other tool in the nav or "More" menu (ePortfolio, locker, and similar).
- **External links (these are in scope):** every link that leaves eLearn and appears in the global nav, course nav, content, tools or My Results. Typical ones are the course reading list, My Results, tool launches, user guides and support pages. For each: record the URL and whether it opens in a new tab; then capture the destination's landing screen and its main view exactly as my signed-in session shows it, on both layouts. Go one hop only: the landing screen, its main list or result view, and one detail view (3 screens maximum per external site). If the destination demands a separate login you cannot pass, capture the login screen as it appears, mark it `external-blocked`, and move on. In the recreation, these links open the recreated external screen with the same new-tab or same-tab behaviour as the live site.
- **Layouts:** desktop 1440 x 900, phone 390 x 844 (device pixel ratio 3, mobile user agent). Also check one tablet width (820 x 1180) and write down the breakpoints where the layout changes. Capture the real phone layout from the live site at that width; never just shrink the desktop.
- **States:** for every screen, capture hover and focus on links, buttons, nav items and rows; every menu, dropdown, kebab menu, flyout and drawer; dialogs and tooltips; accordions and module trees (open and closed); tabs; sort, filter and search; scroll behaviour (sticky headers, scroll containers, long pages top to bottom); empty and error states that are visible without changing data.

## How to capture each screen, on each layout
1. Load the live page. Wait until fonts, icons, images and lazy content have settled.
2. Read the real DOM, not a picture of it. Walk the whole tree, including shadow roots and same-origin iframes (this site uses web components, so a plain query misses content). For every visible element record: tag, text, the attributes that matter (href, target, aria-label, title, role, src, alt, type), its bounding box in pixels relative to the page (to 0.1), and the computed styles that change how it looks: font family, size, weight, line height, letter spacing, colour, background (colour, image, gradient), borders, radius, shadow, opacity, padding, margin, display, position, z-index, overflow, text alignment, cursor, and the content of ::before and ::after.
3. Store every icon as inline SVG using the real path data. Store the fonts and images the page really uses.
4. Record placement: where each element sits at that width and how it reflows. Rebuild with the same structure and the same measurements. Fixed bars, sticky bars, scroll areas, column widths and breakpoints must match.
5. Take one plain full-viewport screenshot of the live page at the same width as the visual reference. Do not use element or clipped screenshots as the reference (on this site they come out zoomed and offset); crop a full-viewport shot afterwards if you need to. Hide any floating overlay that is not part of the page before shooting.
6. For states, trigger each one for real (real mouse moves and clicks, real focus), then repeat steps 2 to 5 for the changed area, and record the transition's duration and easing.
7. Record every link: its target pattern (for example `quiz_submissions.d2l?qi=<id>`, `/discussions/topics/<id>/View`, `/d2l/le/content/<ou>/viewContent/<id>/View`) and where it goes. In the recreation, a link to a captured screen goes to that screen; a link to a screen you have not captured yet shows a visible "not captured yet" notice (never a dead link, never a 404).
8. Cross-check titles, dates, order and ids against what the signed-in page can read from the course table of contents (for example `/d2l/api/le/1.67/<courseId>/content/toc`). Reading only; change nothing.

If your environment has a capability that turns a live page into HTML or design layers with exact coordinates, use it, and write down in `handoff.md` what it does and the order you used it in (capture, place, compare). Describe the capability in plain words in `handoff.md`; do not rely on a product name. Someone with different tools must be able to repeat your steps.

Reference measurements taken on 1 Nov 2026 (re-measure; do not trust blindly): global header 90 px with a 4 px dark band above it; course nav row 58 px; content column 1170 px; page headings 36 px, section headings 27 px; table header text 12.6 px, body 14.4 px; table and empty-state borders #cdd5dc; table header background #f9fbff; primary buttons #006fbf.

## Build rules for the HTML
- One file, responsive: media queries at the real breakpoints you measured, so desktop and phone are each faithful.
- Navigation between screens works as on the live site: links, back, forward, breadcrumbs, the course nav, the mobile menu.
- Every captured state works with the same timing.
- Press the H key to outline every clickable region and show its source selector (for audit).
- Open the file from disk and click through it yourself before you say anything is done.

## `sitemap.md` (create it before you build; update it every time you add, change or test a screen)
First, do a discovery pass on the live site and list every screen you can find, all as `Todo`. Then keep it current as you work. Never let it go stale: update it in the same step that you change the HTML.
- A tree (indented list) of parents and children, including external destinations.
- A table, one row per screen: `ID | Screen | Live URL pattern | Parent | How reached | External? | Opens in | Desktop | Phone | States done/total | Recreation route | Status | Last tested | Notes`.
- Status is exactly one of: `Todo`, `In progress`, `Built (untested)`, `Complete`, `Incomplete`, `Not capturable` (needs a verified reason), `external-blocked`.
- Under the table: "Found on live site but not in the HTML" and "In the HTML but not on the live site".

## `handoff.md` (create at the start; keep it current)
Put this at the very top and keep it current: **RESUME HERE**: the exact next 3 actions, which screens are in progress, and anything half-done. Then:
1. What was built: files, how to open it.
2. Method, as plain step-by-step instructions with no tool or product names (what you captured, in what order, how you rebuilt from it, how you compared).
3. Measured design facts: fonts and files, colours, spacing, breakpoints, heights, column widths, table and button styles, icon set, transition timings.
4. Interaction list per screen: trigger, result, timing.
5. Assumptions you made (so nobody has to ask).
6. Known gaps and quirks, with the evidence.
7. Privacy changes: what was replaced or redacted, and where.
8. Audit log: written by File 2 after every audit.

## Order of work
1. Discovery pass, then `sitemap.md` with every screen as `Todo`.
2. Build the shared frame first (header, nav, footer, fonts, colours), on both layouts.
3. Build screens in this priority: landing, My Courses, course home, Content, Assignments, Quizzes, Discussions, then the rest of the course tools, then external destinations.
4. After each group of about 5 screens, and whenever a group is finished, run the audit in File 2 on them. Fix what fails. Re-run. Then continue. Do not leave all testing to the end.
5. At the end, run the full audit twice in a row.

## If you must stop (out of room, time, or blocked)
Update `sitemap.md` and `handoff.md` first, with RESUME HERE filled in. Then tell the user, in two lines, what is done and what is not. A new chat must be able to carry on by reading these two files plus `handoff.md` and `sitemap.md` in `elearn-version-a/`, without being told anything else. The user will start it with: "Continue the eLearn Version A job. Read both instruction files and elearn-version-a/handoff.md, then keep going."
