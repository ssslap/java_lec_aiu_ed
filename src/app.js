// Модернизированная логика: поиск, grid/list view, карточки, i18n
const LECTURES_COUNT = 15;

const i18nUrl = 'src/i18n.json';
let i18n = {};
// Prefer Kazakh ('kk') by default if user hasn't set a language in localStorage
// If user explicitly chose a language previously (localStorage.lang) we respect it.
let currentLang = localStorage.getItem('lang') || 'kk';
let currentLecture = +localStorage.getItem('lastLecture') || 1;
let currentView = 'list'; // or 'grid'
let lectures = [];
let currentTheme = localStorage.getItem('theme') || 'phosphor';
let lecturesContent = {};

const $ = sel => document.querySelector(sel);
const $all = sel => Array.from(document.querySelectorAll(sel));

// Small DOM cache to avoid repeated queries
const CACHE = {};

function el(sel){
  if(CACHE[sel]) return CACHE[sel];
  const node = document.querySelector(sel);
  CACHE[sel] = node;
  return node;
}

function debounce(fn, wait){
  let t = null;
  return function(...args){
    clearTimeout(t);
    t = setTimeout(()=>fn.apply(this, args), wait);
  };
}

async function loadI18n(){
  // Prefer embedded translations (for file://). If not present, fetch the JSON.
  if(window && window.__I18N){
    i18n = window.__I18N;
    return;
  }
  try{
    const res = await fetch(i18nUrl);
    i18n = await res.json();
  }catch(e){
    console.error('i18n load failed', e);
    i18n = {ru:{},kk:{}};
  }
}

function loadLecturesContent(){
  // Eager-loading disabled for performance. We will lazy-load individual lecture scripts on demand.
  // Keep function for backwards compatibility.
  return Promise.resolve();
}

// Lazy-load a single lecture script for language+index and populate lecturesContent when loaded
function loadLectureScript(lang, idx){
  return new Promise((resolve)=>{
    lecturesContent[lang] = lecturesContent[lang] || {};
    if(lecturesContent[lang][idx]) return resolve(lecturesContent[lang][idx]);
    const key = `__LECTURES_${lang}_${idx}`;
    // if script already exposed global, use it
    if(window[key]){
      lecturesContent[lang][idx] = window[key];
      return resolve(lecturesContent[lang][idx]);
    }
    const s = document.createElement('script');
    s.src = `src/lectures/lecture${idx}-${lang}.js`;
    s.async = true;
    s.onload = ()=>{
      try{ if(window[key]) lecturesContent[lang][idx] = window[key]; }catch(e){}
      // small delay to ensure globals are registered in some runtime environments
      setTimeout(()=>resolve(lecturesContent[lang][idx] || ''), 10);
    };
    s.onerror = ()=>{ resolve(''); };
    document.body.appendChild(s);
  });
}

function t(key){
  return (i18n[currentLang] && i18n[currentLang][key]) || i18n['ru'][key] || key;
}

function applyLanguage(lang){
  currentLang = lang;
  localStorage.setItem('lang', currentLang);
  // mark buttons
  $all('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===currentLang));
  // set document language attribute
  try{ document.documentElement.lang = currentLang; }catch(e){}
  // rebuild UI text
  const si = el('#searchInput');
  buildSidebar(si ? si.value : '');
  translateDOM();
  // ensure content refreshed
  renderContent(currentLecture);
  console.debug('Language applied:', currentLang, 'keys present:', !!(i18n && i18n[currentLang]));
}

function buildLecturesArray(){
  // keep lightweight lecture descriptors (id only)
  lectures = [];
  for(let i=1;i<=LECTURES_COUNT;i++){
    lectures.push({ id: i });
  }
}

function buildSidebar(filter = ''){
  const list = $('#lecturesList');
  list.innerHTML = '';
  const items = lectures.filter(l => {
    const title = (i18n[currentLang] && i18n[currentLang][`lecture_${l.id}_title`]) || (i18n['ru'] && i18n['ru'][`lecture_${l.id}_title`]) || `Лекция ${l.id}`;
    return title.toLowerCase().includes(filter.toLowerCase());
  });
  items.forEach(l => {
    const li = document.createElement('li');
    li.className = 'lecture-item pulse';
    li.dataset.idx = l.id;
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');

    const idxEl = document.createElement('div');
    idxEl.className = 'lecture-index';
    idxEl.textContent = l.id;

    const titleEl = document.createElement('div');
    titleEl.className = 'lecture-title';
    titleEl.dataset.i18n = `lecture_${l.id}_title`;

    li.appendChild(idxEl);
    li.appendChild(titleEl);

    // Click/select handler
    li.addEventListener('click', ()=>selectLecture(l.id));
    // Keyboard activation (Enter / Space)
    li.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); selectLecture(l.id); }
    });

    list.appendChild(li);
  });
  updateResults(items.length);
  highlightActive();
}

