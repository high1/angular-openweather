import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, concat } from 'rxjs';
import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { loadWeather, loadingWeather, noOp, weatherLoaded, weatherError } from './weather.actions';
import { WeatherResponse } from './weather.reducer';
import { WeatherService } from '../../services/weather.service';
import { State } from '../state';
import { environment } from '../../../environments/environment';

@Injectable()
export class WeatherEffects {
  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWeather),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select((state: State) => state.weather.fetchTime)),
      )),
      mergeMap(([{ reload }, fetchTime]) =>
        fetchTime && (Date.now() - fetchTime <= environment.apiInterval) && !reload
          ? of(noOp()) : this.getWeather),
      catchError(error => of(weatherError(error)))
    )
  );

  getWeather = concat(
    of(loadingWeather()),
    this.weatherService.getCurrentWeather()
      .pipe(
        map(({ list }: WeatherResponse) => weatherLoaded({
          list: list.map(item => ({
            ...item,
            main: {
              ...item.main,
              temp_avg: (item.main.temp_max + item.main.temp_min) / 2 - 273.15,
            },
          }))
        }))
      )
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store
  ) { }
}
