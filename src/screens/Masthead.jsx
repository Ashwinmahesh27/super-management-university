import React from 'react';
import { masthead } from '../data.js';

// Review-only bar above the prototype: switch between design A and design B.
export default function Masthead({ variant, onSwitch }) {
  return (
    <div className="masthead" role="region" aria-label="Design switcher">
      <span className="mh-label">{masthead.label}</span>
      <div className="mh-toggle" role="radiogroup" aria-label={masthead.label}>
        {['A', 'B'].map((v) => (
          <button
            key={v}
            role="radio"
            aria-checked={variant === v}
            className={'mh-opt' + (variant === v ? ' on' : '')}
            onClick={() => onSwitch(v)}
          >
            <strong>{v}</strong> {masthead[v]}
          </button>
        ))}
      </div>
      <span className="mh-note">{masthead.note}</span>
    </div>
  );
}
