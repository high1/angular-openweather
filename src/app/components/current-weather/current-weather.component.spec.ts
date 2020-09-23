import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CurrentWeatherComponent } from './current-weather.component';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorComponent } from '../error/error.component';
import { loadWeather } from '../../store/weather/weather.actions';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let store: MockStore;
  const name = 'fake-weather';

  const initialState = {
    weather: {
      current: [{
        id: 1,
        name
      }],
      loading: true,
    },
  };

  const createFixture = () => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent, LoaderComponent, ErrorComponent ],
      providers: [
        RouterTestingModule,
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  it('should create', () => {
    createFixture();
    expect(component).toBeTruthy();
  });

  it('should show loader when loading is true', () => {
    createFixture();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader')).not.toBeFalsy();
  });

  it('should not show loader when loading is false', () => {
    store.setState({
      weather: {
        current: [{
          id: 1,
          name,
          weather: [{
              icon: '01n.png',
            }
          ],
          main : {
            temp_avg: 20,
          },
          wind: {
            speed: 5,
          }
        }],
        loading: false,
      },
    });
    createFixture();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader')).toBeFalsy();
  });

  it('should show error container on error', () => {
    store.setState({
      weather: {
        current: undefined,
        loading: false,
        error: true
      },
    });
    createFixture();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-error')).toBeTruthy();
  });

  it('should dispatch on loadWeather with false payload', () => {
    const spy = spyOn(store, 'dispatch');
    createFixture();
    component = fixture.componentInstance;
    component.loadWeather();
    expect(store.dispatch).toHaveBeenCalledWith(loadWeather());
  });

  it('should dispatch on loadWeather with true payload', () => {
    const spy = spyOn(store, 'dispatch');
    createFixture();
    component = fixture.componentInstance;
    component.loadWeather(true);
    expect(store.dispatch).toHaveBeenCalledWith(loadWeather({ reload: true }));
  });
});
