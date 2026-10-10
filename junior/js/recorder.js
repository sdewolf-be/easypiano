// Enregistrement des voix des parents, avec secours pour les navigateurs iPad limités.
//  1. MediaRecorder (Safari récent, Chrome, Firefox)
//  2. Web Audio brut → WAV, si le micro existe mais pas MediaRecorder
//  3. Import d'un fichier son (Dictaphone → Fichiers) si le navigateur n'a pas de micro (ex. MIDIWeb Browser)
// Les sons sont ramenés à 3,5 s maximum ; les imports et le secours sont convertis en WAV mono 16 kHz.

const MAX_SEC = 3.5;
const TARGET_RATE = 16000;

export const canUseMic = () => !!(navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function');

function toBase64(buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

// Rééchantillonne (moyenne simple) et encode en WAV 16 bits mono.
export function encodeWav(samples, rate) {
  const ratio = rate / TARGET_RATE;
  const n = Math.min(Math.floor(samples.length / ratio), Math.floor(MAX_SEC * TARGET_RATE));
  const out = new Int16Array(n);
  let peak = 0;
  for (let i = 0; i < samples.length; i++) peak = Math.max(peak, Math.abs(samples[i]));
  const gain = peak > 0.01 ? Math.min(4, 0.9 / peak) : 1;   // normalise le volume
  for (let i = 0; i < n; i++) {
    const a = Math.floor(i * ratio), b = Math.min(samples.length, Math.floor((i + 1) * ratio));
    let sum = 0; for (let j = a; j < b; j++) sum += samples[j];
    const v = Math.max(-1, Math.min(1, (sum / Math.max(1, b - a)) * gain));
    out[i] = v < 0 ? v * 0x8000 : v * 0x7fff;
  }
  const buf = new ArrayBuffer(44 + n * 2);
  const dv = new DataView(buf);
  const str = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
  str(0, 'RIFF'); dv.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
  dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
  dv.setUint32(24, TARGET_RATE, true); dv.setUint32(28, TARGET_RATE * 2, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true);
  str(36, 'data'); dv.setUint32(40, n * 2, true);
  new Int16Array(buf, 44).set(out);
  return { mime: 'audio/wav', data: toBase64(buf) };
}

// Retire le silence au début et à la fin (seuil bas).
function trimSilence(samples, rate) {
  const thr = 0.02;
  let a = 0, b = samples.length - 1;
  while (a < b && Math.abs(samples[a]) < thr) a++;
  while (b > a && Math.abs(samples[b]) < thr) b--;
  const pad = Math.floor(rate * 0.05);
  return samples.subarray(Math.max(0, a - pad), Math.min(samples.length, b + pad));
}

function decode(ctx, arrayBuffer) {
  return new Promise((res, rej) => { const r = ctx.decodeAudioData(arrayBuffer, res, rej); if (r && r.then) r.then(res, rej); });
}

// Fichier son choisi par l'utilisateur → clip WAV court.
export async function importAudioFile(file, ctx) {
  const buf = await decode(ctx, await file.arrayBuffer());
  const ch = buf.getChannelData(0);
  return encodeWav(trimSilence(ch, buf.sampleRate), buf.sampleRate);
}

// Demande le micro, avec un délai : certains navigateurs ne répondent jamais.
function getMic(timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(Object.assign(new Error('timeout'), { code: 'timeout' })), timeoutMs);
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
      .then(s => { clearTimeout(t); resolve(s); }, e => { clearTimeout(t); reject(e); });
  });
}

// Démarre un enregistrement. Renvoie { stop(), done } ; done se résout avec { mime, data } ou rejette.
export async function startRecording(ctx, { maxMs = 3000, onStart } = {}) {
  const stream = await getMic();
  const stopTracks = () => stream.getTracks().forEach(t => t.stop());
  if (window.MediaRecorder) {
    const mime = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'].find(m => { try { return MediaRecorder.isTypeSupported(m); } catch (e) { return false; } }) || '';
    let rec;
    try { rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined); } catch (e) { rec = null; }
    if (rec) {
      const chunks = [];
      let timer;
      const done = new Promise((resolve, reject) => {
        rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
        rec.onerror = (e) => { clearTimeout(timer); stopTracks(); reject(e.error || new Error('MediaRecorder')); };
        rec.onstop = async () => {
          clearTimeout(timer); stopTracks();
          const blob = new Blob(chunks, { type: rec.mimeType || mime || 'audio/webm' });
          if (blob.size < 500) return reject(Object.assign(new Error('empty'), { code: 'empty' }));
          // On repasse par Web Audio pour couper les silences et vérifier que le son se relit.
          try { const buf = await decode(ctx, await blob.arrayBuffer()); resolve(encodeWav(trimSilence(buf.getChannelData(0), buf.sampleRate), buf.sampleRate)); }
          catch (e) { resolve({ mime: blob.type, data: toBase64(await blob.arrayBuffer()) }); }
        };
      });
      rec.start(250);
      onStart && onStart();
      timer = setTimeout(() => { if (rec.state !== 'inactive') rec.stop(); }, maxMs);
      return { stop: () => { if (rec.state !== 'inactive') rec.stop(); }, done };
    }
  }
  // Secours : capture brute via Web Audio.
  const src = ctx.createMediaStreamSource(stream);
  const proc = ctx.createScriptProcessor(4096, 1, 1);
  const mute = ctx.createGain(); mute.gain.value = 0;
  const parts = [];
  proc.onaudioprocess = (e) => parts.push(new Float32Array(e.inputBuffer.getChannelData(0)));
  src.connect(proc); proc.connect(mute); mute.connect(ctx.destination);
  let finish;
  const done = new Promise((resolve, reject) => {
    finish = () => {
      try { src.disconnect(); proc.disconnect(); mute.disconnect(); } catch (e) { /* ignore */ }
      stopTracks();
      const len = parts.reduce((s, p) => s + p.length, 0);
      if (len < ctx.sampleRate * 0.2) return reject(Object.assign(new Error('empty'), { code: 'empty' }));
      const all = new Float32Array(len); let o = 0; for (const p of parts) { all.set(p, o); o += p.length; }
      resolve(encodeWav(trimSilence(all, ctx.sampleRate), ctx.sampleRate));
    };
  });
  onStart && onStart();
  let stopped = false;
  const stop = () => { if (stopped) return; stopped = true; clearTimeout(timer); finish(); };
  const timer = setTimeout(stop, maxMs);
  return { stop, done };
}

// Explication lisible d'une erreur d'accès au micro.
export function micErrorText(e) {
  const name = e && (e.code || e.name);
  if (name === 'timeout') return 'Le navigateur ne répond pas à la demande de micro. Utilisez « Importer » ci-dessous, ou enregistrez dans Safari puis transférez les voix.';
  if (name === 'NotAllowedError' || name === 'SecurityError') return 'Accès au micro refusé. Sur iPad : Réglages ▸ Safari (ou l’appli utilisée) ▸ Microphone ▸ Autoriser, puis rechargez la page.';
  if (name === 'NotFoundError') return 'Aucun micro trouvé sur cet appareil.';
  if (name === 'empty') return 'Rien n’a été enregistré : parlez juste après avoir appuyé, près de l’iPad.';
  return 'Enregistrement impossible : ' + (e && e.message ? e.message : e);
}
