// ═══════════════════════════════════════════════════════════
//  BOX OFFICE ATLAS — Complete Movie Database
//  All figures in ₹ Crores for Indian films, converted for Hollywood
// ═══════════════════════════════════════════════════════════

export interface Movie {
  id: number;
  name: string;
  originalTitle: string;
  year: number;
  releaseDate: string;
  language: string;
  country: string;
  region: "India" | "Rest of World" | "Both";
  industry: string;
  genre: string;
  subGenre: string;
  runtime: number;
  certification: string;
  budget: number;
  productionCost: number;
  marketingCost: number;
  totalCost: number;
  openingDay: number;
  openingWeekend: number;
  week1: number;
  lifetimeDomestic: number;
  lifetimeInternational: number;
  worldwideGross: number;
  indiaGross: number;
  overseasGross: number;
  verdict: string;
  imdbRating: number;
  rtScore: number | null;
  metacritic: number | null;
  leadActors: string;
  supportingActors: string;
  director: string;
  producer: string;
  writer: string;
  musicComposer: string;
  cinematographer: string;
  productionHouse: string;
  franchise: string | null;
  sequel: boolean;
  adaptation: boolean;
  screenCount: number;
  ottReleaseDate: string | null;
  synopsis: string;
  tags: string[];
  posterUrl: string;
  trailerUrl: string;
  lastUpdated: string;
}

