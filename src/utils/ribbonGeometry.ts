/**
 * Mathematical geometry generator for the Nexloop infinity ribbon mark,
 * 3D bevel facets, flush arrowhead, motion spline sampler, wind audio mapping,
 * and animation timeline metrics.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface TimelineConfig {
  speed: number; // 0.5 to 2.5
  loop: boolean;
}

export interface TimelineMetrics {
  speed: number;
  arrowIgnitionStart: number;
  arrowIgnitionDuration: number;
  ribbonStart: number;
  ribbonDuration: number;
  ribbonPass1Duration: number;
  ribbonPass2Start: number;
  ribbonPass2Duration: number;
  arrowLockStart: number;
  arrowLockDuration: number;
  wordmarkStart: number;
  wordmarkDuration: number;
  taglineStart: number;
  taglineDuration: number;
  totalDuration: number;
}

export interface MotionSample {
  u: number; // 0..1 progress along infinity spine
  theta: number;
  pos: Point2D;
  tangent: Point2D;
  normal: Point2D;
  angleDeg: number; // SVG rotation angle (deg) for +X-aligned arrowhead
  curvature: number; // Normalized 0..1 bend intensity at this point
}

export interface WindAudioParams {
  cutoffHz: number; // Warm lowpass airflow body cutoff
  breathHz: number; // Wide organic bandpass breeze center
  q: number; // Soft natural resonance (never whistling)
  pan: number; // Stereo pan [-0.80, 0.80]
  gain: number; // Instantaneous wind loudness
  gustRateHz: number; // Subtle atmospheric gust flutter frequency
}

export interface InfinityGeometry {
  viewBox: string;
  /** Centerline spine for Pass 1 (upper-right cut -> top-right -> / front crossing -> left loop -> top-left) */
  pass1Spine: string;
  pass1Length: number;
  /** Centerline spine for Pass 2 (top-left -> \ under crossing -> bottom-right -> arrow neck) */
  pass2Spine: string;
  pass2Length: number;
  /** Combined continuous centerline spine for pure SVG <animateMotion> */
  fullSpine: string;
  totalLength: number;
  /** Normalized arc-length split point where Pass 1 hands off to Pass 2 */
  pass1Fraction: number;
  /** Pass 1 ribbon polygon (full width with slanted / upper-right cut) */
  pass1Ribbon: string;
  /** Pass 1 upper/outer bevel facet */
  pass1UpperBevel: string;
  /** Pass 1 lower/inner shadow bevel facet */
  pass1LowerBevel: string;
  /** Left loop outer icy-blue 3D twist crescent */
  leftOuterIceFacet: string;
  /** Left loop mid-cyan inner twist facet */
  leftMidCyanFacet: string;
  /** Top-right outer teal highlight crest */
  topRightCrestFacet: string;
  /** Top-right inner dark underside fold */
  topRightUndersideFacet: string;
  /** Pass 2 ribbon polygon (tucked cleanly inside arrowhead neck) */
  pass2Ribbon: string;
  /** Pass 2 outer/upper highlight bevel */
  pass2Bevel: string;
  /** Soft crossing shadow band on Pass 2 right under Pass 1 */
  crossingShadowPath: string;
  /** Crisp flush resting arrowhead path at the lower-right end */
  arrowHeadPath: string;
  /** Origin-centered traveling arrowhead path pointing along +X */
  arrowTravellerPath: string;
  /** Center of resting arrowhead neck for transform anchoring */
  arrowOrigin: Point2D;
  /** Subtle faint guide outline */
  guideSpine: string;
}

const CX = 320;
const CY = 122;
const RX = 186;
const RY = 176;
const K = 0.40;
const HALF_WIDTH = 16.5;

// Parameter boundaries along theta in [0, 2*PI]
// theta=0 is rightmost point (CX + RX, CY), increasing counter-clockwise over top-right.
export const THETA_START = 0.012 * Math.PI;
export const THETA_START_INNER_DELTA = -0.016 * Math.PI;
export const THETA_START_OUTER_DELTA = +0.020 * Math.PI;
export const THETA_HANDOFF = 1.38 * Math.PI;
export const THETA_END = 1.942 * Math.PI;
export const THETA_ARROW_TIP = 1.976 * Math.PI;

/**
 * Evaluates the smooth figure-8 centerline at parameter theta.
 */
export function evalInfinityPoint(theta: number): Point2D {
  const s = Math.sin(theta);
  const c = Math.cos(theta);
  const denom = 1 + K * s * s;
  const u = c / denom;
  const v = (s * c) / denom;
  return {
    x: CX + RX * u,
    y: CY - RY * v,
  };
}

