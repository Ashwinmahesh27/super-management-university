# SMU Learn (Super Management University) - class prototype

A term-paper prototype for a decision-architecture course: a redesign of the university LMS (version B), in one static page. Version A, the as-is LMS, is no longer part of this page: the finalized standalone Version A is stored separately in `version-a-elearn/` (single-file prototype, sitemap, handoff notes and build scripts).

- The page opens version B, the redesign (`?v=B` also works): Home with what is due, My Courses (present and past), Content with a topic list and preview, Assignments, Discussions, People, Quick access search, and light, dark and glass appearance.
- In the page, press `S` for the screen list and `/` to search.
- Front end only: no server, no database, no network calls.
- Names and course codes are fictional. Classmates and teaching staff are characters from Harry Potter, Game of Thrones, Marvel and DC, and each course has a made-up code.

Files: `public/index.html` (the prototype), `version-a-elearn/` (version A: standalone prototype and notes, not deployed), `AUDIT.md`, `PROMPTS.md`, `REFLECTION.md`, `SCOPE.md`.

Live: https://super-management-university.vercel.app (Vercel, static, no build step; every push to main redeploys).
