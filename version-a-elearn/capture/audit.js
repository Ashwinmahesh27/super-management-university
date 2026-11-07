// Audit helpers. Boot: base=...; load driver.js (see BOOT.md) then run this the same way:
// const src=await fs.readFile(base+'capture/audit.js','utf8'); await new AF('fs','sleep','Buffer','fetch','G',src)(fs,sleep,Buffer,fetch,globalThis);
// Needs globals: live (elearn tab), rec (file:// tab of elearn_version_a.html). Recreation is opened from disk, not via a server.
const G2=globalThis;
G2.FURL='file:///'+G2.base.replace(/\\/g,'/').replace(/ /g,'%20')+'elearn_version_a.html';
G2.LOGO='data:image/svg+xml;base64,'+Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="105" height="40" viewBox="0 0 105 40"><path d="M4 4h22v16c0 8-5 13-11 16C9 33 4 28 4 20z" fill="#cdd5dc"/><path d="M15 12l7 3-7 3-7-3z" fill="#fff"/><text x="32" y="18" font-family="Lato,Arial,sans-serif" font-size="13" font-weight="700" fill="#565a5c">Your</text><text x="32" y="33" font-family="Lato,Arial,sans-serif" font-size="12" fill="#565a5c">University</text></svg>').toString('base64');
// Masks logo, avatar and the account name directly in the live DOM before capture.
G2.maskBrand=async(page)=>{await page.evaluate(([LOGO,PH])=>{
  const re=ACC?new RegExp(ACC,'gi'):null;const fix=s=>re?s.replace(re,'Student'):s;
  const walk=r=>{const tw=document.createTreeWalker(r,NodeFilter.SHOW_TEXT);let n;const a=[];while(n=tw.nextNode())a.push(n);a.forEach(t=>{const v=fix(t.nodeValue);if(v!==t.nodeValue)t.nodeValue=v});
   r.querySelectorAll('*').forEach(e=>{
    if(e.shadowRoot)walk(e.shadowRoot);
    for(const at of ['aria-label','title','alt','text']){const v=e.getAttribute&&e.getAttribute(at);if(v){const w=fix(v);if(w!==v)e.setAttribute(at,w)}}
    if(e.tagName==='D2L-LABS-NAVIGATION-LINK-IMAGE'&&e.shadowRoot){const im=e.shadowRoot.querySelector('img');if(im){im.removeAttribute('srcset');im.src=LOGO}}
    if(e.tagName==='D2L-PROFILE-IMAGE-BASE'&&e.shadowRoot){const c=e.shadowRoot.querySelector('.d2l-profile-image-container');if(c)c.innerHTML='<img alt="" src="'+PH+'" style="width:100%;height:100%;border-radius:inherit;object-fit:cover;display:block">'}
   })};walk(document)},[G2.LOGO,G2.PH,G2.ACCOUNT_RE||''])};
G2.setupMasking=async()=>{await G2.buildScrubs();for(const n of (G2.ACCOUNT_NAMES||[]))if(!G2.rawNames.includes(n))G2.rawNames.unshift(n);
  G2.scrubs.push([/Singapore Management University/gi,'Your University'],[/\bSMU\b/g,'University']);
  if(!G2.__wrapped){const o=G2.capOne;G2.capOne=async(id,url,layout,opts={})=>o(id,url,layout,{...opts,pre:async(p)=>{await G2.maskBrand(p);if(opts.pre)await opts.pre(p)}});G2.__wrapped=true}};
// DPR-independent diff: both shots scaled to the logical viewport.
G2.diff2=async(id,l)=>{const dir=G2.dirOf(id,l);const a=(await fs.readFile(dir+'live.png')).toString('base64'),b=(await fs.readFile(dir+'rec.png')).toString('base64');const W=G2.VP[l].width,H=G2.VP[l].height;
  const r=await G2.rec.evaluate(async([a,b,W,H])=>{const ld=s=>new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.src='data:image/png;base64,'+s});const [A,B]=await Promise.all([ld(a),ld(b)]);
   const mk=i=>{const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(i,0,0,W,H);return x.getImageData(0,0,W,H)};
   const da=mk(A),db=mk(B);const out=document.createElement('canvas');out.width=W;out.height=H;const ox=out.getContext('2d');const od=ox.createImageData(W,H);let diff=0;
   for(let i=0;i<da.data.length;i+=4){const d=Math.abs(da.data[i]-db.data[i])+Math.abs(da.data[i+1]-db.data[i+1])+Math.abs(da.data[i+2]-db.data[i+2]);if(d>48){diff++;od.data[i]=255;od.data[i+3]=255}else{od.data[i]=od.data[i+1]=od.data[i+2]=Math.round(da.data[i]*0.3+140);od.data[i+3]=255}}
   ox.putImageData(od,0,0);return {pct:100*diff/(W*H),png:out.toDataURL('image/png').split(',')[1]}},[a,b,W,H]);
  await fs.writeFile(dir+'diff.png',Buffer.from(r.png,'base64'));return +r.pct.toFixed(2)};
G2.measure3=async(id,l)=>{await G2.rec.setViewportSize(G2.VP[l]);await G2.rec.evaluate(h=>{location.hash=h},'#/'+id);await sleep(600);await G2.rec.evaluate(()=>window.scrollTo(0,0));await sleep(150);
  await fs.writeFile(G2.dirOf(id,l)+'rec.png',await G2.rec.screenshot());return await G2.diff2(id,l)};
