# SMU Learn (Super Management University) - class prototype

A term-paper prototype for a decision-architecture course. It copies three screens of a university LMS under a fictional brand: Home, a Course page and the PGPD workshop page. The aim is to test a redesign of how students decide what to do before class.

- `?v=A` shows the current design as dated screenshots of the live LMS (the LMS sits behind a Microsoft 365 sign-in, so the tools could not rebuild an accurate copy), `?v=B` the redesign (**B is not built yet**; it waits for `AUDIT.md`).
- With no `?v`, each visitor is assigned A or B at random once, kept in localStorage.
- Front end only: no server, no database, no network calls, no personal data.

Files: `AUDIT.md` (findings and predictions), `PROMPTS.md` (AI prompts log), `REFLECTION.md`, `SCOPE.md` (what we ignored).

## Run
```
npm install
npm run dev
```
Deploy: import the repo on Vercel with the Vite preset. No environment variables.

Note: `package.json` pins esbuild and rollup to their WebAssembly builds (see `overrides`). This works on any machine, including ones that block native binaries. Vercel builds it the same way.
