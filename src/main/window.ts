import * as path from 'path';
import * as url from 'url';
import {BrowserWindow, ipcMain} from 'electron';

export class Window{
    private window: any = null;

    constructor(
        private x: number,
        private y: number,
        public id: string
    ){

    }

    public start(): void {
        console.log(this.id);
        this.createWindow();
        this.loadWindowContent();
        this.window.webContents.openDevTools();
        this.window.on('closed', this.onClosed.bind(this));
        this.window.webContents.on('did-finish-load', this.sendInitMessage.bind(this));
    }

    private createWindow(){
        // Create the browser window.
        this.window = new BrowserWindow({
            x: this.x,
            y: this.y,
            width: 800,
            height: 600,
            backgroundColor: '#000000',
            kiosk: true,
            frame: false,
            title: 'JSound'
        });
    }

    private loadWindowContent(){
        this.window.loadURL(url.format({
            pathname: path.join(__dirname, '../app/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    private onClosed(){
        this.window = null;
    }

    private sendInitMessage(){
        this.window.webContents.send('init-data', {
            screenId: this.id
        });
        console.log('sent init data');
    }
}