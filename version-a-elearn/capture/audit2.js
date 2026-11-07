// Full audit harness (checks 2-6 per screen/layout). Load after driver.js + audit.js:
// const s=await fs.readFile(base+'capture/audit2.js','utf8'); await new AF('fs','sleep','Buffer','fetch','G',s)(fs,sleep,Buffer,fetch,globalThis);
// Needs: G.live (eLearn tab), G.rec (recreation tab, served at http://127.0.0.1:18423 for testing only).
const H=globalThis;
H.VP.t={width:820,height:1180};
H.dirOf=(id,l)=>H.base+`audit-shots/${id}-${l==='d'?'desktop':l==='t'?'tablet':'phone'}/`;
H.EXTRACT=`(()=>{const out={els:[],cnt:{h:0,btn:0,a:0,table:0,list:0,input:0,img:0,svg:0},boxes:{}};
 const vis=e=>{const r=e.getBoundingClientRect();if(r.width<=0||r.height<=0||r.x<-5000)return false;let p=e;while(p&&p.nodeType===1){const cs=getComputedStyle(p);if(cs.display==='none'||cs.visibility==='hidden'||cs.opacity==='0')return false;p=p.parentNode&&p.parentNode.host?p.parentNode.host:p.parentElement}return true};
 const sty=e=>{const c=getComputedStyle(e);return [c.fontFamily.split(',')[0].replace(/["']/g,''),c.fontSize,c.fontWeight,c.color,c.backgroundColor,c.borderTopWidth+' '+c.borderTopColor,c.borderTopLeftRadius,c.lineHeight==='normal'?'normal':c.lineHeight,c.paddingTop+' '+c.paddingLeft]};
 let OX=0,OY=0;
 const walk=r=>{r.querySelectorAll('*').forEach(e=>{if(e.shadowRoot)walk(e.shadowRoot);
  if(e.tagName==='IFRAME'){try{const d=e.contentDocument;if(d&&d.body){const fr=e.getBoundingClientRect();const sx=OX,sy=OY;OX+=fr.x+scrollX;OY+=fr.y+scrollY;walk(d);OX=sx;OY=sy}}catch(x){}}
  const t=e.tagName;
  if(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','D2L-TOOLTIP'].includes(t))return;
  if(!vis(e))return;
  if(/^H[1-6]$/.test(t))out.cnt.h++;else if(t==='BUTTON'||e.getAttribute('role')==='button')out.cnt.btn++;else if(t==='A')out.cnt.a++;else if(t==='TABLE'||e.getAttribute('role')==='table')out.cnt.table++;else if(t==='UL'||t==='OL')out.cnt.list++;else if(['INPUT','SELECT','TEXTAREA'].includes(t))out.cnt.input++;else if(t==='IMG')out.cnt.img++;else if(t==='svg'||t==='SVG')out.cnt.svg++;
  let own='';e.childNodes.forEach(n=>{if(n.nodeType===3)own+=n.nodeValue});own=own.replace(/\\s+/g,' ').trim();
  if(own){const b=e.getBoundingClientRect();out.els.push({t:own,tag:t.toLowerCase(),x:b.x+(OX?OX:scrollX),y:b.y+(OY?OY:scrollY),w:b.width,h:b.height,s:sty(e)})}
 })};walk(document);out.docH=document.documentElement.scrollHeight;return out})()`;
