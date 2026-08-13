/* ============================================================
   अक्षर ज्ञान (Akshar Gyan) — Learning content
   All words are deliberately few, common, and picture-friendly.
   Every item: ch/word + emoji (picture) + optional hint audio.
   hl = index of the letter-cluster to highlight in the word.
   ============================================================ */
'use strict';

const DATA = {
  /* ---------------------------- HINDI ---------------------------- */
  hi: {
    label: 'हिंदी',

    /* स्वर — vowels */
    vowels: [
      { ch: 'अ',  word: 'अनानास', emoji: '🍍' },
      { ch: 'आ',  word: 'आम',     emoji: '🥭' },
      { ch: 'इ',  word: 'इमारत',  emoji: '🏢' },
      { ch: 'ई',  word: 'ईंट',    emoji: '🧱' },
      { ch: 'उ',  word: 'उल्लू',  emoji: '🦉' },
      { ch: 'ऊ',  word: 'ऊँट',    emoji: '🐪' },
      { ch: 'ऋ',  word: 'ऋषि',   emoji: '🧘' },
      { ch: 'ए',  word: 'एक',     emoji: '1️⃣' },
      { ch: 'ऐ',  word: 'ऐनक',    emoji: '👓' },
      { ch: 'ओ',  word: 'ओम',     emoji: '🕉️' },
      { ch: 'औ',  word: 'औरत',    emoji: '👩' },
      { ch: 'अं', word: 'अंगूर',  emoji: '🍇' },
      { ch: 'अः', word: 'नमः',    emoji: '🙏', hl: 1, hint: 'अः — जैसे नमः में।' },
    ],

    /* व्यंजन — consonants */
    consonants: [
      { ch: 'क', word: 'कमल',    emoji: '🪷' },
      { ch: 'ख', word: 'खरगोश',  emoji: '🐇' },
      { ch: 'ग', word: 'गमला',   emoji: '🪴' },
      { ch: 'घ', word: 'घर',     emoji: '🏠' },
      { ch: 'ङ', rare: true, hint: 'ङ — यह अक्षर शब्दों के बीच में आता है।' },
      { ch: 'च', word: 'चम्मच',  emoji: '🥄' },
      { ch: 'छ', word: 'छाता',   emoji: '☂️' },
      { ch: 'ज', word: 'जहाज',   emoji: '🚢' },
      { ch: 'झ', word: 'झंडा',   emoji: '🚩' },
      { ch: 'ञ', rare: true, hint: 'ञ — यह अक्षर शब्दों के बीच में आता है।' },
      { ch: 'ट', word: 'टमाटर',  emoji: '🍅' },
      { ch: 'ठ', word: 'ठंडा',   emoji: '🧊' },
      { ch: 'ड', word: 'डमरू',   emoji: '🪘' },
      { ch: 'ढ', word: 'ढोल',    emoji: '🥁' },
      { ch: 'ण', word: 'बाण',    emoji: '🎯', hl: 1, hint: 'ण — जैसे बाण में।' },
      { ch: 'त', word: 'तरबूज',  emoji: '🍉' },
      { ch: 'थ', word: 'थाली',   emoji: '🍽️' },
      { ch: 'द', word: 'दरवाजा', emoji: '🚪' },
      { ch: 'ध', word: 'धनुष',   emoji: '🏹' },
      { ch: 'न', word: 'नल',     emoji: '🚰' },
      { ch: 'प', word: 'पतंग',   emoji: '🪁' },
      { ch: 'फ', word: 'फल',     emoji: '🍎' },
      { ch: 'ब', word: 'बतख',    emoji: '🦆' },
      { ch: 'भ', word: 'भालू',   emoji: '🐻' },
      { ch: 'म', word: 'मछली',   emoji: '🐟' },
      { ch: 'य', word: 'यज्ञ',   emoji: '🔥' },
      { ch: 'र', word: 'रोटी',   emoji: '🫓' },
      { ch: 'ल', word: 'लकड़ी',  emoji: '🪵' },
      { ch: 'व', word: 'वन',     emoji: '🌳' },
      { ch: 'श', word: 'शेर',    emoji: '🦁' },
      { ch: 'ष', word: 'भाषा',   emoji: '🗣️', hl: 1, hint: 'ष — जैसे भाषा में।' },
      { ch: 'स', word: 'सूरज',   emoji: '🌞' },
      { ch: 'ह', word: 'हाथी',   emoji: '🐘' },
      { ch: 'क्ष', word: 'क्षमा', emoji: '🙏' },
      { ch: 'त्र', word: 'त्रिशूल', emoji: '🔱' },
      { ch: 'ज्ञ', word: 'ज्ञान', emoji: '📚' },
    ],

    /* बारहखड़ी — consonants offered for matra practice */
    matraConsonants: ['क', 'ख', 'ग', 'घ', 'च', 'ज', 'ट', 'त', 'द', 'न', 'प', 'ब', 'म', 'र', 'ल', 'स'],

    /* Each matra: the sign, the vowel it comes from, spoken name */
    matras: [
      { sign: '',  vowel: 'अ',  name: '' },
      { sign: 'ा', vowel: 'आ',  name: 'आ की मात्रा' },
      { sign: 'ि', vowel: 'इ',  name: 'इ की मात्रा' },
      { sign: 'ी', vowel: 'ई',  name: 'ई की मात्रा' },
      { sign: 'ु', vowel: 'उ',  name: 'उ की मात्रा' },
      { sign: 'ू', vowel: 'ऊ',  name: 'ऊ की मात्रा' },
      { sign: 'े', vowel: 'ए',  name: 'ए की मात्रा' },
      { sign: 'ै', vowel: 'ऐ',  name: 'ऐ की मात्रा' },
      { sign: 'ो', vowel: 'ओ',  name: 'ओ की मात्रा' },
      { sign: 'ौ', vowel: 'औ',  name: 'औ की मात्रा' },
      { sign: 'ं', vowel: 'अं', name: 'अनुस्वार' },
      { sign: 'ः', vowel: 'अः', name: 'विसर्ग' },
    ],

    /* बिना मात्रा के छोटे शब्द — 2 letters, then 3 letters */
    smallWords: [
      { word: 'घर',  emoji: '🏠' },
      { word: 'जल',  emoji: '💧' },
      { word: 'फल',  emoji: '🍎' },
      { word: 'नल',  emoji: '🚰' },
      { word: 'वन',  emoji: '🌳' },
      { word: 'बस',  emoji: '🚌' },
      { word: 'दस',  emoji: '🔟' },
      { word: 'रस',  emoji: '🧃' },
      { word: 'कमल', emoji: '🪷' },
      { word: 'नमक', emoji: '🧂' },
      { word: 'कलम', emoji: '🖊️' },
      { word: 'महल', emoji: '🏰' },
      { word: 'शहर', emoji: '🏙️' },
      { word: 'पवन', emoji: '💨' },
      { word: 'वजन', emoji: '⚖️' },
      { word: 'बतख', emoji: '🦆' },
    ],

    /* मात्रा वाले शब्द — colour words are shown in their own colour */
    matraWords: [
      { word: 'पानी',  emoji: '💧' },
      { word: 'रोटी',  emoji: '🫓' },
      { word: 'दूध',   emoji: '🥛' },
      { word: 'चाय',   emoji: '☕' },
      { word: 'गाय',   emoji: '🐄' },
      { word: 'घोड़ा', emoji: '🐴' },
      { word: 'केला',  emoji: '🍌' },
      { word: 'सेब',   emoji: '🍏' },
      { word: 'मोर',   emoji: '🦚' },
      { word: 'तारा',  emoji: '⭐' },
      { word: 'लाल',   emoji: '🔴', color: '#d92d20' },
      { word: 'पीला',  emoji: '🟡', color: '#b7791f' },
      { word: 'नीला',  emoji: '🔵', color: '#1d4ed8' },
      { word: 'काला',  emoji: '⚫', color: '#1f2937' },
    ],

    /* वाक्य — short, daily-life sentences */
    sentences: [
      { text: 'यह घर है।',           emoji: '🏠' },
      { text: 'यह फल है।',           emoji: '🍎' },
      { text: 'वह ऊँट है।',          emoji: '🐪' },
      { text: 'वह सूरज है।',         emoji: '🌞' },
      { text: 'मैं पानी पीती हूँ।',  emoji: '💧' },
      { text: 'मैं रोटी खाती हूँ।',  emoji: '🫓' },
      { text: 'यह मेरा हाथ है।',     emoji: '✋' },
      { text: 'गाय दूध देती है।',    emoji: '🐄' },
      { text: 'मुझे चाय पसंद है।',   emoji: '☕' },
      { text: 'आज मौसम अच्छा है।',   emoji: '⛅' },
    ],
  },

  /* --------------------------- ENGLISH --------------------------- */
  en: {
    label: 'English',

    letters: [
      { ch: 'A', word: 'Apple',    emoji: '🍎' },
      { ch: 'B', word: 'Ball',     emoji: '⚽' },
      { ch: 'C', word: 'Cat',      emoji: '🐱' },
      { ch: 'D', word: 'Dog',      emoji: '🐶' },
      { ch: 'E', word: 'Egg',      emoji: '🥚' },
      { ch: 'F', word: 'Fish',     emoji: '🐟' },
      { ch: 'G', word: 'Grapes',   emoji: '🍇' },
      { ch: 'H', word: 'House',    emoji: '🏠' },
      { ch: 'I', word: 'Ice',      emoji: '🧊' },
      { ch: 'J', word: 'Juice',    emoji: '🧃' },
      { ch: 'K', word: 'Kite',     emoji: '🪁' },
      { ch: 'L', word: 'Lion',     emoji: '🦁' },
      { ch: 'M', word: 'Mango',    emoji: '🥭' },
      { ch: 'N', word: 'Nose',     emoji: '👃' },
      { ch: 'O', word: 'Orange',   emoji: '🍊' },
      { ch: 'P', word: 'Pen',      emoji: '🖊️' },
      { ch: 'Q', word: 'Queen',    emoji: '👑' },
      { ch: 'R', word: 'Rose',     emoji: '🌹' },
      { ch: 'S', word: 'Sun',      emoji: '☀️' },
      { ch: 'T', word: 'Tree',     emoji: '🌳' },
      { ch: 'U', word: 'Umbrella', emoji: '☂️' },
      { ch: 'V', word: 'Van',      emoji: '🚐' },
      { ch: 'W', word: 'Watch',    emoji: '⌚' },
      { ch: 'X', word: 'X-ray',    emoji: '🩻' },
      { ch: 'Y', word: 'Yo-yo',    emoji: '🪀' },
      { ch: 'Z', word: 'Zebra',    emoji: '🦓' },
    ],

    /* two-letter blending */
    blends: [
      { word: 'at', emoji: '📍' },
      { word: 'in', emoji: '📥' },
      { word: 'on', emoji: '🔛' },
      { word: 'up', emoji: '⬆️' },
      { word: 'go', emoji: '🟢' },
      { word: 'no', emoji: '🚫' },
      { word: 'me', emoji: '🙋‍♀️' },
      { word: 'we', emoji: '👨‍👩‍👧' },
      { word: 'he', emoji: '👨' },
      { word: 'do', emoji: '💪' },
    ],

    /* three-letter words */
    cvc: [
      { word: 'cat', emoji: '🐱' },
      { word: 'dog', emoji: '🐶' },
      { word: 'sun', emoji: '☀️' },
      { word: 'bus', emoji: '🚌' },
      { word: 'cup', emoji: '☕' },
      { word: 'hat', emoji: '🎩' },
      { word: 'hen', emoji: '🐔' },
      { word: 'pig', emoji: '🐷' },
      { word: 'box', emoji: '📦' },
      { word: 'bag', emoji: '👜' },
      { word: 'egg', emoji: '🥚' },
      { word: 'pen', emoji: '🖊️' },
    ],

    /* everyday words */
    words: [
      { word: 'milk',  emoji: '🥛' },
      { word: 'fish',  emoji: '🐟' },
      { word: 'tree',  emoji: '🌳' },
      { word: 'book',  emoji: '📖' },
      { word: 'ball',  emoji: '⚽' },
      { word: 'moon',  emoji: '🌙' },
      { word: 'star',  emoji: '⭐' },
      { word: 'rain',  emoji: '🌧️' },
      { word: 'hand',  emoji: '✋' },
      { word: 'food',  emoji: '🍛' },
      { word: 'home',  emoji: '🏠' },
      { word: 'water', emoji: '💧' },
    ],

    sentences: [
      { text: 'This is a cat.',   emoji: '🐱' },
      { text: 'This is my home.', emoji: '🏠' },
      { text: 'I see the sun.',   emoji: '☀️' },
      { text: 'The dog runs.',    emoji: '🐶' },
      { text: 'I drink water.',   emoji: '💧' },
      { text: 'I eat food.',      emoji: '🍛' },
      { text: 'This is a bus.',   emoji: '🚌' },
      { text: 'I like tea.',      emoji: '☕' },
    ],
  },
};

