/* ============================================================
   अक्षर ज्ञान (Akshar Gyan) — app logic
   Audio-first, icon-driven learning app for adult new readers.
   Letters are taught in small groups (3-5 at a time): listen →
   picture → finger-trace → mini quiz → next group. No frameworks,
   no build step. Works offline (see sw.js).
   ============================================================ */
'use strict';

const $app = document.getElementById('app');

/* ------------------------- progress store ------------------------- */
const Store = {
  KEY: 'aksharGyan',
  read() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '{}'); }
    catch (e) { return {}; }
  },
  write(d) {
    try { localStorage.setItem(this.KEY, JSON.stringify(d)); } catch (e) { /* ignore */ }
  },
};
let progress = Store.read();
progress.seen = progress.seen || {};
progress.stars = progress.stars || {};
progress.groups = progress.groups || {};
progress.traces = progress.traces || 0;

function markSeen(key) {
  if (!progress.seen[key]) { progress.seen[key] = 1; Store.write(progress); }
}
function starCount(key) { return progress.stars[key] || 0; }
function addStar(key) { progress.stars[key] = starCount(key) + 1; Store.write(progress); }
function groupKey(lang, set, gi) { return 'g-' + lang + '-' + set + '-' + gi; }
function groupIsDone(lang, set, gi) { return !!progress.groups[groupKey(lang, set, gi)]; }

/* --------------------------- speech engine --------------------------- */
const Speech = {
  voices: [],
  slow: !!progress.slow,
  seqToken: 0,
  supported: 'speechSynthesis' in window,

  init() {
    if (!this.supported) return;
    const load = () => { this.voices = speechSynthesis.getVoices() || []; };
    load();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = load;
    }
  },

  voiceFor(lang) {
    const vs = this.voices;
    if (!vs.length) return null;
    const norm = (l) => (l || '').toLowerCase().replace('_', '-');
    const prefs = lang.indexOf('hi') === 0
      ? ['hi-in', 'hi']
      : ['en-in', 'en-gb', 'en-us', 'en'];
    for (const p of prefs) {
      const exact = vs.filter((v) => norm(v.lang) === p);
      if (exact.length) {
        return exact.find((v) => /google/i.test(v.name)) || exact[0];
      }
    }
    const base = lang.slice(0, 2).toLowerCase();
    return vs.find((v) => norm(v.lang).indexOf(base) === 0) || null;
  },

  /* slow, deliberate speech; 🐢 makes it slower still */
  rate() { return this.slow ? 0.5 : 0.68; },
  /* very slow rate for single letters and word parts — stretched, full sounds */
  letterRate() { return this.slow ? 0.38 : 0.52; },

  stop() {
    this.seqToken++;
    if (this.supported) { try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
    document.querySelectorAll('.speaking').forEach((el) => el.classList.remove('speaking'));
  },

  /* speak one utterance; cb fires on end (or safety timeout) */
  utter(text, lang, cb, opts) {
    opts = opts || {};
    if (!this.supported || !text) { if (cb) setTimeout(cb, 200); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || 'hi-IN';
    u.rate = opts.rate || this.rate();
    u.pitch = 1;        /* natural, fuller voice */
    u.volume = 1;       /* as loud as the device allows */
    const v = this.voiceFor(u.lang);
    if (v) { u.voice = v; u.lang = v.lang; }
    let done = false;
    const finish = () => { if (done) return; done = true; if (cb) cb(); };
    u.onend = finish;
    u.onerror = finish;
    setTimeout(finish, Math.max(2000, 320 * text.length) + 1500);
    window.__aksharUtter = u; /* keep a reference: iOS GC workaround */
    try { speechSynthesis.speak(u); } catch (e) { finish(); }
  },

  say(text, lang, opts) {
    this.stop();
    this.utter(text, lang || 'hi-IN', null, opts);
  },

  /* speak a list of {text, lang, el, gap, opts} one after another */
  seq(items, onDone) {
    this.stop();
    const token = this.seqToken;
    const step = (i) => {
      if (token !== this.seqToken) return;
      document.querySelectorAll('.speaking').forEach((el) => el.classList.remove('speaking'));
      if (i >= items.length) { if (onDone) onDone(); return; }
      const it = items[i];
      if (it.el && it.el.isConnected) it.el.classList.add('speaking');
      this.utter(it.text, it.lang || 'hi-IN', () => {
        if (token !== this.seqToken) return;
        if (it.el) it.el.classList.remove('speaking');
        setTimeout(() => step(i + 1), it.gap != null ? it.gap : 260);
      }, it.opts);
    };
    step(0);
  },
};
Speech.init();

function praise() {
  const p = VOICE_TEXT.praise;
  return p[Math.floor(Math.random() * p.length)];
}

/* ----------------------- voice recognition (बोलो test) ----------------------- */
/* Latin fallbacks: hi-IN recognition sometimes returns romanised text */
const TRANSLIT = {
  'अ': ['a', 'uh'], 'आ': ['aa', 'a', 'ah'], 'इ': ['i', 'e'], 'ई': ['ee', 'e', 'i'],
  'उ': ['u', 'oo', 'woo'], 'ऊ': ['oo', 'u'], 'ऋ': ['ri', 'ru', 'ree'], 'ए': ['a', 'ay', 'e', 'yay'],
  'ऐ': ['ai', 'ae', 'i'], 'ओ': ['o', 'oh', 'wo'], 'औ': ['au', 'ao', 'ou', 'aww'],
  'अं': ['am', 'an', 'un', 'ang'], 'अः': ['aha', 'ah', 'aha:'],
  'क': ['ka', 'ca', 'k', 'kah'], 'ख': ['kha', 'ka'], 'ग': ['ga', 'gaa'], 'घ': ['gha', 'ga'],
  'ङ': ['nga', 'na'], 'च': ['cha', 'ch'], 'छ': ['chha', 'cha'], 'ज': ['ja', 'jaa'],
  'झ': ['jha', 'ja'], 'ञ': ['nya', 'na'], 'ट': ['ta', 'tta'], 'ठ': ['tha', 'ta'],
  'ड': ['da', 'dda'], 'ढ': ['dha', 'da'], 'ण': ['na'], 'त': ['ta', 'tha'], 'थ': ['tha', 'ta'],
  'द': ['da', 'the', 'dha'], 'ध': ['dha', 'da'], 'न': ['na', 'nah'], 'प': ['pa', 'paa'],
  'फ': ['pha', 'fa', 'fha'], 'ब': ['ba', 'baa'], 'भ': ['bha', 'ba'], 'म': ['ma', 'maa'],
  'य': ['ya', 'yaa'], 'र': ['ra', 'raa'], 'ल': ['la', 'laa'], 'व': ['va', 'wa'],
  'श': ['sha', 'sa'], 'ष': ['sha', 'sa'], 'स': ['sa', 'sha'], 'ह': ['ha', 'haa'],
  'क्ष': ['ksha', 'chha', 'sha'], 'त्र': ['tra', 'ta'], 'ज्ञ': ['gya', 'gyan', 'gna'],
};
/* what English letter names sound like to the recogniser */
const EN_NAMES = {
  A: ['a', 'ay', 'hey', 'eh'], B: ['b', 'be', 'bee'], C: ['c', 'see', 'sea', 'si'],
  D: ['d', 'de', 'dee', 'the'], E: ['e', 'ee', 'he'], F: ['f', 'ef', 'eff'],
  G: ['g', 'je', 'jee', 'gee'], H: ['h', 'aitch', 'etch', 'hech'], I: ['i', 'eye', 'ai'],
  J: ['j', 'jay', 'je'], K: ['k', 'kay', 'ke', 'okay'], L: ['l', 'el', 'yell'],
  M: ['m', 'em', 'am'], N: ['n', 'en', 'and'], O: ['o', 'oh', 'wo'], P: ['p', 'pe', 'pee'],
  Q: ['q', 'cue', 'queue', 'kyu'], R: ['r', 'are', 'aar'], S: ['s', 'es', 'yes'],
  T: ['t', 'tea', 'tee', 'ti'], U: ['u', 'you', 'yu'], V: ['v', 've', 'we', 'vee'],
  W: ['w', 'double you', 'double u', 'dabbu', 'dablu'], X: ['x', 'ex', 'axe', 'eks'],
  Y: ['y', 'why', 'vay', 'wai'], Z: ['z', 'zed', 'zee', 'jed'],
};

function baseCluster(text) {
  const cs = clusters(String(text).trim(), 'hi');
  if (!cs.length) return '';
  /* strip vowel signs / anusvara / nukta from the first cluster */
  return cs[0].replace(/[ऺ-़ा-ॗ]/g, '');
}

/* does any recognised alternative sound like the expected letter? Generous. */
function speechMatches(expected, alts, lang) {
  for (const raw of alts) {
    const t = String(raw || '').trim().toLowerCase().replace(/[.।,!?]/g, '');
    if (!t) continue;
    if (lang === 'en') {
      const ch = expected.toLowerCase();
      const names = EN_NAMES[expected.toUpperCase()] || [];
      const first = t.split(/\s+/)[0];
      if (t === ch || first === ch || names.indexOf(t) !== -1 || names.indexOf(first) !== -1) return true;
      if (first.charAt(0) === ch) return true;
    } else {
      if (t === expected) return true;
      if (/[ऀ-ॿ]/.test(t)) {
        const said = baseCluster(t);
        const want = baseCluster(expected) || expected;
        if (said && said === want) return true;
        if (t.indexOf(expected) === 0) return true;
      } else {
        const latin = t.replace(/[^a-z ]/g, '');
        const first = latin.split(/\s+/)[0];
        const opts = TRANSLIT[expected] || [];
        for (const o of opts) {
          if (latin === o || first === o || first.indexOf(o) === 0) return true;
        }
      }
    }
  }
  return false;
}

const Recog = {
  Ctor: window.SpeechRecognition || window.webkitSpeechRecognition || null,
  broken: false,          /* set when mic/permission/network proves unusable */
  active: null,
  supported() { return !!this.Ctor && !this.broken; },
  stop() {
    if (this.active) {
      this.active._byUs = true; /* distinguish our abort from engine failures */
      try { this.active.abort(); } catch (e) { /* ignore */ }
      this.active = null;
    }
  },
  /* listen once; cb(alternatives[] | null on silence, errType | null).
     onHearing fires as soon as ANY sound is being recognised, so the UI can
     show her that the phone is catching her voice. Patient: ~9s window. */
  listen(lang, cb, onHearing) {
    if (!this.supported()) { cb(null, 'unsupported'); return; }
    let finished = false;
    const collected = [];
    const done = (alts, err) => {
      if (finished) return;
      finished = true;
      this.active = null;
      cb(alts, err);
    };
    let rec;
    try { rec = new this.Ctor(); } catch (e) { this.broken = true; done(null, 'unsupported'); return; }
    rec.lang = lang;
    rec.interimResults = true;
    rec.maxAlternatives = 5;
    rec.continuous = false;
    rec.onaudiostart = () => { if (onHearing) onHearing('mic'); };
    rec.onspeechstart = () => { if (onHearing) onHearing('voice'); };
    rec.onresult = (ev) => {
      try {
        for (let r = 0; r < ev.results.length; r++) {
          const res = ev.results[r];
          if (res.isFinal) {
            for (let i = 0; i < res.length; i++) collected.push(res[i].transcript);
          } else if (res[0] && res[0].transcript && res[0].transcript.trim()) {
            if (onHearing) onHearing('voice');
          }
        }
      } catch (e) { /* ignore */ }
      if (collected.length) done(collected.slice(), null);
    };
    rec.onerror = (ev) => {
      let t = (ev && ev.error) || 'error';
      if (t === 'not-allowed' || t === 'service-not-allowed' || t === 'audio-capture') this.broken = true;
      if (t === 'aborted' && !rec._byUs) t = 'error'; /* engine gave up on its own */
      done(null, t);
    };
    rec.onend = () => done(collected.length ? collected.slice() : null, null);
    this.active = rec;
    try { rec.start(); } catch (e) { done(null, 'error'); return; }
    setTimeout(() => { if (!finished) { try { rec.stop(); } catch (e) { /* ignore */ } } }, 9000);
  },
};

/* short attention "ding" so she knows exactly when to speak */
let audioCtx = null;
function ding(then) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.value = 988;
    g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.5, audioCtx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.28);
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.3);
  } catch (e) { /* no audio context — fine */ }
  if (then) setTimeout(then, 300);
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* --------------------- Devanagari cluster helpers --------------------- */
function clusters(word, lang) {
  if (lang === 'en') return word.split('');
  if (window.Intl && Intl.Segmenter) {
    try {
      const seg = new Intl.Segmenter('hi', { granularity: 'grapheme' });
      return Array.from(seg.segment(word), (s) => s.segment);
    } catch (e) { /* fall through */ }
  }
  const out = [];
  const isMark = (ch) => /[ऀ-ःऺ-्॑-ॗॢॣ]/.test(ch);
  let joinNext = false;
  for (const ch of word) {
    if (out.length && (isMark(ch) || joinNext)) {
      out[out.length - 1] += ch;
    } else {
      out.push(ch);
    }
    joinNext = ch === '्'; /* virama joins the following consonant */
  }
  return out;
}
function hasMatra(cluster) {
  return /[ऀ-ःा-ौॎॏ]/.test(cluster);
}

