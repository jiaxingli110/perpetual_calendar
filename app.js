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

const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const lunarMonths = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
const lunarDays = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"
];
const weekNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const solarTerms = [
  "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
  "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
];
const termInfo = [
  0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693,
  263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758
];
const solarFestivals = {
  "01-01": "元旦",
  "02-14": "情人节",
  "03-08": "妇女节",
  "03-12": "植树节",
  "04-01": "愚人节",
  "05-01": "劳动节",
  "05-04": "青年节",
  "06-01": "儿童节",
  "07-01": "建党节",
  "08-01": "建军节",
  "09-10": "教师节",
  "10-01": "国庆节",
  "12-24": "平安夜",
  "12-25": "圣诞节"
};
const lunarFestivals = {
  "01-01": "春节",
  "01-15": "元宵节",
  "02-02": "龙抬头",
  "05-05": "端午节",
  "07-07": "七夕",
  "07-15": "中元节",
  "08-15": "中秋节",
  "09-09": "重阳节",
  "12-08": "腊八节",
  "12-23": "北方小年",
  "12-24": "南方小年"
};

const state = {
  view: new Date(),
  selected: new Date()
};

const elements = {
  calendarGrid: document.querySelector("#calendarGrid"),
  monthTitle: document.querySelector("#monthTitle"),
  monthMeta: document.querySelector("#monthMeta"),
  yearInput: document.querySelector("#yearInput"),
  monthSelect: document.querySelector("#monthSelect"),
  selectedWeekday: document.querySelector("#selectedWeekday"),
  selectedDay: document.querySelector("#selectedDay"),
  selectedSolar: document.querySelector("#selectedSolar"),
  selectedLunar: document.querySelector("#selectedLunar"),
  lunarDetail: document.querySelector("#lunarDetail"),
  ganzhiDetail: document.querySelector("#ganzhiDetail"),
  festivalDetail: document.querySelector("#festivalDetail"),
  monthEvents: document.querySelector("#monthEvents")
};

