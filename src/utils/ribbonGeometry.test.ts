import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildInfinityGeometry,
  computeTimelineMetrics,
  computeWindAudioParams,
  evalInfinityMotionSample,
  evalInfinityPoint,
  THETA_START,
  THETA_END,
  THETA_ARROW_TIP,
} from './ribbonGeometry';
import { generateStandaloneSvg, WORDMARK_GLYPHS } from './nexloopExport';

test('buildInfinityGeometry produces valid non-empty SVG paths with finite numbers', () => {
  const geo = buildInfinityGeometry();

  assert.equal(geo.viewBox, '0 0 640 370');
  assert.ok(geo.pass1Length > 400, `Expected pass1Length > 400, got ${geo.pass1Length}`);
  assert.ok(geo.pass2Length > 250, `Expected pass2Length > 250, got ${geo.pass2Length}`);
  assert.ok(geo.pass1Fraction > 0.5 && geo.pass1Fraction < 0.75);

  const paths = [
    geo.pass1Spine,
    geo.pass2Spine,
    geo.fullSpine,
    geo.pass1Ribbon,
    geo.pass1UpperBevel,
    geo.pass1LowerBevel,
    geo.leftOuterIceFacet,
    geo.leftMidCyanFacet,
    geo.topRightCrestFacet,
    geo.topRightUndersideFacet,
    geo.pass2Ribbon,
    geo.pass2Bevel,
    geo.crossingShadowPath,
    geo.arrowHeadPath,
    geo.arrowTravellerPath,
  ];

  for (const p of paths) {
    assert.ok(p.startsWith('M '), 'SVG path should start with M');
    assert.ok(!p.includes('NaN'), 'SVG path must not contain NaN');
    assert.ok(!p.includes('Infinity'), 'SVG path must not contain Infinity');
  }
});

test('arrowhead tip sits cleanly behind start cut with a visible gap and flush bounds', () => {
  const startPt = evalInfinityPoint(THETA_START);
  const endPt = evalInfinityPoint(THETA_END);
  const tipPt = evalInfinityPoint(THETA_ARROW_TIP);

  assert.ok(startPt.y < 122, `Expected startPt.y < 122, got ${startPt.y}`);
  assert.ok(endPt.y > 122, `Expected endPt.y > 122, got ${endPt.y}`);
  const gap = Math.hypot(startPt.x - tipPt.x, startPt.y - tipPt.y);
  assert.ok(gap > 8 && gap < 50, `Expected clean gap between tip and start cut, got ${gap}`);

  // Verify arrowHeadPath polygon winding and zero out-of-bounds extension past cut
  const geo = buildInfinityGeometry();
  const nums = geo.arrowHeadPath.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  assert.equal(nums.length, 10, 'Expected 5 (x,y) vertices for arrowhead polygon');

  // Vertices: 0=neckOuter, 1=barbOuter, 2=tip, 3=barbInner, 4=neckInner
  const pts = [
    { x: nums[0], y: nums[1] },
    { x: nums[2], y: nums[3] },
    { x: nums[4], y: nums[5] },
    { x: nums[6], y: nums[7] },
    { x: nums[8], y: nums[9] },
  ];

  assert.ok(pts[0].x > pts[4].x, `Expected neckOuter.x (${pts[0].x}) > neckInner.x (${pts[4].x})`);
  assert.ok(pts[1].x > pts[3].x, `Expected barbOuter.x (${pts[1].x}) > barbInner.x (${pts[3].x})`);
  assert.ok(pts[2].y < pts[0].y && pts[2].y < pts[4].y, 'Expected arrowhead tip above neck base');
  // Tip should stay cleanly below upper-right outer cut edge (no collision)
  assert.ok(pts[2].y > 106, `Expected tip.y (${pts[2].y}) cleanly below upper-right cut`);

  // Resting tip matches evalInfinityMotionSample(1) + 36px along tangent
  const endSample = evalInfinityMotionSample(1);
  const expectedTipX = endSample.pos.x + 36 * endSample.tangent.x;
  const expectedTipY = endSample.pos.y + 36 * endSample.tangent.y;
  assert.ok(Math.hypot(pts[2].x - expectedTipX, pts[2].y - expectedTipY) < 0.05);
});

test('computeTimelineMetrics starts with arrowhead before ribbon and wordmark', () => {
  const normal = computeTimelineMetrics(1);
  const fast = computeTimelineMetrics(2);

  assert.ok(normal.arrowIgnitionStart < normal.ribbonStart, 'Arrow must start before ribbon draws');
  assert.ok(normal.ribbonPass2Start > normal.ribbonStart);
  assert.ok(normal.wordmarkStart >= normal.arrowLockStart);
  assert.ok(normal.taglineStart > normal.wordmarkStart);
  assert.ok(normal.totalDuration > normal.taglineStart);

  assert.ok(Math.abs(fast.totalDuration * 2 - normal.totalDuration) < 0.01);
});

test('evalInfinityMotionSample and computeWindAudioParams bend natural breeze & pan with curve', () => {
  const start = evalInfinityMotionSample(0);
  const leftTurn = evalInfinityMotionSample(0.45);
  const end = evalInfinityMotionSample(1);

  assert.ok(start.pos.x > 480, 'Motion starts at upper-right gap');
  assert.ok(leftTurn.pos.x < 220, 'Mid-flight sweeps around left loop');
  assert.ok(end.pos.x > 480, 'Motion ends at lower-right arrow lock');

  const windStraight = computeWindAudioParams({ ...start, u: 0.25, curvature: 0.08 }, 1);
  const windSharpBend = computeWindAudioParams({ ...leftTurn, u: 0.45, curvature: 0.92 }, 1);

  assert.ok(windSharpBend.cutoffHz > windStraight.cutoffHz, 'Sharper bend increases airflow body cutoff');
  assert.ok(windSharpBend.breathHz > windStraight.breathHz, 'Sharper bend lifts airy breath center');
  assert.ok(windSharpBend.q > windStraight.q && windSharpBend.q <= 1.5, 'Gentle non-whistling Q');
  assert.ok(windSharpBend.gustRateHz > windStraight.gustRateHz, 'Gust flutter responds to tighter curves');
  assert.ok(windSharpBend.pan < 0, 'Left loop bends pan to negative left stereo field');
  assert.ok(windStraight.pan > 0, 'Right loop pans to positive right stereo field');
});

test('generateStandaloneSvg creates a self-contained arrow-first SVG', () => {
  const svgOnce = generateStandaloneSvg({ speed: 1, loop: false, surface: 'light', sound: true });
  const svgLoop = generateStandaloneSvg({ speed: 1.5, loop: true, surface: 'dark', sound: false });

  assert.equal(WORDMARK_GLYPHS.length, 7);
  assert.ok(svgOnce.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
  assert.ok(svgOnce.includes('prefers-reduced-motion: reduce'));
  assert.ok(svgOnce.includes('innovate &#183; connect &#183; move'));
  assert.ok(svgOnce.includes('<animateMotion'));
  assert.ok(svgOnce.includes('nl-arrow-traveller'));
  assert.ok(svgLoop.includes('repeatCount="indefinite"'));
  assert.ok(svgLoop.includes('#081826'));
});
