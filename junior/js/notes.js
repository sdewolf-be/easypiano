// Notes de la version junior : une couleur par nom de note (type Boomwhackers),
// la même couleur pour toutes les octaves. Les gommettes sur le vrai piano suivent ce code.
import { parsePitch } from '../../js/music.js';

export const NOTE_INFO = {
  C: { name: 'Do',  color: '#ff4b4b', dark: '#c62828', ink: '#ffffff', colorName: 'rouge',  colorFem: 'rouge' },
  D: { name: 'Ré',  color: '#ff9b1a', dark: '#c25e00', ink: '#ffffff', colorName: 'orange', colorFem: 'orange' },
  E: { name: 'Mi',  color: '#ffd400', dark: '#b89600', ink: '#5a4500', colorName: 'jaune',  colorFem: 'jaune' },
  F: { name: 'Fa',  color: '#3ecf5a', dark: '#1f8a37', ink: '#ffffff', colorName: 'vert',   colorFem: 'verte' },
  G: { name: 'Sol', color: '#2f96ff', dark: '#1a5fb4', ink: '#ffffff', colorName: 'bleu',   colorFem: 'bleue' },
  A: { name: 'La',  color: '#9b5cff', dark: '#5e2bb8', ink: '#ffffff', colorName: 'violet', colorFem: 'violette' },
  B: { name: 'Si',  color: '#ff5fb9', dark: '#b8257a', ink: '#ffffff', colorName: 'rose',   colorFem: 'rose' },
};
export const LETTER_ORDER = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const PC_LETTER = { 0: 'C', 2: 'D', 4: 'E', 5: 'F', 7: 'G', 9: 'A', 11: 'B' };

export const pc = (midi) => ((midi % 12) + 12) % 12;
export const isWhite = (midi) => PC_LETTER[pc(midi)] !== undefined;
export const letterOf = (midi) => PC_LETTER[pc(midi)] || null;
export const infoOf = (midi) => { const l = letterOf(midi); return l ? NOTE_INFO[l] : null; };
export const nameOf = (midi) => { const i = infoOf(midi); return i ? i.name : '?'; };
export const octaveOf = (midi) => Math.floor(midi / 12) - 1;
export const toMidi = (name) => parsePitch(name).midi;

// Même note ? Avec tolérance d'octave, un Sol joué n'importe où sur le piano est accepté.
export function sameNote(played, expected, tolerant) {
  return tolerant ? pc(played) === pc(expected) : played === expected;
}

// Nom parlé : « le petit Sol » (en dessous du Do du milieu), « le grand Do » (Do5).
export function spokenName(midi, { size = false } = {}) {
  const i = infoOf(midi);
  if (!i) return 'une touche noire';
  if (!size) return i.name;
  const oct = octaveOf(midi);
  if (oct < 4) return 'le petit ' + i.name;
  if (oct > 4 || (oct === 4 && false)) return 'le grand ' + i.name;
  return i.name;
}

// Étendue du clavier à afficher : au moins Do4…Do5, élargie aux notes utilisées (touches blanches).
export function rangeFor(midis, pad = 0) {
  let low = 60, high = 72;
  for (const m of midis) { if (m < low) low = m; if (m > high) high = m; }
  low -= pad; high += pad;
  while (!isWhite(low)) low--;
  while (!isWhite(high)) high++;
  return [low, high];
}

export function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
export function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
