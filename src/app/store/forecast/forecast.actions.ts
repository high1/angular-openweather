import { createAction, props } from '@ngrx/store';

import { Coord } from '../weather/weather.reducer';
import { ForecastResponse } from './forecast.reducer';

export const LOAD_FORECAST = '[Forecast] Load';
export const LOADING_FORECAST = '[Forecast] Loading';
export const FORECAST_LOADED = '[Forecast] Loaded';
export const FORECAST_ERROR = '[Forecast] Error';

export const loadForecast = createAction(LOAD_FORECAST, props<{ id: number; reload?: boolean }>());
export const loadingForecast = createAction(LOADING_FORECAST);
export const forecastLoaded = createAction(FORECAST_LOADED, props<Partial<ForecastResponse>>());
export const forecastError = createAction(FORECAST_ERROR, props<{ id: number }>());
