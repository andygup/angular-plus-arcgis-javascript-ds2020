import { Observable, BehaviorSubject } from 'rxjs';

export class MapStore<T> {

  private state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this.state$ = new BehaviorSubject(initialState);
   }

  getValue(): T {
    if (typeof this.state$ !== 'undefined') {
      return this.state$.getValue();    
    }
  }

  getState(): Observable<T> {
    if (typeof this.state$ !== 'undefined') {
      console.log('getState', this.state$);
      return this.state$.asObservable();
    }  
    else {
      console.error('State is not set in map-store');
    }  
  }

  setState(nextState: T): void {
    if(typeof this.state$ === 'undefined'){
      this.state$ = new BehaviorSubject(nextState);
    }
    else {
      this.state$.next(nextState);
    }
  }
}