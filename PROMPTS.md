# PROMPTS.md - eLearn decision-architecture project · Group [N]
**Members:** CC, Aarti, [CD], [EF]
**Live link:** https://super-management-university.vercel.app (Vercel Hobby, imported from the group repo on 2026-09-28)
**Tools used:** an AI browser agent (Aside) with access to the course folder and the logged-in LMS, used from the start of the project to the draft paper. Design in Figma (the Variant B design file is in progress). The Variant B plan also names the university's Gemini account for starter prompts; that is proposed, not built.
**How to read this log:** entries run in time order, from choosing the product (Entries 1 to 10), through ideation on the My Results page, 25 Oct (Entries 11 and 12; findings written up in the Google Doc "My findings"), the build and hand-off of Variant A (Entries 13 to 21), to the draft paper (Entries 22 to 28). Each entry has the prompt as sent, what came back, our judgement, and a principle check. The principle checks refer to the course readings and the course presentations in general terms on purpose. Text in square brackets is still to be filled in by the group.

---

## Entry 1 - pick a company · 2026-09-28, ~14:15 · sent by CC · Aside
```
Help us with the assignment for the term paper, we need to choose a company [...] Increase profit margin, policy intervention, mock up of current existing site and make it better from there. Need a KPI [...] 1. Purchase more frequency 2. Improve renewal [...] Ideas: Change eLearn? F & B company; google engine; Facebook
```
**What came back:** It suggested a grocery site (FairPrice Online) and said the LMS had "no profit or renewal".
**Our judgement, and what we changed next:** We chose the LMS anyway. Renewal = weekly re-engagement and continuing to the next term.
**Principle check:** none: product choice only.

## Entry 2 - we're doing the LMS · 2026-09-28, ~14:25 · sent by CC · Aside
```
We're doing eLearn
```
**What came back:** A reframe (renewal = weekly engagement and retention; purchase = continuing education) and a first KPI table.
**Our judgement, and what we changed next:** Accepted the renewal framing. Dropped the continuing-education upsell later (Entry 4) to keep to one decision.
**Principle check:** W2 goal setting (proposed), not yet checked against the course readings.

## Entry 3 - repo, course materials, KPIs, start · 2026-09-28, ~14:35 · sent by CC · Aside
```
we're doing eLearn, create a repo titled eLearn-improved or somethign, refer the course maerials , give is a list of KPIs to agree on then start ethe redesing
```
**What came back:** The agent read the syllabus, the early course presentations and the term-paper brief. It flagged three conflicts with the brief: (1) a real brand name is a trap, so it used the fictional "Wrenfield" brand and the repo name `wrenfield-learn` (renamed by CC on 2026-09-28 to "SMU - Super Management University", repo `super-management-university`); (2) variant B must wait until AUDIT.md is committed; (3) the brief wants one decision, not a whole site. It captured dated screenshots of the real LMS.
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** W1 pre-registration (A/B test order), as set out in the course brief.

## Entry 4 - narrow the scope · 2026-09-28, ~14:50 · sent by CC · Aside
```
Based off course readings, there should be some kind of goal gradient effect for the course readings completed. [...] Just do: Home page, Course page, PGPD registration. WE can ignore all else, but keep a track of .md files ignored
```
**What came back:** Variant A of the three screens, a consent screen and a debrief. SCOPE.md lists every ignored screen. A draft AUDIT.md has 10 findings; Finding 3 is the reading-list goal gradient ("100% complete" after one click).
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** W2 goal gradient, based on the course readings and the early course presentations.

## Entry 5 - status check · 2026-09-28, 16:51 · sent by CC · Aside
```
Status update
```
**What came back:** The Ideation deadline had moved to 11:59 PM that day. No new commits.
**Our judgement, and what we changed next:** None.
**Principle check:** none: production only.

## Entry 6 - rename the brand; list the deliverables · 2026-09-28, ~17:00 · sent by CC · Aside
```
Don't call it wrenfield, call it SMU - Super Management University. check what else the assignemnt is asking for as a delievrable
```
**What came back:** The brand, logo mark and repo were renamed (`super-management-university`). The agent warned that "SMU" matches the real university's initials, so markers may read it as the real brand, and suggested we explain the parody in the paper. It also listed every deliverable in the brief.
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** none: production only.

