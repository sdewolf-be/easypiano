// Moteur de jeu : fait avancer le curseur, attend / évalue les notes jouées,
// déclenche l'accompagnement et le métronome, calcule le score.
import { buildNoteGroups } from './music.js';

const EARLY_WINDOW_SEC = 0.18;  // avance tolérée (mode Jouer)
const LATE_WINDOW_SEC = 0.28;   // retard toléré (mode Jouer)
const LEARN_EARLY_BEATS = 1.0;  // en mode Apprendre, on peut anticiper jusqu'à un temps

export class Player {
  constructor({ renderer, keyboard, synth, onState }) {
    this.renderer = renderer;
    this.keyboard = keyboard;
    this.synth = synth;
    this.onState = onState || (() => {});
    this.mode = 'learn';   // learn | play | demo
    this.hands = 'RL';
    this.tempoFactor = 1;
    this.metronome = true;
    this.octaveTolerant = false;
    this.running = false;
    this.finished = false;
    this.song = null;
    this._raf = null;
  }

  get bpm() { return this.song ? this.song.tempo * this.tempoFactor : 80; }
  get beatsPerSec() { return this.bpm / 60; }

  load(song, opts = {}) {
    this.song = song;
    if (opts.hands) this.hands = opts.hands;
    if (opts.mode) this.mode = opts.mode;
    if (opts.tempoFactor) this.tempoFactor = opts.tempoFactor;
    this.reset();
  }

  reset() {
    this.stop();
    this.finished = false;
    const song = this.song;
    const activeHands = this.mode === 'demo' ? '' : this.hands;
    this.groups = buildNoteGroups(song, this.mode === 'demo' ? '' : this.hands);
    this.groupIdx = 0;
    this.totalNotes = this.groups.reduce((a, g) => a + g.notes.length, 0);
    this.stats = { hits: 0, misses: 0, wrong: 0 };
    // Notes jouées automatiquement (mains inactives, ou tout en mode Écouter)
    this.backing = [];
    for (const h of ['R', 'L']) {
      if (!activeHands.includes(h)) {
        for (const ev of song.hands[h]) if (!ev.rest && !ev.tieEnd) this.backing.push(ev);
      }
    }
    this.backing.sort((a, b) => a.t - b.t);
    this.backingIdx = 0;
    this.pos = this.mode === 'learn' ? 0 : -song.beatsPerMeasure;
    this.waiting = false;
    this.lastClickUnit = null;
    this.pressed = new Set();
    this.renderer.resetStates();
    this.keyboard.clear();
    this.renderer.setCursor(0);
    this.onState({ type: 'reset' });
    this._activateGroup();
  }

  _tieDurationBeats(ev, hand) {
    // Durée totale en incluant les notes liées suivantes
    let dur = ev.dur;
    const list = this.song.hands[hand];
    let i = list.indexOf(ev);
    while (list[i] && list[i].tieStart && list[i + 1] && list[i + 1].tieEnd) { dur += list[i + 1].dur; i++; }
    return dur;
  }

  _activateGroup() {
    while (this.groupIdx < this.groups.length && this.groups[this.groupIdx].notes.every(n => n.hit)) this.groupIdx++;
    const g = this.groups[this.groupIdx];
    if (g) {
      for (const n of g.notes) if (!n.hit) this.renderer.setNoteState(n.eventId, n.noteIndex, 'active');
      this.keyboard.setExpected(g.notes.filter(n => !n.hit).map(n => n.midi));
      this.onState({ type: 'expect', notes: g.notes.filter(n => !n.hit).map(n => n.midi) });
    } else {
      this.keyboard.setExpected([]);
    }
  }

