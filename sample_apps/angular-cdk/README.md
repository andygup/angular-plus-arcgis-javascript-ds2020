# Angular CDK - Table component demo

This sample app demonstrates bringing in the Angular CDK table component to display our demo app's dataset. 


## Overview

The Angular [Component Dev Kit (CDK)](https://material.angular.io/cdk) is a set of tools that implement common interaction patterns whilst being unopinionated about their presentation. Developed and maintained by the Angular team, the CDK contains a number of patterns including accessibility, overlays, and drag and drop, and unopinionated components including a data table, stepper, and tree. This demo incorporates the CDK's table component into the sample app code used in the [Observables demo](https://github.com/andygup/angular-plus-arcgis-javascript-ds2020/tree/master/sample_apps/7-async-observables).


## Creating the table component

First, import the `Table Component` from the CDK into your app module: 
```typescript
import { TableComponent } from './table/table.component';
```

Columns are defined in the component's template:
```typescript
  <ng-container cdkColumnDef="id">
    <th cdk-header-cell *cdkHeaderCellDef>ID</th>
    <td cdk-cell *cdkCellDef="let wonder">{{wonder.id}}</td>
  </ng-container>
```
Each column definition can contain a header-cell template (`cdkHeaderCellDef`), data-cell template (`cdkCellDef`), and footer-cell template (`cdkFooterCellDef`). Each cell template is optional. Note that `cdkCellDef` exports the row context. 

Below the columns, the table's header-row (`cdkHeaderRowDef`), data-row (`cdkRowDef`), and footer-row (`cdkFooterRowDef`). This sample application just uses a header and data-row: 
```typescript
  <tr cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
  <tr class="table-row" cdk-row *cdkRowDef="let row; columns: displayedColumns;"></tr>
```
`displayedColumns` is set as a property on the table component; it is an array of strings that represent the `cdkColumnDef` value of each column to be displayed in the table. 


## Connecting a data source

Data is provided to the table via a `DataSource`. The table calls the DataSource's `connect()` method, which returns an observable that emits an array of data. Whenever the data source emits data, the table renders an update. 

For this example, we create an instance of `DataSource` that creates a RxJS subject from our World of Wonder data. Data could also come from an http call, or from an injected service that fetches data itself. In this sample app, the `connect()` method just returns our data. 

```typescript
export class TestDataSource extends DataSource<Wonder> {
  data = new BehaviorSubject<Wonder[]>(WONDER_DATA);

  connect(): Observable<Wonder[]> {
    return this.data;
  }
}
```

We declare an instance of `TestDataSource` inside our table component, and then connect it to our table template: 
```typescript
<table cdk-table [dataSource]="dataSource">
// column and row definitions go here
</table>
```


## Event and class binding

Event and class bindings can be added directly to the table row. In our sample app, we add a click handler that calls the injected map service with that row's data. 

Template
```typescript
<tr class="table-row" cdk-row *cdkRowDef="let row; columns: displayedColumns;" (click)="handleClick(row)"></tr>
```

Component
```typescript
 handleClick(row) {
   this.mapService.panToWonder(row.coordinates);
 }
 ```

It's important to note that the Angular CDK table does not include table behavior such as pagination, sorting, or search. This is a deliberate choice to allow developers more freedom to add their own custom behavior and styling on top of the datatable. If you need a solution that includes these behaviors out of the box, [Angular's `mat-table` component](https://material.angular.io/components/table/overview) will better suit your needs. 


## Resources
- [Angular's CDK table docs](https://material.angular.io/cdk/table/overview)
- [Angular In Depth post](https://medium.com/angular-in-depth/angular-cdk-tables-1537774d7c99): demos an implementation of custom client-side search, sorting, and pagination with an Angular CDK table
