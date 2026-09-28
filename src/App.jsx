import React, { useEffect, useState } from 'react';
import { getAssignedVariant, B_IS_BUILT } from './variant.js';
import { logEvent } from './log.js';
import Consent from './screens/Consent.jsx';
import Home from './screens/Home.jsx';
import Course from './screens/Course.jsx';
import Pgpd from './screens/Pgpd.jsx';
import Debrief from './screens/Debrief.jsx';
import ShotA from './screens/ShotA.jsx';

export default function App() {
  const [assigned] = useState(getAssignedVariant);
  // Until B is built, everyone sees A. The debrief still reports what was assigned and what was shown.
  const shown = B_IS_BUILT ? assigned : 'A';
  const [screen, setScreen] = useState('consent');
  const [courseTab, setCourseTab] = useState('home');

  const go = (s, tab) => {
    if (tab) setCourseTab(tab);
    setScreen(s);
    window.scrollTo(0, 0);
  };

  useEffect(() => { logEvent('screen_' + screen); }, [screen]);

  if (screen === 'consent') return <Consent onContinue={() => go(shown === 'A' ? 'a-home' : 'home')} />;
  if (screen === 'debrief') return <Debrief assigned={assigned} shown={shown} />;

  return (
    <>
      {screen.startsWith('a-') && <ShotA screen={screen.slice(2)} go={go} />}
      {/* The HTML screens below were our first attempt at A. They are the base for variant B. */}
      {screen === 'home' && <Home go={go} />}
      {screen === 'course' && <Course go={go} tab={courseTab} setTab={setCourseTab} />}
      {screen === 'pgpd' && <Pgpd go={go} />}
      <button className="proto-end" onClick={() => go('debrief')}>End session</button>
    </>
  );
}
