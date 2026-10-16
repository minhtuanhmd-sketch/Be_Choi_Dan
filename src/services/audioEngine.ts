import { InstrumentType, NoteName } from '../types';
import { NOTE_FREQUENCIES } from '../data/songs';

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;
  private isMuted: boolean = false;

  public currentInstrument: InstrumentType = 'piano';

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      // Master Limiter to prevent clipping when kids mash multiple keys
      this.limiter = this.ctx.createDynamicsCompressor();
      this.limiter.threshold.setValueAtTime(-6, this.ctx.currentTime);
      this.limiter.knee.setValueAtTime(8, this.ctx.currentTime);
      this.limiter.ratio.setValueAtTime(14, this.ctx.currentTime);
      this.limiter.attack.setValueAtTime(0.002, this.ctx.currentTime);
      this.limiter.release.setValueAtTime(0.1, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime);

      this.limiter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.85, this.ctx.currentTime);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playNote(note: NoteName, customInstrument?: InstrumentType) {
    this.init();
    if (!this.ctx || !this.limiter || this.isMuted) return;

    const freq = NOTE_FREQUENCIES[note];
    if (!freq) return;

    const now = this.ctx.currentTime;
    const inst = customInstrument || this.currentInstrument;

    switch (inst) {
      case 'piano':
        this.playPiano(freq, now);
        break;
      case 'xylophone':
        this.playXylophone(freq, now);
        break;
      case 'musicbox':
        this.playMusicBox(freq, now);
        break;
      case 'funsynth':
        this.playFunSynth(freq, now);
        break;
      default:
        this.playPiano(freq, now);
    }
  }

  // 1. GRAND PIANO: Warm, rich harmonic sustain
  private playPiano(freq: number, now: number) {
    if (!this.ctx || !this.limiter) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq, now);
    osc2.detune.setValueAtTime(4, now); // subtle chorusing

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 1.2);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.8, now + 0.008);
    gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.6);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.limiter);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.45);
    osc2.stop(now + 1.45);
  }

  // 2. XYLOPHONE: FM Synthesis with crisp woody transient
  private playXylophone(freq: number, now: number) {
    if (!this.ctx || !this.limiter) return;

    const carrier = this.ctx.createOscillator();
    const modulator = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();

    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(freq, now);

    // Inharmonic multiplier 3.92 characteristic of wooden bars
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(freq * 3.92, now);

    modGain.gain.setValueAtTime(freq * 1.5, now);
    modGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08); // short wood click

    modulator.connect(carrier.frequency);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(Math.min(freq * 2, 4000), now);
    filter.Q.setValueAtTime(2, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.9, now + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    carrier.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.limiter);

    carrier.start(now);
    modulator.start(now);
    carrier.stop(now + 0.4);
    modulator.stop(now + 0.4);
  }

  // 3. MUSIC BOX: Delicate sparkling chimes
  private playMusicBox(freq: number, now: number) {
    if (!this.ctx || !this.limiter) return;

    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 3, now);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(350, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.7, now + 0.003);
    gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.8);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(filter);
    harmonic.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.limiter);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 1.85);
    harmonic.stop(now + 1.85);
  }

  // 4. FUN SYNTH: Cartoon pitch-bend sound
  private playFunSynth(freq: number, now: number) {
    if (!this.ctx || !this.limiter) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq * 0.75, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.18);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.85, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc.connect(gainNode);
    gainNode.connect(this.limiter);

    osc.start(now);
    osc.stop(now + 0.48);
  }

  // Magic sparkle sound for chest opening
  public playTreasureSound() {
    this.init();
    if (!this.ctx || !this.limiter || this.isMuted) return;

    const chimeNotes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chimeNotes.forEach((f, idx) => {
      if (!this.ctx || !this.limiter) return;
      const now = this.ctx.currentTime + idx * 0.1;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.limiter);

      osc.start(now);
      osc.stop(now + 0.55);
    });
  }

  // Fanfare chord for victory celebration
  public playFanfare() {
    this.init();
    if (!this.ctx || !this.limiter || this.isMuted) return;

    const chords: Array<{ notes: NoteName[]; time: number; dur: number }> = [
      { notes: ['C4', 'E4', 'G4'], time: 0, dur: 0.25 },
      { notes: ['E4', 'G4', 'C5'], time: 0.3, dur: 0.3 },
      { notes: ['G4', 'C5', 'E4'], time: 0.65, dur: 0.7 },
    ];

    chords.forEach((c) => {
      c.notes.forEach((note) => {
        if (!this.ctx || !this.limiter) return;
        const freq = NOTE_FREQUENCIES[note];
        if (!freq) return;
        const now = this.ctx.currentTime + c.time;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + c.dur);

        osc.connect(gain);
        gain.connect(this.limiter);

        osc.start(now);
        osc.stop(now + c.dur + 0.05);
      });
    });
  }

  // Applause / Cheer sound effect when recording finishes or plays
  public playCheerSound() {
    this.init();
    if (!this.ctx || !this.limiter || this.isMuted) return;

    // Filtered noise bursts simulating gentle applause
    const bufferSize = this.ctx.sampleRate * 1.5;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.limiter);

    whiteNoise.start(this.ctx.currentTime);
    whiteNoise.stop(this.ctx.currentTime + 1.5);
  }

  // Magical firework whoosh + pop + sparkle sound
  public playFireworkSound() {
    this.init();
    if (!this.ctx || !this.limiter || this.isMuted) return;

    const now = this.ctx.currentTime;

    // 1. Rising rocket whistle
    const rocketOsc = this.ctx.createOscillator();
    const rocketGain = this.ctx.createGain();
    rocketOsc.type = 'sine';
    rocketOsc.frequency.setValueAtTime(320, now);
    rocketOsc.frequency.exponentialRampToValueAtTime(1100, now + 0.3);

    rocketGain.gain.setValueAtTime(0.001, now);
    rocketGain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    rocketGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    rocketOsc.connect(rocketGain);
    rocketGain.connect(this.limiter);
    rocketOsc.start(now);
    rocketOsc.stop(now + 0.35);

    // 2. Burst pop + shimmering sparkles
    const burstTime = now + 0.3;
    const chimeFreqs = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
    chimeFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.limiter) return;
      const t = burstTime + idx * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.limiter);

      osc.start(t);
      osc.stop(t + 0.5);
    });
  }
}

export const audioEngine = new AudioEngine();
