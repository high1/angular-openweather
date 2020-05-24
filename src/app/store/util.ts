import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { State } from '../store/state';

export const getState = <T>(store: Store<State>, selector: (s: State) => T): T => {
  let state: T;

  store.select(selector).pipe(take(1)).subscribe(
     s => state = s
  );

  return state;
};
