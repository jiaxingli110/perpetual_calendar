const { app, BrowserWindow, Menu, Notification, ipcMain, shell } = require("electron");
const path = require("node:path");

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
