// Moteurs des activités junior. Chaque activité reçoit un contexte :
//   kb (clavier coloré), mascot (Piou), synth, sounds, confetti, stage (zone centrale),
//   tolerant() (accepter la note dans n'importe quelle octave), finish(result).
import { infoOf, nameOf, spokenName, sameNote, toMidi, rangeFor, pick, shuffle, isWhite } from './notes.js';
import { parseJuniorSong } from './songs.js';
import { Mascot } from './mascot.js';

const wait = (ms) => new Promise(r => setTimeout(r, ms));

export class Activity {
  constructor(def, ctx) {
    this.def = def; this.ctx = ctx;
    this.kb = ctx.kb; this.mascot = ctx.mascot; this.synth = ctx.synth; this.sounds = ctx.sounds; this.stage = ctx.stage;
    this.running = false; this.finished = false; this.timers = new Set(); this.errors = 0; this.busy = false;
    this.pressed = new Set();
  }
  // Les touches enfoncées couvrent-elles toutes les notes attendues (une touche distincte par note) ?
  chordCovered(targets) {
    const used = new Set();
    for (const t of targets) {
      const m = [...this.pressed].find(p => !used.has(p) && this.accepts(p, t));
      if (m === undefined) return false;
      used.add(m);
    }
    return true;
  }
  keysFor(midis) { return midis.map(m => this.keyFor(m)); }
  later(ms, fn) { const id = setTimeout(() => { this.timers.delete(id); if (this.running) fn(); }, ms); this.timers.add(id); return id; }
  async sleep(ms) { await wait(ms); return this.running; }
  // Piou parle, et on attend la fin de sa phrase (ou un court délai sans voix) avant d'enchaîner.
  async talk(text, opts = {}) { await this.mascot.say(text, opts); return this.running; }
  start() { this.running = true; }
  stop() { this.running = false; for (const t of this.timers) clearTimeout(t); this.timers.clear(); this.kb.clear(); this.mascot.hush(); }
  noteOn(midi) { /* par défaut : rien */ }
  noteOff(midi) { this.pressed.delete(midi); this.kb.release(midi); }
  accepts(played, expected) { return sameNote(played, expected, this.ctx.tolerant()); }
  // Touche à allumer : la note attendue ; si le clavier affiché ne la contient pas, l'octave la plus proche.
  keyFor(midi) { if (this.kb.keys.has(midi)) return midi; let m = midi; while (m < this.kb.low) m += 12; while (m > this.kb.high) m -= 12; return m; }
  showKey(midi) { this.kb.setExpected([this.keyFor(midi)]); }
  playNote(midi, dur = 0.6, when = null) { this.synth.playNote(midi, dur, 0.7, when); }
  stars(total) { const e = this.errors; return e === 0 ? 3 : e <= Math.max(1, Math.round(total / 3)) ? 2 : 1; }
  finish(stars, extra = {}) {
    if (this.finished) return;
    this.finished = true; this.running = false;
    this.kb.clear();
    this.ctx.finish({ stars, errors: this.errors, ...extra });
  }
  // Bulle d'accord : deux petites bulles collées (« les copains »)
  chordBubble(midis, { lyric = '', size = '', cls = '' } = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'nchord ' + size + ' ' + cls;
    const sorted = midis.slice().sort((a, b) => b - a);
    for (const m of sorted) { const b = this.bubble(m, { size: 'sm' }); b.classList.add('part'); wrap.appendChild(b); }
    if (lyric) { const l = document.createElement('span'); l.className = 'nlyric'; l.textContent = lyric; wrap.appendChild(l); }
    wrap.dataset.midi = midis[midis.length - 1];
    return wrap;
  }
  // Grosse bulle de note (cible, écho…)
  bubble(midi, { lyric = '', size = '', cls = '' } = {}) {
    const info = infoOf(midi);
    const b = document.createElement('div');
    b.className = 'nbubble ' + size + ' ' + cls;
    if (info) { b.style.setProperty('--c', info.color); b.style.setProperty('--cd', info.dark); b.style.setProperty('--ink', info.ink); }
    const showLyric = lyric && !(info && lyric === info.name && this.ctx.showNames());
    b.innerHTML = `<span class="nname">${this.ctx.showNames() && info ? info.name : ''}</span>${showLyric ? `<span class="nlyric">${lyric}</span>` : ''}`;
    b.dataset.midi = midi;
    return b;
  }
  progressDots(n, done) {
    return `<div class="dots">${Array.from({ length: n }, (_, i) => `<span class="dot ${i < done ? 'on' : ''}"></span>`).join('')}</div>`;
  }
}

