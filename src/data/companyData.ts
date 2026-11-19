export type CaseStudyCategory = 'all' | 'erp' | 'mobile' | 'web';

export interface ClientLogo {
  id: string;
  name: string;
  sector: string;
  row: 1 | 2;
  /** Ethiopian enterprise vector emblem; swap name, sector, or SVG mark anytime */
  mark:
    | 'ethiopian-airlines'
    | 'ethio-telecom'
    | 'cbe'
    | 'dashen-bank'
    | 'awash-bank'
    | 'chapa'
    | 'telebirr'
    | 'abyssinia'
    | 'ride'
    | 'zemen-bank'
    | 'gebeya'
    | 'hibret-bank';
}

export interface ServiceOffering {
  id: string;
  index: string;
  title: string;
  category: Exclude<CaseStudyCategory, 'all'>;
  summary: string;
  deliverables: string[];
  outcome: string;
  span: 'wide' | 'narrow';
}

export interface CaseStudy {
  id: string;
  client: string;
  category: Exclude<CaseStudyCategory, 'all'>;
  categoryLabel: string;
  timeline: string;
  title: string;
  metric: string;
  summary: string;
  challenge: string;
  solution: string;
  stack: string[];
  image: string;
  imageAlt: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  timeframe: string;
  detail: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  projectType: string;
  quote: string;
  outcomeMetric: string;
  avatar: string;
  rating: number;
}

export interface ArcSlotLayout {
  offset: number;
  angleDeg: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isCenter: boolean;
}

export interface InquiryFormValues {
  name: string;
  email: string;
  company: string;
  service: string;
  brief: string;
}

export interface InquiryValidationErrors {
  name?: string;
  email?: string;
  brief?: string;
}

export const HERO_IMAGE = {
  src: '/src/assets/images/nexloop_host_girl_cutout.png',
  alt: 'Animated Ethiopian Nexloop engineer welcoming visitors in an ocean-navy Nexloop shirt',
};

export const KPI_METRICS = [
  { value: '48+', label: 'Enterprise & mobile systems shipped' },
  { value: '99.94%', label: 'Average production SLA uptime' },
  { value: '14', label: 'Industries automated across ERP & web' },
  { value: '3.2×', label: 'Faster release velocity after handoff' },
];

/**
 * Real-world Ethiopian enterprises arranged across two opposing marquee rows.
 * Swap company names or vector marks in ClientsSection.tsx anytime.
 */
export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'ethiopian-airlines',
    name: 'Ethiopian Airlines',
    sector: 'Aviation & Cargo',
    row: 1,
    mark: 'ethiopian-airlines',
  },
  {
    id: 'ethio-telecom',
    name: 'ethio telecom',
    sector: 'National Telecom',
    row: 1,
    mark: 'ethio-telecom',
  },
  {
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia',
    sector: 'Enterprise Banking',
    row: 1,
    mark: 'cbe',
  },
  {
    id: 'dashen-bank',
    name: 'Dashen Bank',
    sector: 'Financial Services',
    row: 1,
    mark: 'dashen-bank',
  },
  {
    id: 'awash-bank',
    name: 'Awash Bank',
    sector: 'Commercial Banking',
    row: 1,
    mark: 'awash-bank',
  },
  {
    id: 'chapa',
    name: 'Chapa',
    sector: 'Payment Infrastructure',
    row: 1,
    mark: 'chapa',
  },
  {
    id: 'telebirr',
    name: 'telebirr',
    sector: 'Mobile Money',
    row: 2,
    mark: 'telebirr',
  },
  {
    id: 'abyssinia',
    name: 'Bank of Abyssinia',
    sector: 'Retail & Digital Banking',
    row: 2,
    mark: 'abyssinia',
  },
  {
    id: 'ride',
    name: 'RIDE',
    sector: 'Urban Mobility',
    row: 2,
    mark: 'ride',
  },
  {
    id: 'zemen-bank',
    name: 'Zemen Bank',
    sector: 'Corporate Banking',
    row: 2,
    mark: 'zemen-bank',
  },
  {
    id: 'gebeya',
    name: 'Gebeya',
    sector: 'Tech & Talent Platform',
    row: 2,
    mark: 'gebeya',
  },
  {
    id: 'hibret-bank',
    name: 'Hibret Bank',
    sector: 'Cooperative Banking',
    row: 2,
    mark: 'hibret-bank',
  },
];

