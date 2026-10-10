// Application : écrans, réglages, gestion des entrées (MIDI Bluetooth/USB ou clavier à l’écran).
import { parseSong, parsePitch, midiToNameFr } from './music.js';
import { SONGS } from './songs.js';
import { COURSE, LESSON_LIST, findLesson, lessonProgress, chapterProgress, nextExercise, followingExercise } from './course/index.js';
import { ScoreRenderer } from './renderer.js';
import { renderMiniScores } from './diagrams.js';
import { Synth } from './synth.js';
import { MidiInput } from './midi.js';
import { PianoKeyboard } from './keyboard.js';
import { Player } from './player.js';
import { Quiz } from './quiz.js';

const STORE_KEY = 'easypiano.v1';
const $ = (sel) => document.querySelector(sel);

const defaults = {
  settings: { input: 'midi', midiDevice: 'all', midiSound: false, volume: 0.6, showNames: true, metronome: true, tempoFactor: 1 },
  course: {},   // course[lessonId][exerciseIndex] = { done, stars, accuracy }
  songs: {},
};
let store = load();
function load() {
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); if (s) return { ...defaults, ...s, settings: { ...defaults.settings, ...(s.settings || {}) }, course: s.course || {} }; } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(defaults));
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }
const settings = store.settings;

// ---------- Audio & entrées ----------
const synth = new Synth();
synth.setVolume(settings.volume);
let player = null;
let quiz = null;
let inputTarget = 'player'; // 'player' | 'quiz'
let activeInput = 'screen';

function handleNote(e) {
  const sound = e.source === 'screen' || (e.source === 'midi' && settings.midiSound);
  if (e.type === 'on') {
    if (sound) synth.noteOn(e.midi, e.velocity || 0.8);
    const det = $('#midi-detected'); if (det && e.source === 'midi') det.textContent = midiToNameFr(e.midi) + (Math.floor(e.midi / 12) - 1);
    if (inputTarget === 'quiz' && quiz) quiz.noteOn(e.midi, e.velocity ?? 0.8);
    else if (player) player.noteOn(e.midi, e.source);
  } else {
    if (sound) synth.noteOff(e.midi);
    if (inputTarget === 'quiz' && quiz) quiz.noteOff(e.midi);
    else if (player) player.noteOff(e.midi);
  }
}
const midi = new MidiInput(handleNote);
midi.onDevicesChanged = () => { updateInputStatus(); renderSettings(); };

async function setupMidi(force = false) {
  if (!MidiInput.supported) return false;
  await midi.init(force);
  midi.select(settings.midiDevice);
  return midi.connectedDevices().length > 0;
}

async function activateInputs() {
  // Appelé après un geste utilisateur (obligatoire sur iPad pour l'audio)
  synth.ensure();
  let label = 'Clavier à l’écran';
  activeInput = 'screen';
  if (settings.input === 'midi') {
    const ok = await setupMidi(true);
    if (ok) { activeInput = 'midi'; label = 'MIDI : ' + midi.connectedDevices().map(d => d.name).join(', '); }
    else if (!MidiInput.supported) label = 'Clavier à l’écran (ce navigateur ne gère pas le Web MIDI)';
    else label = 'Clavier à l’écran (aucun piano MIDI détecté)';
  }
  updateInputStatus(label);
  return label;
}

function updateInputStatus(label) {
  const el = $('#input-status');
  if (!label) {
    const devs = midi.connectedDevices();
    if (activeInput === 'midi' && devs.length) label = 'MIDI : ' + devs.map(d => d.name).join(', ');
    else if (MidiInput.supported && devs.length) label = 'MIDI détecté : ' + devs[0].name;
    else if (settings.input === 'screen') label = 'Clavier à l’écran';
    else if (!MidiInput.supported) label = 'Pas de Web MIDI ici (voir Réglages)';
    else label = 'Aucun piano MIDI détecté';
  }
  el.textContent = label;
  el.className = 'input-status ' + (activeInput === 'midi' ? 'ok' : (label.startsWith('Pas de') || label.startsWith('Aucun')) ? 'warn' : '');
}

// ---------- Navigation ----------
function showScreen(id) {
  for (const s of document.querySelectorAll('.screen')) s.hidden = s.id !== id;
  window.scrollTo(0, 0);
}
$('#home-tabs').addEventListener('click', (e) => {
  const b = e.target.closest('.tab'); if (!b) return;
  for (const t of document.querySelectorAll('.tab')) t.classList.toggle('active', t === b);
  for (const p of document.querySelectorAll('.tab-panel')) p.hidden = p.id !== 'tab-' + b.dataset.tab;
  if (b.dataset.tab === 'reglages') renderSettings();
});

