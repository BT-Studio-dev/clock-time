/**
 * Live generative space/clock ambient synthesizer.
 * Subtle, warm drone with lowpass filters and gentle binaural pulsation.
 */

let ctx: AudioContext | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let masterGain: GainNode | null = null;
let isPlaying = false;

export function startAmbient(): boolean {
  if (isPlaying) return true;
  if (typeof window === "undefined") return false;

  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return false;

  ctx = new AudioContextClass();
  if (ctx.state === "suspended") ctx.resume();

  masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 3);
  masterGain.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(260, ctx.currentTime);
  filter.connect(masterGain);

  osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2
  osc1.connect(filter);
  osc1.start();

  osc2 = ctx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
  osc2.connect(filter);
  osc2.start();

  isPlaying = true;
  return true;
}

export function stopAmbient(): void {
  if (!isPlaying || !ctx || !masterGain) return;
  masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
  setTimeout(() => {
    try {
      osc1?.stop();
      osc2?.stop();
      osc1?.disconnect();
      osc2?.disconnect();
      ctx?.close();
    } catch {
      // ignore
    }
    osc1 = null;
    osc2 = null;
    masterGain = null;
    ctx = null;
    isPlaying = false;
  }, 1300);
}

export function toggleAmbient(): boolean {
  if (isPlaying) {
    stopAmbient();
    return false;
  } else {
    return startAmbient();
  }
}

export function isAmbientPlaying(): boolean {
  return isPlaying;
}
