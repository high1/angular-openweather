import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../store/state';
import { loadForecast } from '../../store/forecast/forecast.actions';
import { getState } from '../../store/util';
import { Coord } from 'src/app/store/weather/weather.reducer';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  name: string;
  id: number;
  coord: Coord;
  forecast$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    ({ name: this.name , coord: this.coord } = getState(this.store, state => state.weather.current.find(item => item.id === this.id)));
    this.forecast$ = this.store.select(state => ({ forecast: state.forecast[this.id], loading: state.forecast.loading }));
    this.loadForecast();
  }

  loadForecast(reload = false) {
    const { lat, lon } = this.coord;
    this.store.dispatch(loadForecast({ id: this.id, lat, lon, reload }));
  }

  getHour = (unixTimeStamp: number) =>
    new Intl.DateTimeFormat('en', {  hour: 'numeric' }).format(unixTimeStamp * 1000)

  getDayMonth = (unixTimeStamp: number) => this.formatDateTime(unixTimeStamp, { day: 'numeric', month: 'numeric' });

  formatDateTime = (unixTimeStamp: number, options?: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en', options).format(unixTimeStamp * 1000)

  }
