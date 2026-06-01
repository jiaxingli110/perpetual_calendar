const { existsSync } = require("node:fs");
const { spawnSync } = require("node:child_process");
const { resolve } = require("node:path");

const version = process.argv[2] || "0.1.0";
const desc = process.argv.slice(3).join(" ") || "万年历小程序版本上传";
const projectPath = resolve(__dirname, "..", "miniprogram");
const cliCandidates = [
  process.env.WECHAT_DEVTOOLS_CLI,
  "D:\\Software\\wechattool\\微信web开发者工具\\cli.bat",
  "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat",
  "C:\\Program Files\\Tencent\\微信web开发者工具\\cli.bat",
  "C:\\Program Files (x86)\\Tencent\\微信开发者工具\\cli.bat",
  "C:\\Program Files\\Tencent\\微信开发者工具\\cli.bat"
].filter(Boolean);

const cli = cliCandidates.find((candidate) => existsSync(candidate));

if (!cli) {
  console.error("未找到微信开发者工具 CLI。请安装微信开发者工具，或设置 WECHAT_DEVTOOLS_CLI 指向 cli.bat。");
  process.exit(1);
}

const result = spawnSync(cli, [
  "upload",
  "--project",
  projectPath,
  "-v",
  version,
  "-d",
  desc
], {
  stdio: "inherit",
  shell: false
});

process.exit(result.status || 0);
