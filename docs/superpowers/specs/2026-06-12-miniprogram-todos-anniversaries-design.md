# Mini Program Todos and Anniversaries Design

## Goal

Bring the mini program's todo and anniversary workflows close to the desktop feature set while preserving offline-first behavior and adapting reminders to mini program platform limits.

## Scope

This phase adds two independent management pages:

- Todo management with title, date, time, reminder flag, completion state, editing, and deletion.
- Anniversary management with name, solar/lunar calendar type, annual recurrence, editing, and deletion.
- Calendar-day markers and selected-day summaries linking to the management pages.
- In-app overdue reminder checks when the mini program starts or returns to the foreground.

Cloud synchronization, subscription messages, and background system notifications are outside this phase.

## Architecture

### Shared utilities

`utils/calendar.js` owns date keys and solar-to-lunar conversion needed by both the calendar and anniversary editor. `utils/storage.js` owns normalized local-storage reads and writes, including migration of existing simple todo and anniversary records.

### Page responsibilities

- `pages/index`: calendar display, selected-day summaries, markers, navigation, and due reminder presentation.
- `pages/todos`: complete todo CRUD and filtering for all/open/completed items.
- `pages/anniversaries`: complete anniversary CRUD, calendar type selection, date conversion preview, and annual recurrence.

Each page reads fresh storage in `onShow`, so returning from an editor immediately refreshes the calendar and summaries.

## Data Models

Todo:

```js
{
  id: string,
  text: string,
  date: "YYYY-MM-DD",
  time: "HH:mm",
  reminder: boolean,
  done: boolean,
  createdAt: number,
  updatedAt: number
}
```

Anniversary:

```js
{
  id: string,
  name: string,
  type: "solar" | "lunar",
  sourceDate: "YYYY-MM-DD",
  month: number,
  day: number,
  yearly: true,
  createdAt: number,
  updatedAt: number
}
```

For lunar anniversaries, `month` and `day` are derived from `sourceDate` at save time. The source date remains available for editing and display.

## Reminder Behavior

When the index page is shown, it finds incomplete reminder-enabled todos whose combined date and time are not later than now. Each overdue item is shown at most once per app session through a modal summary. This is explicitly an in-app reminder, not a background notification.

## Calendar Markers

Calendar days receive compact `待` and `纪` markers. Solar anniversaries match month/day directly. Lunar anniversaries match each rendered day's converted lunar month/day. The selected-day cards show item counts and the first few records, with a button to open the full manager.

## Error Handling

- Empty names and titles are rejected with a toast.
- Local storage values are normalized to arrays and legacy records are upgraded on read.
- Date and time pickers provide valid values, avoiding free-form parsing.
- Destructive deletes require a modal confirmation.

## Verification

- Node tests cover normalization, migration, due detection, filtering, and solar/lunar recurrence matching.
- Static checks verify page registration, manager page files, navigation handlers, and calendar markers.
- JavaScript syntax checks run for every mini program source file.
- WeChat Developer Tools compiles the project and visual checks cover both manager pages and return-to-calendar refresh.
