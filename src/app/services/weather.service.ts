import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Coord } from '../store/weather/weather.reducer';

const apiKey: string = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather() {
    console.warn(`loading weather`);
    return this.http.get(`${environment.apiUrl}/group?id=${environment.cities.join(',')}&untis=metric&appid=${apiKey}`);
  }

  getForecast({ lat, lon }: Coord ) {
    console.warn(`loadingForecast ${lat} ${lon}`);
    return this.http.get(`${environment.apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=${apiKey}`);
  }
}
