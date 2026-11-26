// Caldoria NSO site logic: charts, tables, filters, tabs and search.
// All data comes from data.js; all rendering is client-side, offline.
import { META, YEARS, POPULATION, AGE_GROUPS, ECONOMY, LABOUR, PRICES, REGIONS, RELEASES, TOPICS, yearIndex, fmt, fmtInt } from "./data.js";
import { lineChart, barChart, donutChart, hbarChart, PALETTE } from "./charts.js";

function el(id) { return document.getElementById(id); }
function setHTML(id, html) { const n = el(id); if (n) n.innerHTML = html; }
function yearLabels() { return YEARS.map(String); }

function renderYearValue(year) {
  const i = yearIndex(year);
  const map = {
    "year-pop": fmt(POPULATION.total[i]) + " million",
    "year-growth": "+" + fmt(POPULATION.growth[i]) + "%",
    "year-gdp": fmt(ECONOMY.gdpNominal[i]) + " bn CLD",
    "year-unemp": fmt(LABOUR.unemployment[i]) + "%",
    "year-cpi": fmt(PRICES.cpi[i]) + "%"
  };
  for (const [id, v] of Object.entries(map)) { const n = el(id); if (n) n.textContent = v; }
  const note = el("year-note");
  if (note) note.textContent = "Showing figures for " + year + ". Source: NSO Caldoria, " + META.updated + ".";
}

function bindYearSelector() {
  const sel = el("yearSelect");
  if (!sel) return;
  YEARS.forEach(y => { const o = document.createElement("option"); o.value = y; o.textContent = y; sel.appendChild(o); });
  sel.value = "2026";
  sel.addEventListener("change", () => renderYearValue(sel.value));
  renderYearValue("2026");
}

function sortTable(table, col, numeric) {
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);
  const dir = table.dataset.dir === "asc" ? -1 : 1;
  table.dataset.dir = dir === 1 ? "asc" : "desc";
  rows.sort((a, b) => {
    const av = a.cells[col].textContent.trim(), bv = b.cells[col].textContent.trim();
    if (numeric) return (parseFloat(av.replace(/[^0-9.\-]/g, "")) - parseFloat(bv.replace(/[^0-9.\-]/g, ""))) * dir;
    return av.localeCompare(bv) * dir;
  });
  rows.forEach(r => tbody.appendChild(r));
}

function bindSortable() {
  document.querySelectorAll("table.sortable").forEach(table => {
    table.querySelectorAll("th").forEach((th, col) => {
      th.addEventListener("click", () => sortTable(table, col, th.classList.contains("num")));
      th.title = "Click to sort";
    });
  });
}

function bindTabs() {
  document.querySelectorAll("[data-tab-group]").forEach(group => {
    const buttons = group.querySelectorAll("[data-tab]");
    buttons.forEach(btn => btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      group.querySelectorAll("[data-panel]").forEach(p => p.classList.toggle("hidden", p.dataset.panel !== btn.dataset.tab));
    }));
  });
}

function regionRows(filterText, sortKey) {
  let rows = REGIONS.slice();
  if (filterText) rows = rows.filter(r => r.name.toLowerCase().includes(filterText.toLowerCase()));
  if (sortKey) rows.sort((a, b) => b[sortKey] - a[sortKey]);
  return rows.map(r => `<tr><td>${r.name}</td><td class="num">${fmtInt(r.pop)}</td><td class="num">${fmt(r.gdp)}</td><td class="num">${fmt(r.unemp)}</td><td class="num">${fmtInt(r.income)}</td><td class="num">${fmtInt(r.density)}</td></tr>`).join("");
}

function bindRegions() {
  const body = el("regionRows"), input = el("regionFilter"), sort = el("regionSort");
  if (!body) return;
  const draw = () => { body.innerHTML = regionRows(input ? input.value : "", sort ? sort.value : ""); };
  if (input) input.addEventListener("input", draw);
  if (sort) sort.addEventListener("change", draw);
  draw();
}

function downloadCSV(filename, header, rows) {
  const csv = [header, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function bindDownloads() {
  const btn = el("downloadRegions");
  if (btn) btn.addEventListener("click", () => downloadCSV("caldoria-regions-2026.csv",
    ["Region", "Population", "GDP_bn_CLD", "Unemployment_pct", "Income_CLD", "Density_per_km2"],
    REGIONS.map(r => [r.name, r.pop, r.gdp, r.unemp, r.income, r.density])));
  const btn2 = el("downloadPrices");
  if (btn2) btn2.addEventListener("click", () => downloadCSV("caldoria-basket-2026.csv",
    ["Item", "Price_CLD"],
    PRICES.basket2026.map(b => ['"' + b.item + '"', b.price])));
}

function bindSearch() {
  const input = el("siteSearch"), box = el("searchResults");
  if (!input || !box) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { box.innerHTML = ""; return; }
    const hits = TOPICS.filter(t => (t.title + " " + t.desc).toLowerCase().includes(q));
    box.innerHTML = hits.length
      ? `<div class="card"><h3>${hits.length} result${hits.length > 1 ? "s" : ""} for “${input.value.trim()}”</h3>` +
        hits.map(t => `<p><a href="${t.page}"><strong>${t.title}</strong></a> — ${t.desc}</p>`).join("") + "</div>"
      : `<div class="card"><h3>No results for “${input.value.trim()}”</h3><p>Try “population”, “GDP”, “unemployment”, “prices” or “regions”.</p></div>`;
  });
}

