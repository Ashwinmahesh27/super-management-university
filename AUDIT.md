# AUDIT.md - SMU Learn (a university LMS, parody brand) · the decision: what to do before this week's class

> **DRAFT, not yet agreed.** Severity ratings are blank on purpose: each member rates alone first (brief, slide 22).
> Predictions marked `[to agree]` are proposals. Once the group signs off, commit this file **before any prompt for variant B**.
> From that commit on, nothing above "Added after building" changes.

**Group:** [N] · **Members:** CC = Chak, [AB], [CD], [EF]
**Screenshots taken:** 2026-09-28, MacBook, Chrome, the real LMS (D2L Brightspace, live version on that date). Kept outside this repo because they show a real student's name: `Desktop/28September/eLearn screenshots (2026-09-28)/`. The paper uses cropped, name-blurred copies.
**Brand in the prototype:** fictional ("SMU - Super Management University", "SMU Learn" (a parody name chosen by CC)), per the brief. Course codes and the student are made up too.
**How variant A was made:** the real LMS sits behind the university's Microsoft 365 sign-in, with multi-factor authentication. Our design and build tools could not load those pages, so we could not rebuild A as an accurate source copy. A is therefore four dated screenshots of the live site (28 Sep 2026, student name and one slide password removed), with clickable areas added by prompting (`public/a/`). The same note appears on the consent screen. Our first HTML rebuild of A (`src/screens/Home.jsx`, `Course.jsx`, `Pgpd.jsx`) is kept as the starting layout for B.
**Scope:** three screens only: Home, Course page (course home + Content tab), and PGPD (professional development workshops). Everything else is out of scope; see `SCOPE.md`.

**Decision sentence:** When a postgraduate student opens the LMS in a normal week, and decides what to do before the next class (which readings to do, what is due, whether they are on track for the workshop requirement), the screens make "nothing to do" the easiest conclusion. They do it through missing and saturated progress cues (W2 goal gradient), misleading completion labels (W5) and a loss-framed wall of rules (W4).

---

## KPIs `[to agree]`

### Why the organisation cares (real-world outcomes; argued in the paper, not measured in the prototype)

| # | KPI | Brief's behaviour | Definition |
|---|---|---|---|
| K1 | Weekly reading completion | Renewal (weekly re-engagement) | Readings marked read before class ÷ readings set for that class |
| K2 | On-time work rate | Renewal | Assignments and quizzes done before the deadline ÷ all due |
| K3 | PGPD on-track rate | Purchase frequency (workshops signed up for each term) | Share of students with at least one workshop per term until 4 are done |
| K4 | Continuation to the next term | Renewal (long run) | Share of students who re-enrol the next term; the business case for K1 to K3 |

### What the prototype measures, A against B (the test)

| # | Metric | Type | Source in the app |
|---|---|---|---|
| M1 | Share of testers who correctly state how much of the reading list Alex has finished ("About a third") | **Primary** | Debrief question 1 |
| M2 | Share of testers who correctly state how many PGPD workshops Alex still needs ("3") | Secondary | Debrief question 2 |
| M3 | Share of testers who open the reading list during the session | Secondary (behaviour) | Observed by the facilitator (no in-app record) |
| G1 | Felt pressure, 1 to 5 | **Guardrail:** B is not higher than A by more than 0.5 | Debrief question 3 |
| G2 | Seconds in session | Guardrail: B is not longer than A by more than 30% | Timed by the facilitator |

**Assignment:** random at page load, kept in localStorage; `?v=A` or `?v=B` overrides it for demos.
**Sample size:** with M1 expected at 30% in A and 60% in B, the brief's table gives 42 per arm (84 in total, α = .05, power = .80). If we reach fewer, we call it a pilot.
**Ethics:** consent screen first; no names, emails or real data; the debrief says the student and the progress figures were made up.
**Collection:** no network calls. The debrief tells each tester only which design they saw (A or B). Answers are not stored, so the pilot needs a separate form (open question 5).

---

## Home

## Finding 1 - Nothing on Home says what is due this week
- **Where:** Home. The top-left widget is Announcements ("There are no announcements to display."), then My Courses: 12 tiles on the default "All" tab, mixing this term's four courses with old and admin courses.
- **What the user sees and does:** They scan the tiles, pick a course by name and go looking. Nothing on Home shows the next class, readings left or items due.
- **Principle:** W2 goal setting. Visible, proximal goals and deadlines drive effort (Week 1 slides, NSF "no deadline" case; Week 2 readings).
- **Mechanism, whose goal wins:** No goal is visible at the point of decision, so the default is to browse or leave. Neither side wins: the student falls behind and the school loses engagement. · MISSED NUDGE
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [how often / cost / learn around it / trust]
- **Repair (what should be true afterwards):** A "This week" panel above My Courses, one row per current course: next class, readings left for it, items due, with a link to the next unread reading. Old courses fold under "All".
- **Prediction `[to agree]`:** M3 moves from about 35% in A to 60% in B. We drop this repair if G2 rises more than 30%.

