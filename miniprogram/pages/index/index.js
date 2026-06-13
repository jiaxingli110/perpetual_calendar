const storage = require("../../utils/storage");
const { getHolidayPlan } = require("../../utils/holidays");

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
const solarTermImages = [
  "/assets/solar-terms/xiaohan.jpg", "/assets/solar-terms/dahan.jpg",
  "/assets/solar-terms/lichun.jpg", "/assets/solar-terms/yushui.jpg",
  "/assets/solar-terms/jingzhe.jpg", "/assets/solar-terms/chunfen.jpg",
  "/assets/solar-terms/qingming.jpg", "/assets/solar-terms/guyu.jpg",
  "/assets/solar-terms/lixia.jpg", "/assets/solar-terms/xiaoman.jpg",
  "/assets/solar-terms/mangzhong.jpg", "/assets/solar-terms/xiazhi.jpg",
  "/assets/solar-terms/xiaoshu.jpg", "/assets/solar-terms/dashu.jpg",
  "/assets/solar-terms/liqiu.jpg", "/assets/solar-terms/chushu.jpg",
  "/assets/solar-terms/bailu.jpg", "/assets/solar-terms/qiufen.jpg",
  "/assets/solar-terms/hanlu.jpg", "/assets/solar-terms/shuangjiang.jpg",
  "/assets/solar-terms/lidong.jpg", "/assets/solar-terms/xiaoxue.jpg",
  "/assets/solar-terms/daxue.jpg", "/assets/solar-terms/dongzhi.jpg"
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
const seasonalFood = {
  1: [["水果", "砂糖橘、苹果、柚子、梨、猕猴桃"], ["蔬菜", "白菜、萝卜、花菜、菠菜、冬笋"], ["水产", "带鱼、牡蛎、鳕鱼、鲈鱼、海参"]],
  2: [["水果", "草莓、橙子、苹果、甘蔗、金桔"], ["蔬菜", "春笋、菠菜、韭黄、芹菜、荠菜"], ["水产", "鲫鱼、蛤蜊、带鱼、鲈鱼、牡蛎"]],
  3: [["水果", "枇杷、菠萝、草莓、樱桃、桑葚"], ["蔬菜", "香椿、春笋、蚕豆、豌豆、莴笋"], ["水产", "蛏子、海螺、鲫鱼、河虾、鳜鱼"]],
  4: [["水果", "樱桃、枇杷、桑葚、菠萝、青梅"], ["蔬菜", "芦笋、豌豆、茭白、蚕豆、蒜薹"], ["水产", "小黄鱼、皮皮虾、海虾、鲳鱼、蛏子"]],
  5: [["水果", "杨梅、荔枝、甜瓜、樱桃、枇杷"], ["蔬菜", "番茄、黄瓜、豇豆、茄子、苦瓜"], ["水产", "花蛤、海虾、鲈鱼、小龙虾、黄鱼"]],
  6: [["水果", "西瓜、桃子、蓝莓、杨梅、荔枝"], ["蔬菜", "茄子、冬瓜、苦瓜、丝瓜、豇豆"], ["水产", "小龙虾、鳝鱼、海虾、鲈鱼、花蛤"]],
  7: [["水果", "葡萄、桃子、哈密瓜、西瓜、李子"], ["蔬菜", "丝瓜、空心菜、毛豆、冬瓜、莲藕"], ["水产", "鲍鱼、花蛤、带鱼、海虾、黄鳝"]],
  8: [["水果", "梨、葡萄、无花果、石榴、龙眼"], ["蔬菜", "莲藕、南瓜、芋头、茭白、毛豆"], ["水产", "螃蟹、海虾、鲫鱼、鲍鱼、鲈鱼"]],
  9: [["水果", "石榴、柿子、柚子、梨、葡萄"], ["蔬菜", "山药、莲藕、南瓜、芋头、萝卜"], ["水产", "大闸蟹、黄鱼、带鱼、海虾、鲈鱼"]],
  10: [["水果", "柿子、苹果、橙子、柚子、猕猴桃"], ["蔬菜", "板栗、萝卜、白菜、山药、莲藕"], ["水产", "牡蛎、海虾、黄鱼、螃蟹、鲈鱼"]],
  11: [["水果", "橙子、柚子、苹果、梨、冬枣"], ["蔬菜", "冬笋、菠菜、山药、白菜、萝卜"], ["水产", "海参、扇贝、带鱼、牡蛎、鳕鱼"]],
  12: [["水果", "砂糖橘、柚子、苹果、梨、猕猴桃"], ["蔬菜", "萝卜、白菜、菜心、菠菜、冬笋"], ["水产", "鳕鱼、牡蛎、鲈鱼、带鱼、海参"]]
};
const historyToday = {
  "01-01": [["1863", "林肯签署《解放黑人奴隶宣言》正式生效。"], ["1999", "欧元作为电子货币正式启动。"]],
  "03-08": [["1910", "国际妇女节倡议在哥本哈根会议上提出。"], ["1975", "联合国开始纪念国际妇女节。"]],
  "05-01": [["1886", "芝加哥工人大罢工，成为国际劳动节的重要源流。"]],
  "05-04": [["1919", "五四运动爆发。"]],
  "05-31": [["1902", "第二次布尔战争结束。"], ["1961", "南非共和国成立。"]],
  "07-01": [["1921", "中国共产党成立相关会议在上海召开。"], ["1997", "香港回归祖国。"]],
  "10-01": [["1949", "中华人民共和国成立。"], ["1958", "美国国家航空航天局 NASA 正式运行。"]],
  "12-25": [["1642", "艾萨克·牛顿出生。"], ["1991", "苏联总统戈尔巴乔夫宣布辞职。"]]
};
const defaultComponents = {
  today: true,
  events: true,
  recommendations: true,
  todos: true,
  anniversaries: true,
  diaries: true
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function dateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function monthKey(month, day) {
  return `${pad(month)}-${pad(day)}`;
}

function parseDate(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
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
  const offset = 31556925974.7 * (year - 1900) + termInfo[index] * 60000;
  return new Date(base + offset).getUTCDate();
}

function getSolarTerm(date) {
  const index = date.getMonth() * 2;
  if (date.getDate() === solarTermDay(date.getFullYear(), index)) return solarTerms[index];
  if (date.getDate() === solarTermDay(date.getFullYear(), index + 1)) return solarTerms[index + 1];
  return "";
}

function toLunar(date) {
  let offset = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(1900, 0, 31)) / 86400000);
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
  while (month < 13 && offset >= 0) {
    if (leap > 0 && month === leap + 1 && !isLeap) {
      month -= 1;
      isLeap = true;
      daysOfMonth = leapDays(year);
    } else {
      daysOfMonth = monthDays(year, month);
    }

    if (offset < daysOfMonth) break;
    offset -= daysOfMonth;

    if (isLeap && month === leap) isLeap = false;
    month += 1;
  }

  return { year, month, day: offset + 1, isLeap };
}

