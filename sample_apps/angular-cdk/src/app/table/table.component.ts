import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EsriMapService } from '../services/esri-map.service';

export interface Wonder {
  id: number;
  name: string;
  coordinates: number[];
}

const WONDER_DATA = [
  { id: 0, name: 'Great Wall of China', coordinates: [117.23, 40.68] },
  { id: 1, name: 'Petra', coordinates: [35.44194444, 30.32861111] },
  {
    id: 2,
    name: 'Christ the Redeemer',
    coordinates: [-43.210556, -22.951944]
  },
  { id: 3, name: 'Machu Picchu', coordinates: [-72.545556, -13.163333] },
  { id: 4, name: 'Chichen Itza', coordinates: [-88.568611, 20.683056] },
  { id: 5, name: 'Colosseum', coordinates: [12.492269, 41.890169] },
  { id: 6, name: 'Taj Mahal', coordinates: [78.041944, 27.175] }
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent {
  constructor(private mapService: EsriMapService) {}
  displayedColumns: string[] = ['id', 'name', 'coordinates'];

  dataSource = new TestDataSource();

  handleClick(row) {
    this.mapService.panToWonder(row.coordinates);
  }

}

export class TestDataSource extends DataSource<Wonder> {
  data = new BehaviorSubject<Wonder[]>(WONDER_DATA);

  connect(): Observable<Wonder[]> {
    return this.data;
  }

  disconnect() {}
}
