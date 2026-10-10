import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, rhythmTable, NOTE_GLYPHS as N, tip, cols } from '../diagrams.js';

const C_LH = '[C3 E3 G3]', G7_LH = '[B2 F3 G3]';

// Hanon n°1 et n°2 générés (croches, deux mains à l'octave)
function hanon(pattern) {
  const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const note = (deg, baseOct) => LETTERS[((deg % 7) + 7) % 7] + (baseOct + Math.floor(deg / 7));
  const up = [], down = [];
  for (let m = 0; m < 7; m++) up.push(pattern.up.map(d => note(d + m, 4) + '/8').join(' '));
  for (let m = 0; m < 7; m++) down.push(pattern.down.map(d => note(d + 6 - m, 4) + '/8').join(' '));
  const rh = up.concat(down).join(' | ') + ' | C5/1';
  const lh = rh.replace(/([A-G])(\d)/g, (s, l, o) => l + (parseInt(o, 10) - 1));
  return { rh, lh };
}
const h1 = hanon({ up: [0, 2, 3, 4, 5, 4, 3, 2], down: [4, 2, 1, 0, -1, 0, 1, 2] });
const h2 = hanon({ up: [0, 2, 3, 4, 5, 3, 4, 2], down: [4, 2, 1, 0, -1, 1, 0, 2] });

