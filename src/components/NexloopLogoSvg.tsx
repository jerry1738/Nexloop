import { useEffect, useId, useMemo, useRef } from 'react';
import {
  buildInfinityGeometry,
  computeTimelineMetrics,
  computeWindAudioParams,
  evalInfinityMotionSample,
} from '../utils/ribbonGeometry';
import { getSurfacePalette, WORDMARK_GLYPHS } from '../utils/nexloopExport';
import { soundEngine } from '../utils/soundEngine';

export interface NexloopLogoSvgProps {
  speed?: number;
  loop?: boolean;
  surface?: 'light' | 'slate' | 'dark';
  showGuide?: boolean;
  staticFinal?: boolean;
  soundEnabled?: boolean;
  replayKey?: number;
  className?: string;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function easeOutCubic(t: number): number {
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 3);
}

/** Smooth continuous path progress and normalized velocity for arrow-led figure-8 flight */
function evalFlightProgress(raw: number): { u: number; velocity: number } {
  const r = clamp01(raw);
  // Blend 84% easeInOutQuad + 16% linear for prompt take-off, lively center bends, and silky settle
  const quad = r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2;
  const quadDeriv = r < 0.5 ? 4 * r : 4 * (1 - r);
  const u = 0.84 * quad + 0.16 * r;
  const velocity = 0.84 * quadDeriv + 0.16;
  return { u, velocity };
}

