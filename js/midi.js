// Entrée MIDI (Web MIDI API) : piano USB ou Bluetooth.
export class MidiInput {
  constructor(onNote) {
    this.onNote = onNote;
    this.access = null;
    this.selected = 'all';
    this.onDevicesChanged = null;
    this.error = null;
  }

  static get supported() {
    return typeof navigator !== 'undefined' && !!navigator.requestMIDIAccess;
  }

  async init() {
    if (!MidiInput.supported) {
      this.error = 'Web MIDI non disponible dans ce navigateur';
      return false;
    }
    try {
      this.access = await navigator.requestMIDIAccess({ sysex: false });
      this.access.onstatechange = () => { this._bind(); this.onDevicesChanged && this.onDevicesChanged(this.devices()); };
      this._bind();
      return true;
    } catch (e) {
      this.error = 'Accès MIDI refusé : ' + (e.message || e);
      return false;
    }
  }

  devices() {
    if (!this.access) return [];
    return [...this.access.inputs.values()].map(i => ({ id: i.id, name: i.name || 'Périphérique MIDI', state: i.state }));
  }

  select(id) {
    this.selected = id;
    this._bind();
  }

  _bind() {
    if (!this.access) return;
    for (const input of this.access.inputs.values()) {
      input.onmidimessage = (this.selected === 'all' || this.selected === input.id) ? (msg) => this._message(msg) : null;
    }
  }

  _message(msg) {
    const [status, d1, d2] = msg.data;
    const type = status & 0xF0;
    if (type === 0x90 && d2 > 0) this.onNote({ type: 'on', midi: d1, velocity: d2 / 127, source: 'midi' });
    else if (type === 0x80 || (type === 0x90 && d2 === 0)) this.onNote({ type: 'off', midi: d1, source: 'midi' });
  }
}
