// Cursus junior : 6 chapitres courts (environ 10 minutes par jour), jusqu'à « Joyeux anniversaire ».
// Types d'activités :
//   discover : Piou présente une note (couleur + son), l'enfant la joue trois fois
//   find     : « Appuie sur Do ! » — retrouver la touche demandée (par le nom, ou par la couleur seule)
//   echo     : Piou joue une petite suite de notes, l'enfant la rejoue
//   ear      : Piou joue une note sans la montrer, l'enfant la retrouve parmi quelques candidates
//   melody   : jouer une chanson note après note (bulles de couleur)
//   party    : la fête de fin de cours
export const CHAPTERS = [
  {
    id: 'c1', title: 'Do, Ré, Mi', emoji: '🐣', sticker: '🐣', color: '#ff4b4b',
    intro: 'Bonjour ! Je suis Piou. On va apprendre trois notes : Do, Ré et Mi !',
    activities: [
      { id: 'c1-do', type: 'discover', note: 'C4', title: 'Do, la touche rouge', emoji: '🔴' },
      { id: 'c1-re', type: 'discover', note: 'D4', title: 'Ré, la touche orange', emoji: '🟠' },
      { id: 'c1-mi', type: 'discover', note: 'E4', title: 'Mi, la touche jaune', emoji: '🟡' },
      { id: 'c1-find', type: 'find', notes: ['C4', 'D4', 'E4'], count: 6, title: 'Trouve la note', emoji: '🔍' },
      { id: 'c1-song', type: 'melody', song: 'mi-re-do', title: 'Ma première chanson', emoji: '🎈' },
    ],
  },
  {
    id: 'c2', title: 'Fa et Sol', emoji: '🐸', sticker: '🐸', color: '#3ecf5a',
    intro: 'Deux nouvelles notes : Fa, la verte, et Sol, la bleue !',
    activities: [
      { id: 'c2-fa', type: 'discover', note: 'F4', title: 'Fa, la touche verte', emoji: '🟢' },
      { id: 'c2-sol', type: 'discover', note: 'G4', title: 'Sol, la touche bleue', emoji: '🔵' },
      { id: 'c2-find', type: 'find', notes: ['C4', 'D4', 'E4', 'F4', 'G4'], count: 6, title: 'Trouve la note', emoji: '🔍' },
      { id: 'c2-echo', type: 'echo', notes: ['C4', 'D4', 'E4', 'F4', 'G4'], rounds: 4, length: 2, title: 'Répète après Piou', emoji: '🦜' },
      { id: 'c2-song', type: 'melody', song: 'clair-debut', title: 'Au clair de la lune (le début)', emoji: '🌙' },
    ],
  },
  {
    id: 'c3', title: 'La et Si', emoji: '🦋', sticker: '🦋', color: '#9b5cff',
    intro: 'Encore deux notes : La, la violette, et Si, la rose. Tu les connaîtras toutes !',
    activities: [
      { id: 'c3-la', type: 'discover', note: 'A4', title: 'La, la touche violette', emoji: '🟣' },
      { id: 'c3-si', type: 'discover', note: 'B4', title: 'Si, la touche rose', emoji: '🩷' },
      { id: 'c3-colors', type: 'find', mode: 'color', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], count: 6, title: 'La chasse aux couleurs', emoji: '🎨' },
      { id: 'c3-echo', type: 'echo', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], rounds: 4, length: 3, title: 'Répète après Piou', emoji: '🦜' },
      { id: 'c3-song', type: 'melody', song: 'maman-debut', title: 'Ah ! vous dirai-je, maman', emoji: '⭐' },
    ],
  },
  {
    id: 'c4', title: 'La gamme', emoji: '🪜', sticker: '🐢', color: '#ff9b1a',
    intro: 'Toutes les notes à la suite, ça s’appelle une gamme. Et il y a un grand Do tout en haut !',
    activities: [
      { id: 'c4-do5', type: 'discover', note: 'C5', title: 'Le grand Do', emoji: '🔴' },
      { id: 'c4-up', type: 'melody', song: 'gamme-monte', title: 'La gamme qui monte', emoji: '🪜' },
      { id: 'c4-down', type: 'melody', song: 'gamme-descend', title: 'La gamme qui descend', emoji: '🛝' },
      { id: 'c4-ear', type: 'ear', notes: ['C4', 'G4', 'E4'], choices: 2, rounds: 5, title: 'Grandes oreilles', emoji: '👂' },
      { id: 'c4-song', type: 'melody', song: 'maman', title: 'Ah ! vous dirai-je, maman (en entier)', emoji: '⭐' },
    ],
  },
  {
    id: 'c5', title: 'Les notes d’en bas', emoji: '🐧', sticker: '🐧', color: '#2f96ff',
    intro: 'À gauche du Do, il y a des petites notes : le petit Sol, le petit La et le petit Si.',
    activities: [
      { id: 'c5-sol3', type: 'discover', note: 'G3', title: 'Le petit Sol', emoji: '🔵' },
      { id: 'c5-la3', type: 'discover', note: 'A3', title: 'Le petit La', emoji: '🟣' },
      { id: 'c5-si3', type: 'discover', note: 'B3', title: 'Le petit Si', emoji: '🩷' },
      { id: 'c5-find', type: 'find', notes: ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'], count: 6, exact: true, title: 'Trouve la note (grand clavier)', emoji: '🔍' },
      { id: 'c5-clair', type: 'melody', song: 'clair', title: 'Au clair de la lune (en entier)', emoji: '🌙' },
      { id: 'c5-jacques', type: 'melody', song: 'frere-jacques', title: 'Frère Jacques', emoji: '🔔' },
    ],
  },
  {
    id: 'c6', title: 'Joyeux anniversaire', emoji: '🎂', sticker: '🦄', color: '#ff5fb9',
    intro: 'La grande chanson de la fête ! On l’apprend en deux morceaux.',
    activities: [
      { id: 'c6-echo', type: 'echo', notes: ['G3', 'A3', 'B3', 'C4', 'D4'], rounds: 4, length: 3, title: 'Répète après Piou', emoji: '🦜' },
      { id: 'c6-part1', type: 'melody', song: 'anniv-1', title: 'Joyeux anniversaire (le début)', emoji: '🎂' },
      { id: 'c6-part2', type: 'melody', song: 'anniv-2', title: 'Joyeux anniversaire (la fin)', emoji: '🎂' },
      { id: 'c6-song', type: 'melody', song: 'anniv', title: 'Joyeux anniversaire (en entier)', emoji: '🎉' },
    ],
  },
  {
    id: 'c7', title: 'Plus haut, plus bas', emoji: '👂', sticker: '🐘', color: '#9b5cff',
    intro: 'Ferme les yeux : on joue avec les oreilles. Les notes montent et descendent !',
    activities: [
      { id: 'c7-ear3', type: 'ear', notes: ['C4', 'E4', 'G4'], choices: 3, rounds: 5, title: 'Grandes oreilles : trois notes', emoji: '👂' },
      { id: 'c7-updown', type: 'updown', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], minGap: 5, rounds: 5, title: 'Plus haut ou plus bas ?', emoji: '↕️' },
      { id: 'c7-ear-close', type: 'ear', notes: ['C4', 'D4', 'E4'], choices: 3, rounds: 5, title: 'Grandes oreilles : les voisines', emoji: '👂' },
      { id: 'c7-updown-close', type: 'updown', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], minGap: 2, rounds: 5, title: 'Plus haut ou plus bas ? (tout près)', emoji: '↕️' },
    ],
  },
  {
    id: 'c8', title: 'Le rythme', emoji: '🥁', sticker: '🐰', color: '#ff9b1a',
    intro: 'La musique, ça se tape dans les mains ! On suit la pulsation, puis on joue en même temps que moi.',
    activities: [
      { id: 'c8-beat1', type: 'beat', song: 'clair-debut', title: 'Tape avec Piou', emoji: '👏' },
      { id: 'c8-beat2', type: 'beat', song: 'frere-jacques', title: 'Tape avec Piou : Frère Jacques', emoji: '👏' },
      { id: 'c8-along1', type: 'playalong', song: 'clair-debut', title: 'Joue avec Piou', emoji: '🎶' },
      { id: 'c8-along2', type: 'playalong', song: 'maman-debut', title: 'Joue avec Piou : Ah ! vous dirai-je', emoji: '🎶' },
      { id: 'c8-along3', type: 'playalong', song: 'clair', title: 'Joue avec Piou : Au clair de la lune', emoji: '🎶' },
    ],
  },
  {
    id: 'c9', title: 'Les copains', emoji: '🤝', sticker: '🐼', color: '#3ecf5a',
    intro: 'Deux notes en même temps, ça fait des copains ! Et on peut jouer avec les deux mains.',
    activities: [
      { id: 'c9-do-sol', type: 'pair', notes: ['C4', 'G4'], title: 'Do et Sol, les copains', emoji: '🤝' },
      { id: 'c9-do-mi', type: 'pair', notes: ['C4', 'E4'], title: 'Do et Mi, les copains', emoji: '🤝' },
      { id: 'c9-song', type: 'melody', song: 'copains', title: 'La chanson des copains', emoji: '🎵' },
      { id: 'c9-hands', type: 'pair', notes: ['C3', 'C4'], hands: true, title: 'Les deux mains', emoji: '🙌' },
      { id: 'c9-clair', type: 'melody', song: 'clair-mains', title: 'Au clair de la lune à deux mains', emoji: '🙌' },
    ],
  },
  {
    id: 'c10', title: 'Chante avec Piou', emoji: '🎤', sticker: '🦜', color: '#ff5fb9', freeOrder: true,
    intro: 'Choisis ta chanson préférée ! Tu peux la jouer, ou juste chanter avec moi.',
    activities: [
      { id: 'c10-sing-clair', type: 'sing', song: 'clair', title: 'Chante : Au clair de la lune', emoji: '🎤' },
      { id: 'c10-mathurin', type: 'melody', song: 'mathurin', title: 'Dans la ferme de Mathurin', emoji: '🐮' },
      { id: 'c10-vent', type: 'melody', song: 'vive-le-vent', title: 'Vive le vent', emoji: '🎄' },
      { id: 'c10-ode', type: 'melody', song: 'ode', title: 'Ode à la joie', emoji: '🎻' },
      { id: 'c10-sing-vent', type: 'sing', song: 'vive-le-vent', title: 'Chante : Vive le vent', emoji: '🎤' },
      { id: 'c10-party', type: 'party', title: 'La fête !', emoji: '🥳' },
    ],
  },
];

