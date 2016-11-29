import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import { PolymerElement } from '@vaadin/angular2-polymer';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        PolymerElement('paper-button'),
        PolymerElement('paper-toolbar'),
        PolymerElement('neon-animated-pages'),
        PolymerElement('neon-animatable')
    ],
    bootstrap:    [ AppComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule{}