/* ----------------------------- router ----------------------------- */
let S = { screen: 'home' };
/* after an accidental reload (e.g. pull-to-refresh) resume the same screen */
try { if (history.state && history.state.screen) S = history.state; } catch (e) { /* ignore */ }
let currentSpeak = null;   /* what the 🔊 repeat button says on this screen */
let unlocked = false;      /* browsers need one tap before audio works */

document.addEventListener('pointerdown', () => {
  if (!unlocked) {
    unlocked = true;
    if (Speech.supported) { try { speechSynthesis.resume(); } catch (e) { /* ignore */ } }
  }
}, true);

function go(next, replace) {
  Speech.stop();
  Recog.stop();
  S = next;
  try {
    if (replace) history.replaceState(S, '');
    else history.pushState(S, '');
  } catch (e) { /* ignore */ }
  render(true);
  window.scrollTo(0, 0);
}
window.addEventListener('popstate', (e) => {
  /* an OS edge-swipe "back" can fire mid-trace; while a finger is (or just
     was) drawing, cancel the navigation and stay on the tracing screen */
  if (S.screen === 'trace' && (T.drawing || Date.now() - (T.lastDraw || 0) < 800)) {
    try { history.pushState(S, ''); } catch (err) { /* ignore */ }
    return;
  }
  Speech.stop();
  Recog.stop();
  S = (e.state && e.state.screen) ? e.state : { screen: 'home' };
  render(false);
});
try { history.replaceState(S, ''); } catch (e) { /* ignore */ }

/* ------------------------- small view helpers ------------------------- */
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function topbar(title, emoji) {
  return (
    '<header class="topbar">' +
      '<button class="tb-btn" data-a="back" aria-label="पीछे जाओ">⬅️</button>' +
      '<button class="tb-btn" data-a="home" aria-label="घर">🏠</button>' +
      '<div class="tb-title">' + (emoji ? '<span class="tb-emoji">' + emoji + '</span>' : '') +
        '<span>' + esc(title) + '</span></div>' +
      '<button class="tb-btn tb-slow ' + (Speech.slow ? 'active' : '') + '" data-a="slow" aria-label="धीरे बोलो">🐢</button>' +
      '<button class="tb-btn tb-sound" data-a="repeat" aria-label="फिर से सुनो">🔊</button>' +
    '</header>'
  );
}