// grid view removed: site works in single list/content view

function updateResults(count){
  const info = $('#resultsInfo');
  info.textContent = `${count} ${t('results') || 'results'}`;
}

function highlightActive(){
  $all('.lecture-item').forEach(el=>el.classList.toggle('active', +el.dataset.idx===currentLecture));
}

async function selectLecture(idx){
  const content = $('#contentInner');
  if(!content) return;

  // Measure current geometry (FLIP 'First')
  const oldRect = content.getBoundingClientRect();

  // update state early so sidebar highlight is immediate
  currentLecture = idx;
  localStorage.setItem('lastLecture', idx);
  highlightActive();

  // Render new content (FLIP 'Last') — ensure lecture scripts are loaded if present
  await renderContent(idx);

  // measure new geometry
  const newRect = content.getBoundingClientRect();

  // compute inversion transform to make new look like old
  const dx = oldRect.left - newRect.left;
  const dy = oldRect.top - newRect.top;
  const sx = oldRect.width / newRect.width || 1;
  const sy = oldRect.height / newRect.height || 1;

  // apply inverse transform so it visually matches the previous state
  content.style.transformOrigin = 'top left';
  content.style.willChange = 'transform, opacity';
  content.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  content.style.opacity = '0.98';

  // Animate to identity
  if(window.gsap){
    try{
      gsap.to(content, {duration: 0.48, ease: 'power2.out', overwrite: true, clearProps: 'willChange', x: 0, y: 0, scaleX: 1, scaleY: 1, onComplete: ()=>{
        content.style.transform = '';
        content.style.opacity = '';
      }});
    }catch(e){
      // fallback
      content.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1), opacity 300ms ease';
      requestAnimationFrame(()=>{ content.style.transform = ''; content.style.opacity = ''; });
      setTimeout(()=>{ content.style.transition = ''; content.style.willChange = ''; }, 520);
    }
  }else{
    content.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1), opacity 300ms ease';
    requestAnimationFrame(()=>{ content.style.transform = ''; content.style.opacity = ''; });
    setTimeout(()=>{ content.style.transition = ''; content.style.willChange = ''; }, 520);
  }
}

async function renderContent(idx){
  const content = $('#contentInner');
  if(!content) return;

  const lang = currentLang || 'ru';

  // Attempt to lazy-load a lecture script which may populate window.__LECTURES_{lang}_{idx}
  await loadLectureScript(lang, idx);

  const htmlMap = (lecturesContent && lecturesContent[lang]) || {};
  const html = (htmlMap && (htmlMap[idx] || htmlMap[String(idx)])) || '';

  if(html){
    content.innerHTML = html;
  } else {
    // fallback to i18n keys if detailed content not available
    content.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'lecture-header';
    const h2 = document.createElement('h2');
    h2.dataset.i18n = `lecture_${idx}_title`;
    const meta = document.createElement('div');
    meta.className = 'meta';
    const small = document.createElement('small');
    small.dataset.i18n = 'lecture_duration';
    meta.appendChild(small);
    header.appendChild(h2);
    header.appendChild(meta);

    const body = document.createElement('div');
    body.className = 'lecture-body fade-in';

    const pIntro = document.createElement('p');
    pIntro.dataset.i18n = `lecture_${idx}_intro`;
    const h3 = document.createElement('h3');
    h3.dataset.i18n = 'outline';
    const ul = document.createElement('ul');
    const li1 = document.createElement('li'); li1.dataset.i18n = `lecture_${idx}_point1`;
    const li2 = document.createElement('li'); li2.dataset.i18n = `lecture_${idx}_point2`;
    const li3 = document.createElement('li'); li3.dataset.i18n = `lecture_${idx}_point3`;
    ul.appendChild(li1); ul.appendChild(li2); ul.appendChild(li3);

    body.appendChild(pIntro);
    body.appendChild(h3);
    body.appendChild(ul);

    content.appendChild(header);
    content.appendChild(body);
  }

  // Animate entrance
  const header = content.querySelector('.lecture-header');
  const body = content.querySelector('.lecture-body');
  if(window.gsap){
    try{
      if(body) gsap.fromTo(body, {y:18, opacity:0}, {y:0, opacity:1, duration:0.6, ease:'power3.out'});
      if(header) gsap.fromTo(header, {y:-6, opacity:0}, {y:0, opacity:1, duration:0.55, ease:'power2.out'});
    }catch(e){ /* noop */ }
  }else{
    // small fallback: if body exists add show
    const b = document.querySelector('.lecture-body');
    if(b) setTimeout(()=>b.classList.add('show'),50);
  }

  // ensure texts are translated
  translateDOM();

  // Attach handlers for Run buttons inside lecture content
  $all('.run-js').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{
      const codeEl = btn.previousElementSibling && btn.previousElementSibling.querySelector('.js-run');
      if(!codeEl){
        const c = document.querySelector('.lecture-body .js-run') || document.querySelector('.js-run');
        if(c) runSnippet(c.textContent);
        return;
      }
      runSnippet(codeEl.textContent);
    });
  });
  return Promise.resolve();
}

