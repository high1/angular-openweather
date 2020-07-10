import { LOAD_FORECAST, FORECAST_LOADED, FORECAST_ERROR,
  loadForecast, forecastLoaded, forecastError } from './forecast.actions';

describe('noOp', () => {
  const baseTime = new Date(2020, 1, 1);
  beforeAll(() => {
    jasmine.clock().mockDate(baseTime);
  }),
  it('should create a loadWeather action with payload', () => {
    const payload = { id: 1, reload: true };
    expect(loadForecast(payload)).toEqual({ type: LOAD_FORECAST, ...payload, now: baseTime.getTime() });
  });

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