// ---------- Accueil : cours ----------
function exerciseLabel(ex) { return ex.type === 'quiz' ? 'Quiz' : ex.hands === 'RL' ? 'Deux mains' : ex.hands === 'L' ? 'Main gauche' : 'Main droite'; }

function renderCourse() {
  const root = $('#tab-cours');
  root.innerHTML = '';
  const lessonsDone = LESSON_LIST.filter(l => lessonProgress(l, store.course).complete).length;
  const exTotal = LESSON_LIST.reduce((a, l) => a + l.exercises.length, 0);
  const exDone = LESSON_LIST.reduce((a, l) => a + lessonProgress(l, store.course).done, 0);
  const next = nextExercise(store.course);
  const cont = document.createElement('div');
  cont.className = 'intro continue';
  cont.innerHTML = `<h2>Cours de piano – niveau 1</h2>
    <p>Un cursus complet en 14 chapitres qui suit le livre <i>Alfred’s Basic Adult All‑in‑One Course, Level 1</i> : pour chaque leçon, l’essentiel de la théorie en français (Do, Ré, Mi…), puis les exercices et morceaux à jouer sur ton piano.</p>
    <div class="progress-bar"><div style="width:${exTotal ? Math.round(100 * exDone / exTotal) : 0}%"></div></div>
    <p class="muted">${lessonsDone} / ${LESSON_LIST.length} leçons terminées · ${exDone} / ${exTotal} exercices</p>
    ${next ? `<div class="row left"><button class="btn primary big" id="btn-continue">▶ Continuer : ${next.lesson.title} – ${next.exercise.title}</button></div>` : '<p><b>Bravo, tout le cursus est terminé !</b></p>'}`;
  root.appendChild(cont);
  const btn = cont.querySelector('#btn-continue');
  if (btn) btn.addEventListener('click', () => openExercise(next.lesson, next.index));

  for (const ch of COURSE) {
    const cp = chapterProgress(ch, store.course);
    const head = document.createElement('div');
    head.className = 'chapter-head' + (cp.complete ? ' done' : '');
    head.innerHTML = `<div class="chapter-num">${ch.index + 1}</div><div class="chapter-info"><h3>${ch.title}</h3><p>${ch.intro}</p></div>
      <div class="chapter-meta"><span class="muted">Livre p. ${ch.pages}</span><span class="${cp.complete ? 'ok' : 'muted'}">${cp.done} / ${cp.total} leçons</span></div>`;
    root.appendChild(head);
    const grid = document.createElement('div');
    grid.className = 'grid';
    for (const l of ch.lessons) {
      const lp = lessonProgress(l, store.course);
      const c = document.createElement('div');
      c.className = 'card-item' + (lp.complete ? ' done' : lp.done ? ' started' : '');
      const status = lp.complete ? '✓ Terminée' : lp.done ? `En cours · ${lp.done}/${lp.total}` : 'À faire';
      c.innerHTML = `<h3><span class="lesson-num">${l.number}</span>${l.title}</h3><p>${l.exercises.length} exercice${l.exercises.length > 1 ? 's' : ''} · p. ${l.pages}</p>
        <div class="meta"><span class="${lp.complete ? 'ok' : 'muted'}">${status}</span><span class="level">Leçon</span></div>`;
      c.addEventListener('click', () => openLessonScreen(l));
      grid.appendChild(c);
    }
    root.appendChild(grid);
  }
}

// ---------- Écran leçon ----------
let currentLesson = null;
let theoryRenderer = null;

async function openLessonScreen(lesson) {
  currentLesson = lesson;
  showScreen('screen-lesson');
  $('#lesson-title').textContent = `${lesson.number}. ${lesson.title}`;
  $('#lesson-sub').textContent = `Chapitre ${lesson.chapter.index + 1} : ${lesson.chapter.title} · livre p. ${lesson.pages}`;
  $('#btn-lesson-prev').disabled = lesson.number <= 1;
  $('#btn-lesson-next').disabled = lesson.number >= LESSON_LIST.length;
  const theory = $('#lesson-theory');
  theory.innerHTML = lesson.theory;
  renderExerciseList();
  await fontReady();
  renderMiniScores(theory, ScoreRenderer);
}

