import React, { useState } from 'react';
import Shell, { Widget } from '../Shell.jsx';
import { pgpd, course, courseNav } from '../data.js';
import { logEvent } from '../log.js';

// Variant A: the professional development course home. The requirement sits in a 2021 announcement,
// registration happens by email, and progress is only found under My Results > course dropdown.
function MyResults({ onBack }) {
  const [c, setC] = useState('');
  return (
    <div className="content-main solo">
      <p className="crumb"><a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Home</a> › My Results</p>
      <h1 className="h1">My Results</h1>
      <label className="small">Course{' '}
        <select value={c} onChange={(e) => { setC(e.target.value); logEvent('pick_results_course'); }}>
          <option value="">Select a course</option>
          <option value="beh">BEH610-G1-Designing Decisions for Managers</option>
          <option value="pgpd">PG Professional Development Course</option>
        </select>
      </label>
      {c === 'pgpd' && (
        <table className="results">
          <thead><tr><th>Workshop</th><th>Term</th><th>Result</th></tr></thead>
          <tbody>{pgpd.results.map((r) => <tr key={r.workshop}><td>{r.workshop}</td><td>{r.term}</td><td>{r.grade}</td></tr>)}</tbody>
        </table>
      )}
      {c === 'beh' && <p className="muted">No results released yet.</p>}
    </div>
  );
}

export default function Pgpd({ go }) {
  const [view, setView] = useState('home');
  const a = pgpd.announcement;
  return (
    <Shell go={go} courseTitle={pgpd.title} nav={courseNav} activeNav="Home" onNav={() => setView('home')}>
      {view === 'results' ? <MyResults onBack={() => setView('home')} /> : (
        <div className="cols">
          <div className="col-main">
            <Widget title="Learning Tools">
              <div className="tools">
                {course.learningTools.map((t) => (
                  <button key={t} className="tool" onClick={() => { if (t === 'My Results') { logEvent('open_my_results'); setView('results'); } }}><span className="tool-ico" />{t}</button>
                ))}
              </div>
            </Widget>
            <Widget title="Announcements" link>
              <h3 className="ann-h"><a href="#" onClick={(e) => e.preventDefault()}>{a.heading}</a></h3>
              <p className="muted small">{a.meta}</p>
              {a.paras.map((p) => <p key={p} className="dense">{p}</p>)}
              <p className="dense"><strong>{a.notesTitle}</strong></p>
              <ul className="dense-list">{a.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              <p className="dense">{a.contact}</p>
              <p className="small">Attachment(s): <a href="#" onClick={(e) => e.preventDefault()}>{a.attachment}</a></p>
              <p className="small"><a href="#" onClick={(e) => e.preventDefault()}>Show All Announcements</a></p>
            </Widget>
            <Widget title={course.copyright.title}>
              <p><strong>{course.copyright.heading}</strong></p>
              <p className="dense">{course.copyright.body}</p>
            </Widget>
            <Widget title={course.integrity.title}>
              <p className="dense">{course.integrity.body}</p>
            </Widget>
          </div>
          <div className="col-side">
            <Widget title="Updates"><p className="muted small">There are no current updates for {pgpd.title}</p></Widget>
            <Widget title="Calendar" link><p className="cal-date">{course.calendarDate}</p><p className="muted small">Upcoming events</p></Widget>
          </div>
        </div>
      )}
    </Shell>
  );
}
