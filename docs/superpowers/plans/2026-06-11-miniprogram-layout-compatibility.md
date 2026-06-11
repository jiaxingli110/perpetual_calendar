# Mini Program Layout Compatibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the published WeChat mini program render a stable seven-column calendar without changing the desktop application.

**Architecture:** Keep the existing WXML and JavaScript data flow. Replace only layout-critical WXSS Grid rules with Flex sizing and add a Node-based static regression check for the required compatibility rules.

**Tech Stack:** WeChat Mini Program WXML/WXSS, Node.js

---

### Task 1: Add the layout regression check

**Files:**
- Create: `scripts/check-miniprogram-layout.cjs`

- [x] Read `miniprogram/pages/index/index.wxss` and extract critical selector blocks.
- [x] Assert that critical blocks do not use `display: grid`.
- [x] Assert that weekday labels and day cells use `width: 14.285714%`.
- [x] Assert that mini program buttons reset width and margin.
- [x] Run `node scripts/check-miniprogram-layout.cjs` and verify it fails against the current stylesheet.

### Task 2: Replace incompatible critical layouts

**Files:**
- Modify: `miniprogram/app.wxss`
- Modify: `miniprogram/pages/index/index.wxss`

- [x] Reset global button width, margin, line height, and overflow.
- [x] Convert month header and controls to Flex layouts.
- [x] Convert weekday and calendar containers to wrapping Flex layouts.
- [x] Assign weekday labels and day cells explicit one-seventh widths.
- [x] Convert almanac and form layouts to Flex.
- [x] Preserve existing visual colors, card styles, and typography.

### Task 3: Verify

**Files:**
- Test: `scripts/check-miniprogram-layout.cjs`

- [x] Run `node scripts/check-miniprogram-layout.cjs` and verify it passes.
- [x] Run JavaScript syntax checks for the regression script and mini program page script.
- [x] Inspect `git diff -- miniprogram scripts/check-miniprogram-layout.cjs` and confirm desktop files are untouched.
