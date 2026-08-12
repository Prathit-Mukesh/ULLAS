# 📖 अक्षर ज्ञान (Akshar Gyan) — Learn to Read, From Zero

A free, offline-capable website that teaches a completely illiterate adult to read **Hindi** and **English** — starting from single letters, with voice, pictures and colours. Built for learners who cannot read *any* text yet, so **every screen speaks its instructions aloud in Hindi** and all navigation uses big icons, not words.

> Made with love for a mother in Jodhpur — and for every adult who never got the chance to go to school. ❤️

---

## What's inside

**Home page → 2 big cards: हिंदी (orange) and English (blue).**

### हिंदी path (7 steps)
1. **स्वर** — 13 vowels, taught **3–5 letters at a time**: each letter is spoken twice
   slowly, shown with a picture word (अ से अनानास 🍍, ऊ से ऊँट 🐪…), can be
   **finger-traced ✍️**, and each small group ends with an instant picture-quiz
2. **व्यंजन** — all 36 consonants the same way, grouped in the traditional वर्ग rows
   (क ख ग घ ङ · च छ ज झ ञ …)
3. **मात्रा** — interactive बारहखड़ी chart: pick any consonant, tap का कि की कु…, see the formula `क + ◌ा = का` in colour
4. **शब्द जोड़ो** — 2- and 3-letter words without matras (घ + र = घर 🏠). Tap each letter, then the green button blends them aloud
5. **नए शब्द** — everyday words with matras (पानी, रोटी, दूध…). Matra syllables are green, plain letters blue; colour words appear *in their colour* (लाल in red)
6. **वाक्य** — 10 daily-life sentences. Tap word-by-word, then hear the full sentence with each word lighting up
7. **खेल** — listen-and-tap game: hear a letter/word, choose among 3. Correct answers earn ⭐ stars (saved on the phone)

### English path (7 steps)
Capital letters → small letters → two-letter blending (g + o = go) → 3-letter words (c-a-t = cat 🐱) → everyday words → sentences → game.
**All instructions stay in Hindi voice** — only the content is English.

### How it makes learning stick (designed for absolute beginners)
- **Small batches**: letters come 3–5 at a time; the next group stays dimmed until the
  current one is finished, so she is never facing a wall of 36 letters
- **Learn → quiz → reward loop**: after each small group, a 6-question mini-quiz using
  *only those letters* — hear the sound → tap the letter, or see the picture 🥭 → tap
  the letter. Correct answers earn ⭐ and the group gets a ✅
- **✍️ Finger tracing**: every letter can be traced with a finger over a large guide —
  writing movement builds memory that looking alone cannot
- **🗣️ Echo practice**: word and sentence playback ends with *"अब तुम बोलो"* (now you
  say it), a pause for her to speak, then the word again to compare
- 🔊 Every screen auto-speaks what to do; the speaker button repeats it any time
- 🐢 Turtle button makes the voice even slower (letters are already spoken slowly, twice)
- Huge touch targets, ⬅️ back and 🏠 home always in the same place
- Colour system: **red = स्वर**, **blue = व्यंजन**, **green = मात्रा** — everywhere
- Progress, stars and completed groups are saved on the phone between visits
- Works offline after the first visit (it's an installable web app)

---

## 🚀 Put it online (free, ~2 minutes)

The site is plain HTML/CSS/JS in this `docs/` folder — no build, no server.

**GitHub Pages:**
1. Open the repository (**Ullas**) on GitHub → **Settings → Pages**
2. Under *Build and deployment*: Source = **Deploy from a branch**, Branch = **`claude/literacy-learning-website-ofh7sr`** (the repo's default branch), Folder = **`/docs`** → Save
3. After ~1 minute the site is live at **`https://prathit-mukesh.github.io/Ullas/`**

(If you later rename the branch to `main` in Settings → Branches, GitHub keeps the Pages setting pointed at it automatically. Any static host works too — Netlify/Vercel can serve the `docs` folder.)

## 📱 Set up her phone (do this once)

1. **Install a good Hindi voice** (most Android phones already have it):
   - Play Store → **Speech Recognition & Synthesis** (Google) → install/update
   - Phone Settings → search **"Text-to-speech"** → engine: Google → Language: **हिन्दी** → install voice data
   - This also makes the voice work **without internet**
2. Open the site in **Chrome** → menu ⋮ → **"Add to Home screen"** → now she has an app icon 📖 named **अक्षर ज्ञान** — one tap, full screen, no browser buttons
3. Raise the media volume 🔊

## 👩‍🏫 First session together (15 minutes)

Sit with her once and show only these four things — after that she can explore alone:
1. Tap the 📖 icon → tap the **orange box** (हिंदी)
2. Tap card **1** → tap any letter → *it speaks* → tap ➡️ for the next letter
3. Show the 🔊 button: *"whenever you don't know what to do, press this"*
4. Show 🏠: *"this always brings you back"*

Let her play the खेल (step 7) early — the stars are very motivating. A few letters a day is plenty; the app remembers ✔️ what she has seen.

## ✏️ Customising

All content lives in **`data.js`** — plain lists you can edit:
- Add/change words: `smallWords`, `matraWords`, `sentences` (keep the emoji — that's the "picture")
- The sentences use feminine verb forms (खाती हूँ) since the first learner is a mother — edit freely
- Voice speed, colours and sizes: top of `app.js` (`Speech.rate`) and `styles.css` (`:root` colours)

No trackers, no ads, no accounts. Everything (stars, progress) stays on the phone in `localStorage`.
