// Rendu de la partition (grande portée) en SVG, espacement proportionnel au temps,
// curseur de lecture et coloration des notes (attendue / juste / ratée).
import { pitchNameFr } from './music.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const GLYPH = {
  gClef: '', fClef: '',
  nhWhole: '', nhHalf: '', nhBlack: '',
  flag8Up: '', flag8Down: '', flag16Up: '', flag16Down: '',
  flat: '', natural: '', sharp: '',
  restWhole: '', restHalf: '', restQuarter: '', rest8: '', rest16: '',
  dot: '',
  digits: ['', '', '', '', '', '', '', '', '', ''],
};
// Position (en « marches » diatoniques) des altérations à l'armure, clé de Sol.
const SHARP_STEPS = [38, 35, 39, 36, 33, 37, 34];
const FLAT_STEPS = [34, 37, 33, 36, 32, 35, 31];
const TREBLE_BOTTOM_STEP = 30; // Mi4
const BASS_BOTTOM_STEP = 18;   // Sol2

function el(name, attrs = {}, text) {
  const e = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (text !== undefined) e.textContent = text;
  return e;
}

export class ScoreRenderer {
  constructor(container, opts = {}) {
    this.container = container;
    this.fixedSp = opts.sp || null;   // espace entre deux lignes de portée (sinon calculé selon la hauteur)
    this.sp = this.fixedSp || 12;
    this.ppb = opts.ppb || this.sp * 7; // pixels par temps (noire)
    this.anchor = opts.anchor || 0.32; // position du curseur dans la fenêtre (fraction)
    this.noteEls = new Map();         // eventId -> [g, g, ...] (une entrée par note de l'accord)
    this.eventEls = new Map();
    this.song = null;
    this.translate = 0;
  }

  get fontSize() { return this.sp * 4; }

  xOf(beat) {
    return this.leftMargin + beat * this.ppb + this.sp * 1.8;
  }

  barX(measure) {
    return this.leftMargin + measure * this.song.beatsPerMeasure * this.ppb;
  }

  yOfStep(step, hand) {
    const sp = this.sp;
    if (hand === 'R') return this.trebleTop + 4 * sp - (step - TREBLE_BOTTOM_STEP) * sp / 2;
    return this.bassTop + 4 * sp - (step - BASS_BOTTOM_STEP) * sp / 2;
  }

