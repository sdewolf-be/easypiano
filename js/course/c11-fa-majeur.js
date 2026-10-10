import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, rhythmTable, NOTE_GLYPHS as N, tip, warn } from '../diagrams.js';

// Accords primaires de Fa majeur (positions « confortables » de la main gauche)
const F = '[F2 A2 C3]', Bb = '[F2 Bb2 D3]', C7 = '[E2 Bb2 C3]';
const F_RH = '[F4 A4 C5]', Bb_RH = '[F4 Bb4 D5]', C7_RH = '[E4 Bb4 C5]';
// Basse brisée (p. 124) : fondamentale puis petit accord
const F_BR = 'F2/4. [A2 C3]/8 [A2 C3]/4 [A2 C3]/4', C7_BR = 'E2/4. [Bb2 C3]/8 [Bb2 C3]/4 [Bb2 C3]/4', Bbm_BR = 'F2/4. [Bb2 Db3]/8 [Bb2 Db3]/4 [Bb2 Db3]/4';

export default {
  id: 'c11',
  title: 'Gamme et accords de Fa majeur',
  pages: '118–125',
  intro: 'Un bémol à l’armure, un nouveau doigté de gamme, le demi‑soupir et l’accent, les accords F‑B♭‑C7, une nouvelle basse brisée et les accords arpégés.',
  lessons: [
    lesson('c11-l01', 'La gamme de Fa majeur', '118', `
      <p>En partant de Fa, le premier tétracorde est <b>Fa Sol La Si♭</b> : il faut un <b>Si♭</b> pour avoir le demi‑ton entre les 3<sup>e</sup> et 4<sup>e</sup> notes. L’armure de Fa majeur : <b>un ♭ sur la ligne du Si</b>. Tous les Si sont des Si♭.</p>
      ${keyboardSvg({ low: 'F3', high: 'F4', highlight: ['F3', 'G3', 'A3', 'Bb3', 'C4', 'D4', 'E4', 'F4'], labels: { F3: 'Fa', G3: 'Sol', A3: 'La', Bb3: 'Si♭', C4: 'Do', D4: 'Ré', E4: 'Mi', F4: 'Fa' }, fingers: { F3: '1', G3: '2', A3: '3', Bb3: '4', C4: '1', D4: '2', E4: '3', F4: '4' } })}
      <h3>Un doigté différent pour la main droite</h3>
      <p>Le pouce ne va <b>jamais sur une touche noire</b> dans une gamme. En Fa, la main droite joue <b>1 2 3 4</b> puis passe le pouce : <b>1 2 3 4</b>. Le 5<sup>e</sup> doigt n’est pas utilisé ! La main gauche garde le doigté habituel : 5 4 3 2 1 3 2 1.</p>
      ${miniScore({ key: 'F', right: 'F4/4:1 G4:2 A4:3 Bb4:4 | C5:1 D5:2 E5:3 F5:4', left: 'F2/4:5 G2:4 A2:3 Bb2:2 | C3:1 D3:3 E3:2 F3:1' })}
      ${tip('Le passage du pouce se fait après le 4 (main droite) : le pouce glisse sous la main pendant que le 4 joue le Si♭.')}
    `, [
      play('Gamme de Fa, main droite (1 2 3 4 – 1 2 3 4)', { title: 'Gamme de Fa (MD)', key: 'F', tempo: 72,
        right: 'F4/4:1 G4:2 A4:3 Bb4:4 | C5:1 D5:2 E5:3 F5:4 | F5:4 E5:3 D5:2 C5:1 | Bb4:4 A4:3 G4:2 F4:1' }),
      play('Gamme de Fa, main gauche', { title: 'Gamme de Fa (MG)', key: 'F', tempo: 72,
        left: 'F2/4:5 G2:4 A2:3 Bb2:2 | C3:1 D3:3 E3:2 F3:1 | F3:1 E3:2 D3:3 C3:1 | Bb2:2 A2:3 G2:4 F2:5' }),
      play('Gamme de Fa, mains ensemble', { title: 'Gamme de Fa (mains ensemble)', key: 'F', tempo: 66,
        right: 'F4/4:1 G4:2 A4:3 Bb4:4 | C5:1 D5:2 E5:3 F5:4 | F5:4 E5:3 D5:2 C5:1 | Bb4:4 A4:3 G4:2 F4:1',
        left: 'F3/4:5 G3:4 A3:3 Bb3:2 | C4:1 D4:3 E4:2 F4:1 | F4:1 E4:2 D4:3 C4:1 | Bb3:2 A3:3 G3:4 F3:5' },
        { text: 'Mouvement parallèle : les mains montent et descendent ensemble, mais les passages de pouce ne tombent pas au même endroit.' }),
      quiz('Le Si♭ et le doigté de Fa', [
        q('Joue le <b>Si♭</b> au‑dessus du Do du milieu (touche noire à gauche du Si).', ['Bb4']),
        q('Joue le tétracorde <b>Fa Sol La Si♭</b>, main droite 1 2 3 4.', ['F4', 'G4', 'A4', 'Bb4']),
        q('Puis le second tétracorde <b>Do Ré Mi Fa</b>, 1 2 3 4 (pouce passé).', ['C5', 'D5', 'E5', 'F5']),
        q('Main gauche : <b>Si♭ La Sol Fa</b> en descendant (2 3 4 5).', ['Bb2', 'A2', 'G2', 'F2']),
      ]),
    ]),

    lesson('c11-l02', 'Le demi‑soupir et l’accent', '119', `
      ${rhythmTable([[N.restEighth, 'Demi‑soupir', '½ temps de silence (comme une croche)'], [N.restQuarter, 'Soupir', '1 temps de silence']])}
      <p>Le <b>demi‑soupir</b> vaut une croche de silence. L’<b>accent</b> (<b>&gt;</b>) au‑dessus ou au‑dessous d’une note demande de la jouer <b>plus fort</b> que les autres.</p>
      ${miniScore({ key: 'F', right: "[A4 F5]/4' [A4 F5]/4' [A4 F5]/4' [A4 F5]/4' | [A4 F5]/4 [A4 F5]/4 [A4 F5]/4. R/8" })}
      <h3>Little Brown Jug</h3>
      <p>Chanson américaine de 1869. Elle commence par une <b>levée d’une croche</b>. Les sixtes La‑Fa (doigts 1‑5) sont jouées <b>staccato</b> puis avec un <b>accent</b> sur la dernière. La main gauche alterne un accord de Fa (octave) et un accord de Do7, puis une descente Fa Mi Ré Do.</p>
    `, [
      play('Préparation : demi‑soupirs', { title: 'Demi‑soupirs', key: 'F', tempo: 84,
        right: 'A4/4:1 R/8 A4/8 A4/4 R/8 A4/8 | C5/4:3 R/8 C5/8 C5/4 R/8 C5/8 | [A4 F5]/4:1,5 R/8 [A4 F5]/8 [A4 F5]/4 R/8 [A4 F5]/8 | [A4 F5]/4 [A4 F5]/4 [A4 F5]/4.> R/8' },
        { text: 'Compte « 1 et 2 et » : la note tombe sur le « et » après le demi‑soupir.' }),
      play('Little Brown Jug', { title: 'Little Brown Jug', composer: 'J. E. Winner', key: 'F', tempo: 108, tempoText: 'Allègre',
        right: "@mf R/2 R/4 R/8 C5/8:3 | A4/4:1 C5/4:3 [A4 C5]/4.:1,3 C5/8:3 | Bb4/4:2 D5/4:4 [Bb4 D5]/4.:2,4 D5/8:4 | [A4 F5]/4:1,5' [A4 F5]/4' [A4 F5]/4' [A4 F5]/4' | [A4 F5]/4 [A4 F5]/4 [A4 F5]/2> | A4/4:1 C5/4:3 [A4 C5]/4.:1,3 C5/8:3 | Bb4/4:2 D5/4:4 [Bb4 D5]/4.:2,4 D5/8:4 | [A4 F5]/4:1,5' [A4 F5]/4' [A4 F5]/4' [A4 F5]/4' | [A4 F5]/4 [A4 F5]/4 [A4 F5]/4.> R/8 | @f F5/4:5> D5/4:3> C5/2:1> | Bb4/4:1> D5/4:3> [Bb4 D5]/2:1,3> | [A4 F5]/8:1,5 [A4 F5]/8 [A4 F5]/4 [A4 F5]/4 [A4 F5]/4 | [A4 F5]/4 [A4 F5]/4 [A4 F5]/2> | F5/4:5> D5/4:3> C5/2:1> | Bb4/4:1> D5/4:3> [Bb4 D5]/2:1,3> | [A4 F5]/8:1,5 [A4 F5]/8 [A4 F5]/4 [A4 F5]/4 [A4 F5]/4 | [A4 F5]/4 [A4 F5]/4 [A4 F5]/4.> R/8",
        left: 'R/1 | [F2 F3]/1:5,1 | [C3 E3 Bb3]/1:5,3,1 | F3/4:1 E3/4:2 D3/4:3 C3/4:4 | F2/4:5 R/4 F3/2:1> | [F2 F3]/1 | [C3 E3 Bb3]/1 | F3/4:1 E3/4:2 D3/4:3 C3/4:4 | F2/4:5 R/4 F3/4.:1> R/8 | [F2 F3]/1:5,1 | [C3 E3 Bb3]/1 | F3/4:1 E3/4:2 D3/4:3 C3/4:4 | F2/4:5 R/4 F3/2:1> | [F2 F3]/1 | [C3 E3 Bb3]/1 | F3/4:1 E3/4:2 D3/4:3 C3/4:4 | F2/4:5 R/4 F3/4.:1> R/8' },
        { text: 'Les sixtes avec l’apostrophe sont staccato (courtes) ; le > demande un accent. Le demi‑soupir final laisse respirer.' }),
    ]),

    lesson('c11-l03', 'Les accords primaires en Fa : F, B♭ et C7', '120–122', `
      <table class="theory-table"><tr><th>Degré</th><th>Accord</th><th>Position MG (doigts)</th><th>Position MD (doigts)</th></tr>
      <tr><td>I</td><td>F (Fa majeur)</td><td>Fa La Do (5‑3‑1)</td><td>Fa La Do (1‑3‑5)</td></tr>
      <tr><td>IV</td><td>B♭ (Si♭ majeur)</td><td>Fa Si♭ Ré (5‑2‑1)</td><td>Fa Si♭ Ré (1‑2‑5)</td></tr>
      <tr><td>V7</td><td>C7 (Do septième)</td><td>Mi Si♭ Do (5‑2‑1)</td><td>Mi Si♭ Do (1‑2‑5)</td></tr></table>
      <p>C’est exactement le même <b>dessin de main</b> qu’en Do et en Sol : apprends à <i>sentir</i> les trois formes plutôt qu’à lire chaque note.</p>
      ${miniScore({ key: 'F', timeSig: [3, 4], left: '[F2 A2 C3]/2. | [F2 Bb2 D3]/2. | [F2 A2 C3]/2. | [E2 Bb2 C3]/2.' })}
      <h3>Chiapanecas</h3>
      <p>Danse mexicaine à <b>3 temps</b>, pleine d’<b>accents</b> et de silences : les accords de la main gauche sont courts, les accents de la main droite (souvent sur le 3<sup>e</sup> temps) tombent comme des claquements de mains. Elle est écrite en deux parties, chacune avec une <b>1<sup>re</sup> et une 2<sup>e</sup> fin</b> : dans l’appli, les reprises sont écrites en entier.</p>
    `, [
      play('Progression I – IV – I – V7 en Fa', { title: 'Accords primaires en Fa', key: 'F', tempo: 84, timeSig: [3, 4],
        left: F + '/2.:5,3,1 | ' + Bb + '/2.:5,2,1 | ' + F + '/2. | ' + C7 + '/2.:5,2,1 | ' + F + '/2.:5,3,1 | ' + Bb + '/2.:5,2,1 | ' + C7 + '/2.:5,2,1 | ' + F + '/2.' },
        { text: 'Dis « un, quatre, un, cinq‑sept » en jouant.' }),
      play('Même progression, main droite', { title: 'Accords primaires en Fa (MD)', key: 'F', tempo: 84, timeSig: [3, 4],
        right: F_RH + '/2.:1,3,5 | ' + Bb_RH + '/2.:1,2,5 | ' + F_RH + '/2. | ' + C7_RH + '/2.:1,2,5 | ' + F_RH + '/2.:1,3,5 | ' + Bb_RH + '/2.:1,2,5 | ' + C7_RH + '/2.:1,2,5 | ' + F_RH + '/2.' }),
      play('Chiapanecas', { title: 'Chiapanecas', composer: 'Traditionnel mexicain', key: 'F', tempo: 126, timeSig: [3, 4], tempoText: 'Vif et dansant',
        right: '@mf F4/4:1 F4/4 A4/4:3 | C5/4:5 A4/4:3 F4/4:1 | E4/4:2 R/4 C5/4:5> | Bb4/4:4> R/4 R/4 | E4/4:1 E4/4 G4/4:2 | Bb4/4:4 G4/4:2 E4/4:1 | F4/4:2 R/4 C5/4:5> | A4/4:3> R/4 R/4 | F4/4:1 F4/4 A4/4:3 | C5/4:5 A4/4:3 F4/4:1 | E4/4:2 R/4 C5/4:5> | Bb4/4:4> R/4 R/4 | E4/4:1 E4/4 G4/4:2 | Bb4/4:4 G4/4:2 E4/4:1 | F4/4:2 R/4 C5/4:5> | [F4 F5]/4:1,5> R/4 R/4 | [Bb4 D5]/2.:1,3> | [Bb4 D5]/2.> | D5/4:3 D5/4 Bb4/4:1 | C5/4:2 D5/4:3 R/4 | [A4 C5]/2.:1,2> | [A4 C5]/2.> | C5/4:2 C5/4 A4/4:1 | C5/4:2 D5/4:3 R/4 | [G4 Bb4]/2.:1,3> | [G4 Bb4]/2.> | Bb4/4:3 Bb4/4 G4/4:1 | Bb4/4:3 C5/4:4 Bb4/4:3 | A4/2.:2~ | A4/4 Bb4/4:3 Bn4/4:4 | C5/4:5 F4/4:1> G4/4:2> | A4/4:3> Bb4/4:4> C5/4:5> | [Bb4 D5]/2.:1,3> | [Bb4 D5]/2.> | D5/4:3 D5/4 Bb4/4:1 | C5/4:2 D5/4:3 R/4 | [A4 C5]/2.:1,2> | [A4 C5]/2.> | C5/4:2 C5/4 A4/4:1 | C5/4:2 D5/4:3 R/4 | [G4 Bb4]/2.:1,3> | [G4 Bb4]/2.> | Bb4/4:3 Bb4/4 G4/4:1 | Bb4/4:3 C5/4:4 Bb4/4:3 | A4/4:2 A4/4 Bb4/4:3 | C5/4:1 D5/4:2 E5/4:3 | F5/4:4 R/4 [Bb4 E5]/4:1,4> | [F4 F5]/4:1,5> R/4 R/4',
        left: F + '/4:5,3,1 R/4 R/4 | ' + F + '/4 R/4 R/4 | ' + C7 + '/4:5,2,1 R/4 ' + C7 + '/4> | ' + C7 + '/4> R/4 R/4 | ' + C7 + '/4 R/4 R/4 | ' + C7 + '/4 R/4 R/4 | ' + F + '/4 R/4 ' + F + '/4> | ' + F + '/4> R/4 R/4 | ' + F + '/4 R/4 R/4 | ' + F + '/4 R/4 R/4 | ' + C7 + '/4 R/4 ' + C7 + '/4> | ' + C7 + '/4> R/4 R/4 | ' + C7 + '/4 R/4 R/4 | ' + C7 + '/4 R/4 R/4 | ' + F + '/4 R/4 ' + F + '/4> | ' + F + '/4> R/4 R/4 | F2/4:5 [Bb2 D3]/4:2,1 [Bb2 D3]/4 | F2/4 [Bb2 D3]/4 [Bb2 D3]/4 | F2/4 [Bb2 D3]/4 [Bb2 D3]/4 | F2/4 [Bb2 D3]/4 [Bb2 D3]/4 | F2/4:5 [A2 C3]/4:3,1 [A2 C3]/4 | F2/4 [A2 C3]/4 [A2 C3]/4 | F2/4 [A2 C3]/4 [A2 C3]/4 | F2/4 [A2 C3]/4 [A2 C3]/4 | E2/4:5 [Bb2 C3]/4:2,1 [Bb2 C3]/4 | E2/4 [Bb2 C3]/4 [Bb2 C3]/4 | E2/4 [Bb2 C3]/4 [Bb2 C3]/4 | E2/4 [Bb2 C3]/4 [Bb2 C3]/4 | F2/4:5 [A2 C3]/4:3,1 [A2 C3]/4 | ' + F + '/4 R/4 R/4 | ' + F + '/4 R/4 R/4 | R/2. | F2/4:5 [Bb2 D3]/4:2,1 [Bb2 D3]/4 | F2/4 [Bb2 D3]/4 [Bb2 D3]/4 | F2/4 [Bb2 D3]/4 [Bb2 D3]/4 | F2/4 [Bb2 D3]/4 [Bb2 D3]/4 | F2/4:5 [A2 C3]/4:3,1 [A2 C3]/4 | F2/4 [A2 C3]/4 [A2 C3]/4 | F2/4 [A2 C3]/4 [A2 C3]/4 | F2/4 [A2 C3]/4 [A2 C3]/4 | E2/4:5 [Bb2 C3]/4:2,1 [Bb2 C3]/4 | E2/4 [Bb2 C3]/4 [Bb2 C3]/4 | E2/4 [Bb2 C3]/4 [Bb2 C3]/4 | E2/4 [Bb2 C3]/4 [Bb2 C3]/4 | ' + F + '/4 R/4 R/4 | ' + C7 + '/4 R/4 R/4 | ' + F + '/4 R/4 ' + C7 + '/4> | ' + F + '/4> R/4 R/4' },
        { text: 'Première partie (mesures 1‑16) : accords courts et accents sur le 3e temps. Seconde partie : basse Fa‑Mi puis petit accord, comme une valse rapide.' }),
      quiz('Reconnaître les accords de Fa', [
        q('Main gauche : joue l’accord <b>F</b> (I) : Fa La Do, 5‑3‑1.', ['F2', 'A2', 'C3'], { mode: 'chord' }),
        q('Main gauche : joue l’accord <b>B♭</b> (IV) : Fa Si♭ Ré, 5‑2‑1.', ['F2', 'Bb2', 'D3'], { mode: 'chord' }),
        q('Main gauche : joue l’accord <b>C7</b> (V7) : Mi Si♭ Do, 5‑2‑1.', ['E2', 'Bb2', 'C3'], { mode: 'chord' }),
        q('Main droite : joue <b>B♭</b> : Fa Si♭ Ré, 1‑2‑5.', ['F4', 'Bb4', 'D5'], { mode: 'chord' }),
        q('Main droite : joue <b>C7</b> : Mi Si♭ Do, 1‑2‑5.', ['E4', 'Bb4', 'C5'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c11-l04', 'Ce n’est qu’un au revoir (Auld Lang Syne)', '123', `
      <p>Le célèbre air écossais, en Fa majeur, avec les trois accords primaires en <b>rondes</b> et <b>blanches</b> à la main gauche. Il commence par une <b>levée</b> d’une noire. Observe le rythme <b>noire pointée – croche</b> qui revient presque à chaque mesure : « lon‑ue – courte ».</p>
      ${miniScore({ key: 'F', right: 'R/2. C4/4 | F4/4. F4/8 F4/4 A4/4 | G4/4. F4/8 G4/4 A4/4' })}
      ${tip('Pour que la mélodie chante, joue la main gauche <b>plus doucement</b> que la main droite.')}
    `, [
      play('Ce n’est qu’un au revoir', { title: 'Ce n’est qu’un au revoir', composer: 'Traditionnel écossais', key: 'F', tempo: 92, tempoText: 'Modéré, chantant',
        right: '@mf R/2 R/4 C4/4:1 | F4/4.:2 F4/8 F4/4 A4/4:3 | G4/4.:3 F4/8:2 G4/4:3 A4/4:4 | F4/4.:2 F4/8 A4/4:3 C5/4:4 | D5/2.:5 D5/4 | C5/4.:4 A4/8:2 A4/4 F4/4:1 | G4/4.:3 F4/8:2 G4/4:3 A4/8:4 G4/8:3 | [D4 F4]/4.:1,3 D4/8:2 D4/4 C4/4:1 | F4/2.:4 D5/4:5 | C5/4.:4 A4/8:2 A4/4 F4/4:1 | G4/4.:3 F4/8:2 G4/4:3 D5/4:5 | C5/4.:4 A4/8:2 A4/4 C5/4:4 | D5/2.:5 D5/4 | C5/4.:4 A4/8:2 A4/4 F4/4:1 | G4/4.:3 F4/8:2 G4/4:3 A4/8:4 G4/8:3 | [D4 F4]/4.:1,3 D4/8:2 D4/4 C4/4:1 | F4/2.:4^ R/4',
        left: 'R/1 | ' + F + '/1:5,3,1 | ' + C7 + '/1:5,2,1 | ' + F + '/2 C3/4:2 D3/4:1 | ' + Bb + '/2.:5,2,1 R/4 | ' + F + '/1 | ' + C7 + '/2. R/4 | ' + Bb + '/2 ' + C7 + '/2 | ' + F + '/2. R/4 | ' + F + '/2 ' + F + '/2 | ' + C7 + '/2. R/4 | ' + F + '/2 ' + F + '/2 | ' + Bb + '/2. R/4 | ' + F + '/1 | ' + C7 + '/1 | ' + Bb + '/2 ' + C7 + '/2 | ' + F + '/2.^ R/4' }),
    ]),

    lesson('c11-l05', 'Nouvelle basse et accords arpégés', '124–125', `
      <h3>Une basse « fondamentale + accord »</h3>
      <p>La main gauche joue d’abord la <b>fondamentale seule</b> (noire pointée), puis le reste de l’accord en <b>croche + deux noires</b>. C’est un accompagnement très courant (chansons napolitaines, valses lentes).</p>
      ${miniScore({ key: 'F', left: 'F2/4.:5 [A2 C3]/8:3,1 [A2 C3]/4 [A2 C3]/4 | [F2 A2 C3]/4 R/4 R/2 | E2/4.:5 [Bb2 C3]/8:2,1 [Bb2 C3]/4 [Bb2 C3]/4 | [E2 Bb2 C3]/4 R/4 R/2' })}
      <h3>Les accords arpégés</h3>
      <p>Une <b>ligne ondulée</b> devant un accord signifie <i>arpégé</i> : on joue la note la plus basse en premier, puis on ajoute rapidement les autres de bas en haut, en gardant toutes les touches enfoncées. L’appli accepte les notes de l’accord dans n’importe quel ordre.</p>
      <h3>O Sole Mio</h3>
      <p>Chanson napolitaine (di Capua, 1898), <b>f</b> et <i>legato</i>. Elle commence par trois accords avec <b>point d’orgue</b> (tiens‑les librement), puis la mélodie est doublée en <b>tierces</b> à la main droite. Le passage sur Si♭ mineur (Fa Si♭ Ré♭) donne la couleur nostalgique de la fin de phrase. La reprise est écrite en entier.</p>
      ${warn('Mesure 10 : le <b>Ré♭</b> est une altération accidentelle (valable jusqu’à la fin de la mesure).')}
    `, [
      play('Nouvelle basse : F et C7', { title: 'Basse fondamentale + accord', key: 'F', tempo: 84,
        left: F_BR.replace('F2/4.', 'F2/4.:5').replace('[A2 C3]/8', '[A2 C3]/8:3,1') + ' | ' + F + '/4 R/4 R/2 | ' + C7_BR.replace('E2/4.', 'E2/4.:5').replace('[Bb2 C3]/8', '[Bb2 C3]/8:2,1') + ' | ' + C7 + '/4 R/4 R/2 | ' + F_BR + ' | ' + F_BR + ' | ' + C7_BR + ' | ' + F + '/1' },
        { text: 'Le 5e doigt pose la fondamentale, puis 3‑1 (ou 2‑1) complètent l’accord sans que la main ne bouge.' }),
      play('O Sole Mio', { title: 'O Sole Mio', composer: 'E. di Capua', key: 'F', tempo: 84, tempoText: 'Largement, chantant',
        right: '@f [F4 A4 C5]/4:1,2,5^ [F4 A4 C5]/4^ [F4 A4 C5]/4^ [F4 A4 Bb4]/4:1,2,4 | [F4 A4]/2:1,2 [F4 A4]/2~ | [F4 A4]/4 [A4 C5]/4:3,5 [A4 C5]/4 [G4 Bb4]/4:2,4 | [F4 A4]/1:1,2~ | [F4 A4]/4 [A4 C5]/4:3,5 [A4 C5]/4 [G4 Bb4]/4:2,4 | [F4 A4]/2:1,2 [F4 A4]/2~ | [F4 A4]/4 [E4 G4]/4:1,2 [F4 A4]/4:1,3 [G4 Bb4]/4:2,4 | [A4 C5]/1:3,5~ | [A4 C5]/2. C5/4:2 | [Bb4 D5]/1:1,3~ | [Bb4 D5]/4 A4/4:1 [Bb4 D5]/4.:1,3 [A4 C5]/8:1,3 | [F4 A4]/2:1,2 [F4 A4]/2~ | [F4 A4]/4 A4/4:3 G4/4:2 F4/4:1 | E5/1:5 | C5/4:3 A4/4:2 G4/4.:1 F4/8:1 | F4/1~ | F4/4 R/4 R/4 [F4 A4 Bb4]/4:1,2,4 | [F4 A4]/2:1,2 [F4 A4]/2~ | [F4 A4]/4 [A4 C5]/4:3,5 [A4 C5]/4 [G4 Bb4]/4:2,4 | [F4 A4]/1:1,2~ | [F4 A4]/4 [A4 C5]/4:3,5 [A4 C5]/4 [G4 Bb4]/4:2,4 | [F4 A4]/2:1,2 [F4 A4]/2~ | [F4 A4]/4 [E4 G4]/4:1,2 [F4 A4]/4:1,3 [G4 Bb4]/4:2,4 | [A4 C5]/1:3,5~ | [A4 C5]/2. C5/4:2 | [Bb4 D5]/1:1,3~ | [Bb4 D5]/4 A4/4:1 [Bb4 D5]/4.:1,3 [A4 C5]/8:1,3 | [F4 A4]/2:1,2 [F4 A4]/2~ | [F4 A4]/4 A4/4:3 G4/4:2 F4/4:1 | @rit. E5/1:5 | C5/4:3 C5/4 [F4 C5]/2:1,5^ | [F4 A4 F5]/1:1,2,5~ | [F4 A4 F5]/1^',
        left: 'R/1 | ' + F_BR.replace('F2/4.', 'F2/4.:5').replace('[A2 C3]/8', '[A2 C3]/8:3,1') + ' | ' + F + '/4 R/4 R/2 | ' + C7_BR.replace('E2/4.', 'E2/4.:5').replace('[Bb2 C3]/8', '[Bb2 C3]/8:2,1') + ' | ' + C7 + '/4 R/4 R/2 | ' + C7_BR + ' | ' + C7 + '/4 R/4 R/2 | ' + F_BR + ' | ' + F_BR + ' | ' + Bbm_BR.replace('F2/4.', 'F2/4.:5').replace('[Bb2 Db3]/8', '[Bb2 Db3]/8:2,1') + ' | [F2 Bb2 Db3]/1 | ' + F_BR + ' | ' + F + '/4 R/4 R/2 | ' + C7_BR + ' | ' + C7 + '/4 R/4 R/2 | ' + F_BR + ' | ' + F + '/4 R/4 R/2 | ' + F_BR + ' | ' + F + '/4 R/4 R/2 | ' + C7_BR + ' | ' + C7 + '/4 R/4 R/2 | ' + C7_BR + ' | ' + C7 + '/4 R/4 R/2 | ' + F_BR + ' | ' + F_BR + ' | ' + Bbm_BR + ' | [F2 Bb2 Db3]/1 | ' + F_BR + ' | ' + F + '/4 R/4 R/2 | ' + C7_BR + ' | E2/4:5 [Bb2 C3]/4 ' + C7 + '/4.^ R/8 | F2/4.:5 [A2 C3]/8 [A2 C3]/4 C3/4:1 | F2/1:5^' },
        { text: 'Les trois premiers accords portent un point d’orgue : prends ton temps. Les tierces de la main droite restent bien liées.' }),
      quiz('Accords arpégés', [
        q('Joue l’accord de <b>Fa</b> arpégé, main droite : Fa, puis La, puis Do, en gardant les touches enfoncées.', ['F4', 'A4', 'C5'], { mode: 'chord' }),
        q('Accord de <b>Si♭ mineur</b> arpégé, main gauche : Fa, Si♭, Ré♭ (de bas en haut).', ['F2', 'Bb2', 'Db3'], { mode: 'chord' }),
        q('Accord de <b>Do7</b> arpégé, main gauche : Mi, Si♭, Do.', ['E2', 'Bb2', 'C3'], { mode: 'chord' }),
      ]),
    ]),
  ],
};
