// Clavier coloré : chaque touche blanche porte une « gommette » de la couleur de sa note, comme sur le vrai piano.
import { isWhite, infoOf, octaveOf } from './notes.js';

export class KidKeyboard {
  constructor(container, onNote, opts = {}) {
    this.container = container;
    this.onNote = onNote;
    this.showNames = opts.showNames ?? true;
    this.keys = new Map();
    this.pointers = new Map();
    this.setRange(opts.low ?? 60, opts.high ?? 72);
  }

  setRange(low, high) {
    while (!isWhite(low)) low--;
    while (!isWhite(high)) high++;
    if (low === this.low && high === this.high && this.wrap) return;
    this.low = low; this.high = high;
    this.render();
  }

  setShowNames(v) { this.showNames = v; this.render(); }

  render() {
    const c = this.container;
    c.innerHTML = '';
    this.keys.clear();
    let nWhite = 0;
    for (let m = this.low; m <= this.high; m++) if (isWhite(m)) nWhite++;
    const wrap = document.createElement('div');
    wrap.className = 'kkb';
    wrap.style.setProperty('--n', nWhite);
    let wi = 0;
    for (let m = this.low; m <= this.high; m++) {
      const white = isWhite(m);
      const k = document.createElement('div');
      k.className = white ? 'kkey white' : 'kkey black';
      k.dataset.midi = m;
      if (white) {
        const info = infoOf(m);
        k.style.left = `calc(${wi} * var(--w))`;
        k.style.setProperty('--c', info.color);
        k.style.setProperty('--cd', info.dark);
        k.style.setProperty('--ink', info.ink);
        const st = document.createElement('div');
        st.className = 'sticker';
        st.textContent = this.showNames ? info.name : '';
        if (octaveOf(m) !== 4) st.classList.add(octaveOf(m) < 4 ? 'low' : 'high');
        k.appendChild(st);
        wi++;
      } else {
        k.style.left = `calc(${wi} * var(--w) - var(--w) * 0.28)`;
      }
      wrap.appendChild(k);
      this.keys.set(m, k);
    }
    c.appendChild(wrap);
    this.wrap = wrap;

    const keyFromEvent = (e) => {
      const t = document.elementFromPoint(e.clientX, e.clientY);
      const k = t && t.closest('.kkey');
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
    for (const m of midis || []) { const k = this.keys.get(m); if (k) k.classList.add('expected'); }
  }

  setPressed(midi, state) {
    const k = this.keys.get(midi);
    if (!k) return;
    k.classList.remove('down', 'ok', 'bad', 'lit');
    if (state) k.classList.add(state);
  }

  release(midi) {
    const k = this.keys.get(midi);
    if (k) k.classList.remove('down', 'ok', 'bad', 'lit');
  }

  flash(midi, state, ms = 400) {
    this.setPressed(midi, state);
    setTimeout(() => { const k = this.keys.get(midi); if (k && k.classList.contains(state)) k.classList.remove(state); }, ms);
  }

  // Allume une touche (démonstration) pendant ms millisecondes.
  light(midi, ms = 500) { this.flash(midi, 'lit', ms); }

  clear() {
    for (const k of this.keys.values()) k.classList.remove('down', 'ok', 'bad', 'expected', 'lit');
  }
}
