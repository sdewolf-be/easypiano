import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, tip, warn, cols } from '../diagrams.js';

// Accords primaires de La mineur (positions « confortables » de la main gauche)
const Am = '[A2 C3 E3]', Dm = '[A2 D3 F3]', E7 = '[G#2 D3 E3]';
const Am_RH = '[A4 C5 E5]', Dm_RH = '[A4 D5 F5]', E7_RH = '[G#4 D5 E5]';

export default {
  id: 'c12',
  title: 'La mineur : gammes, accords et pédale',
  pages: '126–133',
  intro: 'Le relatif mineur, les trois formes de la gamme mineure, la pédale chevauchée, tierces et triades majeures/mineures, les accords Am‑Dm‑E7.',
  lessons: [
    lesson('c12-l01', 'La mineur, relatif de Do majeur', '126 et 128', `
      <p>Chaque gamme majeure a une <b>gamme mineure relative</b> qui partage la <b>même armure</b>. Elle commence sur le <b>6<sup>e</sup> degré</b> de la majeure : Do → <b>La</b>. La mineur n’a donc ni dièse ni bémol à l’armure.</p>
      ${keyboardSvg({ low: 'A3', high: 'A4', highlight: ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G#4', 'A4'], labels: { A3: 'La', B3: 'Si', C4: 'Do', D4: 'Ré', E4: 'Mi', F4: 'Fa', 'G#4': 'Sol♯', A4: 'La' }, fingers: { A3: '1', B3: '2', C4: '3', D4: '1', E4: '2', F4: '3', 'G#4': '4', A4: '5' } })}
      <h3>Trois formes de la gamme mineure</h3>
      <table class="theory-table"><tr><th>Forme</th><th>Notes (La mineur)</th><th>Particularité</th></tr>
      <tr><td><b>Naturelle</b></td><td>La Si Do Ré Mi Fa Sol La</td><td>Exactement les notes de Do majeur</td></tr>
      <tr><td><b>Harmonique</b></td><td>La Si Do Ré Mi Fa <b>Sol♯</b> La</td><td>7<sup>e</sup> degré haussé d’un demi‑ton (la plus utilisée)</td></tr>
      <tr><td><b>Mélodique</b></td><td>montée : La Si Do Ré Mi <b>Fa♯ Sol♯</b> La<br>descente : comme la naturelle</td><td>6<sup>e</sup> et 7<sup>e</sup> haussés en montant seulement</td></tr></table>
      <p>Le <b>Sol♯</b> (et le Fa♯ de la forme mélodique) ne sont pas à l’armure : ils s’écrivent comme <b>altérations accidentelles</b>.</p>
      ${miniScore({ key: 'Am', right: 'A4/4:1 B4:2 C5:3 D5:1 | E5:2 F5:3 G#5:4 A5:5', left: 'A3/4:1 G#3:2 F3:3 E3:1 | D3:2 C3:3 B2:4 A2:5' })}
      ${tip('Doigtés identiques à ceux de Do majeur : MD 1 2 3 1 2 3 4 5 ; MG (en descendant depuis La3) 1 2 3 1 2 3 4 5.')}
    `, [
      play('La mineur harmonique, main droite', { title: 'La mineur harmonique (MD)', key: 'Am', tempo: 72,
        right: 'A4/4:1 B4:2 C5:3 D5:1 | E5:2 F5:3 G#5:4 A5:5 | A5:5 G#5:4 F5:3 E5:2 | D5:1 C5:3 B4:2 A4:1' }),
      play('La mineur harmonique, main gauche', { title: 'La mineur harmonique (MG)', key: 'Am', tempo: 72,
        left: 'A2/4:5 B2:4 C3:3 D3:2 | E3:1 F3:3 G#3:2 A3:1 | A3:1 G#3:2 F3:3 E3:1 | D3:2 C3:3 B2:4 A2:5' }),
      play('Mouvement contraire', { title: 'La mineur, mouvement contraire', key: 'Am', tempo: 72,
        right: 'A4/4:1 B4:2 C5:3 D5:1 | E5:2 F5:3 G#5:4 A5:5 | A5:5 G#5:4 F5:3 E5:2 | D5:1 C5:3 B4:2 A4:1',
        left: 'A3/4:1 G#3:2 F3:3 E3:1 | D3:2 C3:3 B2:4 A2:5 | A2:5 B2:4 C3:3 D3:2 | E3:1 F3:3 G#3:2 A3:1' }),
      play('Les trois formes (main droite)', { title: 'Naturelle, harmonique, mélodique', key: 'Am', tempo: 80,
        right: '@naturelle A4/4:1 B4:2 C5:3 D5:1 | E5:2 F5:3 G5:4 A5:5 | A5:5 G5:4 F5:3 E5:2 | D5:1 C5:3 B4:2 A4:1 | @harmonique A4/4:1 B4:2 C5:3 D5:1 | E5:2 F5:3 G#5:4 A5:5 | A5:5 G#5:4 F5:3 E5:2 | D5:1 C5:3 B4:2 A4:1 | @mélodique A4/4:1 B4:2 C5:3 D5:1 | E5:2 F#5:3 G#5:4 A5:5 | A5:5 Gn5:4 Fn5:3 E5:2 | D5:1 C5:3 B4:2 A4:1' },
        { text: 'Écoute la différence de couleur entre les trois formes : la mélodique monte « comme une majeure » et redescend « naturelle ».' }),
      quiz('Relatif mineur et note sensible', [
        q('Joue la <b>tonique</b> de La mineur, relatif de Do majeur.', ['A4']),
        q('Joue le <b>Sol♯</b> (7e degré haussé de la forme harmonique).', ['G#4']),
        q('Joue les 6e et 7e degrés haussés de la forme <b>mélodique</b> : Fa♯ puis Sol♯.', ['F#4', 'G#4']),
        q('Joue la fin de la gamme harmonique en montant : Mi Fa Sol♯ La.', ['E5', 'F5', 'G#5', 'A5']),
      ]),
    ]),

    lesson('c12-l02', 'Jericho', '127', `
      <p>Le spiritual <i>Joshua Fought the Battle of Jericho</i>, en La mineur, avec des <b>croches</b> rapides et des <b>syncopes</b> : la tierce Do‑Mi est rejouée juste après le demi‑soupir et liée au temps suivant.</p>
      ${miniScore({ key: 'Am', right: '[C5 E5]/8 [C5 E5]/8 R/8 [C5 E5]/8~ [C5 E5]/2' })}
      <p>La main gauche joue des <b>octaves</b> La‑La et Mi‑Mi (doigts 5‑1) : le poignet reste souple, le bras porte la main. La fin est <b>accentuée</b> (&gt;) et finit sur une octave La‑Mi à la main droite.</p>
      ${warn('Le Sol♯ de la 1<sup>re</sup> mesure est une altération accidentelle : il ne vaut que pour cette mesure.')}
    `, [
      play('Jericho', { title: 'Jericho', composer: 'Spiritual', key: 'Am', tempo: 104, tempoText: 'Décidé',
        right: '@mf A4/8:1 G#4/8:2 A4/8:1 B4/8:2 C5/8:3 B4/8:2 C5/8:3 D5/8:4 | [C5 E5]/8:3,5 [C5 E5]/8 R/8 [C5 E5]/8~ [C5 E5]/2 | [B4 D5]/8:2,4 [B4 D5]/8 R/8 [B4 D5]/8~ [B4 D5]/2 | [C5 E5]/8:3,5 [C5 E5]/8 R/8 [C5 E5]/8~ [C5 E5]/8 D5/8:4 C5/8:3 B4/8:2 | A4/8:1 G#4/8:2 A4/8:1 B4/8:2 C5/8:3 B4/8:2 C5/8:3 D5/8:4 | [C5 E5]/8:3,5 [C5 E5]/8 R/8 [C5 E5]/8~ [C5 E5]/4 C5/8:3 D5/8:4 | E5/4:5 D5/4:4 C5/4:3 B4/4:2 | A4/2.:1 R/4 | A4/8:1 G#4/8:2 A4/8:1 B4/8:2 C5/8:3 B4/8:2 C5/8:3 D5/8:4 | [C5 E5]/8:3,5 [C5 E5]/8 R/8 [C5 E5]/8~ [C5 E5]/2 | [B4 D5]/8:2,4 [B4 D5]/8 R/8 [B4 D5]/8~ [B4 D5]/2 | [C5 E5]/8:3,5 [C5 E5]/8 R/8 [C5 E5]/8~ [C5 E5]/8 D5/8:4 C5/8:3 B4/8:2 | A4/8:1 G#4/8:2 A4/8:1 B4/8:2 C5/8:3 B4/8:2 C5/8:3 D5/8:4 | [C5 E5]/8:3,5 [C5 E5]/8 R/8 [C5 E5]/8~ [C5 E5]/4 C5/8:3 D5/8:4 | E5/4:5 D5/4:4 C5/4:3 B4/4:2 | @f E5/2:5> E5/2> | E5/2> E5/2> | E5/1>~ | E5/4 C5/4:2> [A4 E5]/4:1,5> R/4',
        left: '[A2 A3]/1:5,1 | [A2 A3]/1 | [E2 E3]/1:5,1 | [A2 A3]/2. R/4 | [A2 A3]/1 | [A2 A3]/2. R/4 | R/4 E2/4:5 G#2/4:3 B2/4:1 | A2/4:5 C3/8:3 E3/8:1 D3/8:2 C3/8:3 B2/8:4 A2/8:5 | [A2 A3]/1:5,1 | [A2 A3]/1 | [E2 E3]/1 | [A2 A3]/2. R/4 | [A2 A3]/1 | [A2 A3]/2. R/4 | R/4 E2/4:5 G#2/4:3 B2/4:1 | R/4 A2/4:5> R/4 A2/4> | R/4 G#2/4> R/4 G#2/4> | A2/4:5> C3/8:3 E3/8:1 D3/8:2 C3/8:3 B2/8:4 A2/8:5 | A2/4:5 E3/4:1 A2/4:5> R/4' },
        { text: 'La première fois, le morceau s’arrête sur le La (mesure 8) puis repart : la reprise est écrite. La seconde fin est accentuée et forte.' }),
    ]),

    lesson('c12-l03', 'Basse descendante et accords : L’inconnu', '129', `
      <p>Un morceau lent en La mineur construit sur une <b>basse qui descend</b> par degrés : <b>La – Sol – Fa – Mi</b>. Chaque note de basse est suivie de son accord brisé (La Do Mi, Sol Si Mi…), puis d’une <b>cadence</b> sur Mi (V) avec Sol♯.</p>
      ${miniScore({ key: 'Am', left: 'A2/4 C3/8 E3/8 A3/8 A3/8 E3/8 C3/8 | G2/4 B2/8 E3/8 G3/8 G3/8 E3/8 B2/8 | F2/4 A2/8 C3/8 F3/8 F3/8 C3/8 A2/8 | E2/4 E2/8 E2/8 B2/2' })}
      <p>À la main droite, des <b>accords tenus</b> puis une petite phrase chromatique (Sol♯ La, Fa♯ Sol). Joue <b>lentement</b> et <i>legato</i> ; la main gauche reste très régulière.</p>
      ${tip('Repère les quatre notes de basse (La Sol Fa Mi) avant de jouer : la ligne de basse est le squelette du morceau.')}
    `, [
      play('La basse descendante seule', { title: 'Basse descendante La‑Sol‑Fa‑Mi', key: 'Am', tempo: 76,
        left: 'A2/4:5 C3/8:4 E3/8:2 A3/8:1 A3/8 E3/8:2 C3/8:4 | G2/4:5 B2/8:4 E3/8:2 G3/8:1 G3/8 E3/8:2 B2/8:4 | F2/4:5 A2/8:4 C3/8:2 F3/8:1 F3/8 C3/8:2 A2/8:4 | E2/4:5 E2/8 E2/8 B2/2:1' }),
      play('L’inconnu', { title: 'L’inconnu', composer: 'Étude en La mineur', key: 'Am', tempo: 76, tempoText: 'Lent et mystérieux',
        right: '@p [E4 C5]/4:1,5 [E4 C5]/2 R/4 | [D4 B4]/4:1,4 [D4 B4]/2 R/4 | [C4 A4]/4:1,3 [D4 F4]/2:2,4 R/4 | [C4 E4]/4:1,3 [C4 E4]/8 [C4 E4]/8 [B3 G#4]/2:1,5 | B4/8:3 C5/8:4 C5/8 B4/8:3 C5/4:4 A4/8:1 A4/8 | G#4/8:2 A4/8:3 G#4/4:2 R/2 | F#4/8:2 G4/8:3 F#4/8:2 G4/8:3 F4/4:2 F4/4 | E4/4.:1 E4/8 [B3 G#4]/2:1,5 | [E4 C5]/4:1,5 [E4 C5]/2 R/4 | [D4 B4]/4:1,4 [D4 B4]/2 R/4 | [C4 A4]/4:1,3 [D4 F4]/2:2,4 R/4 | [C4 E4]/4:1,3 [C4 E4]/8 [C4 E4]/8 [B3 G#4]/2:1,5 | @mf E5/8:5 D5/8:4 C5/8:3 C5/8 D5/4:4 C5/8:3 C5/8 | B4/8:2 C5/8:3 B4/4:2 R/2 | D5/8:4 C5/8:3 B4/8:2 C5/8:3 D5/4:4 C5/8:3 B4/8:2 | C5/4.:3 C5/8 [A4 E5]/2:1,5^',
        left: 'A2/4:5 C3/8:4 E3/8:2 A3/8:1 A3/8 E3/8:2 C3/8:4 | G2/4:5 B2/8:4 E3/8:2 G3/8:1 G3/8 E3/8:2 B2/8:4 | F2/4:5 A2/8:4 C3/8:2 F3/8:1 F3/8 C3/8:2 A2/8:4 | E2/4:5 E2/8 E2/8 B2/2:1 | A2/4.:5 A3/8:1 G3/2:2 | G2/4.:5 G3/8:1 F3/2:2 | F2/4.:5 F3/8:1 E3/2:2 | E2/4.:5 E2/8 E3/4:1 G#3/4:1 | A2/4:5 C3/8:4 E3/8:2 A3/8:1 A3/8 E3/8:2 C3/8:4 | G2/4:5 B2/8:4 E3/8:2 G3/8:1 G3/8 E3/8:2 B2/8:4 | F2/4:5 A2/8:4 C3/8:2 F3/8:1 F3/8 C3/8:2 A2/8:4 | E2/4:5 E2/8 E2/8 B2/2:1 | A2/4.:5 A3/8:1 A3/4 A3/4 | G2/4.:5 G3/8:1 G3/4 G3/4 | F2/4.:5 F3/8:1 F3/4 F3/4 | E2/4:5 E3/4:1 [A2 E3]/2:5,1^' },
        { text: 'Mesures 5 à 8 : la main droite monte en demi‑tons (Sol♯ La, Fa♯ Sol) pendant que la basse descend. Garde un tempo très stable.' }),
    ]),

    lesson('c12-l04', 'La pédale chevauchée et Greensleeves', '130–131', `
      <h3>La pédale de droite (sustain)</h3>
      <p>La pédale de droite laisse <b>résonner</b> les cordes. La <b>pédale chevauchée</b> (<i>overlapping pedal</i>) relie les accords sans trou ni bouillie :</p>
      <ol>
        <li>Joue l’accord, <b>puis</b> enfonce la pédale (juste après l’attaque).</li>
        <li>Au moment de jouer l’accord suivant, <b>relève</b> la pédale <b>en même temps</b> que les doigts jouent…</li>
        <li>…et <b>ré‑enfonce‑la</b> immédiatement après.</li>
      </ol>
      <p>Le pied reste en contact avec la pédale (talon au sol). Dans la partition, la pédale est indiquée par une ligne sous la main gauche ; l’appli ne contrôle pas la pédale : écoute‑toi !</p>
      ${miniScore({ key: 'Am', timeSig: [3, 4], left: '[E3 G3 C4]/2.~ | [E3 G3 C4]/2. | [D3 G3 B3]/2.~ | [D3 G3 B3]/2. | [C3 E3 A3]/2.~ | [C3 E3 A3]/2. | [B2 E3 G#3]/2.~ | [B2 E3 G#3]/2.' })}
      <h3>Greensleeves</h3>
      <p>La célèbre mélodie anglaise, en La mineur, <b>mp</b> et <i>legato</i>. La main gauche tient des <b>accords de deux mesures</b> avec la pédale chevauchée. Remarque le Fa♯ et le Sol♯ de passage (forme mélodique).</p>
    `, [
      play('Pédale chevauchée : accords tenus', { title: 'Pédale chevauchée', key: 'Am', tempo: 72, timeSig: [3, 4],
        left: '[E3 G3 C4]/2.:5,3,1~ | [E3 G3 C4]/2. | [D3 G3 B3]/2.:5,2,1~ | [D3 G3 B3]/2. | [C3 E3 A3]/2.:5,3,1~ | [C3 E3 A3]/2. | [B2 E3 G#3]/2.:5,2,1~ | [B2 E3 G#3]/2. | [E3 G3 C4]/2. | [D3 G3 B3]/2. | [C3 E3 A3]/2. | [B2 E3 G#3]/2. | [C3 E3 A3]/2.~ | [C3 E3 A3]/2.' },
        { text: 'Pédale : enfonce après chaque accord, relève‑ré‑enfonce à chaque changement. Aucun trou, aucun mélange.' }),
      play('Greensleeves', { title: 'Greensleeves', composer: 'Traditionnel anglais', key: 'Am', tempo: 100, timeSig: [3, 4], tempoText: 'Doucement',
        right: '@mp R/2 A4/4:1 | C5/2:2 D5/4:3 | E5/4.:4 F#5/8:5 E5/4:4 | D5/2:3 B4/4:2 | G4/4.:1 A4/8:2 B4/4:3 | C5/2:4 A4/4:2 | A4/4.:3 G#4/8:2 A4/4:3 | B4/2:4 G#4/4:2 | E4/2:1 A4/4:1 | C5/2:2 D5/4:3 | E5/4.:4 F#5/8:5 E5/4:4 | D5/2:3 B4/4:2 | G4/4.:1 A4/8:2 B4/4:3 | C5/4.:4 B4/8:3 A4/4:2 | G#4/4.:2 F#4/8:1 G#4/4:2 | A4/2.:3~ | A4/2. | G5/2.:5 | G5/4.:5 F#5/8:4 E5/4:3 | D5/2:2 B4/4:1 | G4/4.:1 A4/8:2 B4/4:3 | C5/2:4 A4/4:2 | A4/4.:3 G#4/8:2 A4/4:3 | B4/2:4 G#4/4:2 | E4/2.:1 | G5/2.:5 | G5/4.:5 F#5/8:4 E5/4:3 | D5/2:2 B4/4:1 | G4/4.:1 A4/8:2 B4/4:3 | C5/4.:4 B4/8:3 A4/4:2 | G#4/4.:2 F#4/8:1 G#4/4:2 | A4/2.:3~ | A4/2.^',
        left: 'R/2. | [C3 E3 A3]/2.:5,3,1~ | [C3 E3 A3]/2. | [B2 E3 G3]/2.:5,2,1~ | [B2 E3 G3]/2. | [C3 E3 A3]/2.~ | [C3 E3 A3]/2. | [B2 E3 G#3]/2.:5,2,1~ | [B2 E3 G#3]/2 R/4 | [C3 E3 A3]/2.~ | [C3 E3 A3]/2. | [B2 E3 G3]/2.~ | [B2 E3 G3]/2. | [C3 E3 A3]/2. | [B2 E3 G#3]/2. | [A2 C3 E3]/2.:5,3,1~ | [A2 C3 E3]/2. | [C3 E3 G3]/2.:5,3,1~ | [C3 E3 G3]/2. | [B2 E3 G3]/2.~ | [B2 E3 G3]/2. | [C3 E3 A3]/2.~ | [C3 E3 A3]/2. | [B2 E3 G#3]/2.~ | [B2 E3 G#3]/2 R/4 | [C3 E3 G3]/2.~ | [C3 E3 G3]/2. | [B2 E3 G3]/2.~ | [B2 E3 G3]/2. | [C3 E3 A3]/2. | [B2 E3 G#3]/2. | [A2 C3 E3]/2.~ | [A2 C3 E3]/2.^' },
        { text: 'Change de pédale à chaque nouvel accord de la main gauche (toutes les deux mesures, puis chaque mesure vers la fin de phrase).' }),
    ]),

    lesson('c12-l05', 'Tierces, triades majeures et mineures', '132', `
      ${cols(`<p><b>Tierce majeure</b> = 4 demi‑tons (Do → Mi).</p>${keyboardSvg({ low: 'C4', high: 'G4', highlight: ['C4', 'E4'], labels: { C4: 'Do', E4: 'Mi' }, width: 220 })}`,
        `<p><b>Tierce mineure</b> = 3 demi‑tons (Do → Mi♭).</p>${keyboardSvg({ low: 'C4', high: 'G4', highlight: ['C4', 'Eb4'], labels: { C4: 'Do', Eb4: 'Mi♭' }, width: 220 })}`)}
      <p>Une <b>triade majeure</b> = fondamentale + tierce <b>majeure</b> + quinte juste (7 demi‑tons). Une <b>triade mineure</b> = fondamentale + tierce <b>mineure</b> + quinte juste. Pour passer de majeur à mineur, il suffit de <b>baisser la note du milieu</b> d’un demi‑ton.</p>
      ${miniScore({ right: '[C4 E4 G4]/2 [C4 Eb4 G4]/2 | [D4 F#4 A4]/2 [D4 F4 A4]/2 | [E4 G#4 B4]/2 [E4 G4 B4]/2 | [F4 A4 C5]/2 [F4 Ab4 C5]/2' })}
      <h3>Les accords primaires de La mineur</h3>
      <table class="theory-table"><tr><th>Degré</th><th>Accord</th><th>Position MG (doigts)</th></tr>
      <tr><td>i</td><td>Am (La mineur)</td><td>La Do Mi (5‑3‑1)</td></tr>
      <tr><td>iv</td><td>Dm (Ré mineur)</td><td>La Ré Fa (5‑2‑1)</td></tr>
      <tr><td>V7</td><td>E7 (Mi septième)</td><td>Sol♯ Ré Mi (5‑2‑1)</td></tr></table>
      <p>En mineur, les degrés i et iv s’écrivent en <b>minuscules</b> (accords mineurs). Le V7 reste majeur grâce au <b>Sol♯</b> de la gamme harmonique.</p>
    `, [
      play('Majeur / mineur : baisser la tierce', { title: 'Triades majeures et mineures (MD)', tempo: 72,
        right: '[C4 E4 G4]/2:1,3,5 [C4 Eb4 G4]/2 | [D4 F#4 A4]/2 [D4 F4 A4]/2 | [E4 G#4 B4]/2 [E4 G4 B4]/2 | [F4 A4 C5]/2 [F4 Ab4 C5]/2 | [G4 B4 D5]/2 [G4 Bb4 D5]/2 | [A4 C#5 E5]/2 [A4 C5 E5]/2 | [C5 E5 G5]/1' },
        { text: 'Écoute : majeur (clair) puis mineur (sombre). Seule la note du milieu change.' }),
      play('Même exercice, main gauche', { title: 'Triades majeures et mineures (MG)', tempo: 72,
        left: '[C3 E3 G3]/2:5,3,1 [C3 Eb3 G3]/2 | [D3 F#3 A3]/2 [D3 F3 A3]/2 | [E3 G#3 B3]/2 [E3 G3 B3]/2 | [F3 A3 C4]/2 [F3 Ab3 C4]/2 | [G2 B2 D3]/2 [G2 Bb2 D3]/2 | [A2 C#3 E3]/2 [A2 C3 E3]/2 | [C3 E3 G3]/1' }),
      play('Progression i – iv – V7 – i en La mineur', { title: 'Accords primaires de La mineur', key: 'Am', tempo: 84, timeSig: [3, 4],
        left: Am + '/2.:5,3,1 | ' + Dm + '/2.:5,2,1 | ' + E7 + '/2.:5,2,1 | ' + Am + '/2. | ' + Am + '/2. | ' + Dm + '/2. | ' + E7 + '/2. | ' + Am + '/2.',
        right: Am_RH + '/2.:1,3,5 | ' + Dm_RH + '/2.:1,2,5 | ' + E7_RH + '/2.:1,2,5 | ' + Am_RH + '/2. | ' + Am_RH + '/2. | ' + Dm_RH + '/2. | ' + E7_RH + '/2. | ' + Am_RH + '/2.' },
        { text: 'Mains séparées puis ensemble. Dis « un, quatre, cinq‑sept, un ».' }),
      quiz('Majeur ou mineur ?', [
        q('Joue une triade de <b>Do majeur</b> (Do Mi Sol).', ['C4', 'E4', 'G4'], { mode: 'chord' }),
        q('Transforme‑la en <b>Do mineur</b> : baisse la tierce (Do Mi♭ Sol).', ['C4', 'Eb4', 'G4'], { mode: 'chord' }),
        q('Joue <b>Ré mineur</b> (Ré Fa La).', ['D4', 'F4', 'A4'], { mode: 'chord' }),
        q('Joue <b>Ré majeur</b> (Ré Fa♯ La).', ['D4', 'F#4', 'A4'], { mode: 'chord' }),
        q('Joue <b>Mi majeur</b> (Mi Sol♯ Si).', ['E4', 'G#4', 'B4'], { mode: 'chord' }),
        q('Main gauche : <b>E7</b> en position confortable (Sol♯ Ré Mi, 5‑2‑1).', ['G#2', 'D3', 'E3'], { mode: 'chord' }),
        q('Main gauche : <b>Dm</b> en position confortable (La Ré Fa, 5‑2‑1).', ['A2', 'D3', 'F3'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c12-l06', 'Go Down, Moses', '133', `
      <p>Un grand spiritual en La mineur, <b>p</b> au début puis plus intense. Il utilise les trois accords primaires <b>Am, Dm, E7</b>, une <b>levée</b>, et une ligne de basse descendante <b>Mi Ré Do Si</b> entre les phrases.</p>
      ${miniScore({ key: 'Am', left: '[A2 C3 E3]/2 [A2 D3 F3]/2 | [A2 C3 E3]/2 [A2 D3 F3]/2 | E3/4 D3/4 C3/4 B2/4 | [A2 E3]/2. R/4' })}
      ${tip('Les accords accentués des mesures 10‑11 (Am puis Dm) sont les moments les plus forts : prépare‑les avec un bras lourd et souple.')}
    `, [
      play('Go Down, Moses', { title: 'Go Down, Moses', composer: 'Spiritual', key: 'Am', tempo: 88, tempoText: 'Grave',
        right: '@p R/2 R/4 E4/4:1 | B4/4:5 B4/4 A4/4:4 A4/4 | B4/4:5 B4/4 A4/2:4 | E4/4:2 E4/4 G#4/4:4 G#4/4 | A4/2.:5 E4/4:1 | B4/4:5 B4/4 A4/4:4 A4/4 | B4/4:5 B4/4 A4/2:4 | E4/4:2 E4/4 G#4/4:4 G#4/4 | A4/2.:5 R/4 | @mf A4/4:1 C5/2.:3 | C5/4:4> B4/2.:3 | E5/2:5 D5/4.:4 D5/8 | E5/4:5 D5/4:4 C5/8:3 B4/4.:2 | A4/4:1 C5/2.:3~ | C5/4 B4/2.:2 | E4/4:2 E4/4 G#4/4:4 G#4/4 | A4/2.:5^ R/4',
        left: 'R/1 | ' + Am + '/2:5,3,1 ' + Dm + '/2:5,2,1 | ' + Am + '/2 ' + Dm + '/2 | E3/4:1 D3/4:2 C3/4:3 B2/4:4 | [A2 E3]/2.:5,1 R/4 | ' + Am + '/2 ' + Dm + '/2 | ' + Am + '/2 ' + Dm + '/2 | E3/4:1 D3/4:2 C3/4:3 B2/4:4 | [A2 E3]/2. R/4 | ' + Am + '/4> ' + Am + '/2.> | ' + Dm + '/4> ' + Dm + '/2.> | ' + Am + '/2 ' + E7 + '/2:5,2,1 | ' + E7 + '/2 ' + Am + '/2 | ' + Am + '/1 | ' + Dm + '/1 | E3/4:1 D3/4:2 C3/4:3 B2/4:4 | [A2 E3]/2.^ R/4' }),
    ]),
  ],
};
