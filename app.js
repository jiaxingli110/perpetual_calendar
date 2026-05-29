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
const termVisuals = {
  "小寒": ["", "寒意渐深", "assets/solar-terms/xiaohan.jpg"],
  "大寒": ["", "岁末严寒", "assets/solar-terms/dahan.jpg"],
  "立春": ["", "春气初生", "assets/solar-terms/lichun.jpg"],
  "雨水": ["", "润物生长", "assets/solar-terms/yushui.jpg"],
  "惊蛰": ["", "万物苏醒", "assets/solar-terms/jingzhe.jpg"],
  "春分": ["", "昼夜均分", "assets/solar-terms/chunfen.jpg"],
  "清明": ["", "清朗明净", "assets/solar-terms/qingming.jpg"],
  "谷雨": ["", "雨生百谷", "assets/solar-terms/guyu.jpg"],
  "立夏": ["", "夏意初来", "assets/solar-terms/lixia.jpg"],
  "小满": ["", "麦穗渐满", "assets/solar-terms/xiaoman.jpg"],
  "芒种": ["", "有芒可种", "assets/solar-terms/mangzhong.jpg"],
  "夏至": ["", "白昼最长", "assets/solar-terms/xiazhi.jpg"],
  "小暑": ["", "暑气初盛", "assets/solar-terms/xiaoshu.jpg"],
  "大暑": ["", "一年最热", "assets/solar-terms/dashu.jpg"],
  "立秋": ["", "秋风将至", "assets/solar-terms/liqiu.jpg"],
  "处暑": ["", "暑气渐止", "assets/solar-terms/chushu.jpg"],
  "白露": ["", "露凝而白", "assets/solar-terms/bailu.jpg"],
  "秋分": ["", "秋色平分", "assets/solar-terms/qiufen.jpg"],
  "寒露": ["", "露寒将凝", "assets/solar-terms/hanlu.jpg"],
  "霜降": ["", "霜色渐浓", "assets/solar-terms/shuangjiang.jpg"],
  "立冬": ["", "冬令开始", "assets/solar-terms/lidong.jpg"],
  "小雪": ["", "初雪将临", "assets/solar-terms/xiaoxue.jpg"],
  "大雪": ["", "雪意渐盛", "assets/solar-terms/daxue.jpg"],
  "冬至": ["", "阴极阳生", "assets/solar-terms/dongzhi.jpg"]
};
const monthlyRecommendations = {
  "01-early": ["1月上旬", ["砂糖橘", "苹果", "梨"], ["白菜", "萝卜", "芹菜"], ["带鱼", "牡蛎", "鳕鱼"]],
  "01-mid": ["1月中旬", ["橙子", "柚子", "猕猴桃"], ["菠菜", "山药", "冬笋"], ["黄鱼", "海参", "扇贝"]],
  "01-late": ["1月下旬", ["车厘子", "草莓", "苹果"], ["莲藕", "菜心", "花菜"], ["鲈鱼", "蛤蜊", "牡蛎"]],
  "02-early": ["2月上旬", ["草莓", "橙子", "柚子"], ["春笋", "韭黄", "菠菜"], ["鲳鱼", "蛏子", "带鱼"]],
  "02-mid": ["2月中旬", ["草莓", "枇杷", "苹果"], ["豌豆苗", "荠菜", "芦笋"], ["蛤蜊", "鲈鱼", "黄鱼"]],
  "02-late": ["2月下旬", ["菠萝", "草莓", "桑葚"], ["香椿", "春笋", "韭菜"], ["海螺", "蛏子", "虾"]],
  "03-early": ["3月上旬", ["草莓", "菠萝", "桑葚"], ["荠菜", "香椿", "春笋"], ["蛏子", "海螺", "鲫鱼"]],
  "03-mid": ["3月中旬", ["枇杷", "菠萝", "草莓"], ["芦笋", "豌豆苗", "菠菜"], ["蛤蜊", "黄鱼", "鲈鱼"]],
  "03-late": ["3月下旬", ["桑葚", "枇杷", "菠萝"], ["蚕豆", "春笋", "莴笋"], ["带鱼", "虾", "蛤蜊"]],
  "04-early": ["4月上旬", ["枇杷", "桑葚", "菠萝"], ["蚕豆", "莴笋", "芦笋"], ["鲳鱼", "蛤蜊", "海虹"]],
  "04-mid": ["4月中旬", ["樱桃", "枇杷", "桑葚"], ["豌豆", "茭白", "春笋"], ["小黄鱼", "皮皮虾", "蛏子"]],
  "04-late": ["4月下旬", ["樱桃", "青梅", "枇杷"], ["蚕豆", "豌豆", "芦笋"], ["皮皮虾", "鲳鱼", "海螺"]],
  "05-early": ["5月上旬", ["樱桃", "枇杷", "甜瓜"], ["蚕豆", "茭白", "黄瓜"], ["皮皮虾", "小黄鱼", "蛏子"]],
  "05-mid": ["5月中旬", ["杨梅", "枇杷", "荔枝"], ["番茄", "黄瓜", "豇豆"], ["花蛤", "海虾", "鲳鱼"]],
  "05-late": ["5月下旬", ["杨梅", "荔枝", "甜瓜"], ["茭白", "番茄", "丝瓜"], ["花蛤", "皮皮虾", "鲈鱼"]],
  "06-early": ["6月上旬", ["西瓜", "杨梅", "荔枝"], ["丝瓜", "毛豆", "黄瓜"], ["小龙虾", "花蛤", "鲍鱼"]],
  "06-mid": ["6月中旬", ["桃子", "西瓜", "蓝莓"], ["茄子", "冬瓜", "苦瓜"], ["小龙虾", "蛤蜊", "海虾"]],
  "06-late": ["6月下旬", ["葡萄", "桃子", "甜瓜"], ["毛豆", "空心菜", "丝瓜"], ["鲍鱼", "花蛤", "带鱼"]],
  "07-early": ["7月上旬", ["西瓜", "桃子", "葡萄"], ["冬瓜", "苦瓜", "茄子"], ["小龙虾", "海虾", "蛏子"]],
  "07-mid": ["7月中旬", ["龙眼", "葡萄", "哈密瓜"], ["丝瓜", "秋葵", "空心菜"], ["鲍鱼", "花蛤", "鲈鱼"]],
  "07-late": ["7月下旬", ["梨", "桃子", "葡萄"], ["莲藕", "毛豆", "黄瓜"], ["带鱼", "海虾", "蛤蜊"]],
  "08-early": ["8月上旬", ["葡萄", "梨", "龙眼"], ["莲藕", "秋葵", "茄子"], ["梭子蟹", "海虾", "鲳鱼"]],
  "08-mid": ["8月中旬", ["无花果", "葡萄", "梨"], ["南瓜", "莲藕", "毛豆"], ["梭子蟹", "带鱼", "蛤蜊"]],
  "08-late": ["8月下旬", ["石榴", "梨", "葡萄"], ["山药", "莲藕", "芋头"], ["梭子蟹", "海虾", "鲈鱼"]],
  "09-early": ["9月上旬", ["石榴", "梨", "柚子"], ["莲藕", "山药", "南瓜"], ["螃蟹", "带鱼", "鲳鱼"]],
  "09-mid": ["9月中旬", ["柿子", "石榴", "葡萄"], ["芋头", "山药", "秋葵"], ["大闸蟹", "海虾", "鲈鱼"]],
  "09-late": ["9月下旬", ["柿子", "冬枣", "梨"], ["南瓜", "芋头", "莲藕"], ["大闸蟹", "黄鱼", "带鱼"]],
  "10-early": ["10月上旬", ["柿子", "冬枣", "柚子"], ["板栗", "南瓜", "山药"], ["大闸蟹", "带鱼", "鲈鱼"]],
  "10-mid": ["10月中旬", ["苹果", "柚子", "石榴"], ["萝卜", "白菜", "莲藕"], ["梭子蟹", "牡蛎", "海虾"]],
  "10-late": ["10月下旬", ["橙子", "苹果", "柚子"], ["芥蓝", "菜心", "花菜"], ["牡蛎", "黄鱼", "带鱼"]],
  "11-early": ["11月上旬", ["橙子", "柚子", "苹果"], ["白菜", "萝卜", "山药"], ["牡蛎", "带鱼", "鳕鱼"]],
  "11-mid": ["11月中旬", ["橘子", "橙子", "猕猴桃"], ["冬笋", "菠菜", "芥蓝"], ["海参", "扇贝", "黄鱼"]],
  "11-late": ["11月下旬", ["砂糖橘", "苹果", "柚子"], ["莲藕", "白菜", "菜心"], ["牡蛎", "鲈鱼", "蛤蜊"]],
  "12-early": ["12月上旬", ["砂糖橘", "橙子", "苹果"], ["萝卜", "白菜", "花菜"], ["带鱼", "牡蛎", "鳕鱼"]],
  "12-mid": ["12月中旬", ["柚子", "猕猴桃", "冬枣"], ["冬笋", "芹菜", "菠菜"], ["海参", "扇贝", "黄鱼"]],
  "12-late": ["12月下旬", ["车厘子", "橙子", "苹果"], ["山药", "莲藕", "菜心"], ["牡蛎", "鲈鱼", "蛤蜊"]]
};
const historyToday = {
  "01-01": [
    ["1863", "林肯签署《解放奴隶宣言》正式生效。", "The Emancipation Proclamation took effect in the United States."],
    ["1999", "欧元作为电子货币正式启动。", "The euro was launched as an electronic currency."]
  ],
  "02-14": [
    ["1876", "贝尔申请电话专利。", "Alexander Graham Bell applied for a telephone patent."],
    ["1946", "世界上早期电子计算机 ENIAC 公开亮相。", "ENIAC, an early electronic computer, was publicly unveiled."]
  ],
  "03-08": [
    ["1910", "国际妇女节倡议在哥本哈根会议上提出。", "The idea of International Women's Day was proposed in Copenhagen."],
    ["1975", "联合国开始纪念国际妇女节。", "The United Nations began observing International Women's Day."]
  ],
  "04-05": [
    ["1904", "中国近代实业家张謇创办的事业进入快速发展阶段。", "Zhang Jian's modern industrial and educational efforts entered a period of growth."],
    ["1975", "蒋介石在台北逝世。", "Chiang Kai-shek died in Taipei."]
  ],
  "05-01": [
    ["1886", "美国芝加哥工人大罢工，后来成为国际劳动节的重要源流。", "The Chicago workers' strike became a key origin of International Workers' Day."],
    ["1950", "《中华人民共和国婚姻法》公布施行。", "China's Marriage Law was promulgated and took effect."]
  ],
  "05-04": [
    ["1919", "五四运动爆发。", "The May Fourth Movement began in China."],
    ["1959", "第一届格莱美奖举行。", "The first Grammy Awards ceremony was held."]
  ],
  "05-29": [
    ["1953", "人类首次登顶珠穆朗玛峰。", "Humans reached the summit of Mount Everest for the first time."],
    ["1919", "爱丁顿日食观测支持广义相对论。", "Eddington's eclipse observations supported general relativity."]
  ],
  "06-01": [
    ["1926", "玛丽莲·梦露出生。", "Marilyn Monroe was born."],
    ["1980", "美国有线电视新闻网 CNN 开播。", "CNN began broadcasting in the United States."]
  ],
  "07-01": [
    ["1921", "中国共产党成立相关会议在上海召开。", "Meetings associated with the founding of the Communist Party of China began in Shanghai."],
    ["1997", "香港回归中国。", "Hong Kong returned to China."]
  ],
  "08-01": [
    ["1927", "南昌起义爆发。", "The Nanchang Uprising began."],
    ["1981", "音乐电视台 MTV 开播。", "MTV began broadcasting."]
  ],
  "09-10": [
    ["1985", "中国第一个教师节。", "China observed its first Teachers' Day."],
    ["1960", "欧佩克成立。", "OPEC was founded."]
  ],
  "10-01": [
    ["1949", "中华人民共和国成立。", "The People's Republic of China was founded."],
    ["1958", "美国国家航空航天局 NASA 正式运行。", "NASA officially began operations."]
  ],
  "11-11": [
    ["1918", "第一次世界大战停战协定生效。", "The Armistice ending fighting in World War I took effect."],
    ["1992", "英格兰国教会投票允许女性担任牧师。", "The Church of England voted to allow women to become priests."]
  ],
  "12-25": [
    ["1642", "艾萨克·牛顿出生。", "Isaac Newton was born."],
    ["1991", "苏联总统戈尔巴乔夫宣布辞职。", "Mikhail Gorbachev resigned as president of the Soviet Union."]
  ]
};
const defaultSettings = {
  showJapanHolidays: false,
  components: {
    today: true,
    events: true,
    redDays: true,
    recommendations: true,
    todos: true
  },
  collapsed: {
    today: false,
    events: false,
    redDays: false,
    recommendations: false,
    todos: false
  }
};