// ---------- Découverte d'une note ----------
export class DiscoverActivity extends Activity {
  async start() {
    super.start();
    this.midi = toMidi(this.def.note);
    this.info = infoOf(this.midi);
    this.count = 0; this.goal = 3; this.phase = 'intro';
    this.kb.setRange(...rangeFor([this.midi]));
    const spoken = spokenName(this.midi, { size: true });
    this.stage.innerHTML = `<div class="stage-center"><div class="target"></div>${this.progressDots(this.goal, 0)}</div>`;
    const target = this.stage.querySelector('.target');
    target.appendChild(this.bubble(this.midi, { size: 'xl' }));
    this.showKey(this.midi);
    const isSized = /petit|grand/.test(spoken);
    const intro = isSized
      ? `Voici ${spoken} ! Il est ${this.info.colorName}, comme l’autre ${this.info.name}. Écoute…`
      : `Voici ${this.info.name} ! ${this.info.name}, c’est la touche ${this.info.colorFem}. Écoute…`;
    if (!await this.talk(intro, { mood: 'think' })) return;
    if (!await this.sleep(300)) return;
    for (let i = 0; i < 3 && this.running; i++) {
      this.kb.light(this.keyFor(this.midi), 450);
      this.playNote(this.midi, 0.6);
      target.firstChild.classList.add('pulse'); setTimeout(() => target.firstChild.classList.remove('pulse'), 450);
      if (!await this.sleep(700)) return;
    }
    this.phase = 'play';
    this.showKey(this.midi);
    this.mascot.say(`À toi ! Appuie sur ${this.info.name}, la touche ${this.info.colorFem}.`, { mood: 'happy' });
  }
  noteOn(midi) {
    if (!this.running || this.phase !== 'play') { this.kb.setPressed(midi, 'down'); return; }
    if (this.accepts(midi, this.midi)) {
      this.count++;
      this.kb.flash(this.keyFor(this.midi), 'ok', 500);
      this.stage.querySelector('.dots').outerHTML = this.progressDots(this.goal, this.count);
      const b = this.stage.querySelector('.nbubble'); b.classList.add('pulse'); setTimeout(() => b.classList.remove('pulse'), 450);
      if (this.count >= this.goal) {
        this.mascot.say(`${Mascot.cheer()} Tu connais ${this.info.name} !`, { mood: 'happy' });
        this.sounds.success();
        this.later(1400, () => this.finish(3));
      } else {
        this.mascot.say(this.count === 1 ? `${Mascot.cheer()} Encore une fois !` : `${Mascot.cheer()} Une dernière fois !`, { mood: 'happy' });
        this.showKey(this.midi);
      }
    } else {
      this.kb.flash(midi, 'bad', 400);
      this.errors++;
      this.sounds.oops();
      const played = infoOf(midi);
      this.mascot.say(played ? `${Mascot.oops()} Ça, c’est ${played.name}. Cherche la touche ${this.info.colorFem} !` : `${Mascot.oops()} Cherche la touche ${this.info.colorFem} !`, { mood: 'oops' });
      this.showKey(this.midi);
    }
  }
}

// ---------- Trouve la note ----------
export class FindActivity extends Activity {
  start() {
    super.start();
    this.pool = this.def.notes.map(toMidi);
    this.total = this.def.count || 6;
    this.byColor = this.def.mode === 'color';
    this.k = 0; this.wrongHere = 0;
    this.kb.setRange(...rangeFor(this.pool));
    this.stage.innerHTML = `<div class="stage-center"><div class="target"></div>${this.progressDots(this.total, 0)}</div>`;
    this.talk(this.byColor ? 'On joue aux couleurs ! Appuie sur la touche de la couleur que je te montre.' : 'Retrouve les notes que je te demande !', { mood: 'think' })
      .then(ok => { if (ok) this.later(300, () => this.next()); });
  }
  next() {
    let m; do { m = pick(this.pool); } while (m === this.target && this.pool.length > 1);
    this.target = m; this.wrongHere = 0;
    const info = infoOf(m);
    const t = this.stage.querySelector('.target');
    t.innerHTML = '';
    const b = this.bubble(m, { size: 'xl' });
    if (this.byColor) b.querySelector('.nname').textContent = '';
    t.appendChild(b);
    this.kb.setExpected([]);
    const sized = spokenName(m, { size: true });
    const text = this.byColor
      ? `Appuie sur la touche ${info.colorFem} !`
      : (this.def.exact && /petit|grand/.test(sized) ? `Appuie sur ${sized} !` : `Appuie sur ${info.name}, la touche ${info.colorFem} !`);
    this.mascot.say(text, { mood: 'think' });
  }
  noteOn(midi) {
    if (!this.running || this.target == null || this.busy) { this.kb.setPressed(midi, 'down'); return; }
    const ok = this.def.exact ? midi === this.target : this.accepts(midi, this.target);
    if (ok) {
      this.busy = true;
      this.k++;
      this.kb.flash(this.keyFor(this.target), 'ok', 500);
      this.stage.querySelector('.dots').outerHTML = this.progressDots(this.total, this.k);
      const b = this.stage.querySelector('.nbubble'); b.classList.add('pulse');
      this.sounds.pop();
      if (this.k >= this.total) {
        this.mascot.say(`${Mascot.cheer()} Tu as tout trouvé !`, { mood: 'happy' });
        this.sounds.success();
        this.later(1500, () => this.finish(this.stars(this.total)));
      } else {
        this.mascot.say(Mascot.cheer(), { mood: 'happy' });
        this.later(1000, () => { this.busy = false; this.next(); });
      }
    } else {
      this.errors++; this.wrongHere++;
      this.kb.flash(midi, 'bad', 400);
      this.sounds.oops();
      const info = infoOf(this.target), played = infoOf(midi);
      const tip = this.byColor ? `Cherche la touche ${info.colorFem}.` : `Cherche ${info.name}, la touche ${info.colorFem}.`;
      this.mascot.say(played && !this.byColor ? `${Mascot.oops()} Ça, c’est ${played.name}. ${tip}` : `${Mascot.oops()} ${tip}`, { mood: 'oops' });
      if (this.wrongHere >= 1) this.showKey(this.target);
    }
  }
}