function renderExerciseList() {
  const lesson = currentLesson;
  const list = $('#lesson-exercises');
  list.innerHTML = '';
  const p = store.course[lesson.id] || {};
  lesson.exercises.forEach((ex, i) => {
    const r = p[i];
    const li = document.createElement('li');
    li.className = 'ex-item' + (r && r.done ? ' done' : '');
    const stars = r && r.done && r.stars ? '★'.repeat(r.stars) + '☆'.repeat(3 - r.stars) : '';
    li.innerHTML = `<div class="ex-main"><div class="ex-name">${ex.title}</div><div class="ex-sub">${exerciseLabel(ex)}${ex.type === 'play' && ex.song.composer ? ' · ' + ex.song.composer : ''}${ex.type === 'quiz' ? ' · ' + ex.questions.length + ' questions' : ''}</div></div>
      <div class="ex-status">${r && r.done ? '<span class="ok">✓</span> <span class="stars-small">' + stars + '</span>' : '<span class="muted">À faire</span>'}</div>
      <button class="btn primary">${ex.type === 'quiz' ? 'Répondre' : 'Jouer'}</button>`;
    li.querySelector('button').addEventListener('click', () => openExercise(lesson, i));
    list.appendChild(li);
  });
}

$('#btn-lesson-back').addEventListener('click', () => { showScreen('screen-home'); renderCourse(); });
$('#btn-lesson-prev').addEventListener('click', () => { const l = LESSON_LIST[currentLesson.number - 2]; if (l) openLessonScreen(l); });
$('#btn-lesson-next').addEventListener('click', () => { const l = LESSON_LIST[currentLesson.number]; if (l) openLessonScreen(l); });

// ---------- Accueil : morceaux ----------
function renderSongs() {
  const root = $('#tab-morceaux');
  root.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'grid';
  SONGS.forEach((s, i) => {
    const best = store.songs[s.id];
    const c = document.createElement('div');
    c.className = 'card-item' + (best && best.stars >= 3 ? ' done' : '');
    const stars = best ? '★'.repeat(best.stars) + '☆'.repeat(3 - best.stars) : '☆☆☆';
    c.innerHTML = `<h3>${s.title}</h3><p>${s.composer} · ${s.timeSig ? s.timeSig.join('/') : '4/4'} · ${s.tempo} bpm</p>
      <div class="meta"><span class="level" title="Niveau">${'●'.repeat(s.level)}${'○'.repeat(3 - s.level)}</span><span class="stars-small">${stars}${best ? ' ' + Math.round(best.accuracy * 100) + ' %' : ''}</span></div>`;
    c.addEventListener('click', () => openSong(i));
    grid.appendChild(c);
  });
  root.appendChild(grid);
}

