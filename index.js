const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

var fs = require('fs');
var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();

var cameras;
GPhoto.list(function (list) { cameras = list });

// Negative value or undefined will disable logging, levels 0-4 enable it.
GPhoto.setLogLevel(1);
GPhoto.on('log', function (level, domain, message) {
    console.log(domain, message);
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 480,
        fullscreen: (process.platform == "linux"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.loadFile('src/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


ipcMain.on('capture', event => {
    camera.takePicture({ download: false }, function (er, path) {
        console.log(path);
    });
})