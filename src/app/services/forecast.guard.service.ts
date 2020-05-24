import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../store/state';
import { getState } from '../store/util';
@Injectable({
  providedIn: 'root'
})
export class ForecastGuardService implements CanActivate {

  constructor(private router: Router, private store: Store<State>) { }

  canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
    const current = getState(this.store, state => state.weather.current);
    if (!current || !(current.some(curr => curr.id === +routeSnapshot.params.id))) {
      this.router.navigate(['not-found']);
      return false;
    }
    return true;
  }

}
