// All copy and dummy data lives here (brief: "All copy in one data file").
// Fictional brand. No real names, no personal data.
// Variant A mirrors the real LMS as captured on 2026-09-28 (see AUDIT.md for the dated screenshots).

export const brand = {
  university: 'SMU - Super Management University',
  product: 'SMU Learn',
  poweredBy: 'Powered by a generic LMS',
};

export const user = { name: 'Alex Tan', initials: 'AT' };

export const today = { label: 'Monday, 28 Sept 2026', short: 'Sep 28, 2026' };

export const consent = {
  title: 'Before you start',
  body: [
    'This is a class prototype for a term paper. It copies the layout of a university learning site under a made-up name.',
    'Nothing here is real: no course, no grade, no registration and no personal data. We do not collect your name or contact details.',
    'Take about three minutes. Look around as you would on a normal Monday before class. Click "End session" at the bottom right when you are done.',
  ],
  button: 'Continue',
};

export const homeNav = ['ePortfolio', 'Locker', 'Competencies', 'Awards', 'Insight', 'Links', 'Help'];

export const courseNav = ['Home', 'Content', 'Class info', 'Discussions', 'Assignments', 'Quizzes', 'Analytics', 'Tools', 'Links'];

export const lastLogin = {
  when: 'Monday, 28 Sept 2026, 12:04:46 pm',
  location: 'SG - Singapore',
  help: 'If this is not your last login, please contact :',
  email: 'helpdesk@super-mgmt.example',
};

// Tile art is CSS gradients, standing in for stock photos on the real tiles.
export const courses = [
  { id: 'dam', code: 'BEH610-G1', title: 'BEH610-G1-Designing Decisions for Managers', term: '2026-27 August Term', ends: 'Ends December 20, 2026 at 12:00 AM', pinned: true, art: 'seats', current: true },
  { id: 'xld', code: 'DES624-G1', title: 'DES624-G1-Experimental Learning and Design Thinking', term: '2026-27 August Term', ends: 'Ends December 20, 2026 at 12:00 AM', pinned: true, art: 'seats' },
  { id: 'neg', code: 'ORG617-G1', title: 'ORG617-G1-Negotiating in Business', term: '2026-27 August Term', ends: 'Ends December 20, 2026 at 12:00 AM', pinned: true, art: 'seats' },
  { id: 'ait', code: 'MGT688-G1', title: 'MGT688-G1-Leading Transformation with AI', term: '2026-27 August Term', ends: 'Ends December 20, 2026 at 12:00 AM', pinned: true, art: 'seats' },
  { id: 'pd1', title: 'PGPD - Modelling and Optimization of Business Decisions through Spreadsheets', term: 'Ongoing', art: 'sky' },
  { id: 'pd2', title: 'PGPD - User Experience (UX) Visual Design & Psychology', term: 'Ongoing', art: 'sky' },
  { id: 'ori', title: 'Student Orientation to SMU Learn 2026-27', term: '2026-27 Term 1', art: 'bricks', badge: '99+' },
  { id: 'pd3', title: 'PGPD - Sustainability and the Corporation: An Introduction', term: 'Ongoing', art: 'forest' },
  { id: 'pd4', title: 'PGPD - Mindfulness and Meditation for Sustainable Effectiveness', term: 'Ongoing', art: 'drops' },
  { id: 'pgpd', title: 'PG Professional Development Course', term: 'Ongoing', art: 'arrow' },
  { id: 'mh', title: 'Mental Health and You', term: 'Ongoing', art: 'ember' },
  { id: 'hf', title: 'Supporting a Harassment-Free Environment 2025 (PG)', term: '2025-26 Term 1', art: 'people' },
];

export const totalCourses = 15;

export const rightWidgetsHome = ['Class Schedule', 'Work To Do', 'Calendar', 'User Links', 'Microsoft 365', 'Google Workspace'];

// ---------- Course page (variant A) ----------
export const course = {
  title: 'BEH610-G1-Designing Decisions for Managers',
  learningTools: ['My Results', 'My Attendance', 'Peer Evaluation', 'Journal', 'Insight'],
  copyright: {
    title: 'Copyright Statement - Students',
    heading: 'Copyright in Course Materials',
    body: 'Faculty members hold copyright to the original Course Materials that they create. These include written lectures, power point presentations, study materials, tests, pre-recorded video lesson, recordings of lessons conducted online and in the selection of readings and assignments for their courses. Faculty may include a copyright notice on their Course Materials to emphasize that they are protected, and that further reproduction and redistribution are not permitted. Students are obliged to respect copyright and may use course notes and make copies of course materials for their own use only. They may not reproduce, or allow others to reproduce, adapt, distribute, upload or make available for sale, all lecture notes and course materials publicly in any way, without written consent from the copyright owner. The making or distribution of unauthorized copies of course materials is strictly prohibited and any infringement may be subject to the disciplinary action by the University.',
    from: 'From Office of Legal and General Affairs',
  },
  integrity: {
    title: 'Code of Academic Integrity',
    heading: 'Reminder on Code of Academic Integrity',
    body: 'SMU adopts a Code of Academic Integrity. There are serious penalties, including expulsion, for cheating, plagiarism, fabrication, multiple submissions, misrepresentation, facilitating academic dishonesty, attempting to gain advantage, etc. Details of this code are available in the student portal (Alternatively, click here).',
  },
  updates: '1 Quizzes Not Attempted',
  calendarDate: 'Monday, September 28, 2026',
};

