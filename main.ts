const { app, BrowserWindow } = require('electron')
import * as path from 'path';
import * as url from 'url';
import { ipcMain, dialog, OpenDialogOptions } from 'electron';
import * as fs from 'fs';

let win;
let isToolsDev;
const args = process.argv.slice(1);
isToolsDev = args.some(val => val === '--dev');


function createWindow () {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: (isToolsDev) ? true : false,
    },
    frame: false,
    titleBarStyle: 'hidden',
    icon: './src/assets/icon/icon_transparent.png',
    show: false
    });


    if (isToolsDev) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
            hardResetMethod: 'exit',
            argv: ['--dev']
        });
        win.webContents.openDevTools();
        win.loadURL('http://localhost:4200/');
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/DeeplyPlate/index.html'),
            protocol: 'file:',
            slashes: true
        }));

    }

    win.once('ready-to-show', () => {
        win.show();
    });
}

app.on('ready', createWindow)

