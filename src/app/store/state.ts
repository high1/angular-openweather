import { key as WeatherKey, WeatherState } from './weather/weather.reducer';
import { key as ForecastKey, ForecastState } from './forecast/forecast.reducer';

export interface State {
  [WeatherKey]: WeatherState;
  [ForecastKey]: ForecastState;
}
