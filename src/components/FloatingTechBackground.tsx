import { motion, useReducedMotion } from 'motion/react';

type TechIconKey =
  | 'apple'
  | 'android'
  | 'chrome'
  | 'react'
  | 'code'
  | 'docker'
  | 'kubernetes'
  | 'git'
  | 'terminal'
  | 'cloud'
  | 'database'
  | 'figma'
  | 'swift'
  | 'node'
  | 'graphql'
  | 'flutter'
  | 'vscode'
  | 'python';

interface FloatingIconConfig {
  id: string;
  icon: TechIconKey;
  left: string;
  top: string;
  size: number;
  rotate: number;
  driftX: number;
  driftY: number;
  driftRot: number;
  duration: number;
  delay: number;
  opacity: number;
  hideOnMobile?: boolean;
}

const FLOATING_ICONS: FloatingIconConfig[] = [
  { id: 'f1', icon: 'apple', left: '4%', top: '8%', size: 34, rotate: -10, driftX: 10, driftY: -14, driftRot: 7, duration: 8.5, delay: 0, opacity: 0.12 },
  { id: 'f2', icon: 'chrome', left: '16%', top: '14%', size: 30, rotate: 12, driftX: -8, driftY: 12, driftRot: -9, duration: 9.8, delay: 0.4, opacity: 0.1 },
  { id: 'f3', icon: 'android', left: '31%', top: '6%', size: 36, rotate: 8, driftX: 11, driftY: 10, driftRot: 6, duration: 10.4, delay: 0.9, opacity: 0.12 },
  { id: 'f4', icon: 'react', left: '46%', top: '12%', size: 40, rotate: -6, driftX: -12, driftY: -12, driftRot: 14, duration: 11.2, delay: 0.2, opacity: 0.13 },
  { id: 'f5', icon: 'code', left: '60%', top: '7%', size: 32, rotate: -12, driftX: 9, driftY: 13, driftRot: -6, duration: 8.8, delay: 1.1, opacity: 0.11, hideOnMobile: true },
  { id: 'f6', icon: 'docker', left: '74%', top: '9%', size: 38, rotate: 9, driftX: -10, driftY: -11, driftRot: 8, duration: 9.6, delay: 0.6, opacity: 0.13 },
  { id: 'f7', icon: 'apple', left: '89%', top: '12%', size: 36, rotate: 14, driftX: -11, driftY: 14, driftRot: -8, duration: 10.1, delay: 1.4, opacity: 0.12 },

  { id: 'f8', icon: 'git', left: '8%', top: '34%', size: 30, rotate: 16, driftX: 12, driftY: -10, driftRot: -10, duration: 9.2, delay: 0.7, opacity: 0.1 },
  { id: 'f9', icon: 'figma', left: '24%', top: '28%', size: 28, rotate: -8, driftX: -9, driftY: 12, driftRot: 7, duration: 10.6, delay: 1.8, opacity: 0.09, hideOnMobile: true },
  { id: 'f10', icon: 'database', left: '42%', top: '32%', size: 32, rotate: 6, driftX: 10, driftY: -13, driftRot: -5, duration: 11.8, delay: 0.3, opacity: 0.11 },
  { id: 'f11', icon: 'kubernetes', left: '55%', top: '28%', size: 38, rotate: 10, driftX: -12, driftY: 11, driftRot: 15, duration: 12.2, delay: 1.2, opacity: 0.14 },
  { id: 'f12', icon: 'android', left: '84%', top: '32%', size: 36, rotate: -14, driftX: 9, driftY: -14, driftRot: 9, duration: 9.4, delay: 0.5, opacity: 0.14 },
  { id: 'f13', icon: 'swift', left: '94%', top: '28%', size: 32, rotate: 8, driftX: -8, driftY: 11, driftRot: -7, duration: 10.8, delay: 1.5, opacity: 0.11, hideOnMobile: true },

  { id: 'f14', icon: 'terminal', left: '3%', top: '60%', size: 32, rotate: -9, driftX: 11, driftY: 11, driftRot: 6, duration: 10.2, delay: 1.0, opacity: 0.11 },
  { id: 'f15', icon: 'cloud', left: '19%', top: '54%', size: 38, rotate: 5, driftX: -10, driftY: -12, driftRot: -5, duration: 11.5, delay: 0.1, opacity: 0.1 },
  { id: 'f16', icon: 'chrome', left: '38%', top: '58%', size: 34, rotate: -14, driftX: 9, driftY: 14, driftRot: 10, duration: 9.7, delay: 1.6, opacity: 0.11, hideOnMobile: true },
  { id: 'f17', icon: 'node', left: '53%', top: '52%', size: 34, rotate: 12, driftX: -11, driftY: -10, driftRot: -8, duration: 10.9, delay: 0.8, opacity: 0.13 },
  { id: 'f18', icon: 'vscode', left: '72%', top: '48%', size: 34, rotate: -11, driftX: 10, driftY: 13, driftRot: 8, duration: 9.5, delay: 1.3, opacity: 0.13, hideOnMobile: true },
  { id: 'f19', icon: 'chrome', left: '91%', top: '55%', size: 36, rotate: 15, driftX: -12, driftY: -13, driftRot: -11, duration: 8.9, delay: 0.2, opacity: 0.13 },

  { id: 'f20', icon: 'python', left: '11%', top: '79%', size: 34, rotate: 10, driftX: 10, driftY: -12, driftRot: -7, duration: 11.1, delay: 1.7, opacity: 0.1 },
  { id: 'f21', icon: 'flutter', left: '29%', top: '76%', size: 30, rotate: -12, driftX: -9, driftY: 10, driftRot: 8, duration: 9.3, delay: 0.5, opacity: 0.1, hideOnMobile: true },
  { id: 'f22', icon: 'graphql', left: '47%', top: '72%', size: 32, rotate: 7, driftX: 11, driftY: -11, driftRot: 9, duration: 10.5, delay: 1.1, opacity: 0.11 },
  { id: 'f23', icon: 'apple', left: '62%', top: '71%', size: 32, rotate: -15, driftX: -8, driftY: 12, driftRot: -6, duration: 9.1, delay: 0.4, opacity: 0.12 },
  { id: 'f24', icon: 'react', left: '85%', top: '76%', size: 38, rotate: 11, driftX: 10, driftY: -14, driftRot: 12, duration: 11.6, delay: 1.3, opacity: 0.13 },
  { id: 'f25', icon: 'code', left: '93%', top: '84%', size: 30, rotate: -8, driftX: -9, driftY: 9, driftRot: -6, duration: 8.6, delay: 0.9, opacity: 0.1, hideOnMobile: true },
  { id: 'f26', icon: 'docker', left: '54%', top: '87%', size: 34, rotate: -7, driftX: 9, driftY: -9, driftRot: 5, duration: 10.0, delay: 1.9, opacity: 0.1 },
];

