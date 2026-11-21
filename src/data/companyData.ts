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
  stack: string[];
  outcome: string;
  span: 'wide' | 'narrow';
}

export interface ErpModulePreview {
  id: 'ledger' | 'inventory' | 'procurement';
  label: string;
  caption: string;
  syncTarget: string;
}

export interface CaseStudyHighlight {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  client: string;
  category: Exclude<CaseStudyCategory, 'all'>;
  categoryLabel: string;
  timeline: string;
  title: string;
  metric: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: CaseStudyHighlight[];
  stack: string[];
  image: string;
  imageAlt: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  shortTitle: string;
  timeframe: string;
  milestoneOutput: string;
  detail: string;
  deliverables: string[];
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

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
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

export const ERP_MODULE_PREVIEWS: ErpModulePreview[] = [
  {
    id: 'ledger',
    label: 'Ledger',
    caption: 'Automated multi-currency reconciliation & tax compliance',
    syncTarget: 'General Ledger · Invoicing',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    caption: 'Real-time multi-warehouse stock levels & barcode dispatch',
    syncTarget: 'Warehouses · BOM Sync',
  },
  {
    id: 'procurement',
    label: 'Procurement',
    caption: 'Role-based PO approvals, vendor bids & audit trails',
    syncTarget: 'Approvals · Vendor APIs',
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
    stack: ['TypeScript', 'PostgreSQL', 'Redis', 'React'],
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
    stack: ['Kotlin', 'Swift', 'React Native', 'SQLite Sync'],
    outcome: 'Sub-1s launch & zero-drop offline sync',
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
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Edge CDN'],
    outcome: 'Sub-1.2s loads across mobile & desktop',
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
    stack: ['Node.js', 'Docker', 'Kubernetes', 'AWS'],
    outcome: 'Zero-downtime releases & dedicated SLA',
    span: 'wide',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'meridian-erp',
    index: '01',
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
    highlights: [
      { label: 'Reconciliation window', value: '4 days to real-time' },
      { label: 'Network footprint', value: '14 regional hubs unified' },
      { label: 'Delivery cadence', value: '16 weeks to cutover' },
    ],
    stack: ['TypeScript', 'PostgreSQL', 'Node.js', 'React', 'Redis'],
    image: '/src/assets/images/work_erp_cutout.png',
    imageAlt: 'Isolated 3D studio display and tablet showcasing Meridian Logistics custom enterprise ERP financial ledger and inventory dashboard',
  },
  {
    id: 'kestrel-mobile',
    index: '02',
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
    highlights: [
      { label: 'Dispatch support load', value: '-66% dropped job tickets' },
      { label: 'Store satisfaction', value: '4.9 average rating' },
      { label: 'Delivery cadence', value: '12 weeks dual-platform' },
    ],
    stack: ['Swift', 'Kotlin', 'React Native', 'WebSockets', 'PostgreSQL'],
    image: '/src/assets/images/work_mobile_cutout.png',
    imageAlt: 'Isolated floating iOS and Android flagship smartphones running the Kestrel Mobility dispatch map and booking application',
  },
  {
    id: 'atlas-custom',
    index: '03',
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
    highlights: [
      { label: 'Manual quote entry', value: '18 hrs/wk eliminated' },
      { label: 'Pipeline conversion', value: '+165% qualified B2B leads' },
      { label: 'Delivery cadence', value: '10 weeks launch' },
    ],
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Cloudflare', 'AWS'],
    image: '/src/assets/images/work_web_cutout.png',
    imageAlt: 'Isolated floating laptop and modular browser card showing the Atlas Fabrication B2B quote portal and API pipeline dashboard',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'delivery-timelines',
    category: 'Delivery & Timelines',
    question: 'How long does it take Nexloop to build and launch a custom ERP or software system?',
    answer:
      'Most production MVP launches take 10 to 16 weeks depending on complexity. Corporate web platforms and B2B quote portals typically ship in 10 weeks, dual-platform Android and iOS suites in 12 weeks, and multi-warehouse ERP consolidations in 16 weeks with weekly live staging demos.',
  },
  {
    id: 'code-ownership',
    category: 'IP & Ownership',
    question: 'Do we own 100% of the source code and intellectual property after launch?',
    answer:
      'Yes. Clients receive full ownership of all custom application source code, database schemas, architectural documentation, and cloud infrastructure-as-code repositories upon milestone handoff—with zero proprietary runtime lock-in or per-seat licensing fees.',
  },
  {
    id: 'mobile-architecture',
    category: 'Mobile Engineering',
    question: 'Should we choose native Kotlin and Swift or React Native for our mobile app?',
    answer:
      'We recommend native Kotlin and Swift when apps require low-level hardware access, continuous background GPS telemetry, or complex offline storage, and React Native when shared Android and iOS velocity across business workflows is the priority—both shipped through automated store release pipelines.',
  },
  {
    id: 'legacy-integration',
    category: 'APIs & Integrations',
    question: 'Can Nexloop integrate custom software with our existing ERP, banking, or payment APIs?',
    answer:
      'Yes. Every engagement can connect legacy accounting cores, regional banking rails, mobile money gateways, warehouse barcode hardware, and CRM platforms through idempotent REST, GraphQL, or webhook pipelines without interrupting daily operations.',
  },
  {
    id: 'post-launch-sla',
    category: 'Operations & SLA',
    question: 'What happens after launch—does Nexloop provide ongoing maintenance and SLAs?',
    answer:
      'Teams can either take full internal handoff supported by automated test suites and runbooks, or retain Nexloop under a 24/7 managed SLA covering cloud scaling, security patching, continuous feature sprints, and 99.94% average production uptime.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discovery & Architecture',
    shortTitle: 'Discovery',
    timeframe: 'Week 1 – 2',
    milestoneOutput: 'Signed Architecture Blueprint',
    detail:
      'We shadow your operations, map bottlenecks across spreadsheets and legacy APIs, and deliver a fixed architectural blueprint.',
    deliverables: [
      'Entity-relationship & domain data schema',
      'Legacy API & ERP integration map',
      'Fixed milestone scope, timeline & risk register',
    ],
  },
  {
    index: '02',
    title: 'Product Design & Prototype',
    shortTitle: 'Design & UX',
    timeframe: 'Week 3 – 4',
    milestoneOutput: 'Validated Interactive Prototype',
    detail:
      'Interactive Figma flows and design systems validated with your actual operators and end users before production code begins.',
    deliverables: [
      'Clickable desktop, iOS & Android user flows',
      'Operator-tested component & token library',
      'Role-based permission & offline UX states',
    ],
  },
  {
    index: '03',
    title: 'Agile Engineering & QA',
    shortTitle: 'Build & QA',
    timeframe: 'Weekly Sprints',
    milestoneOutput: 'Weekly Live Staging Builds',
    detail:
      'Automated test suites, weekly staging demos, security reviews, and clean TypeScript, mobile, and ERP deliverables you can inspect live.',
    deliverables: [
      'Continuous TypeScript, ERP & mobile builds',
      'Automated integration, load & security checks',
      'Weekly live sprint demos with direct engineers',
    ],
  },
  {
    index: '04',
    title: 'Rollout & Managed SLA',
    shortTitle: 'Launch & SLA',
    timeframe: 'Launch & Beyond',
    milestoneOutput: 'Zero-Downtime Go-Live & 24/7 SLA',
    detail:
      'Zero-downtime data migration, team onboarding, app-store publishing, and ongoing 24/7 monitoring with dedicated engineers.',
    deliverables: [
      'Dry-run verified production data migration',
      'App Store, Google Play & cloud rollout',
      '24/7 observability, runbooks & SLA response',
    ],
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
