const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("calendarBridge", {
  notifyReminder(todo) {
    return ipcRenderer.invoke("calendar:reminder", todo);
  }
});
