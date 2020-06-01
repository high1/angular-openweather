import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgZone } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { ForecastGuardService } from './forecast.guard.service';
import { TestScheduler } from 'rxjs/testing';

describe('ForecastGuardService', () => {
  let service: ForecastGuardService;
  let store: MockStore;
  let route: ActivatedRoute;
  let router: Router;
  let scheduler: TestScheduler;
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
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if there is no matching id in the store', () =>
    scheduler.run(({ expectObservable }) =>
      expectObservable(service.canActivate(route.snapshot)).toBe('a', { a: router.parseUrl('not-found')})
    )
  );

  it('should return true if there is a matching id in the store', () => {
    store.setState({
        weather: {
          current: [
            { id: 1 }
          ]
        }
      });
    scheduler.run(({ expectObservable }) =>
        expectObservable(service.canActivate(route.snapshot)).toBe('b', { b: true })
      );
  });
});
