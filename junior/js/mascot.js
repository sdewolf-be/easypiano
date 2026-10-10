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

const CHEERS = ['Bravo !', 'Super !', 'Génial !', 'Ouiii !', 'Trop fort !', 'Magnifique !', 'Youpi !', 'C’est ça !'];
const OOPS = ['Oups !', 'Presque !', 'Pas tout à fait…', 'Hmm…', 'Essaie encore !'];

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
    this._lastSpoken = '';
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

  static cheer() { return CHEERS[Math.floor(Math.random() * CHEERS.length)]; }
  static oops() { return OOPS[Math.floor(Math.random() * OOPS.length)]; }

  // Affiche le texte dans la bulle et le lit à voix haute (sauf speak: false).
  say(text, { mood = null, speak = true, spoken = null } = {}) {
    this.bubble.hidden = !text;
    this.bubbleText.textContent = text || '';
    this.bubble.classList.remove('pop'); void this.bubble.offsetWidth; this.bubble.classList.add('pop');
    if (mood) this.setMood(mood);
    if (speak && text) this.speak(spoken || text);
  }

  speak(text) {
    if (!this.voice || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[♪♫]/g, ''));
      u.lang = 'fr-FR';
      u.rate = 0.95;
      u.pitch = 1.25;
      if (this._voiceObj) u.voice = this._voiceObj;
      // Petit délai après cancel() : sans lui, Safari avale parfois la phrase suivante.
      clearTimeout(this._speakTimer);
      this._speakTimer = setTimeout(() => { try { speechSynthesis.speak(u); } catch (e) { /* ignore */ } }, 60);
      this._lastSpoken = text;
    } catch (e) { /* synthèse vocale indisponible */ }
  }

  hush() { try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* ignore */ } }

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
