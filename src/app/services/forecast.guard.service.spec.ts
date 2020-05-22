import { TestBed } from '@angular/core/testing';

import { ForecastGuardService } from './forecast.guard.service';

describe('ForecastGuardService', () => {
  let service: ForecastGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
