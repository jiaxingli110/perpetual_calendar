const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const pageWxss = fs.readFileSync(path.join(root, "miniprogram/pages/index/index.wxss"), "utf8");
const appWxss = fs.readFileSync(path.join(root, "miniprogram/app.wxss"), "utf8");
const pageWxml = fs.readFileSync(path.join(root, "miniprogram/pages/index/index.wxml"), "utf8");
const pageJs = fs.readFileSync(path.join(root, "miniprogram/pages/index/index.js"), "utf8");
const appJson = JSON.parse(fs.readFileSync(path.join(root, "miniprogram/app.json"), "utf8"));

function selectorBlock(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, "m"));
  if (!match) throw new Error(`Missing selector: ${selector}`);
  return match[1];
}

function requireRule(source, selector, pattern, message) {
  const block = selectorBlock(source, selector);
  if (!pattern.test(block)) throw new Error(message);
}

for (const selector of [".month-head", ".controls", ".calendar-grid", ".almanac", ".form-line"]) {
  const block = selectorBlock(pageWxss, selector);
  if (/display:\s*grid/.test(block)) {
    throw new Error(`${selector} must not depend on CSS Grid in the mini program`);
  }
}

requireRule(pageWxss, ".weekday-grid text", /width:\s*14\.285714%/, "Weekday labels must occupy exactly one seventh of the row");
requireRule(pageWxss, ".weekday-grid .weekend", /color:\s*#c94635/, "Saturday and Sunday headings must be highlighted in red");
requireRule(pageWxss, ".day-cell", /width:\s*14\.285714%/, "Calendar cells must occupy exactly one seventh of the row");
requireRule(pageWxss, ".day-cell.weekend .solar-day", /color:\s*#c94635/, "Weekend dates must be highlighted in red");
requireRule(appWxss, "button", /width:\s*auto/, "Native buttons must reset their default width");
requireRule(appWxss, "button", /margin:\s*0/, "Native buttons must reset their default margin");
requireRule(appWxss, "button", /display:\s*flex/, "Native button contents must use Flexbox for stable vertical alignment");
requireRule(appWxss, "button", /align-items:\s*center/, "Native button contents must be vertically centered");
requireRule(appWxss, "button", /justify-content:\s*center/, "Native button contents must be horizontally centered");
requireRule(pageWxss, ".day-cell", /align-items:\s*flex-start/, "Calendar cell content must remain left aligned");
requireRule(pageWxss, ".day-cell", /justify-content:\s*flex-start/, "Calendar cell content must remain top aligned");
requireRule(pageWxss, ".gear", /width:\s*72rpx/, "The settings button must keep a compact square width");
requireRule(pageWxss, ".gear", /margin-left:\s*auto/, "The settings button must explicitly anchor to the right edge");
if (!/<button class="gear"[^>]*>\s*⚙\s*<\/button>/.test(pageWxml)) {
  throw new Error("The settings entry must render as a gear icon without a text label");
}
if (!/class="\{\{index >= 5 \? 'weekend' : ''\}\}"/.test(pageWxml)) {
  throw new Error("Saturday and Sunday weekday headings must receive the weekend class");
}
if (!/item\.isWeekend \? 'weekend' : ''/.test(pageWxml) || !/isWeekend:\s*date\.getDay\(\) === 0 \|\| date\.getDay\(\) === 6/.test(pageJs)) {
  throw new Error("Calendar dates must expose and render their weekend state");
}
requireRule(pageWxss, ".topbar > view:first-child", /flex:\s*1/, "The topbar title must fill remaining space and push settings right");
requireRule(pageWxss, ".summary-heading button", /margin-left:\s*auto/, "Summary action buttons must explicitly anchor to the right edge");
requireRule(pageWxss, ".summary-heading > view:first-child", /flex:\s*1/, "Summary titles must fill remaining space and push actions right");
requireRule(pageWxss, ".history-item text:last-child", /text-align:\s*left/, "History descriptions must remain left aligned");

const seasonalFoodBlock = pageJs.match(/const seasonalFood = \{([\s\S]*?)\n\};/);
if (!seasonalFoodBlock) throw new Error("Missing seasonal food data");
const seasonalRows = [...seasonalFoodBlock[1].matchAll(/\["(?:水果|蔬菜|水产)",\s*"([^"]+)"\]/g)];
if (seasonalRows.length !== 36) throw new Error("Each month must define fruit, vegetable, and aquatic recommendations");
for (const [, items] of seasonalRows) {
  const count = items.split("、").filter(Boolean).length;
  if (count < 3 || count > 5) throw new Error(`Seasonal recommendation count must be 3-5, received ${count}: ${items}`);
}

for (const page of ["todos", "anniversaries", "diaries"]) {
  const managerWxss = fs.readFileSync(path.join(root, `miniprogram/pages/${page}/${page}.wxss`), "utf8");
  requireRule(managerWxss, ".editor-actions", /width:\s*100%/, `${page} editor actions must occupy the full row`);
  requireRule(managerWxss, ".editor-actions button:first-child", /margin-left:\s*auto/, `${page} editor buttons must explicitly align right`);
  requireRule(managerWxss, ".card-heading > view:first-child", /flex:\s*1/, `${page} card titles must fill remaining space`);
}

const todoWxss = fs.readFileSync(path.join(root, "miniprogram/pages/todos/todos.wxss"), "utf8");
const anniversaryWxss = fs.readFileSync(path.join(root, "miniprogram/pages/anniversaries/anniversaries.wxss"), "utf8");
const diaryWxss = fs.readFileSync(path.join(root, "miniprogram/pages/diaries/diaries.wxss"), "utf8");
requireRule(todoWxss, ".todo-card .item-actions", /margin-left:\s*auto/, "Todo item actions must explicitly align right");
requireRule(anniversaryWxss, ".anniversary-card .item-actions", /margin-left:\s*auto/, "Anniversary item actions must explicitly align right");
requireRule(diaryWxss, ".diary-card .item-actions", /width:\s*100%/, "Diary item actions must occupy the full row");
requireRule(diaryWxss, ".list-heading button", /margin-left:\s*auto/, "Diary filter reset must explicitly align right");

if (!/class="day-background"/.test(pageWxml) || !/src="\{\{item\.termImage\}\}"/.test(pageWxml)) {
  throw new Error("Calendar cells must render the solar-term image layer");
}

for (const selector of [".day-background", ".day-shade", ".day-cell.selected .day-shade"]) {
  selectorBlock(pageWxss, selector);
}

const solarTermImageNames = [
  "xiaohan", "dahan", "lichun", "yushui", "jingzhe", "chunfen",
  "qingming", "guyu", "lixia", "xiaoman", "mangzhong", "xiazhi",
  "xiaoshu", "dashu", "liqiu", "chushu", "bailu", "qiufen",
  "hanlu", "shuangjiang", "lidong", "xiaoxue", "daxue", "dongzhi"
];

let solarTermArtworkBytes = 0;
for (const name of solarTermImageNames) {
  const relativePath = `/assets/solar-terms/${name}.jpg`;
  if (!pageJs.includes(relativePath)) throw new Error(`Missing solar-term path in page data: ${relativePath}`);
  const artworkPath = path.join(root, "miniprogram", relativePath);
  if (!fs.existsSync(artworkPath)) {
    throw new Error(`Missing packaged solar-term artwork: ${relativePath}`);
  }
  solarTermArtworkBytes += fs.statSync(artworkPath).size;
}

if (solarTermArtworkBytes > 1200000) {
  throw new Error(`Solar-term artwork is too large for the mini program package: ${solarTermArtworkBytes} bytes`);
}

const managerPages = ["pages/todos/todos", "pages/anniversaries/anniversaries", "pages/diaries/diaries"];
for (const page of managerPages) {
  if (!appJson.pages.includes(page)) throw new Error(`Missing registered manager page: ${page}`);
  for (const extension of ["js", "json", "wxml", "wxss"]) {
    if (!fs.existsSync(path.join(root, "miniprogram", `${page}.${extension}`))) {
      throw new Error(`Missing manager page file: ${page}.${extension}`);
    }
  }
}

for (const token of ["day-indicators", "diary-indicator", "openTodos", "openAnniversaries", "openDiaries", "管理待办", "管理纪念日", "写日记"]) {
  if (!pageWxml.includes(token) && !pageJs.includes(token)) throw new Error(`Missing calendar integration token: ${token}`);
}

for (const token of ["holiday-status", "workday", "event-status", "放假", "上班", "不放假"]) {
  if (!pageWxml.includes(token) && !pageJs.includes(token) && !pageWxss.includes(token)) {
    throw new Error(`Missing holiday presentation token: ${token}`);
  }
}

for (const selector of [".day-cell.holiday", ".day-cell.workday", ".holiday-status", ".event-item.holiday", ".event-item.workday"]) {
  selectorBlock(pageWxss, selector);
}

console.log("Mini program layout compatibility checks passed.");
