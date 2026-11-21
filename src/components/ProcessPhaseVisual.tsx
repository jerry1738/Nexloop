import { motion, useReducedMotion } from 'motion/react';

interface ProcessPhaseVisualProps {
  activeIndex: number;
}

/**
 * Interactive, GPU-composited vector motion stage illustrating each of Nexloop's 4 build phases.
 * All SVG coordinate attributes (cx, cy, x, y) stay static numbers; animations exclusively mutate
 * <motion.g> transforms (`x`, `y`, `scale`, `rotate`, `opacity`) to stay fast and warning-free.
 */
export function ProcessPhaseVisual({ activeIndex }: ProcessPhaseVisualProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative h-full min-h-[260px] sm:min-h-[300px] w-full flex items-center justify-center rounded-xl bg-[#041423]/70 border border-white/10 overflow-hidden p-4">
      {/* Subtle architectural grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(169, 213, 236, 0.35) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-[#58C4D8]/15 blur-3xl pointer-events-none"
      />

      <motion.div
        key={`phase-visual-${activeIndex}`}
        initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[380px]"
      >
        {activeIndex === 0 && <DiscoveryBlueprintSvg reduced={!!prefersReduced} />}
        {activeIndex === 1 && <DesignPrototypeSvg reduced={!!prefersReduced} />}
        {activeIndex === 2 && <EngineeringPipelineSvg reduced={!!prefersReduced} />}
        {activeIndex === 3 && <RolloutSlaSvg reduced={!!prefersReduced} />}
      </motion.div>
    </div>
  );
}

function DiscoveryBlueprintSvg({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      role="img"
      aria-label="Legacy systems connecting into a unified software architecture blueprint"
    >
      {/* Connector tracks */}
      <path
        d="M84 48 C 145 48, 165 110, 212 110"
        fill="none"
        stroke="rgba(169,213,236,0.28)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d="M84 110 L 212 110"
        fill="none"
        stroke="rgba(169,213,236,0.28)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d="M84 172 C 145 172, 165 110, 212 110"
        fill="none"
        stroke="rgba(169,213,236,0.28)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Animated stream packets */}
      {!reduced && (
        <>
          <motion.g
            initial={{ x: 84, y: 48, opacity: 0 }}
            animate={{ x: [84, 148, 206], y: [48, 76, 110], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="0" cy="0" r="4" fill="#58C4D8" />
          </motion.g>
          <motion.g
            initial={{ x: 84, y: 110, opacity: 0 }}
            animate={{ x: [84, 206], y: [110, 110], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, delay: 0.65, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="0" cy="0" r="4" fill="#A9D5EC" />
          </motion.g>
          <motion.g
            initial={{ x: 84, y: 172, opacity: 0 }}
            animate={{ x: [84, 148, 206], y: [172, 142, 110], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, delay: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="0" cy="0" r="4" fill="#58C4D8" />
          </motion.g>
        </>
      )}

      {/* Left source silos */}
      {[
        { y: 30, label: 'Spreadsheets' },
        { y: 92, label: 'Legacy ERP' },
        { y: 154, label: 'Field Ops' },
      ].map((item, idx) => (
        <motion.g
          key={item.label}
          initial={reduced ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.09 }}
        >
          <rect
            x="16"
            y={item.y}
            width="92"
            height="36"
            rx="8"
            fill="rgba(11, 48, 82, 0.9)"
            stroke="rgba(169, 213, 236, 0.35)"
            strokeWidth="1"
          />
          <text
            x="62"
            y={item.y + 22}
            textAnchor="middle"
            fill="#E0F4FB"
            fontSize="10.5"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            {item.label}
          </text>
        </motion.g>
      ))}

      {/* Target Architecture Core with rotating outer ring */}
      <g transform="translate(274, 110)">
        <motion.g
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="0"
            cy="0"
            r="56"
            fill="none"
            stroke="rgba(88, 196, 216, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="10 6"
          />
        </motion.g>
        <motion.g
          animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle
            cx="0"
            cy="0"
            r="44"
            fill="rgba(13, 86, 131, 0.85)"
            stroke="#58C4D8"
            strokeWidth="1.5"
          />
        </motion.g>
        <text
          x="0"
          y="-4"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="11"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          Blueprint
        </text>
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fill="#A9D5EC"
          fontSize="9.5"
          fontFamily="JetBrains Mono, monospace"
        >
          API + DB Map
        </text>
      </g>
    </svg>
  );
}

function DesignPrototypeSvg({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      role="img"
      aria-label="Interactive prototype components snapping cleanly into place"
    >
      {/* Artboard frame */}
      <rect
        x="34"
        y="20"
        width="292"
        height="180"
        rx="12"
        fill="rgba(11, 48, 82, 0.85)"
        stroke="rgba(169, 213, 236, 0.35)"
        strokeWidth="1.2"
      />

      {/* Top Navigation wireframe bar */}
      <motion.g
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <rect x="48" y="34" width="264" height="22" rx="6" fill="rgba(255,255,255,0.08)" />
        <rect x="56" y="41" width="44" height="8" rx="4" fill="#58C4D8" />
        <rect x="220" y="42" width="26" height="6" rx="3" fill="rgba(224,244,251,0.35)" />
        <rect x="254" y="42" width="26" height="6" rx="3" fill="rgba(224,244,251,0.35)" />
        <rect x="288" y="40" width="16" height="10" rx="5" fill="#A9D5EC" />
      </motion.g>

      {/* Left card module */}
      <motion.g
        initial={reduced ? false : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
      >
        <rect
          x="48"
          y="68"
          width="126"
          height="116"
          rx="9"
          fill="rgba(23, 112, 148, 0.28)"
          stroke="rgba(88, 196, 216, 0.4)"
          strokeWidth="1"
        />
        <rect x="60" y="82" width="76" height="10" rx="4" fill="#E0F4FB" />
        <rect x="60" y="100" width="96" height="7" rx="3.5" fill="rgba(169,213,236,0.45)" />
        <rect x="60" y="113" width="84" height="7" rx="3.5" fill="rgba(169,213,236,0.35)" />
        <rect x="60" y="144" width="66" height="24" rx="12" fill="#58C4D8" />
        <text
          x="93"
          y="160"
          textAnchor="middle"
          fill="#041423"
          fontSize="9.5"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          Approve
        </text>
      </motion.g>

      {/* Right mobile / tablet card */}
      <motion.g
        initial={reduced ? false : { opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <rect
          x="186"
          y="68"
          width="126"
          height="116"
          rx="9"
          fill="rgba(4, 20, 35, 0.65)"
          stroke="rgba(169, 213, 236, 0.28)"
          strokeWidth="1"
        />
        <rect x="200" y="82" width="98" height="44" rx="6" fill="rgba(88,196,216,0.16)" />
        <path
          d="M 210 116 L 232 102 L 252 110 L 284 90"
          fill="none"
          stroke="#58C4D8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="200" y="138" width="98" height="14" rx="4" fill="rgba(255,255,255,0.08)" />
        <rect x="200" y="158" width="70" height="14" rx="4" fill="rgba(255,255,255,0.06)" />
      </motion.g>

      {/* Playful gliding cursor testing interactions */}
      {!reduced && (
        <motion.g
          initial={{ x: 96, y: 156 }}
          animate={{
            x: [96, 248, 286, 96],
            y: [156, 108, 46, 156],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.g
            animate={{ scale: [1, 1.8, 1], opacity: [0.65, 0, 0.65] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <circle cx="0" cy="0" r="8" fill="none" stroke="#58C4D8" strokeWidth="1.5" />
          </motion.g>
          <path
            d="M 0 0 L 0 15 L 4 11 L 9 16 L 11 14 L 6 9 L 12 8 Z"
            fill="#FFFFFF"
            stroke="#041423"
            strokeWidth="1"
          />
        </motion.g>
      )}
    </svg>
  );
}

function EngineeringPipelineSvg({ reduced }: { reduced: boolean }) {
  const gates = [
    { x: 64, title: 'PR & Types', sub: 'Clean TS' },
    { x: 180, title: 'Auto QA', sub: 'Suite Pass' },
    { x: 296, title: 'Staging', sub: 'Live Demo' },
  ];

  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      role="img"
      aria-label="Continuous weekly sprint pipeline moving code from pull request to automated QA to live staging"
    >
      {/* Main pipeline rail */}
      <line
        x1="64"
        y1="104"
        x2="296"
        y2="104"
        stroke="rgba(169,213,236,0.28)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Glowing build packet sliding across the rail */}
      {!reduced && (
        <motion.g
          initial={{ x: 64, y: 104, opacity: 0 }}
          animate={{ x: [64, 180, 296], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="0" cy="0" r="10" fill="rgba(88, 196, 216, 0.25)" />
          <circle cx="0" cy="0" r="5" fill="#58C4D8" />
        </motion.g>
      )}

      {/* 3 Gate nodes */}
      {gates.map((gate, i) => (
        <g key={gate.title} transform={`translate(${gate.x}, 104)`}>
          {!reduced && (
            <motion.g
              animate={{ scale: [1, 1.32, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.6, delay: i * 0.7, repeat: Infinity }}
            >
              <circle cx="0" cy="0" r="24" fill="none" stroke="#58C4D8" strokeWidth="1.5" />
            </motion.g>
          )}
          <circle
            cx="0"
            cy="0"
            r="22"
            fill="rgba(13, 86, 131, 0.92)"
            stroke="#58C4D8"
            strokeWidth="1.6"
          />
          <path
            d="M -6 0.5 L -2 4.5 L 7 -4.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="0"
            y="42"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
          >
            {gate.title}
          </text>
          <text
            x="0"
            y="58"
            textAnchor="middle"
            fill="#A9D5EC"
            fontSize="9.5"
            fontFamily="JetBrains Mono, monospace"
          >
            {gate.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

function RolloutSlaSvg({ reduced }: { reduced: boolean }) {
  const endpoints = [
    { x: 292, y: 50, label: 'Web App' },
    { x: 292, y: 110, label: 'iOS & Android' },
    { x: 292, y: 170, label: 'ERP Cloud' },
  ];

  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      role="img"
      aria-label="Zero-downtime rollout serving Web, Mobile, and ERP endpoints under a managed 99.94% SLA"
    >
      {/* Outbound routes from central core */}
      {endpoints.map((ep) => (
        <path
          key={ep.label}
          d={`M 150 110 C 200 110, 212 ${ep.y}, 244 ${ep.y}`}
          fill="none"
          stroke="rgba(88, 196, 216, 0.45)"
          strokeWidth="1.8"
        />
      ))}

      {/* Live heartbeat pulse rings around 99.94% SLA Core */}
      <g transform="translate(106, 110)">
        <motion.g
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="0"
            cy="0"
            r="56"
            fill="none"
            stroke="rgba(169,213,236,0.35)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
        </motion.g>
        {!reduced && (
          <motion.g
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.1, 0.55] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="0" cy="0" r="46" fill="none" stroke="#58C4D8" strokeWidth="1.5" />
          </motion.g>
        )}
        <circle
          cx="0"
          cy="0"
          r="44"
          fill="rgba(13, 86, 131, 0.9)"
          stroke="#58C4D8"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="-3"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="13.5"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
        >
          99.94%
        </text>
        <text
          x="0"
          y="13"
          textAnchor="middle"
          fill="#A9D5EC"
          fontSize="9.5"
          fontFamily="JetBrains Mono, monospace"
        >
          MANAGED SLA
        </text>
      </g>

      {/* Endpoint badges */}
      {endpoints.map((ep, idx) => (
        <motion.g
          key={ep.label}
          initial={reduced ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.1 }}
        >
          <rect
            x="244"
            y={ep.y - 18}
            width="98"
            height="36"
            rx="8"
            fill="rgba(11, 48, 82, 0.9)"
            stroke="rgba(88, 196, 216, 0.45)"
            strokeWidth="1"
          />
          <text
            x="293"
            y={ep.y + 4}
            textAnchor="middle"
            fill="#E0F4FB"
            fontSize="10.5"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            {ep.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