const state = {
  view: new Date(),
  selected: new Date(),
  settings: loadSettings(),
  todos: loadTodos(),
  reminderTimers: new Map()
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
  monthEvents: document.querySelector("#monthEvents"),
  historyList: document.querySelector("#historyList"),
  settingsButton: document.querySelector("#settingsButton"),
  settingsPopover: document.querySelector("#settingsPopover"),
  settingsClose: document.querySelector("#settingsClose"),
  settingsPageButtons: document.querySelectorAll("[data-settings-page]"),
  settingsPanels: document.querySelectorAll("[data-settings-panel]"),
  japanHolidayToggle: document.querySelector("#japanHolidayToggle"),
  componentToggles: document.querySelectorAll("[data-component-toggle]"),
  componentSections: document.querySelectorAll("[data-component]"),
  collapseToggles: document.querySelectorAll("[data-collapse-toggle]"),
  seasonRecommendations: document.querySelector("#seasonRecommendations"),
  todoForm: document.querySelector("#todoForm"),
  todoText: document.querySelector("#todoText"),
  todoDate: document.querySelector("#todoDate"),
  todoTime: document.querySelector("#todoTime"),
  todoReminder: document.querySelector("#todoReminder"),
  todoList: document.querySelector("#todoList")
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

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("calendarSettings") || "{}");
    return {
      ...defaultSettings,
      ...saved,
      components: { ...defaultSettings.components, ...(saved.components || {}) },
      collapsed: { ...defaultSettings.collapsed, ...(saved.collapsed || {}) }
    };
  } catch {
    return { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem("calendarSettings", JSON.stringify(state.settings));
}

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem("calendarTodos") || "[]");
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem("calendarTodos", JSON.stringify(state.todos));
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
  const legalHoliday = getChineseLegalHoliday(date, lunar, term);

  if (legalHoliday) events.push({ type: "legal", name: `法定·${legalHoliday}` });
  if (solar) events.push({ type: "festival", name: solar });
  if (lunar && !lunar.isLeap) {
    const lunarEvent = lunarFestivals[monthKey(lunar.month, lunar.day)];
    if (lunarEvent) events.push({ type: "festival", name: lunarEvent });
    if (lunar.month === 12 && lunar.day === monthDays(lunar.year, 12)) {
      events.push({ type: "festival", name: "除夕" });
    }
  }
  if (term) events.push({ type: "term", name: term });
  const japanHoliday = state.settings.showJapanHolidays ? getJapanHoliday(date) : "";
  if (japanHoliday) events.push({ type: "japan", name: japanHoliday });
  return events;
}