// ---------- Écho : répète après Piou ----------
export class EchoActivity extends Activity {
  start() {
    super.start();
    this.pool = this.def.notes.map(toMidi);
    this.rounds = this.def.rounds || 4; this.len = this.def.length || 2;
    this.round = 0; this.step = 0; this.seq = []; this.listening = false;
    this.kb.setRange(...rangeFor(this.pool));
    this.stage.innerHTML = `<div class="stage-center"><div class="seq"></div>${this.progressDots(this.rounds, 0)}<button class="kbtn replay" type="button">🔊 Encore</button></div>`;
    this.stage.querySelector('.replay').addEventListener('click', () => { if (this.listening) this.demo(); });
    this.talk('Écoute bien, puis rejoue la même chose que moi !', { mood: 'think' }).then(ok => { if (ok) this.later(300, () => this.nextRound()); });
  }
  nextRound() {
    this.seq = [];
    for (let i = 0; i < this.len; i++) { let m; do { m = pick(this.pool); } while (m === this.seq[i - 1] && this.pool.length > 1); this.seq.push(m); }
    this.step = 0;
    this.renderSeq();
    this.demo();
  }
  renderSeq() {
    const s = this.stage.querySelector('.seq');
    s.innerHTML = '';
    this.seq.forEach((m, i) => { const b = this.bubble(m, { size: 'lg', cls: i < this.step ? 'done' : 'hidden-note' }); s.appendChild(b); });
  }
  async demo() {
    this.listening = false; this.busy = true;
    this.kb.setExpected([]);
    const bubbles = this.stage.querySelectorAll('.nbubble');
    bubbles.forEach(b => b.classList.add('hidden-note'));
    if (!await this.talk('Écoute…', { mood: 'sing' })) return;
    if (!await this.sleep(300)) return;
    for (let i = 0; i < this.seq.length; i++) {
      const m = this.seq[i];
      bubbles[i]?.classList.remove('hidden-note'); bubbles[i]?.classList.add('pulse');
      this.kb.light(this.keyFor(m), 550);
      this.playNote(m, 0.6);
      if (!await this.sleep(750)) return;
      bubbles[i]?.classList.remove('pulse');
    }
    this.step = 0;
    this.renderSeq();
    this.stage.querySelectorAll('.nbubble').forEach(b => b.classList.add('hidden-note'));
    this.listening = true; this.busy = false;
    this.mascot.say('À toi !', { mood: 'happy' });
  }
  noteOn(midi) {
    if (!this.running || !this.listening || this.busy) { this.kb.setPressed(midi, 'down'); return; }
    const expected = this.seq[this.step];
    if (this.accepts(midi, expected)) {
      this.kb.flash(this.keyFor(expected), 'ok', 400);
      const b = this.stage.querySelectorAll('.nbubble')[this.step];
      if (b) { b.classList.remove('hidden-note'); b.classList.add('done'); }
      this.step++;
      if (this.step >= this.seq.length) {
        this.busy = true; this.round++;
        this.stage.querySelector('.dots').outerHTML = this.progressDots(this.rounds, this.round);
        this.sounds.pop();
        if (this.round >= this.rounds) {
          this.mascot.say(`${Mascot.cheer()} Tu as de très bonnes oreilles !`, { mood: 'happy' });
          this.sounds.success();
          this.later(1500, () => this.finish(this.stars(this.rounds * this.len)));
        } else {
          this.mascot.say(Mascot.cheer(), { mood: 'happy' });
          this.later(1100, () => { this.busy = false; this.nextRound(); });
        }
      }
    } else {
      this.errors++;
      this.kb.flash(midi, 'bad', 400);
      this.sounds.oops();
      this.listening = false; this.busy = true;
      this.talk(`${Mascot.oops()} Écoute encore.`, { mood: 'oops' }).then(ok => { if (ok) { this.busy = false; this.demo(); } });
    }
  }
}

// ---------- Oreille : quelle note as-tu entendue ? ----------
export class EarActivity extends Activity {
  start() {
    super.start();
    this.pool = this.def.notes.map(toMidi);
    this.rounds = this.def.rounds || 5; this.choices = Math.min(this.def.choices || 2, this.pool.length);
    this.round = 0; this.wrongHere = 0; this.target = null; this.listening = false;
    this.kb.setRange(...rangeFor(this.pool));
    this.stage.innerHTML = `<div class="stage-center"><div class="seq choices"></div>${this.progressDots(this.rounds, 0)}<button class="kbtn replay" type="button">🔊 Réécouter</button></div>`;
    this.stage.querySelector('.replay').addEventListener('click', () => { if (this.listening) this.playTarget(); });
    this.talk('Ferme les yeux et écoute. Puis appuie sur la note que tu as entendue !', { mood: 'think' }).then(ok => { if (ok) this.later(300, () => this.nextRound()); });
  }
  nextRound() {
    this.target = pick(this.pool); this.wrongHere = 0;
    const others = shuffle(this.pool.filter(m => m !== this.target)).slice(0, this.choices - 1);
    this.options = shuffle([this.target, ...others]).sort((a, b) => a - b);
    const s = this.stage.querySelector('.seq');
    s.innerHTML = '';
    this.options.forEach(m => s.appendChild(this.bubble(m, { size: 'lg' })));
    this.kb.setExpected([]);
    this.listening = true;
    this.playTarget();
  }
  // Joue la note à trouver : deux fois, longue et forte, sans parole par-dessus
  // (sur iPad, la voix de synthèse baisse le son de l'appli).
  async playTarget() {
    this.mascot.hush();
    this.mascot.say('Écoute…', { mood: 'sing', speak: false });
    const btn = this.stage.querySelector('.replay');
    btn?.classList.add('playing');
    for (let i = 0; i < 2; i++) {
      this.synth.playNote(this.target, 1.6, 1.0);
      if (!await this.sleep(1700)) return;
    }
    btn?.classList.remove('playing');
    if (this.listening) this.mascot.say('C’était laquelle ?', { mood: 'think', speak: this.wrongHere === 0 && (this.prompts = (this.prompts || 0) + 1) <= 2 });
  }
  noteOn(midi) {
    if (!this.running || !this.listening || this.busy) { this.kb.setPressed(midi, 'down'); return; }
    if (this.accepts(midi, this.target)) {
      this.busy = true; this.round++;
      this.kb.flash(this.keyFor(this.target), 'ok', 500);
      this.stage.querySelectorAll('.nbubble').forEach(b => { if (+b.dataset.midi === this.target) b.classList.add('pulse'); else b.classList.add('faded'); });
      this.stage.querySelector('.dots').outerHTML = this.progressDots(this.rounds, this.round);
      this.sounds.pop();
      if (this.round >= this.rounds) {
        this.mascot.say(`${Mascot.cheer()} Quelles grandes oreilles !`, { mood: 'happy' });
        this.sounds.success();
        this.later(1500, () => this.finish(this.stars(this.rounds)));
      } else {
        this.mascot.say(`${Mascot.cheer()} C’était ${nameOf(this.target)} !`, { mood: 'happy' });
        this.later(1400, () => { this.busy = false; this.nextRound(); });
      }
    } else {
      this.errors++; this.wrongHere++;
      this.kb.flash(midi, 'bad', 400);
      this.sounds.oops();
      if (this.wrongHere >= 2) this.showKey(this.target);
      this.talk(`${Mascot.oops()} Écoute encore.`, { mood: 'oops' }).then(ok => { if (ok && this.listening) this.playTarget(); });
    }
  }
}