function ganzhiYear(year) {
  return heavenlyStems[(year - 4) % 10] + earthlyBranches[(year - 4) % 12];
}

function ganzhiDay(date) {
  const offset = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(1900, 0, 1)) / 86400000);
  return heavenlyStems[(offset + 10) % 10] + earthlyBranches[(offset + 12) % 12];
}

function lunarMonthName(lunar) {
  return `${lunar.isLeap ? "闰" : ""}${lunarMonths[lunar.month - 1]}月`;
}

function lunarDayName(lunar) {
  return lunarDays[lunar.day - 1] || "";
}

function lunarFullName(lunar) {
  return `${ganzhiYear(lunar.year)}年 ${animals[(lunar.year - 4) % 12]}年 ${lunarMonthName(lunar)}${lunarDayName(lunar)}`;
}

function getFestivals(date, lunar, term) {
  const items = [];
  const holidayPlan = getHolidayPlan(dateKey(date));
  const solar = solarFestivals[monthKey(date.getMonth() + 1, date.getDate())];
  const lunarFestival = lunarFestivals[monthKey(lunar.month, lunar.day)];
  if (holidayPlan) items.push({
    type: holidayPlan.type,
    name: holidayPlan.type === "workday" ? `调休·${holidayPlan.name}` : `法定·${holidayPlan.name}`,
    shortName: holidayPlan.type === "workday" ? "上班" : "休"
  });
  if (solar && (!holidayPlan || solar !== holidayPlan.name)) items.push({ type: "festival", name: solar, shortName: solar });
  if (lunarFestival && (!holidayPlan || lunarFestival !== holidayPlan.name)) items.push({ type: "festival", name: lunarFestival, shortName: lunarFestival });
  if (term) items.push({ type: "term", name: term, shortName: term });
  return items;
}

