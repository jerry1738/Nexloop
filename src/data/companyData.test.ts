import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CASE_STUDIES,
  CLIENT_LOGOS,
  ERP_MODULE_PREVIEWS,
  FAQ_ITEMS,
  filterCaseStudies,
  getCurvedTestimonialSlot,
  PROCESS_STEPS,
  SERVICES,
  TESTIMONIALS,
  validateInquiryForm,
} from './companyData';

test('company data covers ERP, Android/iOS mobile, websites, custom software, dual-row Ethiopian clients, process steps, FAQ items, and 7 testimonials', () => {
  assert.ok(SERVICES.length >= 4);
  for (const service of SERVICES) {
    assert.ok(service.stack.length >= 3);
    assert.ok(service.deliverables.length >= 3);
  }
  assert.equal(ERP_MODULE_PREVIEWS.length, 3);
  assert.equal(CLIENT_LOGOS.length, 12);
  assert.equal(CLIENT_LOGOS.filter((c) => c.row === 1).length, 6);
  assert.equal(CLIENT_LOGOS.filter((c) => c.row === 2).length, 6);
  assert.equal(TESTIMONIALS.length, 7);
  assert.equal(PROCESS_STEPS.length, 4);
  for (const step of PROCESS_STEPS) {
    assert.ok(step.shortTitle.length > 0);
    assert.ok(step.milestoneOutput.length > 0);
    assert.equal(step.deliverables.length, 3);
  }
  assert.ok(CASE_STUDIES.length >= 3);
  assert.ok(FAQ_ITEMS.length >= 5);
  for (const cs of CASE_STUDIES) {
    assert.ok(cs.index.length >= 2);
    assert.equal(cs.highlights.length, 3);
    assert.ok(cs.stack.length >= 4);
    assert.ok(cs.image.endsWith('_cutout.png'));
  }
  for (const t of TESTIMONIALS) {
    assert.ok(t.avatar.startsWith('/src/assets/images/avatar_'));
    assert.equal(t.rating, 5);
  }
});

test('getCurvedTestimonialSlot computes shortest circular wrap and symmetric arc weights', () => {
  const center = getCurvedTestimonialSlot(0, 0, 7, 22);
  assert.equal(center.offset, 0);
  assert.equal(center.angleDeg, 0);
  assert.equal(center.scale, 1);
  assert.equal(center.opacity, 1);
  assert.equal(center.isCenter, true);

  // Wrapping backwards from index 0 to index 6 must produce offset -1 (left neighbor)
  const wrapLeft = getCurvedTestimonialSlot(6, 0, 7, 22);
  assert.equal(wrapLeft.offset, -1);
  assert.equal(wrapLeft.angleDeg, -22);
  assert.equal(wrapLeft.isCenter, false);

  // Wrapping forwards from index 6 to index 0 must produce offset +1 (right neighbor)
  const wrapRight = getCurvedTestimonialSlot(0, 6, 7, 22);
  assert.equal(wrapRight.offset, 1);
  assert.equal(wrapRight.angleDeg, 22);

  // Symmetry check for left vs right equidistant slots
  const leftTwo = getCurvedTestimonialSlot(4, 6, 7, 22);
  const rightTwo = getCurvedTestimonialSlot(1, 6, 7, 22);
  assert.equal(leftTwo.offset, -2);
  assert.equal(rightTwo.offset, 2);
  assert.equal(leftTwo.scale, rightTwo.scale);
  assert.equal(leftTwo.opacity, rightTwo.opacity);
});

test('filterCaseStudies filters accurately across all categories', () => {
  assert.equal(filterCaseStudies(CASE_STUDIES, 'all').length, CASE_STUDIES.length);
  const erp = filterCaseStudies(CASE_STUDIES, 'erp');
  assert.equal(erp.length, 1);
  assert.equal(erp[0].category, 'erp');

  const mobile = filterCaseStudies(CASE_STUDIES, 'mobile');
  assert.equal(mobile.length, 1);
  assert.equal(mobile[0].category, 'mobile');

  const web = filterCaseStudies(CASE_STUDIES, 'web');
  assert.equal(web.length, 1);
  assert.equal(web[0].category, 'web');
});

test('validateInquiryForm validates required fields and rejects malformed input', () => {
  const invalid = validateInquiryForm({
    name: 'A',
    email: 'not-an-email',
    company: '',
    service: 'Enterprise ERP Systems',
    brief: 'too short',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.email);
  assert.ok(invalid.brief);

  const valid = validateInquiryForm({
    name: 'Elena Vance',
    email: 'elena@meridian-logistics.io',
    company: 'Meridian Logistics',
    service: 'Enterprise ERP Systems',
    brief: 'Looking to consolidate regional warehouse inventory and billing into one ERP.',
  });
  assert.deepEqual(valid, {});
});
