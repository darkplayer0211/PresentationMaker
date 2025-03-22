const {app, BrowserWindow} = require('electron')
const path = require('path')

app.on('ready', () => {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    console.log((path.join(app.getAppPath() + '/dist/index.html')));
    win.loadFile(path.join(app.getAppPath() + '/dist/index.html'));
})