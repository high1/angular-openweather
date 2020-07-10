import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, concatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { loadForecast, forecastLoaded, forecastError } from './forecast.actions';
import { shouldLoad } from '../common';
import { noOp } from '../weather/weather.actions';
import { WeatherService } from '../../services/weather.service';
import { State } from '../state';
import { ForecastResponse } from './forecast.reducer';

@Injectable()
export class ForecastEffects {

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store,
  ) { }

  loadForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForecast),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select((state: State) => ({
          fetchTime: state.forecast[action.id]?.fetchTime,
          ...state.weather.current.find(item => item.id === action.id).coord
        }))),
      )),
      switchMap(([{ id, reload, now }, { fetchTime, lat, lon }]) =>
        shouldLoad({ reload, now, fetchTime })
          ? this.weatherService.getForecast({ lat, lon }).pipe(
            map((forecast: ForecastResponse) => forecastLoaded({ ...forecast, id })),
            catchError(() => of(forecastError({ id })))
          ) : of(noOp())),
      catchError(() => of(forecastError({ id: 0 })))
    )
  );
}