## Entry 7 - A from screenshots · 2026-09-28, ~17:50 · sent by CC · Aside
```
for now, what you can do is take screenshots of the current eLearn page and use that on the web site, say because of the MS365 security issue we were unable to created version A which was the source copy as accurately, so we used screenshots and prompting instead
```
**What came back:** Four fresh full-page screenshots (Home, course home, Content › Course Readings, PGPD). The student name, avatar, one password shown on a page and a staff name were removed before capture. Variant A showed these images with clickable areas. A method note is on the consent screen and in AUDIT.md, SCOPE.md and README.md. The HTML rebuild stays in the repo as the base for B.
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** none: production only. Risk noted: the screenshots show the real university logo, which the brief warns against.

## Entry 8 - host on Vercel, keep private · 2026-09-28, ~18:10 · sent by CC · Aside
```
Once this is done, do not share it with the professor; private repo, host it on vercel, share me the link
```
**What came back:** Imported to Vercel (Hobby, Vite preset). Live at https://super-management-university.vercel.app. The repo stays private.
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** none: production only.

## Entry 9 - A/B toggle in the masthead · 2026-09-28, ~18:25 · sent by CC · Aside
```
I want to view optioni A vs B as a toggle on the masthead
```
**What came back:** A dark bar at the top with "A Current / B Redesign". It shows only on links with ?v= (review links). The bare URL, which participants get, keeps random assignment and hides the bar, so testers cannot switch arms. B shows a "not built yet" card listing the planned repairs. The debrief code marks a toggled session with "t".
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** W1 randomisation: a switcher visible to testers would break the A/B test, so it is review-only.

## Entry 10 - no result code · 2026-09-28, ~19:18 · sent by CC · Aside
```
I dont wnat to enter a code, just a or b   [with a screenshot of the debrief's "A-A-3-5-4-x-x-7" result code]
```
**What came back:** The result code is removed. The debrief now says only "You saw design A" (or B), with one line on what that design is.
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** W1 test plan: answers are no longer captured in the app, so the pilot needs a form or a facilitator (AUDIT.md open question 5).

## Entry 11 - ideation: walk the My Results page as the user · 2026-10-25, [time] · sent by Aarti · Aside
```
[with a screenshot of the My Results page, 25 Oct 2026. Not reproduced here because it shows a real name and campus ID.]
Above is a screenshot of the My Result page. Walk it as the user, keeping in mind that it's for decision architecture: how each element is influencing the user to make a decision through eLearn.
```
**What came back:** A walk-through of the page as the student. The My Result audit that followed (Google Doc "My findings", dated 31 Oct) opens by naming the one decision the page serves: after seeing my result, where do I stand in this course, and what do I do next? The options are to request a review, change effort on what remains, or do nothing. It then went element by element: the result table, the blank columns, the raw score, the class comparison, the labels, the header with name and ID. [Aarti to check this summary against the chat reply.]
**Our judgement, and what we changed next:** The walk-through showed that the page serves the decision poorly, so the findings were written up element by element, in six lines each, in the Google Doc "My findings" (Entry 12).
**Principle check:** W2 goal setting, W3 expectations, W4 framing and defaults, applied as in the course readings and presentations; Nielsen's heuristics used as a separate lens.