// Content tab. In the real site the "Course Readings" module holds ONE topic (an external reading list).
// Opening it once marks the module 100% complete, whatever has been read.
export const modules = [
  { id: 'syl', title: 'Course Syllabus', begins: 'Begins August 24', done: true, topics: [{ t: 'Course syllabus', type: 'File', viewed: true }] },
  { id: 'rl', title: 'Course Readings', begins: 'Begins August 24', done: true, starts: 'Starts Aug 24, 2026 12:00 PM', topics: [{ t: 'Reading List', type: 'External Learning Tool', viewed: true, opensReadings: true }] },
  { id: 'w1', title: 'Week 1 Introduction to Behavioral Decision Making', begins: 'Begins August 24', done: true, topics: [{ t: 'Week 1 slides', type: 'File', viewed: true }] },
  { id: 'w2', title: 'Week 2 Goal Setting', begins: 'Begins August 31', done: true, topics: [{ t: 'Week 2 preview slides', type: 'File', viewed: true }, { t: 'Week 2 review slides', type: 'File', viewed: true }] },
  { id: 'grp', title: 'Discussion Leading Group Roster', begins: '', done: true, topics: [{ t: 'Group roster', type: 'File', viewed: true }] },
  { id: 'w3', title: 'Week 3 Expectation, Confirmation Bias, & Motivated Reasoning', begins: 'Begins September 7', done: false, topics: [{ t: 'Week 3 preview slides', type: 'File', viewed: true }, { t: 'Week 3 review slides', type: 'File', viewed: false }] },
  { id: 'w45', title: 'Week 4 & Week 5 Core Principles & Applications of Behavioral Economics in Managerial Decision Making', begins: 'Begins September 14', done: true, topics: [{ t: 'Week 4 preview slides', type: 'File', viewed: true }] },
  { id: 'w6', title: 'Week 6 AI-augmented Product Building', begins: 'Begins September 28', done: true, starts: 'Starts Sep 28, 2026 12:00 PM', notes: ['Use hobby (free-tier) for the hosting service, Team.'], topics: [{ t: 'Week06 Term Paper Briefing', type: 'Link', viewed: true }, { t: 'Design tool', type: 'Link', viewed: true }, { t: 'Build tool', type: 'Link', viewed: true }, { t: 'Code hosting', type: 'Link', viewed: true }, { t: 'Web hosting', type: 'Link', viewed: true }] },
];

// The external reading list (what "Reading List" opens). The real syllabus readings, by week.
// read: dummy state for the fictional student Alex, used only so testers see a realistic mix.
export const readings = [
  { week: 2, title: 'Evil by design: Greed (pp. 234-285)', author: 'Nodder (2013)', read: true },
  { week: 2, title: 'Can losing lead to winning?', author: 'Berger & Pope (2011)', read: true },
  { week: 3, title: 'Predictably irrational, ch. 9: The effect of expectations', author: 'Ariely (2008)', read: true },
  { week: 3, title: 'Democratic and Republican physicians provide different care on politicized health issues', author: 'Hersh & Goldenberg (2016)', read: false },
  { week: 4, title: 'Thinking, fast and slow, ch. 26: Prospect theory', author: 'Kahneman (2013)', read: true },
  { week: 4, title: 'Thinking, fast and slow, ch. 27: The endowment effect', author: 'Kahneman (2013)', read: true },
  { week: 4, title: 'Thinking, fast and slow, ch. 34: Frames and reality', author: 'Kahneman (2013)', read: true },
  { week: 4, title: 'Bounded ethicality: the perils of loss framing', author: 'Kern & Chugh (2009)', read: false },
  { week: 5, title: 'Drunk tank pink, ch. 2: Labels', author: 'Alter (2013)', read: false },
  { week: 5, title: 'Of accessibility and applicability: how heat-related cues affect belief in "global warming" versus "climate change"', author: 'Schuldt & Roh (2014)', read: false },
  { week: 6, title: 'Leaders as decision architects', author: 'Beshears & Gino (2015)', read: false },
  { week: 7, title: 'Fluency and social influence', author: 'Petrova, Schwarz & Song (2012)', read: false },
  { week: 7, title: 'Bringing the frame into focus', author: 'Lee & Aaker (2004)', read: false },
  { week: 8, title: 'Drunk tank pink, ch. 7: Colors', author: 'Alter (2014)', read: false },
  { week: 8, title: 'Exciting red and competent blue: the importance of color in marketing', author: 'Labrecque & Milne (2011)', read: false },
  { week: 9, title: 'Social norms: a how-to (and how-not-to)', author: 'Goldstein & Mortensen (2012)', read: false },
  { week: 9, title: 'Where consumers diverge from others: identity signaling and product domains', author: 'Berger & Heath (2007)', read: false },
  { week: 10, title: 'Drunk tank pink, ch. 6: Culture', author: 'Alter (2013)', read: false },
  { week: 10, title: 'Large-scale psychological differences within China explained by rice versus wheat agriculture', author: 'Talhelm et al. (2014)', read: false },
];

