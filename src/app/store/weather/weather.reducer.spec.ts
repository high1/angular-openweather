import { initialState, reducer as WeatherReducer } from './weather.reducer';
import { loadingWeather, weatherLoaded, weatherError } from './weather.actions';

describe('WeatherReducer', () => {
  it('undefined action return the default state', () =>
    expect(WeatherReducer(undefined, { type: undefined })).toBe(initialState)
  );
  it('loadingWeather action should set loading to true', () =>
    expect(WeatherReducer(undefined, loadingWeather)).toEqual({
      ...initialState,
      loading: true
    })
  );
  it('weatherLoaded action should set current and fetchTime', () => {
    const baseTime = new Date(2020, 1, 1);
    jasmine.clock().mockDate(baseTime);
    expect(WeatherReducer({ ...initialState, fetchTime: undefined }, weatherLoaded({ cnt: 1, list: [] }))).toEqual({
      current: [],
      fetchTime: baseTime.getTime(),
      loading: false
    });
  });
  it('weatherError should set error', () => {
    expect(WeatherReducer({ ...initialState, fetchTime: undefined }, weatherError())).toEqual({
      current: null,
      loading: false,
      error: true
    });
  });
});
