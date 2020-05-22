import { createAction, props } from '@ngrx/store';

import { Coord } from '../weather/weather.reducer';
import { ForecastResponse } from './forecast.reducer';

export const loadForecast = createAction('[Forecast] Load', props<{ id: number; reload?: boolean } & Coord>());
export const loadingForecast = createAction('[Forecast] Loading');
export const forecastLoaded = createAction('[Forecast] Loaded', props<ForecastResponse>());
export const forecastError = createAction('[Forecast] Error', props<{ id: number, error: Error }>());
