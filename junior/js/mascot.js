// Piou, la mascotte : un poussin en SVG, une bulle de texte et une voix (synthèse vocale en français).
const SVG = `
<svg viewBox="0 0 200 200" class="piou" aria-hidden="true">
  <g class="piou-body">
    <g class="outfit-back"></g>
    <g class="piou-feet">
      <path d="M78 178 l-12 10 M78 178 l0 14 M78 178 l12 10" stroke="#ff8c1a" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M122 178 l-12 10 M122 178 l0 14 M122 178 l12 10" stroke="#ff8c1a" stroke-width="5" stroke-linecap="round" fill="none"/>
    </g>
    <ellipse class="piou-wing piou-wing-l" cx="38" cy="122" rx="16" ry="30" fill="#f6c431"/>
    <ellipse class="piou-wing piou-wing-r" cx="162" cy="122" rx="16" ry="30" fill="#f6c431"/>
    <ellipse cx="100" cy="118" rx="64" ry="62" fill="#ffd93d"/>
    <ellipse cx="100" cy="140" rx="38" ry="28" fill="#fff3b0"/>
    <path class="piou-crest" d="M88 60 q4 -22 16 -24 M100 56 q0 -24 14 -28 M110 60 q10 -18 22 -14" stroke="#f6c431" stroke-width="6" stroke-linecap="round" fill="none"/>
    <g class="piou-eyes">
      <g class="piou-eye">
        <ellipse cx="78" cy="104" rx="13" ry="14" fill="#fff"/>
        <circle class="piou-pupil" cx="81" cy="106" r="7" fill="#222"/>
        <circle cx="84" cy="102" r="2.5" fill="#fff"/>
      </g>
      <g class="piou-eye">
        <ellipse cx="122" cy="104" rx="13" ry="14" fill="#fff"/>
        <circle class="piou-pupil" cx="125" cy="106" r="7" fill="#222"/>
        <circle cx="128" cy="102" r="2.5" fill="#fff"/>
      </g>
      <path class="piou-happy-eye" d="M66 106 q12 -14 24 0" stroke="#222" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path class="piou-happy-eye" d="M110 106 q12 -14 24 0" stroke="#222" stroke-width="5" stroke-linecap="round" fill="none"/>
    </g>
    <circle cx="62" cy="124" r="7" fill="#ff9aa2" opacity=".75"/>
    <circle cx="138" cy="124" r="7" fill="#ff9aa2" opacity=".75"/>
    <path class="piou-beak" d="M90 118 L110 118 L100 132 Z" fill="#ff8c1a"/>
    <text class="piou-note" x="150" y="52" font-size="30" fill="#2f96ff" font-weight="700">♪</text>
    <g class="outfit-front"></g>
  </g>
</svg>`;

