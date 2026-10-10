import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, namedKeyboard, tip, warn, cols } from '../diagrams.js';

export default {
  id: 'c01',
  title: 'Introduction : s’installer au piano',
  pages: '4–11',
  intro: 'Avant la première note : la posture, les mains, les numéros de doigts et la géographie du clavier.',
  lessons: [
    lesson('c01-l01', 'Posture, mains et numéros de doigts', '4–7, 10–11', `
      <h3>Prendre soin de ses mains</h3>
      <ul>
        <li>Avant de jouer, <b>échauffe les mains</b> : poings serrés (1‑2), doigts ouverts d’un coup (3‑4), puis secoue les mains pendantes (1‑2‑3‑4). Répète 3 fois.</li>
        <li>De l’eau tiède sur les mains avant de jouer active la circulation ; sèche‑les bien.</li>
        <li>Garde les ongles courts : tu joues avec le bout du doigt, pas avec l’ongle.</li>
      </ul>
      <h3>S’asseoir au piano</h3>
      <ul>
        <li>Assieds‑toi face au <b>milieu du clavier</b>, au bord du siège, dos droit, légèrement penché vers l’avant.</li>
        <li>Les coudes un peu plus hauts que les touches, les avant‑bras à l’horizontale, les poignets souples.</li>
        <li>Les doigts sont <b>arrondis</b>, comme si tu tenais une balle : c’est plus précis, plus rapide et ça évite les blessures.</li>
      </ul>
      <h3>Les numéros de doigts</h3>
      <p>Le <b>pouce est le 1</b>, l’auriculaire le 5, pour les deux mains. Les chiffres au‑dessus ou en dessous des notes sur une partition sont les <b>doigtés</b>.</p>
      ${cols(keyboardSvg({ low: 'C3', high: 'B3', fingers: { C3: '5', D3: '4', E3: '3', F3: '2', G3: '1' }, highlight: ['C3', 'D3', 'E3', 'F3', 'G3'], labels: { C3: 'MG' } }), keyboardSvg({ low: 'C4', high: 'B4', fingers: { C4: '1', D4: '2', E4: '3', F4: '4', G4: '5' }, highlight: ['C4', 'D4', 'E4', 'F4', 'G4'], labels: { C4: 'MD' } }))}
      <h3>Le son du piano</h3>
      <p>Plus tu enfonces la touche <b>vite</b> (avec du poids), plus le son est fort. Le piano se joue du bout des doigts, en laissant tomber le poids du bras : on ne « tape » pas.</p>
      ${tip('Exercice isométrique (p. 10) : paume contre paume, pousse fort 5 secondes, relâche. Il renforce la main sans instrument.')}
    `, [
      quiz('Fort et doux', [
        q('Joue n’importe quelle touche <b>fort</b> (<i>forte</i>, f) : laisse tomber le poids du bras.', ['*'], { velocity: 'loud' }),
        q('Joue n’importe quelle touche <b>doucement</b> (<i>piano</i>, p) : enfonce la touche lentement.', ['*'], { velocity: 'soft' }),
        q('Encore une fois <b>fort</b>, avec un doigt arrondi.', ['*'], { velocity: 'loud' }),
        q('Et <b>doucement</b>.', ['*'], { velocity: 'soft' }),
      ], { text: 'L’appli mesure la force avec laquelle tu enfonces la touche (vélocité MIDI).' }),
    ]),

    lesson('c01-l02', 'Le clavier : groupes de touches noires', '8', `
      <p>Les touches noires sont groupées par <b>deux</b> et par <b>trois</b>, en alternance, sur tout le clavier. Ces groupes servent de repères pour nommer les touches blanches.</p>
      ${keyboardSvg({ low: 'C3', high: 'B4', highlight: ['C#3', 'D#3', 'C#4', 'D#4'], labels: { 'C#3': '2', 'D#3': '2', 'C#4': '2', 'D#4': '2', 'F#3': '3', 'G#3': '3', 'A#3': '3', 'F#4': '3', 'G#4': '3', 'A#4': '3' } })}
      <ul>
        <li>Les sons <b>graves</b> sont à gauche, les sons <b>aigus</b> à droite.</li>
        <li>Main droite : doigts <b>2‑3</b> sur chaque groupe de deux touches noires, en montant. Main gauche : doigts <b>3‑2</b> en descendant.</li>
        <li>Groupes de trois : main droite <b>2‑3‑4</b>, main gauche <b>4‑3‑2</b>.</li>
      </ul>
    `, [
      quiz('Groupes de deux touches noires', [
        q('Main droite, doigts 2‑3 : joue un groupe de <b>deux</b> touches noires, de gauche à droite.', ['C#', 'D#']),
        q('Même chose un peu plus haut (plus à droite).', ['C#', 'D#']),
        q('Main gauche, doigts 3‑2 : joue un groupe de deux touches noires de <b>droite à gauche</b>.', ['D#', 'C#']),
        q('Encore une fois, plus bas (plus à gauche).', ['D#', 'C#']),
      ]),
      quiz('Groupes de trois touches noires', [
        q('Main droite, doigts 2‑3‑4 : joue un groupe de <b>trois</b> touches noires en montant.', ['F#', 'G#', 'A#']),
        q('Même chose plus haut.', ['F#', 'G#', 'A#']),
        q('Main gauche, doigts 4‑3‑2 : un groupe de trois touches noires en <b>descendant</b>.', ['A#', 'G#', 'F#']),
        q('Encore, plus bas.', ['A#', 'G#', 'F#']),
      ]),
    ]),

    lesson('c01-l03', 'Le nom des touches', '9', `
      <p>Les touches blanches portent sept noms qui se répètent : <b>Do Ré Mi Fa Sol La Si</b>. En notation anglo‑saxonne (celle du livre) : <b>C D E F G A B</b>.</p>
      ${namedKeyboard('C3', 'C5')}
      <ul>
        <li><b>Do</b> (C) est la touche blanche juste à <b>gauche</b> d’un groupe de deux touches noires.</li>
        <li><b>Fa</b> (F) est juste à gauche d’un groupe de trois touches noires.</li>
        <li><b>La</b> (A) est entre les deux touches noires du haut d’un groupe de trois.</li>
        <li>Le <b>Do du milieu</b> (Do4) est le Do le plus proche du centre du clavier (souvent sous la marque du fabricant).</li>
      </ul>
      <table class="theory-table"><tr><th>Français</th><td>Do</td><td>Ré</td><td>Mi</td><td>Fa</td><td>Sol</td><td>La</td><td>Si</td></tr><tr><th>Anglais</th><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>A</td><td>B</td></tr></table>
      ${tip('Dans toute l’appli, les noms sont en français et le numéro indique l’octave : Do4 = Do du milieu, Do3 = une octave plus bas, Do5 = une octave plus haut.')}
    `, [
      quiz('Trouve la touche', [
        q('Joue un <b>La</b> (entre les deux touches noires du haut d’un groupe de trois).', ['A']),
        q('Joue un autre <b>La</b>, ailleurs sur le clavier.', ['A']),
        q('Joue un <b>Si</b> (juste à droite du La).', ['B']),
        q('Joue un <b>Do</b> (à gauche d’un groupe de deux touches noires).', ['C']),
        q('Joue un <b>Ré</b> (entre les deux touches noires d’un groupe de deux).', ['D']),
        q('Joue un <b>Mi</b>.', ['E']),
        q('Joue un <b>Fa</b> (à gauche d’un groupe de trois touches noires).', ['F']),
        q('Joue un <b>Sol</b>.', ['G']),
      ]),
      quiz('Le Do du milieu', [
        q('Joue le <b>Do du milieu</b> (Do4).', ['C4']),
        q('Joue le Do juste <b>au‑dessus</b> (Do5).', ['C5']),
        q('Joue le Do juste <b>en dessous</b> du Do du milieu (Do3).', ['C3']),
        q('Main gauche, doigt 3 : joue tous les Sol en dessous du Do du milieu, du plus grave au plus aigu (au moins deux).', ['G', 'G']),
        q('Main droite, doigt 3 : joue deux Sol au‑dessus du Do du milieu, en montant.', ['G4', 'G5']),
      ]),
    ]),
  ],
};
