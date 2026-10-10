// Parcours de cours : chaque leçon = explication + exercice joué en mode « Apprendre ».
export const LESSONS = [
  {
    id: 'l1-do',
    module: 'Les bases',
    title: 'Trouver le Do du milieu',
    text: `<p>Regarde ton clavier : les touches noires vont par groupes de <b>deux</b> et de <b>trois</b>.
      Le <b>Do</b> est la touche blanche juste à gauche d’un groupe de deux touches noires.</p>
      <p>Le <b>Do du milieu</b> (Do4) est celui qui se trouve au centre du clavier, près de la marque de ton piano.
      Joue-le avec le pouce de la main droite quand la ligne bleue arrive sur la note.</p>`,
    hands: 'R',
    song: { id: 'l1-do', title: 'Trouver le Do', tempo: 70, key: 'C', timeSig: [4, 4],
      right: 'C4/1 | C4/1 | C4/2 C4/2 | C4/1' },
  },
  {
    id: 'l2-do-re-mi',
    module: 'Les bases',
    title: 'Do, Ré, Mi',
    text: `<p>Place le pouce (1) sur le Do, l’index (2) sur le Ré et le majeur (3) sur le Mi.
      Sur la portée, chaque note monte d’une marche : <b>Do</b> sous la portée, <b>Ré</b> accroché à la première ligne, <b>Mi</b> sur la première ligne.</p>
      <p>Les notes en noir avec une tige sont des <b>noires</b> (1 temps) ; les notes blanches sont des <b>blanches</b> (2 temps).</p>`,
    hands: 'R',
    song: { id: 'l2', title: 'Do Ré Mi', tempo: 76, key: 'C', timeSig: [4, 4],
      right: 'C4/4 D4 E4 E4 | D4/4 C4 D4/2 | E4/4 E4 D4 D4 | C4/1' },
  },
  {
    id: 'l3-fa-sol',
    module: 'Les bases',
    title: 'Fa et Sol',
    text: `<p>Ajoute l’annulaire (4) sur le <b>Fa</b> et le petit doigt (5) sur le <b>Sol</b>.
      Ta main droite couvre maintenant cinq notes sans bouger : c’est la <b>position de Do</b>.</p>
      <p>Essaie de garder les doigts arrondis, comme si tu tenais une balle.</p>`,
    hands: 'R',
    song: { id: 'l3', title: 'Fa et Sol', tempo: 76, key: 'C', timeSig: [4, 4],
      right: 'C4/4 D4 E4 F4 | G4/2 G4/2 | G4/4 F4 E4 D4 | C4/1 | E4/4 F4 G4/2 | D4/4 E4 F4/2 | G4/4 F4 E4 D4 | C4/1' },
  },
  {
    id: 'l4-rythme',
    module: 'Le rythme',
    title: 'Noires, blanches et rondes',
    text: `<p>La <b>noire</b> dure 1 temps, la <b>blanche</b> 2 temps et la <b>ronde</b> 4 temps : toute la mesure.</p>
      <p>Active le métronome et joue en mode <b>Jouer</b> pour tester ton sens du rythme : tiens bien les notes longues jusqu’au bout.</p>`,
    hands: 'R',
    song: { id: 'l4', title: 'Rythme', tempo: 80, key: 'C', timeSig: [4, 4],
      right: 'C4/4 C4 C4 C4 | E4/2 E4/2 | G4/1 | E4/4 D4 C4/2 | G4/4 G4 E4/2 | F4/4 D4 C4/2 | E4/4 E4 D4 D4 | C4/1' },
  },
  {
    id: 'l5-main-gauche',
    module: 'La main gauche',
    title: 'Do, Si, La, Sol à la main gauche',
    text: `<p>La main gauche se lit sur la portée du bas, avec la <b>clé de Fa</b>.
      Pose le pouce (1) de la main gauche sur le <b>Do3</b> (une octave sous le Do du milieu),
      puis descends : <b>Si</b> (2), <b>La</b> (3), <b>Sol</b> (4).</p>`,
    hands: 'L',
    song: { id: 'l5', title: 'Main gauche', tempo: 72, key: 'C', timeSig: [4, 4],
      left: 'C3/4 B2 A2 G2 | G2/2 C3/2 | C3/4 B2 A2 G2 | C3/1 | G2/4 A2 B2 C3 | C3/2 G2/2 | A2/4 B2 C3 C3 | C3/1' },
  },
  {
    id: 'l6-deux-mains',
    module: 'La main gauche',
    title: 'Les deux mains ensemble',
    text: `<p>On assemble ! La main gauche joue des <b>rondes</b> pendant que la main droite joue la mélodie.
      Commence lentement : le mode <b>Apprendre</b> attend que tu aies joué toutes les notes avant d’avancer.</p>`,
    hands: 'RL',
    song: { id: 'l6', title: 'Deux mains', tempo: 72, key: 'C', timeSig: [4, 4],
      right: 'E4/4 D4 C4 D4 | E4 E4 E4/2 | D4/4 D4 D4/2 | E4/4 G4 G4/2 | E4/4 D4 C4 D4 | E4 E4 E4 E4 | D4 D4 E4 D4 | C4/1',
      left: 'C3/1 | C3/1 | G2/1 | C3/1 | C3/1 | C3/1 | G2/1 | C3/1' },
  },
  {
    id: 'l7-accords',
    module: 'Les accords',
    title: 'Les accords de Do et de Sol',
    text: `<p>Un <b>accord</b>, c’est plusieurs notes jouées en même temps. L’accord de <b>Do majeur</b> = Do Mi Sol,
      l’accord de <b>Sol majeur</b> = Sol Si Ré. Joue-les à la main gauche avec les doigts 5-3-1.</p>
      <p>Toutes les notes de l’accord doivent être enfoncées pour que la partition avance.</p>`,
    hands: 'L',
    song: { id: 'l7', title: 'Accords', tempo: 72, key: 'C', timeSig: [4, 4],
      left: '[C3 E3 G3]/1 | [G2 B2 D3]/1 | [C3 E3 G3]/2 [G2 B2 D3]/2 | [C3 E3 G3]/1 | [F3 A3 C4]/1 | [C3 E3 G3]/1 | [G2 B2 D3]/2 [G2 B2 D3]/2 | [C3 E3 G3]/1' },
  },
  {
    id: 'l8-alterations',
    module: 'Les altérations',
    title: 'Dièses et bémols',
    text: `<p>Un <b>dièse</b> (♯) hausse la note d’un demi-ton : on joue la touche noire juste à droite.
      Un <b>bémol</b> (♭) la baisse : touche noire juste à gauche. Le <b>bécarre</b> (♮) annule l’altération.</p>
      <p>Une altération vaut pour toute la mesure. À l’<b>armure</b> (au début de la portée), elle vaut pour tout le morceau.</p>`,
    hands: 'R',
    song: { id: 'l8', title: 'Altérations', tempo: 76, key: 'C', timeSig: [4, 4],
      right: 'C4/4 C#4 D4 D#4 | E4/2 E4/2 | E4/4 Eb4 D4 Db4 | C4/1 | F4/4 F#4 G4/2 | G4/4 Gb4 F4/2 | E4/4 F#4 G4 F#4 | G4/1' },
  },
];