// ---------- Mélodie : jouer une chanson note après note ----------
export class MelodyActivity extends Activity {
  start() {
    super.start();
    this.song = parseJuniorSong(this.def.song);
    this.notes = this.song.notes;
    this.i = 0; this.demoing = false; this.wrongHere = 0;
    this.kb.setRange(...rangeFor(this.notes.map(n => n.midi)));
    this.stage.innerHTML = `<div class="melody"><div class="phrases"></div></div>
      <div class="melody-bar"><button class="kbtn demo" type="button">🔊 Piou joue</button><button class="kbtn restart" type="button">↺ Du début</button></div>`;
    const ph = this.stage.querySelector('.phrases');
    this.bubbles = [];
    let cur = null, curIdx = -1;
    this.notes.forEach((n, k) => {
      if (n.phrase !== curIdx) { cur = document.createElement('div'); cur.className = 'phrase'; cur.dataset.phrase = n.phrase; ph.appendChild(cur); curIdx = n.phrase; }
      const b = n.chord ? this.chordBubble(n.midis, { lyric: n.lyric, size: 'md' }) : this.bubble(n.midi, { lyric: n.lyric, size: 'md' });
      b.dataset.k = k;
      cur.appendChild(b);
      this.bubbles.push(b);
    });
    this.stage.querySelector('.demo').addEventListener('click', () => this.demo());
    this.stage.querySelector('.restart').addEventListener('click', () => this.restart());
    this.talk(`On joue « ${this.song.title} » ! Suis les bulles de couleur.`, { mood: 'think' }).then(ok => { if (ok) this.expect(); });
  }
  restart() {
    if (this.demoing) return;
    this.i = 0; this.wrongHere = 0;
    this.bubbles.forEach(b => b.classList.remove('done', 'current', 'shake'));
    this.expect();
  }
  expect() {
    if (!this.running) return;
    this.bubbles.forEach((b, k) => { b.classList.toggle('current', k === this.i); b.classList.toggle('done', k < this.i); });
    const b = this.bubbles[this.i];
    if (b) { this.scrollToBubble(b); this.kb.setExpected(this.keysFor(this.notes[this.i].midis)); }
  }
  // Fait défiler la zone de jeu (et elle seule) pour centrer la bulle courante.
  scrollToBubble(b) {
    const stage = this.stage;
    const sr = stage.getBoundingClientRect(), br = b.getBoundingClientRect();
    const delta = (br.top + br.height / 2) - (sr.top + sr.height / 2);
    if (Math.abs(delta) > 8) stage.scrollTo({ top: stage.scrollTop + delta, behavior: 'smooth' });
  }
  async demo() {
    if (this.demoing) return;
    this.demoing = true; this.busy = true;
    this.kb.setExpected([]);
    if (!await this.talk('Écoute, je te la joue !', { mood: 'sing' })) return;
    const secPerBeat = 60 / this.song.tempo;
    const t0 = this.synth.now + 0.3;
    for (const n of this.notes) for (const m of n.midis) this.synth.playNote(m, n.dur * secPerBeat * 0.9, 0.7, t0 + n.t * secPerBeat);
    const startWall = performance.now() + 300;
    for (let k = 0; k < this.notes.length && this.running && this.demoing; k++) {
      const n = this.notes[k];
      const delay = startWall + n.t * secPerBeat * 1000 - performance.now();
      if (delay > 0 && !await this.sleep(delay)) return;
      if (!this.demoing) return;
      this.bubbles.forEach(b => b.classList.remove('current'));
      this.bubbles[k].classList.add('current');
      this.scrollToBubble(this.bubbles[k]);
      for (const m of n.midis) this.kb.light(this.keyFor(m), Math.max(200, n.dur * secPerBeat * 900));
    }
    await this.sleep(600);
    this.demoing = false; this.busy = false;
    this.mascot.say('À toi !', { mood: 'happy' });
    this.expect();
  }
  stop() { this.demoing = false; this.synth.allOff(); super.stop(); }
  noteOn(midi) {
    if (!this.running || this.busy || this.i >= this.notes.length) { this.kb.setPressed(midi, 'down'); return; }
    const n = this.notes[this.i];
    this.pressed.add(midi);
    if (n.chord) {
      // Accord : on attend que toutes les notes soient enfoncées ensemble.
      if (!n.midis.some(t => this.accepts(midi, t))) return this.wrongNote(midi, n);
      if (!this.chordCovered(n.midis)) { this.kb.setPressed(midi, 'ok'); return; }
    } else if (!this.accepts(midi, n.midi)) return this.wrongNote(midi, n);
    for (const m of n.midis) this.kb.flash(this.keyFor(m), 'ok', 350);
    this.bubbles[this.i].classList.add('done');
    this.bubbles[this.i].classList.remove('current');
    this.i++; this.wrongHere = 0;
    if (this.i >= this.notes.length) {
      this.busy = true;
      this.kb.setExpected([]);
      this.mascot.say(`${Mascot.cheer()} Tu as joué « ${this.song.title} » !`, { mood: 'party' });
      this.sounds.fanfare();
      this.ctx.confetti.burst(120);
      this.later(2200, () => this.finish(this.stars(this.notes.length)));
    } else {
      if (this.notes[this.i].phrase !== n.phrase) this.mascot.say(Mascot.cheer(), { mood: 'happy', speak: false });
      this.expect();
    }
  }
  wrongNote(midi, n) {
    this.errors++; this.wrongHere++;
    this.kb.flash(midi, 'bad', 350);
    const b = this.bubbles[this.i]; b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
    const info = infoOf(n.midi), played = infoOf(midi);
    const names = n.chord ? n.midis.map(m => infoOf(m).name).join(' et ') : info.name;
    if (n.chord) this.mascot.say(`${Mascot.oops()} C’est ${names}, en même temps.`, { mood: 'oops', speak: this.wrongHere <= 2 });
    else if (this.wrongHere === 1) this.mascot.say(`${Mascot.oops()} C’est ${info.name}, la touche ${info.colorFem}.`, { mood: 'oops', speak: false });
    else this.mascot.say(played ? `Ça, c’est ${played.name}. Cherche ${info.name}, la touche ${info.colorFem}.` : `Cherche ${info.name}, la touche ${info.colorFem}.`, { mood: 'oops', speak: this.wrongHere === 2 });
    this.sounds.oops();
    this.kb.setExpected(this.keysFor(n.midis));
  }
}

