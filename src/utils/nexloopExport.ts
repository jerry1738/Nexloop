import {
  buildInfinityGeometry,
  computeTimelineMetrics,
  type TimelineConfig,
} from './ribbonGeometry';

export interface WordmarkGlyph {
  char: string;
  offsetX: number;
  d: string;
  fillRule?: 'evenodd' | 'nonzero';
}

// Centered at x = 320 (total width = 358.5, start x = 140.75)
export const WORDMARK_GLYPHS: WordmarkGlyph[] = [
  {
    char: 'N',
    offsetX: 140.75,
    d: 'M 0 306 L 0 242 L 11 242 L 37.5 287.5 L 37.5 242 L 48 242 L 48 306 L 37 306 L 10.5 260.5 L 10.5 306 Z',
  },
  {
    char: 'e',
    offsetX: 200.75,
    fillRule: 'evenodd',
    d: 'M 46.4 284.5 L 9.65 284.5 A 13.5 13.5 0 0 0 34.2 290.0 L 42.3 296.0 A 23.5 23.5 0 1 1 46.4 284.5 Z M 11.17 276.0 A 13.5 13.5 0 0 1 34.83 276.0 Z',
  },
  {
    char: 'x',
    offsetX: 257.75,
    d: 'M 0 259 L 11.5 259 L 21 273.64 L 30.5 259 L 42 259 L 26.75 282.5 L 42 306 L 30.5 306 L 21 291.36 L 11.5 306 L 0 306 L 15.25 282.5 Z',
  },
  {
    char: 'l',
    offsetX: 310.75,
    d: 'M 0 237 L 10.5 237 L 10.5 306 L 0 306 Z',
  },
  {
    char: 'o',
    offsetX: 333.25,
    fillRule: 'evenodd',
    d: 'M 24 258.5 A 24 24 0 1 0 24 306.5 A 24 24 0 1 0 24 258.5 Z M 24 269 A 13.5 13.5 0 1 1 24 296 A 13.5 13.5 0 1 1 24 269 Z',
  },
  {
    char: 'o',
    offsetX: 391.25,
    fillRule: 'evenodd',
    d: 'M 24 258.5 A 24 24 0 1 0 24 306.5 A 24 24 0 1 0 24 258.5 Z M 24 269 A 13.5 13.5 0 1 1 24 296 A 13.5 13.5 0 1 1 24 269 Z',
  },
  {
    char: 'p',
    offsetX: 450.25,
    fillRule: 'evenodd',
    d: 'M 0 259 L 10.5 259 L 10.5 263.38 A 24 24 0 1 1 10.5 301.62 L 10.5 323 L 0 323 Z M 25 269 A 13.5 13.5 0 1 1 25 296 A 13.5 13.5 0 1 1 25 269 Z',
  },
];

export interface ExportOptions extends TimelineConfig {
  surface: 'light' | 'slate' | 'dark';
  sound?: boolean;
}

export function getSurfacePalette(surface: ExportOptions['surface']) {
  if (surface === 'dark') {
    return {
      bg: '#081826',
      wordmark: '#E6F2F9',
      tagline: '#8BB3CA',
      guide: 'rgba(139, 179, 202, 0.14)',
    };
  }
  if (surface === 'slate') {
    return {
      bg: '#F4F7FA',
      wordmark: '#0D5683',
      tagline: '#4F7B94',
      guide: 'rgba(13, 86, 131, 0.08)',
    };
  }
  return {
    bg: '#FFFFFF',
    wordmark: '#0D5683',
    tagline: '#4F7B94',
    guide: 'rgba(13, 86, 131, 0.07)',
  };
}

function evalFlightU(r: number): number {
  const c = Math.max(0, Math.min(1, r));
  const quad = c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2;
  return 0.84 * quad + 0.16 * c;
}

/**
 * Generates a 100% self-contained arrow-first animated SVG document with embedded SMIL + CSS keyframes.
 */
