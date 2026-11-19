/**
 * Procedural Web Audio synthesizer for Nexloop:
 * 1. Continuous wind/air stream whose bandpass cutoff, resonance Q, pitch inflection,
 *    and stereo pan bend dynamically with the infinity ribbon curvature and speed.
 * 2. Clean, modern harmonic chord resolve on completion.
 */

import type { WindAudioParams } from './ribbonGeometry';

interface WindVoice {
  source: AudioBufferSourceNode;
  bodyFilter: BiquadFilterNode;
  breathFilter: BiquadFilterNode;
  breathGain: GainNode;
  gustLfo: OscillatorNode;
  gustDepth: GainNode;
  gustGainDepth: GainNode;
  panner: StereoPannerNode;
  masterGain: GainNode;
}

class NexloopSoundEngine {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private activeWind: WindVoice | null = null;
  private enabled = true;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
    if (!next) {
      this.stopWind(0.08);
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      try {
        this.ctx = new Ctor();
      } catch {
        return null;
      }
    }
    return this.ctx;
  }

  private ensureNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer && this.noiseBuffer.sampleRate === ctx.sampleRate) {
      return this.noiseBuffer;
    }
    const durationSec = 5;
    const length = Math.floor(ctx.sampleRate * durationSec);
    // Stereo buffer with independent L/R turbulence for wide natural open-air wind
    const buffer = ctx.createBuffer(2, length, ctx.sampleRate);

    for (let chIdx = 0; chIdx < 2; chIdx++) {
      const data = buffer.getChannelData(chIdx);
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      let b3 = 0;
      let b4 = 0;
      let brown = 0;

      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        // Soft 1/f pink spectrum without harsh white-noise hiss
        b0 = 0.99765 * b0 + white * 0.099046;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;
        b3 = 0.99920 * b3 + white * 0.045;
        b4 = 0.98500 * b4 + white * 0.082;
        const pink = b0 + b1 + b2 * 0.18 + b3 + b4;
        // Deep brown airflow layer for natural low-end wind warmth
        brown = brown * 0.991 + white * 0.036;
        data[i] = Math.max(-0.92, Math.min(0.92, pink * 0.09 + brown * 0.52));
      }

      // Crossfade loop ends (first/last 2048 samples) for seamless click-free looping
      const fadeSamples = Math.min(2048, Math.floor(length * 0.05));
      for (let i = 0; i < fadeSamples; i++) {
        const w = i / fadeSamples;
        const tailIdx = length - fadeSamples + i;
        const blended = data[i] * w + data[tailIdx] * (1 - w);
        data[i] = blended;
        data[tailIdx] = blended;
      }
    }

    this.noiseBuffer = buffer;
    return buffer;
  }

  /**
   * Unlocks Web Audio inside a user gesture handler (click/keydown).
   */
  public async unlock(): Promise<boolean> {
    const ctx = this.getContext();
    if (!ctx) return false;
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }
    return ctx.state === 'running';
  }

  public isAudioUnlocked(): boolean {
    return Boolean(this.ctx && this.ctx.state === 'running');
  }

  /**
   * Begins a fresh natural wind voice for a ribbon draw pass.
   */
  public startWind(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    this.stopWind(0.03);

    const now = ctx.currentTime;
    const buffer = this.ensureNoiseBuffer(ctx);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Warm lowpass body carries soft rushing-air presence
    const bodyFilter = ctx.createBiquadFilter();
    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.setValueAtTime(220, now);
    bodyFilter.Q.setValueAtTime(0.65, now);

    // Wide organic bandpass breath bends smoothly with curve velocity & angle
    const breathFilter = ctx.createBiquadFilter();
    breathFilter.type = 'bandpass';
    breathFilter.frequency.setValueAtTime(340, now);
    breathFilter.Q.setValueAtTime(0.8, now);

    const breathGain = ctx.createGain();
    breathGain.gain.setValueAtTime(0.55, now);

    // Gentle atmospheric gust LFO (adds living breath flutter instead of static noise)
    const gustLfo = ctx.createOscillator();
    gustLfo.type = 'sine';
    gustLfo.frequency.setValueAtTime(4.2, now);

    const gustDepth = ctx.createGain();
    gustDepth.gain.setValueAtTime(28, now);

    const gustGainDepth = ctx.createGain();
    gustGainDepth.gain.setValueAtTime(0.025, now);

    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(0.45, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);

    source.connect(bodyFilter);
    bodyFilter.connect(panner);

    source.connect(breathFilter);
    breathFilter.connect(breathGain);
    breathGain.connect(panner);

    gustLfo.connect(gustDepth);
    gustDepth.connect(breathFilter.frequency);

    gustLfo.connect(gustGainDepth);
    gustGainDepth.connect(masterGain.gain);

    panner.connect(masterGain);
    masterGain.connect(ctx.destination);

    source.start(now);
    gustLfo.start(now);

    this.activeWind = {
      source,
      bodyFilter,
      breathFilter,
      breathGain,
      gustLfo,
      gustDepth,
      gustGainDepth,
      panner,
      masterGain,
    };
  }

  /**
   * Modulates the running wind voice every animation frame based on ribbon bend telemetry.
   */
  public updateWind(params: WindAudioParams): void {
    if (!this.enabled || !this.activeWind || !this.ctx || this.ctx.state !== 'running') {
      return;
    }
    const now = this.ctx.currentTime;
    const smooth = 0.045;

    this.activeWind.bodyFilter.frequency.setTargetAtTime(params.cutoffHz, now, smooth);
    this.activeWind.breathFilter.frequency.setTargetAtTime(params.breathHz, now, smooth);
    this.activeWind.breathFilter.Q.setTargetAtTime(params.q, now, smooth);
    this.activeWind.gustLfo.frequency.setTargetAtTime(params.gustRateHz, now, smooth);

    this.activeWind.panner.pan.setTargetAtTime(params.pan, now, smooth);
    this.activeWind.masterGain.gain.setTargetAtTime(params.gain, now, smooth);
  }

  public stopWind(fadeSec = 0.16): void {
    const voice = this.activeWind;
    this.activeWind = null;
    if (!voice || !this.ctx) return;

    const now = this.ctx.currentTime;
    try {
      voice.gustGainDepth.gain.cancelScheduledValues(now);
      voice.gustGainDepth.gain.setTargetAtTime(0.0001, now, 0.02);
      voice.masterGain.gain.cancelScheduledValues(now);
      voice.masterGain.gain.setTargetAtTime(0.0001, now, Math.max(0.02, fadeSec * 0.4));

      const stopAt = now + fadeSec + 0.08;
      voice.source.stop(stopAt);
      voice.gustLfo.stop(stopAt);
    } catch {
      // Ignore already-stopped nodes
    }
  }

  /**
   * Plays a crisp, modern harmonic chord resolve (Dmaj9 shimmer) when the logo settles.
   */
  public playFinishChime(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.24, now);
    master.connect(ctx.destination);

    // Modern clean Dmaj9 voicing: D4, A4, E5, F#5 + delicate upper glass harmonic A5
    const notes: { freq: number; delay: number; dur: number; amp: number; pan: number; type: OscillatorType }[] = [
      { freq: 293.66, delay: 0.0, dur: 1.05, amp: 0.24, pan: -0.15, type: 'triangle' },
      { freq: 440.0, delay: 0.028, dur: 1.0, amp: 0.22, pan: 0.12, type: 'sine' },
      { freq: 659.25, delay: 0.056, dur: 0.95, amp: 0.17, pan: -0.22, type: 'sine' },
      { freq: 739.99, delay: 0.082, dur: 1.12, amp: 0.14, pan: 0.24, type: 'sine' },
      { freq: 1479.98, delay: 0.088, dur: 0.42, amp: 0.045, pan: 0.08, type: 'sine' },
    ];

    for (const n of notes) {
      const start = now + n.delay;
      const osc = ctx.createOscillator();
      osc.type = n.type;
      osc.frequency.setValueAtTime(n.freq * 0.996, start);
      osc.frequency.exponentialRampToValueAtTime(n.freq, start + 0.035);

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(2400, start);
      lp.frequency.exponentialRampToValueAtTime(950, start + n.dur);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(n.amp, start + 0.016);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + n.dur);

      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(n.pan, start);

      osc.connect(lp);
      lp.connect(gain);
      gain.connect(panner);
      panner.connect(master);

      osc.start(start);
      osc.stop(start + n.dur + 0.04);
    }
  }
}

export const soundEngine = new NexloopSoundEngine();
