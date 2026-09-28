import React, { useState } from 'react';
import { debrief } from '../data.js';

export default function Debrief({ assigned, shown, toggled }) {
  const [a, setA] = useState({});
  const qs = ['q1', 'q2', 'q3'];
  const answered = qs.every((q) => a[q]);

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
            <p className="seen">You saw design <strong>{shown}</strong></p>
            <p className="small muted">{debrief.seenNote[shown]}</p>
          </div>
        )}
      </div>
    </div>
  );
}
