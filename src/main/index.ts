import {Main} from "./main";
import {Controller} from "./controller";
import {FsFileManager} from "./fs-file.manager";
import {DeviceManager} from "./device.manager";
import {ServerManager} from "./server.manager";

(function index(){
    // let main = new Main();
    let controller = Controller.create(
        new FsFileManager(),
        new DeviceManager(),
        new ServerManager()
    );
})();


