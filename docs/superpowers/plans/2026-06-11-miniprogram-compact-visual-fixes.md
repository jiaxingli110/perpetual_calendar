# Mini Program Compact Visual Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct button alignment and restore 24 solar-term backgrounds in the compact WeChat mini program calendar.

**Architecture:** Extend the existing static regression script to verify the visual contract. Reuse the desktop JPG artwork by packaging copies under `miniprogram/assets`, expose a `termImage` path from calendar-day data, and render it through WXML layers with WXSS state overlays.

**Tech Stack:** WeChat Mini Program WXML/WXSS/JavaScript, Node.js

---

### Task 1: Extend the visual regression contract

**Files:**
- Modify: `scripts/check-miniprogram-layout.cjs`

- [x] Assert global buttons use Flexbox with horizontal and vertical centering.
- [x] Assert `.day-cell` restores top-left content alignment.
- [x] Assert WXML contains a solar-term image layer.
- [x] Assert page JavaScript contains all 24 mini program artwork paths.
- [x] Assert all 24 JPG assets exist in the mini program package.
- [x] Run `node scripts/check-miniprogram-layout.cjs` and verify the new checks fail.

### Task 2: Package and expose solar-term artwork

**Files:**
- Create: `miniprogram/assets/solar-terms/*.jpg`
- Modify: `miniprogram/pages/index/index.js`

- [x] Copy the 24 compressed JPG files from `assets/solar-terms`.
- [x] Add a 24-entry `solarTermImages` array matching `solarTerms` order.
- [x] Add `termImage` to each generated calendar day.
- [x] Run JavaScript syntax checks.

### Task 3: Render artwork and fix compact controls

**Files:**
- Modify: `miniprogram/app.wxss`
- Modify: `miniprogram/pages/index/index.wxml`
- Modify: `miniprogram/pages/index/index.wxss`

- [x] Center global native button content with Flexbox.
- [x] Apply explicit compact widths to settings and navigation controls.
- [x] Add the date-cell artwork image and readability overlay layers.
- [x] Keep date text top-left aligned and above artwork layers.
- [x] Add muted and selected overlay variants.

### Task 4: Verify in code and WeChat Developer Tools

**Files:**
- Test: `scripts/check-miniprogram-layout.cjs`

- [x] Run the complete static regression check.
- [x] Run syntax checks for mini program JavaScript.
- [x] Run `git diff --check` on changed text files.
- [x] Confirm desktop application files are absent from the diff.
- [x] Recompile or reopen the mini program in WeChat Developer Tools.