function counterDots(n, i) {
  let h = '<div class="dots" aria-hidden="true">';
  for (let k = 0; k < n; k++) h += '<span class="dot' + (k === i ? ' on' : k < i ? ' done' : '') + '"></span>';
  return h + '</div>';
}

/* highlight one cluster of a word */
function wordHTML(word, lang, hlIndex, colorize) {
  const cs = clusters(word, lang);
  return cs.map((c, i) => {
    const classes = [];
    if (i === hlIndex) classes.push('hl');
    if (colorize) classes.push(hasMatra(c) ? 'm' : 'c');
    return '<span class="' + classes.join(' ') + '">' + esc(c) + '</span>';
  }).join('');
}

/* ------------------------------ screens ------------------------------ */

function renderHome() {
  currentSpeak = () => Speech.say(VOICE_TEXT.welcome);
  $app.innerHTML =
    '<div class="screen home">' +
      '<div class="brand">' +
        '<div class="brand-icon">📖</div>' +
        '<h1>अक्षर ज्ञान</h1>' +
        '<p class="brand-sub">Akshar Gyan &middot; पढ़ना-लिखना सीखें</p>' +
      '</div>' +
      '<button class="help-btn" data-a="repeat">🔊 सुनो</button>' +
      '<div class="lang-cards">' +
        '<button class="lang-card hindi" data-a="lang" data-lang="hi">' +
          '<span class="lc-letters">अ आ इ</span>' +
          '<span class="lc-name">हिंदी</span>' +
          '<span class="lc-emoji">🪷</span>' +
        '</button>' +
        '<button class="lang-card english" data-a="lang" data-lang="en">' +
          '<span class="lc-letters">A B C</span>' +
          '<span class="lc-name">English</span>' +
          '<span class="lc-emoji">🌞</span>' +
        '</button>' +
      '</div>' +
      '<p class="foot">👆 एक डिब्बा दबाओ</p>' +
    '</div>';
}

/* every group test of a letter step cleared? */
function lettersStepDone(lang, set) {
  const gs = letterGroups(lang, set);
  for (let i = 0; i < gs.length; i++) {
    if (!groupIsDone(lang, set, i)) return false;
  }
  return true;
}
/* steps stay locked until the letter tests before them are 100% cleared */
function stepLocked(lang, idx) {
  if (idx === 0) return false;
  if (lang === 'hi') {
    if (idx === 1) return !lettersStepDone('hi', 'vowels');
    return !(lettersStepDone('hi', 'vowels') && lettersStepDone('hi', 'consonants'));
  }
  if (idx === 1) return !lettersStepDone('en', 'caps');
  return !(lettersStepDone('en', 'caps') && lettersStepDone('en', 'smalls'));
}

function renderLangHome() {
  const lang = S.lang;
  const steps = STEPS[lang];
  currentSpeak = () => Speech.say(lang === 'hi' ? VOICE_TEXT.langHomeHi : VOICE_TEXT.langHomeEn);
  const cards = steps.map((st, i) => {
    const locked = stepLocked(lang, i);
    const stars = st.id === 'game'
      ? starCount(lang + '-letters') + starCount(lang + '-words') : 0;
    return (
      '<button class="step-card ' + st.cls + (locked ? ' locked' : '') + '"' +
        ' data-a="' + (locked ? 'lockedStep' : 'step') + '" data-i="' + i + '">' +
        '<span class="sc-num">' + (i + 1) + '</span>' +
        '<span class="sc-mid"><span class="sc-preview">' + esc(st.preview) + '</span>' +
          '<span class="sc-label">' + esc(st.label) + '</span></span>' +
        '<span class="sc-emoji">' + (locked ? '🔒' : st.emoji) +
          (stars ? '<span class="sc-stars">⭐ ' + stars + '</span>' : '') + '</span>' +
      '</button>'
    );
  }).join('');
  $app.innerHTML =
    topbar(DATA[lang].label, lang === 'hi' ? '🪷' : '🌞') +
    '<div class="screen"><div class="step-list">' + cards + '</div></div>';
}

/* which letter list a "letters" screen shows */
function letterSet(lang, set) {
  if (lang === 'hi') return DATA.hi[set];      /* vowels | consonants */
  return DATA.en.letters;                      /* caps | smalls share data */
}
function letterDisplay(item, set) {
  return set === 'smalls' ? item.ch.toLowerCase() : item.ch;
}
function letterGroups(lang, set) {
  return lang === 'hi' ? GROUPS.hi[set] : GROUPS.en[set];
}

/* ------------------- letter groups (small-batch lessons) ------------------- */
function renderGroups() {
  const { lang, set } = S;
  const list = letterSet(lang, set);
  const groups = letterGroups(lang, set);
  const isVowelish = set === 'vowels' || set === 'smalls';
  currentSpeak = () => Speech.say(VOICE_TEXT.groups);

  let current = groups.length - 1;
  for (let i = 0; i < groups.length; i++) {
    if (!groupIsDone(lang, set, i)) { current = i; break; }
  }

  const cards = groups.map((g, i) => {
    const done = groupIsDone(lang, set, i);
    const state = done ? 'done' : (i === current ? 'current' : 'later');
    const locked = !done && i !== current;   /* hard lock until the previous test is cleared */
    const letters = g.map((abs) => letterDisplay(list[abs], set)).join(' ');
    return (
      '<button class="grp ' + state + ' ' + (isVowelish ? 'c-vowel' : 'c-cons') + '"' +
        ' data-a="' + (locked ? 'lockedGroup' : 'group') + '" data-i="' + i + '">' +
        '<span class="grp-num">' + (i + 1) + '</span>' +
        '<span class="grp-letters">' + esc(letters) + '</span>' +
        '<span class="grp-state">' + (done ? '✅' : i === current ? '👉' : '🔒') + '</span>' +
      '</button>'
    );
  }).join('');

  const title = STEPS[lang].find((st) => st.screen.set === set);
  $app.innerHTML =
    topbar(title ? title.label : '', '👆') +
    '<div class="screen">' +
      '<p class="hint-line">थोड़े-थोड़े सीखो &nbsp;👆👂</p>' +
      '<div class="grp-list">' + cards + '</div>' +
    '</div>';
}

