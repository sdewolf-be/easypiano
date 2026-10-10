// EasyPiano Junior : initiation au piano pour les petits, avec Piou le poussin.
import { Synth } from '../../js/synth.js';
import { MidiInput } from '../../js/midi.js';
import { infoOf, nameOf, LETTER_ORDER, NOTE_INFO, isWhite, rangeFor } from './notes.js';
import { KidKeyboard } from './kidkeyboard.js';
import { Mascot } from './mascot.js';
import { Confetti, GameSounds } from './fx.js';
import { CHAPTERS, ACTIVITIES, DAILY_GOAL, findActivity, chapterOf, isUnlocked, nextActivity, chapterDone, chapterStars, totalStars, songActivities } from './course.js';
import { createActivity } from './activities.js';
import { SONGS } from './songs.js';

const STORE_KEY = 'easypiano.junior.v1';
const $ = (sel) => document.querySelector(sel);
const today = () => new Date().toISOString().slice(0, 10);

const defaults = {
  settings: { input: 'midi', midiDevice: 'all', midiSound: false, volume: 0.7, showNames: true, tolerant: true, voice: true, unlockAll: false, showKeyboard: true, name: '' },
  done: {},   // done[activityId] = { stars, date, errors }
  days: {},   // days['2026-10-10'] = nombre d'activités terminées ce jour-là
  celebratedDays: {},
};
let store = load();
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s) return { ...defaults, ...s, settings: { ...defaults.settings, ...(s.settings || {}) }, done: s.done || {}, days: s.days || {}, celebratedDays: s.celebratedDays || {} };
  } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(defaults));
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }
const settings = store.settings;

// ---------- Audio, entrées, mascottes ----------
const synth = new Synth();
synth.setVolume(settings.volume);
const sounds = new GameSounds(synth);
const confetti = new Confetti($('#confetti'));
const mascots = {
  home: new Mascot($('#mascot-home'), { voice: settings.voice }),
  chapter: new Mascot($('#mascot-chapter'), { voice: settings.voice }),
  play: new Mascot($('#mascot-play'), { voice: settings.voice }),
};
let gestured = false;      // un geste utilisateur a eu lieu (audio + voix autorisés)
let activity = null;       // activité en cours
let currentDef = null;
let freePlay = false;
let freeSpeak = true;
let activeInput = 'screen';

function handleNote(e) {
  const sound = e.source === 'screen' || e.source === 'test' || (e.source === 'midi' && settings.midiSound);
  if (e.type === 'on') {
    if (sound) synth.noteOn(e.midi, e.velocity || 0.8);
    const det = $('#midi-detected'); if (det && e.source === 'midi') det.textContent = nameOf(e.midi) + (Math.floor(e.midi / 12) - 1);
    if (activity) activity.noteOn(e.midi);
    else if (freePlay) freeNote(e.midi);
    else keyboard.setPressed(e.midi, 'down');
  } else {
    if (sound) synth.noteOff(e.midi);
    if (activity) activity.noteOff(e.midi); else keyboard.release(e.midi);
  }
}
const keyboard = new KidKeyboard($('#kb-area'), handleNote, { showNames: settings.showNames, low: 60, high: 72 });
const midi = new MidiInput(handleNote);
midi.onDevicesChanged = () => { updateInputStatus(); if (!$('#screen-parents').hidden) renderParents(); };

async function setupMidi(force = false) {
  if (!MidiInput.supported || settings.input === 'screen') return false;
  await midi.init(force);
  midi.select(settings.midiDevice);
  const ok = midi.connectedDevices().length > 0;
  activeInput = ok ? 'midi' : 'screen';
  return ok;
}

function updateInputStatus() {
  const el = $('#input-status');
  const devs = midi.connectedDevices();
  let label, cls = '';
  if (settings.input === 'screen') label = '🎹 Clavier à l’écran';
  else if (devs.length) { label = '🎹 Piano connecté : ' + devs.map(d => d.name).join(', '); cls = 'ok'; }
  else if (!MidiInput.supported) { label = 'Clavier à l’écran (pas de Web MIDI dans ce navigateur)'; cls = 'warn'; }
  else { label = 'Aucun piano détecté : clavier à l’écran'; cls = 'warn'; }
  el.textContent = label;
  el.className = 'input-status ' + cls;
}

// Premier geste : débloque l'audio (obligatoire sur iPad) et la voix.
function onFirstGesture() {
  if (gestured) return;
  gestured = true;
  synth.ensure();
  setupMidi(true).then(updateInputStatus).catch(() => {});
}
window.addEventListener('pointerdown', onFirstGesture, { capture: true });
window.addEventListener('keydown', onFirstGesture, { capture: true });

