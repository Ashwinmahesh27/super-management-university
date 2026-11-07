'use strict';
// Build-time only. Capture files remain read-only; never fetch missing assets.
const SAMPLE_NOTICE = 'This standalone prototype uses local sample data. Names, accounts, contact details and course labels are illustrative; links and forms do not contact the original learning system.';
const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const decodeEntities = s => String(s).replace(/&#(?:x([0-9a-f]+)|(\d+));?/gi, (m, h, d) => {
  const n = parseInt(h || d, h ? 16 : 10); return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : '';
}).replace(/&(amp|quot|apos|lt|gt|nbsp|colon|tab|newline);/gi, (m, n) => ({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',colon:':',tab:'\t',newline:'\n'})[n.toLowerCase()]);
const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escText = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonForScript = o => JSON.stringify(o).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
// Runtime must use the same case folding, parameter sorting and removal policy.
// Names to mask are supplied locally, never stored in this file: SANITIZE_NAMES='First Last|Other Name' node capture/build.js
const PRIVATE_NAME_RE=(()=>{const raw=(process.env.SANITIZE_NAMES||'').split('|').map(s=>s.trim()).filter(Boolean);
  if(!raw.length)return /$^/g;
  const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s+');
  return new RegExp('\\b(?:'+raw.map(esc).join('|')+')(?:\\s+_)?','gi');})();
function normUrl(value) {
  const raw = decodeEntities(value || '').trim().replace(/^https?:\/\/elearn\.smu\.edu\.sg(?=[:/]|$)(?::\d+)?/i, '')
    .replace(/\/userprogress\/\d+(?=\/)/gi, '/userprogress/00000000').replace(/#.*$/, '');
  const q = raw.indexOf('?'), pathname = (q < 0 ? raw : raw.slice(0, q)).toLowerCase();
  const pairs = [...new URLSearchParams(q < 0 ? '' : raw.slice(q + 1))]
    .filter(([k]) => !/^(?:search|searchstring|sort|sortfield|sortdirection|fbclid|gclid|msclkid)$/i.test(k) && !/^utm_/i.test(k))
    .map(([k,v]) => [k.toLowerCase(),v.toLowerCase()])
    .sort((a,b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0);
  const query = new URLSearchParams(pairs).toString();
  return pathname + (query ? '?' + query : '');
}
function createSanitizer(imgCache = {}) {
  const stats = {textChanges:0, emailsMasked:0, scriptsRemoved:0, attributesRemoved:0, inputValuesRemoved:0, imagesResolved:0, imageFallbacks:0, blankSourcesRemoved:0, cssURLsBlocked:0};
  const assetCache = new Map();
  function text(value) {
    if (value == null) return value;
    const original = String(value);
    let s = original.replace(/[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, () => {stats.emailsMasked++; return 'student@example.com';})
      .replace(/https?:\/\/elearn\.smu\.edu\.sg(?=[:/]|$)(?::\d+)?/gi, '')
      .replace(/\/d2l\/home\/\d+(?=[/?#\s"'<>]|$)/gi, '/d2l/home/462330')
      .replace(/\/userprogress\/\d+(?=\/)/gi, '/userprogress/00000000')
      .replace(/\b94206\b/g, '00000000')/*PRIV2*/
      .replace(/https?:\/\/coursefeedback\.intranet\.[^\s"'<>\\]*/gi, 'https://feedback.example.edu/student')
      .replace(/\b(?:[a-z0-9-]+\.)*edu\.sg\b/gi, 'example.edu')
      .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?=\.[a-z]+\.api\.brightspace\.com)/gi, '00000000-0000-0000-0000-000000000000')
      .replace(/chat\.learnwise\.ai/gi, 'chat.example.edu')
      .replace(/MGMT\s?6026/g, 'BUS200').replace(/MKTG\s?628/g, 'MKT300').replace(/KEj0auvJeU/g, 'sample-token')
      .replace(PRIVATE_NAME_RE, 'Student').replace(/\bStudent\s+Name(?:\s+_)?/gi, 'Student')
      .replace(/\bMGMT6026(?:-?G\d+)?(?:-Entrepreneurship and Intrapreneurship)?/gi, 'BUS200 Entrepreneurship Essentials')
      .replace(/\bEntrepreneurship and Intrapreneurship\b/gi, 'Entrepreneurship Essentials')
      .replace(/\bMKTG628(?:-?G\d+(?:-\d+)?)?(?:-Digital Marketing(?:-G\d+)?)?/gi, 'MKT300 Digital Marketing')
      .replace(/\bSingapore\s+Management\s+University\b/gi, 'Your University')
      .replace(/(?<![a-z0-9])smu(?![a-z0-9])/gi, 'Your University');
    if (s !== original) stats.textChanges++;
    return s;
  }
  function route(value) {
    let s = decodeEntities(value || '').trim();
    if (/^(?:javascript|vbscript|data|file|blob):/i.test(s.replace(/[\x00-\x20]/g,''))) return '#';
    // Emails are intentionally generic, even those exempted by capOne's old scrub.
    s = s.replace(/^mailto:[^?#]*/i, 'mailto:student@example.com');
    s = s.replace(/https?:\/\/([^/\s?#]*feedback[^/\s?#]*)(?=[/?#]|$)/gi, 'https://feedback.example.edu');
    s = text(s);
    // Original institution domains are not appropriate even in inert route metadata.
    s = s.replace(/(?:[a-z0-9-]+\.)*Your University\.edu\.sg/gi, 'sample.example.edu');
    return s;
  }
  function image(value, allowFont = false) {
    let s = decodeEntities(value || '').trim();
    if (!s) return ''; // Never turn a captured blank into src="" (a page request).
    if (assetCache.has((allowFont?'f:':'i:')+s)) return assetCache.get((allowFont?'f:':'i:')+s);
    const original = s;
    let result = '';
    if (/^data:image\/(?:png|jpe?g|gif|webp|avif|bmp|x-icon|vnd\.microsoft\.icon);base64,[a-z0-9+/=\s]+$/i.test(s)) result = s;
    else if (allowFont && /^data:(?:font\/(?:woff2?|ttf|otf)|application\/(?:font-woff|x-font-woff|octet-stream));base64,[a-z0-9+/=\s]+$/i.test(s)) result = s;
    else if (/^data:image\/svg\+xml(?:;charset=[^;,]+)?(?:;base64)?,/i.test(s)) {
      try {
        const comma = s.indexOf(','), head = s.slice(0,comma), content = /;base64/i.test(head) ? Buffer.from(s.slice(comma+1),'base64').toString('utf8') : decodeURIComponent(s.slice(comma+1));
        const safe = html(content);
        if (/<svg\b/i.test(safe)) result = 'data:image/svg+xml;base64,'+Buffer.from(safe).toString('base64');
      } catch (_) { /* malformed data asset falls back without a request */ }
    }
    if (!result) { result = BLANK_IMAGE; stats.imageFallbacks++; }
    assetCache.set((allowFont?'f:':'i:')+original,result);
    return result;
  }
  function resolveImages(value) {
    return String(value || '').replace(/@@IMG(?::|\s+)([\s\S]*?)@@/g, (m,url) => {
      const key = decodeEntities(url).trim();
      if (Object.prototype.hasOwnProperty.call(imgCache,key) && imgCache[key]) {stats.imagesResolved++; return image(imgCache[key]);}
      stats.imageFallbacks++; return BLANK_IMAGE;
    });
  }
  function css(value) {
    let s = resolveImages(value || '');
    // Protect data payloads from text substitutions (e.g. a short name-like string inside base64).
    const urls = [];
    s = s.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/gi, (m,a,b,c) => {
      const u = decodeEntities(a ?? b ?? c ?? '').trim().replace(/\\([0-9a-f]{1,6})\s?/gi, (m,h)=>String.fromCodePoint(parseInt(h,16))).replace(/\\(.)/g,'$1');
      let out;
      if (!u) out = 'none';
      else if (/^#[a-z0-9_.:-]+$/i.test(u)) out = 'url("'+u+'")';
      else if (/^data:/i.test(u)) out = 'url("'+image(u,true)+'")';
      else {stats.cssURLsBlocked++; out = 'none';}
      const key = '\u0003ASSET'+urls.length+'\u0004'; urls.push(out); return key;
    });
    s = s.replace(/@import\b[^;{}]*(?:;|$)/gi,'').replace(/(?:expression|(?:-moz-)?binding|behavior)\s*:[^;{}]*/gi,'')
      .replace(/expression\s*\([^;{}]*/gi,'').replace(/<\/?(?:style|script)\b[^>]*>/gi,'');
    s = text(s).replace(/<\/style/gi, '').replace(/\u0003ASSET(\d+)\u0004/g,(m,n)=>urls[+n]);
    return s;
  }
  const forbidden = new Set(['script','iframe','object','embed','applet','link','meta','base','template','noscript','animate','animatemotion','animatetransform','set']);
  const containers = new Set(['script','iframe','object','applet','template','noscript','animate','animatemotion','animatetransform','set']);
  function html(value) {
    const source = resolveImages(value || '');
    // Quoted '>' is legal in attributes. Tokens preserve all harmless capture markup.
    const tokens = source.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^>"']*(?:(?:"[^"]*"|'[^']*')[^>"']*)*>|[^<]+|</g) || [];
    let out = '', blocked = null, depth = 0, textarea = false, svgDepth = 0, style = false, styleBody = '';
    for (const token of tokens) {
      const match = /^<\s*(\/?)\s*([a-zA-Z][\w:-]*)/.exec(token);
      const tag = match ? match[2].toLowerCase() : '', closing = !!(match && match[1]);
      if (blocked) {
        if (tag === blocked) {if (closing) {if (--depth <= 0) blocked = null;} else if (!/\/\s*>$/.test(token)) depth++;}
        continue;
      }
      if (style) {if (tag === 'style' && closing) {out += css(styleBody)+'</style>'; style=false;styleBody='';} else styleBody+=token;continue;}
      if (textarea) {if (tag==='textarea'&&closing) {out+='</textarea>';textarea=false;}continue;}
      if (!match) {if (!/^<!/.test(token)) out+=escText(text(decodeEntities(token)));continue;}
      if (forbidden.has(tag)) {stats.scriptsRemoved += tag==='script'&&!closing ? 1:0;if(!closing&&containers.has(tag)&&!/\/\s*>$/.test(token)){blocked=tag;depth=1;}continue;}
      if (closing) {out+='</'+(svgDepth ? match[2] : tag)+'>';if(tag==='svg')svgDepth=Math.max(0,svgDepth-1);continue;}
      if(tag==='svg')svgDepth++;
      const attrs = [];
      const ar = /([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
      const body = token.slice(match[0].length).replace(/\/?\s*>$/,'');
      let am;
      while ((am=ar.exec(body))) attrs.push({name:am[1].toLowerCase(),rawName:am[1],value:decodeEntities(am[2]??am[3]??am[4]??''),boolean:am[2]===undefined&&am[3]===undefined&&am[4]===undefined});
      const get=n=>(attrs.find(a=>a.name===n)||{}).value||'';
      const search = tag==='input' && (get('type').toLowerCase()==='search' || /search/i.test(get('name')+' '+get('placeholder')));
      const built = [], seen = new Set();
      for (const attr of attrs) {
        let {name,value:v,boolean} = attr;
        if(seen.has(name))continue;seen.add(name);
        if (/^on/i.test(name)||['srcset','srcdoc','action','formaction','ping','manifest','background','codebase','archive','data-r','nonce','integrity','autofocus'].includes(name)) {stats.attributesRemoved++;continue;}
        if (name==='value' && ['input','textarea','option','select'].includes(tag)) {
          const safe=text(v);
          if (!search || v!==safe || /[@<>\r\n]|(?:https?|file):|password|token|secret/i.test(v) || v.length>120) {stats.inputValuesRemoved++;continue;}
          v=safe;
        } else if (['src','poster'].includes(name)) {
          if(!v.trim()){stats.blankSourcesRemoved++;continue;}
          if(!['img','image','source','video','audio'].includes(tag)){stats.attributesRemoved++;continue;}
          v=image(v);
        } else if (name==='href'||name==='xlink:href') {
          if(svgDepth && /^#[\w.:-]+$/.test(v)) {/* same-document SVG symbol reference */}
          else if(tag==='image') {v=image(v);}
          else if(tag==='a'&&!svgDepth) {name='data-href';v=route(v);}
          else {stats.attributesRemoved++;continue;}
        } else if (name==='data-href'||name==='data-external-iframe') v=route(v);
        else if(name==='style')v=css(v);
        else if((name==='fill'||name==='stroke'||name==='filter'||name==='clip-path'||name==='mask') && /url\(/i.test(v))v=css(v);
        else v=text(v);
        built.push(' '+(svgDepth && name===attr.name ? attr.rawName : name)+(boolean?'':'="'+escAttr(v)+'"'));
      }
      // Forms must never submit or load anything; captured UI remains otherwise intact.
      const outputTag = tag==='form'?'div':(svgDepth ? match[2] : tag);
      out+='<'+outputTag+built.join('')+(/\/\s*>$/.test(token)?'/>':'>');
      if(tag==='textarea')textarea=true;
      if(tag==='style'){style=true;styleBody='';}
    }
    return out.replace(/<\/form>/gi,'</div>');
  }
  function tree(value) {
    if (typeof value === 'string') return /<[a-zA-Z!/]/.test(value) ? html(value) : text(value);
    if (Array.isArray(value)) return value.map(tree);
    if (value && typeof value==='object') return Object.fromEntries(Object.entries(value).map(([k,v])=>[text(decodeEntities(k)),tree(v)]));
    return value;
  }
  return {text,route,html,css,image,tree,resolveImages,stats};
}
module.exports = {createSanitizer,normUrl,jsonForScript,SAMPLE_NOTICE,BLANK_IMAGE};