function renderLetterDetail() {
  const { lang, set } = S;
  const list = letterSet(lang, set);
  const groups = letterGroups(lang, set);
  if (S.gi == null || !groups[S.gi]) S.gi = 0;
  if (S.li == null || S.li >= groups[S.gi].length) S.li = 0;
  const group = groups[S.gi];
  const abs = group[S.li];
  const it = list[abs];
  const isVowelish = set === 'vowels' || set === 'smalls';
  markSeen(lang + '-' + set + '-' + abs);

  const disp = letterDisplay(it, set);
  const speakLang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  const lr = { rate: Speech.letterRate() };

  currentSpeak = () => {
    const bigEl = document.querySelector('.big-letter');
    const wordEl = document.querySelector('.word-card');
    /* letter twice (slow), then the picture word, then an occasional trace hint */
    const items = [
      { text: it.ch, lang: speakLang, el: bigEl, opts: lr, gap: 420 },
      { text: it.ch, lang: speakLang, el: bigEl, opts: lr, gap: 420 },
    ];
    if (it.word) {
      items.push({
        text: lang === 'hi' ? (it.hint ? it.hint : it.ch + ' से ' + it.word) : it.ch + ' for ' + it.word,
        lang: speakLang,
        el: wordEl,
      });
    } else if (it.hint) {
      items.push({ text: it.hint, lang: 'hi-IN', el: wordEl });
    }
    if (progress.traces < 3) {
      items.push({ text: VOICE_TEXT.traceHint, lang: 'hi-IN', gap: 0 });
    }
    Speech.seq(items);
  };

  const wordCard = it.word
    ? '<button class="word-card" data-a="sayWord">' +
        '<span class="wc-emoji">' + (it.emoji || '🔊') + '</span>' +
        '<span class="wc-word">' + wordHTML(it.word, lang, it.hl || 0, false) + '</span>' +
      '</button>'
    : '<button class="word-card word-card-hint" data-a="sayWord">' +
        '<span class="wc-emoji">🗣️</span><span class="wc-word wc-small">' + esc(it.hint || '') + '</span>' +
      '</button>';

  /* real-life example words for this letter — tap to hear */
  const exRow = (it.ex && it.ex.length)
    ? '<div class="ex-row">' + it.ex.map((e, i) => {
        const starts = lang === 'en'
          ? e.word.charAt(0).toUpperCase() === it.ch
          : baseCluster(e.word) === (baseCluster(it.ch) || it.ch);
        return '<button class="ex-card" style="animation-delay:' + (0.25 + i * 0.15) + 's" data-a="ex" data-i="' + i + '">' +
          '<span class="ex-emoji">' + e.emoji + '</span>' +
          '<span class="ex-word">' + wordHTML(e.word, lang, starts ? 0 : -1, false) + '</span>' +
        '</button>';
      }).join('') + '</div>'
    : '';

  $app.innerHTML =
    topbar((S.li + 1) + '/' + group.length, isVowelish ? '🔴' : '🔵') +
    '<div class="screen detail">' +
      '<button class="big-letter ' + (isVowelish ? 'c-vowel' : 'c-cons') + '" data-a="sayLetter">' + esc(disp) +
        (set === 'smalls' ? '<span class="ref-cap">' + esc(it.ch) + '</span>' : '') +
      '</button>' +
      wordCard +
      exRow +
      '<nav class="navrow">' +
        '<button class="nav-btn" data-a="prev" aria-label="पिछला">⬅️</button>' +
        '<button class="nav-btn play" data-a="repeat" aria-label="सुनो">🔊</button>' +
        '<button class="nav-btn write" data-a="trace" aria-label="लिखो">✍️</button>' +
        '<button class="nav-btn" data-a="next" aria-label="अगला">➡️</button>' +
      '</nav>' +
      counterDots(group.length, S.li) +
    '</div>';
}

/* ----------------------- finger tracing (writing) ----------------------- */
const T = { samples: [], covered: null, done: false, drawing: false, lastX: 0, lastY: 0, lastDraw: 0 };

function renderTrace() {
  const { lang, set } = S;
  const list = letterSet(lang, set);
  const groups = letterGroups(lang, set);
  const abs = groups[S.gi][S.li];
  const it = list[abs];
  const disp = letterDisplay(it, set);
  currentSpeak = () => Speech.say(VOICE_TEXT.trace);

  /* no ⬅️/🏠 up top here: while tracing, a stray palm touch near the top
     must not be able to navigate away — leaving is the bottom ↩️ only */
  $app.innerHTML =
    '<header class="topbar">' +
      '<span class="tb-btn tb-badge" aria-hidden="true">✍️</span>' +
      '<div class="tb-title"><span>' + esc(disp) + '</span></div>' +
      '<button class="tb-btn tb-slow ' + (Speech.slow ? 'active' : '') + '" data-a="slow" aria-label="धीरे बोलो">🐢</button>' +
      '<button class="tb-btn tb-sound" data-a="repeat" aria-label="फिर से सुनो">🔊</button>' +
    '</header>' +
    '<div class="screen detail">' +
      '<div class="trace-wrap" id="trace-wrap">' +
        '<canvas id="trace-canvas" width="480" height="480"></canvas>' +
      '</div>' +
      '<button class="blend-btn trace-next" id="trace-next" data-a="back">⭐ आगे ➡️</button>' +
      '<nav class="navrow">' +
        '<button class="nav-btn" data-a="traceClear" aria-label="मिटाओ">🧽</button>' +
        '<button class="nav-btn play" data-a="traceSay" aria-label="सुनो">🔊</button>' +
        '<button class="nav-btn" data-a="back" aria-label="वापस">↩️</button>' +
      '</nav>' +
    '</div>';

  setupTrace(disp, lang);
}

function traceFont(size) {
  return '900 ' + size + 'px "Noto Sans Devanagari", "Noto Sans", system-ui, sans-serif';
}

function setupTrace(letter, lang) {
  const canvas = document.getElementById('trace-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 480;
  T.done = false;
  T.drawing = false;

  /* guide letter on the visible canvas */
  const drawGuide = () => {
    ctx.clearRect(0, 0, W, W);
    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(0, 0, W, W);
    ctx.fillStyle = '#e9ddc8';
    let size = letter.length > 1 ? 250 : 330;
    ctx.font = traceFont(size);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, W / 2, W / 2 + 14);
  };
  drawGuide();

  /* sample the letter's pixels so we can measure coverage */
  const off = document.createElement('canvas');
  off.width = W; off.height = W;
  const octx = off.getContext('2d');
  octx.font = ctx.font;
  octx.textAlign = 'center';
  octx.textBaseline = 'middle';
  octx.fillStyle = '#000';
  octx.fillText(letter, W / 2, W / 2 + 14);
  T.samples = [];
  try {
    const img = octx.getImageData(0, 0, W, W).data;
    const step = 7;
    for (let y = 0; y < W; y += step) {
      for (let x = 0; x < W; x += step) {
        if (img[(y * W + x) * 4 + 3] > 60) T.samples.push([x, y]);
      }
    }
  } catch (e) { T.samples = []; }
  T.covered = new Array(T.samples.length).fill(false);
  let coveredCount = 0;

  const BRUSH = 34;
  const markAt = (x, y) => {
    for (let i = 0; i < T.samples.length; i++) {
      if (!T.covered[i]) {
        const dx = T.samples[i][0] - x;
        const dy = T.samples[i][1] - y;
        if (dx * dx + dy * dy < BRUSH * BRUSH * 1.3) {
          T.covered[i] = true;
          coveredCount++;
        }
      }
    }
    if (!T.done && T.samples.length && coveredCount / T.samples.length >= 0.55) {
      T.done = true;
      const wrap = document.getElementById('trace-wrap');
      if (wrap) {
        wrap.classList.add('trace-good');
        const s = document.createElement('span');
        s.className = 'star-burst';
        s.textContent = '⭐';
        wrap.appendChild(s);
      }
      /* no auto-exit: she leaves when SHE taps the green button */
      const nextBtn = document.getElementById('trace-next');
      if (nextBtn) nextBtn.classList.add('show');
      progress.traces++;
      Store.write(progress);
      Speech.say(VOICE_TEXT.traceDone + ' ' + praise() + ' हरा बटन दबाओ।');
    }
  };

  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    return [(e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (W / r.height)];
  };
  const stroke = (x, y) => {
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.9)';
    ctx.lineWidth = BRUSH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(T.lastX, T.lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    T.lastX = x; T.lastY = y;
    T.lastDraw = Date.now();
    markAt(x, y);
  };

  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    T.drawing = true;
    const p = pos(e);
    T.lastX = p[0]; T.lastY = p[1];
    stroke(p[0] + 0.01, p[1] + 0.01);
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!T.drawing) return;
    e.preventDefault();
    const p = pos(e);
    stroke(p[0], p[1]);
  });
  const up = () => { T.drawing = false; };
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  T.clear = () => {
    drawGuide();
    T.covered = new Array(T.samples.length).fill(false);
    coveredCount = 0;
    T.done = false;
    const wrap = document.getElementById('trace-wrap');
    if (wrap) wrap.classList.remove('trace-good');
    const nextBtn = document.getElementById('trace-next');
    if (nextBtn) nextBtn.classList.remove('show');
  };
}

