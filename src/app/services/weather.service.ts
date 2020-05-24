import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Coord } from '../store/weather/weather.reducer';

const {
  apiKey,
  apiUrl,
  cities
} = environment;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather() {
    return this.http.get(`${apiUrl}/group?id=${cities.join(',')}&untis=metric&appid=${apiKey}`);
  }

  getForecast({ lat, lon }: Coord ) {
    return this.http.get(`${apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=${apiKey}`);
  }
}
