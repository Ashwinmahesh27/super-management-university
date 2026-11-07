(function(){
const INH=['font-family','font-size','font-weight','font-style','line-height','letter-spacing','word-spacing','color','text-align','text-transform','text-indent','white-space','visibility','cursor','list-style-type','list-style-position','text-decoration-line','text-shadow','direction','word-break','overflow-wrap','tab-size','font-variant-caps','text-overflow'];
const NON=['display','position','top','right','bottom','left','z-index','float','clear','box-sizing','flex-direction','flex-wrap','flex-grow','flex-shrink','flex-basis','justify-content','align-items','align-self','align-content','order','gap','row-gap','column-gap','grid-template-columns','grid-template-rows','grid-column-start','grid-column-end','grid-row-start','grid-row-end','grid-auto-flow','justify-items','margin-top','margin-right','margin-bottom','margin-left','padding-top','padding-right','padding-bottom','padding-left','min-width','max-width','min-height','max-height','border-top-width','border-right-width','border-bottom-width','border-left-width','border-top-style','border-right-style','border-bottom-style','border-left-style','border-top-color','border-right-color','border-bottom-color','border-left-color','border-top-left-radius','border-top-right-radius','border-bottom-right-radius','border-bottom-left-radius','background-color','background-image','background-size','background-position','background-repeat','box-shadow','opacity','overflow-x','overflow-y','transform','vertical-align','text-decoration-color','outline-style','object-fit','transition','width','height','aspect-ratio','mask-image','mask-size','mask-position','mask-repeat','filter','clip-path','-webkit-line-clamp','-webkit-box-orient','pointer-events','white-space-collapse'];
const DEF={'position':'static','top':'auto','right':'auto','bottom':'auto','left':'auto','z-index':'auto','float':'none','clear':'none','box-sizing':'content-box','flex-direction':'row','flex-wrap':'nowrap','flex-grow':'0','flex-shrink':'1','flex-basis':'auto','justify-content':'normal','align-items':'normal','align-self':'auto','align-content':'normal','order':'0','gap':'normal','row-gap':'normal','column-gap':'normal','grid-template-columns':'none','grid-template-rows':'none','grid-column-start':'auto','grid-column-end':'auto','grid-row-start':'auto','grid-row-end':'auto','grid-auto-flow':'row','justify-items':'normal','margin-top':'0px','margin-right':'0px','margin-bottom':'0px','margin-left':'0px','padding-top':'0px','padding-right':'0px','padding-bottom':'0px','padding-left':'0px','min-width':'auto','max-width':'none','min-height':'auto','max-height':'none','border-top-width':'0px','border-right-width':'0px','border-bottom-width':'0px','border-left-width':'0px','border-top-style':'none','border-right-style':'none','border-bottom-style':'none','border-left-style':'none','border-top-left-radius':'0px','border-top-right-radius':'0px','border-bottom-right-radius':'0px','border-bottom-left-radius':'0px','background-color':'rgba(0, 0, 0, 0)','background-image':'none','background-size':'auto','background-position':'0% 0%','background-repeat':'repeat','box-shadow':'none','opacity':'1','overflow-x':'visible','overflow-y':'visible','transform':'none','vertical-align':'baseline','outline-style':'none','object-fit':'fill','aspect-ratio':'auto','white-space-collapse':'collapse','transition':'all 0s ease 0s','mask-image':'none','mask-size':'auto','mask-position':'0% 0%','mask-repeat':'repeat','filter':'none','clip-path':'none','-webkit-line-clamp':'none','-webkit-box-orient':'horizontal','pointer-events':'auto'};
const PUA={'width':1,'height':1};
const SKIP=new Set(['SCRIPT','STYLE','LINK','NOSCRIPT','META','TEMPLATE','HEAD','TITLE','BASE']);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const escA=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
window.__cap=function(opts){
 opts=opts||{};
 const styles=[],smap=new Map(),imgs=new Set();let nEl=0;
 const sid=str=>{let i=smap.get(str);if(i===undefined){i=styles.length;styles.push(str);smap.set(str,i)}return i};
 const bg=v=>{return v.replace(/url\("?([^")]+)"?\)/g,(m,u)=>{if(u.startsWith('data:'))return m;try{u=new URL(u,location.href).href}catch(e){}imgs.add(u);return 'url("@@IMG:'+u+'@@")'})};
 const ALWAYS=true;
 function sizeOK(el,cs,p,pcs){const d=cs.display,ps=cs.position;if(d==="contents"||d==="inline"||/^table-(row|header|footer|column)/.test(d))return false;
  const par=el.parentElement,pcsx=par?getComputedStyle(par):null,pd=pcsx?pcsx.display:"";
  if(p==="width"){ if(/flex|grid/.test(pd)||ps==="absolute"||ps==="fixed"||/inline-|table-cell|table$/.test(d)||cs.float!=="none")return true;
    if(!par)return true; const pr=par.getBoundingClientRect(),r=el.getBoundingClientRect();
    const pcw=pr.width-parseFloat(pcsx.paddingLeft)-parseFloat(pcsx.paddingRight)-parseFloat(pcsx.borderLeftWidth)-parseFloat(pcsx.borderRightWidth);
    const outer=r.width+parseFloat(cs.marginLeft)+parseFloat(cs.marginRight);return Math.abs(outer-pcw)>1.5}
  return true}
 function styleOf(el,parentCS,pseudo){
  const cs=getComputedStyle(el,pseudo||null);let out=[];
  for(const p of INH){const v=cs.getPropertyValue(p);if(!parentCS||v!==parentCS.getPropertyValue(p))out.push(p+':'+v)}
  for(const p of NON){let v=cs.getPropertyValue(p);if(!v)continue;
   if(p==='width'||p==='height'){if(!pseudo&&sizeOK(el,cs,p,parentCS)&&v!=='auto'){if(p==='width')out.push('width:'+v);else out.push((cs.overflowY!=='visible'||cs.position==='absolute'||cs.position==='fixed'?'height:':'min-height:')+v)}continue}
   if(p in DEF&&v===DEF[p]&&!ALWAYS)continue;
   if(p==='display'&&v==='inline'&&0)continue;
   if(p==='background-image'||p==='mask-image')v=bg(v);
   if(p.startsWith('border-')&&p.endsWith('-color')){const w=cs.getPropertyValue(p.replace('color','width'));if(w==='0px')continue}
   if(p==='text-decoration-color')continue;
   out.push(p+':'+v)}
  // outline, text-decoration
  return {cs,str:out.join(';')};
 }
 function pseudoHTML(el,which,cs0){
  const pc=getComputedStyle(el,which);const c=pc.getPropertyValue('content');
  if(!c||c==='none'||c==='normal')return '';
  const r=styleOf(el,cs0,which);
  let txt=c.replace(/^"|"$/g,'');
  if(/^url\(/.test(c))txt='';
  let extra='';
  return '<span data-pseudo="'+which+'" class="\u0001'+sid(r.str+';display:'+(pc.display==='inline'?'inline':pc.display))+'\u0002">'+esc(txt)+'</span>';
 }
 function walk(node,parentCS,out,ctx){
  if(node.nodeType===3){const t=node.nodeValue;if(t)out.push(esc(t));return}
  if(node.nodeType!==1)return;
  const el=node,tag=el.tagName;
  if(SKIP.has(tag))return;
  if(el.closest&&el.closest('[data-cap-skip]'))return;
  const cs=getComputedStyle(el);
  if(cs.display==='none')return;
  nEl++;if(opts.max&&nEl>opts.max)return;
  const rect=el.getBoundingClientRect();
  const lt=tag.toLowerCase();
  const isCustom=lt.includes('-');
  if(lt==='slot'){
    const as=el.assignedNodes?el.assignedNodes({flatten:true}):[];
    const kids=as.length?as:[...el.childNodes];
    for(const k of kids)walk(k,parentCS,out,ctx);return}
  const r=styleOf(el,parentCS);
  let outTag=isCustom?'div':lt;
  if(outTag==='html'||outTag==='body')outTag='div';
  if(outTag==='form')outTag='form';
  let attrs=' class="\u0001'+sid(r.str)+'\u0002"';
  if(isCustom)attrs+=' data-el="'+lt+'"';
  if(el.id&&!isCustom)attrs+=' data-id="'+escA(el.id)+'"';
  for(const a of ['href','target','aria-label','title','role','alt','type','placeholder','name','for','colspan','rowspan','aria-expanded','aria-selected','aria-hidden','aria-current','tabindex','aria-haspopup']){
   let v=el.getAttribute(a);if(v==null)continue;
   if(a==='href'){try{if(!/^(javascript|mailto|#)/i.test(v))v=new URL(v,location.href).href}catch(e){}attrs+=' data-href="'+escA(v)+'"';continue}
   attrs+=' '+(a==='target'?'data-target':a)+'="'+escA(v)+'"';}
  attrs+=' data-r="'+[rect.x,rect.y+scrollY,rect.width,rect.height].map(n=>Math.round(n*10)/10).join(',')+'"';
  if(lt==='img'){
    let u=el.currentSrc||el.src;if(u&&!u.startsWith('data:')){try{u=new URL(u,location.href).href}catch(e){}imgs.add(u);u='@@IMG:'+u+'@@'}
    out.push('<img'+attrs+' src="'+escA(u||'')+'" width="'+rect.width+'" height="'+rect.height+'" style="width:'+rect.width+'px;height:'+rect.height+'px">');return}
  if(lt==='svg'||el instanceof SVGElement){
    if(lt==='svg'){
      const clone=el.cloneNode(true);
      // inline computed color-ish on children
      const srcAll=[el,...el.querySelectorAll('*')],dstAll=[clone,...clone.querySelectorAll('*')];
      srcAll.forEach((s,i)=>{const c=getComputedStyle(s),d=dstAll[i];for(const p of ['fill','stroke','stroke-width','opacity','stroke-linecap','stroke-linejoin','fill-rule']){const v=c.getPropertyValue(p);if(v&&v!=='none'||p==='fill')d.style.setProperty(p,v)}});
      clone.setAttribute('width',rect.width);clone.setAttribute('height',rect.height);
      clone.setAttribute('class','\u0001'+sid(r.str)+'\u0002');clone.setAttribute('data-r',[rect.x,rect.y+scrollY,rect.width,rect.height].map(n=>Math.round(n*10)/10).join(','));
      out.push(clone.outerHTML)}
    return}
  if(lt==='input'||lt==='textarea'||lt==='select'){
    let v=el.value||'';
    if(el.type==='password')v='••••••••';
    if(lt==='textarea'){out.push('<textarea'+attrs+' readonly>'+esc(v)+'</textarea>');return}
    if(lt==='select'){out.push('<select'+attrs+'>'+[...el.options].map(o=>'<option'+(o.selected?' selected':'')+'>'+esc(o.text)+'</option>').join('')+'</select>');return}
    out.push('<input'+attrs+' value="'+escA(v)+'"'+(el.checked?' checked':'')+' readonly>');return}
  if(lt==='iframe'){
    let d=null;try{d=el.contentDocument}catch(e){}
    out.push('<div'+attrs+' data-iframe="1">');
    if(d&&d.body){walk(d.body,cs,out,ctx)}
    else out.push('<div data-external-iframe="'+escA(el.src||'')+'" style="width:'+rect.width+'px;height:'+rect.height+'px;background:#f1f5f8"></div>');
    out.push('</div>');return}
  if(lt==='canvas'){let u='';try{u=el.toDataURL('image/jpeg',0.72)}catch(e){}out.push('<img'+attrs+' src=\''+u+'\' width='+rect.width+' height='+rect.height+' style=\'width:'+rect.width+'px;height:'+rect.height+'px\'>');return}
  if(lt==='video'||lt==='canvas'||lt==='audio'||lt==='object'||lt==='embed'){out.push('<div'+attrs+' data-media="'+lt+'" style="width:'+rect.width+'px;height:'+rect.height+'px"></div>');return}
  const VOID=new Set(['br','hr','wbr']);
  if(VOID.has(lt)){out.push('<'+lt+attrs+'>');return}
  out.push('<'+outTag+attrs+'>');
  out.push(pseudoHTML(el,'::before',cs));
  const kids=el.shadowRoot?[...el.shadowRoot.childNodes]:[...el.childNodes];
  for(const k of kids)walk(k,cs,out,ctx);
  out.push(pseudoHTML(el,'::after',cs));
  out.push('</'+outTag+'>');
 }
 const out=[];
 const root=opts.root?document.querySelector(opts.root):document.body;
 const htmlCS=getComputedStyle(document.documentElement);
 walk(root,htmlCS,out,{});
 const bodyCS=getComputedStyle(document.body);
 return {title:document.title,url:location.href,html:out.join(''),styles,imgs:[...imgs],nEl,
  docH:document.documentElement.scrollHeight,docW:document.documentElement.scrollWidth,
  bodyBg:bodyCS.backgroundColor,htmlBg:htmlCS.backgroundColor,bodyFont:bodyCS.fontFamily};
};
})();
