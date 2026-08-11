# 📖 अक्षर ज्ञान (Akshar Gyan) — Learn to Read, From Zero

A free, offline-capable website that teaches a completely illiterate adult to read **Hindi** and **English** — starting from single letters, with voice, pictures and colours. Built for learners who cannot read *any* text yet, so **every screen speaks its instructions aloud in Hindi** and all navigation uses big icons, not words.

> Made with love for a mother in Jodhpur — and for every adult who never got the chance to go to school. ❤️

---

## What's inside

**Home page → 2 big cards: हिंदी (orange) and English (blue).**

### हिंदी path (7 steps)
1. **स्वर** — all 13 vowels. Tap a letter → hear it → see a picture word (अ से अनानास 🍍, ऊ से ऊँट 🐪…)
2. **व्यंजन** — all 36 consonants (क से कमल 🪷 … ज्ञ से ज्ञान 📚)
3. **मात्रा** — interactive बारहखड़ी chart: pick any consonant, tap का कि की कु…, see the formula `क + ◌ा = का` in colour
4. **शब्द जोड़ो** — 2- and 3-letter words without matras (घ + र = घर 🏠). Tap each letter, then the green button blends them aloud
5. **नए शब्द** — everyday words with matras (पानी, रोटी, दूध…). Matra syllables are green, plain letters blue; colour words appear *in their colour* (लाल in red)
6. **वाक्य** — 10 daily-life sentences. Tap word-by-word, then hear the full sentence with each word lighting up
7. **खेल** — listen-and-tap game: hear a letter/word, choose among 3. Correct answers earn ⭐ stars (saved on the phone)

### English path (7 steps)
Capital letters → small letters → two-letter blending (g + o = go) → 3-letter words (c-a-t = cat 🐱) → everyday words → sentences → game.
**All instructions stay in Hindi voice** — only the content is English.

### Design choices for non-readers
- 🔊 Every screen auto-speaks what to do; the speaker button repeats it any time
- 🐢 Turtle button makes the voice speak slower
- Huge touch targets, one action per screen, ⬅️ back and 🏠 home always in the same place
- Colour system: **red = स्वर**, **blue = व्यंजन**, **green = मात्रा** — everywhere
- ✔️ marks appear on letters already practised; stars persist between visits
- Works offline after the first visit (it's an installable web app)

---

## 🚀 Put it online (free, ~2 minutes)

The site is plain HTML/CSS/JS in this `docs/` folder — no build, no server.

**GitHub Pages:**
1. Merge this branch (or use it directly), then open the repository on GitHub
2. **Settings → Pages**
3. Under *Build and deployment*: Source = **Deploy from a branch**, Branch = your branch, Folder = **`/docs`** → Save
4. After ~1 minute your site is live at `https://<username>.github.io/<repo-name>/`

(Any static host works too — Netlify/Vercel drag-and-drop the `docs` folder.)

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
