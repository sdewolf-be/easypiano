// Piou, la mascotte : un poussin en SVG, une bulle de texte et une voix (synthèse vocale en français).
const SVG = `
<svg viewBox="0 0 200 200" class="piou" aria-hidden="true">
  <g class="piou-body">
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
  </g>
</svg>`;

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
    this.root.innerHTML = `<div class="mascot-figure">${SVG}</div><div class="bubble" hidden><span class="bubble-text"></span></div>`;
    this.figure = root.querySelector('.mascot-figure');
    this.bubble = root.querySelector('.bubble');
    this.bubbleText = root.querySelector('.bubble-text');
    this.moodTimer = null;
    this._voiceObj = null;
    this.pending = null;
    this.speaking = false;
    this._current = null;
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
  speak(text, { interrupt = false } = {}) {
    const clean = toSpoken(text);
    if (!this.voice || !('speechSynthesis' in window) || !clean) return Promise.resolve(false);
    if (interrupt) this.hush();
    if (this.pending) { this.pending.resolve(false); this.pending = null; }
    return new Promise((resolve) => { this.pending = { text: clean, resolve }; this._pump(); });
  }

  _pump() {
    if (this.speaking || !this.pending) return;
    const item = this.pending; this.pending = null;
    this.speaking = true;
    let done = false;
    const finish = (ok) => { if (done) return; done = true; clearTimeout(timer); if (this._finishCurrent === finish) this._finishCurrent = null; this.speaking = false; item.resolve(ok); setTimeout(() => this._pump(), 120); };
    const timer = setTimeout(() => finish(true), 2000 + item.text.length * 90);   // secours si onend n'arrive jamais
    try {
      const u = new SpeechSynthesisUtterance(item.text);
      u.lang = 'fr-FR';
      u.rate = 0.92;
      u.pitch = 1.1;
      if (this._voiceObj) u.voice = this._voiceObj;
      u.onend = () => finish(true);
      u.onerror = () => finish(false);
      this._current = u;
      this._finishCurrent = finish;
      // Safari : un cancel() juste avant speak() avale parfois la phrase ; on laisse un instant.
      this._startTimer = setTimeout(() => { if (this._current !== u) return; try { speechSynthesis.speak(u); } catch (e) { finish(false); } }, 40);
    } catch (e) { finish(false); }
  }

  // Coupe la parole (changement d'écran, fin d'activité) et vide la file.
  hush() {
    if (this.pending) { this.pending.resolve(false); this.pending = null; }
    try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    clearTimeout(this._startTimer);
    if (this._current) { const u = this._current; this._current = null; u.onend = null; u.onerror = null; }
    if (this._finishCurrent) { const f = this._finishCurrent; this._finishCurrent = null; f(false); }
    this.speaking = false;
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
