const { app, BrowserWindow, Notification, ipcMain, Menu } = require('electron');

let win;
app.on('ready', () => {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 300,
    height: 120,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('./index.html');
  win.setAlwaysOnTop(true);
  handleIPC();
});

function handleIPC() {
  ipcMain.handle('work-notification', async function () {
    await new Promise((resolve, reject) => {
      let notification = new Notification({
        title: '时间到！',
        body: '请关闭电脑！',
      });
      notification.show();
    });
  });
}
