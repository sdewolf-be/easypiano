// Petits constructeurs pour écrire le cursus de façon compacte.
let counter = 0;

export function play(title, song, opts = {}) {
  return { type: 'play', title, song: { id: song.id || 'ex' + (counter++), tempo: 80, timeSig: [4, 4], key: 'C', ...song }, hands: opts.hands || (song.left && song.right ? 'RL' : song.left ? 'L' : 'R'), mode: opts.mode || 'learn', text: opts.text || '', showNames: opts.showNames };
}

export function quiz(title, questions, opts = {}) {
  return { type: 'quiz', title, questions, text: opts.text || '' };
}

// Question de quiz : q('Joue un Ré', ['D']) ; q('Accord de Do', ['C4','E4','G4'], {mode:'chord'})
export function q(prompt, answer, opts = {}) {
  return { prompt, answer, mode: opts.mode || 'sequence', display: opts.display || '', showKeys: opts.showKeys, velocity: opts.velocity };
}

export function lesson(id, title, pages, theory, exercises, opts = {}) {
  return { id, title, pages, theory, exercises, summary: opts.summary || '' };
}
