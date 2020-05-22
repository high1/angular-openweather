import { createAction, props } from '@ngrx/store';

import { WeatherResponse } from './weather.reducer';

export const noOp = createAction('[Global] NoOp');
export const loadWeather = createAction('[Weather] Load', (reload = false) => ({ reload }));
export const loadingWeather = createAction('[Weather] Loading');
export const weatherLoaded = createAction('[Weather] Loaded', props<Partial<WeatherResponse>>());
export const weatherError = createAction('[Weather] Error', props<Error>());
