# WeLearn (Super Management University) - class prototype

A term-paper prototype for MGMT 6108: one site with an as-is learning platform (Version A) and a redesign (Version B). Names, courses, dates and people are fictional samples.

- `public/index.html`: router, consent screen and debrief. `/?v=A` shows Version A, `/?v=B` shows Version B; with no `?v` one is picked at random and remembered.
- `public/a.html`: Version A (WeLearn as it is, rebuilt with masked sample data).
- `public/b.html`: Version B (the redesign, built on A's content).
- `AUDIT.md`, `PROMPTS.md`, `REFLECTION.md`, `SCOPE.md`: the audit, prompt log, reflection and scope notes.

Consent is shown once per browser on the live site and skipped on localhost. The Finish button opens the debrief, which names the variant seen. Shift+V shows an A/B switch; it is a prototype review aid, not for participants.

Front end only: no server, database, API keys or login. No AI model runs in the prototype; the Practice quizzes and the study helper use pre-written text.

Live: https://super-management-university.vercel.app (Vercel, static, no build step).