export const SERVICES: ServiceOffering[] = [
  {
    id: 'erp',
    index: '01',
    title: 'Enterprise ERP Systems',
    category: 'erp',
    summary:
      'Unified resource planning tailored to how your finance, inventory, procurement, and multi-branch teams actually operate—replacing brittle spreadsheets with one auditable source of truth.',
    deliverables: [
      'General ledger, invoicing & tax automation',
      'Multi-warehouse stock, BOM & procurement',
      'Role-based approvals & audit logs',
    ],
    outcome: 'Cut manual reconciliation by up to 60% in 90 days',
    span: 'wide',
  },
  {
    id: 'mobile',
    index: '02',
    title: 'Mobile Apps (Android & iOS)',
    category: 'mobile',
    summary:
      'High-craft native Kotlin and Swift apps—plus shared React Native architectures—engineered for fast field sync, biometric security, and smooth 60fps customer journeys.',
    deliverables: [
      'Offline-first field & driver apps',
      'App Store & Google Play release pipelines',
      'Biometric auth, push & mobile payments',
    ],
    outcome: 'Built for sub-1s launch times & zero-drop offline sync',
    span: 'narrow',
  },
  {
    id: 'web',
    index: '03',
    title: 'Websites & Customer Portals',
    category: 'web',
    summary:
      'Conversion-focused corporate websites, B2B self-service portals, and SaaS web platforms built with clean typography, crisp motion, and measurable technical SEO.',
    deliverables: [
      'Corporate brand sites & CMS workflows',
      'B2B order & client account portals',
      'Core Web Vitals & accessibility compliance',
    ],
    outcome: 'Fast page loads under 1.2s across mobile & desktop',
    span: 'narrow',
  },
  {
    id: 'custom',
    index: '04',
    title: 'Custom Software, APIs & Cloud Infrastructure',
    category: 'web',
    summary:
      'Bespoke internal platforms, legacy system migrations, third-party payment and carrier API integrations, UI/UX design systems, and 24/7 DevOps monitoring.',
    deliverables: [
      'Custom workflow engines & legacy migrations',
      'Payment, ERP, CRM & logistics API bridges',
      'CI/CD automation, cloud security & 24/7 SLA',
    ],
    outcome: 'Zero-downtime deployments backed by dedicated engineering SLAs',
    span: 'wide',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'meridian-erp',
    client: 'Meridian Logistics',
    category: 'erp',
    categoryLabel: 'Enterprise ERP',
    timeline: '16 weeks',
    title: 'Multi-Warehouse ERP & Automated Finance Consolidation',
    metric: '-42% Order Fulfillment Latency',
    summary:
      'Replaced five disconnected regional spreadsheets and legacy billing tools with one real-time ERP covering 14 distribution hubs.',
    challenge:
      'Inventory discrepancies across regional depots delayed invoicing by up to 4 days and caused frequent stockouts on high-turn SKUs.',
    solution:
      'Engineered a custom cloud ERP with barcode dispatch scanning, automated purchase-order triggers, and real-time general ledger sync.',
    stack: ['TypeScript', 'PostgreSQL', 'Node.js', 'React', 'Redis'],
    image: '/src/assets/images/work_erp_platform_1795081178354.jpg',
    imageAlt: 'Desktop monitor and tablet displaying the Meridian Logistics enterprise ERP operations dashboard',
  },
  {
    id: 'kestrel-mobile',
    client: 'Kestrel Mobility',
    category: 'mobile',
    categoryLabel: 'Android & iOS',
    timeline: '12 weeks',
    title: 'Offline-Capable Fleet & Customer Booking Suite',
    metric: '180k+ Active Monthly Users',
    summary:
      'Delivered unified iOS and Android customer booking alongside a ruggedized driver dispatch app with live GPS telemetry.',
    challenge:
      'Drivers operating in low-connectivity industrial zones lost job state mid-route, leading to missed pickups and manual support calls.',
    solution:
      'Built an optimistic offline queue with conflict-free sync on reconnect, Apple/Google Pay checkout, and native push dispatch alerts.',
    stack: ['Swift', 'Kotlin', 'React Native', 'WebSockets', 'PostgreSQL'],
    image: '/src/assets/images/work_mobile_apps_1795081178401.jpg',
    imageAlt: 'Android and iOS flagship smartphones showcasing the Kestrel Mobility native mobile applications',
  },
  {
    id: 'atlas-custom',
    client: 'Atlas Fabrication',
    category: 'web',
    categoryLabel: 'Web & Custom Software',
    timeline: '10 weeks',
    title: 'B2B Custom Quote Portal & Corporate Web Platform',
    metric: '+165% Qualified B2B Inquiries',
    summary:
      'Rebuilt the public corporate presence and connected an interactive CAD spec estimator straight into internal production scheduling.',
    challenge:
      'Sales engineers spent 18 hours a week manually re-keying website quote requests into production costing sheets.',
    solution:
      'Designed a high-speed marketing site paired with a custom quote engine and automated CRM + shop-floor API handoff.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Cloudflare', 'AWS'],
    image: '/src/assets/images/work_custom_engineering_1795081178669.jpg',
    imageAlt: 'Nexloop engineering team reviewing custom system architecture diagrams inside a glass studio room',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discovery & Architecture',
    timeframe: 'Week 1 – 2',
    detail:
      'We shadow your operations, map bottlenecks across spreadsheets and legacy APIs, and deliver a fixed architectural blueprint.',
  },
  {
    index: '02',
    title: 'Product Design & Prototype',
    timeframe: 'Week 3 – 4',
    detail:
      'Interactive Figma flows and design systems validated with your actual operators and end users before production code begins.',
  },
  {
    index: '03',
    title: 'Agile Engineering & QA',
    timeframe: 'Weekly Sprints',
    detail:
      'Automated test suites, weekly staging demos, security reviews, and clean TypeScript, mobile, and ERP deliverables you can inspect live.',
  },
  {
    index: '04',
    title: 'Rollout & Managed SLA',
    timeframe: 'Launch & Beyond',
    detail:
      'Zero-downtime data migration, team onboarding, app-store publishing, and ongoing 24/7 monitoring with dedicated engineers.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'meridian-cto',
    name: 'Hannah Lindqvist',
    role: 'VP of Operations',
    company: 'Meridian Logistics',
    projectType: 'Custom ERP & Warehouse Suite',
    quote:
      'Before Nexloop, our 14 depots closed inventory books four days behind reality. Within four months of launch, order reconciliation dropped to real time and fulfillment latency fell 42%.',
    outcomeMetric: '-42% fulfillment latency',
    avatar: '/src/assets/images/avatar_hannah_lindqvist_1795081949686.jpg',
    rating: 5,
  },
  {
    id: 'kestrel-head',
    name: 'David Okafor',
    role: 'Head of Digital Product',
    company: 'Kestrel Mobility',
    projectType: 'Android & iOS Applications',
    quote:
      'Nexloop shipped both our iOS and Android apps on schedule with rock-solid offline sync for drivers. Support tickets around dropped dispatches fell by two-thirds in the first quarter.',
    outcomeMetric: '4.9 store rating · 180k MAU',
    avatar: '/src/assets/images/avatar_david_okafor_1795081948056.jpg',
    rating: 5,
  },
  {
    id: 'atlas-director',
    name: 'Nadia Benali',
    role: 'Managing Director',
    company: 'Atlas Fabrication',
    projectType: 'Corporate Website & Quote Portal',
    quote:
      'Our old website forced engineers to re-type every inquiry manually. Nexloop rebuilt our digital presence and wired custom specs directly into production—qualified pipeline more than doubled.',
    outcomeMetric: '+165% qualified B2B pipeline',
    avatar: '/src/assets/images/avatar_nadia_benali_1795081951219.jpg',
    rating: 5,
  },
  {
    id: 'solace-product',
    name: 'Lucas Moreau',
    role: 'Product Lead',
    company: 'Solace Health',
    projectType: 'Clinical Scheduling & Mobile Suite',
    quote:
      'Thoughtful, fast, and honest about what was not working in our intake flow. That candor saved us months of rework and brought patient mobile check-in adoption above 84%.',
    outcomeMetric: '+84% mobile check-in adoption',
    avatar: '/src/assets/images/avatar_lucas_moreau_1795081949371.jpg',
    rating: 5,
  },
  {
    id: 'verve-cofounder',
    name: 'Mateo Alvarez',
    role: 'Co-Founder',
    company: 'Verve Capital',
    projectType: 'Treasury ERP & Analytics Platform',
    quote:
      'Every treasury dashboard Nexloop handed over is something our finance team still opens every morning. We finally trace multi-currency cash positions without reconciling CSV exports.',
    outcomeMetric: '3.2× faster month-end close',
    avatar: '/src/assets/images/avatar_mateo_alvarez_1795081949848.jpg',
    rating: 5,
  },
  {
    id: 'halcyon-commerce',
    name: 'Priya Nair',
    role: 'Director of Commerce',
    company: 'Halcyon Retail',
    projectType: 'Omnichannel Storefront & POS Sync',
    quote:
      'Our peak seasonal launch handled nine times normal checkout volume with zero downtime. Syncing store inventory directly with our web catalog eliminated oversold orders completely.',
    outcomeMetric: '99.98% launch-week uptime',
    avatar: '/src/assets/images/avatar_priya_nair_1795081949429.jpg',
    rating: 5,
  },
  {
    id: 'boreal-cio',
    name: 'Thomas Lindholm',
    role: 'Chief Information Officer',
    company: 'Boreal Energy',
    projectType: 'Field Service Mobile & Cloud APIs',
    quote:
      'Our field technicians needed Android tablets that stay reliable deep inside remote substations. Nexloop delivered a unified dispatch engine and clean API bridge to our legacy SAP core.',
    outcomeMetric: 'Zero lost field work-orders',
    avatar: '/src/assets/images/avatar_thomas_lindholm_1795081949402.jpg',
    rating: 5,
  },
];

