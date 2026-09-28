import React, { useState } from 'react';
import Shell, { Widget } from '../Shell.jsx';
import { homeNav, courses, totalCourses, lastLogin, rightWidgetsHome } from '../data.js';
import { logEvent } from '../log.js';

// Variant A: the real homepage as captured on 2026-09-28.
export default function Home({ go }) {
  const [tab, setTab] = useState('All');
  const list = tab === 'Pinned' ? courses.filter((c) => c.pinned) : courses;

  const open = (c) => {
    if (c.id === 'dam') { logEvent('open_course'); go('course', 'home'); }
    else if (c.id === 'pgpd') { logEvent('open_pgpd'); go('pgpd'); }
    else logEvent('open_other_course');
  };

  return (
    <Shell go={go} nav={homeNav}>
      <div className="cols">
        <div className="col-main">
          <Widget title="Announcements" link>
            <p className="muted">There are no announcements to display.</p>
          </Widget>
          <Widget title="My Courses">
            <div className="tabs" role="tablist">
              {['All', 'Pinned'].map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} className={'tab' + (tab === t ? ' on' : '')} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>
            <div className="tiles">
              {list.map((c) => (
                <button key={c.id} className="tile" onClick={() => open(c)}>
                  <span className={'tile-art art-' + c.art}>
                    {c.pinned && <span className="pin" aria-label="Pinned">📌</span>}
                    {c.badge && <span className="tile-badge">{c.badge}</span>}
                  </span>
                  <span className="tile-title">{c.title}</span>
                  <span className="tile-meta">{c.code ? c.code + ', ' : ''}{c.term}{c.ends ? ', ' + c.ends : ''}</span>
                </button>
              ))}
            </div>
            <p className="view-all"><a href="#" onClick={(e) => e.preventDefault()}>View All Courses ({totalCourses})</a></p>
          </Widget>
        </div>
        <div className="col-side">
          <Widget title="Last Login">
            <p>{lastLogin.when}</p>
            <p><strong>Location</strong> {lastLogin.location}</p>
            <p className="small">{lastLogin.help} <a href="#" onClick={(e) => e.preventDefault()}>{lastLogin.email}</a>.</p>
          </Widget>
          <Widget title="Updates"><p className="muted">There are no current updates.</p></Widget>
          <Widget title="Peer Learning">
            <p><a href="#" onClick={(e) => e.preventDefault()}>Peer Tutoring System</a></p>
            <p><a href="#" onClick={(e) => e.preventDefault()}>Peer and Self Feedback</a></p>
          </Widget>
          {rightWidgetsHome.map((w) => (
            <Widget key={w} title={w} link={w === 'Work To Do' || w === 'Calendar'}>
              <p className="muted small">&nbsp;</p>
            </Widget>
          ))}
        </div>
      </div>
    </Shell>
  );
}
