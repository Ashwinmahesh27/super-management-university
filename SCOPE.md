# SCOPE.md - what we built, and what we ignored on purpose

Agreed scope (CC, 2026-09-28): **Home, Course page, PGPD registration.** Everything else in the real LMS is out of scope.
The brief warns that a whole super-app is a weak candidate ("too many decisions at once", slide 11), so we audit one decision across three screens.

## How variant A is shown
**Current:** variant A is `public/a.html`, Aarti's rebuild of the platform in HTML with masked sample data (MGMT6108 plus three placeholder courses XXX101 to XXX103), served at `/?v=A`. The earlier screenshot version of A (`public/a/`) and the `version-a-elearn/` folder were removed. Why a rebuild: the real platform sits behind the university's Microsoft 365 sign-in with multi-factor authentication, so the build tools could not load it.

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
| `PROMPTS.md` | Yes, written as we work | Entries 1 to 64 logged (Entry 65 is the next template) |
| `REFLECTION.md` | Yes, after the pilot | Draft written; members to verify and initial |
| `SCOPE.md` | No (our own) | This file |
| `README.md` | No | Short run and deploy notes; updated 2026-11-07 for the new variant A location |

## Added beyond the agreed three screens
Variant B and the rebuilt A grew past Home, Course page and PGPD registration. The additions are listed in `AUDIT.md` under "Added after building" (2026-11-08): growing tree, XP and bonus apple, Practice tab with mock quizzes, Course Readings page, global announcement banner, master search (Cmd/Ctrl+K), 38 extra screens for pages in the team's Word documents, and parity with every Version A screen. They are outside the audited elements and outside M1 to M3.
