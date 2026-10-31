# SMU Learn (Super Management University) - class prototype

A term-paper prototype for a decision-architecture course: the university LMS as it is today (A) and a redesign (B), in one static page.

- `?v=A` opens version A, the as-is LMS. Screens that were captured are dated screenshots (31 Oct 2026); the rest are rebuilt in HTML from the same layout and the course data the LMS returned that day.
- `?v=B` opens version B, the redesign: Home with what is due, My Courses (present and past), Content with a topic list and preview, Assignments, Discussions, People, Quick access search, and light, dark and glass appearance.
- In the page, press `V` to switch versions, `S` for the screen list, `/` to search (B).
- Front end only: no server, no database, no network calls.
- Names and course codes are fictional. Classmates and teaching staff are characters from Harry Potter, Game of Thrones, Marvel and DC, and each course has a made-up code.

Files: `public/index.html` (the prototype), `public/a/` (earlier version A screenshots), `AUDIT.md`, `PROMPTS.md`, `REFLECTION.md`, `SCOPE.md`.

Live: https://super-management-university.vercel.app (Vercel, static, no build step; every push to main redeploys).
