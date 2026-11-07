# WeLearn (Super Management University) - class prototype

A term-paper prototype for MGMT 6108 Decision Architecture for Managers: one site that shows the as-is LMS (version A) and a redesign (version B). Names, courses, dates and people are fictional samples.

- One address: `/?v=A` shows version A, `/?v=B` shows version B. With no `?v`, a version is picked at random and kept for the visit. A consent screen comes first, and the Finish button opens the debrief.
- Version B is rebuilt on version A's own content (same courses, announcement, due items, schedule and course tabs), rearranged so the audited elements stand out: a visible "x of y" count, the next deadline, and one primary action.
- Front end only: no server, no database, no API keys, no login.

Files: `public/index.html` (router, consent, debrief), `public/a.html` (version A), `public/b.html` (version B), `AUDIT.md`, `PROMPTS.md`, `REFLECTION.md`, `SCOPE.md`, `vercel.json`.

Live: https://super-management-university.vercel.app (Vercel, static, no build step; every push to main by the project owner redeploys).
