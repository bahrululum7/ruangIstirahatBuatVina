/**
 * Web Audio Lullaby Synthesizer for Book 1
 * Generates a peaceful, warm music box / celesta acoustic melody for Vina's 3-minute rest.
 */

class LullabyEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private startTime = 0;
  private pausedAt = 0;
  private onTimeUpdateCallback: ((currentSecs: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private duration = 180; // 3 minutes = 180 seconds

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Pentatonic gentle melody notes (Frequencies in Hz)
  // C4, D4, E4, G4, A4, C5, D5, E5, G5
  private notes = [
    261.63, 293.66, 329.63, 392.00, 440.00,
    523.25, 587.33, 659.25, 783.99, 880.00, 1046.50
  ];

  // Calming chord progression arpeggios
  private melodyPattern = [
    { noteIdx: 2, duration: 0.6 }, // E
    { noteIdx: 4, duration: 0.6 }, // A
    { noteIdx: 5, duration: 1.2 }, // C
    { noteIdx: 7, duration: 0.6 }, // E5
    { noteIdx: 6, duration: 0.6 }, // D5
    { noteIdx: 5, duration: 1.2 }, // C5
    { noteIdx: 4, duration: 0.6 }, // A4
    { noteIdx: 3, duration: 0.6 }, // G4
    { noteIdx: 2, duration: 1.8 }, // E4

    { noteIdx: 1, duration: 0.6 }, // D4
    { noteIdx: 3, duration: 0.6 }, // G4
    { noteIdx: 4, duration: 1.2 }, // A4
    { noteIdx: 5, duration: 0.6 }, // C5
    { noteIdx: 4, duration: 0.6 }, // A4
    { noteIdx: 3, duration: 1.2 }, // G4
    { noteIdx: 2, duration: 0.6 }, // E4
    { noteIdx: 1, duration: 0.6 }, // D4
    { noteIdx: 0, duration: 1.8 }, // C4
  ];

  play(onUpdate?: (secs: number) => void, onEnd?: () => void) {
    if (this.isPlaying) return;
    this.onTimeUpdateCallback = onUpdate || null;
    this.onEndedCallback = onEnd || null;

    const ctx = this.getContext();
    this.isPlaying = true;
    this.startTime = ctx.currentTime - this.pausedAt;

    let step = Math.floor(this.pausedAt * 1.5) % this.melodyPattern.length;

    const scheduleNextNote = () => {
      if (!this.isPlaying) return;

      const currentSecs = ctx.currentTime - this.startTime;
      if (currentSecs >= this.duration) {
        this.stop();
        if (this.onEndedCallback) this.onEndedCallback();
        return;
      }

      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(currentSecs);
      }

      const item = this.melodyPattern[step % this.melodyPattern.length];
      this.playChimeNote(this.notes[item.noteIdx]);

      // Occasional soft bass root note
      if (step % 4 === 0) {
        this.playSoftBass(this.notes[Math.max(0, item.noteIdx - 4)]);
      }

      step++;
      this.timer = window.setTimeout(scheduleNextNote, item.duration * 1000);
    };

    scheduleNextNote();
  }

  private playChimeNote(freq: number) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Sweet music box attack & decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.0);
    } catch {}
  }

  private playSoftBass(freq: number) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq / 2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.8);
    } catch {}
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx) {
      this.pausedAt = this.ctx.currentTime - this.startTime;
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.pausedAt = 0;
  }

  seek(targetSeconds: number) {
    this.pausedAt = Math.max(0, Math.min(targetSeconds, this.duration));
    if (this.isPlaying && this.ctx) {
      this.startTime = this.ctx.currentTime - this.pausedAt;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const lullabyEngine = new LullabyEngine();
