// Chansons de la version junior : main droite seule, une phrase par ligne (notation de js/music.js).
// `lyrics` : une syllabe par note (les silences ne comptent pas), pour que le parent puisse chanter.
import { parseVoice } from '../../js/music.js';

export const SONGS = {
  'mi-re-do': {
    title: 'Mi, Ré, Do',
    emoji: '🎈',
    tempo: 96,
    timeSig: [4, 4],
    right: `E4/4 D4 C4/2 | E4/4 D4 C4/2
            C4/8 C4 C4 C4 D4 D4 D4 D4 | E4/4 D4 C4/2`,
    lyrics: 'Mi Ré Do Mi Ré Do Do Do Do Do Ré Ré Ré Ré Mi Ré Do',
  },
  'clair-debut': {
    title: 'Au clair de la lune (le début)',
    emoji: '🌙',
    tempo: 92,
    timeSig: [4, 4],
    right: `C4/4 C4 C4 D4 | E4/2 D4/2 | C4/4 E4 D4 D4 | C4/1`,
    lyrics: 'Au clair de la lu ne mon a mi Pier rot',
  },
  'maman-debut': {
    title: 'Ah ! vous dirai-je, maman (le début)',
    emoji: '⭐',
    tempo: 96,
    timeSig: [4, 4],
    right: `C4/4 C4 G4 G4 | A4 A4 G4/2
            F4/4 F4 E4 E4 | D4 D4 C4/2`,
    lyrics: 'Ah vous di rai je ma man ce qui cau se mon tour ment',
  },
  'gamme-monte': {
    title: 'La gamme qui monte',
    emoji: '🪜',
    tempo: 84,
    timeSig: [4, 4],
    right: `C4/4 D4 E4 F4 | G4 A4 B4 C5`,
    lyrics: 'Do Ré Mi Fa Sol La Si Do',
  },
  'gamme-descend': {
    title: 'La gamme qui descend',
    emoji: '🛝',
    tempo: 84,
    timeSig: [4, 4],
    right: `C5/4 B4 A4 G4 | F4 E4 D4 C4`,
    lyrics: 'Do Si La Sol Fa Mi Ré Do',
  },
  'maman': {
    title: 'Ah ! vous dirai-je, maman',
    emoji: '⭐',
    tempo: 100,
    timeSig: [4, 4],
    right: `C4/4 C4 G4 G4 | A4 A4 G4/2
            F4/4 F4 E4 E4 | D4 D4 C4/2
            G4/4 G4 F4 F4 | E4 E4 D4/2
            G4/4 G4 F4 F4 | E4 E4 D4/2
            C4/4 C4 G4 G4 | A4 A4 G4/2
            F4/4 F4 E4 E4 | D4 D4 C4/2`,
    lyrics: `Ah vous di rai je ma man
             ce qui cau se mon tour ment
             Pa pa veut que je rai sonne
             comme u ne gran de per sonne
             Moi je dis que les bon bons
             va lent mieux que la rai son`,
  },
  'clair': {
    title: 'Au clair de la lune',
    emoji: '🌙',
    tempo: 96,
    timeSig: [4, 4],
    right: `C4/4 C4 C4 D4 | E4/2 D4/2 | C4/4 E4 D4 D4 | C4/1
            C4/4 C4 C4 D4 | E4/2 D4/2 | C4/4 E4 D4 D4 | C4/1
            D4/4 D4 D4 D4 | A3/2 A3/2 | D4/4 C4 B3 A3 | G3/1
            C4/4 C4 C4 D4 | E4/2 D4/2 | C4/4 E4 D4 D4 | C4/1`,
    lyrics: `Au clair de la lu ne mon a mi Pier rot
             Prê te moi ta plu me pour é crire un mot
             Ma chan delle est mor te je n'ai plus de feu
             Ou vre moi ta por te pour l'a mour de Dieu`,
  },
  'frere-jacques': {
    title: 'Frère Jacques',
    emoji: '🔔',
    tempo: 104,
    timeSig: [4, 4],
    right: `C4/4 D4 E4 C4 | C4 D4 E4 C4
            E4/4 F4 G4/2 | E4/4 F4 G4/2
            G4/8 A4 G4 F4 E4/4 C4 | G4/8 A4 G4 F4 E4/4 C4
            C4/4 G3 C4/2 | C4/4 G3 C4/2`,
    lyrics: `Frè re Jac ques Frè re Jac ques
             Dor mez vous Dor mez vous
             Son nez les ma ti nes Son nez les ma ti nes
             Ding dang dong Ding dang dong`,
  },
  'anniv-1': {
    title: 'Joyeux anniversaire (le début)',
    emoji: '🎂',
    tempo: 100,
    timeSig: [3, 4],
    right: `R/4 R/4 G3/8 G3/8 A3/4 G3/4 C4/4 B3/2
            R/4 G3/8 G3/8 A3/4 G3/4 D4/4 C4/2`,
    lyrics: `Joy eux an ni ver saire
             Joy eux an ni ver saire`,
  },
  'anniv-2': {
    title: 'Joyeux anniversaire (la fin)',
    emoji: '🎂',
    tempo: 100,
    timeSig: [3, 4],
    right: `R/4 G3/8 G3/8 G4/4 E4/4 C4/4 B3/4 A3/4
            F4/8 F4/8 E4/4 C4/4 D4/4 C4/2`,
    lyrics: `Joy eux an ni ver sai re
             Joy eux an ni ver saire`,
  },
  'anniv': {
    title: 'Joyeux anniversaire',
    emoji: '🎉',
    tempo: 104,
    timeSig: [3, 4],
    right: `R/4 R/4 G3/8 G3/8 A3/4 G3/4 C4/4 B3/2
            R/4 G3/8 G3/8 A3/4 G3/4 D4/4 C4/2
            R/4 G3/8 G3/8 G4/4 E4/4 C4/4 B3/4 A3/4
            F4/8 F4/8 E4/4 C4/4 D4/4 C4/2`,
    lyrics: `Joy eux an ni ver saire
             Joy eux an ni ver saire
             Joy eux an ni ver sai re
             Joy eux an ni ver saire`,
  },
  'mathurin': {
    title: 'Dans la ferme de Mathurin',
    emoji: '🐮',
    tempo: 104,
    timeSig: [4, 4],
    right: `C4/8 C4 C4/4 C4 G4 | A4 A4 G4/2 | E4/4 E4 D4 D4 | C4/1
            C4/8 C4 C4/4 C4 G4 | A4 A4 G4/2 | E4/4 E4 D4 D4 | C4/1`,
    lyrics: `Dans la fer me de Ma thu rin i a i a o
             Dans la fer me de Ma thu rin i a i a o`,
  },
  'vive-le-vent': {
    title: 'Vive le vent',
    emoji: '🎄',
    tempo: 110,
    timeSig: [4, 4],
    right: `E4/4 E4 E4/2 | E4/4 E4 E4/2 | E4/4 G4 C4 D4 | E4/1
            F4/4 F4 F4 F4 | F4 E4 E4 E4/8 E4/8 | E4/4 D4 D4 E4 | D4/2 G4/2
            E4/4 E4 E4/2 | E4/4 E4 E4/2 | E4/4 G4 C4 D4 | E4/1
            F4/4 F4 F4 F4 | F4 E4 E4 E4/8 E4/8 | G4/4 G4 F4 D4 | C4/1`,
    lyrics: `Vive le vent vive le vent vive le vent d'hi ver
             qui s'en va sif flant souf flant dans les grands sa pins verts oh !
             Vive le temps vive le temps vive le temps d'hi ver
             boule de neige et jour de l'an et bonne an née grand mère !`,
  },
  'ode': {
    title: 'Ode à la joie',
    emoji: '🎻',
    tempo: 100,
    timeSig: [4, 4],
    right: `E4/4 E4 F4 G4 | G4 F4 E4 D4 | C4 C4 D4 E4 | E4/4. D4/8 D4/2
            E4/4 E4 F4 G4 | G4 F4 E4 D4 | C4 C4 D4 E4 | D4/4. C4/8 C4/2`,
    lyrics: '',
  },
  'copains': {
    title: 'La chanson des copains',
    emoji: '🤝',
    tempo: 80,
    timeSig: [4, 4],
    right: `[C4 E4]/2 [C4 E4]/2 | [D4 F4]/2 [D4 F4]/2 | [C4 G4]/2 [C4 G4]/2 | [C4 E4]/1
            [C4 G4]/2 [D4 G4]/2 | [C4 E4]/2 [D4 F4]/2 | [C4 E4]/1`,
    lyrics: '',
  },
  'clair-mains': {
    title: 'Au clair de la lune à deux mains',
    emoji: '🙌',
    tempo: 84,
    timeSig: [4, 4],
    right: `[C3 C4]/4 C4 C4 D4 | [C3 E4]/2 D4/2 | [C3 C4]/4 E4 D4 D4 | [C3 C4]/1`,
    lyrics: 'Au clair de la lu ne mon a mi Pier rot',
  },
};

// Analyse d'une chanson : liste de notes (avec phrase, paroles, temps, durée) + étendue.
export function parseJuniorSong(id) {
  const def = SONGS[id];
  if (!def) throw new Error('Chanson inconnue : ' + id);
  const lines = def.right.split('\n').map(l => l.trim()).filter(Boolean);
  const lyrics = (def.lyrics || '').split(/\s+/).filter(Boolean);
  const notes = [];
  let t = 0, li = 0;
  lines.forEach((line, phrase) => {
    const v = parseVoice(line, 'R', def.timeSig || [4, 4]);
    for (const ev of v.events) {
      if (ev.rest) continue;
      const midis = ev.notes.map(n => n.midi);
      notes.push({ midi: midis[midis.length - 1], midis, chord: midis.length > 1, t: t + ev.t, dur: ev.dur, phrase, lyric: lyrics[li++] || '' });
    }
    t += v.totalBeats;
  });
  if (lyrics.length && lyrics.length !== notes.length) console.warn(`Paroles : ${lyrics.length} syllabes pour ${notes.length} notes (${id})`);
  return { id, title: def.title, emoji: def.emoji, tempo: def.tempo || 90, notes, phrases: lines.length, totalBeats: t };
}
