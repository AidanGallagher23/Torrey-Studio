// ══════════════════════════════════════════════════════════════════
// nav.js — Shared navigation for all Torrey Studio pages.
// To add a service, edit COPY or WEB arrays below.
// To change any link, edit the HTML template below.
// ══════════════════════════════════════════════════════════════════
(function () {

// ─── Service lists (keep in sync with SERVICES in start.html) ───
const COPY = [
  ['Single web page',            'single-web-page'],
  ['Landing page',               'landing-page'],
  ['Full website copy',          'full-website-copy'],
  ['Single email',               'single-email'],
  ['Email sequence (3 emails)',  'email-sequence'],
  ['Blog post',                  'blog-post'],
  ['Product descriptions',       'product-descriptions'],
  ['Ongoing copy retainer',      'copy-retainer'],
];
const WEB = [
  ['One-page website',           'one-page-website'],
  ['Standard website',           'standard-website'],
  ['Larger website',             'larger-website'],
  ['Website care plan',          'care-plan'],
];

// ─── Inject styles ───────────────────────────────────────────────
const css = `
#ts-nav,#ts-nav *,#ts-nav *::before,#ts-nav *::after,
.ts-drawer,  .ts-drawer *  { box-sizing:border-box; margin:0; padding:0; }

/* nav bar */
#ts-nav {
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:22px clamp(20px,5vw,64px);
  border-bottom:1px solid transparent;
  transition:background .4s,padding .4s,border-color .4s;
  font-family:"Inter",system-ui,sans-serif;
}
#ts-nav.scrolled {
  background:rgba(10,10,12,.76);backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(244,241,234,.10);
  padding:14px clamp(20px,5vw,64px);
}

/* brand mark */
#ts-nav .ts-brand {
  font-family:"Fraunces",Georgia,serif;font-size:21px;font-weight:500;
  letter-spacing:.2px;display:flex;align-items:center;gap:10px;
  color:#f4f1ea;text-decoration:none;flex-shrink:0;
}
#ts-nav .ts-mark {
  width:11px;height:11px;border-radius:50%;background:#d8b46a;flex-shrink:0;
  box-shadow:0 0 0 4px rgba(216,180,106,.18);
  animation:tsMark 3s ease-in-out infinite;
}
@keyframes tsMark {
  0%,100%{box-shadow:0 0 0 4px rgba(216,180,106,.18)}
  50%     {box-shadow:0 0 0 8px rgba(216,180,106,.05)}
}

/* desktop link row */
.ts-links { display:flex;gap:4px;align-items:center; }
.ts-links > a {
  font-size:14px;color:rgba(154,151,143,1);position:relative;
  text-decoration:none;padding:7px 11px;transition:color .3s;white-space:nowrap;
}
.ts-links > a::after {
  content:"";position:absolute;left:11px;right:11px;bottom:3px;
  height:1px;background:#d8b46a;
  transform:scaleX(0);transform-origin:left;
  transition:transform .3s cubic-bezier(.2,.8,.2,1);
}
.ts-links > a:hover   { color:#f4f1ea; }
.ts-links > a:hover::after,
.ts-links > a.ts-active::after { transform:scaleX(1); }
.ts-links > a.ts-active { color:#f4f1ea; }

/* services trigger */
.ts-svc-wrap { position:relative; }
.ts-svc-btn {
  display:flex;align-items:center;gap:5px;white-space:nowrap;
  font-size:14px;color:rgba(154,151,143,1);
  background:none;border:none;cursor:pointer;padding:7px 11px;
  font-family:"Inter",system-ui,sans-serif;transition:color .3s;
}
.ts-svc-btn:hover, .ts-svc-btn.ts-active { color:#f4f1ea; }
.ts-svc-btn svg {
  width:12px;height:12px;stroke:currentColor;fill:none;
  stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;
  transition:transform .3s;flex-shrink:0;
}
.ts-svc-wrap.open .ts-svc-btn svg { transform:rotate(180deg); }

/* dropdown panel */
.ts-dropdown {
  position:absolute;top:calc(100% + 12px);left:50%;
  transform:translateX(-50%) translateY(-6px);
  min-width:480px;
  background:#0d0d10;border:1px solid rgba(244,241,234,.10);border-radius:18px;
  padding:26px;display:grid;grid-template-columns:1fr 1fr;gap:0 28px;
  opacity:0;visibility:hidden;pointer-events:none;
  transition:opacity .22s,transform .22s,visibility .22s;
  box-shadow:0 28px 64px rgba(0,0,0,.55);
}
.ts-svc-wrap.open .ts-dropdown {
  opacity:1;visibility:visible;pointer-events:auto;
  transform:translateX(-50%) translateY(0);
}
.ts-drop-head {
  font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#d8b46a;
  margin-bottom:12px;padding-bottom:10px;
  border-bottom:1px solid rgba(244,241,234,.08);
}
.ts-drop-link {
  display:block;font-size:13.5px;color:rgba(154,151,143,1);
  text-decoration:none;padding:6px 0;
  transition:color .2s,padding-left .2s;
}
.ts-drop-link:hover { color:#f4f1ea;padding-left:5px; }

/* CTA pill */
.ts-cta {
  padding:9px 18px !important;margin-left:8px;
  border:1px solid rgba(244,241,234,.10) !important;border-radius:100px !important;
  color:#f4f1ea !important;
  transition:background .3s,border-color .3s,color .3s !important;
}
.ts-cta::after { display:none !important; }
.ts-cta:hover, .ts-cta.ts-active {
  background:#d8b46a !important;border-color:#d8b46a !important;color:#0a0a0c !important;
}

/* hamburger */
.ts-burger {
  display:none;align-items:center;justify-content:center;
  background:none;border:none;cursor:pointer;padding:8px;color:#f4f1ea;
}
.ts-burger svg { width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round; }

/* mobile drawer */
.ts-drawer {
  position:fixed;inset:0;z-index:195;
  background:rgba(10,10,12,.97);backdrop-filter:blur(20px);
  display:flex;flex-direction:column;
  padding:80px clamp(20px,6vw,48px) 48px;
  transform:translateX(100%);
  transition:transform .4s cubic-bezier(.16,1,.3,1);
  overflow-y:auto;font-family:"Inter",system-ui,sans-serif;
}
.ts-drawer.open { transform:translateX(0); }
.ts-d-link {
  display:block;font-family:"Fraunces",Georgia,serif;font-weight:400;
  font-size:clamp(1.5rem,5vw,2.4rem);color:#f4f1ea;text-decoration:none;
  padding:14px 0;border-bottom:1px solid rgba(244,241,234,.08);transition:color .3s;
}
.ts-d-link:hover { color:#d8b46a; }
.ts-d-svc-toggle {
  width:100%;text-align:left;background:none;border:none;cursor:pointer;
  display:flex;justify-content:space-between;align-items:center;
  font-family:"Fraunces",Georgia,serif;font-weight:400;
  font-size:clamp(1.5rem,5vw,2.4rem);color:#f4f1ea;
  padding:14px 0;border-bottom:1px solid rgba(244,241,234,.08);transition:color .3s;
}
.ts-d-svc-toggle:hover { color:#d8b46a; }
.ts-d-svc-toggle svg { width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;transition:transform .3s; }
.ts-d-svc-toggle.open svg { transform:rotate(45deg); }
.ts-d-svc-list { max-height:0;overflow:hidden;transition:max-height .42s cubic-bezier(.16,1,.3,1); }
.ts-d-svc-list.open { max-height:900px; }
.ts-d-svc-head { font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#d8b46a;padding:14px 0 6px 16px; }
.ts-d-svc-link { display:block;font-size:15px;color:rgba(154,151,143,1);text-decoration:none;padding:10px 0 10px 16px;transition:color .2s; }
.ts-d-svc-link:hover { color:#f4f1ea; }
.ts-d-cta {
  display:inline-flex;align-items:center;gap:10px;margin-top:34px;
  padding:15px 28px;border-radius:100px;background:#d8b46a;
  color:#0a0a0c;font-size:15px;font-weight:500;text-decoration:none;
  transition:background .3s;width:fit-content;
}
.ts-d-cta:hover { background:#e7cf9a; }

@media(min-width:761px){ .ts-burger{display:none}  }
@media(max-width:760px){ .ts-links{display:none}.ts-burger{display:flex} }
@media(max-width:560px){ .ts-dropdown{min-width:calc(100vw - 40px);grid-template-columns:1fr} }
`;

const styleEl = document.createElement('style');
styleEl.textContent = css;
document.head.appendChild(styleEl);

// ─── Build link strings ──────────────────────────────────────────
const mkDropLink  = ([lbl, slug]) => `<a class="ts-drop-link"  href="/services/${slug}.html">${lbl}</a>`;
const mkDrawLink  = ([lbl, slug]) => `<a class="ts-d-svc-link" href="/services/${slug}.html">${lbl}</a>`;

const dropCopy  = COPY.map(mkDropLink).join('');
const dropWeb   = WEB.map(mkDropLink).join('');
const drawCopy  = COPY.map(mkDrawLink).join('');
const drawWeb   = WEB.map(mkDrawLink).join('');

// ─── HTML template ───────────────────────────────────────────────
const html = `
<nav id="ts-nav">
  <a class="ts-brand" href="/index.html">
    <span class="ts-mark"></span>Torrey&nbsp;Studio
  </a>
  <div class="ts-links" id="ts-links">
    <a href="/index.html">Home</a>
    <a href="/index.html#work">Work</a>
    <div class="ts-svc-wrap" id="ts-svc-wrap">
      <button class="ts-svc-btn" id="ts-svc-btn" aria-haspopup="true" aria-expanded="false">
        Services
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="ts-dropdown" id="ts-dropdown" role="menu">
        <div>
          <div class="ts-drop-head">Copywriting</div>
          ${dropCopy}
        </div>
        <div>
          <div class="ts-drop-head">Web design &amp; build</div>
          ${dropWeb}
        </div>
      </div>
    </div>
    <a href="/about.html">About</a>
    <a class="ts-cta" href="/start.html">Start a project</a>
  </div>
  <button class="ts-burger" id="ts-burger" aria-label="Open menu" aria-expanded="false">
    <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
</nav>

<div class="ts-drawer" id="ts-drawer" aria-hidden="true">
  <a class="ts-d-link" href="/index.html">Home</a>
  <a class="ts-d-link" href="/index.html#work">Work</a>
  <button class="ts-d-svc-toggle" id="ts-d-svc-toggle" aria-expanded="false">
    Services
    <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  </button>
  <div class="ts-d-svc-list" id="ts-d-svc-list">
    <div class="ts-d-svc-head">Copywriting</div>
    ${drawCopy}
    <div class="ts-d-svc-head">Web design &amp; build</div>
    ${drawWeb}
  </div>
  <a class="ts-d-link" href="/about.html">About</a>
  <a class="ts-d-cta" href="/start.html">Start a project →</a>
</div>
`;

// ─── Inject into #nav-root (or prepend to body) ──────────────────
const root = document.getElementById('nav-root');
if (root) {
  root.outerHTML = html;
} else {
  document.body.insertAdjacentHTML('afterbegin', html);
}

// ─── Behaviors ───────────────────────────────────────────────────

// scroll state
const tsNav = document.getElementById('ts-nav');
function onScroll() { tsNav.classList.toggle('scrolled', window.scrollY > 40); }
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// active link highlighting
(function () {
  const path = location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.ts-links > a:not(.ts-cta)').forEach(a => {
    const href = a.getAttribute('href').split('#')[0].replace(/\/$/, '');
    if (href && path.endsWith(href)) a.classList.add('ts-active');
  });
  if (path.includes('/services/')) document.getElementById('ts-svc-btn')?.classList.add('ts-active');
  if (path.includes('/start'))     document.querySelector('.ts-cta')?.classList.add('ts-active');
  if (path.includes('/about'))     {
    document.querySelectorAll('.ts-links > a').forEach(a => {
      if (a.getAttribute('href')?.includes('/about')) a.classList.add('ts-active');
    });
  }
})();

