// Application : écrans, réglages, gestion des entrées (MIDI Bluetooth/USB ou clavier à l’écran).
import { parseSong, midiToNameFr } from './music.js';
import { SONGS } from './songs.js';
import { LESSONS } from './lessons.js';
import { ScoreRenderer } from './renderer.js';
import { Synth } from './synth.js';
import { MidiInput } from './midi.js';
import { PianoKeyboard } from './keyboard.js';
import { Player } from './player.js';

const STORE_KEY = 'easypiano.v1';
const $ = (sel) => document.querySelector(sel);

const defaults = {
  settings: { input: 'midi', midiDevice: 'all', midiSound: false, volume: 0.6, showNames: true, metronome: true, tempoFactor: 1 },
  lessons: {},
  songs: {},
};
let store = load();
function load() {
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); if (s) return { ...defaults, ...s, settings: { ...defaults.settings, ...(s.settings || {}) } }; } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(defaults));
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }
const settings = store.settings;

// ---------- Audio & entrées ----------
const synth = new Synth();
synth.setVolume(settings.volume);
let player = null;
let activeInput = 'screen';

function handleNote(e) {
  const sound = e.source === 'screen' || (e.source === 'midi' && settings.midiSound);
  if (e.type === 'on') {
    if (sound) synth.noteOn(e.midi, e.velocity || 0.8);
    const det = $('#midi-detected'); if (det && e.source === 'midi') det.textContent = midiToNameFr(e.midi) + (Math.floor(e.midi / 12) - 1);
    if (player) player.noteOn(e.midi, e.source);
  } else {
    if (sound) synth.noteOff(e.midi);
    if (player) player.noteOff(e.midi);
  }
}
const midi = new MidiInput(handleNote);
midi.onDevicesChanged = () => { updateInputStatus(); renderSettings(); };

async function setupMidi() {
  if (!MidiInput.supported) return false;
  if (!midi.access) await midi.init();
  midi.select(settings.midiDevice);
  return midi.devices().some(d => d.state === 'connected');
}

async function activateInputs() {
  // Appelé après un geste utilisateur (obligatoire sur iPad pour l'audio)
  synth.ensure();
  let label = 'Clavier à l’écran';
  activeInput = 'screen';
  if (settings.input === 'midi') {
    const ok = await setupMidi();
    if (ok) { activeInput = 'midi'; label = 'MIDI : ' + midi.devices().filter(d => d.state === 'connected').map(d => d.name).join(', '); }
    else if (!MidiInput.supported) label = 'Clavier à l’écran (ce navigateur ne gère pas le Web MIDI)';
    else label = 'Clavier à l’écran (aucun piano MIDI détecté)';
  }
  updateInputStatus(label);
  return label;
}