// ---------- Réglages ----------
function renderSettings() {
  const root = $('#tab-reglages');
  const devs = midi.devices();
  root.innerHTML = `
  <div class="settings">
    <div class="setting">
      <h3>Entrée : comment l’appli écoute ton piano</h3>
      <label class="radio"><input type="radio" name="input" value="midi" ${settings.input === 'midi' ? 'checked' : ''}> Piano MIDI (Bluetooth ou USB) ${MidiInput.supported ? '' : '— <i>non supporté par ce navigateur</i>'}</label>
      <label class="radio"><input type="radio" name="input" value="screen" ${settings.input === 'screen' ? 'checked' : ''}> Clavier à l’écran seulement</label>
      <p><b>Sur iPad</b> : Safari ne gère pas le Web MIDI. Ouvre cette page dans l’appli gratuite <b>MIDIWeb Browser</b>
      (ou <b>Web MIDI Browser</b>) depuis l’App Store. Jumelle d’abord le piano en Bluetooth MIDI (dans l’appli de ton piano,
      dans GarageBand ▸ Réglages ▸ Avancé ▸ Appareils MIDI Bluetooth, ou dans le menu Bluetooth du navigateur MIDI), puis appuie sur « Rechercher » ci-dessous.</p>
      <p><b>Sur ordinateur</b> : Chrome, Edge ou Firefox gèrent le MIDI directement.</p>
    </div>
    <div class="setting">
      <h3>MIDI</h3>
      ${MidiInput.supported ? `
        <p>Périphériques : ${devs.length ? devs.map(d => `${d.name} (${d.state === 'connected' ? 'connecté' : 'déconnecté'})`).join(', ') : 'aucun détecté'}
        <button class="btn" id="btn-midi-scan" style="margin-left:8px">Rechercher</button></p>
        <p>Utiliser : <select id="midi-device"><option value="all">Tous les périphériques</option>${devs.map(d => `<option value="${d.id}" ${settings.midiDevice === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}</select></p>
        <label class="radio"><input type="checkbox" id="midi-sound" ${settings.midiSound ? 'checked' : ''}> Faire sonner les notes MIDI dans l’appli (si ton piano est muet)</label>
        <p>Test : joue une note sur le piano, elle s’affiche ici → <span class="detected" id="midi-detected"></span></p>
      ` : '<p>Web MIDI n’est pas disponible dans ce navigateur.</p>'}
      <details class="diag"><summary>Diagnostic MIDI (en cas de problème)</summary><pre id="midi-diag"></pre>
        <p><button class="btn" id="btn-midi-request">Redemander l’accès MIDI</button> <button class="btn" id="btn-midi-copy">Copier le diagnostic</button> <span class="muted" id="midi-copy-status"></span></p></details>
    </div>
    <div class="setting">
      <h3>EasyPiano Junior</h3>
      <p>Une version pour les petits (3 à 6 ans) : notes en couleurs, petits jeux et chansons avec Piou le poussin. <a href="junior/" class="junior-link">Ouvrir EasyPiano Junior →</a></p>
    </div>
    <div class="setting">
      <h3>Son et affichage</h3>
      <p>Volume de l’appli (accompagnement, métronome, clavier à l’écran) : <input type="range" id="volume" min="0" max="1" step="0.05" value="${settings.volume}"></p>
      <label class="radio"><input type="checkbox" id="show-names" ${settings.showNames ? 'checked' : ''}> Afficher le nom des notes (Do, Ré, Mi…) dans la partition</label>
      <label class="radio"><input type="checkbox" id="metronome" ${settings.metronome ? 'checked' : ''}> Métronome en mode Jouer</label>
    </div>
    <div class="setting">
      <h3>Progression</h3>
      <p><button class="btn" id="btn-reset">Effacer ma progression</button> <button class="btn" id="btn-reset-cancel" hidden>Annuler</button></p>
      <p class="muted" id="reset-status"></p>
      <p>Astuce : ajoute la page à l’écran d’accueil (menu Partager ▸ « Sur l’écran d’accueil ») pour un affichage plein écran.</p>
    </div>
  </div>`;
  root.querySelectorAll('input[name=input]').forEach(r => r.addEventListener('change', async () => {
    settings.input = r.value; save();
    if (settings.input === 'screen') activeInput = 'screen';
    else await setupMidi();
    updateInputStatus(); renderSettings();
  }));
  const scan = root.querySelector('#btn-midi-scan');
  if (scan) scan.addEventListener('click', async () => { await setupMidi(true); updateInputStatus(); renderSettings(); });
  const diag = root.querySelector('#midi-diag');
  const refreshDiag = () => { if (diag) diag.textContent = JSON.stringify(midi.diagnostic(), null, 1) + '\n' + midi.log.join('\n'); };
  refreshDiag();
  clearInterval(renderSettings.diagTimer);
  renderSettings.diagTimer = setInterval(() => { if (!root.hidden) refreshDiag(); }, 1000);
  root.querySelector('#btn-midi-request').addEventListener('click', async () => { await setupMidi(true); updateInputStatus(); renderSettings(); });
  // Pas de boîte de dialogue native : elles sont bloquées dans certains navigateurs iPad (appli installée, MIDIWeb Browser).
  root.querySelector('#btn-midi-copy').addEventListener('click', async () => {
    const txt = diag ? diag.textContent : '';
    const status = root.querySelector('#midi-copy-status');
    try {
      await navigator.clipboard.writeText(txt);
      status.textContent = 'Diagnostic copié.';
    } catch (e) {
      // Secours : on sélectionne le texte pour une copie manuelle.
      clearInterval(renderSettings.diagTimer);
      const det = root.querySelector('details.diag'); if (det) det.open = true;
      try { const r = document.createRange(); r.selectNodeContents(diag); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); } catch (e2) { /* ignore */ }
      status.textContent = 'Copie automatique impossible : le texte est sélectionné, utilise « Copier » de l’iPad.';
    }
  });
  const sel = root.querySelector('#midi-device');
  if (sel) sel.addEventListener('change', () => { settings.midiDevice = sel.value; midi.select(sel.value); save(); });
  const ms = root.querySelector('#midi-sound');
  if (ms) ms.addEventListener('change', () => { settings.midiSound = ms.checked; save(); });
  root.querySelector('#volume').addEventListener('input', (e) => { settings.volume = parseFloat(e.target.value); synth.setVolume(settings.volume); save(); });
  root.querySelector('#show-names').addEventListener('change', (e) => { settings.showNames = e.target.checked; save(); });
  root.querySelector('#metronome').addEventListener('change', (e) => { settings.metronome = e.target.checked; save(); });
  // Remise à zéro en deux clics (même raison : pas de confirm() natif).
  const resetBtn = root.querySelector('#btn-reset'), resetCancel = root.querySelector('#btn-reset-cancel'), resetStatus = root.querySelector('#reset-status');
  let resetArmed = false;
  resetBtn.addEventListener('click', () => {
    if (!resetArmed) {
      resetArmed = true;
      resetBtn.textContent = 'Oui, tout effacer';
      resetBtn.classList.add('primary');
      resetCancel.hidden = false;
      resetStatus.textContent = 'Les leçons terminées, étoiles et meilleurs scores seront effacés (les réglages sont conservés).';
      return;
    }
    store.course = {}; store.songs = {}; save(); renderCourse(); renderSongs();
    resetArmed = false;
    resetBtn.textContent = 'Effacer ma progression';
    resetBtn.classList.remove('primary');
    resetCancel.hidden = true;
    resetStatus.textContent = 'Progression effacée.';
  });
  resetCancel.addEventListener('click', () => {
    resetArmed = false;
    resetBtn.textContent = 'Effacer ma progression';
    resetBtn.classList.remove('primary');
    resetCancel.hidden = true;
    resetStatus.textContent = '';
  });
}

// ---------- Lecteur ----------
const scoreEl = $('#score');
const renderer = new ScoreRenderer(scoreEl);
const keyboard = new PianoKeyboard($('#keyboard'), handleNote, { showNames: true });
let current = null; // { kind: 'song'|'exercise', ... }

player = new Player({ renderer, keyboard, synth, onState: onPlayerState });
player.metronome = settings.metronome;
quiz = new Quiz({ keyboard, synth, onState: onQuizState });

function fontReady() {
  if (!document.fonts) return Promise.resolve();
  return document.fonts.load('48px Bravura').catch(() => {}).then(() => document.fonts.ready);
}

function stavesFor(song) { return song.hasR && song.hasL ? 'RL' : song.hasL ? 'L' : 'R'; }

function setQuizMode(on) {
  $('#screen-player').classList.toggle('quiz-mode', on);
  $('#quiz-panel').hidden = !on;
  $('#score').hidden = on;
  inputTarget = on ? 'quiz' : 'player';
}

async function openPlayer(item) {
  current = item;
  player.stop(); quiz.stop();
  setQuizMode(false);
  showScreen('screen-player');
  $('#player-title').textContent = item.kind === 'exercise' ? item.exercise.title : item.song.title;
  $('#player-sub').textContent = item.kind === 'exercise' ? `${item.lesson.number}. ${item.lesson.title}` : `${item.song.composer} · niveau ${item.song.level}`;
  $('#start-title').textContent = item.kind === 'exercise' ? item.exercise.title : item.song.title;
  const text = item.kind === 'exercise' ? (item.exercise.text ? `<p>${item.exercise.text}</p>` : '') : (item.song.hint ? `<p>${item.song.hint}</p>` : '');
  $('#lesson-text').innerHTML = text + (item.kind === 'exercise' && item.song.composer ? `<p class="muted">${item.song.title} · ${item.song.composer}${item.song.tempoText ? ' · ' + item.song.tempoText : ''}</p>` : '');
  $('#start-input').textContent = 'Préparation de l’entrée…';
  $('#overlay-start').hidden = false;
  $('#overlay-result').hidden = true;
  $('#btn-hint').hidden = !item.song.hint;
  player.mode = item.kind === 'exercise' ? (item.exercise.mode || 'learn') : 'learn';
  player.hands = item.hands;
  player.tempoFactor = settings.tempoFactor;
  syncControls();
  keyboard.fitToSong(item.song);
  await fontReady();
  renderer.render(item.song, { hands: player.hands, showNames: showNamesFor(item), staves: stavesFor(item.song) });
  player.load(item.song, { hands: item.hands, mode: player.mode });
  // Les entrées sont activées lors du clic sur « Commencer » (geste utilisateur requis).
  $('#start-input').textContent = settings.input === 'screen' ? 'Entrée : clavier à l’écran' : 'Appuie sur Commencer pour connecter le piano MIDI.';
}

function showNamesFor(item) {
  if (item && item.kind === 'exercise' && item.exercise.showNames !== undefined) return item.exercise.showNames && settings.showNames;
  return settings.showNames;
}

function openSong(i) {
  const def = SONGS[i];
  openPlayer({ kind: 'song', index: i, song: parseSong(def), hands: 'RL' });
}

function openExercise(lesson, index) {
  const ex = lesson.exercises[index];
  if (!ex) return;
  if (ex.type === 'quiz') return openQuiz(lesson, index);
  openPlayer({ kind: 'exercise', lesson, index, exercise: ex, song: parseSong(ex.song), hands: ex.hands });
}

async function openQuiz(lesson, index) {
  const ex = lesson.exercises[index];
  current = { kind: 'exercise', lesson, index, exercise: ex, song: null, hands: 'RL' };
  player.stop();
  showScreen('screen-player');
  setQuizMode(true);
  $('#player-title').textContent = ex.title;
  $('#player-sub').textContent = `${lesson.number}. ${lesson.title}`;
  $('#start-title').textContent = ex.title;
  $('#lesson-text').innerHTML = `<p>${ex.text || 'Réponds à chaque question en jouant sur le piano. Les touches attendues s’allument en bleu quand la réponse est précise.'}</p><p class="muted">${ex.questions.length} questions</p>`;
  $('#overlay-start').hidden = false;
  $('#overlay-result').hidden = true;
  $('#btn-hint').hidden = true;
  // Étendue du clavier : autour des réponses précises
  const midis = [];
  for (const q of ex.questions) for (const it of q.answer) for (const s of (Array.isArray(it) ? it : [it])) if (typeof s === 'string' && /\d$/.test(s)) midis.push(parsePitch(s).midi);
  keyboard.setRange(midis.length ? Math.min(...midis) - 2 : 48, midis.length ? Math.max(...midis) + 2 : 72);
  quiz.load(ex.questions);
  $('#quiz-progress').textContent = '';
  $('#quiz-prompt').innerHTML = '';
  $('#quiz-feedback').textContent = '';
  $('#status-strip').textContent = 'Quiz : joue ta réponse sur le piano.';
  $('#live-info').innerHTML = '';
  $('#start-input').textContent = settings.input === 'screen' ? 'Entrée : clavier à l’écran' : 'Appuie sur Commencer pour connecter le piano MIDI.';
}

function syncControls() {
  for (const b of document.querySelectorAll('#seg-mode button')) b.classList.toggle('active', b.dataset.mode === player.mode);
  for (const b of document.querySelectorAll('#seg-hands button')) {
    b.classList.toggle('active', b.dataset.hands === player.hands);
    const song = current && current.song;
    const has = (h) => song && song.hands[h].some(e => !e.rest);
    b.disabled = !!song && ((b.dataset.hands === 'L' && !has('L')) || (b.dataset.hands === 'R' && !has('R')) || (b.dataset.hands === 'RL' && !(has('L') && has('R'))));
  }
  $('#tempo-label').textContent = Math.round(player.tempoFactor * 100) + ' % · ' + Math.round(player.bpm) + ' bpm';
  $('#btn-metro').classList.toggle('on', player.metronome);
  $('#btn-names').classList.toggle('on', settings.showNames);
  $('#btn-playpause').textContent = player.running ? '⏸ Pause' : '▶ Lecture';
}

function rerender() {
  renderer.render(current.song, { hands: player.hands, showNames: showNamesFor(current), staves: stavesFor(current.song) });
  player.reset();
  syncControls();
}

function onPlayerState(s) {
  const strip = $('#status-strip');
  const live = $('#live-info');
  switch (s.type) {
    case 'reset':
      strip.innerHTML = player.mode === 'learn' ? 'Mode Apprendre : la partition attend la bonne note.' : player.mode === 'play' ? 'Mode Jouer : joue en rythme avec le curseur.' : 'Écoute le morceau.';
      live.innerHTML = '';
      $('#countin').hidden = true;
      syncControls();
      break;
    case 'start': case 'pause': syncControls(); break;
    case 'expect': case 'waiting': {
      const names = [...new Set(s.notes.map(m => midiToNameFr(m)))];
      strip.innerHTML = names.length ? 'Joue : ' + names.map(n => `<span class="chip">${n}</span>`).join(' ') : '';
      break;
    }
    case 'countin':
      $('#countin').hidden = s.count === 0;
      $('#countin').textContent = s.count;
      break;
    case 'hit': case 'wrong': case 'tick':
      if (s.type !== 'tick') live.innerHTML = `<b class="ok">${player.stats.hits}</b> justes · <b class="bad">${player.stats.wrong}</b> fausses${player.mode === 'play' ? ` · <b>${player.stats.misses}</b> ratées` : ''}`;
      break;
    case 'finished': showResult(s); syncControls(); break;
  }
}

function onQuizState(s) {
  const fb = $('#quiz-feedback');
  switch (s.type) {
    case 'question':
      $('#quiz-progress').innerHTML = `Question <b>${s.index + 1}</b> / ${s.total}` + ' <span class="dots">' + Array.from({ length: s.total }, (_, i) => `<i class="${i < s.index ? 'done' : i === s.index ? 'cur' : ''}"></i>`).join('') + '</span>';
      $('#quiz-prompt').innerHTML = s.question.prompt + (s.question.display ? `<div class="quiz-display">${s.question.display}</div>` : '');
      fb.textContent = s.question.mode === 'chord' ? 'Joue toutes les notes ensemble.' : s.question.answer.length > 1 ? `Joue les ${s.question.answer.length} notes l’une après l’autre.` : '';
      fb.className = 'quiz-feedback';
      break;
    case 'correct':
      fb.textContent = s.step && s.total && s.step < s.total ? `✓ ${s.step} / ${s.total}` : '✓ Juste !';
      fb.className = 'quiz-feedback good';
      break;
    case 'wrong':
      fb.textContent = s.hint ? '✗ ' + s.hint : '✗ Ce n’est pas ça : ' + midiToNameFr(s.midi) + '. Essaie encore.';
      fb.className = 'quiz-feedback bad';
      break;
    case 'pause':
      break;
    case 'finished':
      showResult(s);
      break;
  }
  $('#live-info').innerHTML = quiz.stats ? `<b class="ok">${quiz.stats.correct}</b> justes · <b class="bad">${quiz.stats.wrong}</b> erreurs` : '';
}

function showResult(s) {
  const ov = $('#overlay-result');
  ov.hidden = false;
  const stars = s.stars;
  $('#result-stars').innerHTML = [1, 2, 3].map(i => `<span class="${i <= stars ? '' : 'off'}">★</span>`).join('');
  const pct = Math.round(s.accuracy * 100);
  let title, text;
  if (s.mode === 'demo') { title = 'Fin de l’écoute'; text = 'À toi de jouer !'; $('#result-stars').innerHTML = ''; }
  else if (s.mode === 'quiz') { title = s.stats.wrong === 0 ? 'Sans faute !' : 'Quiz terminé'; text = `${s.stats.correct} bonne${s.stats.correct > 1 ? 's' : ''} réponse${s.stats.correct > 1 ? 's' : ''}, ${s.stats.wrong} erreur${s.stats.wrong > 1 ? 's' : ''}.`; }
  else if (s.mode === 'learn') { title = 'Bravo, terminé !'; text = `${s.stats.total} notes jouées, ${s.stats.wrong} fausse${s.stats.wrong > 1 ? 's' : ''} note${s.stats.wrong > 1 ? 's' : ''} en chemin.`; }
  else { title = stars === 3 ? 'Excellent !' : stars === 2 ? 'Bien joué !' : stars === 1 ? 'Pas mal, continue !' : 'Courage, on recommence ?'; text = `${pct} % de notes justes (${s.stats.hits}/${s.stats.total}), ${s.stats.misses} ratées, ${s.stats.wrong} fausses notes.`; }
  $('#result-title').textContent = title;
  $('#result-text').textContent = text;
  // Progression
  if (current.kind === 'exercise' && s.mode !== 'demo' && (s.mode === 'learn' || s.mode === 'quiz' || s.accuracy >= 0.7)) {
    const p = store.course[current.lesson.id] || (store.course[current.lesson.id] = {});
    const prev = p[current.index];
    const starsNow = s.mode === 'learn' ? (s.stats.wrong === 0 ? 3 : s.stats.wrong <= Math.max(2, s.stats.total * 0.15) ? 2 : 1) : stars;
    if (!prev || !prev.done || starsNow > (prev.stars || 0)) p[current.index] = { done: true, stars: starsNow, accuracy: s.accuracy, mode: s.mode };
    save();
  }
  if (current.kind === 'song' && s.mode === 'play' && player.hands === 'RL') {
    const best = store.songs[current.song.id];
    if (!best || s.accuracy > best.accuracy) { store.songs[current.song.id] = { accuracy: s.accuracy, stars }; save(); renderSongs(); }
  }
  const hasNext = current.kind === 'exercise' ? !!followingExercise(current.lesson, current.index) : current.index + 1 < SONGS.length;
  $('#btn-result-next').hidden = !hasNext;
  $('#btn-result-back').textContent = current.kind === 'exercise' ? '‹ Leçon' : 'Retour';
}

function leavePlayer() {
  player.stop(); quiz.stop();
  $('#overlay-result').hidden = true;
  if (current && current.kind === 'exercise') { openLessonScreen(current.lesson); }
  else { showScreen('screen-home'); }
  setQuizMode(false);
}

// Contrôles du lecteur
$('#btn-back').addEventListener('click', leavePlayer);
$('#btn-start').addEventListener('click', async () => {
  $('#start-input').textContent = 'Activation…';
  const label = await activateInputs();
  $('#start-input').textContent = 'Entrée : ' + label;
  $('#overlay-start').hidden = true;
  if (inputTarget === 'quiz') { quiz.reset(); quiz.start(); }
  else { player.reset(); player.start(); }
});
$('#btn-playpause').addEventListener('click', () => { synth.ensure(); if (player.finished) player.reset(); player.toggle(); });
$('#btn-restart').addEventListener('click', () => { $('#overlay-result').hidden = true; if (inputTarget === 'quiz') { quiz.reset(); quiz.start(); } else player.reset(); });
$('#seg-mode').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  player.setMode(b.dataset.mode); $('#overlay-result').hidden = true; syncControls();
});
$('#seg-hands').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b || b.disabled) return;
  player.hands = b.dataset.hands; $('#overlay-result').hidden = true; rerender();
});
const tempoSteps = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2];
function stepTempo(dir) {
  let i = tempoSteps.findIndex(v => Math.abs(v - player.tempoFactor) < 0.01);
  if (i === -1) i = 5;
  i = Math.max(0, Math.min(tempoSteps.length - 1, i + dir));
  player.setTempoFactor(tempoSteps[i]); settings.tempoFactor = tempoSteps[i]; save(); syncControls();
}
$('#tempo-minus').addEventListener('click', () => stepTempo(-1));
$('#tempo-plus').addEventListener('click', () => stepTempo(1));
$('#btn-metro').addEventListener('click', () => { player.metronome = !player.metronome; settings.metronome = player.metronome; save(); syncControls(); });
$('#btn-names').addEventListener('click', () => { settings.showNames = !settings.showNames; save(); rerender(); });
$('#btn-hint').addEventListener('click', () => { $('#hint-text').textContent = current.song.hint; $('#overlay-hint').hidden = false; });
$('#btn-hint-close').addEventListener('click', () => { $('#overlay-hint').hidden = true; });
$('#btn-result-back').addEventListener('click', leavePlayer);
$('#btn-result-replay').addEventListener('click', () => { $('#overlay-result').hidden = true; if (inputTarget === 'quiz') { quiz.reset(); quiz.start(); } else { player.reset(); player.start(); } });
$('#btn-result-next').addEventListener('click', () => {
  $('#overlay-result').hidden = true;
  if (current.kind === 'exercise') { const n = followingExercise(current.lesson, current.index); if (n) openExercise(n.lesson, n.index); }
  else openSong(current.index + 1);
});
let resizeTimer = null;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (!$('#screen-player').hidden && inputTarget === 'player') renderer.resize(); }, 150); });

// Clavier d'ordinateur (pour tester sans piano) : touches a w s e d f t g y h u j k
const KEYMAP = { a: 60, w: 61, s: 62, e: 63, d: 64, f: 65, t: 66, g: 67, y: 68, h: 69, u: 70, j: 71, k: 72, o: 73, l: 74, p: 75, m: 76 };
const heldKeys = new Set();
window.addEventListener('keydown', (e) => {
  if (e.repeat || e.target.tagName === 'INPUT') return;
  if (e.key === ' ') { e.preventDefault(); if (!$('#screen-player').hidden && $('#overlay-start').hidden && inputTarget === 'player') player.toggle(); return; }
  const m = KEYMAP[e.key.toLowerCase()];
  if (m && !heldKeys.has(m)) { heldKeys.add(m); handleNote({ type: 'on', midi: m, velocity: e.shiftKey ? 0.3 : 0.8, source: 'screen' }); }
});
window.addEventListener('keyup', (e) => {
  const m = KEYMAP[e.key.toLowerCase()];
  if (m) { heldKeys.delete(m); handleNote({ type: 'off', midi: m, source: 'screen' }); }
});

// ---------- Démarrage ----------
renderCourse();
renderSongs();
renderSettings();
updateInputStatus();
if (settings.input !== 'screen') {
  // requestMIDIAccess est possible sans geste ; on tente pour afficher l'état.
  // Certains navigateurs iPad injectent Web MIDI après le chargement : on réessaie plusieurs fois.
  const tryMidi = (attempt) => {
    if (MidiInput.supported) { setupMidi(attempt > 0).then(() => { updateInputStatus(); renderSettings(); }).catch(() => {}); if (attempt < 2) setTimeout(() => tryMidi(attempt + 1), 2500); }
    else if (attempt < 6) setTimeout(() => tryMidi(attempt + 1), 700);
    else updateInputStatus();
  };
  tryMidi(0);
}
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Accès pour les tests automatisés
window.EasyPiano = { player, quiz, renderer, keyboard, synth, midi, openSong, openExercise, openLessonScreen, findLesson, COURSE, LESSON_LIST, SONGS, parseSong,
  get store() { return store; },
  simulate(midi, on = true, velocity = 0.8) { handleNote({ type: on ? 'on' : 'off', midi, velocity, source: 'test' }); } };
