// Moteur de quiz : l'appli pose une question (« Joue tous les Ré »), l'élève répond au piano.
// Une réponse est une liste d'items ; chaque item est une hauteur exacte ('C4'), une classe
// de hauteur ('D' = n'importe quel Ré) ou une liste d'alternatives (['C#', 'Db']).
import { parsePitch, LETTER_SEMI } from './music.js';

function matchItem(item, midi) {
  if (Array.isArray(item)) return item.some(i => matchItem(i, midi));
  if (typeof item === 'number') return item === midi;
  if (item === '*') return true;
  const m = /^([A-G])(#|b)?(\d)?$/.exec(item);
  if (!m) return false;
  const pc = (LETTER_SEMI[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + 12) % 12;
  if (m[3] === undefined) return ((midi % 12) + 12) % 12 === pc;
  return parsePitch(item).midi === midi;
}

export class Quiz {
  constructor({ keyboard, synth, onState }) {
    this.keyboard = keyboard;
    this.synth = synth;
    this.onState = onState || (() => {});
    this.questions = [];
    this.index = 0;
    this.pressed = new Set();
    this.finished = false;
    this.running = false;
  }

  load(questions) {
    this.questions = questions;
    this.index = 0;
    this.step = 0;
    this.stats = { correct: 0, wrong: 0 };
    this.finished = false;
    this.running = false;
    this.pressed.clear();
    this.keyboard.clear();
  }

  start() {
    this.running = true;
    this._show();
  }

  stop() { this.running = false; }
  pause() { this.running = false; this.onState({ type: 'pause' }); }
  toggle() { this.running ? this.pause() : (this.running = true, this._show()); }
  reset() { this.load(this.questions); }

  get current() { return this.questions[this.index]; }

  _show() {
    const q = this.current;
    if (!q) { this._finish(); return; }
    this.step = 0;
    this.pressed.clear();
    this.onState({ type: 'question', index: this.index, total: this.questions.length, question: q });
    this._expect();
  }

  _expect() {
    const q = this.current;
    if (!q) return;
    // Surlignage des touches attendues si la réponse est précise (hauteur exacte)
    const items = q.mode === 'chord' ? q.answer : [q.answer[this.step]];
    const exact = [];
    for (const it of items) {
      const list = Array.isArray(it) ? it : [it];
      for (const s of list) if (typeof s === 'string' && /\d$/.test(s)) exact.push(parsePitch(s).midi);
    }
    this.keyboard.setExpected(q.showKeys === false ? [] : exact);
  }

  noteOn(midi, velocity = 0.7) {
    this.pressed.add(midi);
    if (!this.running || this.finished) { this.keyboard.setPressed(midi, 'down'); return; }
    const q = this.current;
    if (!q) return;
    // Questions de nuance : la vélocité MIDI doit être forte (≥ 0,6) ou douce (≤ 0,4).
    if (q.velocity) {
      const okVel = q.velocity === 'loud' ? velocity >= 0.6 : velocity <= 0.4;
      if (!okVel) {
        this.stats.wrong++;
        this.keyboard.flash(midi, 'bad');
        this.onState({ type: 'wrong', midi, velocity: true, hint: q.velocity === 'loud' ? 'Plus fort !' : 'Plus doucement !' });
        return;
      }
    }
    if (q.mode === 'chord') {
      // Toutes les notes de l'accord doivent être enfoncées ensemble
      const ok = q.answer.every(item => [...this.pressed].some(p => matchItem(item, p)));
      const belongs = q.answer.some(item => matchItem(item, midi));
      if (!belongs) { this.stats.wrong++; this.keyboard.flash(midi, 'bad'); this.onState({ type: 'wrong', midi }); return; }
      this.keyboard.setPressed(midi, 'ok');
      if (ok && this.pressed.size >= q.answer.length) { this.stats.correct++; this.onState({ type: 'correct', midi }); this._advance(); }
      return;
    }
    const item = q.answer[this.step];
    if (matchItem(item, midi)) {
      this.keyboard.flash(midi, 'ok', 500);
      this.step++;
      this.onState({ type: 'correct', midi, step: this.step, total: q.answer.length });
      if (this.step >= q.answer.length) { this.stats.correct++; this._advance(); }
      else this._expect();
    } else {
      this.stats.wrong++;
      this.keyboard.flash(midi, 'bad');
      this.onState({ type: 'wrong', midi });
    }
  }

  noteOff(midi) {
    this.pressed.delete(midi);
    this.keyboard.release(midi);
  }

  _advance() {
    this.index++;
    setTimeout(() => { if (this.running) this._show(); }, 650);
  }

  _finish() {
    this.finished = true;
    this.running = false;
    this.keyboard.clear();
    const total = this.questions.length || 1;
    const accuracy = this.stats.correct / (this.stats.correct + this.stats.wrong || 1);
    const stars = this.stats.wrong === 0 ? 3 : this.stats.wrong <= total * 0.5 ? 2 : 1;
    this.onState({ type: 'finished', accuracy, stars, stats: { ...this.stats, total }, mode: 'quiz' });
  }
}