/* --------------------------- group test --------------------------- */
/* Tap rounds (hear→tap, picture→tap) + voice rounds (see→speak into 🎤).
   Every round must be answered correctly to finish; a wrong tap re-queues
   that round at the end, so the test is only cleared at 100%. */
let Q = null;

function startGroupQuiz(lang, set, gi, replace) {
  const list = letterSet(lang, set);
  const group = letterGroups(lang, set)[gi];
  const taps = [];
  group.forEach((abs) => {
    const it = list[abs];
    if (!it.rare) taps.push({ type: 'sound', abs });
    if (it.word && !it.hl && !it.rare) taps.push({ type: 'pic', abs });
  });
  const rounds = shuffle(taps).slice(0, 6);
  rounds.forEach((r) => { r.options = shuffle(group.slice()); });
  /* voice part: every letter of the group is shown and must be spoken */
  if (Recog.supported()) {
    shuffle(group.filter((abs) => !list[abs].rare))
      .forEach((abs) => rounds.push({ type: 'voice', abs, tries: 0 }));
  }
  Q = { lang, set, gi, rounds, i: 0, stars: 0, locked: false, listening: false };
  go({ screen: 'gquiz', lang, set, gi }, replace);
}

function quizPrompt() {
  if (!Q || Q.i >= Q.rounds.length) return;
  const r = Q.rounds[Q.i];
  const it = letterSet(Q.lang, Q.set)[r.abs];
  const speakLang = Q.lang === 'hi' ? 'hi-IN' : 'en-IN';
  if (r.type === 'sound') {
    Speech.seq([
      { text: 'कौन सा अक्षर?', lang: 'hi-IN', gap: 200 },
      { text: it.ch, lang: speakLang, opts: { rate: Speech.letterRate() } },
    ]);
  } else if (r.type === 'pic') {
    Speech.seq([
      { text: it.word, lang: speakLang, gap: 250 },
      { text: VOICE_TEXT.quizPic, lang: 'hi-IN' },
    ]);
  } else {
    /* voice round: do NOT speak the letter — she has to read it */
    Speech.say(VOICE_TEXT.voicePrompt);
  }
}

function renderGroupQuiz() {
  if (!Q) { startGroupQuiz(S.lang, S.set, S.gi, true); return; }
  const r = Q.rounds[Q.i];
  const list = letterSet(Q.lang, Q.set);
  const it = list[r.abs];
  currentSpeak = quizPrompt;
  const isVowelish = Q.set === 'vowels' || Q.set === 'smalls';

  let middle;
  if (r.type === 'voice') {
    middle =
      '<div class="voice-letter big-letter ' + (isVowelish ? 'c-vowel' : 'c-cons') + '">' +
        esc(letterDisplay(it, Q.set)) + '</div>' +
      '<button class="mic-btn' + (Q.listening ? ' listening' : '') + '" data-a="mic">🎤<span>बोलो</span></button>';
  } else {
    const prompt = r.type === 'pic'
      ? '<button class="quiz-pic" data-a="repeat">' + (it.emoji || '🔊') + '</button>'
      : '<button class="listen-big" data-a="repeat">🔊<span>सुनो</span></button>';
    const tiles = r.options.map((abs, i) =>
      '<button class="gtile big qopt" data-a="qanswer" data-i="' + i + '">' +
        esc(letterDisplay(list[abs], Q.set)) + '</button>'
    ).join('');
    middle = prompt + '<div class="gtiles qtiles">' + tiles + '</div>';
  }

  $app.innerHTML =
    topbar((Q.i + 1) + '/' + Q.rounds.length, r.type === 'voice' ? '🎤' : '🎯') +
    '<div class="screen game">' +
      '<div class="game-stars">⭐ <span id="g-stars">' + Q.stars + '</span></div>' +
      middle +
      counterDots(Q.rounds.length, Q.i) +
    '</div>';
}

/* round answered correctly → celebrate → next round or finish */
function quizCorrect(el, sayText, sayLang) {
  Q.locked = true;
  Q.stars++;
  addStar(Q.lang + '-letters');
  if (el) {
    el.classList.add('right');
    const s = document.createElement('span');
    s.className = 'star-burst';
    s.textContent = '⭐';
    el.appendChild(s);
  }
  const counter = document.getElementById('g-stars');
  if (counter) counter.textContent = String(Q.stars);
  Speech.say(sayText, sayLang);
  setTimeout(() => {
    if (S.screen !== 'gquiz') return;
    Q.i++;
    Q.locked = false;
    Q.listening = false;
    if (Q.i >= Q.rounds.length) {
      progress.groups[groupKey(Q.lang, Q.set, Q.gi)] = 1;
      Store.write(progress);
      go({ screen: 'gquizDone', lang: Q.lang, set: Q.set, gi: Q.gi }, true);
    } else {
      render(true);
    }
  }, 1500);
}

function quizAnswer(i) {
  if (!Q || Q.locked) return;
  const r = Q.rounds[Q.i];
  if (r.type === 'voice') return;
  const el = document.querySelectorAll('.qopt')[i];
  const ok = r.options[i] === r.abs;
  const it = letterSet(Q.lang, Q.set)[r.abs];
  const speakLang = Q.lang === 'hi' ? 'hi-IN' : 'en-IN';
  if (ok) {
    quizCorrect(el, praise() + ' ' + it.ch, speakLang);
  } else {
    /* re-queue this round once at the end — 100% means answering it right later too */
    if (!r.requeued) {
      r.requeued = true;
      Q.rounds.push({ type: r.type, abs: r.abs, options: shuffle(r.options.slice()), requeued: true });
    }
    if (el) {
      el.classList.add('wrong');
      setTimeout(() => el.classList.remove('wrong'), 700);
    }
    Speech.seq([
      { text: VOICE_TEXT.tryAgain, lang: 'hi-IN', gap: 200 },
      r.type === 'sound'
        ? { text: it.ch, lang: speakLang, opts: { rate: Speech.letterRate() } }
        : { text: it.word, lang: speakLang },
    ]);
  }
}

/* 🎤 tapped on a voice round: ding → listen (mic glows when it hears her) */
function micTap() {
  if (!Q || Q.locked || Q.listening) return;
  const r = Q.rounds[Q.i];
  if (!r || r.type !== 'voice') return;
  const it = letterSet(Q.lang, Q.set)[r.abs];
  const speakLang = Q.lang === 'hi' ? 'hi-IN' : 'en-IN';

  Speech.stop();               /* never let TTS leak into the microphone */
  Q.listening = true;
  const micEl = document.querySelector('.mic-btn');
  if (micEl) micEl.classList.add('listening');

  ding(() => {
    if (!Q || S.screen !== 'gquiz' || Q.rounds[Q.i] !== r || !Q.listening) return;
    Recog.listen(speakLang, (alts, err) => {
      if (!Q || S.screen !== 'gquiz' || Q.rounds[Q.i] !== r) return;
      Q.listening = false;
      const el = document.querySelector('.mic-btn');
      if (el) el.classList.remove('listening', 'hearing');

      if (err === 'aborted') return; /* we cancelled it ourselves */

      /* mic/permission/network is broken → don't trap her: pass gracefully */
      if (err && (err === 'unsupported' || Recog.broken || err === 'network')) {
        quizCorrect(el, VOICE_TEXT.micFail, 'hi-IN');
        return;
      }

      /* engine hiccup (spontaneous abort, busy service…): one more chance,
         then treat the mic as unusable rather than trapping her */
      if (err && err !== 'no-speech') {
        r.errs = (r.errs || 0) + 1;
        if (r.errs >= 2) { quizCorrect(el, VOICE_TEXT.micFail, 'hi-IN'); return; }
        Speech.say(VOICE_TEXT.voiceAgain);
        return;
      }

      if (alts && speechMatches(it.ch, alts, Q.lang)) {
        quizCorrect(el, praise() + ' ' + it.ch, speakLang);
        return;
      }

      /* pure silence (she hesitated / spoke too late) never counts against
         her — just invite her to press and speak again */
      if (!alts) {
        r.silences = (r.silences || 0) + 1;
        if (r.silences <= 2) {
          Speech.say(VOICE_TEXT.voiceListening + ' ' + VOICE_TEXT.voiceAgain);
          return;
        }
      }

      r.tries = (r.tries || 0) + 1;
      if (r.tries >= 3) {
        /* three honest attempts: replay the sound once more and move on */
        quizCorrect(el, VOICE_TEXT.voiceGrace + ' ' + it.ch, speakLang);
        return;
      }
      if (el) {
        el.classList.add('wrong');
        setTimeout(() => el.classList.remove('wrong'), 700);
      }
      Speech.seq([
        { text: VOICE_TEXT.voiceRetry, lang: 'hi-IN', gap: 250 },
        { text: it.ch, lang: speakLang, opts: { rate: Speech.letterRate() }, gap: 250 },
        { text: VOICE_TEXT.voiceAgain, lang: 'hi-IN' },
      ]);
    }, () => {
      /* the recogniser is picking up her voice — show it */
      const el = document.querySelector('.mic-btn');
      if (el && Q && Q.listening) el.classList.add('hearing');
    });
  });
}

