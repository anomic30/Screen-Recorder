const { app, BrowserWindow, Menu } = require('electron');
const shell = require('electron').shell;
const path = require('path');
// Menu.setApplicationMenu(false);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 750,
    titleBarStyle: "hidden",
    minWidth: 1280,
    minHeight: 750,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  var menu = Menu.buildFromTemplate([
      {
          label: 'About',
          submenu: [
            {
              label: 'GitHub Repo',
              click() {
                shell.openExternal('https://github.com/anomic30/Screen-Recorder');
              }
            },
            {
              label: 'About me',
              click() {
                shell.openExternal('https://www.linkedin.com/in/anomic/');
              }
            },
          ]
      }
  ])
  Menu.setApplicationMenu(menu); 

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
