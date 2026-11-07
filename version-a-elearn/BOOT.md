# Re-boot the REPL (state is lost between sessions; everything important is on disk)
1. base='<abs path of elearn-version-a/>'; AF=Object.getPrototypeOf(async function(){}).constructor; BP={m:767,t:1099}.
2. Start the audit server (the HTML itself needs none): node capture/srv.js <abs path>  (127.0.0.1:18423). The browser tool cannot open file:// here.
3. Attach tabs: live = an eLearn tab (attachBrowserTab), rec = a tab at http://127.0.0.1:18423/elearn_version_a.html.
4. Load helpers, each with: await new AF('fs','sleep','Buffer','fetch','G',src)(fs,sleep,Buffer,fetch,globalThis): capture/driver.js, capture/audit.js, capture/audit2.js. Then await loadAll(); await setupMasking(); await boot2().
5. Capture: await crawl(ids,['d','t','m'],100000). Build: node capture/build.js (use --check to validate without writing). Audit: await runAudit(100000) in a loop until the queue is done (results in capture/audit-results.json); measure3/diff2 for single screens.
6. Privacy and sample rules live in capture/sample-sanitize.js (applied at build time); patch scripts capture/patch-*.js are idempotent.