function getPeriodKey(day) {
  if (day <= 10) return "early";
  if (day <= 20) return "mid";
  return "late";
}

function getChineseLegalHoliday(date, lunar, term) {
  const key = monthKey(date.getMonth() + 1, date.getDate());
  if (key === "01-01") return "元旦";
  if (key === "05-01" || key === "05-02") return "劳动节";
  if (key === "10-01" || key === "10-02" || key === "10-03") return "国庆节";
  if (term === "清明") return "清明节";
  if (!lunar || lunar.isLeap) return "";
  if (lunar.month === 12 && lunar.day === monthDays(lunar.year, 12)) return "春节";
  if (lunar.month === 1 && lunar.day >= 1 && lunar.day <= 3) return "春节";
  if (lunar.month === 5 && lunar.day === 5) return "端午节";
  if (lunar.month === 8 && lunar.day === 15) return "中秋节";
  return "";
}

function nthMonday(year, monthIndex, nth) {
  const first = new Date(year, monthIndex, 1);
  const offset = (8 - first.getDay()) % 7;
  return 1 + offset + (nth - 1) * 7;
}

function springEquinoxDay(year) {
  return Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function autumnEquinoxDay(year) {
  return Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function baseJapanHolidayMap(year) {
  const holidays = new Map([
    [`${year}-01-01`, "元日"],
    [`${year}-01-${pad(nthMonday(year, 0, 2))}`, "成人の日"],
    [`${year}-02-11`, "建国記念の日"],
    [`${year}-02-23`, "天皇誕生日"],
    [`${year}-03-${pad(springEquinoxDay(year))}`, "春分の日"],
    [`${year}-04-29`, "昭和の日"],
    [`${year}-05-03`, "憲法記念日"],
    [`${year}-05-04`, "みどりの日"],
    [`${year}-05-05`, "こどもの日"],
    [`${year}-07-${pad(nthMonday(year, 6, 3))}`, "海の日"],
    [`${year}-08-11`, "山の日"],
    [`${year}-09-${pad(nthMonday(year, 8, 3))}`, "敬老の日"],
    [`${year}-09-${pad(autumnEquinoxDay(year))}`, "秋分の日"],
    [`${year}-10-${pad(nthMonday(year, 9, 2))}`, "スポーツの日"],
    [`${year}-11-03`, "文化の日"],
    [`${year}-11-23`, "勤労感謝の日"]
  ]);

  for (let month = 0; month < 12; month += 1) {
    const days = new Date(year, month + 1, 0).getDate();
    for (let day = 2; day < days; day += 1) {
      const prev = `${year}-${pad(month + 1)}-${pad(day - 1)}`;
      const current = `${year}-${pad(month + 1)}-${pad(day)}`;
      const next = `${year}-${pad(month + 1)}-${pad(day + 1)}`;
      if (!holidays.has(current) && holidays.has(prev) && holidays.has(next)) {
        holidays.set(current, "国民の休日");
      }
    }
  }

  const originalKeys = [...holidays.keys()];
  for (const key of originalKeys) {
    const [holidayYear, holidayMonth, holidayDay] = key.split("-").map(Number);
    const date = new Date(holidayYear, holidayMonth - 1, holidayDay);
    if (date.getDay() !== 0) continue;
    let substitute = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    while (holidays.has(dateKey(substitute))) {
      substitute = new Date(substitute.getFullYear(), substitute.getMonth(), substitute.getDate() + 1);
    }
    holidays.set(dateKey(substitute), "振替休日");
  }

  return holidays;
}

function getJapanHoliday(date) {
  return baseJapanHolidayMap(date.getFullYear()).get(dateKey(date)) || "";
}

function todosForDate(date) {
  const key = dateKey(date);
  return state.todos.filter((todo) => todo.date === key);
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
    const term = getSolarTerm(date);
    const todos = todosForDate(date);
    const button = document.createElement("button");
    button.className = "day-cell";
    button.type = "button";
    button.setAttribute("role", "gridcell");
    button.setAttribute("aria-label", `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);
    button.dataset.date = dateKey(date);

    if (date.getMonth() !== month) button.classList.add("is-muted");
    if (date.getDay() === 0 || date.getDay() === 6) button.classList.add("is-weekend");
    if (events.some((event) => event.type === "legal")) button.classList.add("is-legal-holiday");
    if (events.some((event) => event.type === "japan")) button.classList.add("is-japan-holiday");
    if (sameDay(date, today)) button.classList.add("is-today");
    if (sameDay(date, state.selected)) button.classList.add("is-selected");
    if (termVisuals[term]?.[2]) {
      button.classList.add("has-term-bg");
      button.style.setProperty("--term-bg", `url("${termVisuals[term][2]}")`);
    }

    button.innerHTML = `
      <span class="solar">${date.getDate()}</span>
      <span class="lunar">${lunar ? lunarDayName(lunar) : ""}</span>
      ${termVisuals[term]?.[0] ? `<span class="term-art" title="${termVisuals[term][1]}">${termVisuals[term][0]}</span>` : ""}
      <span class="tags"></span>
    `;

    const tags = button.querySelector(".tags");
    for (const event of events.slice(0, 3)) {
      const tag = document.createElement("span");
      tag.className = `tag ${event.type}`;
      tag.textContent = event.name;
      tags.append(tag);
    }
    if (todos.length) {
      const tag = document.createElement("span");
      tag.className = "tag todo";
      tag.textContent = `${todos.filter((todo) => !todo.done).length || todos.length}项待办`;
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
  elements.todoDate.value = dateKey(date);
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

function getHistoryItems(date) {
  const key = monthKey(date.getMonth() + 1, date.getDate());
  return historyToday[key] || [
    ["今日", "这一天也值得被记录。", "This date is still worth remembering."],
    ["Today", "选择一个特别年份，给这一天添上一条属于你的记录。", "Pick a meaningful year and add your own memory for this date."]
  ];
}

function renderHistory() {
  elements.historyList.replaceChildren();
  for (const [year, zh, en] of getHistoryItems(state.selected)) {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${year}</strong><span>${zh}</span><small>${en}</small>`;
    elements.historyList.append(item);
  }
}

function applyComponentSettings() {
  for (const toggle of elements.componentToggles) {
    const key = toggle.dataset.componentToggle;
    toggle.checked = state.settings.components[key] !== false;
  }

  for (const section of elements.componentSections) {
    const key = section.dataset.component;
    const visible = state.settings.components[key] !== false;
    const collapsed = state.settings.collapsed[key] === true;
    section.hidden = !visible;
    section.classList.toggle("is-collapsed", collapsed);
    const button = section.querySelector("[data-collapse-toggle]");
    if (button) button.setAttribute("aria-expanded", String(!collapsed));
  }
}

function renderSeasonRecommendations() {
  const month = state.selected.getMonth() + 1;
  const period = getPeriodKey(state.selected.getDate());
  const recommendation = monthlyRecommendations[`${pad(month)}-${period}`];
  const groups = [
    ["水果", recommendation[1]],
    ["蔬菜", recommendation[2]],
    ["海鲜", recommendation[3]]
  ];

  elements.seasonRecommendations.replaceChildren();
  for (const [label, items] of groups) {
    const section = document.createElement("div");
    section.className = "season-card";
    section.innerHTML = `<strong>${recommendation[0]}${label}</strong><p>${items.join(" · ")}</p>`;
    elements.seasonRecommendations.append(section);
  }
}

function renderTodos() {
  const todos = todosForDate(state.selected).sort((a, b) => `${a.time || ""}`.localeCompare(b.time || ""));
  elements.todoList.replaceChildren();

  if (!todos.length) {
    const empty = document.createElement("li");
    empty.className = "todo-empty";
    empty.textContent = "这一天还没有待办";
    elements.todoList.append(empty);
    return;
  }

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = todo.done ? "is-done" : "";
    item.innerHTML = `
      <label>
        <input type="checkbox" ${todo.done ? "checked" : ""} />
        <span>
          <strong>${todo.text}</strong>
          <small>${todo.time || "全天"}${todo.reminder ? " · 提醒" : ""}</small>
        </span>
      </label>
      <button type="button" aria-label="删除待办">×</button>
    `;
    item.querySelector("input").addEventListener("change", (event) => {
      todo.done = event.target.checked;
      saveTodos();
      render();
    });
    item.querySelector("button").addEventListener("click", () => {
      state.todos = state.todos.filter((current) => current.id !== todo.id);
      saveTodos();
      scheduleReminders();
      render();
    });
    elements.todoList.append(item);
  }
}

function notifyTodo(todo) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  new Notification("万年历待办提醒", {
    body: `${todo.time || "现在"} · ${todo.text}`,
    tag: todo.id
  });
}

