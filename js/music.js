// Modèle musical : hauteurs, armures, analyse des partitions.
// Les partitions sont écrites dans une notation texte compacte :
//   C4/4  -> Do4 noire        E4/2 -> Mi4 blanche      G4/1 -> Sol4 ronde
//   D4/8  -> Ré4 croche       C4/4. -> noire pointée   R/4  -> soupir
//   C4/8t -> croche de triolet (3 = 1 temps)
//   [C3 E3 G3]/2 -> accord    C4/4~ -> liée à la note suivante (même hauteur)
//   Suffixes : ^ point d'orgue, ' staccato, > accent
//   Doigté : C4/4:1   [C3 E3 G3]/1:5,3,1  (dans l'ordre des notes écrites)
//   Annotation : @mf @p @cresc. @Fine  (s'attache à l'événement suivant ; _ = espace)
//   |  -> barre de mesure (vérifiée, pas obligatoire)
// Si la durée est omise, la durée précédente est réutilisée.

export const LETTER_SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
export const LETTER_INDEX = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const LETTER_FR = { C: 'Do', D: 'Ré', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' };
export const PC_NAMES_FR = ['Do', 'Do♯', 'Ré', 'Ré♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
export const PC_NAMES_FR_FLAT = ['Do', 'Ré♭', 'Ré', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];

const SHARP_ORDER = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const FLAT_ORDER = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];

// Nombre d'altérations à l'armure (positif = dièses, négatif = bémols)
export const KEYS = {
  C: 0, G: 1, D: 2, A: 3, E: 4, B: 5,
  F: -1, Bb: -2, Eb: -3, Ab: -4, Db: -5,
  Am: 0, Em: 1, Bm: 2, 'F#m': 3, Dm: -1, Gm: -2, Cm: -3, Fm: -4,
};

export const KEY_NAMES_FR = {
  C: 'Do majeur', G: 'Sol majeur', D: 'Ré majeur', A: 'La majeur', E: 'Mi majeur', B: 'Si majeur',
  F: 'Fa majeur', Bb: 'Si♭ majeur', Eb: 'Mi♭ majeur', Ab: 'La♭ majeur', Db: 'Ré♭ majeur',
  Am: 'La mineur', Em: 'Mi mineur', Bm: 'Si mineur', 'F#m': 'Fa♯ mineur', Dm: 'Ré mineur', Gm: 'Sol mineur', Cm: 'Do mineur', Fm: 'Fa mineur',
};

export function keySignature(key) {
  const n = KEYS[key] ?? 0;
  const letters = n >= 0 ? SHARP_ORDER.slice(0, n) : FLAT_ORDER.slice(0, -n);
  const acc = n >= 0 ? 1 : -1;
  const map = {};
  for (const l of letters) map[l] = acc;
  return { count: Math.abs(n), acc, letters, map };
}

const PITCH_RE = /^([A-G])(#|b|n)?(-?\d)$/;

export function parsePitch(str) {
  const m = PITCH_RE.exec(str);
  if (!m) throw new Error('Hauteur invalide : ' + str);
  const letter = m[1];
  const acc = m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0;
  const explicitNatural = m[2] === 'n';
  const octave = parseInt(m[3], 10);
  const midi = (octave + 1) * 12 + LETTER_SEMI[letter] + acc;
  const step = octave * 7 + LETTER_INDEX[letter];
  return { letter, acc, octave, midi, step, explicitNatural, name: str };
}

export function midiToNameFr(midi, preferFlat = false) {
  const pc = ((midi % 12) + 12) % 12;
  return (preferFlat ? PC_NAMES_FR_FLAT : PC_NAMES_FR)[pc];
}

export function midiToNameFrOct(midi, preferFlat = false) {
  return midiToNameFr(midi, preferFlat) + (Math.floor(midi / 12) - 1);
}

export function pitchNameFr(p) {
  return LETTER_FR[p.letter] + (p.acc === 1 ? '♯' : p.acc === -1 ? '♭' : '');
}

// "C4" -> "Do4", "F#3" -> "Fa♯3"
export function nameFr(str) {
  const p = parsePitch(str);
  return pitchNameFr(p) + p.octave;
}

export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function freqToMidi(freq) {
  return 69 + 12 * Math.log2(freq / 440);
}

function parseDuration(tok) {
  // "4" -> 1 temps, "4." -> 1.5, "8" -> 0.5, "2" -> 2, "1" -> 4, "8t" -> 1/3 (triolet)
  const m = /^(\d+)(\.?)(t?)$/.exec(tok);
  if (!m) throw new Error('Durée invalide : ' + tok);
  let beats = 4 / parseInt(m[1], 10);
  if (m[2]) beats *= 1.5;
  if (m[3]) beats *= 2 / 3;
  return { beats, triplet: !!m[3], dotted: !!m[2], base: parseInt(m[1], 10) };
}

let eventCounter = 0;

export function parseVoice(text, hand, timeSig) {
  const events = [];
  // Les accords [C3 E3 G3]/2 contiennent des espaces : on les garde entiers.
  const tokens = text.replace(/\n/g, ' ').match(/\[[^\]]*\]\S*|\S+/g) || [];
  const beatsPerMeasure = timeSig[0] * (4 / timeSig[1]);
  let t = 0;
  let lastDur = { beats: 1, triplet: false, dotted: false, base: 4 };
  let barCheck = 0;
  let pendingAnnotations = [];
  for (const raw of tokens) {
    if (raw === '|' || raw === '||' || raw === ':|' || raw === '|:') {
      // Vérification facultative des mesures (aide à l'écriture des partitions).
      if (Math.abs(((t - barCheck) % beatsPerMeasure)) > 1e-3 && Math.abs(((t - barCheck) % beatsPerMeasure) - beatsPerMeasure) > 1e-3 && t - barCheck !== 0) {
        console.warn(`Mesure irrégulière (${hand}) avant la barre au temps ${t}`);
      }
      barCheck = t;
      continue;
    }
    if (raw.startsWith('@')) { pendingAnnotations.push(raw.slice(1).replace(/_/g, ' ')); continue; }
    let tok = raw;
    let fingers = null;
    const colon = tok.lastIndexOf(':');
    if (colon !== -1 && colon > tok.lastIndexOf(']')) {
      fingers = tok.slice(colon + 1).split(',').map(f => f.trim()).filter(Boolean);
      tok = tok.slice(0, colon);
    }
    const mods = { tie: false, fermata: false, staccato: false, accent: false };
    let changed = true;
    while (changed) {
      changed = false;
      const c = tok[tok.length - 1];
      if (c === '~') { mods.tie = true; tok = tok.slice(0, -1); changed = true; }
      else if (c === '^') { mods.fermata = true; tok = tok.slice(0, -1); changed = true; }
      else if (c === "'") { mods.staccato = true; tok = tok.slice(0, -1); changed = true; }
      else if (c === '>') { mods.accent = true; tok = tok.slice(0, -1); changed = true; }
    }
    let pitchPart = tok;
    let dur = lastDur;
    const slash = tok.lastIndexOf('/');
    if (slash !== -1 && slash > tok.lastIndexOf(']')) {
      pitchPart = tok.slice(0, slash);
      dur = parseDuration(tok.slice(slash + 1));
    }
    lastDur = dur;
    const ev = {
      id: 'e' + (eventCounter++), t, dur: dur.beats, triplet: dur.triplet, hand, rest: false, notes: [],
      tieStart: mods.tie, tieEnd: false, fermata: mods.fermata, staccato: mods.staccato, accent: mods.accent,
      annotations: pendingAnnotations,
    };
    pendingAnnotations = [];
    if (pitchPart === 'R' || pitchPart === 'r') {
      ev.rest = true;
    } else {
      const names = pitchPart.startsWith('[')
        ? pitchPart.slice(1, -1).split(/[\s,]+/).filter(Boolean)
        : [pitchPart];
      const notes = names.map((n, i) => ({ ...parsePitch(n), finger: fingers && fingers[i] ? fingers[i] : null }));
      ev.notes = notes.sort((a, b) => a.midi - b.midi);
    }
    events.push(ev);
    t += dur.beats;
  }
  // Liaisons : la note suivante de même hauteur n'est pas réattaquée.
  for (let i = 0; i < events.length - 1; i++) {
    if (events[i].tieStart && !events[i + 1].rest) events[i + 1].tieEnd = true;
  }
  return { events, totalBeats: t };
}

export function parseSong(def) {
  const timeSig = def.timeSig || [4, 4];
  const right = parseVoice(def.right || '', 'R', timeSig);
  const left = parseVoice(def.left || '', 'L', timeSig);
  const totalBeats = Math.max(right.totalBeats, left.totalBeats);
  const beatsPerMeasure = timeSig[0] * (4 / timeSig[1]);
  const allNotes = [...right.events, ...left.events].flatMap(e => e.notes.map(n => n.midi));
  return {
    id: def.id,
    title: def.title,
    composer: def.composer || '',
    level: def.level || 1,
    tempo: def.tempo || 80,
    tempoText: def.tempoText || '',
    timeSig,
    key: def.key || 'C',
    keySig: keySignature(def.key || 'C'),
    beatsPerMeasure,
    measures: Math.ceil(totalBeats / beatsPerMeasure - 1e-6),
    totalBeats,
    hands: { R: right.events, L: left.events },
    hasR: right.events.some(e => !e.rest),
    hasL: left.events.some(e => !e.rest),
    minMidi: allNotes.length ? Math.min(...allNotes) : 48,
    maxMidi: allNotes.length ? Math.max(...allNotes) : 72,
    hint: def.hint || '',
    showNames: def.showNames,
  };
}

// Groupes de notes attendues (par temps de départ) pour les mains actives.
export function buildNoteGroups(song, hands) {
  const byTime = new Map();
  for (const h of hands) {
    for (const ev of song.hands[h]) {
      if (ev.rest || ev.tieEnd) continue;
      const key = ev.t.toFixed(3);
      if (!byTime.has(key)) byTime.set(key, { t: ev.t, notes: [] });
      const g = byTime.get(key);
      ev.notes.forEach((n, i) => g.notes.push({ midi: n.midi, eventId: ev.id, noteIndex: i, hand: h, hit: false }));
    }
  }
  return [...byTime.values()].sort((a, b) => a.t - b.t);
}

// Transposition diatonique d'une voix écrite en notation texte.
// steps : nombre de degrés (ex. -4 pour passer de Sol à Do), semis : demi-tons correspondants.
export function transposeText(text, steps, semis) {
  return text.replace(/([A-G])(#|b|n)?(-?\d)/g, (m, letter, acc, oct) => {
    const p = parsePitch(m);
    const idx = LETTER_INDEX[letter] + steps;
    const newLetterIdx = ((idx % 7) + 7) % 7;
    const newOct = p.octave + Math.floor(idx / 7);
    const newLetter = LETTERS[newLetterIdx];
    const natural = (newOct + 1) * 12 + LETTER_SEMI[newLetter];
    const target = p.midi + semis;
    const newAcc = target - natural;
    const accStr = newAcc === 1 ? '#' : newAcc === -1 ? 'b' : newAcc === 0 ? (acc === 'n' ? 'n' : '') : (newAcc === 2 ? '##' : 'bb');
    return newLetter + accStr + newOct;
  });
}

export function transposeSongDef(def, steps, semis, newKey) {
  return { ...def, key: newKey, right: def.right ? transposeText(def.right, steps, semis) : def.right, left: def.left ? transposeText(def.left, steps, semis) : def.left };
}
