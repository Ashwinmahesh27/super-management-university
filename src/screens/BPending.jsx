import React from 'react';
import { bPending } from '../data.js';

// Shown for design B until B is built (after AUDIT.md is committed).
export default function BPending() {
  return (
    <div className="proto-screen">
      <div className="proto-card">
        <p className="proto-kicker">{bPending.kicker}</p>
        <h1>{bPending.title}</h1>
        {bPending.body.map((p) => <p key={p}>{p}</p>)}
        <ul className="bp-list">{bPending.repairs.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>
    </div>
  );
}
