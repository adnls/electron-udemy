const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', ()=>{
    console.log('App is ready!');
        mainWindow = new BrowserWindow({})
        mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (e, path) => {
    ffmpeg.ffprobe(path, (err, meta) => {
        mainWindow.webContents.send('video:meta', meta.format.duration);
    });
});