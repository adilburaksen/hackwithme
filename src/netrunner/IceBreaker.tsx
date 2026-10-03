import React, { useCallback, useEffect, useRef, useState } from 'react';

interface IceBreakerProps {
  onCracked: (how: 'cracked' | 'skipped') => void;
  sfx?: { confirm: () => void; deny: () => void; glitch: () => void };
}

const LAYERS = [
  { width: 0.2, speed: 0.55 },
  { width: 0.15, speed: 0.8 },
  { width: 0.11, speed: 1.05 },
];

const hex = () =>
  Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()
  ).join(' ');

/**
 * ICE mini-game: a scanner sweeps a gate; fire while it is inside the open
 * window to drop a layer. Three layers. Space / Enter / the button all fire.
 * The cursor position is written as a CSS variable via CSSOM (CSP-safe).
 */
const IceBreaker: React.FC<IceBreakerProps> = ({ onCracked, sfx }) => {
  const [layer, setLayer] = useState(0);
  const [win, setWin] = useState(0.4);
  const [flash, setFlash] = useState<'hit' | 'miss' | null>(null);
  const [misses, setMisses] = useState(0);
  const [noise, setNoise] = useState('-- -- -- --');
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const dir = useRef(1);
  const done = layer >= LAYERS.length;

  // Place the window for the current layer.
  useEffect(() => {
    if (done) return;
    const w = LAYERS[layer].width;
    setWin(0.08 + Math.random() * (0.84 - w));
    setNoise(hex());
  }, [layer, done]);

  // Sweep loop.
  useEffect(() => {
    if (done) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      pos.current += dir.current * LAYERS[layer].speed * dt;
      if (pos.current >= 1) {
        pos.current = 1;
        dir.current = -1;
      } else if (pos.current <= 0) {
        pos.current = 0;
        dir.current = 1;
      }
      trackRef.current?.style.setProperty('--nr-cursor', String(pos.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [layer, done]);

  useEffect(() => {
    if (done) return;
    const el = trackRef.current;
    if (!el) return;
    el.style.setProperty('--nr-win-start', String(win));
    el.style.setProperty('--nr-win-width', String(LAYERS[layer].width));
  }, [win, layer, done]);

  const fire = useCallback(() => {
    if (done) return;
    const w = LAYERS[layer].width;
    const p = pos.current;
    if (p >= win && p <= win + w) {
      sfx?.confirm();
      setFlash('hit');
      const next = layer + 1;
      setLayer(next);
      if (next >= LAYERS.length) {
        window.setTimeout(() => onCracked('cracked'), 450);
      }
    } else {
      sfx?.deny();
      setFlash('miss');
      setMisses((m) => m + 1);
      setNoise(hex());
    }
    window.setTimeout(() => setFlash(null), 260);
  }, [done, layer, win, sfx, onCracked]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        const t = e.target as HTMLElement | null;
        if (t && (t.tagName === 'A' || (t.tagName === 'BUTTON' && !t.dataset.iceFire))) return;
        e.preventDefault();
        fire();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fire]);

  return (
    <div className={`nr-ice ${flash ? `nr-ice--${flash}` : ''}`}>
      <div className="nr-ice-head">
        <span>ICE // SENTRY-3</span>
        <span className="nr-dim">{noise}</span>
      </div>
      <div className="nr-ice-layers" aria-hidden="true">
        {LAYERS.map((_, i) => (
          <span key={i} className={`nr-ice-layer ${i < layer ? 'is-down' : i === layer ? 'is-active' : ''}`}>
            L{i + 1}
          </span>
        ))}
      </div>
      <div ref={trackRef} className="nr-ice-track" aria-hidden="true">
        <div className="nr-ice-window" />
        <div className="nr-ice-cursor" />
      </div>
      <p className="nr-dim nr-ice-help" aria-live="polite">
        {done
          ? 'ICE down. Decrypting…'
          : `Layer ${layer + 1}/3 — fire when the scanner is inside the open gate.${
              misses ? ` Misses: ${misses}.` : ''
            }`}
      </p>
      <div className="nr-ice-actions">
        <button type="button" className="nr-btn nr-btn--acid" data-ice-fire="1" onClick={fire} disabled={done}>
          breach [space]
        </button>
        <button type="button" className="nr-btn" onClick={() => onCracked('skipped')} disabled={done}>
          skip
        </button>
      </div>
    </div>
  );
};

export default IceBreaker;
