import { initialState, reducer as ForecastReducer } from './forecast.reducer';
import { loadingForecast, forecastLoaded, forecastError } from './forecast.actions';

describe('ForecastReducer', () => {
  const payload = {
    id: 1,
    lat: 1,
    lon: 1,
    timezone: '',
    timezone_offset: 0,
    hourly: []
   };
  it('undefined action return the default state', () =>
    expect(ForecastReducer(undefined, { type: undefined })).toBe(initialState)
  );

  it('loadingForecast action should set loading to true', () =>
      expect(ForecastReducer(undefined, loadingForecast)).toEqual({
        ...initialState,
        loading: true
      })
    );
  it('forecastLoaded action should set current and fetchTime', () => {
    const baseTime = new Date(2020, 1, 1);
    jasmine.clock().mockDate(baseTime);
    expect(ForecastReducer({ ...initialState }, forecastLoaded(payload))).toEqual({
      loading: false,
      [payload.id] : {
        hourly: [],
        fetchTime: baseTime.getTime()
      }
    });
  });
  it('weatherError should set error', () => {
    expect(ForecastReducer({ ...initialState }, forecastError({ id: payload.id }))).toEqual({
      loading: false,
      [payload.id]: {
        hourly: null,
        error: true
      }
    });
  });
});
