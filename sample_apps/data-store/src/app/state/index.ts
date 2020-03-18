import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as myMap from './reducers/map-state.reducer';

export interface AppState {
  map: myMap.State;
}

export const reducers: ActionReducerMap<AppState> = {
  map: myMap.reducer
};

export const selectMapModule = createFeatureSelector<myMap.State>('map');
export const selectMapState = createSelector(selectMapModule, myMap.selectMapState); 
export const selectMaps = createSelector(selectMapState, t => { console.log('selectMapState ', t); return [t]; });


