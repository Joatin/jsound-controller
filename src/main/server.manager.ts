import * as SocketCluster from 'socketcluster-client';


export class ServerManager{
    private socket: any;
    constructor(){

    }

    public init(){
        this.socket = SocketCluster.connect({
            hostname: 'localhost',
            secure: true,
            port: 8000,
            rejectUnauthorized: false,
            query: {
                device: true
            }
        })
    }
}