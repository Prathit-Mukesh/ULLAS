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

    /* स्वर — vowels (ex = everyday example words) */
    vowels: [
      { ch: 'अ',  word: 'अनानास', emoji: '🍍', ex: [{ word: 'अखबार', emoji: '📰' }, { word: 'अस्पताल', emoji: '🏥' }] },
      { ch: 'आ',  word: 'आम',     emoji: '🥭', ex: [{ word: 'आग', emoji: '🔥' }, { word: 'आलू', emoji: '🥔' }] },
      { ch: 'इ',  word: 'इमारत',  emoji: '🏢', ex: [{ word: 'इंजन', emoji: '🚂' }, { word: 'इंद्रधनुष', emoji: '🌈' }] },
      { ch: 'ई',  word: 'ईंट',    emoji: '🧱', ex: [{ word: 'ईनाम', emoji: '🎁' }, { word: 'ईमेल', emoji: '📧' }] },
      { ch: 'उ',  word: 'उल्लू',  emoji: '🦉', ex: [{ word: 'उजाला', emoji: '💡' }, { word: 'उल्टा', emoji: '🙃' }] },
      { ch: 'ऊ',  word: 'ऊँट',    emoji: '🐪', ex: [{ word: 'ऊन', emoji: '🧶' }, { word: 'ऊपर', emoji: '⬆️' }] },
      { ch: 'ऋ',  word: 'ऋषि',   emoji: '🧘', ex: [{ word: 'ऋतु', emoji: '🍂' }, { word: 'ऋण', emoji: '💸' }] },
      { ch: 'ए',  word: 'एक',     emoji: '1️⃣', ex: [{ word: 'एटीएम', emoji: '🏧' }, { word: 'एड़ी', emoji: '🦶' }] },
      { ch: 'ऐ',  word: 'ऐनक',    emoji: '👓', ex: [{ word: 'ऐप', emoji: '📱' }, { word: 'ऐलान', emoji: '📢' }] },
      { ch: 'ओ',  word: 'ओम',     emoji: '🕉️', ex: [{ word: 'ओस', emoji: '💦' }, { word: 'ओला', emoji: '🧊' }] },
      { ch: 'औ',  word: 'औरत',    emoji: '👩', ex: [{ word: 'औज़ार', emoji: '🛠️' }, { word: 'औषधि', emoji: '💊' }] },
      { ch: 'अं', word: 'अंगूर',  emoji: '🍇', ex: [{ word: 'अंडा', emoji: '🥚' }, { word: 'अंगूठा', emoji: '👍' }] },
      { ch: 'अः', word: 'नमः',    emoji: '🙏', hl: 1, hint: 'अः — जैसे नमः में।', ex: [{ word: 'छः', emoji: '6️⃣' }, { word: 'दुःख', emoji: '😢' }] },
    ],

    /* व्यंजन — consonants (ex = everyday example words) */
    consonants: [
      { ch: 'क', word: 'कमल',    emoji: '🪷', ex: [{ word: 'कप', emoji: '☕' }, { word: 'कुर्सी', emoji: '🪑' }] },
      { ch: 'ख', word: 'खरगोश',  emoji: '🐇', ex: [{ word: 'खत', emoji: '✉️' }, { word: 'खीरा', emoji: '🥒' }] },
      { ch: 'ग', word: 'गमला',   emoji: '🪴', ex: [{ word: 'गाय', emoji: '🐄' }, { word: 'गुलाब', emoji: '🌹' }] },
      { ch: 'घ', word: 'घर',     emoji: '🏠', ex: [{ word: 'घड़ी', emoji: '⌚' }, { word: 'घंटी', emoji: '🔔' }] },
      { ch: 'ङ', rare: true, hint: 'ङ — यह अक्षर शब्दों के बीच में आता है।' },
      { ch: 'च', word: 'चम्मच',  emoji: '🥄', ex: [{ word: 'चाबी', emoji: '🗝️' }, { word: 'चूहा', emoji: '🐭' }] },
      { ch: 'छ', word: 'छाता',   emoji: '☂️', ex: [{ word: 'छक्का', emoji: '🏏' }, { word: 'छिपकली', emoji: '🦎' }] },
      { ch: 'ज', word: 'जहाज',   emoji: '🚢', ex: [{ word: 'जूता', emoji: '👞' }, { word: 'जग', emoji: '🏺' }] },
      { ch: 'झ', word: 'झंडा',   emoji: '🚩', ex: [{ word: 'झाड़ू', emoji: '🧹' }, { word: 'झोला', emoji: '🛍️' }] },
      { ch: 'ञ', rare: true, hint: 'ञ — यह अक्षर शब्दों के बीच में आता है।' },
      { ch: 'ट', word: 'टमाटर',  emoji: '🍅', ex: [{ word: 'टोपी', emoji: '🧢' }, { word: 'टीवी', emoji: '📺' }] },
      { ch: 'ठ', word: 'ठंडा',   emoji: '🧊', ex: [{ word: 'ठेला', emoji: '🛒' }] },
      { ch: 'ड', word: 'डमरू',   emoji: '🪘', ex: [{ word: 'डाक', emoji: '📮' }, { word: 'डर', emoji: '😨' }] },
      { ch: 'ढ', word: 'ढोल',    emoji: '🥁', ex: [{ word: 'ढाबा', emoji: '🍛' }] },
      { ch: 'ण', word: 'बाण',    emoji: '🎯', hl: 1, hint: 'ण — जैसे बाण में।' },
      { ch: 'त', word: 'तरबूज',  emoji: '🍉', ex: [{ word: 'ताला', emoji: '🔒' }, { word: 'तितली', emoji: '🦋' }] },
      { ch: 'थ', word: 'थाली',   emoji: '🍽️', ex: [{ word: 'थैला', emoji: '🛍️' }] },
      { ch: 'द', word: 'दरवाजा', emoji: '🚪', ex: [{ word: 'दीया', emoji: '🪔' }, { word: 'दवाई', emoji: '💊' }] },
      { ch: 'ध', word: 'धनुष',   emoji: '🏹', ex: [{ word: 'धागा', emoji: '🧵' }, { word: 'धूप', emoji: '☀️' }] },
      { ch: 'न', word: 'नल',     emoji: '🚰', ex: [{ word: 'नाव', emoji: '⛵' }, { word: 'नमक', emoji: '🧂' }] },
      { ch: 'प', word: 'पतंग',   emoji: '🪁', ex: [{ word: 'पैसा', emoji: '💰' }, { word: 'पेड़', emoji: '🌳' }] },
      { ch: 'फ', word: 'फल',     emoji: '🍎', ex: [{ word: 'फोन', emoji: '📱' }, { word: 'फूल', emoji: '🌸' }] },
      { ch: 'ब', word: 'बतख',    emoji: '🦆', ex: [{ word: 'बर्तन', emoji: '🍲' }, { word: 'बकरी', emoji: '🐐' }] },
      { ch: 'भ', word: 'भालू',   emoji: '🐻', ex: [{ word: 'भैंस', emoji: '🐃' }, { word: 'भात', emoji: '🍚' }] },
      { ch: 'म', word: 'मछली',   emoji: '🐟', ex: [{ word: 'मक्खी', emoji: '🪰' }, { word: 'मकान', emoji: '🏠' }] },
      { ch: 'य', word: 'यज्ञ',   emoji: '🔥', ex: [{ word: 'यात्रा', emoji: '🧳' }, { word: 'योग', emoji: '🧘' }] },
      { ch: 'र', word: 'रोटी',   emoji: '🫓', ex: [{ word: 'रेल', emoji: '🚆' }, { word: 'रेडियो', emoji: '📻' }] },
      { ch: 'ल', word: 'लकड़ी',  emoji: '🪵', ex: [{ word: 'लालटेन', emoji: '🏮' }, { word: 'लहसुन', emoji: '🧄' }] },
      { ch: 'व', word: 'वन',     emoji: '🌳', ex: [{ word: 'वर्षा', emoji: '🌧️' }, { word: 'वाहन', emoji: '🚗' }] },
      { ch: 'श', word: 'शेर',    emoji: '🦁', ex: [{ word: 'शहद', emoji: '🍯' }, { word: 'शंख', emoji: '🐚' }] },
      { ch: 'ष', word: 'भाषा',   emoji: '🗣️', hl: 1, hint: 'ष — जैसे भाषा में।' },
      { ch: 'स', word: 'सूरज',   emoji: '🌞', ex: [{ word: 'साबुन', emoji: '🧼' }, { word: 'सब्जी', emoji: '🥬' }] },
      { ch: 'ह', word: 'हाथी',   emoji: '🐘', ex: [{ word: 'हल', emoji: '🚜' }, { word: 'हार', emoji: '📿' }] },
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
      { ch: 'A', word: 'Apple',    emoji: '🍎', ex: [{ word: 'Ant', emoji: '🐜' }, { word: 'Aeroplane', emoji: '✈️' }] },
      { ch: 'B', word: 'Ball',     emoji: '⚽', ex: [{ word: 'Bus', emoji: '🚌' }, { word: 'Banana', emoji: '🍌' }] },
      { ch: 'C', word: 'Cat',      emoji: '🐱', ex: [{ word: 'Cup', emoji: '☕' }, { word: 'Car', emoji: '🚗' }] },
      { ch: 'D', word: 'Dog',      emoji: '🐶', ex: [{ word: 'Door', emoji: '🚪' }, { word: 'Drum', emoji: '🥁' }] },
      { ch: 'E', word: 'Egg',      emoji: '🥚', ex: [{ word: 'Ear', emoji: '👂' }, { word: 'Elephant', emoji: '🐘' }] },
      { ch: 'F', word: 'Fish',     emoji: '🐟', ex: [{ word: 'Flower', emoji: '🌸' }, { word: 'Fire', emoji: '🔥' }] },
      { ch: 'G', word: 'Grapes',   emoji: '🍇', ex: [{ word: 'Goat', emoji: '🐐' }, { word: 'Gift', emoji: '🎁' }] },
      { ch: 'H', word: 'House',    emoji: '🏠', ex: [{ word: 'Hand', emoji: '✋' }, { word: 'Hen', emoji: '🐔' }] },
      { ch: 'I', word: 'Ice',      emoji: '🧊', ex: [{ word: 'Ice-cream', emoji: '🍦' }, { word: 'Insect', emoji: '🐞' }] },
      { ch: 'J', word: 'Juice',    emoji: '🧃', ex: [{ word: 'Jug', emoji: '🏺' }, { word: 'Jeep', emoji: '🚙' }] },
      { ch: 'K', word: 'Kite',     emoji: '🪁', ex: [{ word: 'Key', emoji: '🗝️' }, { word: 'King', emoji: '🤴' }] },
      { ch: 'L', word: 'Lion',     emoji: '🦁', ex: [{ word: 'Lamp', emoji: '🪔' }, { word: 'Leg', emoji: '🦵' }] },
      { ch: 'M', word: 'Mango',    emoji: '🥭', ex: [{ word: 'Moon', emoji: '🌙' }, { word: 'Milk', emoji: '🥛' }] },
      { ch: 'N', word: 'Nose',     emoji: '👃', ex: [{ word: 'Net', emoji: '🥅' }, { word: 'Nine', emoji: '9️⃣' }] },
      { ch: 'O', word: 'Orange',   emoji: '🍊', ex: [{ word: 'Onion', emoji: '🧅' }, { word: 'Ox', emoji: '🐂' }] },
      { ch: 'P', word: 'Pen',      emoji: '🖊️', ex: [{ word: 'Phone', emoji: '📱' }, { word: 'Pot', emoji: '🍲' }] },
      { ch: 'Q', word: 'Queen',    emoji: '👑', ex: [{ word: 'Question', emoji: '❓' }, { word: 'Quilt', emoji: '🛏️' }] },
      { ch: 'R', word: 'Rose',     emoji: '🌹', ex: [{ word: 'Rain', emoji: '🌧️' }, { word: 'Ring', emoji: '💍' }] },
      { ch: 'S', word: 'Sun',      emoji: '☀️', ex: [{ word: 'Soap', emoji: '🧼' }, { word: 'Star', emoji: '⭐' }] },
      { ch: 'T', word: 'Tree',     emoji: '🌳', ex: [{ word: 'Tap', emoji: '🚰' }, { word: 'Train', emoji: '🚆' }] },
      { ch: 'U', word: 'Umbrella', emoji: '☂️', ex: [{ word: 'Up', emoji: '⬆️' }, { word: 'Uncle', emoji: '👨' }] },
      { ch: 'V', word: 'Van',      emoji: '🚐', ex: [{ word: 'Violin', emoji: '🎻' }, { word: 'Vegetables', emoji: '🥕' }] },
      { ch: 'W', word: 'Watch',    emoji: '⌚', ex: [{ word: 'Wall', emoji: '🧱' }, { word: 'Water', emoji: '💧' }] },
      { ch: 'X', word: 'X-ray',    emoji: '🩻', ex: [{ word: 'Box', emoji: '📦' }, { word: 'Six', emoji: '6️⃣' }] },
      { ch: 'Y', word: 'Yo-yo',    emoji: '🪀', ex: [{ word: 'Yoga', emoji: '🧘' }, { word: 'Yellow', emoji: '🟡' }] },
      { ch: 'Z', word: 'Zebra',    emoji: '🦓', ex: [{ word: 'Zip', emoji: '🤐' }, { word: 'Zero', emoji: '0️⃣' }] },
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

/* ---------------- How each letter is SPOKEN (not how it is written) ----------------
   Bare Devanagari consonants (क) are pronounced with the inherent vowel — "का"-like.
   Many TTS voices clip a lone क into a hard "k", which confuses a new learner, so we
   feed the engine the syllabic form. Only the spoken text changes; the screen still
   shows the plain letter. */
const LETTER_SAY = {
  /* Bare vowel signs are read as punctuation by some voices, so anchor them
     to a syllable that carries the same sound. */
  'अं': 'अंग',
  'अः': 'अः',
  /* Voices that spell conjuncts out letter-by-letter get the joined syllable. */
  'क्ष': 'क्ष',
  'त्र': 'त्र',
  'ज्ञ': 'ज्ञ',
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
