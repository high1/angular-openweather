import { Action, createReducer, on } from '@ngrx/store';

import { loadWeather, weatherLoaded, weatherError, noOp } from './weather.actions';

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
  error?: boolean;
}

export const initialState: WeatherState = { current: undefined, loading: false };

const weatherReducer = createReducer(
  initialState,
  on(noOp, (state) => ({
    ...state,
    loading: false
  })),
  on(loadWeather, (state) => ({
    ...state,
    loading: true,
  })),
  on(weatherLoaded, (_, { list: current }) => ({
    current,
    fetchTime: Date.now(),
    loading: false
  })),
  on(weatherError, () => ({
      current: null,
      loading: false,
      error: true
    }))
);

export function reducer(state: WeatherState, action: Action): WeatherState {
  return weatherReducer(state, action);
}
