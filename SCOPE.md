# SCOPE.md - what we built, and what we ignored on purpose

Agreed scope (CC, 2026-09-28): **Home, Course page, PGPD registration.** Everything else in the real LMS is out of scope.
The brief warns that a whole super-app is a weak candidate ("too many decisions at once", slide 11), so we audit one decision across three screens.

## How variant A is shown
**Update 2026-11-07:** the four screenshots in `public/a/` were deleted and variant A was replaced by a standalone page, `version-a-elearn/elearn_version_a.html`: the as-is LMS rebuilt in HTML from the live site, with masked sample data, 76 screens at phone, tablet and desktop widths. Its notes and build scripts are in `version-a-elearn/`. The deployed page (`public/index.html`) now shows variant B only and no longer links to A.

**Earlier approach (replaced):** variant A was four screenshots of the live LMS, captured 2026-09-28, with the student name and a slide password removed. They were in `public/a/` (deleted 2026-11-07): `home.jpg`, `course-home.jpg`, `course-readings.jpg`, `pgpd.jpg`. Clickable areas: Home → the course tile and the PGPD tile; course home → Content; any page → My Home. Everything else in the screenshots is not clickable (ignored).
Why screenshots: the LMS sits behind the university's Microsoft 365 sign-in with multi-factor authentication, so the tools could not load it to rebuild an accurate copy.

## In scope
| Screen in the prototype | Real screen it copies (captured 2026-09-28) | Screenshot file |
|---|---|---|
| Home | LMS homepage (My Home) | `01 Home.png` |
| Course page: course home | A course homepage | `02 Course home (AVG403).png` |
| Course page: Content tab and reading list | Content › Course Readings › Reading List | `03 Content.png`, `03b Content - Course Readings.png` |
| PGPD | PG Professional Development course home, and My Results | `07 PGPD course home.png`, `08 PGPD public info page.png` |

Screenshots live outside the repo (they show a real name): `/Users/chak/Desktop/28September/eLearn screenshots (2026-09-28)/`.

## Ignored (not built, not audited)
These appear as links or tabs in variant A so the layout looks right, but they do nothing.

| Screen or feature | Why it is out of scope |
|---|---|
| Assignments (list and submit page) | Captured (`04 Assignments.png`) but not audited; the due date is reflected on Home only through Finding 2 |
| Quizzes | Captured (`05 Quizzes.png`); not part of the decision |
| Calendar (full page) | Captured (`06 Calendar.png`); only the small widget appears |
| Discussions, Class info, Analytics, Tools, Links | Not part of the decision |
| ePortfolio, Locker, Competencies, Awards, Insight, Help | Home navbar items; not part of the decision |
| Message, subscription and update alerts (header icons) | Not part of the decision |
| Course selector (grid icon), "View All Courses" | Not part of the decision |
| Chat assistant (bottom-right bubble) | Not part of the decision |
| Other courses' pages (the 11 other tiles) | Only the Designing Decisions course and PGPD open |
| Learning Tools except My Results | My Attendance, Peer Evaluation, Journal, Insight do nothing |
| Microsoft 365, Google Workspace, User Links, Peer Learning, Class Schedule widgets | Shown empty or as plain links |
| Real PGPD registration form | The real process is an email; there is no form to copy (Finding 9) |
| Continuing education upsell (an earlier idea) | Dropped: it would add a second decision |

## Required .md files: status
| File | Required by the brief | Status |
|---|---|---|
| `AUDIT.md` | Yes, committed **before** any prompt for B | Draft. Severities blank, predictions to agree |
| `PROMPTS.md` | Yes, written as we work | Started, entries 1 to 4 |
| `REFLECTION.md` | Yes, after the pilot | Template only |
| `SCOPE.md` | No (our own) | This file |
| `README.md` | No | Short run and deploy notes; updated 2026-11-07 for the new variant A location |
