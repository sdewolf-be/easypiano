import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, tip, cols } from '../diagrams.js';

const I = '[C3 E3 G3]', IV = '[C3 F3 A3]', V7 = '[B2 F3 G3]';

export default {
  id: 'c09',
  title: 'Gamme et accords de Do majeur',
  pages: '100–111',
  intro: 'La gamme majeure et le passage du pouce, les triades, les accords primaires I‑IV‑V7, le blues en 12 mesures et la position étendue.',
  lessons: [
    lesson('c09-l01', 'La gamme majeure et le passage du pouce', '100–102', `
      <p>Une <b>gamme majeure</b> = deux tétracordes reliés par un ton : <b>Do Ré Mi Fa</b> + <b>Sol La Si Do</b>. Pas de dièse ni de bémol en Do majeur. Chaque gamme commence et finit sur sa <b>tonique</b> (ici Do).</p>
      ${keyboardSvg({ low: 'C4', high: 'C5', highlight: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], labels: { C4: 'Do', D4: 'Ré', E4: 'Mi', F4: 'Fa', G4: 'Sol', A4: 'La', B4: 'Si', C5: 'Do' }, fingers: { C4: '1', D4: '2', E4: '3', F4: '1', G4: '2', A4: '3', B4: '4', C5: '5' } })}
      <h3>Le passage du pouce</h3>
      <p>Huit notes, cinq doigts : après le 3, le <b>pouce passe dessous</b> pour jouer le Fa (main droite en montant). En descendant, le <b>3 passe par‑dessus</b> le pouce. Dès que le pouce a joué sa note, glisse‑le sous la paume pour qu’il soit prêt.</p>
      <p>Main droite : 1 2 3 <b>1</b> 2 3 4 5. Main gauche (en montant) : 5 4 3 2 1 <b>3</b> 2 1.</p>
      ${miniScore({ right: 'C4/4:1 D4:2 E4:3 F4:1 | G4:2 A4:3 B4:4 C5:5', left: 'C3/4:5 D3:4 E3:3 F3:2 | G3:1 A3:3 B3:2 C4:1' })}
      ${tip('Penche légèrement la main dans la direction du mouvement, sans tordre le poignet.')}
    `, [
      play('Préparation : passer le pouce', { title: 'Passage du pouce', tempo: 72, timeSig: [3, 4],
        right: 'C4/4:1 D4:2 E4:3 | F4/2.:1 | F4/4:1 E4:3 D4:2 | C4/2.:1 | C4/4 D4 E4 | F4/2. | F4/4 E4 D4 | C4/2.',
        left: 'C4/4:1 B3:2 A3:3 | G3/2.:1 | G3/4:1 A3:3 B3:2 | C4/2.:1 | C4/4 B3 A3 | G3/2. | G3/4 A3 B3 | C4/2.' },
        { text: 'Mains séparées d’abord. Le pouce glisse sous le 3 (main droite) ; le 3 passe par‑dessus le pouce (main gauche).' }),
      play('Gamme de Do majeur, main droite', { title: 'Gamme de Do (MD)', tempo: 72,
        right: 'C4/4:1 D4:2 E4:3 F4:1 | G4:2 A4:3 B4:4 C5:5 | C5:5 B4:4 A4:3 G4:2 | F4:1 E4:3 D4:2 C4:1' }),
      play('Gamme de Do majeur, main gauche', { title: 'Gamme de Do (MG)', tempo: 72,
        left: 'C3/4:5 D3:4 E3:3 F3:2 | G3:1 A3:3 B3:2 C4:1 | C4:1 B3:2 A3:3 G3:1 | F3:2 E3:3 D3:4 C3:5' }),
      play('Gamme en mouvement contraire', { title: 'Gamme de Do, mouvement contraire', tempo: 72,
        right: 'C4/4:1 D4:2 E4:3 F4:1 | G4:2 A4:3 B4:4 C5:5 | C5:5 B4:4 A4:3 G4:2 | F4:1 E4:3 D4:2 C4:1',
        left: 'C4/4:1 B3:2 A3:3 G3:1 | F3:2 E3:3 D3:4 C3:5 | C3:5 D3:4 E3:3 F3:2 | G3:1 A3:3 B3:2 C4:1' },
        { text: 'Les deux mains partent du Do du milieu et s’écartent : mêmes numéros de doigts en même temps !' }),
    ]),

    lesson('c09-l02', 'Joy to the World', '103', `
      <p>Cette mélodie de Haendel est presque entièrement faite de <b>gammes</b> : une descente complète de Do5 à Do4 pour commencer, puis des remontées. Nouvelle nuance : <b>ff</b> (<i>fortissimo</i>), très fort.</p>
      ${miniScore({ right: 'C5/2 B4/4. A4/8 | G4/2. F4/4 | E4/2 D4/2 | C4/2. R/4' })}
    `, [
      play('Joy to the World', { title: 'Joy to the World', composer: 'G. F. Haendel', tempo: 100, tempoText: 'Joyeux',
        right: 'R/1 | R/1 | R/1 | R/2 R/4 G4/4:1 | A4/2.:2 A4/4 | B4/2.:3 B4/4 | @ff C5/2.:5 C5/4^ | C5/4:5 B4/4:4 A4/4:3 G4/4:2 | G4/4.:2 F4/8:1 E4/4:3 R/4 | R/1 | R/2 R/4 E4/4:3 | E4/4 E4 E4 E4/8 F4/8:4 | G4/2.:5 F4/8:4 E4/8:3 | D4/4:2 D4 D4 D4/8 E4/8:3 | F4/2.:4 E4/8:3 D4/8:2 | C4/4:1 C5/2:5 A4/4:3 | G4/4.:2 F4/8:1 E4/4:3 F4/4:4 | E4/2:3 D4/2:2 | C4/1:1',
        left: '@f C4/2:1 B3/4.:2 A3/8:3 | G3/2.:1 F3/4:2 | E3/2:3 D3/2:4 | C3/2.:5 R/4 | G3/2.:2 A3/4:1 | A3/2. B3/4 | B3/2.^ R/4 | R/1 | R/2 R/4 C4/4:1 | C4/4 B3/4:2 A3/4:3 G3/4:1 | G3/4. F3/8:2 E3/4:3 R/4 | ' + I + '/2.:5,3,1 R/4 | ' + IV + '/4:5,2,1 ' + IV + '/4 ' + IV + '/4 R/4 | ' + I + '/2. R/4 | ' + V7 + '/4:5,2,1 ' + V7 + '/4 ' + V7 + '/4 R/4 | ' + I + '/2. R/4 | ' + I + '/2. G3/4:1 | ' + V7 + '/2 ' + V7 + '/2 | ' + I + '/1' }),
    ]),

    lesson('c09-l03', 'Les triades', '104–105', `
      <p>Une <b>triade</b> est un accord de trois notes : <b>fondamentale</b> (1), <b>tierce</b> (3) et <b>quinte</b> (5). La fondamentale donne son nom à l’accord. En <b>position fondamentale</b>, les trois notes sont toutes sur des lignes ou toutes dans des espaces.</p>
      ${miniScore({ right: '[C4 E4 G4]/1 [D4 F4 A4] [E4 G4 B4] [F4 A4 C5] [G4 B4 D5] [A4 C5 E5] [B4 D5 F5] [C5 E5 G5]' })}
      <p>Le <b>vocabulaire des triades</b> à mémoriser : <b>Do</b> Mi Sol · <b>Ré</b> Fa La · <b>Mi</b> Sol Si · <b>Fa</b> La Do · <b>Sol</b> Si Ré · <b>La</b> Do Mi · <b>Si</b> Ré Fa. Chaque note saute une lettre.</p>
      <h3>Tonalité et armure</h3>
      <p>Un morceau construit sur la gamme de Do est <b>en Do majeur</b>. S’il y avait des dièses ou des bémols dans la gamme, ils seraient indiqués au début de chaque portée : c’est l’<b>armure</b>. En Do majeur : rien.</p>
    `, [
      play('Triades sur la gamme de Do', { title: 'Triades sur la gamme', tempo: 72,
        right: '[C4 E4 G4]/1:1,3,5 | [D4 F4 A4]/1 | [E4 G4 B4]/1 | [F4 A4 C5]/1 | [G4 B4 D5]/1 | [A4 C5 E5]/1 | [B4 D5 F5]/1 | [C5 E5 G5]/1',
        left: '[C3 E3 G3]/1:5,3,1 | [D3 F3 A3]/1 | [E3 G3 B3]/1 | [F3 A3 C4]/1 | [G3 B3 D4]/1 | [A3 C4 E4]/1 | [B3 D4 F4]/1 | [C4 E4 G4]/1' },
        { text: 'Écoute bien : certaines triades sonnent « claires » (majeures), d’autres « sombres » (mineures).' }),
      play('Cockles and Mussels (Molly Malone)', { title: 'Cockles and Mussels', composer: 'Traditionnel irlandais', tempo: 96, timeSig: [3, 4], tempoText: 'Modéré',
        right: '@mf R/2 C4/4:1 | C4/4. C4/8 C4/4 | C4/4 E4/4:3 C4/4 | C4/4. C4/8 C4/4 | C4/4 E4/4 C4/4~ | C4/4. E4/8 E4/4 | E4/4 D4/4:2 C4/4 | C4/4 B3/4:1 B3/4 | B3/2 R/4 | C4/4.:1 C4/8 C4/4 | C4/4 E4/4 C4/4 | C4/4. C4/8 C4/4 | C4/4 F4/4:4 E4/8:3 D4/8:2 | E4/4 D4/4 C4/4 | E4/4 D4/4 C4/4 | D4/4.:2 C4/8 D4/4 | C4/2^ R/4',
        left: 'R/2 R/4 | @p ' + I + '/2.:5,3,1~ | ' + I + '/2 R/4 | ' + I + '/2.~ | ' + I + '/2 R/4 | ' + I + '/2.~ | ' + I + '/2. | ' + V7 + '/2.:5,2,1~ | ' + V7 + '/2 G3/4:1 | ' + I + '/2.~ | ' + I + '/2 R/4 | ' + I + '/2.~ | ' + I + '/2 R/4 | ' + IV + '/2.:5,2,1~ | ' + IV + '/2. | ' + V7 + '/2 ' + V7 + '/4 | R/4 ' + I + '/2^' }),
      quiz('Le vocabulaire des triades', [
        q('Joue la triade de <b>Do</b> (Do Mi Sol), main droite 1‑3‑5.', ['C4', 'E4', 'G4'], { mode: 'chord' }),
        q('Joue la triade de <b>Fa</b> (Fa La Do).', ['F4', 'A4', 'C5'], { mode: 'chord' }),
        q('Joue la triade de <b>Sol</b> (Sol Si Ré).', ['G4', 'B4', 'D5'], { mode: 'chord' }),
        q('Joue la triade de <b>Ré</b> (Ré Fa La).', ['D4', 'F4', 'A4'], { mode: 'chord' }),
        q('Joue la triade de <b>La</b> (La Do Mi).', ['A4', 'C5', 'E5'], { mode: 'chord' }),
        q('Main gauche 5‑3‑1 : triade de <b>Mi</b> (Mi Sol Si).', ['E3', 'G3', 'B3'], { mode: 'chord' }),
        q('Main gauche : triade de <b>Si</b> (Si Ré Fa).', ['B2', 'D3', 'F3'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c09-l04', 'Les accords primaires : I, IV et V7', '106', `
      <p>Les trois accords les plus importants d’une tonalité sont construits sur les <b>1<sup>er</sup>, 4<sup>e</sup> et 5<sup>e</sup></b> degrés de la gamme : les <b>accords primaires</b>, notés en chiffres romains <b>I</b>, <b>IV</b> et <b>V</b>. On ajoute souvent une septième au V : <b>V7</b>.</p>
      <table class="theory-table"><tr><th>Degré</th><th>En Do majeur</th><th>Notes (position fondamentale)</th><th>Position « confortable » MG</th></tr>
      <tr><td>I</td><td>C (Do majeur)</td><td>Do Mi Sol</td><td>Do Mi Sol (5‑3‑1)</td></tr>
      <tr><td>IV</td><td>F (Fa majeur)</td><td>Fa La Do</td><td>Do Fa La (5‑2‑1) : le Do du haut descend d’une octave</td></tr>
      <tr><td>V7</td><td>G7 (Sol septième)</td><td>Sol Si Ré Fa</td><td>Si Fa Sol (5‑2‑1) : sans la quinte, tout sauf la fondamentale descend</td></tr></table>
      <p>Pourquoi ces positions ? Pour que la main <b>ne saute pas</b> : les accords C, F et G7 que tu connais déjà sont les I, IV et V7 de Do majeur. Dis les chiffres romains en jouant.</p>
      ${miniScore({ left: '[C3 E3 G3]/2 [C3 F3 A3]/2 | [C3 E3 G3]/2 [B2 F3 G3]/2 | [C3 E3 G3]/1' })}
    `, [
      play('Progression I – IV – I – V7 – I', { title: 'Progression en Do', tempo: 84,
        left: I + '/2:5,3,1 ' + IV + '/2:5,2,1 | ' + I + '/2 ' + V7 + '/2:5,2,1 | ' + I + '/4 ' + I + '/4 ' + IV + '/4 ' + IV + '/4 | ' + I + '/4 ' + I + '/4 ' + V7 + '/4 ' + V7 + '/4 | ' + I + '/1' },
        { text: 'Dis « un, quatre, un, cinq‑sept, un » en jouant.' }),
      quiz('Les accords primaires de Do majeur', [
        q('Joue l’accord <b>I</b> de Do majeur (main gauche).', ['C3', 'E3', 'G3'], { mode: 'chord' }),
        q('Joue l’accord <b>IV</b> de Do majeur, position confortable (Do Fa La).', ['C3', 'F3', 'A3'], { mode: 'chord' }),
        q('Joue l’accord <b>V7</b> de Do majeur, position confortable (Si Fa Sol).', ['B2', 'F3', 'G3'], { mode: 'chord' }),
        q('Joue l’accord <b>IV</b> en position fondamentale (Fa La Do).', ['F3', 'A3', 'C4'], { mode: 'chord' }),
        q('Joue l’accord <b>V7</b> complet en position fondamentale (Sol Si Ré Fa).', ['G2', 'B2', 'D3', 'F3'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c09-l05', 'Le blues en douze mesures', '107–109', `
      <p>Le <b>blues</b> suit une formule de <b>12 mesures</b> avec les accords primaires :</p>
      <table class="theory-table"><tr><td>I</td><td>I</td><td>I</td><td>I</td><td>IV</td><td>IV</td><td>I</td><td>I</td><td>V7</td><td>IV</td><td>I</td><td>I</td></tr></table>
      <ul>
        <li>Connais la formule et tu pourras jouer un blues dans n’importe quelle tonalité.</li>
        <li>Le <b>bécarre</b> (♮) annule un dièse ou un bémol : la note redevient une touche blanche.</li>
        <li>Les croches du blues peuvent se jouer « inégales » : longue‑courte, longue‑courte (le <b>swing</b>).</li>
        <li>La « <b>walking bass</b> » (basse qui marche) : Do, Mi♭, Mi♮, Sol… une basse qui monte vers l’accord.</li>
      </ul>
      ${miniScore({ left: 'C3/4. Eb3/8 En3/4 G3/4 | C3/4. Eb3/8 En3/4 G3/4' })}
    `, [
      play('La grille du blues en Do', { title: 'Grille de blues en Do', tempo: 92,
        left: I + '/1:5,3,1 | ' + I + '/1 | ' + I + '/1 | ' + I + '/1 | ' + IV + '/1:5,2,1 | ' + IV + '/1 | ' + I + '/1 | ' + I + '/1 | ' + V7 + '/1:5,2,1 | ' + IV + '/1 | ' + I + '/1 | ' + I + '/1' },
        { text: 'Dis les chiffres romains : « un, un, un, un, quatre, quatre, un, un, cinq‑sept, quatre, un, un ».' }),
      play('J’ai le blues', { title: 'J’ai le blues', tempo: 96, tempoText: 'Modérément lent, croches inégales',
        right: '@f C5/4:5 C5/4 C5/8 G4/8:2 A4/8 G4/8 | C5/4 C5/4 C5/8 G4/8 A4/8 G4/8 | C5/8 G4/8 A4/8 G4/8 C5/8 G4/8 A4/8 G4/8 | Bb4/8:4 G4/8:2 A4/8 G4/8 E4/8:1 G4/8 A4/8 G4/8 | @p C5/4:5 C5/4 C5/8 G4/8 A4/8 G4/8 | C5/4 C5/4 C5/8 G4/8 A4/8 G4/8 | C5/8 G4/8 A4/8 G4/8 C5/8 G4/8 A4/8 G4/8 | Bb4/8 G4/8 A4/8 G4/8 E4/8 G4/8 A4/8 G4/8 | @f D5/4:5 D5/4 D5/8 A4/8:2 B4/8 A4/8 | C5/4 C5/4 C5/8 G4/8 A4/8 G4/8 | C5/8 G4/8 A4/8 G4/8 C5/8 G4/8 A4/8 G4/8 | @rit. C5/8 G4/8 A4/8 G4/8 Bb4/2:4^',
        left: I + '/4\':5,3,1 ' + I + '/4\' ' + I + '/4\' R/4 | ' + I + '/4\' ' + I + '/4\' ' + I + '/4\' R/4 | ' + I + '/4\' R/4 ' + I + '/4\' R/4 | ' + I + '/4\' R/4 R/2 | ' + IV + '/4\':5,2,1 ' + IV + '/4\' ' + IV + '/4\' R/4 | ' + IV + '/4\' ' + IV + '/4\' ' + IV + '/4\' R/4 | ' + I + '/4\' R/4 ' + I + '/4\' R/4 | ' + I + '/4\' R/4 R/2 | ' + V7 + '/4\':5,2,1 ' + V7 + '/4\' ' + V7 + '/4\' R/4 | ' + IV + '/4\' ' + IV + '/4\' ' + IV + '/4\' R/4 | ' + I + '/4\' R/4 ' + I + '/4\' R/4 | ' + I + '/2 ' + I + '/2^' },
        { text: 'Dans l’esprit de « Got Those Blues! » : accords staccato à gauche, mélodie répétitive à droite. Essaie les croches inégales.' }),
      play('Chasser le blues', { title: 'Chasser le blues', tempo: 88, tempoText: 'Lent',
        right: '@mf E4/4:1 F4/8:2 F#4/8 G4/2 | E4/8 E4/8 F4/8 F#4/8 G4/4 Fn4/4 | G4/4 C5/4 R/2 | R/2 R/4 G4/8:4 G4/8 | Eb4/4:2 F4/8 F#4/8 G4/2 | Eb4/8 Eb4/8 F4/8 F#4/8 G4/4 Fn4/4 | E4/4 G4/4 R/2 | R/2 R/4 C5/8:2 G4/8 | B4/8 B4/8 B4/8 Bb4/8 Bn4/2 | A4/8 A4/8 F4/8 F4/8 A4/4 C5/4 | C5/2 R/2 | R/1',
        left: I + '/1:5,3,1 | ' + I + '/1 | ' + I + '/4 R/4 ' + I + '/4 R/4 | ' + I + '/8 ' + I + '/8 ' + I + '/4 ' + I + '/4 R/4 | ' + IV + '/1:5,2,1 | ' + IV + '/1 | ' + I + '/4 R/4 ' + I + '/4 R/4 | ' + I + '/8 ' + I + '/8 ' + I + '/4 ' + I + '/4 R/4 | ' + V7 + '/1:5,2,1 | ' + IV + '/1 | ' + I + '/4 R/4 ' + I + '/4 R/4 | ' + I + '/8 ' + I + '/8 ' + I + '/4 ' + I + '/4 R/4' },
        { text: 'Dans l’esprit de « Chasing the Blues Away » : les « blue notes » Mi♭, Fa♯ et Si♭ colorent la mélodie ; le bécarre les annule.' }),
      play('Blues du trompettiste', { title: 'Blues du trompettiste', tempo: 84, tempoText: 'Nonchalant',
        right: 'R/1 | R/1 | R/1 | R/1 | @mf C5/8:4 C5/8 Bb4/8 A4/8 G4/4 A4/4 | G4/4 R/4 R/2 | C5/8 C5/8 Bb4/8 A4/8 G4/4 A4/4 | G4/4 R/4 R/2 | Eb5/8:3 Eb5/8 D5/8 D5/8 C5/4 D5/4 | Eb5/8 Eb5/8 D5/8 D5/8 C5/4 D5/4 | C5/4 R/4 R/2 | R/1 | D5/8:5 D5/8 D5/8 Db5/8 Dn5/4 G4/4:1 | R/4 C5/8:3 C5/8 Eb5/4 D5/4 | C5/4 R/4 R/2 | C4/4:1 R/4 C5/4:5 R/4',
        left: 'C3/4.:5 Eb3/8:3 En3/4 G3/4:1 | C3/4. Eb3/8 En3/4 G3/4 | C3/4. Eb3/8 En3/4 G3/4 | C3/4. Eb3/8 En3/4 G3/4 | ' + I + '/1:5,3,1 | C3/4. Eb3/8 En3/4 G3/4 | ' + I + '/1 | C3/4. Eb3/8 En3/4 G3/4 | ' + IV + '/1:5,2,1 | ' + IV + '/1 | C3/4. Eb3/8 En3/4 G3/4 | C3/4. Eb3/8 En3/4 G3/4 | ' + V7 + '/1:5,2,1 | ' + IV + '/1 | C3/4. Eb3/8 En3/4 G3/4 | C3/4 R/4 C3/4 R/4' },
        { text: 'Dans l’esprit de « Blues for Wynton Marsalis » : la walking bass Do Mi♭ Mi♮ Sol porte tout le morceau.' }),
    ]),

    lesson('c09-l06', 'La position étendue', '110–111', `
      <p>La main droite peut s’<b>étendre</b> au‑delà de cinq touches voisines : Do (1) – Mi (2) – Sol (3) – Do (5). Les doigts s’écartent d’une tierce, d’une tierce puis d’une quarte.</p>
      ${keyboardSvg({ low: 'C4', high: 'C5', highlight: ['C4', 'E4', 'G4', 'C5'], labels: { C4: 'Do', E4: 'Mi', G4: 'Sol', C5: 'Do' }, fingers: { C4: '1', E4: '2', G4: '3', C5: '5' } })}
      <h3>Rappel : accords plaqués et brisés en Do</h3>
      ${miniScore({ left: '[C3 E3 G3]/2. | [C3 F3 A3]/2. | [B2 F3 G3]/2. | C3/4 E3 G3 | C3 F3 A3 | B2 F3 G3', timeSig: [3, 4] })}
    `, [
      play('Position étendue', { title: 'Position étendue', tempo: 92, timeSig: [3, 4],
        right: 'C4/4:1 E4/4:2 G4/4:3 | C5/2.:5 | C4/4 E4 G4 | C5/2. | C5/4:5 G4/4:3 E4/4:2 | C4/2.:1' }),
      play('Accords brisés I, IV, V7', { title: 'I – IV – V7 plaqués et brisés', tempo: 100, timeSig: [3, 4],
        left: I + '/2.:5,3,1 | ' + IV + '/2.:5,2,1 | ' + V7 + '/2.:5,2,1 | C3/4:5 E3:3 G3:1 | C3/4:5 F3:2 A3:1 | B2/4:5 F3:2 G3:1 | ' + I + '/2.' }),
      play('On Top of Old Smoky', { title: 'On Top of Old Smoky', composer: 'Traditionnel américain', tempo: 112, timeSig: [3, 4], tempoText: 'Modérément lent',
        right: '@mf R/2 C4/4:1 | C4/4 E4/4:2 G4/4:3 | C5/2.:5~ | C5/2. | A4/2.:3~ | A4/2 F4/4:1 | F4/4 G4/4 A4/4 | G4/2.~ | G4/2.~ | G4/2 C4/4:1 | C4/4 E4/4:3 G4/4 | G4/2. | F4/2.:2~ | F4/2 F4/8 E4/8 | F4/4 E4/4 D4/4 | C4/2.~ | C4/2.~ | C4/2 C4/4 | C4/4 E4/4:2 G4/4:3 | C5/2.:5 | A4/2.:3~ | A4/2 F4/4:1 | F4/4 G4/4 A4/4 | G4/2.~ | G4/2.~ | G4/2 C4/4:1 | C4/4 E4/4:3 G4/4 | G4/2. | D4/2.:2~ | D4/2 D4/8 E4/8 | F4/4 E4/4 D4/4 | C4/2.~ | C4/2. | C4/4:1 E4/4:2 G4/4:3 | C5/2.:5^',
        left: 'R/2. | C3/4:5 E3/4:3 G3/4:1 | C3/4:5 F3/4:2 A3/4:1 | C3/4 F3/4 A3/4 | C3/4 F3/4 A3/4 | C3/4 F3/4 A3/4 | C3/4 F3/4 A3/4 | B2/4:5 F3/4:2 G3/4:1 | B2/4 F3/4 G3/4 | B2/4 F3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 F3/4 A3/4 | C3/4 F3/4 A3/4 | B2/4 F3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 F3/4 A3/4 | C3/4 F3/4 A3/4 | C3/4 F3/4 A3/4 | C3/4 F3/4 A3/4 | B2/4 F3/4 G3/4 | B2/4 F3/4 G3/4 | B2/4 F3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | B2/4 F3/4 G3/4 | B2/4 F3/4 G3/4 | B2/4 F3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | ' + I + '/2.~ | ' + I + '/2.^' }),
    ]),
  ],
};
