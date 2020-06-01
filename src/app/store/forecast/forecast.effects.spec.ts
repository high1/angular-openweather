import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { WeatherService } from '../../services/weather.service';
import { ForecastEffects } from './forecast.effects';
import { loadForecast, loadingForecast, forecastLoaded, forecastError } from './forecast.actions';
import { noOp } from '../weather/weather.actions';
import { Action } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { act } from '@ngrx/effects';

describe('Forecast Effects', () => {
  let action$: Observable<Action>;
  let effects: ForecastEffects;
  let store: MockStore;
  let weatherServiceSpy: WeatherService;
  let scheduler: TestScheduler;

  const initialState = {
    forecast: {
      loading: false,
    },
  };

  const baseTime = new Date(2020, 1, 1);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ForecastEffects,
        provideMockActions(() => action$),
        provideMockStore({ initialState })
      ]
    });
    effects = TestBed.inject(ForecastEffects);
    store = TestBed.inject(MockStore);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    jasmine.clock().mockDate(baseTime);
    weatherServiceSpy = TestBed.inject(WeatherService);
    weatherServiceSpy.getCurrentWeather = jasmine.createSpy().and.returnValue(of({ cnt: 0, list: [] }));
  });

  it('loadingForecast effect should dispatch noOp for interval smaller than predefined one', () => {
    store.setState({
      ...initialState,
      forecast: {
        ...initialState.forecast,
        1: {
          fetchTime: Date.now() + environment.apiInterval / 2
        }
      }
    });
    scheduler.run(({ cold, expectObservable}) => {
      action$ = cold('-a', { a: loadForecast({ id: 1 })});
      expectObservable(effects.loadingForecast$).toBe('-b', { b: noOp() });
    });
  });

  it('loadForecast effect should also dispatch noOp for interval smaller than predefined one', () => {
    store.setState({
      ...initialState,
      weather: {
        current: [
          {
            id: 1,
            coord: {
              lat: 1,
              lon: 1
            }
          }
        ]
      },
      forecast: {
        ...initialState.forecast,
        1: {
          fetchTime: Date.now() + environment.apiInterval / 2
        }
      }
    });
    scheduler.run(({ cold, expectObservable }) => {
      action$ = cold('--a', { a: loadForecast({ id: 1 }) });
      expectObservable(effects.loadForecast$).toBe('--b', { b: noOp() });
    });
  });

  it('should dispatch loadingForecast', () => {
    store.setState({
      ...initialState,
      forecast: {
        ...initialState.forecast,
        1: {
          fetchTime: Date.now() - environment.apiInterval * 2
        }
      }
    });
    scheduler.run(({ cold, expectObservable }) => {
      action$ = cold('-a', { a: loadForecast({ id: 1 }) });
      expectObservable(effects.loadingForecast$).toBe('-b', { b: loadingForecast() });
    });
  });

  it('should dispatch forecastLoaded with appropriate service response', () => {
    weatherServiceSpy.getForecast = jasmine.createSpy().and.returnValue(of({
      id: 1,
      hourly: [{
        dt: baseTime.getTime(),
        temp: 20
      }]
    }));
    store.setState({
      ...initialState,
      weather: {
        current: [
          {
            id: 1,
            coord: {
              lat: 1,
              lon: 1
            }
          }
        ]
      },
      forecast: {
        ...initialState.forecast,
        1: {
          fetchTime: Date.now() - environment.apiInterval * 2
        }
      }
    });
    scheduler.run(({ cold, expectObservable }) => {
      action$ = cold('-a', { a: loadForecast({ id: 1 }) });
      expectObservable(effects.loadForecast$).toBe('-b', {
        b: forecastLoaded({
          id: 1,
            hourly: [{
              dt: baseTime.getTime(),
              temp: 20
            }]
        } as unknown)
      });
    });
  });

  // TODO: marble error tests with rxjs/testing or other framework
});
