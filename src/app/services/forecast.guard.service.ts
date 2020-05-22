import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { State } from '../store/state';
@Injectable({
  providedIn: 'root'
})
export class ForecastGuardService implements CanActivate {

  constructor(private router: Router, private store: Store<State>) { }

  canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
    const current = this.getState(this.store, state => state.weather.current);
    if (!current || !(current.some(curr => curr.id === +routeSnapshot.params.id))) {
      this.router.navigate(['weather']);
      return false;
    }
    return true;
  }

  getState<T>(store: Store<State>, selector: (s: State) => T): T {
    let state: T;

    store.select(selector).pipe(take(1)).subscribe(
       s => state = s
    );

    return state;
 }
}
