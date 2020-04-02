import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { StoreModule } from '@ngrx/store';
import { reducer } from './state/reducers/map-state.reducer';

const routes = [
  { path: 'map', component: EsriMapComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/map' }
];

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    HeaderComponent,
    NavigationComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ScrollingModule,
    StoreModule.forRoot({map: reducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
