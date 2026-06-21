const lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
  0x0d520
];

const lunarMonthLabels = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
const lunarDayLabels = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function dateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDate(key) {
  const [year, month, day] = String(key).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function leapMonth(year) {
  return lunarInfo[year - 1900] & 0xf;
}

function leapDays(year) {
  return leapMonth(year) ? ((lunarInfo[year - 1900] & 0x10000) ? 30 : 29) : 0;
}

function lunarMonthDays(year, month) {
  return (lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}

function lunarYearDays(year) {
  let sum = 348;
  for (let bit = 0x8000; bit > 0x8; bit >>= 1) sum += (lunarInfo[year - 1900] & bit) ? 1 : 0;
  return sum + leapDays(year);
}

function toLunar(date) {
  let offset = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(1900, 0, 31)) / 86400000);
  let year = 1900;
  while (year < 2101 && offset >= lunarYearDays(year)) {
    offset -= lunarYearDays(year);
    year += 1;
  }

  const leap = leapMonth(year);
  let isLeap = false;
  let month = 1;
  while (month <= 12) {
    const days = isLeap ? leapDays(year) : lunarMonthDays(year, month);
    if (offset < days) break;
    offset -= days;
    if (leap === month && !isLeap) {
      isLeap = true;
    } else {
      if (isLeap) isLeap = false;
      month += 1;
    }
  }

  return { year, month, day: offset + 1, isLeap };
}

function lunarLabel(lunar) {
  return `${lunar.isLeap ? "闰" : ""}${lunarMonthLabels[lunar.month - 1]}${lunarDayLabels[lunar.day - 1]}`;
}

function isNthWeekday(date, month, weekday, occurrence) {
  if (date.getMonth() + 1 !== month || date.getDay() !== weekday) return false;
  return Math.floor((date.getDate() - 1) / 7) + 1 === occurrence;
}

function getVariableSolarFestivals(date) {
  const names = [];
  if (isNthWeekday(date, 5, 0, 2)) names.push("母亲节");
  if (isNthWeekday(date, 6, 0, 3)) names.push("父亲节");
  if (isNthWeekday(date, 11, 4, 4)) names.push("感恩节");
  return names;
}

function compactHolidayName(name) {
  const compactNames = {
    "春节": "春节",
    "清明节": "清明",
    "劳动节": "劳动节",
    "端午节": "端午",
    "中秋节": "中秋",
    "国庆节": "国庆"
  };
  return compactNames[name] || name;
}

function combineFestivalNames(date, options = {}) {
  const names = [
    options.holidayName ? compactHolidayName(options.holidayName) : "",
    options.solarName || "",
    options.lunarName || "",
    options.term || "",
    ...getVariableSolarFestivals(date)
  ].filter(Boolean);
  return [...new Set(names)];
}

module.exports = {
  dateKey,
  parseDate,
  pad,
  toLunar,
  lunarLabel,
  getVariableSolarFestivals,
  combineFestivalNames
};
