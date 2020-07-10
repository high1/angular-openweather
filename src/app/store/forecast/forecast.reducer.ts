import { Action, createReducer, on } from '@ngrx/store';

import { forecastLoaded, forecastError, loadForecast } from './forecast.actions';
import { WeatherDescription } from '../weather/weather.reducer';
import { noOp } from '../weather/weather.actions';

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

export interface ForecastState extends Record<number, { error?: boolean, fetchTime?: number, hourly: Forecast[] }> {
  loading: boolean;
}

export const initialState: ForecastState = { loading: false };

const forecastReducer = createReducer(
  initialState,
  on(noOp, (state) => ({
    ...state,
    loading: false
  })),
  on(loadForecast, (state) => ({
    ...state,
    loading: true
  })),
  on(forecastLoaded, (state, { id, hourly }: Partial<ForecastResponse>) => ({
    ...state,
    loading: false,
    [id]: {
      hourly,
      fetchTime: Date.now()
    }
  })),
  on(forecastError, (state, { id }) => ({
    ...state,
    loading: false,
    [id]: {
      hourly: null,
      error: true
    }
  }))
);

export function reducer(state: any, action: Action): ForecastState {
  return forecastReducer(state, action);
}
