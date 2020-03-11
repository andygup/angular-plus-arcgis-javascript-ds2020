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

import { MapStateService } from '../services/map-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {

  public mapView: __esri.MapView;
  private sub: Subscription = new Subscription();

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(private msService: MapStateService) {}

  public ngOnInit() {
    // use esri-loader to load JSAPI modules
    return loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic'
    ])
      .then(([Map, MapView, Graphic]) => {
        const map: __esri.Map = new Map({
          basemap: 'hybrid'
        });

        this.mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: [-12.287, -37.114],
          zoom: 12,
          map: map
        });

        this.mapView.when(
          () => {
            const points = this.msService.getPoints();
            console.log('first load', points);
            this.sub = points.subscribe(value => {
              if(value.length) {
                this.mapView.graphics.addMany(value);
                this.sub.unsubscribe(); // we only want this once
              }
            })
          },
          (err) => {
            console.error(err);
          }
        );

        this.mapView.on('click', (event: __esri.MapViewClickEvent) => {
          const pointGraphic: __esri.Graphic = new Graphic({
            attributes: {
              time: new Date().getTime()
            },
            geometry: {
              type: 'point',
              longitude: event.mapPoint.longitude,
              latitude: event.mapPoint.latitude,
              spatialReference: event.mapPoint.spatialReference
            },
            symbol: {
              type: 'simple-marker',
              color: [119, 40, 119],
              outline: {
                color: [255, 255, 255],
                width: 1
              }
            }
          });

          this.mapView.graphics.add(pointGraphic);
          this.msService.addPoint(pointGraphic);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
}