## Entry 12 - ideation: what is missing on My Results · 2026-10-25, [time] · sent by Aarti · Aside
```
I noticed that the My Results page did not have any sort of goal. It did not have any sort of bar or mark to show where we currently are compared to the class average. There was no dashboard. There should have been a dashboard.
Second, it does not show the class average. If it showed the class average, I feel it would give some kind of motivation. It could backfire too, but there should be something, some kind of dashboard.
It also shows results only until one semester, say semester one or semester two, but it should show all results from semester one onwards, until semester four or five, so you can see the gradual progress, or where you are lacking, and subject-wise.
It should also break down my score component by component. Right now only some subjects show the components; for every subject it should show the component-wise grading.
It should include the behavioural audit, six lines, for each finding and feature.
```
**What came back:** The Google Doc "My findings" (the My Result audit, later dated 31 Oct): eleven findings, each in six lines (where; what the user sees and does; principle and reading; mechanism and whose goal wins; severity; repair), with a summary table of severities. The highest-rated (severity 3) were the empty Grade, Weight, Average, Min and Max columns, the raw "11/15" with no link to the course goal, and no next step after the result. The class average was written up as a reference point that could help or backfire depending on where the student sits, with a "Compare with class" toggle as the repair. [Aarti to confirm this is the reply to this prompt.]
**Our judgement, and what we changed next:** Two of the observations in this prompt are not yet in the audit: (a) results are shown for one semester at a time, with no progress view across all semesters and subjects; (b) the score is broken into components for some subjects only. They should become two new My Results findings with six lines each and repair codes. [to fill in]
**Principle check:** W2 goal gradient (no goal bar or dashboard); W3 expectations (blank columns); W4 reference points and W9 social norms (class average, which can motivate or discourage, and may differ by group, W10), all as in the course readings and presentations.

## Entry 13 - rebuild Variant A from the live site as an offline page · 2026-11-06, [time not recorded] · sent by Aarti · Aside
```
[Exact prompt to be pasted. It asked for an offline, standalone HTML copy of eLearn with the sample course MGMT6108 and the global pages, with inline CSS and JavaScript, checked against the live site on desktop and phone for content, structure, geometry, styles, interactions and breakpoints, including menus and dropdowns on both layouts.]
```
**What came back:** A standalone page with no network calls. The university name became "Your University" with a neutral crest, the account name "Student", staff names "Sample Instructor" and "Sample Staff", and emails student@example.com. Measured breakpoints on the live site were 767 px (phone drawer) and 1099 px (tablet to desktop). The first pixel comparison averaged about 5% on desktop and 9% on phone, mostly because the first capture used a different root font size from the live site.
**Our judgement, and what we changed next:** We re-captured at the live font size. [to fill in]
**Principle check:** none: production only. Privacy: the masking was part of the build, because the real account shows a name and campus ID (see the background section of the paper).

## Entry 14 - narrow Variant A to one sample course · 2026-11-07, 00:58 · sent by Aarti · Aside
```
[Exact prompt to be pasted. It dropped the three older courses from Variant A, kept Decision Science (MGMT6108) as the one sample course, said it is fine to present the data as sample data, and asked for the eLearn pages only, not the worst screens.]
```
**What came back:** The three older courses were archived and left out of the page (they also returned 403 on the live site). The page covers 76 screens in three layouts (phone 390 px, tablet 820 px, desktop 1440 px). Grades is marked "not capturable" because the live site returned 403 for this account. A later audit run averaged about 1.8% pixel difference on desktop, 2.4% on tablet and 3.0% on phone, and the page is marked Incomplete because not every check passes yet.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** none: production only.

## Entry 15 - prepare a hand-off copy · 2026-11-07, 10:19 · sent by Aarti · Aside
```
[Exact prompt to be pasted. It said the work was being handed to someone else, asked for the relevant files in a folder titled "To share", and asked for personal identifiers to be removed from the shared copy.]
```
**What came back:** A "To share" folder with the standalone page, a sitemap, a hand-off note and a clean project copy. Personal identifiers were scrubbed: a Windows user name in a path, real staff and instructor names, the account name in the masking rules, and two other course codes. The masking rules now read names from an environment variable. A rebuild from the shared copy gave the same 76 screens.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** none: privacy handling.

## Entry 16 - commit Variant A to the repo · 2026-11-07, 10:30 · sent by Aarti · Aside
```
commit version a to this git hub repo : https://github.com/c-c-for-code/super-management-university
commit version a changes to this repo https://github.com/c-c-for-code/super-management-university
```
**What came back:** Git was not installed on this machine, so the files were added through GitHub's web upload in the signed-in browser. A new folder `version-a-elearn/` holds the standalone page `elearn_version_a.html`, `sitemap.md`, `handoff.md`, `session_handoff.json`, `BOOT.md` and the build scripts. It sits outside `public/`, so the deployed page was not changed.
**Our judgement, and what we changed next:** [to fill in] Note: this entry paraphrases the first request, so check it against the chat.
**Principle check:** none: production only.

