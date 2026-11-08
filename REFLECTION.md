# REFLECTION.md - WeLearn (Super Management University) · Group 15

**Members:** CC = Chak,Ashwin, [CD = name], [EF = name], [GH = name]
**Length:** about 1,000-1,500 words for the group. Each member initials the parts they wrote, e.g. (CC, AB). Initials not yet known are shown as [initials]; the group must replace them with the true authors before commit.
**Status:** DRAFT. Drafted by Stick (AI) from the project files; every sentence needs a member to confirm it is true before it is initialled.

## Part A - Critical thinking

### A1 Where did the AI get the behavioural science wrong, and how did you catch it?
Three cases.

First, at the start (PROMPTS.md, Entry 1) the AI said a learning platform had "no profit or renewal" to improve and suggested a grocery site instead. That is wrong for decision architecture: renewal can be weekly re-engagement and continuation to the next term, and the organisation's goal is engagement with the course material. The product choice was kept and renewal was reframed as weekly return (CC).

Second, the AI added engagement mechanics to variant B (points, a streak, a mascot, an apple bonus) that no audit finding supported. The audit's own list of sludge risks excluded streak-style cues. The adversarial reviewer caught the mismatch by tracing every B element back to a finding, and the points, streak, mascot and bonus were removed (CC, [initials]).

Third, the AI wrote unsupported copy for the study helper: "SMU already gives you many tools, and they are scattered", an invented "about 45 minutes" estimate and a Friday-to-Sunday plan. The first is an unsourced claim; the other two are invented guidance. All three were deleted and the helper now repeats only facts held in the course data (CC, [initials]).

### A2 Which claim did you check at source (reading and page), and what did you find?
The goal-gradient finding (F5) first cited Zhou and Soman (2003) as support for finer-grained progress. That reference could not be verified, so it is kept out of the reference list and the finding rests on Kivetz, Urminsky and Zheng (2006) instead [initials; add reading and page].

The sample-size figures were recomputed rather than trusted. The method that reproduces the course table (97 per arm for 40% to 60%, and 42 per arm for 30% to 60%; α = .05 two-sided, power .80) gives about 15 per arm for the predicted 20% to 70%. A cautious 30% to 60% needs 42 per arm (CC, [initials]).

The attention-span claim in Section 1 is taken from Rosen, Carrier and Cheever (2013): 263 students, averaging under six minutes on task before switching. The DOI was checked [initials: confirm opened at source].

The flow reference in the paper is Csikszentmihalyi (1990), *Flow: The psychology of optimal experience* [initials: confirm the bibliographic details and the page for the clear-goal and immediate-feedback conditions]. Duolingo is used in the paper only as a proxy for how apps form habits through stated principles; no specific mechanic is cited, and none is to be added without a checked source (CC, [initials]).

### A3 Which nudge-or-sludge call did you make against the AI's suggestion, and why?
One call was made with the review step, not against it. When B's rewards were checked against the test of whose goal wins, the check flagged the bonus apple as a sludge risk: it shows after about one real action in three and doubles XP for that action, and a variable schedule of this kind is the hardest to stop once started [team to verify against the course reading]. The apple was a design decision made after the audit, not a finding of it, and the AI did not suggest it. It is kept and rated grey, with a plain-words rule where the Rewards switch is, no expiry, no loss, no sound and an off switch. It is dropped if time in session or felt pressure rises (CC, [initials]).

Two earlier calls went against the AI's output. "Remind me" first came with a preselected time, a default that chooses for the student; it was rebuilt with four times to choose from, none selected, a "No reminder" button of equal weight, and Undo (CC, [initials]). Overdue items were first shown in amber and red; they were changed to neutral wording stated once, because repeated alert colour is loss framing without a gain for the student (CC, [initials]).

### A4 What about your users could the AI not know?
Which tools students actually use, and which they ignore, is known only from first-hand use and interviews. The claim in the paper that many university tools are integrated and rarely used rests on anecdotal evidence, the authors' own use of the platform and interviews with users (CC, [initials]).

The AI could not open the real platform. It sits behind the university's Microsoft 365 sign-in with multi-factor authentication, so the build tools could not load it and variant A had to be rebuilt from dated captures (CC).

The AI also could not know that screenshots held a real student's name, that the instructor had accepted a student-view-only scope, or which names were safe to use in a submitted paper. These were decided by members (CC, [initials]).

## Part B - Reflection

### B1 Which principle replicated, or was refuted, in your pilot or prediction?
[To be completed after the pilot or the prediction check. At the time of drafting, no pilot has run and no principle has been tested, so none is reported as replicated or refuted.]

What the prediction check will compare: the goal-gradient and expectations predictions behind the "This week" card (the share of testers who name the next deadline rising from about 20% to about 70%), against the pressure guardrail. If the rise is under 20 points, or felt pressure in B is higher than in A by more than 0.5, the principle is refuted for this setting and the repair is dropped. The result is to be reported in plain words as a pilot, with its 95% confidence interval ([initials]).

### B2 What would you test next, and what result would change your mind?
A multi-week study of returns and of readings completed, with a reading-depth question as the guardrail, so that more activity is not mistaken for more learning. The habit idea is also to be studied through initiatives known for building an app routine, with Duolingo as the reference case, before its mechanics are copied.

Two results would change the group's mind. If returns rise while answers to the reading-depth question fall, the count and tree reward finishing, not learning, and should be redesigned. If students behind schedule report higher pressure in B than in A, the visible count is acting as sludge for them, and it should be shown to them differently (CC, [initials]).

### B3 How did AI change who did what in your group?
The AI did most of the typing: it rebuilt variant A as HTML, built variant B, drafted the audit and the paper, and ran four role-split agents (coordinator, compliance checker, designer, adversarial reviewer). Members decided what the product and scope were, what names to use, which AI suggestions to overrule, and what counts as sludge.

The cost was also visible. A prompt to delete the old variant A also removed the A arm the A/B test needs, so A had to be rebuilt as a standalone page and linked back (PROMPTS.md). Credits ran out during the first multi-agent attempt, which changed the route. Review shifted from "does it work" to "does each element trace to a finding", and that check, done by a separate agent, found more problems than the builder did (CC, [initials]).

From my perspective, AI changed my role from producing every element myself to setting direction and reviewing the results. I learned that detailed prompts alone are not enough; I had to keep checking whether the output matched the project scope and the evidence. I wanted Version B to remain comparable with Version A while improving clarity and navigation, and I pushed for a responsive experience across desktop, tablet, and mobile. When engagement features were proposed, I learned to ask whether they helped students make better study decisions or simply encouraged more clicks. AI could build and phrase ideas quickly, but it could not tell us whether students would find them useful, whether a claim was true, or whether a feature might create pressure. Next time, I would set the evidence, privacy, and testing criteria earlier, then validate the design with students. I would judge the work by meaningful learning and decision quality, not by the number of features or how polished the prototype looks. (Ashwin)
