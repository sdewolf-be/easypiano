import { play, quiz, q, lesson } from './util.js';
import { keyboardSvg, miniScore, tip, cols } from '../diagrams.js';

export default {
  id: 'c04',
  title: 'Les intervalles : de la seconde à la quinte',
  pages: '24–31',
  intro: 'Mesurer la distance entre deux notes, mélodiquement (l’une après l’autre) puis harmoniquement (ensemble). Les nuances p, mf, f.',
  lessons: [
    lesson('c04-l01', 'Secondes et tierces mélodiques, nuances', '24–25', `
      <p>La distance entre deux notes est un <b>intervalle</b>. On le compte en degrés, note de départ comprise : Do→Ré = <b>seconde</b> (2 notes), Do→Mi = <b>tierce</b> (3 notes).</p>
      <ul>
        <li>Un intervalle <b>mélodique</b> : les deux notes sont jouées <b>l’une après l’autre</b>.</li>
        <li>Une <b>seconde</b> va d’une ligne à l’espace voisin (ou l’inverse). Une <b>tierce</b> va de ligne à ligne ou d’espace à espace.</li>
      </ul>
      ${miniScore({ right: 'C4/4 D4 C4 E4 | C4 D4 C4 E4', left: 'R/1 | R/1' }, { showNames: true })}
      <h3>Les nuances</h3>
      <table class="theory-table"><tr><th>p</th><td><i>piano</i> : doux</td></tr><tr><th>mf</th><td><i>mezzo forte</i> : moyennement fort</td></tr><tr><th>f</th><td><i>forte</i> : fort</td></tr></table>
      ${tip('Pour jouer plus fort, laisse tomber plus de poids du bras dans la touche ; pour jouer doux, enfonce la touche plus lentement.')}
    `, [
      play('Secondes et tierces mélodiques', { title: 'Intervalles mélodiques', tempo: 80,
        right: 'C4/4:1 D4:2 C4:1 E4:3 | C4 D4 C4 E4 | R/1 | R/1',
        left: 'R/1 | R/1 | G3/4:1 F3:2 G3:1 E3:3 | G3 F3 G3 E3' }),
      play('Au clair de la lune', { title: 'Au clair de la lune', composer: 'Traditionnel', tempo: 84,
        right: '@p C4/4:1 C4 C4 D4:2 | E4/2:3 D4/2:2 | C4/4:1 E4:3 D4:2 D4 | C4/1:1 | C4/4 C4 C4 D4 | E4/2 D4/2 | C4/4 E4 D4 D4 | C4/1' },
        { text: 'Nuance p : doucement. Repère les secondes (Do‑Ré) et les tierces (Do‑Mi).' }),
      play('Petit panier (A‑Tisket, A‑Tasket)', { title: 'Petit panier', composer: 'Traditionnel', tempo: 92,
        left: '@mf G3/2:1 E3/4:3 F3/4:2 | G3/2 E3/4 F3/4 | G3/4 G3 E3 F3 | G3/2 E3/2 | F3/4:2 F3 F3 E3:3 | F3 F3 F3 E3 | G3:1 F3:2 E3:3 D3:4 | C3/1:5' }),
      quiz('Mesurer les secondes et les tierces', [
        q('Joue une <b>seconde</b> au‑dessus de Do4 : Do4 puis la note suivante.', ['C4', 'D4']),
        q('Joue une <b>tierce</b> au‑dessus de Do4.', ['C4', 'E4']),
        q('Joue une <b>tierce</b> au‑dessus de Ré4.', ['D4', 'F4']),
        q('Joue une <b>seconde</b> <i>en dessous</i> de Sol4.', ['G4', 'F4']),
        q('Joue une <b>tierce</b> en dessous de Sol4.', ['G4', 'E4']),
        q('Main gauche : une <b>tierce</b> au‑dessus de Do3.', ['C3', 'E3']),
        q('Main gauche : une <b>seconde</b> en dessous de Sol3.', ['G3', 'F3']),
      ], { text: 'Équivalent des exercices écrits de la page 25 : tu « écris » l’intervalle en le jouant.' }),
    ]),

    lesson('c04-l02', 'Secondes et tierces harmoniques', '26–27', `
      <p>Un intervalle <b>harmonique</b> : les deux notes sont jouées <b>ensemble</b>. Les deux têtes de notes sont alors superposées (seconde : l’une à côté de l’autre ; tierce : l’une au‑dessus de l’autre).</p>
      ${miniScore({ right: '[C4 D4]/2 [C4 E4]/2 | [C4 D4]/2 [C4 E4]/2', left: 'R/1 | [E3 F3]/2 [E3 G3]/2' })}
      ${tip('Les deux doigts doivent enfoncer les touches exactement au même moment : écoute si tu entends un seul son.')}
    `, [
      play('Secondes et tierces harmoniques', { title: 'Intervalles harmoniques', tempo: 76,
        right: '[C4 D4]/2:1,2 [C4 E4]/2:1,3 | [C4 D4]/2 [C4 E4]/2 | R/1 | R/1',
        left: 'R/1 | R/1 | [E3 F3]/2:3,2 [E3 G3]/2:3,1 | [E3 F3]/2 [E3 G3]/2' }),
      play('Intervalles rock', { title: 'Intervalles rock', tempo: 100, tempoText: 'Rock',
        right: '@f F4/2:4 D4/4:2 D4/4 | C4/4:1 R/4 C4/4 R/4 | R/1 | R/1 | E4/2:3 D4/4:2 D4/4 | C4/4:1 R/4 C4/4 R/4 | R/1 | R/1',
        left: 'R/1 | R/1 | [F3 G3]/2:2,1 [E3 G3]/4:3,1 [E3 G3]/4 | [F3 G3]/4 R/4 [F3 G3]/4 R/4 | R/1 | R/1 | [E3 G3]/2 [F3 G3]/4 [F3 G3]/4 | [E3 G3]/4 R/4 [E3 G3]/4 R/4' },
        { text: 'Dans l’esprit de « Rockin’ Intervals » : la main gauche répond en secondes et tierces harmoniques.' }),
      play('Rock de l’harmonica', { title: 'Rock de l’harmonica', tempo: 100, tempoText: 'Rock',
        right: '@f [C4 D4]/2:1,2 [C4 E4]/2:1,3 | [C4 D4]/4 [C4 D4]/4 [C4 E4]/2 | R/1 | R/1 | [F4 G4]/2:4,5 [E4 G4]/2:3,5 | [F4 G4]/4 [F4 G4]/4 [E4 G4]/2 | R/1 | R/1',
        left: 'R/1 | R/1 | [D3 E3]/2:4,3 [C3 E3]/2:5,3 | [D3 E3]/4 [D3 E3]/4 [C3 E3]/2 | R/1 | R/1 | [F3 G3]/2:2,1 [E3 G3]/2:3,1 | [F3 G3]/4 [F3 G3]/4 [E3 G3]/2' }),
      quiz('Jouer des intervalles harmoniques', [
        q('Joue une <b>tierce harmonique</b> sur Do4 (Do4 et Mi4 ensemble).', ['C4', 'E4'], { mode: 'chord' }),
        q('Une <b>seconde harmonique</b> sur Fa4.', ['F4', 'G4'], { mode: 'chord' }),
        q('Une <b>tierce harmonique</b> sur Ré4.', ['D4', 'F4'], { mode: 'chord' }),
        q('Main gauche : une <b>tierce harmonique</b> sur Mi3.', ['E3', 'G3'], { mode: 'chord' }),
        q('Main gauche : une <b>seconde harmonique</b> sur Ré3.', ['D3', 'E3'], { mode: 'chord' }),
      ]),
    ]),

    lesson('c04-l03', 'Quartes et quintes mélodiques', '28–29', `
      <p>Do→Fa = <b>quarte</b> (4 notes) ; Do→Sol = <b>quinte</b> (5 notes). En position de Do, la quinte va du pouce à l’auriculaire.</p>
      ${keyboardSvg({ low: 'C4', high: 'B4', highlight: ['C4', 'F4', 'G4'], labels: { C4: 'Do', F4: '4te', G4: '5te' }, fingers: { C4: '1', F4: '4', G4: '5' } })}
      <ul>
        <li>Une <b>quarte</b> va d’une ligne à un espace (ou l’inverse), en sautant une ligne et un espace.</li>
        <li>Une <b>quinte</b> va de ligne à ligne ou d’espace à espace, en sautant une ligne.</li>
      </ul>
      ${miniScore({ right: 'C4/4 F4 C4 G4 | C4 F4 C4 G4' }, { showNames: true })}
    `, [
      play('Quartes et quintes mélodiques', { title: 'Quartes et quintes', tempo: 80,
        right: 'C4/4:1 F4:4 C4:1 G4:5 | C4 F4 C4 G4 | R/1 | R/1',
        left: 'R/1 | R/1 | G3/4:1 D3:4 G3:1 C3:5 | G3 D3 G3 C3' }),
      play('Le bon roi Wenceslas', { title: 'Le bon roi Wenceslas', composer: 'Traditionnel', tempo: 92,
        right: '@f F4/4:4 F4 F4 G4:5 | F4 F4 C4/2:1 | D4/4:2 C4:1 D4:2 E4:3 | F4/2:4 F4/2 | R/1 | R/1 | R/1 | R/1',
        left: 'R/1 | R/1 | R/1 | R/1 | F3/4:2 F3 F3 G3:1 | F3 F3 C3/2:5 | D3/4:4 C3:5 D3:4 E3:3 | F3/2:2 F3/2' }),
      play('Ma quinte', { title: 'Ma quinte', tempo: 84,
        right: '@p C4/2:1 C4/4 C4/4 | G4/2:5 F4/2:4 | E4/2:3 F4/4:4 F4/4 | D4/1:2 | R/1 | R/1 | R/1 | R/1',
        left: 'R/1 | R/1 | R/1 | R/1 | C3/2:5 C3/4 C3/4 | G3/2:1 F3/2:2 | @f R/4 E3/4:3 E3 E3 | C3/1:5' },
        { text: 'Pièce dans l’esprit de « My Fifth » : chaque main saute de Do à Sol (quinte).' }),
      quiz('Mesurer quartes et quintes', [
        q('Joue une <b>quarte</b> au‑dessus de Do4.', ['C4', 'F4']),
        q('Joue une <b>quinte</b> au‑dessus de Do4.', ['C4', 'G4']),
        q('Joue une <b>quarte</b> au‑dessus de Ré4.', ['D4', 'G4']),
        q('Joue une <b>quinte</b> en dessous de Sol4.', ['G4', 'C4']),
        q('Main gauche : une <b>quinte</b> au‑dessus de Do3.', ['C3', 'G3']),
        q('Main gauche : une <b>quarte</b> en dessous de Sol3.', ['G3', 'D3']),
      ]),
    ]),

    lesson('c04-l04', 'Quartes et quintes harmoniques', '30–31', `
      <p>Jouées ensemble, la quarte et la quinte donnent un son « creux » et stable, typique des accompagnements simples.</p>
      ${miniScore({ right: '[C4 F4]/2 [C4 G4]/2 | [C4 F4]/2 [C4 G4]/2', left: 'R/1 | [D3 G3]/2 [C3 G3]/2' })}
      ${tip('Dans « Vive le vent », la main gauche tient des quintes en rondes : c’est un vrai accompagnement.')}
    `, [
      play('Quartes et quintes harmoniques', { title: 'Quartes et quintes harmoniques', tempo: 76,
        right: '[C4 F4]/2:1,4 [C4 G4]/2:1,5 | [C4 F4]/2 [C4 G4]/2 | R/1 | R/1',
        left: 'R/1 | R/1 | [D3 G3]/2:4,1 [C3 G3]/2:5,1 | [D3 G3]/2 [C3 G3]/2' }),
      play('Vive le vent (Jingle Bells)', { title: 'Vive le vent', composer: 'J. Pierpont', tempo: 104, tempoText: 'Gai',
        right: '@f E4/4:3 E4 E4/2 | E4/4 E4 E4/2 | E4/4 G4:5 C4:1 D4:2 | E4/1:3 | F4/4:4 F4 F4 F4 | F4 E4:3 E4 E4 | E4 D4:2 D4 E4:3 | D4/2:2 G4/2:5 | E4/4:3 E4 E4/2 | E4/4 E4 E4/2 | E4/4 G4:5 C4:1 D4:2 | E4/1:3 | F4/4:4 F4 F4 F4 | F4 E4:3 E4 E4 | G4:5 G4 F4:4 D4:2 | C4/1:1',
        left: '[C3 G3]/1:5,1 | [C3 G3]/1 | [C3 G3]/1 | [C3 G3]/1 | [D3 G3]/1:4,1 | [D3 G3]/1 | D3/1:4 | G3/1:1 | [C3 G3]/1 | [C3 G3]/1 | [C3 G3]/1 | [C3 G3]/1 | [D3 G3]/1 | [D3 G3]/1 | [D3 G3]/2 G3/2 | [C3 G3]/1' }),
      play('Duel d’harmoniques', { title: 'Duel d’harmoniques', tempo: 92,
        right: '@f [C4 E4]/4:1,3 [C4 F4]/4:1,4 [C4 E4]/2 | R/1 | [C4 F4]/4 [C4 G4]/4:1,5 [C4 F4]/4 [C4 G4]/4 | R/1 | [E4 G4]/4:3,5 [F4 G4]/4:4,5 [E4 G4]/2 | R/1 | [D4 G4]/4:2,5 [C4 G4]/4:1,5 [D4 G4]/4 [C4 G4]/4 | R/1',
        left: 'R/1 | @p [C3 E3]/4:5,3 [C3 F3]/4:5,2 [C3 E3]/2 | R/1 | [C3 F3]/4 [C3 G3]/4:5,1 [C3 F3]/4 [C3 G3]/4 | R/1 | [E3 G3]/4:3,1 [F3 G3]/4:2,1 [E3 G3]/2 | R/1 | [D3 G3]/4:4,1 [C3 G3]/4:5,1 [D3 G3]/4 [C3 G3]/4' },
        { text: 'Dans l’esprit de « Dueling Harmonics » : la main droite joue f, la gauche répond p.' }),
      quiz('Jouer quartes et quintes harmoniques', [
        q('<b>Quinte harmonique</b> sur Do4.', ['C4', 'G4'], { mode: 'chord' }),
        q('<b>Quarte harmonique</b> sur Ré4.', ['D4', 'G4'], { mode: 'chord' }),
        q('<b>Quinte harmonique</b> main gauche sur Do3.', ['C3', 'G3'], { mode: 'chord' }),
        q('<b>Quarte harmonique</b> main gauche sur Do3.', ['C3', 'F3'], { mode: 'chord' }),
      ]),
    ]),
  ],
};
