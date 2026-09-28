import React from 'react';
import { brand, consent, methodNote } from '../data.js';

export default function Consent({ onContinue }) {
  return (
    <div className="proto-screen">
      <div className="proto-card">
        <p className="proto-kicker">{brand.product} · class prototype</p>
        <h1>{consent.title}</h1>
        {consent.body.map((p) => <p key={p}>{p}</p>)}
        <button className="proto-btn" onClick={onContinue}>{consent.button}</button>
        <p className="method-note">{methodNote}</p>
      </div>
    </div>
  );
}
