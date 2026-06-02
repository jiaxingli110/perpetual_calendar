const { app, BrowserWindow, Menu, Notification, ipcMain, shell, dialog } = require("electron");
const path = require("node:path");
const fs = require("node:fs/promises");
const { pathToFileURL } = require("node:url");

const isMac = process.platform === "darwin";

if (process.platform === "win32") {
  app.setAppUserModelId("com.example.perpetualcalendar");
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 360,
    minHeight: 640,
    autoHideMenuBar: true,
    title: "万年历",
    backgroundColor: "#f6f1e9",
    icon: path.join(__dirname, "..", "icons", "icon-512.png"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.cjs")
    }
  });

  const indexPath = path.join(__dirname, "..", "index.html");
  const loadTimer = setTimeout(() => {
    if (!mainWindow.isDestroyed()) {
      mainWindow.webContents.reloadIgnoringCache();
    }
  }, 8000);

  mainWindow.webContents.once("did-finish-load", () => {
    clearTimeout(loadTimer);
  });

  mainWindow.webContents.on("did-fail-load", (_event, errorCode, errorDescription) => {
    clearTimeout(loadTimer);
    mainWindow.webContents.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(`
      <!doctype html>
      <html lang="zh-CN">
        <head>
          <meta charset="UTF-8" />
          <title>万年历加载失败</title>
          <style>
            body { margin: 0; display: grid; min-height: 100vh; place-items: center; font-family: "Microsoft YaHei", sans-serif; background: #f7f1e7; color: #20242a; }
            main { width: min(520px, calc(100% - 40px)); padding: 28px; border: 1px solid #d8c7ad; border-radius: 8px; background: #fffdf8; box-shadow: 0 18px 48px rgba(57, 50, 42, 0.14); }
            h1 { margin: 0 0 12px; font-size: 24px; }
            p { margin: 8px 0; line-height: 1.7; color: #3f4854; }
            code { color: #9f2d24; }
          </style>
        </head>
        <body>
          <main>
            <h1>万年历没有成功加载</h1>
            <p>基础页面不需要联网。当前失败更可能是本地文件未打包完整或被安全软件拦截。</p>
            <p>错误：<code>${errorCode} ${errorDescription}</code></p>
          </main>
        </body>
      </html>
    `)}`);
  });

  mainWindow.loadFile(indexPath);
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

function showReminderNotification(todo) {
  if (!Notification.isSupported()) return false;
  const notification = new Notification({
    title: "万年历待办提醒",
    body: `${todo.time || "08:00"} · ${todo.text}`,
    icon: path.join(__dirname, "..", "icons", "icon-192.png"),
    silent: false
  });
  notification.show();
  return true;
}

function defaultDiaryDirectory() {
  return path.join(app.getPath("documents"), "万年历日记文件");
}

async function ensureDirectory(directory) {
  const target = directory || defaultDiaryDirectory();
  await fs.mkdir(target, { recursive: true });
  return target;
}

function diaryFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".avif"].includes(ext)) {
    return `image/${ext.replace(".", "").replace("jpg", "jpeg")}`;
  }
  if ([".mp4", ".webm", ".ogg", ".ogv", ".mov", ".m4v"].includes(ext)) {
    if (ext === ".ogv") return "video/ogg";
    return `video/${ext.replace(".", "").replace("mov", "quicktime").replace("m4v", "mp4")}`;
  }
  return "application/octet-stream";
}

async function uniqueTargetPath(directory, fileName) {
  const parsed = path.parse(fileName);
  let target = path.join(directory, fileName);
  let index = 1;
  while (true) {
    try {
      await fs.access(target);
      target = path.join(directory, `${parsed.name}-${index}${parsed.ext}`);
      index += 1;
    } catch {
      return target;
    }
  }
}

async function chooseDiaryDirectory(currentPath) {
  const result = await dialog.showOpenDialog({
    title: "选择日记文件地址",
    defaultPath: currentPath || defaultDiaryDirectory(),
    properties: ["openDirectory", "createDirectory"]
  });
  if (result.canceled || !result.filePaths[0]) return { path: "" };
  const directory = await ensureDirectory(result.filePaths[0]);
  return { path: directory };
}

async function importDiaryFiles(directory) {
  const targetDirectory = await ensureDirectory(directory);
  const result = await dialog.showOpenDialog({
    title: "选择日记图片或文件",
    properties: ["openFile", "multiSelections"]
  });
  if (result.canceled || !result.filePaths.length) {
    return { directory: targetDirectory, files: [] };
  }

  const files = [];
  for (const sourcePath of result.filePaths) {
    const stats = await fs.stat(sourcePath);
    if (!stats.isFile()) continue;
    const targetPath = await uniqueTargetPath(targetDirectory, path.basename(sourcePath));
    await fs.copyFile(sourcePath, targetPath);
    files.push({
      name: path.basename(targetPath),
      path: targetPath,
      url: pathToFileURL(targetPath).toString(),
      size: stats.size,
      type: diaryFileType(targetPath)
    });
  }
  return { directory: targetDirectory, files };
}

function createMenu() {
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }]
          }
        ]
      : []),
    {
      label: "视图",
      submenu: [
        { role: "reload", label: "重新载入" },
        { role: "resetZoom", label: "实际大小" },
        { role: "zoomIn", label: "放大" },
        { role: "zoomOut", label: "缩小" },
        { type: "separator" },
        { role: "togglefullscreen", label: "全屏" }
      ]
    },
    {
      label: "窗口",
      submenu: [{ role: "minimize", label: "最小化" }, { role: "close", label: "关闭" }]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  ipcMain.handle("calendar:reminder", (_event, todo) => showReminderNotification(todo));
  ipcMain.handle("calendar:diary:choose-directory", (_event, currentPath) => chooseDiaryDirectory(currentPath));
  ipcMain.handle("calendar:diary:import-files", (_event, directory) => importDiaryFiles(directory));
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
