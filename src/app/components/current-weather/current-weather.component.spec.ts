import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CurrentWeatherComponent } from './current-weather.component';
import { LoaderComponent } from '../loader/loader.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let store: MockStore;
  const name = 'fake-weather';

  const initialState = {
    weather: {
      current: [{
        id: 1,
        coord: {
          lat: 1,
          lon: 1,
        },
        name,
      }],
      loading: true,
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent, LoaderComponent ],
      providers: [ provideMockStore({ initialState })]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader when loading is true', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loader')).not.toBeFalsy();
  });
});