function renderGroupQuizDone() {
  const { lang, set, gi } = S;
  const groups = letterGroups(lang, set);
  const hasNext = gi + 1 < groups.length;
  const stars = Q ? Q.stars : 0;
  currentSpeak = () => Speech.say(
    VOICE_TEXT.groupDone + (hasNext ? ' हरा तीर दबाओ, आगे बढ़ो।' : ' सब समूह पूरे हुए! कमाल कर दिया!')
  );
  $app.innerHTML =
    topbar('शाबाश!', '🏆') +
    '<div class="screen gameover">' +
      '<div class="trophy">🏆</div>' +
      '<div class="done-stars">⭐ ' + stars + '</div>' +
      '<p class="done-total">समूह ' + (gi + 1) + ' पूरा!</p>' +
      '<nav class="navrow">' +
        '<button class="nav-btn wide" data-a="gredo">🔁</button>' +
        (hasNext
          ? '<button class="nav-btn wide gnext" data-a="gnext">➡️ आगे</button>'
          : '<button class="nav-btn wide gnext" data-a="back">🎉 ✔️</button>') +
      '</nav>' +
    '</div>';
}

function renderMatra() {
  const { lang, ci } = S;
  const cons = DATA.hi.matraConsonants[ci];
  currentSpeak = () => Speech.say(VOICE_TEXT.matra);

  const chips = DATA.hi.matraConsonants.map((c, i) =>
    '<button class="chip' + (i === ci ? ' on' : '') + '" data-a="chip" data-i="' + i + '">' + c + '</button>'
  ).join('');

  const tiles = DATA.hi.matras.map((m, i) =>
    '<button class="tile c-matra" data-a="matra" data-i="' + i + '">' +
      '<span class="tile-ch">' + cons + m.sign + '</span>' +
    '</button>'
  ).join('');

  $app.innerHTML =
    topbar('मात्रा', '🟢') +
    '<div class="screen">' +
      '<button class="formula" data-a="formula" data-i="0">' +
        '<span id="f-area" class="f-area"><span class="f-out">' + cons + '</span></span>' +
      '</button>' +
      '<div class="letter-grid matra-grid">' + tiles + '</div>' +
      '<p class="hint-line">👇 अक्षर बदलो</p>' +
      '<div class="chip-row">' + chips + '</div>' +
    '</div>';
}

function matraPick(mi) {
  const cons = DATA.hi.matraConsonants[S.ci];
  const m = DATA.hi.matras[mi];
  const out = cons + m.sign;
  const area = document.getElementById('f-area');
  if (area) {
    area.innerHTML = m.sign
      ? '<span class="f-base">' + cons + '</span><span class="f-plus">+</span>' +
        '<span class="f-sign">◌' + m.sign + '</span><span class="f-plus">=</span>' +
        '<span class="f-out">' + out + '</span>'
      : '<span class="f-out">' + out + '</span>';
    const btn = area.parentElement;
    if (btn) btn.dataset.i = String(mi);
  }
  Speech.say(out, 'hi-IN', { rate: Speech.letterRate() });
}

function matraExplain(mi) {
  const cons = DATA.hi.matraConsonants[S.ci];
  const m = DATA.hi.matras[mi];
  const out = cons + m.sign;
  if (!m.sign) { Speech.say(cons, 'hi-IN'); return; }
  Speech.say(cons + ', और ' + m.name + '। मिल कर बना, ' + out + '।', 'hi-IN');
}

function renderWords() {
  const { lang, list, wi } = S;
  const arr = DATA[lang][list];
  const it = arr[wi];
  const speakLang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  const cs = clusters(it.word, lang);
  markSeen(lang + '-' + list + '-' + wi);

  const colorize = lang === 'hi';
  const tiles = cs.map((c, i) =>
    '<button class="wtile ' + (colorize ? (hasMatra(c) ? 'm' : 'c') : 'c') + '" data-a="part" data-i="' + i + '">' + esc(c) + '</button>'
  ).join('');

  currentSpeak = () => {
    const els = Array.from(document.querySelectorAll('.wtile'));
    const wordEl = document.querySelector('.word-big');
    const lr = { rate: Speech.letterRate() };
    /* parts slowly → whole word → "now you say it" → pause → word again */
    const items = cs.map((c, i) => ({ text: c, lang: speakLang, el: els[i], gap: 320, opts: lr }));
    items.push({ text: it.word, lang: speakLang, el: wordEl, gap: 500 });
    items.push({ text: VOICE_TEXT.echo, lang: 'hi-IN', gap: 2400 });
    items.push({ text: it.word, lang: speakLang, el: wordEl, gap: 0 });
    Speech.seq(items);
  };

  const wordStyle = it.color ? ' style="color:' + it.color + '"' : '';

  $app.innerHTML =
    topbar((wi + 1) + '/' + arr.length, '🧩') +
    '<div class="screen detail">' +
      '<button class="pic" data-a="sayFull">' + it.emoji + '</button>' +
      '<div class="wtiles">' + tiles + '</div>' +
      '<button class="word-big" data-a="sayFull"' + wordStyle + '>' + esc(it.word) + '</button>' +
      '<button class="blend-btn" data-a="repeat">▶️ जोड़ कर सुनो</button>' +
      '<nav class="navrow">' +
        '<button class="nav-btn" data-a="prev" aria-label="पिछला">⬅️</button>' +
        '<button class="nav-btn play" data-a="sayFull" aria-label="शब्द सुनो">🔊</button>' +
        '<button class="nav-btn" data-a="next" aria-label="अगला">➡️</button>' +
      '</nav>' +
      counterDots(arr.length, wi) +
    '</div>';
}

function renderSentenceGrid() {
  const { lang } = S;
  const arr = DATA[lang].sentences;
  currentSpeak = () => Speech.say(VOICE_TEXT.sentenceGrid);
  const cards = arr.map((sn, i) =>
    '<button class="sent-card" data-a="sentence" data-i="' + i + '">' +
      '<span class="sn-emoji">' + sn.emoji + '</span>' +
      '<span class="sn-text">' + esc(sn.text) + '</span>' +
    '</button>'
  ).join('');
  $app.innerHTML =
    topbar('वाक्य', '💬') +
    '<div class="screen"><div class="sent-grid">' + cards + '</div></div>';
}

