import { play, quiz, q, lesson } from './util.js';
import { miniScore, rhythmTable, NOTE_GLYPHS as N, tip } from '../diagrams.js';

export default {
  id: 'c03',
  title: 'La grande portée',
  pages: '20–23',
  intro: 'Les deux mains sur la même page : grande portée, chiffrage de mesure et premiers silences.',
  lessons: [
    lesson('c03-l01', 'Grande portée, chiffrage 4/4, pause', '20', `
      <p>La <b>grande portée</b> réunit la clé de Sol (main droite) et la clé de Fa (main gauche) par une <b>accolade</b>. Le Do du milieu se trouve entre les deux, sur une ligne supplémentaire.</p>
      ${miniScore({ right: 'R/1 R/1 C4/1', left: 'C3/1 G3/1 R/1' }, { showNames: true })}
      <h3>Le chiffrage de mesure</h3>
      <p><b>4/4</b> : le chiffre du haut dit qu’il y a <b>4 temps par mesure</b> ; celui du bas que la <b>noire vaut 1 temps</b>.</p>
      ${rhythmTable([[N.restWhole, 'Pause', 'silence de 4 temps (ou toute la mesure)']])}
      <p>La <b>pause</b> est accrochée sous la 4<sup>e</sup> ligne. Pendant un silence, la main se repose en position, sans jouer.</p>
    `, [
      play('Jouer sur la grande portée', { title: 'Sur la grande portée', tempo: 80,
        right: 'C4/4:1 D4:2 E4:3 F4:4 | G4:5 G4 G4/2 | G4/4 F4:4 E4:3 D4:2 | C4:1 C4 C4/2 | R/1 | R/1 | R/1 | R/1 | C4/4:1 D4:2 E4:3 F4:4 | G4:5 G4 G4/2 | G4/4 F4:4 E4:3 D4:2 | C4:1 C4 C4/2',
        left: 'R/1 | R/1 | R/1 | R/1 | C3/4:5 D3:4 E3:3 F3:2 | G3:1 G3 G3/2 | G3/4 F3:2 E3:3 D3:4 | C3:5 C3 C3/2 | R/1 | R/1 | R/1 | R/1' },
        { text: 'La main droite joue, puis la gauche, puis la droite à nouveau. Compte pendant les pauses.' }),
    ]),

    lesson('c03-l02', 'Le soupir', '21', `
      ${rhythmTable([[N.restQuarter, 'Soupir', 'silence de 1 temps'], [N.restWhole, 'Pause', 'silence de 4 temps']])}
      <p>Un soupir se compte comme une noire, mais sans jouer. Lève le doigt exactement sur le temps du silence.</p>
      ${miniScore({ left: 'G3/2 E3/4 R/4 | G3/2 E3/4 R/4' })}
    `, [
      play('Balade rock', { title: 'Balade rock', tempo: 96, tempoText: 'Rythmé',
        right: 'C4/2:1 C4/4 E4/4:3 | G4/2:5 E4/4:3 G4/4:5 | C4/2:1 C4/2 | C4/1 | R/1 | R/1 | R/1 | R/1 | E4/4:3 R/4 G4/4:5 R/4 | E4/4 R/4 G4/4 R/4 | C4/2:1 C4/2 | C4/1',
        left: 'R/1 | R/1 | R/1 | R/1 | C3/2:5 C3/4 E3/4:3 | G3/2:1 E3/4:3 G3/4:1 | C3/2:5 C3/2 | C3/1 | C3/4:5 R/4 E3/4:3 R/4 | C3/4 R/4 E3/4 R/4 | C3/2 C3/2 | C3/1' },
        { text: 'Pièce dans l’esprit de « Rock‑Along » : mains alternées, puis soupirs sur les temps 2 et 4.' }),
      play('Danse du chapeau mexicain', { title: 'Danse du chapeau mexicain', composer: 'Traditionnel', tempo: 100, tempoText: 'Vif',
        right: 'R/1 | R/1 | R/1 | R/1 | G4/2:5 E4/4:3 R/4 | G4/2 E4/4 R/4 | D4/4:2 E4:3 F4:4 D4:2 | C4/1:1',
        left: 'G3/2:1 E3/4:3 R/4 | G3/2 E3/4 R/4 | D3/4:4 E3:3 F3:2 D3:4 | E3/2:3 C3/4:5 R/4 | R/1 | R/1 | R/1 | R/1' },
        { text: 'Les soupirs sont importants : lève bien la main sur le 4e temps.' }),
    ]),

    lesson('c03-l03', 'Deux chansons à deux mains', '22–23', `
      <p>Deux chansons traditionnelles pour relire tout ce qui précède : noires, blanches, rondes, pauses, main droite puis main gauche.</p>
      <h3>Compter en 4/4</h3>
      <table class="theory-table"><tr><th>Mesure</th><td>${N.quarter} ${N.quarter} ${N.quarter} ${N.quarter}</td><td>${N.half} ${N.quarter} ${N.quarter}</td><td>${N.half} ${N.half}</td><td>${N.whole}</td></tr><tr><th>On compte</th><td>1 2 3 4</td><td>1‑2 3 4</td><td>1‑2 3‑4</td><td>1‑2‑3‑4</td></tr></table>
      ${tip('Chaque mesure totalise toujours 4 temps, silences compris.')}
    `, [
      play('Doucement rame (Lightly Row)', { title: 'Doucement rame', composer: 'Traditionnel', tempo: 88,
        right: 'G4/4:5 E4:3 E4/2 | F4/4:4 D4:2 D4/2 | C4/4:1 D4:2 E4:3 F4:4 | G4:5 G4 G4/2 | R/1 | R/1 | R/1 | R/1',
        left: 'R/1 | R/1 | R/1 | R/1 | G3/4:1 E3:3 E3/2 | F3/4:2 D3:4 D3/2 | C3/4:5 E3:3 G3:1 G3 | E3/1:3' }),
      play('Tante Rhody (Aunt Rhody)', { title: 'Tante Rhody', composer: 'Traditionnel', tempo: 84,
        right: 'E4/2:3 E4/4 D4/4:2 | C4/2:1 C4/2 | D4/2:2 D4/4 F4/4:4 | E4/4:3 D4/4:2 C4/2:1 | R/1 | R/1 | R/1 | R/1',
        left: 'R/1 | R/1 | R/1 | R/1 | G3/2:1 G3/4 F3/4:2 | E3/2:3 E3/4 E3/4 | D3/4:4 C3/4:5 D3/4:4 E3/4:3 | C3/1:5' }),
    ]),
  ],
};
