// One-off patch: adds hover, header-icon hover, tooltip and focus-ring behaviour measured on the live site.
// Run: node capture/patch-interactions.js   (idempotent)
const fs=require('fs'),path=require('path');
const rf=path.join(__dirname,'runtime.js'),bf=path.join(__dirname,'build.js');
let r=fs.readFileSync(rf,'utf8'),b=fs.readFileSync(bf,'utf8');
if(!r.includes('/*INTERACTIONS*/')){
const code=`/*INTERACTIONS*/
var hv=null,hvSave=[],tipEl=null,tipT=0,tipH=0;
function setS(el,p,v){hvSave.push([el,p,el.style[p]]);el.style[p]=v}
function unhover(){for(var i=hvSave.length-1;i>=0;i--){hvSave[i][0].style[hvSave[i][1]]=hvSave[i][2]}hvSave=[];hv=null}
function tipLabel(t){if(t.tagName==='BUTTON')return t.getAttribute('aria-label')||'';var im=t.querySelector('img');return im?(im.getAttribute('alt')||''):''}
function hideTip(now){clearTimeout(tipT);if(!tipEl)return;if(now){tipEl.remove();tipEl=null;return}clearTimeout(tipH);var el=tipEl;tipH=setTimeout(function(){el.remove();if(tipEl===el)tipEl=null},120)}
function showTip(t,label){clearTimeout(tipT);tipT=setTimeout(function(){if(hv!==t||!label)return;clearTimeout(tipH);if(tipEl){tipEl.remove();tipEl=null}
  var d=document.createElement('div');d.setAttribute('data-popup','tip');d.style.cssText='position:absolute;left:0;top:0;background:#202122;color:#fff;font:14px/19px Lato,sans-serif;padding:9px 14px 10px;border-radius:6px;box-shadow:0 2px 12px rgba(0,0,0,.15);white-space:nowrap;z-index:100000;pointer-events:none';
  d.innerHTML='<span style="position:absolute;left:50%;top:-6px;width:12px;height:12px;margin-left:-6px;background:#202122;transform:rotate(45deg);border-radius:2px"></span>';d.appendChild(document.createTextNode(label));document.body.appendChild(d);
  var r=t.getBoundingClientRect(),w=d.offsetWidth,icon=/alerts$/.test(label),x=r.left+r.width/2-w/2;x=Math.max(4,Math.min(x,document.documentElement.clientWidth-w-4));
  d.style.left=(x+window.pageXOffset)+'px';d.style.top=(r.bottom+window.pageYOffset-(icon?1:10))+'px';tipEl=d},300)}
document.addEventListener('mouseover',function(e){
  var t=e.target.closest&&e.target.closest('a[data-href],button');if(t&&!app.contains(t))t=null;
  if(t===hv)return;unhover();hideTip(false);if(!t)return;hv=t;
  var cs=getComputedStyle(t),inHead=!!t.closest('header'),txt=t.textContent.replace(/\\s+/g,' ').trim();
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
`;
r=r.replace('function go(u,newtab){',code+'function go(u,newtab){');
// on re-render clear any stale hover/tooltip
r=r.replace('cur=id;openKey=null;baseHTML=pick(s);','hvSave=[];hv=null;if(typeof hideTip==="function")hideTip(true);cur=id;openKey=null;baseHTML=pick(s);');
fs.writeFileSync(rf,r);console.log('runtime patched');}
if(!b.includes('focus-visible{outline:2px')){
b=b.replace('#app :not(:focus):not(:focus-visible){outline-style:none!important}','#app :not(:focus):not(:focus-visible){outline-style:none!important}\\n#app :focus-visible{outline:2px solid #006fbf!important}');
fs.writeFileSync(bf,b);console.log('build patched');}
