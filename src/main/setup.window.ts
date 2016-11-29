import * as path from 'path';
import * as url from 'url';
import {BrowserWindow, ipcMain} from 'electron';
import {Observable, Observer} from "rxjs";
import * as SocketCluster from 'socketcluster-client';
import BrowserWindow = Electron.BrowserWindow;


export class SetupWindow{
    private window: BrowserWindow = null;
    private socket: any = null;
    private controllerId: string = null;

    constructor(){

    }

    public show(): Observable<any> {
        this.createWindow();
        this.loadWindowContent();
        this.window.webContents.openDevTools();
        this.window.on('closed', this.onClosed.bind(this));
        this.window.webContents.on('did-finish-load', this.initSocket.bind(this));

        return this.onCredentials();
    }

    private initSocket(){
        this.socket = SocketCluster.connect({
            hostname: 'localhost',
            secure: true,
            port: 8000,
            rejectUnauthorized: false,
            query: {
                device: true
            }
        });
        this.socket.on('error', this.handleSocketError.bind(this));
        this.socket.on('connect', (this.handleSocketConnect.bind(this)));
        this.window.webContents.on('code', this.onCode.bind(this));
    }

    private onCode(error, data){
        console.log('recieved code event');
        if(error){
            console.log(error);
        }else{
            this.socket.emit('device.verifyCode', data, (res)=>{
                console.log(res);
            });
        }
    }

    private handleSocketError(error: Error){
        this.window.webContents.send('error', error);
        console.log(error.name);
    }

    private handleSocketConnect(){
        this.socket.emit('device.getId', null, ((error, data)=>{
            if(error){

            }else{
                console.log(data);
                this.controllerId = data;
            }
        }).bind(this))
    }

    private createWindow(){
        // Create the browser window.
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            title: 'JSound Setup',
            alwaysOnTop: true,
            frame: false,
            backgroundColor: '#ff5722'
        });
    }

    private loadWindowContent(){
        this.window.loadURL(url.format({
            pathname: path.join(__dirname, '../setup/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    private onClosed(){
        this.window = null;
    }

    private onCredentials(): Observable<any>{
        let obs =  Observable.create((observer: Observer<any>)=>{
            this.window.webContents.on('done', (event, data)=>{
                observer.next(data);
            });
        });

        // return Observable.of(true);
        return obs;
    }
}