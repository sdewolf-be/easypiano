import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, rhythmTable, NOTE_GLYPHS as N, tip, cols } from '../diagrams.js';

const C_LH = '[C3 E3 G3]', G7_LH = '[B2 F3 G3]', F_LH = '[C3 F3 A3]';
const C_RH = '[C4 E4 G4]', G7_RH = '[B3 F4 G4]', F_RH = '[C4 F4 A4]';

export default {
  id: 'c05',
  title: 'Les premiers accords : Do, Sol7 et Fa',
  pages: '32–49',
  intro: 'Trois notes ensemble font un accord. Avec Do, Sol7 et Fa on accompagne déjà des dizaines de chansons.',
  lessons: [
    lesson('c05-l01', 'L’accord de Do majeur, la demi‑pause', '32–33', `
      <p>Un <b>accord</b> = trois notes (ou plus) jouées ensemble. L’accord de <b>Do majeur</b> (symbole : <b>C</b>) est fait de Do‑Mi‑Sol.</p>
      ${cols(keyboardSvg({ low: 'C3', high: 'B3', highlight: ['C3', 'E3', 'G3'], labels: { C3: 'Do', E3: 'Mi', G3: 'Sol' }, fingers: { C3: '5', E3: '3', G3: '1' } }), keyboardSvg({ low: 'C4', high: 'B4', highlight: ['C4', 'E4', 'G4'], labels: { C4: 'Do', E4: 'Mi', G4: 'Sol' }, fingers: { C4: '1', E4: '3', G4: '5' } }))}
      <ul>
        <li>Main gauche : doigts <b>5‑3‑1</b>. Main droite : doigts <b>1‑3‑5</b>.</li>
        <li>Enfonce les trois touches <b>exactement ensemble</b>, avec le poids du bras.</li>
      </ul>
      ${rhythmTable([[N.restHalf, 'Demi‑pause', 'silence de 2 temps (posée sur la 3e ligne)']])}
      ${miniScore({ right: 'C4/4 R/4 C4/2', left: '[C3 E3 G3]/2 R/2' })}
    `, [
      play('L’accord de Do, mains séparées puis ensemble', { title: 'Accord de Do', tempo: 76,
        right: 'R/1 | R/1 | R/1 | R/1 | ' + C_RH + '/2:1,3,5 ' + C_RH + '/2 | ' + C_RH + '/1 | ' + C_RH + '/2 ' + C_RH + '/2 | ' + C_RH + '/1 | ' + C_RH + '/2 ' + C_RH + '/2 | ' + C_RH + '/1',
        left: C_LH + '/2:5,3,1 ' + C_LH + '/2 | ' + C_LH + '/1 | ' + C_LH + '/2 ' + C_LH + '/2 | ' + C_LH + '/1 | R/1 | R/1 | R/1 | R/1 | ' + C_LH + '/2 ' + C_LH + '/2 | ' + C_LH + '/1' }),
      play('Frère Jacques', { title: 'Frère Jacques', composer: 'Traditionnel', tempo: 92,
        right: 'C4/4:1 D4:2 E4:3 C4:1 | C4 D4 E4 C4 | E4:3 F4:4 G4/2:5 | E4/4 F4 G4/2 | G4/4:5 F4:4 E4:3 C4:1 | G4 F4 E4 C4 | C4/4:1 R/4 C4/2 | C4/4 R/4 C4/2',
        left: C_LH + '/1:5,3,1 | ' + C_LH + '/1 | ' + C_LH + '/1 | ' + C_LH + '/1 | ' + C_LH + '/1 | ' + C_LH + '/1 | R/4 G3/4:1 R/2 | R/4 G3/4 R/2' },
        { text: 'La main gauche tient l’accord de Do en rondes. Travaille les mains séparément d’abord.' }),
      play('Chanson joyeuse', { title: 'Chanson joyeuse', tempo: 92, tempoText: 'Gai',
        right: 'R/1 | R/2 R/4 ' + C_RH + '/4:1,3,5 | R/1 | R/4 [E4 G4]/4:3,5 [E4 G4]/4 [E4 G4]/4 | R/1 | R/1 | R/1 | R/4 ' + C_RH + '/4 ' + C_RH + '/2',
        left: '@f G3/4:1 F3:2 E3:3 D3:4 | E3 F3 G3/2 | F3/4 E3 D3 E3 | C3/1:5 | G3/4 F3 E3 D3 | E3 D3 E3 F3 | G3 F3 E3 D3 | C3/1' },
        { text: 'Dans l’esprit de « Here’s a Happy Song » : mélodie à la main gauche, accords à la main droite.' }),
    ]),

    lesson('c05-l02', 'Le Si à la main gauche, l’accord de Sol7, la liaison', '34–35', `
      <p>Le 5<sup>e</sup> doigt de la main gauche descend d’une touche pour jouer le <b>Si2</b>. Avec Fa et Sol on obtient l’accord de <b>Sol septième</b> (symbole <b>G7</b>) : Si‑Fa‑Sol, doigts <b>5‑2‑1</b>.</p>
      ${cols(keyboardSvg({ low: 'B2', high: 'B3', highlight: ['C3', 'E3', 'G3'], labels: { C3: 'C' }, fingers: { C3: '5', E3: '3', G3: '1' } }), keyboardSvg({ low: 'B2', high: 'B3', highlight: ['B2', 'F3', 'G3'], labels: { B2: 'G7' }, fingers: { B2: '5', F3: '2', G3: '1' } }))}
      <p>Passer de C à G7 : le 5 descend sur Si, le 3 remplace par le 2 sur Fa, le 1 reste sur Sol.</p>
      <h3>La liaison de prolongation</h3>
      <p>Un arc entre deux notes <b>de même hauteur</b> : on ne rejoue pas la seconde, on <b>tient</b> la première pendant la durée des deux (ronde liée à ronde = 8 temps).</p>
      ${miniScore({ left: '[C3 E3 G3]/1~ | [C3 E3 G3]/1' })}
    `, [
      play('Si main gauche et accords C – G7', { title: 'Si et Sol7 (MG)', tempo: 76,
        left: 'C3/4:5 E3/4:3 G3/2:1 | B2/4:5 F3/4:2 G3/2:1 | C3/4 E3 G3/2 | B2/4 F3 G3/2 | ' + C_LH + '/1:5,3,1 | ' + G7_LH + '/1:5,2,1 | ' + C_LH + '/1 | ' + G7_LH + '/1 | ' + C_LH + '/1' }),
      play('Roulons gaiement (Merrily We Roll Along)', { title: 'Roulons gaiement', composer: 'Traditionnel', tempo: 96,
        right: '@mf E4/4:3 D4:2 C4:1 D4:2 | E4 E4 E4/2 | D4/4 D4 D4/2 | E4/4 G4:5 G4/2 | E4/4:3 D4:2 C4:1 D4:2 | E4 E4 E4/2 | D4/4 D4 E4 D4 | C4/1',
        left: '@p ' + C_LH + '/1:5,3,1~ | ' + C_LH + '/1 | ' + G7_LH + '/1:5,2,1 | ' + C_LH + '/1 | ' + C_LH + '/1~ | ' + C_LH + '/1 | ' + G7_LH + '/1 | ' + C_LH + '/1' }),
      play('Largo (Symphonie du Nouveau Monde)', { title: 'Largo', composer: 'A. Dvořák', tempo: 66, tempoText: 'Lent',
        right: '@mf E4/4:3 G4/4:5 G4/2 | E4/4 D4/4:2 C4/2:1 | D4/4 E4 G4 E4 | D4/1 | E4/4 G4 G4/2 | E4/4 D4 C4/2 | D4/4 E4 D4 C4 | C4/1',
        left: '@p ' + C_LH + '/1~ | ' + C_LH + '/1 | ' + G7_LH + '/1~ | ' + G7_LH + '/1 | ' + C_LH + '/1~ | ' + C_LH + '/1 | ' + G7_LH + '/1 | ' + C_LH + '/1' },
        { text: 'Tiens les accords liés pendant 8 temps : ne relâche pas les touches.' }),
    ]),

    lesson('c05-l03', 'Le Si à la main droite, Sol7 main droite', '36–37', `
      <p>Main droite : le pouce descend d’une touche pour jouer le <b>Si3</b>. L’accord de <b>G7</b> main droite : Si‑Fa‑Sol, doigts <b>1‑4‑5</b>.</p>
      ${cols(keyboardSvg({ low: 'B3', high: 'B4', highlight: ['C4', 'E4', 'G4'], labels: { C4: 'C' }, fingers: { C4: '1', E4: '3', G4: '5' } }), keyboardSvg({ low: 'B3', high: 'B4', highlight: ['B3', 'F4', 'G4'], labels: { B3: 'G7' }, fingers: { B3: '1', F4: '4', G4: '5' } }))}
      ${tip('« Mary Ann » : la main gauche chante la mélodie (calypso), la droite ponctue avec les accords.')}
    `, [
      play('Si main droite et accords C – G7', { title: 'Si et Sol7 (MD)', tempo: 76,
        right: 'C4/4:1 E4/4:3 G4/2:5 | B3/4:1 F4/4:4 G4/2:5 | C4/4 E4 G4/2 | B3/4 F4 G4/2 | ' + C_RH + '/1:1,3,5 | ' + G7_RH + '/1:1,4,5 | ' + C_RH + '/1 | ' + G7_RH + '/1 | ' + C_RH + '/1' }),
      play('Mary Ann', { title: 'Mary Ann', composer: 'Calypso traditionnel', tempo: 100, tempoText: 'Calypso',
        right: 'R/1 | R/1 | R/1 | @p ' + G7_RH + '/4:1,4,5 ' + G7_RH + '/4 ' + G7_RH + '/2 | R/1 | R/1 | R/1 | ' + C_RH + '/4:1,3,5 ' + C_RH + '/4 ' + C_RH + '/2 | R/1 | R/1 | R/1 | ' + G7_RH + '/4 ' + G7_RH + '/4 ' + G7_RH + '/2 | R/1 | R/1 | R/1 | ' + C_RH + '/4 ' + C_RH + '/4 ' + C_RH + '/2',
        left: '@mf E3/2:3 G3/2:1 | C3/2:5 E3/2:3 | D3/4:4 C3/4:5 E3/2:3~ | E3/1 | D3/2:4 F3/4:2 F3/4 | B2/2:5 D3/2:4 | D3/4 C3/4 E3/2~ | E3/1 | E3/4:3 E3 G3:1 G3 | C3/2:5 E3/4:3 E3/4 | D3/4:4 C3/4:5 E3/2:3~ | E3/1 | D3/2:4 F3/4:2 F3/4 | B2/2:5 D3/2:4 | D3/4 C3/4 E3/2~ | E3/1' }),
    ]),

    lesson('c05-l04', 'Les symboles d’accords', '38–39', `
      <p>Au‑dessus de la portée, une lettre indique l’accord à jouer : <b>C</b> = Do majeur, <b>G7</b> = Sol septième. Ces <b>symboles d’accords</b> sont utilisés dans toutes les musiques (chanson, jazz, pop).</p>
      <table class="theory-table"><tr><th>Symbole</th><th>Nom français</th><th>Notes</th><th>MG</th><th>MD</th></tr>
      <tr><td>C</td><td>Do majeur</td><td>Do Mi Sol</td><td>5‑3‑1</td><td>1‑3‑5</td></tr>
      <tr><td>G7</td><td>Sol septième</td><td>Si Fa Sol</td><td>5‑2‑1</td><td>1‑4‑5</td></tr></table>
      <p>Un accord G7 « appelle » l’accord C : écoute comme il sonne tendu, puis se repose sur C.</p>
    `, [
      play('Enchaîner C et G7 (main gauche)', { title: 'C – G7 main gauche', tempo: 84,
        left: C_LH + '/4:5,3,1 ' + C_LH + '/4 ' + G7_LH + '/4:5,2,1 ' + G7_LH + '/4 | ' + C_LH + '/4 R/4 R/2 | ' + C_LH + '/4 ' + C_LH + '/4 ' + G7_LH + '/4 ' + G7_LH + '/4 | ' + C_LH + '/4 R/4 R/2 | ' + C_LH + '/4 ' + C_LH + ' ' + C_LH + ' ' + C_LH + ' | ' + G7_LH + '/4 ' + G7_LH + ' ' + G7_LH + ' ' + G7_LH + ' | ' + C_LH + '/4 ' + C_LH + ' ' + G7_LH + ' ' + G7_LH + ' | ' + C_LH + '/4 R/4 R/2' }),
      play('Enchaîner C et G7 (main droite)', { title: 'C – G7 main droite', tempo: 84,
        right: C_RH + '/4:1,3,5 ' + C_RH + '/4 ' + G7_RH + '/4:1,4,5 ' + G7_RH + '/4 | ' + C_RH + '/4 R/4 R/2 | ' + C_RH + '/4 ' + C_RH + '/4 ' + G7_RH + '/4 ' + G7_RH + '/4 | ' + C_RH + '/4 R/4 R/2 | ' + C_RH + '/4 ' + C_RH + ' ' + C_RH + ' ' + C_RH + ' | ' + G7_RH + '/4 ' + G7_RH + ' ' + G7_RH + ' ' + G7_RH + ' | ' + C_RH + '/4 ' + C_RH + ' ' + G7_RH + ' ' + G7_RH + ' | ' + C_RH + '/4 R/4 R/2' }),
      play('Dialogue d’accords (deux mains)', { title: 'Dialogue C – G7', tempo: 84,
        right: C_RH + '/2:1,3,5 ' + G7_RH + '/2:1,4,5 | R/1 | ' + C_RH + '/4 ' + C_RH + '/4 ' + G7_RH + '/4 ' + G7_RH + '/4 | R/1 | ' + C_RH + '/1~ | ' + C_RH + '/1',
        left: 'R/1 | ' + C_LH + '/4:5,3,1 ' + C_LH + '/4 ' + G7_LH + '/2:5,2,1 | R/1 | ' + C_LH + '/4 ' + G7_LH + '/4 ' + C_LH + '/2 | ' + C_LH + '/1~ | ' + C_LH + '/1' }),
      quiz('Reconnaître les accords', [
        q('Joue l’accord <b>C</b> (Do majeur) à la main gauche, doigts 5‑3‑1.', ['C3', 'E3', 'G3'], { mode: 'chord' }),
        q('Joue l’accord <b>G7</b> à la main gauche, doigts 5‑2‑1.', ['B2', 'F3', 'G3'], { mode: 'chord' }),
        q('Joue l’accord <b>C</b> à la main droite, doigts 1‑3‑5.', ['C4', 'E4', 'G4'], { mode: 'chord' }),
        q('Joue l’accord <b>G7</b> à la main droite, doigts 1‑4‑5.', ['B3', 'F4', 'G4'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c05-l05', 'La mesure à 3/4 et la blanche pointée', '40–41', `
      <p><b>3/4</b> : trois temps par mesure, la noire vaut un temps. On compte « 1 2 3 » : c’est le rythme de la <b>valse</b>.</p>
      ${rhythmTable([[N.half + '.', 'Blanche pointée', '3 temps (le point ajoute la moitié de la valeur)']])}
      ${miniScore({ right: 'C4/4 E4 G4 | F4 E4 D4 | C4/2.', timeSig: [3, 4] })}
      <h3>Rappel des nuances</h3><p><b>p</b> doux · <b>mf</b> moyennement fort · <b>f</b> fort.</p>
    `, [
      play('Fusées', { title: 'Fusées', tempo: 100, timeSig: [3, 4], tempoText: 'Décidé',
        right: 'R/2. | C4/4:1 E4/4:3 G4/4:5 | F4/4:4 E4:3 D4:2 | C4/2:1 R/4 | R/2. | C4/4 E4 G4 | F4 E4 D4 | C4/2. | R/2. | C5/4:1 E5/4:3 G5/4:5 | F5/4 E5 D5 | C5/2.',
        left: 'C3/4:5 E3/4:3 G3/4:1 | R/2. | ' + G7_LH + '/2.:5,2,1 | ' + C_LH + '/2 R/4 | C3/4 E3 G3 | R/2. | ' + G7_LH + '/2. | ' + C_LH + '/2. | C4/4:5 E4/4:3 G4/4:1 | R/2. | ' + G7_LH + '/2. | ' + C_LH + '/2.' },
        { text: 'Dans l’esprit de « Rockets » : la fusée décolle de plus en plus haut (dernière ligne une octave plus haut).' }),
      play('Nuances en 3/4', { title: 'Nuances en 3/4', tempo: 88, timeSig: [3, 4],
        right: '@f ' + C_RH + '/2.:1,3,5 | ' + G7_RH + '/2.:1,4,5 | @mf ' + C_RH + '/2. | ' + G7_RH + '/2. | @p ' + C_RH + '/2. | ' + G7_RH + '/2. | ' + C_RH + '/2.~ | ' + C_RH + '/2.',
        left: '@p ' + C_LH + '/2:5,3,1 ' + G7_LH + '/4:5,2,1 | @mf ' + C_LH + '/2 ' + G7_LH + '/4 | @f ' + C_LH + '/2 ' + G7_LH + '/4 | @p ' + C_LH + '/2. | ' + C_LH + '/2 ' + G7_LH + '/4 | ' + C_LH + '/2 ' + G7_LH + '/4 | ' + C_LH + '/2.~ | ' + C_LH + '/2.' },
        { mode: 'play', text: 'Respecte les nuances indiquées : l’appli ne les note pas, ton oreille oui.' }),
    ]),

    lesson('c05-l06', 'Liaisons d’expression et legato', '42–43', `
      <p>Un arc au‑dessus ou en dessous de <b>plusieurs notes différentes</b> est une <b>liaison d’expression</b> (<i>slur</i>) : on joue ces notes <b>legato</b>, c’est‑à‑dire liées, sans trou de son entre elles. Chaque doigt ne se lève que quand le suivant a joué.</p>
      <ul>
        <li>Une liaison relie souvent une <b>phrase</b> musicale, comme une respiration en chant.</li>
        <li>Ne confonds pas avec la <b>liaison de prolongation</b>, qui relie deux notes <b>de même hauteur</b> (on tient la note).</li>
      </ul>
      ${miniScore({ right: 'E4/4 F4 G4 | C4/2. | D4/2.~ | D4/2.', timeSig: [3, 4] })}
    `, [
      play('Que puis‑je partager ?', { title: 'Que puis‑je partager ?', tempo: 92, timeSig: [3, 4],
        right: 'R/2. | R/4 ' + C_RH + '/4:1,3,5 ' + C_RH + '/4 | R/4 ' + G7_RH + '/4:1,4,5 ' + G7_RH + '/4 | R/4 ' + C_RH + '/4 ' + C_RH + '/4 | R/2. | R/4 ' + C_RH + '/4 ' + C_RH + '/4 | R/4 ' + G7_RH + '/4 ' + G7_RH + '/4 | R/4 ' + C_RH + '/4 ' + C_RH + '/4 | @p E4/4:3 F4:4 G4:5 | C4/2.:1 | D4/2.:2 | E4/2.:3 | E4/4 F4 G4 | C4/2. | D4/2. | C4/2.~ | C4/2.',
        left: '@mf E3/4:3 F3:2 G3:1 | C3/2.:5 | D3/2.:4 | E3/2.:3 | E3/4 F3 G3 | C3/2. | D3/2. | C3/2. | R/2. | R/4 ' + C_LH + '/4:5,3,1 ' + C_LH + '/4 | R/4 ' + G7_LH + '/4:5,2,1 ' + G7_LH + '/4 | R/4 ' + C_LH + '/4 ' + C_LH + '/4 | R/2. | R/4 ' + C_LH + '/4 ' + C_LH + '/4 | R/4 ' + G7_LH + '/4 ' + G7_LH + '/4 | R/4 ' + C_LH + '/4 ' + C_LH + '/4 | ' + C_LH + '/2.' },
        { text: 'Joue chaque phrase (Mi Fa Sol → Do) bien liée : le doigt ne se lève que quand le suivant a joué.' }),
      play('Le jour s’achève', { title: 'Le jour s’achève', tempo: 80, timeSig: [3, 4], tempoText: 'Calme',
        right: '@p G4/2:5 E4/4:3 | G4/2 E4/4 | G4/2 E4/4 | E4/2. | G4/2 E4/4 | G4/2 E4/4 | G4/2 E4/4 | C4/2.:1',
        left: 'R/2. | R/2. | ' + G7_LH + '/2.:5,2,1 | ' + C_LH + '/2.:5,3,1 | R/2. | R/2. | ' + G7_LH + '/2. | ' + C_LH + '/2.' },
        { text: 'Legato à la main droite ; les accords de la main gauche arrivent à la 3e mesure de chaque phrase.' }),
    ]),

    lesson('c05-l07', 'Le La à la main gauche, l’accord de Fa, la levée', '44–45', `
      <p>Le pouce de la main gauche monte d’une touche pour jouer le <b>La3</b>. L’accord de <b>Fa majeur</b> (symbole <b>F</b>) en position de Do : Do‑Fa‑La, doigts <b>5‑2‑1</b>.</p>
      ${cols(keyboardSvg({ low: 'C3', high: 'B3', highlight: ['C3', 'E3', 'G3'], labels: { C3: 'C' }, fingers: { C3: '5', E3: '3', G3: '1' } }), keyboardSvg({ low: 'C3', high: 'B3', highlight: ['C3', 'F3', 'A3'], labels: { C3: 'F' }, fingers: { C3: '5', F3: '2', A3: '1' } }))}
      <h3>La mesure incomplète (levée)</h3>
      <p>Un morceau peut commencer par une mesure incomplète : les temps manquants sont dans la <b>dernière</b> mesure. « Quand les saints » commence par trois noires de levée (temps 2, 3, 4).</p>
      ${tip('Dans l’appli, la levée est écrite avec des silences au début de la première mesure.')}
    `, [
      play('La main gauche et l’accord de Fa', { title: 'La et accord de Fa (MG)', tempo: 76,
        left: 'C3/4:5 E3/4:3 G3/2:1 | C3/4 F3/4:2 A3/2:1 | C3/4 E3 G3/2 | C3/4 F3 A3/2 | ' + C_LH + '/1:5,3,1 | ' + F_LH + '/1:5,2,1 | ' + C_LH + '/1 | ' + F_LH + '/1 | ' + C_LH + '/1' }),
      play('Échauffement C, G7, F', { title: 'Échauffement C – G7 – F (MG)', tempo: 84,
        left: C_LH + '/4:5,3,1 ' + C_LH + ' ' + C_LH + ' ' + C_LH + ' | ' + G7_LH + '/4:5,2,1 ' + G7_LH + ' ' + G7_LH + ' ' + G7_LH + ' | ' + C_LH + '/4 ' + C_LH + ' ' + C_LH + ' ' + C_LH + ' | ' + F_LH + '/4:5,2,1 ' + F_LH + ' ' + F_LH + ' ' + F_LH + ' | ' + C_LH + '/1' }),
      play('Quand les saints (mélodie MD, accords MG)', { title: 'Quand les saints', composer: 'Spiritual', tempo: 104, tempoText: 'Entraînant',
        right: '@f R/4 C4/4:1 E4/4:3 F4/4:4 | G4/1:5~ | G4/4 C4/4:1 E4/4:3 F4/4:4 | G4/1~ | G4/4 C4 E4 F4 | G4/2 E4/2:3 | C4/2:1 E4/2 | D4/1:2~ | D4/4 R/4 E4/4:3 D4/4:2 | C4/2:1 C4/2 | E4/2:3 G4/2:5 | G4/4 F4/2.:4~ | F4/2 E4/4:3 F4/4:4 | G4/2:5 E4/2:3 | C4/2:1 D4/2:2 | C4/1:1',
        left: 'R/1 | R/4 ' + C_LH + '/4:5,3,1 ' + C_LH + '/4 ' + C_LH + '/4 | ' + C_LH + '/4 R/4 R/2 | R/4 ' + C_LH + '/4 ' + C_LH + '/4 ' + C_LH + '/4 | ' + C_LH + '/4 R/4 R/2 | R/4 ' + C_LH + '/4 R/4 ' + C_LH + '/4 | R/4 ' + C_LH + '/4 R/4 ' + C_LH + '/4 | R/4 ' + G7_LH + '/4:5,2,1 ' + G7_LH + '/4 ' + G7_LH + '/4 | ' + G7_LH + '/4 R/4 R/2 | R/4 ' + C_LH + '/4 R/4 ' + C_LH + '/4 | R/4 ' + C_LH + '/4 R/4 ' + C_LH + '/4 | R/2 ' + F_LH + '/4:5,2,1 ' + F_LH + '/4 | ' + F_LH + '/4 R/4 R/2 | R/4 ' + C_LH + '/4 R/4 ' + C_LH + '/4 | R/4 ' + G7_LH + '/4 R/4 ' + G7_LH + '/4 | ' + C_LH + '/1' },
        { text: 'Trois noires de levée. La main gauche change d’accord : C, G7, F. Travaille d’abord la main gauche seule.' }),
    ]),

    lesson('c05-l08', 'Le La à la main droite, l’accord de Fa main droite', '46–47', `
      <p>Main droite : le 5<sup>e</sup> doigt monte sur le <b>La4</b> et le 3 glisse sur Fa. Accord de <b>F</b> main droite : Do‑Fa‑La, doigts <b>1‑3‑5</b>.</p>
      ${cols(keyboardSvg({ low: 'C4', high: 'B4', highlight: ['C4', 'E4', 'G4'], labels: { C4: 'C' }, fingers: { C4: '1', E4: '3', G4: '5' } }), keyboardSvg({ low: 'C4', high: 'B4', highlight: ['C4', 'F4', 'A4'], labels: { C4: 'F' }, fingers: { C4: '1', F4: '3', A4: '5' } }))}
    `, [
      play('La main droite et l’accord de Fa', { title: 'La et accord de Fa (MD)', tempo: 76,
        right: 'C4/4:1 E4/4:3 G4/2:5 | C4/4 F4/4:3 A4/2:5 | C4/4 E4 G4/2 | C4/4 F4 A4/2 | ' + C_RH + '/1:1,3,5 | ' + F_RH + '/1:1,3,5 | ' + C_RH + '/1 | ' + F_RH + '/1 | ' + C_RH + '/1' }),
      play('Échauffement C, G7, F (main droite)', { title: 'Échauffement C – G7 – F (MD)', tempo: 84,
        right: C_RH + '/4:1,3,5 ' + C_RH + ' ' + C_RH + ' ' + C_RH + ' | ' + G7_RH + '/4:1,4,5 ' + G7_RH + ' ' + G7_RH + ' ' + G7_RH + ' | ' + C_RH + '/4 ' + C_RH + ' ' + C_RH + ' ' + C_RH + ' | ' + F_RH + '/4:1,3,5 ' + F_RH + ' ' + F_RH + ' ' + F_RH + ' | ' + C_RH + '/1' }),
      play('Quand les saints (mélodie MG, accords MD)', { title: 'Quand les saints (mains inversées)', composer: 'Spiritual', tempo: 104,
        right: 'R/1 | R/4 ' + C_RH + '/4:1,3,5 ' + C_RH + '/4 ' + C_RH + '/4 | ' + C_RH + '/4 R/4 R/2 | R/4 ' + C_RH + '/4 ' + C_RH + '/4 ' + C_RH + '/4 | ' + C_RH + '/4 R/4 R/2 | R/4 ' + C_RH + '/4 R/4 ' + C_RH + '/4 | R/4 ' + C_RH + '/4 R/4 ' + C_RH + '/4 | R/4 ' + G7_RH + '/4:1,4,5 ' + G7_RH + '/4 ' + G7_RH + '/4 | ' + G7_RH + '/4 R/4 R/2 | R/4 ' + C_RH + '/4 R/4 ' + C_RH + '/4 | R/4 ' + C_RH + '/4 R/4 ' + C_RH + '/4 | R/2 ' + F_RH + '/4:1,3,5 ' + F_RH + '/4 | ' + F_RH + '/4 R/4 R/2 | R/4 ' + C_RH + '/4 R/4 ' + C_RH + '/4 | R/4 ' + G7_RH + '/4 R/4 ' + G7_RH + '/4 | ' + C_RH + '/1',
        left: '@f R/4 C3/4:5 E3/4:3 F3/4:2 | G3/1:1~ | G3/4 C3/4 E3/4 F3/4 | G3/1~ | G3/4 C3 E3 F3 | G3/2 E3/2:3 | C3/2:5 E3/2 | D3/1:4~ | D3/4 R/4 E3/4:3 D3/4:4 | C3/2:5 C3/2 | E3/2:3 G3/2:1 | G3/4 F3/2.:2~ | F3/2 E3/4:3 F3/4:2 | G3/2:1 E3/2:3 | C3/2:5 D3/2:4 | C3/1:5' }),
    ]),

    lesson('c05-l09', 'Avec l’accord de Fa : deux pièces', '48–49', `
      <p>Les trois accords <b>C</b>, <b>G7</b> et <b>F</b> sont les plus importants en Do majeur : avec eux on accompagne une grande partie des chansons populaires.</p>
      <table class="theory-table"><tr><th>C</th><td>Do Mi Sol</td><td>MG 5‑3‑1 · MD 1‑3‑5</td></tr><tr><th>G7</th><td>Si Fa Sol</td><td>MG 5‑2‑1 · MD 1‑4‑5</td></tr><tr><th>F</th><td>Do Fa La</td><td>MG 5‑2‑1 · MD 1‑3‑5</td></tr></table>
      ${miniScore({ left: '[C3 E3 G3]/2 [B2 F3 G3]/2 | [C3 E3 G3]/2 [C3 F3 A3]/2 | [C3 E3 G3]/2 [B2 F3 G3]/2 | [C3 E3 G3]/1' })}
    `, [
      play('C – G7 – F enchaînés', { title: 'C – G7 – F', tempo: 84,
        left: C_LH + '/2:5,3,1 ' + G7_LH + '/2:5,2,1 | ' + C_LH + '/2 ' + F_LH + '/2:5,2,1 | ' + C_LH + '/2 ' + G7_LH + '/2 | ' + C_LH + '/1',
        right: C_RH + '/2:1,3,5 ' + G7_RH + '/2:1,4,5 | ' + C_RH + '/2 ' + F_RH + '/2:1,3,5 | ' + C_RH + '/2 ' + G7_RH + '/2 | ' + C_RH + '/1' }),
      play('Je vais déposer mon fardeau', { title: 'Je vais déposer mon fardeau', composer: 'Spiritual', tempo: 96,
        left: '@mf R/4 C3/4:5 E3/4:3 F3/4:2 | ' + C_LH + '/4:5,3,1 ' + C_LH + '/4 ' + G7_LH + '/4:5,2,1 ' + G7_LH + '/4 | ' + C_LH + '/4 E3/4:3 F3/4:2 G3/4:1 | ' + C_LH + '/4 ' + C_LH + '/4 ' + F_LH + '/4:5,2,1 ' + F_LH + '/4 | ' + C_LH + '/4 E3/4:3 F3/4:2 E3/4:3 | ' + G7_LH + '/1~ | ' + G7_LH + '/4 F3/4:2 E3/4:3 D3/4:4 | C3/4:5 ' + C_LH + '/4 ' + F_LH + '/4 ' + F_LH + '/4 | ' + C_LH + '/1' },
        { text: 'Main gauche seule : la mélodie et les accords alternent. Trois noires de levée.' }),
      play('Valse des accords', { title: 'Valse des accords', tempo: 96, timeSig: [3, 4], tempoText: 'Tempo de valse',
        right: 'R/4 ' + C_RH + '/4:1,3,5 ' + C_RH + '/4 | R/4 ' + F_RH + '/4:1,3,5 ' + F_RH + '/4 | R/4 ' + C_RH + '/4 ' + C_RH + '/4 | R/4 ' + F_RH + '/4 ' + F_RH + '/4 | R/4 ' + C_RH + '/4 ' + C_RH + '/4 | R/4 ' + G7_RH + '/4:1,4,5 ' + G7_RH + '/4 | R/4 ' + C_RH + '/4 ' + C_RH + '/4 | ' + C_RH + '/2.',
        left: C_LH + '/2.:5,3,1 | ' + F_LH + '/2.:5,2,1 | ' + C_LH + '/2. | ' + F_LH + '/2. | ' + C_LH + '/2. | ' + G7_LH + '/2.:5,2,1 | ' + C_LH + '/2.~ | ' + C_LH + '/2.' },
        { text: 'La main gauche pose l’accord sur le 1er temps, la droite répond sur les temps 2 et 3 : « oum‑pa‑pa ».' }),
    ]),
  ],
};