  render(song, opts = {}) {
    this.song = song;
    this.hands = opts.hands || 'RL';
    this.showNames = !!opts.showNames;
    this.noteEls.clear();
    this.eventEls.clear();
    const h = this.container.clientHeight || 320;
    this.sp = this.fixedSp || Math.max(10, Math.min(20, Math.floor(h / 27.5)));
    this.ppb = this.sp * 7;
    const sp = this.sp;
    const ks = song.keySig;
    this.trebleTop = 6 * sp;
    this.bassTop = this.trebleTop + 4 * sp + 7.5 * sp;
    this.height = this.bassTop + 4 * sp + 6 * sp;
    this.leftMargin = 4.5 * sp + ks.count * sp + 3.5 * sp;
    this.totalWidth = this.leftMargin + song.totalBeats * this.ppb + 12 * sp;

    this.container.innerHTML = '';
    const svg = el('svg', { class: 'score', width: '100%', height: this.height, viewBox: `0 0 ${this.container.clientWidth || 800} ${this.height}` });
    this.svg = svg;
    this.viewWidth = this.container.clientWidth || 800;
    svg.setAttribute('viewBox', `0 0 ${this.viewWidth} ${this.height}`);
    svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
    const scroll = el('g', { class: 'scroll' });
    this.scroll = scroll;
    svg.appendChild(scroll);

    // Portées
    for (const top of [this.trebleTop, this.bassTop]) {
      for (let i = 0; i < 5; i++) {
        scroll.appendChild(el('line', { class: 'staff-line', x1: 0, y1: top + i * sp, x2: this.totalWidth, y2: top + i * sp }));
      }
    }
    // Accolade / barre de début
    scroll.appendChild(el('line', { class: 'barline', x1: 1, y1: this.trebleTop, x2: 1, y2: this.bassTop + 4 * sp }));

    // Clés
    scroll.appendChild(el('text', { class: 'glyph', x: 0.6 * sp, y: this.trebleTop + 3 * sp, 'font-size': this.fontSize }, GLYPH.gClef));
    scroll.appendChild(el('text', { class: 'glyph', x: 0.6 * sp, y: this.bassTop + sp, 'font-size': this.fontSize }, GLYPH.fClef));

    // Armure
    const steps = ks.acc > 0 ? SHARP_STEPS : FLAT_STEPS;
    const accGlyph = ks.acc > 0 ? GLYPH.sharp : GLYPH.flat;
    for (let i = 0; i < ks.count; i++) {
      const x = 4.2 * sp + i * sp;
      scroll.appendChild(el('text', { class: 'glyph', x, y: this.yOfStep(steps[i], 'R'), 'font-size': this.fontSize }, accGlyph));
      scroll.appendChild(el('text', { class: 'glyph', x, y: this.yOfStep(steps[i] - 14, 'L'), 'font-size': this.fontSize }, accGlyph));
    }

    // Chiffrage de mesure
    const tsX = 4.5 * sp + ks.count * sp + 0.6 * sp;
    for (const top of [this.trebleTop, this.bassTop]) {
      scroll.appendChild(el('text', { class: 'glyph', x: tsX, y: top + sp, 'font-size': this.fontSize }, GLYPH.digits[song.timeSig[0]]));
      scroll.appendChild(el('text', { class: 'glyph', x: tsX, y: top + 3 * sp, 'font-size': this.fontSize }, GLYPH.digits[song.timeSig[1]]));
    }

    // Barres de mesure + numéros
    for (let m = 1; m <= song.measures; m++) {
      const x = this.barX(m);
      const cls = m === song.measures ? 'barline final' : 'barline';
      scroll.appendChild(el('line', { class: cls, x1: x, y1: this.trebleTop, x2: x, y2: this.bassTop + 4 * sp }));
      if (m === song.measures) {
        scroll.appendChild(el('line', { class: 'barline final thick', x1: x + 0.5 * sp, y1: this.trebleTop, x2: x + 0.5 * sp, y2: this.bassTop + 4 * sp }));
      }
      if (m < song.measures) {
        scroll.appendChild(el('text', { class: 'measure-number', x: x + 4, y: this.trebleTop - 2.2 * sp }, String(m + 1)));
      }
    }

    // Notes
    for (const hand of ['R', 'L']) {
      const active = this.hands.includes(hand);
      this._renderVoice(song.hands[hand], hand, active);
    }

    // Curseur
    const cursor = el('g', { class: 'cursor' });
    cursor.appendChild(el('rect', { x: -1.2 * sp, y: this.trebleTop - 3 * sp, width: 2.4 * sp, height: this.bassTop + 4 * sp - this.trebleTop + 6 * sp, rx: 6, class: 'cursor-band' }));
    cursor.appendChild(el('line', { x1: 0, y1: this.trebleTop - 3 * sp, x2: 0, y2: this.bassTop + 7 * sp, class: 'cursor-line' }));
    scroll.appendChild(cursor);
    this.cursor = cursor;
    this.container.appendChild(svg);
    this.setCursor(0);
  }