/* ------------------- Spoken guidance (always Hindi) ------------------- */
const VOICE_TEXT = {
  welcome: 'नमस्ते! यह अक्षर ज्ञान है। यहाँ हम पढ़ना सीखेंगे। हिंदी सीखने के लिए नारंगी डिब्बा दबाओ। अंग्रेज़ी सीखने के लिए नीला डिब्बा दबाओ।',
  langHomeHi: 'बहुत अच्छा! अब एक डिब्बा चुनो। पहली बार हो, तो नंबर एक दबाओ।',
  langHomeEn: 'यह अंग्रेज़ी है। एक डिब्बा चुनो। पहली बार हो, तो नंबर एक दबाओ।',
  groups: 'हम थोड़े-थोड़े अक्षर सीखेंगे। जो डिब्बा चमक रहा है, उसे दबाओ।',
  matra: 'नीचे से एक अक्षर चुनो। फिर मात्रा वाले अक्षर दबाओ, और सुनो।',
  wordScreen: 'तस्वीर देखो। हर अक्षर को दबाओ। फिर नीचे हरा बटन दबाओ, और पूरा शब्द सुनो।',
  sentenceGrid: 'एक तस्वीर चुनो।',
  sentenceDetail: 'हर शब्द को दबाओ, और सुनो। फिर हरा बटन दबाओ, पूरा वाक्य सुनो।',
  gameMenu: 'खेल का समय! एक खेल चुनो।',
  gameLetters: 'ध्यान से सुनो। फिर सही अक्षर दबाओ।',
  gameWords: 'ध्यान से सुनो। फिर सही शब्द दबाओ।',
  quizStart: 'अब छोटा खेल! ध्यान से सुनो।',
  quizPic: 'तस्वीर देखो। सही अक्षर दबाओ।',
  voicePrompt: 'यह अक्षर ज़ोर से बोलो। पीला माइक दबाओ, फिर बोलो।',
  voiceListening: 'अब बोलो!',
  voiceRetry: 'फिर से सुनो।',
  voiceAgain: 'अब माइक दबा कर बोलो।',
  voiceGrace: 'कोई बात नहीं। शाबाश, आगे बढ़ो।',
  micFail: 'माइक नहीं चल रहा। कोई बात नहीं, आगे बढ़ो।',
  lockedGroup: 'यह अभी बंद है। पहले पिछला समूह पूरा करो।',
  lockedStep: 'यह अभी बंद है। पहले सारे अक्षर सीखो।',
  groupDone: 'यह समूह पूरा हुआ! शाबाश!',
  trace: 'उंगली से, अक्षर के ऊपर लिखो।',
  traceDone: 'वाह! तुमने लिखा!',
  traceHint: 'पीला बटन दबाओ, और उंगली से लिखो।',
  echo: 'अब तुम बोलो।',
  sectionDone: 'बहुत बढ़िया! यह हिस्सा पूरा हुआ।',
  tryAgain: 'कोई बात नहीं। फिर से सुनो।',
  slowOn: 'अब मैं धीरे बोलूँगी।',
  slowOff: 'अब मैं ठीक बोलूँगी।',
  praise: ['शाबाश!', 'बहुत बढ़िया!', 'वाह, सही जवाब!', 'एकदम सही!'],
};

