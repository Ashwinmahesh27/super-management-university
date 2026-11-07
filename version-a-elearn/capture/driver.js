// Run in the browser REPL via: const AF=Object.getPrototypeOf(async function(){}).constructor; await new AF('fs','sleep','Buffer','fetch','G',src)(fs,sleep,Buffer,fetch,globalThis)  (see handoff.md)
const base=G.base, E='https://elearn.smu.edu.sg';
G.E=E;
G.cn={453354:'IS624',462326:'MGMT6088',462330:'MGMT6108',462346:'OBHR617'};
G.caps=G.caps||{};G.screens=G.screens||{};G.scrubs=G.scrubs||[];G.styleList=G.styleList||[];G.styleDict=G.styleDict||new Map();G.imgCache=G.imgCache||{};
G.PH='data:image/svg+xml;base64,'+Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><rect width="42" height="42" fill="#cdd5dc"/><circle cx="21" cy="16" r="7" fill="#fff"/><path d="M7 42c0-10 6-15 14-15s14 5 14 15z" fill="#fff"/></svg>').toString('base64');
G.txt=h=>h.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ');
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
G.esc=esc;
G.rawNames=G.rawNames||[]; // add the signed-in account's name variants before capturing (e.g. globalThis.rawNames=[...]); never save real names in this file
G.scrubText=s=>{for(const n of G.rawNames)s=s.split(n).join('Student Name');for(const [re,rep] of G.scrubs)s=s.replace(re,rep);return s};
G.normUrl=u=>{let x=u.replace(/94206/g,'00000000').replace(/^https?:\/\/elearn\.smu\.edu\.sg/i,'').replace(/#.*$/,'');return x.toLowerCase().replace(/&?(v|searchstring|sortfield|sortdirection)=[^&]*/g,'').replace(/[?&]$/,'').replace(/\?&/,'?')};
G.loadFonts=async()=>{G.fonts={};try{G.fonts=JSON.parse(await fs.readFile(base+'capture/fonts.json','utf8'))}catch(e){for(const w of [400,700]){const r=await fetch(`https://s.brightspace.com/lib/fonts/0.6.4/assets/Lato-${w}.woff2`);G.fonts[w]=Buffer.from(await r.arrayBuffer()).toString('base64')}await fs.writeFile(base+'capture/fonts.json',JSON.stringify(G.fonts))}};
G.buildScrubs=async()=>{ // regenerate people scrub list from the 4 classlists (names are NEVER written to disk)
  const names=new Set(),users=new Set();
  for(const ou of Object.keys(G.cn)){await G.live.goto(`${E}/d2l/lms/classlist/classlist.d2l?ou=${ou}`);await sleep(1500);
   const r=await G.live.evaluate(()=>{const names=new Set(),users=new Set();const walk=r=>{r.querySelectorAll('*').forEach(e=>{if(e.shadowRoot)walk(e.shadowRoot);if(e.children.length===0){const t=(e.textContent||'').trim();if(/^.{2,70} _$/.test(t))names.add(t.slice(0,-2).trim());else if(/^[A-Za-z0-9.\-]+\.\d{2,4}$/.test(t)||/^[a-z][a-z0-9.\-_]{3,30}$/.test(t)&&e.tagName==='TD')users.add(t)}})};walk(document);return {n:[...names],u:[...users]}});
   r.n.forEach(x=>names.add(x));r.u.forEach(x=>users.add(x))}
  const sc=[[/94206/g,'00000000'],[/KEj0auvJeU/g,'xxxxxxxxxx']];let i=0;
  for(const u of [...users].sort((a,b)=>b.length-a.length)){i++;sc.push([new RegExp('(?<![A-Za-z0-9.])'+esc(u)+'(?![A-Za-z0-9])','gi'),'user'+i])}
  i=0;for(const n of [...names].sort((a,b)=>b.length-a.length).filter(x=>x.length>=4)){i++;sc.push([new RegExp('(?<![A-Za-z])'+esc(n)+'(?![A-Za-z])','gi'),'Person '+i])}
  sc.push([/(?!(?:elearn|boss|cte)@smu\.edu\.sg)[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi,'student@example.com']);
  G.scrubs.length=0;G.scrubs.push(...sc);return sc.length};
G.fetchImg=async(u)=>{if(G.imgCache[u]!==undefined)return;
  if(/^blob:|profile|avatar|userimage|\/profileimage/i.test(u)){G.imgCache[u]=G.PH;return}
  try{const r=await G.live.evaluate(async u=>{const r=await fetch(u,{credentials:'include'});if(!r.ok)return null;const b=await r.blob();if(b.size>600000)return {big:b.size};return await new Promise(res=>{const f=new FileReader();f.onload=()=>res({d:f.result});f.readAsDataURL(b)})},u);G.imgCache[u]=r&&r.d?r.d:null}catch(e){G.imgCache[u]=null}
  if(G.imgCache[u]==null&&/^https?:/.test(u)&&!/elearn\.smu\.edu\.sg/.test(u)){try{const r=await fetch(u);if(r.ok){const b=Buffer.from(await r.arrayBuffer());const ct=r.headers.get('content-type')||'image/svg+xml';if(b.length<300000)G.imgCache[u]='data:'+ct.split(';')[0]+';base64,'+b.toString('base64')}}catch(e){}}};
G.maskFn2=`(function(PH,names,pats){
 const res=pats.map(p=>[new RegExp(p[0],p[1]),p[2]]);
 const rep=s=>{let o=s;for(const n of names)o=o.split(n).join('Student Name');for(const [re,r] of res)o=o.replace(re,r);return o};
 const walk=r=>{const tw=document.createTreeWalker(r,NodeFilter.SHOW_TEXT);let n;const arr=[];while(n=tw.nextNode())arr.push(n);arr.forEach(t=>{const v=rep(t.nodeValue);if(v!==t.nodeValue)t.nodeValue=v});
  r.querySelectorAll('*').forEach(e=>{
   for(const a of ['aria-label','title','alt','text','value']){const v=e.getAttribute&&e.getAttribute(a);if(v){const w=rep(v);if(w!==v)e.setAttribute(a,w)}}
   if((e.tagName==='INPUT'||e.tagName==='TEXTAREA')&&e.type!=='password'&&e.type!=='checkbox'&&e.type!=='radio'&&e.value){const w=rep(e.value);if(w!==e.value)e.value=w}
   if(e.tagName==='IMG'&&/^blob:|profile|avatar|userimage/i.test(e.currentSrc||e.src||'')){e.removeAttribute('srcset');e.src=PH}
   if(e.shadowRoot)walk(e.shadowRoot);
   if(e.tagName==='IFRAME'){try{walk(e.contentDocument)}catch(x){}}
  })};
 walk(document);document.title=rep(document.title);
})`;
G.doMask=async()=>{const pats=G.scrubs.map(([re,r])=>[re.source,re.flags.replace('g','')+'g',r]);
 await G.live.evaluate(`(${G.maskFn2})(${JSON.stringify(G.PH)},${JSON.stringify(G.rawNames)},${JSON.stringify(pats)})`)};
G.dirOf=(id,l)=>base+`audit-shots/${id}-${l==='d'?'desktop':l==='t'?'tablet':'phone'}/`;
G.VP={d:{width:1440,height:900},t:{width:820,height:1180},m:{width:390,height:844}};
G.capOne=async(id,url,layout,opts={})=>{
  const page=G.live;await page.setViewportSize(G.VP[layout]);
  if(url&&page.url()!==url){await page.goto(url)}
  await sleep(opts.wait||1500);
  if(opts.pre)await opts.pre(page);
  await G.doMask();await sleep(200);
  await page.evaluate(G.caplib);
  const r=await page.evaluate(o=>window.__cap(o),opts.cap||{});
  for(const u of r.imgs)await G.fetchImg(u);
  let html=r.html.replace(/@@IMG:([^@]+)@@/g,(m,u)=>G.imgCache[u]||'');
  html=G.scrubText(html);
  const map=r.styles.map(s=>{s=s.replace(/@@IMG:([^@]+)@@/g,(m,u)=>G.imgCache[u]||'');let i=G.styleDict.get(s);if(i===undefined){i=G.styleList.length;G.styleList.push(s);G.styleDict.set(s,i)}return i});
  html=html.replace(/\u0001(\d+)\u0002/g,(m,n)=>'s'+map[+n]);
  const shot=await page.screenshot();const dir=G.dirOf(id,layout);
  await fs.mkdir(dir,{recursive:true});await fs.writeFile(dir+'live.png',shot);
  return {id,layout,title:G.scrubText(r.title),url:G.scrubText(r.url),html,nEl:r.nEl,docH:r.docH,docW:r.docW,bodyBg:r.bodyBg,htmlBg:r.htmlBg,bodyFont:r.bodyFont};
};
G.saveAll=async()=>{await fs.writeFile(base+'capture/shared.json',JSON.stringify({styleList:G.styleList,imgCache:G.imgCache}));
  for(const k of (G.dirty||Object.keys(G.caps))){if(G.caps[k])await fs.writeFile(base+`capture/cap_${k}.json`,JSON.stringify(G.caps[k]))}for(const k of Object.keys(G.caps))delete G.caps[k];G.dirty=[];
  await fs.writeFile(base+'capture/screens.json',JSON.stringify(G.screens))};
G.loadAll=async()=>{try{const s=JSON.parse(await fs.readFile(base+'capture/shared.json','utf8'));G.styleList=s.styleList;G.imgCache=s.imgCache;G.styleDict=new Map();G.styleList.forEach((x,i)=>G.styleDict.set(x,i))}catch(e){}
  try{G.screens=JSON.parse(await fs.readFile(base+'capture/screens.json','utf8'))}catch(e){}
  G.have=new Set((await fs.readdir(base+'capture')).filter(f=>f.startsWith('cap_')).map(f=>f.slice(4,-5)));
  G.caplib=await fs.readFile(base+'capture/caplib.js','utf8')};
G.crawl=async(ids,layouts=['d','m'],budget=100000)=>{const t0=Date.now();const done=[],fail=[];G.dirty=G.dirty||[];
 for(const id of ids){if(Date.now()-t0>budget)break;if(layouts.every(l=>G.have.has(id+'-'+l)))continue;
  try{for(const l of layouts){const c=await G.capOne(id,G.screens[id].url,l);G.caps[id+'-'+l]=c;G.dirty.push(id+'-'+l);G.have.add(id+'-'+l)}
   if(id==='g-profile'){for(const l of layouts){const c=G.caps['g-profile-'+l];c.html=c.html.replace(/(<input[^>]*? value=")([^"]+)(")/g,(m,a,v,b)=>a+'Placeholder'+b).replace(/(<textarea[^>]*>)([^<]+)(<\/textarea>)/g,'$1Placeholder text$3')}}
   if(G.screens[id].status==='Todo')G.screens[id].status='Built (untested)';done.push(id)}
  catch(e){fail.push(id+':'+String(e).slice(0,80));G.screens[id].notes='capture error: '+String(e).slice(0,80)}}
 await G.saveAll();await G.writeSitemap();
 return {done:done.length,fail,left:ids.filter(i=>!layouts.every(l=>G.have.has(i+'-'+l))).length,ms:Date.now()-t0}};
G.writeSitemap=async()=>{const screens=G.screens,caps={};for(const k of G.have)caps[k]=1;const ids=Object.keys(screens);const kids={};ids.forEach(i=>{const p=screens[i].parent||'';(kids[p]=kids[p]||[]).push(i)});
 const tree=[];const rec=(i,d)=>{const s=screens[i];tree.push('  '.repeat(d)+`- ${i}: ${s.name}${s.ext?' [external]':''} (${s.status})`);(kids[i]||[]).forEach(k=>rec(k,d+1))};(kids['']||[]).forEach(k=>rec(k,0));
 const cnt={};ids.forEach(i=>cnt[screens[i].status]=(cnt[screens[i].status]||0)+1);
 const rows=ids.map(i=>{const s=screens[i];const rd=caps[i+'-d']?(s.pxd!=null?s.pxd+'%':'captured'):'-';const rp=caps[i+'-m']?(s.pxm!=null?s.pxm+'%':'captured'):'-';const live=s.url.replace(E,'').replace(/94206/g,'<userId>').replace(/\|/g,'%7C');
  return `| ${i} | ${s.name.replace(/\|/g,'/')} | ${live} | ${s.parent||'-'} | ${s.how} | ${s.ext?'yes':'no'} | ${s.ext?(s.newtab?'new tab':'same tab'):'same tab'} | ${rd} | ${rp} | ${s.states} | #/${i} | ${s.status} | ${s.tested||'-'} | ${(s.notes||'').replace(/\|/g,'/')} |`});
 const md=`# eLearn Version A sitemap\n\nStatus counts: ${Object.entries(cnt).map(([k,v])=>k+' '+v).join(', ')} (total ${ids.length})\nDesktop/Phone columns: pixel diff vs live (full-viewport shot, ignoring privacy placeholders) where measured; "captured" = captured but not yet measured; "-" = not captured.\n\n## Tree\n${tree.join('\n')}\n\n## Table\n| ID | Screen | Live URL pattern | Parent | How reached | External? | Opens in | Desktop | Phone | States done/total | Recreation route | Status | Last tested | Notes |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n${rows.join('\n')}\n\n## Found on live site but not in the HTML\n${(G.missingList||['(none recorded yet)']).map(x=>'- '+x).join('\n')}\n\n## In the HTML but not on the live site\n- Not-captured-yet notice screen (#/nc?u=...): deliberate stand-in.\n- H-key audit overlay (required by the brief).\n${(G.extraHtml||[]).map(x=>'- '+x).join('\n')}\n`;
 await fs.writeFile(base+'sitemap.md',md)};
G.recShot=async(id,layout)=>{await G.rec.setViewportSize(G.VP[layout]);await G.rec.goto(G.REC+'#/'+id);await G.rec.reload();await sleep(700);const shot=await G.rec.screenshot();const dir=G.dirOf(id,layout);await fs.mkdir(dir,{recursive:true});await fs.writeFile(dir+'rec.png',shot)};
G.diffShots=async(id,layout)=>{const dir=G.dirOf(id,layout);const a=(await fs.readFile(dir+'live.png')).toString('base64'),b=(await fs.readFile(dir+'rec.png')).toString('base64');
  const r=await G.rec.evaluate(async([a,b])=>{const ld=s=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src='data:image/png;base64,'+s});const [A,B]=await Promise.all([ld(a),ld(b)]);const w=Math.max(A.width,B.width),h=Math.max(A.height,B.height);
   const mk=i=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#f0f';x.fillRect(0,0,w,h);x.drawImage(i,0,0);return x.getImageData(0,0,w,h)};
   const da=mk(A),db=mk(B);const out=document.createElement('canvas');out.width=w;out.height=h;const ox=out.getContext('2d');const od=ox.createImageData(w,h);let diff=0;
   for(let i=0;i<da.data.length;i+=4){const d=Math.abs(da.data[i]-db.data[i])+Math.abs(da.data[i+1]-db.data[i+1])+Math.abs(da.data[i+2]-db.data[i+2]);if(d>48){diff++;od.data[i]=255;od.data[i+1]=0;od.data[i+2]=0;od.data[i+3]=255}else{od.data[i]=da.data[i];od.data[i+1]=da.data[i+1];od.data[i+2]=da.data[i+2];od.data[i+3]=70}}
   ox.putImageData(od,0,0);return {pct:100*diff/(w*h),png:out.toDataURL('image/png').split(',')[1]}},[a,b]);
  await fs.writeFile(dir+'diff.png',Buffer.from(r.png,'base64'));return +r.pct.toFixed(2)};
