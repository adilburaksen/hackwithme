import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '../router';
import ConsentBanner from '../components/ConsentBanner';
import { BOOT_LINES, INTRO_LINE, NodeId, SCENE_NODES, VoiceId, asset } from './scene';
import { NetrunnerAudio } from './audio';
import { BreachLogs, Contact, CvDecrypted, DataShards, Dossier } from './panels';
import IceBreaker from './IceBreaker';
import './netrunner.css';

type Phase = 'boot' | 'live';

const VAULT_KEY = 'nr-vault';
const AUDIO_KEY = 'nr-audio';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const storage = {
  get(k: string) {
    try {
      return window.sessionStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      window.sessionStorage.setItem(k, v);
    } catch {
      /* ignore */
    }
  },
};

/** Netrunner mode: an explorable room. Each object opens a part of the site. */
const Netrunner: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('boot');
  const [bootStep, setBootStep] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const [active, setActive] = useState<NodeId | null>(null);
  const [vault, setVault] = useState<'locked' | 'cracked' | 'skipped'>('locked');
  const [sub, setSub] = useState<{ text: string; n: number } | null>(null);
  const [typed, setTyped] = useState('');

  const audio = useRef<NetrunnerAudio | null>(null);
  const subTimer = useRef<number>();
  const lastHover = useRef(0);
  const panelHeading = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  /* ── lifecycle ─────────────────────────────────────────────── */
  useEffect(() => {
    const v = storage.get(VAULT_KEY);
    if (v === 'cracked' || v === 'skipped') setVault(v);
    document.documentElement.classList.add('nr-page');
    return () => {
      document.documentElement.classList.remove('nr-page');
      audio.current?.close();
      audio.current = null;
      window.clearTimeout(subTimer.current);
    };
  }, []);

  // Boot log reveal.
  useEffect(() => {
    if (phase !== 'boot') return;
    if (prefersReducedMotion()) {
      setBootStep(BOOT_LINES.length);
      return;
    }
    if (bootStep >= BOOT_LINES.length) return;
    const t = window.setTimeout(() => setBootStep((s) => s + 1), bootStep === 0 ? 250 : 320);
    return () => window.clearTimeout(t);
  }, [phase, bootStep]);

  // Subtitle typewriter.
  useEffect(() => {
    if (!sub) {
      setTyped('');
      return;
    }
    if (prefersReducedMotion()) {
      setTyped(sub.text);
      return;
    }
    let i = 0;
    setTyped('');
    const id = window.setInterval(() => {
      i += 2;
      setTyped(sub.text.slice(0, i));
      if (i >= sub.text.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, [sub]);

  /* ── audio helpers ─────────────────────────────────────────── */
  const ensureAudio = useCallback(() => {
    if (!audio.current) {
      try {
        audio.current = new NetrunnerAudio();
        audio.current.preloadVoices();
      } catch {
        audio.current = null;
      }
    }
    audio.current?.resume();
    return audio.current;
  }, []);

  const speak = useCallback(
    (id: VoiceId, text: string, withAudio: boolean) => {
      window.clearTimeout(subTimer.current);
      setSub((prev) => ({ text, n: (prev?.n ?? 0) + 1 }));
      const clearLater = (ms: number) => {
        subTimer.current = window.setTimeout(() => setSub(null), ms);
      };
      const a = withAudio ? audio.current : null;
      if (a) {
        void a.playVoice(id).then(() => clearLater(1800));
      } else {
        clearLater(2400 + text.length * 45);
      }
    },
    []
  );

  const jackIn = (withAudio: boolean) => {
    setPhase('live');
    setAudioOn(withAudio);
    storage.set(AUDIO_KEY, withAudio ? 'on' : 'off');
    if (withAudio) {
      const a = ensureAudio();
      if (a) {
        a.confirm();
        void a.startMusic();
      }
    }
    window.setTimeout(() => speak('intro', INTRO_LINE, withAudio), 500);
  };

  const toggleAudio = () => {
    if (audioOn) {
      audio.current?.stopMusic();
      audio.current?.stopVoice();
      setAudioOn(false);
      storage.set(AUDIO_KEY, 'off');
    } else {
      const a = ensureAudio();
      if (!a) return;
      a.confirm();
      void a.startMusic();
      setAudioOn(true);
      storage.set(AUDIO_KEY, 'on');
    }
  };

  /* ── nodes ─────────────────────────────────────────────────── */
  const openNode = useCallback(
    (id: NodeId, from?: HTMLElement | null) => {
      const node = SCENE_NODES.find((n) => n.id === id);
      if (!node) return;
      returnFocus.current = from ?? (document.activeElement as HTMLElement | null);
      setActive(id);
      if (audioOn) audio.current?.glitch(0.16);
      speak(id, node.line, audioOn);
    },
    [audioOn, speak]
  );

  const closePanel = useCallback(() => {
    setActive(null);
    const el = returnFocus.current;
    if (el && document.contains(el)) el.focus();
  }, []);

  useEffect(() => {
    if (active) panelHeading.current?.focus();
  }, [active]);

  const onHover = () => {
    if (!audioOn) return;
    const now = performance.now();
    if (now - lastHover.current < 90) return;
    lastHover.current = now;
    audio.current?.hover();
  };

  // Keyboard: 1–5 open nodes, Esc closes, M toggles audio.
  useEffect(() => {
    if (phase !== 'live') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === 'Escape' && active) {
        e.preventDefault();
        closePanel();
        return;
      }
      const n = Number(e.key);
      if (n >= 1 && n <= SCENE_NODES.length && !(active === 'vault' && vault === 'locked')) {
        openNode(SCENE_NODES[n - 1].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, active, vault, openNode, closePanel]);

  const onVault = (how: 'cracked' | 'skipped') => {
    setVault(how);
    storage.set(VAULT_KEY, how);
    if (audioOn) audio.current?.glitch(0.3);
  };

  const activeNode = SCENE_NODES.find((n) => n.id === active) ?? null;

  const panelBody = () => {
    switch (active) {
      case 'terminals':
        return <BreachLogs />;
      case 'shards':
        return <DataShards />;
      case 'dossier':
        return <Dossier />;
      case 'door':
        return <Contact />;
      case 'vault':
        return vault === 'locked' ? (
          <IceBreaker
            onCracked={onVault}
            sfx={
              audioOn && audio.current
                ? {
                    confirm: () => audio.current?.confirm(),
                    deny: () => audio.current?.deny(),
                    glitch: () => audio.current?.glitch(),
                  }
                : undefined
            }
          />
        ) : (
          <>
            <div className="nr-decrypt-banner">
              {vault === 'cracked' ? 'ICE down // CV decrypted' : 'ICE bypassed // read-only copy'}
            </div>
            <CvDecrypted />
          </>
        );
      default:
        return null;
    }
  };

  /* ── render ────────────────────────────────────────────────── */
  return (
    <div className={`nr-root ${phase === 'live' ? 'is-live' : 'is-boot'} ${active ? 'has-panel' : ''}`}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&display=swap"
      />
      <img className="nr-backdrop" src={asset('scene-1280.webp')} alt="" aria-hidden="true" />

      {/* HUD */}
      <header className="nr-hud">
        <div className="nr-hud-left">
          <span className="nr-brand">hackwith.me</span>
          <span className="nr-hud-sep">//</span>
          <span className="nr-hud-mode">netrunner</span>
          <span className="nr-signal" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="nr-hud-right">
          {phase === 'live' && (
            <button
              type="button"
              className={`nr-btn nr-btn--sm ${audioOn ? 'is-on' : ''}`}
              onClick={toggleAudio}
              aria-pressed={audioOn}
            >
              <span aria-hidden="true">♪</span> <span className="nr-hide-sm">audio:</span> {audioOn ? 'on' : 'off'}
            </button>
          )}
          <Link to="/" className="nr-btn nr-btn--sm">
            ↩ normal<span className="nr-hide-sm">&nbsp;mode</span>
          </Link>
        </div>
      </header>

      <main id="main" className="nr-main">
        <h1 className="sr-only">Adil Burak Şen (0racLe) — Netrunner mode</h1>
        <div className="nr-stage">
          <img
            className="nr-scene"
            src={asset('scene.webp')}
            srcSet={`${asset('scene-1280.webp')} 1280w, ${asset('scene.webp')} 2048w`}
            sizes="100vw"
            width={2048}
            height={1152}
            alt="A netrunner's room at night: desk terminals, a rack of data shards and a holo display on the rain-streaked window, a locked cabinet, a door, and an audio panel on the wall."
          />
          <div className="nr-rain" aria-hidden="true" />
          <div className="nr-scan" aria-hidden="true" />
          <div className="nr-vignette" aria-hidden="true" />

          {phase === 'live' &&
            SCENE_NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`nr-hs nr-hs--${n.id} ${active === n.id ? 'is-active' : ''}`}
                onClick={(e) => openNode(n.id, e.currentTarget)}
                onMouseEnter={onHover}
                onFocus={onHover}
                aria-label={`${n.index} ${n.label} — ${n.object}`}
              >
                <span className="nr-hs-label" aria-hidden="true">
                  <b>{n.index}</b> {n.label}
                </span>
                <span className="nr-hs-c nr-hs-c--tl" aria-hidden="true" />
                <span className="nr-hs-c nr-hs-c--br" aria-hidden="true" />
              </button>
            ))}
          {phase === 'live' && (
            <button
              type="button"
              className={`nr-hs nr-hs--jack ${audioOn ? 'is-on' : ''}`}
              onClick={toggleAudio}
              onMouseEnter={onHover}
              aria-label={audioOn ? 'Audio panel — turn sound off' : 'Audio panel — turn sound on'}
            >
              <span className="nr-hs-label" aria-hidden="true">
                <b>♪</b> {audioOn ? 'audio on' : 'audio off'}
              </span>
              <span className="nr-hs-c nr-hs-c--tl" aria-hidden="true" />
              <span className="nr-hs-c nr-hs-c--br" aria-hidden="true" />
            </button>
          )}

          {sub && (
            <div className="nr-sub" role="status" aria-live="polite">
              <span className="nr-sub-who">0racLe ›</span> <span className="sr-only">{sub.text}</span>
              <span aria-hidden="true">
                {typed}
                <span className="nr-caret">▍</span>
              </span>
            </div>
          )}
        </div>

        {phase === 'live' && (
          <nav className="nr-nodes" aria-label="Room nodes">
            {SCENE_NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`nr-node ${active === n.id ? 'is-active' : ''}`}
                onClick={(e) => openNode(n.id, e.currentTarget)}
                onMouseEnter={onHover}
              >
                <b>{n.index}</b>
                <span>{n.label}</span>
              </button>
            ))}
            <span className="nr-keys" aria-hidden="true">
              keys 1–5 · esc
            </span>
          </nav>
        )}
      </main>

      {/* Panel */}
      {activeNode && (
        <aside className="nr-panel" role="dialog" aria-modal="false" aria-labelledby="nr-panel-title">
          <div className="nr-panel-head">
            <div>
              <div className="nr-panel-kicker">
                node {activeNode.index} // {activeNode.object}
              </div>
              <h2 id="nr-panel-title" ref={panelHeading} tabIndex={-1} className="nr-panel-title">
                {activeNode.label}
              </h2>
            </div>
            <button type="button" className="nr-btn nr-btn--sm" onClick={closePanel}>
              close [esc]
            </button>
          </div>
          <div className="nr-panel-body">{panelBody()}</div>
        </aside>
      )}

      {/* Boot */}
      {phase === 'boot' && (
        <div className="nr-boot" role="dialog" aria-modal="true" aria-labelledby="nr-boot-title">
          <div className="nr-boot-box">
            <div id="nr-boot-title" className="nr-boot-title">
              0racLe<span className="nr-acid">://</span>link
            </div>
            <ol className="nr-boot-log">
              {BOOT_LINES.map((l, i) => (
                <li key={l} className={i < bootStep ? 'is-on' : ''}>
                  <span className="nr-acid">›</span> {l}
                </li>
              ))}
            </ol>
            <p className="nr-boot-note">
              An interactive version of hackwith.me. Explore the room; every object opens part of the
              profile. Headphones recommended.
            </p>
            <div className="nr-boot-actions">
              <button type="button" className="nr-btn nr-btn--acid nr-btn--lg" onClick={() => jackIn(true)} autoFocus>
                jack in · sound on
              </button>
              <button type="button" className="nr-btn nr-btn--lg" onClick={() => jackIn(false)}>
                silent
              </button>
            </div>
            <Link to="/" className="nr-link nr-boot-exit">
              ↩ back to normal mode
            </Link>
          </div>
        </div>
      )}

      <ConsentBanner />
    </div>
  );
};

export default Netrunner;
