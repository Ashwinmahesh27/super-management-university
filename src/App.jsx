import React, { useEffect, useState } from 'react';
import { getAssignedVariant, hasVariantParam, setVariantParam, B_IS_BUILT } from './variant.js';
import { logEvent } from './log.js';
import Consent from './screens/Consent.jsx';
import Home from './screens/Home.jsx';
import Course from './screens/Course.jsx';
import Pgpd from './screens/Pgpd.jsx';
import Debrief from './screens/Debrief.jsx';
import ShotA from './screens/ShotA.jsx';
import Masthead from './screens/Masthead.jsx';
import BPending from './screens/BPending.jsx';

// Screen names: A screens are 'a-<name>' (screenshots); B screens are the HTML ones.
const A_TO_B = { 'a-home': 'home', 'a-course-home': 'course', 'a-course-readings': 'course', 'a-pgpd': 'pgpd' };
const B_TO_A = { home: 'a-home', course: 'a-course-home', pgpd: 'a-pgpd' };

export default function App() {
  const [assigned] = useState(getAssignedVariant);
  // Review mode: the A/B toggle shows only on links that carry ?v= (demos, graders, the group).
  // Test participants get the bare URL, stay in their random arm and never see the toggle.
  const [review] = useState(hasVariantParam);
  const [variant, setVariant] = useState(assigned);
  const [toggled, setToggled] = useState(false);
  const [screen, setScreen] = useState('consent');
  const [courseTab, setCourseTab] = useState('home');

  const go = (s, tab) => {
    if (tab) setCourseTab(tab);
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const switchTo = (v) => {
    if (v === variant) return;
    setVariant(v);
    setToggled(true);
    setVariantParam(v);
    logEvent('toggle_' + v);
    if (screen === 'consent' || screen === 'debrief') return;
    if (v === 'B' && A_TO_B[screen]) {
      if (screen === 'a-course-readings') setCourseTab('content');
      go(A_TO_B[screen]);
    } else if (v === 'A' && B_TO_A[screen]) {
      go(screen === 'course' && courseTab === 'content' ? 'a-course-readings' : B_TO_A[screen]);
    }
  };

  useEffect(() => { logEvent('screen_' + screen); }, [screen]);

  const bar = review && screen !== 'debrief' ? <Masthead variant={variant} onSwitch={switchTo} /> : null;
  const showBPending = variant === 'B' && !B_IS_BUILT;

  if (screen === 'consent') {
    return <>{bar}<Consent onContinue={() => go(variant === 'A' ? 'a-home' : 'home')} /></>;
  }
  if (screen === 'debrief') return <Debrief assigned={assigned} shown={variant} toggled={toggled} />;

  return (
    <>
      {bar}
      {showBPending ? <BPending /> : (
        <>
          {screen.startsWith('a-') && <ShotA screen={screen.slice(2)} go={go} />}
          {screen === 'home' && <Home go={go} />}
          {screen === 'course' && <Course go={go} tab={courseTab} setTab={setCourseTab} />}
          {screen === 'pgpd' && <Pgpd go={go} />}
        </>
      )}
      <button className="proto-end" onClick={() => go('debrief')}>End session</button>
    </>
  );
}
