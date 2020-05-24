import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { WeatherService } from './weather.service';
import { environment } from 'src/environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const { apiKey, apiUrl, cities } = environment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get weather with parameters', () => {
    service.getCurrentWeather().subscribe();

    const req = httpMock.expectOne(
      `${apiUrl}/group?id=${cities.join(
        ','
      )}&untis=metric&appid=${apiKey}`
    );
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

  it('should call get forecast with parameters', () => {
    const lat = 40;
    const lon = 20;
    service.getForecast({ lat, lon }).subscribe();

    let req = httpMock.expectOne(
      `${apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=${apiKey}`
    );
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });
});