/**
 * Computes the shortest modular circular offset and symmetric curved-arc slot
 * parameters for a given testimonial index relative to activeIndex.
 */
export function getCurvedTestimonialSlot(
  index: number,
  activeIndex: number,
  total: number,
  stepDeg = 22
): ArcSlotLayout {
  if (total <= 0) {
    return { offset: 0, angleDeg: 0, scale: 1, opacity: 1, zIndex: 10, isCenter: true };
  }

  let offset = ((index - activeIndex) % total + total) % total;
  if (offset > total / 2) {
    offset -= total;
  }

  const absOffset = Math.abs(offset);
  const angleDeg = offset * stepDeg;

  const scale =
    absOffset === 0 ? 1 : absOffset === 1 ? 0.72 : absOffset === 2 ? 0.56 : 0.42;
  const opacity =
    absOffset === 0 ? 1 : absOffset === 1 ? 0.84 : absOffset === 2 ? 0.56 : 0.3;
  const zIndex = Math.max(1, 20 - absOffset * 4);

  return {
    offset,
    angleDeg,
    scale,
    opacity,
    zIndex,
    isCenter: offset === 0,
  };
}

export function filterCaseStudies(
  studies: CaseStudy[],
  category: CaseStudyCategory
): CaseStudy[] {
  if (category === 'all') return studies;
  return studies.filter((item) => item.category === category);
}

export function validateInquiryForm(values: InquiryFormValues): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }
  const emailTrimmed = values.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    errors.email = 'Please enter a valid work email address.';
  }
  if (values.brief.trim().length < 12) {
    errors.brief = 'Share a short summary of at least 12 characters so we can prepare.';
  }
  return errors;
}
