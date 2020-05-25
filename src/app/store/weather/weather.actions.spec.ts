import { NOOP, LOAD_WEATHER, LOADING_WEATHER, WEATHER_LOADED, WEATHER_ERROR,
  noOp, loadWeather, loadingWeather, weatherLoaded, weatherError } from './weather.actions';

describe('noOp', () => {
  it('should create a noOp action', () =>
    expect(noOp()).toEqual({ type: NOOP })
  );

  it('should create a loadWeather action with payload', () =>
    expect(loadWeather(true)).toEqual({ type: LOAD_WEATHER, reload: true })
  );

  it('should create a loadingWeather action', () =>
    expect(loadingWeather()).toEqual({ type: LOADING_WEATHER })
  );

  it('should create a weatherLoaded action with payload', () => {
    const payload = { cnt: 1, list: [] };
    expect(weatherLoaded(payload)).toEqual({ type: WEATHER_LOADED, ...payload });
  });

  it('should create a weatherError action', () =>
    expect(weatherError()).toEqual({ type: WEATHER_ERROR })
  );
});
