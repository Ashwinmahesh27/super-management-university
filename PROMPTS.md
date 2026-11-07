# PROMPTS.md - SMU Learn (LMS) · Group [N]
**Members:** CC = Chak, [AB = name], [CD = name], [EF = name]
**Live link:** https://super-management-university.vercel.app (Vercel Hobby, account c-c-for-code, imported from this repo on 2026-09-28)
**Tool used so far:** an AI browser agent (Aside, a Claude model) with access to the course folder and CC's logged-in LMS. We logged its prompts here in the same format as AI Studio prompts.

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
**Principle check:** W2 goal setting (proposed), not yet checked at source.

## Entry 3 - repo, course materials, KPIs, start · 2026-09-28, ~14:35 · sent by CC · Aside
```
we're doing eLearn, create a repo titled eLearn-improved or somethign, refer the course maerials , give is a list of KPIs to agree on then start ethe redesing
```
**What came back:** The agent read the syllabus, the Week 1 to 4 slides and the Week 6 term-paper brief. It flagged three conflicts with the brief: (1) a real brand name is a trap (slide 16), so it used the fictional "Wrenfield" brand and the repo name `wrenfield-learn` (renamed by CC on 2026-09-28 to "SMU - Super Management University", repo `super-management-university`); (2) variant B must wait until AUDIT.md is committed (slide 40); (3) the brief wants one decision, not a whole site (slide 11). It captured dated screenshots of the real LMS.
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** W1 pre-registration (A/B test order).

## Entry 4 - narrow the scope · 2026-09-28, ~14:50 · sent by CC · Aside
```
Based off course readings, there should be some kind of goal gradient effect for the course readings completed. [...] Just do: Home page, Course page, PGPD registration. WE can ignore all else, but keep a track of .md files ignored
```
**What came back:** Variant A of the three screens, a consent screen and a debrief. SCOPE.md lists every ignored screen. A draft AUDIT.md has 10 findings; Finding 3 is the reading-list goal gradient ("100% complete" after one click).
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** W2 goal gradient (Kivetz, Urminsky & Zheng 2006, cited in the Week 6 brief; Zhou & Soman 2003, Week 1 slides).

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
**What came back:** The brand, logo mark and repo were renamed (`super-management-university`). The agent warned that "SMU" matches the real university's initials, so markers may read it as the real brand (brief, slide 16), and suggested we explain the parody in the paper. It also listed every deliverable in the brief.
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** none: production only.

## Entry 7 - A from screenshots · 2026-09-28, ~17:50 · sent by CC · Aside
```
for now, what you can do is take screenshots of the current eLearn page and use that on the web site, say because of the MS365 security issue we were unable to created version A which was the source copy as accurately, so we used screenshots and prompting instead
```
**What came back:** Four fresh full-page screenshots (Home, course home, Content › Course Readings, PGPD). The student name, avatar, one slide password and a staff name were removed before capture. Variant A now shows these images with clickable areas. A method note is on the consent screen and in AUDIT.md, SCOPE.md and README.md. The HTML rebuild stays in the repo as the base for B.
**Our judgement, and what we changed next:** [CC to fill in]
**Principle check:** none: production only. Risk noted: the screenshots show the real university logo (brief, slide 16).

## Entry 8 - host on Vercel, keep private · 2026-09-28, ~18:10 · sent by CC · Aside
```
Once this is done, do not share it with prof roh; private repo, host it on vercel, share me the link
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

## Entry 11 - commit the new variant A to the repo · 2026-11-07 · sent by [initials] · Aside
```
commit version a to this git hub repo : https://github.com/c-c-for-code/super-management-university
commit version a changes to this repo https://github.com/c-c-for-code/super-management-university
```
**What came back:** Git is not installed on this machine, so the files were added through GitHub's web upload in the signed-in browser. A new folder `version-a-elearn/` holds the standalone page `elearn_version_a.html`, `sitemap.md`, `handoff.md`, `session_handoff.json`, `BOOT.md` and the build scripts. It sits outside `public/`, so the deployed page was not changed.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** none: production only.

## Entry 12 - replace the old variant A with the finalized folder · 2026-11-07 · sent by [initials] · Aside
```
Can you update the GitHub repo with the contents in this device, this particular folder? Ignore version A that was old, replace it entirely with what we finalized here.
If the issue is a web approves 25 MB file limit, break it down and then upload the shared.json file. Do this for other files as well. I just want the version A uploaded alone. Ignore deployment on Vercel.
```
**What came back:** The folder "To share" (257 files) was uploaded as `version-a-elearn/`, replacing the earlier partial upload. The one file over the 25 MB web limit, `shared.json` (57 MB), was split into three parts (20, 20 and 17 MB); `build.js` reads the parts directly. Every uploaded file was fetched back and matched the local copy byte for byte. Vercel was not touched.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** none: production only.

## Entry 13 - delete the old variant A · 2026-11-07 · sent by [initials] · Aside
```
Delete the old version A screenshots and the old version A files. I just want the new version A files to be stored on the repo alone.
[answer to the follow-up question "what should the repo hold when I'm done?": "Keep B, remove old A"]
```
**What came back:** The four screenshots in `public/a/` were deleted. Variant A was cut out of `public/index.html` (its screens and clickable areas, the A/B toggle, the V and H keys, 43 of the 54 embedded screenshots); the page went from 5.4 MB to 1.4 MB. Variant B was kept. In a local test all 54 B screens showed the same text as before and there were no console errors. Entering `?v=A` or an old `#a/` link now opens B.
**Our judgement, and what we changed next:** [to fill in] Note: the deployed page no longer has an A arm for the A/B test (AUDIT.md, 2026-11-07).
**Principle check:** W1 randomisation: without an A arm on the page the test cannot run as planned; the group needs to decide how A is shown to testers.

## Entry 14 - bring the four notes up to date · 2026-11-07 · sent by [initials] · Aside
```
edit them as well- merge these 4 files of old version a with new version B
```
**What came back:** `AUDIT.md` got a dated entry under "Added after building" and nothing above that heading changed. `SCOPE.md` now describes the new variant A and keeps the screenshot approach as "earlier approach". `README.md` was updated in the previous step. This file got entries 11 to 14. `REFLECTION.md` got a dated note. The notes were kept as four separate files, because the brief asks for them by name; they were not combined into one.
**Our judgement, and what we changed next:** [to fill in]
**Principle check:** none: documentation only.

## Entry 15 - [next prompt] · [date, time] · sent by [initials] · [tool]
