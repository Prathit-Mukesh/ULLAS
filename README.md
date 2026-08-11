# 🎬 Box Office Atlas

**Track the Past. Predict the Future of Box Office.**

A comprehensive movie analytics and forecasting platform covering Indian cinema (Bollywood, Tollywood, Sandalwood, Kollywood) and worldwide box office data.

---

## 🚀 Quick Start (No Terminal Needed)

### Option A: Deploy via GitHub + Vercel (Recommended)

1. **Upload to GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Create a new repository named `box-office-atlas`
   - Click **"uploading an existing file"**
   - Extract this zip and drag ALL files/folders into the upload area
   - Click **"Commit changes"**

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **"Add New → Project"**
   - Select your `box-office-atlas` repository
   - Framework Preset: **Next.js** (auto-detected)
   - Click **"Deploy"**
   - Wait 1-2 minutes → Your site is LIVE! 🎉

### Option B: Run Locally (Requires Node.js)

```bash
# 1. Install Node.js from https://nodejs.org (v18+)

# 2. Open terminal in the project folder
cd box-office-atlas

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

---

## 📁 Project Structure

```
box-office-atlas/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, SEO)
│   ├── page.tsx                  # Main page (client-side routing)
│   └── globals.css               # Global styles (Tailwind + custom CSS)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky navigation bar
│   │   └── Footer.tsx            # Site footer
│   ├── pages/
│   │   ├── HomePage.tsx          # Landing page with hero, stats, charts
│   │   ├── CollectionsPage.tsx   # Movie browser with filters & analytics
│   │   ├── MovieDetailPage.tsx   # Individual movie analytics page
│   │   ├── PredictionsPage.tsx   # Box office prediction engine
│   │   └── TrendsPage.tsx        # Industry/actor/director trends
│   └── ui/
│       └── SharedComponents.tsx  # Reusable: StatCard, VerdictBadge, MovieCard, etc.
│
├── data/
│   └── movies.ts                 # 28 movies with full data + utility functions
│
├── lib/
│   └── prediction-engine.ts      # Multi-factor prediction model
│
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
└── README.md                     # This file
```

---

## 🎯 Features

### Panel 1: Box Office Collections
- **28 movies** with complete data (Indian + Hollywood)
- **Advanced search** — movies, actors, directors, composers
- **Multi-filter system** — Region, Genre, Industry, Verdict
- **Sort by** — Worldwide, ROI, IMDb, Opening Day, Budget, Year
- **Compare movies** — Side-by-side with charts (up to 4)
- **4 analytics views:**
  - Budget vs Gross scatter plot
  - Genre-wise performance
  - India vs Overseas stacked bars
  - ROI distribution
- **Movie detail pages** with collection progression, splits, cast/crew

### Panel 2: Box Office Predictions
- **15+ input parameters** — Budget, star power, genre, screens, etc.
- **Prediction outputs** — Opening day through worldwide lifetime
- **ROI, Confidence, and Risk scores**
- **Best/Base/Worst case scenarios**
- **Radar chart** showing factor contributions
- **What-If Simulator** — Budget +20%, Festival release, More screens, Marketing +50%
- **India / Rest of World / Worldwide** prediction modes

### Trends & Analytics
- Industry-wise average collection
- Top actors by total box office + hit rates
- Director ROI and average gross
- Music composer commercial impact

---

## 🎨 Design System

| Element       | Value                            |
|---------------|----------------------------------|
| Display Font  | Bebas Neue                       |
| Body Font     | DM Sans                          |
| Primary       | Gold (#D4A843)                   |
| Accent        | Cyan (#00D4FF)                   |
| Background    | Deep Navy (#0A0E1A)              |
| Cards         | Dark Slate (#111827)             |
| Theme         | Cinematic dark / Bloomberg-meets-IMDb |

---

## 🗂️ Data Fields Per Movie

Each movie record includes 35+ fields:
- Name, Original Title, Year, Release Date
- Language, Country, Region, Industry, Genre, Sub-genre
- Runtime, Certification, Budget, Production Cost, Marketing Cost
- Opening Day, Opening Weekend, Week 1 collections
- India Gross, Overseas Gross, Worldwide Gross
- Verdict, IMDb Rating, Rotten Tomatoes, Metacritic
- Full cast & crew (Lead, Supporting, Director, Producer, Writer, Music, Cinematographer)
- Production House, Franchise, Sequel/Adaptation flags
- Screen Count, OTT Release Date, Synopsis, Tags

---

## 🔮 Prediction Engine

The prediction model uses weighted factors:

| Factor              | Weight Impact |
|---------------------|---------------|
| Star Power (1-10)   | 30% max       |
| Genre               | 15%           |
| Director Track (1-10)| 20% max      |
| Budget Scale         | 20% max       |
| Festival Release     | +20% boost    |
| Franchise Factor     | +30% boost    |
| Sequel Factor        | +15% boost    |
| Screen Count         | up to 10%     |
| Music Composer       | up to 10%     |
| Competition          | -30% penalty  |
| Certification        | ±15%          |
| Runtime Sweet Spot   | ±8%           |

---

## 🛠️ Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Framework  | Next.js 14 (App Router, TypeScript)  |
| Styling    | Tailwind CSS + Custom CSS Variables  |
| Charts     | Recharts                             |
| Icons      | Lucide React                         |
| Animation  | Framer Motion (available), CSS       |
| Deployment | Vercel (recommended)                 |

---

## 🚧 Future Upgrade Path

1. **Supabase Backend** — Add PostgreSQL database, auth, real-time
2. **Admin Panel** — CRUD for movies, bulk CSV import
3. **Real API Routes** — Next.js API endpoints for data operations
4. **ML Predictions** — XGBoost/Random Forest via Python API
5. **Social Sentiment** — Twitter/YouTube trailer buzz analysis
6. **User Accounts** — Watchlists, saved comparisons, alerts
7. **More Movies** — Scale to 500+ with automated data scraping
8. **PWA Support** — Offline access, mobile app feel

---

## 📊 Sample Data Coverage

**Indian Cinema:** Baahubali 2, RRR, KGF 2, Dangal, Pathaan, Jawan, Animal,
Pushpa 2, Stree 2, Kalki 2898 AD, Pushpa, Gadar 2, 3 Idiots, PK, Bajrangi Bhaijaan

**Hollywood:** Avengers: Endgame, Avatar 2, Spider-Man: No Way Home,
Oppenheimer, Barbie, Top Gun: Maverick, The Batman, Dune 2, Inside Out 2,
Deadpool & Wolverine, Parasite, The Dark Knight, Inception

---

## 📜 License

MIT License. Data is for demonstration purposes only.

Built with ❤️ for movie analytics enthusiasts, producers, and entertainment researchers.

---

## 📖 Also in this repository: अक्षर ज्ञान (Akshar Gyan)

The **`docs/`** folder contains a separate, standalone project: a free literacy-learning
website that teaches adults to read Hindi and English from absolute zero — voice-guided,
picture-based, and usable by someone who cannot read any text yet.

➡️ See **[docs/README.md](docs/README.md)** for what it does and how to put it live on
GitHub Pages in two minutes (Settings → Pages → deploy branch → `/docs` folder).
