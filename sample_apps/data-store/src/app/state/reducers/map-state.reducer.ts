import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { MapSettings } from '../models/map-settings';
import {setMapState} from '../actions/map.actions';
export interface State extends EntityState<MapSettings> {}

const adapterMap = createEntityAdapter<MapSettings>();

const mapInitialState: State = adapterMap.getInitialState({
  zoom: 12,
  center: "{\"spatialReference\":{\"latestWkid\":3857,\"wkid\":102100},\"x\":-1367424.95,\"y\":-4455144.78}"
});

const mapReducer = createReducer(
  mapInitialState,
  on(setMapState, (state, { map }) => ({
    ids: null,
    entities: null,
    zoom: map.zoom, center: map.center
  }))
)

export function reducer(state: State | undefined, action: Action) {
  console.log('reduce')
  return mapReducer(state, action);
}

export const selectMapState = (state: State) => {
  let s: any;
  (state === undefined) ? s = mapInitialState : s = state;
  return s;
}