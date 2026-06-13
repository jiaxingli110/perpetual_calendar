const { dateKey, parseDate, pad } = require("./calendar");

const TODO_KEY = "calendarTodos";
const ANNIVERSARY_KEY = "calendarAnniversaries";
const DIARY_KEY = "calendarDiaries";

function timestamp(value, fallback) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function normalizeTodo(todo, now = Date.now()) {
  const createdAt = timestamp(todo.createdAt, now);
  return {
    id: String(todo.id || `${now}-${Math.random().toString(16).slice(2)}`),
    text: String(todo.text || "").trim(),
    date: /^\d{4}-\d{2}-\d{2}$/.test(todo.date || "") ? todo.date : dateKey(new Date()),
    time: /^\d{2}:\d{2}$/.test(todo.time || "") ? todo.time : "09:00",
    reminder: Boolean(todo.reminder),
    done: Boolean(todo.done),
    createdAt,
    updatedAt: timestamp(todo.updatedAt, createdAt)
  };
}

function normalizeTodos(value) {
  return Array.isArray(value) ? value.map((todo, index) => normalizeTodo(todo, Date.now() + index)).filter((todo) => todo.text) : [];
}

function normalizeAnniversary(item, now = Date.now()) {
  const type = item.type === "lunar" ? "lunar" : "solar";
  const month = Math.min(12, Math.max(1, Number(item.month) || 1));
  const maxDay = type === "lunar" ? 30 : new Date(2000, month, 0).getDate();
  const day = Math.min(maxDay, Math.max(1, Number(item.day) || 1));
  const createdAt = timestamp(item.createdAt, now);
  return {
    id: String(item.id || `${now}-${Math.random().toString(16).slice(2)}`),
    name: String(item.name || "").trim(),
    type,
    sourceDate: /^\d{4}-\d{2}-\d{2}$/.test(item.sourceDate || "") ? item.sourceDate : `2000-${pad(month)}-${pad(day)}`,
    month,
    day,
    yearly: true,
    createdAt,
    updatedAt: timestamp(item.updatedAt, createdAt)
  };
}

function normalizeAnniversaries(value) {
  return Array.isArray(value) ? value.map((item, index) => normalizeAnniversary(item, Date.now() + index)).filter((item) => item.name) : [];
}

function normalizeDiary(item, now = Date.now()) {
  const legacyText = String(item.text || "").trim();
  const content = String(item.content || legacyText).trim();
  const firstLine = content.split(/\r?\n/).find((line) => line.trim()) || "";
  const title = String(item.title || firstLine).trim().slice(0, 40);
  const createdAt = timestamp(item.createdAt, now);
  return {
    id: String(item.id || `${now}-${Math.random().toString(16).slice(2)}`),
    date: /^\d{4}-\d{2}-\d{2}$/.test(item.date || "") ? item.date : dateKey(new Date()),
    title,
    content,
    createdAt,
    updatedAt: timestamp(item.updatedAt, createdAt)
  };
}

function normalizeDiaries(value) {
  return Array.isArray(value)
    ? value.map((item, index) => normalizeDiary(item, Date.now() + index)).filter((item) => item.title || item.content)
    : [];
}

function read(key, normalizer) {
  return normalizer(wx.getStorageSync(key));
}

function write(key, value) {
  wx.setStorageSync(key, value);
  return value;
}

function readTodos() {
  return read(TODO_KEY, normalizeTodos);
}

function writeTodos(todos) {
  return write(TODO_KEY, normalizeTodos(todos));
}

function readAnniversaries() {
  return read(ANNIVERSARY_KEY, normalizeAnniversaries);
}

function writeAnniversaries(items) {
  return write(ANNIVERSARY_KEY, normalizeAnniversaries(items));
}

function readDiaries() {
  return read(DIARY_KEY, normalizeDiaries);
}

function writeDiaries(items) {
  return write(DIARY_KEY, normalizeDiaries(items));
}

function isTodoDue(todo, now = new Date()) {
  if (!todo.reminder || todo.done) return false;
  return new Date(`${todo.date}T${todo.time || "09:00"}:00`).getTime() <= now.getTime();
}

function filterTodos(todos, filter) {
  if (filter === "open") return todos.filter((todo) => !todo.done);
  if (filter === "completed") return todos.filter((todo) => todo.done);
  return [...todos];
}

function matchesAnniversary(item, date, lunar) {
  if (item.type === "lunar") return item.month === lunar.month && item.day === lunar.day;
  return item.month === date.getMonth() + 1 && item.day === date.getDate();
}

function sortTodos(todos) {
  return [...todos].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`) || b.createdAt - a.createdAt);
}

function sortAnniversaries(items) {
  return [...items].sort((a, b) => a.month - b.month || a.day - b.day || a.name.localeCompare(b.name));
}

function sortDiaries(items) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt - a.updatedAt);
}

function filterDiaries(items, filters = {}) {
  const keyword = String(filters.keyword || "").trim().toLowerCase();
  const year = String(filters.year || "");
  const month = String(filters.month || "").padStart(2, "0");
  return sortDiaries(items).filter((item) => {
    if (year && item.date.slice(0, 4) !== year) return false;
    if (filters.month && item.date.slice(5, 7) !== month) return false;
    if (!keyword) return true;
    return `${item.title}\n${item.content}`.toLowerCase().includes(keyword);
  });
}

module.exports = {
  TODO_KEY,
  ANNIVERSARY_KEY,
  DIARY_KEY,
  normalizeTodo,
  normalizeTodos,
  normalizeAnniversary,
  normalizeAnniversaries,
  normalizeDiary,
  normalizeDiaries,
  readTodos,
  writeTodos,
  readAnniversaries,
  writeAnniversaries,
  readDiaries,
  writeDiaries,
  isTodoDue,
  filterTodos,
  matchesAnniversary,
  sortTodos,
  sortAnniversaries,
  sortDiaries,
  filterDiaries,
  parseDate
};
