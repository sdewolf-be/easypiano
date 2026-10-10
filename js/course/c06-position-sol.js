import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, tip, cols } from '../diagrams.js';

const G_LH = '[G2 B2 D3]', D7_LH = '[F#2 C3 D3]', CG_LH = '[G2 C3 E3]';
const G_RH = '[G4 B4 D5]', D7_RH = '[F#4 C5 D5]', CG_RH = '[G4 C5 E5]';

export default {
  id: 'c06',
  title: 'La position de Sol',
  pages: '50–71',
  intro: 'Cinq nouvelles notes par main, le dièse, les accords de Sol et Ré7, la pédale et l’accord de Do en position de Sol.',
  lessons: [
    lesson('c06-l01', 'La position de Sol et ses intervalles', '50–51', `
      <p>Main droite : pouce sur <b>Sol4</b>, puis La, Si, Do, Ré. Main gauche : 5<sup>e</sup> doigt sur <b>Sol2</b>, puis La, Si, Do, Ré3.</p>
      ${cols(keyboardSvg({ low: 'G2', high: 'G3', highlight: ['G2', 'A2', 'B2', 'C3', 'D3'], labels: { G2: 'Sol', A2: 'La', B2: 'Si', C3: 'Do', D3: 'Ré' }, fingers: { G2: '5', A2: '4', B2: '3', C3: '2', D3: '1' } }), keyboardSvg({ low: 'G4', high: 'G5', highlight: ['G4', 'A4', 'B4', 'C5', 'D5'], labels: { G4: 'Sol', A4: 'La', B4: 'Si', C5: 'Do', D5: 'Ré' }, fingers: { G4: '1', A4: '2', B4: '3', C5: '4', D5: '5' } }))}
      ${miniScore({ right: 'G4/4:1 A4:2 B4:3 C5:4 | D5:5 C5 B4 A4 | G4/1', left: 'G2/4:5 A2:4 B2:3 C3:2 | D3:1 C3 B2 A2 | G2/1' }, { showNames: true })}
      <p>Les intervalles se comptent de la même façon : Sol→La seconde, Sol→Si tierce, Sol→Do quarte, Sol→Ré quinte.</p>
    `, [
      play('Position de Sol : échauffement', { title: 'Position de Sol', tempo: 76,
        right: 'R/1 | R/1 | R/1 | G4/4:1 A4:2 B4:3 C5:4 | D5:5 C5:4 B4:3 A4:2 | G4/1:1',
        left: 'G2/4:5 A2:4 B2:3 C3:2 | D3:1 C3:2 B2:3 A2:4 | G2/1:5 | R/1 | R/1 | R/1' }),
      play('Intervalles en position de Sol', { title: 'Intervalles en position de Sol', tempo: 80,
        right: 'G4/4:1 A4:2 G4 B4:3 | G4 C5:4 G4 D5:5 | R/1 | R/1 | [G4 A4]/2:1,2 [G4 B4]/2:1,3 | [G4 C5]/2:1,4 [G4 D5]/2:1,5 | R/1 | R/1',
        left: 'R/1 | R/1 | D3/4:1 C3:2 D3 B2:3 | D3 A2:4 D3 G2:5 | R/1 | R/1 | [C3 D3]/2:2,1 [B2 D3]/2:3,1 | [A2 D3]/2:4,1 [G2 D3]/2:5,1' }),
      play('Aime quelqu’un (Love Somebody)', { title: 'Aime quelqu’un', composer: 'Traditionnel', tempo: 96,
        right: '@f G4/4:1 B4:3 D5:5 D5 | A4:2 B4:3 C5/2:4 | G4/4 B4 D5 D5 | C5:4 B4:3 A4/2:2 | @p G4/4 B4 D5 D5 | A4 B4 C5/2 | B4/4:3 B4 A4:2 A4 | A4 A4 G4/2:1',
        left: 'R/1 | [C3 D3]/4:2,1 [B2 D3]/4:3,1 [A2 D3]/2:4,1 | R/1 | [A2 D3]/4 [B2 D3]/4 [C3 D3]/2 | R/1 | [C3 D3]/4 [B2 D3]/4 [A2 D3]/2 | R/1 | [B2 D3]/4 [B2 D3]/4 [G2 D3]/2:5,1' }),
      play('Un ami comme toi', { title: 'Un ami comme toi', tempo: 92,
        right: '@mf R/4 D5/4:5 B4/4:3 A4/4:2 | G4/1:1~ | G4/4 D5/4:5 C5/4:4 B4/4:3 | A4/1:2~ | A4/4 D5/4 C5/4 B4/4 | G4/1~ | G4/4 D5/4 B4/4 A4/4 | G4/1',
        left: 'R/1 | [G2 D3]/4:5,1 [G2 D3]/4 [G2 D3]/4 [G2 D3]/4 | [G2 D3]/4 R/4 R/2 | [A2 D3]/4:4,1 [A2 D3]/4 [C3 D3]/4:2,1 [A2 D3]/4 | [A2 D3]/4 R/4 R/2 | [A2 D3]/4 [A2 D3]/4 [C3 D3]/4 [A2 D3]/4 | [G2 D3]/4 R/4 R/2 | [G2 D3]/1' },
        { text: 'Dans l’esprit de « A Friend Like You » : quintes et quartes harmoniques à la main gauche.' }),
    ]),

    lesson('c06-l02', 'Lire en position de Sol', '52–53', `
      <p>En position de Sol, la main droite lit <b>Sol4</b> (2<sup>e</sup> ligne) à <b>Ré5</b> (4<sup>e</sup> ligne) ; la main gauche <b>Sol2</b> (1<sup>re</sup> ligne) à <b>Ré3</b> (3<sup>e</sup> ligne).</p>
      ${miniScore({ right: 'G4/1 A4 B4 C5 D5', left: 'G2/1 A2 B2 C3 D3' }, { showNames: true })}
      ${tip('Pour lire vite, repère les notes « ancres » : Sol4 sur la ligne de la clé de Sol, Ré3 sur la ligne du milieu en clé de Fa.')}
    `, [
      play('Le chef de fanfare', { title: 'Le chef de fanfare', tempo: 108, tempoText: 'Marche',
        right: '@f G4/4:1 A4:2 B4:3 C5:4 | D5:5 B4:3 D5/2:5 | D5/4 C5:4 B4:3 A4:2 | G4:1 A4:2 B4/2:3 | R/1 | R/1 | R/1 | R/1 | G4/4 A4 B4 C5 | D5 B4 D5/2 | D5/4 C5 B4 A4 | G4/1',
        left: 'R/1 | R/1 | R/1 | R/1 | G2/4:5 A2:4 B2:3 C3:2 | D3:1 B2:3 D3/2:1 | D3/4 C3:2 B2:3 A2:4 | G2:5 A2:4 B2/2:3 | G2/4 A2 B2 C3 | D3 B2 D3/2 | D3/4 C3 B2 A2 | G2/1' },
        { text: 'Dans l’esprit de « The Bandleader » : chaque main défile tour à tour, puis ensemble.' }),
      quiz('Intervalles en position de Sol', [
        q('Joue une <b>tierce</b> au‑dessus de Sol4.', ['G4', 'B4']),
        q('Joue une <b>quinte</b> au‑dessus de Sol4.', ['G4', 'D5']),
        q('Joue une <b>quarte</b> au‑dessus de Sol4.', ['G4', 'C5']),
        q('Joue une <b>seconde</b> au‑dessus de Sol4.', ['G4', 'A4']),
        q('<b>Tierce harmonique</b> sur Sol4.', ['G4', 'B4'], { mode: 'chord' }),
        q('<b>Quinte harmonique</b> sur Sol2 (main gauche).', ['G2', 'D3'], { mode: 'chord' }),
        q('<b>Quarte harmonique</b> sur La2 (main gauche).', ['A2', 'D3'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c06-l03', 'Le dièse', '54–55', `
      <p>Un <b>dièse</b> (♯) devant une note signifie : joue la touche <b>juste à droite</b>, noire ou blanche. Do♯ est la touche noire à droite de Do ; Mi♯ est… Fa (touche blanche) !</p>
      ${keyboardSvg({ low: 'C4', high: 'B4', highlight: ['C#4', 'A#4'], labels: { 'C#4': 'Do♯', 'A#4': 'La♯', C4: 'Do', A4: 'La' } })}
      <ul>
        <li>Un dièse écrit devant une note vaut pour <b>toute la mesure</b> (toutes les notes de même nom et même hauteur qui suivent).</li>
        <li>À la mesure suivante, la note redevient naturelle.</li>
      </ul>
      ${miniScore({ right: 'D5/4 D5 C#5 D5 | B4 B4 A#4 B4 | G4/1' })}
    `, [
      play('L’argent ne fait pas tout', { title: 'L’argent ne fait pas tout', tempo: 108, tempoText: 'Marche',
        right: '@f D5/4:5 D5 C#5:4 D5 | B4/4:3 B4 B4/2 | B4/4 B4 A#4:2 B4 | G4/4:1 G4 G4/2 | G4/4:1 B4:3 A4:2 G4:1 | A4 A4 A4/2 | A4/4 D5:5 B4:3 A4:2 | D5 B4 G4/2 | @p D5/4 D5 C#5 D5 | B4 B4 B4/2 | B4/4 B4 A#4 B4 | G4 G4 G4/2 | G4/4 B4 A4 G4 | A4 A4 A4/2 | @f A4/4 D5 B4 A4 | G4/4 B4 G4/2',
        left: 'R/1 | [C3 D3]/4:2,1 [C3 D3]/4 [C3 D3]/2 | R/1 | ' + G_LH + '/4:5,3,1 ' + G_LH + '/4 ' + G_LH + '/2 | R/1 | [C3 D3]/4 [C3 D3]/4 [C3 D3]/2 | R/1 | ' + G_LH + '/4 ' + G_LH + '/4 ' + G_LH + '/2 | R/1 | [C3 D3]/4 [C3 D3]/4 [C3 D3]/2 | R/1 | ' + G_LH + '/4 ' + G_LH + '/4 ' + G_LH + '/2 | R/1 | [C3 D3]/4 [C3 D3]/4 [C3 D3]/2 | R/1 | ' + G_LH + '/4 ' + G_LH + '/4 ' + G_LH + '/2' },
        { text: 'Dans l’esprit de « Money Can’t Buy Ev’rything ». Do♯ avec le 4, La♯ avec le 2 : la main reste en position.' }),
      quiz('Jouer les dièses', [
        q('Joue <b>Do♯4</b>.', ['C#4']),
        q('Joue <b>Fa♯4</b>.', ['F#4']),
        q('Joue <b>Sol♯3</b> (main gauche).', ['G#3']),
        q('Joue <b>La♯4</b>.', ['A#4']),
        q('Joue <b>Mi♯4</b> (attention, c’est une touche blanche).', ['F4']),
        q('Joue <b>Si♯3</b> (touche blanche !).', ['C4']),
        q('Joue Ré4 puis <b>Ré♯4</b>.', ['D4', 'D#4']),
      ]),
    ]),

    lesson('c06-l04', 'Technique : des doigts égaux', '56–57', `
      <p>Les doigts 4 et 5 sont naturellement plus faibles. La solution de Leschetizky : <b>tenir</b> quatre touches enfoncées sans peser, et <b>répéter</b> la cinquième avec un seul doigt, lentement, en levant bien le doigt.</p>
      <ul>
        <li>Garde la main calme : seul le doigt qui joue bouge, depuis l’articulation de la main.</li>
        <li>Ne force jamais ; arrête si tu sens une tension.</li>
      </ul>
      ${tip('Dans l’appli : les quatre touches tenues sont jouées une fois en accord, puis le doigt actif répète sa note.')}
    `, [
      play('Un doigt à la fois (main droite)', { title: 'Doigts égaux MD', tempo: 72,
        right: '[A4 B4 C5 D5]/4:2,3,4,5 G4/4:1 G4 G4 | G4 G4 G4 G4 | [G4 B4 C5 D5]/4:1,3,4,5 A4/4:2 A4 A4 | A4 A4 A4 A4 | [G4 A4 C5 D5]/4:1,2,4,5 B4/4:3 B4 B4 | B4 B4 B4 B4 | [G4 A4 B4 D5]/4:1,2,3,5 C5/4:4 C5 C5 | C5 C5 C5 C5 | [G4 A4 B4 C5]/4:1,2,3,4 D5/4:5 D5 D5 | D5 D5 D5 D5' },
        { text: 'Après l’accord tenu, répète la note avec le doigt indiqué : lève‑le haut, pose‑le net.' }),
      play('Un doigt à la fois (main gauche)', { title: 'Doigts égaux MG', tempo: 72,
        left: '[G2 A2 B2 C3]/4:5,4,3,2 D3/4:1 D3 D3 | D3 D3 D3 D3 | [G2 A2 B2 D3]/4:5,4,3,1 C3/4:2 C3 C3 | C3 C3 C3 C3 | [G2 A2 C3 D3]/4:5,4,2,1 B2/4:3 B2 B2 | B2 B2 B2 B2 | [G2 B2 C3 D3]/4:5,3,2,1 A2/4:4 A2 A2 | A2 A2 A2 A2 | [A2 B2 C3 D3]/4:4,3,2,1 G2/4:5 G2 G2 | G2 G2 G2 G2' }),
    ]),

    lesson('c06-l05', 'Les accords de Sol et de Ré7 (main gauche)', '58–59', `
      <p>En position de Sol, la main gauche joue l’accord de <b>Sol majeur</b> (<b>G</b>) : Sol‑Si‑Ré, doigts 5‑3‑1, et l’accord de <b>Ré septième</b> (<b>D7</b>) : Fa♯‑Do‑Ré, doigts 5‑2‑1.</p>
      ${cols(keyboardSvg({ low: 'F2', high: 'E3', highlight: ['G2', 'B2', 'D3'], labels: { G2: 'G' }, fingers: { G2: '5', B2: '3', D3: '1' } }), keyboardSvg({ low: 'F2', high: 'E3', highlight: ['F#2', 'C3', 'D3'], labels: { 'F#2': 'D7' }, fingers: { 'F#2': '5', C3: '2', D3: '1' } }))}
      <p>Comme G7 appelle C, <b>D7 appelle G</b>. C’est la même relation, transposée en Sol.</p>
    `, [
      play('G et D7 à la main gauche', { title: 'G – D7 (MG)', tempo: 80,
        left: G_LH + '/1:5,3,1 | ' + D7_LH + '/1:5,2,1 | ' + G_LH + '/1 | ' + D7_LH + '/1 | ' + G_LH + '/1 | ' + G_LH + '/2 ' + D7_LH + '/2 | ' + G_LH + '/2 ' + D7_LH + '/2 | ' + G_LH + '/4 ' + G_LH + '/4 ' + D7_LH + '/4 ' + D7_LH + '/4 | ' + G_LH + '/4 ' + D7_LH + '/4 ' + G_LH + '/2' }),
      play('G et D7 en 3/4', { title: 'G – D7 en 3/4', tempo: 92, timeSig: [3, 4],
        left: G_LH + '/2.:5,3,1 | ' + D7_LH + '/2.:5,2,1 | ' + G_LH + '/2. | ' + D7_LH + '/2. | ' + G_LH + '/2.' }),
      play('Le coucou', { title: 'Le coucou', composer: 'Traditionnel', tempo: 100, timeSig: [3, 4], tempoText: 'Léger',
        right: '@mf D5/2:5 B4/4:3 | D5/2 B4/4 | A4/4:2 G4/4:1 A4/4 | B4/2. | A4/4 A4 B4 | C5/2:4 A4/4 | B4/4 B4 C5 | D5/2 B4/4 | D5/2:5 B4/4 | D5/2 B4/4 | A4 G4 A4 | G4/2.',
        left: G_LH + '/2.:5,3,1 | ' + G_LH + '/2. | ' + D7_LH + '/2.:5,2,1 | ' + G_LH + '/2. | ' + D7_LH + '/2.~ | ' + D7_LH + '/2. | ' + G_LH + '/2.~ | ' + G_LH + '/2. | ' + G_LH + '/2. | ' + G_LH + '/2. | ' + D7_LH + '/2. | ' + G_LH + '/2.' }),
    ]),

    lesson('c06-l06', 'G et D7 à la main droite, accords plaqués et brisés', '60', `
      <p>Main droite : <b>G</b> = Sol‑Si‑Ré (1‑3‑5), <b>D7</b> = Fa♯‑Do‑Ré (1‑4‑5).</p>
      ${cols(keyboardSvg({ low: 'F4', high: 'E5', highlight: ['G4', 'B4', 'D5'], labels: { G4: 'G' }, fingers: { G4: '1', B4: '3', D5: '5' } }), keyboardSvg({ low: 'F4', high: 'E5', highlight: ['F#4', 'C5', 'D5'], labels: { 'F#4': 'D7' }, fingers: { 'F#4': '1', C5: '4', D5: '5' } }))}
      <p>Un accord <b>plaqué</b> : les notes ensemble. Un accord <b>brisé</b> : les mêmes notes l’une après l’autre.</p>
      ${miniScore({ right: '[G4 B4 D5]/2. | G4/4 B4 D5 | [F#4 C5 D5]/2. | F#4/4 C5 D5', timeSig: [3, 4] })}
    `, [
      play('G et D7 à la main droite', { title: 'G – D7 (MD)', tempo: 80,
        right: G_RH + '/1:1,3,5 | ' + D7_RH + '/1:1,4,5 | ' + G_RH + '/1 | ' + D7_RH + '/1 | ' + G_RH + '/1' }),
      play('Plaqués et brisés', { title: 'Accords plaqués et brisés', tempo: 92, timeSig: [3, 4],
        right: G_RH + '/2.:1,3,5 | G4/4:1 B4:3 D5:5 | ' + D7_RH + '/2.:1,4,5 | F#4/4:1 C5:4 D5:5 | ' + G_RH + '/2. | G4/4 B4 D5 | ' + D7_RH + '/2. | F#4/4 C5 D5 | ' + G_RH + '/2.',
        left: G_LH + '/2.:5,3,1 | G2/4:5 B2:3 D3:1 | ' + D7_LH + '/2.:5,2,1 | F#2/4:5 C3:2 D3:1 | ' + G_LH + '/2. | G2/4 B2 D3 | ' + D7_LH + '/2. | F#2/4 C3 D3 | ' + G_LH + '/2.' }),
    ]),

    lesson('c06-l07', 'La pédale forte', '61', `
      <p>La <b>pédale de droite</b> (pédale forte ou de résonance) lève les étouffoirs : les sons continuent après avoir relâché les touches. On l’actionne avec le pied droit, talon au sol.</p>
      <ul>
        <li>Le signe <b>⌊____⌋</b> sous la portée indique quand enfoncer et relâcher la pédale.</li>
        <li>Avec la pédale, un accord brisé sonne comme un accord tenu : idéal pour un « chant de harpe ».</li>
      </ul>
      ${tip('Si ton piano numérique a une pédale, utilise‑la ici ; sinon, joue legato en tenant les notes du bout des doigts.')}
    `, [
      play('Chant de harpe', { title: 'Chant de harpe', tempo: 96, timeSig: [3, 4], tempoText: 'Fluide, avec pédale',
        right: 'R/2. | @mf G4/4:1 B4:3 D5:5 | R/2. | G4/4 B4 D5 | R/2. | F#4/4:1 C5:4 D5:5 | R/2. | F#4/4 C5 D5 | R/2. | @p G4/4 B4 D5 | R/2. | G4/4 B4 D5 | R/2. | F#4/4 C5 D5 | R/2. | G4/2.:1',
        left: 'G2/4:5 B2:3 D3:1 | R/2. | G2/4 B2 D3 | R/2. | F#2/4:5 C3:2 D3:1 | R/2. | F#2/4 C3 D3 | R/2. | G2/4 B2 D3 | R/2. | G2/4 B2 D3 | R/2. | F#2/4 C3 D3 | R/2. | G2/4 B2 D3 | R/2.' },
        { text: 'Dans l’esprit de « Harp Song » : change la pédale à chaque mesure de la main gauche.' }),
    ]),

    lesson('c06-l08', 'Révision : Liza Jane', '62–63', `
      <p>Une chanson populaire américaine pour réviser la position de Sol, les accords <b>G</b> et <b>D7</b> à la main gauche, la mélodie à la main gauche puis la réponse de la main droite.</p>
      ${miniScore({ left: '[G2 B2 D3]/2 [F#2 C3 D3]/2 | [G2 B2 D3]/4 [G2 B2 D3]/4 [F#2 C3 D3]/2 | [G2 B2 D3]/4 [G2 B2 D3]/4 [F#2 C3 D3]/4 [F#2 C3 D3]/4 | [G2 B2 D3]/4 [G2 B2 D3]/4 [G2 B2 D3]/4 R/4' })}
    `, [
      play('Enchaîner G et D7', { title: 'G – D7 : rythmes', tempo: 92,
        left: G_LH + '/2:5,3,1 ' + D7_LH + '/2:5,2,1 | ' + G_LH + '/4 ' + G_LH + '/4 ' + D7_LH + '/2 | ' + G_LH + '/4 ' + G_LH + '/4 ' + D7_LH + '/4 ' + D7_LH + '/4 | ' + G_LH + '/4 ' + G_LH + '/4 ' + G_LH + '/4 R/4',
        right: G_RH + '/2:1,3,5 ' + D7_RH + '/2:1,4,5 | ' + G_RH + '/4 ' + G_RH + '/4 ' + D7_RH + '/2 | ' + G_RH + '/4 ' + G_RH + '/4 ' + D7_RH + '/4 ' + D7_RH + '/4 | ' + G_RH + '/4 ' + G_RH + '/4 ' + G_RH + '/4 R/4' }),
      play('Liza Jane', { title: 'Liza Jane', composer: 'Traditionnel', tempo: 104, tempoText: 'Gai',
        right: 'R/1 | R/1 | @mf B4/4:3 C5/2:4 A4/4:2 | B4/1:3 | R/1 | R/1 | B4/4 C5/2 A4/4 | B4/1',
        left: '@mf B2/4:3 G2/4:5 A2/4:4 G2/4 | B2/4 D3/4:1 D3/2 | ' + G_LH + '/4:5,3,1 ' + G_LH + '/2 ' + D7_LH + '/4:5,2,1 | ' + G_LH + '/1 | B2/4 G2 A2 G2 | B2 D3 D3/2 | ' + G_LH + '/4 ' + G_LH + '/2 ' + D7_LH + '/4 | ' + G_LH + '/1' }),
    ]),

    lesson('c06-l09', 'Le Mi à la main gauche, l’accord de Do en position de Sol', '64–67', `
      <p>Le pouce de la main gauche monte sur <b>Mi3</b>. L’accord de <b>Do majeur</b> en position de Sol : Sol‑Do‑Mi, doigts <b>5‑2‑1</b>. Ce sont les mêmes notes que Do‑Mi‑Sol, dans un autre ordre (un <b>renversement</b>).</p>
      ${cols(keyboardSvg({ low: 'F2', high: 'E3', highlight: ['G2', 'B2', 'D3'], labels: { G2: 'G' }, fingers: { G2: '5', B2: '3', D3: '1' } }), keyboardSvg({ low: 'F2', high: 'E3', highlight: ['G2', 'C3', 'E3'], labels: { G2: 'C' }, fingers: { G2: '5', C3: '2', E3: '1' } }))}
      <p>Les trois accords de la position de Sol : <b>G</b> (5‑3‑1), <b>C</b> (5‑2‑1), <b>D7</b> (5‑2‑1). Le 5<sup>e</sup> doigt reste sur Sol pour G et C, descend sur Fa♯ pour D7.</p>
    `, [
      play('Mi main gauche et accord de Do', { title: 'Mi et accord C (MG)', tempo: 80, timeSig: [3, 4],
        left: 'G2/4:5 B2:3 D3:1 | G2 C3:2 E3:1 | G2 B2 D3 | G2 C3 E3 | ' + G_LH + '/2.:5,3,1 | ' + CG_LH + '/2.:5,2,1 | ' + G_LH + '/2. | ' + CG_LH + '/2. | ' + G_LH + '/2.' }),
      play('Échauffement G, D7, C (MG)', { title: 'Échauffement G – D7 – C', tempo: 92, timeSig: [3, 4],
        left: G_LH + '/2.:5,3,1 | G2/4:5 [B2 D3]/4:3,1 [B2 D3]/4 | ' + CG_LH + '/2.:5,2,1 | G2/4 [C3 E3]/4:2,1 [C3 E3]/4 | ' + D7_LH + '/2.:5,2,1 | F#2/4:5 [C3 D3]/4:2,1 [C3 D3]/4 | G2/4 [B2 D3]/4 [B2 D3]/4 | G2/2.' }),
      play('Beaux yeux bruns', { title: 'Beaux yeux bruns', composer: 'Traditionnel', tempo: 100, timeSig: [3, 4], tempoText: 'Tempo de valse',
        right: '@mf B4/4:3 B4 B4 | G4/4:1 A4:2 B4:3 | C5/4:4 B4/2~ | B4/2. | B4/4 B4 B4 | G4 A4 B4 | A4/2.:2 | D5/2.:5 | B4/4:3 B4 B4 | G4 A4 B4 | C5/4 B4/2~ | B4/2. | D5/4:5 A4/4:2 B4/4:3 | D5 B4 A4 | G4/2.:1~ | G4/2.',
        left: G_LH + '/2.:5,3,1~ | ' + G_LH + '/2. | G2/4:5 [C3 E3]/4:2,1 [C3 E3]/4 | G2/4 [C3 E3]/4 [C3 E3]/4 | ' + G_LH + '/2.~ | ' + G_LH + '/2. | F#2/4:5 [C3 D3]/4:2,1 [C3 D3]/4 | F#2/4 [C3 D3]/4 [C3 D3]/4 | ' + G_LH + '/2.~ | ' + G_LH + '/2. | G2/4 [C3 E3]/4 [C3 E3]/4 | G2/4 [C3 E3]/4 [C3 E3]/4 | ' + D7_LH + '/2.~ | ' + D7_LH + '/2. | G2/4:5 [B2 D3]/4:3,1 [B2 D3]/4 | G2/2.' }),
      play('Révision : G, C, D7 brisés', { title: 'G – C – D7 brisés (MG)', tempo: 92, timeSig: [3, 4],
        left: G_LH + '/2.:5,3,1 | ' + CG_LH + '/2.:5,2,1 | ' + G_LH + '/2. | ' + CG_LH + '/2. | ' + G_LH + '/2. | ' + D7_LH + '/2.:5,2,1 | ' + G_LH + '/2 ' + G_LH + '/4 | ' + G_LH + '/2. | G2/4:5 B2:3 D3:1 | G2 C3:2 E3:1 | F#2:5 C3:2 D3:1 | G2 B2 D3 | G2/4 [C3 E3]/4 [C3 E3]/4 | G2/4 [B2 D3]/4 [B2 D3]/4 | F#2/4 [C3 D3]/4 [C3 D3]/4 | ' + G_LH + '/2.' }),
    ]),

    lesson('c06-l10', 'Le Mi à la main droite, Do en position de Sol', '68–71', `
      <p>Main droite : le 5<sup>e</sup> doigt monte sur <b>Mi5</b>, le 3 glisse sur Do5. Accord de <b>Do</b> en position de Sol : Sol‑Do‑Mi, doigts <b>1‑3‑5</b>.</p>
      ${cols(keyboardSvg({ low: 'F4', high: 'E5', highlight: ['G4', 'B4', 'D5'], labels: { G4: 'G' }, fingers: { G4: '1', B4: '3', D5: '5' } }), keyboardSvg({ low: 'F4', high: 'E5', highlight: ['G4', 'C5', 'E5'], labels: { G4: 'C' }, fingers: { G4: '1', C5: '3', E5: '5' } }))}
    `, [
      play('Mi main droite et accord de Do', { title: 'Mi et accord C (MD)', tempo: 80, timeSig: [3, 4],
        right: 'G4/4:1 B4:3 D5:5 | G4 C5:3 E5:5 | G4 B4 D5 | G4 C5 E5 | ' + G_RH + '/2.:1,3,5 | ' + CG_RH + '/2.:1,3,5 | ' + G_RH + '/2. | ' + CG_RH + '/2. | ' + G_RH + '/2.' }),
      play('Échauffement G, D7, C (MD)', { title: 'Échauffement G – D7 – C (MD)', tempo: 92, timeSig: [3, 4],
        right: G_RH + '/4:1,3,5 ' + G_RH + ' ' + G_RH + ' | ' + D7_RH + '/4:1,4,5 ' + D7_RH + ' ' + D7_RH + ' | ' + G_RH + '/4 ' + G_RH + ' ' + G_RH + ' | ' + CG_RH + '/4:1,3,5 ' + CG_RH + ' ' + CG_RH + ' | ' + G_RH + '/4 ' + G_RH + ' ' + G_RH + ' | ' + G_RH + '/2.' }),
      play('Mélodie alpine', { title: 'Mélodie alpine', tempo: 112, timeSig: [3, 4], tempoText: 'Valse légère',
        right: '@p R/4 ' + G_RH + '/4:1,3,5 R/4 | R/4 ' + G_RH + '/4 R/4 | R/4 ' + D7_RH + '/4:1,4,5 R/4 | R/4 ' + D7_RH + '/4 ' + D7_RH + '/4 | R/4 ' + D7_RH + '/4 R/4 | R/4 ' + D7_RH + '/4 ' + D7_RH + '/4 | R/4 ' + G_RH + '/4 R/4 | R/4 ' + G_RH + '/4 ' + G_RH + '/4 | R/4 ' + CG_RH + '/4:1,3,5 R/4 | R/4 ' + CG_RH + '/4 R/4 | R/4 ' + G_RH + '/4 R/4 | R/4 ' + G_RH + '/4 ' + G_RH + '/4 | R/4 ' + D7_RH + '/4 R/4 | R/4 ' + D7_RH + '/4 R/4 | R/4 ' + G_RH + '/4 ' + G_RH + '/4 | ' + G_RH + '/2.',
        left: 'D3/2:1 B2/4:3 | G2/2:5 B2/4 | D3/2 C3/4:2 | F#2/2.:5 | D3/2 C3/4 | F#2/2. | D3/2 B2/4 | G2/2. | G2/2:5 C3/4:2 | E3/2:1 C3/4 | D3/2 B2/4 | G2/2. | D3/2 C3/4 | F#2/2 D3/4 | G2/2.~ | G2/2.' },
        { text: 'Dans l’esprit de « Alpine Melody » : mélodie à la main gauche, accords « en écho » à la droite.' }),
      play('Valse en position de Sol', { title: 'Valse en position de Sol', tempo: 104, timeSig: [3, 4],
        right: '@mf G4/4:1 B4/4:3 D5/4:5 | G4 B4 D5 | G4/4 [C5 E5]/4:3,5 [C5 E5]/4 | [C5 E5]/2 G4/4 | G4 B4 D5 | G4 B4 D5 | F#4/4:1 [C5 D5]/4:4,5 [C5 D5]/4 | [C5 D5]/2 G4/4 | G4 B4 D5 | G4 B4 D5 | G4 [C5 E5] [C5 E5] | [C5 E5]/2 G4/4 | G4 B4 D5 | F#4 C5 D5 | G4 B4 D5 | G4/2.',
        left: G_LH + '/2.:5,3,1~ | ' + G_LH + '/2. | ' + CG_LH + '/2.:5,2,1~ | ' + CG_LH + '/2 R/4 | ' + G_LH + '/2.~ | ' + G_LH + '/2. | ' + D7_LH + '/2.:5,2,1~ | ' + D7_LH + '/2 R/4 | ' + G_LH + '/2.~ | ' + G_LH + '/2. | ' + CG_LH + '/2.~ | ' + CG_LH + '/2 R/4 | ' + G_LH + '/2. | ' + D7_LH + '/2. | ' + G_LH + '/2. | ' + G_LH + '/2.' }),
    ]),
  ],
};
