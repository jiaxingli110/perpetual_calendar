const assert = require("node:assert/strict");

const calendar = require("../miniprogram/utils/calendar");
const storage = require("../miniprogram/utils/storage");

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

test("normalizes legacy todos with complete fields", () => {
  const todo = storage.normalizeTodo({ id: "1", text: "缴费", date: "2026-06-12", done: false }, 10);
  assert.deepEqual(todo, {
    id: "1",
    text: "缴费",
    date: "2026-06-12",
    time: "09:00",
    reminder: false,
    done: false,
    createdAt: 10,
    updatedAt: 10
  });
});

test("normalizes legacy anniversaries as yearly solar records", () => {
  const item = storage.normalizeAnniversary({ id: "a", name: "纪念日", type: "solar", month: 6, day: 12 }, 20);
  assert.equal(item.sourceDate, "2000-06-12");
  assert.equal(item.yearly, true);
  assert.equal(item.month, 6);
  assert.equal(item.day, 12);
});

test("keeps the 31st day for solar anniversaries", () => {
  const item = storage.normalizeAnniversary({ name: "月末", type: "solar", month: 12, day: 31 }, 20);
  assert.equal(item.day, 31);
});

test("converts known June 2026 dates to lunar dates", () => {
  assert.deepEqual(calendar.toLunar(new Date(2026, 5, 11)), { year: 2026, month: 4, day: 26, isLeap: false });
  assert.deepEqual(calendar.toLunar(new Date(2026, 5, 21)), { year: 2026, month: 5, day: 7, isLeap: false });
});

test("detects incomplete reminders that are due", () => {
  const now = new Date(2026, 5, 12, 9, 30, 0);
  assert.equal(storage.isTodoDue({ date: "2026-06-12", time: "09:00", reminder: true, done: false }, now), true);
  assert.equal(storage.isTodoDue({ date: "2026-06-12", time: "10:00", reminder: true, done: false }, now), false);
  assert.equal(storage.isTodoDue({ date: "2026-06-12", time: "09:00", reminder: true, done: true }, now), false);
});

test("matches yearly solar anniversaries", () => {
  const date = new Date(2026, 5, 12);
  assert.equal(storage.matchesAnniversary({ type: "solar", month: 6, day: 12 }, date, calendar.toLunar(date)), true);
  assert.equal(storage.matchesAnniversary({ type: "solar", month: 6, day: 13 }, date, calendar.toLunar(date)), false);
});

test("matches yearly lunar anniversaries", () => {
  const date = new Date(2026, 5, 12);
  const lunar = calendar.toLunar(date);
  assert.equal(storage.matchesAnniversary({ type: "lunar", month: lunar.month, day: lunar.day }, date, lunar), true);
  assert.equal(storage.matchesAnniversary({ type: "lunar", month: lunar.month, day: lunar.day + 1 }, date, lunar), false);
});

test("filters todos by status", () => {
  const todos = [
    { id: "1", done: false },
    { id: "2", done: true }
  ];
  assert.deepEqual(storage.filterTodos(todos, "open").map((item) => item.id), ["1"]);
  assert.deepEqual(storage.filterTodos(todos, "completed").map((item) => item.id), ["2"]);
  assert.equal(storage.filterTodos(todos, "all").length, 2);
});

test("normalizes legacy diary text into title and content", () => {
  const entry = storage.normalizeDiary({ id: "d1", date: "2026-06-12", text: "A useful day\nFinished the calendar." }, 30);
  assert.equal(entry.title, "A useful day");
  assert.equal(entry.content, "A useful day\nFinished the calendar.");
  assert.equal(entry.createdAt, 30);
  assert.equal(entry.updatedAt, 30);
});

test("filters diaries by keyword in title or content", () => {
  const entries = [
    { id: "1", date: "2026-06-12", title: "Calendar", content: "Finished reminders" },
    { id: "2", date: "2026-05-01", title: "Holiday", content: "Family trip" }
  ];
  assert.deepEqual(storage.filterDiaries(entries, { keyword: "remind" }).map((item) => item.id), ["1"]);
  assert.deepEqual(storage.filterDiaries(entries, { keyword: "holiday" }).map((item) => item.id), ["2"]);
});

test("filters diaries by year and month", () => {
  const entries = [
    { id: "1", date: "2026-06-12", title: "One", content: "" },
    { id: "2", date: "2026-05-01", title: "Two", content: "" },
    { id: "3", date: "2025-06-12", title: "Three", content: "" }
  ];
  assert.deepEqual(storage.filterDiaries(entries, { year: "2026", month: "06" }).map((item) => item.id), ["1"]);
});

test("classifies 2026 statutory holidays and adjusted workdays", () => {
  const holidays = require("../miniprogram/utils/holidays");
  assert.deepEqual(holidays.getHolidayPlan("2026-06-19"), { type: "holiday", name: "端午节" });
  assert.deepEqual(holidays.getHolidayPlan("2026-06-21"), { type: "holiday", name: "端午节" });
  assert.deepEqual(holidays.getHolidayPlan("2026-05-09"), { type: "workday", name: "劳动节调休" });
  assert.equal(holidays.getHolidayPlan("2026-06-12"), null);
});

console.log("Mini program data tests passed.");
