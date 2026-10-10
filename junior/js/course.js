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
      { id: 'c6-party', type: 'party', title: 'La fête !', emoji: '🥳' },
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
  return !!done[ACTIVITIES[k - 1].id];
}

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
