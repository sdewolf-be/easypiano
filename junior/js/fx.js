// Effets : confettis (canvas) et petits sons de jeu (via le synthétiseur).
export class Confetti {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.parts = [];
    this.raf = null;
    this.colors = ['#ff4b4b', '#ff9b1a', '#ffd400', '#3ecf5a', '#2f96ff', '#9b5cff', '#ff5fb9'];
  }

  burst(n = 80, { x = null, y = null, spread = 1 } = {}) {
    const c = this.canvas;
    c.width = c.clientWidth || window.innerWidth;
    c.height = c.clientHeight || window.innerHeight;
    const cx = x ?? c.width / 2, cy = y ?? c.height * 0.35;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = (4 + Math.random() * 9) * spread;
      this.parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, r: 4 + Math.random() * 6, color: this.colors[i % this.colors.length], rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3, life: 90 + Math.random() * 60 });
    }
    c.hidden = false;
    if (!this.raf) this._tick();
  }

  rain(n = 40) {
    const c = this.canvas;
    c.width = c.clientWidth || window.innerWidth;
    c.height = c.clientHeight || window.innerHeight;
    for (let i = 0; i < n; i++) {
      this.parts.push({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, vx: (Math.random() - 0.5) * 2, vy: 2 + Math.random() * 3, r: 4 + Math.random() * 6, color: this.colors[i % this.colors.length], rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.2, life: 200 + Math.random() * 100 });
    }
    c.hidden = false;
    if (!this.raf) this._tick();
  }

  _tick() {
    const ctx = this.ctx, c = this.canvas;
    ctx.clearRect(0, 0, c.width, c.height);
    this.parts = this.parts.filter(p => p.life > 0 && p.y < c.height + 20);
    for (const p of this.parts) {
      p.vy += 0.25; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(1, p.life / 30);
      ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
      ctx.restore();
    }
    if (this.parts.length) this.raf = requestAnimationFrame(() => this._tick());
    else { this.raf = null; c.hidden = true; }
  }

  stop() { this.parts = []; }
}

// Sons de jeu joués par le synthétiseur de l'application.
export class GameSounds {
  constructor(synth) { this.synth = synth; }
  success() {
    const t = this.synth.now;
    [72, 76, 79, 84].forEach((m, i) => this.synth.playNote(m, 0.25, 0.5, t + i * 0.09));
  }
  fanfare() {
    const t = this.synth.now;
    [[60, 0], [64, 0.12], [67, 0.24], [72, 0.36], [67, 0.6], [72, 0.72], [76, 0.84], [79, 1.0], [84, 1.25]].forEach(([m, d]) => this.synth.playNote(m, 0.35, 0.6, t + d));
  }
  oops() {
    const t = this.synth.now;
    this.synth.playNote(52, 0.18, 0.35, t);
    this.synth.playNote(48, 0.3, 0.3, t + 0.16);
  }
  pop() { this.synth.playNote(88, 0.08, 0.3); }
}
