import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { EsriMapService } from './services/esri-map.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    EsriMapComponent
  ],
  imports: [
    BrowserModule,
    CdkTableModule
  ],
  providers: [EsriMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