function runSnippet(code){
  try{
    // sandbox: evaluate in Function scope and capture return if any
    const result = new Function(code)();
    const out = document.querySelector('.run-output') || document.getElementById('run-output');
    if(out) out.textContent = String(result === undefined ? 'Выполнено' : result);
  }catch(e){
    const out = document.querySelector('.run-output') || document.getElementById('run-output');
    if(out) out.textContent = 'Error: ' + (e.message || e);
    console.error('runSnippet error', e);
  }
}

function translateDOM(){
  // elements with direct translation key
  $all('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    const txt = t(key);
    if(el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea'){
      el.value = txt;
    }else{
      el.innerHTML = txt;
    }
  });

  // placeholders
  $all('[data-i18n-placeholder]').forEach(el=>{
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });

  // data-i18n-value -> set value attribute
  $all('[data-i18n-value]').forEach(el=>{
    const key = el.dataset.i18nValue;
    el.value = t(key);
  });

  // fallback special-case search
  const si = $('#searchInput');
  if(si) si.placeholder = t('search_placeholder') || 'Поиск лекций...';
}

function setupLangButtons(){
  $all('.lang-btn').forEach(btn =>{
    // mark active state (KZ is active by default in HTML)
    btn.classList.toggle('active', btn.dataset.lang===currentLang);
    btn.addEventListener('click', ()=>{
      // persist explicit user choice
      localStorage.setItem('lang', btn.dataset.lang);
      applyLanguage(btn.dataset.lang);
    });
  });
}

