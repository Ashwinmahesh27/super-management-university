import React from 'react';
import { shotsA } from '../data.js';
import { logEvent } from '../log.js';

// Variant A as dated screenshots of the live LMS (captured 2026-09-28, student name removed).
// Clickable areas sit on top of the image, positioned in % of the captured page.
export default function ShotA({ screen, go }) {
  const s = shotsA[screen];
  return (
    <div className="shot-wrap">
      <div className="shot">
        <img src={s.src} alt={s.alt} width={s.w} height={s.h} />
        {s.hot.map((h) => (
          <button
            key={h.label}
            className="hot"
            aria-label={h.label}
            title={h.label}
            style={{ left: (h.x / s.w) * 100 + '%', top: (h.y / s.h) * 100 + '%', width: (h.width / s.w) * 100 + '%', height: (h.height / s.h) * 100 + '%' }}
            onClick={() => { if (h.event) logEvent(h.event); go(h.to); }}
          />
        ))}
      </div>
    </div>
  );
}
