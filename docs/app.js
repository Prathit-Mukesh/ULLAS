/* ============================================================
   अक्षर ज्ञान (Akshar Gyan) — app logic
   Audio-first, icon-driven learning app for adult new readers.
   No frameworks, no build step. Works offline (see sw.js).
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

function markSeen(key) {
  if (!progress.seen[key]) { progress.seen[key] = 1; Store.write(progress); }
}
function starCount(key) { return progress.stars[key] || 0; }
function addStar(key) { progress.stars[key] = starCount(key) + 1; Store.write(progress); }

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

  rate() { return this.slow ? 0.62 : 0.82; },

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
    u.pitch = 1.05;
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

  say(text, lang) {
    this.stop();
    this.utter(text, lang || 'hi-IN');
  },

  /* speak a list of {text, lang, el, gap} one after another, highlighting el */
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
  S = next;
  try {
    if (replace) history.replaceState(S, '');
    else history.pushState(S, '');
  } catch (e) { /* ignore */ }
  render(true);
  window.scrollTo(0, 0);
}
window.addEventListener('popstate', (e) => {
  Speech.stop();
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

function renderLangHome() {
  const lang = S.lang;
  const steps = STEPS[lang];
  currentSpeak = () => Speech.say(lang === 'hi' ? VOICE_TEXT.langHomeHi : VOICE_TEXT.langHomeEn);
  const cards = steps.map((st, i) => {
    const stars = st.id === 'game'
      ? starCount(lang + '-letters') + starCount(lang + '-words') : 0;
    return (
      '<button class="step-card ' + st.cls + '" data-a="step" data-i="' + i + '">' +
        '<span class="sc-num">' + (i + 1) + '</span>' +
        '<span class="sc-mid"><span class="sc-preview">' + esc(st.preview) + '</span>' +
          '<span class="sc-label">' + esc(st.label) + '</span></span>' +
        '<span class="sc-emoji">' + st.emoji +
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

function renderLetterGrid() {
  const { lang, set } = S;
  const list = letterSet(lang, set);
  const isVowelish = set === 'vowels' || set === 'smalls';
  currentSpeak = () => Speech.say(VOICE_TEXT.letterGrid);
  const tiles = list.map((it, i) => {
    const seen = progress.seen[lang + '-' + set + '-' + i];
    return (
      '<button class="tile ' + (isVowelish ? 'c-vowel' : 'c-cons') + '" data-a="letter" data-i="' + i + '">' +
        '<span class="tile-ch">' + esc(letterDisplay(it, set)) + '</span>' +
        (seen ? '<span class="tile-seen">✔️</span>' : '') +
      '</button>'
    );
  }).join('');
  const title = STEPS[lang].find((st) => st.screen.set === set);
  $app.innerHTML =
    topbar(title ? title.label : '', '👆') +
    '<div class="screen">' +
      '<p class="hint-line">👆 दबाओ &nbsp; 👂 सुनो</p>' +
      '<div class="letter-grid">' + tiles + '</div>' +
    '</div>';
}

function renderLetterDetail() {
  const { lang, set, li } = S;
  const list = letterSet(lang, set);
  const it = list[li];
  const isVowelish = set === 'vowels' || set === 'smalls';
  markSeen(lang + '-' + set + '-' + li);

  const disp = letterDisplay(it, set);
  const speakLang = lang === 'hi' ? 'hi-IN' : 'en-IN';

  currentSpeak = () => {
    const items = [{ text: it.ch, lang: speakLang, el: document.querySelector('.big-letter') }];
    if (it.word) {
      items.push({
        text: lang === 'hi' ? (it.hint ? it.hint : it.ch + ' से ' + it.word) : it.ch + ' for ' + it.word,
        lang: speakLang,
        el: document.querySelector('.word-card'),
      });
    } else if (it.hint) {
      items.push({ text: it.hint, lang: 'hi-IN', el: document.querySelector('.word-card') });
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

  $app.innerHTML =
    topbar((li + 1) + '/' + list.length, isVowelish ? '🔴' : '🔵') +
    '<div class="screen detail">' +
      '<button class="big-letter ' + (isVowelish ? 'c-vowel' : 'c-cons') + '" data-a="sayLetter">' + esc(disp) +
        (set === 'smalls' ? '<span class="ref-cap">' + esc(it.ch) + '</span>' : '') +
      '</button>' +
      wordCard +
      '<nav class="navrow">' +
        '<button class="nav-btn" data-a="prev" aria-label="पिछला">⬅️</button>' +
        '<button class="nav-btn play" data-a="repeat" aria-label="सुनो">🔊</button>' +
        '<button class="nav-btn" data-a="next" aria-label="अगला">➡️</button>' +
      '</nav>' +
      (list.length <= 16 ? counterDots(list.length, li) : '') +
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
  Speech.say(out, 'hi-IN');
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
    const items = cs.map((c, i) => ({ text: c, lang: speakLang, el: els[i], gap: 200 }));
    items.push({ text: it.word, lang: speakLang, el: document.querySelector('.word-big'), gap: 0, opts: {} });
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
    const items = words.map((w, i) => ({ text: w.replace(/[।.]/g, ''), lang: speakLang, el: els[i], gap: 220 }));
    items.push({ text: sn.text, lang: speakLang, el: document.querySelector('.sent-full'), gap: 0 });
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

/* ------------------------------- game ------------------------------- */
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
  /* shuffle */
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = opts[i]; opts[i] = opts[j]; opts[j] = t;
  }
  G.target = target;
  G.options = opts;
  G.locked = false;
  render(true);
}

function speakTarget() {
  if (!G) return;
  const lang = G.lang === 'hi' ? 'hi-IN' : 'en-IN';
  Speech.seq([
    { text: G.mode === 'letters' ? 'कौन सा अक्षर?' : 'कौन सा शब्द?', lang: 'hi-IN', gap: 150 },
    { text: G.target, lang, gap: 0 },
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
    case 'letters':    renderLetterGrid(); break;
    case 'letter':     renderLetterDetail(); break;
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
  const a = btn.dataset.a;
  const i = parseInt(btn.dataset.i || '0', 10);

  switch (a) {
    case 'home':
      G = null;
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

    case 'letter': {
      const it = letterSet(S.lang, S.set)[i];
      Speech.say(it.ch, S.lang === 'hi' ? 'hi-IN' : 'en-IN');
      setTimeout(() => go({ screen: 'letter', lang: S.lang, set: S.set, li: i }), 400);
      break;
    }

    case 'sayLetter': {
      const it = letterSet(S.lang, S.set)[S.li];
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
      Speech.say(it.ch, S.lang === 'hi' ? 'hi-IN' : 'en-IN');
      break;
    }

    case 'sayWord': {
      const it = letterSet(S.lang, S.set)[S.li];
      if (it.word) Speech.say(it.word, S.lang === 'hi' ? 'hi-IN' : 'en-IN');
      else if (it.hint) Speech.say(it.hint, 'hi-IN');
      break;
    }

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
      Speech.say(cs[i], S.lang === 'hi' ? 'hi-IN' : 'en-IN');
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
        const list = letterSet(S.lang, S.set);
        const n = S.li + dir;
        if (n < 0) { go({ screen: 'letters', lang: S.lang, set: S.set }, true); break; }
        if (n >= list.length) {
          Speech.say(VOICE_TEXT.sectionDone);
          setTimeout(() => go({ screen: 'letters', lang: S.lang, set: S.set }, true), 1800);
          break;
        }
        go({ screen: 'letter', lang: S.lang, set: S.set, li: n }, true);
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
