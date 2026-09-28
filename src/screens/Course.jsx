import React, { useState } from 'react';
import Shell, { Widget } from '../Shell.jsx';
import { course, courseNav, modules, readings } from '../data.js';
import { logEvent } from '../log.js';

// Variant A: the course homepage and its Content tab, as captured on 2026-09-28.
function CourseHome() {
  return (
    <div className="cols">
      <div className="col-main">
        <Widget title="Learning Tools">
          <div className="tools">
            {course.learningTools.map((t) => <button key={t} className="tool"><span className="tool-ico" />{t}</button>)}
          </div>
        </Widget>
        <Widget title="Announcements" link><p className="muted">There are no announcements to display.</p></Widget>
        <Widget title={course.copyright.title}>
          <p><strong>{course.copyright.heading}</strong></p>
          <p className="dense">{course.copyright.body}</p>
          <p className="dense">{course.copyright.from}</p>
        </Widget>
        <Widget title={course.integrity.title}>
          <p><strong>{course.integrity.heading}</strong></p>
          <p className="dense">{course.integrity.body}</p>
        </Widget>
        <Widget title="Lumi Tutor"><p className="muted small">&nbsp;</p></Widget>
        <Widget title="Online Lesson">
          <p>Click on the solution you will be using for your online lesson.</p>
          <p><a href="#" onClick={(e) => e.preventDefault()}>Video call</a></p>
        </Widget>
      </div>
      <div className="col-side">
        <Widget title="Updates"><p><a href="#" onClick={(e) => e.preventDefault()}>{course.updates}</a></p></Widget>
        <Widget title="Calendar" link>
          <p className="cal-date">{course.calendarDate}</p>
          <p className="muted small">Upcoming events</p>
        </Widget>
      </div>
    </div>
  );
}

function ReadingList({ onBack }) {
  // The external reading list: titles only, grouped by week, no progress of any kind (as in A).
  return (
    <div className="content-main">
      <p className="crumb"><a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Course Readings</a> › Reading List</p>
      <h1 className="h1">Reading List</h1>
      <p className="muted small">External Learning Tool</p>
      <ul className="rl">
        {readings.map((r) => (
          <li key={r.title}><span className="rl-t">{r.title}</span><span className="rl-a">{r.author}</span><span className="rl-w">Week {r.week}</span></li>
        ))}
      </ul>
    </div>
  );
}

function Content() {
  const [sel, setSel] = useState('w6');
  const [openList, setOpenList] = useState(false);
  const m = modules.find((x) => x.id === sel);
  const done = m.topics.filter((t) => t.viewed).length;
  const pct = Math.round((done / m.topics.length) * 100);

  return (
    <div className="content">
      <aside className="toc" aria-label="Table of Contents">
        <input className="toc-search" placeholder="Search Topics" aria-label="Search topics" />
        <ul className="toc-top">
          <li>🔖 Bookmarks</li>
          <li>🗓 Course Schedule</li>
        </ul>
        <p className="toc-head">Table of Contents</p>
        <ul className="toc-list">
          {modules.map((x) => (
            <li key={x.id}>
              <button className={'toc-item' + (sel === x.id && !openList ? ' on' : '')} onClick={() => { setSel(x.id); setOpenList(false); }}>
                <span className="toc-title">{x.title}</span>
                {x.begins && <span className="toc-begins">{x.begins}</span>}
                <span className={'toc-check' + (x.done ? ' done' : '')} aria-label={x.done ? 'All tasks are completed' : 'Not all tasks completed'}>{x.done ? '✓' : ''}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {openList ? <ReadingList onBack={() => setOpenList(false)} /> : (
        <div className="content-main">
          <h1 className="h1">{m.title}</h1>
          <button className="print">🖨 Print</button>
          {m.starts && <p className="muted small">{m.starts}</p>}
          {m.notes && <ul className="notes">{m.notes.map((n) => <li key={n}>{n}</li>)}</ul>}
          <div className="progress">
            <a href="#" onClick={(e) => e.preventDefault()}>{done} of {m.topics.length} topics complete</a>
            <div className="bar"><span style={{ width: pct + '%' }} /></div>
            <span className="small">{pct} %</span>
          </div>
          <ul className="topics">
            {m.topics.map((t) => (
              <li key={t.t}>
                <button className="topic" onClick={() => { if (t.opensReadings) { logEvent('open_readings'); setOpenList(true); } }}>{t.t}</button>
                <span className="muted small">{t.type}</span>
                {t.viewed && <span className="viewed" title="You have viewed this topic">👁</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Course({ go, tab, setTab }) {
  const onNav = (n) => {
    if (n === 'Home') setTab('home');
    if (n === 'Content') { logEvent('open_content'); setTab('content'); }
  };
  return (
    <Shell go={go} courseTitle={course.title} nav={courseNav} activeNav={tab === 'content' ? 'Content' : 'Home'} onNav={onNav}>
      {tab === 'content' ? <Content /> : <CourseHome />}
      <button className="lumi" aria-label="Open chat">💬</button>
    </Shell>
  );
}
