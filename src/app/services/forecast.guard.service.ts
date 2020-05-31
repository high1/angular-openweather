import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { map, first } from 'rxjs/operators';

import { State } from '../store/state';

@Injectable({
  providedIn: 'root'
})
export class ForecastGuardService implements CanActivate {

  constructor(private router: Router, private store: Store<State>) { }

  canActivate = (routeSnapshot: ActivatedRouteSnapshot): Observable<boolean | UrlTree> => {
    console.warn(this.router.parseUrl('/not-found'));
    return this.store.select(state => state.weather.current).pipe(
      map((current) =>
        !current || !(current.some(curr => curr.id === +routeSnapshot.params.id))
          ? this.router.parseUrl('/not-found') : true
    ));
  }
}
