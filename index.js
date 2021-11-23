const electron = require('electron');
const url = require('url');
const path = require('path')

const { app, BrowserWindow } = electron
// electron in development mode, might have to install this dependency
const isDev = require('electron-is-dev')

let mainWindow;

// function for creating the window
const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600, frame: false });
  const appURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './src/index.html')}`
  mainWindow.loadURL(appURL);
  mainWindow.maximize();
  mainWindow.setFullScreen(true);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  // Follow OS convention on whether to quit app when
  // all windows are closed.
  if (process.platform !== 'darwin') { app.quit() }
})
app.on('activate', () => {
  // If the app is still open, but no windows are open,
  // create one when the app comes into focus.
  if (mainWindow === null) { createWindow() }
})


// // listen for app to be ready
// app.on('ready', function () {
//   // create a new window
//   mainWindow = new BrowserWindow({})
//   // load HTML into window
//   mainWindow.loadURL(
//     url.format({
//       pathname: path.join(__dirname, './src/index.html'),
//       protocol: 'file',
//       slashes: true,
//     }
//   )); //  file://dirname/index.html
// });

// mainWindow.show();
