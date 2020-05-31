import { LOAD_FORECAST, LOADING_FORECAST, FORECAST_LOADED, FORECAST_ERROR,
  loadForecast, loadingForecast, forecastLoaded, forecastError } from './forecast.actions';

describe('noOp', () => {

  it('should create a loadWeather action with payload', () => {
    const payload = { id: 1, reload: true };
    expect(loadForecast(payload)).toEqual({ type: LOAD_FORECAST, ...payload });
  });

  it('should create a loadingWeather action', () =>
    expect(loadingForecast()).toEqual({ type: LOADING_FORECAST })
  );

  it('should create a weatherLoaded action with payload', () => {
    const payload = {
      id: 1,
      lat: 1,
      lon: 1,
      timezone: '',
      timezone_offset: 0,
      hourly: []
     };
    expect(forecastLoaded(payload)).toEqual({ type: FORECAST_LOADED, ...payload });
  });

  it('should create a weatherError action', () => {
    const payload = { id: 1 };
    expect(forecastError(payload)).toEqual({ type: FORECAST_ERROR, ...payload });
  });
});
