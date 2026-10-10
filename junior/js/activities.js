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
  }
  later(ms, fn) { const id = setTimeout(() => { this.timers.delete(id); if (this.running) fn(); }, ms); this.timers.add(id); return id; }
  async sleep(ms) { await wait(ms); return this.running; }
  // Piou parle, et on attend la fin de sa phrase (ou un court délai sans voix) avant d'enchaîner.
  async talk(text, opts = {}) { await this.mascot.say(text, opts); return this.running; }
  start() { this.running = true; }
  stop() { this.running = false; for (const t of this.timers) clearTimeout(t); this.timers.clear(); this.kb.clear(); this.mascot.hush(); }
  noteOn(midi) { /* par défaut : rien */ }
  noteOff(midi) { this.kb.release(midi); }
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
      const b = this.bubble(n.midi, { lyric: n.lyric, size: 'md' });
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
    if (b) { this.scrollToBubble(b); this.showKey(this.notes[this.i].midi); }
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
    for (const n of this.notes) this.synth.playNote(n.midi, n.dur * secPerBeat * 0.9, 0.7, t0 + n.t * secPerBeat);
    const startWall = performance.now() + 300;
    for (let k = 0; k < this.notes.length && this.running && this.demoing; k++) {
      const n = this.notes[k];
      const delay = startWall + n.t * secPerBeat * 1000 - performance.now();
      if (delay > 0 && !await this.sleep(delay)) return;
      if (!this.demoing) return;
      this.bubbles.forEach(b => b.classList.remove('current'));
      this.bubbles[k].classList.add('current');
      this.scrollToBubble(this.bubbles[k]);
      this.kb.light(this.keyFor(n.midi), Math.max(200, n.dur * secPerBeat * 900));
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
    if (this.accepts(midi, n.midi)) {
      this.kb.flash(this.keyFor(n.midi), 'ok', 350);
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
    } else {
      this.errors++; this.wrongHere++;
      this.kb.flash(midi, 'bad', 350);
      const b = this.bubbles[this.i]; b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
      const info = infoOf(n.midi), played = infoOf(midi);
      if (this.wrongHere === 1) this.mascot.say(`${Mascot.oops()} C’est ${info.name}, la touche ${info.colorFem}.`, { mood: 'oops', speak: false });
      else this.mascot.say(played ? `Ça, c’est ${played.name}. Cherche ${info.name}, la touche ${info.colorFem}.` : `Cherche ${info.name}, la touche ${info.colorFem}.`, { mood: 'oops', speak: this.wrongHere === 2 });
      this.sounds.oops();
      this.showKey(n.midi);
    }
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

export function createActivity(def, ctx) {
  switch (def.type) {
    case 'discover': return new DiscoverActivity(def, ctx);
    case 'find': return new FindActivity(def, ctx);
    case 'echo': return new EchoActivity(def, ctx);
    case 'ear': return new EarActivity(def, ctx);
    case 'melody': return new MelodyActivity(def, ctx);
    case 'party': return new PartyActivity(def, ctx);
    default: throw new Error('Activité inconnue : ' + def.type);
  }
}
