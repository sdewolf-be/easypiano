// Petit synthétiseur de piano (Web Audio) : son du clavier virtuel, accompagnement, métronome.
import { midiToFreq } from './music.js';

export class Synth {
  constructor() {
    this.ctx = null;
    this.voices = new Map();
    this.volume = 0.6;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC({ latencyHint: 'interactive' });
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume;
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.ratio.value = 4;
      this.master.connect(comp).connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  setVolume(v) {
    this.volume = v;
    if (this.master) this.master.gain.value = v;
  }

  get now() { return this.ensure().currentTime; }

  noteOn(midi, vel = 0.8, when = null) {
    const ctx = this.ensure();
    const t = when ?? ctx.currentTime;
    this.noteOff(midi, t);
    const f = midiToFreq(midi);
    const out = ctx.createGain();
    out.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(12000, f * 8), t);
    filter.frequency.exponentialRampToValueAtTime(Math.min(8000, f * 3), t + 1.2);
    out.connect(filter).connect(this.master);
    const partials = [[1, 1], [2, 0.45], [3, 0.22], [4, 0.1], [0.5, 0.08]];
    const oscs = partials.map(([mult, gain]) => {
      const o = ctx.createOscillator();
      o.type = mult === 1 ? 'triangle' : 'sine';
      o.frequency.value = f * mult;
      const g = ctx.createGain();
      g.gain.value = gain;
      o.connect(g).connect(out);
      o.start(t);
      return o;
    });
    const peak = 0.28 * vel;
    out.gain.setValueAtTime(0, t);
    out.gain.linearRampToValueAtTime(peak, t + 0.006);
    out.gain.setTargetAtTime(peak * 0.45, t + 0.006, 0.35);
    out.gain.setTargetAtTime(0.0001, t + 0.4, 1.6);
    const voice = { oscs, out, stop: null };
    voice.stop = (tt) => {
      out.gain.cancelScheduledValues(tt);
      out.gain.setValueAtTime(out.gain.value, tt);
      out.gain.setTargetAtTime(0.0001, tt, 0.06);
      oscs.forEach(o => { try { o.stop(tt + 0.4); } catch (e) { /* déjà arrêté */ } });
    };
    this.voices.set(midi, voice);
    // Sécurité : libération automatique après 6 s
    oscs.forEach(o => { try { o.stop(t + 6); } catch (e) { /* ignore */ } });
    setTimeout(() => { if (this.voices.get(midi) === voice) this.voices.delete(midi); }, 6500);
  }

  noteOff(midi, when = null) {
    const voice = this.voices.get(midi);
    if (!voice) return;
    const t = when ?? this.ensure().currentTime;
    voice.stop(t);
    this.voices.delete(midi);
  }

  playNote(midi, durSec, vel = 0.7, when = null) {
    const ctx = this.ensure();
    const t = when ?? ctx.currentTime;
    this.noteOn(midi, vel, t);
    const voice = this.voices.get(midi);
    setTimeout(() => { if (this.voices.get(midi) === voice) this.noteOff(midi); }, Math.max(50, durSec * 1000 - 30));
  }

  click(accent = false, when = null) {
    const ctx = this.ensure();
    const t = when ?? ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = accent ? 1600 : 1100;
    const g = ctx.createGain();
    g.gain.setValueAtTime(accent ? 0.25 : 0.15, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.06);
  }

  allOff() {
    for (const midi of [...this.voices.keys()]) this.noteOff(midi);
  }
}
