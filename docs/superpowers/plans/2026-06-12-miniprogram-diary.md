# Mini Program Diary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add local diary editing, browsing, searching, and calendar integration to the WeChat mini program.

**Architecture:** Shared storage helpers normalize and query diary records. A dedicated mobile page owns CRUD and filtering, while the calendar displays per-day markers and summaries using the same records.

**Tech Stack:** WeChat Mini Program JavaScript/WXML/WXSS, Node.js assertions

---

### Task 1: Diary data behavior

**Files:**
- Modify: `scripts/test-miniprogram-data.cjs`
- Modify: `miniprogram/utils/storage.js`

- [ ] Add failing tests for legacy normalization, keyword search, and date filters.
- [ ] Run `node scripts/test-miniprogram-data.cjs` and verify the missing diary APIs fail.
- [ ] Implement diary normalization, persistence, sorting, and filtering.
- [ ] Run the data tests and verify success.

### Task 2: Diary manager page

**Files:**
- Create: `miniprogram/pages/diaries/diaries.js`
- Create: `miniprogram/pages/diaries/diaries.json`
- Create: `miniprogram/pages/diaries/diaries.wxml`
- Create: `miniprogram/pages/diaries/diaries.wxss`

- [ ] Add date, title, and content editor fields.
- [ ] Add create, edit, cancel, and confirmed delete actions.
- [ ] Add keyword, year, and month filters with an empty state.
- [ ] Reload persisted records in `onShow`.

### Task 3: Calendar integration

**Files:**
- Modify: `miniprogram/app.json`
- Modify: `miniprogram/pages/index/index.js`
- Modify: `miniprogram/pages/index/index.wxml`
- Modify: `miniprogram/pages/index/index.wxss`

- [ ] Register the diary page.
- [ ] Add diary markers while building calendar days.
- [ ] Add selected-day diary summary and navigation with a date query.
- [ ] Refresh markers and summaries when returning from the diary page.

### Task 4: Contract and rendered verification

**Files:**
- Modify: `scripts/check-miniprogram-layout.cjs`

- [ ] Assert diary page registration and files.
- [ ] Assert calendar marker and navigation contracts.
- [ ] Run data, layout, syntax, and diff checks.
- [ ] Compile and inspect the diary page in WeChat Developer Tools.