// ---------- La fête de fin de cours ----------
export class PartyActivity extends Activity {
  start() {
    super.start();
    this.kb.setRange(55, 72);
    const stickers = this.ctx.stickers();
    this.stage.innerHTML = `<div class="stage-center party">
      <div class="diploma"><div class="diploma-title">🏆 Bravo !</div><div class="diploma-text">Tu as fini tout le cours de piano !</div>
      <div class="diploma-stickers">${stickers.map(s => `<span>${s}</span>`).join('')}</div></div>
      <button class="kbtn play-anniv" type="button">🎉 Rejouer Joyeux anniversaire</button></div>`;
    this.stage.querySelector('.play-anniv').addEventListener('click', () => this.ctx.openSong('anniv'));
    this.mascot.say('Hourra ! Tu as fini tout le cours ! Tu es une vraie pianiste !', { mood: 'party' });
    this.sounds.fanfare();
    this.ctx.confetti.burst(160);
    let k = 0;
    const rain = () => { if (!this.running) return; this.ctx.confetti.rain(30); if (k++ < 8) this.later(900, rain); };
    this.later(900, rain);
    this.ctx.markDone(3);
  }
  noteOn(midi) { this.kb.flash(midi, 'ok', 300); if (isWhite(midi)) this.ctx.confetti.burst(12, { spread: 0.6 }); }
}

// ---------- Les copains : deux notes en même temps ----------
export class PairActivity extends Activity {
  async start() {
    super.start();
    this.midis = this.def.notes.map(toMidi);
    this.count = 0; this.goal = 3; this.phase = 'intro';
    this.kb.setRange(...rangeFor(this.midis));
    this.stage.innerHTML = `<div class="stage-center"><div class="target"></div>${this.progressDots(this.goal, 0)}</div>`;
    const target = this.stage.querySelector('.target');
    target.appendChild(this.chordBubble(this.midis, { size: 'xl' }));
    this.kb.setExpected(this.keysFor(this.midis));
    const names = this.midis.map(m => infoOf(m).name);
    const twoHands = this.def.hands;
    const intro = twoHands
      ? `Voici les deux mains ! La main gauche joue le petit ${names[0]}, la main droite joue ${names[1]}. En même temps ! Écoute…`
      : `Voici deux copains : ${names[0]} et ${names[1]} ! On les joue en même temps. Écoute…`;
    if (!await this.talk(intro, { mood: 'think' })) return;
    if (!await this.sleep(300)) return;
    for (let i = 0; i < 2 && this.running; i++) {
      for (const m of this.midis) { this.kb.light(this.keyFor(m), 700); this.playNote(m, 0.9); }
      target.firstChild.classList.add('pulse'); setTimeout(() => target.firstChild.classList.remove('pulse'), 450);
      if (!await this.sleep(1100)) return;
    }
    this.phase = 'play';
    this.kb.setExpected(this.keysFor(this.midis));
    this.mascot.say(twoHands ? 'À toi ! Les deux mains ensemble.' : `À toi ! ${names[0]} et ${names[1]} ensemble.`, { mood: 'happy' });
  }
  noteOn(midi) {
    this.pressed.add(midi);
    if (!this.running || this.phase !== 'play' || this.busy) { this.kb.setPressed(midi, 'down'); return; }
    if (!this.midis.some(t => this.accepts(midi, t))) {
      this.errors++;
      this.kb.flash(midi, 'bad', 400);
      this.sounds.oops();
      this.mascot.say(`${Mascot.oops()} Regarde les deux touches qui brillent.`, { mood: 'oops' });
      return;
    }
    if (!this.chordCovered(this.midis)) { this.kb.setPressed(midi, 'ok'); if (this.count === 0 && !this.hinted) { this.hinted = true; this.mascot.say('Et l’autre en même temps !', { mood: 'think' }); } return; }
    this.count++; this.busy = true;
    for (const m of this.midis) this.kb.flash(this.keyFor(m), 'ok', 500);
    this.stage.querySelector('.dots').outerHTML = this.progressDots(this.goal, this.count);
    const b = this.stage.querySelector('.nchord'); b.classList.add('pulse'); setTimeout(() => b.classList.remove('pulse'), 450);
    this.sounds.pop();
    if (this.count >= this.goal) {
      this.mascot.say(`${Mascot.cheer()} Les deux copains ensemble !`, { mood: 'happy' });
      this.sounds.success();
      this.later(1400, () => this.finish(3));
    } else {
      this.mascot.say(this.count === 1 ? `${Mascot.cheer()} Encore une fois !` : `${Mascot.cheer()} Une dernière fois !`, { mood: 'happy' });
      this.later(900, () => { this.busy = false; this.kb.setExpected(this.keysFor(this.midis)); });
    }
  }
}