H.normT=s=>H.SAN.text(String(s)).replace(/\b(?:Your |Sample )?University\b/g,'U').replace(/\s+/g,' ').trim();
H.compare=(L,R)=>{const key=(o,seen)=>{const k=H.normT(o.t);const n=(seen[k]=(seen[k]||0)+1);return k+'#'+n};const sl={},sr={};const ml=new Map(),mr=new Map();L.els.forEach(o=>ml.set(key(o,sl),o));R.els.forEach(o=>mr.set(key(o,sr),o));
 let missing=0,extra=0,geo=0,geoTot=0,sty=0,styTot=0;const miss=[],ext=[],gf=[],sf=[];
 for(const [k,o] of ml){const r=mr.get(k);if(!r){missing++;if(miss.length<6)miss.push(k.slice(0,50));continue}
  geoTot++;const d=[o.x-r.x,o.y-r.y,o.w-r.w,o.h-r.h].map(Math.abs);if(d.some(v=>v>2)){geo++;if(gf.length<6)gf.push(k.slice(0,30)+' '+d.map(v=>v.toFixed(1)).join('/'))}
  styTot++;const ds=o.s.map((v,i)=>v===r.s[i]?null:i).filter(v=>v!==null);if(ds.length){sty++;if(sf.length<6)sf.push(k.slice(0,26)+' ['+ds.map(i=>['font','size','weight','color','bg','border','radius','lh','pad'][i]+':'+o.s[i]+'>'+r.s[i]).join(';')+']')}}
 for(const [k] of mr)if(!ml.has(k)){extra++;if(ext.length<6)ext.push(k.slice(0,50))}
 const cn=Object.keys(L.cnt).filter(k=>L.cnt[k]!==R.cnt[k]).map(k=>k+':'+L.cnt[k]+'/'+R.cnt[k]);
 return {strings:ml.size,missing,extra,geoTot,geoFail:geo,styTot,styFail:sty,structDiff:cn,docH:[Math.round(L.docH),Math.round(R.docH)],miss,ext,gf,sf}};
H.liveUrl=id=>{const u=H.screens[id].url;return u.startsWith('http')?u:H.E+u};
H.auditPair=async(id,l)=>{
 await H.live.setViewportSize(H.VP[l]);await H.live.goto(H.liveUrl(id),{timeout:45000});await sleep(H.screens[id].sampleDocument?1200:1900);await H.maskBrand(H.live);await H.doMask();await sleep(150);
 await H.live.evaluate(()=>window.scrollTo(0,0));const L=await H.live.evaluate(H.EXTRACT);await fs.mkdir(H.dirOf(id,l),{recursive:true});await fs.writeFile(H.dirOf(id,l)+'live.png',await H.live.screenshot({timeout:30000}));
 await H.rec.setViewportSize(H.VP[l]);await H.rec.evaluate(h=>{location.hash=h},'#/'+id);await sleep(650);
 await H.rec.evaluate(()=>{window.scrollTo(0,0);if(!document.getElementById('__nosb')){const s=document.createElement('style');s.id='__nosb';s.textContent='::-webkit-scrollbar{display:none}html{scrollbar-width:none}';document.head.appendChild(s)}});await sleep(150);
 const R=await H.rec.evaluate(H.EXTRACT);await fs.writeFile(H.dirOf(id,l)+'rec.png',await H.rec.screenshot());const px=await H.diff2(id,l);
 const c=H.compare(L,R);c.px=px;if(H.screens[id].sampleDocument)c.sampleDocument=true;H.A[id+'|'+l]=c;return c};
H.loadAudit=async()=>{try{H.A=JSON.parse(await fs.readFile(H.base+'capture/audit-results.json','utf8'))}catch(e){H.A={}}
 H.auditQueue=[];for(const id of Object.keys(H.screens))for(const l of ['d','t','m'])H.auditQueue.push([id,l])};
H.runAudit=async ms=>{const s0=Date.now();let n=0;for(const [id,l] of H.auditQueue){const k=id+'|'+l;if(H.A[k]&&!H.A[k].error)continue;if(Date.now()-s0>ms)break;
 try{await H.auditPair(id,l);n++}catch(e){H.A[k]={error:String(e).slice(0,100)}}}
 await fs.writeFile(H.base+'capture/audit-results.json',JSON.stringify(H.A));return n};
H.boot2=async()=>{const mod={exports:{}};const ssrc=await fs.readFile(H.base+'capture/sample-sanitize.js','utf8');await new H.AF('module','exports','require',ssrc)(mod,mod.exports,n=>{throw new Error('no require '+n)});H.SAN=mod.exports.createSanitizer(H.imgCache);H.normUrlS=mod.exports.normUrl;await H.loadAudit()};
