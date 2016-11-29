import {app, BrowserWindow, screen} from 'electron';
import {Window} from './window';

export class Main {
    private windows: Window[] = [];
    // private settingWindow: SettingsWindow = null;

    constructor() {
        app.on('ready', this.onReady.bind(this));
        app.on('window-all-closed', this.onWindowAllClosed.bind(this));
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    private onReady(): void {
        this.createWindows();
        this.createSettingWindow();
    }

    // Quit when all windows are closed.
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    private onWindowAllClosed(): void{
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    private createWindows(): void {
        let displays = screen.getAllDisplays();

        displays.forEach((display)=> {
            let window = new Window(display.bounds.x, display.bounds.y, display.id.toString());
            window.start();
            this.windows.push(window);
        })
    }

    private createSettingWindow(){
        // this.settingWindow = new SettingsWindow();
        // this.settingWindow.start();
    }
}