// ---------- Tape avec Piou : frapper n'importe quelle touche sur la pulsation ----------
export class BeatActivity extends Activity {
  async start() {
    super.start();
    this.song = parseJuniorSong(this.def.song);
    this.kb.setRange(...rangeFor(this.song.notes.map(n => n.midi)));
    this.beats = Math.ceil(this.song.totalBeats);
    this.hits = 0; this.taps = []; this.started = false;
    this.stage.innerHTML = `<div class="stage-center beat"><div class="pulse-ring"><div class="pulse-core">👏</div></div>
      <div class="beat-dots">${[0, 1, 2, 3].map(() => '<i></i>').join('')}</div><div class="beat-score"></div></div>`;
    this.ring = this.stage.querySelector('.pulse-ring');
    this.ring.addEventListener('pointerdown', (e) => { e.preventDefault(); this.tap('screen'); });
    if (!await this.talk('On tape dans les mains avec la musique ! Appuie sur une touche à chaque fois que le rond grandit.', { mood: 'think' })) return;
    if (!await this.sleep(300)) return;
    this.play();
  }
  async play() {
    const secPerBeat = 60 / (this.song.tempo * 0.85);
    const bpm = this.song.timeSig ? this.song.timeSig[0] : 4;
    this.mascot.say('1, 2, 3, 4… c’est parti !', { mood: 'sing', speak: false });
    const t0 = this.synth.now + 0.2;
    const wall0 = performance.now() + 200;
    // Décompte d'une mesure (clics), puis la chanson avec un clic par temps.
    for (let b = 0; b < 4; b++) this.synth.click(b === 0, t0 + b * secPerBeat);
    const songStart = t0 + 4 * secPerBeat;
    for (const n of this.song.notes) this.synth.playNote(n.midi, n.dur * secPerBeat * 0.9, 0.6, songStart + n.t * secPerBeat);
    this.beatTimes = [];
    for (let b = 0; b < this.beats; b++) { this.beatTimes.push(wall0 + (4 + b) * secPerBeat * 1000); this.synth.click(b % 4 === 0, songStart + b * secPerBeat); }
    this.started = true; this.hitBeats = new Set();
    const dots = this.stage.querySelectorAll('.beat-dots i');
    for (let b = -4; b < this.beats && this.running; b++) {
      const at = wall0 + (4 + b) * secPerBeat * 1000;
      const delay = at - performance.now();
      if (delay > 0 && !await this.sleep(delay)) return;
      this.ring.classList.remove('beat'); void this.ring.offsetWidth; this.ring.classList.add('beat');
      dots.forEach((d, k) => d.classList.toggle('on', k === ((b % 4) + 4) % 4));
      if (b < 0) this.stage.querySelector('.pulse-core').textContent = String(b + 5);
      else this.stage.querySelector('.pulse-core').textContent = '👏';
    }
    if (!await this.sleep(700)) return;
    this.started = false;
    const ratio = this.hitBeats.size / this.beats;
    const stars = ratio >= 0.75 ? 3 : ratio >= 0.45 ? 2 : 1;
    this.mascot.say(stars === 3 ? `${Mascot.cheer()} Tu as le rythme dans la peau !` : `${Mascot.cheer()} Tu as tapé ${this.hitBeats.size} fois en rythme.`, { mood: 'party' });
    this.sounds.success();
    this.later(1800, () => this.finish(stars));
  }
  tap(source) {
    if (!this.running || !this.started) return;
    const now = performance.now();
    this.synth.click(true);
    this.ring.classList.add('tapped'); setTimeout(() => this.ring.classList.remove('tapped'), 150);
    let best = -1, bestD = 1e9;
    this.beatTimes.forEach((t, k) => { const d = Math.abs(t - now); if (d < bestD) { bestD = d; best = k; } });
    if (best >= 0 && bestD <= 280 && !this.hitBeats.has(best)) {
      this.hitBeats.add(best);
      this.stage.querySelector('.beat-score').textContent = '⭐'.repeat(Math.min(10, Math.floor(this.hitBeats.size / 4)));
    }
  }
  noteOn(midi) { this.kb.flash(midi, 'ok', 150); this.tap('key'); }
}

