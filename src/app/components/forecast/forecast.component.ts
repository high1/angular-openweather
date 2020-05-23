import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { State } from '../../store/state';
import { Coord } from '../../store/weather/weather.reducer';
import { loadForecast } from '../../store/forecast/forecast.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, OnDestroy {
  id: number;
  coord$: Observable<Coord>;
  name$: Observable<string>;
  forecast$: Observable<any>;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.coord$ = this.store.select(state => state.weather.current?.find(item => item.id === this.id).coord);
    this.name$ = this.store.select(state => state.weather.current?.find(item => item.id === this.id).name);
    this.subscription = this.coord$.subscribe(({ lat, lon }) => this.store.dispatch(loadForecast({ id: this.id, lat, lon })));
    this.forecast$ = this.store.select(state => ({ forecast: state.forecast[this.id], loading: state.forecast.loading }));
    this.subscription.add(this.forecast$.subscribe(forecast => console.warn(forecast)));
  }

  get forecastLimit() {
    return environment.forecastLimit;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getHour = (unixTimeStamp: number) =>
    new Intl.DateTimeFormat('en', {  hour: 'numeric' }).format(unixTimeStamp * 1000)

  getDayMonth = (unixTimeStamp: number) => this.formatDateTime(unixTimeStamp, { day: 'numeric', month: 'numeric' });

  formatDateTime = (unixTimeStamp: number, options?: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en', options).format(unixTimeStamp * 1000)

  }