export default {
  id: 'c07',
  title: 'La position de Do du milieu',
  pages: '72–82',
  intro: 'Les deux pouces sur le Do du milieu, les croches, le point d’orgue, D.C. al Fine, Hanon et la noire pointée.',
  lessons: [
    lesson('c07-l01', 'Les pouces sur le Do du milieu', '72', `
      <p>Nouvelle position : les <b>deux pouces sur Do4</b>. Main droite Do‑Ré‑Mi‑Fa‑Sol (1 à 5), main gauche Do‑Si‑La‑Sol‑Fa en descendant (1 à 5).</p>
      ${keyboardSvg({ low: 'F3', high: 'G4', highlight: ['F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'], labels: { F3: 'Fa', G3: 'Sol', A3: 'La', B3: 'Si', C4: 'Do', D4: 'Ré', E4: 'Mi', F4: 'Fa', G4: 'Sol' }, fingers: { F3: '5', G3: '4', A3: '3', B3: '2', C4: '1', D4: '2', E4: '3', F4: '4', G4: '5' } })}
      <p>Le Do du milieu peut s’écrire sur une ligne supplémentaire <b>sous</b> la clé de Sol ou <b>au‑dessus</b> de la clé de Fa : c’est la même touche.</p>
      ${miniScore({ right: 'C4/4 D4 E4 F4 | G4/1', left: 'F3/4 G3 A3 B3 | C4/1' }, { showNames: true })}
    `, [
      play('Position de Do du milieu', { title: 'Les pouces sur Do', tempo: 76,
        right: 'R/1 | R/1 | R/1 | C4/4:1 D4:2 E4:3 F4:4 | G4:5 F4 E4 D4 | C4/1',
        left: 'F3/4:5 G3:4 A3:3 B3:2 | C4:1 B3 A3 G3 | F3/1 | R/1 | R/1 | R/1' }),
      play('Les pouces sur Do !', { title: 'Les pouces sur Do !', tempo: 92,
        right: 'R/1 | R/1 | R/1 | R/1 | @mf G4/4:5 F4:4 E4:3 D4:2 | C4:1 C4 C4/2 | C4/4 D4 E4 D4 | C4 C4 C4/2',
        left: '@mf F3/4:5 G3:4 A3:3 B3:2 | C4:1 C4 C4/2 | C4/4 B3 A3 B3 | C4 C4 C4/2 | R/1 | R/1 | R/1 | R/1' }),
    ]),

    lesson('c07-l02', 'Crescendo et diminuendo', '73', `
      <p><b>Crescendo</b> (<i>cresc.</i> ou le signe &lt;) : de plus en plus fort. <b>Diminuendo</b> (<i>dim.</i> ou &gt;) : de plus en plus doux. Ces « fourchettes » s’étendent sur les notes concernées.</p>
      ${tip('Un crescendo se construit : commence vraiment doux pour avoir de la marge.')}
    `, [
      play('Temps de valse', { title: 'Temps de valse', tempo: 108, timeSig: [3, 4], tempoText: 'Valse',
        right: 'R/4 [E4 G4]/4:3,5 [E4 G4]/4 | R/2. | R/4 [F4 G4]/4:4,5 [F4 G4]/4 | R/2. | R/4 [F4 G4]/4 [F4 G4]/4 | R/2. | R/4 [E4 G4]/4 [E4 G4]/4 | R/4 [E4 G4]/4 [E4 G4]/4 | R/4 [E4 G4] [E4 G4] | R/2. | R/4 [F4 G4] [F4 G4] | R/2. | R/4 [F4 G4] [F4 G4] | R/2. | R/4 [E4 G4] [E4 G4] | [E4 G4]/2.',
        left: '@p C4/2.:1 | C4/4 B3/4:2 A3/4:3 | G3/2.:4 | G3/4 F3:5 G3:4 | A3/2.:3~ | A3/4 B3 C4 | C4/2.~ | C4/2. | @cresc. C4/2. | C4/4 B3 A3 | G3/2. | G3/4 F3 G3 | @dim. A3/2.~ | A3/4 B3 C4 | C4/2.~ | C4/2.' },
        { text: 'Dans l’esprit de « Waltz Time » : la mélodie est à la main gauche. Monte en crescendo sur la 2e moitié, puis diminuendo.' }),
    ]),

    lesson('c07-l03', 'Le point d’orgue', '74', `
      <p>Le <b>point d’orgue</b> (𝄐) au‑dessus d’une note ou d’un silence signifie : <b>tiens‑la plus longtemps</b> que sa valeur, à ton goût. Il marque souvent une fin de phrase.</p>
      ${miniScore({ right: 'G4/4 E4 C4 | R/4 R/4 F4/4^ | E4/4 C4 D4 | C4/2.^', timeSig: [3, 4] })}
      ${tip('En mode « Jouer », l’appli ne prolonge pas la note : elle est juste si tu la joues au bon moment, tu peux la tenir ensuite.')}
    `, [
      play('Bonjour à toi (Good Morning to You)', { title: 'Bonjour à toi', composer: 'P. & M. Hill', tempo: 96, timeSig: [3, 4],
        right: 'R/2. | R/2. | R/4 [F4 G4]/4:4,5 R/4 | R/2. | R/4 R/4 D4/4:2 | R/4 [E4 G4]/4:3,5 R/4 | G4/4:5 E4/4:3 C4/4:1 | R/4 R/4 F4/4:4^ | E4/4:3 C4/4:1 D4/4:2 | R/4 [E4 G4]/4^ R/4',
        left: '@mf R/2 G3/4:4 | G3/4 A3/4:3 G3/4 | C4/2:1 R/4 | G3/4 G3/4 R/4 | C4/2 G3/4 | R/2. | G3/4 G3/4 G3/4^ | C4/2 G3/4 | C4/2^ R/4 | R/2.' },
        { text: 'La mélodie passe d’une main à l’autre autour du Do du milieu. Point d’orgue sur « Sol » (mesure 7) et sur la dernière note.' }),
    ]),

    lesson('c07-l04', 'Les croches', '75–76', `
      ${rhythmTable([[N.eighth, 'Croche', '½ temps : deux croches = une noire'], [N.quarter, 'Noire', '1 temps']])}
      <p>Deux croches sont souvent reliées par une <b>barre</b>. On compte « 1 et 2 et 3 et 4 et » : les croches tombent sur les chiffres et sur les « et ».</p>
      ${miniScore({ right: 'C4/8 C4 D4 D4 E4/4 E4 | C4/8 D4 E4 F4 G4/2' })}
      ${tip('Joue d’abord lentement en disant « 1 et 2 et ». Les croches doivent être parfaitement régulières.')}
    `, [
      play('Joyeux anniversaire', { title: 'Joyeux anniversaire', composer: 'P. & M. Hill', tempo: 100, timeSig: [3, 4],
        right: 'R/2. | R/2. | R/4 [F4 G4]/4:4,5 R/4 | R/2. | R/4 R/4 D4/4:2 | R/4 [E4 G4]/4:3,5 R/4 | G4/4:5 E4/4:3 C4/4:1 | R/4 R/4 F4/4:4^ | E4/4:3 C4/4:1 D4/4:2 | R/4 [E4 G4]/4^ R/4',
        left: '@mf R/2 G3/8:4 G3/8 | G3/4 A3/4:3 G3/4 | C4/2:1 R/4 | G3/8 G3/8 G3/4 R/4 | C4/2 G3/8 G3/8 | R/2. | G3/8 G3/8 G3/4 G3/4^ | C4/2 G3/8 G3/8 | C4/2^ R/4 | R/2.' },
        { text: 'Même chanson que « Bonjour à toi », avec les levées en croches : « Joy‑eux ».' }),
      play('Shoo, mouche, shoo !', { title: 'Shoo, mouche, shoo !', composer: 'Traditionnel', tempo: 104,
        right: '@mf E4/4:3 E4 C4:1 C4 | E4 E4 G4/2:5 | D4/4:2 D4 C4:1 C4 | D4 D4 F4/2:4 | E4/4:3 E4 C4 C4 | E4 E4 G4/2^ | D4/4:2 F4/4:4 E4/4:3 D4/4:2 | C4/2:1 C4/2' }),
      play('Skip to My Lou', { title: 'Skip to My Lou', composer: 'Traditionnel', tempo: 104,
        right: '@mf E4/4:3 E4 C4:1 C4 | E4/4 E4/8 E4/8 G4/2:5 | D4/4:2 D4 C4:1 C4 | D4/4 D4/8 D4/8 F4/2:4 | E4/4:3 E4 C4 C4 | E4/4 E4/8 E4/8 G4/2^ | D4/4:2 E4/8:3 F4/8:4 E4/4:3 C4/4:1 | C4/2 C4/2' },
        { text: 'Les paires de croches « Lou, my » doivent rester régulières : compte « 1 et ».' }),
    ]),

    lesson('c07-l05', 'D.C. al Fine', '77', `
      <p><b>D.C. al Fine</b> (<i>Da Capo al Fine</i>) : « reviens au début et joue jusqu’au mot <i>Fine</i> ». Dans l’appli, la reprise est écrite en entier : repère les annotations <i>Fine</i> et <i>D.C.</i>.</p>
      <p>Nouvelle note : <b>Do♯4</b> sous le 2<sup>e</sup> doigt (le pouce reste sur Do).</p>
    `, [
      play('Standing in the Need of Prayer', { title: 'Standing in the Need of Prayer', composer: 'Spiritual', tempo: 104, tempoText: 'Avec entrain',
        right: '@mf R/2 R/4 E4/4:3 | E4/2. E4/4 | E4/4 E4/4 C4/2:1 | C4/8 C4/8 C4/8 C4/8 E4/4 E4/4 | @f E4/2. E4/4 | E4/2. E4/4 | E4/4 E4/4 C4/2 | C4/8 C4/8 C4/8 C4/8 E4/4 E4/4 | @Fine C4/2. C4/8:1 C#4/8:2 | D4/8:2 C#4/8 D4/8 D4/8 D4/8 D4/8 D4/8 D4/8 | E4/4:3 E4/4 C4/2:1 | C4/8 C4/8 C4/8 C4/8 E4/4 E4/4 | E4/2. C4/8 C#4/8 | D4/8 C#4/8 D4/8 D4/8 D4/8 D4/8 D4/8 D4/8 | E4/4 E4/4 C4/2 | C4/8 C4/8 C4/8 C4/8 E4/4 E4/4 | @D.C._al_Fine C4/2. R/4 | R/2 R/4 E4/4:3 | E4/2. E4/4 | E4/4 E4/4 C4/2 | C4/8 C4/8 C4/8 C4/8 E4/4 E4/4 | E4/2. E4/4 | E4/2. E4/4 | E4/4 E4/4 C4/2 | C4/8 C4/8 C4/8 C4/8 E4/4 E4/4 | C4/2. R/4',
        left: 'R/1 | R/4 ' + C_LH + '/4:5,3,1 ' + C_LH + '/4 R/4 | ' + C_LH + '/4 ' + G7_LH + '/4:5,2,1 ' + G7_LH + '/2 | ' + G7_LH + '/2 ' + G7_LH + '/2 | ' + C_LH + '/2. R/4 | R/4 ' + C_LH + '/4 ' + C_LH + '/4 R/4 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + G7_LH + '/2 | ' + G7_LH + '/2 ' + G7_LH + '/2 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + C_LH + '/4 R/4 | ' + C_LH + '/4 R/4 ' + C_LH + '/4 R/4 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + G7_LH + '/2 | ' + G7_LH + '/2 ' + G7_LH + '/2 | ' + C_LH + '/2. R/4 | ' + C_LH + '/4 R/4 ' + C_LH + '/4 R/4 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + G7_LH + '/2 | ' + G7_LH + '/2 ' + G7_LH + '/2 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + C_LH + '/4 R/4 | R/1 | R/4 ' + C_LH + '/4 ' + C_LH + '/4 R/4 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + G7_LH + '/2 | ' + G7_LH + '/2 ' + G7_LH + '/2 | ' + C_LH + '/2. R/4 | R/4 ' + C_LH + '/4 ' + C_LH + '/4 R/4 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + G7_LH + '/2 | ' + G7_LH + '/2 ' + G7_LH + '/2 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + C_LH + '/4 R/4' },
        { text: 'La reprise (D.C.) est écrite en entier : la première partie revient à la fin, jusqu’au Fine.' }),
    ]),

    lesson('c07-l06', 'L’aérobic des doigts : Hanon', '78–79', `
      <p>Charles‑Louis Hanon (1819‑1900) a écrit des exercices qui font travailler chaque doigt dans toutes les combinaisons. Les deux premiers sont ici en croches, <b>mains à l’octave</b>.</p>
      <ul>
        <li>N°1 : le motif Do Mi Fa Sol La Sol Fa Mi monte d’un degré à chaque mesure, puis redescend. Doigtés MD 1 2 3 4 5 4 3 2, MG 5 4 3 2 1 2 3 4.</li>
        <li>Commence très lentement, mains séparées ; accélère seulement quand tout est égal. Lève bien chaque doigt.</li>
      </ul>
      ${miniScore({ right: 'C4/8 E4 F4 G4 A4 G4 F4 E4 | D4 F4 G4 A4 B4 A4 G4 F4' })}
    `, [
      play('Hanon n°1', { title: 'Hanon n°1', composer: 'C.-L. Hanon', tempo: 80, right: h1.rh, left: h1.lh }, { text: 'Mains à l’octave. Commence à 50 % du tempo, mains séparées.' }),
      play('Hanon n°2', { title: 'Hanon n°2', composer: 'C.-L. Hanon', tempo: 80, right: h2.rh, left: h2.lh }, { text: 'Même principe : le motif Do Mi Fa Sol La Fa Sol Mi.' }),
    ]),

    lesson('c07-l07', 'La noire pointée', '80–82', `
      ${rhythmTable([[N.quarter + '.', 'Noire pointée', '1 temps ½ (noire + croche)'], [N.quarter + '. ' + N.eighth, 'Noire pointée + croche', '2 temps : « 1 (et) 2 et »']])}
      <p>Le point ajoute la <b>moitié</b> de la valeur. La noire pointée est presque toujours suivie d’une croche : « lon‑gue cour‑te ».</p>
      ${miniScore({ right: 'C4/4. D4/8 E4/4 E4 | D4/8 C4 D4 E4 C4/2' })}
      <p>Quatre extraits célèbres utilisent ce rythme : <i>Douce nuit</i>, <i>Deck the Halls</i>, <i>Ce n’est qu’un au revoir</i>, la <i>Marche nuptiale</i>.</p>
    `, [
      play('Quatre extraits en noire pointée', { title: 'Extraits : noire pointée', tempo: 88, timeSig: [3, 4],
        right: 'F4/4.:4 G4/8:5 F4/4:4 | D4/2.:2 | F4/4. G4/8 F4/4 | D4/2.' },
        { text: 'Douce nuit (début) en position de Do, main droite. « Dou‑ce nuit » = noire pointée, croche, noire.' }),
      play('Deck the Halls (début)', { title: 'Deck the Halls', composer: 'Traditionnel', tempo: 100,
        right: 'G4/4.:5 F4/8:4 E4/4:3 D4/4:2 | C4/4:1 D4/4 E4/4 C4/4 | D4/8:2 E4/8:3 F4/8:4 D4/8:2 E4/4.:3 D4/8:2 | R/1',
        left: 'R/1 | R/1 | R/1 | C4/4:1 A3/4:3 B3/2:2' }),
      play('Ce n’est qu’un au revoir (début)', { title: 'Auld Lang Syne (début)', composer: 'Traditionnel écossais', tempo: 84,
        right: 'R/1 | R/2 R/4 E4/4:3 | D4/4.:2 C4/8:1 D4/4:2 E4/4:3 | C4/1:1',
        left: 'R/2. G3/4:4 | C4/4.:1 B3/8:2 C4/4 R/4 | R/1 | R/1' }),
      play('Marche nuptiale (Wagner)', { title: 'Marche nuptiale', composer: 'R. Wagner', tempo: 84,
        right: '@f C4/2:1 F4/4.:4 F4/8 | F4/1 | C4/2 G4/4.:5 E4/8:3 | F4/1:4' }),
      play('Alouette', { title: 'Alouette', composer: 'Traditionnel', tempo: 100, tempoText: 'Gai',
        right: '@f C4/4.:1 D4/8:2 E4/4:3 E4/4 | D4/8:2 C4/8:1 D4/8 E4/8:3 C4/4 R/4 | C4/4. D4/8 E4/4 E4/4 | D4/8 C4/8 D4/8 E4/8 C4/2 | R/1 | G4/8:5 G4/8 G4/4 G4/4 G4/4 | G4/8 G4/8 G4/4 R/2 | G4/4 F4/4:4 E4/4:3 D4/4:2 | C4/4.:1 D4/8 E4/4 E4/4 | D4/8 C4/8 D4/8 E4/8 C4/4 R/4 | C4/4. D4/8 E4/4 E4/4 | D4/8 C4/8 D4/8 E4/8 C4/2',
        left: C_LH + '/1:5,3,1 | ' + G7_LH + '/2:5,2,1 ' + C_LH + '/4 G3/4:1 | ' + C_LH + '/1 | ' + G7_LH + '/2 ' + C_LH + '/2 | C3/8:5 D3/8:4 E3/8:3 F3/8:2 G3/4:1 G3/4 | R/1 | R/2 G3/8 G3/8 G3/4 | G3/4 F3/4:2 E3/4:3 D3/4:4 | ' + C_LH + '/1 | ' + G7_LH + '/2 ' + C_LH + '/4 G3/4 | ' + C_LH + '/1 | ' + G7_LH + '/2 ' + C_LH + '/2' }),
    ]),
  ],
};
