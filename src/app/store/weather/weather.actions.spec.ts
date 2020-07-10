import { NOOP, LOAD_WEATHER, WEATHER_LOADED, WEATHER_ERROR,
  noOp, loadWeather, weatherLoaded, weatherError } from './weather.actions';

describe('noOp', () => {
  const baseTime = new Date(2020, 1, 1);
  beforeAll(() => {
    jasmine.clock().mockDate(baseTime);
  }),
  it('should create a noOp action', () =>
    expect(noOp()).toEqual({ type: NOOP })
  );

  it('should create a loadWeather action with payload', () =>
    expect(loadWeather({ reload: true })).toEqual({ type: LOAD_WEATHER, reload: true, now: baseTime.getTime() })
  );

  it('should create a weatherLoaded action with payload', () => {
    const payload = { cnt: 1, list: [] };
    expect(weatherLoaded(payload)).toEqual({ type: WEATHER_LOADED, ...payload });
  });

  it('should create a weatherError action', () =>
    expect(weatherError()).toEqual({ type: WEATHER_ERROR })
  );
});
