// node build.js assembles the standalone HTML; --check validates without writing output.
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const {createSanitizer,normUrl,jsonForScript,SAMPLE_NOTICE}=require('./sample-sanitize');
const base=path.resolve(__dirname,'..')+'/';
// shared.json is stored as shared.json.part01, .part02, ... in the repo (the plain file is 57 MB, over the web upload limit). Use either form.
const sharedPath=base+'capture/shared.json';
const readShared=()=>{if(fs.existsSync(sharedPath))return fs.readFileSync(sharedPath,'utf8');const dir=base+'capture/';const parts=fs.readdirSync(dir).filter(f=>/^shared\.json\.part\d+$/.test(f)).sort();if(!parts.length)throw new Error('shared.json or shared.json.partNN files are missing');return Buffer.concat(parts.map(f=>fs.readFileSync(dir+f))).toString('utf8')};
const shared=JSON.parse(readShared());
const screens=JSON.parse(fs.readFileSync(base+'capture/screens.json','utf8'));
const cfg=fs.existsSync(base+'capture/config.json')?JSON.parse(fs.readFileSync(base+'capture/config.json','utf8')):{BPM:767,BPT:0};
const fonts=JSON.parse(fs.readFileSync(base+'capture/fonts.json','utf8'));
const clean=createSanitizer(shared.imgCache||{});
// screens.json is the ONLY allowlist. Never enumerate cap_* or visit _archive.
const ids=Object.keys(screens),active=new Set(ids),usedStyles=new Set();
const S={},U={};const SV=[],SVm=new Map(),IM=[],IMm=new Map();
const noteStyles=h=>{for(const m of h.matchAll(/\bclass\s*=\s*"([^"]*)"/gi))for(const c of m[1].split(/\s+/)){const n=/^s(\d+)$/.exec(c);if(n)usedStyles.add(+n[1])}};
const opt=h=>{if(!h)return h;noteStyles(h);h=h.replace(/<svg\b[\s\S]*?<\/svg>/gi,m=>{let i=SVm.get(m);if(i===undefined){i=SV.length;SV.push(m);SVm.set(m,i)}return '<i data-svg="'+i+'"></i>'});h=h.replace(/ src="(data:image[^"]+)"/gi,(m,u)=>{let i=IMm.get(u);if(i===undefined){i=IM.length;IM.push(u);IMm.set(u,i)}return ' data-isrc="'+i+'"'});return h};
const rd=(id,l)=>{if(!active.has(id)||!/^[a-z0-9_-]+$/i.test(id))throw Error('Invalid active screen ID: '+id);const f=base+'capture/cap_'+id+'-'+l+'.json';return fs.existsSync(f)?JSON.parse(fs.readFileSync(f,'utf8')):null};
const routeCollisions=[];let captureCount=0;
const addRoute=(url,id)=>{if(!url)return;const key=normUrl(clean.route(url));if(Object.prototype.hasOwnProperty.call(U,key)&&U[key]!==id)routeCollisions.push({key,kept:U[key],other:id});else U[key]=id};
for(const id of ids){const d=rd(id,'d'),m=rd(id,'m'),t=rd(id,'t'),meta=screens[id]||{},x=d||m||t;if(!x)throw Error('Missing active capture: '+id);
 captureCount += [d,m,t].filter(Boolean).length;
 S[id]={t:clean.text(x.title),u:clean.route(x.url),d:d?opt(clean.html(d.html)):null,m:m?opt(clean.html(m.html)):null,tb:t?opt(clean.html(t.html)):null,bg:clean.css(x.bodyBg||''),ext:!!meta.ext,nt:!!meta.newtab};
 addRoute(x.url,id);addRoute(meta.url,id);for(const a of(meta.aliases||[]))addRoute(a,id);
}
const extra=fs.existsSync(base+'capture/states.json')?JSON.parse(fs.readFileSync(base+'capture/states.json','utf8')):{};
// Popup captures for inactive/archived screens are not bundled, header d/m/t are.
if(extra.p)extra.p=Object.fromEntries(Object.entries(extra.p).filter(([id])=>active.has(id)));
const mapStr=o=>typeof o==='string'?opt(o):Array.isArray(o)?o.map(mapStr):(o&&typeof o==='object')?Object.fromEntries(Object.entries(o).map(([k,v])=>[k,mapStr(v)])):o;
const extraOpt=mapStr(clean.tree(extra));
const DEF={"position":"static","top":"auto","right":"auto","bottom":"auto","left":"auto","z-index":"auto","float":"none","clear":"none","box-sizing":"content-box","flex-direction":"row","flex-wrap":"nowrap","flex-grow":"0","flex-shrink":"1","flex-basis":"auto","justify-content":"normal","align-items":"normal","align-self":"auto","align-content":"normal","order":"0","gap":"normal","row-gap":"normal","column-gap":"normal","grid-template-columns":"none","grid-template-rows":"none","grid-column-start":"auto","grid-column-end":"auto","grid-row-start":"auto","grid-row-end":"auto","grid-auto-flow":"row","justify-items":"normal","margin-top":"0px","margin-right":"0px","margin-bottom":"0px","margin-left":"0px","padding-top":"0px","padding-right":"0px","padding-bottom":"0px","padding-left":"0px","min-width":"auto","max-width":"none","min-height":"auto","max-height":"none","border-top-width":"0px","border-right-width":"0px","border-bottom-width":"0px","border-left-width":"0px","border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","border-top-left-radius":"0px","border-top-right-radius":"0px","border-bottom-right-radius":"0px","border-bottom-left-radius":"0px","background-color":"rgba(0, 0, 0, 0)","background-image":"none","background-size":"auto","background-position":"0% 0%","background-repeat":"repeat","box-shadow":"none","opacity":"1","overflow-x":"visible","overflow-y":"visible","transform":"none","vertical-align":"baseline","outline-style":"none","object-fit":"fill","aspect-ratio":"auto","white-space-collapse":"collapse","transition":"all 0s ease 0s","mask-image":"none","mask-size":"auto","mask-position":"0% 0%","mask-repeat":"repeat","filter":"none","clip-path":"none","-webkit-line-clamp":"none","-webkit-box-orient":"horizontal","pointer-events":"auto"};
const INHB=":where(#app *){font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;line-height:inherit;letter-spacing:inherit;word-spacing:inherit;color:inherit;text-align:inherit;text-transform:inherit;text-indent:inherit;white-space:inherit;visibility:inherit;cursor:inherit;list-style-type:inherit;list-style-position:inherit;text-decoration-line:none;text-shadow:inherit;direction:inherit;word-break:inherit;overflow-wrap:inherit;tab-size:inherit;font-variant-caps:inherit;text-overflow:clip}";
const baseline=":where(#app *){"+Object.entries(DEF).map(([k,v])=>k+":"+v).join(";")+";border-top-color:currentcolor;border-right-color:currentcolor;border-bottom-color:currentcolor;border-left-color:currentcolor}";
const EXTRA=":where(#app table){border-spacing:0}\n#app :not(:focus):not(:focus-visible){outline-style:none!important}\n#app :focus-visible{outline:2px solid #006fbf!important}";
const css=INHB+"\n"+baseline+"\n"+EXTRA+"\n"+[...usedStyles].sort((a,b)=>a-b).map(i=>{if(typeof shared.styleList[i]!=='string')throw Error('Missing used style s'+i);const st=clean.css(shared.styleList[i]);const d=st.split(";").filter(x=>{const j=x.indexOf(":");const k=x.slice(0,j),v=x.slice(j+1);return !(k in DEF&&DEF[k]===v)&&!(/^border-.*-color$/.test(k)&&0)}).join(";");return d?".s"+i+"{"+d+"}":""}).join("\n");
for(const w of[400,700])if(typeof fonts[w]!=='string'||!/^[a-z0-9+/=\s]+$/i.test(fonts[w]))throw Error('Invalid inline font '+w);
const fontcss=`@font-face{font-family:Lato;font-weight:400;src:url(data:font/woff2;base64,${fonts[400]}) format("woff2")}@font-face{font-family:Lato;font-weight:700;src:url(data:font/woff2;base64,${fonts[700]}) format("woff2")}`;
const js=fs.readFileSync(base+'capture/runtime.js','utf8');
const html=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>eLearn Version A</title><style>${fontcss}
html,body{margin:0;padding:0}body{font-family:Lato,"Lucida Sans Unicode","Lucida Grande",sans-serif}
#app select{-webkit-appearance:none;appearance:none}.nsb{scrollbar-width:none}.nsb::-webkit-scrollbar{display:none}
#nc{display:none;position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#fff3cd;border:1px solid #d9b44a;color:#333;padding:10px 16px;z-index:99999;font:14px Lato,sans-serif;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.2)}
body.hmode [data-href],body.hmode [data-nav]{outline:2px dashed #e0245e!important;outline-offset:-2px}
#hlab{display:none;position:fixed;right:8px;bottom:8px;background:#000;color:#0f0;font:12px monospace;padding:4px 8px;z-index:99999;max-width:60vw;word-break:break-all}
${css}</style></head><body><div id="app"></div><div id="nc"></div><div id="hlab"></div>
<script>var SAMPLE_NOTICE=${jsonForScript(SAMPLE_NOTICE)};var S=${jsonForScript(S)};var U=${jsonForScript(U)};var BPM=${Number.isFinite(+cfg.BPM)?+cfg.BPM:767};var BPT=${Number.isFinite(+cfg.BPT)?+cfg.BPT:0};var ST=${jsonForScript(extraOpt)};var SV=${jsonForScript(SV)};var IM=${jsonForScript(IM)};
${js.replace(/<\/script/gi,'<\\/script').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029')}</script></body></html>`;
// Syntax + privacy/resource assertions, no browser and no network calls.
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];new vm.Script(script,{filename:'standalone-inline.js'});
const captured=[...Object.values(S).flatMap(s=>[s.d,s.m,s.tb].filter(Boolean)),...SV];
const visit=o=>{if(typeof o==='string')captured.push(o);else if(o&&typeof o==='object')Object.values(o).forEach(visit)};visit(extraOpt);
const auditMarkup=captured.join('\n');
if(/@@IMG(?::|\s)/.test(auditMarkup+css))throw Error('Unresolved image token');
if(/<script\b|\son[a-z]+\s*=|\b(?:action|formaction|srcdoc|srcset)\s*=/i.test(auditMarkup))throw Error('Captured active markup survived');
for(const a of auditMarkup.matchAll(/\s(src|href|xlink:href|poster)\s*=\s*"([^"]*)"/gi))if(!/^(?:data:image\/|#[\w.:-]+$)/i.test(a[2]))throw Error('Unsafe active asset '+a[1]);
if(/url\(\s*["']?(?:https?:|file:|\/\/)/i.test(css))throw Error('External CSS resource survived');
if(/<\/script/i.test(script))throw Error('Inline script terminator survived');
const check=process.argv.includes('--check');
if(!check)fs.writeFileSync(base+'elearn_version_a.html',html);
console.log(JSON.stringify({mode:check?'check-only (no output written)':'built',screens:ids.length,captures:captureCount,stylesUsed:usedStyles.size,stylesAvailable:shared.styleList.length,svgAssets:SV.length,imageAssets:IM.length,inlineFontWeights:[400,700],routes:Object.keys(U).length,routeCollisions:routeCollisions.length,bytes:Buffer.byteLength(html),MB:(Buffer.byteLength(html)/1e6).toFixed(2),sanitizer:clean.stats},null,2));
if(routeCollisions.length)console.log('Route collisions (first route retained):',JSON.stringify(routeCollisions));
