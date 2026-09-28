import React from 'react';
import { brand, user } from './data.js';

// The two-row header of the real LMS: a white minibar, then a navbar of text links.
function Icon({ d, label }) {
  return (
    <button className="mb-icon" aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d={d} fill="currentColor" /></svg>
    </button>
  );
}

const ICONS = {
  grid: 'M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z',
  mail: 'M3 6h18v12H3zM3 6l9 7 9-7',
  chat: 'M4 4h16v11H8l-4 4z',
  bell: 'M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 19a2 2 0 0 0 4 0z',
};

export default function Shell({ go, courseTitle, nav, activeNav, onNav, children }) {
  return (
    <div className="lms">
      <header className="minibar">
        <div className="mb-left">
          <button className="logo" onClick={() => go('home')} aria-label="My Home">
            <span className="logo-mark">W</span>
            <span className="logo-text">{brand.university}<small>{brand.product}</small></span>
          </button>
          {courseTitle && <button className="mb-course" onClick={() => go('course', 'home')}>{courseTitle}</button>}
        </div>
        <div className="mb-right">
          <Icon d={ICONS.grid} label="Select a course..." />
          <Icon d={ICONS.mail} label="Message alerts" />
          <Icon d={ICONS.chat} label="Subscription alerts" />
          <Icon d={ICONS.bell} label="Update alerts" />
          <span className="mb-user">{user.name}</span>
          <span className="avatar">{user.initials}</span>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-inner">
          {nav.map((n) => (
            <button key={n} className={'nav-link' + (activeNav === n ? ' active' : '')} onClick={() => onNav && onNav(n)}>
              {n}{['Links', 'Help', 'Class info', 'Analytics', 'Tools'].includes(n) ? ' ▾' : ''}
            </button>
          ))}
        </div>
      </nav>
      <main className="page">{children}</main>
      <footer className="lms-foot">{brand.poweredBy}</footer>
    </div>
  );
}

export function Widget({ title, link, children, className = '' }) {
  return (
    <section className={'widget ' + className} aria-label={title}>
      <div className="widget-head">
        {link ? <a href="#" onClick={(e) => e.preventDefault()} className="widget-title link">{title}</a> : <h2 className="widget-title">{title}</h2>}
        <button className="widget-menu" aria-label={'Actions for ' + title}>⌄</button>
      </div>
      <div className="widget-body">{children}</div>
    </section>
  );
}
