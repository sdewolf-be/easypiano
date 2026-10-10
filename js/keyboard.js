// Clavier de piano à l'écran : affiche les notes attendues / jouées et sert d'entrée tactile.
import { midiToNameFr } from './music.js';

const IS_BLACK = [false, true, false, true, false, false, true, false, true, false, true, false];

export class PianoKeyboard {
  constructor(container, onNote, opts = {}) {
    this.container = container;
    this.onNote = onNote;
    this.showNames = opts.showNames ?? true;
    this.keys = new Map();
    this.pointers = new Map();
    this.setRange(opts.low ?? 48, opts.high ?? 72);
  }

  setRange(low, high) {
    // Le clavier commence et finit toujours sur un Do
    while (low % 12 !== 0) low--;
    while (high % 12 !== 0) high++;
    if (high - low < 24) high = low + 24;
    this.low = low; this.high = high;
    this.render();
  }

  fitToSong(song) {
    this.setRange(Math.min(song.minMidi - 1, 60 - 12), Math.max(song.maxMidi + 1, 60 + 7));
  }

  render() {
    const c = this.container;
    c.innerHTML = '';
    this.keys.clear();
    const whites = [];
    for (let m = this.low; m <= this.high; m++) if (!IS_BLACK[m % 12]) whites.push(m);
    const wrap = document.createElement('div');
    wrap.className = 'kb';
    wrap.style.setProperty('--n', whites.length);
    let wi = 0;
    for (let m = this.low; m <= this.high; m++) {
      const black = IS_BLACK[m % 12];
      const k = document.createElement('div');
      k.className = black ? 'key black' : 'key white';
      k.dataset.midi = m;
      if (black) {
        k.style.left = `calc(${wi} * var(--w) - var(--w) * 0.3)`;
      } else {
        k.style.left = `calc(${wi} * var(--w))`;
        wi++;
        if (this.showNames) {
          const lbl = document.createElement('span');
          lbl.className = 'key-label' + (m % 12 === 0 ? ' is-c' : '');
          lbl.textContent = m % 12 === 0 ? `Do${Math.floor(m / 12) - 1}` : midiToNameFr(m);
          k.appendChild(lbl);
        }
      }
      wrap.appendChild(k);
      this.keys.set(m, k);
    }
    c.appendChild(wrap);
    this.wrap = wrap;

    const keyFromEvent = (e) => {
      const t = document.elementFromPoint(e.clientX, e.clientY);
      const k = t && t.closest('.key');
      return k ? parseInt(k.dataset.midi, 10) : null;
    };
    wrap.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const midi = keyFromEvent(e);
      if (midi === null) return;
      this.pointers.set(e.pointerId, midi);
      this.onNote({ type: 'on', midi, velocity: 0.8, source: 'screen' });
    });
    const release = (e) => {
      const midi = this.pointers.get(e.pointerId);
      if (midi === undefined) return;
      this.pointers.delete(e.pointerId);
      this.onNote({ type: 'off', midi, source: 'screen' });
    };
    wrap.addEventListener('pointerup', release);
    wrap.addEventListener('pointercancel', release);
    wrap.addEventListener('pointerleave', release);
    wrap.addEventListener('pointermove', (e) => {
      // Glissando : passer d'une touche à l'autre en glissant
      const prev = this.pointers.get(e.pointerId);
      if (prev === undefined) return;
      const midi = keyFromEvent(e);
      if (midi !== null && midi !== prev) {
        this.pointers.set(e.pointerId, midi);
        this.onNote({ type: 'off', midi: prev, source: 'screen' });
        this.onNote({ type: 'on', midi, velocity: 0.8, source: 'screen' });
      }
    });
    wrap.addEventListener('contextmenu', e => e.preventDefault());
  }

  setExpected(midis) {
    for (const k of this.keys.values()) k.classList.remove('expected');
    for (const m of midis) { const k = this.keys.get(m); if (k) k.classList.add('expected'); }
  }

  setPressed(midi, state) {
    const k = this.keys.get(midi);
    if (!k) return;
    k.classList.remove('down', 'ok', 'bad');
    if (state) k.classList.add(state);
  }

  release(midi) {
    const k = this.keys.get(midi);
    if (k) k.classList.remove('down', 'ok', 'bad');
  }

  flash(midi, state, ms = 350) {
    this.setPressed(midi, state);
    setTimeout(() => this.release(midi), ms);
  }

  clear() {
    for (const k of this.keys.values()) k.classList.remove('down', 'ok', 'bad', 'expected');
  }
}
