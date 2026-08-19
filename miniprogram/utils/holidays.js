const REMOTE_HOLIDAY_CACHE_KEY = "calendarRemoteHolidayPlans";

const builtinHolidayPlans = {
  2025: {
    holidays: {
      "2025-01-01": "元旦",
      "2025-01-28": "春节", "2025-01-29": "春节", "2025-01-30": "春节",
      "2025-01-31": "春节", "2025-02-01": "春节", "2025-02-02": "春节",
      "2025-02-03": "春节", "2025-02-04": "春节",
      "2025-04-04": "清明节", "2025-04-05": "清明节", "2025-04-06": "清明节",
      "2025-05-01": "劳动节", "2025-05-02": "劳动节", "2025-05-03": "劳动节",
      "2025-05-04": "劳动节", "2025-05-05": "劳动节",
      "2025-05-31": "端午节", "2025-06-01": "端午节", "2025-06-02": "端午节",
      "2025-10-01": "国庆中秋", "2025-10-02": "国庆中秋", "2025-10-03": "国庆中秋",
      "2025-10-04": "国庆中秋", "2025-10-05": "国庆中秋", "2025-10-06": "国庆中秋",
      "2025-10-07": "国庆中秋", "2025-10-08": "国庆中秋"
    },
    workdays: {
      "2025-01-26": "春节调休",
      "2025-02-08": "春节调休",
      "2025-04-27": "劳动节调休",
      "2025-09-28": "国庆中秋调休",
      "2025-10-11": "国庆中秋调休"
    }
  },
  2026: {
    holidays: {
      "2026-01-01": "元旦", "2026-01-02": "元旦", "2026-01-03": "元旦",
      "2026-02-15": "春节", "2026-02-16": "春节", "2026-02-17": "春节",
      "2026-02-18": "春节", "2026-02-19": "春节", "2026-02-20": "春节",
      "2026-02-21": "春节", "2026-02-22": "春节", "2026-02-23": "春节",
      "2026-04-04": "清明节", "2026-04-05": "清明节", "2026-04-06": "清明节",
      "2026-05-01": "劳动节", "2026-05-02": "劳动节", "2026-05-03": "劳动节",
      "2026-05-04": "劳动节", "2026-05-05": "劳动节",
      "2026-06-19": "端午节", "2026-06-20": "端午节", "2026-06-21": "端午节",
      "2026-09-25": "中秋节", "2026-09-26": "中秋节", "2026-09-27": "中秋节",
      "2026-10-01": "国庆节", "2026-10-02": "国庆节", "2026-10-03": "国庆节",
      "2026-10-04": "国庆节", "2026-10-05": "国庆节", "2026-10-06": "国庆节",
      "2026-10-07": "国庆节"
    },
    workdays: {
      "2026-01-04": "元旦调休",
      "2026-02-14": "春节调休",
      "2026-02-28": "春节调休",
      "2026-05-09": "劳动节调休",
      "2026-09-20": "国庆节调休",
      "2026-10-10": "国庆节调休"
    }
  }
};

let holidayPlans = clonePlans(builtinHolidayPlans);

function clonePlans(plans) {
  return JSON.parse(JSON.stringify(plans || {}));
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isDateKey(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value));
}

function normalizeDateMap(value) {
  if (value === undefined) return {};
  if (!isPlainObject(value)) return null;
  const result = {};
  for (const [key, name] of Object.entries(value)) {
    if (!isDateKey(key) || typeof name !== "string" || !name.trim()) return null;
    result[key] = name.trim();
  }
  return result;
}

function normalizeHolidayData(data) {
  const payload = typeof data === "string" ? JSON.parse(data) : data;
  const plans = payload?.plans || payload?.holidayPlans || payload;
  if (!isPlainObject(plans)) return null;

  const normalized = {};
  for (const [year, plan] of Object.entries(plans)) {
    const yearNumber = Number(year);
    if (!Number.isInteger(yearNumber) || yearNumber < 1900 || yearNumber > 2100) return null;
    if (!isPlainObject(plan)) return null;
    const holidays = normalizeDateMap(plan.holidays);
    const workdays = normalizeDateMap(plan.workdays);
    if (!holidays || !workdays) return null;
    normalized[yearNumber] = {
      source: typeof plan.source === "string" ? plan.source : "",
      sourceDate: typeof plan.sourceDate === "string" ? plan.sourceDate : "",
      holidays,
      workdays
    };
  }

  return normalized;
}

function mergeHolidayPlans(basePlans, incomingPlans) {
  const merged = clonePlans(basePlans);
  for (const [year, plan] of Object.entries(incomingPlans)) {
    merged[year] = {
      ...(merged[year] || {}),
      source: plan.source || merged[year]?.source || "",
      sourceDate: plan.sourceDate || merged[year]?.sourceDate || "",
      holidays: { ...(merged[year]?.holidays || {}), ...plan.holidays },
      workdays: { ...(merged[year]?.workdays || {}), ...plan.workdays }
    };
  }
  return merged;
}

function applyHolidayData(data) {
  try {
    const normalized = normalizeHolidayData(data);
    if (!normalized) return false;
    holidayPlans = mergeHolidayPlans(holidayPlans, normalized);
    return true;
  } catch (error) {
    return false;
  }
}

function loadCachedHolidayData(storage) {
  if (!storage || typeof storage.getStorageSync !== "function") return false;
  try {
    const cached = storage.getStorageSync(REMOTE_HOLIDAY_CACHE_KEY);
    return cached ? applyHolidayData(cached) : false;
  } catch (error) {
    return false;
  }
}

function saveCachedHolidayData(storage, data) {
  if (!storage || typeof storage.setStorageSync !== "function") return;
  try {
    storage.setStorageSync(REMOTE_HOLIDAY_CACHE_KEY, data);
  } catch (error) {}
}

function requestHolidayData({ url, request }) {
  if (!url || typeof request !== "function") return Promise.resolve(null);
  return new Promise((resolve) => {
    request({
      url,
      method: "GET",
      timeout: 5000,
      success: (response) => resolve(response?.data || null),
      fail: () => resolve(null)
    });
  });
}

function loadRemoteHolidayData(options = {}) {
  const { url, request, storage } = options;
  loadCachedHolidayData(storage);
  return requestHolidayData({ url, request }).then((data) => {
    if (!data || !applyHolidayData(data)) return false;
    saveCachedHolidayData(storage, data);
    return true;
  });
}

function getHolidayPlan(key) {
  const year = Number(String(key).slice(0, 4));
  const plan = holidayPlans[year];
  if (!plan) return null;
  if (plan.holidays[key]) return { type: "holiday", name: plan.holidays[key] };
  if (plan.workdays[key]) return { type: "workday", name: plan.workdays[key] };
  return null;
}

function resetHolidayPlansForTest() {
  holidayPlans = clonePlans(builtinHolidayPlans);
}

module.exports = {
  REMOTE_HOLIDAY_CACHE_KEY,
  getHolidayPlan,
  applyHolidayData,
  loadCachedHolidayData,
  loadRemoteHolidayData,
  resetHolidayPlansForTest
};