function animateInitialUI(){
  if(!window.gsap) return;
  try{
    // hero text and controls
    gsap.from('.hero-text h2', {y: 18, opacity: 0, duration: 0.7, ease: 'power3.out'});
    gsap.from('.hero-text p', {y: 12, opacity: 0, duration: 0.7, delay: 0.06, ease: 'power3.out'});
    gsap.from('.hero-cta', {y: 8, opacity: 0, duration: 0.7, delay: 0.12, ease: 'power3.out'});

    // sidebar items stagger
    gsap.from('#lecturesList .lecture-item', {x: -10, opacity: 0, duration: 0.7, stagger: 0.04, delay: 0.18, ease: 'power2.out'});

    // content area
    gsap.from('.content .lecture-card, .content .lecture-header', {y: 6, opacity: 0, duration: 0.6, delay: 0.24, ease: 'power2.out'});

    // subtle blob float
    gsap.to('.decor-blob', {x: -24, y: -12, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut'});
  }catch(e){ console.warn('gsap animation failed', e); }
}

// Mouse-driven microparallax for blob/hero and tilt for cards
function setupPointerParallax(){
  const blob = el('.decor-blob');
  const hero = el('.hero');
  let raf = null;
  const state = {x:0,y:0};

  function onPointerMove(e){
    const w = window.innerWidth;
    const h = window.innerHeight;
    const px = (e.clientX / w) - 0.5; // -0.5 .. 0.5
    const py = (e.clientY / h) - 0.5;
    state.x = px; state.y = py;
    if(!raf) raf = requestAnimationFrame(frame);
  }

  function frame(){
    raf = null;
    if(blob){
      // subtle inverse movement
      blob.style.transform = `translate3d(${state.x * -30}px, ${state.y * -18}px, 0) rotate(-6deg)`;
    }
    if(hero){
      hero.style.transform = `translate3d(${state.x * -6}px, ${state.y * -4}px, 0)`;
    }
  }

  // card tilt
  function onCardPointerMove(e){
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / (rect.width/2);
    const dy = (e.clientY - cy) / (rect.height/2);
    const tiltX = dy * -6; // rotateX
    const tiltY = dx * 8; // rotateY
    const inner = card.querySelector('.card-inner') || card;
    inner.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px)`;
  }
  function onCardPointerLeave(e){
    const card = e.currentTarget;
    const inner = card.querySelector('.card-inner') || card;
    inner.style.transform = '';
  }

  try{
    document.addEventListener('pointermove', onPointerMove, {passive: true});
  }catch(e){ document.addEventListener('pointermove', onPointerMove); }
  // attach card handlers (re-attach when grid rebuilt)
  function attachCardHandlers(){
    document.querySelectorAll('.card').forEach(card=>{
      // ensure card has inner wrapper
      if(!card.querySelector('.card-inner')){
        const wrapper = document.createElement('div');
        wrapper.className = 'card-inner';
        // move children into wrapper
        while(card.firstChild) wrapper.appendChild(card.firstChild);
        card.appendChild(wrapper);
      }
      card.removeEventListener('pointermove', onCardPointerMove);
      card.removeEventListener('pointerleave', onCardPointerLeave);
      card.addEventListener('pointermove', onCardPointerMove);
      card.addEventListener('pointerleave', onCardPointerLeave);
    });
  }

  // initial attach and also attach after grid rebuild
  attachCardHandlers();
  // no grid container in the simplified layout; attachment will run initially and when DOM changes
}

function setupSearch(){
  const si = el('#searchInput');
  if(!si) return;
  const onInput = debounce((e)=>{
    const q = e.target.value || '';
    buildSidebar(q);
    // if current lecture is missing from results, pick first
    const titles = Array.from(document.querySelectorAll('#lecturesList .lecture-item .lecture-title')).map(el=>el.textContent || el.innerText || '');
    const matches = titles.map((t,i)=>({t:t.toLowerCase(), id: i+1})).filter(x=>x.t.includes(q.toLowerCase()));
    if(matches.length && !matches.find(m=>m.id===currentLecture)) selectLecture(matches[0].id);
  }, 180);
  si.addEventListener('input', onInput, { passive: true });
}

function setupViewToggle(){ /* view toggle removed */ }

function applyTheme(theme){
  // remove existing theme classes from documentElement
  document.documentElement.classList.remove('theme-phosphor','theme-aqua','theme-warm');
  const cls = theme === 'phosphor' ? 'theme-phosphor' : theme === 'aqua' ? 'theme-aqua' : 'theme-warm';
  document.documentElement.classList.add(cls);
  // expose current theme on html for tiny CSS hooks and selectors
  try{ document.documentElement.setAttribute('data-theme', theme); }catch(e){}
  $all('.theme-btn').forEach(b=>{
    const isActive = b.dataset.theme===theme;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', String(isActive));
  });
  localStorage.setItem('theme', theme);

  // update theme indicator (label + icon color)
  const indicator = document.querySelector('.theme-indicator');
  if(indicator){
    const label = indicator.querySelector('.theme-label');
    const icon = indicator.querySelector('.theme-icon');
    if(label) label.innerText = (document.querySelector(`.theme-btn[data-theme="${theme}"]`) || {}).innerText || theme;
    // animate accent color using GSAP if available
    if(window.gsap){
      try{
        const root = document.documentElement;
        const styles = getComputedStyle(root);
        // read current values
        const curStart = styles.getPropertyValue('--accent-grad-start').trim();
        const curEnd = styles.getPropertyValue('--accent-grad-end').trim();
        const curAccent = styles.getPropertyValue('--accent-color').trim();

        // Temporarily ensure the class is present so computed styles match target theme
        // (we already added the class above)
        const targetStart = styles.getPropertyValue('--accent-grad-start').trim() || curStart;
        const targetEnd = styles.getPropertyValue('--accent-grad-end').trim() || curEnd;
        const targetAccent = styles.getPropertyValue('--accent-color').trim() || curAccent;

        // Tween CSS variables on :root for smooth theme transition
        gsap.to(root, {
          duration: 0.42,
          ease: 'power1.out',
          onUpdate: function(){},
          // animate using a proxy object and step into CSS variables
          onStart: ()=>{},
          // use custom setter to update vars (gsap won't interpolate color strings on element.style directly reliably)
          // We'll animate numeric RGB proxies
        });

        // quick color tween for the indicator icon
        gsap.to(icon, {color: targetAccent, duration: 0.36, ease: 'power1.out'});
      }catch(e){ /* ignore */ }
    }
  }
}

function setupThemeButtons(){
  $all('.theme-btn').forEach(btn=>{
    // initialize ARIA and active state
    btn.setAttribute('role','button');
    btn.setAttribute('aria-pressed', String(btn.dataset.theme===currentTheme));
    btn.classList.toggle('active', btn.dataset.theme===currentTheme);

    const activate = () => {
      const t = btn.dataset.theme;
      currentTheme = t;
      // animate a subtle pulse then apply theme
      if(window.gsap){
        const pulse = gsap.timeline();
        pulse.to(btn, {scale: 0.96, duration: 0.09, ease: 'power1.out'})
             .to(btn, {scale: 1.02, duration: 0.12, ease: 'power1.out'})
             .to(btn, {scale: 1, duration: 0.12, ease: 'power2.out', onComplete: ()=> applyTheme(t)});
      }else{
        applyTheme(t);
      }
    };

    btn.addEventListener('click', activate);
    // support keyboard activation
    btn.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); activate(); }
    });
  });
}

// Fallback / delegation: ensure theme buttons always react even if direct listeners fail
function themeActivate(btn){
  if(!btn) return;
  const t = btn.dataset.theme;
  currentTheme = t;
  console.debug('themeActivate ->', t);
  if(window.gsap){
    const pulse = gsap.timeline();
    pulse.to(btn, {scale: 0.96, duration: 0.08, ease: 'power1.out'})
         .to(btn, {scale: 1.02, duration: 0.12, ease: 'power1.out'})
         .to(btn, {scale: 1, duration: 0.12, ease: 'power2.out', onComplete: ()=> applyTheme(t)});
  }else{
    applyTheme(t);
  }
}

// Add document-level delegation as a robust fallback so buttons are clickable
document.addEventListener('click', (e)=>{
  const btn = e.target.closest && e.target.closest('.theme-btn');
  if(btn){
    e.preventDefault();
    themeActivate(btn);
  }
});
  document.addEventListener('keydown', (e)=>{
  if(e.key !== 'Enter' && e.key !== ' ') return;
  const btn = e.target && e.target.closest && e.target.closest('.theme-btn');
  if(btn){
    e.preventDefault();
    themeActivate(btn);
  }
});
  // pointermove: mark listener passive where possible to improve scroll performance
  try{ document.addEventListener('pointermove', ()=>{}, {passive:true}); }catch(e){}

// setView removed; site uses single list/content layout

async function start(){
  await loadI18n();
  await loadLecturesContent();
  buildLecturesArray();
  setupLangButtons();
  // apply current language (this updates sidebar/grid and translates UI)
  applyLanguage(currentLang);
  // ensure sidebar exists after language applied
  buildSidebar();
  setupSearch();
  setupThemeButtons();
  translateDOM();
  applyTheme(currentTheme);
  selectLecture(currentLecture);
  // run entrance animations
  animateInitialUI();
  // pointer parallax effects
  setupPointerParallax();
  // add hover subtle effects for cards when GSAP present
  if(window.gsap){
    document.body.addEventListener('mouseover', (e)=>{
      const c = e.target.closest && e.target.closest('.card, .lecture-item');
      if(c){ gsap.to(c, {scale:1.02, duration:0.18}); }
    });
    document.body.addEventListener('mouseout', (e)=>{
      const c = e.target.closest && e.target.closest('.card, .lecture-item');
      if(c){ gsap.to(c, {scale:1, duration:0.18}); }
    });
  }
}

document.addEventListener('DOMContentLoaded', start);
