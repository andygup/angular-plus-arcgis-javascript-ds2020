# Managing Map State
This sample app demonstrates a single entity pattern for managing map state through the use of NgRx Store.

## Overview
A challenge with more complex Angular mapping apps comes with the need to maintain map state while routing.  Each time a route loads a component that contains a map, the component will (re-)initialize itself, setting the map to its original state.  So how do you maintain the state of your map?  One way is through the use of one of several libraries including NgRx.

This sample app provides a simple example of using a more scalable pattern for maintaining map state.

## Working with ngrx

The meat of this app is in the `/state` directory that contains actions, models and reducers. I've tried to keep it as simple as possible, and reduce unnecessary clutter so you can study how the various parts work together. 

The great thing about NgRx is there's no limit to how far you can scale the state management.

