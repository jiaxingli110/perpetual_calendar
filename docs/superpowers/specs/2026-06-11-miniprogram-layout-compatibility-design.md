# Mini Program Layout Compatibility Design

## Goal

Restore the WeChat mini program calendar layout while preserving the desktop application's existing appearance and files.

## Root Cause

The mini program stylesheet relies on CSS Grid for the month header, controls, seven-column calendar, almanac, and forms. In the published runtime these declarations are not producing the intended columns. WeChat's native `button` sizing then causes controls and day cells to overflow, matching the published screenshot.

## Design

- Modify only files under `miniprogram` plus a focused static regression check.
- Replace layout-critical Grid declarations with Flex layouts supported consistently by WeChat runtimes.
- Give weekday labels and calendar cells an explicit one-seventh width.
- Reset native button width, margin, line height, and overflow behavior.
- Keep the current colors, typography, spacing, cards, and desktop application unchanged.

## Verification

- A static check rejects Grid declarations in critical mini program selectors.
- The check requires explicit seven-column widths and button resets.
- The WXML contains 42 generated date buttons and seven weekday labels through the existing data loops; no JavaScript behavior changes are required.
