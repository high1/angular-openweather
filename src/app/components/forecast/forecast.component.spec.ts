import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ForecastComponent } from './forecast.component';
import { LoaderComponent } from '../loader/loader.component';

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
        hourly: [
          {
            dt: 1588352400000,
            temp: 20,
            weather: [
              {
                icon: '01d.png',
                description: 'fake-description'
              }
            ],
            wind_speed: 5
          },
          {
            dt: 1588356000000,
            temp: 19,
            weather: [
              {
                icon: '02d.png',
                description: 'fake-description-2'
              }
            ],
            wind_speed: 4
          },
          {
            dt: 1588359600000,
            temp: 18,
            weather: [
              {
                icon: '03d.png',
                description: 'fake-description-3'
              }
            ],
            wind_speed: 3
          }
        ],
      },
      loading: false
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastComponent, LoaderComponent],
      providers: [
        RouterTestingModule,
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
    }).compileComponents();
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

  it('should show loader when loading is true', () => {
    store.setState({
      ...initialState,
      forecast: {
        ...initialState.forecast,
        loading: true
      }
    });
    createFixture();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader')).toBeTruthy();
  });

  it('should not show loader when loading is false', () => {
    createFixture();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader')).toBeFalsy();
  });

  it('should have name set', () => {
    createFixture();
    const paragrah = fixture.debugElement.query(By.css('.header .name'));
    expect(paragrah.nativeElement.textContent.trim()).toBe(name.toUpperCase());
  });

  it('should have three hourly rows', () => {
    createFixture();
    expect(fixture.debugElement.queryAll(By.css('.sub-container')).length).toEqual(3);
  });

  it('should display wind speed', () => {
    createFixture();
    const div = fixture.debugElement.query(By.css('.speed'));
    expect(div.nativeElement.textContent.trim()).toEqual('5.0m/s');
  });

  it('should display temperature', () => {
    createFixture();
    const div = fixture.debugElement.query(By.css('.temperature'));
    expect(div.nativeElement.textContent.trim()).toEqual('20°');
  });
});

