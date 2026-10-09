/**
 * Netrunner mode — scene data. Every hotspot maps to a region of the original
 * scene art (public/netrunner/scene.webp, 16:9). Positions live in
 * netrunner.css (.nr-hs--<id>) so the prerendered markup carries no inline
 * styles (the site CSP has no 'unsafe-inline' for styles).
 */

/** Site base ('/' in production; './' for relative preview builds). */
const BASE = import.meta.env.BASE_URL;
export const asset = (p: string) => `${BASE}netrunner/${p}`;

export type NodeId = 'terminals' | 'shards' | 'dossier' | 'door' | 'vault';
export type VoiceId = 'intro' | NodeId;

export interface SceneNode {
  id: NodeId;
  /** Two-digit index shown on the label and bound to the number keys. */
  index: string;
  label: string;
  /** What the object is in the room, for screen readers. */
  object: string;
  /** Spoken + subtitled line when the node opens. */
  line: string;
}

export const INTRO_LINE =
  "Link established. I'm 0racLe. You're inside Adil's deck now. Look around. Everything here opens something.";

export const SCENE_NODES: SceneNode[] = [
  {
    id: 'terminals',
    index: '01',
    label: 'Breach logs',
    object: 'Desk terminals',
    line: 'Those terminals hold the breach logs. CVEs, bounties, every system that blinked first.',
  },
  {
    id: 'shards',
    index: '02',
    label: 'Data shards',
    object: 'Shard rack on the window',
    line: 'Data shards. Projects and write-ups. Pick one, plug it in.',
  },
  {
    id: 'dossier',
    index: '03',
    label: 'Dossier',
    object: 'Holo display',
    line: 'His dossier. Ten years in offensive and application security. Banks, telecom, aviation.',
  },
  {
    id: 'vault',
    index: '04',
    label: 'CV // ICE',
    object: 'Locked cabinet',
    line: "The CV sits behind a layer of ICE. Crack it, or hit skip. I won't tell anyone.",
  },
  {
    id: 'door',
    index: '05',
    label: 'Contact',
    object: 'Door',
    line: 'Want to talk to him? The door is open. Just knock.',
  },
];

export const VOICE_SRC: Record<VoiceId, string> = {
  intro: asset('vo-intro.m4a'),
  terminals: asset('vo-terminals.m4a'),
  shards: asset('vo-shards.m4a'),
  dossier: asset('vo-dossier.m4a'),
  vault: asset('vo-ice.m4a'),
  door: asset('vo-door.m4a'),
};

export const AMBIENT_SRC = { ogg: asset('ambient.ogg'), mp3: asset('ambient.mp3') };
/** Exact length of the seamless ambient loop, in seconds. */
export const AMBIENT_LOOP_SECONDS = 39;

export const BOOT_LINES = [
  'oracle-linkd 4.12 // neural handshake',
  'resolving hackwith.me ............ ok',
  'mounting deck: adil_burak_sen .... ok',
  'scanning room: 5 nodes, 1 ICE layer',
  'audio channel ..................... ready',
];
