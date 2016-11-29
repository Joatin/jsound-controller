import {Component, style, state, animate, transition, trigger} from '@angular/core';
import * as template from './app.component.pug';
import {Observable} from "rxjs";
import {ipcRenderer, remote} from 'electron';

@Component({
    selector: 'my-app',
    template: template()
})
export class AppComponent {
    public page: number = 0;
    public state = false;
    private obs;
    private error: string = '';
    private inputs: string[] = ['', '', '', '', '', ''];
    constructor(
    ) {
        this.obs = Observable.interval(3000).first().subscribe(()=>{
            this.page++;
        });
        ipcRenderer.on('error', (event, error)=>{
            if(error.name === 'SocketProtocolError'){
                this.error = 'Could not connect to server. Are you sure you are connected to the internet?'
            }
        })
    }

    public close(){
        let win = remote.getCurrentWindow();
        win.close();
    }

    public submit(){
        console.log('submit!');
        let sum: string = this.inputs[0] + this.inputs[1] + this.inputs[2] + this.inputs[3] + this.inputs[4] + this.inputs[5];
        let num: number = +sum;
        ipcRenderer.send('code', num);
    }
}