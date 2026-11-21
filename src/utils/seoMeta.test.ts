import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { CASE_STUDIES, FAQ_ITEMS, SERVICES, TESTIMONIALS } from '../data/companyData';
import { buildStructuredDataGraph, normalizeOrigin, SEO_META } from './seoMeta';

test('SEO title and description obey optimal search snippet character budgets', () => {
  assert.ok(SEO_META.title.length >= 30 && SEO_META.title.length <= 60);
  assert.ok(SEO_META.description.length >= 120 && SEO_META.description.length <= 160);
});

test('buildStructuredDataGraph outputs valid linked Schema.org graph matching live company data', () => {
  const graphDoc = buildStructuredDataGraph('https://app.nexloop.io/');
  assert.equal(graphDoc['@context'], 'https://schema.org');
  assert.equal(graphDoc['@graph'].length, 5);

  const org = graphDoc['@graph'][0] as {
    url: string;
    hasOfferCatalog: { itemListElement: unknown[] };
    aggregateRating: { ratingValue: number; reviewCount: number };
  };
  assert.equal(org.url, 'https://app.nexloop.io');
  assert.equal(org.hasOfferCatalog.itemListElement.length, SERVICES.length);
  assert.equal(org.aggregateRating.reviewCount, TESTIMONIALS.length);

  const caseStudyList = graphDoc['@graph'][3] as { itemListElement: unknown[] };
  assert.equal(caseStudyList.itemListElement.length, CASE_STUDIES.length);

  const faqSchema = graphDoc['@graph'][4] as {
    '@type': string;
    mainEntity: { name: string; acceptedAnswer: { text: string } }[];
  };
  assert.equal(faqSchema['@type'], 'FAQPage');
  assert.equal(faqSchema.mainEntity.length, FAQ_ITEMS.length);
  assert.equal(faqSchema.mainEntity[0].name, FAQ_ITEMS[0].question);
  assert.equal(faqSchema.mainEntity[0].acceptedAnswer.text, FAQ_ITEMS[0].answer);
});

test('normalizeOrigin strips trailing slashes and falls back cleanly', () => {
  assert.equal(normalizeOrigin('https://nexloop.io///'), 'https://nexloop.io');
  assert.equal(normalizeOrigin('invalid-origin'), 'https://nexloop.io');
});

test('public crawlability & GEO manifests exist on disk', () => {
  const root = process.cwd();
  const robots = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8');
  assert.ok(robots.includes('GPTBot'));
  assert.ok(robots.includes('OAI-SearchBot'));
  assert.ok(robots.includes('ClaudeBot'));
  assert.ok(robots.includes('PerplexityBot'));
  assert.ok(robots.includes('Google-Extended'));

  const llms = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8');
  assert.ok(llms.includes('# Nexloop'));
  assert.ok(llms.includes('llms-full.txt'));

  const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
  assert.ok(sitemap.includes('<urlset'));
});