// Accessoires de Piou (repère 200×200 du SVG) : [calque, dessin]
const OUTFIT_SVG = {
  party: ['front', `<polygon points="100,8 72,72 128,72" fill="#ff5fb9"/><circle cx="88" cy="52" r="4" fill="#ffd400"/><circle cx="106" cy="40" r="4" fill="#3ecf5a"/><circle cx="112" cy="62" r="4" fill="#2f96ff"/><circle cx="100" cy="10" r="8" fill="#ffd400"/>`],
  crown: ['front', `<polygon points="66,72 66,38 84,56 100,30 116,56 134,38 134,72" fill="#ffd400" stroke="#c9a000" stroke-width="3" stroke-linejoin="round"/><circle cx="84" cy="64" r="4" fill="#ff4b4b"/><circle cx="100" cy="60" r="4" fill="#2f96ff"/><circle cx="116" cy="64" r="4" fill="#3ecf5a"/>`],
  headphones: ['front', `<path d="M44 104 A56 56 0 0 1 156 104" stroke="#2b2d42" stroke-width="8" fill="none" stroke-linecap="round"/><rect x="30" y="92" width="22" height="34" rx="7" fill="#2b2d42"/><rect x="148" y="92" width="22" height="34" rx="7" fill="#2b2d42"/><rect x="36" y="98" width="10" height="22" rx="4" fill="#2f96ff"/><rect x="154" y="98" width="10" height="22" rx="4" fill="#2f96ff"/>`],
  cap: ['front', `<path d="M46 76 Q100 14 154 76 Z" fill="#2f96ff"/><path d="M100 76 L176 78 Q174 90 100 88 Z" fill="#1a5fb4"/><rect x="92" y="34" width="16" height="22" rx="6" fill="#1a5fb4" transform="rotate(-20 100 45)"/>`],
  glasses: ['front', `<circle cx="78" cy="104" r="18" stroke="#2b2d42" stroke-width="4" fill="none"/><circle cx="122" cy="104" r="18" stroke="#2b2d42" stroke-width="4" fill="none"/><path d="M96 104 L104 104 M60 100 L44 94 M140 100 L156 94" stroke="#2b2d42" stroke-width="4" stroke-linecap="round"/>`],
  sunglasses: ['front', `<circle cx="78" cy="104" r="18" fill="#2b2d42" opacity=".9"/><circle cx="122" cy="104" r="18" fill="#2b2d42" opacity=".9"/><path d="M96 104 L104 104 M60 100 L44 94 M140 100 L156 94" stroke="#2b2d42" stroke-width="4" stroke-linecap="round"/><path d="M68 96 q6 -6 12 -2" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`],
  bow: ['front', `<polygon points="76,130 100,140 76,150" fill="#ff4b4b"/><polygon points="124,130 100,140 124,150" fill="#ff4b4b"/><circle cx="100" cy="140" r="6" fill="#c62828"/>`],
  scarf: ['front', `<path d="M42 128 Q100 152 158 128 L158 144 Q100 168 42 144 Z" fill="#ff4b4b"/><rect x="118" y="140" width="18" height="40" rx="7" fill="#ff4b4b"/><path d="M120 150 h14 M120 160 h14 M120 170 h14" stroke="#fff" stroke-width="3" opacity=".8"/>`],
  cape: ['back', `<path d="M46 126 L26 198 L174 198 L154 126 Q100 150 46 126 Z" fill="#ff4b4b"/><path d="M54 132 L40 190 L160 190 L146 132 Q100 154 54 132 Z" fill="#ff6f6f"/>`],
  medal: ['front', `<polygon points="88,128 112,128 108,152 92,152" fill="#2f96ff"/><circle cx="100" cy="158" r="12" fill="#ffd400" stroke="#c9a000" stroke-width="3"/><text x="100" y="163" font-size="13" text-anchor="middle" fill="#c9a000" font-weight="800">★</text>`],
};

// Texte affiché / texte prononcé : la synthèse vocale lit mal les onomatopées et les symboles.
const CHEERS = [['Bravo !'], ['Super !'], ['Génial !'], ['Ouiii !', 'Oui !'], ['Trop fort !'], ['Magnifique !'], ['Youpi !', 'Youpi !'], ['C’est ça !']];
const OOPS = [['Oups !', 'Oh !'], ['Presque !'], ['Pas tout à fait…', 'Pas tout à fait.'], ['Essaie encore !']];

