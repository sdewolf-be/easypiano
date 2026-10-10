// Schémas pour les fiches de théorie : clavier annoté, mini-partitions, tableaux.
import { parsePitch, parseSong, LETTER_FR, midiToNameFr } from './music.js';

const IS_BLACK = [false, true, false, true, false, false, true, false, true, false, true, false];

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

// Clavier SVG. opts : { low:'C3', high:'C5', labels:{'C4':'Do'}, highlight:['C4'], fingers:{'C4':'1'}, markers:{'C4':'●'}, width }
export function keyboardSvg(opts = {}) {
  const low = parsePitch(opts.low || 'C3').midi;
  const high = parsePitch(opts.high || 'C5').midi;
  const labels = {}, highlight = new Set(), fingers = {}, colors = {};
  for (const [k, v] of Object.entries(opts.labels || {})) labels[parsePitch(k).midi] = v;
  for (const k of (opts.highlight || [])) highlight.add(parsePitch(k).midi);
  for (const [k, v] of Object.entries(opts.fingers || {})) fingers[parsePitch(k).midi] = v;
  for (const [k, v] of Object.entries(opts.colors || {})) colors[parsePitch(k).midi] = v;
  const whites = [];
  for (let m = low; m <= high; m++) if (!IS_BLACK[m % 12]) whites.push(m);
  const W = 30, H = 110, BW = 18, BH = 66;
  const width = whites.length * W;
  let svg = `<svg class="kbd-diagram" viewBox="0 0 ${width + 2} ${H + 2}" width="${opts.width || Math.min(width + 2, 640)}" role="img" aria-label="Clavier">`;
  let wi = 0;
  const pos = {};
  for (let m = low; m <= high; m++) {
    if (IS_BLACK[m % 12]) continue;
    const x = 1 + wi * W;
    pos[m] = x + W / 2;
    const hl = highlight.has(m);
    svg += `<rect x="${x}" y="1" width="${W}" height="${H}" rx="3" fill="${hl ? (colors[m] || '#ffd9a8') : '#fff'}" stroke="#555"/>`;
    if (labels[m] !== undefined) svg += `<text x="${x + W / 2}" y="${H - 8}" text-anchor="middle" font-size="12" font-weight="700" fill="#222">${esc(labels[m])}</text>`;
    if (fingers[m] !== undefined) svg += `<circle cx="${x + W / 2}" cy="${H - 30}" r="9" fill="#5b8cff"/><text x="${x + W / 2}" y="${H - 26}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${esc(fingers[m])}</text>`;
    wi++;
  }
  wi = 0;
  for (let m = low; m <= high; m++) {
    if (!IS_BLACK[m % 12]) { wi++; continue; }
    const x = 1 + wi * W - BW / 2;
    pos[m] = x + BW / 2;
    const hl = highlight.has(m);
    svg += `<rect x="${x}" y="1" width="${BW}" height="${BH}" rx="2" fill="${hl ? (colors[m] || '#f0a040') : '#222'}" stroke="#000"/>`;
    if (labels[m] !== undefined) svg += `<text x="${x + BW / 2}" y="${BH - 6}" text-anchor="middle" font-size="9" font-weight="700" fill="${hl ? '#222' : '#fff'}">${esc(labels[m])}</text>`;
    if (fingers[m] !== undefined) svg += `<circle cx="${x + BW / 2}" cy="${BH - 22}" r="8" fill="#5b8cff"/><text x="${x + BW / 2}" y="${BH - 18}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">${esc(fingers[m])}</text>`;
  }
  svg += '</svg>';
  return `<div class="diagram">${svg}</div>`;
}

// Clavier avec les noms français des touches blanches (et noires si demandé)
export function namedKeyboard(low, high, opts = {}) {
  const labels = {};
  const l = parsePitch(low).midi, h = parsePitch(high).midi;
  for (let m = l; m <= h; m++) {
    if (IS_BLACK[m % 12]) { if (opts.blacks) labels[midiKey(m)] = opts.blacks === 'flat' ? midiToNameFr(m, true) : midiToNameFr(m); }
    else labels[midiKey(m)] = midiToNameFr(m) + (opts.octaves ? (Math.floor(m / 12) - 1) : '');
  }
  return keyboardSvg({ low, high, labels, highlight: opts.highlight, fingers: opts.fingers, colors: opts.colors, width: opts.width });
}

function midiKey(m) {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return names[m % 12] + (Math.floor(m / 12) - 1);
}

// Mini-partition statique (rendue plus tard par renderMiniScores).
export function miniScore(def, opts = {}) {
  const payload = { def: { timeSig: [4, 4], key: 'C', ...def }, opts: { showNames: false, ...opts } };
  return `<div class="mini-score" data-score="${esc(JSON.stringify(payload))}"></div>`;
}

export function renderMiniScores(root, ScoreRenderer) {
  for (const el of root.querySelectorAll('.mini-score[data-score]')) {
    try {
      const { def, opts } = JSON.parse(el.getAttribute('data-score'));
      const song = parseSong({ id: 'mini', title: '', ...def });
      const staves = opts.staves || ((song.hasR && song.hasL) ? 'RL' : song.hasL ? 'L' : 'R');
      const r = new ScoreRenderer(el, { sp: opts.sp || 9, fit: true });
      r.render(song, { hands: 'RL', showNames: !!opts.showNames, staves });
      el.removeAttribute('data-score');
    } catch (e) {
      el.textContent = 'Schéma indisponible : ' + e.message;
    }
  }
}

// Tableau des valeurs rythmiques
export function rhythmTable(rows) {
  return `<table class="theory-table"><thead><tr><th>Figure</th><th>Nom</th><th>Durée</th></tr></thead><tbody>${rows.map(r => `<tr><td class="glyph-cell">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table>`;
}

export const NOTE_GLYPHS = { whole: '𝅝', half: '𝅗𝅥', quarter: '𝅘𝅥', eighth: '𝅘𝅥𝅮', restWhole: '𝄻', restHalf: '𝄼', restQuarter: '𝄽', restEighth: '𝄾' };

export function tip(html) { return `<div class="tip">${html}</div>`; }
export function warn(html) { return `<div class="tip warn">${html}</div>`; }
export function cols(...parts) { return `<div class="cols">${parts.map(p => `<div>${p}</div>`).join('')}</div>`; }
export function frName(str) { const p = parsePitch(str); return LETTER_FR[p.letter] + (p.acc === 1 ? '♯' : p.acc === -1 ? '♭' : ''); }