## Finding 2 - "Work To Do" is empty while work is due
- **Where:** Home, right column, the "Work To Do" widget.
- **What the user sees and does:** An empty widget. On the capture date the real account had an assignment due that day at 3:00 PM (not submitted) and one quiz not attempted. Both were visible only inside the course.
- **Principle:** W3 expectations. An empty to-do sets the reference point "nothing is due", and people read later cues to fit it (Ariely ch. 9).
- **Mechanism, whose goal wins:** False reassurance at the one place students check first. Nobody's goal wins. · MISSED NUDGE
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [cost]
- **Repair:** Work To Do lists every item due in the next 7 days across current courses, soonest first, with the time left in plain words.
- **Prediction `[to agree]`:** Share of testers who name the next deadline correctly moves from about 20% to 70%. (Needs a debrief question if we keep it; see open question 2.)

---

## Course page

## Finding 3 - The reading list reads "100% complete" after one click
- **Where:** Course page › Content › "Course Readings". The module holds one topic, "Reading List" (an external tool). Opening it once gives "1 of 1 topics complete", a full progress bar at 100% and a tick in the table of contents.
- **What the user sees and does:** A student who has read 6 of 19 readings sees 100% and a green tick, and has no reason to go back.
- **Principle:** W2 goal gradient. Effort rises as people near a goal (Kivetz, Urminsky & Zheng 2006, cited in the Week 6 brief). Finer-grained progress raises perceived progress and completion (Zhou & Soman 2003, Week 1 slides: 40 pages of 10 lines beat 20 pages of 20 lines).
- **Mechanism, whose goal wins:** The goal is marked reached at the first step, so there is no gradient left to climb. Neither side's goal wins. · MISSED NUDGE (the tool exists but counts the wrong thing)
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [how often: every student, every week]
- **Repair:** Count readings, not clicks. "6 of 19 readings read" for the course, broken into weekly chunks ("Week 4: 3 of 4"), a mark-as-read tick on each reading, and one proximal goal line for the next class ("Before Week 7: 0 of 2 read, plus 5 earlier ones open").
- **Prediction `[to agree]`:** M1 moves from about 30% in A to 60% in B. We drop this repair if G1 (pressure) rises by more than 0.5.

## Finding 4 - "Complete" means "opened"
- **Where:** Course page › Content, every module. "You have viewed this topic" turns into a completed task and a green tick.
- **What the user sees and does:** Opening a slide deck or link counts as done. Students treat the ticks as "I've done this week's prep".
- **Principle:** W5 labelling. The label "complete" sets what the action means, and people act on the label (Alter, Drunk tank pink, ch. 2: Labels).
- **Mechanism, whose goal wins:** The label flatters the student and inflates the course's completion analytics. In the short run the platform's numbers look good and the student feels fine. · GREY
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [trust]
- **Repair:** Rename it to "Opened". For readings, keep "Read" for a deliberate tick by the student.
- **Prediction `[to agree]`:** Folded into M1 (tested together with Finding 3).

## Finding 5 - Rules before learning
- **Where:** Course page (course home). After Learning Tools and an empty Announcements widget, the first content is two walls of text: a copyright statement (about 170 words) and the academic integrity reminder ("serious penalties, including expulsion").
- **What the user sees and does:** They scroll past it every visit. The only calendar item ("Upcoming events") sits in the narrow right column.
- **Principle:** W4 framing. Loss-framed messages shape what people attend to and can backfire (Kern & Chugh 2009, "Bounded ethicality: the perils of loss framing").
- **Mechanism, whose goal wins:** The school's legal goal is served; the student pays in attention every visit. · GREY
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [how often]
- **Repair:** Put "This week in this course" (next class, readings left, items due) at the top. Copyright and integrity become one line with a link at the bottom, still one click away.
- **Prediction `[to agree]`:** Time to first reading opened (G2 / M3) falls. No separate metric.

## Finding 6 - Keep: module ticks and the topic progress bar
- **Where:** Course page › Content: the green ticks in the table of contents and "n of m topics complete" in each module.
- **What the user sees and does:** A quick sense of which weeks are done.
- **Principle:** W2 goal gradient, the same cue we repair in Finding 3.
- **Mechanism, whose goal wins:** Serves the student when a topic is a real unit of work. · NUDGE
- **Severity 0-4:** 0 · keep it.
- **Repair:** None. Variant B keeps the tick and bar pattern and only changes what is counted for readings.

---

## PGPD (professional development workshops)

