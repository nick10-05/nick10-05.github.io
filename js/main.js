/* =========================================================
   nikhil.dev — v3
   Edit CONFIG: it's the only place with personal links.
   ========================================================= */
{
const CONFIG = {
  email: 'nnikhilc97@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nnikhilc97',
  leetcode: 'https://leetcode.com/u/nikku-2004',
  resume: 'assets/Nikhil_Chandrakanti_Resume.pdf',
  relayforgeRepo: 'https://github.com/nick10-05/RelayForge',
  hostelRepo: 'https://github.com/nick10-05/HOSTELCONNECT',
  driveRadarRepo: 'https://github.com/nick10-05/driveradar',
  relayforgeDemo: 'https://relayforge-r0l7.onrender.com',
  relayforgeDocs: 'https://relayforge-r0l7.onrender.com/api/v1/docs',
  relayforgeDesign: 'https://github.com/nick10-05/RelayForge/blob/main/docs/design.md',
  relayforgeAdrs: 'https://github.com/nick10-05/RelayForge/tree/main/docs/adr',
  hostelDemo: 'https://hostelconnect-o8e6.onrender.com',
  driveRadarDemo: 'https://driveradar-mocha.vercel.app',
  hostelStatus: 'Shipped · Demo + GitHub'
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- config → page ---------- */
$$('[data-href]').forEach(a => {
  const v = CONFIG[a.dataset.href];
  if (v) a.href = v; else { a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); a.title = 'Coming soon'; }
});
$$('[data-cfg]').forEach(el => { const v = CONFIG[el.dataset.cfg]; if (v) el.textContent = v; });
$$('[data-mail]').forEach(a => {
  if (CONFIG.email) { a.href = 'mailto:' + CONFIG.email; const t = $('#mailText'); if (t) t.textContent = CONFIG.email; }
  else if (CONFIG.linkedin) a.href = CONFIG.linkedin; else a.href = 'https://github.com/nick10-05';
});
const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

/* ---------- Hyderabad clock ---------- */
const fmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
const tickClock = () => { const t = fmt.format(new Date()); $$('#clock,#clock2').forEach(c => c.textContent = t); };
tickClock(); setInterval(tickClock, 15000);

/* ---------- split kinetic type into letters ---------- */
$$('[data-kinetic]').forEach(el => {
  el.innerHTML = [...el.textContent].map((c, i) => `<span class="ch" style="--d:${(i * 0.045).toFixed(3)}s">${c}</span>`).join('');
});
const heroLetters = $$('.kinetic .ch');
const contactLetters = $$('.contact-big .ch, .cs-title .ch');

/* ---------- fit hero name to the screen width ---------- */
function fitHero() {
  const h = $('.kinetic'); if (!h) return;
  h.style.fontSize = '';
  heroLetters.forEach(ch => { ch.style.fontVariationSettings = ''; ch._v = ''; });
  const lines = $$('.kline', h);
  const avail = h.clientWidth * 0.88;
  const widest = Math.max(...lines.map(l => l.scrollWidth));
  if (widest > 0) { const fs = parseFloat(getComputedStyle(h).fontSize); h.style.fontSize = Math.min(fs * avail / widest, 300) + 'px'; }
}
fitHero(); addEventListener('resize', fitHero);
if (document.fonts) {
  document.fonts.ready.then(fitHero);
  document.fonts.load('800 100px Anybody').then(fitHero).catch(() => {});
  document.fonts.addEventListener('loadingdone', fitHero);
}

/* ---------- preloader ---------- */
const loader = $('#loader');
const start = () => { document.body.classList.remove('loading'); $('.hero')?.classList.add('ready'); };
let seen = false; try { seen = sessionStorage.getItem('nc-seen') === '1'; sessionStorage.setItem('nc-seen', '1'); } catch (e) {}
if (!loader || reduced || seen) { loader?.remove(); start(); }
else {
  document.body.classList.add('loading');
  const cnt = $('#count'), t0 = performance.now(), dur = 1700;
  const step = now => {
    const p = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
    cnt.textContent = Math.round(e * 100);
    if (p < 1) requestAnimationFrame(step);
    else { loader.classList.add('done'); setTimeout(start, 350); setTimeout(() => loader.remove(), 1200); }
  };
  requestAnimationFrame(step);
}

/* ---------- custom cursor ---------- */
const cur = $('#cursor'), curLabel = $('#cursorLabel');
let mx = -9999, my = -9999, cx = innerWidth / 2, cy = innerHeight / 2, pointerSeen = false;
addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; pointerSeen = true; }, { passive: true });
if (fine && !reduced && cur) {
  document.documentElement.classList.add('has-cursor');
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; cur.classList.add('on'); }, { passive: true });
  document.addEventListener('pointerleave', () => cur.classList.remove('on'));
  document.addEventListener('pointerover', e => {
    const big = e.target.closest('[data-cursor]');
    const link = e.target.closest('a,button');
    cur.classList.toggle('big', !!big);
    cur.classList.toggle('hover', !big && !!link);
    curLabel.textContent = big ? big.dataset.cursor : '';
  });
} else cur?.remove();

