import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { HeaderComponent } from './header/header.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';

import { EsriMapService } from './services/esri-map.service';


@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    HeaderComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [EsriMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
