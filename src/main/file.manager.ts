import {ConnectionConfig} from "./connection-config";
import {Observable} from "rxjs";

export interface FileManager {
    getConnectionConfig(): Observable<ConnectionConfig>;
    existsConnectionConfig(): Observable<boolean>;
}