/* --------- Letter groups: learn 3-5 letters at a time, then quiz --------- */
/* Values are indices into the letter lists above. Hindi consonant groups
   follow the traditional वर्ग rows (क-वर्ग, च-वर्ग …). */
const GROUPS = {
  hi: {
    vowels: [
      [0, 1, 2, 3],          /* अ आ इ ई */
      [4, 5, 6, 7],          /* उ ऊ ऋ ए */
      [8, 9, 10, 11, 12],    /* ऐ ओ औ अं अः */
    ],
    consonants: [
      [0, 1, 2, 3, 4],       /* क ख ग घ ङ */
      [5, 6, 7, 8, 9],       /* च छ ज झ ञ */
      [10, 11, 12, 13, 14],  /* ट ठ ड ढ ण */
      [15, 16, 17, 18, 19],  /* त थ द ध न */
      [20, 21, 22, 23, 24],  /* प फ ब भ म */
      [25, 26, 27, 28],      /* य र ल व */
      [29, 30, 31, 32],      /* श ष स ह */
      [33, 34, 35],          /* क्ष त्र ज्ञ */
    ],
  },
  en: {
    caps: [
      [0, 1, 2, 3, 4],       /* A B C D E */
      [5, 6, 7, 8, 9],       /* F G H I J */
      [10, 11, 12, 13, 14],  /* K L M N O */
      [15, 16, 17, 18, 19],  /* P Q R S T */
      [20, 21, 22, 23, 24, 25], /* U V W X Y Z */
    ],
  },
};
GROUPS.en.smalls = GROUPS.en.caps;

