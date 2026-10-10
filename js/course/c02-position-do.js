import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, rhythmTable, NOTE_GLYPHS as N, tip, cols } from '../diagrams.js';

export default {
  id: 'c02',
  title: 'La position de Do',
  pages: '12–19',
  intro: 'Les cinq premières notes de chaque main, les premières valeurs rythmiques et la lecture sur les deux clés.',
  lessons: [
    lesson('c02-l01', 'Main droite en position de Do', '12', `
      <p>Place le <b>pouce (1) sur le Do du milieu</b> ; les autres doigts tombent sur Ré, Mi, Fa, Sol. C’est la <b>position de Do</b> de la main droite.</p>
      ${keyboardSvg({ low: 'C4', high: 'B4', highlight: ['C4', 'D4', 'E4', 'F4', 'G4'], labels: { C4: 'Do', D4: 'Ré', E4: 'Mi', F4: 'Fa', G4: 'Sol' }, fingers: { C4: '1', D4: '2', E4: '3', F4: '4', G4: '5' } })}
      <p>Sur la portée, quand les notes <b>montent</b>, tu joues vers la <b>droite</b> ; quand elles descendent, vers la gauche. Une note sur une ligne ou dans un espace plus haut = une touche plus à droite.</p>
      ${miniScore({ right: 'C4/4:1 D4:2 E4:3 F4:4 G4:5' }, { showNames: true })}
      ${tip('Joue lentement, un doigt à la fois, les autres doigts restent posés sur leurs touches sans appuyer.')}
    `, [
      play('Échauffement de la main droite', { title: 'Échauffement MD', tempo: 72,
        right: 'C4/4:1 D4:2 E4:3 F4:4 | G4:5 C4:1 D4:2 E4:3 | F4:4 G4:5 G4:5 F4:4 | E4:3 D4:2 C4:1 G4:5 | F4:4 E4:3 D4:2 C4:1 | C4:1 D4:2 E4:3 F4:4 | G4:5 G4:5 F4:4 E4:3 | D4:2 C4:1 C4/2:1' },
        { text: 'Doigts arrondis, poignet souple. Dis le nom des notes en jouant.' }),
    ]),

    lesson('c02-l02', 'Noires, blanches, mesures', '13', `
      <h3>Les valeurs rythmiques</h3>
      ${rhythmTable([[N.quarter, 'Noire', '1 temps'], [N.half, 'Blanche', '2 temps']])}
      <ul>
        <li>La musique est découpée en <b>mesures</b> par des <b>barres de mesure</b>. La <b>double barre</b> marque la fin du morceau.</li>
        <li>Compte à voix haute : « 1 2 3 4 » pour quatre noires, « 1‑2 3‑4 » pour deux blanches.</li>
      </ul>
      ${miniScore({ right: 'C4/4 C4 C4 C4 | C4 C4 C4/2 | C4/4 C4 C4 C4 | C4/2 C4/2' })}
      ${tip('Le mode « Jouer » de l’appli fait défiler la partition à tempo régulier : c’est lui qui vérifie ton rythme. Le mode « Apprendre » attend chaque note.')}
    `, [
      play('Le rythme sur une touche', { title: 'Rythme : noires et blanches', tempo: 84,
        right: 'C4/4:1 C4 C4 C4 | C4 C4 C4/2 | C4/4 C4 C4 C4 | C4/2 C4/2' },
        { mode: 'play', text: 'En mode Jouer : compte « 1 2 3 4 » et tiens les blanches deux temps.' }),
      play('Ode à la joie', { title: 'Ode à la joie', composer: 'L. van Beethoven', tempo: 88, tempoText: 'Modéré',
        right: 'E4/4:3 E4 F4:4 G4:5 | G4 F4:4 E4:3 D4:2 | C4:1 C4 D4:2 E4:3 | E4/4:3 D4/4:2 D4/2 | E4/4:3 E4 F4:4 G4:5 | G4 F4:4 E4:3 D4:2 | C4:1 C4 D4:2 E4:3 | D4/4:2 C4/4:1 C4/2' },
        { text: 'Commence en mode Apprendre, puis passe en mode Jouer quand les notes sont sûres.' }),
    ]),

    lesson('c02-l03', 'La clé de Sol', '14–15', `
      <p>La <b>clé de Sol</b> s’enroule autour de la deuxième ligne de la portée : cette ligne est le <b>Sol4</b> (Sol au‑dessus du Do du milieu). Les notes de la main droite s’écrivent en général en clé de Sol.</p>
      ${miniScore({ right: 'C4/1 D4 E4 F4 G4' }, { showNames: true })}
      <ul>
        <li><b>Do4</b> s’écrit sur une petite <b>ligne supplémentaire</b> sous la portée. <b>Ré4</b> est accroché juste sous la première ligne.</li>
        <li><b>Mi4</b> est sur la 1<sup>re</sup> ligne, <b>Fa4</b> dans le 1<sup>er</sup> espace, <b>Sol4</b> sur la 2<sup>e</sup> ligne.</li>
        <li>Lis d’abord la <b>forme</b> de la mélodie (monte, descend, répète), puis vérifie le nom des notes.</li>
      </ul>
    `, [
      play('Lecture : lignes et espaces', { title: 'Lecture en clé de Sol', tempo: 76,
        right: 'C4/4:1 D4:2 E4:3 F4:4 | G4:5 F4:4 E4:3 D4:2 | C4/1:1 | C4/4:1 E4:3 G4:5 E4:3 | C4:1 E4:3 G4:5 E4:3 | G4:5 E4:3 C4/2:1 | D4/4:2 F4:4 D4:2 F4:4 | F4:4 D4:2 D4:2 F4:4 | D4:2 F4:4 D4/2:2' },
        { text: 'Dis le nom des notes à voix haute. Les notes sur les lignes (Mi, Sol) et dans les espaces (Fa) alternent.' }),
      play('Lecture : mélanges et notes répétées', { title: 'Lecture mêlée', tempo: 76,
        right: 'C4/4:1 E4:3 D4:2 F4:4 | E4:3 G4:5 E4:3 F4:4 | D4:2 E4:3 C4/2:1 | G4/4:5 E4:3 F4:4 D4:2 | E4:3 C4:1 D4:2 E4:3 | F4:4 E4:3 G4/2:5 | C4/4:1 C4 E4:3 E4 | D4:2 D4 F4:4 F4 | G4:5 G4 G4/2' }),
    ]),

    lesson('c02-l04', 'Main gauche en position de Do', '16', `
      <p>Main gauche : l’auriculaire (5) sur le <b>Do3</b> (le Do une octave sous le Do du milieu), puis Ré, Mi, Fa, Sol avec les doigts 4, 3, 2, 1.</p>
      ${keyboardSvg({ low: 'C3', high: 'B3', highlight: ['C3', 'D3', 'E3', 'F3', 'G3'], labels: { C3: 'Do', D3: 'Ré', E3: 'Mi', F3: 'Fa', G3: 'Sol' }, fingers: { C3: '5', D3: '4', E3: '3', F3: '2', G3: '1' } })}
      <h3>Les hampes</h3>
      <p>La <b>hampe</b> (la tige de la note) va vers le <b>haut</b> quand la note est sous la ligne du milieu, vers le <b>bas</b> quand elle est sur la ligne du milieu ou au‑dessus. Ça ne change rien au son.</p>
      ${miniScore({ left: 'G3/4:1 F3:2 E3:3 D3:4 C3:5 R/4 R/2' }, { showNames: true })}
    `, [
      play('Échauffement de la main gauche', { title: 'Échauffement MG', tempo: 72,
        left: 'G3/4:1 F3:2 E3:3 D3:4 | C3:5 G3:1 F3:2 E3:3 | D3:4 C3:5 C3:5 D3:4 | E3:3 F3:2 G3:1 C3:5 | D3:4 E3:3 F3:2 G3:1 | G3:1 F3:2 E3:3 D3:4 | C3:5 C3:5 D3:4 E3:3 | F3:2 G3:1 G3/2:1' },
        { text: 'Le 5e doigt est le plus faible : garde‑le arrondi, joue avec le poids du bras.' }),
    ]),

    lesson('c02-l05', 'La ronde', '17', `
      ${rhythmTable([[N.quarter, 'Noire', '1 temps'], [N.half, 'Blanche', '2 temps'], [N.whole, 'Ronde', '4 temps (toute la mesure en 4/4)']])}
      <p>Compte « 1‑2‑3‑4 » sur une ronde, sans relâcher la touche.</p>
      ${miniScore({ left: 'C3/4 C3 C3 C3 | C3 C3 C3/2 | C3/4 C3 C3 C3 | C3/1' })}
    `, [
      play('Le rythme avec la ronde', { title: 'Rythme : la ronde', tempo: 84,
        left: 'C3/4:5 C3 C3 C3 | C3 C3 C3/2 | C3/4 C3 C3 C3 | C3/1' }, { mode: 'play' }),
      play('Aura Lee', { title: 'Aura Lee', composer: 'G. R. Poulton', tempo: 80, tempoText: 'Modéré',
        left: 'C3/4:5 F3:2 E3:3 F3:2 | G3/4:1 D3/4:4 G3/2:1 | F3/4:2 E3:3 D3:4 E3:3 | F3/1:2 | C3/4:5 F3:2 E3:3 F3:2 | G3/4:1 D3/4:4 G3/2:1 | F3/4:2 E3:3 D3:4 E3:3 | F3/1:2' },
        { text: 'Mélodie à la main gauche seule. Tiens la ronde finale sur ses quatre temps.' }),
    ]),

    lesson('c02-l06', 'La clé de Fa', '18–19', `
      <p>La <b>clé de Fa</b> a deux points qui entourent la 4<sup>e</sup> ligne : cette ligne est le <b>Fa3</b> (Fa sous le Do du milieu). Les notes de la main gauche s’écrivent en général en clé de Fa.</p>
      ${miniScore({ left: 'C3/1 D3 E3 F3 G3' }, { showNames: true })}
      <ul>
        <li>En position de Do : <b>Do3</b> dans le 2<sup>e</sup> espace, <b>Ré3</b> sur la 3<sup>e</sup> ligne, <b>Mi3</b> dans le 3<sup>e</sup> espace, <b>Fa3</b> sur la 4<sup>e</sup> ligne, <b>Sol3</b> dans le 4<sup>e</sup> espace.</li>
        <li>Attention : la même position sur la portée ne désigne pas la même note en clé de Sol et en clé de Fa.</li>
      </ul>
    `, [
      play('Lecture en clé de Fa', { title: 'Lecture en clé de Fa', tempo: 76,
        left: 'C3/4:5 D3:4 E3:3 F3:2 | G3:1 F3:2 E3:3 D3:4 | C3/1:5 | C3/4:5 E3:3 G3:1 E3:3 | C3:5 E3:3 G3:1 E3:3 | G3:1 E3:3 C3/2:5 | D3/4:4 F3:2 D3:4 F3:2 | F3:2 D3:4 D3:4 F3:2 | D3:4 F3:2 D3/2:4' },
        { text: 'Dis le nom des notes à voix haute. Do, Mi, Sol sont dans les espaces ; Ré et Fa sur les lignes.' }),
      play('Lecture mêlée en clé de Fa', { title: 'Lecture mêlée MG', tempo: 76,
        left: 'C3/4:5 E3:3 D3:4 F3:2 | E3:3 G3:1 E3:3 F3:2 | D3:4 E3:3 C3/2:5 | G3/4:1 E3:3 F3:2 D3:4 | E3:3 C3:5 D3:4 E3:3 | F3:2 E3:3 G3/2:1 | C3/4:5 C3 D3:4 D3 | E3:3 E3 F3:2 F3 | G3:1 G3 G3/2' }),
    ]),
  ],
};