## Entry 17 - replace the old Variant A with the finalized folder · 2026-11-07, 10:54 · sent by Aarti · Aside
```
Can you update the GitHub repo with the contents in this device, this particular folder? Ignore version A that was old, replace it entirely with what we finalized here.
If the issue is a web approves 25 MB file limit, break it down and then upload the shared.json file. Do this for other files as well. I just want the version A uploaded alone. Ignore deployment on Vercel.
```
**What came back:** The folder "To share" (257 files) was uploaded as `version-a-elearn/`, replacing the earlier partial upload. The one file over the 25 MB web limit, `shared.json` (57 MB), was split into three parts (20, 20 and 17 MB); `build.js` reads the parts directly. Every uploaded file was fetched back and matched the local copy byte for byte. Vercel was not touched.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** none: production only.

## Entry 18 - delete the old Variant A · 2026-11-07, 11:47 · sent by Aarti · Aside
```
Delete the old version A screenshots and the old version A files. I just want the new version A files to be stored on the repo alone.
[answer to the follow-up question "what should the repo hold when I'm done?": "Keep B, remove old A"]
```
**What came back:** The four screenshots in `public/a/` were deleted. Variant A was cut out of `public/index.html` (its screens and clickable areas, the A/B toggle, the V and H keys, 43 of the 54 embedded screenshots); the page went from 5.4 MB to 1.4 MB. Variant B was kept. In a local test all 54 B screens showed the same text as before and there were no console errors. Entering `?v=A` or an old `#a/` link now opens B.
**Our judgement, and what we changed next:** [to fill in] Note: the deployed page no longer has an A arm for the A/B test (AUDIT.md, 2026-11-07).
**Principle check:** W1 randomisation: without an A arm on the page the test cannot run as planned; the group needs to decide how A is shown to testers.

## Entry 19 - bring the four notes up to date · 2026-11-07, 12:05 · sent by Aarti · Aside
```
edit them as well- merge these 4 files of old version a with new version B
```
**What came back:** `AUDIT.md` got a dated entry under "Added after building" and nothing above that heading changed. `SCOPE.md` now describes the new variant A and keeps the screenshot approach as "earlier approach". `README.md` was updated in the previous step. This file got entries for the repo steps. `REFLECTION.md` got a dated note. The notes were kept as four separate files, because the brief asks for them by name; they were not combined into one.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** none: documentation only.

## Entry 20 - save the session archive · 2026-11-07, 12:14 · sent by Aarti · Aside
```
download and save in a new folder
```
**What came back:** The session archive (a JSON record of the Variant A work) was saved to a new "Session archive" folder and checked byte for byte against the original.
**Our judgement, and what we changed next:** The request did not name a file, so the choice of file was an assumption. [to fill in]
**Principle check:** none: production only.

## Entry 21 - add the Variant A page and the four notes to the archive · 2026-11-07, 12:27 · sent by Aarti · Aside
```
the elearn html also as the well 4 notes
```
**What came back:** The Variant A page and the four notes (AUDIT.md, PROMPTS.md, REFLECTION.md, SCOPE.md) were added to the "Session archive" folder, taken from the repo and checked byte for byte.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** none: production only.