// ---------- Joue avec Piou : la chanson avance toute seule, très tolérante ----------
export class PlayAlongActivity extends Activity {
  async start() {
    super.start();
    this.song = parseJuniorSong(this.def.song);
    this.notes = this.song.notes;
    this.kb.setRange(...rangeFor(this.notes.map(n => n.midi)));
    this.stage.innerHTML = `<div class="melody"><div class="phrases"></div></div><div class="melody-bar"><div class="beat-dots">${[0, 1, 2, 3].map(() => '<i></i>').join('')}</div></div>`;
    const ph = this.stage.querySelector('.phrases');
    this.bubbles = [];
    let cur = null, curIdx = -1;
    this.notes.forEach((n, k) => {
      if (n.phrase !== curIdx) { cur = document.createElement('div'); cur.className = 'phrase'; ph.appendChild(cur); curIdx = n.phrase; }
      const b = this.bubble(n.midi, { lyric: n.lyric, size: 'md' }); cur.appendChild(b); this.bubbles.push(b);
    });
    this.hits = 0; this.i = -1; this.window = 0.7;
    if (!await this.talk('Cette fois, la chanson avance toute seule. Joue chaque note quand sa bulle brille. Si tu la rates, je la joue pour toi !', { mood: 'think' })) return;
    if (!await this.sleep(300)) return;
    this.play();
  }
  async play() {
    const secPerBeat = 60 / (this.song.tempo * 0.7);
    const t0 = this.synth.now + 0.2;
    const wall0 = performance.now() + 200;
    for (let b = 0; b < 4; b++) this.synth.click(b === 0, t0 + b * secPerBeat);
    const songStart = t0 + 4 * secPerBeat;
    const songWall = wall0 + 4 * secPerBeat * 1000;
    const totalBeats = Math.ceil(this.song.totalBeats);
    for (let b = 0; b < totalBeats; b++) this.synth.click(b % 4 === 0, songStart + b * secPerBeat);
    this.songWall = songWall; this.secPerBeat = secPerBeat;
    this.noteWall = this.notes.map(n => songWall + n.t * secPerBeat * 1000);
    this.state = this.notes.map(() => 'wait');
    const dots = this.stage.querySelectorAll('.beat-dots i');
    this.mascot.say('1, 2, 3, 4…', { mood: 'sing', speak: false });
    for (let b = 0; b < 4 && this.running; b++) { const d = wall0 + b * secPerBeat * 1000 - performance.now(); if (d > 0 && !await this.sleep(d)) return; dots.forEach((x, k) => x.classList.toggle('on', k === b)); }
    this.mascot.say('À toi !', { mood: 'happy', speak: false });
    this.playing = true;
    // Boucle : met en avant la note courante, et la joue à la place de l'enfant si elle est ratée.
    while (this.running) {
      const now = performance.now();
      const k = this.notes.findIndex((n, j) => this.state[j] === 'wait' && this.noteWall[j] - this.window * 1000 * 0.5 <= now);
      const beat = Math.floor((now - songWall) / (secPerBeat * 1000));
      dots.forEach((x, j) => x.classList.toggle('on', j === ((beat % 4) + 4) % 4));
      if (k >= 0 && k !== this.i) { this.i = k; this.bubbles.forEach((b, j) => b.classList.toggle('current', j === k)); this.scrollToBubble(this.bubbles[k]); this.kb.setExpected([this.keyFor(this.notes[k].midi)]); }
      // Notes ratées : au-delà de la fenêtre, Piou les joue.
      this.notes.forEach((n, j) => {
        if (this.state[j] === 'wait' && now > this.noteWall[j] + this.window * 1000 * 0.5) {
          this.state[j] = 'miss';
          this.synth.playNote(n.midi, n.dur * secPerBeat * 0.9, 0.5);
          this.kb.light(this.keyFor(n.midi), 300);
          this.bubbles[j].classList.add('missed');
        }
      });
      if (this.state.every(st => st !== 'wait')) break;
      if (!await this.sleep(40)) return;
    }
    this.playing = false;
    if (!await this.sleep(800)) return;
    const ratio = this.hits / this.notes.length;
    const stars = ratio >= 0.85 ? 3 : ratio >= 0.5 ? 2 : 1;
    this.mascot.say(stars === 3 ? `${Mascot.cheer()} Tu as joué avec la musique !` : `${Mascot.cheer()} ${this.hits} notes en rythme !`, { mood: 'party' });
    this.sounds.success();
    if (stars === 3) this.ctx.confetti.burst(100);
    this.later(1800, () => this.finish(stars));
  }
  scrollToBubble(b) {
    const stage = this.stage; const sr = stage.getBoundingClientRect(), br = b.getBoundingClientRect();
    const delta = (br.top + br.height / 2) - (sr.top + sr.height / 2);
    if (Math.abs(delta) > 8) stage.scrollTo({ top: stage.scrollTop + delta, behavior: 'smooth' });
  }
  stop() { this.playing = false; this.synth.allOff(); super.stop(); }
  noteOn(midi) {
    if (!this.running || !this.playing) { this.kb.setPressed(midi, 'down'); return; }
    const now = performance.now();
    // La première note en attente dont la fenêtre contient l'instant présent
    const k = this.notes.findIndex((n, j) => this.state[j] === 'wait' && Math.abs(this.noteWall[j] - now) <= this.window * 1000 && this.accepts(midi, n.midi));
    if (k >= 0) {
      this.state[k] = 'hit'; this.hits++;
      this.kb.flash(this.keyFor(this.notes[k].midi), 'ok', 300);
      this.bubbles[k].classList.add('done'); this.bubbles[k].classList.remove('current');
    } else {
      this.kb.flash(midi, 'bad', 200);
    }
  }
}