  start() {
    if (this.running || this.finished) return;
    this.synth.ensure();
    this.running = true;
    this._lastTime = performance.now();
    this._raf = requestAnimationFrame((t) => this._tick(t));
    this.onState({ type: 'start' });
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this._raf);
    this.synth.allOff();
    this.onState({ type: 'pause' });
  }

  stop() {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this.synth.allOff();
  }

  toggle() { this.running ? this.pause() : this.start(); }

  setMode(mode) { this.mode = mode; this.reset(); }
  setHands(hands) { this.hands = hands; this.reset(); }
  setTempoFactor(f) { this.tempoFactor = f; }

  _tick(now) {
    if (!this.running) return;
    const dt = Math.min(0.1, (now - this._lastTime) / 1000);
    this._lastTime = now;
    const song = this.song;
    let newPos = this.pos + dt * this.beatsPerSec;

    if (this.mode === 'learn') {
      const g = this.groups[this.groupIdx];
      if (g && newPos >= g.t) {
        newPos = g.t;
        if (!this.waiting) { this.waiting = true; this.onState({ type: 'waiting', notes: g.notes.filter(n => !n.hit).map(n => n.midi) }); }
      }
    } else if (this.mode === 'play') {
      const lateBeats = LATE_WINDOW_SEC * this.beatsPerSec;
      let g = this.groups[this.groupIdx];
      while (g && g.t + lateBeats < newPos) {
        for (const n of g.notes) if (!n.hit) { this.stats.misses++; this.renderer.setNoteState(n.eventId, n.noteIndex, 'miss'); }
        this.groupIdx++;
        g = this.groups[this.groupIdx];
        this._activateGroup();
      }
    } else if (this.mode === 'demo') {
      // rien : tout est joué par l'accompagnement
    }

    // Métronome (décompte toujours audible, puis selon le réglage)
    const unit = 4 / song.timeSig[1];
    const unitIdx = Math.floor((newPos + 1e-6) / unit);
    if (unitIdx !== this.lastClickUnit && newPos < song.totalBeats) {
      this.lastClickUnit = unitIdx;
      const inCountIn = newPos < 0;
      if (inCountIn || this.metronome) {
        const accent = Math.abs(((newPos + 1e-6) % song.beatsPerMeasure + song.beatsPerMeasure) % song.beatsPerMeasure) < unit / 2;
        this.synth.click(accent);
      }
      if (inCountIn) this.onState({ type: 'countin', count: Math.ceil(-newPos / unit) });
      else if (this.pos < 0) this.onState({ type: 'countin', count: 0 });
    }

    // Accompagnement
    while (this.backingIdx < this.backing.length && this.backing[this.backingIdx].t <= newPos + 1e-6) {
      const ev = this.backing[this.backingIdx++];
      const dur = this._tieDurationBeats(ev, ev.hand) / this.beatsPerSec;
      for (const n of ev.notes) this.synth.playNote(n.midi, dur, ev.hand === 'L' ? 0.45 : 0.6);
      if (this.mode === 'demo') this.renderer.setEventState(ev.id, 'hit');
    }

    this.pos = newPos;
    this.renderer.setCursor(this.pos);
    this.onState({ type: 'tick', pos: this.pos });

    if (this.pos >= song.totalBeats + (this.mode === 'learn' ? 0.5 : 1.5)) {
      this._finish();
      return;
    }
    this._raf = requestAnimationFrame((t) => this._tick(t));
  }

  _finish() {
    this.running = false;
    this.finished = true;
    this.synth.allOff();
    const total = this.totalNotes || 1;
    const accuracy = this.mode === 'demo' ? 1 : this.stats.hits / total;
    const stars = this.mode === 'demo' ? 0 : accuracy >= 0.95 && this.stats.wrong <= total * 0.1 ? 3 : accuracy >= 0.75 ? 2 : accuracy >= 0.5 ? 1 : 0;
    this.onState({ type: 'finished', accuracy, stars, stats: { ...this.stats, total: this.totalNotes }, mode: this.mode });
  }

  _matches(expected, midi) {
    return expected === midi || (this.octaveTolerant && expected % 12 === midi % 12);
  }

  noteOn(midi, source) {
    this.pressed.add(midi);
    if (this.finished || this.mode === 'demo') { this.keyboard.setPressed(midi, 'down'); return; }
    let candidates = [];
    if (this.mode === 'learn') {
      const g = this.groups[this.groupIdx];
      if (g && (this.waiting || g.t - this.pos <= LEARN_EARLY_BEATS)) candidates.push(g);
    } else {
      const early = EARLY_WINDOW_SEC * this.beatsPerSec, late = LATE_WINDOW_SEC * this.beatsPerSec;
      for (let i = this.groupIdx; i < this.groups.length; i++) {
        const g = this.groups[i];
        if (g.t - this.pos > early) break;
        if (this.pos - g.t <= late) candidates.push(g);
      }
    }
    for (const g of candidates) {
      const n = g.notes.find(n => !n.hit && this._matches(n.midi, midi));
      if (n) {
        n.hit = true;
        this.stats.hits++;
        this.renderer.setNoteState(n.eventId, n.noteIndex, 'hit');
        this.keyboard.setPressed(midi, 'ok');
        if (g.notes.every(x => x.hit)) {
          if (g === this.groups[this.groupIdx]) {
            this.groupIdx++;
            if (this.mode === 'learn') { this.waiting = false; if (this.pos < g.t) { this.pos = g.t; this.renderer.setCursor(this.pos); } }
          }
          this._activateGroup();
        } else {
          this.keyboard.setExpected(g.notes.filter(x => !x.hit).map(x => x.midi));
        }
        this.onState({ type: 'hit', midi });
        if (!this.running && this.mode === 'learn' && !this.finished) this.start();
        return;
      }
    }
    if (!this.running) { this.keyboard.setPressed(midi, 'down'); return; }
    this.stats.wrong++;
    this.keyboard.setPressed(midi, 'bad');
    this.onState({ type: 'wrong', midi });
  }

  noteOff(midi) {
    this.pressed.delete(midi);
    this.keyboard.release(midi);
  }
}
