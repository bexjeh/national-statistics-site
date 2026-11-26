// Caldoria National Statistics — invented, internally consistent dataset.
// All figures are for the fictional Republic of Caldoria, compiled by its
// National Statistics Office (NSO). Currency: caldor (CLD). Years 2019-2026.
export const META = {
  country: "Caldoria",
  office: "National Statistics Office of Caldoria",
  short: "NSO Caldoria",
  updated: "26 November 2026",
  currency: "caldor (CLD)",
  population2026: 8420000,
  areaKm2: 96400,
  capital: "Velmara",
  regionsCount: 8
};

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

// Population (millions) and annual growth (%)
export const POPULATION = {
  total: [8.02, 8.06, 8.12, 8.19, 8.27, 8.34, 8.38, 8.42],
  growth: [0.6, 0.5, 0.7, 0.9, 1.0, 0.8, 0.5, 0.5],
  urbanShare: [61.2, 61.8, 62.4, 63.0, 63.7, 64.3, 64.9, 65.4],
  medianAge: [36.1, 36.4, 36.7, 37.0, 37.3, 37.6, 37.9, 38.2],
  birthsPer1000: [11.8, 11.2, 11.5, 11.9, 12.1, 12.0, 11.9, 11.8],
  deathsPer1000: [8.4, 9.1, 8.9, 8.6, 8.5, 8.4, 8.3, 8.3],
  lifeExpectancy: [78.9, 78.4, 78.8, 79.2, 79.5, 79.7, 79.9, 80.1]
};

export const AGE_GROUPS = [
  { group: "0–14 years", share: 17.8, count: 1499000 },
  { group: "15–24 years", share: 12.4, count: 1044000 },
  { group: "25–54 years", share: 41.6, count: 3503000 },
  { group: "55–64 years", share: 12.9, count: 1086000 },
  { group: "65+ years", share: 15.3, count: 1288000 }
];

// GDP in billion CLD (nominal) and real growth %
export const ECONOMY = {
  gdpNominal: [178.4, 172.1, 186.3, 198.7, 205.9, 210.4, 212.8, 214.6],
  gdpGrowth: [2.1, -3.5, 8.2, 6.7, 3.6, 2.2, 1.1, 0.9],
  gdpPerCapita: [22240, 21350, 22940, 24260, 24890, 25230, 25400, 25490],
  sectors2026: [
    { name: "Services", share: 58.4 },
    { name: "Industry", share: 24.1 },
    { name: "Agriculture", share: 6.8 },
    { name: "Construction", share: 7.2 },
    { name: "Other", share: 3.5 }
  ],
  exports: [41.2, 36.8, 44.5, 49.8, 51.3, 52.0, 52.6, 53.4],
  imports: [44.6, 39.9, 47.1, 52.4, 53.9, 54.1, 54.3, 54.9],
  govDebtPct: [48.2, 56.4, 54.1, 52.8, 51.6, 50.9, 50.2, 49.6]
};

export const LABOUR = {
  unemployment: [5.8, 7.9, 7.1, 6.2, 5.6, 5.1, 4.8, 4.6],
  participation: [68.4, 66.9, 67.5, 68.1, 68.8, 69.2, 69.5, 69.7],
  employmentBySector: [
    { sector: "Services", share: 64.2, jobs: 2714000 },
    { sector: "Industry", share: 19.8, jobs: 837000 },
    { sector: "Agriculture", share: 9.1, jobs: 385000 },
    { sector: "Construction", share: 6.9, jobs: 292000 }
  ],
  medianWage: [1840, 1865, 1930, 2015, 2090, 2155, 2210, 2265],
  youthUnemployment: [12.4, 16.8, 15.2, 13.1, 11.8, 10.9, 10.2, 9.7],
  womenParticipation: [61.2, 59.8, 60.9, 62.0, 62.8, 63.4, 63.9, 64.3]
};

