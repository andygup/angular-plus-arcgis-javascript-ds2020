/*
  Copyright 2019 Esri
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EsriMapService } from '../services/esri-map.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  feedback;
  sevenWonders = this.mapService.sevenWonders;
  panCompleteSubscription: Subscription;
  wonderFormSubscription: Subscription;

  wonderForm = new FormControl('');

  disablePanel(name) {
    this.wonderForm.disable({emitEvent: false});
    this.feedback = 'Panning to ' + name + '.';
  }

  enablePanel() {
    this.wonderForm.enable({ emitEvent: false });
    this.feedback = 'Done!';
    setTimeout(() => { this.feedback = ''; }, 1000);
  }

  constructor(private mapService: EsriMapService) { }

  ngOnInit() {
    this.panCompleteSubscription = this.mapService.panComplete.subscribe(() => {
      this.enablePanel();
    });

    this.wonderFormSubscription = this.wonderForm.valueChanges.subscribe(wonder => {
      // verify that a wonder is selected
      if (!wonder) {
        return;
      }

      // disable the panel
      this.disablePanel(this.sevenWonders[wonder].name);

      // call the panMap method of the child map component
      this.mapService.panToWonder(this.sevenWonders[wonder].coordinates);
    });
  }

  ngOnDestroy() {
    this.panCompleteSubscription.unsubscribe();
    this.wonderFormSubscription.unsubscribe();
  }
}