function renderSentenceDetail() {
  const { lang, si } = S;
  const arr = DATA[lang].sentences;
  const sn = arr[si];
  const speakLang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  const words = sn.text.split(' ');
  markSeen(lang + '-sent-' + si);

  currentSpeak = () => {
    const els = Array.from(document.querySelectorAll('.wchip'));
    const fullEl = document.querySelector('.sent-full');
    const items = words.map((w, i) => ({ text: w.replace(/[।.]/g, ''), lang: speakLang, el: els[i], gap: 280 }));
    items.push({ text: sn.text, lang: speakLang, el: fullEl, gap: 500 });
    items.push({ text: VOICE_TEXT.echo, lang: 'hi-IN', gap: 2600 });
    items.push({ text: sn.text, lang: speakLang, el: fullEl, gap: 0 });
    Speech.seq(items);
  };

  const chips = words.map((w, i) =>
    '<button class="wchip" data-a="chipWord" data-i="' + i + '">' + esc(w) + '</button>'
  ).join('');

  $app.innerHTML =
    topbar((si + 1) + '/' + arr.length, '💬') +
    '<div class="screen detail">' +
      '<button class="pic" data-a="repeat">' + sn.emoji + '</button>' +
      '<div class="sent-full">' + chips + '</div>' +
      '<button class="blend-btn" data-a="repeat">▶️ पूरा वाक्य सुनो</button>' +
      '<nav class="navrow">' +
        '<button class="nav-btn" data-a="prev" aria-label="पिछला">⬅️</button>' +
        '<button class="nav-btn play" data-a="repeat" aria-label="सुनो">🔊</button>' +
        '<button class="nav-btn" data-a="next" aria-label="अगला">➡️</button>' +
      '</nav>' +
      counterDots(arr.length, si) +
    '</div>';
}

/* ------------------------------- big game ------------------------------- */
let G = null;

function gamePool(lang, mode) {
  if (mode === 'letters') {
    const src = lang === 'hi'
      ? DATA.hi.vowels.concat(DATA.hi.consonants).filter((x) => !x.rare)
      : DATA.en.letters;
    return src.map((x) => x.ch);
  }
  const src = lang === 'hi'
    ? DATA.hi.smallWords.concat(DATA.hi.matraWords)
    : DATA.en.cvc.concat(DATA.en.words);
  return src.map((x) => x.word);
}

function startGame(lang, mode) {
  G = { lang, mode, round: 0, total: 10, stars: 0, target: null, options: [], locked: false };
  nextRound(false);
}

function nextRound(advance) {
  if (advance) G.round++;
  if (G.round >= G.total) { go({ screen: 'gameDone', lang: G.lang, mode: G.mode }); return; }
  const pool = gamePool(G.lang, G.mode);
  let target;
  do { target = pool[Math.floor(Math.random() * pool.length)]; } while (target === G.target && pool.length > 1);
  const opts = [target];
  while (opts.length < 3) {
    const o = pool[Math.floor(Math.random() * pool.length)];
    if (opts.indexOf(o) === -1) opts.push(o);
  }
  G.target = target;
  G.options = shuffle(opts);
  G.locked = false;
  render(true);
}

function speakTarget() {
  if (!G) return;
  const lang = G.lang === 'hi' ? 'hi-IN' : 'en-IN';
  Speech.seq([
    { text: G.mode === 'letters' ? 'कौन सा अक्षर?' : 'कौन सा शब्द?', lang: 'hi-IN', gap: 150 },
    { text: G.target, lang, gap: 0, opts: G.mode === 'letters' ? { rate: Speech.letterRate() } : {} },
  ]);
}

function renderGameMenu() {
  const { lang } = S;
  currentSpeak = () => Speech.say(VOICE_TEXT.gameMenu);
  $app.innerHTML =
    topbar('खेल', '🎉') +
    '<div class="screen"><div class="step-list">' +
      '<button class="step-card c-vowel" data-a="game" data-mode="letters">' +
        '<span class="sc-num">🔊</span>' +
        '<span class="sc-mid"><span class="sc-preview">' + (lang === 'hi' ? 'अ ? क ?' : 'A ? B ?') + '</span>' +
          '<span class="sc-label">अक्षर खेल</span></span>' +
        '<span class="sc-emoji">🔤<span class="sc-stars">⭐ ' + starCount(lang + '-letters') + '</span></span>' +
      '</button>' +
      '<button class="step-card c-word" data-a="game" data-mode="words">' +
        '<span class="sc-num">🔊</span>' +
        '<span class="sc-mid"><span class="sc-preview">' + (lang === 'hi' ? 'घर ? फल ?' : 'cat ? dog ?') + '</span>' +
          '<span class="sc-label">शब्द खेल</span></span>' +
        '<span class="sc-emoji">🧩<span class="sc-stars">⭐ ' + starCount(lang + '-words') + '</span></span>' +
      '</button>' +
    '</div></div>';
}

function renderGame() {
  if (!G) { startGame(S.lang, S.mode); return; }
  currentSpeak = speakTarget;
  const big = G.mode === 'letters';
  const tiles = G.options.map((o, i) =>
    '<button class="gtile' + (big ? ' big' : '') + '" data-a="answer" data-i="' + i + '">' + esc(o) + '</button>'
  ).join('');
  $app.innerHTML =
    topbar((G.round + 1) + '/' + G.total, '🎉') +
    '<div class="screen game">' +
      '<div class="game-stars">⭐ <span id="g-stars">' + G.stars + '</span></div>' +
      '<button class="listen-big" data-a="repeat">🔊<span>सुनो</span></button>' +
      '<div class="gtiles">' + tiles + '</div>' +
      counterDots(G.total, G.round) +
    '</div>';
}

function answer(i) {
  if (!G || G.locked) return;
  const el = document.querySelectorAll('.gtile')[i];
  const ok = G.options[i] === G.target;
  if (ok) {
    G.locked = true;
    G.stars++;
    addStar(G.lang + '-' + G.mode);
    if (el) {
      el.classList.add('right');
      const s = document.createElement('span');
      s.className = 'star-burst';
      s.textContent = '⭐';
      el.appendChild(s);
    }
    const counter = document.getElementById('g-stars');
    if (counter) counter.textContent = String(G.stars);
    Speech.say(praise() + ' ' + G.target, G.lang === 'hi' ? 'hi-IN' : 'en-IN');
    setTimeout(() => { if (S.screen === 'game') nextRound(true); }, 1500);
  } else {
    if (el) {
      el.classList.add('wrong');
      setTimeout(() => el.classList.remove('wrong'), 700);
    }
    Speech.seq([
      { text: VOICE_TEXT.tryAgain, lang: 'hi-IN', gap: 150 },
      { text: G.target, lang: G.lang === 'hi' ? 'hi-IN' : 'en-IN' },
    ]);
  }
}

function renderGameDone() {
  const stars = G ? G.stars : 0;
  const total = starCount(S.lang + '-' + S.mode);
  currentSpeak = () => Speech.say('वाह! खेल पूरा हुआ। तुमने ' + stars + ' सितारे जीते। शाबाश!');
  $app.innerHTML =
    topbar('शाबाश!', '🏆') +
    '<div class="screen gameover">' +
      '<div class="trophy">🏆</div>' +
      '<div class="done-stars">⭐ ' + stars + '</div>' +
      '<p class="done-total">कुल ⭐ ' + total + '</p>' +
      '<nav class="navrow">' +
        '<button class="nav-btn wide" data-a="game" data-mode="' + esc(S.mode) + '">🔁 फिर से</button>' +
        '<button class="nav-btn wide" data-a="home">🏠 घर</button>' +
      '</nav>' +
    '</div>';
}