// Rend un texte prononçable : retire emojis, symboles, guillemets, points de suspension et interjections.
export function toSpoken(text) {
  return String(text)
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}♪♫♥★⭐✓→←]/gu, ' ')
    .replace(/«\s*|\s*»/g, ' ')
    .replace(/…/g, '.')
    .replace(/\bHmm+\b\.?/gi, '')
    .replace(/\bOu+i+\b/gi, 'Oui')
    .replace(/\bOups\b/gi, 'Oh')
    .replace(/\s+([!?.,])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const SPOKEN_MAP = new Map();

export class Mascot {
  constructor(root, opts = {}) {
    this.root = root;
    this.voice = opts.voice ?? true;
    this.audio = opts.audio || null;          // synthétiseur (contexte Web Audio) pour les voix enregistrées
    this.getClip = opts.getClip || (() => null); // (clé) → { mime, data (base64) } ou null
    this._decoded = new Map();
    this._gen = 0;
    this.root.innerHTML = `<div class="mascot-figure">${SVG}</div><div class="bubble" hidden><span class="bubble-text"></span></div>`;
    this.figure = root.querySelector('.mascot-figure');
    this.bubble = root.querySelector('.bubble');
    this.bubbleText = root.querySelector('.bubble-text');
    this.moodTimer = null;
    this._voiceObj = null;
    this.pending = null;
    this.speaking = false;
    this._current = null;
    this.setOutfit(opts.outfit || {});
    if ('speechSynthesis' in window) {
      const pickVoice = () => {
        const voices = speechSynthesis.getVoices().filter(v => /^fr/i.test(v.lang));
        if (!voices.length) return;
        // Préférer une voix française (France), puis n'importe quelle voix en français.
        const pref = voices.find(v => /fr[-_]FR/i.test(v.lang) && /(Amélie|Thomas|Audrey|Google|Aurelie|Marie)/i.test(v.name))
          || voices.find(v => /fr[-_]FR/i.test(v.lang)) || voices[0];
        this._voiceObj = pref;
      };
      pickVoice();
      speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
    }
  }

  // Renvoie une chaîne affichable dont la version parlée est accessible via Mascot.spokenOf().
  static cheer() { return Mascot._pick(CHEERS); }
  static oops() { return Mascot._pick(OOPS); }
  static _pick(list) { const [shown, spoken] = list[Math.floor(Math.random() * list.length)]; if (spoken) SPOKEN_MAP.set(shown, spoken); return shown; }
  static spokenOf(text) { let t = text; for (const [shown, spoken] of SPOKEN_MAP) t = t.split(shown).join(spoken); return toSpoken(t); }

  // Affiche le texte dans la bulle et le lit à voix haute (sauf speak: false).
  // Renvoie une promesse résolue à la fin de la lecture (ou après un court délai sans voix).
  say(text, { mood = null, speak = true, spoken = null, interrupt = false } = {}) {
    this.bubble.hidden = !text;
    this.bubbleText.textContent = text || '';
    this.bubble.classList.remove('pop'); void this.bubble.offsetWidth; this.bubble.classList.add('pop');
    if (mood) this.setMood(mood);
    if (speak && text) return this.speak(spoken || Mascot.spokenOf(text), { interrupt });
    return new Promise(r => setTimeout(() => r(false), Math.min(2500, 600 + (text || '').length * 45)));
  }

  // File d'attente : la phrase en cours se termine ; une seule phrase en attente (la dernière) est conservée.
  // Une phrase peut être remplacée par une voix enregistrée par les parents (clip), suivie du reste en synthèse.
  speak(text, { interrupt = false } = {}) {
    const clean = toSpoken(text);
    if (!clean) return Promise.resolve(false);
    const match = this._matchClip(clean);
    if (!match && (!this.voice || !('speechSynthesis' in window))) return Promise.resolve(false);
    if (interrupt) this.hush();
    if (this.pending) { this.pending.resolve(false); this.pending = null; }
    return new Promise((resolve) => { this.pending = { text: clean, clip: match ? match.key : null, rest: match ? match.rest : clean, resolve }; this._pump(); });
  }

  // Clé de clip correspondant au texte : nom de note exact, ou début « Bravo ! » / « Oups ! » / « À toi ! » / « Écoute ».
  _matchClip(clean) {
    const lower = clean.toLowerCase();
    const exact = { do: 'do', 'ré': 're', mi: 'mi', fa: 'fa', sol: 'sol', la: 'la', si: 'si', 'à toi!': 'atoi', 'écoute.': 'ecoute' };
    const has = (k) => !!this.getClip(k);
    if (exact[lower] !== undefined && has(exact[lower])) return { key: exact[lower], rest: '' };
    const prefixes = [
      ['cheer', CHEERS.map(c => toSpoken(c[1] || c[0]).toLowerCase())],
      ['oops', OOPS.map(c => toSpoken(c[1] || c[0]).toLowerCase())],
      ['atoi', ['à toi!']],
      ['ecoute', ['écoute.', 'écoute,', 'écoute bien']],
    ];
    for (const [key, list] of prefixes) {
      if (!has(key)) continue;
      const p = list.find(x => lower.startsWith(x));
      if (p) return { key, rest: clean.slice(p.length).replace(/^[\s,.!]+/, '') };
    }
    return null;
  }

  _pump() {
    if (this.speaking || !this.pending) return;
    const item = this.pending; this.pending = null;
    this.speaking = true;
    const gen = ++this._gen;
    const finish = (ok) => { if (this._gen !== gen) return; this.speaking = false; item.resolve(ok); setTimeout(() => this._pump(), 120); };
    (async () => {
      let ok = true;
      if (item.clip) ok = await this._playClip(item.clip);
      if (this._gen !== gen) return;
      if (item.rest && this.voice && 'speechSynthesis' in window) ok = await this._tts(item.rest) && ok;
      finish(ok);
    })();
  }

  _tts(text) {
    return new Promise((resolve) => {
      let done = false;
      const end = (ok) => { if (done) return; done = true; clearTimeout(timer); this._current = null; this._ttsEnd = null; resolve(ok); };
      const timer = setTimeout(() => end(true), 2000 + text.length * 90);   // secours si onend n'arrive jamais
      try {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'fr-FR';
        u.rate = 0.92;
        u.pitch = 1.1;
        if (this._voiceObj) u.voice = this._voiceObj;
        u.onend = () => end(true);
        u.onerror = () => end(false);
        this._current = u; this._ttsEnd = end;
        // Safari : un cancel() juste avant speak() avale parfois la phrase ; on laisse un instant.
        this._startTimer = setTimeout(() => { if (this._current !== u) return; try { speechSynthesis.speak(u); } catch (e) { end(false); } }, 40);
      } catch (e) { end(false); }
    });
  }

  async _playClip(key) {
    const clip = this.getClip(key);
    if (!clip || !this.audio) return false;
    try {
      const ctx = this.audio.ensure();
      const cacheKey = key + ':' + clip.data.length;
      let buf = this._decoded.get(cacheKey);
      if (!buf) {
        const bin = atob(clip.data);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        buf = await new Promise((res, rej) => { const r = ctx.decodeAudioData(bytes.buffer, res, rej); if (r && r.then) r.then(res, rej); });
        this._decoded.set(cacheKey, buf);
      }
      return await new Promise((resolve) => {
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const g = ctx.createGain(); g.gain.value = 1.4;
        src.connect(g).connect(ctx.destination);
        this._clipSource = src; this._clipEnd = () => resolve(false);
        src.onended = () => { if (this._clipSource === src) { this._clipSource = null; this._clipEnd = null; } resolve(true); };
        src.start();
      });
    } catch (e) { return false; }
  }

  // Coupe la parole (changement d'écran, fin d'activité) et vide la file.
  hush() {
    this._gen++;
    if (this.pending) { this.pending.resolve(false); this.pending = null; }
    clearTimeout(this._startTimer);
    try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    if (this._current) { const u = this._current; this._current = null; u.onend = null; u.onerror = null; }
    if (this._ttsEnd) { const f = this._ttsEnd; this._ttsEnd = null; f(false); }
    if (this._clipSource) { try { this._clipSource.stop(); } catch (e) { /* ignore */ } this._clipSource = null; }
    if (this._clipEnd) { const f = this._clipEnd; this._clipEnd = null; f(); }
    this.speaking = false;
  }

  // Habille Piou : { hat, eyes, neck } → identifiants d'accessoires (voir course.js OUTFITS).
  setOutfit(outfit) {
    this.outfit = outfit || {};
    const back = this.root.querySelector('.outfit-back'), front = this.root.querySelector('.outfit-front');
    if (!back || !front) return;
    back.innerHTML = ''; front.innerHTML = '';
    for (const slot of ['neck', 'eyes', 'hat']) {
      const id = this.outfit[slot];
      const def = id && OUTFIT_SVG[id];
      if (!def) continue;
      (def[0] === 'back' ? back : front).insertAdjacentHTML('beforeend', `<g class="outfit outfit-${id}">${def[1]}</g>`);
    }
  }

  // Humeurs : idle (respire), happy (saute), oops (se dandine), think (regarde en l'air), sing (chante).
  setMood(mood, ms = 1800) {
    clearTimeout(this.moodTimer);
    this.root.classList.remove('m-happy', 'm-oops', 'm-think', 'm-sing', 'm-party');
    if (mood && mood !== 'idle') {
      this.root.classList.add('m-' + mood);
      if (mood !== 'party' && mood !== 'sing') this.moodTimer = setTimeout(() => this.root.classList.remove('m-' + mood), ms);
    }
  }
}
