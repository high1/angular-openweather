import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { WeatherService } from '../../services/weather.service';
import { WeatherEffects } from './weather.effects';
import { loadWeather, loadingWeather, weatherLoaded, noOp, weatherError } from './weather.actions';
import { Action } from '@ngrx/store';
import { environment } from '../../../environments/environment';

describe('Weather Effects', () => {
  let action$: Observable<Action>;
  let effects: WeatherEffects;
  let store: MockStore;
  let weatherServiceSpy: WeatherService;

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
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        WeatherEffects,
        provideMockActions(() => action$),
        provideMockStore({ initialState })
      ]
    });
    effects = TestBed.inject(WeatherEffects);
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    const baseTime = new Date(2020, 1, 1);
    jasmine.clock().mockDate(baseTime);
    weatherServiceSpy = TestBed.inject(WeatherService);
    weatherServiceSpy.getCurrentWeather = jasmine.createSpy().and.returnValue(of({ cnt: 0, list: [] }));
  });

  it('loadingWeather effect should dispatch noOp for interval smaller than predefined one', () => {
    store.setState({
      ...initialState,
      weather: {
        ...initialState.weather,
        fetchTime: Date.now() + environment.apiInterval / 2
      }
    });
    action$ = hot('-a', { a: loadWeather() });

    expect(effects.loadingWeather$).toBeObservable(cold('-b', { b: noOp() }));
  });

  it('loadWeather effect should also dispatch noOp for interval smaller than predefined one', () => {
    store.setState({
      ...initialState,
      weather: {
        ...initialState.weather,
        fetchTime: Date.now() + environment.apiInterval / 2
      }
    });
    action$ = hot('-a', { a: loadWeather() });

    expect(effects.loadWeather$).toBeObservable(cold('-b', { b: noOp() }));
  });

  it('should dispatch loadingWeather', () => {
    store.setState({
      ...initialState,
      weather: {
        ...initialState.weather,
        fetchTime: Date.now() - environment.apiInterval * 2
      }
    });
    action$ = hot('-a', { a: loadWeather() });

    expect(effects.loadingWeather$).toBeObservable(cold('-b', { b: loadingWeather() }));
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
    action$ = hot('-a', { a: loadWeather() });
    const expected = hot('-b', { b: weatherLoaded({ list: [{
      main: {
        temp_max: tempMax,
        temp_min: tempMin,
        temp_avg: (tempMax + tempMin) / 2 - toKelvin
      }
    }] } as unknown) });
    expect(effects.loadWeather$).toBeObservable(expected);
  });

  it('should dispatch weatherError', () => {
    weatherServiceSpy.getCurrentWeather = jasmine.createSpy().and.returnValue(of({
      cnt: 1,
      list: [{
        id: 1
      }]
    }));
    action$ = hot('-a', { a: loadWeather() });
    const expected = hot('-b', { b: weatherError() });
    expect(effects.loadWeather$).toBeObservable(expected);
  });
});
