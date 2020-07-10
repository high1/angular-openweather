import { createAction, props } from '@ngrx/store';

import { ForecastResponse } from './forecast.reducer';

export const LOAD_FORECAST = '[Forecast] Load';
export const FORECAST_LOADED = '[Forecast] Loaded';
export const FORECAST_ERROR = '[Forecast] Error';

export const loadForecast = createAction(LOAD_FORECAST,
  ({ id, reload = false, now = Date.now() }: { id: number, reload?: boolean; now?: number } = { id: 0 }) => ({ id, reload, now }));
export const forecastLoaded = createAction(FORECAST_LOADED, props<Partial<ForecastResponse>>());
export const forecastError = createAction(FORECAST_ERROR, props<{ id: number }>());
