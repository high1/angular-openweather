import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { WeatherService } from '../../services/weather.service';
import { WeatherEffects } from './weather.effects';
import { loadWeather, loadingWeather, weatherLoaded, noOp, weatherError } from './weather.actions';
import { Action } from '@ngrx/store';
import { environment } from '../../../environments/environment';

describe('Weather Effects', () => {
  let action$: Observable<Action>;
  let effects: WeatherEffects;
  let store: MockStore;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let scheduler: TestScheduler;

  const initialState = {
    weather: {
      current: [{
        id: 1,
        name
      }],
      loading: true,
    },
  };

  beforeEach(async () => {
    weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        WeatherEffects,
        { provide: WeatherService, useValue: weatherServiceSpy },
        provideMockActions(() => action$),
        provideMockStore({ initialState })
      ]
    });
    effects = TestBed.inject(WeatherEffects);
    store = TestBed.inject(MockStore);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    const baseTime = new Date(2020, 1, 1);
    jasmine.clock().mockDate(baseTime);
    // weatherServiceSpy = TestBed.inject(WeatherService);
    weatherServiceSpy.getCurrentWeather.and.returnValue(of({ cnt: 0, list: [] }));
  });

  it('loadingWeather effect should dispatch noOp for interval smaller than predefined one', () => {
    store.setState({
      ...initialState,
      weather: {
        ...initialState.weather,
        fetchTime: Date.now() + environment.apiInterval / 2
      }
    });
    scheduler.run(({ cold, expectObservable }) => {
      action$ = cold('-a', { a: loadWeather() });
      expectObservable(effects.loadingWeather$).toBe('-b', { b: noOp() });
    });
  });

  it('loadWeather effect should also dispatch noOp for interval smaller than predefined one', () => {
    store.setState({
      ...initialState,
      weather: {
        ...initialState.weather,
        fetchTime: Date.now() + environment.apiInterval / 2
      }
    });
    scheduler.run(({ cold, expectObservable }) => {
      action$ = cold('-a', { a: loadWeather() });
      expectObservable(effects.loadWeather$).toBe('-b', { b: noOp() });
    });
  });

  it('should dispatch loadingWeather', () => {
    store.setState({
      ...initialState,
      weather: {
        ...initialState.weather,
        fetchTime: Date.now() - environment.apiInterval * 2
      }
    });
    scheduler.run(({ cold, expectObservable }) => {
      action$ = cold('-a', { a: loadWeather() });
      expectObservable(effects.loadingWeather$).toBe('-b', { b: loadingWeather() });
    });
  });

  it('should dispatch weatherLoaded with appropriate service response', () => {
    const toKelvin = 273.15;
    const tempMax = 22 + toKelvin;
    const tempMin = 20 + toKelvin;
    weatherServiceSpy.getCurrentWeather = jasmine.createSpy().and.returnValue(of({
      cnt: 1,
      list: [{
        main: {
          temp_max: tempMax,
          temp_min: tempMin
        }
      }]
    }));
    store.setState({
      ...initialState,
      weather: {
        ...initialState.weather,
        fetchTime: Date.now() - environment.apiInterval * 2
      }
    });
    scheduler.run(({ cold, expectObservable }) => {
      action$ = cold('-a', { a: loadWeather() });
      expectObservable(effects.loadWeather$).toBe('-b', { b: weatherLoaded({ list: [{
        main: {
          temp_max: tempMax,
          temp_min: tempMin,
          temp_avg: (tempMax + tempMin) / 2 - toKelvin
        }
      }] } as unknown ) });
    });
  });

  it('should dispatch weatherError', () => {
    weatherServiceSpy.getCurrentWeather.and.returnValue(of({
      cnt: 1,
      list: [{
        id: 1
      }]
    }));
    scheduler.run(({ cold, expectObservable }) => {
      action$ = cold('-a', { a: loadWeather() });
      expectObservable(effects.loadWeather$).toBe('-b', { b: weatherError() });
    });
  });
});
