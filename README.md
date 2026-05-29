# 万年历应用

这是一个跨平台万年历应用源码，同一套日历界面和逻辑可以打包到 Windows、Android、iOS 和 iPadOS。

## 当前功能

- 公历月视图
- 农历日期
- 干支、生肖
- 节日和 24 节气
- 日期详情
- 本月节日列表
- 移动端和桌面端自适应界面

## Windows 桌面应用

先安装依赖：

```powershell
npm.cmd install
```

开发运行：

```powershell
npm.cmd start
```

打包安装包和便携版：

```powershell
npm.cmd run build:windows
```

打包结果会生成在 `dist` 目录。

## Android 应用

安装依赖后，首次生成 Android 项目：

```powershell
npm.cmd run cap:add:android
```

之后同步代码：

```powershell
npm.cmd run cap:android
```

用 Android Studio 打开生成的 `android` 目录，即可构建 APK 或 AAB。

## iOS / iPadOS 应用

iOS 和 iPadOS 必须在 macOS + Xcode 上构建。把项目放到 Mac 后：

```bash
npm install
npm run cap:add:ios
npm run cap:ios
```

用 Xcode 打开生成的 `ios` 目录，即可构建并提交 App Store。

## 说明

Windows 使用 Electron 打包为桌面应用；Android、iOS、iPadOS 使用 Capacitor 打包为原生壳应用。这样可以最大化复用现在的万年历逻辑，同时避免为每个平台分别重写一套日历算法。
