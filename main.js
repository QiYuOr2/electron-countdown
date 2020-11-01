const {
  app,
  BrowserWindow,
  Notification,
  ipcMain,
  Menu,
  Tray,
} = require('electron');
const { create: createAboutWindow } = require('./about');
const path = require('path');

let win;
let tray;
app.on('ready', () => {
  // 不显示title下的菜单
  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    width: 300,
    height: 120,
    frame: false,
    resizable: false,
    transparent: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('./index.html');
  win.setAlwaysOnTop(true);

  // 设置托盘图标
  tray = new Tray(path.resolve(__dirname, './icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: '关于' + app.name, click: createAboutWindow },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip('倒计时 - 徐梦宇制作');
  tray.setContextMenu(contextMenu);

  // win.webContents.openDevTools({
  //   mode: 'detach',
  // });

  handleIPC();
});

function handleIPC() {
  ipcMain.handle('work-notification', function () {
    let notification = new Notification({
      title: '倒计时 - 徐梦宇制作',
      body: '倒计时结束！',
    });
    notification.show();
  });

  ipcMain.handle('window-close', function () {
    app.quit();
  });

  ipcMain.handle('window-small', function () {
    win.minimize();
  });
}
