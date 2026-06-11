const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const pageWxss = fs.readFileSync(path.join(root, "miniprogram/pages/index/index.wxss"), "utf8");
const appWxss = fs.readFileSync(path.join(root, "miniprogram/app.wxss"), "utf8");
const pageWxml = fs.readFileSync(path.join(root, "miniprogram/pages/index/index.wxml"), "utf8");
const pageJs = fs.readFileSync(path.join(root, "miniprogram/pages/index/index.js"), "utf8");

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
requireRule(pageWxss, ".day-cell", /width:\s*14\.285714%/, "Calendar cells must occupy exactly one seventh of the row");
requireRule(appWxss, "button", /width:\s*auto/, "Native buttons must reset their default width");
requireRule(appWxss, "button", /margin:\s*0/, "Native buttons must reset their default margin");
requireRule(appWxss, "button", /display:\s*flex/, "Native button contents must use Flexbox for stable vertical alignment");
requireRule(appWxss, "button", /align-items:\s*center/, "Native button contents must be vertically centered");
requireRule(appWxss, "button", /justify-content:\s*center/, "Native button contents must be horizontally centered");
requireRule(pageWxss, ".day-cell", /align-items:\s*flex-start/, "Calendar cell content must remain left aligned");
requireRule(pageWxss, ".day-cell", /justify-content:\s*flex-start/, "Calendar cell content must remain top aligned");
requireRule(pageWxss, ".gear", /width:\s*144rpx/, "The settings button must keep a compact explicit width");

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

console.log("Mini program layout compatibility checks passed.");
