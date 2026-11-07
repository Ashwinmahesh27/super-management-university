# FILE 2 OF 2: AUDIT and ITERATE eLearn "Version A" until it is right

This is the test-and-repeat half of the job. File 1 (`1_BUILD_eLearn_Version_A.md`) says what to build. Read both completely before you start. The same rules apply here: read-only on the live site, no passwords, privacy placeholders, never ask the user questions unless truly blocked.

The goal is to keep repeating **build, audit, fix** until the HTML recreation matches the live site and the audit has nothing left to do. Do not stop at "good enough".

## When to run an audit
- After every group of about 5 screens, on those screens.
- After any change to shared parts (header, nav, fonts, colours): re-run on a sample of 5 screens from different areas.
- At the end: the full audit, twice in a row.
- Whenever you resume a job: first a quick audit of whatever `handoff.md` says was in progress.

## Setup
- Serve or open `elearn-version-a/elearn_version_a.html` from disk in one tab, and the live site in another, in the same browser, at 100 percent zoom.
- Use identical viewports for each pair: desktop 1440 x 900, phone 390 x 844 (device pixel ratio 3, mobile user agent). Check one tablet width, 820 x 1180, for breakpoints.
- Watch the console and network panels for the HTML: it must show no errors and no network requests.

## Step A. Re-discover the live site (keeps the sitemap honest)
Do a fresh pass over the live site for the screens being audited (and, in a full audit, the whole site): read the real DOM, including shadow roots, collect every link and nav item, and cross-check the course table of contents. Add any screen that is on the live site but not in `sitemap.md` as `Todo`. Mark any row that no longer exists on the live site. Include external destinations. Update `sitemap.md` straight away.

## Step B. Test every screen being audited, at both layouts, in real time
Open the live screen and the recreation side by side at the same scroll positions (top, middle, bottom). Re-measure the live site every time; the live site can change, so never treat old numbers in `handoff.md` as the truth. Run these ten checks and write the number next to each pass or fail:
1. **Route.** The screen loads in the recreation, with the same title, breadcrumb and navigation state.
2. **Content.** Visible text matches (ignoring the privacy placeholders). Count missing and extra strings.
3. **Structure.** Same landmarks, headings, tables, lists, buttons and links, in the same order. Count differences.
4. **Geometry.** Compare the bounding box of the header, navigation, main column, every table, every button and every heading. Pass if each is within 2 px in position and size.
5. **Style.** For 10 elements per screen (heading, body text, link, button, table header, table cell, input, tab, icon, border) compare font, size, weight, colour, background, border, radius and spacing. Pass if all match.
6. **Pixels.** Plain full-viewport screenshot of each (never clipped or element shots), then a pixel difference. Pass if under 1 percent, ignoring privacy placeholders. Save the live shot, the recreation shot and the diff image in `audit-shots/<screen-id>-<layout>/`.
7. **Links.** Every link goes to the matching recreated screen, or to a visible "not captured yet" notice. None is dead. External links have the same new-tab or same-tab behaviour as the live site and lead to the recreated external screen.
8. **Interactions.** Replay every state listed for the screen in `handoff.md` (hover, focus, menus, flyouts, drawers, dialogs, tooltips, tabs, sort, filter, expand, collapse, scroll behaviour). Trigger each on both pages for real. Compare what appears, its box, its styles, and its transition time (within 50 ms). Also try any control on the live screen that the list does not mention, and add it as a finding.
9. **Layout switch.** Resize between 1440, 820 and 390. The breakpoints and the way the layout changes must match.
10. **Privacy.** No real name, ID, email, password, code or private link appears on screen or in the HTML source.

Status rules:
- `Complete`: all ten checks pass on both layouts.
- `Incomplete`: any check fails or any state is missing.
- `Not capturable`: only if the reason is real and you re-checked it (for example a locked-browser quiz you must not launch). A reason copied from an older note is not enough.
- `external-blocked`: the external site needs a login you cannot pass, and you captured the login or landing screen as shown.
Never write `Complete` without the numbers.

## Step C. Write the results
1. Update `sitemap.md`: statuses, "Last tested", states done/total, and the two lists under the table.
2. Append an entry to the **Audit log** in `handoff.md`: date and time, which screens were audited, counts of Complete, Incomplete, Todo, Not capturable and external-blocked, overall pixel difference (desktop and phone), and a table of every failed check with its number.
3. Rewrite **RESUME HERE** at the top of `handoff.md` so it matches the new next actions.

## Step D. Next actions (end every audit with this section, in the Audit log)
List every open problem as an action, in this order: High, then Medium, then Low; within a level, the screen with the most failed checks first.
- High: screens on the main path (landing, My Courses, course home, Content, Assignments, Quizzes, Discussions), and anything in the shared frame.
- Medium: other course tools and the global menus.
- Low: rarely used pages and external screens.
Each action has: the screen ID and name, the failing check with its number and layout (for example "check 4, phone: table header 6 px too high"), the exact steps to fix it (re-capture that screen at that layout, re-read the design facts in `handoff.md`, change the HTML, re-test only that screen), and what "fixed" means (the check passes with the number shown).
If there are no open problems, write "Next actions: none" and say which audit run this was (1st or 2nd clean run).

## Step E. Do the next actions yourself, then audit again
Do not hand the list back to the user. Work through it from the top: fix, re-test that screen, update the sitemap and log. After the High items, run a regression sample on 5 screens from other areas to check that nothing else broke. Then audit again. Repeat.
If the same check on the same screen fails 3 times in a row, stop trying that one: record it in "Known gaps and quirks" with the evidence (the numbers and screenshots), mark the screen `Incomplete` with a note, and move on. Come back to it only if everything else is done.

## Definition of done (all of these, with evidence)
1. Every row in `sitemap.md` is `Complete`, `Not capturable` (reason verified), or `external-blocked`. No `Todo`, `In progress`, `Built (untested)` or `Incomplete` rows, except gaps recorded as stuck under Step E.
2. Every `Complete` screen has pixel difference under 1 percent and the other nine checks passing, on both desktop and phone.
3. The sitemap matches the live site: nothing on the live site is missing from the HTML, and nothing is in the HTML that the live site lacks.
4. `elearn_version_a.html` opens from disk, makes no network calls, and logs no console errors.
5. Two full audits in a row produce "Next actions: none".

## Final message to the user (short, plain)
- Where the folder is: `elearn-version-a/` with the three files.
- Counts: Complete, Not capturable, external-blocked, stuck.
- Overall pixel match, desktop and phone.
- The five worst screens, and why.
- What the user needs to do, if anything (usually: nothing, or one named login they must do themselves).
If you did not meet the Definition of done, say so in the first line, and say which items are open and what the next actions are.
