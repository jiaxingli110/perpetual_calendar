const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("calendarBridge", {
  notifyReminder(todo) {
    return ipcRenderer.invoke("calendar:reminder", todo);
  },
  chooseDiaryDirectory(currentPath) {
    return ipcRenderer.invoke("calendar:diary:choose-directory", currentPath);
  },
  importDiaryFiles(directory) {
    return ipcRenderer.invoke("calendar:diary:import-files", directory);
  }
});