// ---------- PGPD page (variant A) ----------
// Mirrors the real "PG Professional Development Course" home: the requirement lives in a 2021 announcement,
// registration happens by email, and progress is only under My Results > course dropdown.
export const pgpd = {
  title: 'PG Professional Development Course',
  announcement: {
    heading: 'Postgraduate Professional Development (PGPD) course for Masters Students',
    meta: 'Programme office posted on Aug 18, 2021 11:35 AM · Edited',
    paras: [
      'The compulsory Postgraduate Professional Development (PGPD) course is organized by the Office of Postgraduate Professional Programmes, to bring together students from different Masters programmes, in a series of workshops designed to help you develop your network, horizons and skills in key professional areas that are vital to your long-run success.',
      'The Postgraduate Professional Development (PGPD) workshops are a compulsory graduation requirement for most of the Masters programmes, and students are required to complete 4 full-day PGPD workshops in total, which will be counted towards 1 CU and reflected in transcript (the PGPD course will be graded on a Pass/Fail basis). Both full-time and part-time students are required to complete this graduation requirement, except for students from EMBA, MWM and JD programmes.',
      'There are rounds of full-day PGPD workshops to be held during each term and the July / November special terms as well. Workshop dates and the registration timelines will be emailed to students during each term for noting.',
    ],
    notesTitle: 'Please note for the PGPD workshops:',
    notes: [
      'Unless otherwise advised, each workshop usually starts at around 9am to 4.30/5pm (please take note of the timing).',
      'Students can choose any topic to register, except for those with specific exclusion clauses indicated.',
      'Please look out for email notifications to sign up for workshops on a first-come-first-served basis during the terms, unless pre-allocation for selected workshop topics has been specifically made for your respective programmes.',
      'Note: a) There will be a post-workshop assessment in the form of a quiz and/or short assignment of various formats to be completed within a stipulated period after each workshop. Absences during class or non-participation or non-completion of post-workshop assessment(s) may result in students not fulfilling the workshop requirements, and would need to retake the same or different workshop offering at the next PGPD round. No exemption will be allowed, unless otherwise specifically informed. b) All acts of academic dishonesty (including, but not limited to, plagiarism, cheating, fabrication, facilitation of acts of academic dishonesty by others, unauthorized possession of exam questions, or tampering with the academic work of other students) are serious offences. Any student caught violating this policy may result in the student receiving a fail grade for the workshop.',
    ],
    contact: 'For more information, please email your respective programme managers or the programme office at: masters@super-mgmt.example',
    attachment: 'FAQs - PGPD workshops as at Aug23.pdf (124.34 KB)',
  },
  // Dummy record for Alex: 1 of 4 done. In A this is only visible under My Results.
  completed: 1,
  required: 4,
  results: [{ workshop: 'Design Thinking for Business Innovation', term: '2025-26 Term 3', grade: 'Pass' }],
};

export const debrief = {
  title: 'Thank you. That was the whole session.',
  body: [
    'Nothing was registered, submitted or saved. The courses, readings and workshops are made up for a class project.',
    'Three quick questions help us compare designs. There are no right or wrong answers about you, only about the screens.',
  ],
  q1: { text: 'How much of the Designing Decisions reading list has Alex finished?', options: ['All of it', 'Most of it', 'About a third', 'Hardly any', 'I couldn\'t tell'], correct: 'About a third' },
  q2: { text: 'How many PGPD workshops does Alex still need to graduate?', options: ['0', '1', '2', '3', '4', 'I couldn\'t tell'], correct: '3' },
  q3: { text: 'How pressured did the site make you feel? (1 = not at all, 5 = very)', options: ['1', '2', '3', '4', '5'] },
  codeLabel: 'Your result code (paste it into the group form):',
};
