(function(){
var app=document.getElementById('app'),nc=document.getElementById('nc'),cur=null,openKey=null,baseHTML='',lastTrig=null,toastT=0;
window.SAMPLE_NOTICE=typeof SAMPLE_NOTICE!=='undefined'?SAMPLE_NOTICE:'';
/* layout: m = phone (<= BPM), tb = tablet (<= BPT), d = desktop */
function layout(){var w=innerWidth;return w<=BPM?'m':(BPT&&w<=BPT?'tb':'d')}
function stKey(){var l=layout();return l==='tb'?'t':l}
function pick(s){var l=layout();return (l==='m'?s.m:l==='tb'?(s.tb||s.d):s.d)||s.d||s.m}
/* URL normalisation: must match normUrl in capture/sample-sanitize.js */
function norm(v){
  var raw=String(v||'').trim().replace(/\/userprogress\/\d+(?=\/)/gi,'/userprogress/00000000').replace(/#.*$/,'');
  var q=raw.indexOf('?'),p=(q<0?raw:raw.slice(0,q)).toLowerCase();
  var pairs=[];if(q>=0){raw.slice(q+1).split('&').forEach(function(x){if(!x)return;var i=x.indexOf('='),k=i<0?x:x.slice(0,i),val=i<0?'':x.slice(i+1);try{k=decodeURIComponent(k.replace(/\+/g,' '));val=decodeURIComponent(val.replace(/\+/g,' '))}catch(e){}
    if(/^(?:search|searchstring|sort|sortfield|sortdirection|fbclid|gclid|msclkid)$/i.test(k)||/^utm_/i.test(k))return;pairs.push([k.toLowerCase(),val.toLowerCase()])})}
  pairs.sort(function(a,b){return a[0]<b[0]?-1:a[0]>b[0]?1:a[1]<b[1]?-1:a[1]>b[1]?1:0});
  var qs=pairs.map(function(x){return encodeURIComponent(x[0]).replace(/%20/g,'+')+'='+encodeURIComponent(x[1]).replace(/%20/g,'+')}).join('&');
  return p+(qs?'?'+qs:'')}
function hydrate(){var n=app.querySelectorAll('i[data-svg]');for(var i=n.length-1;i>=0;i--){var e=n[i];e.insertAdjacentHTML('afterend',SV[+e.getAttribute('data-svg')]);e.remove()}var m=app.querySelectorAll('[data-isrc]');for(i=0;i<m.length;i++)m[i].src=IM[+m[i].getAttribute('data-isrc')]}
function fixScroll(){var n=app.querySelectorAll('*'),dh0=document.documentElement.scrollHeight;for(var i=0;i<n.length;i++){var e=n[i];if(e.clientHeight>dh0*.8&&e.clientWidth>=innerWidth*.9-20){var c0=getComputedStyle(e);if(/auto|scroll/.test(c0.overflowX+c0.overflowY)){e.style.overflow='visible';continue}}if(e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth){var cs=getComputedStyle(e);if(/auto|scroll/.test(cs.overflowX+cs.overflowY)){var dv=e.scrollHeight-e.clientHeight,dh=e.scrollWidth-e.clientWidth;if(dv<=40&&dh<=40){e.classList.add('nsb');e.style.overflow='visible'}else if(dv>0&&dv<=40&&/auto|scroll/.test(cs.overflowY)){e.style.overflowY='hidden'}}}}}
function toast(msg){nc.textContent=msg;nc.style.display='block';clearTimeout(toastT);toastT=setTimeout(function(){nc.style.display='none'},3500)}
function fixFloat(){var f=app.querySelectorAll('[data-el="d2l-floating-buttons"]');for(var i=0;i<f.length;i++){var d=f[i].querySelectorAll('div');for(var j=0;j<d.length;j++){d[j].style.width='auto';d[j].style.marginLeft='0';d[j].style.marginRight='0';d[j].style.maxWidth='100%'}}}
function render(){
  var id=(location.hash.match(/^#\/([^?]*)/)||[])[1]||'home';
  var s=S[id];
  if(!s){var m=decodeURIComponent((location.hash.match(/[?&]u=(.*)$/)||[])[1]||'');
    app.innerHTML='<div style="font:16px Lato,sans-serif;padding:40px"><h1 style="font-size:28px">Not captured yet</h1><p>This screen has not been captured in Version A yet.</p><p style="color:#565a5c;word-break:break-all">'+m.replace(/</g,'&lt;')+'</p><p><a href="#/home">Back to Homepage</a></p></div>';document.title='Not captured yet';return}
  hvSave=[];hv=null;if(typeof hideTip==="function")hideTip(true);cur=id;openKey=null;baseHTML=pick(s);app.innerHTML=baseHTML;hydrate();fixScroll();fixFloat();document.title=s.t;document.body.style.background=s.bg||'';window.scrollTo(0,0);
}
function ctxOf(){return /^c\d+-/.test(cur||'')?'course':'global'}
function lift(){var ex=app.querySelectorAll('button[aria-expanded="true"][aria-haspopup="true"]');for(var i=0;i<ex.length;i++){var w=ex[i];while(w&&w!==app){if(getComputedStyle(w).position==='static')w.style.position='relative';w.style.zIndex='1000';w=w.parentElement}}}
function setHTML(h){var y=window.pageYOffset;app.innerHTML=h;hydrate();fixScroll();fixFloat();lift();window.scrollTo(0,y)}
function focusOpen(){
  var m=app.querySelector('[role=menu] [role=menuitem][tabindex="0"]')||app.querySelector('[role=menu] [role=menuitem]');
  if(m){m.focus();return}
  var b=app.querySelector('button[aria-expanded="true"]');if(b)b.focus()}
function findTrigger(key){
  var bs=app.querySelectorAll('button[aria-haspopup="true"],button[aria-label="Menu"]');
  for(var i=0;i<bs.length;i++)if(trigKey(bs[i])===key)return bs[i];return null}
function closeMenu(restore){
  if(openKey===null)return;var k=lastTrig;openKey=null;setHTML(baseHTML);
  if(restore!==false&&k){var t=findTrigger(k);if(t)t.focus()}}
function lookup(key){
  var l=stKey(),c=ctxOf(),P=ST.p&&ST.p[cur],H=ST.h&&ST.h[c];
  var pl=P&&P[l],hl=H&&H[l];
  if(hl&&hl[key])return {head:hl[key]};if(pl&&pl[key])return {page:pl[key]};return null}
function show(st){
  if(st.page)setHTML(st.page);else setHTML(baseHTML.replace(/<header[\s\S]*?<\/header>/,function(){return st.head}));
  focusOpen()}
function openMenu(key,trig){var st=lookup(key);if(!st)return false;openKey=key;if(trig!==undefined)lastTrig=trig;show(st);return true}
function trigKey(b){var k=b.getAttribute('aria-label')||b.textContent.replace(/\s+/g,' ').trim();return /, avatar$/.test(k)?'avatar':k}
function itemKey(el){return el.getAttribute('aria-label')||el.textContent.replace(/\s+/g,' ').trim()}
document.addEventListener('click',function(e){
  var t=e.target;if(!t.closest)return;
  /* phone drawer: nested submenu, return, close */
  var ret=t.closest('[data-el="d2l-menu-item-return"]');
  if(ret&&openKey!==null){e.preventDefault();if(layout()==='m'&&openKey!=='Menu'&&lookup('Menu')){openMenu('Menu')}else if(layout()==='tb'&&lookup('More')&&openKey!=='More'&&lookup('More')){openMenu('More')}else closeMenu();return}
  var mi=t.closest('[role=menuitem][aria-haspopup="true"]');
  if(mi&&openKey!==null&&!t.closest('[role=menu] [role=menu] [data-href]')){var k=itemKey(mi);if(k!==openKey&&lookup(k)){e.preventDefault();openMenu(k);return}}
  var cl=t.closest('button[aria-label="close"],button[aria-label="Close"]');
  if(cl&&openKey!==null){e.preventDefault();closeMenu();return}
  var b=t.closest('button[aria-haspopup="true"],button[aria-label="Menu"]');
  if(!b){if(openKey!==null&&!t.closest('[data-href]')&&!t.closest('[role=menu]')&&!t.closest('[data-popup]'))closeMenu(false);return}
  var key=trigKey(b);
  if(openKey===key){closeMenu();return}
  if(openKey!==null){openKey=null;app.innerHTML=baseHTML;hydrate();fixScroll()}
  if(!openMenu(key,key)){toast('This control is not captured yet in Version A.')}
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){closeMenu();return}
  if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.getAttribute&&e.target.getAttribute('role')==='menuitem'){e.preventDefault();e.target.click()}
  if(openKey!==null&&(e.key==='ArrowDown'||e.key==='ArrowUp')){var items=[].slice.call(app.querySelectorAll('[role=menu] [role=menuitem]')),i=items.indexOf(document.activeElement);if(items.length){e.preventDefault();items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()}}
});
/*INTERACTIONS*/
var hv=null,hvSave=[],tipEl=null,tipT=0,tipH=0;
function setS(el,p,v){hvSave.push([el,p,el.style[p]]);el.style[p]=v}
function unhover(){for(var i=hvSave.length-1;i>=0;i--){hvSave[i][0].style[hvSave[i][1]]=hvSave[i][2]}hvSave=[];hv=null}
function tipLabel(t){if(t.tagName==='BUTTON')return t.getAttribute('aria-label')||'';var im=t.querySelector('img');return im?(im.getAttribute('alt')||''):''}
function hideTip(now){clearTimeout(tipT);if(!tipEl)return;if(now){tipEl.remove();tipEl=null;return}clearTimeout(tipH);var el=tipEl;tipH=setTimeout(function(){el.remove();if(tipEl===el)tipEl=null},120)}
function showTip(t,label){clearTimeout(tipT);tipT=setTimeout(function(){if(hv!==t||!label)return;clearTimeout(tipH);if(tipEl){tipEl.remove();tipEl=null}
  var d=document.createElement('div');d.setAttribute('data-popup','tip');d.style.cssText='position:absolute;left:0;top:0;background:#202122;color:#fff;font:14px/19.3px Lato,sans-serif;letter-spacing:.2px;padding:9px 15.5px 10px;border-radius:6px;box-shadow:0 2px 12px rgba(0,0,0,.15);white-space:nowrap;z-index:100000;pointer-events:none';
  d.innerHTML='<span style="position:absolute;left:50%;top:-6px;width:12px;height:12px;margin-left:-6px;background:#202122;transform:rotate(45deg);border-radius:2px"></span>';d.appendChild(document.createTextNode(label));document.body.appendChild(d);
  var r=t.getBoundingClientRect(),w=d.offsetWidth,icon=/alerts$/.test(label),x=r.left+r.width/2-w/2;x=Math.max(4,Math.min(x,document.documentElement.clientWidth-w-4));
  d.style.left=(x+window.pageXOffset)+'px';d.style.top=(r.bottom+window.pageYOffset-(icon?1:10))+'px';tipEl=d},300)}
document.addEventListener('mouseover',function(e){
  var t=e.target.closest&&e.target.closest('a[data-href],button');if(t&&!app.contains(t))t=null;
  if(t===hv)return;unhover();hideTip(false);if(!t)return;hv=t;
  var cs=getComputedStyle(t),inHead=!!t.closest('header'),txt=t.textContent.replace(/\s+/g,' ').trim();
  if(t.tagName==='A'){var c=cs.color;setS(t,'color',c==='rgb(0, 111, 191)'?'#004489':'#006fbf');setS(t,'textDecoration','underline');if(inHead&&t.querySelector('img'))showTip(t,tipLabel(t));return}
  if(inHead){
    if(!txt){var bar=t.querySelector('span');if(bar)setS(bar,'backgroundColor','#006fbf');var sv=t.querySelectorAll('svg *');for(var i=0;i<sv.length;i++)setS(sv[i],'fill','#006fbf');showTip(t,tipLabel(t))}
    else if(!/, avatar$/.test(t.getAttribute('aria-label')||'')&&t.getAttribute('aria-haspopup')){setS(t,'color','#006fbf');setS(t,'textDecoration','underline')}
    return}
  var bg=cs.backgroundColor;
  if(bg==='rgb(227, 233, 241)')setS(t,'backgroundColor','#cdd5dc');
  else if(bg==='rgb(0, 111, 191)')setS(t,'backgroundColor','#004489');
  else if(bg==='rgba(0, 0, 0, 0)')setS(t,'backgroundColor','#e3e9f1');
});
document.addEventListener('mouseout',function(e){if(!e.relatedTarget){unhover();hideTip(false)}});
function go(u,newtab){
  var key=norm(u),id=U[key];
  if(id===undefined)id=U[key.split('?')[0]];
  if(id===undefined&&/^\/d2l\/home\/\d+$/.test(key))id=U['/d2l/home/462330'];
  if(id!==undefined){
    if(S[id].ext&&newtab){window.open(location.pathname+'#/'+id,'_blank');return}
    location.hash='#/'+id;return}
  if(/^https?:/i.test(u)){toast('External link (not captured): '+u);return}
  toast('Not captured yet: '+u.replace(/^https?:\/\/[^\/]+/,''));
}
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('[data-href]');
  if(!a)return;var h=a.getAttribute('data-href');
  if(/^javascript/i.test(h)||h==='#'||h===''){e.preventDefault();return}
  if(/^mailto/i.test(h))return;
  e.preventDefault();go(h,a.getAttribute('data-target')==='_blank');
});
addEventListener('hashchange',render);
addEventListener('resize',function(){var l=layout();if(l!==render.l){render.l=l;render()}});
render.l=layout();
document.addEventListener('keydown',function(e){if((e.key==='h'||e.key==='H')&&!/INPUT|TEXTAREA/.test((e.target||{}).tagName||'')){document.body.classList.toggle('hmode');document.getElementById('hlab').style.display=document.body.classList.contains('hmode')?'block':'none'}});
document.addEventListener('mouseover',function(e){if(!document.body.classList.contains('hmode'))return;var a=e.target.closest('[data-href]');var l=document.getElementById('hlab');if(a){var el=a.getAttribute('data-el')||a.tagName.toLowerCase();l.textContent=el+(a.className?'.'+a.className.split(' ')[0]:'')+'  ->  '+a.getAttribute('data-href')}});
render();
})();
