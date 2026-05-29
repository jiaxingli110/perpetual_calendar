const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const output = path.join(root, "www");
const files = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "service-worker.js"
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(output, relativePath);
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

ensureDir(output);
for (const file of files) {
  copyFile(file);
}

const iconSource = path.join(root, "icons");
const iconTarget = path.join(output, "icons");
ensureDir(iconTarget);
for (const entry of fs.readdirSync(iconSource, { withFileTypes: true })) {
  if (entry.isFile()) {
    fs.copyFileSync(path.join(iconSource, entry.name), path.join(iconTarget, entry.name));
  }
}

const assetSource = path.join(root, "assets");
const assetTarget = path.join(output, "assets");
if (fs.existsSync(assetSource)) {
  fs.cpSync(assetSource, assetTarget, { recursive: true });
}

console.log(`Prepared mobile web assets in ${output}`);
