import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../store/state';
import { loadForecast } from '../../store/forecast/forecast.actions';
import { getState } from '../../store/util';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  name: string;
  forecast$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const { name, coord: { lat, lon } } = getState(this.store, state => state.weather.current.find(item => item.id === id));
    this.name = name;
    this.forecast$ = this.store.select(state => ({ forecast: state.forecast[id], loading: state.forecast.loading }));
    this.store.dispatch(loadForecast({ id,  lat, lon }));
  }

  getHour = (unixTimeStamp: number) =>
    new Intl.DateTimeFormat('en', {  hour: 'numeric' }).format(unixTimeStamp * 1000)

  getDayMonth = (unixTimeStamp: number) => this.formatDateTime(unixTimeStamp, { day: 'numeric', month: 'numeric' });

  formatDateTime = (unixTimeStamp: number, options?: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en', options).format(unixTimeStamp * 1000)

  }