/* ---------------------------- render root ---------------------------- */
function render(autoSpeak) {
  currentSpeak = null;
  switch (S.screen) {
    case 'home':       renderHome(); break;
    case 'langHome':   renderLangHome(); break;
    case 'letters':    renderGroups(); break;
    case 'letter':     renderLetterDetail(); break;
    case 'trace':      renderTrace(); break;
    case 'gquiz':      renderGroupQuiz(); break;
    case 'gquizDone':  renderGroupQuizDone(); break;
    case 'matra':      renderMatra(); break;
    case 'words':      renderWords(); break;
    case 'sentences':  renderSentenceGrid(); break;
    case 'sentence':   renderSentenceDetail(); break;
    case 'gameMenu':   renderGameMenu(); break;
    case 'game':       renderGame(); break;
    case 'gameDone':   renderGameDone(); break;
    default:           renderHome();
  }
  if (autoSpeak && unlocked && currentSpeak) {
    setTimeout(() => { if (currentSpeak) currentSpeak(); }, 120);
  }
}

/* -------------------------- event delegation -------------------------- */
$app.addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-a]');
  if (!btn) return;
  /* while a finger is tracing, a resting palm must not press buttons */
  if (S.screen === 'trace' && T.drawing) return;
  const a = btn.dataset.a;
  const i = parseInt(btn.dataset.i || '0', 10);

  switch (a) {
    case 'home':
      G = null; Q = null;
      go({ screen: 'home' });
      break;

    case 'back':
      if (S.screen === 'home') break;
      Speech.stop();
      history.back();
      break;

    case 'slow':
      Speech.slow = !Speech.slow;
      progress.slow = Speech.slow;
      Store.write(progress);
      btn.classList.toggle('active', Speech.slow);
      Speech.say(Speech.slow ? VOICE_TEXT.slowOn : VOICE_TEXT.slowOff);
      break;

    case 'repeat':
      if (currentSpeak) currentSpeak();
      break;

    case 'lang': {
      const lang = btn.dataset.lang;
      Speech.say(DATA[lang].label, lang === 'hi' ? 'hi-IN' : 'en-IN');
      setTimeout(() => go({ screen: 'langHome', lang }), 350);
      break;
    }

    case 'step': {
      const st = STEPS[S.lang][i];
      Speech.say(st.say, 'hi-IN');
      setTimeout(() => go(Object.assign({}, st.screen)), 450);
      break;
    }

    case 'group':
      go({ screen: 'letter', lang: S.lang, set: S.set, gi: i, li: 0 });
      break;

    case 'sayLetter': {
      const groups = letterGroups(S.lang, S.set);
      const it = letterSet(S.lang, S.set)[groups[S.gi][S.li]];
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
      Speech.say(it.ch, S.lang === 'hi' ? 'hi-IN' : 'en-IN', { rate: Speech.letterRate() });
      break;
    }

    case 'sayWord': {
      const groups = letterGroups(S.lang, S.set);
      const it = letterSet(S.lang, S.set)[groups[S.gi][S.li]];
      if (it.word) Speech.say(it.word, S.lang === 'hi' ? 'hi-IN' : 'en-IN');
      else if (it.hint) Speech.say(it.hint, 'hi-IN');
      break;
    }

    case 'ex': {
      const groups = letterGroups(S.lang, S.set);
      const it = letterSet(S.lang, S.set)[groups[S.gi][S.li]];
      const e = (it.ex || [])[i];
      if (!e) break;
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
      const sl = S.lang === 'hi' ? 'hi-IN' : 'en-IN';
      const starts = S.lang === 'en'
        ? e.word.charAt(0).toUpperCase() === it.ch
        : baseCluster(e.word) === (baseCluster(it.ch) || it.ch);
      const phrase = S.lang === 'hi' ? (it.ch + ' से ' + e.word) : (it.ch + ' for ' + e.word);
      Speech.say(starts ? phrase : e.word, sl);
      break;
    }

    case 'trace':
      go({ screen: 'trace', lang: S.lang, set: S.set, gi: S.gi, li: S.li });
      break;

    case 'traceClear':
      if (T.clear) T.clear();
      Speech.say(VOICE_TEXT.trace);
      break;

    case 'traceSay': {
      const groups = letterGroups(S.lang, S.set);
      const it = letterSet(S.lang, S.set)[groups[S.gi][S.li]];
      Speech.say(it.ch, S.lang === 'hi' ? 'hi-IN' : 'en-IN', { rate: Speech.letterRate() });
      break;
    }

    case 'qanswer':
      quizAnswer(i);
      break;

    case 'mic':
      micTap();
      break;

    case 'lockedGroup':
      btn.classList.remove('shake-it'); void btn.offsetWidth; btn.classList.add('shake-it');
      Speech.say(VOICE_TEXT.lockedGroup);
      break;

    case 'lockedStep':
      btn.classList.remove('shake-it'); void btn.offsetWidth; btn.classList.add('shake-it');
      Speech.say(VOICE_TEXT.lockedStep);
      break;

    case 'gredo':
      startGroupQuiz(S.lang, S.set, S.gi, true);
      break;

    case 'gnext':
      go({ screen: 'letter', lang: S.lang, set: S.set, gi: S.gi + 1, li: 0 }, true);
      break;

    case 'chip':
      go({ screen: 'matra', lang: 'hi', ci: i }, true);
      setTimeout(() => Speech.say(DATA.hi.matraConsonants[i], 'hi-IN'), 100);
      break;

    case 'matra':
      matraPick(i);
      break;

    case 'formula':
      matraExplain(parseInt(btn.dataset.i || '0', 10));
      break;

    case 'part': {
      const cs = clusters(DATA[S.lang][S.list][S.wi].word, S.lang);
      Speech.say(cs[i], S.lang === 'hi' ? 'hi-IN' : 'en-IN', { rate: Speech.letterRate() });
      break;
    }

    case 'sayFull': {
      const it = DATA[S.lang][S.list][S.wi];
      Speech.say(it.word, S.lang === 'hi' ? 'hi-IN' : 'en-IN');
      break;
    }

    case 'sentence':
      go({ screen: 'sentence', lang: S.lang, si: i });
      break;

    case 'chipWord': {
      const words = DATA[S.lang].sentences[S.si].text.split(' ');
      Speech.say(words[i].replace(/[।.]/g, ''), S.lang === 'hi' ? 'hi-IN' : 'en-IN');
      break;
    }

    case 'prev':
    case 'next': {
      const dir = a === 'next' ? 1 : -1;
      if (S.screen === 'letter') {
        const group = letterGroups(S.lang, S.set)[S.gi];
        const n = S.li + dir;
        if (n < 0) { go({ screen: 'letters', lang: S.lang, set: S.set }, true); break; }
        if (n >= group.length) {
          /* group finished → straight into its mini quiz */
          Speech.say(VOICE_TEXT.quizStart);
          setTimeout(() => startGroupQuiz(S.lang, S.set, S.gi, true), 1100);
          break;
        }
        go({ screen: 'letter', lang: S.lang, set: S.set, gi: S.gi, li: n }, true);
      } else if (S.screen === 'words') {
        const arr = DATA[S.lang][S.list];
        const n = S.wi + dir;
        if (n < 0) { go({ screen: 'langHome', lang: S.lang }, true); break; }
        if (n >= arr.length) {
          Speech.say(VOICE_TEXT.sectionDone);
          setTimeout(() => go({ screen: 'langHome', lang: S.lang }, true), 1800);
          break;
        }
        go({ screen: 'words', lang: S.lang, list: S.list, wi: n }, true);
      } else if (S.screen === 'sentence') {
        const arr = DATA[S.lang].sentences;
        const n = S.si + dir;
        if (n < 0 || n >= arr.length) { go({ screen: 'sentences', lang: S.lang }, true); break; }
        go({ screen: 'sentence', lang: S.lang, si: n }, true);
      }
      break;
    }

    case 'game': {
      const mode = btn.dataset.mode;
      S = { screen: 'game', lang: S.lang, mode };
      try { history.pushState(S, ''); } catch (e) { /* ignore */ }
      startGame(S.lang, mode);
      break;
    }

    case 'answer':
      answer(i);
      break;
  }
});

/* ------------------------------- boot ------------------------------- */
render(false);

if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline still fine */ });
  });
}