export function generateStandaloneSvg(options: ExportOptions): string {
  const geo = buildInfinityGeometry();
  const t = computeTimelineMetrics(options.speed);
  const palette = getSurfacePalette(options.surface);

  const holdSeconds = options.loop ? 1.15 : 0;
  const cycle = Math.round((t.totalDuration + holdSeconds) * 1000) / 1000;
  const pct = (sec: number) => `${((sec / cycle) * 100).toFixed(2)}%`;

  // Sample 25 checkpoints along the smooth arrow-first flight so Pass 1, Pass 2, and <animateMotion> stay locked
  const flightSamples = 24;
  const flightKeyTimes: string[] = [];
  const motionKeyPoints: string[] = [];
  const pass1Offsets: string[] = [];
  const pass2Offsets: string[] = [];
  const travellerOpacities: string[] = [];
  const restingOpacities: string[] = [];

  for (let i = 0; i <= flightSamples; i++) {
    const r = i / flightSamples;
    const u = evalFlightU(r);
    flightKeyTimes.push(r.toFixed(4));
    motionKeyPoints.push(u.toFixed(4));

    if (u <= geo.pass1Fraction) {
      const p1 = u / geo.pass1Fraction;
      pass1Offsets.push((geo.pass1Length * (1 - p1)).toFixed(2));
      pass2Offsets.push(geo.pass2Length.toFixed(2));
    } else {
      const p2 = (u - geo.pass1Fraction) / (1 - geo.pass1Fraction);
      pass1Offsets.push('0.00');
      pass2Offsets.push((geo.pass2Length * (1 - p2)).toFixed(2));
    }

    const blend = Math.max(0, Math.min(1, (u - 0.96) / 0.04));
    const smoothBlend = blend * blend * (3 - 2 * blend);
    travellerOpacities.push((1 - smoothBlend).toFixed(3));
    restingOpacities.push(smoothBlend.toFixed(3));
  }

  const tagStart = pct(t.taglineStart);
  const tagEnd = pct(t.taglineStart + t.taglineDuration);
  const fadeOutStart = pct(cycle - 0.35);

  const wordmarkGlyphCss = WORDMARK_GLYPHS.map((_, idx) => {
    const delaySec = t.wordmarkStart + idx * (0.042 / t.speed);
    const endSec = delaySec + t.wordmarkDuration * 0.72;
    if (options.loop) {
      return `    .nl-glyph-${idx} {
      animation: nl-glyph-loop-${idx} ${cycle}s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }
    @keyframes nl-glyph-loop-${idx} {
      0%, ${pct(delaySec)} { opacity: 0; transform: translateY(20px); }
      ${pct(endSec)}, ${fadeOutStart} { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(0); }
    }`;
    }
    return `    .nl-glyph-${idx} {
      opacity: 0;
      transform: translateY(20px);
      animation: nl-glyph-in ${(t.wordmarkDuration * 0.72).toFixed(3)}s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec.toFixed(3)}s forwards;
    }`;
  }).join('\n');

  const taglineCss = options.loop
    ? `    .nl-tagline {
      animation: nl-tagline-loop ${cycle}s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }
    @keyframes nl-tagline-loop {
      0%, ${tagStart} { opacity: 0; transform: translateY(10px); }
      ${tagEnd}, ${fadeOutStart} { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(0); }
    }`
    : `    .nl-tagline {
      opacity: 0;
      transform: translateY(10px);
      animation: nl-tagline-in ${t.taglineDuration}s cubic-bezier(0.16, 1, 0.3, 1) ${t.taglineStart}s forwards;
    }
    @keyframes nl-glyph-in {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes nl-tagline-in {
      to { opacity: 1; transform: translateY(0); }
    }`;

  // Wrap SMIL timing for single-play vs repeating loop
  const repeatAttr = options.loop ? `repeatCount="indefinite"` : `fill="freeze"`;
  const durAttr = options.loop ? `${cycle}s` : `${t.ribbonDuration}s`;
  const beginAttr = options.loop ? `0s` : `${t.ribbonStart}s`;

  let smilKeyTimes = flightKeyTimes.join(';');
  let smilMotionPoints = motionKeyPoints.join(';');
  let smilP1Values = pass1Offsets.join(';');
  let smilP2Values = pass2Offsets.join(';');
  let smilTravellerOpacity = travellerOpacities.join(';');
  let smilRestingOpacity = restingOpacities.join(';');

  if (options.loop) {
    const startFrac = t.ribbonStart / cycle;
    const flightSpan = t.ribbonDuration / cycle;
    const holdFrac = (t.totalDuration + holdSeconds) / cycle;
    const scaledTimes = [
      '0.0000',
      ...flightKeyTimes.map((kt) => (startFrac + Number(kt) * flightSpan).toFixed(4)),
      holdFrac.toFixed(4),
      '1.0000',
    ];
    smilKeyTimes = scaledTimes.join(';');
    smilMotionPoints = ['0.0000', ...motionKeyPoints, '1.0000', '1.0000'].join(';');
    smilP1Values = [geo.pass1Length.toFixed(2), ...pass1Offsets, '0.00', '0.00'].join(';');
    smilP2Values = [geo.pass2Length.toFixed(2), ...pass2Offsets, '0.00', '0.00'].join(';');
    smilTravellerOpacity = ['0.000', ...travellerOpacities, '0.000', '0.000'].join(';');
    smilRestingOpacity = ['0.000', ...restingOpacities, '1.000', '0.000'].join(';');
  }

  const glyphPaths = WORDMARK_GLYPHS.map(
    (g, idx) =>
      `      <g transform="translate(${g.offsetX}, 0)">
        <path class="nl-glyph-${idx}" d="${g.d}" fill="${palette.wordmark}"${g.fillRule ? ` fill-rule="${g.fillRule}"` : ''} />
      </g>`
  ).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${geo.viewBox}" width="640" height="370" role="img" aria-label="Nexloop — innovate, connect, move">
  <style>
${taglineCss}
${wordmarkGlyphCss}
    @media (prefers-reduced-motion: reduce) {
      .nl-pass1-mask, .nl-pass2-mask { stroke-dashoffset: 0 !important; }
      .nl-arrow-rest { opacity: 1 !important; }
      .nl-arrow-traveller { opacity: 0 !important; }
      .nl-tagline, [class^="nl-glyph-"] { opacity: 1 !important; transform: none !important; animation: none !important; }
    }
  </style>
  <defs>
    <linearGradient id="nl-pass1-base" x1="120" y1="120" x2="510" y2="110" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#76C2E3" />
      <stop offset="32%" stop-color="#1C7A9E" />
      <stop offset="56%" stop-color="#2FA3C1" />
      <stop offset="82%" stop-color="#1E7FA1" />
      <stop offset="100%" stop-color="#115E83" />
    </linearGradient>
    <linearGradient id="nl-pass1-upper" x1="140" y1="60" x2="500" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#A8DCF0" />
      <stop offset="38%" stop-color="#43B1CA" />
      <stop offset="68%" stop-color="#58C4D8" />
      <stop offset="100%" stop-color="#2286A8" />
    </linearGradient>
    <linearGradient id="nl-pass1-lower" x1="160" y1="195" x2="460" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0E5277" />
      <stop offset="50%" stop-color="#166D94" />
      <stop offset="100%" stop-color="#0F5377" />
    </linearGradient>
    <linearGradient id="nl-ice-left" x1="130" y1="55" x2="155" y2="195" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#DCEFF9" />
      <stop offset="45%" stop-color="#EBF7FC" />
      <stop offset="78%" stop-color="#A6D7EE" />
      <stop offset="100%" stop-color="#58AAD0" />
    </linearGradient>
    <linearGradient id="nl-cyan-left" x1="145" y1="65" x2="180" y2="195" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#76C0E0" />
      <stop offset="55%" stop-color="#4EA4CA" />
      <stop offset="100%" stop-color="#1B7198" />
    </linearGradient>
    <linearGradient id="nl-pass2-grad" x1="255" y1="68" x2="505" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1D7FA1" />
      <stop offset="16%" stop-color="#126287" />
      <stop offset="36%" stop-color="#0B4668" />
      <stop offset="68%" stop-color="#228EAD" />
      <stop offset="100%" stop-color="#1D75A8" />
    </linearGradient>
    <linearGradient id="nl-pass2-bevel" x1="255" y1="68" x2="505" y2="160" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#43B1CA" />
      <stop offset="18%" stop-color="#146489" />
      <stop offset="44%" stop-color="#0D5579" />
      <stop offset="74%" stop-color="#2FA4BE" />
      <stop offset="100%" stop-color="#2279AB" />
    </linearGradient>
    <linearGradient id="nl-crossing-shadow" x1="315" y1="120" x2="365" y2="165" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#062A42" stop-opacity="0.72" />
      <stop offset="100%" stop-color="#0A4568" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="nl-arrow-grad" x1="470" y1="175" x2="518" y2="115" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1D75A8" />
      <stop offset="100%" stop-color="#2A88BC" />
    </linearGradient>
    <linearGradient id="nl-traveller-grad" x1="-12" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1D75A8" />
      <stop offset="100%" stop-color="#2A88BC" />
    </linearGradient>
    <mask id="nl-mask-pass1">
      <path class="nl-pass1-mask" d="${geo.pass1Spine}" fill="none" stroke="#FFFFFF" stroke-width="54" stroke-linecap="butt" stroke-dasharray="${geo.pass1Length}" stroke-dashoffset="${geo.pass1Length}">
        <animate attributeName="stroke-dashoffset" begin="${beginAttr}" dur="${durAttr}" calcMode="linear" keyTimes="${smilKeyTimes}" values="${smilP1Values}" ${repeatAttr} />
      </path>
    </mask>
    <mask id="nl-mask-pass2">
      <path class="nl-pass2-mask" d="${geo.pass2Spine}" fill="none" stroke="#FFFFFF" stroke-width="54" stroke-linecap="butt" stroke-dasharray="${geo.pass2Length}" stroke-dashoffset="${geo.pass2Length}">
        <animate attributeName="stroke-dashoffset" begin="${beginAttr}" dur="${durAttr}" calcMode="linear" keyTimes="${smilKeyTimes}" values="${smilP2Values}" ${repeatAttr} />
      </path>
    </mask>
    <clipPath id="nl-wordmark-clip">
      <rect x="120" y="230" width="400" height="98" />
    </clipPath>
  </defs>
  <rect width="640" height="370" fill="${palette.bg}" />
  <g id="nexloop-infinity">
    <g mask="url(#nl-mask-pass2)">
      <path d="${geo.pass2Ribbon}" fill="url(#nl-pass2-grad)" />
      <path d="${geo.pass2Bevel}" fill="url(#nl-pass2-bevel)" opacity="0.85" />
      <path d="${geo.crossingShadowPath}" fill="url(#nl-crossing-shadow)" />
    </g>
    <g mask="url(#nl-mask-pass1)">
      <path d="${geo.pass1Ribbon}" fill="url(#nl-pass1-base)" />
      <path d="${geo.pass1LowerBevel}" fill="url(#nl-pass1-lower)" opacity="0.82" />
      <path d="${geo.pass1UpperBevel}" fill="url(#nl-pass1-upper)" opacity="0.92" />
      <path d="${geo.topRightUndersideFacet}" fill="#0B476B" opacity="0.9" />
      <path d="${geo.topRightCrestFacet}" fill="#45B3CA" opacity="0.88" />
      <path d="${geo.leftMidCyanFacet}" fill="url(#nl-cyan-left)" opacity="0.92" />
      <path d="${geo.leftOuterIceFacet}" fill="url(#nl-ice-left)" />
    </g>
    <g class="nl-arrow-traveller" opacity="0">
      <path d="${geo.arrowTravellerPath}" fill="url(#nl-traveller-grad)" />
      <animateMotion path="${geo.fullSpine}" rotate="auto" begin="${beginAttr}" dur="${durAttr}" calcMode="linear" keyTimes="${smilKeyTimes}" keyPoints="${smilMotionPoints}" ${repeatAttr} />
      <animate attributeName="opacity" begin="${beginAttr}" dur="${durAttr}" calcMode="linear" keyTimes="${smilKeyTimes}" values="${smilTravellerOpacity}" ${repeatAttr} />
    </g>
    <path class="nl-arrow-rest" d="${geo.arrowHeadPath}" fill="url(#nl-arrow-grad)" opacity="0">
      <animate attributeName="opacity" begin="${beginAttr}" dur="${durAttr}" calcMode="linear" keyTimes="${smilKeyTimes}" values="${smilRestingOpacity}" ${repeatAttr} />
    </path>
  </g>
  <g id="nexloop-wordmark" clip-path="url(#nl-wordmark-clip)">
${glyphPaths}
  </g>
  <text
    class="nl-tagline"
    x="320"
    y="345"
    text-anchor="middle"
    fill="${palette.tagline}"
    font-family="'Plus Jakarta Sans', 'Avenir Next', 'Segoe UI', system-ui, sans-serif"
    font-size="21.5"
    font-weight="400"
    letter-spacing="1.4"
  >innovate &#183; connect &#183; move</text>
</svg>`;
}

const SOUND_JS_SNIPPET = `
  // Procedural natural bending-wind + modern Dmaj9 resolve audio
  function createNexloopAudio() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    const len = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    let b0 = 0, b1 = 0, brown = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + w * 0.029;
      b1 = 0.975 * b1 + w * 0.042;
      brown = brown * 0.991 + w * 0.036;
      ch[i] = Math.max(-0.9, Math.min(0.9, (b0 + b1) * 0.28 + brown * 0.52));
    }
    return {
      playWindSweep(durationSec) {
        if (ctx.state === 'suspended') ctx.resume().catch(() => {});
        if (ctx.state !== 'running') return;
        const now = ctx.currentTime;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(220, now);
        lp.frequency.linearRampToValueAtTime(440, now + durationSec * 0.35);
        lp.frequency.linearRampToValueAtTime(510, now + durationSec * 0.58);
        lp.frequency.linearRampToValueAtTime(260, now + durationSec * 0.90);
        lp.Q.setValueAtTime(0.65, now);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(340, now);
        bp.frequency.linearRampToValueAtTime(640, now + durationSec * 0.55);
        bp.frequency.linearRampToValueAtTime(360, now + durationSec * 0.92);
        bp.Q.setValueAtTime(0.95, now);
        const pan = ctx.createStereoPanner();
        pan.pan.setValueAtTime(0.5, now);
        pan.pan.linearRampToValueAtTime(-0.7, now + durationSec * 0.56);
        pan.pan.linearRampToValueAtTime(0.55, now + durationSec * 0.95);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.24, now + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);
        src.connect(lp); lp.connect(pan);
        src.connect(bp); bp.connect(pan);
        pan.connect(gain); gain.connect(ctx.destination);
        src.start(now); src.stop(now + durationSec + 0.05);
      },
      playModernChime() {
        if (ctx.state !== 'running') return;
        const now = ctx.currentTime;
        [293.66, 440, 659.25, 739.99].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = i === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.028);
          g.gain.setValueAtTime(0.0001, now + i * 0.028);
          g.gain.linearRampToValueAtTime(0.055, now + i * 0.028 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.028 + 1.0);
          osc.connect(g); g.connect(ctx.destination);
          osc.start(now + i * 0.028); osc.stop(now + i * 0.028 + 1.05);
        });
      }
    };
  }`;

export function generateReactComponentCode(options: ExportOptions): string {
  const palette = getSurfacePalette(options.surface);
  const metrics = computeTimelineMetrics(options.speed);
  const totalMs = Math.round((metrics.totalDuration + 0.45) * 1000);
  const chimeMs = Math.round((metrics.taglineStart + metrics.taglineDuration * 0.55) * 1000);
  const windSec = metrics.ribbonDuration.toFixed(2);
  const svgInline = generateStandaloneSvg(options)
    .replace(/class="/g, 'className="')
    .replace(/fill-rule="/g, 'fillRule="')
    .replace(/clip-path="/g, 'clipPath="')
    .replace(/text-anchor="/g, 'textAnchor="')
    .replace(/font-family="/g, 'fontFamily="')
    .replace(/font-size="/g, 'fontSize="')
    .replace(/font-weight="/g, 'fontWeight="')
    .replace(/letter-spacing="/g, 'letterSpacing="')
    .replace(/stop-color="/g, 'stopColor="')
    .replace(/stop-opacity="/g, 'stopOpacity="')
    .replace(/stroke-width="/g, 'strokeWidth="')
    .replace(/stroke-linecap="/g, 'strokeLinecap="')
    .replace(/stroke-dasharray="/g, 'strokeDasharray="')
    .replace(/stroke-dashoffset="/g, 'strokeDashoffset="')
    .replace(/keyTimes="/g, 'keyTimes="')
    .replace(/keyPoints="/g, 'keyPoints="')
    .replace(/calcMode="/g, 'calcMode="')
    .replace(/repeatCount="/g, 'repeatCount="')
    .replace(/attributeName="/g, 'attributeName="')
    .replace(/<style>([\s\S]*?)<\/style>/, '<style>{`$1`}</style>');

  const soundSetup = options.sound
    ? `
  // Optional bending-wind + modern Dmaj9 completion chime (${windSec}s wind sweep)
  useEffect(() => {
    const AudioCtx = window.AudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const unlock = () => {
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    const chimeTimer = window.setTimeout(() => {
      if (ctx.state !== 'running') return;
      const now = ctx.currentTime;
      [293.66, 440, 659.25, 739.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.028);
        g.gain.setValueAtTime(0.0001, now + i * 0.028);
        g.gain.linearRampToValueAtTime(0.055, now + i * 0.028 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.028 + 1.0);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(now + i * 0.028); osc.stop(now + i * 0.028 + 1.05);
      });
    }, ${chimeMs});
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.clearTimeout(chimeTimer);
      ctx.close().catch(() => {});
    };
  }, []);`
    : '';

  return `import { useEffect, useState } from 'react';

