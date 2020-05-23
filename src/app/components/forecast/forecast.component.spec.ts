import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';

import { ForecastComponent } from './forecast.component';
import { LoaderComponent } from '../loader/loader.component';
import { By } from '@angular/platform-browser';

describe('ForecastComponent', () => {
  let store: MockStore;
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  const name = 'fake-weather';

  const initialState = {
    weather: {
      current: [{
        id: 1,
        coord: {
          lat: 1,
          lon: 1,
        },
        name
      }],
    },
    forecast: {
      1: {
        hourly: [],
      },
      loading: true
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastComponent, LoaderComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1', // city id
              },
            },
          },
        }
      ]
    });
    store = TestBed.inject(MockStore);
  }));

  const createFixture = () => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', () => {
    createFixture();
    expect(component).toBeTruthy();
  });

  it('should sholw loader when loading is true', () => {
    createFixture();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader')).not.toBeFalsy();
  });

  it('should not show loader when loading is false', () => {
    store.setState({
      ...initialState,
      forecast: {
        ...initialState.forecast,
        loading: false
      }
    });
    createFixture();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader')).toBeFalsy();
  });

  it('should have name set', () => {
    store.setState({
      ...initialState,
      forecast: {
        ...initialState.forecast,
        loading: false
      }
    });
    createFixture();
    const paragrah = fixture.debugElement.query(By.css('.middle'));
    expect(paragrah.nativeElement.textContent.trim()).toBe(name.toUpperCase());
  });

  it('should have three hourly rows', () => {
    store.setState({
      ...initialState,
      forecast: {
        1: {
          hourly: [
            {
              dt: 1588352400000,
              temp: 20,
              weather: [
                {
                  icon: '01d.png',
                  description: 'fake-description'
                }
              ]
            },
            {
              dt: 1588356000000,
              temp: 19,
              weather: [
                {
                  icon: '02d.png',
                  description: 'fake-description-2'
                }
              ]
            },
            {
              dt: 1588359600000,
              temp: 18,
              weather: [
                {
                  icon: '03d.png',
                  description: 'fake-description-3'
                }
              ]
            }
          ],
        },
        loading: false
      }
    });
    createFixture();
    expect(fixture.debugElement.queryAll(By.css('.sub-container')).length).toEqual(3);
  });
});

