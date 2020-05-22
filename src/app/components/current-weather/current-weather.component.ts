import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from '../../store/state';
import { loadWeather } from '../../store/weather/weather.actions';
import { WeatherState } from '../../store/weather/weather.reducer';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  weather$: Observable<WeatherState>;
  subscription: Subscription;

  constructor(private store: Store<State>) {
    this.weather$ = this.store.select(state => state.weather);
    this.subscription = this.weather$.subscribe(console.warn);
   }

  ngOnInit(): void {
    this.store.dispatch(loadWeather());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
