import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Pet {
  name: string;
  type: string;
  breed: string;
  age: number;
}

const PET_DATA: Pet[] = [
  { name: 'Ginsburg', type: 'dog', breed: 'lab/chihuahua mix', age: 4 },
  { name: 'Bunsen', type: 'dog', breed: 'hound mix', age: 3 },
  { name: 'Harper', type: 'cat', breed: 'domestic medium hair', age: 11},
  { name: 'Lenny', type: 'cat', breed: 'domestic short hair', age: 9 },
  { name: 'Beyonce', type: 'chicken', breed: 'Polish crested', age: 4 }

];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent {
  displayedColumns: string[] = ['name', 'type', 'breed', 'age'];

  dataSource = new TestDataSource();

  handleClick(row) {
    console.log(row);
  }

  sortBy(column) {
    console.log(column)
  }
}

export class TestDataSource extends DataSource<Pet> {
  data = new BehaviorSubject<Pet[]>(PET_DATA);

  connect(): Observable<Pet[]> {
    return this.data;
  }

  disconnect() {}
}
