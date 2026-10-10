import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, rhythmTable, NOTE_GLYPHS as N, tip, warn, cols } from '../diagrams.js';
import { transposeText } from '../music.js';

// Accords « confortables » déjà connus
const G = '[G2 B2 D3]', D7 = '[F#2 C3 D3]';
const C = '[C3 E3 G3]', G7 = '[B2 F3 G3]', F = '[C3 F3 A3]';
const Am = '[A2 C3 E3]', Dm = '[A2 D3 F3]', E7 = '[G#2 D3 E3]';
const Fm = '[F2 A2 C3]', C7 = '[E2 Bb2 C3]', Bbm = '[F2 Bb2 D3]';

// ---- He's Got the Whole World (p. 138) : écrit en Sol, puis transposé en Do et en Fa ----
const WORLD_R = '@mf R/2 D5/8:4 D5/8 D5/8 B4/8:2 | B4/2:2 B4/8 G4/8:1~ G4/4 | D5/8:4 E5/8:5 D5/8:4~ D5/8 D5/8 D5/8 D5/8 B4/8:2 | B4/4:3 B4/4 B4/8 G4/8:1~ G4/4 | D5/8:4 E5/8:5 D5/8:4~ D5/8 D5/8 D5/8 D5/8 A4/8:1 | B4/2:2 B4/8 G4/8:1~ G4/4 | D5/8:4 E5/8:5 D5/8:4~ D5/8 D5/8 D5/8 D5/8 B4/8:2 | D5/4:4 D5/4 C5/8:2 A4/8:1~ A4/4 | G4/2:1 R/2';
const WORLD_L = 'R/1 | ' + G + '/4:5,3,1 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + G + '/4 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + D7 + '/4:5,2,1 ' + D7 + '/4 ' + D7 + '/4 ' + D7 + '/4 | ' + D7 + '/4 ' + D7 + '/4 ' + D7 + '/4 ' + D7 + '/4 | ' + G + '/4 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + G + '/4 ' + G + '/4 ' + G + '/4 ' + G + '/4 | ' + D7 + '/4 ' + D7 + '/4 ' + D7 + '/4 ' + D7 + '/4 | ' + G + '/8 ' + G + '/4 ' + G + '/8 R/2';

// ---- The Entertainer : accompagnement main gauche ----
const CEG = 'C3/4 [E3 G3]/4 C3/4 [E3 G3]/4';
const ENT_L1 = 'C3/4:5 [E3 G3]/4:3,1 C3/4 [E3 G3]/4';
const ENT_L2 = 'C3/4 [E3 G3]/4 C3/4 [E3 Bb3]/4:3,1';
const ENT_L3 = 'C3/4 [E3 G3]/4 G2/4:5 [D3 F3]/4:3,1';
const ENT_L4 = "C3/4 [E3 G3]/4 [E3 G3]/4' R/4";
const ENT_MOTIF = 'E4/8:1 C5/4:5 E4/8:1 C5/4:5 E4/8:1 C5/8:5~';

// ---- Korobeiniki : accompagnements ----
const AmP = 'A2/4:5 [C3 E3]/4:3,1 A2/4 [C3 E3]/4';
const DmP = 'A2/4:5 [D3 F3]/4:2,1 A2/4 [D3 F3]/4';
const GP = 'G2/4:5 [B2 D3]/4:3,1 G2/4 [B2 D3]/4';
const E7Q = E7 + '/4:5,2,1 ' + E7 + '/4 ' + E7 + '/4 ' + E7 + '/4';

