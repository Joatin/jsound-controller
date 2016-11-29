import {Component, NgZone} from '@angular/core';
import * as template from './app.component.pug';
import {ipcRenderer} from 'electron';

@Component({
    selector: 'my-app',
    template: template()
})
export class AppComponent {
    private screenId: string = 'unknown';
    constructor(
        private zone: NgZone
    ) {
        console.log('listening for init data');
        ipcRenderer.on('init-data', ((event, data)=>{
            this.zone.run(()=>{
                this.screenId = data.screenId;
            });
        }).bind(this));
    }
}