for (let month = 0; month < 12; month += 1) {
  const option = document.createElement("option");
  option.value = String(month);
  option.textContent = `${month + 1}月`;
  elements.monthSelect.append(option);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function dateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function monthKey(month, day) {
  return `${pad(month)}-${pad(day)}`;
}

function leapMonth(year) {
  return lunarInfo[year - 1900] & 0xf;
}

function leapDays(year) {
  if (leapMonth(year)) {
    return (lunarInfo[year - 1900] & 0x10000) ? 30 : 29;
  }
  return 0;
}

function monthDays(year, month) {
  return (lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}

function lunarYearDays(year) {
  let sum = 348;
  for (let bit = 0x8000; bit > 0x8; bit >>= 1) {
    sum += (lunarInfo[year - 1900] & bit) ? 1 : 0;
  }
  return sum + leapDays(year);
}

function solarTermDay(year, index) {
  const base = Date.UTC(1900, 0, 6, 2, 5);
  const date = new Date(base + 31556925974.7 * (year - 1900) + termInfo[index] * 60000);
  return date.getUTCDate();
}

function getSolarTerm(date) {
  const month = date.getMonth();
  const day = date.getDate();
  const first = month * 2;
  if (solarTermDay(date.getFullYear(), first) === day) return solarTerms[first];
  if (solarTermDay(date.getFullYear(), first + 1) === day) return solarTerms[first + 1];
  return "";
}

function toLunar(date) {
  if (date.getFullYear() < 1900 || date.getFullYear() > 2100) {
    return null;
  }

  const baseDate = new Date(1900, 0, 31);
  let offset = Math.floor((date - baseDate) / 86400000);
  let year = 1900;
  let daysOfYear = 0;

  while (year < 2101 && offset > 0) {
    daysOfYear = lunarYearDays(year);
    if (offset < daysOfYear) break;
    offset -= daysOfYear;
    year += 1;
  }

  const leap = leapMonth(year);
  let isLeap = false;
  let month = 1;
  let daysOfMonth = 0;

  while (month <= 12 && offset >= 0) {
    if (leap > 0 && month === leap + 1 && !isLeap) {
      month -= 1;
      isLeap = true;
      daysOfMonth = leapDays(year);
    } else {
      daysOfMonth = monthDays(year, month);
    }

    if (offset < daysOfMonth) break;
    offset -= daysOfMonth;

    if (isLeap && month === leap) {
      isLeap = false;
    }
    month += 1;
  }

  const day = offset + 1;
  return { year, month, day, isLeap };
}

function ganzhiYear(year) {
  return `${heavenlyStems[(year - 4) % 10]}${earthlyBranches[(year - 4) % 12]}`;
}

function ganzhiMonth(year, month) {
  const index = (year * 12 + month + 3) % 60;
  return `${heavenlyStems[index % 10]}${earthlyBranches[index % 12]}`;
}

function ganzhiDay(date) {
  const offset = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
  const index = (offset + 40) % 60;
  return `${heavenlyStems[index % 10]}${earthlyBranches[index % 12]}`;
}

function lunarMonthName(lunar) {
  return `${lunar.isLeap ? "闰" : ""}${lunarMonths[lunar.month - 1]}月`;
}

function lunarDayName(lunar) {
  return lunar.day === 1 ? lunarMonthName(lunar) : lunarDays[lunar.day - 1];
}

function lunarFullName(lunar) {
  return `${lunarMonthName(lunar)}${lunarDays[lunar.day - 1]}`;
}

function getFestivals(date, lunar) {
  const events = [];
  const solar = solarFestivals[monthKey(date.getMonth() + 1, date.getDate())];
  const term = getSolarTerm(date);

  if (solar) events.push({ type: "festival", name: solar });
  if (lunar && !lunar.isLeap) {
    const lunarEvent = lunarFestivals[monthKey(lunar.month, lunar.day)];
    if (lunarEvent) events.push({ type: "festival", name: lunarEvent });
    if (lunar.month === 12 && lunar.day === monthDays(lunar.year, 12)) {
      events.push({ type: "festival", name: "除夕" });
    }
  }
  if (term) events.push({ type: "term", name: term });
  return events;
}

function clampYear(year) {
  return Math.min(2100, Math.max(1901, year));
}

function setView(year, month) {
  state.view = new Date(clampYear(year), month, 1);
  render();
}

function selectDate(date) {
  state.selected = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  state.view = new Date(date.getFullYear(), date.getMonth(), 1);
  render();
}

function buildCalendarDates(year, month) {
  const firstDate = new Date(year, month, 1);
  const startOffset = (firstDate.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - startOffset);
  return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
}

function renderCalendar() {
  const year = state.view.getFullYear();
  const month = state.view.getMonth();
  const today = new Date();
  const dates = buildCalendarDates(year, month);

  elements.calendarGrid.replaceChildren();
  elements.monthTitle.textContent = `${year}年 ${month + 1}月`;
  elements.monthMeta.textContent = `${ganzhiYear(year)}年 · ${animals[(year - 4) % 12]}年 · ${month + 1}月共有 ${new Date(year, month + 1, 0).getDate()} 天`;
  elements.yearInput.value = String(year);
  elements.monthSelect.value = String(month);

  for (const date of dates) {
    const lunar = toLunar(date);
    const events = getFestivals(date, lunar);
    const button = document.createElement("button");
    button.className = "day-cell";
    button.type = "button";
    button.setAttribute("role", "gridcell");
    button.setAttribute("aria-label", `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);
    button.dataset.date = dateKey(date);

    if (date.getMonth() !== month) button.classList.add("is-muted");
    if (date.getDay() === 0 || date.getDay() === 6) button.classList.add("is-weekend");
    if (sameDay(date, today)) button.classList.add("is-today");
    if (sameDay(date, state.selected)) button.classList.add("is-selected");

    button.innerHTML = `
      <span class="solar">${date.getDate()}</span>
      <span class="lunar">${lunar ? lunarDayName(lunar) : ""}</span>
      <span class="tags"></span>
    `;

    const tags = button.querySelector(".tags");
    for (const event of events.slice(0, 2)) {
      const tag = document.createElement("span");
      tag.className = `tag ${event.type}`;
      tag.textContent = event.name;
      tags.append(tag);
    }

    button.addEventListener("click", () => selectDate(date));
    elements.calendarGrid.append(button);
  }
}

function renderDetails() {
  const date = state.selected;
  const lunar = toLunar(date);
  const events = getFestivals(date, lunar);

  elements.selectedWeekday.textContent = weekNames[date.getDay()];
  elements.selectedDay.textContent = String(date.getDate());
  elements.selectedSolar.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  elements.selectedLunar.textContent = lunar ? `农历 ${lunarFullName(lunar)}` : "农历数据暂支持 1901-2100 年";
  elements.lunarDetail.textContent = lunar ? `${ganzhiYear(lunar.year)}年 ${lunarFullName(lunar)}` : "超出农历数据范围";
  elements.ganzhiDetail.textContent = `${ganzhiYear(date.getFullYear())}年 ${ganzhiMonth(date.getFullYear(), date.getMonth() + 1)}月 ${ganzhiDay(date)}日`;
  elements.festivalDetail.textContent = events.length ? events.map((event) => event.name).join("、") : "无";
}

function renderMonthEvents() {
  const year = state.view.getFullYear();
  const month = state.view.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const items = [];

  for (let day = 1; day <= days; day += 1) {
    const date = new Date(year, month, day);
    const lunar = toLunar(date);
    const events = getFestivals(date, lunar);
    for (const event of events) {
      items.push({ day, name: event.name });
    }
  }

  elements.monthEvents.replaceChildren();
  if (!items.length) {
    const empty = document.createElement("li");
    empty.innerHTML = "<strong>本月暂无节日</strong><span></span>";
    elements.monthEvents.append(empty);
    return;
  }

  for (const item of items) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.name}</strong><span>${month + 1}月${item.day}日</span>`;
    elements.monthEvents.append(li);
  }
}

function render() {
  renderCalendar();
  renderDetails();
  renderMonthEvents();
}

document.querySelector("#prevMonth").addEventListener("click", () => setView(state.view.getFullYear(), state.view.getMonth() - 1));
document.querySelector("#nextMonth").addEventListener("click", () => setView(state.view.getFullYear(), state.view.getMonth() + 1));
document.querySelector("#prevYear").addEventListener("click", () => setView(state.view.getFullYear() - 1, state.view.getMonth()));
document.querySelector("#nextYear").addEventListener("click", () => setView(state.view.getFullYear() + 1, state.view.getMonth()));
document.querySelector("#todayButton").addEventListener("click", () => selectDate(new Date()));
elements.yearInput.addEventListener("change", () => setView(Number(elements.yearInput.value), state.view.getMonth()));
elements.monthSelect.addEventListener("change", () => setView(state.view.getFullYear(), Number(elements.monthSelect.value)));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

selectDate(new Date());
