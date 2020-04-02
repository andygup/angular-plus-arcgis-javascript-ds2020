import { createAction, props, Action } from '@ngrx/store';
import { MapSettings } from '../models/map-settings';

export const setMapState = createAction('[Map Stuff] Set Map State', props<{ map: MapSettings }>());