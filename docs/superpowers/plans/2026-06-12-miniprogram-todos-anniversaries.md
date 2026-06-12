# Mini Program Todos and Anniversaries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete offline todo and anniversary management workflows to the WeChat mini program.

**Architecture:** Shared CommonJS utilities provide calendar conversion and normalized local storage. Two dedicated pages own CRUD interactions, while the index page consumes the same models for markers, summaries, navigation, and in-app overdue reminders.

**Tech Stack:** WeChat Mini Program JavaScript/WXML/WXSS, Node.js built-in test runner

---

### Task 1: Shared data model tests and utilities

**Files:**
- Create: `miniprogram/utils/calendar.js`
- Create: `miniprogram/utils/storage.js`
- Create: `scripts/test-miniprogram-data.cjs`

- [ ] Test legacy todo normalization and complete todo fields.
- [ ] Test legacy solar anniversary normalization.
- [ ] Test due reminder detection.
- [ ] Test solar and lunar anniversary matching.
- [ ] Run `node scripts/test-miniprogram-data.cjs` and verify failure before utilities exist.
- [ ] Implement the minimum calendar and storage utilities.
- [ ] Run the data tests and verify success.

### Task 2: Todo manager page

**Files:**
- Create: `miniprogram/pages/todos/todos.js`
- Create: `miniprogram/pages/todos/todos.json`
- Create: `miniprogram/pages/todos/todos.wxml`
- Create: `miniprogram/pages/todos/todos.wxss`

- [ ] Add create/edit form fields for title, date, time, and reminder.
- [ ] Add all/open/completed filters.
- [ ] Add completion toggle, edit, and confirmed delete actions.
- [ ] Persist through `utils/storage.js` and reload in `onShow`.

### Task 3: Anniversary manager page

**Files:**
- Create: `miniprogram/pages/anniversaries/anniversaries.js`
- Create: `miniprogram/pages/anniversaries/anniversaries.json`
- Create: `miniprogram/pages/anniversaries/anniversaries.wxml`
- Create: `miniprogram/pages/anniversaries/anniversaries.wxss`

- [ ] Add name, calendar type, and date fields.
- [ ] Show solar or converted lunar recurrence preview.
- [ ] Add create, edit, and confirmed delete actions.
- [ ] Persist normalized annual records.

### Task 4: Calendar integration

**Files:**
- Modify: `miniprogram/app.json`
- Modify: `miniprogram/pages/index/index.js`
- Modify: `miniprogram/pages/index/index.wxml`
- Modify: `miniprogram/pages/index/index.wxss`

- [ ] Register both management pages.
- [ ] Load fresh normalized records in `onShow`.
- [ ] Add todo and anniversary markers to generated calendar days.
- [ ] Replace inline creation forms with summaries and manager navigation.
- [ ] Show due reminder modal once per app session.

### Task 5: Static contract and rendered verification

**Files:**
- Modify: `scripts/check-miniprogram-layout.cjs`

- [ ] Assert both pages are registered and all page files exist.
- [ ] Assert index WXML includes markers and management navigation.
- [ ] Run data tests, layout checks, and JavaScript syntax checks.
- [ ] Compile and inspect all three pages in WeChat Developer Tools.
