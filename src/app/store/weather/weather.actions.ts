import { createAction, props } from '@ngrx/store';

import { WeatherResponse } from './weather.reducer';

export const NOOP = '[Global] NoOp';
export const LOAD_WEATHER = '[Weather] Load';
export const WEATHER_LOADED = '[Weather] Loaded';
export const WEATHER_ERROR = '[Weather] Error';

export const noOp = createAction(NOOP);
export const loadWeather = createAction(LOAD_WEATHER,
  ({ reload = false, now = Date.now() }: { reload?: boolean; now?: number} = {} ) => ({ reload, now }));
export const weatherLoaded = createAction(WEATHER_LOADED, props<Partial<WeatherResponse>>());
export const weatherError = createAction(WEATHER_ERROR);
