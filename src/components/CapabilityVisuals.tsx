import { motion, useReducedMotion } from 'motion/react';
import type { ErpModulePreview } from '../data/companyData';

export function ErpArchitectureVisual({
  activeModule,
}: {
  activeModule: ErpModulePreview['id'];
}) {
  const prefersReduced = useReducedMotion();

  const nodes: {
    id: ErpModulePreview['id'];
    label: string;
    x: number;
    y: number;
    metric: string;
  }[] = [
    { id: 'ledger', label: 'Ledger', x: 58, y: 44, metric: 'GL Sync' },
    { id: 'inventory', label: 'Inventory', x: 242, y: 44, metric: '14 Hubs' },
    { id: 'procurement', label: 'Procurement', x: 150, y: 192, metric: 'PO Flow' },
  ];

  const activeNode = nodes.find((n) => n.id === activeModule) ?? nodes[0];

  return (
    <div
      className="relative w-full h-[230px] sm:h-[264px] rounded-xl bg-[#041525]/85 border border-white/15 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Precision architectural coordinate grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(88,196,216,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(88,196,216,0.16) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <svg
        viewBox="0 0 300 232"
        className="relative z-10 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection splines from core (150, 114) to each module node */}
        {nodes.map((node) => {
          const isActive = node.id === activeModule;
          return (
            <g key={node.id}>
              <line
                x1="150"
                y1="114"
                x2={node.x}
                y2={node.y}
                stroke={isActive ? '#58C4D8' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isActive ? 2 : 1.2}
                strokeDasharray={isActive ? undefined : '4 4'}
              />

              {!prefersReduced && isActive && (
                <motion.g
                  initial={{ x: 150, y: 114, opacity: 0.9 }}
                  animate={{
                    x: [150, node.x, 150],
                    y: [114, node.y, 114],
                    opacity: [0.35, 1, 0.35],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <circle cx="0" cy="0" r="4" fill="#58C4D8" />
                </motion.g>
              )}
            </g>
          );
        })}

        {/* Central Nexloop Core Hub */}
        <g transform="translate(150, 114)">
          {!prefersReduced && (
            <motion.g
              animate={{ scale: [1, 1.24, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            >
              <circle cx="0" cy="0" r="34" fill="none" stroke="#58C4D8" strokeWidth="1" />
            </motion.g>
          )}
          <circle cx="0" cy="0" r="27" fill="#0B3254" stroke="#58C4D8" strokeWidth="1.75" />
          <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">
            ERP
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#8ED8E6" fontSize="7.5" fontWeight="500">
            Core
          </text>
        </g>

        {/* Peripheral ERP Module Nodes */}
        {nodes.map((node) => {
          const isActive = node.id === activeModule;
          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <rect
                x="-44"
                y="-20"
                width="88"
                height="40"
                rx="8"
                fill={isActive ? '#0D5683' : '#08233C'}
                stroke={isActive ? '#58C4D8' : 'rgba(255,255,255,0.22)'}
                strokeWidth={isActive ? 1.6 : 1}
              />
              <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="600">
                {node.label}
              </text>
              <text
                x="0"
                y="11"
                textAnchor="middle"
                fill={isActive ? '#A5E8F5' : '#94A3B8'}
                fontSize="7.5"
              >
                {node.metric}
              </text>
            </g>
          );
        })}

        <text
          x="286"
          y="220"
          textAnchor="end"
          fill="#8ED8E6"
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
        >
          {activeNode.label} · {activeNode.metric}
        </text>
      </svg>
    </div>
  );
}

export function MobileSyncVisual() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="relative w-full h-[168px] rounded-xl bg-gradient-to-br from-[#F2F7FB] to-[#FAFCFE] overflow-hidden flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-65"
        style={{
          backgroundImage: 'radial-gradient(rgba(13,86,131,0.14) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <svg
        viewBox="0 0 320 156"
        className="relative z-10 w-full h-full max-w-[320px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="nl-mobile-sync" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D5683" />
            <stop offset="100%" stopColor="#58C4D8" />
          </linearGradient>
        </defs>

        {/* Bi-directional encrypted sync arcs between iOS and Android */}
        <path
          d="M 114 62 Q 160 36 206 62"
          fill="none"
          stroke="rgba(13,86,131,0.22)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 206 96 Q 160 122 114 96"
          fill="none"
          stroke="rgba(23,112,148,0.22)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {!prefersReduced && (
          <>
            <motion.g
              initial={{ x: 114, y: 62, opacity: 0.3 }}
              animate={{
                x: [114, 160, 206],
                y: [62, 49, 62],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="0" cy="0" r="3.5" fill="#0D5683" />
            </motion.g>
            <motion.g
              initial={{ x: 206, y: 96, opacity: 0.3 }}
              animate={{
                x: [206, 160, 114],
                y: [96, 109, 96],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 1.05 }}
            >
              <circle cx="0" cy="0" r="3.5" fill="#58C4D8" />
            </motion.g>
          </>
        )}

        {/* Center Sync Badge Label */}
        <text
          x="160"
          y="81"
          textAnchor="middle"
          fill="#0D5683"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
        >
          60fps · Sync
        </text>

        {/* Left iOS Silhouette */}
        <motion.g
          animate={prefersReduced ? undefined : { y: [0, -3.5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect
            x="40"
            y="18"
            width="68"
            height="120"
            rx="14"
            fill="#FFFFFF"
            stroke="#0D5683"
            strokeOpacity="0.55"
            strokeWidth="1.8"
          />
          <rect x="63" y="25" width="22" height="3" rx="1.5" fill="#CBD5E1" />
          <rect x="49" y="38" width="50" height="20" rx="5" fill="#E6F2F9" />
          <text x="74" y="51" textAnchor="middle" fill="#0D5683" fontSize="9.5" fontWeight="700">
            iOS
          </text>
          <rect x="49" y="66" width="50" height="6" rx="3" fill="#E2E8F0" />
          <rect x="49" y="77" width="36" height="6" rx="3" fill="#F1F5F9" />
          <rect x="49" y="96" width="50" height="16" rx="5" fill="#0D5683" />
          <rect x="61" y="128" width="26" height="2.5" rx="1.25" fill="#CBD5E1" />
        </motion.g>

        {/* Right Android Silhouette */}
        <motion.g
          animate={prefersReduced ? undefined : { y: [0, 3.5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
        >
          <rect
            x="212"
            y="18"
            width="68"
            height="120"
            rx="12"
            fill="#FFFFFF"
            stroke="#177094"
            strokeOpacity="0.55"
            strokeWidth="1.8"
          />
          <circle cx="246" cy="27" r="2.2" fill="#CBD5E1" />
          <rect x="221" y="38" width="50" height="20" rx="5" fill="#EAF7FA" />
          <text x="246" y="51" textAnchor="middle" fill="#177094" fontSize="9.5" fontWeight="700">
            Android
          </text>
          <rect x="221" y="66" width="50" height="6" rx="3" fill="#E2E8F0" />
          <rect x="221" y="77" width="38" height="6" rx="3" fill="#F1F5F9" />
          <rect x="221" y="96" width="50" height="16" rx="5" fill="url(#nl-mobile-sync)" />
          <rect x="235" y="128" width="22" height="2.5" rx="1.25" fill="#CBD5E1" />
        </motion.g>
      </svg>
    </div>
  );
}

export function WebEdgeVisual() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="relative w-full h-[168px] rounded-xl bg-gradient-to-br from-[#F2F7FB] to-[#FAFCFE] overflow-hidden flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(13,86,131,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,86,131,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <svg
        viewBox="0 0 320 156"
        className="relative z-10 w-full h-full max-w-[320px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Minimalist Browser Wireframe */}
        <rect
          x="22"
          y="16"
          width="276"
          height="124"
          rx="10"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />
        <line x1="22" y1="38" x2="298" y2="38" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="36" cy="27" r="3" fill="#CBD5E1" />
        <circle cx="46" cy="27" r="3" fill="#CBD5E1" />
        <circle cx="56" cy="27" r="3" fill="#CBD5E1" />
        <text
          x="160"
          y="30"
          textAnchor="middle"
          fill="#64748B"
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
        >
          portal.nexloop.io
        </text>
        <text
          x="284"
          y="30"
          textAnchor="end"
          fill="#0D5683"
          fontSize="8.5"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
        >
          &lt;1.2s
        </text>

        {/* Animated Edge Streaming Bar using transform x */}
        <rect x="22" y="38" width="276" height="2.2" fill="#F1F5F9" />
        {!prefersReduced && (
          <motion.g
            initial={{ x: 22 }}
            animate={{ x: [22, 206, 22] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="0" y="38" width="92" height="2.2" fill="#58C4D8" />
          </motion.g>
        )}

        {/* Modular Grid Layout Inside Browser */}
        <motion.g
          animate={prefersReduced ? undefined : { opacity: [0.82, 1, 0.82] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="36" y="52" width="144" height="74" rx="6" fill="#EAF4FA" />
          <text x="48" y="72" fill="#0D5683" fontSize="9.5" fontWeight="700">
            B2B Client Portal
          </text>
          <rect x="48" y="82" width="108" height="6" rx="3" fill="#0D5683" fillOpacity="0.22" />
          <rect x="48" y="94" width="84" height="6" rx="3" fill="#0D5683" fillOpacity="0.14" />
          <rect x="48" y="108" width="54" height="10" rx="4" fill="#0D5683" />
        </motion.g>

        <rect x="190" y="52" width="94" height="33" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
        <text x="200" y="72" fill="#334155" fontSize="8.5" fontWeight="600">
          SEO
        </text>
        <text
          x="274"
          y="72"
          textAnchor="end"
          fill="#0D5683"
          fontSize="8.5"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
        >
          AA+
        </text>

        <rect x="190" y="93" width="94" height="33" rx="6" fill="#0D5683" />
        <text x="200" y="113" fill="#FFFFFF" fontSize="8.5" fontWeight="600">
          Edge
        </text>
        <text
          x="274"
          y="113"
          textAnchor="end"
          fill="#A5E8F5"
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
        >
          CDN
        </text>
      </svg>
    </div>
  );
}

export function CloudMeshVisual() {
  const prefersReduced = useReducedMotion();

  const stages = [
    { x: 46, label: 'APIs', sub: 'REST · GraphQL' },
    { x: 132, label: 'Auth', sub: 'Zero-Trust' },
    { x: 218, label: 'Workers', sub: 'Queues' },
    { x: 304, label: 'Cloud', sub: '99.94% SLA' },
  ];

  return (
    <div
      className="relative w-full h-[196px] sm:h-[214px] rounded-xl bg-gradient-to-br from-[#F2F7FB] via-[#FAFCFE] to-[#EBF4FA] border border-[#0D5683]/15 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(13,86,131,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,86,131,0.06) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <svg
        viewBox="0 0 350 180"
        className="relative z-10 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="20"
          y="26"
          fill="#64748B"
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
        >
          Service Mesh Architecture
        </text>
        <text
          x="330"
          y="26"
          textAnchor="end"
          fill="#0D5683"
          fontSize="8.5"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
        >
          CI/CD Automated
        </text>

        {/* Backbone bus line */}
        <line x1="46" y1="90" x2="304" y2="90" stroke="rgba(13,86,131,0.2)" strokeWidth="2" />

        {/* Secondary curved bypass spline */}
        <path
          d="M 46 90 Q 175 44 304 90"
          fill="none"
          stroke="rgba(88,196,216,0.4)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
        />

        {/* Animated packets traveling left-to-right via compositor transform */}
        {!prefersReduced && (
          <>
            <motion.g
              initial={{ x: 46, y: 90, opacity: 0 }}
              animate={{ x: [46, 304], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="0" cy="0" r="4" fill="#0D5683" />
            </motion.g>
            <motion.g
              initial={{ x: 46, y: 90, opacity: 0 }}
              animate={{
                x: [46, 175, 304],
                y: [90, 67, 90],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            >
              <circle cx="0" cy="0" r="3.2" fill="#58C4D8" />
            </motion.g>
          </>
        )}

        {/* Pipeline Stage Nodes */}
        {stages.map((stage, idx) => (
          <motion.g
            key={stage.label}
            animate={prefersReduced ? undefined : { y: [0, -2.5, 0] }}
            transition={{
              duration: 3.4,
              delay: idx * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <rect
              x={stage.x - 32}
              y="62"
              width="64"
              height="56"
              rx="10"
              fill="#FFFFFF"
              stroke="#0D5683"
              strokeOpacity="0.24"
              strokeWidth="1.2"
            />
            <circle cx={stage.x} cy="78" r="6" fill="#E6F2F9" />
            <circle cx={stage.x} cy="78" r="2.6" fill="#0D5683" />
            <text
              x={stage.x}
              y="97"
              textAnchor="middle"
              fill="#0F172A"
              fontSize="9.5"
              fontWeight="700"
            >
              {stage.label}
            </text>
            <text x={stage.x} y="109" textAnchor="middle" fill="#64748B" fontSize="7.2">
              {stage.sub}
            </text>
          </motion.g>
        ))}

        {/* Bottom throughput rail */}
        <rect x="20" y="150" width="310" height="4" rx="2" fill="#DCEBF4" />
        {!prefersReduced && (
          <motion.g
            initial={{ x: 20 }}
            animate={{ x: [20, 234, 20] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="0" y="150" width="96" height="4" rx="2" fill="#0D5683" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