/**
 * Evaluates the unit tangent, normal, and signed curvature magnitude at theta.
 */
export function evalInfinityFrame(theta: number): {
  pos: Point2D;
  tangent: Point2D;
  normal: Point2D;
  curvature: number;
} {
  const eps = 0.002;
  const pPrev = evalInfinityPoint(theta - eps);
  const pos = evalInfinityPoint(theta);
  const pNext = evalInfinityPoint(theta + eps);

  const dx1 = pos.x - pPrev.x;
  const dy1 = pos.y - pPrev.y;
  const dx2 = pNext.x - pos.x;
  const dy2 = pNext.y - pos.y;
  const ds1 = Math.hypot(dx1, dy1) || 1;
  const ds2 = Math.hypot(dx2, dy2) || 1;

  const t1x = dx1 / ds1;
  const t1y = dy1 / ds1;
  const t2x = dx2 / ds2;
  const t2y = dy2 / ds2;

  const tx = (t1x + t2x) * 0.5;
  const ty = (t1y + t2y) * 0.5;
  const tLen = Math.hypot(tx, ty) || 1;
  const ux = tx / tLen;
  const uy = ty / tLen;

  // Instantaneous turning rate |dTangent / ds|
  const dAngle = Math.abs(Math.atan2(t1x * t2y - t1y * t2x, t1x * t2x + t1y * t2y));
  const avgDs = (ds1 + ds2) * 0.5;
  const rawCurvature = dAngle / Math.max(0.001, avgDs);
  // Empirically normalized into [0, 1] across the figure-8 bends
  const curvature = Math.max(0, Math.min(1, rawCurvature / 0.018));

  return {
    pos,
    tangent: { x: ux, y: uy },
    normal: { x: uy, y: -ux },
    curvature,
  };
}

// Precompute an arc-length lookup table for exact constant-speed / eased spine sampling
const ARC_SAMPLES = 360;
const arcLookup: { theta: number; dist: number }[] = (() => {
  const table: { theta: number; dist: number }[] = [];
  let accum = 0;
  let prev = evalInfinityPoint(THETA_START);
  for (let i = 0; i <= ARC_SAMPLES; i++) {
    const theta = THETA_START + ((THETA_END - THETA_START) * i) / ARC_SAMPLES;
    const pt = evalInfinityPoint(theta);
    if (i > 0) {
      accum += Math.hypot(pt.x - prev.x, pt.y - prev.y);
    }
    table.push({ theta, dist: accum });
    prev = pt;
  }
  const total = accum || 1;
  return table.map((item) => ({ theta: item.theta, dist: item.dist / total }));
})();

/**
 * Maps normalized arc-length progress u in [0, 1] to exact centerline position,
 * tangent rotation angle (deg), normal, and bend curvature.
 */
export function evalInfinityMotionSample(u: number): MotionSample {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(u) ? u : 0));

  let lo = 0;
  let hi = arcLookup.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (arcLookup[mid].dist <= clamped) lo = mid;
    else hi = mid;
  }
  const a = arcLookup[lo];
  const b = arcLookup[hi];
  const span = b.dist - a.dist;
  const localT = span > 1e-6 ? (clamped - a.dist) / span : 0;
  const theta = a.theta + (b.theta - a.theta) * localT;

  const frame = evalInfinityFrame(theta);
  const angleDeg = (Math.atan2(frame.tangent.y, frame.tangent.x) * 180) / Math.PI;

  return {
    u: clamped,
    theta,
    pos: frame.pos,
    tangent: frame.tangent,
    normal: frame.normal,
    angleDeg,
    curvature: frame.curvature,
  };
}

/**
 * Maps instantaneous motion telemetry into gentle, natural airflow parameters
 * so wind warmth, breadth, gust flutter, and stereo pan bend organically with the curve.
 */
export function computeWindAudioParams(
  sample: MotionSample,
  normalizedVelocity: number
): WindAudioParams {
  const vel = Math.max(0, Math.min(1.6, Number.isFinite(normalizedVelocity) ? normalizedVelocity : 0));
  const curve = sample.curvature;
  // Soft organic swell-in and tapered air release along u
  const envIn = smoothstep(0, 0.11, sample.u);
  const envOut = 1 - smoothstep(0.84, 1.0, sample.u);
  const envelope = envIn * envOut;

  // Gentle low-Q breath shaping (never narrow/whistling)
  const cutoffHz = Math.round(175 + vel * 155 + curve * 195);
  const breathHz = Math.round(310 + vel * 175 + curve * 290);
  const q = Number((0.72 + curve * 0.48 + vel * 0.08).toFixed(2));
  const pan = Math.max(-0.80, Math.min(0.80, Number(((sample.pos.x - CX) / 210).toFixed(3))));
  const gain = Number((envelope * (0.11 + vel * 0.13 + curve * 0.09)).toFixed(4));
  const gustRateHz = Number((3.6 + vel * 1.4 + curve * 2.2).toFixed(2));

  return {
    cutoffHz,
    breathHz,
    q,
    pan,
    gain,
    gustRateHz,
  };
}