// ---------- Plus haut ou plus bas ? ----------
export class UpDownActivity extends Activity {
  start() {
    super.start();
    this.pool = this.def.notes.map(toMidi);
    this.rounds = this.def.rounds || 5; this.minGap = this.def.minGap || 4;
    this.round = 0; this.wrongHere = 0; this.listening = false;
    this.kb.setRange(...rangeFor(this.pool));
    this.stage.innerHTML = `<div class="stage-center updown"><div class="seq two"></div>
      <div class="updown-btns"><button class="kbtn huge up" type="button">⬆️<small>Plus haut</small></button><button class="kbtn huge down" type="button">⬇️<small>Plus bas</small></button></div>
      ${this.progressDots(this.rounds, 0)}<button class="kbtn replay" type="button">🔊 Réécouter</button></div>`;
    this.stage.querySelector('.up').addEventListener('click', () => this.answer('up'));
    this.stage.querySelector('.down').addEventListener('click', () => this.answer('down'));
    this.stage.querySelector('.replay').addEventListener('click', () => { if (this.listening) this.playPair(); });
    this.talk('Je joue deux notes. La deuxième est-elle plus haute, ou plus basse que la première ?', { mood: 'think' }).then(ok => { if (ok) this.later(300, () => this.nextRound()); });
  }
  nextRound() {
    let a, b; do { a = pick(this.pool); b = pick(this.pool); } while (Math.abs(a - b) < this.minGap);
    this.a = a; this.b = b; this.wrongHere = 0;
    const s = this.stage.querySelector('.seq'); s.innerHTML = '';
    const b1 = this.bubble(a, { size: 'lg', cls: 'hidden-note' }); const b2 = this.bubble(b, { size: 'lg', cls: 'hidden-note' });
    s.appendChild(b1); s.appendChild(b2);
    this.listening = true;
    this.playPair();
  }
  async playPair() {
    this.mascot.hush();
    this.mascot.say('Écoute…', { mood: 'sing', speak: false });
    const [b1, b2] = this.stage.querySelectorAll('.nbubble');
    this.busy = true;
    b1.classList.add('pulse'); this.synth.playNote(this.a, 1.2, 1.0);
    if (!await this.sleep(1300)) return;
    b1.classList.remove('pulse'); b2.classList.add('pulse'); this.synth.playNote(this.b, 1.2, 1.0);
    if (!await this.sleep(1300)) return;
    b2.classList.remove('pulse'); this.busy = false;
    if (this.listening) this.mascot.say('Plus haut, ou plus bas ?', { mood: 'think', speak: this.round === 0 && this.wrongHere === 0 });
  }
  answer(dir) {
    if (!this.running || !this.listening || this.busy) return;
    const correct = this.b > this.a ? 'up' : 'down';
    const [b1, b2] = this.stage.querySelectorAll('.nbubble');
    if (dir === correct) {
      this.busy = true; this.listening = false; this.round++;
      b1.classList.remove('hidden-note'); b2.classList.remove('hidden-note'); b2.classList.add('pulse');
      this.kb.flash(this.keyFor(this.a), 'lit', 600); this.kb.flash(this.keyFor(this.b), 'ok', 900);
      this.stage.querySelector('.dots').outerHTML = this.progressDots(this.rounds, this.round);
      this.sounds.pop();
      if (this.round >= this.rounds) {
        this.mascot.say(`${Mascot.cheer()} Tu entends le haut et le bas !`, { mood: 'happy' });
        this.sounds.success();
        this.later(1500, () => this.finish(this.stars(this.rounds)));
      } else {
        this.mascot.say(`${Mascot.cheer()} ${correct === 'up' ? 'Plus haut !' : 'Plus bas !'}`, { mood: 'happy' });
        this.later(1500, () => { this.busy = false; this.nextRound(); });
      }
    } else {
      this.errors++; this.wrongHere++;
      this.sounds.oops();
      this.talk(`${Mascot.oops()} Écoute encore.`, { mood: 'oops' }).then(ok => { if (ok && this.listening) this.playPair(); });
    }
  }
  noteOn(midi) { this.kb.setPressed(midi, 'down'); }
}

// ---------- Piou joue, tu chantes (karaoké) ----------
export class SingActivity extends Activity {
  async start() {
    super.start();
    this.song = parseJuniorSong(this.def.song);
    this.notes = this.song.notes;
    this.ctx.setKeyboardVisible(false);
    this.stage.innerHTML = `<div class="sing"><div class="sing-now">🎤</div><div class="sing-line"></div><div class="phrases small"></div></div>`;
    const ph = this.stage.querySelector('.phrases');
    this.bubbles = [];
    let cur = null, curIdx = -1;
    this.notes.forEach((n) => {
      if (n.phrase !== curIdx) { cur = document.createElement('div'); cur.className = 'phrase'; ph.appendChild(cur); curIdx = n.phrase; }
      const b = this.bubble(n.midi, { lyric: n.lyric, size: 'sm' }); cur.appendChild(b); this.bubbles.push(b);
    });
    if (!await this.talk(`On chante « ${this.song.title} » ! Je joue, tu chantes.`, { mood: 'sing' })) return;
    if (!await this.sleep(300)) return;
    this.play();
  }
  async play() {
    const secPerBeat = 60 / (this.song.tempo * 0.9);
    const t0 = this.synth.now + 0.3;
    const wall0 = performance.now() + 300;
    for (const n of this.notes) for (const m of n.midis) this.synth.playNote(m, n.dur * secPerBeat * 0.95, 0.75, t0 + n.t * secPerBeat);
    this.mascot.setMood('sing');
    const now = this.stage.querySelector('.sing-now'), line = this.stage.querySelector('.sing-line');
    let phrase = -1;
    for (let k = 0; k < this.notes.length && this.running; k++) {
      const n = this.notes[k];
      const d = wall0 + n.t * secPerBeat * 1000 - performance.now();
      if (d > 0 && !await this.sleep(d)) return;
      if (n.phrase !== phrase) { phrase = n.phrase; line.innerHTML = this.notes.filter(x => x.phrase === phrase).map((x, j) => `<span data-j="${j}">${x.lyric || '♪'}</span>`).join(' '); }
      const j = this.notes.slice(0, k).filter(x => x.phrase === phrase).length;
      line.querySelectorAll('span').forEach((sp, q) => sp.classList.toggle('on', q === j));
      now.textContent = n.lyric || '♪';
      now.classList.remove('pop'); void now.offsetWidth; now.classList.add('pop');
      this.bubbles.forEach((b, q) => b.classList.toggle('current', q === k));
      this.bubbles[k].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    if (!await this.sleep(1200)) return;
    this.mascot.say(`${Mascot.cheer()} Quelle belle voix !`, { mood: 'party' });
    this.sounds.fanfare();
    this.ctx.confetti.burst(100);
    this.later(2000, () => this.finish(3));
  }
  stop() { this.synth.allOff(); this.ctx.setKeyboardVisible(true); super.stop(); }
  finish(stars, extra) { this.ctx.setKeyboardVisible(true); super.finish(stars, extra); }
}

export function createActivity(def, ctx) {
  switch (def.type) {
    case 'discover': return new DiscoverActivity(def, ctx);
    case 'find': return new FindActivity(def, ctx);
    case 'echo': return new EchoActivity(def, ctx);
    case 'ear': return new EarActivity(def, ctx);
    case 'melody': return new MelodyActivity(def, ctx);
    case 'party': return new PartyActivity(def, ctx);
    case 'pair': return new PairActivity(def, ctx);
    case 'beat': return new BeatActivity(def, ctx);
    case 'playalong': return new PlayAlongActivity(def, ctx);
    case 'updown': return new UpDownActivity(def, ctx);
    case 'sing': return new SingActivity(def, ctx);
    default: throw new Error('Activité inconnue : ' + def.type);
  }
}