  _renderVoice(events, hand, active) {
    const sp = this.sp;
    const song = this.song;
    const bpm = song.beatsPerMeasure;
    const nhW = 1.18 * sp;
    let measureIdx = -1;
    let accState = {};
    const middleStep = hand === 'R' ? 34 : 22;
    const staffTop = hand === 'R' ? this.trebleTop : this.bassTop;
    const prevNoteYs = new Map(); // pour les liaisons : eventId -> {x, ys[], stemUp}

    for (const ev of events) {
      const m = Math.floor(ev.t / bpm + 1e-6);
      if (m !== measureIdx) { measureIdx = m; accState = {}; }
      const x = this.xOf(ev.t);
      const g = el('g', { class: `event ${active ? '' : 'ghost'} hand-${hand}`, 'data-event': ev.id });
      this.scroll.appendChild(g);
      this.eventEls.set(ev.id, g);

      if (ev.rest) {
        const glyph = ev.dur >= 4 ? GLYPH.restWhole : ev.dur >= 2 ? GLYPH.restHalf : ev.dur >= 1 ? GLYPH.restQuarter : ev.dur >= 0.5 ? GLYPH.rest8 : GLYPH.rest16;
        const y = ev.dur >= 4 ? staffTop + sp : staffTop + 2 * sp;
        g.appendChild(el('text', { class: 'glyph rest', x: x - 0.5 * sp, y, 'font-size': this.fontSize }, glyph));
        if (ev.dur === 1.5 || ev.dur === 3 || ev.dur === 0.75 || ev.dur === 6) {
          g.appendChild(el('text', { class: 'glyph rest', x: x + 0.8 * sp, y: staffTop + 1.5 * sp, 'font-size': this.fontSize }, GLYPH.dot));
        }
        continue;
      }

      const isWhole = ev.dur >= 4;
      const isHalf = !isWhole && ev.dur >= 2;
      const head = isWhole ? GLYPH.nhWhole : isHalf ? GLYPH.nhHalf : GLYPH.nhBlack;
      const dotted = [0.75, 1.5, 3, 6].includes(ev.dur);
      const steps = ev.notes.map(n => n.step);
      const avgStep = steps.reduce((a, b) => a + b, 0) / steps.length;
      const stemUp = avgStep < middleStep;
      const ys = ev.notes.map(n => this.yOfStep(n.step, hand));

      // Lignes supplémentaires
      const bottomStep = hand === 'R' ? TREBLE_BOTTOM_STEP : BASS_BOTTOM_STEP;
      const minStep = Math.min(...steps), maxStep = Math.max(...steps);
      for (let s = bottomStep - 2; s >= minStep; s -= 2) {
        g.appendChild(el('line', { class: 'ledger', x1: x - nhW * 0.9, x2: x + nhW * 0.9, y1: this.yOfStep(s, hand), y2: this.yOfStep(s, hand) }));
      }
      for (let s = bottomStep + 10; s <= maxStep; s += 2) {
        g.appendChild(el('line', { class: 'ledger', x1: x - nhW * 0.9, x2: x + nhW * 0.9, y1: this.yOfStep(s, hand), y2: this.yOfStep(s, hand) }));
      }

      // Hampe
      if (!isWhole) {
        const stemX = stemUp ? x + nhW / 2 - 0.6 : x - nhW / 2 + 0.6;
        const yLow = Math.max(...ys), yHigh = Math.min(...ys);
        const stemLen = 3.5 * sp;
        const y1 = stemUp ? yLow : yHigh;
        const y2 = stemUp ? yHigh - stemLen : yLow + stemLen;
        g.appendChild(el('line', { class: 'stem', x1: stemX, y1, x2: stemX, y2 }));
        if (ev.dur < 1) {
          const flag = ev.dur < 0.5 ? (stemUp ? GLYPH.flag16Up : GLYPH.flag16Down) : (stemUp ? GLYPH.flag8Up : GLYPH.flag8Down);
          g.appendChild(el('text', { class: 'glyph flag', x: stemX, y: y2, 'font-size': this.fontSize }, flag));
        }
      }

      // Têtes de note (+ altérations, points, noms)
      const noteGroups = [];
      ev.notes.forEach((n, i) => {
        const y = ys[i];
        const ng = el('g', { class: 'note', 'data-event': ev.id, 'data-index': i });
        // Altération
        const key = n.letter + n.octave;
        const current = key in accState ? accState[key] : (song.keySig.map[n.letter] || 0);
        if (n.acc !== current || n.explicitNatural) {
          const glyph = n.acc === 1 ? GLYPH.sharp : n.acc === -1 ? GLYPH.flat : GLYPH.natural;
          ng.appendChild(el('text', { class: 'glyph accidental', x: x - nhW / 2 - 0.25 * sp, y, 'font-size': this.fontSize, 'text-anchor': 'end' }, glyph));
          accState[key] = n.acc;
        }
        ng.appendChild(el('text', { class: 'glyph notehead', x: x - nhW / 2, y, 'font-size': this.fontSize }, head));
        if (dotted) {
          const onLine = ((n.step - bottomStep) % 2 + 2) % 2 === 0;
          ng.appendChild(el('text', { class: 'glyph dot', x: x + nhW / 2 + 0.3 * sp, y: onLine ? y - sp / 2 : y, 'font-size': this.fontSize }, GLYPH.dot));
        }
        if (this.showNames) {
          ng.appendChild(el('text', { class: `note-name ${isWhole || isHalf ? 'on-hollow' : 'on-black'}`, x, y: y + 0.36 * sp, 'text-anchor': 'middle', 'font-size': 0.78 * sp }, pitchNameFr(n)));
        }
        g.appendChild(ng);
        noteGroups.push(ng);
      });
      this.noteEls.set(ev.id, noteGroups);

      // Liaisons
      if (ev.tieEnd) {
        const prev = prevNoteYs.get('last');
        if (prev) {
          ev.notes.forEach((n, i) => {
            const y = ys[i];
            const x1 = prev.x + nhW / 2, x2 = x - nhW / 2;
            const bow = prev.stemUp ? 0.9 * sp : -0.9 * sp;
            g.appendChild(el('path', { class: 'tie', d: `M ${x1} ${y + bow * 0.3} Q ${(x1 + x2) / 2} ${y + bow} ${x2} ${y + bow * 0.3}` }));
          });
        }
      }
      prevNoteYs.set('last', { x, ys, stemUp });
    }
  }