export const MOVIES: Movie[] = [
  // ─── INDIAN CINEMA ────────────────────────────────────────
  {
    id: 1, name: "Baahubali 2: The Conclusion", originalTitle: "Baahubali 2", year: 2017,
    releaseDate: "2017-04-28", language: "Telugu", country: "India", region: "India",
    industry: "Tollywood", genre: "Action", subGenre: "Epic Fantasy", runtime: 167,
    certification: "UA", budget: 250, productionCost: 200, marketingCost: 50, totalCost: 250,
    openingDay: 121, openingWeekend: 540, week1: 790, lifetimeDomestic: 1030,
    lifetimeInternational: 620, worldwideGross: 1810, indiaGross: 1030, overseasGross: 620,
    verdict: "All Time Blockbuster", imdbRating: 8.2, rtScore: 95, metacritic: 78,
    leadActors: "Prabhas, Anushka Shetty", supportingActors: "Rana Daggubati, Sathyaraj, Ramya Krishnan",
    director: "S.S. Rajamouli", producer: "Shobu Yarlagadda", writer: "K.V. Vijayendra Prasad",
    musicComposer: "M.M. Keeravani", cinematographer: "K.K. Senthil Kumar",
    productionHouse: "Arka Media Works", franchise: "Baahubali", sequel: true, adaptation: false,
    screenCount: 9000, ottReleaseDate: "2017-06-25",
    synopsis: "When Mahendra Baahubali learns about his heritage, he begins to look for answers. His story is told to him in a flashback, unveiling why Kattappa killed Baahubali.",
    tags: ["Epic", "Pan-India", "Record-Breaking", "Telugu Cinema"],
    posterUrl: "/posters/baahubali2.jpg", trailerUrl: "https://youtube.com/watch?v=G62HrubdD6o",
    lastUpdated: "2025-01-15"
  },
  {
    id: 2, name: "RRR", originalTitle: "Roudram Ranam Rudhiram", year: 2022,
    releaseDate: "2022-03-25", language: "Telugu", country: "India", region: "Both",
    industry: "Tollywood", genre: "Action", subGenre: "Period Drama", runtime: 187,
    certification: "UA", budget: 550, productionCost: 450, marketingCost: 100, totalCost: 550,
    openingDay: 156, openingWeekend: 460, week1: 670, lifetimeDomestic: 782,
    lifetimeInternational: 690, worldwideGross: 1472, indiaGross: 782, overseasGross: 690,
    verdict: "Blockbuster", imdbRating: 7.8, rtScore: 95, metacritic: 72,
    leadActors: "Ram Charan, NTR Jr.", supportingActors: "Alia Bhatt, Ajay Devgn, Olivia Morris",
    director: "S.S. Rajamouli", producer: "D.V.V. Danayya", writer: "K.V. Vijayendra Prasad",
    musicComposer: "M.M. Keeravani", cinematographer: "K.K. Senthil Kumar",
    productionHouse: "DVV Entertainment", franchise: null, sequel: false, adaptation: false,
    screenCount: 10000, ottReleaseDate: "2022-06-02",
    synopsis: "A tale of two legendary revolutionaries and their journey away from home before they started fighting for their country.",
    tags: ["Oscar Winner", "Pan-India", "Freedom Fighter", "Naatu Naatu"],
    posterUrl: "/posters/rrr.jpg", trailerUrl: "https://youtube.com/watch?v=f_vbAtFSEc0",
    lastUpdated: "2025-01-15"
  },
  {
    id: 3, name: "KGF: Chapter 2", originalTitle: "KGF 2", year: 2022,
    releaseDate: "2022-04-14", language: "Kannada", country: "India", region: "India",
    industry: "Sandalwood", genre: "Action", subGenre: "Crime Drama", runtime: 168,
    certification: "UA", budget: 100, productionCost: 80, marketingCost: 20, totalCost: 100,
    openingDay: 134, openingWeekend: 430, week1: 625, lifetimeDomestic: 856,
    lifetimeInternational: 400, worldwideGross: 1256, indiaGross: 856, overseasGross: 400,
    verdict: "All Time Blockbuster", imdbRating: 7.4, rtScore: 72, metacritic: 55,
    leadActors: "Yash", supportingActors: "Sanjay Dutt, Raveena Tandon, Prakash Raj",
    director: "Prashanth Neel", producer: "Vijay Kiragandur", writer: "Prashanth Neel",
    musicComposer: "Ravi Basrur", cinematographer: "Bhuvan Gowda",
    productionHouse: "Hombale Films", franchise: "KGF", sequel: true, adaptation: false,
    screenCount: 10000, ottReleaseDate: "2022-06-03",
    synopsis: "Rocky rises to be the king of the Kolar Gold Fields while battling enemies from all sides.",
    tags: ["Mass", "Pan-India", "Franchise", "Kannada Cinema"],
    posterUrl: "/posters/kgf2.jpg", trailerUrl: "https://youtube.com/watch?v=JKa05nyUmuQ",
    lastUpdated: "2025-01-15"
  },
  {
    id: 4, name: "Dangal", originalTitle: "Dangal", year: 2016,
    releaseDate: "2016-12-23", language: "Hindi", country: "India", region: "Both",
    industry: "Bollywood", genre: "Biography", subGenre: "Sports Drama", runtime: 161,
    certification: "UA", budget: 70, productionCost: 55, marketingCost: 15, totalCost: 70,
    openingDay: 29, openingWeekend: 107, week1: 197, lifetimeDomestic: 387,
    lifetimeInternational: 1660, worldwideGross: 2024, indiaGross: 387, overseasGross: 1660,
    verdict: "All Time Blockbuster", imdbRating: 8.4, rtScore: 88, metacritic: 76,
    leadActors: "Aamir Khan", supportingActors: "Fatima Sana Shaikh, Sanya Malhotra, Sakshi Tanwar",
    director: "Nitesh Tiwari", producer: "Aamir Khan, Kiran Rao", writer: "Nitesh Tiwari",
    musicComposer: "Pritam", cinematographer: "Setu Sriramam",
    productionHouse: "Aamir Khan Productions", franchise: null, sequel: false, adaptation: true,
    screenCount: 4300, ottReleaseDate: "2017-04-01",
    synopsis: "A former wrestler trains his daughters to become world-class wrestlers, battling societal norms.",
    tags: ["Biographical", "Sports", "Women Empowerment", "China Hit"],
    posterUrl: "/posters/dangal.jpg", trailerUrl: "https://youtube.com/watch?v=x_7YlGv9u1g",
    lastUpdated: "2025-01-15"
  },
  {
    id: 5, name: "Pathaan", originalTitle: "Pathaan", year: 2023,
    releaseDate: "2023-01-25", language: "Hindi", country: "India", region: "Both",
    industry: "Bollywood", genre: "Action", subGenre: "Spy Thriller", runtime: 146,
    certification: "UA", budget: 250, productionCost: 200, marketingCost: 50, totalCost: 250,
    openingDay: 107, openingWeekend: 320, week1: 480, lifetimeDomestic: 543,
    lifetimeInternational: 560, worldwideGross: 1100, indiaGross: 543, overseasGross: 560,
    verdict: "Blockbuster", imdbRating: 6.4, rtScore: 62, metacritic: 48,
    leadActors: "Shah Rukh Khan, Deepika Padukone", supportingActors: "John Abraham",
    director: "Siddharth Anand", producer: "Aditya Chopra", writer: "Siddharth Anand, Shridhar Raghavan",
    musicComposer: "Vishal-Shekhar", cinematographer: "Satchith Paulose",
    productionHouse: "Yash Raj Films", franchise: "YRF Spy Universe", sequel: false, adaptation: false,
    screenCount: 8000, ottReleaseDate: "2023-03-22",
    synopsis: "An exiled RAW agent returns on a mission to protect India from a deadly bioweapon threat.",
    tags: ["Comeback", "Spy", "Republic Day Release", "SRK"],
    posterUrl: "/posters/pathaan.jpg", trailerUrl: "https://youtube.com/watch?v=vqu4z34wENw",
    lastUpdated: "2025-01-15"
  },
  {
    id: 6, name: "Jawan", originalTitle: "Jawan", year: 2023,
    releaseDate: "2023-09-07", language: "Hindi", country: "India", region: "Both",
    industry: "Bollywood", genre: "Action", subGenre: "Thriller", runtime: 169,
    certification: "UA", budget: 300, productionCost: 240, marketingCost: 60, totalCost: 300,
    openingDay: 129, openingWeekend: 350, week1: 475, lifetimeDomestic: 640,
    lifetimeInternational: 480, worldwideGross: 1148, indiaGross: 640, overseasGross: 480,
    verdict: "All Time Blockbuster", imdbRating: 7.1, rtScore: 81, metacritic: 58,
    leadActors: "Shah Rukh Khan", supportingActors: "Nayanthara, Vijay Sethupathi, Deepika Padukone",
    director: "Atlee", producer: "Gauri Khan", writer: "Atlee",
    musicComposer: "Anirudh Ravichander", cinematographer: "G.K. Vishnu",
    productionHouse: "Red Chillies Entertainment", franchise: null, sequel: false, adaptation: false,
    screenCount: 8500, ottReleaseDate: "2023-11-01",
    synopsis: "A man is driven by a personal vendetta to rectify the wrongs in society through clever disguises.",
    tags: ["Comeback", "Pan-India", "Social Message", "SRK"],
    posterUrl: "/posters/jawan.jpg", trailerUrl: "https://youtube.com/watch?v=MWOlz1SLNOQ",
    lastUpdated: "2025-01-15"
  },
  {
    id: 7, name: "Animal", originalTitle: "Animal", year: 2023,
    releaseDate: "2023-12-01", language: "Hindi", country: "India", region: "India",
    industry: "Bollywood", genre: "Action", subGenre: "Crime Drama", runtime: 201,
    certification: "A", budget: 200, productionCost: 165, marketingCost: 35, totalCost: 200,
    openingDay: 63, openingWeekend: 233, week1: 370, lifetimeDomestic: 554,
    lifetimeInternational: 362, worldwideGross: 917, indiaGross: 554, overseasGross: 362,
    verdict: "Blockbuster", imdbRating: 6.5, rtScore: 43, metacritic: 35,
    leadActors: "Ranbir Kapoor", supportingActors: "Rashmika Mandanna, Anil Kapoor, Bobby Deol",
    director: "Sandeep Reddy Vanga", producer: "Bhushan Kumar", writer: "Sandeep Reddy Vanga",
    musicComposer: "Various Artists", cinematographer: "Amit Roy",
    productionHouse: "T-Series", franchise: "Animal", sequel: false, adaptation: false,
    screenCount: 5500, ottReleaseDate: "2024-01-26",
    synopsis: "A son goes to extreme lengths for his father, consuming himself in darkness along the way.",
    tags: ["Controversial", "Record Opening", "A-Rated"],
    posterUrl: "/posters/animal.jpg", trailerUrl: "https://youtube.com/watch?v=lr3jJl3VXaQ",
    lastUpdated: "2025-01-15"
  },
  {
    id: 8, name: "Pushpa 2: The Rule", originalTitle: "Pushpa 2", year: 2024,
    releaseDate: "2024-12-05", language: "Telugu", country: "India", region: "Both",
    industry: "Tollywood", genre: "Action", subGenre: "Crime Drama", runtime: 200,
    certification: "UA", budget: 500, productionCost: 400, marketingCost: 100, totalCost: 500,
    openingDay: 294, openingWeekend: 700, week1: 950, lifetimeDomestic: 1200,
    lifetimeInternational: 631, worldwideGross: 1831, indiaGross: 1200, overseasGross: 631,
    verdict: "All Time Blockbuster", imdbRating: 6.2, rtScore: 40, metacritic: 38,
    leadActors: "Allu Arjun", supportingActors: "Rashmika Mandanna, Fahadh Faasil",
    director: "Sukumar", producer: "Naveen Yerneni", writer: "Sukumar",
    musicComposer: "Devi Sri Prasad", cinematographer: "Miroslaw Kuba Brozek",
    productionHouse: "Mythri Movie Makers", franchise: "Pushpa", sequel: true, adaptation: false,
    screenCount: 12000, ottReleaseDate: null,
    synopsis: "Pushpa Raj continues his reign as the smuggling kingpin, facing deadlier adversaries.",
    tags: ["Mass", "Record Opening", "Sequel", "Pan-India"],
    posterUrl: "/posters/pushpa2.jpg", trailerUrl: "https://youtube.com/watch?v=Guv1mulXhGo",
    lastUpdated: "2025-02-01"
  },
  {
    id: 9, name: "Stree 2", originalTitle: "Stree 2", year: 2024,
    releaseDate: "2024-08-15", language: "Hindi", country: "India", region: "India",
    industry: "Bollywood", genre: "Comedy", subGenre: "Horror Comedy", runtime: 150,
    certification: "UA", budget: 60, productionCost: 45, marketingCost: 15, totalCost: 60,
    openingDay: 64, openingWeekend: 220, week1: 380, lifetimeDomestic: 627,
    lifetimeInternational: 212, worldwideGross: 857, indiaGross: 627, overseasGross: 212,
    verdict: "All Time Blockbuster", imdbRating: 7.1, rtScore: 70, metacritic: 60,
    leadActors: "Rajkummar Rao, Shraddha Kapoor", supportingActors: "Pankaj Tripathi, Aparshakti Khurana",
    director: "Amar Kaushik", producer: "Dinesh Vijan", writer: "Niren Bhatt",
    musicComposer: "Sachin-Jigar", cinematographer: "Jishnu Bhattacharjee",
    productionHouse: "Maddock Films", franchise: "Maddock Supernatural Universe", sequel: true, adaptation: false,
    screenCount: 5500, ottReleaseDate: "2024-10-15",
    synopsis: "The boys of Chanderi must face a new headless spirit terrorizing their town.",
    tags: ["Horror Comedy", "Franchise", "Independence Day", "Highest ROI"],
    posterUrl: "/posters/stree2.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 10, name: "Kalki 2898 AD", originalTitle: "Kalki 2898 AD", year: 2024,
    releaseDate: "2024-06-27", language: "Telugu", country: "India", region: "Both",
    industry: "Tollywood", genre: "Sci-Fi", subGenre: "Mythological Sci-Fi", runtime: 180,
    certification: "UA", budget: 600, productionCost: 480, marketingCost: 120, totalCost: 600,
    openingDay: 180, openingWeekend: 470, week1: 640, lifetimeDomestic: 653,
    lifetimeInternational: 447, worldwideGross: 1100, indiaGross: 653, overseasGross: 447,
    verdict: "Blockbuster", imdbRating: 6.8, rtScore: 65, metacritic: 50,
    leadActors: "Prabhas, Deepika Padukone", supportingActors: "Amitabh Bachchan, Kamal Haasan",
    director: "Nag Ashwin", producer: "C. Aswini Dutt", writer: "Nag Ashwin",
    musicComposer: "Santhosh Narayanan", cinematographer: "Djordje Stojiljkovic",
    productionHouse: "Vyjayanthi Movies", franchise: "Kalki", sequel: false, adaptation: false,
    screenCount: 8500, ottReleaseDate: "2024-08-22",
    synopsis: "In a dystopian 2898 AD, the last avatar of Vishnu is prophesied to bring salvation.",
    tags: ["Indian Sci-Fi", "Pan-India", "Mythology", "VFX Heavy"],
    posterUrl: "/posters/kalki.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 11, name: "Pushpa: The Rise", originalTitle: "Pushpa", year: 2021,
    releaseDate: "2021-12-17", language: "Telugu", country: "India", region: "India",
    industry: "Tollywood", genre: "Action", subGenre: "Crime Drama", runtime: 179,
    certification: "UA", budget: 200, productionCost: 170, marketingCost: 30, totalCost: 200,
    openingDay: 24, openingWeekend: 72, week1: 145, lifetimeDomestic: 300,
    lifetimeInternational: 73, worldwideGross: 373, indiaGross: 300, overseasGross: 73,
    verdict: "Blockbuster", imdbRating: 6.9, rtScore: 55, metacritic: 45,
    leadActors: "Allu Arjun", supportingActors: "Rashmika Mandanna, Fahadh Faasil",
    director: "Sukumar", producer: "Naveen Yerneni", writer: "Sukumar",
    musicComposer: "Devi Sri Prasad", cinematographer: "Miroslaw Kuba Brozek",
    productionHouse: "Mythri Movie Makers", franchise: "Pushpa", sequel: false, adaptation: false,
    screenCount: 5000, ottReleaseDate: "2022-01-07",
    synopsis: "A laborer rises in the world of red sandalwood smuggling while confronting exploitation.",
    tags: ["Mass", "Pan-India", "Icon Star", "Srivalli"],
    posterUrl: "/posters/pushpa.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 12, name: "Gadar 2", originalTitle: "Gadar 2", year: 2023,
    releaseDate: "2023-08-11", language: "Hindi", country: "India", region: "India",
    industry: "Bollywood", genre: "Action", subGenre: "Period Drama", runtime: 165,
    certification: "UA", budget: 75, productionCost: 60, marketingCost: 15, totalCost: 75,
    openingDay: 40, openingWeekend: 150, week1: 315, lifetimeDomestic: 525,
    lifetimeInternational: 62, worldwideGross: 587, indiaGross: 525, overseasGross: 62,
    verdict: "All Time Blockbuster", imdbRating: 5.6, rtScore: 30, metacritic: null,
    leadActors: "Sunny Deol", supportingActors: "Ameesha Patel, Utkarsh Sharma",
    director: "Anil Sharma", producer: "Zee Studios", writer: "Anil Sharma",
    musicComposer: "Mithoon", cinematographer: "Najeeb Khan",
    productionHouse: "Zee Studios", franchise: "Gadar", sequel: true, adaptation: false,
    screenCount: 5500, ottReleaseDate: "2023-10-06",
    synopsis: "Tara Singh journeys to Pakistan once more to rescue his son from captivity.",
    tags: ["Legacy Sequel", "Patriotic", "Mass", "Independence Day"],
    posterUrl: "/posters/gadar2.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 13, name: "3 Idiots", originalTitle: "3 Idiots", year: 2009,
    releaseDate: "2009-12-25", language: "Hindi", country: "India", region: "Both",
    industry: "Bollywood", genre: "Comedy", subGenre: "Drama", runtime: 170,
    certification: "UA", budget: 55, productionCost: 42, marketingCost: 13, totalCost: 55,
    openingDay: 14, openingWeekend: 52, week1: 110, lifetimeDomestic: 202,
    lifetimeInternational: 190, worldwideGross: 392, indiaGross: 202, overseasGross: 190,
    verdict: "All Time Blockbuster", imdbRating: 8.4, rtScore: 100, metacritic: 67,
    leadActors: "Aamir Khan", supportingActors: "R. Madhavan, Sharman Joshi, Kareena Kapoor",
    director: "Rajkumar Hirani", producer: "Vidhu Vinod Chopra", writer: "Rajkumar Hirani, Abhijat Joshi",
    musicComposer: "Shantanu Moitra", cinematographer: "C.K. Muraleedharan",
    productionHouse: "Vinod Chopra Films", franchise: null, sequel: false, adaptation: true,
    screenCount: 2400, ottReleaseDate: null,
    synopsis: "Two friends search for their long-lost companion, revisiting their college days and its joys.",
    tags: ["Classic", "Education", "Aamir Khan", "Evergreen"],
    posterUrl: "/posters/3idiots.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 14, name: "PK", originalTitle: "PK", year: 2014,
    releaseDate: "2014-12-19", language: "Hindi", country: "India", region: "Both",
    industry: "Bollywood", genre: "Comedy", subGenre: "Satire", runtime: 153,
    certification: "UA", budget: 85, productionCost: 68, marketingCost: 17, totalCost: 85,
    openingDay: 26, openingWeekend: 95, week1: 186, lifetimeDomestic: 340,
    lifetimeInternational: 454, worldwideGross: 792, indiaGross: 340, overseasGross: 454,
    verdict: "All Time Blockbuster", imdbRating: 8.1, rtScore: 82, metacritic: 60,
    leadActors: "Aamir Khan", supportingActors: "Anushka Sharma, Sushant Singh Rajput, Sanjay Dutt",
    director: "Rajkumar Hirani", producer: "Vidhu Vinod Chopra", writer: "Rajkumar Hirani, Abhijat Joshi",
    musicComposer: "Shantanu Moitra, Ankit Tiwari", cinematographer: "C.K. Muraleedharan",
    productionHouse: "Vinod Chopra Films", franchise: null, sequel: false, adaptation: false,
    screenCount: 5200, ottReleaseDate: null,
    synopsis: "An alien stranded on Earth questions religious dogmas and the meaning of God.",
    tags: ["Satire", "Religion", "China Hit", "Aamir Khan"],
    posterUrl: "/posters/pk.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 15, name: "Bajrangi Bhaijaan", originalTitle: "Bajrangi Bhaijaan", year: 2015,
    releaseDate: "2015-07-17", language: "Hindi", country: "India", region: "Both",
    industry: "Bollywood", genre: "Drama", subGenre: "Adventure", runtime: 163,
    certification: "UA", budget: 90, productionCost: 72, marketingCost: 18, totalCost: 90,
    openingDay: 27, openingWeekend: 102, week1: 184, lifetimeDomestic: 320,
    lifetimeInternational: 580, worldwideGross: 900, indiaGross: 320, overseasGross: 580,
    verdict: "All Time Blockbuster", imdbRating: 8.0, rtScore: 85, metacritic: 65,
    leadActors: "Salman Khan", supportingActors: "Harshaali Malhotra, Kareena Kapoor, Nawazuddin Siddiqui",
    director: "Kabir Khan", producer: "Salman Khan", writer: "K.V. Vijayendra Prasad",
    musicComposer: "Pritam", cinematographer: "Aseem Mishra",
    productionHouse: "Salman Khan Films", franchise: null, sequel: false, adaptation: false,
    screenCount: 4600, ottReleaseDate: null,
    synopsis: "A devout Hanuman bhakt undertakes a journey to reunite a mute Pakistani girl with her parents.",
    tags: ["India-Pakistan", "Heartwarming", "Salman Khan", "Eid Release"],
    posterUrl: "/posters/bajrangi.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },

  // ─── HOLLYWOOD / REST OF WORLD ────────────────────────────
  {
    id: 16, name: "Avengers: Endgame", originalTitle: "Avengers: Endgame", year: 2019,
    releaseDate: "2019-04-26", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Action", subGenre: "Superhero", runtime: 181,
    certification: "PG-13", budget: 3560, productionCost: 2800, marketingCost: 760, totalCost: 3560,
    openingDay: 2150, openingWeekend: 5000, week1: 6500, lifetimeDomestic: 8584,
    lifetimeInternational: 18896, worldwideGross: 27980, indiaGross: 412, overseasGross: 27568,
    verdict: "All Time Blockbuster", imdbRating: 8.4, rtScore: 94, metacritic: 78,
    leadActors: "Robert Downey Jr., Chris Evans", supportingActors: "Scarlett Johansson, Chris Hemsworth, Mark Ruffalo",
    director: "Anthony & Joe Russo", producer: "Kevin Feige", writer: "Christopher Markus, Stephen McFeely",
    musicComposer: "Alan Silvestri", cinematographer: "Trent Opaloch",
    productionHouse: "Marvel Studios", franchise: "MCU", sequel: true, adaptation: true,
    screenCount: 46000, ottReleaseDate: "2019-11-12",
    synopsis: "The surviving Avengers work to reverse the devastation caused by Thanos in Infinity War.",
    tags: ["MCU", "Record-Breaking", "Ensemble", "Highest Grosser"],
    posterUrl: "/posters/endgame.jpg", trailerUrl: "https://youtube.com/watch?v=TcMBFSGVi1c",
    lastUpdated: "2025-01-15"
  },
  {
    id: 17, name: "Avatar: The Way of Water", originalTitle: "Avatar 2", year: 2022,
    releaseDate: "2022-12-16", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Sci-Fi", subGenre: "Adventure", runtime: 192,
    certification: "PG-13", budget: 4000, productionCost: 3200, marketingCost: 800, totalCost: 4000,
    openingDay: 1340, openingWeekend: 3460, week1: 5200, lifetimeDomestic: 6849,
    lifetimeInternational: 16690, worldwideGross: 23209, indiaGross: 350, overseasGross: 22859,
    verdict: "All Time Blockbuster", imdbRating: 7.6, rtScore: 76, metacritic: 67,
    leadActors: "Sam Worthington, Zoe Saldaña", supportingActors: "Sigourney Weaver, Kate Winslet",
    director: "James Cameron", producer: "James Cameron", writer: "James Cameron",
    musicComposer: "Simon Franglen", cinematographer: "Russell Carpenter",
    productionHouse: "20th Century Studios", franchise: "Avatar", sequel: true, adaptation: false,
    screenCount: 42000, ottReleaseDate: "2023-06-07",
    synopsis: "Jake Sully and his family face new threats when they take refuge with the reef people of Pandora.",
    tags: ["Sequel", "3D", "James Cameron", "Underwater"],
    posterUrl: "/posters/avatar2.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 18, name: "Spider-Man: No Way Home", originalTitle: "Spider-Man: No Way Home", year: 2021,
    releaseDate: "2021-12-17", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Action", subGenre: "Superhero", runtime: 148,
    certification: "PG-13", budget: 2000, productionCost: 1500, marketingCost: 500, totalCost: 2000,
    openingDay: 2600, openingWeekend: 6000, week1: 7500, lifetimeDomestic: 8047,
    lifetimeInternational: 10646, worldwideGross: 19220, indiaGross: 260, overseasGross: 18960,
    verdict: "All Time Blockbuster", imdbRating: 8.2, rtScore: 93, metacritic: 71,
    leadActors: "Tom Holland, Zendaya", supportingActors: "Benedict Cumberbatch, Tobey Maguire, Andrew Garfield",
    director: "Jon Watts", producer: "Kevin Feige, Amy Pascal", writer: "Chris McKenna, Erik Sommers",
    musicComposer: "Michael Giacchino", cinematographer: "Mauro Fiore",
    productionHouse: "Marvel Studios / Sony", franchise: "MCU / Spider-Man", sequel: true, adaptation: true,
    screenCount: 28000, ottReleaseDate: "2022-03-15",
    synopsis: "Peter Parker's identity is revealed, opening the multiverse and bringing back old villains.",
    tags: ["Multiverse", "Nostalgia", "MCU", "Sony"],
    posterUrl: "/posters/spiderman.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 19, name: "Oppenheimer", originalTitle: "Oppenheimer", year: 2023,
    releaseDate: "2023-07-21", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Biography", subGenre: "Historical Drama", runtime: 180,
    certification: "R", budget: 1000, productionCost: 800, marketingCost: 200, totalCost: 1000,
    openingDay: 460, openingWeekend: 1742, week1: 2400, lifetimeDomestic: 3286,
    lifetimeInternational: 6200, worldwideGross: 9586, indiaGross: 125, overseasGross: 9461,
    verdict: "Blockbuster", imdbRating: 8.5, rtScore: 93, metacritic: 88,
    leadActors: "Cillian Murphy", supportingActors: "Emily Blunt, Robert Downey Jr., Matt Damon",
    director: "Christopher Nolan", producer: "Emma Thomas", writer: "Christopher Nolan",
    musicComposer: "Ludwig Göransson", cinematographer: "Hoyte van Hoytema",
    productionHouse: "Universal Pictures", franchise: null, sequel: false, adaptation: true,
    screenCount: 18000, ottReleaseDate: "2023-11-21",
    synopsis: "The story of physicist J. Robert Oppenheimer and his role in developing the atomic bomb.",
    tags: ["Oscar Winner", "IMAX", "Historical", "Nolan"],
    posterUrl: "/posters/oppenheimer.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 20, name: "Barbie", originalTitle: "Barbie", year: 2023,
    releaseDate: "2023-07-21", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Comedy", subGenre: "Fantasy", runtime: 114,
    certification: "PG-13", budget: 1450, productionCost: 1050, marketingCost: 400, totalCost: 1450,
    openingDay: 580, openingWeekend: 1620, week1: 2500, lifetimeDomestic: 6360,
    lifetimeInternational: 7940, worldwideGross: 14420, indiaGross: 56, overseasGross: 14364,
    verdict: "Blockbuster", imdbRating: 6.9, rtScore: 88, metacritic: 80,
    leadActors: "Margot Robbie, Ryan Gosling", supportingActors: "America Ferrera, Will Ferrell, Simu Liu",
    director: "Greta Gerwig", producer: "Margot Robbie, Tom Ackerley", writer: "Greta Gerwig, Noah Baumbach",
    musicComposer: "Mark Ronson, Andrew Wyatt", cinematographer: "Rodrigo Prieto",
    productionHouse: "Warner Bros.", franchise: "Barbie", sequel: false, adaptation: true,
    screenCount: 20000, ottReleaseDate: "2023-09-12",
    synopsis: "Barbie and Ken leave the perfection of Barbieland for the real world and find adventure.",
    tags: ["Barbenheimer", "Cultural Phenomenon", "Feminism", "Pink"],
    posterUrl: "/posters/barbie.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 21, name: "Top Gun: Maverick", originalTitle: "Top Gun: Maverick", year: 2022,
    releaseDate: "2022-05-27", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Action", subGenre: "Aviation Drama", runtime: 130,
    certification: "PG-13", budget: 1700, productionCost: 1300, marketingCost: 400, totalCost: 1700,
    openingDay: 520, openingWeekend: 1608, week1: 2600, lifetimeDomestic: 7188,
    lifetimeInternational: 7690, worldwideGross: 14878, indiaGross: 86, overseasGross: 14792,
    verdict: "All Time Blockbuster", imdbRating: 8.3, rtScore: 96, metacritic: 78,
    leadActors: "Tom Cruise", supportingActors: "Miles Teller, Jennifer Connelly, Glen Powell",
    director: "Joseph Kosinski", producer: "Jerry Bruckheimer, Tom Cruise", writer: "Ehren Kruger, Eric Warren Singer",
    musicComposer: "Harold Faltermeyer, Hans Zimmer", cinematographer: "Claudio Miranda",
    productionHouse: "Paramount Pictures", franchise: "Top Gun", sequel: true, adaptation: false,
    screenCount: 20000, ottReleaseDate: "2022-08-23",
    synopsis: "Maverick returns to train a new generation of Top Gun graduates for an impossible mission.",
    tags: ["Legacy Sequel", "Practical Stunts", "Tom Cruise", "Aviation"],
    posterUrl: "/posters/topgun.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 22, name: "The Batman", originalTitle: "The Batman", year: 2022,
    releaseDate: "2022-03-04", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Action", subGenre: "Noir Superhero", runtime: 176,
    certification: "PG-13", budget: 2000, productionCost: 1750, marketingCost: 250, totalCost: 2000,
    openingDay: 575, openingWeekend: 1340, week1: 1900, lifetimeDomestic: 3693,
    lifetimeInternational: 3966, worldwideGross: 7700, indiaGross: 38, overseasGross: 7662,
    verdict: "Hit", imdbRating: 7.8, rtScore: 85, metacritic: 72,
    leadActors: "Robert Pattinson", supportingActors: "Zoë Kravitz, Paul Dano, Colin Farrell",
    director: "Matt Reeves", producer: "Dylan Clark, Matt Reeves", writer: "Matt Reeves, Peter Craig",
    musicComposer: "Michael Giacchino", cinematographer: "Greig Fraser",
    productionHouse: "Warner Bros.", franchise: "The Batman", sequel: false, adaptation: true,
    screenCount: 18000, ottReleaseDate: "2022-04-18",
    synopsis: "Batman uncovers corruption in Gotham City while pursuing the enigmatic Riddler.",
    tags: ["Noir", "Detective", "Reboot", "DC"],
    posterUrl: "/posters/batman.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 23, name: "Dune: Part Two", originalTitle: "Dune: Part Two", year: 2024,
    releaseDate: "2024-03-01", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Sci-Fi", subGenre: "Epic Sci-Fi", runtime: 166,
    certification: "PG-13", budget: 1900, productionCost: 1500, marketingCost: 400, totalCost: 1900,
    openingDay: 420, openingWeekend: 1785, week1: 2700, lifetimeDomestic: 3114,
    lifetimeInternational: 4150, worldwideGross: 7114, indiaGross: 78, overseasGross: 7036,
    verdict: "Hit", imdbRating: 8.5, rtScore: 92, metacritic: 79,
    leadActors: "Timothée Chalamet, Zendaya", supportingActors: "Austin Butler, Florence Pugh, Javier Bardem",
    director: "Denis Villeneuve", producer: "Mary Parent, Denis Villeneuve", writer: "Denis Villeneuve, Jon Spaihts",
    musicComposer: "Hans Zimmer", cinematographer: "Greig Fraser",
    productionHouse: "Warner Bros. / Legendary", franchise: "Dune", sequel: true, adaptation: true,
    screenCount: 20000, ottReleaseDate: "2024-05-21",
    synopsis: "Paul Atreides unites with the Fremen to wage war against the Harkonnen for control of Arrakis.",
    tags: ["Sequel", "IMAX", "Oscar Contender", "Denis Villeneuve"],
    posterUrl: "/posters/dune2.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 24, name: "Inside Out 2", originalTitle: "Inside Out 2", year: 2024,
    releaseDate: "2024-06-14", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Animation", subGenre: "Family Comedy", runtime: 100,
    certification: "PG", budget: 2000, productionCost: 1600, marketingCost: 400, totalCost: 2000,
    openingDay: 910, openingWeekend: 2954, week1: 4200, lifetimeDomestic: 6526,
    lifetimeInternational: 10940, worldwideGross: 16850, indiaGross: 95, overseasGross: 16755,
    verdict: "All Time Blockbuster", imdbRating: 7.6, rtScore: 91, metacritic: 73,
    leadActors: "Amy Poehler (voice)", supportingActors: "Maya Hawke, Ayo Edebiri, Lewis Black",
    director: "Kelsey Mann", producer: "Mark Nielsen", writer: "Meg LeFauve, Dave Holstein",
    musicComposer: "Andrea Datzman", cinematographer: "Adam Habib",
    productionHouse: "Pixar / Disney", franchise: "Inside Out", sequel: true, adaptation: false,
    screenCount: 22000, ottReleaseDate: "2024-09-25",
    synopsis: "Riley enters puberty and new emotions—Anxiety, Envy, Ennui, and Embarrassment—take hold.",
    tags: ["Pixar", "Animation", "Family", "Highest Animated Film"],
    posterUrl: "/posters/insideout2.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 25, name: "Deadpool & Wolverine", originalTitle: "Deadpool & Wolverine", year: 2024,
    releaseDate: "2024-07-26", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Action", subGenre: "Superhero Comedy", runtime: 128,
    certification: "R", budget: 2000, productionCost: 1500, marketingCost: 500, totalCost: 2000,
    openingDay: 1100, openingWeekend: 3380, week1: 4800, lifetimeDomestic: 6365,
    lifetimeInternational: 7274, worldwideGross: 13479, indiaGross: 120, overseasGross: 13359,
    verdict: "Blockbuster", imdbRating: 7.7, rtScore: 79, metacritic: 55,
    leadActors: "Ryan Reynolds, Hugh Jackman", supportingActors: "Emma Corrin, Matthew Macfadyen",
    director: "Shawn Levy", producer: "Shawn Levy, Ryan Reynolds", writer: "Rhett Reese, Paul Wernick",
    musicComposer: "Rob Simonsen", cinematographer: "George Richmond",
    productionHouse: "Marvel Studios / 20th Century", franchise: "MCU / Deadpool", sequel: true, adaptation: true,
    screenCount: 22000, ottReleaseDate: "2024-10-01",
    synopsis: "Deadpool recruits Wolverine for a mission to save his universe from annihilation.",
    tags: ["R-Rated MCU", "Wolverine Return", "Multiverse", "Comedy"],
    posterUrl: "/posters/deadpool3.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 26, name: "Parasite", originalTitle: "Gisaengchung", year: 2019,
    releaseDate: "2019-05-30", language: "Korean", country: "South Korea", region: "Rest of World",
    industry: "Korean Cinema", genre: "Thriller", subGenre: "Dark Comedy", runtime: 132,
    certification: "R", budget: 95, productionCost: 80, marketingCost: 15, totalCost: 95,
    openingDay: 18, openingWeekend: 55, week1: 120, lifetimeDomestic: 550,
    lifetimeInternational: 2080, worldwideGross: 2630, indiaGross: 12, overseasGross: 2618,
    verdict: "All Time Blockbuster", imdbRating: 8.5, rtScore: 99, metacritic: 96,
    leadActors: "Song Kang-ho, Choi Woo-shik", supportingActors: "Park So-dam, Cho Yeo-jeong",
    director: "Bong Joon-ho", producer: "Kwak Sin-ae", writer: "Bong Joon-ho, Han Jin-won",
    musicComposer: "Jung Jae-il", cinematographer: "Hong Kyung-pyo",
    productionHouse: "Barunson E&A", franchise: null, sequel: false, adaptation: false,
    screenCount: 8000, ottReleaseDate: "2020-04-08",
    synopsis: "A poor family schemes to become employed by a wealthy household, with unexpected consequences.",
    tags: ["Oscar Best Picture", "Korean Wave", "Social Commentary", "Masterpiece"],
    posterUrl: "/posters/parasite.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 27, name: "The Dark Knight", originalTitle: "The Dark Knight", year: 2008,
    releaseDate: "2008-07-18", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Action", subGenre: "Superhero", runtime: 152,
    certification: "PG-13", budget: 1500, productionCost: 1250, marketingCost: 250, totalCost: 1500,
    openingDay: 670, openingWeekend: 1585, week1: 2600, lifetimeDomestic: 5339,
    lifetimeInternational: 4697, worldwideGross: 10036, indiaGross: 48, overseasGross: 9988,
    verdict: "All Time Blockbuster", imdbRating: 9.0, rtScore: 94, metacritic: 84,
    leadActors: "Christian Bale", supportingActors: "Heath Ledger, Aaron Eckhart, Gary Oldman",
    director: "Christopher Nolan", producer: "Emma Thomas, Charles Roven", writer: "Jonathan Nolan, Christopher Nolan",
    musicComposer: "Hans Zimmer, James Newton Howard", cinematographer: "Wally Pfister",
    productionHouse: "Warner Bros.", franchise: "The Dark Knight Trilogy", sequel: true, adaptation: true,
    screenCount: 9200, ottReleaseDate: null,
    synopsis: "Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy.",
    tags: ["Classic", "Joker", "Nolan", "IMAX", "Heath Ledger"],
    posterUrl: "/posters/darkknight.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
  {
    id: 28, name: "Inception", originalTitle: "Inception", year: 2010,
    releaseDate: "2010-07-16", language: "English", country: "USA", region: "Rest of World",
    industry: "Hollywood", genre: "Sci-Fi", subGenre: "Thriller", runtime: 148,
    certification: "PG-13", budget: 1600, productionCost: 1300, marketingCost: 300, totalCost: 1600,
    openingDay: 215, openingWeekend: 625, week1: 1100, lifetimeDomestic: 2923,
    lifetimeInternational: 5413, worldwideGross: 8362, indiaGross: 52, overseasGross: 8310,
    verdict: "Blockbuster", imdbRating: 8.8, rtScore: 87, metacritic: 74,
    leadActors: "Leonardo DiCaprio", supportingActors: "Joseph Gordon-Levitt, Tom Hardy, Ellen Page",
    director: "Christopher Nolan", producer: "Emma Thomas", writer: "Christopher Nolan",
    musicComposer: "Hans Zimmer", cinematographer: "Wally Pfister",
    productionHouse: "Warner Bros.", franchise: null, sequel: false, adaptation: false,
    screenCount: 7200, ottReleaseDate: null,
    synopsis: "A thief who steals secrets through dream-sharing technology is given the task of planting an idea.",
    tags: ["Mind-Bending", "Nolan", "Original", "Dreams"],
    posterUrl: "/posters/inception.jpg", trailerUrl: "https://youtube.com/watch?v=placeholder",
    lastUpdated: "2025-01-15"
  },
];

// ═══════════════════════════════════════════════════════════
//  Lookup Constants
// ═══════════════════════════════════════════════════════════

export const VERDICTS = [
  "All Time Blockbuster", "Blockbuster", "Super Hit", "Hit",
  "Above Average", "Average", "Below Average", "Flop", "Disaster"
];

export const GENRES = [
  "Action", "Drama", "Comedy", "Thriller", "Romance", "Sci-Fi",
  "Horror", "Animation", "Biography", "Crime", "Fantasy", "Adventure",
  "Musical", "Mystery", "War"
];

export const INDUSTRIES = [
  "Bollywood", "Hollywood", "Tollywood", "Kollywood", "Sandalwood",
  "Korean Cinema", "Japanese Cinema", "Chinese Cinema", "British Cinema", "French Cinema"
];

export const LANGUAGES = [
  "Hindi", "English", "Telugu", "Tamil", "Kannada", "Malayalam",
  "Korean", "Japanese", "Mandarin", "French", "Spanish", "German"
];

export const CERTIFICATIONS = ["U", "UA", "PG", "PG-13", "A", "R"];

export const CHART_COLORS = [
  "#D4A843", "#00D4FF", "#FF3366", "#00CC88",
  "#8B5CF6", "#FF8C42", "#E879F9", "#34D399"
];

// ═══════════════════════════════════════════════════════════
//  Utility Functions
// ═══════════════════════════════════════════════════════════

export function formatCr(n: number | null | undefined): string {
  if (n == null) return "N/A";
  return `₹${n.toLocaleString()} Cr`;
}

export function formatShort(n: number | null | undefined): string {
  if (n == null) return "N/A";
  if (n >= 10000) return `₹${(n / 100).toFixed(0)}B`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K Cr`;
  return `₹${n} Cr`;
}

export function calcROI(m: Movie): number {
  if (!m.totalCost || m.totalCost === 0) return 0;
  return Math.round(((m.worldwideGross - m.totalCost) / m.totalCost) * 100);
}

export function calcMultiplier(m: Movie): string {
  if (!m.openingDay || m.openingDay === 0) return "N/A";
  return (m.lifetimeDomestic / m.openingDay).toFixed(1);
}

export function getDomesticShare(m: Movie): number {
  if (!m.worldwideGross) return 0;
  return Math.round((m.lifetimeDomestic / m.worldwideGross) * 100);
}

export function getOverseasShare(m: Movie): number {
  if (!m.worldwideGross) return 0;
  return Math.round((m.lifetimeInternational / m.worldwideGross) * 100);
}

export function getVerdictColor(verdict: string): string {
  const map: Record<string, string> = {
    "All Time Blockbuster": "#FFD700",
    "Blockbuster": "#00CC88",
    "Super Hit": "#00D4FF",
    "Hit": "#8B5CF6",
    "Above Average": "#34D399",
    "Average": "#F59E0B",
    "Below Average": "#F97316",
    "Flop": "#EF4444",
    "Disaster": "#991B1B",
  };
  return map[verdict] || "#8B95A5";
}