function scheduleReminders() {
  for (const timer of state.reminderTimers.values()) {
    clearTimeout(timer);
  }
  state.reminderTimers.clear();

  const now = Date.now();
  for (const todo of state.todos) {
    if (!todo.reminder || todo.done || !todo.time) continue;
    const due = new Date(`${todo.date}T${todo.time}:00`).getTime();
    const delay = due - now;
    if (delay > 0 && delay < 2147483647) {
      state.reminderTimers.set(todo.id, setTimeout(() => notifyTodo(todo), delay));
    }
  }
}

function render() {
  renderCalendar();
  renderDetails();
  renderMonthEvents();
  renderSeasonRecommendations();
  renderTodos();
  renderHistory();
  applyComponentSettings();
  elements.japanHolidayToggle.checked = state.settings.showJapanHolidays;
}

document.querySelector("#prevMonth").addEventListener("click", () => setView(state.view.getFullYear(), state.view.getMonth() - 1));
document.querySelector("#nextMonth").addEventListener("click", () => setView(state.view.getFullYear(), state.view.getMonth() + 1));
document.querySelector("#prevYear").addEventListener("click", () => setView(state.view.getFullYear() - 1, state.view.getMonth()));
document.querySelector("#nextYear").addEventListener("click", () => setView(state.view.getFullYear() + 1, state.view.getMonth()));
document.querySelector("#todayButton").addEventListener("click", () => selectDate(new Date()));
elements.yearInput.addEventListener("change", () => setView(Number(elements.yearInput.value), state.view.getMonth()));
elements.monthSelect.addEventListener("change", () => setView(state.view.getFullYear(), Number(elements.monthSelect.value)));
elements.japanHolidayToggle.addEventListener("change", (event) => {
  state.settings.showJapanHolidays = event.target.checked;
  saveSettings();
  render();
});
elements.settingsButton.addEventListener("click", () => {
  elements.settingsPopover.hidden = !elements.settingsPopover.hidden;
});
elements.settingsClose.addEventListener("click", () => {
  elements.settingsPopover.hidden = true;
});
for (const button of elements.settingsPageButtons) {
  button.addEventListener("click", () => {
    const page = button.dataset.settingsPage;
    for (const item of elements.settingsPageButtons) {
      item.classList.toggle("is-active", item === button);
    }
    for (const panel of elements.settingsPanels) {
      panel.classList.toggle("is-active", panel.dataset.settingsPanel === page);
    }
  });
}
for (const toggle of elements.componentToggles) {
  toggle.addEventListener("change", () => {
    state.settings.components[toggle.dataset.componentToggle] = toggle.checked;
    saveSettings();
    render();
  });
}
for (const toggle of elements.collapseToggles) {
  toggle.addEventListener("click", () => {
    const key = toggle.dataset.collapseToggle;
    state.settings.collapsed[key] = !state.settings.collapsed[key];
    saveSettings();
    render();
  });
}
elements.todoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = elements.todoText.value.trim();
  if (!text) return;

  const reminder = elements.todoReminder.checked;
  if (reminder && "Notification" in window && Notification.permission === "default") {
    await Notification.requestPermission();
  }

  state.todos.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    date: elements.todoDate.value || dateKey(state.selected),
    time: elements.todoTime.value,
    reminder,
    done: false
  });
  elements.todoText.value = "";
  elements.todoTime.value = "";
  elements.todoReminder.checked = false;
  saveTodos();
  scheduleReminders();
  render();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

scheduleReminders();
selectDate(new Date());
