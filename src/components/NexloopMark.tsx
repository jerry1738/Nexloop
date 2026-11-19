import { useId, useMemo } from 'react';
import { buildInfinityGeometry } from '../utils/ribbonGeometry';

interface NexloopMarkProps {
  className?: string;
}

/**
 * Compact vector infinity ribbon mark cropped cleanly to the emblem bounds
 * for navigation headers and footer branding.
 */
export function NexloopMark({ className = 'w-10 h-5 shrink-0' }: NexloopMarkProps) {
  const rawId = useId();
  const uid = useMemo(() => `nlm_${rawId.replace(/[^a-zA-Z0-9]/g, '')}`, [rawId]);
  const geo = useMemo(() => buildInfinityGeometry(), []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="112 24 418 198"
      className={className}
      aria-hidden="true"
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
      </defs>

      <g>
        <path d={geo.pass2Ribbon} fill={`url(#${uid}-p2-grad)`} />
        <path d={geo.pass2Bevel} fill={`url(#${uid}-p2-bevel)`} opacity="0.85" />
        <path d={geo.crossingShadowPath} fill={`url(#${uid}-cross-shadow)`} />

        <path d={geo.pass1Ribbon} fill={`url(#${uid}-p1-base)`} />
        <path d={geo.pass1LowerBevel} fill={`url(#${uid}-p1-lower)`} opacity="0.82" />
        <path d={geo.pass1UpperBevel} fill={`url(#${uid}-p1-upper)`} opacity="0.92" />
        <path d={geo.topRightUndersideFacet} fill="#0B476B" opacity="0.9" />
        <path d={geo.topRightCrestFacet} fill="#45B3CA" opacity="0.88" />
        <path d={geo.leftMidCyanFacet} fill={`url(#${uid}-cyan-left)`} opacity="0.92" />
        <path d={geo.leftOuterIceFacet} fill={`url(#${uid}-ice-left)`} />

        <path d={geo.arrowHeadPath} fill={`url(#${uid}-arrow-grad)`} />
      </g>
    </svg>
  );
}
