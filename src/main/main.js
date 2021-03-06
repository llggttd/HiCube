const {app, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')
const plugins = require('./plugins')
const log = require('./log')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
const DEV = true

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#FFFFFF',
    show: false
  })

  let entry = url.format({ pathname: path.resolve(__dirname, '../../html/index.html'), protocol: 'file' })
  if (DEV) {
    entry = url.format({ hostname: 'localhost', port: 8080, protocol: 'http' })
  }
  mainWindow.loadURL(entry)

  mainWindow.once('ready-to-show', function () {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  log('ready')
  createWindow()
  app.setBadgeCount(11)
})

app.on('quit', function () {
  log('quit')
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  log('window-all-closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

plugins.start()