## Entry 22 - draft paper from the brief · 2026-11-07, 17:20 · sent by Aarti · Aside
```
use the above pasted text and create the term paper sample.
[the pasted text was the full term-paper brief: Parts I to XIV, covering the audit method, a nine-column audit table, a nine-column redesign table, a week-by-week matrix, a nudge-not-sludge check, prioritisation, a test plan and the required paper structure]
```
**What came back:** A 27-page draft (PDF and Word): homepage plus seven features, a nine-column audit table, a nine-column redesign table for Variant B, a week-by-week matrix, a nudge-not-sludge check, a prioritisation matrix, a test plan, limitations and references. Every journal reference was checked against Crossref; one reference that could not be verified was kept out of the list. The agent said the seven features were inferred from the group's module split because the official list was not in the files, and that severities were one rater's proposals.
**Our judgement, and what we changed next:** [to fill in] We corrected the presentation references the agent had cited, and removed a figure from a screen that rendered only as a loading placeholder in the Variant A page.
**Principle check:** W2 to W10 applied as in the course readings and presentations; Nielsen's ten heuristics as a separate column.

## Entry 23 - audit format: current design, proposed redesign, then the nine-column table · 2026-11-07, [time] · sent by Aarti · Aside
```
Follow the screenshot that I have sent for each of the elements or each of the pages. Just mention the current design right now and what our proposed redesign is, and then the table whose format I'm copy-pasting.
[with a screenshot of the Discussions tab prompt (current experience, proposed redesign) and the nine-column audit-table specification: Where; What the user sees and does; Behavioural principle; Heuristic concept; Mechanism, whose goal wins; Verdict; Severity (0 to 4); Repair, with a unique repair code per finding; Prediction. Rules: one finding per row, evidence from the actual interface, positive findings documented as positives, no invented severities or percentages, predictions kept apart from results.]
```
**What came back:** A separate audit document with a "current experience / proposed redesign" block for each element, then the nine-column table with a repair code on every row. The six findings from the My Result audit that were missing were added. All predicted percentages were removed. Severity ratings from the My Result audit were marked as the member's ratings; every other rating was marked as one rater's proposal.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** one finding per element, as in the course audit method; behavioural principles and heuristics kept in separate columns.

## Entry 24 - Variant B's core idea from the group call · 2026-11-07, [time] · sent by Aarti · Aside
```
use the transcript and make changes accordingly.
Version B's core idea: Make eLearn habit forming
[with the transcript of a group call. Not reproduced because it contains member names.]
```
**What came back:** The paper now states B's core idea (make eLearn habit forming, with a minimalist layout, a left-pane dashboard of enrolled courses, breadcrumbs, gamification across readings, quizzes, participation, discussion posts and assignments, a progress tree in the style of a well-known app, rewards, badges, a mascot with prompts and reminders, and a larger AI role in quizzes). A new finding (HB1: no recurring prompt or reward for routine actions) supports it. The nudge-not-sludge check passes a growth-only tree, student-set reminders and criterion-based badges, passes variable rewards only with guards, and does not pass a tree that falls, a rank-based "top 5%" line or the loss bar as described. The agent also added an AI-tools table, an ideation-process section, a walk-through as the user and as the architect for each page, and moved each screenshot next to its page.
**Our judgement, and what we changed next:** Two terms in the call were unclear in the transcript and are not relied on. The habit layer is described from the call, not seen in a prototype. [to fill in]
**Principle check:** W2 goal gradient; partial reinforcement and the behaviour model as set out in the class notes and readings; W9 social norms for badges; loss framing (W4) for the falling tree.

## Entry 25 - split the findings table by module · 2026-11-07, [time] · sent by Aarti · Aside
```
break the table for finidngs module wise too- it's too long currently
```
**What came back:** Table 1 was split into ten module tables (1a to 1j): Homepage, Course Home, Content, Assignments, Quizzes, Discussions, ClassList, My Results in two parts, and a cross-page table for the habit finding. The 29 findings and the nine columns are unchanged.
**Our judgement, and what we changed next:** The redesign table (Table 2) is still one long table; it can be split the same way if needed. [to fill in]
**Principle check:** none: layout only.

