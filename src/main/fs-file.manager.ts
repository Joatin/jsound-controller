import * as electron from 'electron'
import {ConnectionConfig} from "./connection-config";
import {Observable, BehaviorSubject} from "rxjs";
import {FileManager} from "./file.manager";
import {readFile, stat} from "fs";
import {join} from "path";

export class FsFileManager implements FileManager{
    private appDataPath: string = electron.app.getPath('userData');
    private readFile = Observable.bindNodeCallback(readFile);
    private stat = Observable.bindNodeCallback(stat);
    public constructor(){

    }

    public getConnectionConfig(): Observable<ConnectionConfig>{
       return this.readFile(join(this.appDataPath, 'config.json')).map((obj: Buffer)=>{
           return obj.toJSON();
       });
    }


    public existsConnectionConfig(): Observable<boolean> {
        return this.stat(join(this.appDataPath, 'config.json')).map(()=>{
            return true;
        }).catch((error)=>{
            if(error.code == 'ENOENT'){
                return Observable.of(false);
            } else{
                return Observable.throw(error);
            }
        });
    };


}