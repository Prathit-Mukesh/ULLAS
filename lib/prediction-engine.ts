// ═══════════════════════════════════════════════════════════
//  BOX OFFICE ATLAS — Prediction Engine
//  Multi-factor box office forecasting model
// ═══════════════════════════════════════════════════════════

export interface PredictionInputs {
  movieName: string;
  budget: number;
  marketingSpend: number;
  genre: string;
  language: string;
  starPower: number;       // 1-10
  directorTrack: number;   // 1-10
  musicComposer: number;   // 1-10
  franchise: boolean;
  sequel: boolean;
  festivalRelease: boolean;
  screenCount: number;
  certification: string;
  runtime: number;
  competition: number;     // 1-10
}

export interface PredictionResult {
  openingDay: number;
  openingWeekend: number;
  week1: number;
  domestic: number;
  international: number;
  worldwide: number;
  roi: number;
  riskScore: number;
  confidenceScore: number;
  verdict: string;
  bestCase: number;
  worstCase: number;
  totalCost: number;
  factors: Record<string, number>;
}

const GENRE_FACTORS: Record<string, number> = {
  "Action": 1.3,
  "Comedy": 1.1,
  "Thriller": 1.0,
  "Drama": 0.9,
  "Romance": 0.85,
  "Sci-Fi": 1.2,
  "Horror": 1.4,
  "Animation": 1.15,
  "Biography": 1.0,
  "Crime": 0.95,
  "Fantasy": 1.1,
  "Adventure": 1.15,
  "Musical": 0.9,
  "Mystery": 0.95,
  "War": 0.85,
};

const CERT_FACTORS: Record<string, number> = {
  "U": 1.15,
  "UA": 1.1,
  "PG": 1.12,
  "PG-13": 1.1,
  "A": 0.85,
  "R": 0.9,
};

export function predictBoxOffice(inputs: PredictionInputs): PredictionResult {
  const {
    budget = 100,
    marketingSpend = 20,
    genre = "Action",
    language = "Hindi",
    starPower = 7,
    directorTrack = 7,
    musicComposer = 6,
    franchise = false,
    sequel = false,
    festivalRelease = false,
    screenCount = 5000,
    certification = "UA",
    runtime = 150,
    competition = 4,
  } = inputs;

  const totalCost = budget + marketingSpend;
  let baseMultiplier = 1.8;

  // Genre factor
  const genreFactor = GENRE_FACTORS[genre] || 1.0;
  baseMultiplier *= genreFactor;

  // Star power (1-10) — biggest single factor
  const starFactor = 0.5 + (starPower / 10) * 1.2;
  baseMultiplier *= starFactor;

  // Director track record (1-10)
  const directorFactor = 0.7 + (directorTrack / 10) * 0.6;
  baseMultiplier *= directorFactor;

  // Music composer impact
  const musicFactor = 0.85 + (musicComposer / 10) * 0.3;
  baseMultiplier *= musicFactor;

  // Franchise and sequel bonuses
  if (franchise) baseMultiplier *= 1.3;
  if (sequel) baseMultiplier *= 1.15;

  // Festival release boost
  if (festivalRelease) baseMultiplier *= 1.2;

  // Screen count factor (normalized to 10000)
  const screenFactor = 0.6 + Math.min(screenCount / 10000, 1) * 0.8;
  baseMultiplier *= screenFactor;

  // Competition penalty
  const compFactor = 1.1 - (competition / 10) * 0.3;
  baseMultiplier *= compFactor;

  // Certification factor
  baseMultiplier *= (CERT_FACTORS[certification] || 1.0);

  // Runtime optimization (sweet spot 130-160 min)
  if (runtime >= 130 && runtime <= 160) {
    baseMultiplier *= 1.05;
  } else if (runtime > 180) {
    baseMultiplier *= 0.92;
  } else if (runtime < 100) {
    baseMultiplier *= 0.97;
  }

  // Calculate predictions
  const worldwide = Math.round(totalCost * baseMultiplier);
  const openingDay = Math.round(worldwide * 0.08 * (starPower / 7));
  const openingWeekend = Math.round(openingDay * 3.2);
  const week1 = Math.round(openingWeekend * 1.45);

  // Language-based domestic/international split
  const domesticShare = language === "English" ? 0.45 : 0.6;
  const domestic = Math.round(worldwide * domesticShare);
  const international = worldwide - domestic;

  const roi = Math.round(((worldwide - totalCost) / totalCost) * 100);

  // Risk and confidence scoring
  const riskScore = Math.max(0, Math.min(100, Math.round(100 - baseMultiplier * 25)));
  const confidenceScore = Math.min(
    95,
    Math.round(50 + starPower * 2 + directorTrack * 1.5 + (franchise ? 10 : 0) + (sequel ? 5 : 0))
  );

  // Determine verdict
  let verdict = "Flop";
  if (roi > 200) verdict = "All Time Blockbuster";
  else if (roi > 100) verdict = "Blockbuster";
  else if (roi > 60) verdict = "Super Hit";
  else if (roi > 30) verdict = "Hit";
  else if (roi > 10) verdict = "Above Average";
  else if (roi > -10) verdict = "Average";
  else if (roi > -30) verdict = "Below Average";

  // Scenario ranges
  const bestCase = Math.round(worldwide * 1.35);
  const worstCase = Math.round(worldwide * 0.55);

  // Factor contribution breakdown (percentages that sum to ~100)
  const factors: Record<string, number> = {
    starPower: Math.round((starPower / 10) * 30),
    genre: Math.round(genreFactor * 15),
    budget: Math.round(Math.min(budget / 50, 20)),
    releaseDate: festivalRelease ? 15 : 8,
    directorTrack: Math.round((directorTrack / 10) * 20),
    musicComposer: Math.round((musicComposer / 10) * 10),
    franchise: franchise ? 12 : 0,
    screens: Math.round(Math.min(screenCount / 10000, 1) * 10),
  };

  return {
    openingDay,
    openingWeekend,
    week1,
    domestic,
    international,
    worldwide,
    roi,
    riskScore,
    confidenceScore,
    verdict,
    bestCase,
    worstCase,
    totalCost,
    factors,
  };
}

export const DEFAULT_INPUTS: PredictionInputs = {
  movieName: "",
  budget: 200,
  marketingSpend: 40,
  genre: "Action",
  language: "Hindi",
  starPower: 7,
  directorTrack: 7,
  musicComposer: 6,
  franchise: false,
  sequel: false,
  festivalRelease: false,
  screenCount: 6000,
  certification: "UA",
  runtime: 150,
  competition: 4,
};