export const PRICES = {
  cpi: [1.9, 0.8, 2.6, 5.4, 4.1, 2.8, 2.2, 1.9],
  food: [2.4, 1.1, 3.1, 7.8, 5.9, 3.4, 2.6, 2.1],
  housing: [1.6, 1.2, 2.2, 4.9, 3.8, 2.9, 2.4, 2.0],
  transport: [1.1, -0.9, 3.8, 8.6, 2.4, 1.1, 0.9, 1.2],
  energy: [0.4, -3.2, 6.1, 14.2, -1.8, -0.6, 0.4, 0.8],
  basket2026: [
    { item: "Bread, 1 kg", price: 2.45 },
    { item: "Milk, 1 litre", price: 1.38 },
    { item: "Eggs, 12", price: 3.10 },
    { item: "Rice, 1 kg", price: 1.92 },
    { item: "Chicken, 1 kg", price: 6.85 },
    { item: "Apples, 1 kg", price: 2.75 },
    { item: "Coffee, 250 g", price: 5.40 },
    { item: "Bus fare, single", price: 1.60 },
    { item: "Petrol, 1 litre", price: 1.74 },
    { item: "Electricity, 1 kWh", price: 0.28 }
  ]
};

export const REGIONS = [
  { name: "Velmara Capital", pop: 1480000, gdp: 58.2, unemp: 4.1, income: 31200, density: 1240 },
  { name: "North Coast", pop: 1210000, gdp: 31.4, unemp: 4.4, income: 26800, density: 96 },
  { name: "East Vale", pop: 1080000, gdp: 24.8, unemp: 5.2, income: 24100, density: 74 },
  { name: "Central Plains", pop: 1320000, gdp: 33.6, unemp: 4.8, income: 25900, density: 88 },
  { name: "South Hills", pop: 940000, gdp: 19.7, unemp: 5.6, income: 22800, density: 61 },
  { name: "West Harbour", pop: 1150000, gdp: 29.1, unemp: 4.3, income: 26400, density: 112 },
  { name: "Highlands", pop: 620000, gdp: 9.8, unemp: 6.1, income: 20500, density: 22 },
  { name: "Isle of Tarn", pop: 620000, gdp: 8.0, unemp: 5.0, income: 23400, density: 58 }
];

export const RELEASES = [
  { date: "26 Nov 2026", title: "Consumer Prices, October 2026", note: "CPI up 1.9% year on year." },
  { date: "19 Nov 2026", title: "Labour Force Survey, Q3 2026", note: "Unemployment 4.6%, lowest since 2019." },
  { date: "12 Nov 2026", title: "Regional GDP, 2025 (final)", note: "All eight regions grew; Velmara Capital leads." },
  { date: "05 Nov 2026", title: "Population Estimates, mid-2026", note: "Population 8.42 million, median age 38.2." },
  { date: "29 Oct 2026", title: "National Accounts, Q3 2026", note: "GDP up 0.9% year on year in real terms." },
  { date: "15 Oct 2026", title: "Household Income, 2025", note: "Median household income 41,300 CLD." }
];

export const TOPICS = [
  { title: "Population", page: "population.html", desc: "8.42 million people, median age 38.2, life expectancy 80.1 years." },
  { title: "Economy", page: "economy.html", desc: "GDP 214.6 billion CLD, growth 0.9%, GDP per capita 25,490 CLD." },
  { title: "Labour market", page: "labour.html", desc: "Unemployment 4.6%, participation 69.7%, median wage 2,265 CLD a month." },
  { title: "Prices", page: "prices.html", desc: "Inflation 1.9%, food 2.1%, housing 2.0% in the year to October 2026." },
  { title: "Regions", page: "regions.html", desc: "Eight regions compared on population, GDP, income and unemployment." },
  { title: "Methods & sources", page: "methods.html", desc: "How the NSO collects, checks and revises every figure on this site." }
];

export function yearIndex(year) {
  return YEARS.indexOf(Number(year));
}
export function fmt(n, decimals = 1) {
  return Number(n).toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
export function fmtInt(n) {
  return Number(n).toLocaleString("en-GB");
}