function fmt(n: number): string {
  return Number.isFinite(n) ? n.toFixed(2) : '0.00';
}

function sampleSpine(thetaStart: number, thetaEnd: number, steps: number): {
  path: string;
  length: number;
} {
  const pts: Point2D[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = thetaStart + ((thetaEnd - thetaStart) * i) / steps;
    pts.push(evalInfinityPoint(t));
  }
  let length = 0;
  for (let i = 1; i < pts.length; i++) {
    length += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  const commands = pts.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${fmt(p.x)} ${fmt(p.y)}`);
  return {
    path: commands.join(' '),
    length: Math.round(length * 100) / 100,
  };
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Builds a closed polygon SVG path from left/right offset functions along [thetaStart, thetaEnd].
 * Optional slantStart applies a smooth theta offset across lateral width at p=0 so every
 * facet terminates along the exact same angled cut line with zero protruding corners.
 */
function buildVariableRibbon(
  thetaStart: number,
  thetaEnd: number,
  steps: number,
  leftOffsetFn: (theta: number, progress: number) => number,
  rightOffsetFn: (theta: number, progress: number) => number,
  slantStart?: { innerDelta: number; outerDelta: number; blendEndP: number }
): string {
  const outerPts: Point2D[] = [];
  const innerPts: Point2D[] = [];

  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const baseTheta = thetaStart + (thetaEnd - thetaStart) * progress;
    const lOff = leftOffsetFn(baseTheta, progress);
    const rOff = rightOffsetFn(baseTheta, progress);

    // Ensure outer/left >= inner/right so edges never twist or cross over
    const safeL = Math.max(lOff, rOff);
    const safeR = Math.min(lOff, rOff);

    let thetaL = baseTheta;
    let thetaR = baseTheta;
    if (slantStart) {
      const decay = 1 - smoothstep(0, slantStart.blendEndP, progress);
      const tLatL = (safeL + HALF_WIDTH) / (2 * HALF_WIDTH);
      const tLatR = (safeR + HALF_WIDTH) / (2 * HALF_WIDTH);
      const shiftL =
        slantStart.outerDelta + (slantStart.innerDelta - slantStart.outerDelta) * tLatL;
      const shiftR =
        slantStart.outerDelta + (slantStart.innerDelta - slantStart.outerDelta) * tLatR;
      thetaL = baseTheta + shiftL * decay;
      thetaR = baseTheta + shiftR * decay;
    }

    const frameL = evalInfinityFrame(thetaL);
    const frameR = thetaL === thetaR ? frameL : evalInfinityFrame(thetaR);

    outerPts.push({
      x: frameL.pos.x + frameL.normal.x * safeL,
      y: frameL.pos.y + frameL.normal.y * safeL,
    });
    innerPts.push({
      x: frameR.pos.x + frameR.normal.x * safeR,
      y: frameR.pos.y + frameR.normal.y * safeR,
    });
  }

  const parts: string[] = [];
  outerPts.forEach((p, idx) => {
    parts.push(`${idx === 0 ? 'M' : 'L'} ${fmt(p.x)} ${fmt(p.y)}`);
  });
  for (let i = innerPts.length - 1; i >= 0; i--) {
    const p = innerPts[i];
    parts.push(`L ${fmt(p.x)} ${fmt(p.y)}`);
  }
  parts.push('Z');
  return parts.join(' ');
}

/**
 * Generates the complete geometric model for the Nexloop infinity mark.
 */
export function buildInfinityGeometry(): InfinityGeometry {
  // Pass 1 spine starts just behind the inner slanted cut edge so the mask tracks the -10px arrow neck cleanly
  const pass1 = sampleSpine(THETA_START + THETA_START_INNER_DELTA - 0.005, THETA_HANDOFF, 155);
  const pass2 = sampleSpine(THETA_HANDOFF, THETA_END, 100);
  const full = sampleSpine(THETA_START, THETA_END, 240);
  const totalLength = Math.round((pass1.length + pass2.length) * 100) / 100;
  const pass1Fraction = Number((pass1.length / totalLength).toFixed(4));

  const handoffOverlap = 0.014;
  const startSlant = {
    innerDelta: THETA_START_INNER_DELTA,
    outerDelta: THETA_START_OUTER_DELTA,
    blendEndP: 0.14,
  };

  // Pass 1: full ribbon from slanted upper-right cut -> top-right -> / front -> left loop -> top-left
  const pass1Ribbon = buildVariableRibbon(
    THETA_START,
    THETA_HANDOFF + handoffOverlap,
    170,
    (theta) => {
      const leftSwell = Math.exp(-Math.pow((theta - Math.PI) / 0.36, 2)) * 2.3;
      return HALF_WIDTH + leftSwell;
    },
    (theta) => {
      const innerTuck = Math.exp(-Math.pow((theta - Math.PI) / 0.36, 2)) * 1.4;
      return -HALF_WIDTH + innerTuck;
    },
    startSlant
  );

  // Pass 1 upper/outer bevel
  const pass1UpperBevel = buildVariableRibbon(
    THETA_START,
    THETA_HANDOFF + handoffOverlap,
    170,
    (theta) => {
      const leftSwell = Math.exp(-Math.pow((theta - Math.PI) / 0.36, 2)) * 2.3;
      return HALF_WIDTH + leftSwell;
    },
    (theta) => Math.sin(theta * 2) * 1.5,
    startSlant
  );

  // Pass 1 lower/inner bevel
  const pass1LowerBevel = buildVariableRibbon(
    THETA_START,
    THETA_HANDOFF + handoffOverlap,
    170,
    (theta) => Math.sin(theta * 2) * 1.5,
    (theta) => {
      const innerTuck = Math.exp(-Math.pow((theta - Math.PI) / 0.36, 2)) * 1.4;
      return -HALF_WIDTH + innerTuck;
    },
    startSlant
  );

  // Left-loop 3D icy-blue outer twist crescent (strictly non-crossing, feathered to 0 at both ends)
  const leftOuterIceFacet = buildVariableRibbon(
    0.72 * Math.PI,
    1.31 * Math.PI,
    96,
    (theta) => {
      const swell = Math.exp(-Math.pow((theta - Math.PI) / 0.36, 2)) * 2.3;
      return HALF_WIDTH + swell;
    },
    (theta, p) => {
      const swell = Math.exp(-Math.pow((theta - Math.PI) / 0.36, 2)) * 2.3;
      const arch = Math.sin(p * Math.PI);
      const thickness = 18.5 * Math.pow(arch, 0.9);
      return HALF_WIDTH + swell - thickness;
    }
  );

  // Secondary mid-cyan inner twist layer tucked cleanly underneath leftOuterIceFacet (tapers smoothly to 0 at both ends)
  const leftMidCyanFacet = buildVariableRibbon(
    0.68 * Math.PI,
    1.34 * Math.PI,
    96,
    (theta, p) => {
      const swell = Math.exp(-Math.pow((theta - Math.PI) / 0.36, 2)) * 2.3;
      const arch = Math.sin(p * Math.PI);
      return HALF_WIDTH * (0.35 + 0.65 * Math.pow(arch, 0.5)) + swell * arch;
    },
    (theta, p) => {
      const swell = Math.exp(-Math.pow((theta - Math.PI) / 0.36, 2)) * 2.3;
      const arch = Math.sin(p * Math.PI);
      const top = HALF_WIDTH * (0.35 + 0.65 * Math.pow(arch, 0.5)) + swell * arch;
      const thickness = 21.0 * Math.pow(arch, 1.0);
      return top - thickness;
    }
  );

  // Top-right arch highlight crest (starts flush on the slanted cut, feathers smoothly to 0 by 0.38*PI)
  const topRightCrestFacet = buildVariableRibbon(
    THETA_START,
    0.38 * Math.PI,
    64,
    (_theta, p) => {
      const taper = 1 - smoothstep(0.35, 1, p);
      return -HALF_WIDTH + 13.0 * taper;
    },
    () => -HALF_WIDTH,
    startSlant
  );

  // Top-right inner underside fold (dark teal rim along upper-right hole, feathers cleanly to 0)
  const topRightUndersideFacet = buildVariableRibbon(
    THETA_START,
    0.34 * Math.PI,
    56,
    () => HALF_WIDTH,
    (_theta, p) => {
      const taper = 1 - smoothstep(0.30, 1, p);
      return HALF_WIDTH - 10.5 * taper;
    },
    startSlant
  );

  // Pass 2: top-left -> \ back crossing -> bottom-right -> stops cleanly inside arrow neck at THETA_END
  const pass2Ribbon = buildVariableRibbon(
    THETA_HANDOFF - handoffOverlap,
    THETA_END,
    108,
    () => HALF_WIDTH,
    () => -HALF_WIDTH
  );

  const pass2Bevel = buildVariableRibbon(
    THETA_HANDOFF - handoffOverlap,
    THETA_END,
    108,
    (theta) => Math.sin(theta * 2) * 1.5,
    () => -HALF_WIDTH
  );

  // Crossing shadow on Pass 2 right where it emerges from under Pass 1
  const crossingShadowPath = buildVariableRibbon(
    1.46 * Math.PI,
    1.61 * Math.PI,
    24,
    () => HALF_WIDTH + 0.2,
    () => -(HALF_WIDTH + 0.2)
  );

  // Canonical +X-oriented traveling arrowhead vertices (neck overlaps -10px behind spine point)
  const arrowLocalVerts: Point2D[] = [
    { x: -10, y: HALF_WIDTH }, // neckOuter (+Y maps to outer/right loop side)
    { x: -12, y: 26.5 }, // barbOuter
    { x: 36, y: 0 }, // tip
    { x: -12, y: -26.5 }, // barbInner
    { x: -10, y: -HALF_WIDTH }, // neckInner
  ];

  const arrowTravellerPath =
    arrowLocalVerts
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ') + ' Z';

  // Resting arrow uses the EXACT transformed geometry of the traveling arrow landed at THETA_END,
  // guaranteeing zero shape change or distortion when the arrow settles into place.
  const endFrame = evalInfinityFrame(THETA_END);
  const cosEnd = endFrame.tangent.x;
  const sinEnd = endFrame.tangent.y;
  const toEndWorld = (local: Point2D): Point2D => ({
    x: endFrame.pos.x + local.x * cosEnd - local.y * sinEnd,
    y: endFrame.pos.y + local.x * sinEnd + local.y * cosEnd,
  });

  const endVerts = arrowLocalVerts.map(toEndWorld);
  const arrowHeadPath =
    endVerts
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${fmt(p.x)} ${fmt(p.y)}`)
      .join(' ') + ' Z';

  return {
    viewBox: '0 0 640 370',
    pass1Spine: pass1.path,
    pass1Length: pass1.length,
    pass2Spine: pass2.path,
    pass2Length: pass2.length,
    fullSpine: full.path,
    totalLength,
    pass1Fraction,
    pass1Ribbon,
    pass1UpperBevel,
    pass1LowerBevel,
    leftOuterIceFacet,
    leftMidCyanFacet,
    topRightCrestFacet,
    topRightUndersideFacet,
    pass2Ribbon,
    pass2Bevel,
    crossingShadowPath,
    arrowHeadPath,
    arrowTravellerPath,
    arrowOrigin: {
      x: Math.round(endFrame.pos.x * 100) / 100,
      y: Math.round(endFrame.pos.y * 100) / 100,
    },
    guideSpine: full.path,
  };
}

