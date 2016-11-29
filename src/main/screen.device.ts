import {Device} from "./device";
import {join} from "path";
import {format} from "url";
import {screen, BrowserWindow} from 'electron';


export class ScreenDevice extends Device{
    private window: any = null;

    private constructor(
        private screenId: number
    ){
        super();
    }

    public get id(): string {
        return '';
    }

    public get name(): string {
        return '';
    }

    public start(): void {
        let displays = screen.getAllDisplays();
        let display = displays.find(obj => obj.id === this.screenId);

        console.log(this.id);
        this.createWindow(display.bounds.x, display.bounds.y);
        this.loadWindowContent();
        this.window.webContents.openDevTools();
        this.window.on('closed', this.onClosed.bind(this));
        this.window.webContents.on('did-finish-load', this.sendInitMessage.bind(this));
    }

    private createWindow(x: number, y: number){
        // Create the browser window.
        this.window = new BrowserWindow({
            x: x,
            y: y,
            width: 800,
            height: 600,
            backgroundColor: '#000000',
            kiosk: true,
            frame: false,
            title: 'JSound'
        });
    }

    private loadWindowContent(){
        this.window.loadURL(format({
            pathname: join(__dirname, '../app/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    private onClosed(){
        this.window = null;
    }

    private sendInitMessage(){
        this.window.webContents.send('init-data', {
            screenId: this.screenId
        });
    }
}