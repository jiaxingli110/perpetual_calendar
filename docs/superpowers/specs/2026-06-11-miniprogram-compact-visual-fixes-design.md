# Mini Program Compact Visual Fixes Design

## Goal

Fix the visible mini program defects while preserving the current compact layout and leaving the desktop application unchanged.

## Confirmed Direction

The selected direction is the compact repair option. Existing dimensions and information density stay substantially unchanged. The work focuses on correctness, visual alignment, missing solar-term artwork, and state readability.

## Changes

- Center native button contents horizontally and vertically with Flexbox.
- Keep calendar cells top-aligned through a local override.
- Give the settings button a compact explicit width instead of allowing the native button to stretch.
- Copy the 24 existing compressed solar-term JPG files into the mini program package.
- Map each solar term to its local mini program asset path.
- Render artwork as an absolutely positioned `image` layer inside the date cell.
- Add a translucent paper overlay for legibility, with stronger overlays for muted and selected cells.
- Preserve the current seven-column layout, colors, typography, and compact cell height.
- Avoid changes to desktop `app.js`, `styles.css`, and desktop assets.

## Verification

- Static checks require button centering rules and local calendar-cell alignment overrides.
- Static checks require all 24 artwork files and all 24 paths in page data logic.
- Static checks require the WXML image layer and the WXSS artwork/overlay selectors.
- JavaScript syntax checks and the existing layout compatibility checks must pass.
- The project is recompiled in WeChat Developer Tools for visual review.
