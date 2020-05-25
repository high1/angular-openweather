import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, concatMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { loadForecast, forecastLoaded, forecastError, loadingForecast } from './forecast.actions';
import { noOp } from '../weather/weather.actions';
import { WeatherService } from '../../services/weather.service';
import { State } from '../state';
import { Store } from '@ngrx/store';
import { ForecastResponse } from './forecast.reducer';
import { environment } from '../../../environments/environment';

@Injectable()
export class ForecastEffects {

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store,
  ) { }

  loadingForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForecast),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select((state: State) => state.forecast[action.id]?.fetchTime)),
      )),
      mergeMap(([{ reload }, fetchTime]) =>
        !reload && this.shouldNotLoadForecast(fetchTime)
          ? of(noOp()) : of(loadingForecast())
      )
    )
  );

  loadForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForecast),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select((state: State) => state.forecast[action.id]?.fetchTime)),
      )),
      switchMap(([{ id, lat, lon, reload }, fetchTime]) =>
        !reload && this.shouldNotLoadForecast(fetchTime)
          ? of(noOp()) : this.weatherService.getForecast({ lat, lon }).pipe(
          map((forecast: ForecastResponse) => forecastLoaded({ ...forecast, id })),
          catchError(() => of(forecastError({ id }))
          )
        )
      ), catchError(() => of(forecastError({ id: 0 })))
    )
  );

  shouldNotLoadForecast = (fetchTime: number) => fetchTime && Date.now() - fetchTime <= environment.apiInterval;
}
