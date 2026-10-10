// Entrée MIDI (Web MIDI API) : piano USB ou Bluetooth.
// Tolérant aux implémentations anciennes (navigateurs iPad à base de polyfill) :
// inputs sous forme de Map, de fonction ou de tableau, propriété state absente, etc.
export class MidiInput {
  constructor(onNote) {
    this.onNote = onNote;
    this.access = null;
    this.selected = 'all';
    this.onDevicesChanged = null;
    this.error = null;
    this.log = [];          // derniers événements reçus (diagnostic)
    this.messageCount = 0;
    this.lastMessageAt = null;
  }

  static get supported() {
    return typeof navigator !== 'undefined' && typeof navigator.requestMIDIAccess === 'function';
  }

  async init(force = false) {
    if (!MidiInput.supported) {
      this.error = 'Web MIDI non disponible dans ce navigateur';
      return false;
    }
    if (this.access && !force) { this._bind(); return true; }
    try {
      let p;
      try { p = navigator.requestMIDIAccess({ sysex: false }); } catch (e) { p = navigator.requestMIDIAccess(); }
      this.access = await p;
      this.error = null;
      this._log('Accès MIDI obtenu, ' + this._inputs().length + ' entrée(s)');
      try {
        this.access.onstatechange = (e) => {
          this._log('Changement : ' + (e && e.port ? `${e.port.name || e.port.id} ${e.port.state || ''}` : 'périphériques'));
          this._bind();
          if (this.onDevicesChanged) this.onDevicesChanged(this.devices());
        };
      } catch (e) { /* onstatechange non supporté */ }
      this._bind();
      return true;
    } catch (e) {
      this.error = 'Accès MIDI refusé : ' + (e && e.message ? e.message : e);
      this._log(this.error);
      return false;
    }
  }

  _inputs() {
    const list = [];
    if (!this.access) return list;
    let inp = this.access.inputs;
    try {
      if (typeof inp === 'function') inp = inp.call(this.access);
      if (!inp) return list;
      if (typeof inp.values === 'function') { for (const i of inp.values()) list.push(i); }
      else if (typeof inp.forEach === 'function') { inp.forEach((i) => list.push(i)); }
      else if (typeof inp.length === 'number') { for (let k = 0; k < inp.length; k++) list.push(inp[k]); }
      else { for (const k of Object.keys(inp)) if (inp[k] && typeof inp[k] === 'object') list.push(inp[k]); }
    } catch (e) {
      this._log('Lecture des entrées impossible : ' + e.message);
    }
    return list;
  }

  devices() {
    return this._inputs().map((i, k) => ({
      id: i.id != null ? String(i.id) : 'in' + k,
      name: i.name || i.manufacturer || ('Périphérique MIDI ' + (k + 1)),
      // Sans propriété state (anciennes implémentations), on considère le port connecté.
      state: i.state || 'connected',
      connection: i.connection || '',
    }));
  }

  connectedDevices() {
    return this.devices().filter(d => d.state === 'connected');
  }

  select(id) {
    this.selected = id;
    this._bind();
  }

  _bind() {
    const inputs = this._inputs();
    inputs.forEach((input, k) => {
      const id = input.id != null ? String(input.id) : 'in' + k;
      const want = this.selected === 'all' || this.selected === id;
      try {
        input.onmidimessage = want ? (msg) => this._message(msg) : null;
        if (want && typeof input.open === 'function') { const r = input.open(); if (r && r.catch) r.catch(() => {}); }
      } catch (e) {
        this._log('Impossible d’écouter ' + id + ' : ' + e.message);
      }
    });
  }

  _message(msg) {
    const data = msg && msg.data;
    if (!data || data.length < 1) return;
    this.messageCount++;
    this.lastMessageAt = Date.now();
    const status = data[0], d1 = data[1], d2 = data[2];
    const type = status & 0xF0;
    if (type === 0x90 && d2 > 0) {
      this._log(`Note ON ${d1} vél. ${d2}`);
      this.onNote({ type: 'on', midi: d1, velocity: d2 / 127, source: 'midi' });
    } else if (type === 0x80 || (type === 0x90 && d2 === 0)) {
      this.onNote({ type: 'off', midi: d1, source: 'midi' });
    } else if (status !== 0xF8 && status !== 0xFE) {
      this._log('Message ' + Array.from(data).map(b => b.toString(16)).join(' '));
    }
  }

  _log(text) {
    const t = new Date();
    this.log.push(`${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}:${String(t.getSeconds()).padStart(2, '0')} ${text}`);
    if (this.log.length > 8) this.log.shift();
  }

  diagnostic() {
    const inputs = this._inputs();
    return {
      supported: MidiInput.supported,
      access: !!this.access,
      error: this.error,
      inputsType: this.access ? (typeof this.access.inputs) + (this.access.inputs && this.access.inputs.constructor ? ' ' + this.access.inputs.constructor.name : '') : '-',
      inputs: inputs.map(i => ({ id: i.id, name: i.name, manufacturer: i.manufacturer, state: i.state, connection: i.connection, type: i.type })),
      messageCount: this.messageCount,
      lastMessageAt: this.lastMessageAt,
      userAgent: navigator.userAgent,
    };
  }
}