// ---------- Navigation ----------
function showScreen(id) {
  for (const s of document.querySelectorAll('.screen')) s.hidden = s.id !== id;
  window.scrollTo(0, 0);
}

function greeting() {
  const h = new Date().getHours();
  const name = settings.name ? ' ' + settings.name : '';
  const hello = h < 12 ? 'Bonjour' : h < 18 ? 'Coucou' : 'Bonsoir';
  const next = nextActivity(store.done, settings.unlockAll);
  const d = store.days[today()] || 0;
  if (d >= DAILY_GOAL) return `${hello}${name} ! Tu as déjà fini ta séance du jour. On rejoue ?`;
  if (!Object.keys(store.done).length) return `${hello}${name} ! Je suis Piou. On apprend le piano ensemble ?`;
  return `${hello}${name} ! On continue avec « ${next.title} » ?`;
}

function renderHome() {
  const done = store.done;
  const next = nextActivity(done, settings.unlockAll);
  $('#stars-total').textContent = '⭐ ' + totalStars(done);
  const d = store.days[today()] || 0;
  $('#daily').innerHTML = `<span class="daily-label">Aujourd’hui</span>` + Array.from({ length: DAILY_GOAL }, (_, i) => `<span class="heart ${i < d ? 'on' : ''}">♥</span>`).join('');
  const ch = next.chapter;
  $('#home-next').innerHTML = `<span class="chip" style="--c:${ch.color}">${ch.emoji} ${ch.title}</span> ${next.emoji} ${next.title}`;
  mascots.home.say(greeting(), { speak: false });
  // Parcours : un rond par chapitre, des petits points pour ses activités.
  $('#path').innerHTML = CHAPTERS.map((c, i) => {
    const unlocked = isUnlocked(c.activities[0], done, settings.unlockAll);
    const complete = chapterDone(c, done);
    const current = c === ch;
    const stars = chapterStars(c, done), max = c.activities.length * 3;
    return `<button class="island ${unlocked ? '' : 'locked'} ${complete ? 'complete' : ''} ${current ? 'current' : ''}" data-chapter="${c.id}" type="button" style="--c:${c.color}">
      <span class="island-num">${i + 1}</span>
      <span class="island-emoji">${unlocked ? c.emoji : '🔒'}</span>
      <span class="island-title">${c.title}</span>
      <span class="island-dots">${c.activities.map(a => `<i class="${done[a.id] ? 'on' : ''}"></i>`).join('')}</span>
      <span class="island-stars">${complete ? '⭐ ' + stars + '/' + max : ''}</span>
    </button>`;
  }).join('<span class="path-link"></span>');
  $('#stickers').innerHTML = `<span class="stickers-label">Mes gommettes</span>` + CHAPTERS.map(c => `<span class="sticker-slot ${chapterDone(c, done) ? 'won' : ''}">${chapterDone(c, done) ? c.sticker : '?'}</span>`).join('');
  updateInputStatus();
}

$('#path').addEventListener('click', (e) => {
  const b = e.target.closest('.island'); if (!b) return;
  const c = chapterOf(b.dataset.chapter);
  if (!isUnlocked(c.activities[0], store.done, settings.unlockAll)) { mascots.home.say('Ce chapitre est encore fermé. Finis d’abord le précédent !', { mood: 'think' }); return; }
  openChapter(c);
});
$('#btn-play').addEventListener('click', () => openActivity(nextActivity(store.done, settings.unlockAll)));
$('#btn-free').addEventListener('click', () => openFreePlay());
$('#btn-songs').addEventListener('click', () => openSongs());