// desktop dropdown — hover + click
const svcWrap = document.getElementById('ts-svc-wrap');
const svcBtn  = document.getElementById('ts-svc-btn');
let closeTimer;

function openDrop()  { clearTimeout(closeTimer); svcWrap.classList.add('open'); svcBtn.setAttribute('aria-expanded','true'); }
function closeDrop() { svcWrap.classList.remove('open'); svcBtn.setAttribute('aria-expanded','false'); }

svcWrap?.addEventListener('mouseenter', openDrop);
svcWrap?.addEventListener('mouseleave', () => { closeTimer = setTimeout(closeDrop, 120); });
svcBtn?.addEventListener('click', () => svcWrap.classList.contains('open') ? closeDrop() : openDrop());
document.addEventListener('click', e => { if (!svcWrap?.contains(e.target)) closeDrop(); });

// mobile hamburger + drawer
const burger       = document.getElementById('ts-burger');
const drawer       = document.getElementById('ts-drawer');
const svcToggle    = document.getElementById('ts-d-svc-toggle');
const svcList      = document.getElementById('ts-d-svc-list');

const BURGER_OPEN  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const BURGER_CLOSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden','false');
  burger.setAttribute('aria-expanded','true');
  burger.innerHTML = BURGER_OPEN;
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden','true');
  burger.setAttribute('aria-expanded','false');
  burger.innerHTML = BURGER_CLOSE;
  document.body.style.overflow = '';
}

burger?.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());

svcToggle?.addEventListener('click', () => {
  const open = svcList.classList.toggle('open');
  svcToggle.classList.toggle('open', open);
  svcToggle.setAttribute('aria-expanded', open);
});

drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

// close on Escape
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeDrop();
  if (drawer?.classList.contains('open')) closeDrawer();
});

})();
