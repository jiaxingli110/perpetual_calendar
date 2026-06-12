# Mini Program Diary Design

## Goal

Add the desktop calendar's diary workflow to the WeChat mini program with an interface and storage model suited to a phone screen.

## Scope

- A dedicated diary page for creating, editing, and deleting entries.
- Multiple entries may share the same date.
- Each entry stores a title and plain-text content.
- The page supports keyword search and year/month filters.
- Calendar cells show a diary marker, and the selected-day summary links to that date's entries.
- Data remains local to the mini program.

Rich text, arbitrary file attachments, cloud synchronization, and cross-device backup are outside this phase because they require platform-specific persistence and privacy decisions.

## Architecture

`utils/storage.js` owns diary normalization, local reads and writes, filtering, and sorting. `pages/diaries` owns the mobile editor and list. `pages/index` only consumes diary counts and navigates with the selected date as a query parameter.

The diary page reloads storage in `onShow`. Saving updates an existing entry when `editingId` is present, otherwise it creates a new record. Returning to the calendar triggers its existing `onShow` refresh and immediately updates markers.

## Data Model

```js
{
  id: string,
  date: "YYYY-MM-DD",
  title: string,
  content: string,
  createdAt: number,
  updatedAt: number
}
```

Legacy desktop-like records that contain `text` but no `title` or `content` are normalized by deriving a short title and preserving the text as content.

## Interface

The top card contains date, title, and multiline content fields with save/cancel actions. Below it, compact controls provide keyword, year, and month filtering. Entry cards show date, title, excerpt, edit, and confirmed delete actions.

The calendar adds a small `记` marker to dates containing entries. The selected-day detail area shows the entry count, excerpts, and a button opening the diary page for that date.

## Error Handling

- An entry requires either a title or content.
- Invalid stored records are normalized or discarded.
- Deletes require confirmation.
- Empty searches and filters show a clear empty state.

## Verification

- Node tests cover normalization, legacy migration, date grouping, searching, and date filtering.
- Static checks cover page registration, calendar markers, selected-date navigation, and required page files.
- JavaScript syntax checks cover all mini program scripts.
- WeChat Developer Tools verifies the calendar and diary page rendering.
