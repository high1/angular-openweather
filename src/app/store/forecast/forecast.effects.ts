import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

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

  loadForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForecast),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select((state: State) => state.forecast[action.id]?.fetchTime)),
      )),
      mergeMap(([{ id, lat, lon, reload }, fetchTime]) =>
        !reload && fetchTime && Date.now() - fetchTime <= environment.apiInterval
          ? of(noOp()) : this.getForecast(id, lat, lon))
    )
  );

  getForecast = (id: number, lat: number, lon: number) =>
  concat(
    of(loadingForecast()),
    this.weatherService.getForecast({ lat, lon })
    .pipe(
      map((forecast: ForecastResponse) => {
        console.warn(forecast);
        return forecastLoaded({ ...forecast, id });
      }),
      catchError(error => of(forecastError(error))
      )
    )
  )
}
