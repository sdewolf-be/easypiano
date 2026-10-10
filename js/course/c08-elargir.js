import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, rhythmTable, NOTE_GLYPHS as N, tip, cols } from '../diagrams.js';

const C_LH = '[C3 E3 G3]', G7_LH = '[B2 F3 G3]', F_LH = '[C3 F3 A3]';
const G_LH = '[G2 B2 D3]', CG_LH = '[G2 C3 E3]', D7_LH = '[F#2 C3 D3]';

function hanon6() {
  const L = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const n = (d, o) => L[((d % 7) + 7) % 7] + (o + Math.floor(d / 7));
  const up = [], down = [];
  for (let m = 0; m < 7; m++) up.push([0, 5, 4, 5, 3, 5, 2, 5].map(d => n(d + m, 4) + '/8').join(' '));
  for (let m = 0; m < 7; m++) down.push([4, 6, 7, 6, 8, 6, 9, 6].map(d => n(d + 6 - m, 3) + '/8').join(' '));
  const rh = up.concat(down).join(' | ') + ' | C5/1';
  return { rh, lh: rh.replace(/([A-G])(\d)/g, (s, l, o) => l + (parseInt(o, 10) - 1)) };
}
const h6 = hanon6();

export default {
  id: 'c08',
  title: 'Élargir la position des cinq doigts',
  pages: '83–99',
  intro: 'Sixtes, septièmes et octaves : la main s’ouvre. Le staccato, la mesure à 2/4, le bémol, les demi‑tons et tons, les tétracordes.',
  lessons: [
    lesson('c08-l01', 'Les sixtes', '83–84', `
      <p>Pour jouer une <b>sixte</b> (Do→La, 6 notes), la main s’<b>étire</b> : le 5<sup>e</sup> doigt monte d’une touche (main droite) ou le pouce (main gauche).</p>
      ${cols(keyboardSvg({ low: 'C4', high: 'B4', highlight: ['C4', 'A4'], labels: { C4: 'Do', A4: 'La' }, fingers: { C4: '1', A4: '5' } }), keyboardSvg({ low: 'C3', high: 'B3', highlight: ['C3', 'A3'], labels: { C3: 'Do', A3: 'La' }, fingers: { C3: '5', A3: '1' } }))}
      <p>Une sixte va d’une ligne à un espace (ou l’inverse), en sautant deux lignes.</p>
      ${miniScore({ right: 'C4/2 D4 | C4 E4 | C4 F4 | C4 G4 | C4 A4 | [C4 A4]/1' }, { showNames: true })}
    `, [
      play('De la seconde à la sixte', { title: 'Mesurer jusqu’à la sixte', tempo: 84,
        right: 'C4/2:1 D4/2:2 | C4 E4:3 | C4 F4:4 | C4 G4:5 | C4 A4:5 | [C4 D4]/1:1,2 | [C4 E4]/1:1,3 | [C4 F4]/1:1,4 | [C4 G4]/1:1,5 | [C4 A4]/1:1,5',
        left: 'C3/2:5 D3/2:4 | C3 E3:3 | C3 F3:2 | C3 G3:1 | C3 A3:1 | [C3 D3]/1:5,4 | [C3 E3]/1:5,3 | [C3 F3]/1:5,2 | [C3 G3]/1:5,1 | [C3 A3]/1:5,1' }),
      play('Échauffement en sixtes', { title: 'Échauffement en sixtes', tempo: 96, timeSig: [3, 4],
        right: '[C4 G4]/4:1,5 [C4 A4]/4:1,5 [C4 G4]/4 | [C4 A4]/4 [C4 G4]/4 [C4 A4]/4 | [C4 G4]/4 [C4 A4]/4 [C4 G4]/4 | [C4 A4]/2.',
        left: '[C3 G3]/4:5,1 [C3 A3]/4:5,1 [C3 G3]/4 | [C3 A3]/4 [C3 G3]/4 [C3 A3]/4 | [C3 G3]/4 [C3 A3]/4 [C3 G3]/4 | [C3 A3]/2.' }),
      play('Lavande bleue (Lavender’s Blue)', { title: 'Lavande bleue', composer: 'Traditionnel anglais', tempo: 100, timeSig: [3, 4], tempoText: 'Avec grâce',
        right: '@mf C4/4:1 G4/4:5 G4/4 | [C4 A4]/4:1,5 G4/8 F4/8:4 E4/8:3 D4/8:2 | C4/4 G4/4 G4/4 | [E4 G4]/2.:3,5 | C4/4 G4 G4 | [C4 A4]/4 G4/8 F4/8 E4/8 D4/8 | F4/4:4 E4/4:3 D4/4:2 | C4/2.:1 | R/4 G4/8:5 F4/8 E4/8 D4/8 | C4/4 R/4 R/4 | R/4 [C4 E4]/4:1,3 [C4 E4]/4 | [C4 E4]/2.^',
        left: C_LH + '/4:5,3,1 R/4 R/4 | ' + C_LH + '/4 R/4 R/4 | ' + G7_LH + '/4:5,2,1 R/4 R/4 | C3/4:5 [E3 G3]/4:3,1 [E3 G3]/4 | ' + C_LH + '/4 R R | ' + C_LH + '/4 R R | [C3 G3]/4:5,1 [C3 G3]/4 [C3 A3]/4 | ' + C_LH + '/4 A3/8:1 G3/8 F3/8 E3/8 | C3/4:5 R/4 R/4 | R/4 A3/8 G3/8 F3/8 E3/8 | C3/4 [E3 G3]/4 [E3 G3]/4 | ' + C_LH + '/2.^' }),
      quiz('Jouer des sixtes', [
        q('Joue une <b>sixte</b> mélodique au‑dessus de Do4.', ['C4', 'A4']),
        q('Joue une <b>sixte harmonique</b> sur Do4.', ['C4', 'A4'], { mode: 'chord' }),
        q('Joue une <b>sixte</b> au‑dessus de Ré4.', ['D4', 'B4']),
        q('Main gauche : <b>sixte harmonique</b> sur Do3.', ['C3', 'A3'], { mode: 'chord' }),
        q('Main gauche : <b>sixte</b> au‑dessus de Mi3.', ['E3', 'C4']),
      ]),
    ]),

    lesson('c08-l02', 'La mesure à 2/4', '85–86', `
      <p><b>2/4</b> : deux temps par mesure, la noire vaut un temps. On compte « 1 2 ». C’est la mesure de la marche.</p>
      ${miniScore({ right: 'C4/4 E4 | [C4 G4]/4. [C4 G4]/8 | [E4 G4]/2 | [C4 G4]/4 [C4 G4]/4', timeSig: [2, 4] })}
      ${tip('Dans « Kum‑ba‑yah », le livre alterne 2/4 et 4/4 ; ici tout est écrit en 2/4, ce qui revient au même pour les doigts.')}
    `, [
      play('Kum‑ba‑yah', { title: 'Kum‑ba‑yah', composer: 'Spiritual', tempo: 88, timeSig: [2, 4], tempoText: 'Calme',
        right: '@mf C4/4:1 E4/4:3 | [C4 G4]/4.:1,5 [C4 G4]/8 | [E4 G4]/2:3,5 | [C4 G4]/4 [C4 G4]/4 | [C4 G4]/2~ | [C4 G4]/2 | C4/4 E4/4 | [C4 G4]/4. [C4 G4]/8 | [E4 G4]/2 | F4/4:4 E4/4:3 | D4/2:2~ | D4/2 | C4/4 E4/4 | [C4 G4]/4. [C4 G4]/8 | [E4 G4]/2 | [C4 G4]/4 [C4 G4]/4 | [C4 G4]/2~ | [C4 G4]/2 | G4/2:5 | E4/4:3 C4/4:1 | C4/2 | D4/4:2 D4/4 | C4/2~ | C4/2',
        left: 'R/2 | [E3 G3]/4.:3,1 [E3 G3]/8 | [F3 G3]/2:2,1 | [E3 G3]/4 [E3 G3]/4 | ' + C_LH + '/2:5,3,1~ | ' + C_LH + '/2 | R/2 | [E3 G3]/4. [E3 G3]/8 | [F3 G3]/2 | R/2 | [F3 G3]/2~ | [F3 G3]/2 | R/2 | [E3 G3]/4. [E3 G3]/8 | [F3 G3]/2 | [E3 G3]/4 [E3 G3]/4 | ' + C_LH + '/2~ | ' + C_LH + '/2 | [C3 G3]/2:5,1 | [C3 G3]/2~ | [C3 G3]/2 | [F3 G3]/4 [F3 G3]/4 | ' + C_LH + '/2~ | ' + C_LH + '/2' }),
    ]),

    lesson('c08-l03', 'Hanon en sixtes', '87', `
      <p>Exercice d’aérobic pour les sixtes : le pouce reste sur la note de base pendant que le 5<sup>e</sup> doigt va chercher la sixte, puis 4, 3, 2 alternent avec le 5.</p>
      ${miniScore({ right: 'C4/8 A4 G4 A4 F4 A4 E4 A4 | D4 B4 A4 B4 G4 B4 F4 B4' })}
    `, [
      play('Hanon : sixtes aérobiques', { title: 'Hanon en sixtes', composer: 'd’après C.-L. Hanon', tempo: 76, right: h6.rh, left: h6.lh },
        { text: 'Mains à l’octave, très lentement d’abord. Garde le poignet souple quand la main s’ouvre.' }),
    ]),

    lesson('c08-l04', 'Le pouce se déplace : London Bridge, Michael', '88', `
      <p>Dans ces deux chansons, la main droite n’est plus dans une position fixe : le pouce se pose sur Do <i>ou</i> sur Ré, le 5<sup>e</sup> doigt sur La <i>ou</i> Sol. Suis les doigtés, ils préparent les déplacements.</p>
      ${tip('Regarde une mesure à l’avance : un changement de doigté annonce un déplacement de la main.')}
    `, [
      play('London Bridge', { title: 'London Bridge', composer: 'Traditionnel anglais', tempo: 100, tempoText: 'Gai',
        right: '@f G4/4.:4 A4/8:5 G4/4:4 F4/4:3 | E4/4:2 F4/4:3 G4/2:4 | D4/4:1 E4/4:2 F4/2:3 | E4/4:2 F4/4:3 G4/2:4 | G4/4. A4/8 G4/4 F4/4 | E4/4 F4/4 G4/2 | D4/2:1 G4/2:4 | @p E4/4:2 C4/2.:1',
        left: C_LH + '/1:5,3,1~ | ' + C_LH + '/1 | ' + G7_LH + '/1:5,2,1 | ' + C_LH + '/1 | ' + C_LH + '/1~ | ' + C_LH + '/1 | ' + G7_LH + '/1 | ' + C_LH + '/1' }),
      play('Michael, rame vers le rivage', { title: 'Michael, rame vers le rivage', composer: 'Spiritual', tempo: 92,
        right: '@mf R/2 C4/4:1 E4/4:2 | G4/4.:4 E4/8:2 G4/4:4 A4/4:5 | G4/2:4 E4/4:2 G4/4:4 | G4/1 | G4/2 R/2 | R/1 | R/1 | G4/2:4 F4/2:3 | E4/2:2 R/2',
        left: 'R/1 | R/1 | R/1 | [C3 F3]/1:5,2 | ' + C_LH + '/2:5,3,1 C3/4:5 E3/4:3 | G3/4.:1 E3/8:3 G3/4:1 A3/4:1 | G3/2 E3/4 G3/4 | G3/2 F3/2:2 | C3/2:5 R/2' },
        { text: 'La mélodie commence à la main droite et passe à la main gauche, une octave plus bas.' }),
    ]),

    lesson('c08-l05', 'Blow the Man Down', '89', `
      <p>Un chant de marins en 3/4 : la main droite se déplace (pouce sur Do, puis sur La) ; la main gauche alterne basse et accord (« Do – Mi‑Sol – Mi‑Sol »), le vrai accompagnement de valse.</p>
      ${miniScore({ left: 'C3/4 [E3 G3]/4 [E3 G3]/4 | B2/4 [F3 G3]/4 [F3 G3]/4', timeSig: [3, 4] })}
    `, [
      play('Blow the Man Down', { title: 'Blow the Man Down', composer: 'Chant de marins', tempo: 112, timeSig: [3, 4], tempoText: 'Balancé',
        right: '@f R/2 G4/4:4 | G4/4. A4/8:5 G4/4 | E4/4:2 C4/4:1 E4/4:2 | G4/4. A4/8 G4/4 | E4/2~ E4/8 C4/8 | E4/4 G4/2~ | G4/2 A4/4:5 | F4/4.:3 E4/8:2 F4/4 | G4/2:4~ G4/4 | G4/4 G4/4 G4/4 | A4/4 G4/4 F4/4 | A4/4 G4/4 F4/4 | A4/2.^ | G4/4:4 G4 G4 | G4/2 F4/4 | E4/4.:2 D4/8:1 E4/4:2 | C4/2.:1',
        left: 'R/2. | C3/4:5 [E3 G3]/4:3,1 [E3 G3]/4 | C3/4 [E3 G3] [E3 G3] | C3 [E3 G3] [E3 G3] | C3 [E3 G3] R/4 | C3 [E3 G3] [E3 G3] | C3 [E3 G3] [E3 G3] | B2/4:5 [F3 G3]/4:2,1 [F3 G3]/4 | B2 [F3 G3] [F3 G3] | B2 [F3 G3] [F3 G3] | B2 [F3 G3] [F3 G3] | B2 [F3 G3] [F3 G3] | ' + G7_LH + '/2.^ | C3/4 [E3 G3]/4 [E3 G3]/4 | C3 [E3 G3] [E3 G3] | C3 [E3 G3] [E3 G3] | ' + C_LH + '/2.' }),
    ]),

    lesson('c08-l06', 'Sixtes mobiles et staccato', '90–91', `
      <p>Les sixtes peuvent <b>monter et descendre</b> en gardant l’écart de la main : Do‑La, Ré‑Si, Mi‑Do…</p>
      ${miniScore({ right: '[C4 A4]/2 [D4 B4]/2 | [E4 C5]/2 [F4 D5]/2 | [G4 E5]/2 [F4 D5]/2 | [E4 C5]/2 [D4 B4]/2 | [C4 A4]/1' })}
      <h3>Le staccato</h3>
      <p>Un <b>point</b> au‑dessus ou en dessous d’une note (pas à côté !) = <b>staccato</b> : note courte, détachée, comme si la touche était brûlante. Le contraire du legato.</p>
    `, [
      play('Sixtes qui montent et descendent', { title: 'Sixtes mobiles', tempo: 84,
        right: '[C4 A4]/2:1,5 [D4 B4]/2 | [E4 C5]/2 [F4 D5]/2 | [G4 E5]/2 [F4 D5]/2 | [E4 C5]/2 [D4 B4]/2 | [C4 A4]/1',
        left: '[E3 C4]/2:5,1 [D3 B3]/2 | [C3 A3]/2 [B2 G3]/2 | [A2 F3]/2 [B2 G3]/2 | [C3 A3]/2 [D3 B3]/2 | [E3 C4]/1' }),
      play('Valse de l’étoile', { title: 'Valse de l’étoile', tempo: 112, timeSig: [3, 4], tempoText: 'Valse',
        right: '@p C4/8:1 E4/8:2 G4/4:5 G4/4 | D4/8:1 F4/8:3 A4/4:5 A4/4 | D4/8 F4/8 G4/4 G4/4 | E4/2.:3 | C4/8 E4/8 G4/4 G4/4 | D4/8 F4/8 A4/4 A4/4 | D4/8 F4/8 G4/4 G4/4 | E4/2. | @mf [E4 C5]/4\':1,5 [D4 B4]/4\' [C4 A4]/4\' | [D4 B4]/2. | [C4 A4]/4\' [D4 B4]/4\' [E4 C5]/4\' | [D4 B4]/2. | [E4 C5]/4\' [D4 B4]/4\' [C4 A4]/4\' | [D4 B4]/2. | [C4 A4]/4\' [D4 B4]/4\' [E4 C5]/4\' | [D4 B4]/2. | C4/8 E4/8 G4/4 G4/4 | D4/8 F4/8 A4/4 A4/4 | D4/8 F4/8 G4/4 G4/4 | E4/2. | C4/8 E4/8 G4/4 G4/4 | D4/8 F4/8 A4/4 A4/4 | D4/8 F4/8 G4/4 G4/4 | C4/2.',
        left: '[C3 A3]/2.:5,1 | [B2 G3]/2. | [B2 G3]/2. | C3/4:5 E3/4:3 G3/4:1 | [C3 A3]/2. | [B2 G3]/2. | [B2 G3]/2. | C3/4 [E3 G3]/2 | R/2. | R/4 [C3 D3]/4\':2,1 [C3 D3]/4\' | R/2. | R/4 [B2 D3]/4\':3,1 [B2 D3]/4\' | R/2. | R/4 [C3 D3]/4\' [C3 D3]/4\' | R/2. | R/4 [B2 D3]/4\' [B2 D3]/4\' | [C3 A3]/2. | [B2 G3]/2. | [B2 G3]/2. | C3/4 E3/4 G3/4 | [C3 A3]/2. | [B2 G3]/2. | [B2 G3]/2. | ' + C_LH + '/2.' },
        { text: 'Dans l’esprit de « Lone Star Waltz » : partie A legato, partie B en sixtes staccato, puis retour (D.C.).' }),
    ]),

    lesson('c08-l07', 'Septièmes et octaves', '92–95', `
      <p>La main s’ouvre encore : <b>septième</b> (Do→Si) et <b>octave</b> (Do→Do, 8 notes). L’octave se joue 1‑5 ; la main doit rester détendue.</p>
      ${keyboardSvg({ low: 'C4', high: 'C5', highlight: ['C4', 'B4', 'C5'], labels: { C4: 'Do', B4: '7e', C5: '8ve' }, fingers: { C4: '1', C5: '5' } })}
      ${miniScore({ right: 'C4/2 B4/2 | C4/2 C5/2 | [C4 B4]/1 | [C4 C5]/1' }, { showNames: true })}
      ${tip('Si ta main est petite, ne force pas l’octave : joue‑la legèrement détachée plutôt que crispée.')}
    `, [
      play('De la seconde à l’octave', { title: 'Jusqu’à l’octave', tempo: 84,
        right: 'C4/2:1 D4/2:2 | C4 E4:3 | C4 F4:4 | C4 G4:5 | C4 A4:5 | C4 B4:5 | C4 C5:5 | [C4 D4]/1 | [C4 E4]/1 | [C4 F4]/1 | [C4 G4]/1 | [C4 A4]/1 | [C4 B4]/1 | [C4 C5]/1:1,5',
        left: 'C3/2:5 D3/2:4 | C3 E3:3 | C3 F3:2 | C3 G3:1 | C3 A3:1 | C3 B3:1 | C3 C4:1 | [C3 D3]/1 | [C3 E3]/1 | [C3 F3]/1 | [C3 G3]/1 | [C3 A3]/1 | [C3 B3]/1 | [C3 C4]/1:5,1' }),
      play('Café de Vienne', { title: 'Café de Vienne', tempo: 120, timeSig: [3, 4], tempoText: 'Valse viennoise',
        right: '@p E4/8:2 C4/8:1 G4/4:4 G4/4 | E4/8 C4/8 A4/4:5 A4/4 | E4/8 C4/8 B4/4:5 A4/4:4 | @f G4/4:3 [D4 G4]/4:1,2 [D4 G4]/4 | @mf F4/8:2 D4/8:1 B4/4:5 A4/4:4 | G4/4:3 [E4 G4]/4:2,3 [E4 G4]/4 | F4/8 D4/8 B4/4 A4/4 | G4/4 E4/4:1 E4/4 | @p E4/8:2 C4/8:1 G4/4:4 G4/4 | E4/8 C4/8 A4/4 A4/4 | E4/8 C4/8 B4/4 A4/4 | @f G4/4 [D4 G4]/4 [D4 G4]/4 | @mf F4/8 D4/8 B4/4 A4/4 | G4/4 [E4 G4]/4 [E4 G4]/4 | @rit. G4/8:5 F4/8 E4/4 D4/4 | C4/4:1 E4/2^',
        left: 'C3/4:5 [E3 G3]/4:3,1 [E3 G3]/4 | C3 [E3 G3] [E3 G3] | C3 [E3 G3] [E3 G3] | B2/4:5 [F3 G3]/4:2,1 [F3 G3]/4 | G2/4:5 [F3 G3]/4 [F3 G3]/4 | G2 [F3 G3] [F3 G3] | G2 [F3 G3] [F3 G3] | C3 [E3 G3] [E3 G3] | C3 [E3 G3] [E3 G3] | C3 [E3 G3] [E3 G3] | C3 [E3 G3] [E3 G3] | B2 [F3 G3] [F3 G3] | G2 [F3 G3] [F3 G3] | G2 [F3 G3] [F3 G3] | G2 [F3 G3] [F3 G3] | C3/4 [E3 G3]/2^' },
        { text: 'Attention au doigté de la main droite : la tierce Mi‑Do se joue 2‑1 !' }),
      play('Berceuse (Brahms)', { title: 'Berceuse', composer: 'J. Brahms', tempo: 96, timeSig: [3, 4], tempoText: 'Andante',
        right: '@p R/2 E4/8:1 E4/8 | G4/4.:2 E4/8 E4/4 | G4/2 E4/8 G4/8 | C5/4:5 B4/4. A4/8 | A4/4 G4/4 D4/8:1 E4/8 | F4/4 D4/4 D4/8 E4/8 | F4/2 D4/8 F4/8 | B4/8:4 A4/8 G4/4 B4/4 | C5/2 C4/8:1 C4/8 | C5/2:5 A4/8 F4/8 | G4/2 E4/8:2 C4/8:1 | F4/4 G4/4 A4/4 | E4/4 G4/4 C4/8 C4/8 | C5/2 A4/8 F4/8 | G4/2 E4/8 C4/8 | F4/4:3 E4/4 D4/4 | C4/2.',
        left: 'R/2. | C3/4:5 [E3 G3]/4:3,1 R/4 | C3 [E3 G3] R | C3 [E3 G3] [E3 G3] | D3/4:4 [F3 G3]/4 R/4 | C3 [E3 G3] R | C3 [E3 G3] R | D3 [F3 G3] [F3 G3] | C3 [E3 G3] R | C3/4 [F3 A3]/4:2,1 R/4 | C3 [E3 G3] R | B2/4 [F3 G3]/4 [F3 G3]/4 | C3 [E3 G3] R | C3 [F3 A3] R | C3 [E3 G3] R | B2 [F3 G3] [F3 G3] | ' + C_LH + '/2.' }),
      quiz('Septièmes et octaves', [
        q('Joue une <b>octave</b> mélodique à partir de Do4.', ['C4', 'C5']),
        q('Joue une <b>septième</b> au‑dessus de Do4.', ['C4', 'B4']),
        q('Joue une <b>octave harmonique</b> sur Do4 (doigts 1 et 5).', ['C4', 'C5'], { mode: 'chord' }),
        q('Main gauche : une <b>octave</b> sur Do3.', ['C3', 'C4'], { mode: 'chord' }),
        q('Main gauche : une <b>septième</b> au‑dessus de Ré3.', ['D3', 'C4']),
      ]),
    ]),

    lesson('c08-l08', 'Le bémol', '96–97', `
      <p>Un <b>bémol</b> (♭) devant une note : joue la touche <b>juste à gauche</b>, noire ou blanche. Si♭ est la touche noire à gauche de Si ; Fa♭ est… Mi !</p>
      ${keyboardSvg({ low: 'C4', high: 'B4', highlight: ['A#4', 'D#4'], labels: { 'A#4': 'Si♭', 'D#4': 'Mi♭', B4: 'Si', E4: 'Mi' } })}
      <ul>
        <li>Comme le dièse, le bémol vaut pour <b>toute la mesure</b>.</li>
        <li>Une même touche noire a deux noms : Do♯ = Ré♭, Ré♯ = Mi♭, Fa♯ = Sol♭, Sol♯ = La♭, La♯ = Si♭.</li>
      </ul>
    `, [
      play('Balance ton blues', { title: 'Balance ton blues', tempo: 116, tempoText: 'Rock modéré',
        right: '@mf G4/4:1 G4 B4:3 D5:5 | G4/2 B4/4 D5/4 | C5/4:4 B4/4 C5/4 B4/4 | Bb4/4:3 A4/2.:2 | G4/4 G4 B4 D5 | G4/2 B4/4 D5/4 | Bb4/4:3 G4/4:1 B4/2:3 | A4/1:2 | G4/4 G4 B4 D5 | G4/2 B4/4 D5/4 | C5/4 B4 C5 B4 | Bb4/4 A4/2. | G4/4 G4 B4 D5 | G4/2 B4/4 D5/4 | Bb4/4 G4/4 B4/2 | G4/1',
        left: G_LH + '/1:5,3,1~ | ' + G_LH + '/1 | ' + CG_LH + '/1:5,2,1~ | ' + CG_LH + '/1 | ' + G_LH + '/1~ | ' + G_LH + '/1 | ' + CG_LH + '/1 | ' + D7_LH + '/1:5,2,1 | ' + G_LH + '/1~ | ' + G_LH + '/1 | ' + CG_LH + '/1~ | ' + CG_LH + '/1 | ' + G_LH + '/1~ | ' + G_LH + '/1 | ' + CG_LH + '/2 ' + D7_LH + '/2 | ' + G_LH + '/1' },
        { text: 'Dans l’esprit de « Rock It Away » : le Si♭ (doigt 3) donne la couleur blues.' }),
      quiz('Jouer les bémols', [
        q('Joue <b>Si♭3</b>.', ['Bb3']),
        q('Joue <b>Mi♭4</b>.', ['Eb4']),
        q('Joue <b>La♭4</b>.', ['Ab4']),
        q('Joue <b>Ré♭4</b>.', ['Db4']),
        q('Joue <b>Sol♭3</b> (main gauche).', ['Gb3']),
        q('Joue <b>Fa♭4</b> (touche blanche !).', ['E4']),
        q('Joue <b>Do♭4</b> (touche blanche !).', ['B3']),
      ]),
    ]),

    lesson('c08-l09', 'Demi‑tons, tons et tétracordes', '98–99', `
      <h3>Demi‑ton et ton</h3>
      <ul>
        <li>Un <b>demi‑ton</b> : d’une touche à la touche <b>immédiatement</b> voisine (noire ou blanche). Mi→Fa et Si→Do sont des demi‑tons entre touches blanches.</li>
        <li>Un <b>ton</b> = deux demi‑tons : on <b>saute</b> une touche. Do→Ré, Ré→Mi sont des tons.</li>
      </ul>
      ${keyboardSvg({ low: 'C4', high: 'B4', highlight: ['E4', 'F4', 'B4'], labels: { E4: 'Mi', F4: 'Fa', B4: 'Si', C4: 'Do', D4: 'Ré' } })}
      <h3>Le tétracorde</h3>
      <p>Quatre notes qui se suivent (dans l’ordre alphabétique) avec le motif <b>ton – ton – demi‑ton</b> : Do Ré Mi Fa, Sol La Si Do, Ré Mi Fa♯ Sol. C’est la brique de base des gammes.</p>
      ${miniScore({ right: 'C4/4 D4 E4 F4 | G4 A4 B4 C5 | D4 E4 F#4 G4 | R/1' })}
    `, [
      quiz('Demi‑tons et tons', [
        q('Joue un <b>demi‑ton</b> au‑dessus de Mi4.', ['E4', 'F4']),
        q('Joue un <b>demi‑ton</b> au‑dessus de Do4.', ['C4', 'C#4']),
        q('Joue un <b>ton</b> au‑dessus de Do4.', ['C4', 'D4']),
        q('Joue un <b>ton</b> au‑dessus de Mi4.', ['E4', 'F#4']),
        q('Joue un <b>demi‑ton</b> en dessous de Do4.', ['C4', 'B3']),
        q('Joue un <b>ton</b> en dessous de Fa4.', ['F4', 'Eb4']),
      ]),
      quiz('Jouer des tétracordes', [
        q('Joue le tétracorde de <b>Do</b> : Do Ré Mi Fa (main droite 1‑2‑3‑4).', ['C4', 'D4', 'E4', 'F4']),
        q('Joue le tétracorde de <b>Sol</b> : Sol La Si Do.', ['G4', 'A4', 'B4', 'C5']),
        q('Joue le tétracorde de <b>Ré</b> : Ré Mi … Sol (attention à la 3e note !).', ['D4', 'E4', 'F#4', 'G4']),
        q('Joue le tétracorde de <b>Fa</b> : Fa Sol La … (attention à la 4e note !).', ['F4', 'G4', 'A4', 'Bb4']),
        q('Main gauche : tétracorde de Do, Do3 Ré3 Mi3 Fa3 (5‑4‑3‑2).', ['C3', 'D3', 'E3', 'F3']),
      ]),
    ]),
  ],
};
