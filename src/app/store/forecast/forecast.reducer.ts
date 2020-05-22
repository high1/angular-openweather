import { Action, createReducer, on } from '@ngrx/store';

import { forecastLoaded, forecastError, loadingForecast } from './forecast.actions';
import { WeatherDescription } from '../weather/weather.reducer';
import { environment } from '../../../environments/environment';

export const key = 'forecast';

interface Forecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherDescription;
}

export interface ForecastResponse {
  id: number;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: Forecast[];
}

export interface ForecastState extends Record<number, { fetchTime: number } & Forecast[]> {
  loading: boolean;
  error?: unknown;
}

const initialState: any = { current: undefined, loading: false };

const forecastReducer = createReducer(
  initialState,
  on(forecastLoaded, (state, { id, hourly }: ForecastResponse) => ({
    ...state,
    loading: false,
    [id]: {
      hourly: hourly.slice(0, environment.forecastLimit || Number.MAX_VALUE),
      fetchTime: Date.now()
    }
  })),
  on(forecastError, (state, { id, error }) => ({
    ...state,
    loading: false,
    [id]: {
      hourly: null,
      error
    }
  })),
  on(loadingForecast, (state) => ({
    ...state,
    loading: true
  }))
);

export function reducer(state: any, action: Action) {
  return forecastReducer(state, action);
}