/**
 * Computes exact arrow-first animation phase timestamps (in seconds) scaled by speed.
 */
export function computeTimelineMetrics(speed: number): TimelineMetrics {
  const safeSpeed = Math.max(0.25, Math.min(4, Number.isFinite(speed) ? speed : 1));
  const s = (baseSec: number) => Math.round((baseSec / safeSpeed) * 1000) / 1000;

  // Arrow starts right away at t = 0.04s, leads the smooth ribbon draw around the entire figure-8
  const arrowIgnitionStart = s(0.04);
  const arrowIgnitionDuration = s(0.14);
  const ribbonStart = s(0.10);
  const ribbonDuration = s(1.76);
  const ribbonPass1Duration = s(1.08);
  const ribbonPass2Start = s(0.10 + 1.08);
  const ribbonPass2Duration = s(0.68);
  const arrowLockStart = s(1.66);
  const arrowLockDuration = s(0.24);
  const wordmarkStart = s(1.78);
  const wordmarkDuration = s(0.56);
  const taglineStart = s(2.14);
  const taglineDuration = s(0.46);
  const totalDuration = s(2.75);

  return {
    speed: safeSpeed,
    arrowIgnitionStart,
    arrowIgnitionDuration,
    ribbonStart,
    ribbonDuration,
    ribbonPass1Duration,
    ribbonPass2Start,
    ribbonPass2Duration,
    arrowLockStart,
    arrowLockDuration,
    wordmarkStart,
    wordmarkDuration,
    taglineStart,
    taglineDuration,
    totalDuration,
  };
}