function getAdvice(date) {
  const goods = ["整理", "出行", "会友", "阅读", "洽谈", "运动"];
  const bads = ["拖延", "熬夜", "冲动消费", "久坐", "争执", "粗心"];
  const seed = date.getFullYear() + date.getMonth() * 31 + date.getDate();
  return {
    good: goods[seed % goods.length],
    bad: bads[(seed + 2) % bads.length]
  };
}

function buildCalendarDays(view, selectedKey, todos = [], anniversaries = [], diaries = []) {
  const year = view.getFullYear();
  const month = view.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const start = addDays(first, -startOffset);
  const todayKey = dateKey(new Date());
  const days = [];

  for (let index = 0; index < 42; index += 1) {
    const date = addDays(start, index);
    const lunar = toLunar(date);
    const term = getSolarTerm(date);
    const festivals = getFestivals(date, lunar, term);
    const calendarFestival = festivals.find((item) => item.type !== "holiday" && item.type !== "workday");
    const key = dateKey(date);
    const dayTodos = todos.filter((todo) => todo.date === key && !todo.done);
    const dayAnniversaries = anniversaries.filter((item) => storage.matchesAnniversary(item, date, lunar));
    const dayDiaries = diaries.filter((item) => item.date === key);
    days.push({
      key,
      day: date.getDate(),
      badge: calendarFestival?.shortName || term || (lunar.day === 1 ? lunarMonthName(lunar) : lunarDayName(lunar)),
      mark: festivals.filter((item) => item !== calendarFestival && item.type !== "holiday" && item.type !== "workday").map((item) => item.shortName).join(" "),
      termImage: term ? solarTermImages[solarTerms.indexOf(term)] : "",
      todoCount: dayTodos.length,
      anniversaryCount: dayAnniversaries.length,
      diaryCount: dayDiaries.length,
      isCurrentMonth: date.getMonth() === month,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isToday: key === todayKey,
      isSelected: key === selectedKey,
      isHoliday: festivals.some((item) => item.type === "holiday"),
      isWorkday: festivals.some((item) => item.type === "workday"),
      holidayLabel: festivals.find((item) => item.type === "holiday" || item.type === "workday")?.shortName || ""
    });
  }

  return days;
}

function createSelected(date) {
  const lunar = toLunar(date);
  const term = getSolarTerm(date);
  const festivals = getFestivals(date, lunar, term);
  const advice = getAdvice(date);
  return {
    day: date.getDate(),
    weekday: weekNames[date.getDay()],
    solar: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
    lunar: lunarFullName(lunar),
    ganzhi: `${ganzhiYear(lunar.year)}年 ${ganzhiDay(date)}日`,
    festivals: festivals.length ? festivals.map((item) => item.name).join("、") : "无",
    good: advice.good,
    bad: advice.bad
  };
}

function collectMonthEvents(view) {
  const year = view.getFullYear();
  const month = view.getMonth();
  const count = new Date(year, month + 1, 0).getDate();
  const events = [];
  for (let day = 1; day <= count; day += 1) {
    const date = new Date(year, month, day);
    const lunar = toLunar(date);
    const term = getSolarTerm(date);
    const festivals = getFestivals(date, lunar, term);
    for (const item of festivals) {
      events.push({
        key: `${day}-${item.type}-${item.name}`,
        day: `${month + 1}月${day}日`,
        name: item.name,
        type: item.type,
        status: item.type === "holiday" ? "放假" : item.type === "workday" ? "上班" : "不放假"
      });
    }
  }
  return events.slice(0, 12);
}

