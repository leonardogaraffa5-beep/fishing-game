// Tiny WebAudio SFX helper — no external files required
let _ctx = null;
let _muted = false;

export function setMuted(v) {
  _muted = !!v;
}

export function playPlop() {
  if (_muted) return;
  if (!_ctx) {
    _ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  try {
    const t = _ctx.currentTime;
    const osc = _ctx.createOscillator();
    const gain = _ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(700, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);

    osc.connect(gain);
    gain.connect(_ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);

    setTimeout(() => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch (e) {}
    }, 400);
  } catch (e) {
    console.warn('WebAudio error:', e);
  }
}