/* ---------- text scramble on hover ---------- */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function scramble(el) {
  if (el._busy) return; el._busy = true;
  const target = el.dataset.text || (el.dataset.text = el.textContent);
  let f = 0; const total = target.length * 2 + 6;
  const run = () => {
    el.textContent = [...target].map((ch, i) => (ch === ' ' || f > i * 2 + 6) ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join('');
    if (++f <= total) requestAnimationFrame(run); else { el.textContent = target; el._busy = false; }
  };
  run();
}
if (!reduced) $$('[data-scramble]').forEach(el => {
  const host = el.closest('a') || el;
  host.addEventListener('pointerenter', () => scramble(el));
  host.addEventListener('focus', () => scramble(el));
});

/* ---------- manifesto: words light up as you scroll ---------- */
const man = $('#manifesto');
const HL = ['feel', 'ship', 'defend'];
let words = [];
if (man) {
  man.innerHTML = man.textContent.trim().split(/\s+/).map(w => `<span class="w${HL.some(h => w.toLowerCase().startsWith(h)) ? ' hl' : ''}">${w}</span>`).join(' ');
  words = $$('.w', man);
  if (reduced) words.forEach(w => w.classList.add('on'));
}

/* ---------- marquee (speeds up & skews with scroll velocity) ---------- */
const mq = $('#marquee');
const MQ = [['Available for work', ''], ['✺', 'a'], ['SDE · 2027', 'o'], ['✺', 'a'], ['Hyderabad', ''], ['✺', 'a'], ['Open to internships', 'o'], ['✺', 'a']];
if (mq) mq.innerHTML = MQ.concat(MQ).map(([t, c]) => `<span class="${c}">${t}</span>`).join('');
let mqX = 0, vel = 0, lastScroll = scrollY;

/* ---------- rows + hover preview ---------- */
const SKILLS = [
  ['01', 'Backend systems', 'Node.js, Express, Fastify, FastAPI. REST APIs, JWT & OAuth 2.0, queues, retries and webhooks that survive crashes.', 'API', '#FF5B1F'],
  ['02', 'Databases', 'PostgreSQL as a queue, row-level security, migrations and constraints. SQLAlchemy, Drizzle ORM, Supabase.', 'SQL', '#D9F99D'],
  ['03', 'Frontend', 'React, TypeScript, Tailwind CSS and Vite — the product side of what I build.', 'TSX', '#7DD3FC'],
  ['04', 'Shipping & testing', 'Docker, GitHub Actions CI/CD, Linux, AWS, Render, Vercel. Vitest and pytest — thousands of tests across my projects.', 'CI', '#F6C453'],
  ['05', 'Applied AI', 'LLM APIs, structured extraction with guardrails, LLM evaluation, RAG and vector search. Oracle certified in Agentic AI.', 'AI', '#C4B5FD'],
  ['06', 'Problem solving', 'Data structures & algorithms, OOP, DBMS, OS and networks. On LeetCode every day.', 'O(n)', '#EDE9E1']
];
const RECOG = [
  ['Aug–Oct 2026', 'Enterprise AI Engineering virtual intern · Grade O', 'AICTE EduSkills — RAG with LangChain, vector DBs, re-ranking, MCP', 'RAG', '#FF5B1F'],
  ['Apr–Jun 2026', 'Cloud virtual intern · Grade O', 'AICTE EduSkills (AWS Academy) — IAM, VPC, EC2, S3, RDS, Lambda on live AWS', 'AWS', '#7DD3FC'],
  ['2026', 'Oracle Certified Foundations Associate — Agentic AI', 'Oracle · plus Oracle Academy: Database Programming with SQL', 'OCI', '#C4B5FD'],
  ['2026', 'AWS Academy Graduate', 'Cloud Foundations · Cloud Architecting', 'AWS', '#F6C453'],
  ['Mar 2026', 'Forge Inspira 2026 hackathon', 'IIT Hyderabad', 'IIT-H', '#D9F99D'],
  ['Apr 2026', 'ZeroSecure CTF', 'Cybersecurity · MVSR Engineering College', 'CTF', '#FF5B1F'],
  ['2023 – 27', 'B.E. Computer Science & IT', 'MVSR Engineering College, Hyderabad · CGPA 7.82', 'B.E.', '#EDE9E1']
];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const rowHTML = ([n, t, d, g, c]) => `<li class="rv" data-prev="${esc(g)}" data-col="${c}"><div class="row"><span class="n">${esc(n)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`;
const sr = $('#skillRows'); if (sr) sr.innerHTML = SKILLS.map(rowHTML).join('');
const rr = $('#recogRows'); if (rr) rr.innerHTML = RECOG.map(rowHTML).join('');
const prev = $('#preview'), prevText = $('#previewText');
let px = innerWidth / 2, py = innerHeight / 2, pRot = 0;
if (fine && !reduced && prev) {
  $$('[data-prev]').forEach(li => {
    li.addEventListener('pointerenter', () => { prevText.textContent = li.dataset.prev; prev.style.background = li.dataset.col; prev.classList.add('on'); });
    li.addEventListener('pointerleave', () => prev.classList.remove('on'));
  });
}

/* ---------- reveal on scroll ---------- */
$$('.label, .h-big, .h-sec, .contact-row, .mail').forEach(el => el.classList.add('rv'));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.rv').forEach(el => io.observe(el));

/* ---------- pinned horizontal work ---------- */
const work = $('#work'), track = $('#workTrack'), workNum = $('#workNum');
const desktopPin = () => matchMedia('(min-width: 861px)').matches;
function sizeWork() {
  if (!work || !track) return;
  if (!desktopPin()) { work.style.height = ''; return; }
  const extra = track.scrollWidth - innerWidth;
  work.style.height = (innerHeight + Math.max(0, extra)) + 'px';
}
sizeWork(); addEventListener('resize', sizeWork);
document.fonts?.ready.then(sizeWork);

/* ---------- tone switching (dark ⇄ light) ---------- */
const toned = $$('[data-tone]');
function updateTone() {
  const mid = innerHeight * 0.5;
  const s = toned.find(el => { const r = el.getBoundingClientRect(); return r.top <= mid && r.bottom >= mid; });
  document.body.classList.toggle('light', s?.dataset.tone === 'light');
}

/* ---------- variable-font proximity (letters swell near cursor) ---------- */
function kinetic(letters, R, base, near) {
  for (const ch of letters) {
    const r = ch.getBoundingClientRect();
    const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
    const t = clamp(1 - d / R, 0, 1); const k = t * t * (3 - 2 * t);
    const w = lerp(base[0], near[0], k).toFixed(0), g = lerp(base[1], near[1], k).toFixed(0);
    const v = `"wdth" ${w}, "wght" ${g}`;
    if (ch._v !== v) { ch.style.fontVariationSettings = v; ch._v = v; }
  }
}

/* ---------- main loop ---------- */
function frame() {
  // cursor + preview follow
  if (pointerSeen) { cx = lerp(cx, mx, .2); cy = lerp(cy, my, .2); }
  if (cur) cur.style.transform = `translate(${cx}px,${cy}px)`;
  if (prev && pointerSeen) { const nx = lerp(px, mx, .12); pRot = lerp(pRot, clamp((mx - px) * .4, -14, 14), .1); px = nx; py = lerp(py, my, .12); prev.style.transform = `translate(${px}px,${py}px) rotate(${pRot}deg)`; }

  // scroll velocity
  const y = scrollY; vel = lerp(vel, y - lastScroll, .1); lastScroll = y;
  if (mq && !reduced) {
    mqX -= 1.1 + Math.abs(vel) * .35;
    const half = mq.scrollWidth / 2; if (-mqX > half) mqX += half;
    mq.style.transform = `translateX(${mqX}px) skewX(${clamp(-vel * .25, -12, 12)}deg)`;
  }

  // manifesto fill
  if (man && !reduced) {
    const r = man.getBoundingClientRect();
    const p = clamp((innerHeight * .85 - r.top) / (r.height + innerHeight * .35), 0, 1);
    const n = Math.floor(p * words.length * 1.05);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
  }

  // horizontal work
  if (work && track && desktopPin()) {
    const r = work.getBoundingClientRect();
    const dist = work.offsetHeight - innerHeight;
    const p = dist > 0 ? clamp(-r.top / dist, 0, 1) : 0;
    track.style.transform = `translateX(${-p * Math.max(0, track.scrollWidth - innerWidth)}px)`;
    if (workNum) workNum.textContent = String(Math.min(4, Math.floor(p * 3.999) + 1)).padStart(2, '0');
  }

  // kinetic type
  if (fine && !reduced && pointerSeen) {
    if (heroLetters.length && scrollY < innerHeight) kinetic(heroLetters, 300, [75, 800], [78, 230]);
    if (contactLetters.length) { const r = contactLetters[0].getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) kinetic(contactLetters, 340, [75, 800], [78, 220]); }
  }

  updateTone();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---------- WebGL liquid blob (raw WebGL, raymarched) ---------- */
const cv = $('#blob');
const gl = cv && cv.getContext('webgl', { premultipliedAlpha: false, alpha: true, antialias: false });
if (gl) {
  const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs = `precision highp float;
uniform vec2 R;uniform float T;uniform vec2 M;uniform float S;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float disp(vec3 p){return .15*sin(2.6*p.x+T*.9)*sin(2.3*p.y+T*1.1)*sin(2.8*p.z+T*.7)+.06*sin(5.7*p.x-T*1.3)*sin(6.1*p.y+T)*sin(5.3*p.z+T*1.7);}
float map(vec3 p){p.xz*=rot(T*.15+M.x*.8);p.yz*=rot(-M.y*.6);return (length(p)-1.05+disp(p))*.7;}
vec3 nrm(vec3 p){vec2 e=vec2(.002,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*R)/min(R.x,R.y);
  uv-=M*.06;
  vec3 ro=vec3(0.,0.,4.1+S),rd=normalize(vec3(uv,-1.6));
  float t=0.;bool hit=false;
  for(int i=0;i<70;i++){float d=map(ro+rd*t);if(d<.001){hit=true;break;}t+=d;if(t>9.)break;}
  if(!hit){gl_FragColor=vec4(0.);return;}
  vec3 p=ro+rd*t,n=nrm(p);
  float fr=pow(1.-max(dot(n,-rd),0.),2.);
  float h=dot(n,vec3(.4,.7,.2))*.55+fr*.8+T*.035;
  float f1=.5+.5*cos(6.2831*h),f2=.5+.5*cos(6.2831*(h+.37));
  vec3 pal=mix(mix(vec3(.30,.12,.72),vec3(1.,.36,.12),f1),vec3(.93,.91,.88),f2*f2*.55);
  vec3 l=normalize(vec3(.6,.8,.5));float sp=pow(max(dot(reflect(rd,n),l),0.),48.);
  float rim=smoothstep(.55,1.,fr);
  vec3 col=mix(vec3(.025),pal,.18+.82*fr)+sp*.85+rim*vec3(1.,.36,.12)*.35;
  gl_FragColor=vec4(col,1.);
}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(s); return s; };
  try {
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr); gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, 'R'), uT = gl.getUniformLocation(pr, 'T'), uM = gl.getUniformLocation(pr, 'M'), uS = gl.getUniformLocation(pr, 'S');
    const scale = Math.min(devicePixelRatio || 1, 1.5) * 0.7;
    const size = () => { cv.width = Math.round(cv.clientWidth * scale); cv.height = Math.round(cv.clientHeight * scale); gl.viewport(0, 0, cv.width, cv.height); };
    new ResizeObserver(size).observe(cv); size();
    let bx = 0, by = 0, vis = true;
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(cv);
    const draw = now => {
      if (!reduced) requestAnimationFrame(draw);
      if (!vis) return;
      const tx = pointerSeen ? (mx / innerWidth - .5) * 2 : 0, ty = pointerSeen ? (my / innerHeight - .5) * 2 : 0; bx = lerp(bx, tx, .05); by = lerp(by, ty, .05);
      gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, reduced ? 2 : now / 1000);
      gl.uniform2f(uM, bx, by); gl.uniform1f(uS, clamp(scrollY / innerHeight, 0, 1.5) * 2.2);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    requestAnimationFrame(draw);
  } catch (err) { console.warn('blob', err); cv.remove(); }
}
}
