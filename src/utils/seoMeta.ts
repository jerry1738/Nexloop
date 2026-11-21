import {
  CASE_STUDIES,
  FAQ_ITEMS,
  SERVICES,
  TESTIMONIALS,
} from '../data/companyData';

export const CANONICAL_DEFAULT_ORIGIN = 'https://nexloop.io';

export const SEO_META = {
  title: 'Nexloop — Custom ERP, Mobile Apps & Web Engineering',
  description:
    'Nexloop builds enterprise ERP systems, native Android and iOS apps, custom websites, and cloud software with 99.94% SLA uptime. Start your build.',
  siteName: 'Nexloop',
};

export function normalizeOrigin(origin?: string): string {
  if (!origin || !/^https?:\/\//i.test(origin)) {
    return CANONICAL_DEFAULT_ORIGIN;
  }
  return origin.replace(/\/+$/, '');
}

/**
 * Builds a linked Schema.org @graph covering Organization, WebSite, WebPage,
 * OfferCatalog, Case Studies (ItemList), Reviews, and FAQPage for search engines
 * and generative AI retrieval models.
 */
export function buildStructuredDataGraph(origin?: string) {
  const baseUrl = normalizeOrigin(origin);
  const orgId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;
  const webpageId = `${baseUrl}/#webpage`;

  const avgRating =
    TESTIMONIALS.length > 0
      ? Number(
          (
            TESTIMONIALS.reduce((sum, item) => sum + item.rating, 0) /
            TESTIMONIALS.length
          ).toFixed(1)
        )
      : 5.0;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': orgId,
        name: 'Nexloop',
        legalName: 'Nexloop Software',
        slogan: 'innovate · connect · move',
        url: baseUrl,
        email: 'hello@nexloop.io',
        telephone: '+1-415-890-4210',
        description: SEO_META.description,
        areaServed: ['North America', 'Europe', 'East Africa', 'Worldwide'],
        knowsAbout: [
          'Enterprise Resource Planning (ERP)',
          'Native Android Application Development (Kotlin)',
          'Native iOS Application Development (Swift)',
          'React Native Mobile Apps',
          'B2B Web Portals & Next.js Platforms',
          'Custom Software & Cloud Infrastructure',
          'Payment & Banking API Integrations',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Nexloop Software Engineering Services',
          itemListElement: SERVICES.map((service, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: `${service.summary} Outcome: ${service.outcome}.`,
              serviceType: service.title,
              provider: { '@id': orgId },
            },
          })),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: avgRating,
          reviewCount: TESTIMONIALS.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: TESTIMONIALS.slice(0, 3).map((t) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: t.name,
            jobTitle: t.role,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: t.rating,
            bestRating: 5,
          },
          reviewBody: t.quote,
        })),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: baseUrl,
        name: SEO_META.siteName,
        description: SEO_META.description,
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: `${baseUrl}/`,
        name: SEO_META.title,
        description: SEO_META.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${baseUrl}/src/assets/images/work_erp_cutout.png`,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${baseUrl}/#case-studies`,
        name: 'Nexloop Selected Engineering Case Studies',
        itemListElement: CASE_STUDIES.map((study, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: study.title,
            headline: `${study.client} — ${study.metric}`,
            description: `${study.summary} Solution: ${study.solution}`,
            creator: { '@id': orgId },
            keywords: study.stack.join(', '),
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        mainEntity: FAQ_ITEMS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

/**
 * Dynamically aligns canonical URL, OpenGraph URL, and JSON-LD @graph origin
 * with the live browser deployment origin.
 */
export function syncDocumentSeo(origin?: string): void {
  if (typeof document === 'undefined') return;
  const currentOrigin =
    origin ?? (typeof window !== 'undefined' ? window.location.origin : CANONICAL_DEFAULT_ORIGIN);
  const canonicalUrl = `${normalizeOrigin(currentOrigin)}/`;

  const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.href = canonicalUrl;
  }

  const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.content = canonicalUrl;
  }

  const ldScript = document.getElementById('nl-jsonld');
  if (ldScript) {
    ldScript.textContent = JSON.stringify(buildStructuredDataGraph(currentOrigin));
  }
}