export default {
  id: 'c14',
  title: 'Révision et répertoire',
  pages: '138–159',
  intro: 'Transposer un morceau dans trois tonalités, le ragtime, les triolets, puis un répertoire de fin de niveau qui rassemble tout ce que tu as appris.',
  lessons: [
    lesson('c14-l01', 'Transposer : He’s Got the Whole World', '138–139', `
      <p><b>Transposer</b>, c’est jouer le même morceau dans une <b>autre tonalité</b> : mêmes doigtés, mêmes intervalles, mêmes degrés (I, IV, V7)… mais en partant d’une autre note. Le spiritual <i>He’s Got the Whole World in His Hands</i> est écrit ici en <b>Sol</b>, puis en <b>Do</b>, puis en <b>Fa</b>.</p>
      <table class="theory-table"><tr><th>Tonalité</th><th>Armure</th><th>I</th><th>V7</th><th>Première note</th></tr>
      <tr><td>Sol majeur</td><td>Fa♯</td><td>G</td><td>D7</td><td>Ré</td></tr>
      <tr><td>Do majeur</td><td>—</td><td>C</td><td>G7</td><td>Sol</td></tr>
      <tr><td>Fa majeur</td><td>Si♭</td><td>F</td><td>C7</td><td>Do</td></tr></table>
      <p>Le morceau est plein de <b>syncopes</b> (notes liées par‑dessus le temps) : garde la pulsation dans la main gauche. Compare les trois versions : la mélodie « sonne » pareil, seule la hauteur change.</p>
      ${miniScore({ key: 'G', right: 'R/2 D5/8 D5/8 D5/8 B4/8 | B4/2 B4/8 G4/8~ G4/4' })}
      ${tip('Avant chaque version, joue la gamme et les accords I et V7 de la tonalité : la main se « cale » toute seule.')}
    `, [
      play('En Sol majeur', { title: 'He’s Got the Whole World (Sol)', composer: 'Spiritual', key: 'G', tempo: 100, tempoText: 'Avec entrain', right: WORLD_R, left: WORLD_L }),
      play('En Do majeur', { title: 'He’s Got the Whole World (Do)', composer: 'Spiritual', key: 'C', tempo: 100, tempoText: 'Avec entrain', right: transposeText(WORLD_R, -4, -7), left: transposeText(WORLD_L, 3, 5) },
        { text: 'Mêmes doigtés qu’en Sol : la main droite commence sur Sol, la main gauche joue C et G7.' }),
      play('En Fa majeur', { title: 'He’s Got the Whole World (Fa)', composer: 'Spiritual', key: 'F', tempo: 100, tempoText: 'Avec entrain', right: transposeText(WORLD_R, -1, -2), left: transposeText(WORLD_L, -1, -2) },
        { text: 'La main droite commence sur Do, la main gauche joue F et C7 (avec le Si♭ de l’armure).' }),
      quiz('Transposer de tête', [
        q('En Sol, la mélodie commence sur Ré. En <b>Do</b>, elle commence sur… (joue la note, main droite).', ['G4']),
        q('…et en <b>Fa</b> ?', ['C5']),
        q('Joue l’accord V7 de <b>Sol</b> (D7, main gauche : Fa♯ Do Ré).', ['F#2', 'C3', 'D3'], { mode: 'chord' }),
        q('Joue l’accord V7 de <b>Do</b> (G7 : Si Fa Sol).', ['B2', 'F3', 'G3'], { mode: 'chord' }),
        q('Joue l’accord V7 de <b>Fa</b> (C7 : Mi Si♭ Do).', ['E2', 'Bb2', 'C3'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c14-l02', 'Le ragtime : The Entertainer', '140–141', `
      <p>Le <b>ragtime</b> (Scott Joplin, 1902) repose sur une main gauche <b>« basse – accord »</b> très régulière et une main droite pleine de <b>syncopes</b>. Joplin lui‑même écrivait : « ne jouez jamais le ragtime vite ».</p>
      <h3>L’accompagnement</h3>
      <p>Temps 1 et 3 : une <b>note de basse</b> seule (5<sup>e</sup> doigt). Temps 2 et 4 : un <b>accord de deux notes</b> (doigts 3‑1). Le poignet rebondit légèrement ; les accords sont courts.</p>
      ${miniScore({ left: "C3/4 [E3 G3]/4 C3/4 [E3 Bb3]/4 | C3/4 [E3 G3]/4 [E3 G3]/4' R/4 | D3/4 [F#3 A3]/4 D3/4 [F#3 A3]/4 | G3/4' G2/4' A2/4' B2/4'" })}
      <h3>Le motif</h3>
      <p>La main droite alterne <b>Mi (pouce) et Do (5<sup>e</sup> doigt)</b> en croche‑noire : la noire tombe <i>entre</i> les temps, c’est la syncope. Les deux croches <b>Ré‑Ré♯</b> servent de levée chromatique vers le Mi.</p>
      ${miniScore({ right: 'R/2 R/4 D4/8 D#4/8 | E4/8 C5/4 E4/8 C5/4 E4/8 C5/8~ | C5/2 R/8 C5/8 D5/8 D#5/8' })}
      ${warn('Version simplifiée : l’introduction descend sur deux octaves (au lieu de trois) et la main gauche reste en position de Do.')}
    `, [
      play('Échauffement main gauche', { title: 'Échauffement ragtime (MG)', tempo: 84,
        left: ENT_L2 + ' | ' + ENT_L4 + ' | D3/4:5 [F#3 A3]/4:3,1 D3/4 [F#3 A3]/4 | G3/4:1\' G2/4:5\' A2/4:4\' B2/4:3\' | ' + ENT_L2 + ' | ' + ENT_L4 + ' | D3/4 [F#3 A3]/4 D3/4 [F#3 A3]/4 | G3/4\' G2/4\' A2/4\' B2/4\' | ' + C + '/1' },
        { text: 'Basse seule sur 1 et 3, accord sur 2 et 4. Les quatre noires staccato (Sol Sol La Si) remontent vers le Do.' }),
      play('Le motif main droite', { title: 'Motif de The Entertainer (MD)', tempo: 84,
        right: 'R/2 R/4 D4/8:1 D#4/8:2 | ' + ENT_MOTIF + ' | C5/2 R/8 C5/8:3 D5/8:4 D#5/8:4 | E5/8:5 C5/8:3 D5/8:4 E5/4:5 B4/8:2 D5/4:4 | C5/2:3 R/4 D4/8:1 D#4/8:2 | ' + ENT_MOTIF + ' | C5/2 R/2' },
        { text: 'Compte « 1 et 2 et 3 et 4 et » : les Do tombent sur les « et ».' }),
      play('The Entertainer (version facile)', { title: 'The Entertainer', composer: 'S. Joplin', tempo: 88, tempoText: 'Pas trop vite',
        right: '@f D6/8:3 E6/8:4 C6/4:2 A5/4:1 B5/8:2 A5/8:1 | G5/4:1 D5/8:3 E5/8:4 C5/4:2 A4/4:1 | B4/8:2 A4/8:1 G4/2:1 R/4 | R/2 R/4 D4/8:1 D#4/8:2 | @mf ' + ENT_MOTIF + ' | C5/2 R/8 C5/8:3 D5/8:4 D#5/8:4 | E5/8:5 C5/8:3 D5/8:4 E5/4:5 B4/8:2 D5/4:4 | C5/2:3 R/4 D4/8:1 D#4/8:2 | ' + ENT_MOTIF + ' | C5/2 R/8 A4/8:3 G4/8:2 F#4/8:1 | A4/8:2 C5/8:3 E5/4:5 D5/8:4 C5/8:3 A4/8:2 D5/8:4~ | D5/2 R/4 D4/8:1 D#4/8:2 | ' + ENT_MOTIF + ' | C5/2 R/8 C5/8:3 D5/8:4 D#5/8:4 | E5/8:5 C5/8:3 D5/8:4 E5/4:5 B4/8:2 D5/4:4 | C5/2:3 R/8 C5/8:3 D5/8:4 E5/8:5 | C5/8:3 D5/8:4 E5/4:5 C5/8:3 D5/8:4 E5/4:5 | C5/8:3 D5/8:4 C5/8:3 E5/8:5 C5/8:3 D5/8:4 E5/4:5 | C5/8:3 D5/8:4 E5/4:5 B4/8:2 D5/4:4 C5/8:3~ | C5/2 R/2',
        left: 'R/1 | R/1 | R/1 | G2/8:5 G#2/8:4 A2/8:3 B2/8:2 C3/4:1 R/4 | ' + ENT_L1 + ' | ' + ENT_L2 + ' | ' + ENT_L3 + ' | ' + ENT_L4 + ' | ' + ENT_L1 + ' | ' + CEG + ' | D3/4:5 [F#3 A3]/4:3,1 D3/4 [F#3 A3]/4 | G3/4:1\' G2/4:5\' A2/4:4\' B2/4:3\' | ' + ENT_L1 + ' | ' + ENT_L2 + ' | ' + ENT_L3 + ' | ' + ENT_L4 + ' | ' + CEG + ' | ' + CEG + ' | G2/4:5 [D3 F3]/4:3,1 G2/4 [D3 F3]/4 | ' + ENT_L4 },
        { text: 'Introduction (4 mesures) puis le thème. Tempo tranquille et régulier : le charme du ragtime vient du contraste entre la gauche carrée et la droite décalée.' }),
    ]),

    lesson('c14-l03', 'Les triolets : Amazing Grace', '142–143', `
      ${rhythmTable([[N.eighth + N.eighth + N.eighth + ' ³', 'Triolet de croches', '3 croches dans 1 temps (au lieu de 2)'], [N.eighth + N.eighth, 'Deux croches', '2 croches dans 1 temps']])}
      <p>Un <b>triolet</b> de croches partage un temps en <b>trois parties égales</b>, marquées par un petit <b>3</b>. Pour le sentir : dis « tri‑o‑let » ou « 1‑et‑la » sur un temps régulier. Dans l’appli, les croches de triolet s’écrivent <code>8t</code>.</p>
      ${miniScore({ timeSig: [3, 4], right: 'C5/2 E5/8t D5/8t C5/8t | E5/2 D5/4 | C5/2 A4/4 | G4/2 G4/4' })}
      <h3>Amazing Grace</h3>
      <p>Hymne de 1779, en Do majeur à 3 temps, <b>p</b> et <i>legato</i>, avec la <b>pédale</b>. La main gauche joue « basse – accord – soupir » à chaque mesure ; le triolet ornemente la mélodie à la fin de « Amazing » et de « saved ».</p>
      ${tip('Ne précipite pas le triolet : ses trois notes occupent tout le 3<sup>e</sup> temps, ni plus ni moins.')}
    `, [
      play('Sentir le triolet', { title: 'Deux croches, puis trois', tempo: 76,
        right: 'C5/4:1 C5/8 C5/8 C5/8t C5/8t C5/8t C5/4 | E5/4:3 E5/8 E5/8 E5/8t E5/8t E5/8t E5/4 | G5/4:5 G5/8t G5/8t G5/8t E5/8:3 E5/8 C5/4:1 | C5/8t C5/8t C5/8t E5/8t E5/8t E5/8t G5/2:5' },
        { text: 'Compte « 1 », « 1‑et », « 1‑et‑la », « 1 ». Les trois croches du triolet sont parfaitement égales.' }),
      play('Amazing Grace', { title: 'Amazing Grace', composer: 'J. Newton / trad. américain', tempo: 72, timeSig: [3, 4], tempoText: 'Lent, avec pédale',
        right: '@p R/2 G4/4:1 | C5/2:3 E5/8t:5 D5/8t:4 C5/8t:3 | E5/2:5 D5/4:4 | C5/2:3 A4/4:2 | G4/2:1 G4/4 | C5/2:3 E5/8t:5 D5/8t:4 C5/8t:3 | E5/2:5 D5/4:4 | G5/2.:5 | G5/2:5 E5/8t:3 G5/8t:5 E5/8t:3 | G5/2:5 E5/8t:4 D5/8t:3 C5/8t:2 | E5/2:4 D5/4:3 | C5/2:2 A4/4:1 | G4/2:1 G4/4 | C5/2:3 E5/8t:5 D5/8t:4 C5/8t:3 | E5/2:5 D5/4:4 | C5/2.:3~ | C5/2.^',
        left: 'R/2. | C3/4:5 [E3 G3]/4:3,1 R/4 | C3/4 [E3 G3]/4 R/4 | F2/4:5 [F3 A3]/4:2,1 R/4 | C3/4 [E3 G3]/4 R/4 | C3/4 [E3 G3]/4 R/4 | C3/4 [E3 G3]/4 R/4 | G2/4:5 [B2 D3]/4:3,1 R/4 | G2/4 [D3 F3]/4:3,1 R/4 | C3/4 [E3 G3]/4 R/4 | C3/4 [E3 G3]/4 R/4 | F2/4 [F3 A3]/4 R/4 | C3/4 [E3 G3]/4 R/4 | C3/4 [E3 G3]/4 R/4 | G2/4 [D3 F3]/4 R/4 | C3/4 [E3 G3]/4 R/4 | ' + C + '/2.^' },
        { text: 'Pédale : enfonce après la basse de chaque mesure, relève sur le soupir. La mélodie reste liée malgré les silences de la main gauche.' }),
    ]),

    lesson('c14-l04', 'Répertoire : ballades et pédale', '144–147 (équivalents)', `
      <p>Les morceaux de la fin du livre sont des chansons encore protégées par le droit d’auteur : l’appli propose à la place des <b>pièces du domaine public</b> qui travaillent exactement les mêmes techniques. Première famille : les <b>ballades</b>, à jouer <i>legato</i>, avec pédale et accords brisés.</p>
      <h3>House of the Rising Sun</h3>
      <p>Chanson américaine traditionnelle, en La mineur à 3 temps. La main gauche joue des <b>accords brisés</b> (fondamentale – tierce – quinte) sur <b>Am, C, D, F et E7</b> : six accords différents, dont deux nouveaux (<b>D majeur</b> : Ré Fa♯ La, et <b>F majeur</b> en position fondamentale : Fa La Do). Change de pédale à chaque mesure.</p>
      ${miniScore({ key: 'Am', timeSig: [3, 4], left: 'A2/4 C3/4 E3/4 | C3/4 E3/4 G3/4 | D3/4 F#3/4 A3/4 | F2/4 A2/4 C3/4 | E2/4 G#2/4 D3/4' })}
      <h3>Douce nuit</h3>
      <p>Le chant de Noël de Gruber (1818), en Do majeur. Rythme caractéristique <b>noire pointée – croche – noire</b>, accords C, F et G7 brisés. Toute la pièce se joue <b>p</b>, très liée.</p>
      ${tip('Dans une ballade, la basse (première note de chaque accord brisé) est légèrement plus présente ; les deux autres notes sont plus douces.')}
    `, [
      play('House of the Rising Sun', { title: 'House of the Rising Sun', composer: 'Traditionnel américain', key: 'Am', tempo: 116, timeSig: [3, 4], tempoText: 'Balancé',
        right: '@mp R/2 A4/4:1 | C5/2:3 D5/4:4 | E5/2.:5 | E5/2:4 G5/4:5 | E5/2.:4 | R/4 C5/4:3 D5/4:4 | E5/2:5 E5/4 | D5/2:4 B4/4:2 | A4/2.:1 | R/2 A4/4:1 | C5/2:3 D5/4:4 | E5/2.:5 | E5/2:4 G5/4:5 | E5/2.:4 | R/4 C5/4:3 E5/4:5 | D5/2:4 C5/4:3 | B4/2.:2 | A4/2.:1~ | A4/2.^',
        left: 'R/2. | A2/4:5 C3/4:3 E3/4:1 | C3/4:5 E3/4:3 G3/4:1 | D3/4:5 F#3/4:3 A3/4:1 | F2/4:5 A2/4:3 C3/4:1 | A2/4 C3/4 E3/4 | C3/4 E3/4 G3/4 | E2/4:5 G#2/4:3 D3/4:1 | E2/4 G#2/4 D3/4 | A2/4 C3/4 E3/4 | A2/4 C3/4 E3/4 | C3/4 E3/4 G3/4 | D3/4 F#3/4 A3/4 | F2/4 A2/4 C3/4 | A2/4 C3/4 E3/4 | E2/4 G#2/4 D3/4 | E2/4 G#2/4 D3/4 | A2/4 C3/4 E3/4 | ' + Am + '/2.^' },
        { text: 'Chaque mesure = un accord brisé 5‑3‑1. Pédale changée à chaque mesure, mélodie bien chantée.' }),
      play('Douce nuit', { title: 'Douce nuit', composer: 'F. X. Gruber', tempo: 96, timeSig: [3, 4], tempoText: 'Paisible',
        right: '@p G4/4.:3 A4/8:4 G4/4:3 | E4/2.:1 | G4/4.:3 A4/8:4 G4/4:3 | E4/2.:1 | D5/2:5 D5/4 | B4/2.:3 | C5/2:4 C5/4 | G4/2.:1 | A4/2:2 A4/4 | C5/4.:4 B4/8:3 A4/4:2 | G4/4.:3 A4/8:4 G4/4:3 | E4/2.:1 | A4/2:2 A4/4 | C5/4.:4 B4/8:3 A4/4:2 | G4/4.:3 A4/8:4 G4/4:3 | E4/2.:1 | D5/2:5 D5/4 | F5/4.:5 D5/8:3 B4/4:2 | C5/2.:3 | E5/2.:5 | C5/4.:4 G4/8:2 E4/4:1 | G4/4.:3 F4/8:2 D4/4:1 | C4/2.:1~ | C4/2.^',
        left: 'C3/4:5 E3/4:3 G3/4:1 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | B2/4:5 F3/4:2 G3/4:1 | B2/4 F3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4:5 F3/4:2 A3/4:1 | C3/4 F3/4 A3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 F3/4 A3/4 | C3/4 F3/4 A3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | B2/4 F3/4 G3/4 | B2/4 F3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | C3/4 E3/4 G3/4 | B2/4 F3/4 G3/4 | C3/4 E3/4 G3/4 | ' + C + '/2.^' },
        { text: 'Rythme « lon‑gue‑courte‑longue » (noire pointée, croche, noire). Pédale à chaque mesure.' }),
    ]),

    lesson('c14-l05', 'Répertoire : swing et syncopes', '148–153 (équivalents)', `
      <p>Deuxième famille : les morceaux <b>rythmés</b>. Le <b>swing</b> consiste à jouer les croches inégales (longue‑courte, comme un triolet « noire‑croche ») ; l’appli les note droites, à toi de les « balancer » légèrement quand tu les maîtrises.</p>
      <h3>Swing Low, Sweet Chariot</h3>
      <p>Spiritual en Fa majeur. Première moitié : la mélodie <b>droite</b>, avec les accords F, B♭ et C7 plaqués. Seconde moitié : la <b>même mélodie syncopée</b> (notes anticipées d’une croche et liées), sur la basse brisée « fondamentale – accord ».</p>
      ${miniScore({ key: 'F', right: 'A4/2 F4/2 | F4/4. A4/8 G4/4 F4/4 | A4/8 A4/4. F4/8~ F4/4. | F4/8 A4/8~ A4/8 G4/8~ G4/4 F4/4' })}
      <h3>Oh ! Susanna</h3>
      <p>Stephen Foster (1848), Do majeur, position de Do <b>élargie</b> (jusqu’au La). Le rythme <b>noire pointée – croche</b> et la main gauche « basse – accord » donnent le caractère de danse. Le refrain passe sur l’accord de <b>F</b>.</p>
    `, [
      play('Swing Low, Sweet Chariot', { title: 'Swing Low, Sweet Chariot', composer: 'Spiritual', key: 'F', tempo: 84, tempoText: 'Tranquille, balancé',
        right: '@mf A4/2:3 F4/2:1 | F4/4.:1 A4/8:3 G4/4:2 F4/4:1 | D4/4:1 D4/4 F4/4:2 F4/4 | F4/4:2 D4/4:1 C4/2:1 | A4/2:3 F4/2:1 | F4/4.:1 A4/8:3 G4/4:2 F4/4:1 | D4/4:1 D4/4 F4/4:2 F4/4 | F4/4:2 G4/4:3 F4/2:2 | A4/8:3 A4/4.:3 F4/8:1~ F4/4. | F4/8:1 A4/8:3~ A4/8 G4/8:2~ G4/4 F4/4:1 | D4/8:1 D4/8~ D4/4 F4/8:2 F4/8~ F4/4 | F4/4:2 D4/4:1 C4/2:1 | A4/8:3 A4/4.:3 F4/8:1~ F4/4. | F4/8:1 A4/8:3~ A4/8 G4/8:2~ G4/4 F4/4:1 | D4/8:1 D4/8~ D4/4 F4/8:2 F4/8~ F4/4 | F4/4:2 G4/4:3 F4/2:2^',
        left: Fm + '/1:5,3,1 | ' + Fm + '/2 ' + C7 + '/2:5,2,1 | ' + Bbm + '/1:5,2,1 | ' + Fm + '/2 ' + C7 + '/2 | ' + Fm + '/1 | ' + Fm + '/2 ' + C7 + '/2 | ' + Bbm + '/1 | ' + C7 + '/2 ' + Fm + '/2 | F2/4:5 [A2 C3]/4:3,1 F2/4 [A2 C3]/4 | F2/4 [A2 C3]/4 E2/4:5 [Bb2 C3]/4:2,1 | F2/4 [Bb2 D3]/4:2,1 F2/4 [Bb2 D3]/4 | F2/4 [A2 C3]/4 E2/4 [Bb2 C3]/4 | F2/4 [A2 C3]/4 F2/4 [A2 C3]/4 | F2/4 [A2 C3]/4 E2/4 [Bb2 C3]/4 | F2/4 [Bb2 D3]/4 F2/4 [Bb2 D3]/4 | E2/4 [Bb2 C3]/4 ' + Fm + '/2^' },
        { text: 'Mesures 1‑8 : version droite. Mesures 9‑16 : la même mélodie, syncopée. Compte « 1 et 2 et… » et laisse la main gauche tenir la pulsation.' }),
      play('Oh ! Susanna', { title: 'Oh ! Susanna', composer: 'S. Foster', tempo: 112, tempoText: 'Gai',
        right: '@mf R/2 R/4 C4/8:1 D4/8:2 | E4/4:3 G4/4:4 G4/4.:4 A4/8:5 | G4/4:4 E4/4:3 C4/4.:1 D4/8:2 | E4/4:3 E4/4 D4/4:2 C4/4:1 | D4/2.:2 C4/8:1 D4/8:2 | E4/4:3 G4/4:4 G4/4.:4 A4/8:5 | G4/4:4 E4/4:3 C4/4.:1 D4/8:2 | E4/4:3 E4/4 D4/4:2 D4/4 | C4/2.:1 R/4 | F4/2:4 A4/4:5 A4/4 | G4/4:4 G4/4 E4/4:3 C4/4:1 | D4/2.:2 C4/8:1 D4/8:2 | E4/4:3 G4/4:4 G4/4.:4 A4/8:5 | G4/4:4 E4/4:3 C4/4.:1 D4/8:2 | E4/4:3 E4/4 D4/4:2 D4/4 | C4/2.:1^ R/4',
        left: 'R/1 | ' + CEG.replace('C3/4 [E3 G3]/4', 'C3/4:5 [E3 G3]/4:3,1') + ' | ' + CEG + ' | C3/4 [E3 G3]/4 B2/4:5 [F3 G3]/4:2,1 | B2/4 [F3 G3]/4 ' + G7 + '/4 R/4 | ' + CEG + ' | ' + CEG + ' | C3/4 [E3 G3]/4 B2/4 [F3 G3]/4 | C3/4 [E3 G3]/4 ' + C + '/4 R/4 | C3/4:5 [F3 A3]/4:2,1 C3/4 [F3 A3]/4 | ' + CEG + ' | B2/4 [F3 G3]/4 ' + G7 + '/4 R/4 | ' + CEG + ' | ' + CEG + ' | C3/4 [E3 G3]/4 B2/4 [F3 G3]/4 | ' + C + '/2.^ R/4' },
        { text: 'Levée Do‑Ré, puis une mélodie en position de Do élargie (le 5 va chercher le La). Main gauche légère : basse puis accord.' }),
    ]),

    lesson('c14-l06', 'Répertoire : couleurs mineures et style classique', '154–159 (équivalents)', `
      <p>Troisième famille : un air russe vif en La mineur et un menuet baroque en Sol majeur. Deux styles très différents, mais les mêmes outils : gammes, accords primaires, passage du pouce, articulation.</p>
      <h3>Korobeiniki (Les colporteurs)</h3>
      <p>Chanson russe du XIX<sup>e</sup> siècle (rendue célèbre par un jeu vidéo). En La mineur harmonique : accords <b>Am, Dm, E7</b> et un passage sur <b>G majeur</b>. La main droite enchaîne croches et noires avec des <b>syncopes</b> ; la seconde partie est faite de blanches qui descendent.</p>
      ${miniScore({ key: 'Am', right: 'A4/4 E4/8 F4/8 G4/4 F4/8 E4/8 | D4/4 D4/8 F4/8 A4/4 G4/8 F4/8 | E4/4. F4/8 G4/4 A4/4 | F4/4 D4/4 D4/2' })}
      <h3>Menuet en Sol (Petzold)</h3>
      <p>Le célèbre menuet du <i>Petit livre d’Anna Magdalena Bach</i> (longtemps attribué à J.‑S. Bach). Sol majeur, 3 temps, <b>gammes</b> montantes et descendantes dans la main droite : applique le <b>passage du pouce</b> appris au chapitre 9. Articulation claire, tempo modéré, pas de pédale.</p>
      ${tip('Dans le menuet, pense « 1 – 2 – 3 » avec un léger appui sur le premier temps : c’est une danse.')}
    `, [
      play('Korobeiniki', { title: 'Korobeiniki', composer: 'Traditionnel russe', key: 'Am', tempo: 120, tempoText: 'Vif',
        right: '@mf A4/4:4 E4/8:1 F4/8:2 G4/4:3 F4/8:2 E4/8:1 | D4/4:1 D4/8 F4/8:2 A4/4:4 G4/8:3 F4/8:2 | E4/4.:1 F4/8:2 G4/4:3 A4/4:4 | F4/4:2 D4/4:1 D4/2 | R/8 G4/4:3 B4/8:4 D5/4:5 C5/8:4 B4/8:3 | A4/4.:4 F4/8:2 A4/4:4 G4/8:3 F4/8:2 | E4/4:1 E4/8 F4/8:2 G4/4:3 A4/4:4 | F4/4:2 D4/4:1 D4/2 | @mp E4/2:3 C4/2:1 | D4/2:2 B3/2:1 | C4/2:2 A3/2:1 | G#3/1:1 | E4/2:3 C4/2:1 | D4/2:2 B3/2:1 | C4/4:2 E4/4:3 A4/2:5 | G#4/1:4 | @mf A4/4:4 E4/8:1 F4/8:2 G4/4:3 F4/8:2 E4/8:1 | D4/4:1 D4/8 F4/8:2 A4/4:4 G4/8:3 F4/8:2 | E4/4.:1 F4/8:2 G4/4:3 A4/4:4 | F4/4:2 D4/4:1 D4/2 | R/8 G4/4:3 B4/8:4 D5/4:5 C5/8:4 B4/8:3 | A4/4.:4 F4/8:2 A4/4:4 G4/8:3 F4/8:2 | E4/4:1 E4/8 F4/8:2 G4/4:3 A4/4:4 | F4/4:2 D4/4:1 D4/2^',
        left: AmP + ' | ' + DmP + ' | ' + E7Q + ' | ' + AmP + ' | ' + GP + ' | ' + AmP + ' | ' + E7Q + ' | ' + AmP + ' | ' + Am + '/2:5,3,1 ' + Am + '/2 | ' + E7 + '/2:5,2,1 ' + E7 + '/2 | ' + Am + '/2 ' + Am + '/2 | ' + E7 + '/2 ' + E7 + '/2 | ' + Am + '/2 ' + Am + '/2 | ' + E7 + '/2 ' + E7 + '/2 | ' + Am + '/2 ' + Am + '/2 | ' + E7 + '/2 ' + E7 + '/2 | ' + AmP + ' | ' + DmP + ' | ' + E7Q + ' | ' + AmP + ' | ' + GP + ' | ' + AmP + ' | ' + E7Q + ' | ' + Am + '/1^' },
        { text: 'Partie A (croches) – partie B (blanches, plus douce) – partie A. Garde un tempo stable : la vitesse viendra après la précision.' }),
      play('Menuet en Sol', { title: 'Menuet en Sol', composer: 'C. Petzold', key: 'G', tempo: 108, timeSig: [3, 4], tempoText: 'Modéré, dansant',
        right: '@mf D5/4:5 G4/8:1 A4/8:2 B4/8:3 C5/8:4 | D5/4:5 G4/4:1 G4/4 | E5/4:5 C5/8:1 D5/8:2 E5/8:3 F#5/8:4 | G5/4:5 G4/4:1 G4/4 | C5/4:4 D5/8:5 C5/8:4 B4/8:3 A4/8:2 | B4/4:3 C5/8:4 B4/8:3 A4/8:2 G4/8:1 | F#4/4:2 G4/8:3 A4/8:4 B4/8:5 G4/8:3 | A4/2.:4 | D5/4:5 G4/8:1 A4/8:2 B4/8:3 C5/8:4 | D5/4:5 G4/4:1 G4/4 | E5/4:5 C5/8:1 D5/8:2 E5/8:3 F#5/8:4 | G5/4:5 G4/4:1 G4/4 | C5/4:4 D5/8:5 C5/8:4 B4/8:3 A4/8:2 | B4/4:3 C5/8:4 B4/8:3 A4/8:2 G4/8:1 | A4/4:3 B4/8:4 A4/8:3 G4/8:2 F#4/8:1 | G4/2.:2^',
        left: 'G2/4:5 B2/4:3 D3/4:1 | ' + G + '/2. | C3/4:5 E3/4:3 G3/4:1 | ' + G + '/2. | C3/4 E3/4 G3/4 | G2/4 B2/4 D3/4 | D3/4:5 F#3/4:3 A3/4:1 | [D3 F#3 A3]/2. | G2/4:5 B2/4:3 D3/4:1 | ' + G + '/2. | C3/4 E3/4 G3/4 | ' + G + '/2. | C3/4 E3/4 G3/4 | G2/4 B2/4 D3/4 | D3/4 F#3/4 A3/4 | ' + G + '/2.^' },
        { text: 'Les gammes de la main droite utilisent le passage du pouce (Sol La Si Do puis Ré avec le 5). Articulation nette, sans pédale.' }),
    ]),

    lesson('c14-l07', 'Bilan : tout le livre en un quiz', 'Fin du niveau 1', `
      <p>Bravo ! Tu as parcouru l’ensemble du <b>niveau 1</b>. Voici ce que tu sais maintenant :</p>
      ${cols(`<ul>
        <li>Lire la <b>grande portée</b> (clés de Sol et de Fa), les altérations, les armures de Do, Sol, Fa, La mineur, Ré mineur.</li>
        <li>Les rythmes : ronde, blanche, noire, croche, pointés, <b>triolets</b>, <b>syncopes</b>, mesures à 2, 3 et 4 temps, levées.</li>
        <li>Les <b>intervalles</b> de la seconde à l’octave, mélodiques et harmoniques.</li>
      </ul>`, `<ul>
        <li>Les <b>gammes majeures</b> (Do, Sol, Fa) et <b>mineures</b> (La, Ré) avec passage du pouce.</li>
        <li>Les <b>triades</b> majeures et mineures, les accords <b>I – IV – V7</b> dans cinq tonalités, plaqués, brisés et arpégés.</li>
        <li>Les nuances (pp à ff), le staccato, l’accent, le legato, la <b>pédale chevauchée</b>, D.C. al Fine, la transposition.</li>
      </ul>`)}
      <p>Ce dernier quiz mélange tout : tonalités, accords et gammes. Tu peux le refaire autant de fois que tu veux ; les morceaux du menu <b>Morceaux</b> t’attendent ensuite pour continuer à jouer.</p>
      ${keyboardSvg({ low: 'C3', high: 'C5', labels: { C3: 'Do', G3: 'Sol', C4: 'Do', F4: 'Fa', A4: 'La', D4: 'Ré', C5: 'Do' }, highlight: ['C3', 'G3', 'F4', 'A4', 'D4', 'C4', 'C5'] })}
    `, [
      quiz('Tonalités et accords primaires', [
        q('Joue la <b>tonique</b> de la tonalité qui a un Fa♯ à l’armure (main droite).', ['G4']),
        q('Joue la <b>tonique</b> de la tonalité majeure qui a un Si♭ à l’armure.', ['F4']),
        q('Joue la tonique du <b>relatif mineur</b> de Do majeur.', ['A4']),
        q('Joue la tonique du <b>relatif mineur</b> de Fa majeur.', ['D4']),
        q('Main gauche : <b>I</b> de Sol majeur (G : Sol Si Ré).', ['G2', 'B2', 'D3'], { mode: 'chord' }),
        q('Main gauche : <b>IV</b> de Fa majeur en position confortable (B♭ : Fa Si♭ Ré).', ['F2', 'Bb2', 'D3'], { mode: 'chord' }),
        q('Main gauche : <b>V7</b> de La mineur (E7 : Sol♯ Ré Mi).', ['G#2', 'D3', 'E3'], { mode: 'chord' }),
        q('Main gauche : <b>iv</b> de Ré mineur en position confortable (Gm : Ré Sol Si♭).', ['D3', 'G3', 'Bb3'], { mode: 'chord' }),
        q('Main gauche : <b>V7</b> de Do majeur (G7 : Si Fa Sol).', ['B2', 'F3', 'G3'], { mode: 'chord' }),
      ]),
      quiz('Gammes et intervalles', [
        q('Joue la gamme de <b>Sol majeur</b> en montant (Sol4 → Sol5), main droite.', ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F#5', 'G5']),
        q('Joue la gamme de <b>Fa majeur</b> en descendant (Fa5 → Fa4).', ['F5', 'E5', 'D5', 'C5', 'Bb4', 'A4', 'G4', 'F4']),
        q('Joue la gamme de <b>Ré mineur harmonique</b> en montant (Ré4 → Ré5).', ['D4', 'E4', 'F4', 'G4', 'A4', 'Bb4', 'C#5', 'D5']),
        q('Joue une <b>tierce majeure</b> au‑dessus de Fa4 (les deux notes à la suite).', ['F4', 'A4']),
        q('Joue une <b>tierce mineure</b> au‑dessus de Ré4.', ['D4', 'F4']),
        q('Joue une <b>quinte juste</b> au‑dessus de Sol3 (main gauche).', ['G3', 'D4']),
        q('Joue une <b>octave</b> Do3 – Do4, main gauche, les deux notes ensemble.', ['C3', 'C4'], { mode: 'chord' }),
        q('Pour finir : joue la triade de <b>Do majeur</b> à deux mains (Do Mi Sol dans les deux mains, ensemble).', ['C3', 'E3', 'G3', 'C4', 'E4', 'G4'], { mode: 'chord' }),
      ]),
    ]),
  ],
};