// ---------- Chapitre ----------
let currentChapter = null;
function openChapter(c) {
  currentChapter = c;
  $('#chapter-title').textContent = `${c.emoji} ${c.title}`;
  $('#chapter-activities').innerHTML = c.activities.map((a, i) => {
    const d = store.done[a.id];
    const unlocked = isUnlocked(a, store.done, settings.unlockAll);
    return `<button class="act ${unlocked ? '' : 'locked'} ${d ? 'done' : ''}" data-id="${a.id}" type="button" style="--c:${c.color}">
      <span class="act-emoji">${unlocked ? a.emoji : '🔒'}</span>
      <span class="act-title"><small>${i + 1}</small> ${a.title}</span>
      <span class="act-stars">${d ? '⭐'.repeat(d.stars) + '<i>' + '⭐'.repeat(3 - d.stars) + '</i>' : ''}</span>
    </button>`;
  }).join('');
  showScreen('screen-chapter');
  mascots.chapter.say(c.intro, { mood: 'happy', speak: gestured });
}
$('#chapter-activities').addEventListener('click', (e) => {
  const b = e.target.closest('.act'); if (!b) return;
  const a = findActivity(b.dataset.id);
  if (!isUnlocked(a, store.done, settings.unlockAll)) { mascots.chapter.say('Celle-là est encore fermée. Fais d’abord la précédente !', { mood: 'think' }); return; }
  openActivity(a);
});
$('#btn-chapter-back').addEventListener('click', () => { mascots.chapter.hush(); renderHome(); showScreen('screen-home'); });

// ---------- Mes chansons ----------
function openSongs() {
  const list = songActivities(store.done, settings.unlockAll);
  $('#songs-list').innerHTML = list.length ? list.map(a => {
    const s = SONGS[a.song]; const d = store.done[a.id];
    return `<button class="act" data-id="${a.id}" type="button" style="--c:${a.chapter.color}">
      <span class="act-emoji">${s.emoji}</span><span class="act-title">${s.title}</span>
      <span class="act-stars">${d ? '⭐'.repeat(d.stars) + '<i>' + '⭐'.repeat(3 - d.stars) + '</i>' : ''}</span></button>`;
  }).join('') : '<p class="empty">Joue le premier chapitre pour débloquer ta première chanson !</p>';
  showScreen('screen-songs');
}
$('#songs-list').addEventListener('click', (e) => { const b = e.target.closest('.act'); if (b) openActivity(findActivity(b.dataset.id)); });
$('#btn-songs-back').addEventListener('click', () => { renderHome(); showScreen('screen-home'); });

// ---------- Activité ----------
const ctx = {
  kb: keyboard, mascot: mascots.play, synth, sounds, confetti, stage: $('#stage'),
  tolerant: () => settings.tolerant,
  showNames: () => settings.showNames,
  stickers: () => CHAPTERS.filter(c => chapterDone(c, store.done)).map(c => c.sticker),
  openSong: (songId) => { const a = ACTIVITIES.find(x => x.type === 'melody' && x.song === songId); if (a) openActivity(a); },
  markDone: (stars) => { if (currentDef) recordResult(currentDef, { stars, errors: 0 }, false); },
  finish: (result) => onFinished(result),
};

function openActivity(def) {
  stopActivity();
  currentDef = def; freePlay = false;
  const c = def.chapter;
  $('#play-title').textContent = `${def.emoji} ${def.title}`;
  $('#play-dots').innerHTML = c.activities.map(a => `<i class="${a === def ? 'cur' : store.done[a.id] ? 'on' : ''}"></i>`).join('');
  $('#overlay-result').hidden = true;
  showScreen('screen-play');
  $('#btn-voice').classList.toggle('on', settings.voice);
  activity = createActivity(def, ctx);
  activity.start();
}

function stopActivity() {
  if (activity) { activity.stop(); activity = null; }
  synth.allOff();
  confetti.stop();
  keyboard.clear();
}

function recordResult(def, result, countDay = true) {
  const prev = store.done[def.id];
  const stars = Math.max(result.stars, prev ? prev.stars : 0);
  const first = !prev;
  store.done[def.id] = { stars, date: today(), errors: result.errors };
  if (countDay && first) store.days[today()] = (store.days[today()] || 0) + 1;
  save();
  return { first, stars };
}

function onFinished(result) {
  const def = currentDef;
  const { first } = recordResult(def, result);
  const c = def.chapter;
  const chapterJustDone = first && chapterDone(c, store.done);
  const dayCount = store.days[today()] || 0;
  const dayJustDone = dayCount >= DAILY_GOAL && !store.celebratedDays[today()];
  if (dayJustDone) { store.celebratedDays[today()] = true; save(); }
  const stars = result.stars;
  const starsEl = $('#result-stars');
  starsEl.innerHTML = [1, 2, 3].map(i => `<span class="${i <= stars ? 'on' : 'off'}" style="animation-delay:${i * 0.25}s">★</span>`).join('');
  $('#result-title').textContent = stars === 3 ? 'Parfait !' : stars === 2 ? 'Bravo !' : 'Bien joué !';
  let text = '';
  if (chapterJustDone) text = `Chapitre terminé ! Tu gagnes une gommette ${c.sticker}`;
  else if (dayJustDone) text = 'Ta séance du jour est finie ! ♥♥♥';
  else if (stars < 3) text = 'Tu peux recommencer pour gagner toutes les étoiles.';
  $('#result-text').textContent = text;
  const next = nextAfter(def);
  $('#btn-result-next').hidden = !next;
  $('#overlay-result').hidden = false;
  if (chapterJustDone || dayJustDone) { confetti.burst(140); sounds.fanfare(); }
  else if (stars === 3) confetti.burst(60);
  const spoken = chapterJustDone ? `Bravo ! Tu as fini le chapitre ! Tu gagnes une gommette.` : dayJustDone ? 'Super ! Ta séance du jour est finie. À demain !' : stars === 3 ? 'Parfait ! Trois étoiles !' : stars === 2 ? 'Bravo ! Deux étoiles !' : 'Bien joué ! Une étoile.';
  setTimeout(() => mascots.play.say(spoken, { mood: 'party' }), 300);
}