function MonochromeTechSvg({ icon, size }: { icon: TechIconKey; size: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    'aria-hidden': true as const,
  };

  switch (icon) {
    case 'apple':
      return (
        <svg {...props} fill="currentColor">
          <path d="M16.36 12.76c-.03-2.48 2.02-3.68 2.11-3.74-1.15-1.68-2.94-1.91-3.57-1.94-1.5-.15-2.96.9-3.72.9-.77 0-1.94-.88-3.2-.86-1.62.03-3.14.96-3.98 2.42-1.72 2.98-.44 7.36 1.21 9.77.83 1.18 1.8 2.5 3.07 2.45 1.24-.05 1.71-.79 3.21-.79 1.49 0 1.92.79 3.22.76 1.33-.02 2.17-1.19 2.97-2.38.96-1.38 1.34-2.74 1.36-2.81-.03-.02-2.65-1.01-2.68-3.68zM13.94 5.5c.67-.82 1.13-1.94 1-3.07-.97.04-2.18.65-2.88 1.46-.61.7-.16 1.86-1.02 2.96 1.09.08 2.21-.53 2.9-1.35z" />
        </svg>
      );
    case 'android':
      return (
        <svg {...props} fill="currentColor">
          <path d="M17.53 8.5l1.42-2.46a.5.5 0 0 0-.87-.5L16.6 8.08A8.6 8.6 0 0 0 12 7c-1.7 0-3.27.4-4.6 1.08L5.92 5.54a.5.5 0 0 0-.87.5L6.47 8.5A7.6 7.6 0 0 0 3 15h18a7.6 7.6 0 0 0-3.47-6.5zM8.5 12.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM5 16.5h14v1.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1.5z" />
        </svg>
      );
    case 'chrome':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9.5" />
          <circle cx="12" cy="12" r="3.6" />
          <line x1="12" y1="8.4" x2="20.6" y2="8.4" />
          <line x1="8.8" y1="13.8" x2="4.6" y2="6.6" />
          <line x1="15.2" y1="13.8" x2="11" y2="21.1" />
        </svg>
      );
    case 'react':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.4">
          <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'code':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="8 7 3 12 8 17" />
          <polyline points="16 7 21 12 16 17" />
          <line x1="14" y1="5" x2="10" y2="19" />
        </svg>
      );
    case 'docker':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="8" width="3" height="2.8" />
          <rect x="9.5" y="8" width="3" height="2.8" />
          <rect x="13" y="8" width="3" height="2.8" />
          <rect x="9.5" y="4.8" width="3" height="2.8" />
          <path d="M2.5 13h16.5c.8 0 1.7-.7 2.2-1.5.7.9.8 2.2.2 3.3C19.8 17.8 16.5 19.5 11.5 19.5c-5.8 0-9-3.2-9-6.5z" />
        </svg>
      );
    case 'kubernetes':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2.5 19.6 6.2 21.5 14.3 16.2 20.8 7.8 20.8 2.5 14.3 4.4 6.2" />
          <circle cx="12" cy="12" r="2.6" />
          <line x1="12" y1="2.5" x2="12" y2="9.4" />
          <line x1="19.6" y1="6.2" x2="14.2" y2="10.4" />
          <line x1="21.5" y1="14.3" x2="14.5" y2="12.6" />
          <line x1="16.2" y1="20.8" x2="13.2" y2="14.4" />
          <line x1="7.8" y1="20.8" x2="10.8" y2="14.4" />
          <line x1="2.5" y1="14.3" x2="9.5" y2="12.6" />
          <line x1="4.4" y1="6.2" x2="9.8" y2="10.4" />
        </svg>
      );
    case 'git':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6.5" cy="5.5" r="2.2" />
          <circle cx="17.5" cy="8.5" r="2.2" />
          <circle cx="6.5" cy="18.5" r="2.2" />
          <line x1="6.5" y1="7.7" x2="6.5" y2="16.3" />
          <path d="M17.5 10.7C17.5 14 14 14.5 6.5 15" />
        </svg>
      );
    case 'terminal':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
          <polyline points="6.5 9.5 10 12.5 6.5 15.5" />
          <line x1="12" y1="15.5" x2="17" y2="15.5" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 18h11a4 4 0 0 0 .8-7.9A5.5 5.5 0 0 0 7.6 8.3 4.2 4.2 0 0 0 6.5 18z" />
        </svg>
      );
    case 'database':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
          <path d="M4.5 5.5v13c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-13" />
          <path d="M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
        </svg>
      );
    case 'figma':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h3v6H9a3 3 0 0 1 0-6z" />
          <path d="M12 3h3a3 3 0 0 1 0 6h-3V3z" />
          <path d="M9 9h3v6H9a3 3 0 0 1 0-6z" />
          <circle cx="15" cy="12" r="3" />
          <path d="M9 15h3v3a3 3 0 0 1-3-3z" />
        </svg>
      );
    case 'swift':
      return (
        <svg {...props} fill="currentColor">
          <path d="M19.8 15.6c.7 1.3.4 2.8-.6 3.7-.3-1.2-1.3-1.8-2.6-1.6-2.8.5-6.7-.8-10.3-3.6-1.4-1.1-2.5-2.3-3.3-3.6 2.3 1.7 5.2 2.8 8 3-2.6-2.1-4.8-4.7-6.3-7.6 2.4 2 5.3 3.7 8.4 4.8-1.4-2-2.4-4.2-2.8-6.4 3.4 2.8 6.4 6.1 8 9.8.6 1.3 1.2 1 1.5 1.5z" />
        </svg>
      );
    case 'node':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2.5 20.2 7.25 20.2 16.75 12 21.5 3.8 16.75 3.8 7.25" />
          <path d="M9.5 15V9l5 6V9" />
        </svg>
      );
    case 'graphql':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 3.2 19.6 7.6 19.6 16.4 12 20.8 4.4 16.4 4.4 7.6" />
          <polygon points="12 3.2 19.6 16.4 4.4 16.4" />
          <circle cx="12" cy="3.2" r="1.3" fill="currentColor" />
          <circle cx="19.6" cy="7.6" r="1.3" fill="currentColor" />
          <circle cx="19.6" cy="16.4" r="1.3" fill="currentColor" />
          <circle cx="12" cy="20.8" r="1.3" fill="currentColor" />
          <circle cx="4.4" cy="16.4" r="1.3" fill="currentColor" />
          <circle cx="4.4" cy="7.6" r="1.3" fill="currentColor" />
        </svg>
      );
    case 'flutter':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13.5 3 4 12.5 7 15.5 19.5 3" />
          <polygon points="13.5 12 8.5 17 13.5 22 19.5 22 14.5 17 19.5 12" />
        </svg>
      );
    case 'vscode':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 3.5L20 5.2v13.6l-3.5 1.7-9-8.5 9-8.5z" />
          <path d="M7.5 12L4 9.2l1.6-1.5L16.5 16" />
          <path d="M7.5 12L4 14.8l1.6 1.5L16.5 8" />
        </svg>
      );
    case 'python':
      return (
        <svg {...props} stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.5c-3 0-3 1.4-3 2.8V8.5h6v1H7.5C5.5 9.5 4 11 4 13.2s1.3 3.3 3.2 3.3H8.5V14c0-1.6 1.2-2.8 2.8-2.8h4.2c1.2 0 2-.9 2-2V6.3c0-1.4-1.3-2.8-5.5-2.8z" />
          <path d="M12 20.5c3 0 3-1.4 3-2.8v-2.2H9v-1h7.5c2 0 3.5-1.5 3.5-3.7s-1.3-3.3-3.2-3.3h-1.3V10c0 1.6-1.2 2.8-2.8 2.8H8.5c-1.2 0-2 .9-2 2v2.9c0 1.4 1.3 2.8 5.5 2.8z" />
        </svg>
      );
  }
}