export function NexloopLoadingScreen({ onDone }: { onDone?: () => void }) {
  const [exiting, setExiting] = useState(false);${soundSetup}

  useEffect(() => {
    const fadeTimer = setTimeout(() => setExiting(true), ${totalMs});
    const doneTimer = setTimeout(() => onDone?.(), ${totalMs + 450});
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      role="status"
      aria-label="Loading Nexloop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '${palette.bg}',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 450ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      <div style={{ width: 'min(84vw, 440px)' }}>
        ${svgInline.split('\n').join('\n        ')}
      </div>
    </div>
  );
}`;
}

export function generateHtmlSnippet(options: ExportOptions): string {
  const svgMarkup = generateStandaloneSvg(options);
  const palette = getSurfacePalette(options.surface);
  const metrics = computeTimelineMetrics(options.speed);
  const totalMs = Math.round((metrics.totalDuration + 0.45) * 1000);
  const chimeMs = Math.round((metrics.taglineStart + metrics.taglineDuration * 0.55) * 1000);
  const ribbonStartMs = Math.round(metrics.ribbonStart * 1000);

  const audioScript = options.sound
    ? `${SOUND_JS_SNIPPET}
  const nlAudio = createNexloopAudio();
  if (nlAudio) {
    window.addEventListener('pointerdown', () => nlAudio.playWindSweep(${metrics.ribbonDuration.toFixed(2)}), { once: true });
    setTimeout(() => nlAudio.playWindSweep(${metrics.ribbonDuration.toFixed(2)}), ${ribbonStartMs});
    setTimeout(() => nlAudio.playModernChime(), ${chimeMs});
  }`
    : '';

  return `<!-- Nexloop Fullscreen Loading Screen -->
<div id="nexloop-loader" style="
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: ${palette.bg};
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
">
  <div style="width: min(84vw, 440px);">
    ${svgMarkup.split('\n').join('\n    ')}
  </div>
</div>

<script>${audioScript}
  window.addEventListener('load', () => {
    const loader = document.getElementById('nexloop-loader');
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => loader.remove(), 460);
    }, ${totalMs});
  });
</script>`;
}