  setCursor(beat) {
    if (!this.song) return;
    this.lastBeat = beat;
    const x = this.xOf(Math.max(0, beat));
    this.cursor.setAttribute('transform', `translate(${x},0)`);
    const anchorX = this.viewWidth * this.anchor;
    const maxT = Math.max(0, this.totalWidth - this.viewWidth);
    this.translate = Math.min(maxT, Math.max(0, x - anchorX));
    this.scroll.setAttribute('transform', `translate(${-this.translate},0)`);
  }

  resize() {
    if (!this.svg || !this.song) return;
    // Re-rendu complet (l'échelle dépend de la hauteur), en conservant l'état des notes.
    const states = new Map();
    for (const [id, groups] of this.noteEls) groups.forEach((ng, i) => {
      const st = ['hit', 'miss', 'active'].find(c => ng.classList.contains(c));
      if (st) states.set(id + ':' + i, st);
    });
    const beat = this.lastBeat || 0;
    this.render(this.song, { hands: this.hands, showNames: this.showNames });
    for (const [key, st] of states) { const [id, i] = key.split(':'); this.setNoteState(id, parseInt(i, 10), st); }
    this.setCursor(beat);
  }

  setNoteState(eventId, noteIndex, state) {
    const groups = this.noteEls.get(eventId);
    if (!groups || !groups[noteIndex]) return;
    const ng = groups[noteIndex];
    ng.classList.remove('active', 'hit', 'miss');
    if (state) ng.classList.add(state);
  }

  setEventState(eventId, state) {
    const groups = this.noteEls.get(eventId) || [];
    groups.forEach((_, i) => this.setNoteState(eventId, i, state));
  }

  resetStates() {
    for (const [id, groups] of this.noteEls) groups.forEach(ng => ng.classList.remove('active', 'hit', 'miss'));
  }
}