export function FloatingTechBackground() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
    >
      {/* Soft architectural ambient glow behind hero copy and character */}
      <div className="absolute -top-24 right-[-6%] w-[520px] h-[520px] rounded-full bg-[#E6F2F9]/55 blur-3xl" />
      <div className="absolute bottom-[-80px] left-[-6%] w-[420px] h-[420px] rounded-full bg-[#F1F7FA]/80 blur-3xl" />

      {FLOATING_ICONS.map((item) => (
        <motion.div
          key={item.id}
          style={{
            left: item.left,
            top: item.top,
            opacity: item.opacity,
          }}
          initial={{ rotate: item.rotate, x: 0, y: 0 }}
          animate={
            prefersReduced
              ? { rotate: item.rotate }
              : {
                  x: [0, item.driftX, -item.driftX * 0.65, 0],
                  y: [0, item.driftY, -item.driftY * 0.55, 0],
                  rotate: [item.rotate, item.rotate + item.driftRot, item.rotate - item.driftRot * 0.5, item.rotate],
                }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : {
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          className={`absolute text-[#0D5683] ${
            item.hideOnMobile ? 'hidden sm:block' : 'block'
          }`}
        >
          <MonochromeTechSvg icon={item.icon} size={item.size} />
        </motion.div>
      ))}
    </div>
  );
}
