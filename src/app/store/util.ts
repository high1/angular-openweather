import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { State } from '../store/state';

// Utility function to get the current state when needed
export const getState = <T>(store: Store<State>, selector: (s: State) => T): T => {
  let state: T;

  store.select(selector).pipe(take(1)).subscribe(
     s => state = s
  );

  return state;
};
