import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ForecastGuardService } from './forecast.guard.service';

describe('ForecastGuardService', () => {
  let service: ForecastGuardService;
  let store: MockStore;
  let route: ActivatedRoute;
  let router: Router;
  const initialState = {
    weather: {
      current: [
      ]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1 } } }
        },
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(ForecastGuardService);
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    const originalNavigate = router.navigate;
    spyOn(router, 'navigate').and.callFake((...options) =>
      new NgZone({}).run(() => originalNavigate.apply(router, options)));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if there is no matching id in the store', () => {
    expect(service.canActivate(route.snapshot)).toEqual(false);
  });

  it('should return true if there is a matching id in the store', () => {
    store.setState({
        weather: {
          current: [
            { id: 1 }
          ]
        }
      });
    expect(service.canActivate(route.snapshot)).toEqual(true);
  });
});