export const ACTIVITIES = CHAPTERS.flatMap(ch => ch.activities.map((a, i) => ({ ...a, chapterId: ch.id, chapter: ch, index: i })));
const BY_ID = new Map(ACTIVITIES.map(a => [a.id, a]));
export const findActivity = (id) => BY_ID.get(id) || null;
export const chapterOf = (id) => CHAPTERS.find(c => c.id === id) || null;

// Objectif quotidien : 3 activités ≈ 10 minutes.
export const DAILY_GOAL = 3;

export function isUnlocked(activity, done, unlockAll = false) {
  if (unlockAll) return true;
  const k = ACTIVITIES.indexOf(activity);
  if (k <= 0) return true;
  const ch = activity.chapter;
  if (ch.freeOrder) {
    const first = ACTIVITIES.findIndex(x => x.id === ch.activities[0].id);
    const chapterOpen = first === 0 || !!done[ACTIVITIES[first - 1].id];
    if (activity.type === 'party') return chapterOpen && ch.activities.filter(a => a.type !== 'party').every(a => done[a.id]);
    return chapterOpen;
  }
  return !!done[ACTIVITIES[k - 1].id];
}

// Gommettes de l'album : une par chapitre terminé et une par chanson jouée.
export function albumStickers(done) {
  const out = CHAPTERS.map(c => ({ id: 'ch-' + c.id, emoji: c.sticker, label: c.title, won: chapterDone(c, done), kind: 'chapter' }));
  const seen = new Set();
  for (const a of ACTIVITIES) {
    if (a.type !== 'melody' || seen.has(a.song)) continue;
    seen.add(a.song);
    out.push({ id: 'song-' + a.song, emoji: a.emoji, label: a.title, won: !!done[a.id], kind: 'song', songId: a.song });
  }
  return out;
}

