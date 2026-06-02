const { app, BrowserWindow, ipcMain } = require('electron');

let window;

app.whenReady().then(() => {
    window = new BrowserWindow({
        height : 450,
        width : 450,
        resizable: false,
        maximizable: false,
        transparent: true,
        frame: false,
        webPreferences: {
            preload: __dirname + '/preload.js'
        }
    });

    window.loadFile('weather.html');
});

ipcMain.on('close-window', () => {
    window.close();
});