function renderReleases() {
  setHTML("releaseList", RELEASES.map(r => `<div class="release"><span class="release-date">${r.date}</span><span><a href="methods.html">${r.title}</a><br>${r.note}</span></div>`).join(""));
}

function renderTopics() {
  setHTML("topicList", TOPICS.map(t => `<div class="topic"><h3><a href="${t.page}">${t.title}</a></h3><p>${t.desc}</p></div>`).join(""));
}

function renderPage() {
  const page = document.body.dataset.page || "home";
  // Every chart is drawn from data.js at load; a missing container is skipped
  // silently so a page never breaks because another page's chart is absent.
  if (page === "home") {
    setHTML("chart-gdp", lineChart(yearLabels(), ECONOMY.gdpNominal, { label: "GDP 2019 to 2026, billion CLD", color: PALETTE[0] }));
    setHTML("chart-pop", lineChart(yearLabels(), POPULATION.total, { label: "Population 2019 to 2026, millions", color: PALETTE[2] }));
    renderReleases(); renderTopics();
  }
  if (page === "population") {
    setHTML("chart-pop", lineChart(yearLabels(), POPULATION.total, { label: "Population 2019 to 2026, millions", color: PALETTE[2] }));
    setHTML("chart-age", donutChart(AGE_GROUPS.map(a => ({ name: a.group, share: a.share })), { centre: "8.42m", centreSub: "people, 2026" }));
    setHTML("chart-life", lineChart(yearLabels(), POPULATION.lifeExpectancy, { label: "Life expectancy 2019 to 2026, years", color: PALETTE[5] }));
    setHTML("ageRows", AGE_GROUPS.map(a => `<tr><td>${a.group}</td><td class="num">${fmt(a.share)}</td><td class="num">${fmtInt(a.count)}</td></tr>`).join(""));
  }
  if (page === "economy") {
    setHTML("chart-gdp", barChart(yearLabels(), ECONOMY.gdpNominal, { label: "GDP 2019 to 2026, billion CLD", color: PALETTE[0] }));
    setHTML("chart-growth", barChart(yearLabels(), ECONOMY.gdpGrowth, { label: "Real GDP growth 2019 to 2026, percent", color: PALETTE[1] }));
    setHTML("chart-sectors", donutChart(ECONOMY.sectors2026, { centre: "214.6", centreSub: "bn CLD, 2026" }));
    setHTML("chart-trade", lineChart(yearLabels(), ECONOMY.exports, { label: "Exports 2019 to 2026, billion CLD", color: PALETTE[0] }));
  }
  if (page === "labour") {
    setHTML("chart-unemp", lineChart(yearLabels(), LABOUR.unemployment, { label: "Unemployment rate 2019 to 2026, percent", color: PALETTE[4] }));
    setHTML("chart-wage", lineChart(yearLabels(), LABOUR.medianWage, { label: "Median monthly wage 2019 to 2026, CLD", color: PALETTE[0] }));
    setHTML("chart-sectors", hbarChart(LABOUR.employmentBySector.map(s => ({ name: s.sector, value: s.share, display: fmt(s.share) + "%" })), { label: "Employment share by sector, 2026" }));
    setHTML("chart-youth", lineChart(yearLabels(), LABOUR.youthUnemployment, { label: "Youth unemployment 2019 to 2026, percent", color: PALETTE[3] }));
  }
  if (page === "prices") {
    setHTML("chart-cpi", lineChart(yearLabels(), PRICES.cpi, { label: "CPI inflation 2019 to 2026, percent", color: PALETTE[1] }));
    setHTML("chart-groups", barChart(["Food", "Housing", "Transport", "Energy"], [PRICES.food[7], PRICES.housing[7], PRICES.transport[7], PRICES.energy[7]], { label: "Price rises by group, 2026, percent", colors: PALETTE }));
    setHTML("basketRows", PRICES.basket2026.map(b => `<tr><td>${b.item}</td><td class="num">${fmt(b.price, 2)} CLD</td></tr>`).join(""));
  }
  if (page === "regions") {
    setHTML("chart-region-gdp", hbarChart(REGIONS.map(r => ({ name: r.name, value: r.gdp, display: fmt(r.gdp) + " bn" })), { label: "Regional GDP 2026, billion CLD" }));
    setHTML("chart-region-pop", hbarChart(REGIONS.map(r => ({ name: r.name, value: r.pop / 1000000, display: fmt(r.pop / 1000000) + "m" })), { label: "Regional population 2026, millions" }));
    bindRegions();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(n => { n.textContent = "2026"; });
  renderPage();
  bindYearSelector();
  bindSortable();
  bindTabs();
  bindSearch();
  bindDownloads();
});
