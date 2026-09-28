import React, { useState } from 'react';
import { debrief } from '../data.js';
import { summary } from '../log.js';

export default function Debrief({ assigned, shown }) {
  const [a, setA] = useState({});
  const s = summary();
  const qs = ['q1', 'q2', 'q3'];
  const answered = qs.every((q) => a[q]);
  const idx = (q) => debrief[q].options.indexOf(a[q]);
  const code = [shown, assigned, idx('q1'), idx('q2'), idx('q3'), s.openedReadings, s.openedResults, s.seconds].join('-');

  return (
    <div className="proto-screen">
      <div className="proto-card">
        <h1>{debrief.title}</h1>
        {debrief.body.map((p) => <p key={p}>{p}</p>)}
        {qs.map((q) => (
          <fieldset key={q} className="q">
            <legend>{debrief[q].text}</legend>
            {debrief[q].options.map((o) => (
              <label key={o} className={'opt' + (a[q] === o ? ' on' : '')}>
                <input type="radio" name={q} value={o} checked={a[q] === o} onChange={() => setA({ ...a, [q]: o })} />{o}
              </label>
            ))}
          </fieldset>
        ))}
        {answered && (
          <div className="code">
            <p>{debrief.codeLabel}</p>
            <code>{code}</code>
            <p className="small muted">You saw design {shown}. The progress figures in this prototype were made up for a fictional student.</p>
          </div>
        )}
      </div>
    </div>
  );
}