/* ------------------- Steps shown on each language page ------------------- */
const STEPS = {
  hi: [
    { id: 'vowels',     screen: { screen: 'letters', lang: 'hi', set: 'vowels' },     label: 'स्वर',            preview: 'अ आ इ', emoji: '🔴', cls: 'c-vowel',
      say: 'स्वर। अ, आ, इ।' },
    { id: 'consonants', screen: { screen: 'letters', lang: 'hi', set: 'consonants' }, label: 'व्यंजन',          preview: 'क ख ग', emoji: '🔵', cls: 'c-cons',
      say: 'व्यंजन। क, ख, ग।' },
    { id: 'matra',      screen: { screen: 'matra', lang: 'hi', ci: 0 },               label: 'मात्रा',          preview: 'का कि की', emoji: '🟢', cls: 'c-matra',
      say: 'मात्रा। का, कि, की।' },
    { id: 'small',      screen: { screen: 'words', lang: 'hi', list: 'smallWords', wi: 0 }, label: 'शब्द जोड़ो', preview: 'घ + र = घर', emoji: '🏠', cls: 'c-word',
      say: 'शब्द जोड़ो। घ और र से बना घर।' },
    { id: 'matraWords', screen: { screen: 'words', lang: 'hi', list: 'matraWords', wi: 0 }, label: 'नए शब्द',   preview: 'पानी · रोटी', emoji: '🫓', cls: 'c-word2',
      say: 'मात्रा वाले शब्द। पानी, रोटी।' },
    { id: 'sentences',  screen: { screen: 'sentences', lang: 'hi' },                  label: 'वाक्य',           preview: 'यह घर है।', emoji: '💬', cls: 'c-sent',
      say: 'वाक्य। यह घर है।' },
    { id: 'game',       screen: { screen: 'gameMenu', lang: 'hi' },                   label: 'खेल',             preview: '⭐ ⭐ ⭐', emoji: '🎉', cls: 'c-game',
      say: 'खेल खेलो, और सितारे जीतो!' },
  ],
  en: [
    { id: 'caps',   screen: { screen: 'letters', lang: 'en', set: 'caps' },   label: 'बड़े अक्षर',  preview: 'A B C', emoji: '🔵', cls: 'c-cons',
      say: 'बड़े अक्षर। A, B, C।' },
    { id: 'smalls', screen: { screen: 'letters', lang: 'en', set: 'smalls' }, label: 'छोटे अक्षर', preview: 'a b c', emoji: '🔴', cls: 'c-vowel',
      say: 'छोटे अक्षर। a, b, c।' },
    { id: 'blends', screen: { screen: 'words', lang: 'en', list: 'blends', wi: 0 }, label: 'दो अक्षर जोड़ो', preview: 'g + o = go', emoji: '🟢', cls: 'c-matra',
      say: 'दो अक्षर जोड़ो।' },
    { id: 'cvc',    screen: { screen: 'words', lang: 'en', list: 'cvc', wi: 0 },    label: 'छोटे शब्द', preview: 'cat · dog', emoji: '🐱', cls: 'c-word',
      say: 'छोटे शब्द। cat, dog।' },
    { id: 'words',  screen: { screen: 'words', lang: 'en', list: 'words', wi: 0 },  label: 'और शब्द',   preview: 'milk · book', emoji: '🥛', cls: 'c-word2',
      say: 'और शब्द। milk, book।' },
    { id: 'sentences', screen: { screen: 'sentences', lang: 'en' },           label: 'वाक्य',       preview: 'This is a cat.', emoji: '💬', cls: 'c-sent',
      say: 'वाक्य।' },
    { id: 'game',   screen: { screen: 'gameMenu', lang: 'en' },               label: 'खेल',         preview: '⭐ ⭐ ⭐', emoji: '🎉', cls: 'c-game',
      say: 'खेल खेलो, और सितारे जीतो!' },
  ],
};
