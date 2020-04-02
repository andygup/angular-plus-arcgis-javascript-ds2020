/*
  Copyright 2020 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import { MapSettings } from '../state/models/map-settings';
import { setMapState } from '../state/actions/map.actions';
import { Store, select } from '@ngrx/store';
import { AppState, selectMaps } from '../state/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {

  public mapView: __esri.MapView;
  public mapState$: Observable<MapSettings[]>;
  public staticMapState: MapSettings = null;

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(private store: Store<AppState>) {
    this.mapState$ = store.pipe(select(selectMaps));
  }

  public ngOnInit() {
 
    this.mapState$.subscribe({
      next: x => {
        this.staticMapState = {
          center: x[0].center,
          zoom: x[0].zoom
        };
        console.log('mapState$ updated: ', this.staticMapState)
      }
    });

    // use esri-loader to load JSAPI modules
    return loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/core/promiseUtils'
    ])
      .then(([Map, MapView, promiseUtils ]) => {

        const debounceMapExtentChanges = promiseUtils.debounce((mv) => {
          // Update the ngrx store every time the extent changes
          const m: MapSettings = {
            zoom: mv.zoom,
            center: JSON.stringify(mv.center.toJSON())
          }
          console.log("Updating extent: ", m);
          this.store.dispatch(setMapState({ map: m }));
        })

        const map: __esri.Map = new Map({
          basemap: 'hybrid'
        });

        this.mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: JSON.parse(this.staticMapState.center),
          zoom: this.staticMapState.zoom,
          map: map
        });

        this.mapView.when(() => {
          this.mapView.watch('extent', (v) => {
            debounceMapExtentChanges(this.mapView);
          })
        });
      })
      .catch(err => { 
        console.error(err);
      });      
  }
}