export function NexloopLogoSvg({
  speed = 1,
  loop = false,
  surface = 'light',
  showGuide = false,
  staticFinal = false,
  soundEnabled = false,
  replayKey = 0,
  className = 'w-full h-auto',
}: NexloopLogoSvgProps) {
  const rawId = useId();
  const uid = useMemo(() => `nl_${rawId.replace(/[^a-zA-Z0-9]/g, '')}`, [rawId]);
  const geo = useMemo(() => buildInfinityGeometry(), []);
  const t = useMemo(() => computeTimelineMetrics(speed), [speed]);
  const palette = useMemo(() => getSurfacePalette(surface), [surface]);

  const maskP1Ref = useRef<SVGPathElement | null>(null);
  const maskP2Ref = useRef<SVGPathElement | null>(null);
  const travellerFrontRef = useRef<SVGGElement | null>(null);
  const travellerBackRef = useRef<SVGGElement | null>(null);
  const restingArrowRef = useRef<SVGPathElement | null>(null);
  const glyphRefs = useRef<(SVGPathElement | null)[]>([]);
  const taglineRef = useRef<SVGTextElement | null>(null);

  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  useEffect(() => {
    if (staticFinal) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const applyStaticFinal = () => {
      if (maskP1Ref.current) maskP1Ref.current.style.strokeDashoffset = '0';
      if (maskP2Ref.current) maskP2Ref.current.style.strokeDashoffset = '0';
      if (travellerFrontRef.current) travellerFrontRef.current.setAttribute('opacity', '0');
      if (travellerBackRef.current) travellerBackRef.current.setAttribute('opacity', '0');
      if (restingArrowRef.current) {
        restingArrowRef.current.style.opacity = '1';
        restingArrowRef.current.style.transform = 'scale(1)';
      }
      glyphRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0px)';
        }
      });
      if (taglineRef.current) {
        taglineRef.current.style.opacity = '1';
        taglineRef.current.style.transform = 'translateY(0px)';
      }
    };

    if (prefersReducedMotion) {
      applyStaticFinal();
      return;
    }

    const holdSec = loop ? 1.15 : 0;
    const fadeSec = loop ? 0.32 : 0;
    const cycleSec = t.totalDuration + holdSec + fadeSec;

    let rafId = 0;
    let startTime: number | null = null;
    let prevCycleIdx = -1;
    let windStartedForCycle = false;
    let windStoppedForCycle = false;
    let chimePlayedForCycle = false;

    const step = (nowMs: number) => {
      if (startTime === null) startTime = nowMs;
      const elapsedTotalSec = (nowMs - startTime) / 1000;
      const cycleIdx = loop ? Math.floor(elapsedTotalSec / cycleSec) : 0;
      const elapsedSec = loop
        ? elapsedTotalSec - cycleIdx * cycleSec
        : Math.min(elapsedTotalSec, t.totalDuration + 0.05);

      if (cycleIdx !== prevCycleIdx) {
        prevCycleIdx = cycleIdx;
        windStartedForCycle = false;
        windStoppedForCycle = false;
        chimePlayedForCycle = false;
      }

      // Loop fade-out multiplier at very end of a loop cycle
      let loopFadeOpacity = 1;
      if (loop && elapsedSec > t.totalDuration + holdSec) {
        const fadeP = clamp01((elapsedSec - (t.totalDuration + holdSec)) / fadeSec);
        loopFadeOpacity = 1 - fadeP;
      }

      // 1. Arrowhead ignition + smooth figure-8 flight + ribbon trail reveal
      const flightEnd = t.ribbonStart + t.ribbonDuration;
      const ignitionP = clamp01(
        (elapsedSec - t.arrowIgnitionStart) / Math.max(0.01, t.arrowIgnitionDuration)
      );

      if (elapsedSec < t.ribbonStart) {
        // Arrow appears first at the upper-right origin before sweeping
        const spawn = evalInfinityMotionSample(0);
        const popScale = 0.62 + 0.38 * easeOutCubic(ignitionP);
        const popOpacity = easeOutCubic(ignitionP) * loopFadeOpacity;

        if (maskP1Ref.current) {
          maskP1Ref.current.style.strokeDashoffset = String(geo.pass1Length);
        }
        if (maskP2Ref.current) {
          maskP2Ref.current.style.strokeDashoffset = String(geo.pass2Length);
        }
        if (travellerFrontRef.current) {
          travellerFrontRef.current.setAttribute(
            'transform',
            `translate(${spawn.pos.x.toFixed(2)}, ${spawn.pos.y.toFixed(2)}) rotate(${spawn.angleDeg.toFixed(2)}) scale(${popScale.toFixed(3)})`
          );
          travellerFrontRef.current.setAttribute('opacity', popOpacity.toFixed(3));
        }
        if (travellerBackRef.current) {
          travellerBackRef.current.setAttribute('opacity', '0');
        }
        if (restingArrowRef.current) {
          restingArrowRef.current.style.opacity = '0';
          restingArrowRef.current.style.transform = 'scale(1)';
        }
      } else if (elapsedSec <= flightEnd) {
        const raw = clamp01((elapsedSec - t.ribbonStart) / Math.max(0.01, t.ribbonDuration));
        const { u, velocity } = evalFlightProgress(raw);
        const sample = evalInfinityMotionSample(u);

        // Lock Pass 1 and Pass 2 stroke masks directly to the arrow's progress along total length
        if (u <= geo.pass1Fraction) {
          const p1Ratio = clamp01(u / Math.max(0.001, geo.pass1Fraction));
          if (maskP1Ref.current) {
            maskP1Ref.current.style.strokeDashoffset = (geo.pass1Length * (1 - p1Ratio)).toFixed(2);
          }
          if (maskP2Ref.current) {
            maskP2Ref.current.style.strokeDashoffset = String(geo.pass2Length);
          }
        } else {
          const p2Ratio = clamp01(
            (u - geo.pass1Fraction) / Math.max(0.001, 1 - geo.pass1Fraction)
          );
          if (maskP1Ref.current) {
            maskP1Ref.current.style.strokeDashoffset = '0';
          }
          if (maskP2Ref.current) {
            maskP2Ref.current.style.strokeDashoffset = (geo.pass2Length * (1 - p2Ratio)).toFixed(2);
          }
        }

        // Identical-shape handoff right at arrival (u in [0.985, 1.0]) so the arrow never morphs or jumps
        const lockBlend = smoothstep(0.985, 1.0, u);
        const travellerAlpha = (1 - lockBlend) * loopFadeOpacity;
        const transformStr = `translate(${sample.pos.x.toFixed(2)}, ${sample.pos.y.toFixed(2)}) rotate(${sample.angleDeg.toFixed(2)})`;

        const inPass2 = u > geo.pass1Fraction;
        if (travellerFrontRef.current) {
          travellerFrontRef.current.setAttribute('transform', transformStr);
          travellerFrontRef.current.setAttribute(
            'opacity',
            inPass2 ? '0' : travellerAlpha.toFixed(3)
          );
        }
        if (travellerBackRef.current) {
          travellerBackRef.current.setAttribute('transform', transformStr);
          travellerBackRef.current.setAttribute(
            'opacity',
            inPass2 ? travellerAlpha.toFixed(3) : '0'
          );
        }
        if (restingArrowRef.current) {
          restingArrowRef.current.style.opacity = (lockBlend * loopFadeOpacity).toFixed(3);
          restingArrowRef.current.style.transform = 'scale(1)';
        }

        // Natural wind audio driven directly from curve sample & velocity
        if (soundRef.current) {
          if (!windStartedForCycle) {
            windStartedForCycle = true;
            soundEngine.startWind();
          }
          soundEngine.updateWind(computeWindAudioParams(sample, velocity * t.speed));
        } else if (windStartedForCycle && !windStoppedForCycle) {
          windStoppedForCycle = true;
          soundEngine.stopWind(0.08);
        }
      } else {
        // Ribbon & arrow lock settled
        if (maskP1Ref.current) maskP1Ref.current.style.strokeDashoffset = '0';
        if (maskP2Ref.current) maskP2Ref.current.style.strokeDashoffset = '0';
        if (travellerFrontRef.current) travellerFrontRef.current.setAttribute('opacity', '0');
        if (travellerBackRef.current) travellerBackRef.current.setAttribute('opacity', '0');
        if (restingArrowRef.current) {
          restingArrowRef.current.style.opacity = loopFadeOpacity.toFixed(3);
          restingArrowRef.current.style.transform = 'scale(1)';
        }
        if (windStartedForCycle && !windStoppedForCycle) {
          windStoppedForCycle = true;
          soundEngine.stopWind(0.16);
        }
      }

      // 2. Staggered Nexloop wordmark rise
      const glyphDur = t.wordmarkDuration * 0.72;
      WORDMARK_GLYPHS.forEach((_, idx) => {
        const el = glyphRefs.current[idx];
        if (!el) return;
        const delaySec = t.wordmarkStart + idx * (0.042 / t.speed);
        const p = clamp01((elapsedSec - delaySec) / Math.max(0.01, glyphDur));
        const eased = easeOutCubic(p);
        el.style.opacity = (eased * loopFadeOpacity).toFixed(3);
        el.style.transform = `translateY(${((1 - eased) * 22).toFixed(2)}px)`;
      });

      // 3. Tagline rise
      if (taglineRef.current) {
        const tagP = clamp01(
          (elapsedSec - t.taglineStart) / Math.max(0.01, t.taglineDuration)
        );
        const easedTag = easeOutCubic(tagP);
        taglineRef.current.style.opacity = (easedTag * loopFadeOpacity).toFixed(3);
        taglineRef.current.style.transform = `translateY(${((1 - easedTag) * 12).toFixed(2)}px)`;
      }

      // 4. Modern finish chime as the tagline finishes settling
      if (
        soundRef.current &&
        !chimePlayedForCycle &&
        elapsedSec >= t.taglineStart + t.taglineDuration * 0.55
      ) {
        chimePlayedForCycle = true;
        soundEngine.playFinishChime();
      }

      if (loop || elapsedTotalSec < t.totalDuration + 0.05) {
        rafId = window.requestAnimationFrame(step);
      } else {
        applyStaticFinal();
      }
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      soundEngine.stopWind(0.06);
    };
  }, [geo, t, loop, staticFinal, replayKey]);

  const originStr = `${geo.arrowOrigin.x}px ${geo.arrowOrigin.y}px`;

  return (
    <svg
      key={`${replayKey}-${speed}-${loop ? 'loop' : 'once'}-${staticFinal ? 'final' : 'anim'}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={geo.viewBox}
      className={className}
      role="img"
      aria-label="Nexloop — innovate, connect, move"
      data-testid="nexloop-animated-svg"
    >
      <defs>
        <linearGradient id={`${uid}-p1-base`} x1="120" y1="120" x2="510" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#76C2E3" />
          <stop offset="32%" stopColor="#1C7A9E" />
          <stop offset="56%" stopColor="#2FA3C1" />
          <stop offset="82%" stopColor="#1E7FA1" />
          <stop offset="100%" stopColor="#115E83" />
        </linearGradient>
        <linearGradient id={`${uid}-p1-upper`} x1="140" y1="60" x2="500" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A8DCF0" />
          <stop offset="38%" stopColor="#43B1CA" />
          <stop offset="68%" stopColor="#58C4D8" />
          <stop offset="100%" stopColor="#2286A8" />
        </linearGradient>
        <linearGradient id={`${uid}-p1-lower`} x1="160" y1="195" x2="460" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0E5277" />
          <stop offset="50%" stopColor="#166D94" />
          <stop offset="100%" stopColor="#0F5377" />
        </linearGradient>
        <linearGradient id={`${uid}-ice-left`} x1="130" y1="55" x2="155" y2="195" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DCEFF9" />
          <stop offset="45%" stopColor="#EBF7FC" />
          <stop offset="78%" stopColor="#A6D7EE" />
          <stop offset="100%" stopColor="#58AAD0" />
        </linearGradient>
        <linearGradient id={`${uid}-cyan-left`} x1="145" y1="65" x2="180" y2="195" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#76C0E0" />
          <stop offset="55%" stopColor="#4EA4CA" />
          <stop offset="100%" stopColor="#1B7198" />
        </linearGradient>
        <linearGradient id={`${uid}-p2-grad`} x1="255" y1="68" x2="505" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D7FA1" />
          <stop offset="16%" stopColor="#126287" />
          <stop offset="36%" stopColor="#0B4668" />
          <stop offset="68%" stopColor="#228EAD" />
          <stop offset="100%" stopColor="#1D75A8" />
        </linearGradient>
        <linearGradient id={`${uid}-p2-bevel`} x1="255" y1="68" x2="505" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#43B1CA" />
          <stop offset="18%" stopColor="#146489" />
          <stop offset="44%" stopColor="#0D5579" />
          <stop offset="74%" stopColor="#2FA4BE" />
          <stop offset="100%" stopColor="#2279AB" />
        </linearGradient>
        <linearGradient id={`${uid}-cross-shadow`} x1="315" y1="120" x2="365" y2="165" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#062A42" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#0A4568" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-arrow-grad`} x1="470" y1="175" x2="518" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D75A8" />
          <stop offset="100%" stopColor="#2A88BC" />
        </linearGradient>
        <linearGradient id={`${uid}-traveller-grad`} x1="-12" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D75A8" />
          <stop offset="100%" stopColor="#2A88BC" />
        </linearGradient>

        <mask id={`${uid}-mask-p1`}>
          <path
            ref={maskP1Ref}
            d={geo.pass1Spine}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="54"
            strokeLinecap="butt"
            style={
              staticFinal
                ? undefined
                : {
                    strokeDasharray: geo.pass1Length,
                    strokeDashoffset: geo.pass1Length,
                  }
            }
          />
        </mask>

        <mask id={`${uid}-mask-p2`}>
          <path
            ref={maskP2Ref}
            d={geo.pass2Spine}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="54"
            strokeLinecap="butt"
            style={
              staticFinal
                ? undefined
                : {
                    strokeDasharray: geo.pass2Length,
                    strokeDashoffset: geo.pass2Length,
                  }
            }
          />
        </mask>

        <clipPath id={`${uid}-wordmark-clip`}>
          <rect x="120" y="230" width="400" height="98" />
        </clipPath>
      </defs>

      {showGuide && (
        <path
          d={geo.guideSpine}
          fill="none"
          stroke={palette.guide}
          strokeWidth="2"
          strokeDasharray="4 6"
        />
      )}

      {/* Infinity Ribbon Mark */}
      <g id={`${uid}-infinity`}>
        {/* Back/under strand (\) + bottom-right curve */}
        <g mask={`url(#${uid}-mask-p2)`}>
          <path d={geo.pass2Ribbon} fill={`url(#${uid}-p2-grad)`} />
          <path d={geo.pass2Bevel} fill={`url(#${uid}-p2-bevel)`} opacity="0.85" />
          <path d={geo.crossingShadowPath} fill={`url(#${uid}-cross-shadow)`} />
        </g>

        {/* Traveling arrowhead when diving UNDER the front crossing (Pass 2 phase) */}
        {!staticFinal && (
          <g ref={travellerBackRef} opacity="0">
            <path d={geo.arrowTravellerPath} fill={`url(#${uid}-traveller-grad)`} />
          </g>
        )}

        {/* Front/over strand (/) + left beveled 3D twist + top-right arch */}
        <g mask={`url(#${uid}-mask-p1)`}>
          <path d={geo.pass1Ribbon} fill={`url(#${uid}-p1-base)`} />
          <path d={geo.pass1LowerBevel} fill={`url(#${uid}-p1-lower)`} opacity="0.82" />
          <path d={geo.pass1UpperBevel} fill={`url(#${uid}-p1-upper)`} opacity="0.92" />
          <path d={geo.topRightUndersideFacet} fill="#0B476B" opacity="0.9" />
          <path d={geo.topRightCrestFacet} fill="#45B3CA" opacity="0.88" />
          <path d={geo.leftMidCyanFacet} fill={`url(#${uid}-cyan-left)`} opacity="0.92" />
          <path d={geo.leftOuterIceFacet} fill={`url(#${uid}-ice-left)`} />
        </g>

        {/* Traveling arrowhead during Pass 1 (leading from start over top-right, center /, left loop) */}
        {!staticFinal && (
          <g ref={travellerFrontRef} opacity="0">
            <path d={geo.arrowTravellerPath} fill={`url(#${uid}-traveller-grad)`} />
          </g>
        )}

        {/* Resting flush arrowhead lock */}
        <path
          ref={restingArrowRef}
          d={geo.arrowHeadPath}
          fill={`url(#${uid}-arrow-grad)`}
          style={
            staticFinal
              ? undefined
              : {
                  opacity: 0,
                  transformOrigin: originStr,
                  transform: 'scale(1)',
                }
          }
        />
      </g>

      {/* Nexloop Wordmark */}
      <g clipPath={`url(#${uid}-wordmark-clip)`}>
        {WORDMARK_GLYPHS.map((glyph, idx) => (
          <g key={glyph.char + idx} transform={`translate(${glyph.offsetX}, 0)`}>
            <path
              ref={(el) => {
                glyphRefs.current[idx] = el;
              }}
              d={glyph.d}
              fill={palette.wordmark}
              fillRule={glyph.fillRule}
              style={
                staticFinal
                  ? undefined
                  : {
                      opacity: 0,
                      transform: 'translateY(22px)',
                    }
              }
            />
          </g>
        ))}
      </g>

      {/* Tagline */}
      <text
        ref={taglineRef}
        x="320"
        y="345"
        textAnchor="middle"
        fill={palette.tagline}
        fontFamily="'Plus Jakarta Sans', 'Avenir Next', 'Segoe UI', system-ui, sans-serif"
        fontSize="21.5"
        fontWeight="400"
        letterSpacing="1.4"
        style={
          staticFinal
            ? undefined
            : {
                opacity: 0,
                transform: 'translateY(12px)',
              }
        }
      >
        innovate &#183; connect &#183; move
      </text>
    </svg>
  );
}
