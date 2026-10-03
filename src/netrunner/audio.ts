import { AMBIENT_LOOP_SECONDS, AMBIENT_SRC, VOICE_SRC, VoiceId } from './scene';

const MUSIC_LEVEL = 0.32;
const MUSIC_DUCKED = 0.1;

type Ctx = AudioContext;

/**
 * Netrunner audio: one AudioContext, three buses (music / voice / sfx).
 * The ambient loop is sample-accurate (AudioBufferSourceNode.loop), voice
 * lines run through a light "comm channel" EQ and duck the music, and all
 * UI sounds are synthesized here — no third-party samples.
 * Must be created from a user gesture (autoplay policy).
 */
export class NetrunnerAudio {
  private ctx: Ctx;
  private master: GainNode;
  private music: GainNode;
  private voice: GainNode;
  private sfx: GainNode;
  private buffers = new Map<string, Promise<AudioBuffer>>();
  private musicSrc: AudioBufferSourceNode | null = null;
  private voiceSrc: AudioBufferSourceNode | null = null;
  private noise: AudioBuffer;

  constructor() {
    const AC: typeof AudioContext =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(this.ctx.destination);

    this.music = this.ctx.createGain();
    this.music.gain.value = 0;
    this.music.connect(this.master);

    // Comm-channel voice chain: trim lows, lift presence a touch.
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 140;
    const presence = this.ctx.createBiquadFilter();
    presence.type = 'peaking';
    presence.frequency.value = 2600;
    presence.Q.value = 0.9;
    presence.gain.value = 3;
    this.voice = this.ctx.createGain();
    this.voice.gain.value = 1;
    this.voice.connect(hp);
    hp.connect(presence);
    presence.connect(this.master);

    this.sfx = this.ctx.createGain();
    this.sfx.gain.value = 0.22;
    this.sfx.connect(this.master);

    const len = Math.floor(this.ctx.sampleRate * 0.4);
    this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
  }

  resume() {
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  }

  private load(url: string): Promise<AudioBuffer> {
    let p = this.buffers.get(url);
    if (!p) {
      p = fetch(url)
        .then((r) => {
          if (!r.ok) throw new Error(`audio ${r.status}`);
          return r.arrayBuffer();
        })
        .then((ab) => this.ctx.decodeAudioData(ab));
      this.buffers.set(url, p);
      p.catch(() => this.buffers.delete(url));
    }
    return p;
  }

  preloadVoices() {
    Object.values(VOICE_SRC).forEach((u) => void this.load(u).catch(() => {}));
  }

  async startMusic() {
    if (this.musicSrc) return;
    const probe = document.createElement('audio');
    const useOgg = probe.canPlayType('audio/ogg; codecs="opus"') !== '';
    let buf: AudioBuffer;
    try {
      buf = await this.load(useOgg ? AMBIENT_SRC.ogg : AMBIENT_SRC.mp3);
    } catch {
      buf = await this.load(AMBIENT_SRC.mp3);
    }
    if (this.musicSrc) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    // MP3 decoders may keep encoder padding; loop over the exact musical span.
    const pad = Math.max(0, buf.duration - AMBIENT_LOOP_SECONDS);
    if (pad > 0.005) {
      src.loopStart = Math.min(pad, 0.03);
      src.loopEnd = src.loopStart + AMBIENT_LOOP_SECONDS;
    }
    src.connect(this.music);
    src.start(0, src.loopStart);
    this.musicSrc = src;
    this.ramp(this.music.gain, this.voiceSrc ? MUSIC_DUCKED : MUSIC_LEVEL, 1.6);
  }

  stopMusic() {
    const src = this.musicSrc;
    if (!src) return;
    this.musicSrc = null;
    this.ramp(this.music.gain, 0, 0.5);
    window.setTimeout(() => {
      try {
        src.stop();
      } catch {
        /* already stopped */
      }
    }, 600);
  }

  get musicOn() {
    return this.musicSrc !== null;
  }

  /** Play a voice line; resolves when it ends or is interrupted. */
  async playVoice(id: VoiceId): Promise<void> {
    this.stopVoice();
    let buf: AudioBuffer;
    try {
      buf = await this.load(VOICE_SRC[id]);
    } catch {
      return;
    }
    this.stopVoice();
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(this.voice);
    this.voiceSrc = src;
    if (this.musicSrc) this.ramp(this.music.gain, MUSIC_DUCKED, 0.25);
    this.glitch(0.12);
    src.start(this.ctx.currentTime + 0.08);
    await new Promise<void>((resolve) => {
      src.onended = () => resolve();
    });
    if (this.voiceSrc === src) {
      this.voiceSrc = null;
      if (this.musicSrc) this.ramp(this.music.gain, MUSIC_LEVEL, 1.2);
    }
  }

  stopVoice() {
    const src = this.voiceSrc;
    if (!src) return;
    this.voiceSrc = null;
    try {
      src.stop();
    } catch {
      /* already stopped */
    }
    if (this.musicSrc) this.ramp(this.music.gain, MUSIC_LEVEL, 0.8);
  }

  /** Short rising chirp for hover/focus. */
  hover() {
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(1300, t);
    o.frequency.exponentialRampToValueAtTime(2100, t + 0.05);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    o.connect(g).connect(this.sfx);
    o.start(t);
    o.stop(t + 0.08);
  }

  /** Two-step confirm blip. */
  confirm() {
    const t = this.ctx.currentTime;
    [0, 0.07].forEach((dt, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'square';
      o.frequency.value = i ? 880 : 587;
      g.gain.setValueAtTime(0.0001, t + dt);
      g.gain.exponentialRampToValueAtTime(0.18, t + dt + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.06);
      o.connect(g).connect(this.sfx);
      o.start(t + dt);
      o.stop(t + dt + 0.07);
    });
  }

  /** Low buzz for a failed action. */
  deny() {
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(140, t);
    o.frequency.linearRampToValueAtTime(90, t + 0.22);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    o.connect(g).connect(this.sfx);
    o.start(t);
    o.stop(t + 0.26);
    this.glitch(0.1);
  }

  /** Band-passed noise burst — the "signal tear". */
  glitch(dur = 0.18) {
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(3200, t);
    bp.frequency.exponentialRampToValueAtTime(700, t + dur);
    bp.Q.value = 4;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp).connect(g).connect(this.sfx);
    src.start(t, Math.random() * 0.2, dur + 0.02);
  }

  close() {
    this.stopVoice();
    try {
      this.musicSrc?.stop();
    } catch {
      /* noop */
    }
    this.musicSrc = null;
    void this.ctx.close();
  }

  private ramp(param: AudioParam, to: number, seconds: number) {
    const t = this.ctx.currentTime;
    param.cancelScheduledValues(t);
    param.setValueAtTime(param.value, t);
    param.linearRampToValueAtTime(to, t + seconds);
  }
}
