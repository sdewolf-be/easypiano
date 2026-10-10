import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, tip, warn } from '../diagrams.js';

// Accords primaires de Ré mineur (positions « confortables » de la main gauche)
const Dm = '[D3 F3 A3]', Gm = '[D3 G3 Bb3]', A7 = '[C#3 G3 A3]';
const DFA = 'D3/4 F3/4 A3/4', CGA = 'C#3/4 G3/4 A3/4', DGB = 'D3/4 G3/4 Bb3/4';

export default {
  id: 'c13',
  title: 'Ré mineur : gamme et accords',
  pages: '134–137',
  intro: 'Le relatif mineur de Fa majeur, l’ostinato de Scarborough Fair, les accords Dm‑Gm‑A7 et Raisins and Almonds.',
  lessons: [
    lesson('c13-l01', 'La gamme de Ré mineur', '134', `
      <p><b>Ré mineur</b> est le <b>relatif de Fa majeur</b> : même armure (<b>un Si♭</b>), et il commence sur le 6<sup>e</sup> degré de Fa (Fa Sol La Si♭ Do Ré → <b>Ré</b>). En forme <b>harmonique</b>, le 7<sup>e</sup> degré est haussé : <b>Do♯</b>, écrit comme altération accidentelle.</p>
      ${keyboardSvg({ low: 'D4', high: 'D5', highlight: ['D4', 'E4', 'F4', 'G4', 'A4', 'Bb4', 'C#5', 'D5'], labels: { D4: 'Ré', E4: 'Mi', F4: 'Fa', G4: 'Sol', A4: 'La', Bb4: 'Si♭', 'C#5': 'Do♯', D5: 'Ré' }, fingers: { D4: '1', E4: '2', F4: '3', G4: '1', A4: '2', Bb4: '3', 'C#5': '4', D5: '5' } })}
      ${miniScore({ key: 'Dm', right: 'D4/4:1 E4:2 F4:3 G4:1 | A4:2 Bb4:3 C#5:4 D5:5', left: 'D3/4:1 C#3:2 Bb2:3 A2:1 | G2:2 F2:3 E2:4 D2:5' })}
      <p>Doigtés : MD 1 2 3 <b>1</b> 2 3 4 5 ; MG (descendant depuis Ré3) 1 2 3 <b>1</b> 2 3 4 5. Deux touches noires dans la gamme (Si♭ et Do♯) : les doigts 3 et 4 de la main droite montent sur les noires, le pouce reste sur les blanches.</p>
      ${tip('Récapitulatif des relatifs : Do majeur ↔ La mineur (rien), Sol majeur ↔ Mi mineur (Fa♯), Fa majeur ↔ Ré mineur (Si♭).')}
    `, [
      play('Ré mineur harmonique, main droite', { title: 'Ré mineur harmonique (MD)', key: 'Dm', tempo: 72,
        right: 'D4/4:1 E4:2 F4:3 G4:1 | A4:2 Bb4:3 C#5:4 D5:5 | D5:5 C#5:4 Bb4:3 A4:2 | G4:1 F4:3 E4:2 D4:1' }),
      play('Ré mineur harmonique, main gauche', { title: 'Ré mineur harmonique (MG)', key: 'Dm', tempo: 72,
        left: 'D2/4:5 E2:4 F2:3 G2:2 | A2:1 Bb2:3 C#3:2 D3:1 | D3:1 C#3:2 Bb2:3 A2:1 | G2:2 F2:3 E2:4 D2:5' }),
      play('Mouvement contraire', { title: 'Ré mineur, mouvement contraire', key: 'Dm', tempo: 72,
        right: 'D4/4:1 E4:2 F4:3 G4:1 | A4:2 Bb4:3 C#5:4 D5:5 | D5:5 C#5:4 Bb4:3 A4:2 | G4:1 F4:3 E4:2 D4:1',
        left: 'D3/4:1 C#3:2 Bb2:3 A2:1 | G2:2 F2:3 E2:4 D2:5 | D2:5 E2:4 F2:3 G2:2 | A2:1 Bb2:3 C#3:2 D3:1' }),
      quiz('Ré mineur et ses altérations', [
        q('Joue la tonique de <b>Ré mineur</b>, relatif de Fa majeur.', ['D4']),
        q('Joue le <b>Si♭</b> de l’armure.', ['Bb']),
        q('Joue le <b>Do♯</b>, 7e degré haussé de la forme harmonique.', ['C#']),
        q('Joue le haut de la gamme en montant : La Si♭ Do♯ Ré.', ['A4', 'Bb4', 'C#5', 'D5']),
      ]),
    ]),

    lesson('c13-l02', 'Scarborough Fair', '135', `
      <p>Chanson anglaise ancienne, en Ré mineur <b>naturel</b> (pas de Do♯, mais un Si♮ et un Do♮ de passage : mode dorien). La main gauche joue un <b>ostinato</b> : le même motif <b>Ré Fa La</b> (5‑3‑1) répété presque toute la pièce, comme une harpe.</p>
      ${miniScore({ key: 'Dm', timeSig: [3, 4], left: 'D3/4:5 F3/4:3 A3/4:1 | D3/4 F3/4 A3/4 | C3/4:5 E3/4:3 A3/4:1 | D3/4 G3/4 Bn3/4' })}
      <p>Deux mesures d’introduction à la main gauche seule, puis la mélodie entre <b>p</b>. Attention aux deux variantes de l’ostinato : <b>Do Mi La</b> (mesure 5) et <b>Ré Sol Si♮</b> (mesure 9).</p>
      ${warn('Le ♮ devant le Si (mesure 9) annule le bémol de l’armure pour la mesure.')}
    `, [
      play('L’ostinato seul', { title: 'Ostinato Ré‑Fa‑La', key: 'Dm', tempo: 100, timeSig: [3, 4],
        left: 'D3/4:5 F3/4:3 A3/4:1 | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | C3/4:5 E3/4:3 A3/4:1 | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | D3/4:5 G3/4:2 Bn3/4:1 | ' + DFA + ' | ' + DFA + ' | D3/2.:5' },
        { text: 'Un mouvement de balancier régulier : 5‑3‑1, 5‑3‑1… sans accent sur le pouce.' }),
      play('Scarborough Fair', { title: 'Scarborough Fair', composer: 'Traditionnel anglais', key: 'Dm', tempo: 104, timeSig: [3, 4], tempoText: 'Calme',
        right: 'R/2. | R/2. | @p D4/2:1 D4/4 | A4/2:5 A4/4 | E4/4.:2 F4/8:3 E4/4:2 | D4/2.:1~ | D4/4 A4/4:2 C5/4:4 | D5/2:5 C5/4:4 | A4/4:2 Bn4/4:3 G4/4:1 | A4/2.:2~ | A4/2 D5/4:5 | D5/2 D5/4 | C5/2:4 A4/4:2 | A4/4:3 G4/4:2 F4/4:1 | E4/2.:2~ | E4/2. | D4/2:1 A4/4:5 | A4/2 F4/4:3 | E4/4:3 D4/4:2 C4/4:1 | D4/2.:2~ | D4/2. | [D4 D5]/2.:1,5~ | [D4 D5]/2.^',
        left: 'D3/4:5 F3/4:3 A3/4:1 | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | C3/4:5 E3/4:3 A3/4:1 | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | D3/4:5 G3/4:2 Bn3/4:1 | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | D3/2.:5^' },
        { text: 'La mélodie flotte au‑dessus de l’ostinato : main droite chantante, main gauche discrète et parfaitement régulière.' }),
    ]),

    lesson('c13-l03', 'Les accords primaires de Ré mineur', '136–137', `
      <table class="theory-table"><tr><th>Degré</th><th>Accord</th><th>Position MG (doigts)</th><th>Brisé</th></tr>
      <tr><td>i</td><td>Dm (Ré mineur)</td><td>Ré Fa La (5‑3‑1)</td><td>Ré – Fa – La</td></tr>
      <tr><td>iv</td><td>Gm (Sol mineur)</td><td>Ré Sol Si♭ (5‑2‑1)</td><td>Ré – Sol – Si♭</td></tr>
      <tr><td>V7</td><td>A7 (La septième)</td><td>Do♯ Sol La (5‑2‑1)</td><td>Do♯ – Sol – La</td></tr></table>
      ${miniScore({ key: 'Dm', timeSig: [3, 4], left: '[D3 F3 A3]/2. | [D3 G3 Bb3]/2. | [D3 F3 A3]/2. | [C#3 G3 A3]/2.' })}
      <p>C’est la <b>même forme de main</b> que pour La mineur (Am‑Dm‑E7), déplacée. Le Do♯ de l’accord A7 vient de la gamme harmonique.</p>
      <h3>Raisins and Almonds (Rozhinkes mit Mandlen)</h3>
      <p>Berceuse yiddish (Goldfaden, 1880), en Ré mineur à 3 temps. La main gauche joue les <b>accords brisés</b> Dm, Gm et A7 en continu ; la main droite chante, <b>mf</b>, avec de longues notes liées. La fin monte vers une sixte Fa‑Ré tenue.</p>
    `, [
      play('Progression i – iv – i – V7', { title: 'Accords primaires de Ré mineur', key: 'Dm', tempo: 84, timeSig: [3, 4],
        left: Dm + '/2.:5,3,1 | ' + Gm + '/2.:5,2,1 | ' + Dm + '/2. | ' + A7 + '/2.:5,2,1 | ' + Dm + '/2. | ' + Gm + '/2. | ' + A7 + '/2. | ' + Dm + '/2.' },
        { text: 'Dis « un, quatre, un, cinq‑sept ».' }),
      play('Les mêmes accords brisés', { title: 'Accords brisés de Ré mineur', key: 'Dm', tempo: 92, timeSig: [3, 4],
        left: 'D3/4:5 F3/4:3 A3/4:1 | D3/4:5 G3/4:2 Bb3/4:1 | D3/4:5 F3/4:3 A3/4:1 | C#3/4:5 G3/4:2 A3/4:1 | ' + DFA + ' | ' + DGB + ' | ' + CGA + ' | D3/2.:5' }),
      play('Raisins and Almonds', { title: 'Raisins and Almonds', composer: 'A. Goldfaden', key: 'Dm', tempo: 100, timeSig: [3, 4], tempoText: 'Berceuse',
        right: '@mf R/4 D4/4:1 F4/4:3 | A4/4:5 A4/4 A4/4 | A4/4.:5 G4/8:4 F4/8:3 G4/8:4 | A4/2.:5~ | A4/4 D4/4:1 F4/4:3 | A4/4:5 A4/4 A4/4 | A4/4.:5 G4/8:4 F4/8:3 G4/8:4 | A4/2.:5~ | A4/2 A4/4 | G4/2:2 A4/4:3 | Bb4/4:4 A4/4:3 G4/4:2 | A4/4:3 F4/2:1~ | F4/2. | Bb4/2:3 D5/4:5 | D5/4:5 C#5/4:4 D5/4:5 | F4/2.:1~ | F4/2. | E4/2:2 A4/4:5 | G4/4:4 A4/4:5 G4/4:4 | F4/4:3 E4/2:2~ | E4/2. | E4/2:2 A4/4:5 | [G4 C#5]/4:1,4 A4/4:2 A4/4 | [D4 A4]/2.:1,5~ | [D4 A4]/2. | E4/2:2 A4/4:5 | [G4 C#5]/4:1,4 A4/4:2 A4/4 | [F4 D5]/2.:1,5~ | [F4 D5]/2.^',
        left: 'R/2. | D3/4:5 F3/4:3 A3/4:1 | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | ' + DFA + ' | C#3/4:5 G3/4:2 A3/4:1 | ' + CGA + ' | ' + DFA + ' | ' + DFA + ' | D3/4:5 G3/4:2 Bb3/4:1 | ' + DGB + ' | ' + DFA + ' | ' + DFA + ' | ' + CGA + ' | ' + CGA + ' | ' + DFA + ' | ' + DFA + ' | ' + CGA + ' | ' + CGA + ' | ' + DFA + ' | ' + DFA + ' | ' + CGA + ' | ' + CGA + ' | D3/4:5 F3/4:3 A3/4:1 | D3/2.:5^' },
        { text: 'La levée Ré‑Fa lance la berceuse. Les accords brisés sont doux et réguliers, comme un balancement.' }),
      quiz('Les accords de Ré mineur', [
        q('Main gauche : joue <b>Dm</b> (Ré Fa La, 5‑3‑1).', ['D3', 'F3', 'A3'], { mode: 'chord' }),
        q('Main gauche : joue <b>Gm</b> en position confortable (Ré Sol Si♭, 5‑2‑1).', ['D3', 'G3', 'Bb3'], { mode: 'chord' }),
        q('Main gauche : joue <b>A7</b> (Do♯ Sol La, 5‑2‑1).', ['C#3', 'G3', 'A3'], { mode: 'chord' }),
        q('Joue l’accord brisé <b>A7</b> : Do♯, puis Sol, puis La.', ['C#3', 'G3', 'A3']),
        q('Main droite : joue <b>Gm</b> (Sol Si♭ Ré, 1‑2‑5).', ['G4', 'Bb4', 'D5'], { mode: 'chord' }),
      ]),
    ]),
  ],
};