function nextAfter(def) {
  const k = ACTIVITIES.indexOf(def);
  const n = ACTIVITIES[k + 1];
  if (!n) return null;
  return isUnlocked(n, store.done, settings.unlockAll) ? n : null;
}

$('#btn-result-replay').addEventListener('click', () => openActivity(currentDef));
$('#btn-result-next').addEventListener('click', () => { const n = nextAfter(currentDef); if (n) openActivity(n); });
$('#btn-result-home').addEventListener('click', () => { stopActivity(); renderHome(); showScreen('screen-home'); });
$('#btn-play-back').addEventListener('click', () => { stopActivity(); freePlay = false; renderHome(); showScreen('screen-home'); });
$('#btn-voice').addEventListener('click', () => {
  settings.voice = !settings.voice; save();
  for (const m of Object.values(mascots)) m.voice = settings.voice;
  $('#btn-voice').classList.toggle('on', settings.voice);
  if (!settings.voice) mascots.play.hush(); else mascots.play.say('Je parle à nouveau !', { mood: 'happy' });
});

// ---------- Piano libre ----------
function openFreePlay() {
  stopActivity();
  currentDef = null; freePlay = true;
  $('#play-title').textContent = '🎹 Piano libre';
  $('#play-dots').innerHTML = '';
  $('#overlay-result').hidden = true;
  $('#btn-voice').classList.toggle('on', settings.voice);
  keyboard.setRange(...rangeFor([55, 72]));
  $('#stage').innerHTML = `<div class="stage-center free"><div class="target"><div class="nbubble xl ghost"><span class="nname">?</span></div></div>
    <div class="legend">${LETTER_ORDER.map(l => `<span class="legend-item" style="--c:${NOTE_INFO[l].color};--ink:${NOTE_INFO[l].ink}">${NOTE_INFO[l].name}</span>`).join('')}</div>
    <button class="kbtn toggle on" id="btn-free-speak" type="button">🗣️ Piou dit les notes</button></div>`;
  $('#btn-free-speak').addEventListener('click', (e) => { freeSpeak = !freeSpeak; e.currentTarget.classList.toggle('on', freeSpeak); });
  showScreen('screen-play');
  mascots.play.say('Joue ce que tu veux ! Je te dis le nom des notes.', { mood: 'happy', speak: gestured });
}
let freeTimer = null;
function freeNote(midi) {
  keyboard.setPressed(midi, 'down');
  const info = infoOf(midi);
  const t = $('#stage .target');
  if (!t) return;
  t.innerHTML = '';
  if (info) {
    const b = document.createElement('div');
    b.className = 'nbubble xl pulse';
    b.style.setProperty('--c', info.color); b.style.setProperty('--cd', info.dark); b.style.setProperty('--ink', info.ink);
    b.innerHTML = `<span class="nname">${info.name}</span>`;
    t.appendChild(b);
    if (freeSpeak) { clearTimeout(freeTimer); freeTimer = setTimeout(() => mascots.play.say(info.name, { mood: 'sing', interrupt: true }), 60); }
    else mascots.play.say(info.name, { mood: 'sing', speak: false });
  } else {
    t.innerHTML = '<div class="nbubble xl black"><span class="nname">♯</span></div>';
    mascots.play.say('Une touche noire !', { mood: 'think', speak: false });
  }
}

