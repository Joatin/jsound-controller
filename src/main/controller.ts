import {FileManager} from "./file.manager";
import {ConnectionConfig} from "./connection-config";
import {SetupWindow} from "./setup.window";
import {DeviceManager} from "./device.manager";
import {ServerManager} from "./server.manager";
import {app, BrowserWindow, screen} from 'electron';

export class Controller{
    public static create(
        fileManager: FileManager,
        deviceManager: DeviceManager,
        serverManager: ServerManager
    ): Controller {
        let con = new Controller(
            fileManager,
            deviceManager,
            serverManager
        );
        con.init();
        return con;
    }

    private constructor(
        private fileManager: FileManager,
        private deviceManager: DeviceManager,
        private serverManager: ServerManager
    ){}

    private init(): void {
        app.on('ready', this.onReady.bind(this));
        app.on('window-all-closed', this.onWindowAllClosed.bind(this));
    }

    private onWindowAllClosed(): void{
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    private onReady(){
        this.fileManager.existsConnectionConfig().subscribe(this.onNext.bind(this));
    }

    private onNext(exists: boolean){
        if(exists){
            this.setup();
        }else{
            let setup = new SetupWindow();
            setup.show().subscribe(()=>{
                this.setup();
            });
        }
    }

    private setup(){
        this.deviceManager.setupDevices();
    }
}