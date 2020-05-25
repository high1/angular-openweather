import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { WeatherService } from '../../services/weather.service';
import { ForecastEffects } from './forecast.effects';
import { loadForecast, loadingForecast, forecastLoaded, forecastError } from './forecast.actions';
import { noOp } from '../weather/weather.actions';
import { Action } from '@ngrx/store';
import { environment } from '../../../environments/environment';

describe('Forecast Effects', () => {
  let action$: Observable<Action>;
  let effects: ForecastEffects;
  let store: MockStore;
  let weatherServiceSpy: WeatherService;

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
    action$ = hot('-a', { a: loadForecast({ id: 1, lat: 1, lon: 1 }) });

    expect(effects.loadingForecast$).toBeObservable(cold('-b', { b: noOp() }));
  });

  it('loadForecast effect should also dispatch noOp for interval smaller than predefined one', () => {
    store.setState({
      ...initialState,
      forecast: {
        ...initialState.forecast,
        1: {
          fetchTime: Date.now() + environment.apiInterval / 2
        }
      }
    });
    action$ = hot('-a', { a: loadForecast({ id: 1, lat: 1, lon: 1 }) });

    expect(effects.loadForecast$).toBeObservable(cold('-b', { b: noOp() }));
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
    action$ = hot('-a', { a: loadForecast({ id: 1, lat: 1, lon: 1 }) });

    expect(effects.loadingForecast$).toBeObservable(cold('-b', { b: loadingForecast() }));
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
      forecast: {
        ...initialState.forecast,
        1: {
          fetchTime: Date.now() - environment.apiInterval * 2
        }
      }
    });
    action$ = hot('-a', { a: loadForecast({ id: 1, lat: 1, lon: 1 }) });
    const expected = hot('-b', {
      b: forecastLoaded({
        id: 1,
          hourly: [{
            dt: baseTime.getTime(),
            temp: 20
          }]
      } as unknown)
    });
    expect(effects.loadForecast$).toBeObservable(expected);
  });

  // TODO: error tests with jasmine-marbles or other framework
});