function updateInputStatus(label) {
  const el = $('#input-status');
  if (!label) {
    const devs = midi.devices().filter(d => d.state === 'connected');
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
}
$('#home-tabs').addEventListener('click', (e) => {
  const b = e.target.closest('.tab'); if (!b) return;
  for (const t of document.querySelectorAll('.tab')) t.classList.toggle('active', t === b);
  for (const p of document.querySelectorAll('.tab-panel')) p.hidden = p.id !== 'tab-' + b.dataset.tab;
  if (b.dataset.tab === 'reglages') renderSettings();
});

// ---------- Accueil : cours ----------
function renderLessons() {
  const root = $('#tab-cours');
  root.innerHTML = '';
  const intro = document.createElement('div');
  intro.className = 'intro';
  const done = LESSONS.filter(l => store.lessons[l.id]).length;
  intro.innerHTML = `<h2>Bienvenue !</h2>Suis les leçons dans l’ordre, puis entraîne-toi sur les morceaux.
    En mode <b>Apprendre</b>, la partition attend que tu joues la bonne note ; en mode <b>Jouer</b>, elle défile en rythme.
    <br><span class="muted">${done} / ${LESSONS.length} leçons terminées</span>`;
  root.appendChild(intro);
  let module = null;
  let grid = null;
  LESSONS.forEach((l, i) => {
    if (l.module !== module) {
      module = l.module;
      const h = document.createElement('div'); h.className = 'module-title'; h.textContent = module; root.appendChild(h);
      grid = document.createElement('div'); grid.className = 'grid'; root.appendChild(grid);
    }
    const c = document.createElement('div');
    c.className = 'card-item' + (store.lessons[l.id] ? ' done' : '');
    c.innerHTML = `<h3><span class="lesson-num">${i + 1}</span>${l.title}</h3><p>${l.hands === 'R' ? 'Main droite' : l.hands === 'L' ? 'Main gauche' : 'Deux mains'}</p>
      <div class="meta"><span class="muted">${store.lessons[l.id] ? '✓ Terminée' : 'À faire'}</span><span class="level">Leçon</span></div>`;
    c.addEventListener('click', () => openLesson(i));
    grid.appendChild(c);
  });
}

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
    </div>
    <div class="setting">
      <h3>Son et affichage</h3>
      <p>Volume de l’appli (accompagnement, métronome, clavier à l’écran) : <input type="range" id="volume" min="0" max="1" step="0.05" value="${settings.volume}"></p>
      <label class="radio"><input type="checkbox" id="show-names" ${settings.showNames ? 'checked' : ''}> Afficher le nom des notes (Do, Ré, Mi…) dans la partition</label>
      <label class="radio"><input type="checkbox" id="metronome" ${settings.metronome ? 'checked' : ''}> Métronome en mode Jouer</label>
    </div>
    <div class="setting">
      <h3>Progression</h3>
      <p><button class="btn" id="btn-reset">Effacer ma progression</button></p>
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
  if (scan) scan.addEventListener('click', async () => { await setupMidi(); updateInputStatus(); renderSettings(); });
  const sel = root.querySelector('#midi-device');
  if (sel) sel.addEventListener('change', () => { settings.midiDevice = sel.value; midi.select(sel.value); save(); });
  const ms = root.querySelector('#midi-sound');
  if (ms) ms.addEventListener('change', () => { settings.midiSound = ms.checked; save(); });
  root.querySelector('#volume').addEventListener('input', (e) => { settings.volume = parseFloat(e.target.value); synth.setVolume(settings.volume); save(); });
  root.querySelector('#show-names').addEventListener('change', (e) => { settings.showNames = e.target.checked; save(); });
  root.querySelector('#metronome').addEventListener('change', (e) => { settings.metronome = e.target.checked; save(); });
  root.querySelector('#btn-reset').addEventListener('click', () => {
    if (confirm('Effacer toute la progression ?')) { store.lessons = {}; store.songs = {}; save(); renderLessons(); renderSongs(); }
  });
}

// ---------- Lecteur ----------
const scoreEl = $('#score');
const renderer = new ScoreRenderer(scoreEl);
const keyboard = new PianoKeyboard($('#keyboard'), handleNote, { showNames: true });
let current = null; // { kind: 'song'|'lesson', index, song, hands }
let hintTimer = null;

player = new Player({ renderer, keyboard, synth, onState: onPlayerState });
player.metronome = settings.metronome;

function fontReady() {
  if (!document.fonts) return Promise.resolve();
  return document.fonts.load('48px Bravura').catch(() => {}).then(() => document.fonts.ready);
}

async function openPlayer(item) {
  current = item;
  showScreen('screen-player');
  $('#player-title').textContent = item.song.title;
  $('#player-sub').textContent = item.kind === 'lesson' ? 'Leçon ' + (item.index + 1) : `${item.song.composer} · niveau ${item.song.level}`;
  $('#start-title').textContent = item.kind === 'lesson' ? item.lesson.title : item.song.title;
  $('#lesson-text').innerHTML = item.kind === 'lesson' ? item.lesson.text : (item.song.hint ? `<p>${item.song.hint}</p>` : '');
  $('#start-input').textContent = 'Préparation de l’entrée…';
  $('#overlay-start').hidden = false;
  $('#overlay-result').hidden = true;
  $('#btn-hint').hidden = !item.song.hint;
  player.mode = 'learn';
  player.hands = item.hands;
  player.tempoFactor = settings.tempoFactor;
  syncControls();
  keyboard.fitToSong(item.song);
  await fontReady();
  renderer.render(item.song, { hands: player.hands, showNames: settings.showNames });
  player.load(item.song, { hands: item.hands, mode: 'learn' });
  // Les entrées sont activées lors du clic sur « Commencer » (geste utilisateur requis).
  $('#start-input').textContent = settings.input === 'screen' ? 'Entrée : clavier à l’écran' : 'Appuie sur Commencer pour connecter le piano MIDI.';
}