## Entry 26 - paper: introduction, core idea, current design per page · 2026-11-07, [time] · sent by Aarti · Aside
```
Prompts for term paper, which come after version A and the ideation process:
Introduction: decision architecture is seen in day-to-day life. As students, eLearn is something we use daily and it impacts us, which is why we chose it (more about motivation, and why it is currently weak). The core idea is that we want eLearn to be habit forming, with greater motivation and gamification.
Background: ideation process (leave this, I will add it in).
Then finally the proposed redesign:
For each page, the current design: identified elements, how it is currently lacking, element severity level, relation to the course week and readings, and the missing element.
Mention concepts such as goal gradient, progress, confirmation bias etc. wherever relevant.
```
**What came back:** [Not yet applied when this entry was written.] The v4 draft already has the introduction on decision architecture and why we chose eLearn, the habit-forming core idea, and a current-design section for each page (elements, severity, week and reading link, missing element). Confirmation bias appears only as a B element with no finding behind it (Table 5). [to update after the next edit]
**Our judgement, and what we changed next:** To do: tie the introduction more clearly to students' daily use and to why the current design is weak on motivation; add goal gradient, progress and confirmation bias wherever a finding supports them, and add a finding for confirmation bias if the screens support one. [to fill in]
**Principle check:** W2 goal gradient and progress; W3 confirmation bias and expectations; W4 framing, all as in the course readings and presentations.

## Entry 27 - paper: the seven audit steps on the main pages, and the redesign in six lines · 2026-11-07, [time] · sent by Aarti · Aside
```
Then also mention the 7 steps of the behavioural audit done (where, walk it as the user, etc. - see the My Results page uploaded in Google Drive), but this needs to be done for main pages such as the homepage, assignments, discussions.
Then the proposed redesign, explained, especially the why and whom it benefits (goal served for the user and the company). Each finding gets 6 lines in the proposed redesign (Variant B screenshot).
```
**What came back:** [Not yet applied when this entry was written.] The v4 draft lists the seven steps in a table (what was done and what was only partly met) and has a "walk it as the user" and "walk it as the architect" row for every page. It does not yet show each main page's findings in the six-line format next to a Variant B screenshot, and the "why, and whom it benefits" is in Table 2 and the nudge-not-sludge check, not per finding.
**Our judgement, and what we changed next:** To do: for the homepage, Assignments and Discussions, write each finding in six lines (where; what the user sees and does; principle; mechanism and whose goal wins; severity and driver; repair) and the proposed redesign in six lines, with the Variant B screen beside the Variant A screen. A Variant B screenshot is needed from the design file. [to fill in]
**Principle check:** the course audit method: one finding per element, six lines, severity with its driver; whose goal wins stated for the student and for the university.

## Entry 28 - paper: heuristic evaluation table and the background points · 2026-11-07, [time] · sent by Aarti · Aside
```
[from the group chat, with screenshots of the heuristic-evaluation material and of a checklist for choosing a product worth auditing]
Do a heuristic evaluation table too (but include it in the appendix, otherwise too long, but good to have this if you guys can, otherwise it's okay). In the main term paper, just mention the heuristic evaluation was done with it, showing __ in 1-2 lines.
In background we mention these 6 points, and how we masked the details for privacy concern in version A itself, reflected on decisions which affect students, and it has no real payment / data.
```
**What came back:** [Not yet applied when this entry was written.] The v4 draft has a table of the ten heuristics with where each was observed (in the main text, Table B), but no per-page heuristic evaluation table in an appendix, and the six checklist points are not yet in the background. The blank "__" needs a result from that table.
**Our judgement, and what we changed next:** To do: move the heuristic table to an appendix as a per-page evaluation (each of the ten heuristics rated for each page: violated, weakly supported or implemented, with the finding code); in the main paper add one or two lines stating the evaluation was done and what it showed (for example, how many heuristics are violated on how many pages, once counted from the table); in the background, list the six checklist points as they apply (one decision that matters; screens we can capture and date; a real stake; users we can reach for a pilot; a fictional brand; no real payments or personal data) and explain that Variant A masks the university name, account name, staff names, emails and campus ID, that the decisions it shows affect students (deadlines, results, whom to work with), and that it contains no real payment or personal data. [to fill in]
**Principle check:** Nielsen's ten heuristics as a separate lens from the behavioural principles; the heuristic evaluation predicts problems and does not replace testing with users.

## Entry 29 - [next prompt] · [date, time] · sent by Aarti · [tool]






