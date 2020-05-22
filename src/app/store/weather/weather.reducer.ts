import { Action, createReducer, on } from '@ngrx/store';

import { loadingWeather, weatherLoaded, weatherError } from './weather.actions';

export const key = 'weather';

export interface WeatherDescription {
  description: string;
  icon: string;
  id: string;
  main: string;
}

interface Weather {
  clouds: {
    all: number;
  };
  coord: Coord;
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_avg: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  weather: WeatherDescription[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface WeatherResponse {
  cnt: number;
  list: Weather[];
}

export interface WeatherState {
  current: Weather[];
  fetchTime?: number;
  loading: boolean;
  error?: unknown;
}

export const initialState: WeatherState = { current: undefined, loading: false };

const weatherReducer = createReducer(
  initialState,
  on(loadingWeather, ({ current }) => ({
    current,
    loading: true,
  })),
  on(weatherLoaded, (_, response: Partial<WeatherResponse>) => ({
    current: response.list,
    fetchTime: Date.now(),
    loading: false
  })),
  on(weatherError, (_, error: Error) => ({
    current: null,
    loading: false,
    error
  }))
);

export function reducer(state: WeatherState, action: Action) {
  return weatherReducer(state, action);
}
