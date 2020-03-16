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
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MapStateService } from '../services/map-state.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  header = 'Maintaining component state';
  header_tag = 'Managing Map State with Services: click map to set point graphics that will be persisted in map state';

  public points$: Observable<__esri.Graphic[]>
  public list: Subscription;
  public pMessage: any[] = [];

  constructor(private msService: MapStateService, private changeDetect: ChangeDetectorRef) {}

  // If you want, you could also use this function to parse out the value
  // and call this function from the component *cdkVirtualFor="let point of findPointValue(points$)"
  public findPointValue(product: any) {
    let finalValue: object;
    if(product.source.value.length){
      finalValue = product.source.value.map((val) => {
        return [val.geometry.latitude + ", " + val.geometry.longitude]
      });
    }

    return finalValue;
  }

  ngOnInit() {
    // deactivate change detection component and children
    this.changeDetect.detach();     
    this.points$ = this.msService.getPoints();
    this.list = this.points$.subscribe({
      next: x => { 
        let finalValue: any[];
        if (x.length) {
          finalValue = x.map((val:any) => {
            return val.geometry.latitude + ", " + val.geometry.longitude;
          });
        }
        this.pMessage = finalValue;
        this.changeDetect.detectChanges();
      },
      error: err => console.error('error in subscriber', err),
      complete: () => console.log('complete')
    })
  }

  ngOnDestroy(){
    this.list.unsubscribe();
  }
}
