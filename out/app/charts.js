// Hand-drawn SVG charts for Caldoria NSO — no libraries, no network.
// Every chart is built as an inline SVG string from plain arrays.
export const PALETTE = ["#0b5e5a", "#e8a13a", "#2f7fb8", "#7a4fa3", "#c65b4e", "#4a9e6d", "#8a6d3b", "#546e7a"];

function svgOpen(w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid meet">`;
}

export function lineChart(labels, values, opts = {}) {
  const w = opts.width || 640, h = opts.height || 280, padL = 46, padB = 30, padT = 16, padR = 14;
  const min = Math.min(...values), max = Math.max(...values);
  const lo = Math.floor((min - (max - min) * 0.15) * 10) / 10;
  const hi = Math.ceil((max + (max - min) * 0.15) * 10) / 10;
  const x = i => padL + (i * (w - padL - padR)) / (labels.length - 1);
  const y = v => padT + (1 - (v - lo) / (hi - lo)) * (h - padT - padB);
  const color = opts.color || PALETTE[0];
  let grid = "";
  for (let g = 0; g <= 4; g++) {
    const v = lo + ((hi - lo) * g) / 4, gy = y(v);
    grid += `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="#e3e8ea" stroke-width="1"/><text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#5a6b72">${v.toFixed(1)}</text>`;
  }
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const dots = values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="${color}"><title>${labels[i]}: ${v}</title></circle>`).join("");
  const labs = labels.map((l, i) => `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#5a6b72">${l}</text>`).join("");
  return `${svgOpen(w, h, opts.label || "Line chart")}${grid}<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${labs}</svg>`;
}

export function barChart(labels, values, opts = {}) {
  const w = opts.width || 640, h = opts.height || 280, padL = 46, padB = 30, padT = 16, padR = 14;
  const max = Math.max(...values, 0), min = Math.min(...values, 0);
  const hi = max * 1.08, lo = min < 0 ? min * 1.15 : 0;
  const bw = (w - padL - padR) / labels.length;
  const y = v => padT + (1 - (v - lo) / (hi - lo)) * (h - padT - padB);
  const color = opts.color || PALETTE[2];
  let out = svgOpen(w, h, opts.label || "Bar chart");
  for (let g = 0; g <= 4; g++) {
    const v = lo + ((hi - lo) * g) / 4, gy = y(v);
    out += `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="#e3e8ea" stroke-width="1"/><text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#5a6b72">${v.toFixed(0)}</text>`;
  }
  values.forEach((v, i) => {
    const bx = padL + i * bw + bw * 0.18, bh = Math.abs(y(v) - y(0));
    const by = v >= 0 ? y(v) : y(0);
    const fill = v < 0 ? "#c65b4e" : (opts.colors ? opts.colors[i % opts.colors.length] : color);
    out += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${fill}"><title>${labels[i]}: ${v}</title></rect>`;
    out += `<text x="${(bx + bw * 0.32).toFixed(1)}" y="${(by - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#33474f">${v}</text>`;
    out += `<text x="${(padL + i * bw + bw / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#5a6b72">${labels[i]}</text>`;
  });
  return out + "</svg>";
}

export function donutChart(items, opts = {}) {
  const size = opts.size || 260, cx = size / 2, cy = size / 2, r = size / 2 - 14, ir = r * 0.58;
  const total = items.reduce((s, it) => s + it.share, 0);
  let angle = -Math.PI / 2, out = svgOpen(size, size, opts.label || "Share chart");
  const cxp = a => cx + r * Math.cos(a), cyp = a => cy + r * Math.sin(a);
  items.forEach((it, i) => {
    const a0 = angle, a1 = angle + (it.share / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const color = PALETTE[i % PALETTE.length];
    out += `<path d="M ${cxp(a0)} ${cyp(a0)} A ${r} ${r} 0 ${large} 1 ${cxp(a1)} ${cyp(a1)} L ${cx + ir * Math.cos(a1)} ${cy + ir * Math.sin(a1)} A ${ir} ${ir} 0 ${large} 0 ${cx + ir * Math.cos(a0)} ${cy + ir * Math.sin(a0)} Z" fill="${color}"><title>${it.name}: ${it.share}%</title></path>`;
    angle = a1;
  });
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="#12333a">${opts.centre || ""}</text>`;
  out += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#5a6b72">${opts.centreSub || ""}</text></svg>`;
  const legend = items.map((it, i) => `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${it.name} — <strong>${it.share}%</strong></li>`).join("");
  return `<div class="donut-wrap">${out}<ul class="legend">${legend}</ul></div>`;
}

export function hbarChart(items, opts = {}) {
  const w = 640, rowH = 34, h = items.length * rowH + 34;
  const max = Math.max(...items.map(i => i.value));
  let out = svgOpen(w, h, opts.label || "Horizontal bar chart");
  items.forEach((it, i) => {
    const y = 12 + i * rowH, bw = (it.value / max) * (w - 190);
    out += `<text x="0" y="${y + 15}" font-size="12" fill="#33474f">${it.name}</text>`;
    out += `<rect x="150" y="${y}" width="${bw.toFixed(1)}" height="20" rx="3" fill="${PALETTE[i % PALETTE.length]}"><title>${it.name}: ${it.value}</title></rect>`;
    out += `<text x="${(155 + bw).toFixed(1)}" y="${y + 15}" font-size="12" font-weight="600" fill="#33474f">${it.display}</text>`;
  });
  return out + "</svg>";
}