function normalizeComponents(value) {
  return { ...defaultComponents, ...(value || {}) };
}

Page({
  data: {
    weekdays: ["一", "二", "三", "四", "五", "六", "日"],
    viewYear: 2026,
    viewMonth: 4,
    selectedKey: "",
    monthTitle: "",
    monthMeta: "",
    pickerValue: "",
    calendarDays: [],
    selected: {},
    monthEvents: [],
    recommendations: [],
    historyItems: [],
    todos: [],
    todoText: "",
    anniversaries: [],
    anniversaryName: "",
    diaries: [],
    components: defaultComponents,
    componentOptions: [],
    showSettings: false
  },

  onLoad() {
    const today = new Date();
    const components = normalizeComponents(wx.getStorageSync("calendarComponents"));
    this.setData({
      viewYear: today.getFullYear(),
      viewMonth: today.getMonth(),
      selectedKey: dateKey(today),
      components
    });
  },

  onShow() {
    this.refresh();
    this.showDueTodos();
  },

  refresh() {
    const view = new Date(this.data.viewYear, this.data.viewMonth, 1);
    const selectedDate = parseDate(this.data.selectedKey);
    const allTodos = storage.readTodos();
    const allAnniversaries = storage.readAnniversaries();
    const allDiaries = storage.readDiaries();
    const selectedMonthDay = monthKey(selectedDate.getMonth() + 1, selectedDate.getDate());
    const lunar = toLunar(selectedDate);
    const selectedLunarDay = monthKey(lunar.month, lunar.day);
    const foods = seasonalFood[selectedDate.getMonth() + 1] || [];

    this.setData({
      monthTitle: `${view.getFullYear()}年${view.getMonth() + 1}月`,
      monthMeta: `${ganzhiYear(view.getFullYear())}年 ${animals[(view.getFullYear() - 4) % 12]}年`,
      pickerValue: `${view.getFullYear()}-${pad(view.getMonth() + 1)}`,
      calendarDays: buildCalendarDays(view, this.data.selectedKey, allTodos, allAnniversaries, allDiaries),
      selected: createSelected(selectedDate),
      monthEvents: collectMonthEvents(view),
      recommendations: foods.map(([title, items]) => ({ title, items })),
      historyItems: (historyToday[selectedMonthDay] || [["", "这一天也适合记录自己的小历史。"]]).map(([year, text]) => ({ year, text })),
      todos: allTodos.filter((todo) => todo.date === this.data.selectedKey),
      anniversaries: allAnniversaries.filter((item) => {
        const key = monthKey(item.month, item.day);
        return item.type === "lunar" ? key === selectedLunarDay : key === selectedMonthDay;
      }),
      diaries: storage.sortDiaries(allDiaries.filter((item) => item.date === this.data.selectedKey)).slice(0, 3),
      componentOptions: [
        { key: "today", label: "今日信息", checked: this.data.components.today },
        { key: "events", label: "本月节日", checked: this.data.components.events },
        { key: "recommendations", label: "当季推荐", checked: this.data.components.recommendations },
        { key: "todos", label: "待办", checked: this.data.components.todos },
        { key: "anniversaries", label: "纪念日", checked: this.data.components.anniversaries },
        { key: "diaries", label: "日记", checked: this.data.components.diaries }
      ]
    });
  },

  setView(year, month) {
    const next = new Date(year, month, 1);
    const clampedYear = Math.min(2100, Math.max(1901, next.getFullYear()));
    this.setData({ viewYear: clampedYear, viewMonth: next.getMonth() });
    this.refresh();
  },

  prevMonth() {
    this.setView(this.data.viewYear, this.data.viewMonth - 1);
  },

  nextMonth() {
    this.setView(this.data.viewYear, this.data.viewMonth + 1);
  },

  prevYear() {
    this.setView(this.data.viewYear - 1, this.data.viewMonth);
  },

  nextYear() {
    this.setView(this.data.viewYear + 1, this.data.viewMonth);
  },

  goToday() {
    const today = new Date();
    this.setData({
      viewYear: today.getFullYear(),
      viewMonth: today.getMonth(),
      selectedKey: dateKey(today)
    });
    this.refresh();
  },

  onMonthPick(event) {
    const [year, month] = event.detail.value.split("-").map(Number);
    this.setView(year, month - 1);
  },

  selectDate(event) {
    const selectedKey = event.currentTarget.dataset.date;
    const selected = parseDate(selectedKey);
    this.setData({
      selectedKey,
      viewYear: selected.getFullYear(),
      viewMonth: selected.getMonth()
    });
    this.refresh();
  },

  toggleSettings() {
    this.setData({ showSettings: !this.data.showSettings });
  },

  toggleComponent(event) {
    const key = event.currentTarget.dataset.key;
    const components = { ...this.data.components, [key]: event.detail.value };
    wx.setStorageSync("calendarComponents", components);
    this.setData({ components });
    this.refresh();
  },

  openTodos() {
    wx.navigateTo({ url: `/pages/todos/todos?date=${this.data.selectedKey}` });
  },

  openAnniversaries() {
    wx.navigateTo({ url: `/pages/anniversaries/anniversaries?date=${this.data.selectedKey}` });
  },

  openDiaries() {
    wx.navigateTo({ url: `/pages/diaries/diaries?date=${this.data.selectedKey}` });
  },

  showDueTodos() {
    const app = getApp();
    const remindedIds = new Set(app.globalData.remindedTodoIds || []);
    const due = storage.readTodos().filter((todo) => storage.isTodoDue(todo) && !remindedIds.has(todo.id));
    if (!due.length) return;
    due.forEach((todo) => remindedIds.add(todo.id));
    app.globalData.remindedTodoIds = [...remindedIds];
    const preview = due.slice(0, 3).map((todo) => `${todo.time} ${todo.text}`).join("\n");
    const suffix = due.length > 3 ? `\n还有 ${due.length - 3} 项` : "";
    wx.showModal({
      title: `有 ${due.length} 项待办已到期`,
      content: `${preview}${suffix}`,
      confirmText: "查看待办",
      success: ({ confirm }) => {
        if (confirm) this.openTodos();
      }
    });
  },

  onTodoInput(event) {
    this.setData({ todoText: event.detail.value });
  },

  addTodo() {
    const text = this.data.todoText.trim();
    if (!text) return;
    const todos = wx.getStorageSync("calendarTodos") || [];
    todos.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      date: this.data.selectedKey,
      done: false
    });
    wx.setStorageSync("calendarTodos", todos);
    this.setData({ todoText: "" });
    this.refresh();
  },

  toggleTodo(event) {
    const id = event.currentTarget.dataset.id;
    const todos = (wx.getStorageSync("calendarTodos") || []).map((todo) => (
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
    wx.setStorageSync("calendarTodos", todos);
    this.refresh();
  },

  removeTodo(event) {
    const id = event.currentTarget.dataset.id;
    const todos = (wx.getStorageSync("calendarTodos") || []).filter((todo) => todo.id !== id);
    wx.setStorageSync("calendarTodos", todos);
    this.refresh();
  },

  onAnniversaryInput(event) {
    this.setData({ anniversaryName: event.detail.value });
  },

  addAnniversary() {
    const name = this.data.anniversaryName.trim();
    if (!name) return;
    const date = parseDate(this.data.selectedKey);
    const anniversaries = wx.getStorageSync("calendarAnniversaries") || [];
    anniversaries.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      type: "solar",
      month: date.getMonth() + 1,
      day: date.getDate()
    });
    wx.setStorageSync("calendarAnniversaries", anniversaries);
    this.setData({ anniversaryName: "" });
    this.refresh();
  },

  removeAnniversary(event) {
    const id = event.currentTarget.dataset.id;
    const anniversaries = (wx.getStorageSync("calendarAnniversaries") || []).filter((item) => item.id !== id);
    wx.setStorageSync("calendarAnniversaries", anniversaries);
    this.refresh();
  }
});
