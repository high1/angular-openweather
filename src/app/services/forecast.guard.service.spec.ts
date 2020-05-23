import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ForecastGuardService } from './forecast.guard.service';

describe('ForecastGuardService', () => {
  let service: ForecastGuardService;
  let store: MockStore;
  const initialState = { weather: {
    current: [
    ]
  } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(ForecastGuardService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
