import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from '../../store/state';
import { loadWeather } from '../../store/weather/weather.actions';
import { WeatherState } from '../../store/weather/weather.reducer';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  weather$: Observable<WeatherState>;

  constructor(private store: Store<State>) {
    this.weather$ = this.store.select(state => state.weather);
   }

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather(reload = false) {
    this.store.dispatch(loadWeather({ reload }));
  }

}