// Défi du jour : une activité déjà réussie, tirée au sort selon la date (hors chant et fête).
export function dailyChallenge(done, dateStr) {
  const pool = ACTIVITIES.filter(a => done[a.id] && a.type !== 'party' && a.type !== 'sing');
  if (pool.length < 2) return null;
  let h = 0; for (const ch of dateStr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return pool[h % pool.length];
}

// Accessoires de Piou : un par chapitre terminé.
export const OUTFITS = [
  { id: 'party', slot: 'hat', name: 'Chapeau de fête', chapter: 'c1', emoji: '🎉' },
  { id: 'glasses', slot: 'eyes', name: 'Lunettes', chapter: 'c2', emoji: '👓' },
  { id: 'bow', slot: 'neck', name: 'Nœud papillon', chapter: 'c3', emoji: '🎀' },
  { id: 'crown', slot: 'hat', name: 'Couronne', chapter: 'c4', emoji: '👑' },
  { id: 'scarf', slot: 'neck', name: 'Écharpe', chapter: 'c5', emoji: '🧣' },
  { id: 'cape', slot: 'neck', name: 'Cape de super-héros', chapter: 'c6', emoji: '🦸' },
  { id: 'headphones', slot: 'hat', name: 'Casque', chapter: 'c7', emoji: '🎧' },
  { id: 'sunglasses', slot: 'eyes', name: 'Lunettes de soleil', chapter: 'c8', emoji: '😎' },
  { id: 'medal', slot: 'neck', name: 'Médaille', chapter: 'c9', emoji: '🏅' },
  { id: 'cap', slot: 'hat', name: 'Casquette', chapter: 'c10', emoji: '🧢' },
];
export function unlockedOutfits(done) { return OUTFITS.filter(o => chapterDone(chapterOf(o.chapter), done)); }

export function nextActivity(done, unlockAll = false) {
  return ACTIVITIES.find(a => !done[a.id] && isUnlocked(a, done, unlockAll)) || ACTIVITIES[ACTIVITIES.length - 1];
}

export function chapterDone(chapter, done) {
  return chapter.activities.every(a => done[a.id]);
}

export function chapterStars(chapter, done) {
  return chapter.activities.reduce((s, a) => s + (done[a.id] ? done[a.id].stars : 0), 0);
}

export function totalStars(done) {
  return Object.values(done).reduce((s, d) => s + (d.stars || 0), 0);
}

// Chansons disponibles dans « Mes chansons » : celles dont l'activité est débloquée.
export function songActivities(done, unlockAll = false) {
  const seen = new Set();
  return ACTIVITIES.filter(a => a.type === 'melody' && isUnlocked(a, done, unlockAll) && !seen.has(a.song) && seen.add(a.song));
}