// ---------- Coin des parents (appui long sur la roue) ----------
let holdTimer = null;
const gear = $('#btn-parents');
const startHold = (e) => { e.preventDefault(); gear.classList.add('holding'); holdTimer = setTimeout(() => { gear.classList.remove('holding'); openParents(); }, 1200); };
const cancelHold = () => { clearTimeout(holdTimer); gear.classList.remove('holding'); };
gear.addEventListener('pointerdown', startHold);
gear.addEventListener('pointerup', cancelHold);
gear.addEventListener('pointerleave', cancelHold);
gear.addEventListener('pointercancel', cancelHold);
gear.addEventListener('click', () => { if (!$('#screen-parents').hidden) return; mascots.home.say('Appuie longtemps sur la roue pour le coin des parents.', { speak: false }); });

function openParents() {
  renderParents();
  showScreen('screen-parents');
}
function renderParents() {
  const devs = midi.devices();
  const doneCount = Object.keys(store.done).length;
  $('#parents-body').innerHTML = `
    <div class="pcard">
      <h3>Comment ça marche</h3>
      <p>Piou présente les notes une par une, chacune avec <b>sa couleur</b>, toujours la même quelle que soit l’octave.
      Collez des gommettes des mêmes couleurs sur les touches du piano (au moins de Do à Do autour du Do du milieu, idéalement aussi Sol, La, Si juste en dessous) :</p>
      <div class="legend big">${LETTER_ORDER.map(l => `<span class="legend-item" style="--c:${NOTE_INFO[l].color};--ink:${NOTE_INFO[l].ink}">${NOTE_INFO[l].name}<small>${NOTE_INFO[l].colorName}</small></span>`).join('')}</div>
      <p>Le cours compte ${CHAPTERS.length} chapitres et ${ACTIVITIES.length} activités de 2 à 4 minutes ; l’objectif est de <b>${DAILY_GOAL} activités par jour</b> (environ 10 minutes, les cœurs en haut de l’accueil).
      Une activité terminée en débloque une autre ; les chapitres terminés donnent une gommette. L’enfant ne sait pas lire : Piou lit ses bulles à voix haute (voix de synthèse du navigateur) et vous restez à côté pour l’aider.</p>
    </div>
    <div class="pcard">
      <h3>Prénom</h3>
      <p><input type="text" id="p-name" value="${settings.name.replace(/"/g, '&quot;')}" placeholder="Prénom de l’enfant (facultatif)"></p>
    </div>
    <div class="pcard">
      <h3>Piano</h3>
      <label class="radio"><input type="radio" name="input" value="midi" ${settings.input === 'midi' ? 'checked' : ''}> Piano MIDI (Bluetooth ou USB) ${MidiInput.supported ? '' : '— <i>non supporté par ce navigateur</i>'}</label>
      <label class="radio"><input type="radio" name="input" value="screen" ${settings.input === 'screen' ? 'checked' : ''}> Clavier à l’écran seulement</label>
      ${MidiInput.supported ? `
        <p>Pianos détectés : <b>${devs.length ? devs.map(d => d.name).join(', ') : 'aucun'}</b> <button class="kbtn small" id="btn-midi-scan" type="button">Rechercher</button></p>
        <p>Utiliser : <select id="midi-device"><option value="all">Tous les périphériques</option>${devs.map(d => `<option value="${d.id}" ${settings.midiDevice === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}</select></p>
        <label class="radio"><input type="checkbox" id="midi-sound" ${settings.midiSound ? 'checked' : ''}> Faire sonner les notes MIDI dans l’appli (si le piano est muet)</label>
        <p>Test : joue une note sur le piano → <span class="detected" id="midi-detected"></span></p>
      ` : '<p>Sur iPad, Safari ne gère pas le Web MIDI : ouvre cette page dans l’appli <b>MIDIWeb Browser</b> (App Store) après avoir jumelé le piano en Bluetooth MIDI. Voir les réglages de l’appli EasyPiano.</p>'}
    </div>
    <div class="pcard">
      <h3>Options</h3>
      <label class="radio"><input type="checkbox" id="p-tolerant" ${settings.tolerant ? 'checked' : ''}> Accepter la bonne note dans n’importe quelle octave (recommandé au début)</label>
      <label class="radio"><input type="checkbox" id="p-voice" ${settings.voice ? 'checked' : ''}> Piou parle (voix de synthèse en français)</label>
      <label class="radio"><input type="checkbox" id="p-names" ${settings.showNames ? 'checked' : ''}> Écrire le nom des notes sur les gommettes et les bulles</label>
      <label class="radio"><input type="checkbox" id="p-unlock" ${settings.unlockAll ? 'checked' : ''}> Débloquer toutes les activités</label>
      <p>Volume : <input type="range" id="p-volume" min="0" max="1" step="0.05" value="${settings.volume}"></p>
    </div>
    <div class="pcard">
      <h3>Progression</h3>
      <p>${doneCount} activité(s) terminée(s), ${totalStars(store.done)} étoiles.</p>
      <p><button class="kbtn small danger" id="p-reset" type="button">Remettre la progression à zéro</button></p>
    </div>
    <div class="pcard">
      <p><a href="../">← EasyPiano, la version pour les grands</a></p>
    </div>`;
  const root = $('#parents-body');
  root.querySelector('#p-name').addEventListener('change', (e) => { settings.name = e.target.value.trim(); save(); });
  for (const r of root.querySelectorAll('input[name=input]')) r.addEventListener('change', async () => { settings.input = r.value; save(); if (settings.input === 'midi') await setupMidi(true); else activeInput = 'screen'; updateInputStatus(); renderParents(); });
  root.querySelector('#btn-midi-scan')?.addEventListener('click', async () => { await setupMidi(true); updateInputStatus(); renderParents(); });
  root.querySelector('#midi-device')?.addEventListener('change', (e) => { settings.midiDevice = e.target.value; midi.select(e.target.value); save(); });
  root.querySelector('#midi-sound')?.addEventListener('change', (e) => { settings.midiSound = e.target.checked; save(); });
  root.querySelector('#p-tolerant').addEventListener('change', (e) => { settings.tolerant = e.target.checked; save(); });
  root.querySelector('#p-voice').addEventListener('change', (e) => { settings.voice = e.target.checked; for (const m of Object.values(mascots)) m.voice = settings.voice; save(); });
  root.querySelector('#p-names').addEventListener('change', (e) => { settings.showNames = e.target.checked; keyboard.setShowNames(settings.showNames); save(); });
  root.querySelector('#p-unlock').addEventListener('change', (e) => { settings.unlockAll = e.target.checked; save(); });
  root.querySelector('#p-volume').addEventListener('input', (e) => { settings.volume = parseFloat(e.target.value); synth.setVolume(settings.volume); save(); });
  root.querySelector('#p-reset').addEventListener('click', () => { if (confirm('Effacer toute la progression ?')) { store.done = {}; store.days = {}; store.celebratedDays = {}; save(); renderParents(); } });
}
$('#btn-parents-back').addEventListener('click', () => { renderHome(); showScreen('screen-home'); });

// Clavier d'ordinateur (pour tester sans piano) : a w s e d f t g y h u j k … et q z x c v b n pour Sol3…Si3
const KEYMAP = { a: 60, w: 61, s: 62, e: 63, d: 64, f: 65, t: 66, g: 67, y: 68, h: 69, u: 70, j: 71, k: 72, o: 73, l: 74, p: 75, m: 76, z: 55, x: 57, c: 59 };
const heldKeys = new Set();
window.addEventListener('keydown', (e) => {
  if (e.repeat || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.metaKey || e.ctrlKey) return;
  const m = KEYMAP[e.key.toLowerCase()];
  if (m && !heldKeys.has(m)) { heldKeys.add(m); handleNote({ type: 'on', midi: m, velocity: 0.8, source: 'screen' }); }
});
window.addEventListener('keyup', (e) => {
  const m = KEYMAP[e.key.toLowerCase()];
  if (m) { heldKeys.delete(m); handleNote({ type: 'off', midi: m, source: 'screen' }); }
});
window.addEventListener('resize', () => { const c = $('#confetti'); c.width = c.clientWidth; c.height = c.clientHeight; });

// ---------- Démarrage ----------
renderHome();
showScreen('screen-home');
if (settings.input !== 'screen') {
  const tryMidi = (attempt) => {
    if (MidiInput.supported) { setupMidi(attempt > 0).then(updateInputStatus).catch(() => {}); if (attempt < 2) setTimeout(() => tryMidi(attempt + 1), 2500); }
    else if (attempt < 6) setTimeout(() => tryMidi(attempt + 1), 700);
    else updateInputStatus();
  };
  tryMidi(0);
}
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Accès pour les tests automatisés
window.EasyPianoJunior = {
  get activity() { return activity; }, get store() { return store; }, keyboard, synth, midi, mascots, CHAPTERS, ACTIVITIES, SONGS,
  openActivity, openFreePlay, openSongs, openChapter, openParents, findActivity, isWhite,
  simulate(m, on = true, velocity = 0.8) { handleNote({ type: on ? 'on' : 'off', midi: m, velocity, source: 'test' }); },
};
