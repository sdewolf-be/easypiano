// Bibliothèque de morceaux (mélodies du domaine public, arrangements simplifiés).
// Notation : voir js/music.js
export const SONGS = [
  {
    id: 'clair-de-lune',
    title: 'Au clair de la lune',
    composer: 'Traditionnel',
    level: 1,
    tempo: 84,
    timeSig: [4, 4],
    key: 'C',
    hint: 'Main droite sur les cinq premières notes (Do à Sol). La main gauche tient des rondes.',
    right: `
      C4/4 C4 C4 D4 | E4/2 D4/2 | C4/4 E4 D4 D4 | C4/1 |
      C4/4 C4 C4 D4 | E4/2 D4/2 | C4/4 E4 D4 D4 | C4/1 |
      D4/4 D4 D4 D4 | A3/2 A3/2 | D4/4 C4 B3 A3 | G3/1 |
      C4/4 C4 C4 D4 | E4/2 D4/2 | C4/4 E4 D4 D4 | C4/1`,
    left: `
      C3/1 | G2/1 | C3/1 | C3/1 |
      C3/1 | G2/1 | C3/1 | C3/1 |
      G2/1 | G2/1 | G2/1 | G2/1 |
      C3/1 | G2/1 | C3/1 | C3/1`,
  },
  {
    id: 'ah-vous-dirai-je',
    title: 'Ah ! vous dirai-je, maman',
    composer: 'Traditionnel',
    level: 1,
    tempo: 88,
    timeSig: [4, 4],
    key: 'C',
    hint: 'Un grand saut de Do à Sol au début : prépare le pouce et le petit doigt.',
    right: `
      C4/4 C4 G4 G4 | A4 A4 G4/2 | F4/4 F4 E4 E4 | D4 D4 C4/2 |
      G4/4 G4 F4 F4 | E4 E4 D4/2 | G4/4 G4 F4 F4 | E4 E4 D4/2 |
      C4/4 C4 G4 G4 | A4 A4 G4/2 | F4/4 F4 E4 E4 | D4 D4 C4/2`,
    left: `
      C3/1 | F3/2 C3/2 | F3/2 C3/2 | G2/2 C3/2 |
      C3/2 F3/2 | C3/2 G2/2 | C3/2 F3/2 | C3/2 G2/2 |
      C3/1 | F3/2 C3/2 | F3/2 C3/2 | G2/2 C3/2`,
  },
  {
    id: 'frere-jacques',
    title: 'Frère Jacques',
    composer: 'Traditionnel',
    level: 1,
    tempo: 96,
    timeSig: [4, 4],
    key: 'C',
    hint: 'Attention aux croches (« Sonnez les matines ») : deux notes par temps.',
    right: `
      C4/4 D4 E4 C4 | C4 D4 E4 C4 | E4 F4 G4/2 | E4/4 F4 G4/2 |
      G4/8 A4 G4 F4 E4/4 C4 | G4/8 A4 G4 F4 E4/4 C4 | C4/4 G3 C4/2 | C4/4 G3 C4/2`,
    left: `
      C3/1 | C3/1 | C3/2 G2/2 | C3/2 G2/2 |
      C3/1 | C3/1 | C3/2 G2/2 | C3/1`,
  },
  {
    id: 'ode-joie',
    title: 'Ode à la joie',
    composer: 'L. van Beethoven',
    level: 2,
    tempo: 100,
    timeSig: [4, 4],
    key: 'C',
    hint: 'Le rythme pointé (noire pointée + croche) à la fin des phrases.',
    right: `
      E4/4 E4 F4 G4 | G4 F4 E4 D4 | C4 C4 D4 E4 | E4/4. D4/8 D4/2 |
      E4/4 E4 F4 G4 | G4 F4 E4 D4 | C4 C4 D4 E4 | D4/4. C4/8 C4/2 |
      D4/4 D4 E4 C4 | D4/4 E4/8 F4/8 E4/4 C4/4 | D4/4 E4/8 F4/8 E4/4 D4/4 | C4/4 D4 G3/2 |
      E4/4 E4 F4 G4 | G4 F4 E4 D4 | C4 C4 D4 E4 | D4/4. C4/8 C4/2`,
    left: `
      C3/1 | G2/1 | C3/1 | G2/2 G2/2 |
      C3/1 | G2/1 | C3/1 | G2/2 C3/2 |
      G2/1 | C3/1 | G2/1 | G2/1 |
      C3/1 | G2/1 | C3/1 | G2/2 C3/2`,
  },
  {
    id: 'vive-le-vent',
    title: 'Vive le vent',
    composer: 'J. Pierpont',
    level: 2,
    tempo: 110,
    timeSig: [4, 4],
    key: 'C',
    hint: 'Les notes répétées (Mi Mi Mi) se jouent avec le même doigt, bien détachées.',
    right: `
      E4/4 E4 E4/2 | E4/4 E4 E4/2 | E4/4 G4 C4 D4 | E4/1 |
      F4/4 F4 F4 F4 | F4 E4 E4 E4/8 E4/8 | E4/4 D4 D4 E4 | D4/2 G4/2 |
      E4/4 E4 E4/2 | E4/4 E4 E4/2 | E4/4 G4 C4 D4 | E4/1 |
      F4/4 F4 F4 F4 | F4 E4 E4 E4/8 E4/8 | G4/4 G4 F4 D4 | C4/1`,
    left: `
      C3/1 | C3/1 | C3/1 | C3/1 |
      F3/1 | C3/1 | G2/1 | G2/1 |
      C3/1 | C3/1 | C3/1 | C3/1 |
      F3/1 | C3/1 | G2/2 G2/2 | C3/1`,
  },
  {
    id: 'joyeux-anniversaire',
    title: 'Joyeux anniversaire',
    composer: 'Traditionnel',
    level: 2,
    tempo: 100,
    timeSig: [3, 4],
    key: 'F',
    hint: 'En Fa majeur : tous les Si sont bémols (voir l’armure). Le morceau commence par une levée.',
    right: `
      R/4 R/4 C4/8 C4/8 | D4/4 C4/4 F4/4 | E4/2 C4/8 C4/8 | D4/4 C4/4 G4/4 |
      F4/2 C4/8 C4/8 | C5/4 A4/4 F4/4 | E4/4 D4/4 Bb4/8 Bb4/8 | A4/4 F4/4 G4/4 | F4/2 R/4`,
    left: `
      R/2. | F3/2. | C3/2. | C3/2. |
      F3/2. | F3/2. | Bb2/2. | C3/2. | F3/2.`,
  },
  {
    id: 'greensleeves',
    title: 'Greensleeves',
    composer: 'Traditionnel anglais',
    level: 3,
    tempo: 96,
    timeSig: [3, 4],
    key: 'Am',
    hint: 'Mélodie en La mineur avec des Sol♯ et Fa♯ : regarde bien les altérations.',
    right: `
      R/2 A4/4 | C5/2 D5/4 | E5/4. F5/8 E5/4 | D5/2 B4/4 | G4/4. A4/8 B4/4 |
      C5/2 A4/4 | A4/4. G#4/8 A4/4 | B4/2 G#4/4 | E4/2 A4/4 |
      C5/2 D5/4 | E5/4. F5/8 E5/4 | D5/2 B4/4 | G4/4. A4/8 B4/4 |
      C5/4. B4/8 A4/4 | G#4/4. F#4/8 G#4/4 | A4/2.`,
    left: `
      R/2. | A2/2. | C3/2. | G2/2. | G2/2. |
      A2/2. | F3/2. | E3/2. | A2/2. |
      A2/2. | C3/2. | G2/2. | G2/2. |
      A2/2. | E3/2. | A2/2.`,
  },
  {
    id: 'lettre-a-elise',
    title: 'Lettre à Élise (début)',
    composer: 'L. van Beethoven',
    level: 3,
    tempo: 72,
    timeSig: [3, 8],
    key: 'Am',
    hint: 'Mesure à 3/8 : chaque mesure dure trois croches. Mi – Ré♯ – Mi, tout en légèreté.',
    right: `
      R/8 E5/8 D#5/8 | E5/8 D#5/8 E5/8 | B4/8 D5/8 C5/8 | A4/4 R/8 | C4/8 E4/8 A4/8 | B4/4 R/8 | E4/8 G#4/8 B4/8 | C5/4 R/8 |
      E4/8 E5/8 D#5/8 | E5/8 D#5/8 E5/8 | B4/8 D5/8 C5/8 | A4/4 R/8 | C4/8 E4/8 A4/8 | B4/4 R/8 | E4/8 C5/8 B4/8 | A4/4.`,
    left: `
      R/4. | R/4. | R/4. | A2/8 E3/8 A3/8 | R/4. | E2/8 E3/8 G#3/8 | R/4. | A2/8 E3/8 A3/8 |
      R/4. | R/4. | R/4. | A2/8 E3/8 A3/8 | R/4. | E2/8 E3/8 G#3/8 | R/4. | A2/8 E3/8 A3/8`,
  },
];
