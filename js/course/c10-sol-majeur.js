import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, tip, warn, cols } from '../diagrams.js';

// Accords primaires de Sol majeur (positions « confortables » de la main gauche)
const G = '[G2 B2 D3]', C = '[G2 C3 E3]', D7 = '[F#2 C3 D3]';
const G_RH = '[G4 B4 D5]', C_RH = '[G4 C5 E5]', D7_RH = '[F#4 C5 D5]';

export default {
  id: 'c10',
  title: 'Gamme et accords de Sol majeur',
  pages: '112–117',
  intro: 'Première armure (un dièse), le changement de doigt sur une même note, les accords I‑IV‑V7 en Sol, la syncope et la gamme blues.',
  lessons: [
    lesson('c10-l01', 'La gamme de Sol majeur', '112', `
      <p>Même recette que pour Do : deux <b>tétracordes</b> séparés par un ton. En partant de Sol, le second tétracorde est <b>Ré Mi Fa♯ Sol</b> : il faut un <b>Fa♯</b> pour garder le demi‑ton au bon endroit.</p>
      ${keyboardSvg({ low: 'G3', high: 'G4', highlight: ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F#4', 'G4'], labels: { G3: 'Sol', A3: 'La', B3: 'Si', C4: 'Do', D4: 'Ré', E4: 'Mi', 'F#4': 'Fa♯', G4: 'Sol' }, fingers: { G3: '1', A3: '2', B3: '3', C4: '1', D4: '2', E4: '3', 'F#4': '4', G4: '5' } })}
      <h3>L’armure</h3>
      <p>Plutôt que d’écrire un dièse devant chaque Fa, on place <b>un ♯ sur la ligne du Fa</b> au début de chaque portée : c’est l’<b>armure de Sol majeur</b>. <b>Tous les Fa</b> du morceau (dans toutes les octaves) sont des Fa♯, sauf indication contraire (bécarre ♮).</p>
      ${miniScore({ key: 'G', right: 'G4/4:1 A4:2 B4:3 C5:1 | D5:2 E5:3 F#5:4 G5:5', left: 'G3/4:1 F#3:2 E3:3 D3:1 | C3:2 B2:3 A2:4 G2:5' })}
      <p>Doigtés identiques à ceux de Do : MD 1 2 3 <b>1</b> 2 3 4 5, MG 5 4 3 2 1 <b>3</b> 2 1 (en montant).</p>
      ${tip('Un Fa♯ se joue sur la touche noire juste à droite du Fa : le 4<sup>e</sup> doigt de la main droite monte sur la touche noire sans bouger le poignet.')}
    `, [
      play('Gamme de Sol, main droite', { title: 'Gamme de Sol (MD)', key: 'G', tempo: 72,
        right: 'G4/4:1 A4:2 B4:3 C5:1 | D5:2 E5:3 F#5:4 G5:5 | G5:5 F#5:4 E5:3 D5:2 | C5:1 B4:3 A4:2 G4:1' }),
      play('Gamme de Sol, main gauche', { title: 'Gamme de Sol (MG)', key: 'G', tempo: 72,
        left: 'G2/4:5 A2:4 B2:3 C3:2 | D3:1 E3:3 F#3:2 G3:1 | G3:1 F#3:2 E3:3 D3:1 | C3:2 B2:3 A2:4 G2:5' }),
      play('Gamme de Sol, mouvement contraire', { title: 'Gamme de Sol, mouvement contraire', key: 'G', tempo: 72,
        right: 'G4/4:1 A4:2 B4:3 C5:1 | D5:2 E5:3 F#5:4 G5:5 | G5:5 F#5:4 E5:3 D5:2 | C5:1 B4:3 A4:2 G4:1',
        left: 'G3/4:1 F#3:2 E3:3 D3:1 | C3:2 B2:3 A2:4 G2:5 | G2:5 A2:4 B2:3 C3:2 | D3:1 E3:3 F#3:2 G3:1' },
        { text: 'Les deux mains partent du même Sol (à une octave d’écart) et s’écartent. Mêmes doigts en même temps.' }),
      quiz('Repérer les Fa♯', [
        q('Joue le <b>Fa♯</b> au‑dessus du Do du milieu (touche noire à droite du Fa).', ['F#4']),
        q('Joue un Fa♯ dans la main gauche : <b>Fa♯3</b> (sous le Do du milieu).', ['F#3']),
        q('Joue le tétracorde <b>Ré Mi Fa♯ Sol</b> en montant, main droite (2 3 4 5).', ['D5', 'E5', 'F#5', 'G5']),
        q('Joue le tétracorde <b>Sol La Si Do</b>, main gauche (5 4 3 2).', ['G2', 'A2', 'B2', 'C3']),
      ]),
    ]),

    lesson('c10-l02', 'Changer de doigt sur une même note', '113–114', `
      <p>Quand une note est <b>répétée</b>, on peut la rejouer avec <b>un autre doigt</b> : cela place la main pour la suite sans saut. Dans le Can‑Can, le Ré est joué 5 puis 4, le La 1 puis 2.</p>
      ${miniScore({ key: 'G', right: 'D5/2:5 D5/2:4 | A4/2:1 A4/2:2' })}
      <h3>Le Can‑Can (Offenbach)</h3>
      <p>Tiré d’<i>Orphée aux Enfers</i>. Tempo vif, <b>f</b>. La main gauche alterne la basse Sol et un petit accord : garde le poignet souple, les accords restent légers.</p>
      ${warn('Travaille d’abord lentement : la vitesse viendra toute seule quand les doigtés seront automatiques.')}
    `, [
      play('Préparation : changer de doigt', { title: 'Changer de doigt', key: 'G', tempo: 84,
        right: 'D5/2:5 D5/2:4 | D5/2:5 D5/2:4 | A4/2:1 A4/2:2 | A4/2:1 A4/2:2' }),
      play('Le Can‑Can', { title: 'Le Can‑Can', composer: 'J. Offenbach', key: 'G', tempo: 120, tempoText: 'Vif',
        right: '@f G4/1:1 | A4/4:2 C5/4:4 B4/4:3 A4/4:2 | D5/2:5 D5/2:4 | D5/4:4 E5/4:5 B4/4:2 C5/4:3 | A4/2:1 A4/2:2 | A4/4:2 C5/4:4 B4/4:3 A4/4:2 | G4/4:1 G5/4:5 F#5/4:4 E5/4:3 | D5/4:2 C5/4:1 B4/4:3 A4/4:2 | G4/1:1 | A4/4:2 C5/4:4 B4/4:3 A4/4:2 | D5/2:5 D5/2:4 | D5/4:4 E5/4:5 B4/4:2 C5/4:3 | A4/2:1 A4/2:2 | A4/4:2 C5/4:4 B4/4:3 A4/4:2 | G4/4:1 D5/4:5 B4/4:3 A4/4:2 | G4/4:1 R/4 G4/4 R/4',
        left: 'G2/4:5 [B2 D3]/4:3,1 [B2 D3]/4 [B2 D3]/4 | G2/4 [C3 D3]/4:2,1 [C3 D3]/4 [C3 D3]/4 | G2/4 [B2 D3]/4 [B2 D3]/4 [B2 D3]/4 | G2/4 [B2 D3]/4 [B2 D3]/4 [B2 D3]/4 | G2/4 [C3 D3]/4 [C3 D3]/4 [C3 D3]/4 | G2/4 [C3 D3]/4 [C3 D3]/4 [C3 D3]/4 | [G2 B2 D3]/4 R/4 R/2 | R/1 | G2/4 [B2 D3]/4 [B2 D3]/4 [B2 D3]/4 | G2/4 [C3 D3]/4 [C3 D3]/4 [C3 D3]/4 | G2/4 [B2 D3]/4 [B2 D3]/4 [B2 D3]/4 | G2/4 [B2 D3]/4 [B2 D3]/4 [B2 D3]/4 | G2/4 [C3 D3]/4 [C3 D3]/4 [C3 D3]/4 | G2/4 [C3 D3]/4 [C3 D3]/4 [C3 D3]/4 | [G2 B2 D3]/4 R/4 [F#2 C3 D3]/4 R/4 | [G2 B2 D3]/4 R/4 [G2 B2 D3]/4 R/4' }),
    ]),

    lesson('c10-l03', 'Les accords primaires en Sol : G, C et D7', '115', `
      <p>Mêmes degrés qu’en Do (I, IV, V7), mais construits sur la gamme de Sol :</p>
      <table class="theory-table"><tr><th>Degré</th><th>Accord</th><th>Position MG (doigts)</th><th>Position MD (doigts)</th></tr>
      <tr><td>I</td><td>G (Sol majeur)</td><td>Sol Si Ré (5‑3‑1)</td><td>Sol Si Ré (1‑3‑5)</td></tr>
      <tr><td>IV</td><td>C (Do majeur)</td><td>Sol Do Mi (5‑2‑1)</td><td>Sol Do Mi (1‑2‑5)</td></tr>
      <tr><td>V7</td><td>D7 (Ré septième)</td><td>Fa♯ Do Ré (5‑2‑1)</td><td>Fa♯ Do Ré (1‑2‑5)</td></tr></table>
      <p>Le pouce gauche (ou le 5 droit) reste près du Sol/Ré : seuls les doigts du milieu bougent. Remarque la logique : de I à IV, la note du bas reste, les deux autres montent d’un degré ; de I à V7, la note du haut reste, les deux autres descendent.</p>
      ${miniScore({ key: 'G', left: '[G2 B2 D3]/2 [G2 C3 E3]/2 | [G2 B2 D3]/2 [F#2 C3 D3]/2 | [G2 B2 D3]/1' })}
      <h3>L’Hymne des Marines</h3>
      <p>La mélodie vient encore d’Offenbach (<i>Geneviève de Brabant</i>). Elle commence par une <b>levée</b> de deux croches et contient un <b>D.C. al Fine</b> : la reprise est écrite en entier dans l’appli.</p>
    `, [
      play('Progression I – IV – I – V7 – I en Sol', { title: 'Accords primaires en Sol', key: 'G', tempo: 84,
        left: G + '/2:5,3,1 ' + C + '/2:5,2,1 | ' + G + '/2 ' + D7 + '/2:5,2,1 | ' + G + '/1 | ' + G + '/4 ' + C + '/4 ' + G + '/4 ' + D7 + '/4 | ' + G + '/1' },
        { text: 'Dis « un, quatre, un, cinq‑sept, un » en jouant.' }),
      play('Même progression, main droite', { title: 'Accords primaires en Sol (MD)', key: 'G', tempo: 84,
        right: G_RH + '/2:1,3,5 ' + C_RH + '/2:1,2,5 | ' + G_RH + '/2 ' + D7_RH + '/2:1,2,5 | ' + G_RH + '/1 | ' + G_RH + '/4 ' + C_RH + '/4 ' + G_RH + '/4 ' + D7_RH + '/4 | ' + G_RH + '/1' }),
      play('L’Hymne des Marines', { title: 'L’Hymne des Marines', composer: 'J. Offenbach / trad. américain', key: 'G', tempo: 108, tempoText: 'Marche',
        right: '@f R/2 R/4 G4/8:1 B4/8:3 | D5/4:5 D5/4:4 D5/4:3 D5/4:2 | D5/4.:1 G5/8:4 D5/4:1 B4/8:3 C5/8:4 | D5/4:5 D5/4 C5/8:4 A4/4.:2 | @Fine B4/2.:3 G5/8:5 F#5/8:4 | E5/4:3 C5/4:1 E5/4:3 C5/4:1 | D5/4.:2 B4/8:1 D5/4:2 G5/8:5 F#5/8:4 | E5/4:3 C5/4:1 E5/8:3 G5/4.:5 | @D.C._al_Fine D5/2.:2 G4/8:1 B4/8:3 | D5/4:5 D5/4:4 D5/4:3 D5/4:2 | D5/4.:1 G5/8:4 D5/4:1 B4/8:3 C5/8:4 | D5/4:5 D5/4 C5/8:4 A4/4.:2 | B4/1:3^',
        left: 'R/1 | ' + G + '/2:5,3,1 ' + D7 + '/2:5,2,1 | ' + G + '/2. R/4 | ' + G + '/2 ' + D7 + '/2 | ' + G + '/4 ' + G + '/4 ' + G + '/4 R/4 | ' + C + '/2:5,2,1 ' + C + '/2 | ' + G + '/2. R/4 | ' + C + '/2 ' + C + '/2 | ' + G + '/4 ' + G + '/4 ' + G + '/4 R/4 | ' + G + '/2 ' + D7 + '/2 | ' + G + '/2. R/4 | ' + G + '/2 ' + D7 + '/2 | ' + G + '/1^' },
        { text: 'La levée Sol‑Si lance chaque phrase. La reprise (D.C.) est écrite : la première partie revient jusqu’au Fine.' }),
      quiz('Reconnaître les accords de Sol', [
        q('Main gauche : joue l’accord <b>G</b> (I) : Sol Si Ré, doigts 5‑3‑1.', ['G2', 'B2', 'D3'], { mode: 'chord' }),
        q('Main gauche : joue l’accord <b>C</b> (IV) en position confortable : Sol Do Mi, 5‑2‑1.', ['G2', 'C3', 'E3'], { mode: 'chord' }),
        q('Main gauche : joue l’accord <b>D7</b> (V7) : Fa♯ Do Ré, 5‑2‑1.', ['F#2', 'C3', 'D3'], { mode: 'chord' }),
        q('Main droite : joue <b>D7</b> : Fa♯ Do Ré, 1‑2‑5.', ['F#4', 'C5', 'D5'], { mode: 'chord' }),
        q('Main droite : joue <b>C</b> en position confortable : Sol Do Mi, 1‑2‑5.', ['G4', 'C5', 'E5'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c10-l04', 'La syncope', '116', `
      <p>Une note est <b>syncopée</b> quand elle commence <b>entre deux temps</b> et se prolonge <b>sur le temps suivant</b>. L’accent se déplace : c’est le ressort du jazz, du blues et de la musique latine.</p>
      ${miniScore({ key: 'G', right: 'B4/8 D5/8 B4/8 G4/8~ G4/2 | B4/8 D5/8 B4/8 G4/8 B4/4 G4/8 A4/8~ | A4/1', left: '[G2 B2 D3]/4 [G2 B2 D3]/4 [G2 B2 D3]/4 [G2 B2 D3]/4 | [G2 B2 D3]/4 [G2 B2 D3]/4 [G2 B2 D3]/4 [G2 B2 D3]/4 | [G2 B2 D3]/4 R/4 R/2' })}
      <p>Dans l’exemple, le Sol de la 1<sup>re</sup> mesure arrive sur la <b>seconde moitié du 2<sup>e</sup> temps</b> et tient jusqu’à la fin de la mesure. Pour le sentir : compte « 1 et 2 <b>et</b> 3 et 4 et » à voix haute, la main gauche marque les temps avec les accords.</p>
      ${tip('Le <b>Fa♮</b> (bécarre) annule le dièse de l’armure pour une mesure : c’est la « blue note » qui donne la couleur blues.')}
    `, [
      play('Blues syncopé en Sol', { title: 'Blues syncopé', key: 'G', tempo: 92, tempoText: 'Tempo de blues',
        right: '@mf B4/8:3 D5/8:5 B4/8:3 G4/8:1~ G4/2 | B4/8 D5/8 B4/8 G4/8 B4/4:3 G4/8:1 A4/8:2~ | A4/1:2 | D5/8:5 B4/8:3 G4/8:2 E4/8:1 D5/8:5 B4/8:3 G4/8:2 E4/8:1 | Bb4/8:3 D5/8:5 B4/8:3 G4/8:1~ G4/2 | Bb4/8 D5/8 B4/8 G4/8 B4/4 G4/8:1 A4/8:2~ | A4/1 | D5/8:5 B4/8:3 G4/8:2 E4/8:1 D5/8 B4/8 G4/8 E4/8 | C5/8:4 B4/8:3 C5/8:4 B4/8:3 C5/8:4 D5/8:5~ D5/4 | Bb4/8:3 D5/8:5 B4/8:3 G4/8:1 B4/8:3 G4/8:2 E4/4:1 | G4/1:1 | D5/8:5 D5/8 C5/8:4 C5/8 B4/8:3 B4/8 A4/8:2 A4/8 | R/4 [D4 C#5]/8:1,4 [E4 D5]/8:1,5~ [E4 D5]/2^',
        left: G + '/4:5,3,1 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + G + '/4 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + G + '/4 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + G + '/4 R/4 R/2 | ' + C + '/4:5,2,1 ' + C + '/4 ' + C + '/4 ' + C + '/4 | ' + C + '/4 ' + C + '/4 ' + C + '/4 ' + C + '/4 | ' + G + '/4 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + G + '/4 R/4 R/2 | ' + D7 + '/4:5,2,1 ' + D7 + '/4 ' + D7 + '/4 ' + D7 + '/4 | ' + C + '/4 ' + C + '/4 ' + C + '/4 ' + C + '/4 | ' + G + '/4 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + D7 + '/2 R/2 | ' + G + '/4 R/4 ' + G + '/2^' },
        { text: 'Compte à voix haute « 1 et 2 et 3 et 4 et ». Les notes liées (~) ne sont pas rejouées : elles tiennent par‑dessus le temps.' }),
    ]),

    lesson('c10-l05', 'La gamme blues de Sol', '117', `
      <p>La <b>gamme blues</b> a 6 notes : <b>Sol Si♭ Do Do♯ Ré Fa</b> (puis Sol). Par rapport à la gamme majeure, la tierce (Si) et la septième (Fa♯) sont <b>abaissées</b>, et on ajoute une note de passage (Do♯) : ce sont les <b>blue notes</b>.</p>
      ${keyboardSvg({ low: 'G3', high: 'G4', highlight: ['G3', 'Bb3', 'C4', 'C#4', 'D4', 'F4', 'G4'], labels: { G3: 'Sol', Bb3: 'Si♭', C4: 'Do', 'C#4': 'Do♯', D4: 'Ré', F4: 'Fa', G4: 'Sol' } })}
      <p>Dans un morceau en Sol majeur, ces notes s’écrivent avec des <b>altérations accidentelles</b> (♭, ♮) valables jusqu’à la fin de la mesure.</p>
      <h3>Question / réponse</h3>
      <p>Le blues se joue souvent en <b>appel</b> (une main) et <b>réponse</b> (l’autre main) : écoute la main gauche, puis réponds avec la main droite.</p>
    `, [
      play('Gamme blues de Sol', { title: 'Gamme blues de Sol', key: 'G', tempo: 80,
        right: 'G4/4:1 Bb4/4:2 C5/4:3 C#5/4:4 | D5/4:5 Fn5/4:5 G5/2:5 | G5/4:5 Fn5/4:4 D5/4:3 C#5/4:2 | C5/4:1 Bb4/4:2 G4/2:1',
        left: 'G2/4:5 Bb2/4:4 C3/4:3 C#3/4:2 | D3/4:1 Fn3/4:1 G3/2:1 | G3/4:1 Fn3/4:2 D3/4:3 C#3/4:4 | C3/4:5 Bb2/4:4 G2/2:5' },
        { text: 'Mains séparées d’abord : les doigts passent sur les touches noires sans crispation.' }),
      play('Bonnes gens (blues)', { title: 'Bonnes gens', composer: 'Blues en Sol', key: 'G', tempo: 100, tempoText: 'Tempo de blues',
        right: '@mf G5/8:5 Fn5/8:4 D5/8:3 Db5/8:2 C5/4:1 Bb4/8:2 G4/8:1 | Bb4/4:2 G4/4:1 R/2 | G5/8:5 Fn5/8:4 D5/8:3 Db5/8:2 C5/4:1 Bb4/8:2 G4/8:1 | Bb4/4:2 R/4 R/2 | G5/8:5 Fn5/8:4 D5/8:3 Db5/8:2 C5/4:1 Bb4/8:2 G4/8:1 | Bb4/8:2 G4/8:1 G4/4 G4/4. G4/8 | @mp Fn4/4:1 G4/4:2 Bb4/8:4 G4/8:2 G4/4 | A4/2:3 A4/2 | R/1 | R/8 G4/8:1 Bb4/8:2 Bn4/8:3 C5/8:4 Bb4/8:2 G4/4:1 | R/1 | R/8 G4/8:1 Bb4/8:2 G4/8:1 B4/4:3 D5/4:5 | R/1 | R/8 G4/8:1 Bb4/8:2 Bn4/8:3 C5/8:4 Bb4/8:2 G4/4:1 | @mf F#5/4.:5 D5/8:3 D5/8 F#5/4.:5 | D5/4:3 R/4 R/2 | G5/8:5 Fn5/8:4 D5/8:3 Db5/8:2 C5/4:1 Bb4/8:2 G4/8:1 | G4/1:1^',
        left: 'G2/2:5 D3/2:1 | G2/4.:5 D3/8:1 C#3/8:2 D3/8:1 D3/4 | G2/2 D3/2 | G2/4. D3/8 C#3/8 D3/8 D3/4 | G2/2 D3/2 | D3/2:1 C#3/2:2 | D3/2:1 D3/2 | ' + G + '/2:5,3,1 ' + G + '/2 | R/8 G2/8:5 Bb2/8:4 Bn2/8:3 C3/8:2 Bb2/8:4 G2/4:5 | ' + G + '/4 R/4 R/2 | R/8 G2/8:5 Bb2/8:4 G2/8:5 Bn2/4:3 D3/4:1 | ' + G + '/4 R/4 R/2 | R/8 G2/8:5 Bb2/8:4 Bn2/8:3 C3/8:2 Bb2/8:4 G2/4:5 | ' + G + '/4 R/4 R/2 | D3/2:2 F#3/2:1 | G3/8:1 G3/8 F#3/4:2 E3/4:3 D3/4:4 | G2/2:5 D3/2:1 | ' + G + '/1^' },
        { text: 'Mesures 9 à 14 : la main gauche « appelle », la main droite « répond » avec la même phrase. Compte les demi‑soupirs !' }),
      quiz('Les blue notes', [
        q('Joue la <b>tierce abaissée</b> de Sol : Si♭ (touche noire à gauche du Si).', ['Bb']),
        q('Joue la <b>septième abaissée</b> : Fa♮ (touche blanche, pas Fa♯).', ['F']),
        q('Joue la note de passage <b>Do♯</b>.', ['C#']),
        q('Joue toute la gamme blues en montant depuis Sol4 : Sol Si♭ Do Do♯ Ré Fa Sol.', ['G4', 'Bb4', 'C5', 'C#5', 'D5', 'F5', 'G5']),
      ]),
    ]),
  ],
};