## Finding 7 - A graduation requirement with no personal status
- **Where:** PGPD course home. The rule ("4 full-day PGPD workshops ... compulsory graduation requirement") sits in paragraph two of an announcement posted in 2021.
- **What the user sees and does:** They read a long notice. It never says how many they have done or how many are left.
- **Principle:** W2 goal setting and goal gradient. A goal with no visible distance to go gives no pull (Kivetz et al. 2006).
- **Mechanism, whose goal wins:** Students drift and bunch up in their last term; the programme office chases late finishers. Neither side's goal wins. · MISSED NUDGE
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [cost: delayed graduation]
- **Repair:** A status card at the top: "1 of 4 workshops done · 3 to go", with four slots filled or empty, plus the workshop name and term for each one done.
- **Prediction `[to agree]`:** M2 moves from about 15% in A to 70% in B.

## Finding 8 - Progress is three clicks deep
- **Where:** PGPD › Learning Tools › My Results › Course dropdown › "PG Professional Development Course".
- **What the user sees and does:** Most never find it. The official help page has to spell out the steps.
- **Principle:** W2 goal visibility (Week 1 and 2 slides). Recall, not recognition.
- **Mechanism, whose goal wins:** Nobody wins; students ask the office by email. · MISSED NUDGE
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [learn around it]
- **Repair:** Covered by the Finding 7 card. My Results stays as it is.
- **Prediction `[to agree]`:** Folded into M2.

## Finding 9 - Sign-up happens by email, first come first served
- **Where:** PGPD announcement: "Please look out for email notifications to sign up for workshops on a first-come-first-served basis."
- **What the user sees and does:** Nothing to do on the page. Registration depends on catching one email in time.
- **Principle:** W2 goal setting, turned into action with a planning prompt and a reminder at a time the student picks (Week 6 brief, "engage slow thinking": planning prompts, reminders).
- **Mechanism, whose goal wins:** Students who miss the email slip a term. The office fills seats, but not evenly. · MISSED NUDGE
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [cost]
- **Repair:** "Next round: registration opens [date]" with "Remind me" (the student picks the day and time) and the list of open topics. No countdown timer and no fake scarcity (brief, slide 16).
- **Prediction `[to agree]`:** Share of testers who choose "Remind me" or open a topic: no A baseline (A has no control). We report B only, as a pilot.

## Finding 10 - Loss-framed rules come first
- **Where:** PGPD announcement notes: "No exemption will be allowed", "fail grade", "would need to retake".
- **What the user sees and does:** Penalties come before any sense of progress.
- **Principle:** W4 framing (Kahneman ch. 34; Kern & Chugh on loss framing).
- **Mechanism, whose goal wins:** It serves the office's compliance goal, but may raise anxiety without raising sign-ups. · GREY
- **Severity 0-4:** CC [ ] · AB [ ] · CD [ ] · EF [ ] · agreed [ ] · driver: [trust]
- **Repair:** Lead with progress (Finding 7). Keep every rule word for word under "Rules and assessment", one click away.
- **Prediction `[to agree]`:** G1 (pressure) is lower in B than in A.

---

## Where our own B could turn into sludge (write before building)
- A "2 left before Monday" line could become nagging if repeated on every screen. We show it once per course.
- A social-norm line ("most of your class has read this") is left out: the count would be simulated, and the brief flags unverified norms as sludge (slide 16; W9 comes after recess).
- Endowed progress (starting a student at 1 of 5) is only honest if step 1 is real. We use none.

## Open questions for the group
1. Do we agree the primary metric is M1 (reading progress accuracy), or should it be M3 (behaviour: opening the list)?
2. Keep Finding 2 in B? It needs a fourth debrief question.
3. Do we pilot on classmates only (a pilot), or recruit beyond the class to reach 42 per arm?
5. How do we collect answers? The debrief only shows A or B (CC's call, 2026-09-28). Options: a short Google Form linked from the debrief, or a facilitator writes them down.
4. A is now real screenshots, so A shows a real student's reading status, not the fictional student's. Should M1 count "All of it" (believing the 100% bar) as the A error, instead of scoring against the fictional answer?

## Added after building
[Dated. From the first prompt for B, nothing above this heading changes.]

### 2026-11-07 - variant A replaced; the deployed page now shows B only
- The four screenshots of variant A (`public/a/`) and the old variant A inside `public/index.html` (its screens and clickable areas, the A/B toggle in the masthead, the `?v=A` link and the V and H keys) were deleted.
- Variant A was replaced by a new standalone page, `version-a-elearn/elearn_version_a.html`: the as-is LMS rebuilt in HTML from the live site, with masked sample data, 76 screens at phone, tablet and desktop widths. Its notes, sitemap and build scripts are in `version-a-elearn/`. It is stored in the repo but is not served by the page.
- Effect on the test above: the deployed page no longer has an A arm. Random assignment, `?v=A` and the A baseline for M1 to M3 do not run on the live page. Everything above this heading is left as written, because it records what was agreed and predicted.
- Open question 4 (A showed a real student's reading status) no longer applies to the new A, which uses masked sample data. Whether the new A can serve as the M1 baseline has not been checked.
- Decision for the group: to run the pilot, link or re-add A to the page, or compare B with the standalone A some other way.
- Variant B was checked after the change: all 54 screens show the same text as before the edit, with no console errors.
