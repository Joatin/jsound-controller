import {screen} from 'electron';
import {Device} from "./device";
import {ScreenDevice} from "./screen.device";


export class DeviceManager{
    private devices: Device[] = [];
    constructor() {}

    public setupDevices() {
        let displays = screen.getAllDisplays();

        displays.forEach((display)=> {
            let dev = new ScreenDevice(display.id);
            dev.start();
            this.devices.push(dev);
        })
    }
}