function openSong(i) {
  const def = SONGS[i];
  openPlayer({ kind: 'song', index: i, song: parseSong(def), hands: 'RL' });
}
function openLesson(i) {
  const l = LESSONS[i];
  openPlayer({ kind: 'lesson', index: i, lesson: l, song: parseSong(l.song), hands: l.hands });
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
  renderer.render(current.song, { hands: player.hands, showNames: settings.showNames });
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

function showResult(s) {
  const ov = $('#overlay-result');
  ov.hidden = false;
  const stars = s.stars;
  $('#result-stars').innerHTML = [1, 2, 3].map(i => `<span class="${i <= stars ? '' : 'off'}">★</span>`).join('');
  const pct = Math.round(s.accuracy * 100);
  let title, text;
  if (s.mode === 'demo') { title = 'Fin de l’écoute'; text = 'À toi de jouer !'; $('#result-stars').innerHTML = ''; }
  else if (s.mode === 'learn') { title = 'Bravo, terminé !'; text = `${s.stats.total} notes jouées, ${s.stats.wrong} fausse${s.stats.wrong > 1 ? 's' : ''} note${s.stats.wrong > 1 ? 's' : ''} en chemin.`; }
  else { title = stars === 3 ? 'Excellent !' : stars === 2 ? 'Bien joué !' : stars === 1 ? 'Pas mal, continue !' : 'Courage, on recommence ?'; text = `${pct} % de notes justes (${s.stats.hits}/${s.stats.total}), ${s.stats.misses} ratées, ${s.stats.wrong} fausses notes.`; }
  $('#result-title').textContent = title;
  $('#result-text').textContent = text;
  // Progression
  if (current.kind === 'lesson' && s.mode !== 'demo' && (s.mode === 'learn' || s.accuracy >= 0.7)) { store.lessons[current.lesson.id] = true; save(); renderLessons(); }
  if (current.kind === 'song' && s.mode === 'play' && player.hands === 'RL') {
    const best = store.songs[current.song.id];
    if (!best || s.accuracy > best.accuracy) { store.songs[current.song.id] = { accuracy: s.accuracy, stars }; save(); renderSongs(); }
  }
  const hasNext = current.kind === 'lesson' ? current.index + 1 < LESSONS.length : current.index + 1 < SONGS.length;
  $('#btn-result-next').hidden = !hasNext;
}

// Contrôles du lecteur
$('#btn-back').addEventListener('click', () => { player.stop(); showScreen('screen-home'); });
$('#btn-start').addEventListener('click', async () => {
  $('#start-input').textContent = 'Activation…';
  const label = await activateInputs();
  $('#start-input').textContent = 'Entrée : ' + label;
  $('#overlay-start').hidden = true;
  player.reset();
  player.start();
});
$('#btn-playpause').addEventListener('click', () => { synth.ensure(); if (player.finished) player.reset(); player.toggle(); });
$('#btn-restart').addEventListener('click', () => { player.reset(); $('#overlay-result').hidden = true; });
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
$('#btn-result-back').addEventListener('click', () => { $('#overlay-result').hidden = true; player.stop(); showScreen('screen-home'); });
$('#btn-result-replay').addEventListener('click', () => { $('#overlay-result').hidden = true; player.reset(); player.start(); });
$('#btn-result-next').addEventListener('click', () => {
  $('#overlay-result').hidden = true;
  if (current.kind === 'lesson') openLesson(current.index + 1); else openSong(current.index + 1);
});
let resizeTimer = null;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => renderer.resize(), 150); });

// Clavier d'ordinateur (pour tester sans piano) : touches a w s e d f t g y h u j k
const KEYMAP = { a: 60, w: 61, s: 62, e: 63, d: 64, f: 65, t: 66, g: 67, y: 68, h: 69, u: 70, j: 71, k: 72, o: 73, l: 74, p: 75, m: 76 };
const heldKeys = new Set();
window.addEventListener('keydown', (e) => {
  if (e.repeat || e.target.tagName === 'INPUT') return;
  if (e.key === ' ') { e.preventDefault(); if (!$('#screen-player').hidden && $('#overlay-start').hidden) player.toggle(); return; }
  const m = KEYMAP[e.key.toLowerCase()];
  if (m && !heldKeys.has(m)) { heldKeys.add(m); handleNote({ type: 'on', midi: m, velocity: 0.8, source: 'screen' }); }
});
window.addEventListener('keyup', (e) => {
  const m = KEYMAP[e.key.toLowerCase()];
  if (m) { heldKeys.delete(m); handleNote({ type: 'off', midi: m, source: 'screen' }); }
});

// ---------- Démarrage ----------
renderLessons();
renderSongs();
renderSettings();
updateInputStatus();
if (settings.input !== 'screen' && MidiInput.supported) {
  // Sur Chrome, requestMIDIAccess est possible sans geste ; on tente pour afficher l'état.
  setupMidi().then(() => updateInputStatus()).catch(() => {});
}
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Accès pour les tests automatisés
window.EasyPiano = { player, renderer, keyboard, synth, midi, openSong, openLesson, SONGS, LESSONS, parseSong,
  simulate(midi, on = true) { handleNote({ type: on ? 'on' : 'off', midi, velocity: 0.8, source: 'test' }); } };
